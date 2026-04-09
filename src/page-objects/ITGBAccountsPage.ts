// pages/sales-accounts.page.ts
import { Page, Locator, expect } from '@playwright/test';
import { waitForNoOverlay, waitForLightningReady } from '../utils/lightning-wait';
import { BasePage } from './BasePage';



export class ITGBAccountsPage extends BasePage {
    // ---- Locators as class fields ----
    private readonly btnAppLauncher: Locator;
    private readonly optionITGBTPM: Locator;
    private readonly accountsTab: Locator;
    private readonly accountHeader: Locator;

    private readonly btnSelectListView: Locator;
    private readonly optionMyActiveAccounts: Locator;
    private readonly optionAllAccounts: Locator;
    private readonly searchBox: Locator;

    private readonly btnNew: Locator;
    private readonly btnImport: Locator;
    private readonly btnColumnSort: Locator;
    private readonly cboSelectColumn: Locator;
    private readonly getColumnOption: (name: string) => Locator;
    private readonly radioAscending: Locator;
    private readonly radioDescending: Locator;
    private readonly btnApply: Locator;
    private readonly accountSearchBox: Locator;
    private readonly btnListViewControls: Locator;
    private readonly btnRefresh: Locator;
    private readonly btnSelectListDisplay: Locator;

    constructor(page: Page) {
        super(page);

        this.btnAppLauncher = page.getByRole('button', { name: 'App Launcher' });
        // this.searchBox = page.getByRole('combobox', { name: 'Search apps and items...' });
        this.searchBox = page.getByRole('combobox', { name: /search apps and items/i });
        // this.optionITGBTPM = page.getByRole('option', { name: 'ITGB TPM' });
        this.optionITGBTPM = page.locator('[role="option"][data-label="ITGB TPM"]');
        // this.accountsTab = page.getByRole('link', { name: 'Accounts' });
        this.accountsTab = page.locator('.slds-context-bar').getByRole('link', { name: 'Accounts' });
        // this.accountHeader = page.getByRole('heading', { name: 'Accounts', exact: true });
        this.accountHeader = page.locator('h1.slds-var-p-right_x-small:has-text("Accounts")');
        this.btnSelectListView = page.getByRole('button', { name: /Select a List View/i });
        this.optionMyActiveAccounts = page.getByRole('option', { name: 'My Active Accounts' })
        this.optionAllAccounts = page.getByRole('option', { name: '13. All Accounts' });
        this.btnNew = (page.getByRole('button', { name: 'New' }));
        this.btnImport = page.getByRole('button', { name: 'Import' });

        //this.btnColumnSort = page.getByRole('button', { name: 'Column sort' });
        this.btnColumnSort = page.getByRole("button", { name: /sort/i }).first();
        this.cboSelectColumn = page.getByRole("combobox", { name: /Select a column/i });
        this.getColumnOption = (name: string) =>
            page.locator('.slds-listbox__option').filter({ hasText: name });

        this.btnApply = page.getByRole('button', { name: 'Apply' });
        this.radioAscending = page.locator('label:has-text("Ascending")');
        this.radioDescending = page.locator('label:has-text("Descending")');
        this.accountSearchBox = page.getByRole('searchbox', { name: 'Search this list...' });
        this.btnListViewControls = page.locator('button').filter({
            has: page.locator('[data-key="settings"]')
        });

        // this.btnRefresh = page.getByRole('button', { name: 'Refresh' });
        this.btnRefresh = page.locator('button[title="Refresh"]');

        this.btnSelectListDisplay = page.locator('button').filter({
            has: page.locator('[data-key="table"]')
        });




    }

    // ---- Actions ----
    async gotoRoot() {
        await this.page.goto('/');
        await this.page.waitForLoadState('domcontentloaded');
        await waitForLightningReady(this.page);
        await this.page.waitForTimeout(300);
    }

    async openITGBTPMApp() {
        await waitForNoOverlay(this.page);
        await this.btnAppLauncher.click();
        await expect(this.searchBox).toBeVisible();
        await this.searchBox.fill('ITGB TPM');
        await this.optionITGBTPM.click();
        await this.page.waitForURL('**/lightning/page/**', { timeout: 20000 });
        await this.page.waitForTimeout(200);
    }

    async openAccountsTab() {
        await this.accountsTab.click();
        await this.page.waitForURL('**/lightning/o/Account/list**', { timeout: 20000 });
        await expect(this.accountHeader).toBeVisible();
    }


    async selectMyActiveAccounts() {
        await this.btnSelectListView.click();
        await this.optionMyActiveAccounts.click();
    }
    async selectAllAccounts() {
        await this.btnSelectListView.click();
        await this.optionAllAccounts.click();
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

    async verifyImportButtonVisible() {
        await expect(this.btnImport).toBeVisible();
    }


    option(columnName: string) {
        return this.page.getByRole('option', { name: columnName });
    }

    async sortByColumn(columnName: string, order: 'asc' | 'desc') {
        await this.btnColumnSort.click();
        await this.cboSelectColumn.click();
        await this.getColumnOption(columnName).click();
        const radio = order === 'asc' ? this.radioAscending : this.radioDescending;
        await radio.click();
        const isEnabled = await this.btnApply.isEnabled();

        if (!isEnabled) {
            console.log(
                `✔ Skipped sorting → "${columnName}" is already sorted (${order}).`);
            return;
        }
        await this.btnApply.click();
        console.log(`✔ Sorted by ${columnName} (${order})`);
    }

    /* async searchAccounts(accountName: string) {
         await this.accountSearchBox.click();
         await this.accountSearchBox.fill(accountName);
         await this.accountSearchBox.press('Enter');
         await expect(this.page.getByRole('link', { name: accountName })).toBeVisible();
     }*/
    async searchAccount(accountName: string) {
        // Enter search term
        await this.accountSearchBox.click();
        await this.accountSearchBox.fill(accountName);
        await this.accountSearchBox.press('Enter');

        // Wait for Lightning list view results table to refresh
        await this.page.waitForSelector('table tbody tr');

        // Build a strong Salesforce-safe locator
        const searchedAccount = this.page
            .locator('th[scope="row"] a')
            .filter({ hasText: new RegExp(`^${accountName}\\b`, "i") });

        // Lightning virtualization-safe visibility check
        try {
            await searchedAccount.first().waitFor({ state: 'visible', timeout: 8000 });
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


}