import { Assets, Sprite } from 'pixi.js';
import type { SceneBuilder } from './types';
import { publishCSharpStats } from '../stats/overlays';
import { connectSignalStream, RENDER_SOURCE } from './signalSource';
import { BUFFER_HEADER_LENGTH } from './bufferLayout';

interface EcsSpriteState {
    id: number;
    x: number;
    y: number;
    r: number;
    g: number;
    b: number;
}

interface EcsRenderSignal {
    seq: number;
    entityCount: number;
    tickMs: number;
    sprites: EcsSpriteState[];
}

interface EcsSceneParams {
    sprites?: EcsSpriteState[];
    streamUrl?: string;
}

/**
 * ECS scenario: the C# Arch world simulates on the server and pushes one batched
 * signal per second over SSE. Initial sprite positions come from the SSR payload,
 * so sprites render before the first tick arrives.
 */
export const ecsSpritesScene: SceneBuilder = async (app, params) => {
    const p = (params ?? {}) as EcsSceneParams;
    app.renderer.background.color = '#0f172a';

    const texture = await Assets.load('https://pixijs.com/assets/bunny.png');

    publishCSharpStats({ seq: 0, entityCount: p.sprites?.length ?? 0, tickMs: 0 });

    const sprites = new Map<number, Sprite>();
    for (const state of p.sprites ?? []) {
        const sprite = new Sprite(texture);
        sprite.anchor.set(0.5);
        sprite.position.set(state.x, state.y);
        sprite.tint = (state.r << 16) | (state.g << 8) | state.b;
        sprite.scale.set(0.5);
        sprite.eventMode = 'static';
        app.stage.addChild(sprite);
        sprites.set(state.id, sprite);
    }

    // SSE requires a stream URL; local-buffer ignores it (in-process provider).
    if (RENDER_SOURCE === 'sse' && !p.streamUrl) return;

    const stream = connectSignalStream(p.streamUrl);
    if (!stream) return;
    stream.addSignalListener('sprite-move', (data) => {
        try {
            const signal = JSON.parse(data) as EcsRenderSignal;
            publishCSharpStats({ seq: signal.seq, entityCount: signal.entityCount, tickMs: signal.tickMs });
            for (const state of signal.sprites) {
                const sprite = sprites.get(state.id);
                if (sprite && !sprite.destroyed) {
                    sprite.position.set(state.x, state.y);
                }
            }
        } catch (err) {
            console.error('[pixi-debug] ECS sprite-move parse failed:', err);
        }
    });

    // ADR-007 Phase 3: float32 buffer decoder for the co-located WASM host.
    // Only fires in local-buffer bundles; mirrors the SSE semantics above
    // (positions applied directly — this scene keeps no interpolation buffer).
    // Layout: header(6) + entities × stride 6 (id, x, y, r, g, b), no extras.
    // Must match SignalBufferEncoders.Encode(EcsRenderSignal, …) in Game.Engine.
    stream.addBufferListener('sprite-move', (floats) => {
        try {
            const entityCount = floats[2];
            publishCSharpStats({ seq: floats[0], entityCount, tickMs: floats[5] });
            for (let i = 0; i < entityCount; i++) {
                const offset = BUFFER_HEADER_LENGTH + i * 6;
                const sprite = sprites.get(floats[offset]);
                if (sprite && !sprite.destroyed) {
                    sprite.position.set(floats[offset + 1], floats[offset + 2]);
                }
            }
        } catch (err) {
            console.error('[pixi-debug] ECS sprite-move buffer decode failed:', err);
        }
    });

    stream.onInterrupted(() => stream.close());
    window.addEventListener('beforeunload', () => stream.close());
};
