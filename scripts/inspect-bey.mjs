import { chromium } from "@playwright/test";
const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--enable-unsafe-swiftshader"],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("pageerror", (e) => console.log("ERROR", e.message));
page.on("requestfailed", (r) =>
  console.log("FAILED", r.url(), r.failure()?.errorText),
);
await page.goto("https://beyweb.net/pc.html?demo=1&coach=0", {
  waitUntil: "domcontentloaded",
});
await page.waitForTimeout(12000);
console.log((await page.locator("body").innerText()).slice(0, 9000));
console.log(await page.getByRole("button").allTextContents());
await page.screenshot({ path: "tmp/bey-inspect.png" });
await browser.close();
