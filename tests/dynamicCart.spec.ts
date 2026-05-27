import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import { ProductPage } from './pages/productPage';
import * as saucedemoLoginData from './testData/saucedemoLoginData.json';

// ─────────────────────────────────────────────────────────────────────────────
// 🛒 DYNAMIC CART TEST SCENARIOS
//
// Each scenario provides a different list of product names.
// The test dynamically:
//   1. Adds every product in the list to the cart
//   2. Reads the cart badge count
//   3. Asserts the badge equals the number of products added
//   4. Logs a summary of what was added
// ─────────────────────────────────────────────────────────────────────────────

const cartScenarios = [
    {
        description: '2 items',
        products: [
            'Sauce Labs Backpack',
            'Sauce Labs Bike Light'
        ]
    },
    {
        description: '3 items',
        products: [
            'Sauce Labs Backpack',
            'Sauce Labs Bike Light',
            'Sauce Labs Bolt T-Shirt'
        ]
    },
    {
        description: '5 items',
        products: [
            'Sauce Labs Backpack',
            'Sauce Labs Bike Light',
            'Sauce Labs Bolt T-Shirt',
            'Sauce Labs Fleece Jacket',
            'Sauce Labs Onesie'
        ]
    }
];

test.describe('Sauce Demo - Dynamic Cart Tests', () => {

    // ── test.each runs the same test body for every scenario in the array ──
    for (const scenario of cartScenarios) {

        test(`Add ${scenario.description} to cart and verify badge count`, async ({ page }) => {

            const loginPage = new LoginPage(page);
            const productPage = new ProductPage(page);

            // ── Step 1: Login ─────────────────────────────────────────────
            await loginPage.b_goTo('https://www.saucedemo.com/');
            await loginPage.enterUsername(saucedemoLoginData.validUsername);
            await loginPage.enterPassword(saucedemoLoginData.validPassword);
            await loginPage.clickLogin();

            // ── Step 2: Confirm landing on inventory page ─────────────────
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

            // ── Step 3: Log the scenario we are about to run ──────────────
            console.log(`\n🛒 Scenario: Add ${scenario.description} dynamically`);
            console.log(`   Products to add: ${JSON.stringify(scenario.products)}`);

            // ── Step 4: Dynamically add all products in the list ──────────
            await productPage.addMultipleToCart(scenario.products);

            // ── Step 5: Read cart badge count ─────────────────────────────
            const cartCount = await productPage.getCartBadgeCount();

            // ── Step 6: Log the result ────────────────────────────────────
            console.log(`\n✅ Total items added: ${cartCount}`);
            console.log(`   Expected count   : ${scenario.products.length}`);

            // ── Step 7: Assert badge equals number of products added ──────
            expect(cartCount).toBe(scenario.products.length);
        });
    }
});
