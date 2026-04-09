
import { test } from "@playwright/test";
import { ProductsNav } from "../src/page-objects/ProductsPage";

test("Go to Products page", async ({ page }) => {
    await page.goto("/");
    const nav = new ProductsNav(page);
    await nav.gotoProducts(page);
    await page.pause();
});

