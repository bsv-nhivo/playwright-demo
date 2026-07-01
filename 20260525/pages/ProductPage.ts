import { expect, Locator, Page } from '@playwright/test';

export class ProductPage {
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

  readonly title: Locator;
  readonly inventoryList: Locator;
  readonly inventoryItems: Locator;
  readonly productNames: Locator;
  readonly productImages: Locator;
  readonly productDescriptions: Locator;
  readonly productPrices: Locator;

  readonly sortDropdown: Locator;
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

    this.title = page.locator('.title');
    this.inventoryList = page.locator('.inventory_list');
    this.inventoryItems = page.locator('.inventory_item');
    this.productNames = page.locator('.inventory_item_name');
    this.productImages = page.locator('.inventory_item_img img');
    this.productDescriptions = page.locator('.inventory_item_desc');
    this.productPrices = page.locator('.inventory_item_price');

    this.sortDropdown = page.locator(
      '[data-test="product-sort-container"]'
    );

    this.footer = page.locator('.footer');
  }

  async verifyPageLoaded() {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.title).toHaveText('Products');
  }

  async verifyInventoryUrl() {
    await expect(this.page).toHaveURL(/inventory\.html/);
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

  async verifyProductsTitle() {
    await expect(this.title).toHaveText('Products');
  }

  async verifyNoActionAfterProductsTitleClick() {
    const currentUrl = this.page.url();

    await this.title.click();

    await expect(this.page).toHaveURL(currentUrl);
    await expect(this.title).toHaveText('Products');
  }

  async verifyProductListDisplayed() {
    await expect(this.inventoryList).toBeVisible();
    await expect(this.inventoryItems).toHaveCount(6);
  }

  async verifyAllProductTitlesDisplayed() {
    await expect(this.productNames).toHaveCount(6);

    for (let i = 0; i < 6; i++) {
      await expect(this.productNames.nth(i)).toBeVisible();
    }
  }

  async verifyAllProductImagesDisplayed() {
    await expect(this.productImages).toHaveCount(6);

    for (let i = 0; i < 6; i++) {
      await expect(this.productImages.nth(i)).toBeVisible();
    }
  }

  async verifyAllProductDescriptionsDisplayed() {
    await expect(this.productDescriptions).toHaveCount(6);

    for (let i = 0; i < 6; i++) {
      await expect(this.productDescriptions.nth(i)).toBeVisible();
    }
  }

  async verifyAllProductPricesDisplayed() {
    await expect(this.productPrices).toHaveCount(6);

    for (let i = 0; i < 6; i++) {
      await expect(this.productPrices.nth(i)).toBeVisible();
    }
  }

  getProduct(productName: string) {
    return this.inventoryItems.filter({
      has: this.page.locator('.inventory_item_name', {
        hasText: productName,
      }),
    });
  }

  async verifyAddToCartButton(productName: string) {
    const button = this.getProduct(productName).locator('button');

    await expect(button).toHaveText('Add to cart');
    await expect(button).toBeEnabled();
  }

  async verifyRemoveButton(productName: string) {
    const button = this.getProduct(productName).locator('button');

    await expect(button).toHaveText('Remove');
    await expect(button).toBeEnabled();
  }

  async addProduct(productName: string) {
    await this.getProduct(productName)
      .locator('button')
      .click();
  }

  async removeProduct(productName: string) {
    await this.getProduct(productName)
      .locator('button')
      .click();
  }

  async verifyButtonText(
    productName: string,
    text: string
  ) {
    await expect(
      this.getProduct(productName).locator('button')
    ).toHaveText(text);
  }

  async clickProductDescriptionAndVerifyNoAction(
    productName: string
  ) {
    const currentUrl = this.page.url();

    await this.getProduct(productName)
      .locator('.inventory_item_desc')
      .click();

    await expect(this.page).toHaveURL(currentUrl);
  }

  async clickProductPriceAndVerifyNoAction(
    productName: string
  ) {
    const currentUrl = this.page.url();

    await this.getProduct(productName)
      .locator('.inventory_item_price')
      .click();

    await expect(this.page).toHaveURL(currentUrl);
  }

  async clickProduct(productName: string) {
    await this.getProduct(productName)
      .locator('.inventory_item_name')
      .click();
  }

  async clickProductImage(productName: string) {
    await this.getProduct(productName)
      .locator('a')
      .first()
      .click();
  }

  async verifyCartBadge(number: string) {
    await expect(this.cartBadge).toHaveText(number);
  }

  async verifyCartBadgeHidden() {
    await expect(this.cartBadge).toHaveCount(0);
  }

  async verifyCartIconVisible() {
    await expect(this.cartIcon).toBeVisible();
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

  async scrollToTop() {
    await this.page.evaluate(() =>
      window.scrollTo(0, 0)
    );

    await expect(this.appLogo).toBeVisible();
  }

  async verifyFooterVisible() {
    await expect(this.footer).toBeVisible();
  }

  async verifySortDropdownVisible() {
    await expect(this.sortDropdown).toBeVisible();
  }

  async verifyDefaultSort() {
    await expect(this.sortDropdown).toHaveValue('az');
  }

  async verifySortOptions() {
    const options = await this.sortDropdown
      .locator('option')
      .allTextContents();

    expect(options).toEqual([
      'Name (A to Z)',
      'Name (Z to A)',
      'Price (low to high)',
      'Price (high to low)',
    ]);
  }

  async selectSortOption(label: string) {
    await this.sortDropdown.selectOption({
      label,
    });
  }

  async getProductNameTexts() {
    return await this.productNames.allTextContents();
  }

  async getProductPrices() {
    const priceTexts =
      await this.productPrices.allTextContents();

    return priceTexts.map((price) =>
      Number(price.replace('$', ''))
    );
  }

  async verifyProductNamesAscending() {
    const names = await this.getProductNameTexts();
    const sorted = [...names].sort();

    expect(names).toEqual(sorted);
  }

  async verifyProductNamesDescending() {
    const names = await this.getProductNameTexts();
    const sorted = [...names].sort().reverse();

    expect(names).toEqual(sorted);
  }

  async verifyPricesAscending() {
    const prices = await this.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sorted);
  }

  async verifyPricesDescending() {
    const prices = await this.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sorted);
  }
}