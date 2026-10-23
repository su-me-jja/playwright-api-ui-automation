import { defineConfig, devices } from '@playwright/test';

const demoBaseURL = 'https://automationintesting.online';
const uiBaseURL = process.env.UI_BASE_URL ?? demoBaseURL;
const apiBaseURL = process.env.API_BASE_URL ?? demoBaseURL;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'ui',
      testDir: './tests/ui',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: uiBaseURL,
      },
    },
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: apiBaseURL,
      },
    },
    {
      name: 'e2e',
      testDir: './tests/e2e',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: uiBaseURL,
      },
    },
  ],
});
