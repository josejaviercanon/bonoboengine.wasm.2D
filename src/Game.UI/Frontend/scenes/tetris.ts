import { Graphics, Text, TextStyle } from 'pixi.js';
import type { SceneBuilder } from './types';
import { SnapshotBuffer, lerp } from './interpolation';
import { connectSignalStream, type SignalStream } from './signalSource';
import { BUFFER_HEADER_LENGTH, floatBool, type EntityDecoder } from './bufferLayout';

interface TetrisSpriteState {
    id: number;
    x: number;
    y: number;
    r: number;
    g: number;
    b: number;
}

interface TetrisRenderSignal {
    seq: number;
    entityCount: number;
    tickMs: number;
    stepMs?: number;
    epoch?: number;
    sprites: TetrisSpriteState[];
    score: number;
    rows: number;
    level: number;
    gameOver: boolean;
    started: boolean;
    locked: boolean;
    linesCleared: number;
}

interface TetrisSceneParams {
    /** Nested tetris state from the SSR payload (camelCase of TetrisScenePayload). */
    tetris?: {
        sprites?: TetrisSpriteState[];
        score?: number;
        rows?: number;
        level?: number;
        gameOver?: boolean;
        started?: boolean;
        gridWidth?: number;
        gridHeight?: number;
        cellSize?: number;
        streamUrl?: string;
    };
}

const KEY_TO_COMMAND: Record<string, string> = {
    ArrowLeft: 'left',
    a: 'left',
    A: 'left',
    ArrowRight: 'right',
    d: 'right',
    D: 'right',
    ArrowUp: 'rotate',
    w: 'rotate',
    W: 'rotate',
    ArrowDown: 'down',
    s: 'down',
    S: 'down',
};

const dbg = (...args: unknown[]) => console.log('[pixi-debug] tetris:', ...args);

// Shared-memory float32 layout (ADR-007 Phase 3) — must match the C#
// DirectRenderTransport writer (Phase 2). See scenes/bufferLayout.ts.
//   floats[0..5]  standard header (seq, epoch, entityCount, stride, stepMs, tickMs)
//   floats[6..9]  tetris extras (score, rows, level, gameOver)
//   floats[10..11] tetris flags (started, locked)
//   floats[12]    linesCleared
//   floats[13..]  entities × stride 6 (id, x, y, r, g, b)
const TETRIS_BUFFER_EXTRAS = 8;
const TETRIS_BUFFER_ENTITY_BASE = BUFFER_HEADER_LENGTH + TETRIS_BUFFER_EXTRAS;

const decodeTetrisSprite: EntityDecoder<TetrisSpriteState> = (floats, offset) => ({
    id: floats[offset],
    x: floats[offset + 1],
    y: floats[offset + 2],
    r: floats[offset + 3],
    g: floats[offset + 4],
    b: floats[offset + 5],
});

/**
 * Tetris scene: the C# simulation owns the court (a set of TetrisBlock ECS entities)
 * and pushes one batched signal per board mutation over SSE. This scene only renders
 * cells, forwards key input to the sim as a suggestion, and shows score/rows/game-over.
 * C# is the sole authority.
 */
export const tetrisScene: SceneBuilder = (app, params) => {
    const t = ((params ?? {}) as TetrisSceneParams).tetris ?? {};
    app.renderer.background.color = '#020617';

    const gridWidth = t.gridWidth ?? 10;
    const gridHeight = t.gridHeight ?? 20;
    const cellSize = t.cellSize ?? 30;
    const boardWidth = gridWidth * cellSize;
    const boardHeight = gridHeight * cellSize;

    const board = new Graphics();
    const scale = Math.min(app.screen.width / boardWidth, app.screen.height / boardHeight);
    board.scale.set(scale);
    board.x = (app.screen.width - boardWidth * scale) / 2;
    board.y = (app.screen.height - boardHeight * scale) / 2;
    app.stage.addChild(board);

    const border = new Graphics();
    border.rect(0, 0, boardWidth, boardHeight).stroke({ width: 4, color: '#8B0000' });
    border.scale.set(scale);
    border.x = board.x;
    border.y = board.y;
    app.stage.addChild(border);

    const scoreText = new Text({
        text: 'Score: 0  Rows: 0  Level: 1',
        style: new TextStyle({ fontFamily: 'Arial', fontSize: 18, fontWeight: 'bold', fill: '#e2e8f0' }),
    });
    scoreText.anchor.set(1, 0);
    scoreText.position.set(app.screen.width - 16, 12);
    app.stage.addChild(scoreText);

    const overlay = document.createElement('div');
    overlay.style.cssText =
        'position:fixed;top:52px;left:0;right:0;bottom:0;display:flex;flex-direction:column;' +
        'align-items:center;justify-content:center;gap:1rem;background:rgba(2,6,23,0.55);z-index:5;';
    const overlayTitle = document.createElement('div');
    overlayTitle.style.cssText = 'font:bold 2rem sans-serif;color:#f97316;text-align:center;';
    const startButton = document.createElement('button');
    startButton.type = 'button';
    startButton.textContent = 'START GAME';
    startButton.style.cssText =
        'background-color:#f97316;color:#020617;border:none;border-radius:0.5rem;' +
        'padding:0.75rem 2rem;font-size:1.1rem;font-weight:bold;cursor:pointer;';
    const hint = document.createElement('div');
    hint.style.cssText = 'color:#94a3b8;font:0.85rem sans-serif;';
    hint.textContent = 'or press SPACE';
    overlay.append(overlayTitle, startButton, hint);
    document.body.appendChild(overlay);

    let started = t.started ?? false;
    let gameOver = t.gameOver ?? false;
    let score = t.score ?? 0;
    let rows = t.rows ?? 0;
    let level = t.level ?? 1;
    let prevGameOver = gameOver;
    let stepMs = 1000 / 60;
    const interpolation = new SnapshotBuffer<TetrisSpriteState>();
    let stream: SignalStream | null = null;

    const logTransitions = () => {
        if (gameOver && !prevGameOver) dbg('game ended (ECS signal) - score', score);
        prevGameOver = gameOver;
    };

    const updateOverlay = () => {
        if (started && !gameOver) {
            overlay.style.display = 'none';
            return;
        }
        overlay.style.display = 'flex';
        overlayTitle.textContent = gameOver ? `GAME OVER - SCORE: ${score}` : 'TETRIS';
        startButton.textContent = gameOver ? 'PLAY AGAIN' : 'START GAME';
    };

    const startGame = () => {
        if (started && !gameOver) return;
        dbg('starting game (button or space)');
        stream?.postCommand('/api/tetris/start').catch((err) => console.error('[pixi-debug] tetris start failed:', err));
        started = true;
        gameOver = false;
        updateOverlay();
    };
    startButton.addEventListener('click', startGame);

    const draw = (alpha: number) => {
        board.clear();
        for (const entry of interpolation.values()) {
            const state = entry.current;
            const x = lerp(entry.previous.x, state.x, alpha);
            const y = lerp(entry.previous.y, state.y, alpha);
            board.rect(x - cellSize / 2, y - cellSize / 2, cellSize, cellSize)
                .fill((state.r << 16) | (state.g << 8) | state.b);
        }
    };

    const setGameState = (nextScore: number, nextRows: number, nextLevel: number, over: boolean, isStarted: boolean) => {
        scoreText.text = `Score: ${nextScore}  Rows: ${nextRows}  Level: ${nextLevel}`;
        score = nextScore;
        rows = nextRows;
        level = nextLevel;
        gameOver = over;
        started = isStarted;
        logTransitions();
        updateOverlay();
    };

    interpolation.ingest(t.sprites ?? []);
    // First draw happens on the first ticker frame (ingest marked the buffer dirty).
    // Redraw only when a fresh snapshot arrived or interpolation is still in
    // flight; idle frames (start overlay / game over / paused) are skipped.
    const onTicker = () => {
        const alpha = interpolation.advance(stepMs);
        if (alpha !== null) draw(alpha);
    };
    app.ticker.add(onTicker);
    setGameState(score, rows, level, gameOver, started);

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            if (started && !gameOver) {
                // During active gameplay: space = hard drop, enter = rotate
                const command = event.key === ' ' ? 'hardDrop' : 'rotate';
                dbg('input command:', command);
                stream?.postCommand('/api/tetris/input', JSON.stringify({ command }))
                    .catch((err) => console.error('[pixi-debug] tetris input failed:', err));
            } else {
                startGame();
            }
            return;
        }
        const command = KEY_TO_COMMAND[event.key];
        if (!command) return;
        event.preventDefault();
        dbg('input command:', command);
        stream?.postCommand('/api/tetris/input', JSON.stringify({ command }))
            .catch((err) => console.error('[pixi-debug] tetris input failed:', err));
    };
    window.addEventListener('keydown', onKeyDown);

    // SSE requires a stream URL; local-buffer ignores it (in-process provider).
    stream = connectSignalStream(t.streamUrl);
    if (!stream) return;

    // SSE path: JSON text signals (multiplayer/server-authoritative).
    stream.addSignalListener('tetris-move', (data) => {
        try {
            const signal = JSON.parse(data) as TetrisRenderSignal;
            stepMs = Math.max(1, signal.stepMs ?? 1000 / 60);
            // Always purge falling-piece entries (ids < 1000) before ingesting.
            // Prevents stale ghost blocks when the piece rotates or moves.
            interpolation.removeWhere(id => id < 1000);
            interpolation.ingest(signal.sprites, signal.seq, signal.epoch);
            setGameState(signal.score, signal.rows, signal.level, signal.gameOver, signal.started);
            if (signal.locked) dbg('ECS event: piece locked, cleared lines', signal.linesCleared);
        } catch (err) {
            console.error('[pixi-debug] tetris-move parse failed:', err);
        }
    });

    // ADR-007 Phase 3: float32 buffer decoder for SINGLEPLAYER co-located host.
    // Decoded straight from shared-memory Float32Array — no JSON.parse, no network.
    // Only fires in `--mode wasm` bundles; both listeners coexist without branching.
    stream.addBufferListener('tetris-move', (floats) => {
        try {
            const header = interpolation.ingestFromBuffer(floats, decodeTetrisSprite, TETRIS_BUFFER_ENTITY_BASE);
            if (!header) return;
            stepMs = Math.max(1, header.stepMs);
            // Always purge falling-piece entries before ingesting.
            interpolation.removeWhere(id => id < 1000);

            const extras = BUFFER_HEADER_LENGTH;
            const sigScore = floats[extras];
            const sigRows = floats[extras + 1];
            const sigLevel = floats[extras + 2];
            const sigGameOver = floatBool(floats[extras + 3]);
            const sigStarted = floatBool(floats[extras + 4]);
            const sigLocked = floatBool(floats[extras + 5]);
            const sigLinesCleared = floats[extras + 6];

            setGameState(sigScore, sigRows, sigLevel, sigGameOver, sigStarted);
            if (sigLocked) dbg('ECS event: piece locked, cleared lines', sigLinesCleared);
        } catch (err) {
            console.error('[pixi-debug] tetris-move buffer decode failed:', err);
        }
    });

    const cleanup = () => {
        stream?.close();
        window.removeEventListener('keydown', onKeyDown);
        app.ticker.remove(onTicker);
        overlay.remove();
    };
    stream.onInterrupted(() => cleanup());
    window.addEventListener('beforeunload', cleanup);
};
