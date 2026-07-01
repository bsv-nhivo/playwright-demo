import { expect, Locator, Page } from '@playwright/test';

export class CheckoutCompletePage {
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

  readonly completeIcon: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;

  readonly backHomeButton: Locator;

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

    this.completeIcon = page.locator('.pony_express');
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');

    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async verifyPageLoaded() {
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
    await expect(this.title).toHaveText('Checkout: Complete!');
  }

  async verifyCheckoutCompleteUrl() {
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
  }

  async verifyInventoryUrl() {
    await expect(this.page).toHaveURL(/inventory\.html/);
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
    await expect(this.title).toHaveText('Checkout: Complete!');
  }

  async verifyNoActionAfterTitleClick() {
    const currentUrl = this.page.url();

    await this.title.click();

    await expect(this.page).toHaveURL(currentUrl);
    await expect(this.title).toHaveText('Checkout: Complete!');
  }

  async verifyCompleteIconVisible() {
    await expect(this.completeIcon).toBeVisible();
  }

  async clickCompleteIconAndVerifyNoAction() {
    const currentUrl = this.page.url();

    await this.completeIcon.click();

    await expect(this.page).toHaveURL(currentUrl);
  }

  async verifyCompleteHeader() {
    await expect(this.completeHeader).toHaveText(
      'Thank you for your order!'
    );
  }

  async clickCompleteHeaderAndVerifyNoAction() {
    const currentUrl = this.page.url();

    await this.completeHeader.click();

    await expect(this.page).toHaveURL(currentUrl);
  }

  async verifyCompleteText() {
    await expect(this.completeText).toHaveText(
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
    );
  }

  async clickCompleteTextAndVerifyNoAction() {
    const currentUrl = this.page.url();

    await this.completeText.click();

    await expect(this.page).toHaveURL(currentUrl);
  }

  async verifyBackHomeButton() {
    await expect(this.backHomeButton).toBeVisible();
    await expect(this.backHomeButton).toBeEnabled();
  }

  async backHome() {
    await this.backHomeButton.click();
  }

  async verifyCartIconVisible() {
    await expect(this.cartIcon).toBeVisible();
  }

  async verifyCartBadgeHidden() {
    await expect(this.cartBadge).toHaveCount(0);
  }

  async openCart() {
    await this.cartIcon.click();
  }
}