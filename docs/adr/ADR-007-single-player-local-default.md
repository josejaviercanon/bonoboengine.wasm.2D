# ADR-007: Single-Player-Local Is the Default Build

**Date:** 2026-08-21
**Status:** Accepted

## Context

The engine must run the same game code in two transport shapes: a
server-authoritative multiplayer/web host (static-SSR `Game.Web` pushing SSE
snapshots, receiving `fetch` POST input) and a co-located single-player host
`Game.Wasm` host where the C# sim runs in-process next to PixiJS.

Two defaults had drifted apart:

- C# (`Game.Engine.csproj`) already defaulted both `IsMultiplayer` and
  `IsEcsServerSide` to `false`, so `SINGLE_PLAYER_LOCAL` was defined by default —
  but the comment claimed the opposite (stale).
- TypeScript (`vite.config.ts`) defaulted `__RENDER_SOURCE__` to `'sse'`, and
  five scenes (`snake`, `breakout`, `asteroids`, `pacman`, `racer`) called
  `fetch(…, { method: 'POST' })` directly, so single-player bundles still shipped
  HTTP client code and could "fall back" to network calls.

Per ADR-001/ADR-006, C# is the sole authoritative simulation; input is a
suggestion the sim validates. The transport for that suggestion must never be
implicit.

## Options Considered

1. **New input layer/library** (dedicated input pipeline, event bus, or
   library on the WASM side) — rejected: the existing `SignalStream` /
   `LocalBufferProvider` seam in `signalSource.ts` already covers the shape;
   a new layer adds indirection without new capability.
2. **Runtime branching with `fetch` fallback** — rejected: ships network code
   in single-player bundles and violates "never fall back to POST".
3. **Compile-time transport selection, single-player as the default** —
   chosen: same `__RENDER_SOURCE__` / `SINGLE_PLAYER_LOCAL` flag pair already
   used for render signals, extended to commands.

## Decision

- **`SINGLE_PLAYER_LOCAL` is the default C# compilation constant.**
  `Game.Engine.csproj` defines it unless `/p:IsMultiplayer=true` or
  `/p:IsEcsServerSide=true` is passed explicitly. It governs the simulation
  side (transport choice: in-process vs server) and rendering side alike.
- **`local-buffer` is the default Vite render source.** `npm run build`
  produces the co-located WASM bundle. `npm run build:web` (`--mode web`) is
  the multiplayer/SSE build. `__RENDER_SOURCE__` is replaced before
  tree-shaking, so the unused transport branch is dead-code-eliminated.
- **Scenes never call `fetch`.** All commands (input, start, reset, pause,
  config) route through `SignalStream.postCommand(path, bodyJson?)`:
  - `'sse'` branch: `fetch POST` (multiplayer — C# validates over network).
  - `'local-buffer'` branch: direct in-process `LocalBufferProvider.postCommand`
    call, keyed by the same path. The `Game.Wasm` host (Phase 2/3) maps each
    path to the sim's public API (`QueueInput`, `Start`, `Reset`, …).
- **No new layer, library, or project.** `LocalBufferProvider` is the seam;
  the WASM host registers a provider wrapping the sim API. The TS interface is
  ready before the host exists.

## Consequences

- Single-player bundles contain zero HTTP POST client code (verified: default
  bundle has no `method:"POST"`, no `EventSource`; endpoint paths remain only
  as in-process command keys).
- Multiplayer is explicit: web host + `npm run build:web` + msbuild flags.
- `Game.Web` demos require `npm run build:web` for the SSE bundle; the default
  build is for the co-located host.
- Input commands carry a JSON `bodyJson` string in both branches; the WASM
  host deserializes it into the typed request (`TetrisInputRequest`,
  `SnakeInputRequest`, `BreakoutInputRequest`, `AsteroidsInputRequest`,
  `PacmanInputRequest`, `RacerInputRequest`/`RacerConfigRequest`).

## Implementation Status (Phase 2/3 — 2026-08-22)

Implemented. The co-located `Game.Wasm` host delivers render signals as float32
buffers (no JSON, no reflection, no per-entity interop):

- `Game.Engine/ECS/SignalBuffer.cs` — canonical layout constants +
  `SignalBufferEncoders` (one `FloatLength`/`Encode` pair per signal). The TS
  mirror is `Frontend/scenes/bufferLayout.ts`; the two files are the contract.
- `Game.Engine/ECS/DirectRenderTransport.cs` — encodes each signal into a
  growable byte buffer and delivers `(eventName, byte[], floatCount)`; `OnSignal`
  still fires so the SSE host contract is unchanged. The unused JSON-based
  `LocalRenderTransport` was deleted.
- `Game.Wasm/WasmRenderBridge.cs` + `wwwroot/index.html` — bytes cross via
  Blazor's optimized byte-array JS interop (`Uint8Array`), wrapped into a
  `Float32Array` view and dispatched to the scene's buffer listeners.
- `Game.Wasm/SimHost.cs` — sims are created lazily (example page render or the
  `/api/{game}/connect` handshake posted by `connectSignalStream` in
  local-buffer bundles); unvisited games never start their 60 Hz timers. This
  plus the old per-signal JSON path was the cause of a 60→2 FPS collapse.
- `Game.Examples/ExampleSims.cs` (`IExampleSims`) — example pages access sims
  through a host-supplied accessor (`SimHost` in `Game.Wasm`, `ServerExampleSims`
  adapter in `Game.Web`).
- `CommandJsonContext` source-generated JSON (AOT-safe) for command bodies;
  Release publishes set `RunAOTCompilation`/`WasmStripIL`.
- All seven scenes have `addBufferListener` decoders; SSE listeners coexist
  (dead-code-eliminated per bundle mode).

Not yet done: `HEAPF32` zero-copy (the byte-array copy is memcpy-speed and
measured at 60 FPS interpreted), scene-exit disposal of visited sims.
