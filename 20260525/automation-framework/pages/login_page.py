from playwright.sync_api import expect


class LoginPage:
    def __init__(self, page):
        self.page = page

        self.username_input = page.locator("[data-test='username']")
        self.password_input = page.locator("[data-test='password']")
        self.login_button = page.locator("[data-test='login-button']")
        self.error_message = page.locator("[data-test='error']")

    def open(self):
        self.page.goto("/")

    def input_username(self, username):
        self.username_input.fill(username)

    def input_password(self, password):
        self.password_input.fill(password)

    def click_login(self):
        self.login_button.click()

    def login(self, username, password):
        self.input_username(username)
        self.input_password(password)
        self.click_login()

    def verify_login_success(self):
        expect(self.page).to_have_url(
            "https://www.saucedemo.com/inventory.html"
        )

    def verify_error_message(self, message):
        expect(self.error_message).to_have_text(message)