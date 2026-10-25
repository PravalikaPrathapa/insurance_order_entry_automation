// Single source of test data. Values are placeholders until confirmed against the seed data.
const testData = {
  client: {
    firstName: 'Asha',
    lastName: 'Rao',
    dob: '01/15/1990', // age 36 - inside the 18-65 eligibility window
    gender: 'Female',
    maritalStatus: 'Single',
    nationality: 'Indian',
    occupation: 'Engineer',
    employer: 'Demo Corp',
  },
  address: {
    line1: '12 Main Street',
    city: 'Austin',
    state: 'TX',
    postalCode: '78701',
    email: 'asha.rao@example.test',
    mobile: '9876543210',
    preferredContact: 'Email',
  },
  kyc: {
    idType: 'Passport',
    idNumber: 'P1234567',
    idIssueDate: '01/01/2020',
    idExpiryDate: '01/01/2030',
    annualIncome: '120000',
    netWorth: '450000',
    sourceOfFunds: 'Salary',
    riskProfile: 'Moderate',
  },
  policy: {
    faceValue: '250000',
    premiumFrequency: 'Monthly',
    alternateFrequency: 'Annual',
  },
  beneficiary: {
    firstName: 'Ravi',
    lastName: 'Rao',
    dob: '02/10/1988',
    relationship: 'Spouse',
    type: 'Individual',
    allocation: '100',
  },
  documentFile: 'fixtures/files/sample-kyc.pdf',
  // Application id used by tests that need an existing draft (set in the shell)
  seedApplicationId: process.env.SEED_APPLICATION_ID || 'TEST',
};

module.exports = { testData };
