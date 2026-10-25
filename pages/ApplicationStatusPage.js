const { expect } = require('@playwright/test');

class ApplicationStatusPage {
  constructor(page) {
    this.page = page;
  }

  async expectStatus(status) {
    await expect(this.page.getByText(new RegExp(status, 'i')).first()).toBeVisible();
  }
}

module.exports = { ApplicationStatusPage };
