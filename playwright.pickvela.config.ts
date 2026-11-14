import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  testMatch: 'pickvela-share.spec.ts',
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:8765',
    viewport: { width: 375, height: 812 },
    launchOptions: { executablePath: '/usr/bin/chromium' },
  },
  webServer: {
    command: 'python3 -m http.server 8765 --bind 127.0.0.1 --directory docs',
    url: 'http://127.0.0.1:8765/',
    reuseExistingServer: false,
    timeout: 30_000,
  },
})
