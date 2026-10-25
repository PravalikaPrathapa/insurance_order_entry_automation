import { Page, expect } from '@playwright/test';
export class ProductConfigurationPage {
 constructor(private page:Page){}
 async selectFirstProduct(){ const b=this.page.getByRole('button',{name:/select|choose/i}).first(); if(await b.count()) await b.click(); }
 async configure(faceValue:string){
  const fv=this.page.getByLabel(/face value|coverage|sum assured/i).first(); if(await fv.count()) await fv.fill(faceValue);
  const freq=this.page.getByLabel(/premium frequency|frequency/i).first(); if(await freq.count()) await freq.selectOption({index:1});
 }
 async expectPremium(){ await expect(this.page.getByText(/premium/i).first()).toBeVisible(); }
}
