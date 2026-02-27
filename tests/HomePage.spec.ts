
import { expect, test } from '@playwright/test';
import { MoreItem } from '../src/page-objects/moreItemPage';

test('Select Products from More dropdown', async ({ page }) => {
    await page.goto("/");
    await page.pause();
    /* const more = new MoreItem(page);
 
     await more.selectProducts();
 
     // Once Products page loads, you can assert something
     await expect(page).toHaveURL(/Products/);*/
});
