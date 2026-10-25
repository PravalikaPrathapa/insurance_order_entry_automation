const { LoginPage } = require('../pages/LoginPage');
const { users } = require('../fixtures/users');

async function loginAsValidAgent(page) {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(users.valid.username, users.valid.password);
  await login.expectDashboard();
}

// Waits until the URL is /applications/<id>/... (ignores /applications/new) and returns <id>.
async function waitForApplicationId(page) {
  await page.waitForURL(/\/applications\/(?!new(?:\/|$))[^/?#]+/);
  return new URL(page.url()).pathname.split('/')[2];
}

module.exports = { loginAsValidAgent, waitForApplicationId };
