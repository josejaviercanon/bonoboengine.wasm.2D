import { expect, test } from '@playwright/test';

test.describe('Tetris game (WASM host)', () => {
  async function dismissWelcomeAndSelect(page, gameId: string) {
    const continueBtn = page.locator('#welcome-continue');
    await expect(continueBtn).toBeVisible({ timeout: 60_000 });
    await continueBtn.click();

    const select = page.locator('#game-select');
    await expect(select).toBeAttached({ timeout: 60_000 });
    await select.selectOption(gameId);
  }

  test('game select lists Tetris', async ({ page }) => {
    await page.goto('/');

    const continueBtn = page.locator('#welcome-continue');
    await expect(continueBtn).toBeVisible({ timeout: 60_000 });
    await continueBtn.click();

    const select = page.locator('#game-select');
    await expect(select).toBeAttached({ timeout: 60_000 });
    await expect(select.locator('option', { hasText: 'Tetris' })).toHaveCount(1, { timeout: 60_000 });
  });

  test('Tetris bootstraps and mounts a canvas', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('#pixi-viewport canvas').first()).toBeVisible({ timeout: 60_000 });
  });

  test('start button hides the overlay and arrow keys play without console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push(String(err)));

    await page.goto('/');

    // Wait for PixiJS canvas
    await expect(page.locator('#pixi-viewport canvas').first()).toBeVisible({ timeout: 60_000 });

    // Dismiss welcome modal and select Tetris
    await dismissWelcomeAndSelect(page, 'games/tetris');

    // The DOM start overlay is present before starting.
    const startButton = page.getByRole('button', { name: 'START GAME' });
    await expect(startButton).toBeVisible({ timeout: 30_000 });

    await startButton.click();
    await expect(startButton).toBeHidden({ timeout: 10_000 });

    // Arrow keys steer the piece
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(500);

    expect(errors, errors.join('\n')).toEqual([]);
  });
});