# 🎭 Playwright TypeScript Automation Framework

End-to-end test automation framework built with **Playwright** and **TypeScript**, following the **Page Object Model (POM)** design pattern. Covers two web applications — **OrangeHRM** and **SauceDemo**.

---

## 📁 Project Structure

```
playwright-ts-automation/
├── tests/
│   ├── pages/                        # Page Object classes
│   │   ├── basePage.ts               # Base class with reusable utilities
│   │   ├── loginPage.ts              # SauceDemo - Login page
│   │   ├── productPage.ts            # SauceDemo - Product page
│   │   ├── checkoutPage.ts           # SauceDemo - Checkout page
│   │   ├── checkoutInformationPage.ts# SauceDemo - Checkout info page
│   │   └── orangeHrm/
│   │       ├── orgLoginPage.ts       # OrangeHRM - Login page
│   │       ├── orgDashboardPage.ts   # OrangeHRM - Dashboard page
│   │       └── orgAdminPage.ts       # OrangeHRM - Admin page
│   ├── testData/                     # External test data (JSON)
│   │   ├── saucedemoLoginData.json
│   │   ├── orgLoginInformation.json
│   │   ├── orgAdminDetail.json
│   │   └── checkoutInformationData.json
│   ├── testOrangeHrm/                # OrangeHRM test suites
│   │   ├── searchSystemUser.spec.js
│   │   ├── searchSystemUserOptimized.spec.js
│   │   └── manageSystemUser.spec.js
│   ├── pomAssignment.spec.ts         # SauceDemo POM assignment
│   ├── dynamicCart.spec.ts           # Dynamic cart operations
│   ├── alert.spec.ts                 # Browser alert handling
│   ├── checkbox.spec.ts              # Checkbox interactions
│   ├── radioButton.spec.ts           # Radio button interactions
│   ├── dropDown.spec.ts              # Dropdown selection
│   └── ...                           # Additional spec files
├── playwright.config.ts              # Playwright configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json
└── .gitignore
```

---

## 🛠️ Tech Stack

| Tool        | Version   |
|-------------|-----------|
| Playwright  | ^1.58.2   |
| TypeScript  | (bundled) |
| Node.js     | 18+       |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/pratikkhedekar8208-solo/playwright-ts-automation.git
cd playwright-ts-automation

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

---

## ▶️ Running Tests

```bash
# Run all tests
npx playwright test

# Run a specific test file
npx playwright test tests/testOrangeHrm/manageSystemUser.spec.js

# Run in headed mode (visible browser)
npx playwright test --headed

# Run with single worker
npx playwright test --workers=1

# Run in debug mode
npx playwright test --debug

# Run and open HTML report
npx playwright show-report
```

---

## 🌐 Applications Under Test

### 1. OrangeHRM (Demo)
- **URL:** https://opensource-demo.orangehrmlive.com
- **Tests:** System user search, create, verify, and delete (full lifecycle)
- **Pattern:** Page Object Model with data-driven test data

### 2. SauceDemo
- **URL:** https://www.saucedemo.com
- **Tests:** Login, product sorting, cart operations, checkout flow
- **Pattern:** Page Object Model with data-driven test data

---

## 🏗️ Design Patterns

### Page Object Model (POM)
All page interactions are encapsulated in page classes under `tests/pages/`. A shared `BasePage` provides reusable methods:

- `b_goTo()` — Navigate to a URL
- `b_clickElement()` — Click with auto-wait
- `b_fillField()` — Fill input fields
- `b_selectDynamicDropDown()` — Handle dynamic dropdowns
- `b_waitForElementVisible()` — Wait for element visibility

### Data-Driven Testing
Test data is externalized in JSON files under `tests/testData/`, keeping tests clean and easy to maintain.

---

## 📊 Reports

Playwright generates an **HTML report** after each run:

```bash
npx playwright show-report
```

Traces are captured on failure and can be viewed with:

```bash
npx playwright show-trace test-results/<test-folder>/trace.zip
```

---

## 📝 License

ISC
