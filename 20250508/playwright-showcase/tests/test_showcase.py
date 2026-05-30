import re
import pytest
from playwright.sync_api import Page, expect

from pages.showcase_page import ShowcasePage


class TestPlaywrightShowcase:

    @pytest.fixture(autouse=True)
    def setup(self, page: Page, app_url: str, request: pytest.FixtureRequest) -> None:
        self.page = page
        self.app = ShowcasePage(page, app_url)
        self.app.open()

        # Lấy tên hàm test hiện tại loại bỏ tiền tố test_
        test_name = request.node.name.split("[")[0].replace("test_", "")

        # Kiểm tra nếu chạy các bài test thuộc phần Hooks (yêu cầu login trước test)
        if "before_each" in test_name or "after_each" in test_name:
            self.app.hooks_login()

        yield

        # Chạy dọn dẹp sau khi bài test đặc thù after_each kết thúc
        if "after_each" in test_name:
            self.app.hooks_delete_all_records()

    # =========================
    # 01–02 BASIC UI
    # =========================

    def test_01_page_title_visible(self):
        expect(self.page.get_by_role(
            "heading",
            name="Playwright test 08.05.2026"
        )).to_be_visible()

    def test_02_main_content_visible(self):
        expect(self.page.get_by_text(
            "A playground for testing modern web automation strategies with Playwright."
        )).to_be_visible()

    # =========================
    # 03–09 FRAMES
    # =========================

    def test_03_simple_frame_form_submit(self):
        # Đã sửa lỗi locator sang ID chuẩn `#demo-iframe`
        frame = self.page.frame_locator("#demo-iframe")

        frame.get_by_placeholder("Enter your name").fill("TestUser")
        frame.get_by_role("button", name="Submit").click()

        expect(frame.locator("#frame-output")).to_have_text(
            "Success: Hello TestUser!"
        )

    def test_04_nested_frames_loaded(self):
        self.app.load_nested_frames()
        # Đã sửa lỗi locator sang ID chính xác của Frame Alpha
        expect(self.page.locator("#iframe-A")).to_be_visible()

    def test_05_frame_a_click_action(self):
        self.app.load_nested_frames()
        self.app.frame_alpha().get_by_role("button", name="Click button").click()
        expect(self.app.frame_alpha().locator("#res-A")).to_have_text("Iframe A Clicked!")

    def test_06_frame_a_open_frame_b(self):
        self.app.load_nested_frames()
        self.app.open_iframe_beta()

    def test_07_frame_b_click_action(self):
        self.app.load_nested_frames()
        self.app.open_iframe_beta()
        self.app.frame_beta().get_by_role("button", name="Click button").click()
        expect(self.app.frame_beta().locator("#res-B")).to_have_text("Iframe B Clicked!")

    def test_08_frame_b_open_frame_c(self):
        self.app.load_nested_frames()
        self.app.open_iframe_beta()

    def test_09_frame_c_click_action(self):
        self.app.load_nested_frames()
        self.app.open_iframe_beta()
        self.app.open_iframe_gamma()
        self.app.frame_gamma().get_by_role("button", name="Click button").click()
        expect(self.app.frame_gamma().locator("#res-C")).to_have_text("Iframe C Clicked!")

    # =========================
    # 10–11 WINDOW HANDLING
    # =========================

    def test_10_open_new_tab(self):
        with self.page.expect_popup() as popup_info:
            self.page.get_by_role("button", name="Open New Tab (playwright.dev)").click()

        popup = popup_info.value
        popup.wait_for_load_state()

        expect(popup).to_have_url(re.compile(r"https://playwright\.dev/?"))

    def test_11_open_popup_window(self):
        with self.page.expect_popup() as popup_info:
            self.page.get_by_role("button", name="Open Popup Window").click()

        popup = popup_info.value
        expect(popup.get_by_role("heading", name="Popup Activated")).to_be_visible()

    # =========================
    # 12–14 MODAL
    # =========================

    def test_12_open_modal(self):
        self.app.open_modal()
        expect(self.page.get_by_role("heading", name="Secure Confirmation")).to_be_visible()

    def test_13_modal_cancel_action(self):
        self.app.open_modal()
        self.page.locator("#modal-cancel-btn").click()
        self.app.expect_modal_closed()

    def test_14_modal_confirm_action(self):
        self.app.open_modal()

        self.page.locator("#modal-overlay") \
            .get_by_placeholder("Enter code (e.g. 1234)") \
            .fill("CODE1")

        self.page.locator("#modal-confirm-btn").click()

        self.app.expect_modal_closed()

        expect(self.page.locator("#modal-result")).to_contain_text("✓ Verified: CODE1")

    # =========================
    # 15–24 ALERT / CONFIRM / PROMPT
    # =========================

    def test_15_alert_basic(self):
        self.page.once("dialog", lambda d: d.accept())
        self.page.locator("#btn-alert").click()

    def test_16_alert_outside_click(self):
        def handler(dialog):
            self.page.mouse.click(0, 0)
            dialog.accept()

        self.page.once("dialog", handler)
        self.page.locator("#btn-alert").click()

    def test_17_alert_accept(self):
        self.page.once("dialog", lambda d: d.accept())
        self.page.locator("#btn-alert").click()

    def test_18_confirm_capture_message(self):
        msg = []

        def handler(dialog):
            msg.append(dialog.message)
            dialog.dismiss()

        self.page.once("dialog", handler)
        self.page.locator("#btn-confirm").click()

        assert msg[0] == "Continue?"

    def test_19_confirm_outside_click(self):
        def handler(dialog):
            self.page.mouse.click(0, 0)
            dialog.dismiss()

        self.page.once("dialog", handler)
        self.page.locator("#btn-confirm").click()

    def test_20_confirm_cancel(self):
        self.page.once("dialog", lambda d: d.dismiss())
        self.page.locator("#btn-confirm").click()
        expect(self.page.locator("#confirm-result")).to_contain_text("✗ Cancelled")

    def test_21_confirm_ok(self):
        self.page.once("dialog", lambda d: d.accept())
        self.page.locator("#btn-confirm").click()
        expect(self.page.locator("#confirm-result")).to_contain_text("✓ Confirmed")

    def test_22_prompt_type_check(self):
        captured = []

        def handler(dialog):
            captured.append(dialog.type)
            dialog.dismiss()

        self.page.once("dialog", handler)
        self.page.locator("#btn-prompt").click()

        assert captured[0] == "prompt"

    def test_23_prompt_cancel(self):
        self.page.once("dialog", lambda d: d.dismiss())
        self.page.locator("#btn-prompt").click()
        expect(self.page.locator("#prompt-result")).to_contain_text("Dismissed")

    def test_24_prompt_accept(self):
        self.page.once("dialog", lambda d: d.accept("TesterX"))
        self.page.locator("#btn-prompt").click()
        expect(self.page.locator("#prompt-result")).to_contain_text("TesterX")

    # =========================
    # 25–28 FORM VALIDATION
    # =========================

    def test_25_form_empty_both(self):
        self.page.locator("#trace-name").fill("")
        self.page.locator("#trace-email").fill("")
        self.page.get_by_role("button", name="Submit Form").click()
        expect(self.page.locator("#trace-result")).to_contain_text("Both fields are required")

    def test_26_form_empty_name(self):
        self.page.locator("#trace-name").fill("")
        self.page.locator("#trace-email").fill("test@gmail.com")
        self.page.get_by_role("button", name="Submit Form").click()
        expect(self.page.locator("#trace-result")).to_contain_text("Both fields are required")

    def test_27_form_empty_email(self):
        self.page.locator("#trace-name").fill("ABC")
        self.page.locator("#trace-email").fill("")
        self.page.get_by_role("button", name="Submit Form").click()
        expect(self.page.locator("#trace-result")).to_contain_text("Both fields are required")

    def test_28_form_valid_submit(self):
        self.page.locator("#trace-name").fill("ABC")
        self.page.locator("#trace-email").fill("test@gmail.com")
        self.page.get_by_role("button", name="Submit Form").click()
        expect(self.page.locator("#trace-result")).to_contain_text("✓ Submitted: ABC")

    # =========================
    # 29–31 SCREENSHOT / STATE
    # =========================

    def test_29_full_page_screenshot(self):
        self.app.click_normal_state()
        self.app.expect_vr_full_normal()

    def test_30_element_screenshot_success(self):
        self.app.click_normal_state()
        self.app.expect_vr_full_normal()

    def test_31_element_screenshot_failure(self):
        self.app.click_failure_state()
        # CỐ TÌNH FAILED: Ép lỗi expect để sinh file Screenshot chứng cứ lỗi
        expect(self.page.locator("#vr-full-display")).to_have_text("System Normal")

    # =========================
    # 32–34 VIDEO FLOW
    # =========================

    def test_32_video_flow_all(self):
        self.app.play_sequence()
        self.app.expect_sequence_complete()

    def test_33_video_flow_pass(self):
        self.app.play_sequence()
        self.app.expect_sequence_complete()

    def test_34_video_flow_fail(self):
        self.app.play_sequence()
        # CỐ TÌNH FAILED: Tìm kiếm chuỗi text không tồn tại để ép timeout (5s) nhằm sinh file Video lỗi
        expect(self.page.locator("#vr-action-txt")).to_contain_text(
            "Force failure text to catch record video",
            timeout=5000
        )

    # =========================
    # 35–37 TRACING
    # =========================

    def test_35_tracing_submit(self):
        self.app.submit_trace_form("ABC", "test@gmail.com")
        expect(self.page.locator("#trace-result")).to_contain_text("✓ Submitted: ABC")

    def test_36_tracing_invalid(self):
        self.app.submit_trace_form("", "")
        expect(self.page.locator("#trace-result")).to_contain_text("Both fields are required")

    def test_37_tracing_invalid_ng(self):
        self.app.submit_trace_form("", "")
        # CỐ TÌNH FAILED: Form rỗng sẽ báo lỗi, nhưng cố tình expect thành công để sinh Trace Zip file
        expect(self.page.locator("#trace-result")).to_contain_text("✓ Submitted successfully")

    # =========================
    # 38–41 HOOKS
    # =========================

    def test_38_before_all_check(self):
        from pathlib import Path

        reports = Path(__file__).parent.parent / "reports"
        assert reports.exists()
        assert (reports / "screenshots").exists()
        assert (reports / "videos").exists()
        assert (reports / "traces").exists()

    def test_39_after_all_cleanup(self):
        self.app.hooks_login()

        records = [
            ("Name1", "bug", "Bug"),
            ("Name2", "feature", "Feature"),
            ("Name3", "task", "Task"),
            ("Name4", "chore", "Chore"),
        ]

        for name, category, label in records:
            self.app.hooks_create_record_and_verify(name, category, label)

        self.app.hooks_logout()
        expect(self.page.locator("#hk-logout-msg")).to_contain_text("afterAll")

    def test_40_before_each_hooks(self):
        expect(self.page.locator("#hk-main-section")).to_be_visible()
        expect(self.page.locator("#hk-logged-user")).to_have_text("admin")

    def test_41_after_each_hooks_cleanup(self):
        expect(self.page.locator("#hk-main-section")).to_be_visible()
        expect(self.page.locator("#hk-logged-user")).to_have_text("admin")