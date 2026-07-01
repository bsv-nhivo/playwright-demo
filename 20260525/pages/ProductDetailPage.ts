import { expect, Locator, Page } from '@playwright/test';

export class ProductDetailPage {
  readonly page: Page;

  readonly appLogo: Locator;
  readonly menuButton: Locator;
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;

  readonly menuPanel: Locator;
  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly resetAppStateLink: Locator;
  readonly closeMenuButton: Locator;

  readonly backToProductsButton: Locator;

  readonly productImage: Locator;
  readonly productName: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly productButton: Locator;

  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;

    this.appLogo = page.locator('.app_logo');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');

    this.menuPanel = page.locator('.bm-menu-wrap');
    this.allItemsLink = page.locator('#inventory_sidebar_link');
    this.aboutLink = page.locator('#about_sidebar_link');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.resetAppStateLink = page.locator('#reset_sidebar_link');
    this.closeMenuButton = page.locator('#react-burger-cross-btn');

    this.backToProductsButton = page.locator(
      '[data-test="back-to-products"]'
    );

    this.productImage = page.locator('.inventory_details_img');
    this.productName = page.locator('.inventory_details_name');
    this.productDescription = page.locator(
      '.inventory_details_desc'
    );
    this.productPrice = page.locator('.inventory_details_price');

    this.productButton = page.locator(
      '[data-test="add-to-cart"], [data-test="remove"]'
    );

    this.footer = page.locator('.footer');
  }

  async verifyPageLoaded() {
    await expect(this.page).toHaveURL(/inventory-item/);
    await expect(this.productName).toBeVisible();
    await expect(this.productImage).toBeVisible();
  }

  async verifyProductDetailUrl() {
    await expect(this.page).toHaveURL(
      /inventory-item\.html\?id=\d+/
    );
  }

  async verifyLogo() {
    await expect(this.appLogo).toHaveText('Swag Labs');
  }

  async verifyNoActionAfterLogoClick() {
    const currentUrl = this.page.url();

    await this.appLogo.click();

    await expect(this.page).toHaveURL(currentUrl);
    await expect(this.appLogo).toHaveText('Swag Labs');
  }

  async verifyMenuButtonVisible() {
    await expect(this.menuButton).toBeVisible();
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async verifyMenuOpened() {
    await expect(this.closeMenuButton).toBeVisible();
    await expect(this.allItemsLink).toBeVisible();
    await expect(this.logoutLink).toBeVisible();
  }

  async verifyMenuItems() {
    await expect(this.allItemsLink).toBeVisible();
    await expect(this.aboutLink).toBeVisible();
    await expect(this.logoutLink).toBeVisible();
    await expect(this.resetAppStateLink).toBeVisible();
    await expect(this.closeMenuButton).toBeVisible();
  }

  async closeMenu() {
    await this.closeMenuButton.click();
  }

  async verifyMenuClosed() {
    await expect(this.allItemsLink).not.toBeVisible();
  }

  async logout() {
    await this.openMenu();
    await this.verifyMenuOpened();

    await this.logoutLink.click();

    await expect(this.page).toHaveURL('/');
  }

  async verifyBackToProductsButtonVisible() {
    await expect(this.backToProductsButton).toBeVisible();
  }

  async clickBackToProducts() {
    await this.backToProductsButton.click();
  }

  async verifyInventoryUrl() {
    await expect(this.page).toHaveURL(/inventory\.html/);
  }

  async verifyProductImageVisible() {
    await expect(this.productImage).toBeVisible();
  }

  async verifyProductNameVisible() {
    await expect(this.productName).toBeVisible();
  }

  async verifyProductDescriptionVisible() {
    await expect(this.productDescription).toBeVisible();
  }

  async verifyProductPriceVisible() {
    await expect(this.productPrice).toBeVisible();
  }

  async verifyProductName(name: string) {
    await expect(this.productName).toHaveText(name);
  }

  async verifyButtonText(text: string) {
    await expect(this.productButton).toHaveText(text);
  }

  async verifyAddToCartButton() {
    await expect(this.productButton).toHaveText('Add to cart');
    await expect(this.productButton).toBeEnabled();
  }

  async verifyRemoveButton() {
    await expect(this.productButton).toHaveText('Remove');
    await expect(this.productButton).toBeEnabled();
  }

  async clickProductNameAndVerifyNoAction() {
    const currentUrl = this.page.url();

    await this.productName.click();

    await expect(this.page).toHaveURL(currentUrl);
  }

  async clickProductDescriptionAndVerifyNoAction() {
    const currentUrl = this.page.url();

    await this.productDescription.click();

    await expect(this.page).toHaveURL(currentUrl);
  }

  async clickProductPriceAndVerifyNoAction() {
    const currentUrl = this.page.url();

    await this.productPrice.click();

    await expect(this.page).toHaveURL(currentUrl);
  }

  async clickProductImageAndVerifyNoAction() {
    const currentUrl = this.page.url();

    await this.productImage.click();

    await expect(this.page).toHaveURL(currentUrl);
  }

  async addProduct() {
    await this.productButton.click();
  }

  async removeProduct() {
    await this.productButton.click();
  }

  async verifyCartIconVisible() {
    await expect(this.cartIcon).toBeVisible();
  }

  async verifyCartBadge(number: string) {
    await expect(this.cartBadge).toHaveText(number);
  }

  async verifyCartBadgeHidden() {
    await expect(this.cartBadge).toHaveCount(0);
  }

  async openCart() {
    await this.cartIcon.click();
  }

  async scrollToBottom() {
    await this.page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight)
    );

    await expect(this.footer).toBeVisible();
  }

  async verifyFooterVisible() {
    await expect(this.footer).toBeVisible();
  }

  async scrollToTop() {
    await this.page.evaluate(() =>
      window.scrollTo(0, 0)
    );

    await expect(this.appLogo).toBeVisible();
  }
}