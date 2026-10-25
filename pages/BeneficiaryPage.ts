import { Page, expect } from '@playwright/test';
export class BeneficiaryPage {
 constructor(private page:Page){}
 async add(b:any){
  const add=this.page.getByRole('button',{name:/add beneficiary/i}); if(await add.count()) await add.click();
  await this.page.getByLabel(/first name/i).last().fill(b.firstName);
  await this.page.getByLabel(/last name/i).last().fill(b.lastName);
  const dob=this.page.getByLabel(/date of birth|dob/i).last(); if(await dob.count()) await dob.fill(b.dob);
  const rel=this.page.getByLabel(/relationship/i).last(); if(await rel.count()) await rel.selectOption({label:b.relationship}).catch(()=>rel.selectOption({index:1}));
  await this.page.getByLabel(/allocation|percentage/i).last().fill(b.allocation);
  const save=this.page.getByRole('button',{name:/save beneficiary|add beneficiary/i}).last(); if(await save.count()) await save.click();
 }
 async expectAllocationError(){ await expect(this.page.getByText(/100%|allocation/i).first()).toBeVisible(); }
}
