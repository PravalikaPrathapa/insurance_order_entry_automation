const { test } = require('../../fixtures/auth.fixture');
const { DocumentUploadPage } = require('../../pages/DocumentUploadPage');
const { completeApplicationUpTo } = require('../../utils/journey');
const path = require('path');

test('DOC-V01 valid KYC document uploads successfully @regression', async ({ authedPage }) => {
  await completeApplicationUpTo(authedPage, 'documents');
  const docs = new DocumentUploadPage(authedPage);
  await docs.upload(path.resolve(__dirname, '../../fixtures/files/sample-kyc.pdf'));
  await docs.expectUploaded();
});
