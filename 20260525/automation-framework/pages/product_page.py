import re
from playwright.sync_api import expect


class ProductPage:
    def __init__(self, page):
        self.page = page

        self.page_title = page.locator("[data-test='title']")
        self.inventory_list = page.locator(
            "[data-test='inventory-list']"
        )
        self.inventory_items = page.locator(
            "[data-test='inventory-item']"
        )
        self.product_names = page.locator(
            "[data-test='inventory-item-name']"
        )

    def verify_product_list_displayed(self):
        expect(self.page).to_have_url(
            "https://www.saucedemo.com/inventory.html"
        )

        expect(self.page_title).to_have_text("Products")

        expect(self.inventory_list).to_be_visible()

        assert self.inventory_items.count() > 0

    def open_product_detail(self, product_name):
        product = self.inventory_items.filter(
            has=self.page.get_by_text(
                product_name,
                exact=True
            )
        )

        product.locator(
            "[data-test='inventory-item-name']"
        ).click()

    def verify_product_detail_displayed(
        self,
        product_name
    ):
        expect(self.page).to_have_url(
            re.compile(r".*inventory-item\.html\?id=\d+")
        )

        expect(
            self.page.locator(
                "[data-test='inventory-item-name']"
            )
        ).to_have_text(product_name)

    def add_product_to_cart(self, product_name):
        product = self.inventory_items.filter(
            has=self.page.get_by_text(
                product_name,
                exact=True
            )
        )

        product.get_by_role(
            "button",
            name="Add to cart"
        ).click()

    def verify_product_added_to_cart(
        self,
        product_name
    ):
        product = self.inventory_items.filter(
            has=self.page.get_by_text(
                product_name,
                exact=True
            )
        )

        expect(
            product.get_by_role(
                "button",
                name="Remove"
            )
        ).to_be_visible()

        expect(
            self.page.locator(
                "[data-test='shopping-cart-badge']"
            )
        ).to_have_text("1")

    def open_cart(self):
        self.page.locator(
            "[data-test='shopping-cart-link']"
        ).click()