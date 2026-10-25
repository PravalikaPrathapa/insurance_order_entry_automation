import { Page, expect } from '@playwright/test';
export class DashboardPage {
 constructor(private page:Page){}
 async expectLoaded(){ await expect(this.page.getByRole('button',{name:/new application|start.*application/i}).first()).toBeVisible(); }
 async startApplication(){ await this.page.getByRole('button',{name:/new application|start.*application/i}).first().click(); }
}
