import { expect, test } from '@playwright/test';
import { OrgLoginPage } from "../pages/orangeHrm/orgLoginPage";
import { OrgDashBoardPage } from "../pages/orangeHrm/orgDashboardPage";
import { OrgAdminPage } from "../pages/orangeHrm/orgAdminPage";
import * as OrgLoginInformation from '../testData/orgLoginInformation.json';
import * as OrgAdminDetail from '../testData/orgAdminDetail.json';

// ─── Constants ────────────────────────────────────────────────────────────────
const LOGIN_URL = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";
const DASHBOARD_URL = "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index";

// ─── Test Suite ───────────────────────────────────────────────────────────────
test.describe('OrangeHRM - Admin System User Search', () => {

    /** Page Object instances shared across beforeEach and test bodies */
    let orgLoginPage;
    let orgDashBoardPage;
    let orgAdminPage;

    // ── Common Setup ──────────────────────────────────────────────────────────
    test.beforeEach(async ({ page }) => {
        orgLoginPage = new OrgLoginPage(page);
        orgDashBoardPage = new OrgDashBoardPage(page);
        orgAdminPage = new OrgAdminPage(page);

        await test.step('Login to OrangeHRM', async () => {
            await orgLoginPage.b_goTo(LOGIN_URL);
            await orgLoginPage.enterUsername(OrgLoginInformation.username);
            await orgLoginPage.enterPassword(OrgLoginInformation.password);
            await orgLoginPage.clickLogin();
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(DASHBOARD_URL);
        });

        await test.step('Navigate to Admin > System Users', async () => {
            await orgDashBoardPage.clickAdmin();
            await page.waitForLoadState('domcontentloaded');
            await expect(page.locator('h5.oxd-table-filter-title')).toHaveText('System Users');
        });
    });

    // ── Test Case ─────────────────────────────────────────────────────────────
    test('User Search: filters results correctly when multiple fields are used', async ({ page }) => {

        await test.step('Fill search filters and submit', async () => {
            await orgAdminPage.enterUsername(OrgAdminDetail.username);
            await orgAdminPage.selectSelectRoleOption(OrgAdminDetail.userRole);
            await orgAdminPage.selectEmpName('Peter',OrgAdminDetail.empName);
            await orgAdminPage.selectStatusOption(OrgAdminDetail.status);
            await orgAdminPage.clickSearch();
            // networkidle is more reliable than domcontentloaded for dynamic table results
            await page.waitForLoadState('networkidle');
        });

        await test.step('Verify record found message', async () => {
            await expect(page.locator('.orangehrm-vertical-padding .oxd-text'))
                .toContainText('Record Found');
        });

        await test.step('Verify first result row data matches search criteria', async () => {
            const firstResultRow = page.locator('.oxd-table-body .oxd-table-row').first();
            const cells = firstResultRow.locator('.oxd-table-cell');

            // soft assertions — target columns by index to avoid text-based ambiguity
            // Column order: checkbox(0) | Username(1) | User Role(2) | Employee Name(3) | Status(4) | Actions(5)
            await expect.soft(cells.nth(1)).toContainText(OrgAdminDetail.username);
            await expect.soft(cells.nth(2)).toContainText(OrgAdminDetail.userRole);
            await expect.soft(cells.nth(3)).toContainText(OrgAdminDetail.searchEmpName);
            await expect.soft(cells.nth(4)).toContainText(OrgAdminDetail.status);
        });
    });
});
