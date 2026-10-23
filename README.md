# Playwright API + UI Automation

A minimal Playwright Test and TypeScript project scaffold for UI, API, and end-to-end QA automation. API tests can use Playwright's built-in `request` fixture.

## Structure

- `tests/ui/` — browser-based UI tests
- `tests/api/` — API tests
- `tests/e2e/` — cross-layer UI and API scenarios
- `src/pages/` — page objects, when useful
- `src/api/` — reusable API helpers, when useful
- `src/fixtures/` — shared Playwright fixtures, when useful
- `src/models/` — shared TypeScript data and response types
- `src/data/` — test data
- `.github/workflows/` — reserved for future CI workflows

## Getting started

Install dependencies and the Chromium browser:

```sh
npm install
npx playwright install chromium
```

The UI and API projects target `https://automationintesting.online` by default. `UI_BASE_URL` and `API_BASE_URL` can override those defaults independently. The project does not load `.env` files; `.env.example` documents the supported values, which should be set directly in your shell or CI environment.

For example, in PowerShell:

```powershell
$env:UI_BASE_URL = "https://automationintesting.online"
$env:API_BASE_URL = "https://automationintesting.online"
npm run test:ui
npm run test:api
```

Equivalent commands with the defaults already target the same application:

```sh
npm run test:ui
npm run test:api
```

Run all tests or a category:

```sh
npm test
npm run test:ui
npm run test:api
npm run test:e2e
npm run typecheck
```
