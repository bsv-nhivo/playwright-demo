import pytest


@pytest.mark.login
class TestLogin:

    def test_login_success(
        self,
        login_page,
        users
    ):
        """
        Login successfully with valid username
        and valid password.
        """

        valid_user = users["valid_user"]

        login_page.open()

        login_page.login(
            valid_user["username"],
            valid_user["password"]
        )

        login_page.verify_login_success()

    def test_login_with_invalid_password(
        self,
        login_page,
        users
    ):
        """
        Login with valid username
        and invalid password.
        """

        user = users["invalid_password_user"]

        login_page.open()

        login_page.login(
            user["username"],
            user["password"]
        )

        login_page.verify_error_message(
            "Epic sadface: Username and password "
            "do not match any user in this service"
        )

    def test_login_with_invalid_username(
        self,
        login_page,
        users
    ):
        """
        Login with invalid username
        and valid password.
        """

        user = users["invalid_username_user"]

        login_page.open()

        login_page.login(
            user["username"],
            user["password"]
        )

        login_page.verify_error_message(
            "Epic sadface: Username and password "
            "do not match any user in this service"
        )

    def test_login_with_empty_username(
        self,
        login_page,
        users
    ):
        """
        Login without entering username.
        """

        valid_user = users["valid_user"]

        login_page.open()

        login_page.login(
            "",
            valid_user["password"]
        )

        login_page.verify_error_message(
            "Epic sadface: Username is required"
        )