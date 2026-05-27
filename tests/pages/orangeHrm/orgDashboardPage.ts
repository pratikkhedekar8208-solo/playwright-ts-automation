import { Page, Locator } from "@playwright/test";
import BasePage from "../basePage";

export class OrgDashBoardPage extends BasePage{

    private readonly adminButton : Locator;
    

    constructor(page: Page){
        super(page);
        this.adminButton = page.locator('.oxd-main-menu-item--name', {hasText : "Admin"});
    
    }

    async clickAdmin(){
        await this.b_clickElement(this.adminButton);
    }
}