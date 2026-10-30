import { test as base, expect } from '@playwright/test';
import { SystemApi } from '../api/SystemApi';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { OrderDetailPage } from '../pages/OrderDetailPage';
import { ProductPage } from '../pages/ProductPage';

type Fixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  productPage: ProductPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  orderDetailPage: OrderDetailPage;
  systemApi: SystemApi;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => use(new HomePage(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  productPage: async ({ page }, use) => use(new ProductPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
  orderDetailPage: async ({ page }, use) => use(new OrderDetailPage(page)),
  systemApi: async ({ request }, use) => use(new SystemApi(request)),
});

export { expect };
