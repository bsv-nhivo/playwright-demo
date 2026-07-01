from playwright.sync_api import Page, expect


class ShowcasePage:
    def __init__(self, page: Page, base_url: str):
        self.page = page
        self.base_url = base_url

    # =========================
    # NAV
    # =========================
    def open(self):
        self.page.goto(self.base_url)
        self.page.wait_for_load_state("networkidle")

    # =========================
    # FRAMES
    # =========================
    def demo_frame(self):
        return self.page.frame_locator("#demo-iframe")

    def load_nested_frames(self):
        self.page.get_by_role(
            "button",
            name="Load Nested Frames (A → B → C)"
        ).click()

    def frame_alpha(self):
        return self.page.frame_locator("#iframe-A")

    def open_iframe_beta(self):
        self.frame_alpha().get_by_role(
            "button",
            name="Open Iframe B"
        ).click()

    def frame_beta(self):
        return self.frame_alpha().frame_locator("#iframe-B")

    def open_iframe_gamma(self):
        self.frame_beta().get_by_role(
            "button",
            name="Open Iframe C"
        ).click()

    def frame_gamma(self):
        return self.frame_beta().frame_locator("#iframe-C")

    # =========================
    # MODAL
    # =========================
    def open_modal(self):
        self.page.get_by_role(
            "button",
            name="Open In-page Modal"
        ).click()

    def expect_modal_closed(self):
        expect(self.page.locator("#modal-overlay")).not_to_be_visible()

    # =========================
    # VR / SCREENSHOT STATE
    # =========================
    def click_normal_state(self):
        self.page.get_by_role("button", name="✓ Normal State").click()

    def click_failure_state(self):
        self.page.get_by_role("button", name="Failure State").click()

    def expect_vr_full_normal(self):
        expect(self.page.locator("#vr-full-display")).to_contain_text("System Normal")

    # =========================
    # VIDEO FLOW
    # =========================
    def play_sequence(self):
        self.page.get_by_role("button", name="▶ Play Sequence").click()

    def expect_sequence_complete(self, timeout: int = 10_000):
        expect(self.page.locator("#vr-action-txt")).to_contain_text(
            "Sequence complete",
            timeout=timeout
        )

    # =========================
    # TRACING
    # =========================
    def submit_trace_form(self, name: str, email: str):
        self.page.locator("#trace-name").fill(name)
        self.page.locator("#trace-email").fill(email)
        self.page.get_by_role("button", name="Submit Form").click()

    # =========================
    # HOOKS
    # =========================
    def hooks_login(self):
        self.page.locator("#section-hooks").scroll_into_view_if_needed()
        self.page.locator("#hk-username").fill("admin")
        self.page.locator("#hk-password").fill("password123")
        self.page.locator("#hk-btn-login").click()
        self.page.wait_for_timeout(500)
        expect(self.page.locator("#hk-main-section")).to_be_visible()

    def hooks_logout(self):
        self.page.locator("#hk-btn-logout").click()

    def hooks_create_record(self, name: str, category: str = "bug"):
        self.page.locator("#hk-record-name").fill(name)
        self.page.locator("#hk-record-category").select_option(category)
        self.page.locator("#hk-btn-create").click()

    def hooks_create_record_and_verify(self, name: str, category: str, label: str):
        self.hooks_create_record(name, category)
        expect(self.page.locator("#hk-create-msg")).to_contain_text(name)
        expect(
            self.page.locator("tr[data-record-id]")
            .filter(has_text=name)
            .last
        ).to_be_visible()

    def hooks_delete_all_records(self):
        """Hàm dọn dẹp hệ thống phục vụ cho Teardown Fixture"""
        btn_delete_all = self.page.locator("#hk-btn-delete-all")
        if btn_delete_all.is_visible():
            btn_delete_all.click()