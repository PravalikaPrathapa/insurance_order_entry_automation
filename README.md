# Insurance Order Entry - Playwright Automation (JavaScript)

Playwright UI and API tests for the agent-facing insurance order entry platform. Written in JavaScript (CommonJS) with a Page Object Model, shared fixtures, and smoke and regression suites.

> **Selectors:** locators prefer role, label and text. They were written from the project specification and have not been checked against the live UI. After the first run, adjust any locator the report flags (see "Triage").

## Setup

```bash
npm install
npx playwright install chromium
cp .env.example .env        # optional reference only; export the variables in your shell
```

Set the variables in your shell. Do not commit credentials.

```bash
export BASE_URL="http://127.0.0.1:8081"   # default if unset
export AGENT_USER="<agent-username>"
export AGENT_PASSWORD="<agent-password>"
export SEED_APPLICATION_ID="<existing-draft-id>"   # only needed for BEN-V02
```

The application must be running at `BASE_URL` before tests start.

## Commands

| Command | What it runs |
|---|---|
| `npm run test:smoke` | `@smoke` tests (quick gate: login, dashboard, new application) |
| `npm run test:regression` | `@regression` happy-path tests, including the full submission flow |
| `npm run test:negative` | `@negative` tests (invalid login, validation, authorization) |
| `npm run test:api` | API tests in `tests/api` |
| `npm test` | Everything |
| `npm run test:headed` | Runs in a visible browser |
| `npm run report` | Opens the HTML report in `reports/html-report` |

Run one file or test:

```bash
npx playwright test tests/workflow/submission.spec.js --headed
npx playwright test -g "WF-V03"
```

Preview which tests a suite would run, without running them:

```bash
npx playwright test --grep @smoke --grep-invert @negative --list
```

## Test tags

- `@smoke`: fast checks that the platform is up and the core entry point works.
- `@regression`: happy-path coverage of each module plus the end-to-end submission.
- `@negative`: validation and error cases. Kept for coverage and run separately, so smoke and regression stay happy-path only.

## Coverage

| Area | Tests (ID) | Tags |
|---|---|---|
| Auth | AUTH-V01 login, AUTH-V04 logout, AUTH-V05 protected route | smoke, regression |
| Dashboard | DASH-V01 loads and starts a new application | smoke, regression |
| Client info | CLI-V01 valid details, CLI-V06 same-as-residential | regression |
| Products | PROD-V01 catalog, PROD-V02 detail, PROD-V05 premium recalculates | regression |
| Riders | RIDER-V01 add accidental death rider | regression |
| Beneficiaries | BEN-V01 valid primary at 100% | regression |
| Documents | DOC-V01 valid KYC upload | regression |
| Workflow | WF-V01 save draft, WF-V02 resume draft, WF-V03 + WF-V06 submit and status | regression |
| API | API-V01 products returns 200 | api, regression |
| Negative | AUTH-V02, AUTH-V03, CLI-V05, BEN-V02, API-V02 | negative |

## Structure

```
fixtures/     auth.fixture.js (authedPage), users.js (env credentials), test data re-exports
objects/      testData.js (single source of test data), routes.js
pages/        Page objects, one per screen
utils/        journey.js (reusable happy-path steps), testHelpers.js, apiClient.js, ...
tests/        auth, dashboard, client-information, product-selection, riders,
              beneficiaries, documents, workflow, api
reports/      generated HTML report (not committed)
```

Tests that need an application mid-journey use `completeApplicationUpTo(page, step)` from `utils/journey.js`, so each test starts from a fresh application and stays independent.

## Artifacts

On failure the run keeps a trace, a screenshot and a video under `test-results/`. Open a trace with `npx playwright show-trace test-results/<folder>/trace.zip`.

## Triage

When a test fails, decide which kind of failure it is:

- **Application defect:** the behavior contradicts the specification. Record it in the defect log with the trace and screenshot.
- **Automation defect:** a locator or assumption is wrong (for example, a label text differs). Fix the page object.
- **Test data issue:** seed data is missing or stale (for example, the draft id in `SEED_APPLICATION_ID`).
- **Environment issue:** the app is not running, or the port is wrong.

## Known assumptions to verify on the live app

- A new application lands on `/applications/<id>/client`.
- Each step's Next or Continue button leads to the route in `utils/journey.js`.
- Dropdown labels in `objects/testData.js` (gender, marital status, ID type, frequency, beneficiary type) exist in the app.
- The first product's "Select" button and the premium total label ("Total premium") match the UI.
- The confirmation page shows a reference number containing letters and digits.
