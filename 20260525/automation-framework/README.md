# Automation Framework

## Thông tin
- **Framework:** Playwright + Python + Pytest
- **Design Pattern:** Page Object Model (POM)
- **Target Website:** https://www.saucedemo.com/

---

# Cấu trúc Framework

```
automation-framework/
│
├── pages/
│   ├── login_page.py
│   ├── product_page.py
│   └── cart_page.py
│
├── tests/
│   ├── test_login.py
│   ├── test_product.py
│   └── test_cart.py
│
├── test-data/
│   ├── users.json
│   ├── users.csv
│   └── products.json
│
├── utils/
│   ├── json_reader.py
│   └── csv_reader.py
│
├── conftest.py
├── pytest.ini
├── requirements.txt
├── README.md
└── .gitignore
```

---

# Cách chạy Test

## 1. Cài đặt dependencies

```bash
pip install -r requirements.txt
```

## 2. Cài đặt browser của Playwright

```bash
playwright install
```

## 3. Chạy toàn bộ test

```bash
pytest
```

## 4. Chạy một file test

Ví dụ:

```bash
pytest tests/test_login.py
```

## 5. Chạy theo browser

Framework hỗ trợ chạy trên:

- Chromium
- Firefox
- WebKit

Browser được cấu hình trong `conftest.py` bằng cơ chế Parameterization của Pytest.

---

# Cách thêm Test Data

Framework hỗ trợ đọc dữ liệu từ JSON và CSV.

## User

Thêm user mới vào:

```
test-data/users.json
```

Ví dụ:

```json
{
  "valid_user": {
    "username": "standard_user",
    "password": "secret_sauce"
  }
}
```

## Product

Thêm sản phẩm vào:

```
test-data/products.json
```

Ví dụ:

```json
{
  "backpack": {
    "name": "Sauce Labs Backpack"
  }
}
```

Trong testcase chỉ cần gọi:

```python
users["valid_user"]
products["backpack"]
```

không cần hard-code dữ liệu trong test script.

---

# Áp dụng Page Object Model (POM)

Framework được xây dựng theo mô hình **Page Object Model (POM)** nhằm tăng khả năng bảo trì và tái sử dụng code.

Nguyên tắc áp dụng:

- **pages/** chứa toàn bộ Locator và các thao tác trên từng màn hình.
- **tests/** chỉ chứa logic kiểm thử, không khai báo locator.
- Dữ liệu kiểm thử được tách riêng trong **test-data/**.
- Các hàm đọc dữ liệu được quản lý trong **utils/**.
- **conftest.py** quản lý Fixture, Browser và khởi tạo Page Object.

Ví dụ:

```
tests/test_login.py
        │
        ▼
pages/login_page.py
        │
        ▼
Playwright API
```

Việc tách riêng Page Object giúp:

- Giảm trùng lặp code.
- Dễ bảo trì khi UI thay đổi.
- Test script ngắn gọn, dễ đọc.
- Tăng khả năng tái sử dụng cho nhiều testcase.

---

# Danh sách Test Case

### Login

- Login thành công
- Login sai Password
- Login sai Username
- Login để trống Username

### Product

- Hiển thị danh sách sản phẩm
- Xem chi tiết sản phẩm

### Cart

- Thêm sản phẩm vào Cart
- Xóa sản phẩm khỏi Cart

Tổng cộng: **8 Test Cases**

Framework được cấu hình chạy tự động trên **Chromium, Firefox và WebKit** bằng Pytest Parameterization.