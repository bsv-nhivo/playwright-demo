import { test } from '../../fixtures/testFixture';
import users from '../../test-data/users.json';
import products from '../../test-data/products.json';

const PRODUCT = products.backpack.name;
const FIRST_NAME = 'Nhi';
const LAST_NAME = 'Vo';
const POSTAL_CODE = '700000';

const FIRST_NAME_REQUIRED =
  'Error: First Name is required';

const LAST_NAME_REQUIRED =
  'Error: Last Name is required';

const POSTAL_CODE_REQUIRED =
  'Error: Postal Code is required';

test.describe('Checkout Step One', () => {
  async function loginOnly(loginPage: any) {
    await loginPage.open();

    await loginPage.login(
      users.validUser.username,
      users.validUser.password
    );
  }

  async function goToCheckoutStepOne(
    loginPage: any,
    productPage: any,
    cartPage: any
  ) {
    await loginOnly(loginPage);

    await productPage.addProduct(PRODUCT);
    await productPage.openCart();

    await cartPage.checkout();
  }

  test('Checkout step one-1 画面遷移 - Cart画面からCheckout画面へ遷移', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.verifyCheckoutStepOneUrl();
  });

  test('Checkout step one-2 ハンバーガーメニュー - ハンバーガーアイコン表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.verifyMenuButtonVisible();
  });

  test('Checkout step one-3 ハンバーガーメニュー - メニュー表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.openMenu();
    await checkoutStepOnePage.verifyMenuOpened();
  });

  test('Checkout step one-4 ハンバーガーメニュー - メニュー項目表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.openMenu();
    await checkoutStepOnePage.verifyMenuOpened();
    await checkoutStepOnePage.verifyMenuItems();
  });

  test('Checkout step one-5 ハンバーガーメニュー - Logout', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.logout();
  });

  test('Checkout step one-6 ハンバーガーメニュー - メニューを閉じる', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.openMenu();
    await checkoutStepOnePage.verifyMenuOpened();

    await checkoutStepOnePage.closeMenu();
    await checkoutStepOnePage.verifyMenuClosed();
  });

  test('Checkout step one-7 Swag Labsタイトル - Swag Labsタイトル表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.verifyLogo();
  });

  test('Checkout step one-8 Swag Labsタイトル - Swag Labsタイトル操作', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.verifyNoActionAfterLogoClick();
  });

  test('Checkout step one-9 Checkout Your Informationタイトル - セクションタイトル表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.verifyTitle();
  });

  test('Checkout step one-10 Checkout Your Informationタイトル - セクションタイトル操作', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.verifyNoActionAfterTitleClick();
  });

  test('Checkout step one-11 First Name入力欄 - Placeholder表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.verifyFirstNamePlaceholder();
  });

  test('Checkout step one-12 First Name入力欄 - 入力可能', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.inputFirstName(FIRST_NAME);
    await checkoutStepOnePage.verifyFirstNameValue(FIRST_NAME);
  });

  test('Checkout step one-13 First Name入力欄 - 入力値保持', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.inputFirstName(FIRST_NAME);
    await checkoutStepOnePage.focusLastName();

    await checkoutStepOnePage.verifyFirstNameValue(FIRST_NAME);
  });

  test('Checkout step one-14 First Name入力欄 - 必須チェック', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.inputLastName(LAST_NAME);
    await checkoutStepOnePage.inputPostalCode(POSTAL_CODE);
    await checkoutStepOnePage.clickContinue();

    await checkoutStepOnePage.verifyError(
      FIRST_NAME_REQUIRED
    );
    await checkoutStepOnePage.verifyFirstNameErrorState();
  });

  test('Checkout step one-15 First Name入力欄 - エラー解除', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.inputLastName(LAST_NAME);
    await checkoutStepOnePage.inputPostalCode(POSTAL_CODE);
    await checkoutStepOnePage.clickContinue();

    await checkoutStepOnePage.inputFirstName(FIRST_NAME);
    await checkoutStepOnePage.closeError();

    await checkoutStepOnePage.verifyErrorHidden();
  });

  test('Checkout step one-16 Last Name入力欄 - Placeholder表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.verifyLastNamePlaceholder();
  });

  test('Checkout step one-17 Last Name入力欄 - 入力可能', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.inputLastName(LAST_NAME);
    await checkoutStepOnePage.verifyLastNameValue(LAST_NAME);
  });

  test('Checkout step one-18 Last Name入力欄 - 入力値保持', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.inputLastName(LAST_NAME);
    await checkoutStepOnePage.focusPostalCode();

    await checkoutStepOnePage.verifyLastNameValue(LAST_NAME);
  });

  test('Checkout step one-19 Last Name入力欄 - 必須チェック', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.inputFirstName(FIRST_NAME);
    await checkoutStepOnePage.inputPostalCode(POSTAL_CODE);
    await checkoutStepOnePage.clickContinue();

    await checkoutStepOnePage.verifyError(
      LAST_NAME_REQUIRED
    );
    await checkoutStepOnePage.verifyLastNameErrorState();
  });

  test('Checkout step one-20 Last Name入力欄 - エラー解除', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.inputFirstName(FIRST_NAME);
    await checkoutStepOnePage.inputPostalCode(POSTAL_CODE);
    await checkoutStepOnePage.clickContinue();

    await checkoutStepOnePage.inputLastName(LAST_NAME);
    await checkoutStepOnePage.closeError();

    await checkoutStepOnePage.verifyErrorHidden();
  });

  test('Checkout step one-21 Zip Postal Code入力欄 - Placeholder表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.verifyPostalCodePlaceholder();
  });

  test('Checkout step one-22 Zip Postal Code入力欄 - 入力可能', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.inputPostalCode(POSTAL_CODE);
    await checkoutStepOnePage.verifyPostalCodeValue(POSTAL_CODE);
  });

  test('Checkout step one-23 Zip Postal Code入力欄 - 入力値保持', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.inputPostalCode(POSTAL_CODE);
    await checkoutStepOnePage.focusLastName();

    await checkoutStepOnePage.verifyPostalCodeValue(POSTAL_CODE);
  });

  test('Checkout step one-24 Zip Postal Code入力欄 - 必須チェック', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.inputFirstName(FIRST_NAME);
    await checkoutStepOnePage.inputLastName(LAST_NAME);
    await checkoutStepOnePage.clickContinue();

    await checkoutStepOnePage.verifyError(
      POSTAL_CODE_REQUIRED
    );
    await checkoutStepOnePage.verifyPostalCodeErrorState();
  });

  test('Checkout step one-25 Zip Postal Code入力欄 - エラー解除', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.inputFirstName(FIRST_NAME);
    await checkoutStepOnePage.inputLastName(LAST_NAME);
    await checkoutStepOnePage.clickContinue();

    await checkoutStepOnePage.inputPostalCode(POSTAL_CODE);
    await checkoutStepOnePage.closeError();

    await checkoutStepOnePage.verifyErrorHidden();
  });

  test('Checkout step one-26 Continueボタン - UI表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.verifyContinueButton();
  });

  test('Checkout step one-27 Continueボタン - 正常遷移', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.fillInformation(
      FIRST_NAME,
      LAST_NAME,
      POSTAL_CODE
    );

    await checkoutStepOnePage.clickContinue();
    await checkoutStepOnePage.verifyCheckoutStepTwoUrl();
  });

  test('Checkout step one-28 Continueボタン - 全項目未入力', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.clickContinue();

    await checkoutStepOnePage.verifyError(
      FIRST_NAME_REQUIRED
    );
    await checkoutStepOnePage.verifyAllInputErrorState();
  });

  test('Checkout step one-29 Continueボタン - First Name未入力', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.inputLastName(LAST_NAME);
    await checkoutStepOnePage.inputPostalCode(POSTAL_CODE);
    await checkoutStepOnePage.clickContinue();

    await checkoutStepOnePage.verifyError(
      FIRST_NAME_REQUIRED
    );
  });

  test('Checkout step one-30 Continueボタン - Last Name未入力', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.inputFirstName(FIRST_NAME);
    await checkoutStepOnePage.inputPostalCode(POSTAL_CODE);
    await checkoutStepOnePage.clickContinue();

    await checkoutStepOnePage.verifyError(
      LAST_NAME_REQUIRED
    );
  });

  test('Checkout step one-31 Continueボタン - Zip未入力', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.inputFirstName(FIRST_NAME);
    await checkoutStepOnePage.inputLastName(LAST_NAME);
    await checkoutStepOnePage.clickContinue();

    await checkoutStepOnePage.verifyError(
      POSTAL_CODE_REQUIRED
    );
  });

  test('Checkout step one-32 Continueボタン - エラーメッセージ閉じる', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.inputFirstName(FIRST_NAME);
    await checkoutStepOnePage.inputLastName(LAST_NAME);
    await checkoutStepOnePage.clickContinue();

    await checkoutStepOnePage.closeError();

    await checkoutStepOnePage.verifyErrorHidden();
    await checkoutStepOnePage.verifyInputValues(
      FIRST_NAME,
      LAST_NAME,
      ''
    );
  });

  test('Checkout step one-33 Cancelボタン - UI表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.verifyCancelButton();
  });

  test('Checkout step one-34 Cancelボタン - 画面遷移', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.clickCancel();
    await checkoutStepOnePage.verifyCartUrl();
  });

  test('Checkout step one-35 Cancelボタン - Cart状態保持', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.clickCancel();

    await cartPage.verifyProductDisplayed(PRODUCT);
    await cartPage.verifyProductQuantity(PRODUCT, '1');
  });

  test('Checkout step one-36 カートアイコン - アイコン表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.verifyCartIconVisible();
    await checkoutStepOnePage.verifyCartBadge('1');
  });

  test('Checkout step one-37 カートアイコン - 画面遷移', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.openCart();
    await checkoutStepOnePage.verifyCartUrl();
  });

  test('Checkout step one-38 カートアイコン - 商品保持', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage
  }) => {
    await goToCheckoutStepOne(
      loginPage,
      productPage,
      cartPage
    );

    await checkoutStepOnePage.openCart();

    await cartPage.verifyProductDisplayed(PRODUCT);
    await cartPage.verifyProductQuantity(PRODUCT, '1');
  });
});