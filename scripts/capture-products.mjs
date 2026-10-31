import { chromium } from "@playwright/test";
import { mkdir, writeFile, copyFile, rm } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";

const media = path.resolve("public/media");
await mkdir(media, { recursive: true });
await mkdir("tmp/captures", { recursive: true });
const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--enable-unsafe-swiftshader"],
});
const jobs = [
  { id: "essta", url: "https://essta.ca", mobile: false },
  { id: "essta-mobile", url: "https://essta.ca", mobile: true },
  { id: "conqr", url: "https://conqr.net", mobile: false },
  {
    id: "beyweb-physics",
    url: "https://beyweb.net/pc.html?demo=1&coach=0",
    mobile: false,
  },
  {
    id: "beyweb-multiplayer",
    url: "https://beyweb.net/pc.html",
    mobile: false,
  },
  {
    id: "beyweb-progression",
    url: "https://beyweb.net/pc.html",
    mobile: false,
  },
];
const { default: sharp } = await import("sharp").catch(async () => ({
  default: (await import(process.env.PORTFOLIO_SHARP_PATH)).default,
}));
for (const job of jobs.filter(
  (j) => !process.env.CAPTURE_ONLY || j.id.startsWith(process.env.CAPTURE_ONLY),
)) {
  const context = await browser.newContext({
    viewport: job.mobile
      ? { width: 390, height: 844 }
      : { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    recordVideo: job.mobile
      ? undefined
      : { dir: "tmp/captures", size: { width: 1280, height: 720 } },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const startedAt = Date.now();
  await page.goto(job.url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(4000);
  if (job.id.startsWith("beyweb")) {
    await page
      .locator("#boot-overlay")
      .waitFor({ state: "hidden", timeout: 60000 });
    const tutorialSkip = page.getByRole("button", {
      name: "Skip for now",
      exact: true,
    });
    if (await tutorialSkip.isVisible()) await tutorialSkip.click();
    for (const soundOff of await page
      .getByRole("button", { name: "Sound off", exact: true })
      .all())
      if (await soundOff.isVisible())
        await soundOff.click({ timeout: 1500 }).catch(() => {});
    if (job.id === "beyweb-progression") {
      const workshop = page
        .getByRole("button", { name: /customize|workshop/i })
        .first();
      if (await workshop.isVisible().catch(() => false)) await workshop.click();
    }
    if (job.id === "beyweb-multiplayer") {
      const online = page.getByRole("button", { name: /online/i }).first();
      if (await online.isVisible().catch(() => false)) await online.click();
    }
    if (job.id === "beyweb-physics") {
      await page.getByTestId("bey-lock-in").click();
      await page
        .locator("#start-overlay:not(.hidden)")
        .waitFor({ timeout: 15000 });
      await page.locator("#btn-start").click();
      await page.waitForTimeout(4500);
      const skipCoach = page.getByRole("button", {
        name: "Skip tutorial",
        exact: true,
      });
      if (await skipCoach.isVisible()) await skipCoach.click();
      await page.keyboard.press("Space");
      await page.waitForTimeout(1000);
    }
    await page.waitForTimeout(2500);
    console.log(job.id, (await page.locator("body").innerText()).slice(-700));
  }
  if (job.id === "beyweb-physics") {
    const coach = page.getByRole("button", {
      name: "Skip tutorial",
      exact: true,
    });
    await coach
      .waitFor({ state: "visible", timeout: 7000 })
      .then(() => coach.click())
      .catch(() => {});
    await page.waitForTimeout(700);
  }
  const clipStart = (Date.now() - startedAt) / 1000;
  const shot = await page.screenshot({ fullPage: job.mobile });
  await sharp(shot)
    .webp({ quality: 85 })
    .toFile(path.join(media, `${job.id}.webp`));
  for (let step = 0; step < 5; step++) {
    if (job.id === "essta") await page.mouse.wheel(0, 300);
    await page.waitForTimeout(650);
  }
  if (job.id.startsWith("beyweb")) {
    await page.keyboard.down("a");
    await page.waitForTimeout(1000);
    await page.keyboard.up("a");
    await page.keyboard.press("q");
    await page.waitForTimeout(2000);
    await page.keyboard.press("e");
    await page.waitForTimeout(3000);
  }
  const video = page.video();
  await context.close();
  if (video) {
    const raw = await video.path();
    const encoder = path.join(
      process.env.LOCALAPPDATA,
      "ms-playwright",
      "ffmpeg-1013",
      "ffmpeg-win64.exe",
    );
    execFileSync(
      encoder,
      [
        "-y",
        "-ss",
        String(clipStart),
        "-i",
        raw,
        "-t",
        job.id === "essta" ? "3.5" : "7",
        "-c:v",
        "libvpx-vp9",
        "-b:v",
        "1100k",
        "-an",
        path.join(media, `${job.id}.webm`),
      ],
      { stdio: "ignore" },
    );
  }
  console.log("Captured", job.id);
}
await browser.close();
const repo = process.env.BEYWEB_RESEARCH_PATH;
if (repo) {
  const data = execFileSync(
    "git",
    ["-C", repo, "show", "HEAD:assets/models/storm_pegasus.glb"],
    { maxBuffer: 80 * 1024 * 1024 },
  );
  await writeFile(path.join(media, "storm-pegasus.glb"), data);
  console.log("Product model:", data.length, "bytes");
}
