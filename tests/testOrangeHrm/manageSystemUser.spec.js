import { expect, test } from '@playwright/test';
import { OrgLoginPage } from '../pages/orangeHrm/orgLoginPage';
import { OrgDashBoardPage } from '../pages/orangeHrm/orgDashboardPage';
import { OrgAdminPage } from '../pages/orangeHrm/orgAdminPage';
import * as LoginData from '../testData/orgLoginInformation.json';
import * as UserData from '../testData/orgAdminDetail.json';

// ─── Constants ────────────────────────────────────────────────────────────────
const LOGIN_URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
const USERS_URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers';

// ─── Selectors ────────────────────────────────────────────────────────────────
const SYSTEM_USERS_HEADING = 'h5.oxd-table-filter-title';
const RECORD_COUNT_TEXT = '.orangehrm-vertical-padding .oxd-text';

// ─── Helper: Login + Navigate to System Users ─────────────────────────────────
// Uses page.goto with 'domcontentloaded' (NOT basePage.b_goTo which uses
// 'networkidle') because OrangeHRM demo site background requests never fully
// settle, causing the default 30s budget to be exhausted on navigation alone.
async function loginAndGoToSystemUsers(page) {
    const loginPage = new OrgLoginPage(page);
    const dashboardPage = new OrgDashBoardPage(page);

    // Step A: Go to login page
    await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded' });

    // Step B: Login
    await loginPage.enterUsername(LoginData.username);
    await loginPage.enterPassword(LoginData.password);
    await loginPage.clickLogin();
    await page.waitForLoadState('domcontentloaded');

    // Step C: Navigate to Admin > System Users
    await dashboardPage.clickAdmin();
    await page.waitForLoadState('domcontentloaded');

    // Step D: Confirm the System Users page is active
    // (clickAdmin goes to viewAdminModule which auto-renders System Users list)
    await expect(page.locator(SYSTEM_USERS_HEADING)).toHaveText('System Users');
}

// ─── Test Suite ───────────────────────────────────────────────────────────────
// serial mode guarantees order: Create → Verify → Delete
test.describe.serial('OrangeHRM - Manage System User Lifecycle', () => {

    // ── Test 1: Create a new system user ──────────────────────────────────────
    test('Step 1 - Create a new system user', async ({ page }) => {

        await test.step('Login and navigate to System Users page', async () => {
            await loginAndGoToSystemUsers(page);
        });

        await test.step('Click "Add" to open the new user form', async () => {
            const adminPage = new OrgAdminPage(page);
            await adminPage.clickAdd();
            await page.waitForLoadState('domcontentloaded');
        });

        await test.step('Fill in the user details and submit the form', async () => {
            const adminPage = new OrgAdminPage(page);

            await adminPage.selectSelectRoleOption(UserData.userRole);  // "Admin"
            await adminPage.selectEmpName('Peter', UserData.empName);   // "Peter Mac Anderson"
            await adminPage.selectStatusOption(UserData.status);        // "Enabled"
            await adminPage.enterUsername(UserData.username);           // "Ganesh"
            await adminPage.enterPassword(UserData.password);
            await adminPage.confirmPassword(UserData.password);
            await adminPage.clickSubmit();
        });

        await test.step('Confirm redirect back to the System Users list', async () => {
            // OrangeHRM redirects to the users list after a successful save.
            // We wait for the heading element rather than a specific URL,
            // because the redirect URL may vary between site versions.
            await page.waitForLoadState('domcontentloaded');
            await page.waitForURL("https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers");
            await expect(page.locator(SYSTEM_USERS_HEADING)).toHaveText('System Users');
        });
    });

    // ── Test 2: Verify the created user is present in search results ──────────
    test('Step 2 - Verify the created user is present', async ({ page }) => {

        await test.step('Login and navigate to System Users page', async () => {
            await loginAndGoToSystemUsers(page);
        });

        await test.step('Search for the created user by username, role, employee and status', async () => {
            const adminPage = new OrgAdminPage(page);

            await adminPage.enterUsername(UserData.username);
            await adminPage.selectSelectRoleOption(UserData.userRole);
            await adminPage.selectEmpName('Peter', UserData.empName);
            await adminPage.selectStatusOption(UserData.status);
            await adminPage.clickSearch();
            await page.waitForLoadState('domcontentloaded');
        });

        await test.step('Confirm the "Record Found" count message appears', async () => {
            await expect(page.locator(RECORD_COUNT_TEXT)).toContainText('Record Found');
        });

        await test.step('Verify each column in the result row matches the expected values', async () => {
            const firstRow = page.locator('.oxd-table-body .oxd-table-row').first();

            // Soft assertions ensure all column checks run even if one fails
            await expect.soft(firstRow.locator(`.oxd-table-cell:has-text("${UserData.username}")`))
                .toHaveText(UserData.username);

            await expect.soft(firstRow.locator(`.oxd-table-cell:has-text("${UserData.userRole}")`))
                .toHaveText(UserData.userRole);

            await expect.soft(firstRow.locator('.oxd-table-cell:has-text("Peter Anderson")'))
                .toHaveText('Peter Anderson');

            await expect.soft(firstRow.locator(`.oxd-table-cell:has-text("${UserData.status}")`))
                .toHaveText(UserData.status);
        });
    });

    // ── Test 3: Delete the created user ──────────────────────────────────────
    test('Step 3 - Delete the created user', async ({ page }) => {

        await test.step('Login and navigate to System Users page', async () => {
            await loginAndGoToSystemUsers(page);
        });

        await test.step('Search by username so only the target user row is visible', async () => {
            const adminPage = new OrgAdminPage(page);

            // Narrowing to one row makes clickDelete() target the correct record
            await adminPage.enterUsername(UserData.username);
            await adminPage.clickSearch();
            await page.waitForLoadState('domcontentloaded');

            await expect(page.locator(RECORD_COUNT_TEXT)).toContainText('Record Found');
        });

        await test.step('Click the delete (trash) icon on the user row', async () => {
            const adminPage = new OrgAdminPage(page);
            await adminPage.clickDelete(UserData.username);
        });

        await test.step('Confirm the deletion in the confirmation dialog', async () => {
            const adminPage = new OrgAdminPage(page);
            await adminPage.confirmDelete();
            await page.waitForLoadState('domcontentloaded');
        });

        await test.step('Verify the user no longer exists in search results', async () => {
            const adminPage = new OrgAdminPage(page);

            await adminPage.enterUsername(UserData.username);
            await adminPage.clickSearch();
            await page.waitForLoadState('domcontentloaded');

            await expect(page.locator(RECORD_COUNT_TEXT)).toContainText('No Records Found');
        });
    });
});
