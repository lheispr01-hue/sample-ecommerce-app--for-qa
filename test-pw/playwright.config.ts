import { defineConfig, devices } from '@playwright/test';
import { env } from './src/config/env';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'api', testDir: './tests/api', use: { baseURL: env.apiBaseUrl } },
    { name: 'ui-chromium', testDir: './tests/ui', use: { ...devices['Desktop Chrome'], baseURL: env.baseUrl } },
    { name: 'ui-firefox', testDir: './tests/ui', use: { ...devices['Desktop Firefox'], baseURL: env.baseUrl } },
  ],
});
