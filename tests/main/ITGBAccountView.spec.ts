// tests/accounts.spec.ts
import { test } from '@playwright/test';
import { ITGBAccountsPage } from '../../src/page-objects/ITGBAccountsPage';
import chalk from 'chalk';



test.afterEach(async ({ }, testInfo) => {
    if (testInfo.status === 'passed') {
        console.log(chalk.green(`✔ Test success: ${testInfo.title}`));
    }
    else if (testInfo.status === 'failed') {
        console.log(chalk.red(`❌ Test failed: ${testInfo.title}`));
    }
});


test('Open ITGB TPM app and verify Accounts view', async ({ page }) => {
    const iTGBAccountsPage = new ITGBAccountsPage(page);

    await iTGBAccountsPage.gotoRoot();
    await iTGBAccountsPage.openITGBTPMApp();
    await iTGBAccountsPage.openAccountsTab();
});

test('Open Accounts tab and select My Active Accounts', async ({ page }) => {
    const iTGBAccountsPage = new ITGBAccountsPage(page);

    await iTGBAccountsPage.gotoRoot();
    await iTGBAccountsPage.openITGBTPMApp();
    await iTGBAccountsPage.openAccountsTab();
    await iTGBAccountsPage.selectMyActiveAccounts();
});

test('Select All Accounts and verify columns and fields', async ({ page }) => {
    const iTGBAccountsPage = new ITGBAccountsPage(page);

    await iTGBAccountsPage.gotoRoot();
    await iTGBAccountsPage.openITGBTPMApp();
    await iTGBAccountsPage.openAccountsTab();
    await iTGBAccountsPage.selectAllAccounts();
    await iTGBAccountsPage.verifyColumnVisible("Account Name");
    await iTGBAccountsPage.verifyColumnVisible("CRS Number");
    await iTGBAccountsPage.verifyColumnVisible("Account Status");
    await iTGBAccountsPage.verifyColumnVisible("Billing City");
    await iTGBAccountsPage.verifyColumnVisible("Billing State/");
    await iTGBAccountsPage.verifyColumnVisible("Territory");
    await iTGBAccountsPage.verifyColumnVisible("Parent Account");
    await iTGBAccountsPage.verifyColumnVisible("Type");
    await iTGBAccountsPage.verifyColumnVisible("Tax Entity");
    await iTGBAccountsPage.verifyColumnVisible("Owner First Name");
    await iTGBAccountsPage.verifyNewButtonVisible();
    await iTGBAccountsPage.verifyImportButtonVisible();
});


test('Sort by Account Name ascending', async ({ page }) => {
    const iTGBAccountsPage = new ITGBAccountsPage(page);
    await iTGBAccountsPage.gotoRoot();
    await iTGBAccountsPage.openITGBTPMApp();
    await iTGBAccountsPage.openAccountsTab();
    await iTGBAccountsPage.selectAllAccounts();
    await iTGBAccountsPage.sortByColumn('Account Name', 'asc');
    // await page.pause();
});
test('Sort by Parent Account descending', async ({ page }) => {
    const iTGBAccountsPage = new ITGBAccountsPage(page);
    await iTGBAccountsPage.gotoRoot();
    await iTGBAccountsPage.openITGBTPMApp();
    await iTGBAccountsPage.openAccountsTab();
    await iTGBAccountsPage.selectAllAccounts();
    await iTGBAccountsPage.sortByColumn('Parent Account', 'desc');
    //await page.pause();
});


test('Sort byCRS Number descending', async ({ page }) => {
    const iTGBAccountsPage = new ITGBAccountsPage(page);
    await iTGBAccountsPage.gotoRoot();
    await iTGBAccountsPage.openITGBTPMApp();
    await iTGBAccountsPage.openAccountsTab();
    await iTGBAccountsPage.selectAllAccounts();
    await iTGBAccountsPage.sortByColumn('CRS Number', 'desc');
    // await page.pause();
});

test('Search Account', async ({ page }) => {
    const iTGBAccountsPage = new ITGBAccountsPage(page);
    await iTGBAccountsPage.gotoRoot();
    await iTGBAccountsPage.openITGBTPMApp();
    await iTGBAccountsPage.openAccountsTab();
    await iTGBAccountsPage.selectAllAccounts();
    let status = await iTGBAccountsPage.searchAccount('7-Eleven');
    if (status) {
        console.log('Account found in search results');
    } else {
        console.log('Account NOT found in search results');
    }
    // await page.pause();
});


test('Open List View Controls and verify options', async ({ page }) => {
    const iTGBAccountsPage = new ITGBAccountsPage(page);
    await iTGBAccountsPage.gotoRoot();
    await iTGBAccountsPage.openITGBTPMApp();
    await iTGBAccountsPage.openAccountsTab();
    await iTGBAccountsPage.openListViewControls();
});

test('Refresh the Products list and verify it reloads', async ({ page }) => {
    const iTGBAccountsPage = new ITGBAccountsPage(page);
    await iTGBAccountsPage.gotoRoot();
    await iTGBAccountsPage.openITGBTPMApp();
    await iTGBAccountsPage.openAccountsTab();
    await iTGBAccountsPage.refresh();
});

test('Open Select List Display and verify options', async ({ page }) => {
    const iTGBAccountsPage = new ITGBAccountsPage(page);
    await iTGBAccountsPage.gotoRoot();
    await iTGBAccountsPage.openITGBTPMApp();
    await iTGBAccountsPage.openAccountsTab();
    await iTGBAccountsPage.openSelectListDisplay();
});
