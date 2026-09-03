import { Container, type Application } from 'pixi.js';
import { sceneRegistry } from './index';
import type { SceneContext, SceneCleanup } from './types';

export interface ScenePayload {
    exampleId?: string;
    title?: string;
    sourceUrl?: string;
    bufferPtr?: number;
    stride?: number;
    entityCount?: number;
    [key: string]: unknown;
}

let app: Application | null = null;
let root: Container | null = null;
let currentCleanup: SceneCleanup | null = null;

export function initSceneManager(targetApp: Application): void {
    app = targetApp;
}

export function tearDownScene(): void {
    const cleanup = currentCleanup;
    currentCleanup = null;
    if (cleanup) {
        try { cleanup(); } catch (err) { console.error('[pixi-debug] scene cleanup error:', err); }
    }
    if (root) {
        root.destroy({ children: true });
        root = null;
    }
}

export async function mountScene(payload: ScenePayload): Promise<void> {
    if (!app) throw new Error('[pixi-debug] scene manager not initialized');
    const { exampleId } = payload;
    if (!exampleId) return;
    const builder = sceneRegistry[exampleId];
    if (!builder) {
        console.error(`[pixi-debug] no scene registered for exampleId '${exampleId}'`);
        return;
    }
    tearDownScene();
    root = new Container();
    app.stage.addChild(root);
    const ctx: SceneContext = { root };
    try {
        const maybeCleanup = await builder(app, payload, ctx);
        if (typeof maybeCleanup === 'function') currentCleanup = maybeCleanup;
    } catch (err) {
        console.error(`[pixi-debug] scene '${exampleId}' failed:`, err);
        tearDownScene();
    }
}