const { expect } = require('@playwright/test');

class DocumentUploadPage {
  constructor(page) {
    this.page = page;
    this.fileInput = page.locator('input[type="file"]').first();
    this.nextButton = page.getByRole('button', { name: /next|continue/i });
  }

  async upload(filePath) {
    await this.fileInput.setInputFiles(filePath);
  }

  async expectUploaded() {
    await expect(this.page.getByText(/uploaded|success|complete/i).first()).toBeVisible();
  }

  async next() {
    await this.nextButton.click();
  }
}

module.exports = { DocumentUploadPage };
