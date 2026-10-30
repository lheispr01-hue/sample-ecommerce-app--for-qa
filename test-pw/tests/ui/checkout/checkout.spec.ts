import { test, expect } from '../../../src/fixtures';
import { env } from '../../../src/config/env';
import { captureStep } from '../../../src/utils/screenshot';

/**
 * Test Scenario:   A registered shopper buys a toy train from the Toys and Games category and pays by credit card
 * Test Objective:  Confirm the end-to-end purchase flow (login -> browse -> search -> cart -> checkout -> order) succeeds with an approved card
 * Pre-requisite:   Application stack is running; demo account exists; catalog contains a "train" product in Toys and Games; DEMO_USERNAME and DEMO_PASSWORD set in the environment (.env)
 * Input Data:      username = DEMO_USERNAME, password = DEMO_PASSWORD; category = "Toys and Games"; search term = "train";
 *                  card name = "Demo User", number = 4242424242424242 (dummy-gateway approved card), expiry = 12/30, CVV = 123
 * Test Steps:
 *   1. Log in to the application with valid credentials
 *   2. From the homepage, select the category "Toys and Games"
 *   3. Search for "train"
 *   4. Open the 1st product in the list and add it to the cart
 *   5. Open the cart, proceed to checkout, enter the credit card details and pay
 *   (a screenshot is captured after every step)
 * Validation (Expected Results):
 *   - Step 1: user is redirected away from /login and the "Logout" action is shown
 *   - Step 2: URL is filtered to category toys-games and products are listed
 *   - Step 3: URL contains q=train and at least one product is listed
 *   - Step 4: "Added to cart" is shown
 *   - Step 5: cart contains the selected product; user lands on the order confirmation page showing an order number, the purchased product, and "Card ending 4242"
 * TC Priority Level: Highest
 */
test(
  'CBOP - Checkout - TC - 001 - Verify shopper can buy the first "train" toy from Toys and Games with an approved credit card',
  { tag: '@highest' },
  async ({ page, loginPage, homePage, productPage, cartPage, checkoutPage, orderDetailPage }, testInfo) => {
    await test.step('1. Login', async () => {
      await loginPage.goto();
      await loginPage.login(env.demoUser.username, env.demoUser.password);
      await expect(page).not.toHaveURL(/\/login$/);
      await expect(loginPage.logoutButton).toBeVisible();
      await captureStep(page, testInfo, '01-login');
    });

    await test.step('2. Select category Toys and Games', async () => {
      await homePage.selectCategory('Toys and Games');
      await expect(page).toHaveURL(/category=toys-games/);
      await expect(homePage.productCards.first()).toBeVisible();
      await captureStep(page, testInfo, '02-category-toys-and-games');
    });

    await test.step('3. Search for train', async () => {
      await homePage.search('train');
      await expect(page).toHaveURL(/q=train/);
      await expect(page).toHaveURL(/category=toys-games/);
      await expect(homePage.productCards.first()).toBeVisible();
      await captureStep(page, testInfo, '03-search-train');
    });

    let productName = '';
    await test.step('4. Add 1st product to cart', async () => {
      productName = await homePage.openFirstProduct();
      await expect(productPage.name).toHaveText(productName);
      await productPage.addToCart();
      await expect(productPage.addedMessage).toBeVisible();
      await captureStep(page, testInfo, '04-add-to-cart');
    });

    await test.step('5. Checkout and pay by credit card', async () => {
      await productPage.openCart();
      await expect(cartPage.lineFor(productName)).toBeVisible();
      await cartPage.checkout();
      await expect(page).toHaveURL(/\/checkout$/);

      await checkoutPage.fillCard({ name: 'Demo User', number: '4242424242424242', expiry: '12/30', cvv: '123' });
      await captureStep(page, testInfo, '05a-checkout-payment-details');
      await checkoutPage.pay();

      await expect(page).toHaveURL(/\/orders\/\d+$/);
      await expect(orderDetailPage.orderNumber).toBeVisible();
      await expect(orderDetailPage.orderStatus).toBeVisible();
      await expect(orderDetailPage.orderLines.filter({ hasText: productName })).toBeVisible();
      await expect(orderDetailPage.cardLast4).toContainText('4242');
      await captureStep(page, testInfo, '05b-order-confirmation');
    });
  },
);
