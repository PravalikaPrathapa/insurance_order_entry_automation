const { expect } = require('@playwright/test');

class KycFinancialPage {
  constructor(page) {
    this.page = page;
    this.idType = page.getByLabel(/id type/i);
    this.idNumber = page.getByLabel(/id number/i);
    this.idIssueDate = page.getByLabel(/issue date/i);
    this.idExpiryDate = page.getByLabel(/expiry date/i);
    this.annualIncome = page.getByLabel(/annual income|income/i).first();
    this.netWorth = page.getByLabel(/net worth/i);
    this.sourceOfFunds = page.getByLabel(/source of funds/i);
    this.riskProfile = page.getByLabel(/risk profile/i);
    this.pepNo = page.getByRole('radio', { name: /^no$/i }).first();
    this.declaration = page.getByLabel(/declaration|i confirm/i);
    this.nextButton = page.getByRole('button', { name: /next|continue/i });
  }

  async fill(data) {
    await this.idType.selectOption({ label: data.idType });
    await this.idNumber.fill(data.idNumber);
    await this.idIssueDate.fill(data.idIssueDate);
    await this.idExpiryDate.fill(data.idExpiryDate);
    await this.annualIncome.fill(data.annualIncome);
    await this.netWorth.fill(data.netWorth);
    await this.sourceOfFunds.selectOption({ label: data.sourceOfFunds });
    await this.riskProfile.selectOption({ label: data.riskProfile });
    await this.pepNo.check();
    await this.declaration.check();
  }

  async next() {
    await this.nextButton.click();
  }
}

module.exports = { KycFinancialPage };
