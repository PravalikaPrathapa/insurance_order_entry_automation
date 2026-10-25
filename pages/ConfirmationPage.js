const { expect } = require('@playwright/test');

class ConfirmationPage {
  constructor(page) {
    this.page = page;
    this.successMessage = page.getByText(/submitted|confirmation|reference/i).first();
    this.referenceLabel = page.getByText(/reference/i).first();
  }

  async expectSuccess() {
    await expect(this.successMessage).toBeVisible();
  }

  // Returns the reference number shown on the confirmation screen, e.g. "APP-10023".
  async getReferenceNumber() {
    await expect(this.referenceLabel).toBeVisible();
    const text = (await this.referenceLabel.textContent()) || '';
    const match = text.match(/[A-Z][A-Z0-9-]*\d[A-Z0-9-]*/);
    if (!match) throw new Error(`No reference number found in: "${text}"`);
    return match[0];
  }
}

module.exports = { ConfirmationPage };
