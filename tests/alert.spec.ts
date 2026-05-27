// Assignment - https://demo.automationtesting.in/Alerts.html

import { test, expect } from '@playwright/test';


test('Handlind sinmple alert', async ({ page }) => {
    await page.goto('https://demo.automationtesting.in/Alerts.html');

    await page.locator(".btn-danger").click();

    page.on('dialog', async (alert) => {
        await alert.accept();
    })
});

test('Confirmation alert', async ({ page }) => {
    await page.goto('https://demo.automationtesting.in/Alerts.html');

    await page.locator('a[href="#CancelTab"]').click();


    page.on('dialog', async (alert) => {
        const alertText = alert.message();
        expect(alertText).toBe("Press a Button !");
        await alert.accept();
    })

    await page.locator('.btn-primary').click();

    await expect(page.locator('#demo')).toHaveText("You pressed Ok")
})

test('Confirmation alert with text', async ({ page }) => {
    let name = "Saurabh"
    await page.goto('https://demo.automationtesting.in/Alerts.html');

    await page.locator('a[href="#Textbox"]').click();

    // Register dialog handler BEFORE clicking the button
    // The dialog fires the moment the button is clicked,
    // so the handler must be ready before the click happens.
    page.on('dialog', async (alert) => {
        await alert.accept(name);
    });

    await page.locator('.btn-info').click();

    await expect(page.locator('#demo1')).toContainText(`Hello ${name} How are you today`);
})
