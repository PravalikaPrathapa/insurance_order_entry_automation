const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.getByLabel(/user ?name|email/i);
    this.password = page.getByLabel(/password/i);
    this.loginButton = page.getByRole('button', { name: /log ?in|sign ?in/i });
    this.logoutButton = page.getByRole('button', { name: /log ?out|sign ?out/i });
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async logout() {
    await this.logoutButton.click();
  }

  async expectDashboard() {
    await expect(this.page).toHaveURL(/dashboard/);
  }

  async expectLoginPage() {
    await expect(this.page).toHaveURL(/login/);
    await expect(this.loginButton).toBeVisible();
  }

  async expectError() {
    await expect(this.page.getByText(/invalid|incorrect|error|locked|required/i).first()).toBeVisible();
  }
}

module.exports = { LoginPage };
