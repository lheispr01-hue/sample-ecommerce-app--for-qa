# Oakline E2E tests (Playwright + TypeScript)

UI and API end-to-end tests. The app must already be running (no webServer configured).

## Setup
```bash
npm install
npx playwright install        # add --with-deps on Linux if browsers lack system libs
cp .env.example .env          # BASE_URL (UI), API_BASE_URL, demo credentials
```

## Run
```bash
npm test               # everything
npm run test:ui        # chromium + firefox
npm run test:api       # API only (no browser)
npm run report         # open HTML report
npm run seed:users     # register the test user (DEMO_USERNAME/DEMO_PASSWORD) via the API
VM_HOST=<ip> npm run cleanup:users   # delete users created by seed:users (SSH + docker exec psql)
npm run typecheck
```

## Layout
- `src/config/env.ts` – env settings
- `src/pages/` – page objects (`BasePage`, `HomePage`)
- `src/api/` – API client helpers (`ApiClient`, `SystemApi`)
- `src/fixtures/` – extended `test` exposing page objects and API clients
- `tests/ui/<function>`, `tests/api/<function>` – specs
- `docs/ARCHITECTURE.md` – ground rules and layering

## Writing test cases
All test cases must follow the skill `../.github/skills/write-test-cases/SKILL.md`: name `CBOP - <Function> - TC - NNN - <intent>`, 7-field header, priority tag. Run by priority: `npm run test:highest|test:high|test:medium|test:low`.

## Playwright MCP
Configured in `../.vscode/mcp.json` (`npx @playwright/mcp@latest`). Start it from VS Code's MCP servers list.
