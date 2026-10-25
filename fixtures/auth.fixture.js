// Provides `authedPage`: a page already logged in as the valid agent.
const base = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { users } = require('./users');

const test = base.test.extend({
  authedPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users.valid.username, users.valid.password);
    await login.expectDashboard();
    await use(page);
  },
});

module.exports = { test, expect: base.expect };
