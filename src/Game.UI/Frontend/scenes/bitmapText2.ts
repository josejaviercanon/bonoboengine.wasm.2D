import { BitmapText, Container } from 'pixi.js';
import type { SceneBuilder } from './types';

export const bitmapText2Scene: SceneBuilder = (_app, _params, ctx) => {
    _app.renderer.background.color = '#1099bb';

    const container = new Container();
    ctx.root.addChild(container);

    const displayText = new BitmapText({
        text: 'Hello, PixiJS!',
        style: {
            fontFamily: 'Arial',
            fontSize: 16,
            fill: '#ddd',
        },
    });

    displayText.x = 100;
    displayText.y = 100;
    displayText.anchor.set(0.5);

    container.addChild(displayText);

    container.x = _app.screen.width / 2;
    container.y = _app.screen.height / 2;
    container.pivot.x = container.width / 2;
    container.pivot.y = container.height / 2;

    const ticker = (tickerInner: { deltaTime: number }) => {
        container.rotation -= 0.01 * tickerInner.deltaTime;
    };
    _app.ticker.add(ticker);

    return () => {
        _app.ticker.remove(ticker);
    };
};
