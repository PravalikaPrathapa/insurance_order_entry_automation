const { expect } = require('@playwright/test');

class DashboardPage {
  constructor(page) {
    this.page = page;
    this.newApplicationButton = page.getByRole('button', { name: /new application|start.*application/i }).first();
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/dashboard/);
    await expect(this.newApplicationButton).toBeVisible();
  }

  async startNewApplication() {
    await this.newApplicationButton.click();
  }

  async expectDraftListed(clientName) {
    await expect(
      this.page.getByRole('row').filter({ hasText: clientName }).filter({ hasText: /draft/i }).first()
    ).toBeVisible();
  }

  async openDraft(clientName) {
    await this.page.getByRole('row').filter({ hasText: clientName }).filter({ hasText: /draft/i }).first().click();
  }

  async expectApplicationStatus(reference, status) {
    await expect(this.page.getByRole('row').filter({ hasText: reference })).toContainText(new RegExp(status, 'i'));
  }
}

module.exports = { DashboardPage };
