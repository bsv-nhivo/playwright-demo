import pytest


@pytest.mark.product
class TestProduct:

    def test_display_product_list(
        self,
        login_success,
        product_page
    ):
        """
        Verify product list is displayed
        on Inventory page.
        """

        product_page.verify_product_list_displayed()

    def test_view_product_detail(
        self,
        login_success,
        product_page,
        products
    ):
        """
        Verify user can open
        Product Detail page.
        """

        product_name = products["backpack"]["name"]

        product_page.open_product_detail(
            product_name
        )

        product_page.verify_product_detail_displayed(
            product_name
        )