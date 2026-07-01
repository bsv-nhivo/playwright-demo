import { test } from '../../fixtures/testFixture';
import users from '../../test-data/users.json';
import products from '../../test-data/products.json';

const PRODUCT = products.backpack.name;
const SECOND_PRODUCT = products.bikeLight.name;

test.describe('Cart', () => {
  async function loginOnly(loginPage: any) {
    await loginPage.open();

    await loginPage.login(
      users.validUser.username,
      users.validUser.password
    );
  }

  async function goToEmptyCart(
    loginPage: any,
    productPage: any
  ) {
    await loginOnly(loginPage);
    await productPage.openCart();
  }

  async function goToCartWithOneProduct(
    loginPage: any,
    productPage: any
  ) {
    await loginOnly(loginPage);

    await productPage.addProduct(PRODUCT);
    await productPage.openCart();
  }

  async function goToCartWithTwoProducts(
    loginPage: any,
    productPage: any
  ) {
    await loginOnly(loginPage);

    await productPage.addProduct(PRODUCT);
    await productPage.addProduct(SECOND_PRODUCT);
    await productPage.openCart();
  }

  test('Cart-1 URL - Cart画面URL表示', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToEmptyCart(loginPage, productPage);

    await cartPage.verifyCartUrl();
  });

  test('Cart-2 画面タイトル - Swag Labsタイトル表示', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToEmptyCart(loginPage, productPage);

    await cartPage.verifyLogo();
  });

  test('Cart-3 画面タイトル - Swag Labsタイトルクリック', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToEmptyCart(loginPage, productPage);

    await cartPage.verifyNoActionAfterLogoClick();
  });

  test('Cart-4 ハンバーガーメニュー - ハンバーガーアイコン表示', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToEmptyCart(loginPage, productPage);

    await cartPage.verifyMenuButtonVisible();
  });

  test('Cart-5 ハンバーガーメニュー - メニュー表示', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToEmptyCart(loginPage, productPage);

    await cartPage.openMenu();
    await cartPage.verifyMenuOpened();
  });

  test('Cart-6 ハンバーガーメニュー - メニュー項目表示', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToEmptyCart(loginPage, productPage);

    await cartPage.openMenu();
    await cartPage.verifyMenuOpened();
    await cartPage.verifyMenuItems();
  });

  test('Cart-7 ハンバーガーメニュー - Logout', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToEmptyCart(loginPage, productPage);

    await cartPage.logout();
  });

  test('Cart-8 ハンバーガーメニュー - メニューを閉じる', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToEmptyCart(loginPage, productPage);

    await cartPage.openMenu();
    await cartPage.verifyMenuOpened();

    await cartPage.closeMenu();
    await cartPage.verifyMenuClosed();
  });

  test('Cart-9 Header - ハンバーガーアイコン表示', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToEmptyCart(loginPage, productPage);

    await cartPage.verifyMenuButtonVisible();
  });

  test('Cart-10 Header - メニュー表示', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToEmptyCart(loginPage, productPage);

    await cartPage.openMenu();
    await cartPage.verifyMenuOpened();
  });

  test('Cart-11 Header - メニュー項目表示', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToEmptyCart(loginPage, productPage);

    await cartPage.openMenu();
    await cartPage.verifyMenuOpened();
    await cartPage.verifyMenuItems();
  });

  test('Cart-12 Header - All Items', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToEmptyCart(loginPage, productPage);

    await cartPage.openMenu();
    await cartPage.verifyMenuOpened();

    await cartPage.clickAllItems();
    await cartPage.verifyInventoryUrl();
  });

  test('Cart-13 Header - Logout', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToEmptyCart(loginPage, productPage);

    await cartPage.logout();
  });

  test('Cart-14 Header - メニューを閉じる', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToEmptyCart(loginPage, productPage);

    await cartPage.openMenu();
    await cartPage.verifyMenuOpened();

    await cartPage.closeMenu();
    await cartPage.verifyMenuClosed();
  });

  test('Cart-15 タイトル - Your Cartタイトル表示', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToEmptyCart(loginPage, productPage);

    await cartPage.verifyTitle();
  });

  test('Cart-16 タイトル - Your Cartタイトルクリック', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToEmptyCart(loginPage, productPage);

    await cartPage.verifyNoActionAfterTitleClick();
  });

  test('Cart-17 ラベル - QTY表示', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToEmptyCart(loginPage, productPage);

    await cartPage.verifyQtyLabel();
  });

  test('Cart-18 ラベル - QTYクリック', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToEmptyCart(loginPage, productPage);

    await cartPage.clickQtyLabelAndVerifyNoAction();
  });

  test('Cart-19 ラベル - Description表示', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToEmptyCart(loginPage, productPage);

    await cartPage.verifyDescriptionLabel();
  });

  test('Cart-20 ラベル - Descriptionクリック', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToEmptyCart(loginPage, productPage);

    await cartPage.clickDescriptionLabelAndVerifyNoAction();
  });

  test('Cart-21 商品一覧 - カート商品表示', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToCartWithOneProduct(loginPage, productPage);

    await cartPage.verifyProductDisplayed(PRODUCT);
  });

  test('Cart-22 商品一覧 - 空カート表示', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToEmptyCart(loginPage, productPage);

    await cartPage.verifyCartEmpty();
  });

  test('Cart-23 商品一覧 - 商品タイトル表示', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToCartWithOneProduct(loginPage, productPage);

    await cartPage.verifyProductTitle(PRODUCT);
  });

  test('Cart-24 商品一覧 - 商品説明表示', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToCartWithOneProduct(loginPage, productPage);

    await cartPage.verifyProductDescription(PRODUCT);
  });

  test('Cart-25 商品一覧 - 商品価格表示', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToCartWithOneProduct(loginPage, productPage);

    await cartPage.verifyProductPrice(PRODUCT);
  });

  test('Cart-26 商品一覧 - 数量表示', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToCartWithOneProduct(loginPage, productPage);

    await cartPage.verifyProductQuantity(PRODUCT, '1');
  });

  test('Cart-27 商品一覧 - 複数商品表示', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToCartWithTwoProducts(loginPage, productPage);

    await cartPage.verifyProductInfo(PRODUCT);
    await cartPage.verifyProductInfo(SECOND_PRODUCT);
  });

  test('Cart-28 商品一覧 - 商品情報保持', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToCartWithOneProduct(loginPage, productPage);

    await cartPage.verifyProductInfo(PRODUCT);
  });

  test('Cart-29 商品一覧 - Removeボタン表示', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToCartWithOneProduct(loginPage, productPage);

    await cartPage.verifyRemoveButton(PRODUCT);
  });

  test('Cart-30 商品 - 商品タイトルHover', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToCartWithOneProduct(loginPage, productPage);

    await cartPage.hoverProductTitle(PRODUCT);
    await cartPage.verifyProductTitle(PRODUCT);
  });

  test('Cart-31 商品 - 商品タイトルクリック', async ({
    loginPage,
    productPage,
    cartPage,
    productDetailPage
  }) => {
    await goToCartWithOneProduct(loginPage, productPage);

    await cartPage.clickProductTitle(PRODUCT);
    await productDetailPage.verifyPageLoaded();
  });

  test('Cart-32 商品 - 商品説明クリック', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToCartWithOneProduct(loginPage, productPage);

    await cartPage.clickProductDescriptionAndVerifyNoAction(PRODUCT);
  });

  test('Cart-33 商品 - 商品価格クリック', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToCartWithOneProduct(loginPage, productPage);

    await cartPage.clickProductPriceAndVerifyNoAction(PRODUCT);
  });

  test('Cart-34 商品 - 数量クリック', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToCartWithOneProduct(loginPage, productPage);

    await cartPage.clickProductQuantityAndVerifyNoAction(PRODUCT);
  });

  test('Cart-35 Remove - RemoveボタンUI', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToCartWithOneProduct(loginPage, productPage);

    await cartPage.verifyRemoveButton(PRODUCT);
  });

  test('Cart-36 Remove - Removeクリック', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToCartWithOneProduct(loginPage, productPage);

    await cartPage.removeProduct(PRODUCT);
    await cartPage.verifyProductNotDisplayed(PRODUCT);
  });

  test('Cart-37 Remove - 商品一覧更新', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToCartWithOneProduct(loginPage, productPage);

    await cartPage.removeProduct(PRODUCT);
    await cartPage.verifyProductNotDisplayed(PRODUCT);
  });

  test('Cart-38 Remove - カート件数更新', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToCartWithTwoProducts(loginPage, productPage);

    await cartPage.removeProduct(PRODUCT);
    await cartPage.verifyCartBadge('1');
  });

  test('Cart-39 Remove - 最後の商品削除', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToCartWithOneProduct(loginPage, productPage);

    await cartPage.removeProduct(PRODUCT);
    await cartPage.verifyProductNotDisplayed(PRODUCT);
    await cartPage.verifyCartBadgeHidden();
  });

  test('Cart-40 Remove - 複数商品のうち1件削除', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToCartWithTwoProducts(loginPage, productPage);

    await cartPage.removeProduct(PRODUCT);

    await cartPage.verifyProductNotDisplayed(PRODUCT);
    await cartPage.verifyProductDisplayed(SECOND_PRODUCT);
    await cartPage.verifyCartBadge('1');
  });

  test('Cart-41 Remove - Remove後Checkout', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToCartWithTwoProducts(loginPage, productPage);

    await cartPage.removeProduct(PRODUCT);
    await cartPage.checkout();

    await cartPage.verifyCheckoutStepOneUrl();
  });

  test('Cart-42 カート - カートアイコン表示', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToEmptyCart(loginPage, productPage);

    await cartPage.verifyCartIconVisible();
  });

  test('Cart-43 カート - カートアイコンUI（商品なし）', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToEmptyCart(loginPage, productPage);

    await cartPage.verifyCartIconVisible();
    await cartPage.verifyCartBadgeHidden();
  });

  test('Cart-44 カート - カートアイコンUI（商品あり）', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToCartWithOneProduct(loginPage, productPage);

    await cartPage.verifyCartIconVisible();
    await cartPage.verifyCartBadge('1');
  });

  test('Cart-45 カート - カートアイコンクリック', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToEmptyCart(loginPage, productPage);

    await cartPage.clickCartIconAndVerifyNoAction();
  });

  test('Cart-46 Continue Shopping - ボタン表示', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToEmptyCart(loginPage, productPage);

    await cartPage.verifyContinueShoppingButton();
  });

  test('Cart-47 Continue Shopping - Continue Shoppingクリック', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToEmptyCart(loginPage, productPage);

    await cartPage.continueShopping();
    await cartPage.verifyInventoryUrl();
  });

  test('Cart-48 Continue Shopping - Continue Shopping後状態保持', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToCartWithOneProduct(loginPage, productPage);

    await cartPage.continueShopping();

    await productPage.verifyInventoryUrl();
    await productPage.verifyCartBadge('1');
    await productPage.verifyButtonText(PRODUCT, 'Remove');
    await productPage.verifyButtonText(SECOND_PRODUCT, 'Add to cart');
  });

  test('Cart-49 Checkout - ボタン表示', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToEmptyCart(loginPage, productPage);

    await cartPage.verifyCheckoutButton();
  });

  test('Cart-50 Checkout - Checkoutクリック（商品あり）', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToCartWithOneProduct(loginPage, productPage);

    await cartPage.checkout();
    await cartPage.verifyCheckoutStepOneUrl();
  });

  test('Cart-51 Checkout - Checkoutクリック（商品なし）', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToEmptyCart(loginPage, productPage);

    await cartPage.checkout();
    await cartPage.verifyCheckoutStepOneUrl();
  });

  test('Cart-52 スクロール - 下方向スクロール', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToEmptyCart(loginPage, productPage);

    await cartPage.scrollToBottom();
  });

  test('Cart-53 スクロール - フッター表示', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToEmptyCart(loginPage, productPage);

    await cartPage.scrollToBottom();
    await cartPage.verifyFooterVisible();
    await cartPage.verifyFooterInformation();
  });

  test('Cart-54 スクロール - 上方向スクロール', async ({
    loginPage,
    productPage,
    cartPage
  }) => {
    await goToEmptyCart(loginPage, productPage);

    await cartPage.scrollToBottom();
    await cartPage.scrollToTop();
  });
});