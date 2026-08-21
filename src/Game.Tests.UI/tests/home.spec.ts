import { expect, test } from '@playwright/test';

test.describe('Game.Web static-SSR host', () => {
  test('examples home renders the RCL routes', async ({ page }) => {
    await page.goto('/');

    // Server-rendered content, no JS required for the shell.
    await expect(page.getByRole('heading', { name: 'PixiJS Examples' })).toBeVisible();
    // Static SSR only: the reconnect modal of interactive circuits must not exist.
    await expect(page.locator('#components-reconnect-modal')).toHaveCount(0);
  });

  test('/hello ships the SSR engine payload in #pixi-viewport[data-message]', async ({ page }) => {
    await page.goto('/hello');

    const viewport = page.locator('#pixi-viewport');
    await expect(viewport).toBeAttached();

    // The payload is rendered server-side into the attribute (plain text for /hello).
    const payload = await viewport.getAttribute('data-message');
    expect(payload).toBeTruthy();
    expect(payload!.length).toBeGreaterThan(0);
  });

  test('PixiJS bootstraps client-side and mounts a canvas', async ({ page }) => {
    await page.goto('/hello');

    // The inline load-event script initializes PixiJS after first paint; canvas follows.
    await expect(page.locator('#pixi-viewport canvas').first()).toBeVisible({ timeout: 20_000 });
  });

  test('no console errors during bootstrap', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push(String(err)));

    await page.goto('/hello');
    await expect(page.locator('#pixi-viewport')).toBeAttached();

    expect(errors, errors.join('\n')).toEqual([]);
  });

  test('main page renders top menu with example and game selectors', async ({ page }) => {
    await page.goto('/');

    // Example selector dropdown must be present with grouped PixiJS examples.
    const exampleSelect = page.locator('#example-select');
    await expect(exampleSelect).toBeVisible();
    await expect(exampleSelect.locator('option')).toHaveCount(19);

    // Game selector dropdown must be present with game scenes.
    const gameSelect = page.locator('#game-select');
    await expect(gameSelect).toBeVisible();
    await expect(gameSelect.locator('option[value="games/snake"]')).toHaveCount(1);
    await expect(gameSelect.locator('option[value="games/tetris"]')).toHaveCount(1);
    await expect(gameSelect.locator('option[value="games/breakout"]')).toHaveCount(1);
    await expect(gameSelect.locator('option[value="games/asteroids"]')).toHaveCount(1);
    await expect(gameSelect.locator('option[value="games/pacman"]')).toHaveCount(1);
    await expect(gameSelect.locator('option[value="games/racer"]')).toHaveCount(1);
  });

  test('dist frontend assets are served', async ({ request }) => {
    const response = await request.get('/_content/Game.UI/dist/game-bundle.js');
    expect(response.status()).toBe(200);
  });
});
