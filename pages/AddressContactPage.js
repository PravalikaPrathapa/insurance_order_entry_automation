const { expect } = require('@playwright/test');

class AddressContactPage {
  constructor(page) {
    this.page = page;
    this.line1 = page.getByLabel(/residential.*address|address line 1|street/i).first();
    this.city = page.getByLabel(/city/i).first();
    this.state = page.getByLabel(/state/i).first();
    this.postalCode = page.getByLabel(/postal code|zip/i).first();
    this.sameAsResidential = page.getByLabel(/same as residential/i);
    this.mailingLine1 = page.getByLabel(/mailing.*address|mailing address line 1/i).first();
    this.email = page.getByLabel(/^email/i);
    this.mobile = page.getByLabel(/mobile/i);
    this.preferredContact = page.getByLabel(/preferred communication/i);
    this.nextButton = page.getByRole('button', { name: /next|continue/i });
  }

  async fill(data) {
    await this.line1.fill(data.line1);
    await this.city.fill(data.city);
    await this.state.selectOption({ label: data.state });
    await this.postalCode.fill(data.postalCode);
    await this.email.fill(data.email);
    await this.mobile.fill(data.mobile);
    await this.preferredContact.selectOption({ label: data.preferredContact });
  }

  async copyResidentialToMailing() {
    await this.sameAsResidential.check();
  }

  async expectMailingCopied(line1) {
    await expect(this.mailingLine1).toHaveValue(line1);
  }

  async next() {
    await this.nextButton.click();
  }
}

module.exports = { AddressContactPage };
