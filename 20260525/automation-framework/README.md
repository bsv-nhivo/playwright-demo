# SauceDemo Automation Framework

Automation testing framework for **SauceDemo** developed using **Playwright** and **TypeScript**.

This project applies the **Page Object Model (POM)** design pattern, separates test data from test scripts, supports multi-browser execution, and generates Playwright HTML reports.

---
# 1. Project Overview

This project was developed as part of an Automation Testing training assignment.

The objective of this project is to automate the complete purchasing workflow on the SauceDemo website while applying automation testing best practices.

The framework was designed with the following goals:

- Apply Page Object Model (POM)
- Separate test data from test scripts
- Support JSON and CSV test data
- Execute tests on multiple browsers
- Generate HTML reports
- Keep test cases independent
- Improve maintainability and readability

### Application Under Test

Website:

> https://www.saucedemo.com/

Language:

> TypeScript

Automation Framework:

> Playwright

Design Pattern:

> Page Object Model (POM)
---

# 2. Technology Stack

| Category | Technology |
|-----------|------------|
| Programming Language | TypeScript |
| Automation Framework | Playwright |
| Runtime | Node.js |
| Package Manager | npm |
| Design Pattern | Page Object Model (POM) |
| Test Data | JSON / CSV |
| Reporting | Playwright HTML Report |
| Browsers | Chromium / Firefox / WebKit |
| IDE | Visual Studio Code |
| Version Control | Git |
---

# 3. Framework Architecture

The framework follows the **Page Object Model (POM)** architecture.
                Tests
                  │
                  ▼
             Test Fixture
                  │
                  ▼
             Page Objects
                  │
                  ▼
            Playwright API
                  │
                  ▼
              SauceDemo

Workflow:

1. Test cases are executed.
2. Fixtures initialize all required Page Objects.
3. Tests call reusable methods from Page Objects.
4. Page Objects interact with SauceDemo.
5. Playwright performs browser actions.
6. Test results are generated.
---

# 4. Project Structure

```text
automation-framework/
│
├── fixtures/
│   └── testFixture.ts          # Initialize shared Page Objects
│
├── pages/
│   ├── LoginPage.ts
│   ├── ProductPage.ts
│   ├── ProductDetailPage.ts
│   ├── CartPage.ts
│   ├── CheckoutStepOnePage.ts
│   ├── CheckoutStepTwoPage.ts
│   └── CheckoutCompletePage.ts
│
├── test-data/
│   ├── users.json
│   ├── users.csv
│   └── products.json
│
├── tests/
│   ├── login/
│   ├── product/
│   ├── item-details/
│   ├── cart/
│   ├── checkout-step-one/
│   ├── checkout-step-two/
│   └── checkout-complete/
│
├── utils/
│   ├── jsonReader.ts
│   └── csvReader.ts
│
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```
---

# 5. Framework Design

The framework follows the **Page Object Model (POM)** design pattern.

Each screen in SauceDemo is implemented as a separate Page Object class.

## Page Objects

| Page | Responsibility |
|------|----------------|
| LoginPage | Login screen actions and validations |
| ProductPage | Inventory page actions |
| ProductDetailPage | Product Detail page |
| CartPage | Shopping Cart page |
| CheckoutStepOnePage | Customer Information page |
| CheckoutStepTwoPage | Checkout Overview page |
| CheckoutCompletePage | Order Completion page |

Each Page Object contains:

- UI Locators
- User Actions
- Verification Methods

Test cases never interact with locators directly.
---

# 6. Test Data Management

The framework separates test data from test scripts.

Current supported formats:

- JSON
- CSV

Folder:

```text
test-data/

users.json

users.csv

products.json
```

Example

```json
{
  "validUser": {
    "username": "standard_user",
    "password": "secret_sauce"
  }
}
```

Benefits

- Easy maintenance
- Reusable test data
- Cleaner test scripts
- Support multiple datasets
---

# 7. Playwright Configuration

The Playwright configuration is defined in **playwright.config.ts**.

Current configuration includes:

- Base URL
- Timeout
- Parallel execution
- Multi-browser execution
- HTML Report
- Screenshot on failure
- Trace on failure
- Headless execution

Supported browsers

- Chromium
- Firefox
- WebKit
---

# 8. Test Coverage

| Module | Number of Test Cases |
|----------|--------------------:|
| Login | 29 |
| All Item | 45 |
| Item Details | 33 |
| Cart | 54 |
| Checkout Step One | 38 |
| Checkout Step Two | 48 |
| Checkout Complete | 25 |
| **Total** | **272** |

Modules covered:

- Login
- Product Inventory
- Product Detail
- Shopping Cart
- Checkout Step One
- Checkout Step Two
- Checkout Complete
---

# 9. Installation

## Prerequisites

Before running the project, make sure the following software is installed:

- Node.js (v22 or later recommended)
- npm
- Git
- Visual Studio Code (recommended)

## Clone the project

```bash
git clone <repository-url>
cd automation-framework
```

## Install dependencies

```bash
npm install
```

## Install Playwright browsers

```bash
npx playwright install
```

## Verify installation

```bash
npx playwright --version
```
---

# 10. Running Tests

## Run all tests

```bash
npx playwright test
```

## Run a specific module

### Login

```bash
npx playwright test tests/login/login.spec.ts
```

### Product

```bash
npx playwright test tests/product/product.spec.ts
```

### Item Details

```bash
npx playwright test tests/item-details/item-details.spec.ts
```

### Cart

```bash
npx playwright test tests/cart/cart.spec.ts
```

### Checkout Step One

```bash
npx playwright test tests/checkout-step-one/checkout-step-one.spec.ts
```

### Checkout Step Two

```bash
npx playwright test tests/checkout-step-two/checkout-step-two.spec.ts
```

### Checkout Complete

```bash
npx playwright test tests/checkout-complete/checkout-complete.spec.ts
```

## Run tests on a specific browser

### Chromium

```bash
npx playwright test --project=Chromium
```

### Firefox

```bash
npx playwright test --project=Firefox
```

### WebKit

```bash
npx playwright test --project=WebKit
```

## Type Checking

```bash
npx tsc --noEmit
```
---

# 11. HTML Report

After running the test suite, Playwright automatically generates an HTML report.

To open the report:

```bash
npx playwright show-report
```

The report includes:

- Test execution summary
- Passed / Failed test cases
- Screenshots (on failure)
- Trace files (on failure)
- Execution time
- Browser information
---

# 12. Best Practices

The framework follows several automation testing best practices.

### Page Object Model

- One Page Object per screen
- Reusable methods
- Centralized locators

### Test Data Separation

- JSON
- CSV

### Independent Test Cases

Each test case prepares its own data.

No dependency exists between test cases.

### Smart Wait

The framework avoids using:

```ts
waitForTimeout()
```

Instead, it uses Playwright's built-in waiting mechanism:

```ts
await expect(locator).toBeVisible();

await page.waitForURL();
```

### Multi-browser Execution

The framework supports:

- Chromium
- Firefox
- WebKit

### Maintainability

- Clear folder structure
- Reusable Page Objects
- Shared Fixtures
- Centralized configuration
---

# 13. Troubleshooting

| Problem | Solution |
|----------|----------|
| Node version issue | Use `nvm use 22` |
| Playwright browser missing | Run `npx playwright install` |
| TypeScript errors | Run `npx tsc --noEmit` |
| Report not generated | Execute `npx playwright show-report` after running tests |
| Browser does not launch | Check Playwright installation |
| Tests not found | Verify file path and naming convention |
| Module import errors | Run commands from the project root directory |
---

# 14. Project Information

- Framework: Playwright
- Language: TypeScript
- Design Pattern: Page Object Model (POM)