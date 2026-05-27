import { test, expect } from '@playwright/test';

test.describe('OrangeHRM Login Tests', () => {
    test('should login successfully with valid credentials', async ({ page }) => {
        // Navigate to the login page
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        // Fill username and password, then click login - optimized chaining
        await page.fill('input[name="username"]', 'Admin');
        await page.fill('input[name="password"]', 'admin123');
        await page.click('button[type="submit"]');

        // Verify successful login by checking URL or dashboard element
        await expect(page).toHaveURL(/.*dashboard/, { timeout: 10000 });
    });
});

test.describe('OrangeHRM Admin Tests', () => {
    test.only('should navigate to admin page', async ({ page }) => {
        // Navigate to the login page
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        // Fill username and password, then click login - optimized chaining
        await page.fill('input[name="username"]', 'Admin');
        await page.fill('input[name="password"]', 'admin123');
        await page.click('button[type="submit"]');

        // Verify successful login by checking URL or dashboard element
        await expect(page).toHaveURL(/.*dashboard/, { timeout: 10000 });

        await page.locator(".oxd-text", { hasText: "Admin" }).click();

        await expect(page.locator(".oxd-label", { hasText: "Username" })).toHaveText("user");
    })

})
