// Shared happy-path steps so each test can reach the page it cares about.
const { expect } = require('@playwright/test');
const { DashboardPage } = require('../pages/DashboardPage');
const { ClientInformationPage } = require('../pages/ClientInformationPage');
const { AddressContactPage } = require('../pages/AddressContactPage');
const { KycFinancialPage } = require('../pages/KycFinancialPage');
const { ProductConfigurationPage } = require('../pages/ProductConfigurationPage');
const { RiderSelectionPage } = require('../pages/RiderSelectionPage');
const { BeneficiaryPage } = require('../pages/BeneficiaryPage');
const { DocumentUploadPage } = require('../pages/DocumentUploadPage');
const { testData } = require('../objects/testData');
const { waitForApplicationId } = require('./testHelpers');

const path = require('path');
const SAMPLE_DOC = path.resolve(__dirname, '..', testData.documentFile);

// Each step: [name, action, URL that must be reached after the action]
const STEPS = [
  { name: 'client', next: /\/address-contact$/ },
  { name: 'address', next: /\/kyc-financial$/ },
  { name: 'kyc', next: /\/product$/ },
  { name: 'product', next: /\/riders$/ },
  { name: 'riders', next: /\/beneficiaries$/ },
  { name: 'beneficiaries', next: /\/documents$/ },
  { name: 'documents', next: /\/review$/ },
];

const actions = {
  async client(page) {
    const p = new ClientInformationPage(page);
    await p.fill(testData.client);
    await p.next();
  },
  async address(page) {
    const p = new AddressContactPage(page);
    await p.fill(testData.address);
    await p.next();
  },
  async kyc(page) {
    const p = new KycFinancialPage(page);
    await p.fill(testData.kyc);
    await p.next();
  },
  async product(page) {
    const p = new ProductConfigurationPage(page);
    await p.selectFirstProduct();
    await p.configure(testData.policy);
    await p.next();
  },
  async riders(page) {
    const p = new RiderSelectionPage(page);
    await p.addAccidentalDeathBenefit();
    await p.next();
  },
  async beneficiaries(page) {
    const p = new BeneficiaryPage(page);
    await p.addPrimary(testData.beneficiary);
    await p.next();
  },
  async documents(page) {
    const p = new DocumentUploadPage(page);
    await p.upload(SAMPLE_DOC);
    await p.expectUploaded();
    await p.next();
  },
};

// Starts a new application from the dashboard and returns its id.
async function startNewApplication(page) {
  const dashboard = new DashboardPage(page);
  await dashboard.expectLoaded();
  await dashboard.startNewApplication();
  return waitForApplicationId(page);
}

// Completes steps in order until the page for `target` is reached.
// Valid targets: 'address', 'kyc', 'product', 'riders', 'beneficiaries', 'documents', 'review'.
async function completeApplicationUpTo(page, target) {
  const targetIndex = target === 'review' ? STEPS.length : STEPS.findIndex((s) => s.name === target);
  if (targetIndex < 0) throw new Error(`Unknown journey step: ${target}`);
  for (let i = 0; i < targetIndex; i++) {
    await actions[STEPS[i].name](page);
    await expect(page).toHaveURL(STEPS[i].next);
  }
}

module.exports = { startNewApplication, completeApplicationUpTo, actions, STEPS };
