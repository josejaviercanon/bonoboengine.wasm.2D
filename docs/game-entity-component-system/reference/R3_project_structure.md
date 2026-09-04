# R3 — Project Structure
> **Category:** Reference · **Related:** [R1 Library Stack](./R1_library_stack.md) · [E1 Architecture Overview](../architecture/E1_architecture_overview.md)

---

## Solution Layout

```
bonoboengine.wasm.2D/
├── bonoboWebGame.slnx              # .NET 10 XML solution
├── src/
│   ├── Game.Engine/                # Pure C# class lib (net10.0) — authoritative simulation
│   │   ├── Game.Engine.csproj      # refs Arch.csproj + Arch.Generators (analyzer) + vendored Box2D.NET
│   │   ├── Components/             # Pure data structs (Position, Velocity, BulletData...)
│   │   ├── Systems/                 # Arch systems (MovementSystem, CollisionSystem...)
│   │   ├── Tags/                    # Zero-size markers (PlayerTag, EnemyTag, ProjectileTag...)
│   │   ├── Events/                  # Delta event types emitted to the presentation layer
│   │   ├── Commands/                # Input/action command types consumed by ProcessCommand
│   │   └── ECS/                     # EcsSimulation, SignalBuffer, zero-copy layout types
│   │
│   ├── Game.Engine.Generators/     # Roslyn analyzer + source generator (netstandard2.0)
│   │   ├── LayoutAlignmentAnalyzer # FLOAT32_LAYOUT_SYNC (BNOBO001/BNOBO002)
│   │   └── TypeScriptInterfaceGenerator  # Emits GeneratedSignalLayout + signalLayout.ts
│   │
│   ├── Game.UI/                     # Shared class library (non-Razor) — refs Game.Engine
│   │   ├── Frontend/                # PixiJS/TypeScript source (Vite entry: game.ts)
│   │   ├── wwwroot/dist/            # Generated JS/CSS — DO NOT hand-edit
│   │   └── Game.UI.csproj
│   │
│   ├── Game.Examples/              # Example catalog + IExampleSims seam
│   │   └── ExamplesCatalog.cs
│   │
│   ├── Game.Wasm/                   # Non-Blazor browser-wasm host (Microsoft.NET.Sdk.WebAssembly)
│   │   ├── Program.cs               # SimHost + WasmInterop.Initialize
│   │   ├── WasmInterop.cs           # [JSImport]/[JSExport] interop bridge
│   │   ├── SimHost.cs               # Lazy per-scene simulation host
│   │   └── wwwroot/                 # Static assets + wasm-interop.js + main.mjs bootstrap
│   │
│   ├── Game.Tests/                 # xUnit v3 tests (determinism, ECS, snapshot shape)
│   ├── Game.Tests.Aot/             # TUnit AOT/trim pattern tests
│   ├── Game.Tests.UI/              # Playwright E2E suite (Node — not in the .NET solution)
│   │
│   ├── Box2D.NET/                   # Vendored C# physics library (authoritative, ADR-002)
│   ├── BrainAI/                     # Vendored pathfinding/AI (unreferenced — target dependency)
│   ├── Arch/                        # Vendored Arch ECS source (net10.0, T4 templates)
│   │   └── Arch.csproj
│   ├── Arch.Generators/             # Roslyn analyzer pack (links Arch source generators)
│   │   └── Arch.Generators.csproj   # netstandard2.0, OutputItemType="Analyzer"
│   └── Temp/                        # Upstream samples/demos (not part of the build/solution)
│
└── docs/
    ├── index.md                     # Architecture source of truth
    ├── adr/                         # Architecture Decision Records
    ├── 2d-games/                    # Complete 2D engine knowledge base
    ├── game-development/            # Engine-agnostic subset
    └── game-entity-component-system/# Mirrored toolkit (guides/ + reference/) + Bonobo ECS rules
```

---

## Key Principles

**`Game.Engine` holds the entire authoritative simulation** with zero UI/platform dependencies. The simulation is pure C# with no browser, MAUI, or presentation framework references.

**`Game.Engine/Components/` is for Arch-specific data.** Components are pure `struct` value types (no methods). `Systems/` are stateless Arch query systems. `Tags/` are zero-size markers.

**`Game.Engine/Systems/` is for game logic.** Inventory, dialogue, crafting, combat — custom C# modules that run inside the simulation tick. They must never touch platform APIs, browser interop, or UI code.

**`Game.Engine.Generators/` enforces the zero-copy float32 layout contract.** A Roslyn analyzer errors on stride mismatch (`BNOBO001`) and unsupported field types (`BNOBO002`). A source generator emits `GeneratedSignalLayout` + a `[ModuleInitializer]` boot-time static assert cross-checking `SignalBufferLayout`, plus the TypeScript half (`signalLayout.ts`).

**`Game.UI/` is the presentation layer.** Tailwind CSS for HUD/menus; PixiJS (bundled by Vite to `wwwroot/dist`) for the 2D canvas. Transform data crosses from C# via the pinned shared-memory buffer — no per-frame interop calls.

**`Game.Wasm/` is the sole browser host.** Non-Blazor `Microsoft.NET.Sdk.WebAssembly`. Bootstraps via `import { dotnet } from './_framework/dotnet.js'`. Uses `[JSImport]`/`[JSExport]` for typed interop and a pinned `GCHandle` buffer for zero-copy transform streaming.

**`Frontend/` is the asset pipeline.** Vite bundles sprites/audio/data into `wwwroot/dist`; there is no MGCB and no `Content.Load<T>`. Assets are resolved client-side by PixiJS by key/id.

---

## Host Platforms

The engine ships a single browser-wasm host. There is no per-platform game class, no `UIApplicationDelegate`, and no raw iOS bootstrapping.

### Game.Wasm (Non-Blazor Browser-Wasm Host)

`Microsoft.NET.Sdk.WebAssembly` host. `Program.cs` creates `SimHost` and calls `WasmInterop.Initialize(sims)`. Simulations are created lazily per visited scene, so only the game you open pays the 60 Hz tick cost. The PixiJS canvas is bootstrapped by `main.mjs` which calls `import { dotnet } from './_framework/dotnet.js'`.

```csharp
// src/Game.Wasm/Program.cs
using Game.Wasm;

[assembly: System.Runtime.Versioning.SupportedOSPlatform("browser")]

var sims = new SimHost();
WasmInterop.Initialize(sims);
```

Render signals travel as float32 buffers: `DirectRenderTransport` encodes each batched signal into the canonical layout (`SignalBuffer.cs` ↔ `bufferLayout.ts`), writes into a pinned `GCHandle` `float[]`, and notifies JS via `[JSImport]("notifyRender")` — JS reads a `Float32Array` view over the WASM heap. Zero copies, no JSON, no reflection.

### Build & Run

```bash
# 1. Build frontend assets first
cd src/Game.UI
npm ci
npm run build
cd ../..

# 2. Build and run the browser-wasm host
dotnet watch --project src/Game.Wasm

# AOT publish for production
dotnet publish src/Game.Wasm -c Release
```

> **Frontend first.** Run `npm run build` in `src/Game.UI` before `dotnet build` so static web assets are present. Never run multiple `dotnet` commands concurrently (static-web-asset compression can race).
> **Generated output.** `wwwroot/dist` is produced by Vite/Tailwind — never hand-edit or commit it.
