# Quickstart and Validation

## Prerequisites

- Node.js 24 or newer
- npm 11 or newer
- A Chromium-compatible environment for the browser suite

No private source files, environment variables, credentials, database, or external service are required.

## Setup

```powershell
npm ci
npx playwright install chromium
```

## Develop

```powershell
npm run dev
```

Open the local URL printed by Vite. Confirm the hero explicitly says this is a clean-room,
non-transactional reconstruction.

## Full verification

```powershell
npm run verify
```

Expected outcome: formatting, lint, type checking, unit/component tests, production build, browser and
accessibility tests, dependency audit, secret scan, and provenance/privacy scan all exit successfully.

## End-to-end reviewer scenario

1. Read the opening and timeline; identify the three phases and the bounded 2022 team role.
2. Search the catalog for `travel`, filter to one category, and clear the controls.
3. Open one product, add it to the cart, adjust quantity, and remove it.
4. Repeat the main flow using only Tab, Shift+Tab, Enter/Space, arrow keys where offered, and Escape.
5. Resize to 320 px and test at 200% zoom; no essential action or text becomes inaccessible.
6. Inspect the boundary notice; confirm there is no checkout, form submission, account, analytics, or
   network data request.

## Production preview

```powershell
npm run build
npm run preview
```

The generated `dist/` directory is the only deployable output. It must also pass the provenance scan.
