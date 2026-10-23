import { expect, test } from '@playwright/test';

test('homepage loads successfully', async ({ page }) => {
  const response = await page.goto('/');

  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole('heading', { name: 'Welcome to Shady Meadows B&B' }),
  ).toBeVisible();
});
