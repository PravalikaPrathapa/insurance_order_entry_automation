const { expect } = require('@playwright/test');

class ProductConfigurationPage {
  constructor(page) {
    this.page = page;
    this.selectProductButton = page.getByRole('button', { name: /select|choose/i }).first();
    this.faceValue = page.getByLabel(/face value|sum assured|coverage/i).first();
    this.premiumFrequency = page.getByLabel(/premium frequency|frequency/i).first();
    this.premiumTotal = page.getByText(/total premium/i).first();
    this.nextButton = page.getByRole('button', { name: /next|continue/i });
  }

  async selectFirstProduct() {
    await this.selectProductButton.click();
  }

  async configure(data) {
    await this.faceValue.fill(data.faceValue);
    await this.setFrequency(data.premiumFrequency);
  }

  async setFrequency(label) {
    await this.premiumFrequency.selectOption({ label });
  }

  async readPremium() {
    await expect(this.premiumTotal).toBeVisible();
    const text = (await this.premiumTotal.textContent()) || '';
    return Number(text.replace(/[^0-9.]/g, ''));
  }

  async next() {
    await this.nextButton.click();
  }
}

module.exports = { ProductConfigurationPage };
