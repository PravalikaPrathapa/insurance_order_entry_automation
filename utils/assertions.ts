import { expect, Locator, Page } from '@playwright/test';

export async function expectVisible(locator: Locator) {
  await expect(locator).toBeVisible();
}

export async function expectPath(page: Page, path: RegExp) {
  await expect(page).toHaveURL(path);
}
