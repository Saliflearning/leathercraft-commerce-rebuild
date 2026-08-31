# Implementation Plan: Recruiter-Facing Commerce Learning Case Study

**Branch**: `001-recruiter-case-study` | **Date**: 2026-08-31 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-recruiter-case-study/spec.md`

## Summary

Build a clean-room, static portfolio application that combines an evidence-bounded longitudinal case
study with a working fictional leathercraft catalog and local demonstration cart. The implementation
uses a typed component architecture, deterministic sample data, browser-local persistence, original
vector illustrations, test-first development, and a release-blocking quality suite. It deliberately
excludes the legacy source, private evidence, backend, accounts, uploads, checkout, payments, and
analytics.

## Technical Context

**Language/Version**: TypeScript 6.0.3, ECMAScript modules, HTML5, modern CSS

**Primary Dependencies**: React 19.2.8, React DOM 19.2.8, Vite 8.2.2, official Vite React plugin 6.1.1

**Storage**: Read-only in-bundle product/evidence records; optional versioned browser local storage for
cart quantities only; no server persistence

**Testing**: Vitest 4.1.11, Testing Library, user-event, jsdom, Playwright 1.62.1, axe-core Playwright

**Target Platform**: Static hosting and current evergreen browsers; Node.js 24+ for development and CI

**Project Type**: Single-page static portfolio web application

**Performance Goals**: Production JavaScript under 250 KB gzip; primary content usable immediately after
load; filter and cart responses within one animation frame for the eight-item dataset

**Constraints**: No private inputs, runtime network calls, external fonts/images, cookies, accounts,
backend, checkout, payments, orders, uploads, or analytics; must work at 320 px width and 200% zoom

**Scale/Scope**: One case-study experience, three historical phases, eight fictional products, four
categories, local cart, five primary page sections, and one automated verification command

## Constitution Check

### Pre-research gate

- **Evidence — PASS**: Approved public claims and non-claims are enumerated in the specification. New
  application code and assets are explicitly labeled reconstruction work.
- **Clean room — PASS**: Only aggregate, approved facts are carried forward. No original source,
  assessment text, personal data, collaborator identity, business record, or historic asset is needed.
- **Security — PASS**: No personal/payment data or server attack surface exists. Local storage is treated
  as untrusted and parsed through a strict quantity/product allowlist.
- **Tests and access — PASS**: TDD tasks cover logic and interactions; Playwright/axe and manual keyboard,
  responsive, zoom, and reduced-motion checks are release gates.
- **Clarity — PASS**: A static reconstruction is the smallest architecture that demonstrates the current
  skills and historical lessons without pretending to be a production store.
- **Publication — PASS**: Lint, format, type, unit/component, build, accessibility, dependency, secret,
  and provenance checks are included.

### Post-design gate

PASS. The data model contains only fictional catalog data, public-safe evidence summaries, and local cart
quantities. The UI contract exposes no data-collection surface. All constitutional exclusions remain
enforced by design and verification tasks. No complexity exception is required.

## Project Structure

### Documentation (this feature)

```text
specs/001-recruiter-case-study/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui-contract.md
├── checklists/
│   └── requirements.md
└── tasks.md
```

### Source Code (repository root)

```text
.github/
└── workflows/
    └── quality.yml
docs/
├── architecture.md
├── evidence-and-claims.md
├── security.md
├── accessibility.md
└── decisions/
    ├── 0001-clean-room-reconstruction.md
    └── 0002-static-no-checkout.md
scripts/
└── verify-provenance.mjs
src/
├── app/
│   ├── App.tsx
│   └── App.test.tsx
├── components/
├── data/
├── hooks/
├── lib/
├── styles/
├── test/
├── types/
└── main.tsx
tests/
└── e2e/
    └── portfolio.spec.ts
index.html
package.json
playwright.config.ts
tsconfig.json
vite.config.ts
vitest.config.ts
```

**Structure Decision**: Use a single Vite application at the repository root. Pure catalog/cart logic
lives in `src/lib`, public-safe records in `src/data`, typed UI in `src/components`, and browser journeys
in `tests/e2e`. This keeps the architecture inspectable and independently testable without creating a
fictional backend boundary.

## Complexity Tracking

No constitution violations or complexity exceptions.
