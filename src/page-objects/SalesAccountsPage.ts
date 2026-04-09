// pages/sales-accounts.page.ts
import { Page, Locator, expect } from '@playwright/test';

export type SortOrder = 'asc' | 'desc';

export class SalesAccountsPage {
    // ---- Locators as class fields ----
    private readonly appLauncherButton: Locator;
    private readonly viewAllButton: Locator;
    private readonly salesTile: Locator;
    private readonly accountsTab: Locator;
    private readonly h1Heading: Locator;
    private readonly downArrow: Locator;

    private readonly btnSelectListView: Locator;
    private readonly optionMyActiveAccounts: Locator;
    private readonly optionAllAccounts: Locator;
    private readonly columnAccountName: Locator;
    private readonly columnCRSNumber: Locator;
    private readonly columnDirectCustomerNumber: Locator;
    private readonly columnMSACustomerNumber: Locator;
    private readonly columnPhone: Locator;
    private readonly columnAccountStatus: Locator;
    private readonly columnAccountRecordType: Locator;
    private readonly btnNew: Locator;
    private readonly btnImport: Locator;
    private readonly btnColumnSort: Locator;
    private readonly cboSelectColumn: Locator;
    private readonly sortByFieldContainer: Locator;
    private readonly radioAscending: Locator;
    private readonly radioDescending: Locator;
    private readonly radioFaux: Locator;
    private readonly radioInputsInSortGroup: Locator;
    private readonly btnApply: Locator;
    private readonly radios: Locator;
    private readonly accountSearchBox: Locator;
    private readonly btnListViewControls: Locator;
    private readonly btnRefresh: Locator;
    private readonly btnSelectListDisplay: Locator;




    constructor(private readonly page: Page) {

        this.appLauncherButton = page.getByRole('button', { name: 'App Launcher' });
        this.viewAllButton = page.getByRole('button', { name: 'View All' });
        this.salesTile = page.locator("//p[normalize-space()='Sales']");
        this.accountsTab = page.getByRole('link', { name: /^Accounts$/ });
        this.h1Heading = page.getByRole('heading', { level: 1 });
        this.downArrow = page.locator('svg[data-key="down"]');
        this.btnSelectListView = page.getByRole('button', {
            name: 'Select a List View: Accounts'
        });
        this.optionMyActiveAccounts = page.getByRole('option', {
            name: 'My Active Accounts'
        });
        this.optionAllAccounts = page.locator('span').filter({ hasText: 'All Accounts' }).first();
        this.columnAccountName = page.getByTitle('Account Name', { exact: true });
        this.columnCRSNumber = page.getByTitle('CRS Number', { exact: true });
        this.columnDirectCustomerNumber = page.getByTitle('Direct Customer Number', { exact: true });
        this.columnMSACustomerNumber = page.getByTitle('MSA Customer Number', { exact: true });
        this.columnPhone = page.getByTitle('Phone', { exact: true });
        this.columnAccountStatus = page.getByTitle('Account Status', { exact: true });
        this.columnAccountRecordType = page.getByTitle('Account Record Type', { exact: true });

        this.btnNew = page.getByText('New', { exact: true });
        this.btnImport = page.getByText('Import', { exact: true });


        this.btnColumnSort = page.getByRole('button', { name: 'Column sort' });
        this.cboSelectColumn = page.getByRole('combobox', { name: 'Select a column' });
        this.sortByFieldContainer = page.getByLabel('*Sort by');
        this.btnApply = page.getByRole('button', { name: 'Apply' });
        this.radioAscending = page.locator('.slds-radio_faux').first();
        this.radioDescending = page.locator('span:nth-child(3) > .slds-radio__label > .slds-radio_faux');
        this.radioFaux = page.locator('span:nth-child(3) > .slds-radio__label > .slds-radio_faux');
        this.radioInputsInSortGroup = this.sortByFieldContainer.locator('input[type="radio"]');
        this.radios = this.sortByFieldContainer.locator('input[type="radio"]');
        this.accountSearchBox = page.getByRole('searchbox', { name: 'Search this list...' });

        this.btnListViewControls = page.getByRole('button', { name: 'List View Controls' });
        this.btnRefresh = page.getByRole('button', { name: 'Refresh' });
        this.btnSelectListDisplay = page.getByRole('button', { name: 'Select list display' });


    }

    // ---- Actions ----
    async gotoRoot() {
        await this.page.goto('/');
        await this.page.waitForLoadState('networkidle');
    }

    async openSalesApp() {
        await this.appLauncherButton.click();
        await this.viewAllButton.click();
        await this.salesTile.click();
    }

    async openAccountsTab() {
        await this.accountsTab.click();
    }

    // ---- Assertions / waits ----
    async expectOnAccountsHome() {
        await expect(this.h1Heading).toBeVisible();
    }

    async selectMyActiveAccounts() {
        await this.btnSelectListView.click();
        await this.optionMyActiveAccounts.click();
    }
    async selectAllAccounts() {
        await this.btnSelectListView.click();
        await this.optionAllAccounts.click();
    }

    async verifyAccountNameColumnVisible() {
        await expect(this.columnAccountName).toBeVisible();
    }

    async verifyCRSNumberColumnVisible() {
        await expect(this.columnCRSNumber).toBeVisible();
    }

    async verifyDirectCustomerNumberColumnVisible() {
        await expect(this.columnDirectCustomerNumber).toBeVisible();
    }

    async verifyMSACustomerNumberColumnVisible() {
        await expect(this.columnMSACustomerNumber).toBeVisible();
    }

    async verifyPhoneColumnVisible() {
        await expect(this.columnPhone).toBeVisible();
    }

    async verifyAccountStatusColumnVisible() {
        await expect(this.columnAccountStatus).toBeVisible();
    }

    async verifyAccountRecordTypeColumnVisible() {
        await expect(this.columnAccountRecordType).toBeVisible();
    }

    async verifyNewButtonVisible() {
        await expect(this.btnNew).toBeVisible();
    }

    async verifyImportButtonVisible() {
        await expect(this.btnImport).toBeVisible();
    }



    async sortByColumn(columnTitle: string, order: 'asc' | 'desc') {

        // 1. Open sort dialog
        await this.btnColumnSort.click();
        await this.cboSelectColumn.click();

        // 2. Select the column
        await this.page.getByRole('option', { name: columnTitle }).click();

        // 3. Select Asc / Desc using your locators
        if (order === 'asc') {
            await this.radioAscending.click({ force: true });
        } else {
            await this.radioDescending.click({ force: true });
        }

        // 4. Check if "Apply" is enabled
        const isEnabled = await this.btnApply.isEnabled();

        if (!isEnabled) {
            console.log(
                `? Skipped sorting ? "${columnTitle}" is already sorted (${order}).`
            );
            return; // EXIT — nothing to do
        }

        // 5. Apply sorting
        await this.btnApply.click();

        console.log(`? Sorted by ${columnTitle} (${order})`);
    }

    async searchAccounts(accountName: string) {
        await this.accountSearchBox.click();
        await this.accountSearchBox.fill(accountName);
        await this.accountSearchBox.press('Enter');
        await expect(this.page.getByRole('link', { name: accountName })).toBeVisible();
    }

    async openListViewControls() {
        await expect(this.btnListViewControls).toBeVisible();
        await this.btnListViewControls.click();
    }

    async refresh() {
        await this.btnRefresh.click();
    }

    async openSelectListDisplay() {
        await expect(this.btnSelectListDisplay).toBeVisible();
        await this.btnSelectListDisplay.click();
    }


}