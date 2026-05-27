import { test } from '@playwright/test';
import * as saucedemoLoginData from './testData/saucedemoLoginData.json';

test('DEBUG - Print high to low order', async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator('#user-name').fill(saucedemoLoginData.validUsername);
    await page.locator('#password').fill(saucedemoLoginData.validPassword);
    await page.locator('#login-button').click();
    await page.waitForURL('**/inventory.html');

    // Select Price (high to low)
    await page.locator('select[data-test="product-sort-container"]').selectOption('hilo');

    const names = await page.locator('div[data-test="inventory-item-name"]').allInnerTexts();
    const prices = await page.locator('div[data-test="inventory-item-price"]').allInnerTexts();

    console.log('=== PRICES HIGH TO LOW ===');
    prices.forEach((p, i) => console.log(`  [${i}] ${names[i]} → ${p}`));
});
