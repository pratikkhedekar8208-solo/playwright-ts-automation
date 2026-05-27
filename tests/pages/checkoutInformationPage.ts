import { Page, Locator } from "@playwright/test";
import BasePage from "./basePage";

export class CheckoutInformationPage extends BasePage{

    private readonly firstNameTextBox : Locator;
    private readonly lastNameTextBox : Locator;
    private readonly zipTextBox : Locator;
    

    constructor(page: Page){
        super(page);
        this.firstNameTextBox = page.locator('#first-name');
        this.lastNameTextBox = page.locator('#last-name');
        this.zipTextBox = page.locator('#postal-code');
    
    }

    async enterFirstName (firstName : string){
        await this.b_fillField(this.firstNameTextBox, firstName);
    }

    async enterLastName (lastName : string){
        await this.b_fillField(this.lastNameTextBox, lastName);
    }
    
    async enterZip (zip : string){
        await this.b_fillField(this.zipTextBox, zip);
    }
}