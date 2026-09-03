import { Assets, Container, RenderTexture, Sprite } from 'pixi.js';
import type { SceneBuilder } from './types';

export const renderTextureScene: SceneBuilder = async (_app, _params, ctx) => {
    _app.renderer.background.color = '#1099bb';

    const texture = await Assets.load('https://pixijs.com/assets/bunny.png');

    const stuffContainer = new Container();
    stuffContainer.x = 400;
    stuffContainer.y = 300;
    ctx.root.addChild(stuffContainer);

    for (let i = 0; i < 20; i++) {
        const bunny = new Sprite(texture);
        bunny.x = Math.random() * 400 - 200;
        bunny.y = Math.random() * 400 - 200;
        bunny.rotation = Math.random() * 2 * Math.PI;
        stuffContainer.addChild(bunny);
    }

    const renderTexture = RenderTexture.create({ width: 800, height: 600 });

    const outputSprite = new Sprite(renderTexture);
    outputSprite.x = 400;
    outputSprite.y = 300;
    outputSprite.anchor.set(0.5);

    ctx.root.addChild(outputSprite);

    stuffContainer.visible = false;

    const ticker = (tickerInner: { deltaTime: number }) => {
        stuffContainer.rotation -= 0.01 * tickerInner.deltaTime;
        _app.renderer.render({ container: stuffContainer, target: renderTexture });
        outputSprite.rotation += 0.01 * tickerInner.deltaTime;
    };
    _app.ticker.add(ticker);

    return () => {
        _app.ticker.remove(ticker);
        renderTexture.destroy();
    };
};
