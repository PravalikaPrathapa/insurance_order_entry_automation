const { test, expect } = require('../../fixtures/auth.fixture');
const { ReviewPage } = require('../../pages/ReviewPage');
const { ConfirmationPage } = require('../../pages/ConfirmationPage');
const { DashboardPage } = require('../../pages/DashboardPage');
const { completeApplicationUpTo } = require('../../utils/journey');

// Core E2E happy path: login -> dashboard -> new application -> all steps -> submit -> dashboard status.
test('WF-V03 and WF-V06 complete application is submitted and shows as Submitted on dashboard @regression', async ({ authedPage }) => {
  await completeApplicationUpTo(authedPage, 'review');

  const review = new ReviewPage(authedPage);
  await review.expectReadyToSubmit();
  await review.submit();

  const confirmation = new ConfirmationPage(authedPage);
  await confirmation.expectSuccess();
  const reference = await confirmation.getReferenceNumber();

  await authedPage.goto('/dashboard');
  await new DashboardPage(authedPage).expectApplicationStatus(reference, 'Submitted');
});
