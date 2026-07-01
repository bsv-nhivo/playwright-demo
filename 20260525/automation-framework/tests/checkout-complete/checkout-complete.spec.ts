import { test } from '../../fixtures/testFixture';
import users from '../../test-data/users.json';
import products from '../../test-data/products.json';

const PRODUCT = products.backpack.name;
const FIRST_NAME = 'Nhi';
const LAST_NAME = 'Vo';
const POSTAL_CODE = '700000';

test.describe('Checkout Complete', () => {
  async function goToCheckoutComplete(
    loginPage: any,
    productPage: any,
    cartPage: any,
    checkoutStepOnePage: any,
    checkoutStepTwoPage: any
  ) {
    await loginPage.open();

    await loginPage.login(
      users.validUser.username,
      users.validUser.password
    );

    await productPage.addProduct(PRODUCT);
    await productPage.openCart();

    await cartPage.checkout();

    await checkoutStepOnePage.fillInformation(
      FIRST_NAME,
      LAST_NAME,
      POSTAL_CODE
    );

    await checkoutStepOnePage.clickContinue();

    await checkoutStepTwoPage.finish();
  }

  test('Checkout Complete-1 画面遷移 - Checkout Step TwoからCheckout Completeへ遷移', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage
  }) => {
    await goToCheckoutComplete(
      loginPage,
      productPage,
      cartPage,
      checkoutStepOnePage,
      checkoutStepTwoPage
    );

    await checkoutCompletePage.verifyCheckoutCompleteUrl();
  });

  test('Checkout Complete-2 ハンバーガーメニュー - ハンバーガーアイコン表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage
  }) => {
    await goToCheckoutComplete(loginPage, productPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage);

    await checkoutCompletePage.verifyMenuButtonVisible();
  });

  test('Checkout Complete-3 ハンバーガーメニュー - メニュー表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage
  }) => {
    await goToCheckoutComplete(loginPage, productPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage);

    await checkoutCompletePage.openMenu();
    await checkoutCompletePage.verifyMenuOpened();
  });

  test('Checkout Complete-4 ハンバーガーメニュー - メニュー項目表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage
  }) => {
    await goToCheckoutComplete(loginPage, productPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage);

    await checkoutCompletePage.openMenu();
    await checkoutCompletePage.verifyMenuOpened();
    await checkoutCompletePage.verifyMenuItems();
  });

  test('Checkout Complete-5 ハンバーガーメニュー - Logout', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage
  }) => {
    await goToCheckoutComplete(loginPage, productPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage);

    await checkoutCompletePage.logout();
  });

  test('Checkout Complete-6 ハンバーガーメニュー - メニューを閉じる', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage
  }) => {
    await goToCheckoutComplete(loginPage, productPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage);

    await checkoutCompletePage.openMenu();
    await checkoutCompletePage.verifyMenuOpened();

    await checkoutCompletePage.closeMenu();
    await checkoutCompletePage.verifyMenuClosed();
  });

  test('Checkout Complete-7 Swag Labsタイトル - Swag Labsタイトル表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage
  }) => {
    await goToCheckoutComplete(loginPage, productPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage);

    await checkoutCompletePage.verifyLogo();
  });

  test('Checkout Complete-8 Swag Labsタイトル - Swag Labsタイトル操作', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage
  }) => {
    await goToCheckoutComplete(loginPage, productPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage);

    await checkoutCompletePage.verifyNoActionAfterLogoClick();
  });

  test('Checkout Complete-9 Checkout Complete - タイトル表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage
  }) => {
    await goToCheckoutComplete(loginPage, productPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage);

    await checkoutCompletePage.verifyTitle();
  });

  test('Checkout Complete-10 Checkout Complete - タイトル操作', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage
  }) => {
    await goToCheckoutComplete(loginPage, productPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage);

    await checkoutCompletePage.verifyNoActionAfterTitleClick();
  });

  test('Checkout Complete-11 Complete Icon - 完了アイコン表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage
  }) => {
    await goToCheckoutComplete(loginPage, productPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage);

    await checkoutCompletePage.verifyCompleteIconVisible();
  });

  test('Checkout Complete-12 Complete Icon - 完了アイコン操作', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage
  }) => {
    await goToCheckoutComplete(loginPage, productPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage);

    await checkoutCompletePage.clickCompleteIconAndVerifyNoAction();
  });

  test('Checkout Complete-13 Thank you for your order - メッセージ表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage
  }) => {
    await goToCheckoutComplete(loginPage, productPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage);

    await checkoutCompletePage.verifyCompleteHeader();
  });

  test('Checkout Complete-14 Thank you for your order - メッセージ操作', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage
  }) => {
    await goToCheckoutComplete(loginPage, productPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage);

    await checkoutCompletePage.clickCompleteHeaderAndVerifyNoAction();
  });

  test('Checkout Complete-15 完了メッセージ - 配送メッセージ表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage
  }) => {
    await goToCheckoutComplete(loginPage, productPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage);

    await checkoutCompletePage.verifyCompleteText();
  });

  test('Checkout Complete-16 完了メッセージ - 配送メッセージ操作', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage
  }) => {
    await goToCheckoutComplete(loginPage, productPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage);

    await checkoutCompletePage.clickCompleteTextAndVerifyNoAction();
  });

  test('Checkout Complete-17 Back Homeボタン - UI表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage
  }) => {
    await goToCheckoutComplete(loginPage, productPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage);

    await checkoutCompletePage.verifyBackHomeButton();
  });

  test('Checkout Complete-18 Back Homeボタン - 画面遷移', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage
  }) => {
    await goToCheckoutComplete(loginPage, productPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage);

    await checkoutCompletePage.backHome();
    await checkoutCompletePage.verifyInventoryUrl();
  });

  test('Checkout Complete-19 Back Homeボタン - カート状態確認', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage
  }) => {
    await goToCheckoutComplete(loginPage, productPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage);

    await checkoutCompletePage.backHome();

    await productPage.verifyCartBadgeHidden();
  });

  test('Checkout Complete-20 カートアイコン - アイコン表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage
  }) => {
    await goToCheckoutComplete(loginPage, productPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage);

    await checkoutCompletePage.verifyCartIconVisible();
  });

  test('Checkout Complete-21 カートアイコン - Cart画面遷移', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage
  }) => {
    await goToCheckoutComplete(loginPage, productPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage);

    await checkoutCompletePage.openCart();
    await checkoutCompletePage.verifyCartUrl();
  });

  test('Checkout Complete-22 カートアイコン - Cart内容確認', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage
  }) => {
    await goToCheckoutComplete(loginPage, productPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage);

    await checkoutCompletePage.openCart();

    await cartPage.verifyCartEmpty();
  });

  test('Checkout Complete-23 注文完了 - Inventory復帰', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage
  }) => {
    await goToCheckoutComplete(loginPage, productPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage);

    await checkoutCompletePage.backHome();

    await productPage.verifyPageLoaded();
  });

  test('Checkout Complete-24 注文完了 - Cartリセット', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage
  }) => {
    await goToCheckoutComplete(loginPage, productPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage);

    await checkoutCompletePage.backHome();

    await productPage.verifyCartBadgeHidden();
  });

  test('Checkout Complete-25 注文完了 - Cart空状態', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage
  }) => {
    await goToCheckoutComplete(loginPage, productPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage);

    await checkoutCompletePage.backHome();

    await productPage.openCart();

    await cartPage.verifyCartEmpty();
  });
});