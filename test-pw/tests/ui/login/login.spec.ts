import { test, expect } from '../../../src/fixtures';
import { env } from '../../../src/config/env';

/**
 * Test Scenario:   A registered shopper logs in to the storefront with valid credentials
 * Test Objective:  Confirm a valid user can authenticate and is taken out of the login page
 * Pre-requisite:   Application stack is running; demo account exists; DEMO_USERNAME and DEMO_PASSWORD set in the environment (.env)
 * Input Data:      username = DEMO_USERNAME, password = DEMO_PASSWORD (read from environment variables)
 * Test Steps:
 *   1. Navigate to the login page
 *   2. Enter the username and password from the environment
 *   3. Click the "Log in" button
 * Validation (Expected Results):
 *   - No login error message is displayed
 *   - User is redirected away from /login
 *   - Header shows the "Logout" action, indicating an authenticated session
 * TC Priority Level: Highest
 */
test('CBOP - Login - TC - 001 - Verify login succeeds with valid credentials', { tag: '@highest' }, async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.login(env.demoUser.username, env.demoUser.password);

  await expect(page).not.toHaveURL(/\/login$/);
  await expect(page.getByTestId('form-error')).toHaveCount(0);
  await expect(loginPage.logoutButton).toBeVisible();
});
