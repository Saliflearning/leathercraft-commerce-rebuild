# Technical Research: Recruiter-Facing Commerce Learning Case Study

## Decision 1: Use a static React and TypeScript application

**Decision**: React 19.2.8 with TypeScript 6.0.3 and Vite 8.2.2.

**Rationale**: The artifact needs rich, testable client interaction but no legitimate server data or
transaction workflow. React supplies an explicit component/state model, TypeScript makes the catalog and
cart contracts reviewable, and Vite produces a static bundle suitable for simple hosting. Vite's official
guide documents the standard development and production-build flow and notes that Vite transpiles rather
than type-checks TypeScript, so a separate type-check gate is required.

**Alternatives considered**:

- A PHP/MySQL rewrite would preserve the old stack but would add deployment, database, authentication,
  and security scope that the portfolio story does not need.
- A full-stack React framework would add server and routing concepts without a user requirement.
- Plain HTML/JavaScript would be smaller but would provide weaker typed component and test evidence.

**Sources**:

- [Vite Getting Started](https://vite.dev/guide/)
- [Vite Features — TypeScript transpilation boundary](https://vite.dev/guide/features.html#typescript)
- [React — Using TypeScript](https://react.dev/learn/typescript)

## Decision 2: Pin a compatible TypeScript toolchain

**Decision**: Pin TypeScript 6.0.3 rather than the registry's TypeScript 7 release.

**Rationale**: The current `typescript-eslint` 8.68.0 peer range is `>=4.8.4 <6.1.0`. TypeScript 6.0.3 is
the newest version inside that declared compatibility range. Dependencies are exact-pinned with a lockfile
to make CI and fresh-clone verification reproducible.

**Alternatives considered**:

- TypeScript 7.0.2 is newer but outside the linter toolchain's declared peer range.
- Omitting linting would weaken the recruiter-facing quality evidence.

**Source**: npm registry package metadata queried on 2026-08-31 for `typescript`, `typescript-eslint`, and
their peer dependency ranges.

## Decision 3: Keep commerce state local and untrusted

**Decision**: Store only a versioned map of fictional product identifiers to quantities in browser local
storage. Validate the decoded shape, allow only current catalog identifiers, clamp integer quantities to
stock, and fall back to an empty cart on any failure.

**Rationale**: Persistence makes the demo coherent without collecting identity or payment data. Treating
stored values as untrusted follows OWASP's requirement to validate data from potentially untrusted sources
at both syntactic and semantic levels.

**Alternatives considered**:

- Server persistence creates privacy, authentication, authorization, hosting, and abuse requirements.
- No persistence is safe but makes accidental refreshes needlessly frustrating.

**Source**: [OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)

## Decision 4: Use layered automated verification

**Decision**: Vitest and Testing Library cover pure logic and component behavior. Playwright covers the
real-browser journey, keyboard flow, viewport behavior, and axe-core accessibility scan. A custom
deterministic provenance script checks tracked public content for restricted markers and unexpected binary
or raster media. CI runs the same aggregate command as local verification.

**Rationale**: Vite does not type-check, jsdom cannot prove browser rendering, and generic secret scanners
cannot enforce this project's claim and evidence boundaries. Each layer closes a distinct gap.

**Alternatives considered**:

- Unit tests alone miss routing, focus, responsive, and browser-storage behavior.
- Manual review alone is not repeatable or visible to recruiters.

**Sources**:

- [Vitest Guide](https://vitest.dev/guide/)
- [Playwright Accessibility Testing](https://playwright.dev/docs/accessibility-testing)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)

## Decision 5: Create every visible asset in the repository

**Decision**: Use newly authored inline SVG/CSS illustrations, system fonts, and fictional product copy.
Do not import historical photographs, logos, fonts, theme files, or product records.

**Rationale**: Historical media and framework rights are unresolved, and the original database contains
private records. A clean-room visual system is easier to audit and makes the license boundary honest.

**Alternatives considered**:

- Reusing original screenshots would preserve history but expose private/rights-unclear material.
- Stock imagery introduces attribution and redistribution checks without improving the engineering proof.

## Decision 6: Publish only a non-transactional demonstration

**Decision**: The interface stops at cart review and prominently labels checkout as out of scope.

**Rationale**: The legacy evidence does not support implemented payment or production order handling. A
fake checkout would encourage exactly the inflated claim the case study is meant to correct.

**Alternatives considered**:

- A sandbox payment integration would be new scope unrelated to the verified learning story.
- A disabled "Buy" button would still create ambiguity; an educational boundary notice is clearer.
