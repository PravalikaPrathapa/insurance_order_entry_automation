const { expect } = require('@playwright/test');

class RiderSelectionPage {
  constructor(page) {
    this.page = page;
    this.adbRider = page.getByRole('checkbox', { name: /accidental death|ADB/i });
    this.nextButton = page.getByRole('button', { name: /next|continue/i });
  }

  async addAccidentalDeathBenefit() {
    await this.adbRider.check();
    await expect(this.adbRider).toBeChecked();
  }

  async next() {
    await this.nextButton.click();
  }
}

module.exports = { RiderSelectionPage };
