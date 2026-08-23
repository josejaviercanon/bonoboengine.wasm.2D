// Compile-time render-source selection — the frontend half of ADR-007's flag
// compilation (C# half: `IsMultiplayer`/`IsEcsServerSide` → `SINGLE_PLAYER_LOCAL`).
//
// `__RENDER_SOURCE__` is replaced textually by Vite `define` (see vite.config.ts)
// BEFORE Rollup tree-shaking, so the transport branch that is not selected is
// dead-code-eliminated from the dist bundle. Scenes never ship — or pay for —
// the transport they do not use:
//   npm run build        → 'local-buffer' (co-located Game.Wasm host — DEFAULT,
//                          matches the C# SINGLE_PLAYER_LOCAL default)
//   npm run build:web    → 'sse'          (Game.Web static-SSR + SSE bridge, multiplayer)
//
// `fetch` POST exists ONLY in the 'sse' branch — single-player bundles contain
// zero HTTP client code for input (ADR-007). Never call `fetch` from a scene;
// always route input/start/reset/config commands through `SignalStream.postCommand`.

export type RenderSource = 'sse' | 'local-buffer';

declare global {
    // eslint-disable-next-line no-var
    const __RENDER_SOURCE__: RenderSource;
}

/** Scene CONST: which transport feeds snapshots into the interpolation layer. */
export const RENDER_SOURCE: RenderSource = __RENDER_SOURCE__;

/** Uniform handle over the selected transport; created by `connectSignalStream`. */
export interface SignalStream {
    /** Subscribe to one named signal (SSE event name today); `data` is raw JSON. */
    addSignalListener(eventName: string, onData: (data: string) => void): void;
    /**
     * Subscribe to one named signal as a raw float32 buffer (ADR-007 Phase 3).
     * Only ever fires in `local-buffer` builds — the SSE-branch stub is a no-op,
     * so scenes can register both listeners and stay free of transport
     * branching: only the listener matching the compiled-in transport runs.
     */
    addBufferListener(eventName: string, onData: (floats: Float32Array) => void): void;
    /**
     * Send one player/game command to the simulation (input, start, reset,
     * pause, config…). The ONLY way a scene may talk to the sim.
     * SSE: POST `path` over HTTP (multiplayer — C# validates over the network;
     * `bodyJson` is an optional JSON request body). Rejects on non-2xx.
     * local-buffer: direct in-process provider call (zero HTTP, zero
     * serialization) — the path identifies the command, the body is the raw
     * JSON payload the WASM host deserializes into the typed request.
     */
    postCommand(path: string, bodyJson?: string): Promise<void>;
    /** Tear the stream down (EventSource.close / provider close). */
    close(): void;
    /** Called when the stream is interrupted; SSE reconnects automatically. */
    onInterrupted(handler: () => void): void;
}

/**
 * The co-located WASM host registers a typed-array bridge here (ADR-007
 * Phase 2/3): every signal is delivered as the Float32Array view over the
 * pinned shared buffer written by `DirectRenderTransport`, laid out per
 * `bufferLayout.ts`, and every command is a direct in-process call into the
 * sim's public API (`QueueInput`, `Start`, `Reset`, …) keyed by the same
 * `path` the SSE branch would POST to. Only reachable in local-buffer
 * bundles (DCE'd otherwise).
 */
export interface LocalBufferProvider {
    onSignal(eventName: string, onData: (floats: Float32Array) => void): void;
    /** Direct command: dispatch `path` to the sim in-process, zero HTTP. */
    postCommand?(path: string, bodyJson?: string): void;
    close?(): void;
}

let localBufferProvider: LocalBufferProvider | null = null;

export function registerLocalBufferProvider(provider: LocalBufferProvider): void {
    localBufferProvider = provider;
}

export function connectSignalStream(url: string | undefined): SignalStream | null {
    if (__RENDER_SOURCE__ === 'sse') {
        if (!url) return null;
        const source = new EventSource(url);
        return {
            addSignalListener: (eventName, onData) => {
                source.addEventListener(eventName, (event) =>
                    onData((event as MessageEvent<string>).data));
            },
            // SSE builds carry no typed-array source; registered buffer
            // listeners simply never fire (see SignalStream.addBufferListener).
            addBufferListener: () => { /* no-op in SSE bundles */ },
            // SSE: input goes over HTTP — C# is the sole authority. This is
            // the multiplayer branch; single-player bundles DCE it away.
            postCommand: async (path, bodyJson) => {
                const response = await fetch(path, {
                    method: 'POST',
                    headers: bodyJson !== undefined ? { 'Content-Type': 'application/json' } : undefined,
                    body: bodyJson,
                });
                if (!response.ok) throw new Error(`${path} returned HTTP ${response.status}`);
            },
            close: () => source.close(),
            onInterrupted: (handler) => { source.onerror = () => handler(); }
        };
    }

    // 'local-buffer' branch (default): exists only when the co-located
    // Game.Wasm host registered a provider. `url` is irrelevant in-process.
    const provider = localBufferProvider;
    if (!provider) {
        console.error(
            '[pixi-debug] RENDER_SOURCE is "local-buffer" but no local buffer provider is registered. ' +
            'This bundle must be served by the co-located Game.Wasm host (ADR-007 Phase 2/3). ' +
            'Either run it under that host, or rebuild the frontend with `npm run build:web` (SSE mode).');
        return null;
    }
    const stream: SignalStream = {
        // No JSON-text path in local-buffer bundles; registered text listeners
        // simply never fire (the buffer listener is the live one).
        addSignalListener: () => { /* no-op in local-buffer bundles */ },
        addBufferListener: (eventName, onData) => provider.onSignal(eventName, onData),
        // local-buffer: direct in-process calls — zero HTTP, zero serialization.
        postCommand: async (path, bodyJson) => {
            if (!provider.postCommand) {
                console.warn(`[pixi-debug] local provider has no command handler for ${path}`);
                return;
            }
            provider.postCommand(path, bodyJson);
        },
        close: () => provider.close?.(),
        onInterrupted: () => { /* in-memory bridge never disconnects */ }
    };
    // Lazily create the matching simulation on the co-located host (ADR-007
    // Phase 2): unvisited games never start their 60 Hz timers.
    postConnectHandshake(stream, url);
    return stream;
}

/**
 * ADR-007 Phase 2: the co-located host creates simulations lazily, so each
 * scene announces itself on connect. The SSE stream URL (`/api/{game}/stream`)
 * is the only game identity the scene carries in both transport shapes —
 * derive the game key from it and post the no-op `/api/{game}/connect`
 * command. In SSE bundles this helper does nothing (the server sims always run).
 */
function postConnectHandshake(stream: SignalStream, url: string | undefined): void {
    if (__RENDER_SOURCE__ !== 'local-buffer') return;
    const gameKey = url?.match(/^\/?api\/([a-z-]+)\/stream$/)?.[1];
    if (!gameKey) return;
    void stream.postCommand(`/api/${gameKey}/connect`);
}

