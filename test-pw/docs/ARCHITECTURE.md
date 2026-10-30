# Test automation architecture & ground rules

## Layers
```
tests/ (specs: intent + assertions)
  -> src/fixtures (wiring, per-test setup/teardown)
     -> src/pages (UI page objects)   src/api (API clients)
        -> src/config (env)
```
- Specs contain no raw locators or raw URLs; they use page objects / API clients.
- Page objects expose user actions and state, not assertions on unrelated pages.

## Layout
- `tests/ui/<function>/*.spec.ts`, `tests/api/<function>/*.spec.ts`
- One page object per page (`Login`, `Register`, `Home`, `Product`, `Cart`, `Checkout`, `Orders`, `OrderDetail`); one API client per resource (`auth`, `catalog`, `cart`, `orders`, `promo`, `demo`).

## Test case standard
Every test follows the `write-test-cases` skill: name `CBOP - <Function> - TC - NNN - <intent>`, 7-field header, and a priority tag (`@highest|@high|@medium|@low`).

## Ground rules
1. Independent & repeatable: no order dependency; each test creates its own data (unique user via API, or `/api/demo/reset` in serial setup only).
2. Fast setup via API, verify via UI: don't log in through the UI unless login is the subject.
3. Locators: `getByRole`, `getByLabel`, `getByTestId`; no brittle CSS/XPath; no fixed sleeps. Use web-first assertions.
4. API tests: assert status code, response body fields/types, and error payload; include auth (missing/invalid token) and negative cases.
5. Config & secrets via env (`.env`, git-ignored); never hard-code credentials or hosts.
6. One objective per test; assertions must match the Validation section of the header.
7. No `test.skip`/`.only` committed; flaky tests are fixed or quarantined with a tracked reason.
8. Clean up created data or isolate tests with unique data.

## Priority & CI gating
- `@highest`: smoke gate on every PR; all must pass.
- `@high`: run on PR/merge.
- `@medium`/`@low`: nightly/regression.
Run with `npm run test:highest`, `test:high`, `test:medium`, `test:low`.
