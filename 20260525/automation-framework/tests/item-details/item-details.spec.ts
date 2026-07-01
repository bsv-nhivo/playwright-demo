import { test } from '../../fixtures/testFixture';
import users from '../../test-data/users.json';
import products from '../../test-data/products.json';

const PRODUCT = products.backpack.name;

test.describe('Item Details', () => {
  test.beforeEach(async ({
    loginPage,
    productPage
  }) => {
    await loginPage.open();

    await loginPage.login(
      users.validUser.username,
      users.validUser.password
    );

    await productPage.clickProduct(PRODUCT);
  });

  test('Item Details-1 URL - Product Detail画面URL表示', async ({
    productDetailPage
  }) => {
    await productDetailPage.verifyProductDetailUrl();
  });

  test('Item Details-2 ヘッダー - Swag Labsタイトル表示', async ({
    productDetailPage
  }) => {
    await productDetailPage.verifyLogo();
  });

  test('Item Details-3 ヘッダー - Swag Labsタイトルクリック', async ({
    productDetailPage
  }) => {
    await productDetailPage.verifyNoActionAfterLogoClick();
  });

  test('Item Details-4 ハンバーガーメニュー - ハンバーガーアイコン表示', async ({
    productDetailPage
  }) => {
    await productDetailPage.verifyMenuButtonVisible();
  });

  test('Item Details-5 ハンバーガーメニュー - メニュー表示', async ({
    productDetailPage
  }) => {
    await productDetailPage.openMenu();
    await productDetailPage.verifyMenuOpened();
  });

  test('Item Details-6 ハンバーガーメニュー - メニュー項目表示', async ({
    productDetailPage
  }) => {
    await productDetailPage.openMenu();
    await productDetailPage.verifyMenuOpened();
    await productDetailPage.verifyMenuItems();
  });

  test('Item Details-7 ハンバーガーメニュー - Logout', async ({
    productDetailPage
  }) => {
    await productDetailPage.logout();
  });

  test('Item Details-8 ハンバーガーメニュー - メニューを閉じる', async ({
    productDetailPage
  }) => {
    await productDetailPage.openMenu();
    await productDetailPage.verifyMenuOpened();

    await productDetailPage.closeMenu();
    await productDetailPage.verifyMenuClosed();
  });

  test('Item Details-9 Back to productsボタン - 表示', async ({
    productDetailPage
  }) => {
    await productDetailPage.verifyBackToProductsButtonVisible();
  });

  test('Item Details-10 Back to productsボタン - クリック', async ({
    productDetailPage
  }) => {
    await productDetailPage.clickBackToProducts();
    await productDetailPage.verifyInventoryUrl();
  });

  test('Item Details-11 商品情報 - 商品画像表示', async ({
    productDetailPage
  }) => {
    await productDetailPage.verifyProductImageVisible();
  });

  test('Item Details-12 商品情報 - 商品タイトル表示', async ({
    productDetailPage
  }) => {
    await productDetailPage.verifyProductNameVisible();
    await productDetailPage.verifyProductName(PRODUCT);
  });

  test('Item Details-13 商品情報 - 商品説明表示', async ({
    productDetailPage
  }) => {
    await productDetailPage.verifyProductDescriptionVisible();
  });

  test('Item Details-14 商品情報 - 商品価格表示', async ({
    productDetailPage
  }) => {
    await productDetailPage.verifyProductPriceVisible();
  });

  test('Item Details-15 商品情報 - Add to cartボタン表示', async ({
    productDetailPage
  }) => {
    await productDetailPage.verifyAddToCartButton();
  });

  test('Item Details-16 商品情報 - Removeボタン表示', async ({
    productDetailPage
  }) => {
    await productDetailPage.addProduct();
    await productDetailPage.verifyRemoveButton();
  });

  test('Item Details-17 商品情報 - 商品タイトルクリック', async ({
    productDetailPage
  }) => {
    await productDetailPage.clickProductNameAndVerifyNoAction();
  });

  test('Item Details-18 商品情報 - 商品説明クリック', async ({
    productDetailPage
  }) => {
    await productDetailPage.clickProductDescriptionAndVerifyNoAction();
  });

  test('Item Details-19 商品情報 - 商品価格クリック', async ({
    productDetailPage
  }) => {
    await productDetailPage.clickProductPriceAndVerifyNoAction();
  });

  test('Item Details-20 商品情報 - 商品画像クリック', async ({
    productDetailPage
  }) => {
    await productDetailPage.clickProductImageAndVerifyNoAction();
  });

  test('Item Details-21 Add to cart / Removeボタン - Add to cartクリック', async ({
    productDetailPage
  }) => {
    await productDetailPage.addProduct();
    await productDetailPage.verifyCartBadge('1');
  });

  test('Item Details-22 Add to cart / Removeボタン - ボタン表示変更', async ({
    productDetailPage
  }) => {
    await productDetailPage.addProduct();
    await productDetailPage.verifyRemoveButton();
  });

  test('Item Details-23 Add to cart / Removeボタン - Removeクリック', async ({
    productDetailPage
  }) => {
    await productDetailPage.addProduct();
    await productDetailPage.removeProduct();
    await productDetailPage.verifyCartBadgeHidden();
  });

  test('Item Details-24 Add to cart / Removeボタン - ボタン表示復元', async ({
    productDetailPage
  }) => {
    await productDetailPage.addProduct();
    await productDetailPage.removeProduct();
    await productDetailPage.verifyAddToCartButton();
  });

  test('Item Details-25 カート - カートアイコン表示', async ({
    productDetailPage
  }) => {
    await productDetailPage.verifyCartIconVisible();
  });

  test('Item Details-26 カート - カートアイコンUI（商品なし）', async ({
    productDetailPage
  }) => {
    await productDetailPage.verifyCartIconVisible();
    await productDetailPage.verifyCartBadgeHidden();
  });

  test('Item Details-27 カート - カートアイコンUI（商品あり）', async ({
    productDetailPage
  }) => {
    await productDetailPage.addProduct();
    await productDetailPage.verifyCartIconVisible();
    await productDetailPage.verifyCartBadge('1');
  });

  test('Item Details-28 カート - カート件数更新（追加）', async ({
    productDetailPage
  }) => {
    await productDetailPage.addProduct();
    await productDetailPage.verifyCartBadge('1');
  });

  test('Item Details-29 カート - カート件数更新（削除）', async ({
    productDetailPage
  }) => {
    await productDetailPage.addProduct();
    await productDetailPage.removeProduct();
    await productDetailPage.verifyCartBadgeHidden();
  });

  test('Item Details-30 カート - カートアイコンクリック', async ({
    productDetailPage,
    cartPage
  }) => {
    await productDetailPage.openCart();
    await cartPage.verifyPageLoaded();
  });

  test('Item Details-31 スクロール - 下方向スクロール', async ({
    productDetailPage
  }) => {
    await productDetailPage.scrollToBottom();
  });

  test('Item Details-32 スクロール - フッター表示', async ({
    productDetailPage
  }) => {
    await productDetailPage.scrollToBottom();
    await productDetailPage.verifyFooterVisible();
  });

  test('Item Details-33 スクロール - 上方向スクロール', async ({
    productDetailPage
  }) => {
    await productDetailPage.scrollToBottom();
    await productDetailPage.scrollToTop();
  });
});