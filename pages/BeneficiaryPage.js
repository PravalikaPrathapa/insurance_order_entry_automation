const { expect } = require('@playwright/test');

class BeneficiaryPage {
  constructor(page) {
    this.page = page;
    this.addButton = page.getByRole('button', { name: /add beneficiary/i });
    this.firstName = page.getByLabel(/first name/i);
    this.lastName = page.getByLabel(/last name/i);
    this.dob = page.getByLabel(/date of birth|dob/i);
    this.relationship = page.getByLabel(/relationship/i);
    this.type = page.getByLabel(/beneficiary type/i);
    this.allocation = page.getByLabel(/allocation|percentage/i);
    this.saveButton = page.getByRole('button', { name: /save beneficiary/i });
    this.nextButton = page.getByRole('button', { name: /next|continue/i });
  }

  async goto(applicationId) {
    await this.page.goto(`/applications/${applicationId}/beneficiaries`);
  }

  async addPrimary(data) {
    await this.addButton.click();
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.dob.fill(data.dob);
    await this.relationship.selectOption({ label: data.relationship });
    await this.type.selectOption({ label: data.type });
    await this.allocation.fill(data.allocation);
    await this.saveButton.click();
  }

  async expectBeneficiaryListed(firstName) {
    await expect(this.page.getByText(new RegExp(firstName, 'i')).first()).toBeVisible();
  }

  async expectRunningTotal(percent) {
    await expect(this.page.getByText(new RegExp(`${percent}\\s?%`)).first()).toBeVisible();
  }

  async expectAllocationError() {
    await expect(this.page.getByText(/100\s?%|allocation/i).first()).toBeVisible();
  }

  async next() {
    await this.nextButton.click();
  }
}

module.exports = { BeneficiaryPage };
