import { test, expect } from '../../../src/fixtures';

/**
 * Test Scenario:   Shopper opens the storefront home page
 * Test Objective:  Confirm the application front end is reachable and renders
 * Pre-requisite:   Application stack is running; BASE_URL configured
 * Input Data:      N/A
 * Test Steps:
 *   1. Navigate to the home page
 * Validation (Expected Results):
 *   - Page body is visible
 *   - Page title is not empty
 * TC Priority Level: Highest
 */
test('CBOP - Home - TC - 001 - Verify home page loads and renders', { tag: '@highest' }, async ({ homePage, page }) => {
  await homePage.goto();
  await expect(page.locator('body')).toBeVisible();
  expect(await homePage.title()).not.toBe('');
});
