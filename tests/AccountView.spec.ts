// tests/accounts.spec.ts
import { test } from '@playwright/test';
import { SalesAccountsPage } from '../src/page-objects/SalesAccountsPage';
/*
test('Open Accounts tab and verify Accounts view', async ({ page }) => {
    const salesAccounts = new SalesAccountsPage(page);

    await salesAccounts.gotoRoot();
    await salesAccounts.openSalesApp();
    await salesAccounts.openAccountsTab();
    await salesAccounts.expectOnAccountsHome();
});

test('Open Accounts tab and select My Active Accounts', async ({ page }) => {
    const salesAccounts = new SalesAccountsPage(page);

    await salesAccounts.gotoRoot();
    await salesAccounts.openSalesApp();
    await salesAccounts.openAccountsTab();
    await salesAccounts.selectMyActiveAccounts();
});

test('Select All Accounts and verify columns and fields', async ({ page }) => {
    const salesAccounts = new SalesAccountsPage(page);

    await salesAccounts.gotoRoot();
    await salesAccounts.openSalesApp();
    await salesAccounts.openAccountsTab();
    await salesAccounts.selectAllAccounts();
    await salesAccounts.verifyAccountNameColumnVisible();
    await salesAccounts.verifyCRSNumberColumnVisible();
    await salesAccounts.verifyDirectCustomerNumberColumnVisible();
    await salesAccounts.verifyMSACustomerNumberColumnVisible();
    await salesAccounts.verifyPhoneColumnVisible();
    await salesAccounts.verifyAccountStatusColumnVisible();
    await salesAccounts.verifyAccountRecordTypeColumnVisible();
    await salesAccounts.verifyNewButtonVisible();
    await salesAccounts.verifyImportButtonVisible();
});


test('Sort Account Name (toggle current)', async ({ page }) => {
    const salesAccounts = new SalesAccountsPage(page);
    await salesAccounts.gotoRoot();
    await salesAccounts.openSalesApp();
    await salesAccounts.openAccountsTab();
    await salesAccounts.selectAllAccounts();
    await salesAccounts.verifyAccountNameColumnVisible();
    await salesAccounts.sortByColumn('Account Name', 'asc');
    // await page.pause();
});
test('Sort Parent Account descending', async ({ page }) => {
    const salesAccounts = new SalesAccountsPage(page);
    await salesAccounts.gotoRoot();
    await salesAccounts.openSalesApp();
    await salesAccounts.openAccountsTab();
    await salesAccounts.selectAllAccounts();
    await salesAccounts.verifyAccountNameColumnVisible();
    await salesAccounts.sortByColumn('Parent Account', 'desc');
    //await page.pause();
});

test('Sort CRS Number descending', async ({ page }) => {
    const salesAccounts = new SalesAccountsPage(page);
    await salesAccounts.gotoRoot();
    await salesAccounts.openSalesApp();
    await salesAccounts.openAccountsTab();
    await salesAccounts.selectAllAccounts();
    await salesAccounts.verifyPhoneColumnVisible();
    await salesAccounts.sortByColumn('CRS Number', 'desc');
    // await page.pause();
});
*/
test('Search Accounts', async ({ page }) => {
    const salesAccounts = new SalesAccountsPage(page);
    await salesAccounts.gotoRoot();
    await salesAccounts.openSalesApp();
    await salesAccounts.openAccountsTab();
    await salesAccounts.selectAllAccounts();
    await salesAccounts.verifyAccountNameColumnVisible();
    await salesAccounts.searchAccounts('7-Eleven');
    // await page.pause();
});


test('list view control, select list display and refresh', async ({ page }) => {
    const salesAccounts = new SalesAccountsPage(page);
    await salesAccounts.gotoRoot();
    await salesAccounts.openSalesApp();
    await salesAccounts.openAccountsTab();
    await salesAccounts.selectAllAccounts();

    await salesAccounts.openListViewControls();
    await salesAccounts.openSelectListDisplay();
    await salesAccounts.refresh();
});
