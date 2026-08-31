# ADR 0002: Keep the demonstration static and non-transactional

- Status: Accepted
- Date: 2026-08-31

## Context

The historical evidence supports catalog, account, cart, and administrative feature breadth, but not a verified checkout, payment, customer, order, or production operation. Adding a backend would greatly expand risk and obscure the case-study goal.

## Decision

Ship a static React application with a finite fictional catalog and a validated browser-local cart. Stop explicitly at cart review. Provide no account, backend, checkout, payment, order, upload, or analytics behavior.

## Consequences

The application remains deployable without secrets or customer data and focuses review on front-end engineering and judgment. It cannot demonstrate server authorization, durable inventory, payments, fulfillment, or production operations, and does not claim to do so.
