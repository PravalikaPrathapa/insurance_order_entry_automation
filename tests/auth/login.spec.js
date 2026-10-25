const { test: base, expect } = require('@playwright/test');
const { test } = require('../../fixtures/auth.fixture');
const { LoginPage } = require('../../pages/LoginPage');
const { users } = require('../../fixtures/users');

base('AUTH-V01 valid agent can log in and reach the dashboard @smoke @regression', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(users.valid.username, users.valid.password);
  await login.expectDashboard();
});

base('AUTH-V05 protected dashboard redirects to login when logged out @smoke @regression', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/login/);
});

test('AUTH-V04 logout clears the session and protected routes redirect @regression', async ({ authedPage }) => {
  const login = new LoginPage(authedPage);
  await login.logout();
  await login.expectLoginPage();
  await authedPage.goto('/dashboard');
  await expect(authedPage).toHaveURL(/login/);
});

base('AUTH-V02 invalid password shows an error @negative', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(users.invalid.username, users.invalid.password);
  await login.expectError();
});

base('AUTH-V03 blank credentials show mandatory validation @negative', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.loginButton.click();
  await login.expectError();
});
