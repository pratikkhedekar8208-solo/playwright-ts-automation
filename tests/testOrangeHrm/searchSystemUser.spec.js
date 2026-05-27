import { expect, test } from '@playwright/test';
import { OrgLoginPage } from "../pages/orangeHrm/orgLoginPage";
import { OrgDashBoardPage } from "../pages/orangeHrm/orgDashboardPage";
import { OrgAdminPage } from "../pages/orangeHrm/orgAdminPage"
import * as OrgLoginInformation from '../testData/orgLoginInformation.json';
import * as OrgAdminDetail from '../testData/orgAdminDetail.json'

test.beforeEach('', async({ page })=>{
    const orgLoginPage = new OrgLoginPage(page);
    const orgDashBoardPage = new OrgDashBoardPage(page);

    await orgLoginPage.b_goTo("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.waitForLoadState('domcontentloaded');
    await orgLoginPage.enterUsername(OrgLoginInformation.username);
    await orgLoginPage.enterPassword(OrgLoginInformation.password);
    await orgLoginPage.clickLogin();
    await orgDashBoardPage.clickAdmin();
    await page.waitForLoadState('domcontentloaded');
    
})

test('Create the user', async({page})=>{
    const orgDashBoardPage = new OrgDashBoardPage(page);
    const orgAdminPage = new OrgAdminPage(page);
    await orgDashBoardPage.clickAdmin();
    await page.waitForLoadState('domcontentloaded');

    await orgAdminPage.clickAdd();

    await page.waitForLoadState('domcontentloaded');
    await orgAdminPage.selectSelectRoleOption(OrgAdminDetail.userRole);
    await orgAdminPage.selectEmpName('Peter', OrgAdminDetail.empName);
    await orgAdminPage.selectStatusOption(OrgAdminDetail.status);
    await orgAdminPage.enterUsername(OrgAdminDetail.username);
    await orgAdminPage.enterPassword(OrgAdminDetail.password);
    await orgAdminPage.confirmPassword(OrgAdminDetail.password);
    await orgAdminPage.clickSubmit();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForURL("https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers");
})

test('User Search: filters results correctly when multiple fields are used and check whether created user is found or not', async ({ page }) => {

    const orgAdminPage = new OrgAdminPage(page);

    await expect(page.locator('h5.oxd-table-filter-title')).toHaveText('System Users');

    await orgAdminPage.enterUsername(OrgAdminDetail.username);
    await orgAdminPage.selectSelectRoleOption(OrgAdminDetail.userRole);
    // Use a more specific search hint to reliably trigger the autocomplete
    await orgAdminPage.selectEmpName('Peter', OrgAdminDetail.empName);
    await orgAdminPage.selectStatusOption(OrgAdminDetail.status);
    await orgAdminPage.clickSearch();

    await page.waitForLoadState('domcontentloaded');

    // Verify record found message
    await expect(page.locator('.orangehrm-vertical-padding .oxd-text')).toContainText('Record Found');

    // Assert each column in the first result row (row index 1 skips the header row)
    const firstResultRow = page.locator('.oxd-table-body .oxd-table-row').first();
    await expect(firstResultRow.locator(`.oxd-table-cell:has-text("${OrgAdminDetail.username}")`)).toHaveText(OrgAdminDetail.username);
    await expect(firstResultRow.locator(`.oxd-table-cell:has-text("${OrgAdminDetail.userRole}")`)).toHaveText(OrgAdminDetail.userRole);
    await expect(firstResultRow.locator(`.oxd-table-cell:has-text("Peter Anderson")`)).toHaveText("Peter Anderson");
    await expect(firstResultRow.locator(`.oxd-table-cell:has-text("${OrgAdminDetail.status}")`)).toHaveText(OrgAdminDetail.status);

})

test('Delete the user', async({page})=>{
    const orgAdminPage = new OrgAdminPage(page);

    // Search for the user first so the row is visible before deleting
    await orgAdminPage.enterUsername(OrgAdminDetail.username);
    await orgAdminPage.clickSearch();
    await page.waitForLoadState('domcontentloaded');

    await orgAdminPage.clickDelete(OrgAdminDetail.username);
    await orgAdminPage.confirmDelete();

    await expect(page.locator('.orangehrm-vertical-padding .oxd-text')).toContainText("No Records Found");
})
