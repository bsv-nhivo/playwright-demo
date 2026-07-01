import { test } from '../../fixtures/testFixture';
import users from '../../test-data/users.json';

const USERNAME_REQUIRED =
  'Epic sadface: Username is required';

const PASSWORD_REQUIRED =
  'Epic sadface: Password is required';

const INVALID_CREDENTIALS =
  'Epic sadface: Username and password do not match any user in this service';

test.describe('Login', () => {
  test('Login-1 URLアクセス - URLへ正常アクセス', async ({
    loginPage
  }) => {
    await loginPage.open();
    await loginPage.verifyPageLoaded();
  });

  test('Login-2 タイトル - タイトル表示確認', async ({
    loginPage
  }) => {
    await loginPage.open();
    await loginPage.verifyTitle();
  });

  test('Login-3 タイトル - タイトルクリック', async ({
    loginPage
  }) => {
    await loginPage.open();
    await loginPage.verifyNoActionAfterTitleClick();
  });

  test('Login-4 Username入力欄 - Placeholder表示', async ({
    loginPage
  }) => {
    await loginPage.open();
    await loginPage.verifyUsernamePlaceholder();
  });

  test('Login-5 Username入力欄 - 入力可能確認', async ({
    loginPage
  }) => {
    await loginPage.open();

    await loginPage.inputUsername(
      users.LOGIN_005.username
    );

    await loginPage.verifyUsernameValue(
      users.LOGIN_005.username
    );
  });

  test('Login-6 Username入力欄 - 入力内容削除', async ({
    loginPage
  }) => {
    await loginPage.open();

    await loginPage.inputUsername(
      users.LOGIN_005.username
    );

    await loginPage.clearUsername();
    await loginPage.verifyUsernameEmpty();
  });

  test('Login-7 Username入力欄 - 未入力バリデーション', async ({
    loginPage
  }) => {
    await loginPage.open();

    await loginPage.clickLogin();
    await loginPage.verifyUsernameErrorState();
  });

  test('Login-8 Username入力欄 - 未入力エラーアイコン表示', async ({
    loginPage
  }) => {
    await loginPage.open();

    await loginPage.clickLogin();
    await loginPage.verifyUsernameErrorIconVisible();
  });

  test('Login-9 Password入力欄 - Placeholder表示', async ({
    loginPage
  }) => {
    await loginPage.open();
    await loginPage.verifyPasswordPlaceholder();
  });

  test('Login-10 Password入力欄 - パスワード入力', async ({
    loginPage
  }) => {
    await loginPage.open();

    await loginPage.inputPassword(
      users.LOGIN_010.password
    );

    await loginPage.verifyPasswordValue(
      users.LOGIN_010.password
    );

    await loginPage.verifyPasswordMasked();
  });

  test('Login-11 Password入力欄 - 入力内容削除', async ({
    loginPage
  }) => {
    await loginPage.open();

    await loginPage.inputPassword(
      users.LOGIN_010.password
    );

    await loginPage.clearPassword();
    await loginPage.verifyPasswordEmpty();
  });

  test('Login-12 Password入力欄 - 未入力バリデーション', async ({
    loginPage
  }) => {
    await loginPage.open();

    await loginPage.inputUsername(
      users.LOGIN_018.username
    );

    await loginPage.clickLogin();
    await loginPage.verifyPasswordErrorState();
  });

  test('Login-13 Password入力欄 - 未入力エラーアイコン表示', async ({
    loginPage
  }) => {
    await loginPage.open();

    await loginPage.inputUsername(
      users.LOGIN_018.username
    );

    await loginPage.clickLogin();
    await loginPage.verifyPasswordErrorIconVisible();
  });

  test('Login-14 Loginボタン - ボタンUI表示', async ({
    loginPage
  }) => {
    await loginPage.open();

    await loginPage.verifyLoginButtonVisible();
    await loginPage.verifyLoginButtonEnabled();
  });

  test('Login-15 Loginボタン - クリック可能', async ({
    loginPage
  }) => {
    await loginPage.open();

    await loginPage.clickLogin();

    await loginPage.verifyError(
      USERNAME_REQUIRED
    );
  });

  test('Login-16 Loginバリデーション - Username・Password未入力', async ({
    loginPage
  }) => {
    await loginPage.open();

    await loginPage.clickLogin();

    await loginPage.verifyError(
      USERNAME_REQUIRED
    );
  });

  test('Login-17 Loginバリデーション - Username未入力', async ({
    loginPage
  }) => {
    await loginPage.open();

    await loginPage.inputPassword(
      users.LOGIN_017.password
    );

    await loginPage.clickLogin();

    await loginPage.verifyError(
      USERNAME_REQUIRED
    );
  });

  test('Login-18 Loginバリデーション - Password未入力', async ({
    loginPage
  }) => {
    await loginPage.open();

    await loginPage.inputUsername(
      users.LOGIN_018.username
    );

    await loginPage.clickLogin();

    await loginPage.verifyError(
      PASSWORD_REQUIRED
    );
  });

  test('Login-19 Loginバリデーション - エラーメッセージ閉じる', async ({
    loginPage
  }) => {
    await loginPage.open();

    await loginPage.clickLogin();
    await loginPage.closeError();
  });

  test('Login-20 Loginバリデーション - エラー表示解除確認', async ({
    loginPage
  }) => {
    await loginPage.open();

    await loginPage.clickLogin();
    await loginPage.closeError();

    await loginPage.verifyDefaultUI();
  });

  test('Login-21 Login - 正常ログイン（standard_user）', async ({
    loginPage,
    productPage
  }) => {
    await loginPage.open();

    await loginPage.login(
      users.LOGIN_021.username,
      users.LOGIN_021.password
    );

    await productPage.verifyPageLoaded();
  });

  test('Login-22 Login - 正常ログイン（Accepted usernames）', async ({
    loginPage,
    productPage
  }) => {
    await loginPage.open();

    await loginPage.login(
      users.LOGIN_022.username,
      users.LOGIN_022.password
    );

    await productPage.verifyPageLoaded();
  });

  test('Login-23 Login - 存在しないUsername', async ({
    loginPage
  }) => {
    await loginPage.open();

    await loginPage.login(
      users.LOGIN_023.username,
      users.LOGIN_023.password
    );

    await loginPage.verifyError(
      INVALID_CREDENTIALS
    );
  });

  test('Login-24 Login - Password誤り', async ({
    loginPage
  }) => {
    await loginPage.open();

    await loginPage.login(
      users.LOGIN_024.username,
      users.LOGIN_024.password
    );

    await loginPage.verifyError(
      INVALID_CREDENTIALS
    );
  });

  test('Login-25 Login - Username・Password両方誤り', async ({
    loginPage
  }) => {
    await loginPage.open();

    await loginPage.login(
      users.LOGIN_025.username,
      users.LOGIN_025.password
    );

    await loginPage.verifyError(
      INVALID_CREDENTIALS
    );
  });

  test('Login-26 プレーンテキスト - Accepted usernamesタイトル表示', async ({
    loginPage
  }) => {
    await loginPage.open();
    await loginPage.verifyAcceptedUserTitle();
  });

  test('Login-27 プレーンテキスト - Accepted usernames一覧表示', async ({
    loginPage
  }) => {
    await loginPage.open();
    await loginPage.verifyAcceptedUsers();
  });

  test('Login-28 プレーンテキスト - Passwordタイトル表示', async ({
    loginPage
  }) => {
    await loginPage.open();
    await loginPage.verifyPasswordTitle();
  });

  test('Login-29 プレーンテキスト - 共通Password表示', async ({
    loginPage
  }) => {
    await loginPage.open();
    await loginPage.verifyPasswordText();
  });
});