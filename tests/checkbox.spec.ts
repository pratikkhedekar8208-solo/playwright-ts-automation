// Assignment - Handle all the Checkbox button selection in https://demos.jquerymobile.com/1.4.5/checkboxradio-checkbox/

import { test, expect } from '@playwright/test';

test('Basic markup should select checkboxes', async ({ page }) => {
    await page.goto('https://demos.jquerymobile.com/1.4.5/checkboxradio-checkbox/');

    // Initial state: all checkboxes are unchecked
    await expect(page.locator('label[for="checkbox-mini-0"]')).not.toBeChecked();

    // Click the first checkbox
    await page.locator('label[for="checkbox-mini-0"]').click();
    await expect(page.locator('label[for="checkbox-mini-0"]')).toBeChecked();

});

test.only("Vertical group should select checkboxes", async ({ page }) => {
    await page.goto('https://demos.jquerymobile.com/1.4.5/checkboxradio-checkbox/');

    // Initial state: all checkboxes are unchecked
    await expect(page.locator('label[for="checkbox-v-2a"]')).not.toBeChecked();
    await expect(page.locator('label[for="checkbox-v-2b"]')).not.toBeChecked();
    await expect(page.locator('label[for="checkbox-v-2c"]')).not.toBeChecked();

    // Click the first checkbox
    await page.locator('label[for="checkbox-v-2a"]').click();
    await expect(page.locator('label[for="checkbox-v-2a"]')).toBeChecked();

    // Click the second checkbox
    await page.locator('label[for="checkbox-v-2b"]').click();
    await expect(page.locator('label[for="checkbox-v-2b"]')).toBeChecked();

    // Click the third checkbox
    await page.locator('label[for="checkbox-v-2c"]').click();
    await expect(page.locator('label[for="checkbox-v-2c"]')).toBeChecked();

    // Click the first checkbox again to uncheck it
    await page.locator('label[for="checkbox-v-2a"]').click();
    await expect(page.locator('label[for="checkbox-v-2a"]')).not.toBeChecked();
})
