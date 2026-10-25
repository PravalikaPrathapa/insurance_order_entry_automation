import { Page, expect } from '@playwright/test';
export class RiderSelectionPage {
 constructor(private page:Page){}
 async addADB(){ const x=this.page.getByText(/accidental death|ADB/i).first(); await expect(x).toBeVisible(); await x.click(); }
 async next(){ await this.page.getByRole('button',{name:/next|continue/i}).click(); }
}
