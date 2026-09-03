import type { Application, Container } from 'pixi.js';

export interface SceneContext {
    root: Container;
}

export type SceneCleanup = () => void;

export type SceneBuilder = (
    app: Application,
    params: Record<string, unknown>,
    ctx: SceneContext,
) => SceneCleanup | void | Promise<SceneCleanup | void>;