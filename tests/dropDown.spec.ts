// Assignment - Handle "User Role" dropdown from the admin tab in https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers

import { test, expect } from '@playwright/test';

 test.only('Handle "User Role" dropdown', async ({ page }) => {
        // Navigate to the login page
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        // Fill username and password, then click login - optimized chaining
        await page.fill('input[name="username"]', 'Admin');
        await page.fill('input[name="password"]', 'admin123');
        await page.click('button[type="submit"]');

        // Verify successful login by checking URL or dashboard element
        await expect(page).toHaveURL(/.*dashboard/, { timeout: 10000 });

        await page.locator(".oxd-main-menu-item--name", { hasText: "Admin" }).click();

        await page.locator(".oxd-select-text-input").first().click();

        await page.locator('div[role="listbox"]>div[role="option"]',{hasText : 'Admin'}).click();

        await expect(page.locator('.oxd-select-wrapper>.oxd-select-text>.oxd-select-text-input',{hasText : 'Admin'})).toHaveText('Admin');



    })

