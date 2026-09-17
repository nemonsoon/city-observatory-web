import { expect, test } from "@playwright/test";

const screens = [
  { name: "home", path: "/", heading: "東京" },
  { name: "compare", path: "/compare", heading: "左の観測地点" },
];

for (const screen of screens) {
  test(`${screen.name} を表示して記録する`, async ({ page }, testInfo) => {
    await page.goto(screen.path);
    await expect(page.getByText(screen.heading).first()).toBeVisible();

    // 地図のタイルとグラフの描画が落ち着くのを待つ
    await page.waitForLoadState("networkidle");

    const file = testInfo.outputPath(
      `${screen.name}-${testInfo.project.name}.png`,
    );
    await page.screenshot({ path: file, fullPage: true });
    await testInfo.attach(`${screen.name}-${testInfo.project.name}`, {
      path: file,
      contentType: "image/png",
    });
  });
}

test("配色を切り替えても観測値が読める", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "暗い配色" }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);

  await page.getByRole("button", { name: "明るい配色" }).click();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
});
