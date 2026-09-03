# Agent Directives: bonoboengine.wasm.2D Architecture

**Directive:** Agents must never implement per-entity draw calls, individual DOM queries, or inefficient JSON string serialization loops for 2D rendering. All high-frequency 2D transformation data must utilize zero-copy memory buffers, mapping pinned C# transform structures directly to PixiJS v8 sprite pools via a single `Float32Array` view over the WebAssembly heap.

**Directive:** Agents must never serialize entity transform states into JSON, UTF-8 strings, or managed array clones during high-frequency execution loops. All spatial coordinates, velocities, and rotation data must cross the WASM-JS boundary using raw, pinned memory pointers or shared memory buffers exported by C# interop.

---

## Project Context

* **Language:** C# 14 / .NET
* **Framework:** .NET MAUI / Blazor WebAssembly Hybrid
* **ECS Backend:** Arch ECS (Pure C# zero-allocation component architecture)
* **Physics Backend:** `Box2D.NET` (Authoritative simulation loop) & `box2d3-wasm` (Optional presentation and debris physics)
* **Render Frontend:** PixiJS v8 (2D WebGL/WebGPU Canvas renderer via batched transform buffers)
* **UI Overlay:** Razor Class Library (RCL) + Tailwind CSS + Vite
* **Target Environment:** Native AOT / WebAssembly (WASM)

---

## Architectural Rules

### AOT_STRICT_COMPLIANCE

* **Description:** Production binaries must compile via Native AOT. Zero runtime reflection or dynamic IL generation is permitted outside of `#if DEBUG`.
* **Enforcement:** Wrap all `System.Reflection` usage strictly inside `#if DEBUG` ... `#endif` blocks or leverage C# source generators.

### PHYSICS_MEMORY_STRICT

* **Description:** `Box2D.NET` simulation loops must maintain strict memory hygiene to prevent garbage collection pressure and ensure deterministic execution.
* **Enforcement:** Strictly utilize preallocated buffers and struct-based component patterns within Arch ECS. Never instantiate managed reference types (`class`) inside hot physics or simulation tick loops.

### ZERO_COPY_INTEROP_MANDATE

* **Description:** Single-player and local-buffer rendering states must cross the WebAssembly-JS boundary using zero-copy pinned memory buffers.
* **Enforcement:** Allocate transformation buffers using `GCHandle.Alloc(..., GCHandleType.Pinned)` in C# and project a `Float32Array` view over `WebAssembly.Memory.buffer` in TypeScript to update 2D sprite transforms without garbage collection overhead.

### PIXIJS_SPRITE_TRANSFORM_ALIGNMENT

* **Description:** PixiJS v8 entity rendering must be driven by batched transform signals or shared-memory float arrays rather than per-entity JavaScript interop calls.
* **Enforcement:** Ensure C# 2D transform structures (`X`, `Y`, `Rotation`, `ScaleX`, `ScaleY`) align with PixiJS container/sprite expectations. Update sprite positions in batch loops synchronized with render frames.

### ECS_PHYSICS_MAPPING

* **Description:** Keep Arch ECS component data and `Box2D.NET` rigid body states synchronized without architectural coupling.
* **Enforcement:** Store physics body references or body IDs as struct components inside Arch ECS. Use dedicated system loops to sync physics pose data directly into the pinned rendering transform array.

### LOOP_DECOUPLING_RULE

* **Description:** Keep the fixed-step physics engine completely isolated from variable-step render ticks.
* **Enforcement:** Execute `Box2D.NET` steps and Arch ECS updates inside a deterministic fixed-timestep accumulator loop. Never tie simulation or physics updates directly to browser `requestAnimationFrame` callbacks.

---

## WebAssembly Architecture Rule: Hybrid Web UI and C# Core Engine

This architectural specification defines the separation of concerns, interop patterns, and execution lifecycles for a high-performance 2D C# WebAssembly game engine utilizing **PixiJS v8**, **Arch ECS**, **Box2D.NET**, and a **TypeScript / Tailwind CSS DOM overlay**.

---

### 1. Core Architectural Boundaries

The engine separates performance-critical simulation logic from presentation and interface layers by establishing two distinct execution domains:

* **The Engine Core (C# / WASM / Native AOT):**
* Executes the Arch ECS tick loop, component memory updates, math processing, and `Box2D.NET` rigid body dynamics.
* Writes transformation state directly into pinned unmanaged memory buffers or batched render signals.
* Acts as the single authoritative source of truth for all gameplay logic.

* **The Presentation and UI Domain (TypeScript / PixiJS v8 / Tailwind CSS):**
* Executes inside the browser JavaScript runtime.
* Reads transformation matrices and coordinates from the shared WASM heap to update PixiJS sprites and containers.
* Renders HTML/CSS user interface overlays (inventories, health bars, HUDs) above the canvas using Tailwind CSS.

---

### 2. Interop Communication Standards (`[JSImport]` / `[JSExport]`)

To minimize serialization latency and prevent garbage collection pressure across the WebAssembly boundary, all communication must adhere to strict rules:

* **Zero polling rule:** Polling state across the interop boundary per frame via JSON or string serialization is strictly prohibited. Communication must be **event-driven, shared-memory bound, or streamed via batched deltas**.
* **Shared-heap transform bridge:** High-frequency transform updates occur with zero interop overhead by allowing JavaScript `Float32Array` views to read pinned C# transform buffers directly from the WASM memory heap.
* **Primitive-first events:** Low-frequency events (e.g., UI interactions, entity spawning) must only pass primitive types (`int`, `float`, `bool`) using `[JSImport]` and `[JSExport]`.

---

### 3. Simulation Lifecycle and Pause States

When displaying complex UI overlays, inventories, or paused states, the engine short-circuits the execution loop to conserve CPU cycles and GPU resources.

```csharp
// Architectural pattern for loop halting
private static bool _isSimulationPaused = false;

[JSExport]
public static void SetSimulationPaused(bool paused)
{
    _isSimulationPaused = paused;
}

public static void MainLoopTick(float deltaTime)
{
    if (_isSimulationPaused) 
    {
        // Skip physics steps and ECS updates.
        // The canvas retains its last rendered frame beneath the DOM overlay.
        return; 
    }

    ExecutePhysicsStep(deltaTime);
    ExecuteEcsSystems();
    SyncTransformsToPinnedBuffer();
}

```

---

### 4. Architectural Comparison Matrix

| Architectural Layer | Implementation Technology | Primary Responsibility | Execution Frequency |
| --- | --- | --- | --- |
| **Simulation & Physics** | C# (Arch ECS / Box2D.NET / .NET WASM) | Game rules, entity states, 2D rigid body collisions and dynamics. | Locked to target tick rate (e.g., 60 Hz fixed timestep). |
| **Graphics Pipeline** | TypeScript (PixiJS v8 / WebGL / WebGPU) | Sprite rendering, container hierarchies, camera panning, particle effects. | Frame-synchronized with browser `requestAnimationFrame`. |
| **Complex UI Layer** | Razor / Tailwind CSS / Vite / TypeScript | Menus, HUDs, inventory grids, configuration panels. | Event-driven (DOM-rendered on demand). |
| **Shared Memory Bridge** | Pinned `GCHandle` & `Float32Array` view | Zero-copy 2D transform and coordinate synchronization. | Direct memory read per render frame. |

---

## Repository Shape

- `bonoboWebGame.slnx` is the solution; projects target .NET 10.
- `src/Game.Engine` is a plain C# class library. Keep engine logic independent of UI and platform code. It hosts the Arch ECS (`Game.Engine.ECS`: components, `[Query]` systems, `EcsSimulation`) via vendored `src/Arch` + `src/Arch.Generators` (analyzer only).
- `src/Game.UI` is the shared Razor Class Library. It references `Game.Engine` and owns shared Razor components plus PixiJS assets.
- `src/Game.Tests` is the xUnit v3 test project (determinism self-checks, ECS unit tests, snapshot shape). `src/Game.Tests.Aot` is the TUnit test project (AOT/trim pattern checks over the `Game.Engine` closure). Both are in the solution and run under the Microsoft.Testing.Platform runner opted in via root `global.json` — do not delete that file or `dotnet test` misbehaves on .NET 10.
- `src/Game.Tests.UI` is the Node/TypeScript Playwright E2E suite. Not a `.csproj` — run from its folder via npm. Uses installed Chrome (`channel: 'chrome'`). Config and host setup: see `docs/testing-ui-E2E/index.md`.
- `src/Game.Wasm` is the Blazor WebAssembly host (co-located single-player, ADR-007 Phase 3 zero-copy). Hosts simulations lazily per visited scene. Implements the `[JSImport]`/`[JSExport]` interop bridge with pinned shared memory buffer (`PinnedRenderBuffer`), typed command exports via `WasmInterop`, and the PixiJS provider (wasm-interop.js module).
- `src/Game.Examples` is the example catalog (`ExamplesCatalog.cs`) and `IExampleSims` seam. Referenced by `Game.Wasm`.

- `src/Box2D.NET` is a **vendored** C# physics library, **referenced** by `Game.Engine.csproj` as the authoritative physics world (ADR-002). `src/BrainAI` (pathfinding/AI) remains vendored but **unreferenced** — treat as a target dependency, not active. `src/Temp/` holds upstream samples/demos — not part of the build/solution.
- The PixiJS v8 ecosystem (`pixi.js`, `@pixi/ui`, `@pixi/sound`, `@pixi/tilemap`, `pixi-viewport`, `pixi-filters`, `@spd789562/particle-emitter`) is declared in `src/Game.UI/package.json`. **box2d3-wasm (Box2D v3 WASM)** is optional presentation-physics only (ADR-002).

## Agent References

- `docs/pixijs-documentation-for-llms/pixyjs.md` — complete vendored PixiJS v8 API reference (llm.txt format). Consult it when writing or verifying any PixiJS code; prefer its API facts over memory or generic web knowledge.
- `net-microsoft-documentation` MCP server — official, up-to-date Microsoft Learn docs for .NET, ASP.NET Core, Blazor, and MAUI. Use it for framework/API verification.
Summary of the scope an agent can search using this server:

  1. Programming Languages & RuntimesCore Languages: TypeScript, JavaScript, C#, F#, VB.NET, C++, Python, Java, Rust, PowerShell, Go.Frameworks & Runtimes: .NET Core / .NET 8+, ASP.NET Core, Node.js, React, Angular, Vue, Blazor, MAUI, WPF, WinUI.
  2. Microsoft Developer Tools & SDKsIDEs & Code Editors: Visual Studio, Visual Studio Code, Visual Studio Code Extensions (Copilot, Azure Tools).
  3. CLI & Command Line: Azure CLI (az), Azure Developer CLI (azd), PowerShell modules, Windows Terminal, WSL.
  4. SDKs: Azure SDKs across languages (Python, TypeScript, .NET, Java), Model Context Protocol (MCP) SDKs.

- `docs/2d-games` and `docs/game-development` — game architecture and gamedev workflow references (see `docs/index.md`).
- `docs/architecture/topology.md` — engine topology deep-dive (Implemented vs Target): three-layer runtime, WASM→JS bridge, physics, skeletal pipelines, domain matrix, ecosystem matrix, implementation status.
- `docs/adr/` — Architecture Decision Records. Read before changing cross-boundary, physics, render-bridge, or asset-pipeline decisions.

## Architectural Guardrails

**how data crosses the C#↔JS interop boundary** have been superseded by the migration to the **zero-copy shared memory pipeline**.

---

### Architectural Guardrails Status Matrix

| Guardrail Category | Status | Architectural Impact of the New Interop Layer |
| --- | --- | --- |
| **C# Authority & ECS / Box2D.NET** | **Valid** | C# remains the sole authoritative simulation engine using Arch ECS and `Box2D.NET`. Game logic and physics simulation are never executed in JavaScript. |
| **Transport Layer (`fetch` POST / SSE Streams)** | **Superseded** | The legacy SSE stream (`/api/ecs/stream` pushing JSON `SpriteState[]`) and HTTP POST render bridges are deprecated for rendering. They are replaced by direct, zero-copy `Float32Array` views over the WASM memory heap. |
| **Single-Player Local Default** | **Valid** | Local-buffer builds remain the default (`SINGLE_PLAYER_LOCAL`), avoiding unnecessary network abstraction layers during single-player execution. |
| **Temporal Context & Snapshots** | **Upgraded** | Instead of serializing temporal JSON snapshots over network bridges, hot-path coordinate, rotation, and scale data stream continuously via pinned unmanaged memory pointers (`GCHandle.Alloc` + WebAssembly heap mapping). |
| **Presentation Split (PixiJS v8)** | **Valid** | PixiJS v8 remains strictly responsible for rendering, sprite pools, camera control, and interpolation, reading directly from the shared memory buffer without per-entity interop polling. |

---

## Commands

Build frontend assets before .NET commands. Do not run multiple `dotnet` commands concurrently; static-web-asset compression can race.

Run from repository root:

```powershell
dotnet build bonoboWebGame.slnx
dotnet test          # Game.Tests (xUnit v3) + Game.Tests.Aot (TUnit); MTP runner via global.json
```

Run from `src/Game.UI`:

```powershell
npm ci
npm run build        # DEFAULT: single-player co-located bundle (__RENDER_SOURCE__='local-buffer')
npm run typecheck    # scoped tsconfig.app.json (Frontend) + tsconfig.node.json (vite.config.ts)
```

Run Playwright E2E from `src/Game.Tests.UI` (Node project; needs `npm ci` first):

```powershell
npm ci
npx playwright test        # boots Game.Wasm via dotnet run on port 5902, uses installed Chrome (channel: 'chrome')
npm run typecheck
```

**⚠️ ESM constraint:** `src/Game.Tests.UI/package.json` declares `"type": "module"`. Any standalone `.js` script written in that directory MUST use ESM `import` syntax (not `require()`). Use `.cjs` extension for CommonJS, or run scripts from the repo root. See `docs/testing-ui-E2E/index.md` §Standalone Screenshot Scripts for the corrected pattern (process lifecycle, path resolution, HTTP readiness polling).

For exploratory agent-driven browser work use the `playwright-cli` skill with Chrome: `playwright-cli open <url> --browser=chrome`. A Playwright MCP server is NOT needed — skills + playwright-cli + the checked-in Playwright suite cover this repo (verdict + rationale in `docs/testing-ui-E2E/index.md`).

`Game.UI` scripts build Vite JavaScript first, then Tailwind CSS. Vite reads `Frontend/game.ts` and writes generated files to `src/Game.UI/wwwroot/dist`; do not hand-edit generated output. `npm run watch:js` and `npm run watch:css` are separate long-running watchers.

MAUI builds require .NET MAUI workloads. Platform-specific target frameworks may make full-solution builds depend on host OS and installed workloads.

## Verification Notes

- Test projects: `Game.Tests` (xUnit v3), `Game.Tests.Aot` (TUnit), `Game.Tests.UI` (Playwright, Node-only, not in the solution). Full guide: `docs/testing-ui-E2E/index.md`. `Game.Maui` is temporarily commented out of the solution (web-only builds for speed).
- After touching `Game.UI` RCL assets, kill any running `Game.Wasm.exe` before rebuilding. Static-asset 500s (`_content/Game.UI/dist/*`) = stale/raced `bin`/`obj` static-web-asset output; fix by killing the host and rebuilding (delete `src/Game.Wasm/bin`+`obj` if it persists).
- `bin/`, `obj/`, `node_modules/`, and other build output are ignored. Do not commit them.
- Trust `.csproj`, `.slnx`, `package.json`, and executable build output over setup prose in `README.md`.
- `docs/index.md` describe architecture; `docs/ai-agents/codebase-truth.md` holds verified API facts; record significant decisions in `docs/adr/`.

## Agent Rules

### SHELL_TIMEOUT_600
***Enforcement:** Always run any shell command with a timeout of 600 seconds (600000 ms).
