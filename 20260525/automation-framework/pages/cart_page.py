from playwright.sync_api import expect


class CartPage:
    def __init__(self, page):
        self.page = page

        self.cart_items = page.locator(
            "[data-test='inventory-item']"
        )

        self.cart_badge = page.locator(
            "[data-test='shopping-cart-badge']"
        )

    def get_cart_item(self, product_name):
        return self.cart_items.filter(
            has=self.page.get_by_text(
                product_name,
                exact=True
            )
        )

    def verify_product_in_cart(self, product_name):
        product = self.get_cart_item(product_name)

        expect(product).to_be_visible()

        expect(
            product.locator(
                "[data-test='inventory-item-name']"
            )
        ).to_have_text(product_name)

    def remove_product(self, product_name):
        product = self.get_cart_item(product_name)

        product.get_by_role(
            "button",
            name="Remove"
        ).click()

    def verify_product_removed(self, product_name):
        product = self.get_cart_item(product_name)

        expect(product).to_have_count(0)

        expect(self.cart_badge).to_have_count(0)