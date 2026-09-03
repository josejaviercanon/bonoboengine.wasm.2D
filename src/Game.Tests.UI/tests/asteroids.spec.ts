import { expect, test } from '@playwright/test';

test.describe('Asteroids game (WASM host)', () => {
  test('game select lists Asteroids', async ({ page }) => {
    await page.goto('/');

    const select = page.locator('#game-select');
    await expect(select).toBeAttached();
    await expect(select.locator('option', { hasText: 'Asteroids' })).toHaveCount(1);
  });

  test('PixiJS bootstraps and mounts a canvas', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('#pixi-viewport canvas').first()).toBeVisible({ timeout: 60_000 });
  });

  test('start button hides the overlay and controls play without console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push(String(err)));

    await page.goto('/');
    await expect(page.locator('#pixi-viewport canvas').first()).toBeVisible({ timeout: 60_000 });

    const startButton = page.getByRole('button', { name: 'START GAME' });
    await expect(startButton).toBeVisible({ timeout: 30_000 });

    await startButton.click();
    await expect(startButton).toBeHidden();

    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Space');
    await page.waitForTimeout(1000);

    expect(errors, errors.join('\n')).toEqual([]);
  });
});