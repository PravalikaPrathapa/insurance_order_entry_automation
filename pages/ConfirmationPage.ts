import { Page, expect } from '@playwright/test';
export class ConfirmationPage {
 constructor(private page:Page){}
 async expectSuccess(){ await expect(this.page.getByText(/submitted|confirmation|reference/i).first()).toBeVisible(); }
}
