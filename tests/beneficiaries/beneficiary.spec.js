const { test, expect } = require('../../fixtures/auth.fixture');
const { BeneficiaryPage } = require('../../pages/BeneficiaryPage');
const { completeApplicationUpTo } = require('../../utils/journey');
const { testData } = require('../../objects/testData');

test('BEN-V01 valid primary beneficiary is added with 100% allocation @regression', async ({ authedPage }) => {
  await completeApplicationUpTo(authedPage, 'beneficiaries');
  const beneficiaries = new BeneficiaryPage(authedPage);
  await beneficiaries.addPrimary(testData.beneficiary);
  await beneficiaries.expectBeneficiaryListed(testData.beneficiary.firstName);
  await beneficiaries.expectRunningTotal(100);
});

// Negative: uses an existing draft id from the environment; excluded from regression runs.
test('BEN-V02 allocation below 100% blocks progression @negative', async ({ authedPage }) => {
  const beneficiaries = new BeneficiaryPage(authedPage);
  await beneficiaries.goto(testData.seedApplicationId);
  await beneficiaries.addPrimary({ ...testData.beneficiary, allocation: '50' });
  await beneficiaries.expectAllocationError();
});
