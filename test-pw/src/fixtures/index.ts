import { test as base, expect } from '@playwright/test';
import { SystemApi } from '../api/SystemApi';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

type Fixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  systemApi: SystemApi;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => use(new HomePage(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  systemApi: async ({ request }, use) => use(new SystemApi(request)),
});

export { expect };
