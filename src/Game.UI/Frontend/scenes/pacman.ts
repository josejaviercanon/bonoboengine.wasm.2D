import { Container, Graphics, Text, TextStyle } from 'pixi.js';
import type { Ticker } from 'pixi.js';
import { sound } from '@pixi/sound';
import type { SceneBuilder } from './types';
import { publishCSharpStats } from '../stats/overlays';
import { SnapshotBuffer } from './interpolation';
import { connectSignalStream, type SignalStream } from './signalSource';
import { BUFFER_HEADER_LENGTH, floatBool, type EntityDecoder } from './bufferLayout';

interface PacmanSpriteState {
    id: number;
    x: number;
    y: number;
    previousX: number;
    previousY: number;
    velocityX: number;
    velocityY: number;
    rotation: number;
    kind: number;
    direction: number;
    mode: number;
    visible: boolean;
    r: number;
    g: number;
    b: number;
    fruitItem: number;
}

interface PacmanRenderSignal {
    seq: number;
    entityCount: number;
    tickMs: number;
    stepMs?: number;
    epoch?: number;
    sprites: PacmanSpriteState[];
    score: number;
    lives: number;
    level: number;
    pelletsRemaining: number;
    gameOver: boolean;
    started: boolean;
    frightened: boolean;
    atePellet: boolean;
    atePowerPellet: boolean;
    ghostEaten: boolean;
    died: boolean;
    levelUp: boolean;
    fruitItem: number;
    fruitVisible: boolean;
    ateFruit: boolean;
    frightenedRemaining: number;
    frightenedDuration: number;
    frightFlashes: number;
}

interface PacmanSceneParams {
    pacman?: {
        sprites?: PacmanSpriteState[];
        mazeRows?: string[];
        score?: number;
        lives?: number;
        level?: number;
        pelletsRemaining?: number;
        gameOver?: boolean;
        started?: boolean;
        mazeWidth?: number;
        mazeHeight?: number;
        cellSize?: number;
        streamUrl?: string;
    };
}

function isPacmanSpriteState(value: unknown): value is PacmanSpriteState {
    if (!value || typeof value !== 'object') return false;
    const state = value as Partial<PacmanSpriteState>;
    return typeof state.id === 'number' && typeof state.x === 'number' && typeof state.y === 'number' &&
        typeof state.previousX === 'number' && typeof state.previousY === 'number' &&
        typeof state.rotation === 'number' && typeof state.kind === 'number' &&
        typeof state.visible === 'boolean';
}

function isPacmanRenderSignal(value: unknown): value is PacmanRenderSignal {
    if (!value || typeof value !== 'object') return false;
    const signal = value as Partial<PacmanRenderSignal>;
    return typeof signal.seq === 'number' &&
        typeof signal.entityCount === 'number' &&
        typeof signal.tickMs === 'number' &&
        Array.isArray(signal.sprites) &&
        signal.sprites.every(isPacmanSpriteState) &&
        typeof signal.score === 'number' &&
        typeof signal.lives === 'number' &&
        typeof signal.level === 'number' &&
        typeof signal.pelletsRemaining === 'number' &&
        typeof signal.gameOver === 'boolean' &&
        typeof signal.started === 'boolean';
}

const KIND_PLAYER = 0;
const KIND_BLINKY = 1;
const KIND_PINKY = 2;
const KIND_INKY = 3;
const KIND_CLYDE = 4;
const KIND_PELLET = 5;
const KIND_POWER_PELLET = 6;
const KIND_FRUIT = 7;

const MODE_FRIGHTENED = 2;
const MODE_EYES = 3;

// Fruit item indices (must match PacmanFruitItem enum in C#)
const FRUIT_CHERRY = 0;
const FRUIT_STRAWBERRY = 1;
const FRUIT_PEACH = 2;
const FRUIT_APPLE = 3;
const FRUIT_GRAPE = 4;
const FRUIT_GALAXIAN = 5;
const FRUIT_BELL = 6;
const FRUIT_KEY = 7;

const FRUIT_COLORS: Record<number, number> = {
    [FRUIT_CHERRY]: 0xff3b30,
    [FRUIT_STRAWBERRY]: 0xff6b6b,
    [FRUIT_PEACH]: 0xffcc80,
    [FRUIT_APPLE]: 0x66bb6a,
    [FRUIT_GRAPE]: 0xab47bc,
    [FRUIT_GALAXIAN]: 0x42a5f5,
    [FRUIT_BELL]: 0xffd54f,
    [FRUIT_KEY]: 0xe0e0e0,
};

const KEY_TO_DIRECTION: Record<string, string> = {
    ArrowUp: 'up',
    w: 'up',
    W: 'up',
    ArrowLeft: 'left',
    a: 'left',
    A: 'left',
    ArrowDown: 'down',
    s: 'down',
    S: 'down',
    ArrowRight: 'right',
    d: 'right',
    D: 'right',
};

const GHOST_COLORS: Record<number, number> = {
    [KIND_BLINKY]: 0xff3b30,
    [KIND_PINKY]: 0xff9de2,
    [KIND_INKY]: 0x32e6e6,
    [KIND_CLYDE]: 0xffb74a,
};

const SOUND_BASE_URL = '_content/Game.UI/audio/';
const soundRegistered = new Set<string>();

function ensureSound(alias: string, fileName: string): void {
    if (soundRegistered.has(alias)) return;
    sound.add(alias, `${SOUND_BASE_URL}${fileName}`);
    soundRegistered.add(alias);
}

function playSound(alias: string, fileName: string): void {
    ensureSound(alias, fileName);
    void sound.play(alias);
}

/**
 * Pacman presentation. C# owns maze rules, movement, ghost AI and collisions.
 * This scene only interpolates snapshots, draws, forwards input and plays edge-event audio.
 */
export const pacmanScene: SceneBuilder = (app, params) => {
    const p = ((params ?? {}) as PacmanSceneParams).pacman ?? {};
    app.renderer.background.color = '#020617';

    const mazeRows = p.mazeRows ?? [];
    const mazeWidth = p.mazeWidth ?? 29;
    const mazeHeight = p.mazeHeight ?? 31;
    const cellSize = p.cellSize ?? 8;
    const boardWidth = mazeWidth * cellSize;
    const boardHeight = mazeHeight * cellSize;

    const board = new Container();
    const mazeLayer = new Graphics();
    const pelletLayer = new Graphics();
    const actorLayer = new Graphics();
    board.addChild(mazeLayer, pelletLayer, actorLayer);
    app.stage.addChild(board);

    const drawMaze = () => {
        mazeLayer.clear();
        mazeLayer.rect(0, 0, boardWidth, boardHeight).fill(0x00030d);

        for (let y = 0; y < mazeHeight; y++) {
            const row = mazeRows[y] ?? '';
            for (let x = 0; x < mazeWidth; x++) {
                const wall = row[x] === ' ' || row[x] === undefined;
                const left = x * cellSize;
                const top = y * cellSize;
                if (wall) {
                    mazeLayer.rect(left, top, cellSize, cellSize).fill(0x07153c);
                } else {
                    mazeLayer.rect(left + 1, top + 1, cellSize - 2, cellSize - 2)
                        .fill(0x020817)
                        .stroke({ width: 0.8, color: 0x1d4ed8, alpha: 0.65 });
                }
            }
        }

        mazeLayer.rect(0, 0, boardWidth, boardHeight)
            .stroke({ width: 2, color: 0x2563eb, alpha: 0.85 });
    };

    drawMaze();

    const scoreText = new Text({
        text: 'SCORE 000000',
        style: new TextStyle({ fontFamily: 'monospace', fontSize: 16, fontWeight: 'bold', fill: '#f8fafc' }),
    });
    const levelText = new Text({
        text: 'LEVEL 1',
        style: new TextStyle({ fontFamily: 'monospace', fontSize: 16, fontWeight: 'bold', fill: '#60a5fa' }),
    });
    const livesText = new Text({
        text: 'LIVES 3',
        style: new TextStyle({ fontFamily: 'monospace', fontSize: 16, fontWeight: 'bold', fill: '#fde047' }),
    });
    app.stage.addChild(scoreText, levelText, livesText);

    const overlay = document.createElement('div');
    overlay.style.cssText =
        'position:fixed;top:52px;left:0;right:0;bottom:0;display:flex;flex-direction:column;' +
        'align-items:center;justify-content:center;gap:1rem;background:rgba(2,6,23,0.58);z-index:5;';
    const overlayTitle = document.createElement('div');
    overlayTitle.style.cssText = 'font:bold 2rem monospace;color:#facc15;text-align:center;';
    const startButton = document.createElement('button');
    startButton.type = 'button';
    startButton.textContent = 'START GAME';
    startButton.style.cssText =
        'background:#facc15;color:#020617;border:0;border-radius:0.5rem;padding:0.75rem 2rem;' +
        'font:bold 1.1rem monospace;cursor:pointer;';
    const hint = document.createElement('div');
    hint.style.cssText = 'color:#94a3b8;font:0.85rem monospace;text-align:center;';
    hint.textContent = 'ARROWS / WASD TO MOVE · SPACE TO START';
    overlay.append(overlayTitle, startButton, hint);
    document.body.appendChild(overlay);

    let started = p.started ?? false;
    let gameOver = p.gameOver ?? false;
    let score = p.score ?? 0;
    let lives = p.lives ?? 3;
    let level = p.level ?? 1;
    let previousGameOver = gameOver;
    let stepMs = 1000 / 60;
    let frightenedRemaining = 0;
    let frightFlashes = 0;
    const interpolation = new SnapshotBuffer<PacmanSpriteState>();
    let stream: SignalStream | null = null;

    const layout = () => {
        const scale = Math.min(app.screen.width / boardWidth, app.screen.height / boardHeight);
        board.scale.set(scale);
        board.x = (app.screen.width - boardWidth * scale) / 2;
        board.y = Math.max(0, (app.screen.height - boardHeight * scale) / 2);
        scoreText.position.set(12, 12);
        levelText.anchor.set(0.5, 0);
        levelText.position.set(app.screen.width / 2, 12);
        livesText.anchor.set(1, 0);
        livesText.position.set(app.screen.width - 12, 12);
    };

    const updateOverlay = () => {
        overlay.style.display = started && !gameOver ? 'none' : 'flex';
        overlayTitle.textContent = gameOver ? `GAME OVER · SCORE ${score}` : 'PAC-MAN';
        startButton.textContent = gameOver ? 'PLAY AGAIN' : 'START GAME';
    };

    const setStats = (nextScore: number, nextLives: number, nextLevel: number, over: boolean, isStarted: boolean) => {
        score = nextScore;
        lives = nextLives;
        level = nextLevel;
        gameOver = over;
        started = isStarted;
        scoreText.text = `SCORE ${String(score).padStart(6, '0')}`;
        levelText.text = `LEVEL ${level}`;
        livesText.text = `LIVES ${lives}`;

        if (gameOver && !previousGameOver) playSound('pacman-dying', 'pacman-dying.wav');
        previousGameOver = gameOver;
        updateOverlay();
    };

    const startGame = () => {
        if (started && !gameOver) return;
        stream?.postCommand('/api/pacman/start')
            .then(() => {
                started = true;
                gameOver = false;
                playSound('pacman-start', 'pacman-start.wav');
                updateOverlay();
            })
            .catch((error: unknown) => console.error('[pixi-debug] pacman start failed:', error));
    };

    const postDirection = (direction: string) => {
        stream?.postCommand('/api/pacman/input', JSON.stringify({ direction }))
            .catch((error: unknown) => console.error('[pixi-debug] pacman input failed:', error));
    };

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            startGame();
            return;
        }

        const direction = KEY_TO_DIRECTION[event.key];
        if (!direction) return;
        event.preventDefault();
        postDirection(direction);
    };

    const draw = (alpha: number) => {
        pelletLayer.clear();
        actorLayer.clear();

        const now = performance.now();

        for (const { previous, current } of interpolation.values()) {
            const x = previous.x + (current.x - previous.x) * alpha;
            const y = previous.y + (current.y - previous.y) * alpha;
            if (!current.visible) continue;

            if (current.kind === KIND_PELLET || current.kind === KIND_POWER_PELLET) {
                const radius = current.kind === KIND_POWER_PELLET ? 2.4 + Math.sin(now / 160) * 0.5 : 1.2;
                pelletLayer.circle(x, y, radius).fill(current.kind === KIND_POWER_PELLET ? 0xfef08a : 0xffffff);
                continue;
            }

            if (current.kind === KIND_FRUIT) {
                const fruitColor = FRUIT_COLORS[current.fruitItem] ?? 0xff3b30;
                pelletLayer.circle(x, y, cellSize * 0.38).fill(fruitColor);
                continue;
            }

            if (current.kind === KIND_PLAYER) {
                actorLayer.circle(x, y, cellSize * 0.42).fill(0xfacc15);
                continue;
            }

            // Ghost: fright flashing — blink white/blue when remaining time is low
            let ghostColor: number;
            if (current.mode === MODE_FRIGHTENED) {
                const flashWindow = frightFlashes * 0.332; // ~166ms per half-flash × 2
                const isFlashing = frightenedRemaining > 0 && frightenedRemaining <= flashWindow;
                if (isFlashing) {
                    // Toggle every 166ms
                    ghostColor = Math.floor(now / 166) % 2 === 0 ? 0xffffff : 0x2563eb;
                } else {
                    ghostColor = 0x2563eb;
                }
            } else {
                ghostColor = GHOST_COLORS[current.kind] ?? 0xffffff;
            }
            actorLayer.roundRect(x - cellSize * 0.42, y - cellSize * 0.42, cellSize * 0.84, cellSize * 0.84, 2).fill(ghostColor);
            actorLayer.circle(x - 1.6, y - 1, 1.4).fill(0xffffff);
            actorLayer.circle(x + 1.6, y - 1, 1.4).fill(0xffffff);

            if (current.mode === MODE_EYES) {
                actorLayer.circle(x - 1.6, y - 1, 0.55).fill(0x1d4ed8);
                actorLayer.circle(x + 1.6, y - 1, 0.55).fill(0x1d4ed8);
            }
        }
    };

    // Redraw only when a fresh snapshot arrived or interpolation is still in
    // flight; idle frames (start overlay / game over / paused) are skipped.
    // Trade-off: the power-pellet pulse (performance.now() sine) freezes while
    // the sim is idle — acceptable, pellets animate while the game runs.
    const onTicker = (_ticker: Ticker) => {
        const alpha = interpolation.advance(stepMs);
        if (alpha !== null) draw(alpha);
    };

    interpolation.ingest((p.sprites ?? []).filter(isPacmanSpriteState));
    setStats(score, lives, level, gameOver, started);
    layout();
    updateOverlay();
    window.addEventListener('resize', layout);
    window.addEventListener('keydown', onKeyDown);
    startButton.addEventListener('click', startGame);
    app.ticker.add(onTicker);

    // SSE requires a stream URL; local-buffer ignores it (in-process provider).
    stream = connectSignalStream(p.streamUrl);
    if (!stream) return;
    stream.addSignalListener('pacman-move', (data) => {
        try {
            const parsed: unknown = JSON.parse(data);
            if (!isPacmanRenderSignal(parsed)) throw new Error('invalid Pacman render signal');
            const signal = parsed;
            publishCSharpStats({ seq: signal.seq, entityCount: signal.entityCount, tickMs: signal.tickMs });
            stepMs = Math.max(1, signal.stepMs ?? 1000 / 60);
            frightenedRemaining = signal.frightenedRemaining ?? 0;
            frightFlashes = signal.frightFlashes ?? 0;
            interpolation.ingest(signal.sprites, signal.seq, signal.epoch);
            setStats(signal.score, signal.lives, signal.level, signal.gameOver, signal.started);

            if (signal.atePellet) playSound('pacman-munch', 'pacman-munch1.wav');
            if (signal.atePowerPellet) playSound('pacman-power', 'pacman-frightened.wav');
            if (signal.ghostEaten) playSound('pacman-ghost-eaten', 'pacman-ghost-eaten.wav');
            if (signal.ateFruit) playSound('pacman-fruit', 'pacman-fruit.wav');
            if (signal.levelUp) playSound('pacman-level-up', 'pacman-extra-life.wav');
            if (signal.died && !signal.gameOver) playSound('pacman-dying', 'pacman-dying.wav');
        } catch (error: unknown) {
            console.error('[pixi-debug] pacman-move parse failed:', error);
        }
    });

    // ADR-007 Phase 3: float32 buffer decoder for SINGLEPLAYER co-located host.
    // Layout: header(6) + extras(17) + entities × stride(16)
    //   extras: score, lives, level, pelletsRemaining, gameOver, started, frightened,
    //           frightenedRemaining, frightenedDuration, frightFlashes,
    //           fruitVisible, fruitItem, atePellet, atePowerPellet, ghostEaten, died, levelUp, ateFruit
    //   entity: id, x, y, prevX, prevY, velX, velY, rotation, kind, direction, mode, visible, r, g, b, fruitItem
    const PACMAN_BUFFER_EXTRAS = 18;
    const PACMAN_BUFFER_ENTITY_BASE = BUFFER_HEADER_LENGTH + PACMAN_BUFFER_EXTRAS;

    const decodePacmanSprite: EntityDecoder<PacmanSpriteState> = (floats, offset) => ({
        id: floats[offset],
        x: floats[offset + 1],
        y: floats[offset + 2],
        previousX: floats[offset + 3],
        previousY: floats[offset + 4],
        velocityX: floats[offset + 5],
        velocityY: floats[offset + 6],
        rotation: floats[offset + 7],
        kind: floats[offset + 8],
        direction: floats[offset + 9],
        mode: floats[offset + 10],
        visible: floatBool(floats[offset + 11]),
        r: floats[offset + 12],
        g: floats[offset + 13],
        b: floats[offset + 14],
        fruitItem: floats[offset + 15],
    });

    stream.addBufferListener('pacman-move', (floats) => {
        try {
            const header = interpolation.ingestFromBuffer(floats, decodePacmanSprite, PACMAN_BUFFER_ENTITY_BASE);
            if (!header) return;
            publishCSharpStats({ seq: header.seq, entityCount: header.entityCount, tickMs: header.tickMs });
            stepMs = Math.max(1, header.stepMs);

            const extras = BUFFER_HEADER_LENGTH;
            const score = floats[extras];
            const lives = floats[extras + 1];
            const level = floats[extras + 2];
            // floats[extras + 3] = pelletsRemaining (unused in draw)
            const gameOver = floatBool(floats[extras + 4]);
            const isStarted = floatBool(floats[extras + 5]);
            // floats[extras + 6] = frightened (unused — derived from remaining)
            frightenedRemaining = floats[extras + 7];
            // floats[extras + 8] = frightenedDuration (unused in draw)
            frightFlashes = floats[extras + 9];
            // floats[extras + 10] = fruitVisible (unused — drawn via sprite visibility)
            // floats[extras + 11] = fruitItem (unused — drawn via sprite fruitItem field)
            const atePellet = floatBool(floats[extras + 12]);
            const atePowerPellet = floatBool(floats[extras + 13]);
            const ghostEaten = floatBool(floats[extras + 14]);
            const died = floatBool(floats[extras + 15]);
            const levelUp = floatBool(floats[extras + 16]);
            const ateFruit = floatBool(floats[extras + 17]);

            setStats(score, lives, level, gameOver, isStarted);

            if (atePellet) playSound('pacman-munch', 'pacman-munch1.wav');
            if (atePowerPellet) playSound('pacman-power', 'pacman-frightened.wav');
            if (ghostEaten) playSound('pacman-ghost-eaten', 'pacman-ghost-eaten.wav');
            if (ateFruit) playSound('pacman-fruit', 'pacman-fruit.wav');
            if (levelUp) playSound('pacman-level-up', 'pacman-extra-life.wav');
            if (died && !gameOver) playSound('pacman-dying', 'pacman-dying.wav');
        } catch (error: unknown) {
            console.error('[pixi-debug] pacman-move buffer decode failed:', error);
        }
    });

    let cleanedUp = false;
    const cleanup = () => {
        if (cleanedUp) return;
        cleanedUp = true;
        stream?.close();
        app.ticker.remove(onTicker);
        window.removeEventListener('resize', layout);
        window.removeEventListener('keydown', onKeyDown);
        overlay.remove();
        scoreText.destroy();
        levelText.destroy();
        livesText.destroy();
        board.destroy({ children: true });
    };

    stream.onInterrupted(() => {
        // EventSource reconnects automatically. Keep scene alive for transient network loss.
        console.warn('[pixi-debug] pacman SSE connection interrupted; browser will retry');
    });
    window.addEventListener('beforeunload', cleanup, { once: true });
};
