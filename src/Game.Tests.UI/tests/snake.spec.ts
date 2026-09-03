import { expect, test } from '@playwright/test';

test.describe('Snake game (WASM host)', () => {
  async function dismissWelcomeAndSelect(page, gameId: string) {
    const continueBtn = page.locator('#welcome-continue');
    await expect(continueBtn).toBeVisible({ timeout: 60_000 });
    await continueBtn.click();

    const select = page.locator('#game-select');
    await expect(select).toBeAttached({ timeout: 60_000 });
    await select.selectOption(gameId);
  }

  test('game select lists Snake', async ({ page }) => {
    await page.goto('/');

    const continueBtn = page.locator('#welcome-continue');
    await expect(continueBtn).toBeVisible({ timeout: 60_000 });
    await continueBtn.click();

    const select = page.locator('#game-select');
    await expect(select).toBeAttached();
    await expect(select.locator('option', { hasText: 'Snake' })).toHaveCount(1);
  });

  test('Snake bootstraps, starts and accepts controls without browser errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', error => errors.push(String(error)));

    await page.goto('/');
    await expect(page.locator('#pixi-viewport canvas').first()).toBeVisible({ timeout: 60_000 });

    await dismissWelcomeAndSelect(page, 'games/snake');

    const startButton = page.getByRole('button', { name: 'START GAME' });
    await expect(startButton).toBeVisible({ timeout: 30_000 });
    await startButton.click();
    await expect(startButton).toBeHidden();

    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(1000);

    expect(errors, errors.join('\n')).toEqual([]);
  });
});