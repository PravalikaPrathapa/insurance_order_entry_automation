const { test, expect } = require('../../fixtures/auth.fixture');
const { DashboardPage } = require('../../pages/DashboardPage');
const { startNewApplication } = require('../../utils/journey');

test('DASH-V01 dashboard loads after login with new application action @smoke @regression', async ({ authedPage }) => {
  const dashboard = new DashboardPage(authedPage);
  await dashboard.expectLoaded();
});

test('DASH-V01 new application opens an application record @smoke @regression', async ({ authedPage }) => {
  const id = await startNewApplication(authedPage);
  expect(id).toBeTruthy();
  await expect(authedPage).toHaveURL(/\/client$/);
});
