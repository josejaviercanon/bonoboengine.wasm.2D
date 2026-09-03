import { Assets, TilingSprite } from 'pixi.js';
import type { SceneBuilder } from './types';

export const tilingSpriteScene: SceneBuilder = async (_app, _params, ctx) => {
    _app.renderer.background.color = '#1099bb';

    const texture = await Assets.load('https://pixijs.com/assets/p2.jpeg');

    const tilingSprite = new TilingSprite({
        texture,
        width: _app.screen.width,
        height: _app.screen.height,
    });

    ctx.root.addChild(tilingSprite);

    let count = 0;
    const ticker = () => {
        count += 0.005;
        tilingSprite.tileScale.x = 2 + Math.sin(count);
        tilingSprite.tileScale.y = 2 + Math.cos(count);
        tilingSprite.tilePosition.x += 1;
        tilingSprite.tilePosition.y += 1;
    };
    _app.ticker.add(ticker);

    return () => {
        _app.ticker.remove(ticker);
    };
};
