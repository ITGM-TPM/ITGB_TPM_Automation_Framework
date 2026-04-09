// src/pages/base.page.ts
import { Page } from '@playwright/test';
import { waitForLightningReady } from '../utils/lightning-wait';

export class BasePage {
    protected readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async waitForLightning() {
        await waitForLightningReady(this.page);
    }
}