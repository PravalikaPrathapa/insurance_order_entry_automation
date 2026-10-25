const { expect } = require('@playwright/test');

class ProductCatalogPage {
  constructor(page) {
    this.page = page;
    this.wholeLifeProducts = page.getByText(/whole life/i);
    this.firstProductLink = page.getByRole('link', { name: /whole life/i }).first();
  }

  async goto() {
    await this.page.goto('/products');
  }

  async expectProductsListed() {
    await expect(this.wholeLifeProducts.first()).toBeVisible();
  }

  async openFirstProduct() {
    await this.firstProductLink.click();
  }

  async expectDetailVisible() {
    await expect(this.page).toHaveURL(/\/products\/[^/]+/);
    await expect(this.page.getByText(/features|eligibility|coverage/i).first()).toBeVisible();
  }
}

module.exports = { ProductCatalogPage };
