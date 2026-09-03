# Architecture Topology — C# ECS Engine in browser-wasm Native-AOT Host (PixiJS v8)

> Detailed companion to `docs/index.md` (the architecture source of truth). Decisions live in `docs/adr/`; verified facts in `docs/ai-agents/codebase-truth.md`. This file marks **Implemented** vs **Target** explicitly. When code and prose disagree, verified files win.

## The Dual-Runtime State Machine

Integrating PixiJS v8 into a C# browser-wasm Native-AOT host shifts execution into a hybrid dual-runtime:

1. **C# WASM / Mono Runtime Layer** — pure game logic, ECS entity lifecycle, system updates, spatial partitioning, state machines, physics.
2. **JS / WebGPU / WebGL2 Presentation Layer** — PixiJS v8, hardware-accelerated shaders, audio contexts, skeletal mesh rendering.
3. **WebAssembly Memory Boundary** — the high-speed data link from C# component arrays to PixiJS WebGPU pipelines.

```
C# ECS Engine Core (Arch / Box2D.NET target)
   |  native logic / systems                 |  fixed-step physics (Box2D.NET target)
   v                                         v
C# Transform & Motion Systems (contiguous)   C# Physics Engine (Box2D.NET target)
   |  zero-copy / direct HEAPF32 transfer (target)
   v
=============== WASM Interop Boundary (memory HEAP) ===============
   |  batched render snapshot / matrix buffer
   v
PixiJS v8 Presentation Layer (WebGPU / WebGL2 pipelines)
   |-- glTF 2.0   |-- @pixi/tilemap   |-- @pixi/sound   |-- pixi-filters
```

## Three Layers (ADR-001)

| Layer | Role | Status |
| --- | --- | --- |
| **1. C# Authoritative World** | ECS + Box2D.NET; gameplay physics, collisions, rules, deterministic tick. Sole authority. | Arch ECS implemented (`EcsSimulation` 60 Hz, `MovementSystem`/`ColorSystem`, batched `EcsRenderSignal`, SSR `Snapshot()`; games: Snake, Tetris, Breakout, Asteroids). Box2D.NET **wired** into `Game.Engine` and used by `AsteroidsSimulation` as the authoritative physics world (circle bodies, contact events, screen wrap, per-sim deterministic world `workerCount = 1`). |
| **2. Presentation World** | Lightweight custom interpolation (default) + optional box2d3-wasm 2D (visual dynamics). Pure mirror of authoritative state. | Implemented for `snake.ts` and `asteroids.ts`: both interpolate prev/curr snapshots; Asteroids also runs box2d3-wasm debris and particle-emitter bursts. Other scenes render raw signals. |
| **3. PixiJS v8** | Sprites, containers, animation, camera, particles, GPU render. | Bootstrap implemented (`initGame`/`renderText`/`renderScene`, scenes, stats overlays). |

Rule: never move simulation back-and-forth through JS interop every frame. Keep any JS physics world resident; feed it snapshots at discrete boundaries. Client-side interpolation and box2d3-wasm kinematic-coupling implementation guide: `docs/architecture/render-interpolation.md`.

## The WASM->JS Bridge (ADR-003, ADR-008)

**Problem:** per-entity `IJSRuntime.InvokeVoidAsync` at 60 FPS saturates interop; simulation (60 Hz) and display (144 Hz) differ in time domain -> jitter.

**Implemented (ADR-008):** zero-copy shared-memory pipeline. The simulation writes each batched render snapshot into a pinned `float[]` (`GCHandle.Alloc(..., Pinned)`), passes the raw pointer to JS via `[JSImport]("notifyRender")`, and JS reads `new Float32Array(heap.buffer, ptr, count)` over the WASM heap — no JSON, no byte[] copy, no `IJSRuntime`. Client interpolates: `P_render = P_prev + (P_curr - P_prev) * alpha`, `alpha = (T_now - T_last_tick) / T_tick`.

**Deprecated:** `GET /api/ecs/stream` SSE pushing `event: sprite-move` with batched `SpriteState[]` JSON (`Id, X, Y, R, G, B`) — the legacy transport, superseded by the pinned-buffer path (retained only in the opt-in multiplayer `--mode web` / `npm run build:web` build).

The canonical float32 layout lives in `Game.Engine.ECS.SignalBuffer.cs` (`SignalBuffer` + `SignalBufferLayout` + `SignalBufferEncoders`) and its TypeScript mirror `src/Game.UI/Frontend/scenes/bufferLayout.ts` (+ per-scene `EntityDecoder`s). The C# and TS halves are kept in lockstep by `src/Game.Engine.Generators` — see "Zero-Copy Layout Guardrails" below.

## Zero-Copy Layout Guardrails

The C# float32 layout and the TypeScript decoders must never drift. `src/Game.Engine.Generators` (Roslyn analyzer + source generator) enforces this three ways:

| Vector | Phase | Mechanism |
| --- | --- | --- |
| Stride / type validation | Compile-time (IDE + MSBuild) | `LayoutAlignmentAnalyzer` — `BNOBO001` errors when a `[TypeScriptExport(n)]` struct's computed float-stride ≠ `n`; `BNOBO002` errors on field types that cannot float32-encode. |
| Boot-time static assert | Load-time (WASM boot) | `TypeScriptInterfaceGenerator` emits `GeneratedSignalLayout` + a `[ModuleInitializer]` that asserts each computed stride equals the matching `SignalBufferLayout` constant. |
| TypeScript half | Build-time | The same generator writes `src/Game.UI/Frontend/scenes/generated/signalLayout.ts` (interfaces + stride constants); `bufferLayout.ts` imports the generated `BUFFER_HEADER_LENGTH`. |

Every sprite-state record struct carries the marker: `SpriteState` (stride 6), `SnakeSpriteState` (11), `PacmanSpriteState` (16), `BreakoutSpriteState` (8), `AsteroidsSpriteState` (11), `RacerCarState` (6).

## Physics Architecture (ADR-002, ADR-005)

```
C# ECS + Box2D.NET (authoritative) -> snapshots -> JS bridge
   |-- custom interpolation (cheap / default)   |-- box2d3-wasm 2D (optional, visual dynamics)
   \-- both -> PixiJS v8
```

- **Box2D.NET** = authoritative gameplay physics in the C# ECS loop (raycasts/AABB queries zero-interop).
- **Custom lerp/slerp/spring** = default for plain interpolation (zero-overhead).
- **box2d3-wasm** = optional, entity-selective (`PresentationPhysicsComponent { Mode = Interpolate | Spring | box2d3-wasm | CustomGpu }`), visual dynamics only (capes, ropes, ragdolls, debris). Not the deterministic build.
- Four answers: Box2D.NET = "where is it really?"; interpolation = "where to draw?"; box2d3-wasm = "how does it move dynamically?"; PixiJS = "how to render?"

## Skeletal Animation — Two Pipelines (ADR-004)

- **Pipeline A — Authoring (offline):** AI Agent + Blender `bpy` -> armature + animations -> `.glb`. `AI + Blender = Content Pipeline`, not game runtime.
- **Pipeline B — Runtime:** `.glb` -> glTF Importer (C#) -> ECS -> `AnimationSystem` -> `TransformSystem` -> `SkinningSystem` -> joint matrix palette -> PixiJS/GPU.

glTF = input asset format, **not** the ECS architecture. A character = one entity with data-oriented components:

```
SkeletonComponent { JointCount, ParentIndices[], LocalTransforms[], GlobalTransforms[],
                    InverseBindMatrices[], JointEntities[] }   // contiguous arrays
AnimationPlayerComponent { CurrentClip, CurrentTime, PlaybackSpeed, Loop, State }
SkinnedMeshComponent - RenderComponent
```

Animation state machine belongs to the ECS, not glTF. See `docs/2d-skeletal-animations/index.md`.

## Domain Responsibility Matrix (ADR-006)

| Responsibility | C# (Sim) | PixiJS (Pres.) |
| --- | :---: | :---: |
| Game rules & logic | Y | N |
| Collision & hit detection | Y | N |
| Gravity & impulses | Y | N |
| Character controllers | Y | N |
| Deterministic networking | Y | N |
| Position interpolation | N | Y |
| Sprite transforms & animation | N | Y |
| Camera smoothing | N | Y |
| Secondary motion (cloth, ragdoll) | N | Y |
| Particle physics & screen effects | N | Y |

## Ecosystem Integration Matrix

| Component | Runtime | State source of truth | Interop | Role |
| --- | --- | --- | --- | --- |
| PixiJS v8 core | JS (WebGPU/WebGL) | JS display tree | shared memory buffer (implemented, ADR-008) | View layer; consumes transform buffers |
| glTF 2.0 / `.glb` | JS (GPU skinning, target) | C# skeleton comps (target) | event-driven | animation triggers from C#; skinning on GPU |
| C# physics (Box2D.NET) | C# WASM | C# RigidBody comps | zero interop | solves dynamics in WASM memory |
| `@pixi/tilemap` | JS (WebGPU) | C# tile-map array | one-time / chunk | binary grid buffer on load; O(1) draw calls |
| `@pixi/sound` | JS (Web Audio) | C# sound comps | event-driven | C# `AudioSystem` -> spatial audio |
| `pixi-viewport` | JS | C# camera entity | shared buffer (target) | C# `CameraSystem` focus -> JS affine transform |
| `CullerPlugin` | JS | viewport bbox | zero (internal JS) | skips offscreen draw calls |
| `pixi-filters` | JS / GPU shader | C# render settings | low-freq mutation | post-processing (Bloom, CRT, Shockwave) |
| HTML5 HUD | JS / DOM overlay | reactive state | native data binding | HTML5 HUD over canvas; crisp, accessible |
| `@pixi/ui` | JS (canvas) | world-space containers | shared / event | world-space UI (enemy health bars, click targets) |

## Ecosystem Packages

The full PixiJS v8 stack is declared in `src/Game.UI/package.json`: `pixi.js`, `@pixi/ui`, `@pixi/sound`, `@pixi/tilemap`, `pixi-viewport`, `pixi-filters`, `@spd789562/particle-emitter`, plus `box2d3-wasm` (presentation physics, JS-side only). Vendored C# `src/Box2D.NET` (physics) is **referenced** by `Game.Engine.csproj` and used by `AsteroidsSimulation`; `src/BrainAI` (pathfinding/AI) remains unreferenced.

## Implementation Status

| Capability | Status |
| --- | --- |
| Arch ECS sim (60 Hz, systems, batched signal) | Implemented |
| PixiJS bootstrap (`initGame`/`renderText`/`renderScene`, scenes, stats) | Implemented |
| Games: Snake, Tetris, Breakout, Asteroids, Pacman, Racer (ECS authority + input + HUD) | Implemented |
| Box2D.NET authoritative physics in ECS loop (Asteroids: bodies, contact events, wrap) | Implemented (ADR-002) |
| Asteroids presentation layer: interpolation + box2d3-wasm debris + particle-emitter + GlowFilter | Implemented (ADR-003/005) |
| Snake presentation layer: interpolation + authoritative red-food fall + immediate replacement food | Implemented (ADR-003/006) |
| Render transport seam: `IRenderTransport<TSignal>` injected into all sims, `ServerRenderTransport` default, `SINGLE_PLAYER_LOCAL` build switches in `Game.Engine.csproj` | Implemented (ADR-007 Phase 1) |
| Single-player-local default: `SINGLE_PLAYER_LOCAL` + `local-buffer` are the default builds; `fetch` POST exists only in the `--mode web` / `npm run build:web` multiplayer branch; scenes route all commands through `SignalStream.postCommand` (no raw `fetch` in scene code) | Implemented (ADR-007) |
| TS `SnapshotBuffer.ingestFromBuffer` (typed-array ingest, same interpolation math) — consumed by all seven scene buffer listeners (tetris, snake, pacman, breakout, asteroids, ecs, racer) | Implemented (ADR-007 Phase 3) |
| `Game.Wasm` co-located host: `PinnedRenderBuffer` + `DirectRenderTransport` (zero-copy: pinned `GCHandle` → `[JSImport] notifyRender(ptr, count)` → JS reads `Float32Array` over WASM heap), typed `[JSExport]` commands, `WasmInterop` bridge module (`wasm-interop.js`). Replaces Phase 2 byte[]–copy + DotNetObjectReference JSON path | Implemented (ADR-007 Phase 3 / ADR-008) |
| `IExampleSims` seam — `SimHost` provides lazy sims in `Game.Wasm` | Implemented (ADR-007 Phase 2) |
| `Game.Wasm` Release AOT publish — `RunAOTCompilation` + `WasmStripIL`, vendored Arch generic templates capped at arity 15 (`Helpers.ttinclude` `Amount=16`), verified 61 FPS under `dotnet-serve --fallback-file index.html`; `[JSImport]/[JSExport]` source-gen interop (AOT-safe, no reflection) | Implemented (ADR-007 Phase 3) |
| Interop hygiene — `WasmInterop.Initialize` in `Program.cs`, `pixi-bundle-ready` event handshake, no `DotNetObjectReference`/`CommandJsonContext` | Implemented (ADR-008) |
| Docs — `topology.md`, `codebase-truth.md`, ADR-007, `README.md` (AOT publish + verify instructions) | Implemented (ADR-007 Phase 5) |
| `SpriteState` -> `TransformSnapshot` (velocity/rotation/tick) | Partial — snake/pacman/asteroids/racer entity states already carry temporal data (ADR-003); `SpriteState` (ecs/tetris/breakout) still lacks it |
| Shared-memory `HEAPF32` zero-copy transfer — `PinnedRenderBuffer` + `[JSImport] notifyRender` over WASM heap | Implemented (ADR-008) |
| Zero-copy layout guardrails — `Game.Engine.Generators`: `[TypeScriptExport]` stride analyzer (`BNOBO001`/`BNOBO002`) + `GeneratedSignalLayout` `[ModuleInitializer]` assert + generated `signalLayout.ts` | Implemented |
| Box2D.NET for other games (Snake/Tetris/Breakout) | Target |
| box2d3-wasm presentation physics (entity-selective, other games) | Target |
| glTF importer + skeletal ECS components | Target |
| Camera / tilemap / audio / culler integration | Target |
