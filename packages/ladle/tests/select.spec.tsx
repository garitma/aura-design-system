import { test, expect } from "@playwright/test";

test("a11 select--naked", async ({ page }) => {
  await page.goto("http://localhost:61000/?story=select--naked");
  await page.getByTestId("addon-a11y").click();

  // Expect a title "to contain" a substring.
  await expect(page.getByRole("dialog")).toHaveText(/There are no/);
});

test("a11 select--with-dialog", async ({ page }) => {
  await page.goto("http://localhost:61000/?story=select--with-dialog");
  await page.getByTestId("addon-a11y").click();

  // Expect a title "to contain" a substring.
  await expect(page.getByRole("dialog")).toHaveText(/There are no/);
});

test("a11 select--with-placeholder", async ({ page }) => {
    await page.goto("http://localhost:61000/?story=select--with-placeholder");
    await page.getByTestId("addon-a11y").click();
  
    // Expect a title "to contain" a substring.
    await expect(page.getByRole("dialog")).toHaveText(/There are no/);
  });
