const { expect } = require('@playwright/test');

class ClientInformationPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.getByLabel(/first name/i);
    this.lastName = page.getByLabel(/last name/i);
    this.dob = page.getByLabel(/date of birth|dob/i);
    this.gender = page.getByLabel(/gender/i);
    this.maritalStatus = page.getByLabel(/marital status/i);
    this.nationality = page.getByLabel(/nationality/i);
    this.occupation = page.getByLabel(/occupation/i);
    this.employer = page.getByLabel(/employer/i);
    this.nextButton = page.getByRole('button', { name: /next|continue/i });
    this.saveDraftButton = page.getByRole('button', { name: /save draft/i });
  }

  async fill(data) {
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.dob.fill(data.dob);
    await this.gender.selectOption({ label: data.gender });
    await this.maritalStatus.selectOption({ label: data.maritalStatus });
    await this.nationality.selectOption({ label: data.nationality });
    await this.occupation.fill(data.occupation);
    await this.employer.fill(data.employer);
  }

  async next() {
    await this.nextButton.click();
  }

  async saveDraft() {
    await this.saveDraftButton.click();
    await expect(this.page.getByText(/saved/i).first()).toBeVisible();
  }

  async expectValidation() {
    await expect(this.page.getByText(/required|invalid|eligible|future/i).first()).toBeVisible();
  }
}

module.exports = { ClientInformationPage };
