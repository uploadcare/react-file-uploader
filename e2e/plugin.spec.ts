import { expect, test } from "@playwright/test";

const IMAGE_URL =
  "https://images.unsplash.com/photo-1699102241946-45c5e1937d69?w=640";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("runs on the React it installs", async ({ page }, testInfo) => {
  const major = testInfo.project.metadata.reactMajor;
  await expect(page.getByTestId("react-version")).toHaveText(
    new RegExp(`^${major}\\.`),
  );
});

test("opens the editor from Generate image, with presets from props", async ({
  page,
}) => {
  await page.getByText("Upload files", { exact: true }).click();
  await page.getByText("Generate image").first().click();

  await expect(
    page.getByRole("region", { name: "Generate image", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Logo" })).toBeVisible();
});

test("uploads a file and opens it in the editor from AI Edit", async ({
  page,
}) => {
  await page.waitForFunction(() => window.api?.());
  await page.evaluate((url) => window.api()?.addFileFromUrl(url), IMAGE_URL);
  await expect
    .poll(() => page.evaluate(() => window.uploadedUuids))
    .toEqual([expect.any(String)]);

  await page.evaluate(() => window.api()?.initFlow());
  await page
    .getByRole("button", { name: /AI Edit/i })
    .first()
    .click();
  await expect(
    page.getByRole("region", { name: "Edit image", exact: true }),
  ).toBeVisible();
});
