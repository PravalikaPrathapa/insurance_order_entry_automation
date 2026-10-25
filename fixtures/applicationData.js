// Re-exports the shared test data so there is one source of truth.
const { testData } = require('../objects/testData');

module.exports = { applicant: testData.client, beneficiary: testData.beneficiary, testData };
