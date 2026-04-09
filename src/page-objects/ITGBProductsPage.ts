import { Page, Locator, expect } from '@playwright/test';
import { waitForLightningReady, waitForModalToClose } from '../utils/lightning-wait';
import { BasePage } from './BasePage';


export class ITGBProductsPage extends BasePage {
    // ---- Locators as class fields ----
    private readonly btnAppLauncher: Locator;
    private readonly searchBox: Locator;
    private readonly optionITGBTPM: Locator;
    private readonly productsTab: Locator;
    private readonly productsHeader: Locator;
    private readonly btnSelectListView: Locator;
    private readonly optionAllProducts: Locator;
    private readonly btnNew: Locator;
    private readonly productSearchBox: Locator;
    private readonly btnListViewControls: Locator;
    private readonly btnRefresh: Locator;
    private readonly btnSelectListDisplay: Locator;
    private readonly btnColumnSort: Locator;
    private readonly getColumnOption: (name: string) => Locator;
    private readonly cboSelectColumn: Locator;
    private readonly radioAscending: Locator;
    private readonly radioDescending: Locator;
    private readonly btnApply: Locator;


    constructor(page: Page) {
        super(page);

        this.btnAppLauncher = page.getByRole('button', { name: 'App Launcher' });
        // this.searchBox = page.getByRole('combobox', { name: 'Search apps and items...' });
        this.searchBox = page.getByRole('combobox', { name: /search apps and items/i });
        this.optionITGBTPM = page.getByRole('option', { name: 'ITGB TPM' })
        this.productsTab = page.locator('.slds-context-bar').getByRole('link', { name: 'Products' });
        // this.productsHeading = page.getByRole('heading', { name: 'Products', exact: true });
        this.productsHeader = page.locator('h1.slds-var-p-right_x-small:has-text("Products")');
        this.btnSelectListView = page.getByRole('button', { name: /Select a List View/i });
        // this.optionAllProducts = page.getByRole('option', { name: 'All Products' });
        this.optionAllProducts = page.getByRole('option', { name: /All Products$/i });
        this.btnNew = page.getByRole('button', { name: 'New' });
        this.productSearchBox = page.getByRole('searchbox', { name: 'Search this list...' });
        this.btnListViewControls = page.getByRole('button', { name: 'List View Controls' });
        this.btnRefresh = page.getByRole('button', { name: 'Refresh' });

        // this.btnSelectListDisplay = page.getByRole('button', { name: 'Select List Display' });




        this.getColumnOption = (name: string) =>
            page.locator('.slds-listbox__option').filter({
                hasText: new RegExp(name, "i")
            });

        // this.btnColumnSort = page.getByRole('button', { name: 'Column sort' });
        this.btnColumnSort = page.getByRole("button", { name: /sort/i }).first();
        this.cboSelectColumn = page.getByRole('combobox', { name: /Select a column/i });//0,f


        this.radioAscending = page.locator('label:has-text("Ascending")');
        this.radioDescending = page.locator('label:has-text("Descending")');

        this.btnApply = page.getByRole('button', { name: 'Apply' });
        this.btnSelectListDisplay = page.locator('button').filter({
            has: page.locator('[data-key="table"]')
        });
    }

    async gotoRoot() {
        await this.page.goto('/');
        await this.page.waitForLoadState('domcontentloaded');
        await waitForLightningReady(this.page);
        await this.page.waitForTimeout(300);
    }

    async openITGBTPMApp() {
        await this.btnAppLauncher.click();
        await expect(this.searchBox).toBeEnabled();
        await this.searchBox.fill('ITGB TPM');
        await this.optionITGBTPM.click();
        await this.page.waitForURL('**/lightning/page/**', { timeout: 20000 });
        await this.page.waitForTimeout(200);
    }

    async openProductsTab() {
        await this.productsTab.click();
        await this.page.waitForURL('**/lightning/o/Product2**', { timeout: 20000 });
        await expect(this.productsHeader).toBeVisible();
    }

    async selectAllProducts() {
        await this.btnSelectListView.click();
        await this.optionAllProducts.click();
    }
    columnHeader(name: string) {
        return this.page.locator("span.slds-truncate").filter({
            hasText: new RegExp(`^${name}`, "i")
        });
    }


    async verifyColumnVisible(name: string) {
        await expect(this.columnHeader(name)).toBeVisible();
    }

    async verifyNewButtonVisible() {
        await expect(this.btnNew).toBeVisible();
    }


    async searchProduct(productName: string) {
        await this.productSearchBox.click();
        await this.productSearchBox.fill(productName);
        await this.productSearchBox.press('Enter');

        const searchedProduct = this.page
            .locator('th[scope="row"] a')
            .filter({ hasText: new RegExp(`^${productName}\\b`, "i") });

        // Lightning list view virtualization fix
        try {
            await searchedProduct.first().waitFor({ state: 'visible', timeout: 8000 });
            return true;
        } catch {
            return false;
        }
    }

    async openListViewControls() {
        await expect(this.btnListViewControls).toBeVisible();
        await this.btnListViewControls.click();
    }
    async refresh() {
        await expect(this.btnRefresh).toBeVisible();
        await this.btnRefresh.click();
    }
    async openSelectListDisplay() {
        await expect(this.btnSelectListDisplay).toBeVisible();
        await this.btnSelectListDisplay.click();
    }

    async sortByColumn(columnName: string, Order: 'asc' | 'desc') {
        await this.btnColumnSort.click();
        await this.cboSelectColumn.click();
        await this.getColumnOption(columnName).click();
        const radio = Order === 'asc' ? this.radioAscending : this.radioDescending;
        await radio.click();
        const isEnabled = await this.btnApply.isEnabled();
        if (!isEnabled) {
            console.log(
                `✔ Skipped sorting → "${columnName}" is already sorted (${Order}).`
            );
            return;
        }
        await this.btnApply.click();
        console.log(`✔ Sorted by ${columnName} (${Order})`);
    }

}