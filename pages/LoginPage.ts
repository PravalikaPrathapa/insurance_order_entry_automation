import { Page, expect } from '@playwright/test';
export class LoginPage {
  constructor(private page: Page) {}
  async goto(){ await this.page.goto('/login'); }
  async login(username:string,password:string){
    await this.page.getByLabel(/user(name)?|email/i).fill(username);
    await this.page.getByLabel(/password/i).fill(password);
    await this.page.getByRole('button',{name:/log in|sign in/i}).click();
  }
  async expectDashboard(){ await expect(this.page).toHaveURL(/dashboard/); }
  async expectError(){ await expect(this.page.getByText(/invalid|incorrect|error|locked|required/i).first()).toBeVisible(); }
}
