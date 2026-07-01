import pytest


@pytest.fixture
def app_url():
    return "https://bsv-nhungnguyen.github.io/"


@pytest.fixture(autouse=True)
def before_each(page, app_url):
    page.goto(app_url)
    page.wait_for_load_state("domcontentloaded")
    yield
    page.context.clear_cookies()