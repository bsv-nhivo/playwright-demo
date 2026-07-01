import { test } from '../../fixtures/testFixture';
import users from '../../test-data/users.json';
import products from '../../test-data/products.json';

const PRODUCT = products.backpack.name;
const SECOND_PRODUCT = products.bikeLight.name;

test.describe('All Item', () => {
  test.beforeEach(async ({
    loginPage
  }) => {
    await loginPage.open();

    await loginPage.login(
      users.validUser.username,
      users.validUser.password
    );
  });

  test('All Item-1 URL - Inventory画面URL表示', async ({
    productPage
  }) => {
    await productPage.verifyInventoryUrl();
  });

  test('All Item-2 ヘッダー - Swag Labsタイトル表示', async ({
    productPage
  }) => {
    await productPage.verifyLogo();
  });

  test('All Item-3 ヘッダー - Swag Labsタイトルクリック', async ({
    productPage
  }) => {
    await productPage.verifyNoActionAfterLogoClick();
  });

  test('All Item-4 ハンバーガーメニュー - ハンバーガーアイコン表示', async ({
    productPage
  }) => {
    await productPage.verifyMenuButtonVisible();
  });

  test('All Item-5 ハンバーガーメニュー - メニュー表示', async ({
    productPage
  }) => {
    await productPage.openMenu();
    await productPage.verifyMenuOpened();
  });

  test('All Item-6 ハンバーガーメニュー - メニュー項目表示', async ({
    productPage
  }) => {
    await productPage.openMenu();
    await productPage.verifyMenuOpened();
    await productPage.verifyMenuItems();
  });

  test('All Item-7 ハンバーガーメニュー - Logout', async ({
    productPage
  }) => {
    await productPage.logout();
  });

  test('All Item-8 ハンバーガーメニュー - メニューを閉じる', async ({
    productPage
  }) => {
    await productPage.openMenu();
    await productPage.verifyMenuOpened();

    await productPage.closeMenu();
    await productPage.verifyMenuClosed();
  });

  test('All Item-9 Products - Productsタイトル表示', async ({
    productPage
  }) => {
    await productPage.verifyProductsTitle();
  });

  test('All Item-10 Products - Productsタイトルクリック', async ({
    productPage
  }) => {
    await productPage.verifyNoActionAfterProductsTitleClick();
  });

  test('All Item-11 商品一覧 - 商品一覧表示', async ({
    productPage
  }) => {
    await productPage.verifyProductListDisplayed();
  });

  test('All Item-12 商品一覧 - 商品タイトル表示', async ({
    productPage
  }) => {
    await productPage.verifyAllProductTitlesDisplayed();
  });

  test('All Item-13 商品一覧 - 商品画像表示', async ({
    productPage
  }) => {
    await productPage.verifyAllProductImagesDisplayed();
  });

  test('All Item-14 商品一覧 - 商品説明表示', async ({
    productPage
  }) => {
    await productPage.verifyAllProductDescriptionsDisplayed();
  });

  test('All Item-15 商品一覧 - 商品価格表示', async ({
    productPage
  }) => {
    await productPage.verifyAllProductPricesDisplayed();
  });

  test('All Item-16 商品一覧 - Add to cartボタンUI表示', async ({
    productPage
  }) => {
    await productPage.verifyAddToCartButton(PRODUCT);
  });

  test('All Item-17 商品一覧 - RemoveボタンUI表示', async ({
    productPage
  }) => {
    await productPage.addProduct(PRODUCT);
    await productPage.verifyRemoveButton(PRODUCT);
  });

  test('All Item-18 商品一覧 - 商品説明クリック', async ({
    productPage
  }) => {
    await productPage.clickProductDescriptionAndVerifyNoAction(
      PRODUCT
    );
  });

  test('All Item-19 商品一覧 - 商品価格クリック', async ({
    productPage
  }) => {
    await productPage.clickProductPriceAndVerifyNoAction(
      PRODUCT
    );
  });

  test('All Item-20 商品詳細 - 商品タイトルクリック', async ({
    productPage,
    productDetailPage
  }) => {
    await productPage.clickProduct(PRODUCT);
    await productDetailPage.verifyPageLoaded();
  });

  test('All Item-21 商品詳細 - 商品画像クリック', async ({
    productPage,
    productDetailPage
  }) => {
    await productPage.clickProductImage(PRODUCT);
    await productDetailPage.verifyPageLoaded();
  });

  test('All Item-22 カート - Add to cartクリック', async ({
    productPage
  }) => {
    await productPage.addProduct(PRODUCT);
    await productPage.verifyCartBadge('1');
  });

  test('All Item-23 カート - カート件数更新', async ({
    productPage
  }) => {
    await productPage.addProduct(PRODUCT);
    await productPage.verifyCartBadge('1');
  });

  test('All Item-24 カート - ボタン表示変更', async ({
    productPage
  }) => {
    await productPage.addProduct(PRODUCT);
    await productPage.verifyButtonText(
      PRODUCT,
      'Remove'
    );
  });

  test('All Item-25 カート - Removeクリック', async ({
    productPage
  }) => {
    await productPage.addProduct(PRODUCT);
    await productPage.removeProduct(PRODUCT);
    await productPage.verifyCartBadgeHidden();
  });

  test('All Item-26 カート - カート件数減少', async ({
    productPage
  }) => {
    await productPage.addProduct(PRODUCT);
    await productPage.removeProduct(PRODUCT);
    await productPage.verifyCartBadgeHidden();
  });

  test('All Item-27 カート - ボタン表示復元', async ({
    productPage
  }) => {
    await productPage.addProduct(PRODUCT);
    await productPage.removeProduct(PRODUCT);

    await productPage.verifyButtonText(
      PRODUCT,
      'Add to cart'
    );
  });

  test('All Item-28 カート - 複数商品追加', async ({
    productPage
  }) => {
    await productPage.addProduct(PRODUCT);
    await productPage.addProduct(SECOND_PRODUCT);

    await productPage.verifyCartBadge('2');
  });

  test('All Item-29 カート - 複数商品削除', async ({
    productPage
  }) => {
    await productPage.addProduct(PRODUCT);
    await productPage.addProduct(SECOND_PRODUCT);

    await productPage.removeProduct(PRODUCT);

    await productPage.verifyCartBadge('1');
  });

  test('All Item-30 スクロール - 下方向スクロール', async ({
    productPage
  }) => {
    await productPage.scrollToBottom();
  });

  test('All Item-31 スクロール - フッター表示', async ({
    productPage
  }) => {
    await productPage.scrollToBottom();
    await productPage.verifyFooterVisible();
  });

  test('All Item-32 スクロール - 上方向スクロール', async ({
    productPage
  }) => {
    await productPage.scrollToBottom();
    await productPage.scrollToTop();
  });

  test('All Item-33 フィルター - フィルタードロップダウン表示', async ({
    productPage
  }) => {
    await productPage.verifySortDropdownVisible();
  });

  test('All Item-34 フィルター - デフォルト値表示', async ({
    productPage
  }) => {
    await productPage.verifyDefaultSort();
  });

  test('All Item-35 フィルター - フィルター一覧表示', async ({
    productPage
  }) => {
    await productPage.verifySortOptions();
  });

  test('All Item-36 フィルター - Name A to Z選択', async ({
    productPage
  }) => {
    await productPage.selectSortOption(
      'Name (A to Z)'
    );

    await productPage.verifyProductNamesAscending();
  });

  test('All Item-37 フィルター - Name Z to A選択', async ({
    productPage
  }) => {
    await productPage.selectSortOption(
      'Name (Z to A)'
    );

    await productPage.verifyProductNamesDescending();
  });

  test('All Item-38 フィルター - Price low to high選択', async ({
    productPage
  }) => {
    await productPage.selectSortOption(
      'Price (low to high)'
    );

    await productPage.verifyPricesAscending();
  });

  test('All Item-39 フィルター - Price high to low選択', async ({
    productPage
  }) => {
    await productPage.selectSortOption(
      'Price (high to low)'
    );

    await productPage.verifyPricesDescending();
  });

  test('All Item-40 カート - カートアイコン表示', async ({
    productPage
  }) => {
    await productPage.verifyCartIconVisible();
  });

  test('All Item-41 カート - カートアイコンUI（商品なし）', async ({
    productPage
  }) => {
    await productPage.verifyCartIconVisible();
    await productPage.verifyCartBadgeHidden();
  });

  test('All Item-42 カート - カートアイコンUI（商品あり）', async ({
    productPage
  }) => {
    await productPage.addProduct(PRODUCT);

    await productPage.verifyCartIconVisible();
    await productPage.verifyCartBadge('1');
  });

  test('All Item-43 カート - カート件数更新（追加）', async ({
    productPage
  }) => {
    await productPage.addProduct(PRODUCT);
    await productPage.verifyCartBadge('1');
  });

  test('All Item-44 カート - カート件数更新（削除）', async ({
    productPage
  }) => {
    await productPage.addProduct(PRODUCT);
    await productPage.removeProduct(PRODUCT);

    await productPage.verifyCartBadgeHidden();
  });

  test('All Item-45 カート - カートアイコンクリック', async ({
    productPage,
    cartPage
  }) => {
    await productPage.openCart();

    await cartPage.verifyPageLoaded();
  });
});