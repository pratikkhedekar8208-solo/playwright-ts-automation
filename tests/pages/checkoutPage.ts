import { Page, Locator } from "@playwright/test";
import BasePage from "./basePage";

export class CheckoutPage extends BasePage{

    private readonly checkoutButton : Locator;
    

    constructor(page: Page){
        super(page);
        this.checkoutButton = page.locator('#checkout');
    
    }

    async clickCheckout (){
        await this.b_clickElement(this.checkoutButton);
    }
}