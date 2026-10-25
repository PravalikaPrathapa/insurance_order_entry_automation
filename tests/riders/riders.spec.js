const { test, expect } = require('../../fixtures/auth.fixture');
const { RiderSelectionPage } = require('../../pages/RiderSelectionPage');
const { completeApplicationUpTo } = require('../../utils/journey');

test('RIDER-V01 eligible accidental death rider can be added @regression', async ({ authedPage }) => {
  await completeApplicationUpTo(authedPage, 'riders');
  const riders = new RiderSelectionPage(authedPage);
  await riders.addAccidentalDeathBenefit();
  await expect(authedPage).toHaveURL(/\/riders$/);
});
