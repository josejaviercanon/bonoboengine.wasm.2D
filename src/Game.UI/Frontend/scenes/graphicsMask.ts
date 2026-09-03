import { Assets, Container, Graphics, Sprite } from 'pixi.js';
import type { SceneBuilder } from './types';

export const graphicsMaskScene: SceneBuilder = async (_app, _params, ctx) => {
    _app.renderer.background.color = '#1099bb';

    const container = new Container();
    container.x = 400;
    container.y = 300;
    ctx.root.addChild(container);

    const bg = await Assets.load('https://pixijs.com/assets/bg_rotate.jpg');
    const bgSprite = new Sprite(bg);
    bgSprite.anchor.set(0.5);
    container.addChild(bgSprite);

    const mask = new Graphics();
    mask.rect(-100, -100, 200, 200).fill(0x000000);

    container.mask = mask;
    container.addChild(mask);

    const ticker = (tickerInner: { deltaTime: number }) => {
        container.rotation += 0.01 * tickerInner.deltaTime;
        mask.rotation -= 0.01 * tickerInner.deltaTime;
    };
    _app.ticker.add(ticker);

    return () => {
        _app.ticker.remove(ticker);
    };
};
