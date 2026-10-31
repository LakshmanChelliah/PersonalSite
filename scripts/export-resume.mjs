import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage();
  await page.goto(
    `${process.env.PORTFOLIO_BASE_URL || "http://127.0.0.1:3000"}/resume`,
    { waitUntil: "networkidle" },
  );
  await page.evaluate(() => document.fonts.ready);
  await mkdir("public", { recursive: true });
  await page.pdf({
    path: "public/Lakshman-Chelliah-Resume.pdf",
    format: "Letter",
    printBackground: true,
    preferCSSPageSize: true,
    tagged: true,
  });
  console.log(
    "Exported public/Lakshman-Chelliah-Resume.pdf from shared résumé content.",
  );
} finally {
  await browser.close();
}
