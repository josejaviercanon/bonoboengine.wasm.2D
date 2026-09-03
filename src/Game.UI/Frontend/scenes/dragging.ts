import { Assets, Sprite } from 'pixi.js';
import type { Sprite as PixiSprite } from 'pixi.js';
import type { SceneBuilder } from './types';

export const draggingScene: SceneBuilder = async (_app, _params, ctx) => {
    _app.renderer.background.color = '#1099bb';

    _app.stage.eventMode = 'static';
    _app.stage.hitArea = _app.screen;

    const texture = await Assets.load('https://pixijs.com/assets/bunny.png');
    texture.source.scaleMode = 'nearest';

    let draggingBunny: PixiSprite | null = null;

    function onDragMove(event: { global: { x: number; y: number } }): void {
        if (draggingBunny) {
            draggingBunny.x = event.global.x;
            draggingBunny.y = event.global.y;
        }
    }

    function onDragEnd(): void {
        if (draggingBunny) {
            draggingBunny.alpha = 1;
            _app.stage.off('pointermove', onDragMove);
            _app.stage.off('pointerup', onDragEnd);
            _app.stage.off('pointerupoutside', onDragEnd);
            draggingBunny = null;
        }
    }

    function createBunny(x: number, y: number): void {
        const bunny = new Sprite(texture);
        bunny.eventMode = 'static';
        bunny.cursor = 'pointer';
        bunny.anchor.set(0.5);
        bunny.scale.set(3);

        bunny.on('pointerdown', () => {
            draggingBunny = bunny;
            bunny.alpha = 0.5;
            _app.stage.on('pointermove', onDragMove);
            _app.stage.on('pointerup', onDragEnd);
            _app.stage.on('pointerupoutside', onDragEnd);
        });

        bunny.x = x;
        bunny.y = y;

        ctx.root.addChild(bunny);
    }

    for (let i = 0; i < 10; i++) {
        createBunny(Math.floor(Math.random() * _app.screen.width), Math.floor(Math.random() * _app.screen.height));
    }

    return () => {
        _app.stage.off('pointermove', onDragMove);
        _app.stage.off('pointerup', onDragEnd);
        _app.stage.off('pointerupoutside', onDragEnd);
        _app.stage.hitArea = undefined;
        _app.stage.eventMode = 'passive';
    };
};
