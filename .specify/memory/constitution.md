<!--
Sync Impact Report
- Version change: template -> 1.0.0
- Added principles: Evidence Before Claims; Clean-Room Public Boundary; Security by Design;
  Test-First and Accessible; Recruiter Clarity and Simplicity
- Added sections: Portfolio and Product Constraints; Development and Publication Gates
- Removed sections: none (template placeholders replaced)
- Templates updated:
  - ✅ .specify/templates/plan-template.md
  - ✅ .specify/templates/spec-template.md
  - ✅ .specify/templates/tasks-template.md
- Runtime guidance reviewed:
  - ✅ README.md
  - ✅ PROJECT_MAP.md
  - ✅ AGENTS.md
- Deferred items: none
-->
# Leathercraft Commerce Rebuild Constitution

## Core Principles

### I. Evidence Before Claims

Every historical statement, contribution claim, score, feature claim, and learning outcome MUST be
traceable to the private academic audit or to new work in this repository. Team work MUST be labeled
as team work. The project MUST NOT imply sole authorship, deployment, customers, orders, payments,
or production readiness that the evidence does not establish. Public documentation MUST distinguish
verified facts, qualified evidence, inference, and retrospective interpretation.

### II. Clean-Room Public Boundary

No original submission source, course prompt, rubric, peer evaluation, credential, database value,
personal record, collaborator identity, business-confidential material, or rights-unclear asset may
enter this repository. New code, copy, data, diagrams, and visual assets MUST be created independently
for the rebuild. The private audit may be consulted as evidence but MUST NOT be copied, linked by local
path in public files, or included in Git history.

### III. Security by Design

The rebuild MUST minimize its attack surface and collect no personal or payment data. Untrusted values
MUST be validated before use and safely encoded on output. Secrets and credentials MUST never be
committed. Dependency, static-analysis, and secret scans MUST pass before publication. Deliberately
excluded capabilities such as checkout, authentication, uploads, and persistent administration MUST
be named as exclusions instead of simulated as production features.

### IV. Test-First and Accessible (NON-NEGOTIABLE)

Behavior changes MUST follow red-green-refactor: write or update a test, observe the relevant failure,
then implement and refactor. Automated tests MUST cover catalog discovery, filtering, cart behavior,
case-study navigation, and evidence-boundary checks. The experience MUST support keyboard use,
semantic structure, visible focus, reduced motion, sufficient contrast, responsive layouts, and an
automated accessibility audit with no serious or critical findings.

### V. Recruiter Clarity and Simplicity

The repository MUST tell one coherent story that a reviewer can understand quickly: the historical
problem, verified role, original limitations, reconstruction decisions, demonstrable result, tests,
and honest remaining limits. Architecture and dependencies MUST remain proportional to a static,
portfolio-safe demonstration. Every dependency and abstraction MUST earn its place through a tested
requirement; speculative commerce infrastructure is prohibited.

## Portfolio and Product Constraints

- The public product is a new educational reconstruction, not the original CCPB application.
- Product names, descriptions, prices, and illustrations MUST be fictional and rights-cleared.
- Cart state MAY be local to the browser; checkout, payment, accounts, orders, and admin persistence
  are out of scope.
- Historical grades may appear only with their distinct evidence surfaces and enough context to avoid
  misleading equivalence.
- Public role language is limited to "assigned coding lead/contributor" for the 2022 team project.
- Current official documentation MUST support major tool and security decisions.
- The repository MUST use a permissive license only for the newly created material in the repository;
  the license MUST NOT imply relicensing of private originals.

## Development and Publication Gates

Work MUST proceed through specification, research, design, tasks, consistency analysis, implementation,
and verification. Pull-request quality checks MUST include formatting, linting, type checking, unit and
component tests, a production build, accessibility testing, dependency audit, and secret scanning.
Publication requires a final provenance/privacy scan proving that no restricted filename, local path,
credential-like value, original image, or unsupported claim is present. Any failed gate blocks public
release until resolved or explicitly removed from scope.

## Governance

This constitution supersedes convenience, speed, and historical implementation choices. Amendments
require a documented rationale, a semantic version change, and a review of the specification, plan,
tasks, templates, and publication checklist. MAJOR changes remove or redefine a core protection;
MINOR changes add or materially expand a principle; PATCH changes clarify wording without changing
obligations. Every implementation and release review MUST verify all MUST statements. Complexity or
exceptions require a written justification in the implementation plan and cannot weaken evidence,
privacy, attribution, or security boundaries.

**Version**: 1.0.0 | **Ratified**: 2026-08-31 | **Last Amended**: 2026-08-31
