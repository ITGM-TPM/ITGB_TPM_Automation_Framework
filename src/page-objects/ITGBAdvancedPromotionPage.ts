import { Page, Locator, expect, FrameLocator } from '@playwright/test';


export class ITGBAdvancedPromotionPage {
    // ---- Locators as class fields ----
    private readonly btnAppLauncher: Locator;
    private readonly searchAppBox: Locator;
    private readonly optionITGBTPM: Locator;
    private readonly tileITGBTPM: Locator;
    private readonly promotionTab: Locator;
    private readonly promotionHeading: Locator;

    private readonly optionAll: Locator;
    private readonly btnSelectListView: Locator;
    private readonly searchInput: Locator;
    private readonly columnPromotionName: Locator;
    private readonly columnName: Locator;
    private readonly columnPromotionTemplate: Locator;
    private readonly columnpromotionStartDate: Locator;
    private readonly columnPromotionEndDate: Locator;
    private readonly columnStatus: Locator;
    private readonly columnAnchorCustomer: Locator;
    private readonly columnSalesOrg: Locator;
    private readonly searchPromotionBox: Locator;
    private readonly searchUserButton: Locator;
    private readonly searchUserInput: Locator;
    private readonly optionTestSalesPlanner: Locator;
    private readonly buttonUserDetail: Locator;
    private readonly iframeUserDetails: FrameLocator;
    private readonly buttonLogIn: Locator;
    private readonly textUserLogIn: Locator;
    private readonly buttonNewTPMPromotion: Locator;
    private readonly textPromotionName: Locator;
    private readonly promotionStartDate: Locator;
    private readonly buttonSavePromotion: Locator;

    constructor(private readonly page: Page) {

        this.btnAppLauncher = page.getByRole('button', { name: 'App Launcher' });
        this.searchAppBox = page.getByRole('combobox', { name: 'Search apps and items...' });
        this.optionITGBTPM = page.getByRole('option', { name: 'ITGB TPM' });
        this.tileITGBTPM = page.getByTitle('ITGB TPM');
        this.promotionTab = page.getByRole('link', { name: 'Advanced Promotions' });
        this.promotionHeading = page.getByRole('heading', { name: 'Advanced Promotions', exact: true });

        this.btnSelectListView = page.getByRole('button', { name: 'Select a List View: Advanced' });
        this.optionAll = page.getByRole('option', { name: 'All' });
        this.searchInput = page.getByRole('combobox', { name: 'Search lists...' });
        this.columnPromotionName = page.getByRole('button', { name: 'Sort by: Promotion Name' });
        this.columnName = page.getByRole('button', { name: 'Sort by: Name' });
        this.columnPromotionTemplate = page.getByRole('button', { name: 'Sort by: Promotion Template' });
        this.columnpromotionStartDate = page.getByRole('button', { name: 'Sort by: Promotion Start Date' });
        this.columnPromotionEndDate = page.getByRole('button', { name: 'Sort by: Promotion End Date' });
        this.columnStatus = page.getByRole('button', { name: 'Sort by: Status' });
        this.columnAnchorCustomer = page.getByRole('button', { name: 'Sort by: Anchor Customer' });
        this.columnSalesOrg = page.getByRole('button', { name: 'Sort by: Sales Org' });
        this.searchPromotionBox = page.getByRole('searchbox', { name: 'Search this list...' });
        // this.searchUserBox = page.getByRole('searchbox', { name: 'Search...' });
        this.searchUserButton = page.getByRole('button', { name: 'Search' });
        this.searchUserInput = page.getByRole('searchbox', { name: 'Search...' });
        this.optionTestSalesPlanner = page.locator('span[title="Test Sales Planner"]');
        this.buttonUserDetail = page.getByRole('button', { name: 'User Detail' });
        this.iframeUserDetails = page.locator('iframe[name="vfFrameId_1774862196212"]').contentFrame();

        this.buttonLogIn = this.page.frameLocator('iframe[name^="vfFrameId_"]').getByRole('row', { name: 'User Detail Edit Sharing' }).locator('input[name="login"]');
        this.textUserLogIn = page.getByText('Logged in as Test Sales');
        this.buttonNewTPMPromotion = page.getByRole('button', { name: 'New TPM Promotion' });
        this.textPromotionName = page.getByRole('textbox').first();
        this.promotionStartDate = page.getByRole('textbox', { name: '*In-Store Date From (M/D/YYYY)' });
        this.buttonSavePromotion = page.getByRole('button', { name: 'Save', exact: true });

    }

    // ---- Actions ----
    async gotoRoot() {
        await this.page.goto('/');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(300);
        //  await waitForLightningReady(this.page);
    }

    async openITGBTPMApp() {
        await expect(this.btnAppLauncher).toBeEnabled();
        await expect(this.btnAppLauncher).toBeVisible();
        await this.btnAppLauncher.click();

        await expect(this.searchAppBox).toBeVisible();
        await this.searchAppBox.fill('ITGB TPM');
        await this.optionITGBTPM.click();
        await expect(this.tileITGBTPM).toBeVisible();
    }

    async openPromotionTab() {
        await expect(this.promotionTab).toBeVisible();
        await this.promotionTab.click();
        await expect(this.promotionHeading).toBeVisible();
    }

    async selectAll() {
        await expect(this.btnSelectListView).toBeVisible();
        await this.btnSelectListView.click();
        await expect(this.searchInput).toBeVisible();
        await this.searchInput.press('A');
        await this.optionAll.click();
    }
    async verifyColumnHeaders() {
        await expect(this.columnPromotionName).toBeVisible();
        await expect(this.columnName).toBeVisible();
        await expect(this.columnPromotionTemplate).toBeVisible();
        await expect(this.columnpromotionStartDate).toBeVisible();
        await expect(this.columnPromotionEndDate).toBeVisible();
        await expect(this.columnStatus).toBeVisible();
        await expect(this.columnAnchorCustomer).toBeVisible();
        await expect(this.columnSalesOrg).toBeVisible();
    }
    async searchPromotion(promotionName: string): Promise<boolean> {
        await expect(this.searchPromotionBox).toBeVisible();
        await this.searchPromotionBox.fill(promotionName);
        await this.searchPromotionBox.press('Enter');
        const searchedPromotion = this.page.getByRole('link', { name: promotionName });

        let isVisible = await searchedPromotion.isVisible().catch(() => false);
        return isVisible;
    }

    async loginTestSalesPlanner() {
        await expect(this.searchUserButton).toBeVisible();
        await this.searchUserButton.click();

        await this.searchUserInput.waitFor({ state: 'visible' });
        await this.searchUserInput.fill('Test Sales Planner');
        await this.searchUserInput.press('Enter');

        await this.buttonUserDetail.click();
        await this.buttonLogIn.click();
        await expect(this.textUserLogIn).toBeVisible();
    }



    async createNewTPMPromotion(promotionName: string, startDate: string) {
        await this.openPromotionTab();
        await this.buttonNewTPMPromotion.click();
        await expect(this.textPromotionName).toBeVisible();

        await this.textPromotionName.fill(promotionName);
        await this.promotionStartDate.click();
        await this.promotionStartDate.fill(startDate);

        // Additional steps to fill out the promotion details and save can be added here
        //await this.buttonSavePromotion.click();
    }

}



