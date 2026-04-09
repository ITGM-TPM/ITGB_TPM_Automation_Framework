import { test } from '@playwright/test';
import { ITGBAdvancedPromotionPage } from '../../src/page-objects/ITGBAdvancedpromotionPage';
import { getPromotionName, getPromotionStartDate } from '../../src/utils/dataUtils';
import chalk from 'chalk';
//import { waitForModalToClose } from '../src/utils/Lightning-wait';



test.afterEach(async ({ }, testInfo) => {
    if (testInfo.status === 'passed') {
        console.log(chalk.green(`✔ Test success: ${testInfo.title}`));
    }
    else if (testInfo.status === 'failed') {
        console.log(chalk.red(`❌ Test failed: ${testInfo.title}`));
    }
});

test('Open ITGB TPM app and verify Advanced Promotion view', async ({ page }) => {
    const iTGBAdvancedPromotionPage = new ITGBAdvancedPromotionPage(page);
    await iTGBAdvancedPromotionPage.gotoRoot();
    await iTGBAdvancedPromotionPage.openITGBTPMApp();
    await iTGBAdvancedPromotionPage.openPromotionTab();
});

test('Open Advanced Promotion tab and select All Promotions', async ({ page }) => {
    const iTGBAdvancedPromotionPage = new ITGBAdvancedPromotionPage(page);
    await iTGBAdvancedPromotionPage.gotoRoot();
    await iTGBAdvancedPromotionPage.openITGBTPMApp();
    await iTGBAdvancedPromotionPage.openPromotionTab();
    await iTGBAdvancedPromotionPage.selectAll();
});

test('Select All Promotions and verify columns and fields', async ({ page }) => {
    const iTGBAdvancedPromotionPage = new ITGBAdvancedPromotionPage(page);
    await iTGBAdvancedPromotionPage.gotoRoot();
    await iTGBAdvancedPromotionPage.openITGBTPMApp();
    await iTGBAdvancedPromotionPage.openPromotionTab();
    await iTGBAdvancedPromotionPage.selectAll();
    await iTGBAdvancedPromotionPage.verifyColumnHeaders();
});

test('Search for a promotion and verify results', async ({ page }) => {
    const iTGBAdvancedPromotionPage = new ITGBAdvancedPromotionPage(page);
    await iTGBAdvancedPromotionPage.gotoRoot();
    await iTGBAdvancedPromotionPage.openITGBTPMApp();
    await iTGBAdvancedPromotionPage.openPromotionTab();
    await iTGBAdvancedPromotionPage.selectAll();
    let status = await iTGBAdvancedPromotionPage.searchPromotion('P-00647578');
    if (status) {
        console.log('Promotion found in search results');
    } else {
        console.log('Promotion NOT found in search results');
    }
});
