import { Assets, Sprite } from 'pixi.js';
import type { SceneBuilder } from './types';

export const basicSpriteScene: SceneBuilder = async (_app, _params, ctx) => {
    _app.renderer.background.color = '#1099bb';

    const texture = await Assets.load('https://pixijs.com/assets/bunny.png');

    const bunny = new Sprite(texture);
    bunny.anchor.set(0.5);
    bunny.x = _app.screen.width / 2;
    bunny.y = _app.screen.height / 2;
    bunny.scale.set(4);
    bunny.eventMode = 'static';
    bunny.cursor = 'pointer';

    bunny.on('pointertap', () => {
        bunny.scale.x *= 1.25;
        bunny.scale.y *= 1.25;
    });

    ctx.root.addChild(bunny);

    const ticker = (tickerInner: { deltaTime: number }) => {
        if (!bunny.destroyed) {
            bunny.rotation += 0.1 * tickerInner.deltaTime;
        }
    };
    _app.ticker.add(ticker);

    return () => {
        _app.ticker.remove(ticker);
    };
};
