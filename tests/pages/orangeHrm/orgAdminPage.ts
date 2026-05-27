import { Page, Locator } from "@playwright/test";
import BasePage from "../basePage";

export class OrgAdminPage extends BasePage {

    private readonly usernameTextBox: Locator;
    private readonly selectRoleButton: Locator;
    private readonly selectRoleValue: Locator;
    private readonly empNameTextBox: Locator;
    private readonly empNameDropdown: Locator;
    private readonly selectStatusButton: Locator;
    private readonly selectStatusValue: Locator;
    private readonly searchButton: Locator;
    private readonly enterPasswordTextBox: Locator;
    private readonly confirmPasswordTextBox: Locator;
    private readonly addUserButton: Locator;
    private readonly submitButton: Locator;

    private readonly confirmDeleteButton: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameTextBox = page.locator('.oxd-input-group:has(.oxd-label:has-text("Username")) input.oxd-input');
        this.selectRoleButton = page.locator('.oxd-input-group:has(.oxd-label:has-text("User Role")) .oxd-select-text');
        this.selectRoleValue = page.locator('.oxd-input-group:has(.oxd-label:has-text("User Role")) .oxd-select-dropdown');
        this.empNameTextBox = page.locator('input[placeholder="Type for hints..."]');
        this.empNameDropdown = page.locator('.oxd-autocomplete-dropdown');
        this.selectStatusButton = page.locator('.oxd-input-group:has(.oxd-label:has-text("Status")) .oxd-select-text');
        this.selectStatusValue = page.locator('.oxd-input-group:has(.oxd-label:has-text("Status")) .oxd-select-dropdown');
        this.searchButton = page.locator('button[type="submit"]');
        this.enterPasswordTextBox = page.locator('.oxd-input-group:has(.oxd-label:has-text("Password")) .oxd-input').first();
        this.confirmPasswordTextBox = page.locator('.oxd-input-group:has(.oxd-label:has-text("Confirm Password")) input[type="password"]');
        this.addUserButton = page.locator('.orangehrm-header-container button.oxd-button--secondary')
        this.submitButton = page.locator('button[type="submit"]');

        this.confirmDeleteButton = page.locator('.orangehrm-button-margin .bi-trash')

    }

    async enterUsername(username: string) {
        await this.b_fillField(this.usernameTextBox, username);
    }

    async selectSelectRoleOption(selectAdmin: string) {
        await this.b_selectDynamicDropDown(this.selectRoleButton, this.selectRoleValue, selectAdmin);
    }

    async selectEmpName(searchText: string, empName: string) {
        await this.b_fillField(this.empNameTextBox, searchText);
        const option = this.empNameDropdown.locator(`.oxd-autocomplete-option span:text-is("${empName}")`);
        await option.waitFor({ state: 'visible' });
        await option.click();
    }

    async selectStatusOption(selectStatus: string) {
        await this.b_selectDynamicDropDown(this.selectStatusButton, this.selectStatusValue, selectStatus);
    }

    async clickSearch(){
        await this.b_clickElement(this.searchButton);
    }

    async enterPassword(password : string){
        await this.b_fillField(this.enterPasswordTextBox, password);
    }

    async confirmPassword(password : string) {
        await this.b_fillField(this.confirmPasswordTextBox, password);
    }

    async clickAdd(){
        await this.b_clickElement(this.addUserButton);
    }

    async clickSubmit(){
        await this.b_clickElement(this.submitButton);
    }

    async clickDelete(username: string){
        const targetRow = this.page.locator(`.oxd-table-row:has(.oxd-table-cell:has-text("${username}"))`);
        const deleteButton = targetRow.locator('.oxd-table-cell .oxd-table-cell-actions .bi-trash');
        await this.b_clickElement(deleteButton);
    }

    async confirmDelete(){
        await this.b_clickElement(this.confirmDeleteButton);
    }
}