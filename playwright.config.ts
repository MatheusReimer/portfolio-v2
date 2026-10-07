import { defineConfig, devices } from '@playwright/test'

// Runs against the static export served the way GitHub Pages serves it.
// Build first: `npm run build && npm run test:e2e`.
export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:4173/portfolio-v2/',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: 'node scripts/serve-static.mjs',
    url: 'http://localhost:4173/portfolio-v2/',
    reuseExistingServer: !process.env.CI,
  },
})
