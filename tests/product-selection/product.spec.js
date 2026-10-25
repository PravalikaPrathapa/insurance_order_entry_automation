const { test, expect } = require('../../fixtures/auth.fixture');
const { ProductCatalogPage } = require('../../pages/ProductCatalogPage');
const { ProductConfigurationPage } = require('../../pages/ProductConfigurationPage');
const { completeApplicationUpTo } = require('../../utils/journey');
const { testData } = require('../../objects/testData');

test('PROD-V01 product catalog lists Whole Life products @regression', async ({ authedPage }) => {
  const catalog = new ProductCatalogPage(authedPage);
  await catalog.goto();
  await catalog.expectProductsListed();
});

test('PROD-V02 product detail page opens @regression', async ({ authedPage }) => {
  const catalog = new ProductCatalogPage(authedPage);
  await catalog.goto();
  await catalog.openFirstProduct();
  await catalog.expectDetailVisible();
});

test('PROD-V05 premium recalculates when premium frequency changes @regression', async ({ authedPage }) => {
  await completeApplicationUpTo(authedPage, 'product');
  const config = new ProductConfigurationPage(authedPage);
  await config.configure(testData.policy);
  const monthly = await config.readPremium();

  await config.setFrequency(testData.policy.alternateFrequency);
  const annual = await config.readPremium();

  expect(annual).not.toBe(monthly);
});
