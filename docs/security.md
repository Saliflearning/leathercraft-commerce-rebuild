# Security model

## Assets and trust boundaries

The application protects publication integrity and predictable client behavior—not money or customer data. The only mutable data is a browser-local cart payload, which is treated as attacker-controlled.

The cart adapter:

- requires the supported schema version and an object-shaped item map;
- accepts only product identifiers present in the closed fictional catalog;
- coerces quantities to finite integers and clamps them to demonstrated stock;
- ignores unknown keys and recovers to an empty cart after parse or storage failures; and
- performs no network transmission.

## Release controls

- Exact dependency versions and the lockfile make installations reproducible.
- `npm audit --audit-level=high` blocks known high/critical dependency findings.
- A credential-pattern scan checks tracked and untracked release candidates.
- A provenance scan rejects private paths, historical brand markers, restricted binaries, rights-unclear media, and selected unsupported claim phrases.
- The same provenance rules inspect the generated `dist` directory.
- The HTML policy limits loaded content to the application itself and disallows embedding, objects, and a permissive base URL.

## Deliberately absent attack surface

There is no server, database, session, account, upload, admin area, payment flow, order workflow, analytics SDK, external font, or third-party runtime content. If any of those are added later, this threat model and the architecture decision must be reopened before implementation.

## Residual risks

Local storage is user-controlled and offers no confidentiality. Client-side sample prices and stock cannot be authoritative. Automated scans are narrow guardrails, not proof that all future code is secure. Production commerce would require server-side validation, identity and authorization design, secure payment delegation, monitoring, incident response, privacy controls, and independent review.
