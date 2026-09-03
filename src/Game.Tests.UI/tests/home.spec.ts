import { expect, test } from '@playwright/test';

test.describe('Game.Wasm browser-wasm host', () => {
  test('home page renders toolbar after WASM boot', async ({ page }) => {
    await page.goto('/');

    // Wait for the toolbar selects to be populated by main.mjs after WASM boot
    const exampleSelect = page.locator('#example-select');
    await expect(exampleSelect).toBeVisible({ timeout: 60_000 });
    await expect(exampleSelect.locator('option')).toHaveCount(19, { timeout: 60_000 });

    const gameSelect = page.locator('#game-select');
    await expect(gameSelect).toBeVisible({ timeout: 60_000 });
    // 6 games + 1 placeholder option
    await expect(gameSelect.locator('option')).toHaveCount(7, { timeout: 60_000 });
  });

  test('PixiJS bootstraps and mounts a canvas', async ({ page }) => {
    await page.goto('/');

    // WASM boot + pixi init produces the canvas
    await expect(page.locator('#pixi-viewport canvas').first()).toBeVisible({ timeout: 60_000 });
  });

  test('no console errors during bootstrap', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push(String(err)));

    await page.goto('/');
    await expect(page.locator('#pixi-viewport')).toBeAttached({ timeout: 60_000 });

    expect(errors, errors.join('\n')).toEqual([]);
  });

  test('dist frontend assets are served', async ({ request }) => {
    const response = await request.get('/dist/game-bundle.js');
    expect(response.status()).toBe(200);
  });
});