import { test, expect } from '../../../src/fixtures';

/**
 * Test Scenario:   Platform health monitoring
 * Test Objective:  Confirm the backend is up and responds successfully
 * Pre-requisite:   Backend running; API_BASE_URL configured
 * Input Data:      N/A
 * Test Steps:
 *   1. Send GET /api/health
 * Validation (Expected Results):
 *   - Response status is 2xx
 * TC Priority Level: Highest
 */
test('CBOP - Health - TC - 001 - GET /api/health returns OK', { tag: '@highest' }, async ({ systemApi }) => {
  const res = await systemApi.health();
  expect(res.ok()).toBeTruthy();
});
