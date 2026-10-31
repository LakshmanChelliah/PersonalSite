import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { mkdir, writeFile } from "node:fs/promises";
await mkdir("tmp/audits", { recursive: true });
const chrome = await launch({ chromeFlags: ["--headless", "--no-sandbox"] });
try {
  for (const [name, route] of [
    ["home", "/"],
    ["resume", "/resume"],
  ]) {
    const result = await lighthouse(
      `${process.env.PORTFOLIO_BASE_URL || "http://127.0.0.1:3000"}${route}`,
      {
        port: chrome.port,
        output: ["json", "html"],
        onlyCategories: [
          "performance",
          "accessibility",
          "best-practices",
          "seo",
        ],
        logLevel: "error",
      },
    );
    await writeFile(`tmp/audits/${name}.json`, result.report[0]);
    await writeFile(`tmp/audits/${name}.html`, result.report[1]);
    console.log(
      name,
      JSON.stringify({
        scores: Object.fromEntries(
          Object.entries(result.lhr.categories).map(([k, v]) => [
            k,
            Math.round(v.score * 100),
          ]),
        ),
        LCP: result.lhr.audits["largest-contentful-paint"].numericValue,
        CLS: result.lhr.audits["cumulative-layout-shift"].numericValue,
      }),
    );
  }
} finally {
  await chrome.kill();
}
