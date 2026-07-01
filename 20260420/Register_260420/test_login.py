import pytest
from playwright.sync_api import sync_playwright, expect

URL = "https://playwright-demo.eventos.work/web/portal/529/event/3988/users/login"

VALID_EMAIL = "nhivo@bravesoft.com.vn"
VALID_PASSWORD = "bravesoft123"

# =========================
# SELECTOR
# =========================
EMAIL_INPUT = "input[type='email']"
PASSWORD_INPUT = "input[type='password']"
LOGIN_BTN = "button:has-text('ログイン')"

# =========================
# ERROR MESSAGE
# =========================
ERR_EMAIL_INVALID = "メールアドレスが正しくありません"
ERR_EMAIL_EMPTY = "メールアドレスを入力してください"
ERR_PASSWORD_EMPTY = "パスワードを入力してください"
ERR_PASSWORD_LENGTH = "8文字以上32文字"
ERR_LOGIN_FAILED = "ログインできませんでした"


# =========================
# PLAYWRIGHT (CHỈ 1 LẦN)
# =========================
@pytest.fixture(scope="session")
def playwright_instance():
    with sync_playwright() as p:
        yield p


# =========================
# BROWSER (CHỈ MỞ 1 LẦN)
# =========================
@pytest.fixture(scope="session")
def browser(playwright_instance):
    browser = playwright_instance.chromium.launch(headless=True)
    yield browser
    browser.close()


# =========================
# PAGE (MỖI TEST 1 PAGE)
# =========================
@pytest.fixture(scope="function")
def page(browser):
    context = browser.new_context()
    page = context.new_page()
    page.goto(URL)
    yield page
    context.close()


def blur(page):
    page.keyboard.press("Tab")
    page.wait_for_timeout(200)


# =========================
# LOGIN-1 URL
# =========================
def test_login_1(page):
    assert "/login" in page.url


# =========================
# LOGIN-2
# =========================
def test_login_2(page):
    expect(page.locator("text=新規登録")).to_be_visible()


# =========================
# LOGIN-3
# =========================
def test_login_3(page):
    page.click("text=新規登録")


# =========================
# LOGIN-4 EMAIL UI
# =========================
def test_login_4(page):
    expect(page.locator("text=メールアドレス")).to_be_visible()
    expect(page.locator(EMAIL_INPUT)).to_be_visible()


# =========================
# LOGIN-5 / 6
# =========================
@pytest.mark.parametrize("email", [
    "abc@gmail.com",
    "ABC@GMAIL.COM",
])
def test_login_5_6(page, email):
    page.fill(EMAIL_INPUT, email)
    assert page.input_value(EMAIL_INPUT) == email


# =========================
# LOGIN-7~11 INVALID EMAIL
# =========================
@pytest.mark.parametrize("email", [
    "abc@gmail",
    "abc!@gmail.com",
    "test.abc",
    "@gmail.com",
    "あいうえお",
])
def test_login_7_11(page, email):
    page.fill(EMAIL_INPUT, email)
    blur(page)
    expect(page.locator(f"text={ERR_EMAIL_INVALID}")).to_be_visible()


# =========================
# LOGIN-12 EMPTY EMAIL
# =========================
def test_login_12(page):
    page.fill(EMAIL_INPUT, "")
    blur(page)
    expect(page.locator(f"text={ERR_EMAIL_EMPTY}")).to_be_visible()


# =========================
# LOGIN-13 PASSWORD UI
# =========================
def test_login_13(page):
    expect(page.locator(PASSWORD_INPUT)).to_be_visible()


# =========================
# LOGIN-14 PASSWORD INPUT
# =========================
def test_login_14(page):
    page.fill(PASSWORD_INPUT, "Test1234")
    assert page.input_value(PASSWORD_INPUT) == "Test1234"


# =========================
# LOGIN-15/16 EYE TOGGLE
# =========================
def test_login_15_16(page):
    page.fill(PASSWORD_INPUT, "Test1234")
    eye = page.locator("button:has(svg), [class*='eye']").first

    if eye.count() > 0:
        eye.click()
        expect(page.locator("input[type='text']")).to_be_visible()
        eye.click()
        expect(page.locator(PASSWORD_INPUT)).to_be_visible()


# =========================
# LOGIN-17 EMPTY PASSWORD
# =========================
def test_login_17(page):
    page.fill(PASSWORD_INPUT, "")
    blur(page)
    expect(page.locator(f"text={ERR_PASSWORD_EMPTY}")).to_be_visible()


# =========================
# LOGIN-18
# =========================
def test_login_18(page):
    page.fill(PASSWORD_INPUT, "1234567")
    blur(page)
    expect(page.locator(f"text={ERR_PASSWORD_LENGTH}")).to_be_visible()


# =========================
# LOGIN-19
# =========================
def test_login_19(page):
    page.fill(PASSWORD_INPUT, "a" * 33)
    blur(page)
    expect(page.locator(f"text={ERR_PASSWORD_LENGTH}")).to_be_visible()


# =========================
# LOGIN-20~25
# =========================
@pytest.mark.parametrize("pw", [
    "12345678",
    "ABCDEFGH",
    "!@#$%^&*",
    "A1b2C3d4",
    "123@#$%^",
    "Abc!1234",
])
def test_login_20_25(page, pw):
    page.fill(PASSWORD_INPUT, pw)
    blur(page)

    error = page.locator(f"text={ERR_PASSWORD_LENGTH}")
    assert error.count() == 0


# =========================
# LOGIN-26 BUTTON
# =========================
def test_login_26(page):
    login_btn = page.get_by_role("button", name="ログイン", exact=True)
    expect(login_btn).to_be_visible()


# =========================
# LOGIN-27 WRONG PASSWORD
# =========================
def test_login_27(page):
    page.fill(EMAIL_INPUT, VALID_EMAIL)
    page.fill(PASSWORD_INPUT, "wrong123")
    page.click(LOGIN_BTN)
    expect(page.locator(f"text={ERR_LOGIN_FAILED}")).to_be_visible()


# =========================
# LOGIN-28 WRONG EMAIL
# =========================
def test_login_28(page):
    page.fill(EMAIL_INPUT, "wrong@mail.com")
    page.fill(PASSWORD_INPUT, VALID_PASSWORD)
    page.click(LOGIN_BTN)
    expect(page.locator(f"text={ERR_LOGIN_FAILED}")).to_be_visible()


# =========================
# LOGIN-29 SUCCESS
# =========================
def test_login_29(page):
    page.fill(EMAIL_INPUT, VALID_EMAIL)
    page.fill(PASSWORD_INPUT, VALID_PASSWORD)
    page.click(LOGIN_BTN)

    expect(page).not_to_have_url(URL)


# =========================
# LOGIN-30
# =========================
def test_login_30(page):
    expect(page.locator("text=パスワードを忘れた場合")).to_be_visible()


# =========================
# LOGIN-31
# =========================
def test_login_31(page):
    page.click("text=パスワードを忘れた場合")


# =========================
# LOGIN-32
# =========================
def test_login_32(page):
    page.mouse.wheel(0, 2000)
    page.mouse.wheel(0, -2000)


# =========================
# LOGIN-33
# =========================
def test_login_33(page):
    page.mouse.wheel(0, 3000)


# =========================
# LOGIN-34
# =========================
def test_login_34(page):
    page.mouse.wheel(0, 1500)
    page.mouse.wheel(0, -1500)