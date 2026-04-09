// src/utils/lightning-wait.ts
import { Page } from '@playwright/test';


export async function waitForLightningReady(page: Page) {

    // 1. Wait for Lightning "one.app" to load  
    await page.waitForURL(/lightning|one\.app/, { timeout: 30000 });

    // 2. Wait for the global Lightning shell container
    await page.waitForSelector('.slds-context-bar', { timeout: 30000 });

    // 3. Wait for the nav bar
    await page.waitForSelector('one-app-nav-bar', { timeout: 20000 });

    // 4. Wait for App Launcher button
    await page.waitForSelector('button[title="App Launcher"]', { timeout: 15000 });
}


export async function waitForModalToClose(page: Page, timeout = 15000) {

    // First detect if ANY modal or backdrop exists
    const modalExists = await page.evaluate(() => {
        return !!document.querySelector('.slds-modal, .slds-backdrop_open');
    });

    // If no modal exists, return immediately (✔ no timeout)
    if (!modalExists) return;

    // Otherwise, wait until modal disappears
    await page.waitForFunction(() => {
        const modals = document.querySelectorAll('.slds-modal.slds-fade-in-open, .slds-modal.transitioning');
        const backdrops = document.querySelectorAll('.slds-backdrop_open');
        return modals.length === 0 && backdrops.length === 0;
    }, { timeout });
}
/**
 * Waits for a modal to OPEN and be stable.
 * Useful when you expect a modal and want to interact inside it.
 */
/*
export async function waitForModalToOpen(page: Page, timeout = 15000) {
    await page.waitForSelector('.slds-modal.slds-fade-in-open', { timeout });
    await page.waitForFunction(() => {
        const el = document.querySelector('.slds-modal.slds-fade-in-open');
        return el && !el.classList.contains('transitioning');
    }, { timeout });
}
*/


export async function waitForNoOverlay(page: Page, timeout = 10000) {
    const overlaySelectors = [
        '.slds-modal',
        '.slds-modal__container',
        '.uiModal',
        '.loadingSpinner',
        '.slds-backdrop',
        '.modal-container',
        '.forceVisualMessageQueue',
        '.oneModal'
    ];

    for (const selector of overlaySelectors) {
        const locator = page.locator(selector);
        await locator.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => { });
    }
}
