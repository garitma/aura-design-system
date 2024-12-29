import { test, expect } from "@playwright/test";

test("a11 accordion--with-color", async ({ page }) => {
  await page.goto("http://localhost:61000/?story=accordion--with-color");
  await page.getByTestId("addon-a11y").click();

  // Expect a title "to contain" a substring.
  await expect(page.getByRole("dialog")).toHaveText(/There are no/);
});

test("a11 accordion--with-content", async ({ page }) => {
  await page.goto("http://localhost:61000/?story=accordion--with-content");
  await page.getByTestId("addon-a11y").click();

  // Expect a title "to contain" a substring.
  await expect(page.getByRole("dialog")).toHaveText(/There are no/);
});

test("a11 accordion--with-header-size", async ({ page }) => {
  await page.goto("http://localhost:61000/?story=accordion--with-header-size");
  await page.getByTestId("addon-a11y").click();

  // Expect a title "to contain" a substring.
  await expect(page.getByRole("dialog")).toHaveText(/There are no/);
});
