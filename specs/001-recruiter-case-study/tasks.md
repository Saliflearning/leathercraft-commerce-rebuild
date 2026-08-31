# Tasks: Recruiter-Facing Commerce Learning Case Study

**Input**: Design documents from `specs/001-recruiter-case-study/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/ui-contract.md`

**Tests**: Required by the constitution. Behavior work follows red-green-refactor, and publication is
blocked by accessibility, security, dependency, secret, and provenance gates.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run independently in a different file after its phase prerequisites are satisfied
- **[Story]**: Maps to a prioritized user story in `spec.md`

## Phase 1: Setup

**Purpose**: Establish reproducible tooling and the public repository boundary.

- [x] T001 Create exact-pinned React/Vite/TypeScript project scripts and metadata in `package.json`
- [x] T002 [P] Configure compiler and bundler in `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, and `vite.config.ts`
- [x] T003 [P] Configure formatting and lint rules in `prettier.config.mjs`, `.prettierignore`, and `eslint.config.js`
- [x] T004 [P] Configure component and browser test environments in `vitest.config.ts`, `playwright.config.ts`, and `src/test/setup.ts`
- [x] T005 Create the semantic application entry shell and restrictive static metadata policy in `index.html` and `src/main.tsx`

## Phase 2: Foundational

**Purpose**: Define the safe data and state boundaries that block all user-story work.

- [x] T006 [P] Write failing catalog validation and discovery tests for FR-006 through FR-010 in `src/lib/catalog.test.ts`
- [x] T007 [P] Write failing cart validation, storage-recovery, and calculation tests for FR-012 through FR-015 in `src/lib/cart.test.ts`
- [x] T008 [P] Define closed public entity contracts from `data-model.md` in `src/types/domain.ts`
- [x] T009 [P] Create eight fictional products, four categories, and public-safe evidence records in `src/data/catalog.ts` and `src/data/history.ts`
- [x] T010 Implement catalog validation, query normalization, search, and filtering in `src/lib/catalog.ts` until T006 passes
- [x] T011 Implement cart reducer, local-storage parsing, allowlisting, clamping, totals, and currency formatting in `src/lib/cart.ts` until T007 passes
- [x] T012 Implement storage-failure-safe cart state integration in `src/hooks/useCart.ts`

**Checkpoint**: Public data and commerce state are deterministic, typed, tested, and contain no private input.

## Phase 3: User Story 1 — Understand the Learning Journey (P1) 🎯 MVP

**Goal**: A recruiter can understand the bounded history, current reconstruction, critique, and learning.

**Independent Test**: A no-context reviewer identifies all three phases, the 2022 team role, the new-work
boundary, verified limitations, and explicit non-claims within three minutes.

### Tests for User Story 1

- [x] T013 [P] [US1] Write failing timeline and approved-claim rendering tests for FR-001 through FR-005 in `src/app/App.test.tsx`
- [x] T014 [P] [US1] Write failing evidence-label and non-claim tests for FR-003 through FR-005 in `src/components/LearningJourney.test.tsx`

### Implementation for User Story 1

- [x] T015 [P] [US1] Build the reconstruction hero and boundary summary in `src/components/Hero.tsx`
- [x] T016 [P] [US1] Build the three-phase evidence-labeled timeline in `src/components/LearningJourney.tsx`
- [x] T017 [P] [US1] Build the legacy-risk versus rebuild-response technical retrospective in `src/components/TechnicalRetrospective.tsx`
- [x] T018 [US1] Compose the global shell, skip link, header, main landmarks, and case-study sections in `src/app/App.tsx` until T013 and T014 pass

**Checkpoint**: The evidence-bounded case study is a complete, independently reviewable MVP.

## Phase 4: User Story 2 — Explore the Commerce Demonstration (P2)

**Goal**: Visitors can search, filter, inspect products, and manage a safe local demonstration cart.

**Independent Test**: Search for `travel`, select a category, inspect one item, add it, change quantity,
and remove it with correct counts/subtotals and no checkout or data collection.

### Tests for User Story 2

- [x] T019 [P] [US2] Write failing catalog interaction and empty-state tests for FR-007 through FR-011 in `src/components/Catalog.test.tsx`
- [x] T020 [P] [US2] Write failing dialog focus, Escape, and return-focus tests for FR-011 and FR-016 in `src/components/ProductDialog.test.tsx`
- [x] T021 [P] [US2] Write failing cart interaction, stock-boundary, and no-checkout tests for FR-012 through FR-015 in `src/components/Cart.test.tsx`

### Implementation for User Story 2

- [x] T022 [P] [US2] Create original reusable SVG product compositions in `src/components/ProductIllustration.tsx`
- [x] T023 [US2] Implement labeled search, category controls, results, cards, and empty recovery in `src/components/Catalog.tsx` until T019 passes
- [x] T024 [US2] Implement accessible product details with focus containment and restoration in `src/components/ProductDialog.tsx` until T020 passes
- [x] T025 [US2] Implement cart lines, validated quantity controls, totals, clear action, and non-transactional notice in `src/components/Cart.tsx` until T021 passes
- [x] T026 [US2] Integrate catalog, product details, live cart count, hash navigation, and local cart state in `src/app/App.tsx`

**Checkpoint**: The complete fictional commerce journey works without accounts, backend, or checkout.

## Phase 5: User Story 3 — Verify Engineering Quality (P3)

**Goal**: A technical reviewer can reproduce and evaluate the architecture, tests, and release boundaries.

**Independent Test**: A fresh clone runs `npm run verify` and all documented gates succeed without private
files, credentials, accounts, or network data at application runtime.

### Tests for User Story 3

- [x] T027 [P] [US3] Write browser journeys for case study, discovery, dialog, cart, keyboard, mobile, and axe checks in `tests/e2e/portfolio.spec.ts`
- [x] T028 [P] [US3] Write provenance fixture expectations and restricted-marker allowlist in `scripts/verify-provenance.test.mjs`

### Implementation for User Story 3

- [x] T029 [P] [US3] Implement deterministic tracked-file and build-output provenance scanning in `scripts/verify-provenance.mjs` until T028 passes
- [x] T030 [P] [US3] Document architecture, evidence/claims, security, accessibility, and decisions in `docs/architecture.md`, `docs/evidence-and-claims.md`, `docs/security.md`, `docs/accessibility.md`, and `docs/decisions/`
- [x] T031 [P] [US3] Replace the public project guide with recruiter summary, quickstart, verification, limitations, and license boundary in `README.md` and `LICENSE`
- [x] T032 [P] [US3] Add the single-command quality workflow in `.github/workflows/quality.yml`
- [x] T033 [US3] Complete responsive, focus-visible, contrast-safe, and reduced-motion presentation in `src/styles/global.css` until T027 passes

**Checkpoint**: Reviewers can inspect and reproduce every material quality claim.

## Phase 6: Polish and Publication Gate

**Purpose**: Prove the whole repository is coherent, safe, and ready for a private GitHub review.

- [x] T034 Run formatting, lint, type, unit/component, production build, and browser accessibility checks via `npm run verify`
- [x] T035 Run dependency audit, secret scan, tracked-file provenance scan, and `dist/` provenance scan with zero findings
- [x] T036 Perform and record manual keyboard, 320 px, 200% zoom, reduced-motion, and recruiter three-minute reviews in `docs/verification-report.md`
- [x] T037 Re-run Spec Kit requirement/task coverage and update completed task markers in `specs/001-recruiter-case-study/tasks.md`
- [x] T038 Rebuild Graphify if available, inspect final Git diff/history, and commit the verified implementation
- [x] T039 Create a private GitHub repository from the clean tracked history, push the feature branch, and verify remote Actions status without making the repository public

Public visibility and GitHub Pages were enabled only after the private repository passed the remote quality workflow. The live deployment was then checked over HTTPS and recorded in `docs/verification-report.md`.

## Dependencies & Execution Order

```text
Setup -> Foundational -> US1 -> US2 -> US3 -> Publication Gate
```

- Foundational data/state tasks block every story.
- US1 is the independently deployable recruiter-story MVP.
- US2 depends only on the shared data/state layer, but is executed after US1 to keep the narrative primary.
- US3 can begin after application behavior stabilizes and supplies the release gate.
- Public visibility remains a separate rights/privacy decision after the private remote passes CI.

## Parallel Opportunities

- T002–T004 affect independent configuration files.
- T006–T009 affect separate tests, types, and data files.
- T013–T017 split tests and case-study components.
- T019–T022 split commerce tests and illustration work.
- T027–T032 split browser tests, provenance, documentation, README/license, and CI.

## Implementation Strategy

1. Establish reproducible tooling and prove failing foundational tests.
2. Implement only enough pure logic to pass catalog/cart tests.
3. Deliver the case study before commerce interaction so the recruiting story cannot be buried.
4. Add the safe commerce demonstration and test each interaction boundary.
5. Add browser, accessibility, provenance, documentation, and CI evidence.
6. Publish privately only after every local gate is green.
