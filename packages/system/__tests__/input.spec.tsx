import { test, expect } from "@playwright/test";

test("a11 input--with-dialog", async ({ page }) => {
  await page.goto("http://localhost:61000/?story=input--with-dialog");
  await page.getByTestId("addon-a11y").click();

  // Expect a title "to contain" a substring.
  await expect(page.getByRole("dialog")).toHaveText(/There are no/);
});

test("a11 input--with-label", async ({ page }) => {
  await page.goto("http://localhost:61000/?story=input--with-label");
  await page.getByTestId("addon-a11y").click();

  // Expect a title "to contain" a substring.
  await expect(page.getByRole("dialog")).toHaveText(/There are no/);
});

test("a11 input--with-placeholder", async ({ page }) => {
  await page.goto("http://localhost:61000/?story=input--with-placeholder");
  await page.getByTestId("addon-a11y").click();

  // Expect a title "to contain" a substring.
  await expect(page.getByRole("dialog")).toHaveText(/There are no/);
});
