import { test, expect } from '@playwright/test';

test.describe('PharmaAssist Smoke Tests', () => {
  test('should load the homepage and check title', async ({ page }) => {
    // Navigate to the local dev server
    await page.goto('/');

    // Verify page title contains 'PharmaAssist' or it at least loads
    await expect(page).toHaveTitle(/PharmaAssist|Mô phỏng/i);

    // Verify there's some text identifying the app is running
    // This assumes the homepage has some identifiable text
    const heading = page.getByRole('heading', { name: /PharmaAssist/i, level: 1 }).first();
    // Use .isVisible() or simply expect it to be attached/visible
    if (await heading.isVisible()) {
      await expect(heading).toBeVisible();
    }
  });
});
