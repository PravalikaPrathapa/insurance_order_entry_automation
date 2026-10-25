const { test, expect } = require('../../fixtures/auth.fixture');
const { ClientInformationPage } = require('../../pages/ClientInformationPage');
const { AddressContactPage } = require('../../pages/AddressContactPage');
const { startNewApplication } = require('../../utils/journey');
const { testData } = require('../../objects/testData');

test('CLI-V01 valid insured personal information advances to address step @regression', async ({ authedPage }) => {
  await startNewApplication(authedPage);
  const client = new ClientInformationPage(authedPage);
  await client.fill(testData.client);
  await client.next();
  await expect(authedPage).toHaveURL(/\/address-contact$/);
});

test('CLI-V06 same-as-residential copies address to mailing @regression', async ({ authedPage }) => {
  await startNewApplication(authedPage);
  const client = new ClientInformationPage(authedPage);
  await client.fill(testData.client);
  await client.next();

  const address = new AddressContactPage(authedPage);
  await address.fill(testData.address);
  await address.copyResidentialToMailing();
  await address.expectMailingCopied(testData.address.line1);
});

// Negative: kept for coverage, excluded from smoke and regression runs.
test('CLI-V05 future DOB is rejected @negative', async ({ authedPage }) => {
  await authedPage.goto('/applications/new');
  const client = new ClientInformationPage(authedPage);
  await client.fill({ ...testData.client, dob: '01/01/2099' });
  await client.next();
  await client.expectValidation();
});
