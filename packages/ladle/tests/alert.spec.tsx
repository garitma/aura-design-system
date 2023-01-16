import { test, expect } from "@playwright/test";

test("a11 alert--danger-alert", async ({ page }) => {
  await page.goto("http://localhost:61000/?story=alert--danger-alert");
  await page.getByTestId("addon-a11y").click();

  // Expect a title "to contain" a substring.
  await expect(page.getByRole("dialog")).toHaveText(/There are no/);
});

test("a11 alert--info-alert", async ({ page }) => {
  await page.goto("http://localhost:61000/?story=alert--info-alert");
  await page.getByTestId("addon-a11y").click();

  // Expect a title "to contain" a substring.
  await expect(page.getByRole("dialog")).toHaveText(/There are no/);
});
