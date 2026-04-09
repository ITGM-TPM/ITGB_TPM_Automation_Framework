import { test } from '@playwright/test';
import { ITGBProductsPage } from '../../src/page-objects/ITGBProductsPage';
import chalk from 'chalk';

test.afterEach(async ({ }, testInfo) => {
    if (testInfo.status === 'passed') {
        console.log(chalk.green(`✔ Test success: ${testInfo.title}`));
    }
    else if (testInfo.status === 'failed') {
        console.log(chalk.red(`❌ Test failed: ${testInfo.title}`));
    }
});

test('Open ITGB TPM app and verify Product view', async ({ page }) => {
    const iTGBProductsPage = new ITGBProductsPage(page);
    await iTGBProductsPage.gotoRoot();
    await iTGBProductsPage.openITGBTPMApp();
    await iTGBProductsPage.openProductsTab();
});

test('Open Products tab and select All Products', async ({ page }) => {
    const iTGBProductsPage = new ITGBProductsPage(page);
    await iTGBProductsPage.gotoRoot();
    await iTGBProductsPage.openITGBTPMApp();
    await iTGBProductsPage.openProductsTab();
    await iTGBProductsPage.selectAllProducts();
});

test('Select All Products and verify columns and fields', async ({ page }) => {
    const iTGBProductsPage = new ITGBProductsPage(page);
    await iTGBProductsPage.gotoRoot();
    await iTGBProductsPage.openITGBTPMApp();
    await iTGBProductsPage.openProductsTab();
    await iTGBProductsPage.selectAllProducts();
    await iTGBProductsPage.verifyColumnVisible('Product Name');
    await iTGBProductsPage.verifyColumnVisible('UPC Code');
    await iTGBProductsPage.verifyColumnVisible('Product Family');
    await iTGBProductsPage.verifyColumnVisible('Description');
    await iTGBProductsPage.verifyNewButtonVisible();
});

test('Search for a product and verify results', async ({ page }) => {
    const iTGBProductsPage = new ITGBProductsPage(page);
    await iTGBProductsPage.gotoRoot();
    await iTGBProductsPage.openITGBTPMApp();
    await iTGBProductsPage.openProductsTab();
    await iTGBProductsPage.selectAllProducts();
    let status = await iTGBProductsPage.searchProduct('Winston Gold');
    if (status) {
        console.log('Product found in search results');
    } else {
        console.log('Product NOT found in search results');
    }
});

test('Open List View Controls and verify options', async ({ page }) => {
    const iTGBProductsPage = new ITGBProductsPage(page);
    await iTGBProductsPage.gotoRoot();
    await iTGBProductsPage.openITGBTPMApp();
    await iTGBProductsPage.openProductsTab();
    await iTGBProductsPage.openListViewControls();
});

test('Refresh the Products list and verify it reloads', async ({ page }) => {
    const iTGBProductsPage = new ITGBProductsPage(page);
    await iTGBProductsPage.gotoRoot();
    await iTGBProductsPage.openITGBTPMApp();
    await iTGBProductsPage.openProductsTab();
    await iTGBProductsPage.refresh();
});

test('Open Select List Display and verify options', async ({ page }) => {
    const iTGBProductsPage = new ITGBProductsPage(page);
    await iTGBProductsPage.gotoRoot();
    await iTGBProductsPage.openITGBTPMApp();
    await iTGBProductsPage.openProductsTab();
    await iTGBProductsPage.openSelectListDisplay();
});

test('Sort by Product Name descending', async ({ page }) => {
    const iTGBProductsPage = new ITGBProductsPage(page);
    await iTGBProductsPage.gotoRoot();
    await iTGBProductsPage.openITGBTPMApp();
    await iTGBProductsPage.openProductsTab();
    await iTGBProductsPage.selectAllProducts();
    await iTGBProductsPage.sortByColumn('Product Name', 'desc');
});


test('Sort by Description ascending', async ({ page }) => {
    const iTGBProductsPage = new ITGBProductsPage(page);
    await iTGBProductsPage.gotoRoot();
    await iTGBProductsPage.openITGBTPMApp();
    await iTGBProductsPage.openProductsTab();
    await iTGBProductsPage.selectAllProducts();
    await iTGBProductsPage.sortByColumn('Description', 'asc');
});