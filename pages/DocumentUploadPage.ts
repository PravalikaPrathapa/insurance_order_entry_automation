import { Page, expect } from '@playwright/test';
export class DocumentUploadPage {
 constructor(private page:Page){}
 async upload(path:string){ await this.page.locator('input[type=file]').first().setInputFiles(path); }
 async expectUploaded(){ await expect(this.page.getByText(/uploaded|complete|success/i).first()).toBeVisible(); }
}
