import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: process.env.PORTFOLIO_BASE_URL || "http://127.0.0.1:3000",
    channel: "chrome",
    ...devices["Desktop Chrome"],
  },
  webServer: process.env.PORTFOLIO_EXTERNAL_SERVER
    ? undefined
    : {
        command: "npm run start",
        url: "http://127.0.0.1:3000",
        reuseExistingServer: true,
        timeout: 120000,
      },
});
