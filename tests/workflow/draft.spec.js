const { test, expect } = require('../../fixtures/auth.fixture');
const { ClientInformationPage } = require('../../pages/ClientInformationPage');
const { DashboardPage } = require('../../pages/DashboardPage');
const { startNewApplication } = require('../../utils/journey');
const { testData } = require('../../objects/testData');

async function saveClientDraft(page) {
  await startNewApplication(page);
  const client = new ClientInformationPage(page);
  await client.fill(testData.client);
  await client.saveDraft();
}

test('WF-V01 incomplete application can be saved as draft @regression', async ({ authedPage }) => {
  await saveClientDraft(authedPage);
  await authedPage.goto('/dashboard');
  await new DashboardPage(authedPage).expectDraftListed(testData.client.firstName);
});

test('WF-V02 saved draft can be resumed with its data @regression', async ({ authedPage }) => {
  await saveClientDraft(authedPage);
  await authedPage.goto('/dashboard');
  await new DashboardPage(authedPage).openDraft(testData.client.firstName);
  await expect(authedPage.getByLabel(/first name/i)).toHaveValue(testData.client.firstName);
});
