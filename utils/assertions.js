const { expect } = require('@playwright/test');

async function expectVisible(locator) {
  await expect(locator).toBeVisible();
}

async function expectPath(page, pattern) {
  await expect(page).toHaveURL(pattern);
}

module.exports = { expectVisible, expectPath };
