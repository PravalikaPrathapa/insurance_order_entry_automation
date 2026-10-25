import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests', timeout: 60_000, expect: { timeout: 10_000 },
  fullyParallel: false, retries: 1,
  reporter: [['html', { outputFolder: 'reports/html-report', open: 'never' }], ['list']],
  use: { baseURL: process.env.BASE_URL || 'http://127.0.0.1:8081', trace: 'retain-on-failure', screenshot: 'only-on-failure', video: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }]
});
