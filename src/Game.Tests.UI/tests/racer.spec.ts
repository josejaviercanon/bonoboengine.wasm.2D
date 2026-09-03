import { expect, test } from '@playwright/test';

test.describe('Endless Race Runner (WASM host)', () => {
  test('game select lists racer', async ({ page }) => {
    await page.goto('/');

    const select = page.locator('#game-select');
    await expect(select).toBeAttached();
    await expect(select.locator('option', { hasText: 'Endless Race Runner' })).toHaveCount(1);
  });

  test('PixiJS mounts racer canvas and builds road geometry', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('#pixi-viewport canvas').first()).toBeVisible({ timeout: 60_000 });

    await page.getByRole('button', { name: 'START GAME' }).click();
    const configButton = page.locator('#racer-config-button');
    const panel = page.locator('#racer-tuning-panel');
    await expect(configButton).toBeVisible({ timeout: 30_000 });
    await expect(panel).toBeHidden();
    await configButton.click();
    await expect(panel).toBeVisible();
    await expect(panel).toContainText('Racer tuning (paused)');
    await panel.getByRole('button', { name: 'Cancel' }).click();
    await expect(panel).toBeHidden();
  });

  test('start overlay gates the race and RESTART restarts it', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', error => errors.push(String(error)));

    await page.goto('/');
    await expect(page.locator('#pixi-viewport canvas').first()).toBeVisible({ timeout: 60_000 });

    const startButton = page.getByRole('button', { name: 'START GAME' });
    const restartButton = page.locator('#racer-restart-button');
    await expect(startButton).toBeVisible({ timeout: 30_000 });
    await expect(restartButton).toBeHidden();

    await startButton.click();
    await expect(page.locator('#racer-start-overlay')).toBeHidden();
    await expect(restartButton).toBeVisible({ timeout: 30_000 });

    await restartButton.click();
    await page.waitForTimeout(500);

    expect(errors, errors.join('\n')).toEqual([]);
  });

  test('keyboard input and tweak controls produce no client errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', error => errors.push(String(error)));

    await page.goto('/');
    await expect(page.locator('#pixi-viewport canvas').first()).toBeVisible({ timeout: 60_000 });

    await page.getByRole('button', { name: 'START GAME' }).click();
    await page.keyboard.down('ArrowUp');
    await page.keyboard.down('ArrowRight');
    await page.waitForTimeout(500);
    await page.keyboard.up('ArrowRight');
    await page.keyboard.up('ArrowUp');

    await page.locator('#racer-config-button').click();
    await expect(page.locator('#racer-tuning-panel')).toBeVisible({ timeout: 30_000 });
    await page.locator('input[type="range"]').nth(0).fill('4');
    await page.locator('#racer-tuning-panel').getByRole('button', { name: 'Apply' }).click();
    await expect(page.locator('#racer-tuning-panel')).toBeHidden();
    await page.waitForTimeout(500);

    expect(errors, errors.join('\n')).toEqual([]);
  });
});