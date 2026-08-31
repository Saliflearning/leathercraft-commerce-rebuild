# Feature Specification: Recruiter-Facing Commerce Learning Case Study

**Feature Branch**: `001-recruiter-case-study`

**Created**: 2026-08-31

**Status**: Approved for implementation by the user's instruction to continue through completion

**Input**: Turn the recovered CCPB academic project history into an honest, high-quality GitHub
portfolio project after deep review of the course assignments, requirements, versions, and evidence.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the Learning Journey (Priority: P1)

A recruiter can quickly understand the problem, the three distinct historical phases, Salif's bounded
role, the weaknesses discovered in the original work, and what the clean-room rebuild proves today.

**Why this priority**: The repository has no recruiting value if its story is confusing, overstated, or
indistinguishable from a raw student-project upload.

**Independent Test**: Give the case study to a reviewer with no prior context. Within three minutes,
they can correctly identify the 2019 static concept, 2022 team implementation, 2023 personal redesign,
the assigned coding-lead/contributor role in 2022, and the fact that the visible app is new work.

**Acceptance Scenarios**:

1. **Given** a first-time visitor, **When** they open the project, **Then** the page immediately labels
   the artifact as a clean-room reconstruction and team work as team work.
2. **Given** a recruiter scanning the case study, **When** they follow the timeline, **Then** they see
   separate dated phases, verified capabilities, documented weaknesses, and lessons without inflated
   ownership or outcome claims.
3. **Given** a technical reviewer, **When** they inspect evidence notes, **Then** each historical claim
   is categorized as verified, qualified, or intentionally excluded.

---

### User Story 2 - Explore a Polished Commerce Demonstration (Priority: P2)

A visitor can explore a fictional leathercraft catalog, search and filter products, inspect product
details, and manage a local demonstration cart without creating an account or supplying personal data.

**Why this priority**: A working artifact demonstrates current product and front-end skills more
credibly than screenshots or retrospective prose alone.

**Independent Test**: Starting from the catalog, a visitor finds one product by search, narrows by
category, opens its details, adds it to the cart, changes quantity, and removes it without errors.

**Acceptance Scenarios**:

1. **Given** the fictional catalog, **When** a visitor searches or selects a category, **Then** matching
   products update predictably and a clear empty state appears when nothing matches.
2. **Given** a product card or detail view, **When** a visitor adds the item, **Then** the cart count and
   subtotal update and remain consistent across the experience.
3. **Given** a cart item, **When** quantity is changed beyond allowed bounds or the item is removed,
   **Then** the interface enforces the boundary and communicates the resulting state.
4. **Given** any cart state, **When** a visitor looks for checkout, **Then** the experience clearly says
   this is a non-transactional demonstration and collects no payment or personal data.

---

### User Story 3 - Verify Engineering Quality (Priority: P3)

A technical reviewer can inspect the architecture, decisions, tests, security boundaries, accessibility
work, and automated checks without needing access to private academic files.

**Why this priority**: Recruiters need evidence of current engineering discipline, not only a polished
surface or unverifiable claims about old code.

**Independent Test**: A reviewer follows the quickstart, runs one documented verification command, and
sees formatting, type, test, build, accessibility, dependency, secret, and provenance gates succeed.

**Acceptance Scenarios**:

1. **Given** a fresh clone with supported prerequisites, **When** the documented setup and verification
   commands run, **Then** the application builds and all required checks pass without private inputs.
2. **Given** the repository history and documentation, **When** a reviewer inspects decisions, **Then**
   they can distinguish historical evidence from new implementation and see why risky legacy features
   were excluded.
3. **Given** an automated or manual accessibility review, **When** key journeys are tested by keyboard
   and at mobile and desktop widths, **Then** all actions remain perceivable and operable.

### Edge Cases

- Empty, whitespace-only, very long, mixed-case, or punctuation-heavy search text.
- A category filter and search term that produce no matches.
- Unknown product identifiers or stale cart records.
- Quantity changes below one or above the demonstrated stock limit.
- Corrupt or unsupported locally saved cart data.
- Browser storage that is unavailable, blocked, or cleared.
- Narrow screens, 200% zoom, keyboard-only input, and reduced-motion preference.
- Direct navigation to the case-study, catalog, product, and cart sections.
- A release scan encountering a local path, credential-like string, restricted filename, or unsupported
  claim phrase.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The project MUST identify itself as a new educational reconstruction, not the original
  academic application or a currently operating store.
- **FR-002**: The case study MUST show three separate dated phases: a 2019 static concept, a 2022 team
  PHP/database implementation, and a 2023 personal commerce redesign.
- **FR-003**: The 2022 role MUST be described only as an assigned coding lead/contributor; no sole or
  line-level authorship may be implied.
- **FR-004**: The case study MUST distinguish verified historical facts, qualified evidence, new work,
  lessons, and explicit non-claims.
- **FR-005**: The case study MUST document the original implementation's verified functional breadth
  and its security, documentation, attribution, and production-readiness weaknesses.
- **FR-006**: All visible catalog content and visual assets MUST be newly created, fictional, and free of
  personal data or private business material.
- **FR-007**: Visitors MUST be able to browse a finite product catalog with meaningful names,
  descriptions, categories, prices, stock limits, and accessible illustrations.
- **FR-008**: Visitors MUST be able to search products by visible product information using a
  case-insensitive query.
- **FR-009**: Visitors MUST be able to filter the catalog by category and clear all discovery controls.
- **FR-010**: Visitors MUST receive a helpful empty state when no product matches active controls.
- **FR-011**: Visitors MUST be able to inspect a product's details and return to the prior discovery
  context.
- **FR-012**: Visitors MUST be able to add products to a browser-local demonstration cart.
- **FR-013**: Visitors MUST be able to increase, decrease, remove, and clear cart items within the
  fictional stock boundary.
- **FR-014**: The cart MUST calculate item counts and monetary subtotals consistently using fixed sample
  prices and MUST not offer checkout or payment.
- **FR-015**: The application MUST remain usable when local persistence is unavailable or contains
  malformed data.
- **FR-016**: Primary navigation, discovery, product, cart, and case-study interactions MUST be keyboard
  operable with visible focus and meaningful accessible names.
- **FR-017**: Layout and content MUST remain usable on small mobile screens, common desktop widths,
  200% zoom, and reduced-motion settings.
- **FR-018**: The repository MUST provide setup, development, verification, architecture, evidence,
  security, accessibility, and contribution documentation.
- **FR-019**: Automated checks MUST cover catalog discovery, cart calculations and boundaries,
  navigation, evidence wording, accessibility, type correctness, formatting, production build,
  dependencies, secrets, and provenance/privacy markers.
- **FR-020**: The project MUST be runnable and testable from a fresh clone without private academic
  files, paid services, credentials, accounts, or external runtime data.
- **FR-021**: Release output MUST include no private path, original submission filename, credential-like
  value, collaborator identity, raw feedback, original media, or unsupported ownership/outcome claim.
- **FR-022**: The repository license MUST apply only to newly authored repository content and explicitly
  exclude private historical artifacts that are not included.

### Key Entities

- **Historical Phase**: A dated version in the learning timeline with scope, evidence status, verified
  capabilities, limitations, role boundary, and lessons.
- **Evidence Note**: A public-safe claim with a classification, short basis, and publication boundary.
- **Product**: A fictional catalog item with identifier, name, category, description, price, stock limit,
  feature list, and newly created illustration reference.
- **Category**: A catalog grouping used for discovery and summarization.
- **Cart Item**: A product identifier and validated quantity stored only for the local demonstration.
- **Quality Gate**: A repeatable check with a command, expected result, and release-blocking status.

## Evidence and Publication Boundaries *(mandatory)*

- **Verified historical claims**: Spring 2022 team context; assigned coding-lead/contributor role;
  separate final 53/60, staged rubric 83/100, and final-project group 108/125 evidence surfaces; exact
  final package structure of 207 files, 40 PHP files/2,920 lines, five tables, and implemented search,
  CRUD, authentication, protected cart, and admin controls; instructor-identified documentation and
  sanitization weaknesses; distinct 2019, 2022, and 2023 implementations.
- **New reconstruction work**: Every public line of code, test, diagram, product record, illustration,
  screenshot, and explanation produced in this repository.
- **Excluded private material**: Original code and database, credentials and row values, proposal,
  rubric, peer evaluation and discussions, course prompts, collaborator identities, business records,
  original product images, third-party theme/framework assets, and local evidence paths.
- **Explicit non-claims**: Sole authorship; line-level ownership of the old package; PayPal or checkout;
  customers, orders, revenue, transactions, deployment, present security, production readiness, or
  ownership of historical media and framework assets.
- **Release gate**: All quality checks pass and a deterministic scan reports zero restricted markers,
  secret findings, original binary/media files, or unsupported claim phrases in tracked content.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time reviewer can correctly summarize the three phases, team boundary, new-work
  boundary, and primary lesson after no more than three minutes of review.
- **SC-002**: A visitor can complete search, filter, product inspection, add, quantity change, and remove
  actions in under two minutes using mouse or keyboard.
- **SC-003**: All defined discovery and cart edge cases produce a stable result and no uncaught error.
- **SC-004**: The experience has zero serious or critical automated accessibility findings and all
  primary journeys pass a documented keyboard review at mobile and desktop widths.
- **SC-005**: A fresh-clone verification run completes every required quality gate with zero failures.
- **SC-006**: The production artifact contains zero collection points for identity, contact, payment,
  order, or analytics data.
- **SC-007**: The tracked repository and production output contain zero restricted provenance markers,
  secrets, credential-like values, private paths, original academic binaries, or rights-unclear media.
- **SC-008**: Every public historical statement maps to the approved evidence register, and every visible
  capability that is new is labeled as reconstruction work.

## Assumptions

- The public artifact is a static, non-transactional demonstration with no backend, accounts, checkout,
  payments, orders, uploads, or analytics.
- Browser-local cart persistence is a convenience, not a claim of durable commerce infrastructure.
- Fictional English-language content and original abstract product illustrations are acceptable for the
  first public version.
- The user's instruction to continue through completion approves this bounded reconstruction scope;
  it does not waive the evidence, privacy, rights, security, or external-publication gates.
- A private GitHub repository may be created automatically after verification; making it public requires
  the tracked repository itself to pass the final publication gate.
