const { expect } = require('@playwright/test');

class ReviewPage {
  constructor(page) {
    this.page = page;
    this.submitButton = page.getByRole('button', { name: /^submit/i });
  }

  async expectReadyToSubmit() {
    await expect(this.page).toHaveURL(/\/review$/);
    await expect(this.submitButton).toBeEnabled();
  }

  async submit() {
    await this.submitButton.click();
  }
}

module.exports = { ReviewPage };
