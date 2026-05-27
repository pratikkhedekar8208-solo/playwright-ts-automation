// Assignment - Handle all the radio button selection in https://demos.jquerymobile.com/1.4.5/checkboxradio-radio/

import { test, expect } from '@playwright/test';

test.only('Basic markup should select radio buttons', async ({ page }) => {
    await page.goto('https://demos.jquerymobile.com/1.4.5/checkboxradio-radio/');

    // Initial state: both radio buttons are unchecked (static HTML has no checked attribute)
    await expect(page.locator('input[id="radio-choice-0a"]')).not.toBeChecked();
    await expect(page.locator('input[id="radio-choice-0b"]')).not.toBeChecked();

    // Click the label for the second radio button to select it
    await page.locator('label[for="radio-choice-0a"]').check();

    // Verify the second radio is now checked and the first is still not checked
    await expect(page.locator('input[id="radio-choice-0b"]')).toBeChecked();
    await expect(page.locator('input[id="radio-choice-0a"]')).not.toBeChecked();
});

test("Vertical group should select radio buttons", async ({ page }) => {
    await page.goto('https://demos.jquerymobile.com/1.4.5/checkboxradio-radio/');

    // Initial state: both radio buttons are unchecked (static HTML has no checked attribute)
    await expect(page.locator('label[for="radio-choice-v-2a"]')).toBeChecked();
    await expect(page.locator('label[for="radio-choice-v-2b"]')).not.toBeChecked();

    await page.locator('label[for="radio-choice-v-2b"]').click();

    await expect(page.locator('label[for="radio-choice-v-2b"]')).toBeChecked();
    await expect(page.locator('label[for="radio-choice-v-2a"]')).not.toBeChecked();

    await page.locator('label[for="radio-choice-v-2c"]').click();

    await expect(page.locator('label[for="radio-choice-v-2c"]')).toBeChecked();
    await expect(page.locator('label[for="radio-choice-v-2a"]')).not.toBeChecked();
    await expect(page.locator('label[for="radio-choice-v-2b"]')).not.toBeChecked();


})