import { Page, Locator } from "@playwright/test";
import BasePage from "./basePage";

export class ProductPage extends BasePage {

    private readonly shoppingCartLink: Locator;
    private readonly sortDropdown: Locator;
    private readonly activeOption: Locator;
    private readonly inventoryItemNames: Locator;
    private readonly inventoryItemPrices: Locator;
    private readonly cartBadge: Locator;

    constructor(page: Page) {
        super(page);
        this.shoppingCartLink = page.locator('a[data-test="shopping-cart-link"]');
        this.sortDropdown = page.locator('select[data-test="product-sort-container"]');
        this.activeOption = page.locator('span[data-test="active-option"]');
        this.inventoryItemNames = page.locator('div[data-test="inventory-item-name"]');
        this.inventoryItemPrices = page.locator('div[data-test="inventory-item-price"]');
        this.cartBadge = page.locator('span[data-test="shopping-cart-badge"]');
    }

    // ✅ Dynamic: pass any product name to add it to cart (using CSS selectors only)
    async addToCart(productName: string) {
        // Locate all inventory items via CSS, filter to the matching product name,
        // then find the add-to-cart button inside it using a CSS attribute selector
        const addToCartButton: Locator = this.page
            .locator('div[data-test="inventory-item"]')
            .filter({ has: this.page.locator(`div[data-test="inventory-item-name"]`) })
            .filter({ hasText: productName })
            .locator('button[data-test^="add-to-cart"]');
        await this.b_clickElement(addToCartButton);
    }

    async clickOnShoppingCart() {
        await this.b_clickElement(this.shoppingCartLink);
    }

    // ✅ Sorts the product list by Name (Z to A)
    async sortByNameZtoA() {
        await this.sortDropdown.selectOption('za');
    }

    // ✅ Returns the active sort option text displayed on the page
    async getActiveOption(): Promise<string> {
        return await this.activeOption.innerText();
    }

    // ✅ Returns all product names currently displayed on the page
    async getProductNames(): Promise<string[]> {
        return await this.inventoryItemNames.allInnerTexts();
    }

    // ✅ Sorts the product list by Price (low to high)
    async sortByPriceLowToHigh() {
        await this.sortDropdown.selectOption('lohi');
    }

    // ✅ Sorts the product list by Price (high to low)
    async sortByPriceHighToLow() {
        await this.sortDropdown.selectOption('hilo');
    }

    // ✅ Returns all product prices currently displayed on the page
    async getProductPrices(): Promise<string[]> {
        return await this.inventoryItemPrices.allInnerTexts();
    }

    // ✅ Dynamically adds multiple products to cart from a given list of product names
    async addMultipleToCart(productNames: string[]): Promise<void> {
        for (const productName of productNames) {
            await this.addToCart(productName);
            console.log(`  ✔ Added to cart: ${productName}`);
        }
    }

    // ✅ Returns the cart badge count as a number (the red bubble on the cart icon)
    async getCartBadgeCount(): Promise<number> {
        const badgeText = await this.cartBadge.innerText();
        return parseInt(badgeText, 10);
    }

}