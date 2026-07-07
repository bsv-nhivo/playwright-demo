import pytest
from playwright.sync_api import sync_playwright

from pages.login_page import LoginPage
from pages.product_page import ProductPage
from pages.cart_page import CartPage
from utils.json_reader import read_json


BASE_URL = "https://www.saucedemo.com"


@pytest.fixture(scope="session")
def users():
    return read_json("test-data/users.json")


@pytest.fixture(scope="session")
def products():
    return read_json("test-data/products.json")


@pytest.fixture(
    scope="function",
    params=["chromium", "firefox", "webkit"]
)
def page(request):
    browser_name = request.param

    with sync_playwright() as playwright:
        browser_type = getattr(
            playwright,
            browser_name
        )

        browser = browser_type.launch(
            headless=True
        )

        page = browser.new_page(
            base_url=BASE_URL
        )

        yield page

        browser.close()


@pytest.fixture(scope="function")
def login_page(page):
    return LoginPage(page)


@pytest.fixture(scope="function")
def product_page(page):
    return ProductPage(page)


@pytest.fixture(scope="function")
def cart_page(page):
    return CartPage(page)


@pytest.fixture(scope="function")
def login_success(login_page, users):
    valid_user = users["valid_user"]

    login_page.open()

    login_page.login(
        valid_user["username"],
        valid_user["password"]
    )