# Contributing

Contributions are welcome when they preserve the project's evidence, privacy, accessibility, and non-transactional boundaries.

## Before opening a change

1. Create an issue or short proposal that states the user need and acceptance criteria.
2. Do not submit historical source, screenshots, data, names, course material, feedback, credentials, or rights-unclear media.
3. Keep product content fictional and newly authored.
4. Label historical statements as verified, qualified, new work, or non-claims and update the evidence register when wording changes.
5. Add or update tests before behavior changes, including keyboard and boundary cases where relevant.

## Local workflow

```bash
npm ci
npx playwright install chromium
npm run verify
```

Every gate must pass before review. Keep commits focused and explain architectural or scope decisions in `docs/decisions`.

## Out-of-scope proposals

Accounts, checkout, payments, orders, uploads, analytics, server persistence, or reuse of historical artifacts require a new specification, threat model, privacy review, and architecture decision. They are not small feature additions to this demonstration.
