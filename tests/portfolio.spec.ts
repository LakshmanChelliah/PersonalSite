import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("identity and every employment term are visible without an intro", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "LakshmanChelliah.",
  );
  await expect(
    page.getByText("Software Engineering Developer", { exact: true }).first(),
  ).toBeVisible();
  await expect(page.locator(".timeline-row")).toHaveCount(7);
  await page.getByRole("link", { name: /View résumé/ }).click();
  await expect(page).toHaveURL(/\/resume/);
  await expect(page.locator(".resume-job")).toHaveCount(7);
  await expect(
    page.getByText("Carleton University", { exact: true }),
  ).toBeVisible();
});
test("all case studies have meaningful direct routes", async ({ page }) => {
  for (const slug of [
    "essta",
    "conqr",
    "beyweb",
    "gdravolleyball",
    "qnx",
    "filetriage",
  ]) {
    const response = await page.goto(`/projects/${slug}`);
    expect(response?.status()).toBe(200);
    await expect(
      page.getByRole("heading", { name: "How the pieces fit." }),
    ).toBeVisible();
  }
  expect((await page.goto("/projects/missing"))?.status()).toBe(404);
});
test("Conqr sequences, membership never submits, sample recycle is reversible", async ({
  page,
}) => {
  await page.goto("/projects/conqr");
  for (let i = 0; i < 3; i++)
    await page.getByRole("button", { name: "Next step" }).click();
  await expect(
    page.getByRole("button", { name: "Replay sequence" }),
  ).toBeVisible();
  await expect(page.getByText("Synced", { exact: true })).toHaveCount(3);
  await page.goto("/projects/essta");
  await page.getByRole("tab", { name: "Membership", exact: true }).click();
  await page.getByRole("button", { name: "Preview confirmation" }).click();
  await expect(page.getByRole("status")).toContainText(
    "No application was sent",
  );
  await page.goto("/projects/filetriage");
  await page.getByRole("button", { name: "Recycle", exact: true }).click();
  await expect(page.getByText("coastal-study.webp")).toBeVisible();
  await page.getByRole("button", { name: "Undo", exact: true }).click();
  await expect(
    page.getByText("morning-light.webp", { exact: true }),
  ).toBeVisible();
});
test("QNX watchdog and emergency stop", async ({ page }) => {
  await page.goto("/projects/qnx");
  await page.getByRole("button", { name: "Send drive" }).click();
  await expect(page.locator(".status-text")).toHaveText("TIMEOUT");
  await page.getByRole("button", { name: "Emergency stop" }).click();
  await expect(page.locator(".status-text")).toHaveText("E-STOP");
  await expect(page.getByRole("button", { name: "Send drive" })).toBeDisabled();
  await page.getByRole("button", { name: "Reset QNX simulation" }).click();
  await expect(page.locator(".status-text")).toHaveText("READY");
});
test("BeyWeb tabs change architecture and 3D is on demand", async ({
  page,
}) => {
  await page.goto("/projects/beyweb");
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.getByRole("tab", { name: "Multiplayer", exact: true }).click();
  await expect(
    page.getByText("Responsive, synchronized play", { exact: true }),
  ).toBeVisible();
  await page.getByRole("tab", { name: "Progression", exact: true }).click();
  await expect(
    page.getByText("A game that keeps growing", { exact: true }),
  ).toBeVisible();
});
test("volleyball sample scores stay on the preview", async ({ page }) => {
  await page.goto("/projects/gdravolleyball");
  await page.getByLabel("Your team").selectOption("Block Party");
  await expect(page.getByText("7:00", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Record sample scores" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Nothing was saved to the league",
  );
  await expect(page.locator("tr", { hasText: "Block Party" })).toContainText(
    "+5",
  );
  await page.getByRole("button", { name: "Clear sample scores" }).click();
  await expect(page.getByRole("status")).toContainText("No games yet");
});
test("mobile has no overflow and navigation works", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("dialog").getByRole("link", { name: "Résumé" }).click();
  await expect(page).toHaveURL(/resume/);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.screenshot({ path: "tmp/mobile.png", fullPage: true });
});
test("reduced motion and no JS preserve résumé content", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.goto("/resume");
  await expect(page.locator(".resume-job")).toHaveCount(7);
  await context.close();
});
test("accessibility on home, résumé and case study", async ({ page }) => {
  for (const route of ["/", "/resume", "/projects/conqr", "/projects/gdravolleyball"]) {
    await page.goto(route);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      result.violations,
      JSON.stringify(
        result.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
      ),
    ).toEqual([]);
  }
});
test("desktop screenshot and assets resolve", async ({ page }) => {
  await page.goto("/");
  await page.screenshot({ path: "tmp/desktop.png", fullPage: true });
  for (const asset of [
    "/media/essta.webp",
    "/media/beyweb-physics.webp",
    "/media/storm-pegasus.glb",
    "/fonts/inter.woff2",
    "/Lakshman-Chelliah-Resume.pdf",
  ])
    expect((await page.request.get(asset)).status(), asset).toBe(200);
});
