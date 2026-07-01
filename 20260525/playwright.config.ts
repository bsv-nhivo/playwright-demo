import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  timeout: 30000,

  expect: {
    timeout: 5000,
  },

  reporter: [
    ['html'],
    ['list']
  ],

  use: {
    baseURL: 'https://www.saucedemo.com',

    headless: true,

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'Chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'Firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'Webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
});