import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  readonly usernameTextbox: Locator;
  readonly passwordTextbox: Locator;
  readonly loginButton: Locator;

  readonly title: Locator;

  readonly errorMessage: Locator;
  readonly errorButton: Locator;
  readonly usernameErrorIcon: Locator;
  readonly passwordErrorIcon: Locator;

  readonly acceptedUserTitle: Locator;
  readonly acceptedUsers: Locator;

  readonly passwordTitle: Locator;
  readonly passwordText: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameTextbox = page.locator('[data-test="username"]');
    this.passwordTextbox = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');

    this.title = page.locator('.login_logo');

    this.errorMessage = page.locator('[data-test="error"]');
    this.errorButton = page.locator('.error-button');

    this.usernameErrorIcon = page.locator('svg.error_icon').nth(0);
    this.passwordErrorIcon = page.locator('svg.error_icon').nth(1);

    this.acceptedUserTitle = page
      .locator('.login_credentials_wrap h4')
      .first();

    this.acceptedUsers = page.locator('#login_credentials');

    this.passwordTitle = page.locator('.login_password h4');
    this.passwordText = page.locator('.login_password');
  }

  async open() {
    await this.page.goto('/');
  }

  async inputUsername(username: string) {
    await this.usernameTextbox.fill(username);
  }

  async inputPassword(password: string) {
    await this.passwordTextbox.fill(password);
  }

  async clearUsername() {
    await this.usernameTextbox.clear();
  }

  async clearPassword() {
    await this.passwordTextbox.clear();
  }

  async clickTitle() {
    await this.title.click();
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async login(username: string, password: string) {
    await this.inputUsername(username);
    await this.inputPassword(password);
    await this.clickLogin();
  }

  async closeError() {
    await this.errorButton.click();
    await expect(this.errorMessage).toHaveCount(0);
  }

  async verifyPageLoaded() {
    await expect(this.page).toHaveURL('/');
    await expect(this.title).toHaveText('Swag Labs');
  }

  async verifyLoginSuccess() {
    await expect(this.page).toHaveURL(/inventory/);
  }

  async verifyTitle() {
    await expect(this.title).toHaveText('Swag Labs');
  }

  async verifyNoActionAfterTitleClick() {
    const currentUrl = this.page.url();

    await this.clickTitle();

    await expect(this.page).toHaveURL(currentUrl);
    await expect(this.title).toHaveText('Swag Labs');
    await expect(this.errorMessage).toHaveCount(0);
  }

  async verifyUsernamePlaceholder() {
    await expect(this.usernameTextbox).toHaveAttribute(
      'placeholder',
      'Username'
    );
  }

  async verifyUsernameValue(value: string) {
    await expect(this.usernameTextbox).toHaveValue(value);
  }

  async verifyUsernameEmpty() {
    await expect(this.usernameTextbox).toHaveValue('');
  }

  async verifyPasswordPlaceholder() {
    await expect(this.passwordTextbox).toHaveAttribute(
      'placeholder',
      'Password'
    );
  }

  async verifyPasswordValue(value: string) {
    await expect(this.passwordTextbox).toHaveValue(value);
  }

  async verifyPasswordEmpty() {
    await expect(this.passwordTextbox).toHaveValue('');
  }

  async verifyPasswordMasked() {
    await expect(this.passwordTextbox).toHaveAttribute(
      'type',
      'password'
    );
  }

  async verifyLoginButtonVisible() {
    await expect(this.loginButton).toBeVisible();
  }

  async verifyLoginButtonEnabled() {
    await expect(this.loginButton).toBeEnabled();
  }

  async verifyUsernameErrorState() {
    await expect(this.usernameTextbox).toHaveClass(/error/);
  }

  async verifyPasswordErrorState() {
    await expect(this.passwordTextbox).toHaveClass(/error/);
  }

  async verifyUsernameErrorIconVisible() {
    await expect(this.usernameErrorIcon).toBeVisible();
  }

  async verifyPasswordErrorIconVisible() {
    await expect(this.passwordErrorIcon).toBeVisible();
  }

  async verifyError(message: string) {
    await expect(this.errorMessage).toHaveText(message);
  }

  async verifyDefaultUI() {
    await expect(this.errorMessage).toHaveCount(0);
    await expect(this.usernameErrorIcon).toHaveCount(0);
    await expect(this.passwordErrorIcon).toHaveCount(0);
  }

  async verifyAcceptedUserTitle() {
    await expect(this.acceptedUserTitle).toHaveText(
      'Accepted usernames are:'
    );
  }

  async verifyAcceptedUsers() {
    await this.verifyAcceptedUserTitle();

    await expect(this.acceptedUsers).toContainText('standard_user');
    await expect(this.acceptedUsers).toContainText('locked_out_user');
    await expect(this.acceptedUsers).toContainText('problem_user');
    await expect(this.acceptedUsers).toContainText(
      'performance_glitch_user'
    );
    await expect(this.acceptedUsers).toContainText('error_user');
    await expect(this.acceptedUsers).toContainText('visual_user');
  }

  async verifyPasswordTitle() {
    await expect(this.passwordTitle).toHaveText(
      'Password for all users:'
    );
  }

  async verifyPasswordText() {
    await this.verifyPasswordTitle();
    await expect(this.passwordText).toContainText('secret_sauce');
  }
}