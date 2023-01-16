import { test, expect } from "@playwright/test";

test("a11 button--button-disabled", async ({ page }) => {
  await page.goto("http://localhost:61000/?story=button--button-disabled");
  await page.getByTestId("addon-a11y").click();

  // Expect a title "to contain" a substring.
  await expect(page.getByRole("dialog")).toHaveText(/There are no/);
});

test("a11 button--button-fill", async ({ page }) => {
  await page.goto("http://localhost:61000/?story=button--button-fill");
  await page.getByTestId("addon-a11y").click();

  // Expect a title "to contain" a substring.
  await expect(page.getByRole("dialog")).toHaveText(/There are no/);
});

test("a11 button--button-fluid", async ({ page }) => {
  await page.goto("http://localhost:61000/?story=button--button-fluid");
  await page.getByTestId("addon-a11y").click();

  // Expect a title "to contain" a substring.
  await expect(page.getByRole("dialog")).toHaveText(/There are no/);
});

test("a11 button--button-link", async ({ page }) => {
  await page.goto("http://localhost:61000/?story=button--button-link");
  await page.getByTestId("addon-a11y").click();

  // Expect a title "to contain" a substring.
  await expect(page.getByRole("dialog")).toHaveText(/There are no/);
});

test("a11 button--button-pill", async ({ page }) => {
  await page.goto("http://localhost:61000/?story=button--button-pill");
  await page.getByTestId("addon-a11y").click();

  // Expect a title "to contain" a substring.
  await expect(page.getByRole("dialog")).toHaveText(/There are no/);
});

test("a11 button--button-waiting", async ({ page }) => {
    await page.goto("http://localhost:61000/?story=button--button-waiting");
    await page.getByTestId("addon-a11y").click();
  
    // Expect a title "to contain" a substring.
    await expect(page.getByRole("dialog")).toHaveText(/There are no/);
  });
