import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  readonly appLogo: Locator;
  readonly menuButton: Locator;
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;

  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly resetAppStateLink: Locator;
  readonly closeMenuButton: Locator;

  readonly title: Locator;
  readonly cartList: Locator;
  readonly cartItems: Locator;

  readonly qtyLabel: Locator;
  readonly descriptionLabel: Locator;

  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  readonly footer: Locator;
  readonly twitterIcon: Locator;
  readonly facebookIcon: Locator;
  readonly linkedInIcon: Locator;
  readonly copyright: Locator;

  constructor(page: Page) {
    this.page = page;

    this.appLogo = page.locator('.app_logo');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');

    this.allItemsLink = page.locator('#inventory_sidebar_link');
    this.aboutLink = page.locator('#about_sidebar_link');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.resetAppStateLink = page.locator('#reset_sidebar_link');
    this.closeMenuButton = page.locator('#react-burger-cross-btn');

    this.title = page.locator('.title');
    this.cartList = page.locator('.cart_list');
    this.cartItems = page.locator('.cart_item');

    this.qtyLabel = page.locator('.cart_quantity_label');
    this.descriptionLabel = page.locator('.cart_desc_label');

    this.continueShoppingButton = page.locator(
      '[data-test="continue-shopping"]'
    );

    this.checkoutButton = page.locator(
      '[data-test="checkout"]'
    );

    this.footer = page.locator('.footer');
    this.twitterIcon = page.locator('[data-test="social-twitter"]');
    this.facebookIcon = page.locator('[data-test="social-facebook"]');
    this.linkedInIcon = page.locator('[data-test="social-linkedin"]');
    this.copyright = page.locator('.footer_copy');
  }

  async verifyPageLoaded() {
    await expect(this.page).toHaveURL(/cart\.html/);
    await expect(this.title).toHaveText('Your Cart');
  }

  async verifyCartUrl() {
    await expect(this.page).toHaveURL(/cart\.html/);
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

  async clickAllItems() {
    await this.allItemsLink.click();
  }

  async verifyInventoryUrl() {
    await expect(this.page).toHaveURL(/inventory\.html/);
  }

  async logout() {
    await this.openMenu();
    await this.verifyMenuOpened();

    await this.logoutLink.click();

    await expect(this.page).toHaveURL('/');
  }

  async closeMenu() {
    await this.closeMenuButton.click();
  }

  async verifyMenuClosed() {
    await expect(this.allItemsLink).not.toBeVisible();
  }

  async verifyTitle() {
    await expect(this.title).toHaveText('Your Cart');
  }

  async verifyNoActionAfterTitleClick() {
    const currentUrl = this.page.url();

    await this.title.click();

    await expect(this.page).toHaveURL(currentUrl);
    await expect(this.title).toHaveText('Your Cart');
  }

  async verifyQtyLabel() {
    await expect(this.qtyLabel).toHaveText('QTY');
  }

  async clickQtyLabelAndVerifyNoAction() {
    const currentUrl = this.page.url();

    await this.qtyLabel.click();

    await expect(this.page).toHaveURL(currentUrl);
  }

  async verifyDescriptionLabel() {
    await expect(this.descriptionLabel).toHaveText('Description');
  }

  async clickDescriptionLabelAndVerifyNoAction() {
    const currentUrl = this.page.url();

    await this.descriptionLabel.click();

    await expect(this.page).toHaveURL(currentUrl);
  }

  getProduct(productName: string) {
    return this.cartItems.filter({
      has: this.page.locator('.inventory_item_name', {
        hasText: productName,
      }),
    });
  }

  async verifyCartItemCount(count: number) {
    await expect(this.cartItems).toHaveCount(count);
  }

  async verifyCartEmpty() {
    await expect(this.cartItems).toHaveCount(0);
    await expect(this.continueShoppingButton).toBeVisible();
    await expect(this.checkoutButton).toBeVisible();
  }

  async verifyProductDisplayed(productName: string) {
    await expect(this.getProduct(productName)).toBeVisible();
  }

  async verifyProductNotDisplayed(productName: string) {
    await expect(this.getProduct(productName)).toHaveCount(0);
  }

  async verifyProductTitle(productName: string) {
    await expect(
      this.getProduct(productName).locator('.inventory_item_name')
    ).toHaveText(productName);
  }

  async verifyProductDescription(productName: string) {
    await expect(
      this.getProduct(productName).locator('.inventory_item_desc')
    ).toBeVisible();
  }

  async verifyProductPrice(productName: string) {
    await expect(
      this.getProduct(productName).locator('.inventory_item_price')
    ).toBeVisible();
  }

  async verifyProductQuantity(
    productName: string,
    quantity: string
  ) {
    await expect(
      this.getProduct(productName).locator('.cart_quantity')
    ).toHaveText(quantity);
  }

  async verifyProductInfo(productName: string) {
    await this.verifyProductTitle(productName);
    await this.verifyProductDescription(productName);
    await this.verifyProductPrice(productName);
    await this.verifyProductQuantity(productName, '1');
    await this.verifyRemoveButton(productName);
  }

  async verifyRemoveButton(productName: string) {
    const removeButton =
      this.getProduct(productName).locator('button');

    await expect(removeButton).toHaveText('Remove');
    await expect(removeButton).toBeVisible();
    await expect(removeButton).toBeEnabled();
  }

  async hoverProductTitle(productName: string) {
    await this.getProduct(productName)
      .locator('.inventory_item_name')
      .hover();
  }

  async clickProductTitle(productName: string) {
    await this.getProduct(productName)
      .locator('.inventory_item_name')
      .click();
  }

  async clickProductDescriptionAndVerifyNoAction(productName: string) {
    const currentUrl = this.page.url();

    await this.getProduct(productName)
      .locator('.inventory_item_desc')
      .click();

    await expect(this.page).toHaveURL(currentUrl);
  }

  async clickProductPriceAndVerifyNoAction(productName: string) {
    const currentUrl = this.page.url();

    await this.getProduct(productName)
      .locator('.inventory_item_price')
      .click();

    await expect(this.page).toHaveURL(currentUrl);
  }

  async clickProductQuantityAndVerifyNoAction(productName: string) {
    const currentUrl = this.page.url();

    await this.getProduct(productName)
      .locator('.cart_quantity')
      .click();

    await expect(this.page).toHaveURL(currentUrl);
  }

  async removeProduct(productName: string) {
    await this.getProduct(productName)
      .locator('button')
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

  async clickCartIconAndVerifyNoAction() {
    const currentUrl = this.page.url();

    await this.cartIcon.click();

    await expect(this.page).toHaveURL(currentUrl);
  }

  async verifyContinueShoppingButton() {
    await expect(this.continueShoppingButton).toBeVisible();
    await expect(this.continueShoppingButton).toBeEnabled();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async verifyCheckoutButton() {
    await expect(this.checkoutButton).toBeVisible();
    await expect(this.checkoutButton).toBeEnabled();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async verifyCheckoutStepOneUrl() {
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
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

  async verifyFooterInformation() {
    await expect(this.twitterIcon).toBeVisible();
    await expect(this.facebookIcon).toBeVisible();
    await expect(this.linkedInIcon).toBeVisible();
    await expect(this.copyright).toBeVisible();
  }

  async scrollToTop() {
    await this.page.evaluate(() =>
      window.scrollTo(0, 0)
    );

    await expect(this.appLogo).toBeVisible();
  }
}