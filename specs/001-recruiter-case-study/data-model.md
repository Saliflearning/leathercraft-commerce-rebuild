# Data Model: Recruiter-Facing Commerce Learning Case Study

All persisted or bundled data is public-safe and fictional. No entity contains a person's name, contact
details, credentials, payment information, order history, analytics identifier, or private evidence path.

## HistoricalPhase

| Field                  | Type                     | Rules                                                       |
| ---------------------- | ------------------------ | ----------------------------------------------------------- |
| `id`                   | closed string identifier | Unique and stable                                           |
| `year`                 | integer                  | One of 2019, 2022, or 2023                                  |
| `label`                | string                   | Short public phase name                                     |
| `scope`                | string                   | Explicitly individual, team, or personal                    |
| `role`                 | string                   | Uses only approved bounded language                         |
| `verifiedCapabilities` | string list              | Public-safe aggregate facts only                            |
| `limitations`          | string list              | Includes security, evidence, rights, or completeness limits |
| `lesson`               | string                   | Retrospective interpretation labeled as learning            |
| `evidenceStatus`       | enum                     | `verified`, `qualified`, or `unresolved`                    |

Relationship: displayed in chronological order and referenced by one or more evidence notes.

## EvidenceNote

| Field            | Type          | Rules                                                       |
| ---------------- | ------------- | ----------------------------------------------------------- |
| `id`             | stable string | Unique                                                      |
| `claim`          | string        | Approved public wording                                     |
| `classification` | enum          | `verified`, `qualified`, `new-work`, or `non-claim`         |
| `basis`          | string        | Public-safe evidence class; no private path or raw feedback |
| `boundary`       | string        | What the note does not establish                            |

## Category

| Field         | Type                     | Rules                        |
| ------------- | ------------------------ | ---------------------------- |
| `id`          | closed string identifier | Unique                       |
| `label`       | string                   | Human-readable and fictional |
| `description` | string                   | Short discovery copy         |

## Product

| Field         | Type                  | Rules                                                  |
| ------------- | --------------------- | ------------------------------------------------------ |
| `id`          | stable slug           | Unique, lowercase, allowlisted in cart validation      |
| `name`        | string                | Fictional; 3–60 characters                             |
| `categoryId`  | Category identifier   | Must resolve to a category                             |
| `description` | string                | Fictional; plain text only                             |
| `priceCents`  | positive integer      | Fixed sample price; formatted only at display boundary |
| `stock`       | integer               | 1–12; demonstration quantity ceiling                   |
| `features`    | non-empty string list | Plain text, no markup                                  |
| `accent`      | closed color token    | Selects an internal illustration palette               |
| `shape`       | closed shape token    | Selects an original internal SVG composition           |

Relationship: many products belong to one category.

## CartState

| Field        | Type                      | Rules                                                   |
| ------------ | ------------------------- | ------------------------------------------------------- |
| `version`    | literal integer           | Current schema version only                             |
| `quantities` | identifier-to-integer map | Unknown IDs removed; values clamped to 1..product stock |

Derived values: distinct item count, total quantity, line subtotal, cart subtotal. Prices and stock always
come from the bundled catalog rather than local storage.

State transitions:

```text
empty -> add product -> active
active -> add same product -> quantity increases to stock ceiling
active -> decrease quantity -> active or item removed at zero
active -> remove product -> active or empty
active -> clear -> empty
malformed persisted value -> validate -> empty or recovered allowlisted subset
```

## QualityGate

| Field             | Type    | Rules                           |
| ----------------- | ------- | ------------------------------- |
| `name`            | string  | Unique reviewer-facing label    |
| `command`         | string  | Reproducible from a fresh clone |
| `expected`        | string  | Objective pass condition        |
| `releaseBlocking` | boolean | Always true for required gates  |
