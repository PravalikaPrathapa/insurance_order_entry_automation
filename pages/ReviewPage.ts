import { Page, expect } from '@playwright/test';
export class ReviewPage {
 constructor(private page:Page){}
 async expectErrors(){ await expect(this.page.getByText(/validation|required|error|missing/i).first()).toBeVisible(); }
 async submit(){ await this.page.getByRole('button',{name:/submit/i}).click(); }
}
