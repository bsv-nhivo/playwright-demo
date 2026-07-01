import { expect, Locator, Page } from '@playwright/test';

export class CheckoutStepOnePage {
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

  readonly firstNameTextbox: Locator;
  readonly lastNameTextbox: Locator;
  readonly postalCodeTextbox: Locator;

  readonly continueButton: Locator;
  readonly cancelButton: Locator;

  readonly errorMessage: Locator;
  readonly errorButton: Locator;
  readonly errorIcons: Locator;

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

    this.firstNameTextbox = page.locator('[data-test="firstName"]');
    this.lastNameTextbox = page.locator('[data-test="lastName"]');
    this.postalCodeTextbox = page.locator('[data-test="postalCode"]');

    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');

    this.errorMessage = page.locator('[data-test="error"]');
    this.errorButton = page.locator('.error-button');
    this.errorIcons = page.locator('svg.error_icon');
  }

  async verifyPageLoaded() {
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
    await expect(this.title).toHaveText('Checkout: Your Information');
  }

  async verifyCheckoutStepOneUrl() {
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
  }

  async verifyCheckoutStepTwoUrl() {
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
  }

  async verifyCartUrl() {
    await expect(this.page).toHaveURL(/cart\.html/);
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

  async verifyTitle() {
    await expect(this.title).toHaveText('Checkout: Your Information');
  }

  async verifyNoActionAfterTitleClick() {
    const currentUrl = this.page.url();

    await this.title.click();

    await expect(this.page).toHaveURL(currentUrl);
    await expect(this.title).toHaveText('Checkout: Your Information');
  }

  async verifyFirstNamePlaceholder() {
    await expect(this.firstNameTextbox).toHaveAttribute(
      'placeholder',
      'First Name'
    );
  }

  async inputFirstName(firstName: string) {
    await this.firstNameTextbox.fill(firstName);
  }

  async clearFirstName() {
    await this.firstNameTextbox.clear();
  }

  async verifyFirstNameValue(firstName: string) {
    await expect(this.firstNameTextbox).toHaveValue(firstName);
  }

  async verifyFirstNameErrorState() {
    await expect(this.firstNameTextbox).toHaveClass(/error/);
  }

  async verifyLastNamePlaceholder() {
    await expect(this.lastNameTextbox).toHaveAttribute(
      'placeholder',
      'Last Name'
    );
  }

  async inputLastName(lastName: string) {
    await this.lastNameTextbox.fill(lastName);
  }

  async clearLastName() {
    await this.lastNameTextbox.clear();
  }

  async verifyLastNameValue(lastName: string) {
    await expect(this.lastNameTextbox).toHaveValue(lastName);
  }

  async verifyLastNameErrorState() {
    await expect(this.lastNameTextbox).toHaveClass(/error/);
  }

  async verifyPostalCodePlaceholder() {
    await expect(this.postalCodeTextbox).toHaveAttribute(
      'placeholder',
      'Zip/Postal Code'
    );
  }

  async inputPostalCode(postalCode: string) {
    await this.postalCodeTextbox.fill(postalCode);
  }

  async clearPostalCode() {
    await this.postalCodeTextbox.clear();
  }

  async verifyPostalCodeValue(postalCode: string) {
    await expect(this.postalCodeTextbox).toHaveValue(postalCode);
  }

  async verifyPostalCodeErrorState() {
    await expect(this.postalCodeTextbox).toHaveClass(/error/);
  }

  async focusLastName() {
    await this.lastNameTextbox.focus();
  }

  async focusPostalCode() {
    await this.postalCodeTextbox.focus();
  }

  async verifyContinueButton() {
    await expect(this.continueButton).toBeVisible();
    await expect(this.continueButton).toBeEnabled();
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async continue() {
    await this.clickContinue();
  }

  async fillInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.inputFirstName(firstName);
    await this.inputLastName(lastName);
    await this.inputPostalCode(postalCode);
  }

  async gotoCheckoutStepTwo() {
    await this.fillInformation('Nhi', 'Vo', '700000');
    await this.clickContinue();
    await this.verifyCheckoutStepTwoUrl();
  }

  async verifyError(message: string) {
    await expect(this.errorMessage).toHaveText(message);
  }

  async verifyAllInputErrorState() {
    await this.verifyFirstNameErrorState();
    await this.verifyLastNameErrorState();
    await this.verifyPostalCodeErrorState();
    await expect(this.errorIcons).toHaveCount(3);
  }

  async closeError() {
    await this.errorButton.click();
    await expect(this.errorMessage).toHaveCount(0);
  }

  async verifyErrorHidden() {
    await expect(this.errorMessage).toHaveCount(0);
  }

  async verifyInputValues(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.verifyFirstNameValue(firstName);
    await this.verifyLastNameValue(lastName);
    await this.verifyPostalCodeValue(postalCode);
  }

  async verifyCancelButton() {
    await expect(this.cancelButton).toBeVisible();
    await expect(this.cancelButton).toBeEnabled();
  }

  async clickCancel() {
    await this.cancelButton.click();
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
}