---
name: write-test-cases
description: 'Mandatory workflow for creating or modifying any UI or API automated test case (Playwright, test-pw/). Enforces the CBOP naming convention, the 7-field test case format, and the priority rubric. USE FOR: writing, adding, refactoring, or reviewing test cases/specs.'
---

# Write Test Cases

Follow every step whenever a test case is created or changed in `test-pw/tests/`. Read `test-pw/docs/ARCHITECTURE.md` for the layering rules.

## 1. Name the test

Format: `<Project> - <Function> - TC - <Running number> - <what the test does>`

- Project: `CBOP`
- Function: feature area, Title Case (`Login`, `Cart`, `Checkout`, `Orders`, `Catalog`, `Promo`, `Health`)
- Running number: 3 digits, unique per Function. Find the next one: grep `CBOP - <Function> - TC - ` in `test-pw/tests`, take max + 1 (`001` if none). Never reuse or renumber.
- The trailing description states the action and expected outcome, e.g. `Verify login fails with wrong password`.

Example: `CBOP - Login - TC - 002 - Verify login fails with wrong password`

For API tests, include the endpoint in the description, e.g. `POST /api/auth/login returns 401 for wrong password`.

## 2. Write the 7-field header

Put a block comment directly above each `test(...)`. Use `N/A` for optional fields not required.

```ts
/**
 * Test Scenario:   <business situation being tested>
 * Test Objective:  <what this proves>
 * Pre-requisite:   <state/data needed, or N/A>
 * Input Data:      <exact values, or N/A>
 * Test Steps:
 *   1. <action>
 *   2. <action>
 * Validation (Expected Results):
 *   - <observable, verifiable result>
 * TC Priority Level: Highest | High | Medium | Low
 */
test('CBOP - Login - TC - 002 - Verify login fails with wrong password', { tag: '@high' }, async (...) => { ... });
```

Rules: each step maps to code; each expected result maps to an assertion; one objective per test.

## 3. Assign priority (by criticality to core flow: browse -> cart -> checkout -> order)

| Level | Tag | Meaning | Impact if it fails |
|---|---|---|---|
| Highest | `@highest` | Critical path of the core business flow | System fundamentally broken |
| High | `@high` | Non-negotiable features, significant business impact, not necessarily blocking the flow | Significant operational friction or non-compliance |
| Medium | `@medium` | Secondary features, less common happy paths, permutations of Highest/High flows, operational handling, secondary error handling/validation messages, logging | User annoyance; workaround exists |
| Low | `@low` | Cosmetic, minor UI validation, report layout/format, rare edge cases | Low or no functional/financial risk |

App guidance: login, add to cart, checkout with approved card, order creation = Highest; auth enforcement/token rules, promo application, stock limits, cancel order, payment decline = High; sort/filter, form validation messages, order list details = Medium; layout, copy, icons, rare inputs = Low. The tag must match the header level.

## 4. Implement

- UI: page objects in `src/pages`, role/test-id locators, web-first assertions, no `waitForTimeout`.
- API: clients in `src/api`; assert status, body fields, and error format; cover auth and negative cases.
- Independent tests: create own data (unique user/API setup), never depend on order. No hard-coded secrets or URLs; use `src/config/env.ts`.
- Place in `tests/ui/<function>/` or `tests/api/<function>/`.

## 5. Verify checklist

- [ ] Name matches the format and number is unique
- [ ] All 7 fields present; tag matches priority
- [ ] Every expected result is asserted
- [ ] `npm run typecheck` passes and `npx playwright test --list` shows the test
