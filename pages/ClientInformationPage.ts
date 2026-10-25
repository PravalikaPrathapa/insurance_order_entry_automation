import { Page, expect } from '@playwright/test';
export class ClientInformationPage {
 constructor(private page:Page){}
 async fillClient(d:any){
  await this.page.getByLabel(/first name/i).fill(d.firstName);
  await this.page.getByLabel(/last name/i).fill(d.lastName);
  await this.page.getByLabel(/date of birth|dob/i).fill(d.dob);
  const email=this.page.getByLabel(/email/i); if(await email.count()) await email.fill(d.email);
  const phone=this.page.getByLabel(/mobile|phone/i).first(); if(await phone.count()) await phone.fill(d.phone);
 }
 async next(){ await this.page.getByRole('button',{name:/next|continue|save.*continue/i}).click(); }
 async expectValidation(){ await expect(this.page.getByText(/required|invalid|eligible|future/i).first()).toBeVisible(); }
}
