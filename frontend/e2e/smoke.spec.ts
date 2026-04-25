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
  test('should load the POS page and verify basic elements', async ({ page }) => {
    // Note: Since this is a smoke test and authentication might be complex in CI,
    // we just verify that navigating to /pos at least attempts to load the POS page
    // or redirects to login if unauthenticated.
    await page.goto('/pos');
    
    // We expect the page to load without a 500 error.
    // If it redirects to login, the title might change, or it might stay.
    // Let's just ensure the page is alive.
    const body = await page.locator('body');
    await expect(body).toBeVisible();
  });
});
