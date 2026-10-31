import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
await mkdir("tmp/visuals", { recursive: true });
const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--enable-unsafe-swiftshader"],
});
const errors = [];
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 960 },
    reducedMotion: "reduce",
  });
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://127.0.0.1:3000");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "tmp/visuals/hero.png" });
  for (const section of [
    "experience",
    "essta",
    "conqr",
    "beyweb",
    "approach",
    "contact",
  ]) {
    await page.locator(`#${section}`).scrollIntoViewIfNeeded();
    await page
      .locator(`#${section}`)
      .screenshot({ path: `tmp/visuals/${section}.png` });
  }
  await page.goto("http://127.0.0.1:3000/projects/beyweb");
  await page.getByRole("button", { name: "Explore in 3D" }).click();
  await page
    .getByRole("status")
    .filter({ hasText: "Drag to orbit" })
    .waitFor({ timeout: 30000 });
  await page
    .locator(".model-container")
    .screenshot({ path: "tmp/visuals/model.png" });
  await page.getByRole("button", { name: "Close 3D viewer" }).click();
  for (const width of [360, 390, 768]) {
    await page.setViewportSize({ width, height: 850 });
    await page.goto("http://127.0.0.1:3000");
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `tmp/visuals/mobile-${width}.png` });
    if (
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      )
    )
      throw new Error(`Overflow at ${width}`);
  }
  if (errors.length) throw new Error(errors.join("\n"));
  console.log(
    "Visual captures complete; 3D loaded, closed, and no browser errors or responsive overflow detected.",
  );
} finally {
  await browser.close();
}
