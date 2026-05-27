# 📄 Test Documentation — Sauce Demo: Sort Products by Name (Z to A)

## 📌 Overview

| Field              | Details                                                              |
|--------------------|----------------------------------------------------------------------|
| **Test Name**      | Sauce Demo - Sort products by Name (Z to A)                          |
| **File**           | `tests/pomAssignment.spec.ts`                                        |
| **Framework**      | Playwright with TypeScript                                           |
| **Pattern**        | Page Object Model (POM)                                              |
| **Browser**        | Chromium only (configured in `playwright.config.ts`)                 |
| **Application URL**| https://www.saucedemo.com                                            |

---

## 🎯 Test Objective

This test verifies that the **product sort functionality** on the Sauce Demo inventory page works correctly.

Specifically, it:
1. Confirms the **default sort order is "Name (A to Z)"** (ascending) when a user first lands on the products page.
2. Selects **"Name (Z to A)"** from the sort dropdown.
3. Verifies the **dropdown label updates** to reflect the new selection.
4. Verifies that **all 6 product names are rendered in correct descending (Z → A) alphabetical order**.

---

## 🏗️ Architecture: Page Object Model (POM)

The test uses the **POM design pattern**, which separates the UI interaction logic from the test logic.

```
tests/
├── pomAssignment.spec.ts         ← Test file (calls POM methods)
├── pages/
│   ├── productPage.ts            ← POM class for the Products/Inventory page
│   ├── loginPage.ts              ← POM class for the Login page
│   └── basePage.ts               ← Base class with shared helper methods
└── testData/
    └── saucedemoLoginData.json   ← Login credentials (username & password)
```

### Why POM?
- Keeps test steps **clean and readable**.
- UI selectors are **centralised** in page classes, not scattered in tests.
- If the UI changes, you only update the **page class**, not every test.

---

## 📂 Page Object — `ProductPage` (`tests/pages/productPage.ts`)

### Locators (CSS Selectors Only)

All locators use **CSS attribute selectors** via `data-test` attributes — no Playwright-native pseudo-classes like `:has-text()`.

| Property             | CSS Selector                                      | Purpose                                      |
|----------------------|---------------------------------------------------|----------------------------------------------|
| `shoppingCartLink`   | `a[data-test="shopping-cart-link"]`               | The cart icon link in the header             |
| `sortDropdown`       | `select[data-test="product-sort-container"]`      | The `<select>` sort dropdown                 |
| `activeOption`       | `span[data-test="active-option"]`                 | Visible label showing the current sort order |
| `inventoryItemNames` | `div[data-test="inventory-item-name"]`            | All product name elements on the page        |

### Methods

#### `sortByNameZtoA()`
```typescript
async sortByNameZtoA() {
    await this.sortDropdown.selectOption('za');
}
```
- Uses Playwright's `selectOption()` with the **option value `'za'`**.
- The HTML `<select>` has: `<option value="za">Name (Z to A)</option>`.
- This selects the option **by its value attribute**, not visible text.

---

#### `getActiveOption()`
```typescript
async getActiveOption(): Promise<string> {
    return await this.activeOption.innerText();
}
```
- Reads the inner text of the `<span data-test="active-option">` element.
- Returns the **currently displayed sort label** (e.g., `"Name (A to Z)"` or `"Name (Z to A)"`).

---

#### `getProductNames()`
```typescript
async getProductNames(): Promise<string[]> {
    return await this.inventoryItemNames.allInnerTexts();
}
```
- Uses `allInnerTexts()` to collect the text of **all matching elements** at once.
- Returns a `string[]` array of all visible product names in DOM order.

---

#### `addToCart(productName: string)` *(CSS-only refactored)*
```typescript
async addToCart(productName: string) {
    const addToCartButton: Locator = this.page
        .locator('div[data-test="inventory-item"]')
        .filter({ has: this.page.locator(`div[data-test="inventory-item-name"]`) })
        .filter({ hasText: productName })
        .locator('button[data-test^="add-to-cart"]');
    await this.b_clickElement(addToCartButton);
}
```
- First `locator()` selects **all inventory item cards** via CSS.
- First `.filter()` narrows to cards that **contain a name element** (CSS scoped).
- Second `.filter({ hasText })` narrows further to the card whose **text matches the product name**.
- Final `.locator()` targets the **Add to Cart button** inside that card using `data-test^="add-to-cart"` (CSS prefix match).
- ✅ No Playwright-native `:has-text()` pseudo-class is used — **pure CSS selectors only**.

---

## 🧪 Test File — `pomAssignment.spec.ts`

### Imports
```typescript
import { test, expect } from '@playwright/test'
import { LoginPage } from './pages/loginPage';
import { ProductPage } from './pages/productPage';
import * as saucedemoLoginData from './testData/saucedemoLoginData.json';
```

### Full Test Code
```typescript
test('Sauce Demo - Sort products by Name (Z to A)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    // Step 1: Navigate to the app and login
    await loginPage.b_goTo("https://www.saucedemo.com/");
    await loginPage.enterUsername(saucedemoLoginData.validUsername);
    await loginPage.enterPassword(saucedemoLoginData.validPassword);
    await loginPage.clickLogin();

    // Step 2: Assert login was successful
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Step 3: Verify the default sort is "Name (A to Z)"
    const defaultOption = await productPage.getActiveOption();
    expect(defaultOption).toBe('Name (A to Z)');

    // Step 4: Click sort dropdown and select "Name (Z to A)"
    await productPage.sortByNameZtoA();

    // Step 5: Verify the active option label updated
    const activeOption = await productPage.getActiveOption();
    expect(activeOption).toBe('Name (Z to A)');

    // Step 6: Verify all products appear in correct Z to A order
    const productNames = await productPage.getProductNames();
    const expectedNamesZtoA = [
        'Test.allTheThings() T-Shirt (Red)',
        'Sauce Labs Onesie',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Bike Light',
        'Sauce Labs Backpack'
    ];
    expect(productNames).toEqual(expectedNamesZtoA);
});
```

---

## 🔢 Step-by-Step Test Breakdown

| Step | Action                             | Method Called                       | Assertion                                                |
|------|------------------------------------|-------------------------------------|----------------------------------------------------------|
| 1    | Navigate to Sauce Demo             | `loginPage.b_goTo(...)`             | —                                                        |
| 2    | Enter username                     | `loginPage.enterUsername(...)`      | —                                                        |
| 3    | Enter password                     | `loginPage.enterPassword(...)`      | —                                                        |
| 4    | Click Login button                 | `loginPage.clickLogin()`            | —                                                        |
| 5    | Assert URL after login             | —                                   | `toHaveURL('...inventory.html')`                         |
| 6    | Read current sort label            | `productPage.getActiveOption()`     | `toBe('Name (A to Z)')` — default sort confirmed         |
| 7    | Select "Name (Z to A)" in dropdown | `productPage.sortByNameZtoA()`      | —                                                        |
| 8    | Read updated sort label            | `productPage.getActiveOption()`     | `toBe('Name (Z to A)')` — label updated                  |
| 9    | Read all product names             | `productPage.getProductNames()`     | `toEqual([...])` — order matches Z to A                  |

---

## ✅ Assertions Explained

### Assertion 1 — URL after Login
```typescript
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
```
- **What it checks**: The browser navigated to the inventory/products page after login.
- **Why**: Confirms the login was successful before testing any product features.

---

### Assertion 2 — Default Sort is A to Z
```typescript
expect(defaultOption).toBe('Name (A to Z)');
```
- **What it checks**: The `<span data-test="active-option">` shows `"Name (A to Z)"`.
- **Why**: Establishes the **baseline** — verifies the default state before any sorting action.

---

### Assertion 3 — Active Option Updated to Z to A
```typescript
expect(activeOption).toBe('Name (Z to A)');
```
- **What it checks**: After selecting from the dropdown, the displayed label changed.
- **Why**: Confirms the UI visually reflects the sort change, not just that the DOM value changed.

---

### Assertion 4 — Products in Correct Z to A Order
```typescript
expect(productNames).toEqual([
    'Test.allTheThings() T-Shirt (Red)',
    'Sauce Labs Onesie',
    'Sauce Labs Fleece Jacket',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Bike Light',
    'Sauce Labs Backpack'
]);
```
- **What it checks**: The full array of product names matches the expected Z → A order exactly.
- **Why**: This is the **core assertion** — it validates that the sort functionality actually re-ordered the inventory items correctly.
- The expected list was derived from the HTML inspection of `product.html` (where the sort was already set to Z to A).

---

## 🌐 Browser Configuration

The test is configured to run **only on Chromium** by removing Firefox and WebKit from `playwright.config.ts`:

```typescript
// playwright.config.ts
projects: [
    {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
    },
],
```

> To re-enable Firefox or WebKit, add their respective project entries back.

---

## 📊 HTML Reference — Sort Dropdown

From `tests/html/product.html`:

```html
<select class="product_sort_container" data-test="product-sort-container">
    <option value="az">Name (A to Z)</option>
    <option value="za">Name (Z to A)</option>
    <option value="lohi">Price (low to high)</option>
    <option value="hilo">Price (high to low)</option>
</select>
```

- `value="az"` → A to Z (default)
- `value="za"` → Z to A ← **used in this test**
- `value="lohi"` → Price low to high
- `value="hilo"` → Price high to low

---

## 🗂️ Expected Product Order (Z to A)

| Position | Product Name                          |
|----------|---------------------------------------|
| 1st      | Test.allTheThings() T-Shirt (Red)     |
| 2nd      | Sauce Labs Onesie                     |
| 3rd      | Sauce Labs Fleece Jacket              |
| 4th      | Sauce Labs Bolt T-Shirt               |
| 5th      | Sauce Labs Bike Light                 |
| 6th      | Sauce Labs Backpack                   |

---

## 💡 Key Concepts Used

| Concept                        | Description                                                                 |
|--------------------------------|-----------------------------------------------------------------------------|
| **POM (Page Object Model)**    | UI interaction logic separated into page classes                            |
| **CSS Attribute Selectors**    | All locators use `[data-test="..."]` — stable, not tied to styling          |
| **`selectOption(value)`**      | Playwright API to select a `<select>` dropdown option by its `value`        |
| **`allInnerTexts()`**          | Playwright API to get text content from all matching elements as a string[] |
| **`innerText()`**              | Playwright API to get visible text of a single element                      |
| **`.filter({ hasText })`**     | Playwright locator chaining to narrow elements by text content              |
| **`toEqual([])`**              | Jest/Playwright deep-equal assertion for arrays                             |
| **`toBe()`**                   | Jest/Playwright strict equality assertion for strings                       |
