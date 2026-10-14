import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:3000',
    viewport: { width: 375, height: 812 },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    launchOptions: { executablePath: '/usr/bin/chromium' },
  },
  webServer: {
    command: './node_modules/.bin/bun run start',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: false,
    timeout: 30_000,
  },
})

