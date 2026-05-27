import { Page, Locator } from "@playwright/test";
import BasePage from "../basePage";

export class OrgLoginPage extends BasePage{

    private readonly usernameTextBox : Locator;
    private readonly passwordTextBox : Locator;
    private readonly loginButton : Locator;

    constructor(page: Page){
        super(page);
        this.usernameTextBox = page.locator('input[placeholder="Username"]');
        this.passwordTextBox = page.locator('input[placeholder="Password"]');
        this.loginButton = page.locator('button[type="submit"]')
    }

    

    async enterUsername (username : string){
        await this.b_fillField(this.usernameTextBox, username);
    }

    async enterPassword (password : string){
        await this.b_fillField(this.passwordTextBox, password);
    }

    async clickLogin () {
        await this.b_clickElement(this.loginButton);
    }
}