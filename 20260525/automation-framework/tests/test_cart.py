import pytest


@pytest.mark.cart
class TestCart:

    def test_add_product_to_cart(
        self,
        login_success,
        product_page,
        cart_page,
        products
    ):
        """
        Verify user can add
        a product to cart.
        """

        product_name = products["backpack"]["name"]

        product_page.add_product_to_cart(
            product_name
        )

        product_page.verify_product_added_to_cart(
            product_name
        )

        product_page.open_cart()

        cart_page.verify_product_in_cart(
            product_name
        )

    def test_remove_product_from_cart(
        self,
        login_success,
        product_page,
        cart_page,
        products
    ):
        """
        Verify user can remove
        a product from cart.
        """

        product_name = products["backpack"]["name"]

        product_page.add_product_to_cart(
            product_name
        )

        product_page.open_cart()

        cart_page.verify_product_in_cart(
            product_name
        )

        cart_page.remove_product(
            product_name
        )

        cart_page.verify_product_removed(
            product_name
        )