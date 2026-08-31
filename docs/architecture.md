# Architecture

## Purpose

The application has two jobs: explain a verified learning journey and demonstrate current front-end engineering. It intentionally avoids pretending that a static portfolio needs production commerce infrastructure.

```text
HistoricalPhase[] ──> LearningJourney ──> evidence labels and lessons
EvidenceNote[] ─────> LearningJourney ──> claim boundaries

Product[] ──> pure search/filter logic ──> Catalog ──> ProductDialog
    │                                              │
    └────> ID allowlist + stock limits ──> cart reducer ──> Cart
                                              │
                                    versioned localStorage map
```

## Boundaries

- `src/data` is the only content source. Historical statements are public-safe summaries; products are fictional.
- `src/lib` contains pure catalog and cart rules. Search normalization, identifier allowlisting, integer coercion, quantity clamping, and currency formatting can be tested without React.
- `src/hooks/useCart.ts` is the only persistence adapter. Storage exceptions and malformed payloads fall back safely to in-memory state.
- Components receive typed records and callbacks. Product details use a real dialog with focus containment, Escape handling, and focus restoration.
- No application code makes a network request. There is no form that collects identity, contact, payment, order, or analytics data.

## Why no backend

A server would create authentication, authorization, database, secrets, abuse, privacy, deployment, and operations obligations without helping the central portfolio claim. The old work already showed feature breadth; the reconstruction is meant to show judgment, correctness, accessibility, and evidence discipline.

## Verification layers

| Layer                                    | What it proves                                                                           |
| ---------------------------------------- | ---------------------------------------------------------------------------------------- |
| TypeScript and ESLint                    | Closed contracts and statically reviewable use of them                                   |
| Vitest and Testing Library               | Pure rules, component behavior, evidence wording, and edge cases                         |
| Playwright and axe                       | Real-browser interaction, focus, responsive behavior, and automated accessibility checks |
| Production build                         | The exact-pinned application compiles into a deployable static artifact                  |
| Dependency, secret, and provenance scans | Known high-severity package findings and restricted publication content block release    |

The initial production bundle is approximately 217 kB of JavaScript before compression and 68 kB gzip, with no runtime API dependency.
