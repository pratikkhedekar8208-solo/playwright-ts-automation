import { test, expect } from '@playwright/test'
import { LoginPage } from './pages/loginPage';
import { ProductPage } from './pages/productPage';
import { CheckoutPage } from './pages/checkoutPage';
import * as saucedemoLoginData from './testData/saucedemoLoginData.json';
import * as checkoutInformationData from './testData/checkoutInformationData.json'
import { CheckoutInformationPage } from './pages/checkoutInformationPage';

test('Sauce Demo - Login test with valid credenatial', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);
    const checkoutInformationPage = new CheckoutInformationPage(page);

    await loginPage.b_goTo("https://www.saucedemo.com/");
    await loginPage.enterUsername(saucedemoLoginData.validUsername);
    await loginPage.enterPassword(saucedemoLoginData.validPassword);
    await loginPage.clickLogin();

    // Assert login was successful by verifying the URL
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Assert that all 6 inventory items are visible on the products page
    const count = await loginPage.b_getCountOfElements(page.locator('.inventory_item_description'));
    console.log('Inventory item count:', count);
    expect(count).toBe(6);

    // Click on Add to cart for first product
    await productPage.addToCart("Sauce Labs Bike Light");
    await productPage.clickOnShoppingCart();

    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

    // Click on check out
    await checkoutPage.clickCheckout();
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");

    //Fill out the checkout your information
    await checkoutInformationPage.enterFirstName(checkoutInformationData.firstName);
    await checkoutInformationPage.enterLastName(checkoutInformationData.lastName);
    await checkoutInformationPage.enterZip(checkoutInformationData.zip);
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");

})

test('Sauce Demo - Sort products by Name (Z to A)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    // Step 1: Login
    await loginPage.b_goTo("https://www.saucedemo.com/");
    await loginPage.enterUsername(saucedemoLoginData.validUsername);
    await loginPage.enterPassword(saucedemoLoginData.validPassword);
    await loginPage.clickLogin();

    // Step 2: Assert login was successful
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Step 3: By default items are sorted in ascending order (A to Z)
    // Verify the default active option is "Name (A to Z)"
    const defaultOption = await productPage.getActiveOption();
    console.log('Default sort option:', defaultOption);
    expect(defaultOption).toBe('Name (A to Z)');

    // Step 4: Select "Name (Z to A)" from the sort dropdown
    await productPage.sortByNameZtoA();

    // Step 5: Verify active option label updated to "Name (Z to A)"
    const activeOption = await productPage.getActiveOption();
    console.log('Active sort option after selection:', activeOption);
    expect(activeOption).toBe('Name (Z to A)');

    // Step 6: Get all product names and verify they are in descending (Z to A) order
    const productNames = await productPage.getProductNames();
    console.log('Product names in Z to A order:', productNames);

    // Expected order based on the HTML (Z to A)
    const expectedNamesZtoA = [
        'Test.allTheThings() T-Shirt (Red)',
        'Sauce Labs Onesie',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Bike Light',
        'Sauce Labs Backpack'
    ];

    expect(productNames).toEqual(expectedNamesZtoA);
})

test('Sauce Demo - Sort products by Price (low to high)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    // Step 1: Login
    await loginPage.b_goTo("https://www.saucedemo.com/");
    await loginPage.enterUsername(saucedemoLoginData.validUsername);
    await loginPage.enterPassword(saucedemoLoginData.validPassword);
    await loginPage.clickLogin();

    // Step 2: Assert login was successful
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Step 3: By default items are sorted by Name (A to Z)
    // Verify the default active option before changing sort
    const defaultOption = await productPage.getActiveOption();
    console.log('Default sort option:', defaultOption);
    expect(defaultOption).toBe('Name (A to Z)');

    // Step 4: Select "Price (low to high)" from the sort dropdown
    await productPage.sortByPriceLowToHigh();

    // Step 5: Verify active option label updated to "Price (low to high)"
    const activeOption = await productPage.getActiveOption();
    console.log('Active sort option after selection:', activeOption);
    expect(activeOption).toBe('Price (low to high)');

    // Step 6: Verify all product PRICES are in ascending order (low to high)
    const productPrices = await productPage.getProductPrices();
    console.log('Product prices in low to high order:', productPrices);

    // Expected prices in ascending order (from product.html price inspection)
    const expectedPricesLowToHigh = [
        '$7.99',    // Sauce Labs Onesie
        '$9.99',    // Sauce Labs Bike Light
        '$15.99',   // Sauce Labs Bolt T-Shirt
        '$15.99',   // Test.allTheThings() T-Shirt (Red)
        '$29.99',   // Sauce Labs Backpack
        '$49.99'    // Sauce Labs Fleece Jacket
    ];

    expect(productPrices).toEqual(expectedPricesLowToHigh);

    // Step 7: Also verify the product NAMES appear in price-ascending order
    const productNames = await productPage.getProductNames();
    console.log('Product names in price low to high order:', productNames);

    // Expected product names in price ascending order (derived from product.html)
    const expectedNamesLowToHigh = [
        'Sauce Labs Onesie',                   // $7.99
        'Sauce Labs Bike Light',               // $9.99
        'Sauce Labs Bolt T-Shirt',             // $15.99
        'Test.allTheThings() T-Shirt (Red)',   // $15.99
        'Sauce Labs Backpack',                 // $29.99
        'Sauce Labs Fleece Jacket'             // $49.99
    ];

    expect(productNames).toEqual(expectedNamesLowToHigh);
})

test.only('Sauce Demo - Sort products by Price (high to low)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    // Step 1: Login
    await loginPage.b_goTo("https://www.saucedemo.com/");
    await loginPage.enterUsername(saucedemoLoginData.validUsername);
    await loginPage.enterPassword(saucedemoLoginData.validPassword);
    await loginPage.clickLogin();

    // Step 2: Assert login was successful
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Step 3: Verify the default sort label before changing
    const defaultOption = await productPage.getActiveOption();
    console.log('Default sort option:', defaultOption);
    expect(defaultOption).toBe('Name (A to Z)');

    // Step 4: Select "Price (high to low)" from the sort dropdown
    await productPage.sortByPriceHighToLow();

    // Step 5: Verify active option label updated to "Price (high to low)"
    const activeOption = await productPage.getActiveOption();
    console.log('Active sort option after selection:', activeOption);
    expect(activeOption).toBe('Price (high to low)');

    // Step 6: Verify all product PRICES are in descending order (high to low)
    const productPrices = await productPage.getProductPrices();
    console.log('Product prices in high to low order:', productPrices);

    // Expected prices in descending order (reverse of low to high)
    const expectedPricesHighToLow = [
        '$49.99',   // Sauce Labs Fleece Jacket
        '$29.99',   // Sauce Labs Backpack
        '$15.99',   // Test.allTheThings() T-Shirt (Red)
        '$15.99',   // Sauce Labs Bolt T-Shirt
        '$9.99',    // Sauce Labs Bike Light
        '$7.99'     // Sauce Labs Onesie
    ];

    expect(productPrices).toEqual(expectedPricesHighToLow);

    // Step 7: Also verify the product NAMES appear in price-descending order
    const productNames = await productPage.getProductNames();
    console.log('Product names in price high to low order:', productNames);

    // Expected product names in price descending order (derived from product.html)
    const expectedNamesHighToLow = [
        'Sauce Labs Fleece Jacket',             // $49.99
        'Sauce Labs Backpack',                  // $29.99
        'Sauce Labs Bolt T-Shirt',              // $15.99
        'Test.allTheThings() T-Shirt (Red)',    // $15.99
        'Sauce Labs Bike Light',                // $9.99
        'Sauce Labs Onesie'                     // $7.99
    ];

    expect(productNames).toEqual(expectedNamesHighToLow);
})