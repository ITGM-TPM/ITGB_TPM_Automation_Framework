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

/*
test('Login as Test Sales Planner', async ({ page }) => {
    const iTGBAdvancedPromotionPage = new ITGBAdvancedPromotionPage(page);
    await iTGBAdvancedPromotionPage.gotoRoot();
    await iTGBAdvancedPromotionPage.openITGBTPMApp();
    await iTGBAdvancedPromotionPage.loginTestSalesPlanner();
});
*/
test('Create New TPM Promotion', async ({ page }) => {
    const iTGBAdvancedPromotionPage = new ITGBAdvancedPromotionPage(page);
    await iTGBAdvancedPromotionPage.gotoRoot();
    await iTGBAdvancedPromotionPage.openITGBTPMApp();
    await iTGBAdvancedPromotionPage.loginTestSalesPlanner();
    const promotionName = getPromotionName();
    const startDate = getPromotionStartDate();
    await iTGBAdvancedPromotionPage.createNewTPMPromotion(promotionName, startDate);
    await page.pause();
});
