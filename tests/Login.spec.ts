
import { test, expect } from "@playwright/test";

test("CGC home page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Salesforce/);
  await page.pause();
});
