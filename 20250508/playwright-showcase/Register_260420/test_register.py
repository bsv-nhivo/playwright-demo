import re
import webbrowser
from datetime import datetime
from playwright.sync_api import sync_playwright, expect

# =============================
# CONFIG
# =============================
BASE_URL = "https://admin.odakyu.bravesoft.vn/login"
EMAIL = "kimtran@bravesoft.com.vn"
PASSWORD = "brave0404"


# =============================
# SETUP
# =============================
def open_screen(page):
    page.goto(BASE_URL)

    expect(page.locator("input[name='email']")).to_be_visible()
    page.locator("input[name='email']").fill(EMAIL)
    page.locator("input[name='password']").fill(PASSWORD)

    page.get_by_role("button", name="ログイン").click()

    expect(page.locator("div.page-main-title")).to_have_text("アカウント管理")

    new_btn = page.get_by_role("button", name="新規追加")
    expect(new_btn).to_be_visible()
    new_btn.click()

    expect(page.get_by_text("新規アカウント追加")).to_be_visible()


# =============================
# HELPERS
# =============================
def get_form_label(page, text):
    return page.locator("div.label-title").filter(has_text=text)


def get_dropdown(page):
    return page.get_by_role("combobox").nth(1)


def select_dropdown_option(page, text):
    dropdown = get_dropdown(page)
    dropdown.click()

    option = page.locator("ul[role='listbox'] span").filter(has_text=text)
    expect(option).to_be_visible()
    option.click()


# =============================
# TEST CASES
# =============================
def test_TC1_title(page):
    expect(page.get_by_text("新規アカウント追加")).to_be_visible()


def test_TC2_url(page):
    expect(page).to_have_url(re.compile("account-management"))


def test_TC3_account_label(page):
    expect(get_form_label(page, "アカウント名")).to_be_visible()


def test_TC4_account_input(page):
    page.locator("input[name='userName']").fill("TestUser")
    expect(page.locator("input[name='userName']")).to_have_value("TestUser")


def test_TC5_email_label(page):
    expect(get_form_label(page, "メールアドレス")).to_be_visible()


def test_TC6_email_input(page):
    page.locator("input[name='email']").fill("test@gmail.com")
    expect(page.locator("input[name='email']")).to_have_value("test@gmail.com")


def test_TC7_password_label(page):
    expect(get_form_label(page, "パスワード")).to_be_visible()


def test_TC8_password_placeholder(page):
    expect(page.locator("input[name='password']")).to_have_attribute("placeholder", "**********")


def test_TC9_password_input(page):
    page.locator("input[name='password']").fill("Password123")
    expect(page.locator("input[name='password']")).to_have_value("Password123")


def test_TC10_dropdown(page):
    expect(get_dropdown(page)).to_be_visible()


def test_TC11_select_master(page):
    select_dropdown_option(page, "マスター管理者")
    expect(get_dropdown(page)).to_contain_text("マスター管理者")


def test_TC12_select_tenant(page):
    select_dropdown_option(page, "テナント管理者")
    expect(get_dropdown(page)).to_contain_text("テナント管理者")


def test_TC13_only_one_dropdown(page):
    select_dropdown_option(page, "マスター管理者")
    select_dropdown_option(page, "テナント管理者")
    expect(get_dropdown(page)).to_contain_text("テナント管理者")


def test_TC14_permission_label(page):
    select_dropdown_option(page, "テナント管理者")
    expect(page.get_by_text("有")).to_be_visible()
    expect(page.get_by_text("無")).to_be_visible()


def test_TC15_select_yes(page):
    select_dropdown_option(page, "テナント管理者")
    yes_radio = page.get_by_role("radio", name="有")
    yes_radio.check()
    expect(yes_radio).to_be_checked()


def test_TC16_select_no(page):
    select_dropdown_option(page, "テナント管理者")
    no_radio = page.get_by_role("radio", name="無")
    no_radio.check()
    expect(no_radio).to_be_checked()


def test_TC17_only_one_radio(page):
    select_dropdown_option(page, "テナント管理者")

    yes_radio = page.get_by_role("radio", name="有")
    no_radio = page.get_by_role("radio", name="無")

    yes_radio.check()
    expect(no_radio).not_to_be_checked()

    no_radio.check()
    expect(yes_radio).not_to_be_checked()


# =============================
# HTML REPORT
# =============================
def generate_html_report(results, passed, failed):
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    html = f"""
    <html>
    <head>
        <title>Test Report</title>
        <style>
            body {{ font-family: Arial; }}
            table {{ border-collapse: collapse; width: 100%; }}
            th, td {{ border: 1px solid #ccc; padding: 8px; }}
            th {{ background: #eee; }}
            .pass {{ color: green; font-weight: bold; }}
            .fail {{ color: red; font-weight: bold; }}
        </style>
    </head>
    <body>

    <h2>TEST REPORT</h2>
    <p>Time: {now}</p>

    <p>Total: {len(results)}</p>
    <p>Passed: {passed}</p>
    <p>Failed: {failed}</p>

    <table>
        <tr>
            <th>TC</th>
            <th>Status</th>
            <th>Reason</th>
        </tr>
    """

    for tc, status, reason in results:
        cls = "pass" if status == "PASSED" else "fail"
        html += f"""
        <tr>
            <td>{tc}</td>
            <td class="{cls}">{status}</td>
            <td>{reason}</td>
        </tr>
        """

    html += "</table></body></html>"

    with open("report.html", "w", encoding="utf-8") as f:
        f.write(html)

    print("\nReport generated: report.html")

    # auto mở
    webbrowser.open("report.html")


# =============================
# RUN
# =============================
def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(
            channel="chrome",
            headless=False,
            slow_mo=200
        )

        context = browser.new_context()
        page = context.new_page()

        open_screen(page)

        tests = [
            test_TC1_title,
            test_TC2_url,
            test_TC3_account_label,
            test_TC4_account_input,
            test_TC5_email_label,
            test_TC6_email_input,
            test_TC7_password_label,
            test_TC8_password_placeholder,
            test_TC9_password_input,
            test_TC10_dropdown,
            test_TC11_select_master,
            test_TC12_select_tenant,
            test_TC13_only_one_dropdown,
            test_TC14_permission_label,
            test_TC15_select_yes,
            test_TC16_select_no,
            test_TC17_only_one_radio
        ]

        passed = 0
        failed = 0
        results = []

        print("\n==============================")
        print("        TEST REPORT")
        print("==============================")

        for test in tests:
            tc_number = test.__name__.split("_")[1]

            try:
                test(page)
                print(f"{tc_number}: PASSED ✅")
                results.append((tc_number, "PASSED", ""))
                passed += 1

            except Exception as e:
                error_msg = str(e).splitlines()[0]
                print(f"{tc_number}: FAILED ❌")
                print(f"   Reason: {error_msg}")
                results.append((tc_number, "FAILED", error_msg))
                failed += 1

        print("\n==============================")
        print("          SUMMARY")
        print("==============================")
        print(f"TOTAL : {len(tests)}")
        print(f"PASSED: {passed}")
        print(f"FAILED: {failed}")

        browser.close()

        # 👉 generate HTML
        generate_html_report(results, passed, failed)


if __name__ == "__main__":
    run()