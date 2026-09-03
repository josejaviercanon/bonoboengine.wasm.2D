import { Assets, Sprite } from 'pixi.js';
import type { Sprite as PixiSprite } from 'pixi.js';
import type { SceneBuilder } from './types';

interface Star {
    sprite: PixiSprite;
    x: number;
    y: number;
    z: number;
}

export const starWarpScene: SceneBuilder = async (_app, _params, ctx) => {
    _app.renderer.background.color = '#000000';

    const starTexture = await Assets.load('https://pixijs.com/assets/star.png');

    const starCount = 500;
    const fov = 20;
    let speed = 0;
    let warpSpeed = 0;

    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
        const sprite = new Sprite(starTexture);
        sprite.anchor.set(0.5, 0.7);
        ctx.root.addChild(sprite);
        stars.push({
            sprite,
            x: Math.random() * 1000 - 500,
            y: Math.random() * 1000 - 500,
            z: Math.random() * 1000,
        });
    }

    const intervalId = setInterval(() => {
        warpSpeed = Math.random();
    }, 5000);

    const ticker = (tickerInner: { deltaTime: number }) => {
        speed += (warpSpeed - speed) / 20 * tickerInner.deltaTime;

        const cameraZ = 0;
        const centerX = _app.screen.width / 2;
        const centerY = _app.screen.height / 2;

        for (const star of stars) {
            star.z -= speed * 10 * tickerInner.deltaTime;
            if (star.z <= 0) {
                star.z += 1000;
            }

            const deg = Math.atan2(star.y, star.x) * (180 / Math.PI) + 90;
            star.sprite.rotation = deg * (Math.PI / 180);

            const x = star.x * (fov / (star.z - cameraZ));
            const y = star.y * (fov / (star.z - cameraZ));

            star.sprite.x = x + centerX;
            star.sprite.y = y + centerY;

            const s = 1 - star.z / 1000;
            star.sprite.scale.set(s, s);
        }
    };
    _app.ticker.add(ticker);

    return () => {
        _app.ticker.remove(ticker);
        clearInterval(intervalId);
    };
};
