import { expect, Locator, Page } from '@playwright/test';

export class CheckoutStepTwoPage {
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

  readonly qtyLabel: Locator;
  readonly descriptionLabel: Locator;

  readonly cartItems: Locator;
  readonly productNames: Locator;
  readonly productDescriptions: Locator;
  readonly productPrices: Locator;
  readonly productQuantities: Locator;

  readonly paymentInfoLabel: Locator;
  readonly paymentInfoValue: Locator;

  readonly shippingInfoLabel: Locator;
  readonly shippingInfoValue: Locator;

  readonly priceTotalLabel: Locator;
  readonly itemTotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;

  readonly cancelButton: Locator;
  readonly finishButton: Locator;

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

    this.qtyLabel = page.locator('.cart_quantity_label');
    this.descriptionLabel = page.locator('.cart_desc_label');

    this.cartItems = page.locator('.cart_item');
    this.productNames = page.locator('.inventory_item_name');
    this.productDescriptions = page.locator('.inventory_item_desc');
    this.productPrices = page.locator('.inventory_item_price');
    this.productQuantities = page.locator('.cart_quantity');

    this.paymentInfoLabel = page.locator('.summary_info_label').nth(0);
    this.paymentInfoValue = page.locator('.summary_value_label').nth(0);

    this.shippingInfoLabel = page.locator('.summary_info_label').nth(1);
    this.shippingInfoValue = page.locator('.summary_value_label').nth(1);

    this.priceTotalLabel = page.locator('.summary_info_label').nth(2);
    this.itemTotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');

    this.cancelButton = page.locator('[data-test="cancel"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async verifyPageLoaded() {
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
    await expect(this.title).toHaveText('Checkout: Overview');
  }

  async verifyCheckoutStepTwoUrl() {
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
  }

  async verifyCheckoutStepOneUrl() {
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
  }

  async verifyCheckoutCompleteUrl() {
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
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

  async verifyTitle() {
    await expect(this.title).toHaveText('Checkout: Overview');
  }

  async verifyNoActionAfterTitleClick() {
    const currentUrl = this.page.url();

    await this.title.click();

    await expect(this.page).toHaveURL(currentUrl);
    await expect(this.title).toHaveText('Checkout: Overview');
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

  async verifyProductListDisplayed() {
    await expect(this.cartItems).toHaveCount(1);
  }

  async verifyProductDisplayed(productName: string) {
    await expect(this.getProduct(productName)).toBeVisible();
  }

  async verifyProductName(productName: string) {
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

  async hoverProductName(productName: string) {
    await this.getProduct(productName)
      .locator('.inventory_item_name')
      .hover();
  }

  async clickProductName(productName: string) {
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

  async verifyProductInfo(productName: string) {
    await this.verifyProductName(productName);
    await this.verifyProductDescription(productName);
    await this.verifyProductPrice(productName);
    await this.verifyProductQuantity(productName, '1');
  }

  async verifyPaymentInfoTitle() {
    await expect(this.paymentInfoLabel).toHaveText('Payment Information:');
  }

  async verifyPaymentInfoValue() {
    await expect(this.paymentInfoValue).toBeVisible();
    await expect(this.paymentInfoValue).toContainText('SauceCard');
  }

  async clickPaymentInfoTitleAndVerifyNoAction() {
    const currentUrl = this.page.url();

    await this.paymentInfoLabel.click();

    await expect(this.page).toHaveURL(currentUrl);
  }

  async clickPaymentInfoValueAndVerifyNoAction() {
    const currentUrl = this.page.url();

    await this.paymentInfoValue.click();

    await expect(this.page).toHaveURL(currentUrl);
  }

  async verifyShippingInfoTitle() {
    await expect(this.shippingInfoLabel).toHaveText('Shipping Information:');
  }

  async verifyShippingInfoValue() {
    await expect(this.shippingInfoValue).toBeVisible();
    await expect(this.shippingInfoValue).toContainText(
      'Free Pony Express Delivery!'
    );
  }

  async clickShippingInfoTitleAndVerifyNoAction() {
    const currentUrl = this.page.url();

    await this.shippingInfoLabel.click();

    await expect(this.page).toHaveURL(currentUrl);
  }

  async clickShippingInfoValueAndVerifyNoAction() {
    const currentUrl = this.page.url();

    await this.shippingInfoValue.click();

    await expect(this.page).toHaveURL(currentUrl);
  }

  async verifyPriceTotalTitle() {
    await expect(this.priceTotalLabel).toHaveText('Price Total');
  }

  async verifyItemTotal() {
    await expect(this.itemTotalLabel).toContainText('Item total: $');
  }

  async verifyTax() {
    await expect(this.taxLabel).toContainText('Tax: $');
  }

  async verifyTotal() {
    await expect(this.totalLabel).toContainText('Total: $');
  }

  private async getAmount(locator: Locator) {
    const text = await locator.innerText();
    const matched = text.match(/\$([0-9.]+)/);

    return Number(matched?.[1] ?? 0);
  }

  async verifyTotalCalculation() {
    const itemTotal = await this.getAmount(this.itemTotalLabel);
    const tax = await this.getAmount(this.taxLabel);
    const total = await this.getAmount(this.totalLabel);

    expect(Number((itemTotal + tax).toFixed(2))).toBe(total);
  }

  async clickPriceTotalTitleAndVerifyNoAction() {
    const currentUrl = this.page.url();

    await this.priceTotalLabel.click();

    await expect(this.page).toHaveURL(currentUrl);
  }

  async clickAmountAndVerifyNoAction() {
    const currentUrl = this.page.url();

    await this.totalLabel.click();

    await expect(this.page).toHaveURL(currentUrl);
  }

  async verifyCartIconVisible() {
    await expect(this.cartIcon).toBeVisible();
  }

  async verifyCartBadge(number: string) {
    await expect(this.cartBadge).toHaveText(number);
  }

  async openCart() {
    await this.cartIcon.click();
  }

  async verifyCancelButton() {
    await expect(this.cancelButton).toBeVisible();
    await expect(this.cancelButton).toBeEnabled();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }

  async verifyFinishButton() {
    await expect(this.finishButton).toBeVisible();
    await expect(this.finishButton).toBeEnabled();
  }

  async finish() {
    await this.finishButton.click();
  }

  async gotoCheckoutComplete() {
    await this.finish();
    await this.verifyCheckoutCompleteUrl();
  }
}