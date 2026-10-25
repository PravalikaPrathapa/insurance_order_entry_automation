const { test, expect } = require('@playwright/test');

test('Application login page loads @smoke', async ({ page }) => {
  await page.goto('/login');
  await expect(page).toHaveURL(/login/);
  await expect(page.locator('body')).toBeVisible();
});
