# R1 — Library Stack & Install Commands
> **Category:** Reference · **Related:** [E1 Architecture Overview](../E/E1_architecture_overview.md) · [R2 Capability Matrix](./R2_capability_matrix.md) · [R3 Project Structure](./R3_project_structure.md)

---

## Tier 0: Core Architecture (always included)

The simulation core is a pure .NET 10 class library with **zero** UI/platform dependencies. Arch ECS is vendored as **source** under `src/Arch/` (core, systems, event bus, persistence, relationships, AOT source generator) — it is **not** a NuGet package — and linked into `Game.Engine` via `ProjectReference`. Source generation is wired through `src/Arch.Generators/` (a `netstandard2.0` Roslyn analyzer pack) referenced from `Game.Engine` as an analyzer.

| Concern | Provider | Location |
|---------|----------|----------|
| Simulation runtime | .NET 10 (`net10.0`) | `src/Game.Engine/Game.Engine.csproj` |
| ECS (core + systems) | Arch — vendored source | `src/Arch/Arch.csproj` → `ProjectReference` |
| System / AOT source gen | Arch source generators | `src/Arch.Generators/` (analyzer, `OutputItemType="Analyzer"`) |
| Serialization | System.Text.Json (built-in .NET) + source generators | no package |

```xml
<!-- src/Game.Engine/Game.Engine.csproj (relevant refs) -->
<ItemGroup>
  <ProjectReference Include="..\Arch\Arch.csproj" />
</ItemGroup>
<ItemGroup>
  <Analyzer Include="..\Arch.Generators\Arch.Generators.csproj" />
</ItemGroup>
```

> **No NuGet for Arch.** Do not `dotnet add package Arch` — this repo vendors the source. Update Arch by pulling upstream into `src/Arch/`.
> **AOT:** Arch's AOT source generator ships through `Arch.Generators`; no separate `Arch.AOT.SourceGenerator` package is required.
> **No native game-framework runtime.** There is no native game-framework reference anywhere. The core has no `Game` class, no `GraphicsDevice`, no `Content.Load<T>`.

---

## Tier 1: Presentation Layer (PixiJS + Tailwind)

The presentation layer is a plain class library (`src/Game.UI`, `Microsoft.NET.Sdk`, non-Razor) that references `Game.Engine` and owns the PixiJS v8 frontend. `Game.Engine.Generators` is a Roslyn analyzer + source generator project that enforces the zero-copy float32 layout contract: `[TypeScriptExport]` attribute, `LayoutAlignmentAnalyzer` (BNOBO001 stride mismatch, BNOBO002 unsupported field), and `TypeScriptInterfaceGenerator` emitting `GeneratedSignalLayout` + `[ModuleInitializer]` static assert + generated TypeScript at `src/Game.UI/Frontend/scenes/generated/signalLayout.ts`.

| Concern | Provider | Version | Notes |
|---------|----------|---------|-------|
| 2D rendering | PixiJS | ^8.19.0 | WebGL/WebGPU; bundled by Vite → `wwwroot/dist` |
| JS build | Vite + TypeScript | ^6.3.5 / ^5.8.3 | ESM bundle (`Frontend/game.ts`) |
| CSS / theme | Tailwind CSS v4 (`@tailwindcss/vite`) | ^4.3.3 | responsive HUD/menus |
| Layout sync | `Game.Engine.Generators` | — | Roslyn analyzer + source gen; validates float32 stride, emits TS types |
| Fonts / text | PixiJS Text + web fonts | — | no runtime font library |

```bash
# Frontend deps live in src/Game.UI/package.json, not in the .NET project
cd src/Game.UI
npm ci
npm run build     # Vite JS build → wwwroot/dist
```

> **Zero-copy shared-memory bridge:** C# pins transform buffers via `GCHandle.Alloc(..., GCHandleType.Pinned)`. JS projects a `Float32Array` view over `WebAssembly.Memory.buffer` and reads sprite transforms directly — no per-entity interop calls, no JSON serialization. `[JSImport] notifyRender` signals the render frame. See `FLOAT32_LAYOUT_SYNC` rule.
> **No `Content.Load<T>` / MGCB.** Assets are bundled by Vite and resolved client-side by PixiJS by key/id.

---

## Tier 2: Hosts & Future Server

| Concern | Provider | Notes |
|---------|----------|-------|
| Browser-WASM host | `src/Game.Wasm` — `Microsoft.NET.Sdk.WebAssembly` (non-Blazor) | boots via `import { dotnet } from './_framework/dotnet.js'`; hosts simulations per scene |
| Simulation catalog | `src/Game.Examples` — `ExamplesCatalog.cs` + `IExampleSims` seam | referenced by `Game.Wasm` |
| Future server | ASP.NET Core + WebSockets/SignalR | runs the **same** `Game.Engine` authoritatively (phase 2) |
| Networking (future) | ASP.NET Core SignalR / raw WebSockets | web transport — not a native UDP library |

```bash
dotnet run --project src/Game.Wasm      # run browser-wasm host (serves on localhost)
# No MAUI target — web-only builds for speed (Game.Maui temporarily commented out of solution)
```

---

## Tier 3: Optional / Engine-Agnostic C# Libraries

C# libraries with **no** native game-framework dependency that you may vendor or add **inside `Game.Engine`** (never in the presentation layer) when a feature is needed. They are optional and not part of the MVP.

| Concern | Library | Notes |
|---------|---------|-------|
| ECS world serialization | Arch.Persistence (vendored in `src/Arch/`) | save/load entire worlds |
| Entity relationships | Arch.Relationships (vendored) | party/squads/parent-child |
| AI (FSM/BT/GOAP) | BrainAI (GitHub source) | engine-agnostic C#; vendor as source |
| Pathfinding | Roy-T.AStar (NuGet) | standalone A*; no framework dependency |
| Coroutines | Ellpeck/Coroutine (NuGet) | Unity-style yield; C# only |
| Debug overlays | browser DevTools / PixiJS debug | no ImGui needed on web |

```bash
# Roy-T.AStar: dotnet add package RoyT.AStar
# BrainAI: clone from GitHub, vendor as source inside src/Game.Engine
```

> **Rule:** any C# library added for simulation must stay inside `Game.Engine` and remain free of UI/platform deps. Presentation concerns (audio, rendering, input) are handled client-side by PixiJS + TypeScript, not by C# libraries.

---

## Serialization Note

**System.Text.Json** with source generators replaces both Newtonsoft.Json and Nez.Persistence. It's built into .NET — no package needed. Use `[JsonSerializable]` attributes for AOT-compatible serialization.

If you specifically need Newtonsoft.Json for compatibility: `dotnet add package Newtonsoft.Json --version 13.0.3`

---

## Custom Code (No Package Needed)

These are written as part of your project. ~1,000 lines total, ~14.5 hours of work. See [G1 Custom Code Recipes](../G/G1_custom_code_recipes.md) for implementation.

| Module | ~Lines |
|--------|--------|
| Scene manager | 150 |
| Render layer system | 200 |
| SpatialHash broadphase | 80 |
| Collision shapes (AABB, circle, polygon) | 150 |
| Tween system | 100 |
| Screen transitions | 100 |
| Post-processor pipeline | 150 |
| Object pool | 30 |
| Line renderer | 50 |

---

## Platform Hosts (no native game-framework runtime)

The engine ships no native game-framework runtime. The sole host target is the non-Blazor browser-WASM host (`src/Game.Wasm`, `Microsoft.NET.Sdk.WebAssembly`). There is no MAUI host, no Blazor Web App host, and no MGCB content pipeline. The `src/Game.UI` library is a plain class library (non-Razor) — assets are bundled by Vite, served as static web assets, and loaded by PixiJS client-side.

| Host | TFM | Notes |
|------|-----|-------|
| `src/Game.Wasm` | `net10.0-browser` | non-Blazor WASM host; bootstraps via `dotnet.js`; simulates per scene |

```bash
dotnet run --project src/Game.Wasm
```

> **No MAUI, no Blazor, no native platform SDKs.** `Game.Maui` is temporarily commented out of the solution. All builds target WASM in browser. Assets are bundled by Vite (`src/Game.UI/wwwroot/dist`) and served as static web assets. Layout sync is enforced by `Game.Engine.Generators` — see `FLOAT32_LAYOUT_SYNC` rule.

See [R3 Project Structure](./R3_project_structure.md) for the actual repo layout.