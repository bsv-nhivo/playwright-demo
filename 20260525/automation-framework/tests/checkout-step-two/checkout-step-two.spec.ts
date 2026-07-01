import { test } from '../../fixtures/testFixture';
import users from '../../test-data/users.json';
import products from '../../test-data/products.json';

const PRODUCT = products.backpack.name;
const FIRST_NAME = 'Nhi';
const LAST_NAME = 'Vo';
const POSTAL_CODE = '700000';

test.describe('Checkout Step Two', () => {
  async function goToCheckoutStepTwo(
    loginPage: any,
    productPage: any,
    cartPage: any,
    checkoutStepOnePage: any
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
  }

  test('Checkout step two-1 画面遷移 - Checkout Step OneからCheckout Step Twoへ遷移', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(
      loginPage,
      productPage,
      cartPage,
      checkoutStepOnePage
    );

    await checkoutStepTwoPage.verifyCheckoutStepTwoUrl();
  });

  test('Checkout step two-2 ハンバーガーメニュー - ハンバーガーアイコン表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.verifyMenuButtonVisible();
  });

  test('Checkout step two-3 ハンバーガーメニュー - メニュー表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.openMenu();
    await checkoutStepTwoPage.verifyMenuOpened();
  });

  test('Checkout step two-4 ハンバーガーメニュー - メニュー項目表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.openMenu();
    await checkoutStepTwoPage.verifyMenuOpened();
    await checkoutStepTwoPage.verifyMenuItems();
  });

  test('Checkout step two-5 ハンバーガーメニュー - Logout', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.logout();
  });

  test('Checkout step two-6 ハンバーガーメニュー - メニューを閉じる', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.openMenu();
    await checkoutStepTwoPage.verifyMenuOpened();

    await checkoutStepTwoPage.closeMenu();
    await checkoutStepTwoPage.verifyMenuClosed();
  });

  test('Checkout step two-7 Swag Labsタイトル - Swag Labsタイトル表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.verifyLogo();
  });

  test('Checkout step two-8 Swag Labsタイトル - Swag Labsタイトル操作', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.verifyNoActionAfterLogoClick();
  });

  test('Checkout step two-9 Checkout Overviewタイトル - タイトル表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.verifyTitle();
  });

  test('Checkout step two-10 Checkout Overviewタイトル - タイトル操作', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.verifyNoActionAfterTitleClick();
  });

  test('Checkout step two-11 QTYタイトル - QTY表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.verifyQtyLabel();
  });

  test('Checkout step two-12 QTYタイトル - QTY操作', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.clickQtyLabelAndVerifyNoAction();
  });

  test('Checkout step two-13 Descriptionタイトル - Description表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.verifyDescriptionLabel();
  });

  test('Checkout step two-14 Descriptionタイトル - Description操作', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.clickDescriptionLabelAndVerifyNoAction();
  });

  test('Checkout step two-15 商品一覧 - 商品一覧表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.verifyProductListDisplayed();
  });

  test('Checkout step two-16 商品一覧 - 商品名表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.verifyProductName(PRODUCT);
  });

  test('Checkout step two-17 商品一覧 - 商品説明表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.verifyProductDescription(PRODUCT);
  });

  test('Checkout step two-18 商品一覧 - 商品価格表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.verifyProductPrice(PRODUCT);
  });

  test('Checkout step two-19 商品一覧 - 数量表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.verifyProductQuantity(PRODUCT, '1');
  });

  test('Checkout step two-20 商品一覧 - 商品名Hover', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.hoverProductName(PRODUCT);
    await checkoutStepTwoPage.verifyProductName(PRODUCT);
  });

  test('Checkout step two-21 商品一覧 - 商品名クリック', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    productDetailPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.clickProductName(PRODUCT);
    await productDetailPage.verifyPageLoaded();
  });

  test('Checkout step two-22 商品一覧 - 商品説明クリック', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.clickProductDescriptionAndVerifyNoAction(PRODUCT);
  });

  test('Checkout step two-23 商品一覧 - 商品価格クリック', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.clickProductPriceAndVerifyNoAction(PRODUCT);
  });

  test('Checkout step two-24 商品一覧 - 数量クリック', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.clickProductQuantityAndVerifyNoAction(PRODUCT);
  });

  test('Checkout step two-25 商品一覧 - Cart内容一致', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.verifyProductInfo(PRODUCT);
  });

  test('Checkout step two-26 Payment Information - タイトル表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.verifyPaymentInfoTitle();
  });

  test('Checkout step two-27 Payment Information - 支払情報表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.verifyPaymentInfoValue();
  });

  test('Checkout step two-28 Payment Information - タイトル操作', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.clickPaymentInfoTitleAndVerifyNoAction();
  });

  test('Checkout step two-29 Payment Information - 情報操作', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.clickPaymentInfoValueAndVerifyNoAction();
  });

  test('Checkout step two-30 Shipping Information - タイトル表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.verifyShippingInfoTitle();
  });

  test('Checkout step two-31 Shipping Information - 配送情報表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.verifyShippingInfoValue();
  });

  test('Checkout step two-32 Shipping Information - タイトル操作', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.clickShippingInfoTitleAndVerifyNoAction();
  });

  test('Checkout step two-33 Shipping Information - 情報操作', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.clickShippingInfoValueAndVerifyNoAction();
  });

  test('Checkout step two-34 Price Total - タイトル表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.verifyPriceTotalTitle();
  });

  test('Checkout step two-35 Price Total - Item Total表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.verifyItemTotal();
  });

  test('Checkout step two-36 Price Total - Tax表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.verifyTax();
  });

  test('Checkout step two-37 Price Total - Total表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.verifyTotal();
  });

  test('Checkout step two-38 Price Total - 計算確認', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.verifyTotalCalculation();
  });

  test('Checkout step two-39 Price Total - タイトル操作', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.clickPriceTotalTitleAndVerifyNoAction();
  });

  test('Checkout step two-40 Price Total - 金額操作', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.clickAmountAndVerifyNoAction();
  });

  test('Checkout step two-41 カートアイコン - アイコン表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.verifyCartIconVisible();
    await checkoutStepTwoPage.verifyCartBadge('1');
  });

  test('Checkout step two-42 カートアイコン - 画面遷移', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.openCart();
    await checkoutStepTwoPage.verifyCartUrl();
  });

  test('Checkout step two-43 カートアイコン - 商品保持', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.openCart();

    await cartPage.verifyProductDisplayed(PRODUCT);
    await cartPage.verifyProductQuantity(PRODUCT, '1');
  });

  test('Checkout step two-44 Cancelボタン - UI表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.verifyCancelButton();
  });

  test('Checkout step two-45 Cancelボタン - 画面遷移', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.clickCancel();
    await productPage.verifyInventoryUrl();
  });

  test('Checkout step two-46 Cancelボタン - 入力値保持', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.clickCancel();
    await productPage.verifyInventoryUrl();
  });

  test('Checkout step two-47 Finishボタン - UI表示', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.verifyFinishButton();
  });

  test('Checkout step two-48 Finishボタン - 正常終了', async ({
    loginPage,
    productPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage
  }) => {
    await goToCheckoutStepTwo(loginPage, productPage, cartPage, checkoutStepOnePage);

    await checkoutStepTwoPage.finish();
    await checkoutStepTwoPage.verifyCheckoutCompleteUrl();
  });
});