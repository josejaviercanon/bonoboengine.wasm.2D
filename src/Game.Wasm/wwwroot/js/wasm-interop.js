let _provider = null;
let _exports = null;

export function notifyRender(eventName, bufferPtr, floatCount) {
    const runtime = globalThis.getDotnetRuntime(0);
    if (!runtime) return;
    const heap = runtime.localHeapViewF32();
    const floats = new Float32Array(heap.buffer, bufferPtr, floatCount);
    dispatchFloats(eventName, floats);
}

function dispatchFloats(eventName, floats) {
    if (_provider && _provider._listeners && _provider._listeners[eventName]) {
        for (const cb of _provider._listeners[eventName]) {
            cb(floats);
        }
    }
}

/**
 * One-shot scene-boot helpers. The co-located WASM host exposes scene
 * controllers (WasmInterop.*) as JSImport targets; the browser calls them
 * through the local-buffer provider instead of HTTP. Each scene owns its
 * own setup entry so initial state can be re-injected before the
 * simulation starts ticking.
 */
function setupRacerInitialFastLap(seconds) {
    const w = _exports?.Game?.Wasm?.WasmInterop;
    if (!w || typeof w.RacerSetInitialFastLapTime !== 'function') return;
    w.RacerSetInitialFastLapTime(seconds);
}

function postCommand(path, bodyJson) {
    const parts = path.replace(/^\/+/, '').split('/');
    if (parts.length < 3) return;
    const game = parts[1];
    const action = parts[2];
    const w = _exports.Game.Wasm.WasmInterop;
    switch (game) {
        case 'tetris':
            if (action === 'connect') w.ConnectGame(game);
            else if (action === 'start') w.StartGame(game);
            else if (action === 'restart') w.RestartGame(game);
            else if (action === 'input') {
                const cmd = bodyJson ? JSON.parse(bodyJson).command || '' : '';
                w.TetrisInput(cmd);
            }
            break;
        case 'snake':
            if (action === 'connect') w.ConnectGame(game);
            else if (action === 'start') w.StartGame(game);
            else if (action === 'restart') w.RestartGame(game);
            else if (action === 'input') {
                const dir = bodyJson ? JSON.parse(bodyJson).direction || '' : '';
                w.SnakeInput(dir);
            }
            break;
        case 'breakout':
            if (action === 'connect') w.ConnectGame(game);
            else if (action === 'start') w.StartGame(game);
            else if (action === 'restart') w.RestartGame(game);
            else if (action === 'input') {
                const req = bodyJson ? JSON.parse(bodyJson) : {};
                w.BreakoutInput(!!req.left, !!req.right, !!req.launch);
            }
            break;
        case 'asteroids':
            if (action === 'connect') w.ConnectGame(game);
            else if (action === 'start') w.StartGame(game);
            else if (action === 'restart') w.RestartGame(game);
            else if (action === 'input') {
                const req = bodyJson ? JSON.parse(bodyJson) : {};
                w.AsteroidsInput(!!req.thrust, !!req.left, !!req.right, !!req.fire, !!req.hyperspace);
            }
            break;
        case 'pacman':
            if (action === 'connect') w.ConnectGame(game);
            else if (action === 'start') w.StartGame(game);
            else if (action === 'restart') w.RestartGame(game);
            else if (action === 'input') {
                const dir = bodyJson ? JSON.parse(bodyJson).direction || '' : '';
                w.PacmanInput(dir);
            }
            break;
        case 'racer':
            if (action === 'connect') w.ConnectGame(game);
            else if (action === 'start') w.StartGame(game);
            else if (action === 'restart') w.RestartGame(game);
            else if (action === 'pause') w.PauseGame(game);
            else if (action === 'resume') w.ResumeGame(game);
            else if (action === 'input') {
                const req = bodyJson ? JSON.parse(bodyJson) : {};
                w.RacerInput(!!req.left, !!req.right, !!req.faster, !!req.slower);
            }
            else if (action === 'config') {
                const cfg = bodyJson ? JSON.parse(bodyJson) : {};
                w.RacerConfig(
                    cfg.lanes || 4, cfg.roadWidth || 400, cfg.cameraHeight || 800,
                    cfg.drawDistance || 100, cfg.fieldOfView || 120,
                    cfg.fogDensity || 0.03, cfg.resolutionScale || 1.0
                );
            }
            break;
    }
}

export function setupProvider(exports) {
    _exports = exports;
    _provider = {
        _listeners: {},
        onSignal(eventName, onData) {
            if (!this._listeners[eventName]) this._listeners[eventName] = [];
            this._listeners[eventName].push(onData);
        },
        postCommand,
        // One-shot scene-boot helpers. local-buffer bundles reach the C# sim
        // here; the SSE/web branch never invokes them (no provider in that
        // build path), so this stays the single-player side of ADR-007.
        setupRacerInitialFastLap,
        close() {}
    };

    if (typeof window.registerLocalBufferProvider === 'function') {
        window.registerLocalBufferProvider(_provider);
    } else {
        window.addEventListener('pixi-bundle-ready', () => {
            window.registerLocalBufferProvider(_provider);
        }, { once: true });
    }
}