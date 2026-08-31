# UI Contract: Portfolio and Commerce Demonstration

## Global shell

- A skip link targets the main content.
- The header identifies the project as a reconstruction and exposes case study, catalog, and cart links.
- Cart navigation communicates the current total item quantity in text, not color alone.
- Section-level direct links use stable URL fragments and browser-native history behavior.
- No element requests identity, contact, account, payment, order, or analytics data.

## Case-study contract

- The opening summary includes: clean-room reconstruction, historical team boundary, current-work label,
  and non-transactional boundary.
- The timeline has exactly three chronological phases with visible year, scope, role, evidence status,
  capabilities, limitations, and lesson.
- Verified facts, qualified evidence, new work, and non-claims use text labels in addition to visual styles.
- The technical retrospective includes original breadth, original risk, rebuild response, and remaining
  limits without rendering raw assessment content.

## Catalog contract

- Search has a persistent label and searches name, category label, description, and feature text.
- Category controls are keyboard-operable and announce their selected state.
- Active result count is textual and updates with the controls.
- An empty state names the active query/filter and offers a clear-control action.
- Each product card contains a heading, category, formatted sample price, stock note, original decorative
  illustration with appropriate text alternative behavior, details action, and add action.

## Product-detail contract

- Opening details places focus at the detail heading; closing returns focus to the invoking control.
- Escape closes the detail surface.
- The surface names the product, category, fictional description, sample price, features, stock, and
  demonstration boundary before add-to-cart.
- Unknown product identifiers render a recoverable not-found state.

## Cart contract

- Empty and active states are distinct and announced by headings.
- Each line exposes name, unit sample price, decrement, validated quantity, increment, subtotal, and remove.
- Decrement from one removes the line; increment at stock is disabled and explained.
- Cart totals use integer-cent calculations and locale currency formatting.
- Clear cart requires a deliberate action; there is no checkout action.
- The boundary notice states that nothing is purchased, submitted, or transmitted.

## Responsive and accessibility contract

- All interactive controls are reachable and operable by keyboard in logical order.
- Focus is never trapped except inside an open modal dialog, where focus is contained and restored.
- Meaning is not conveyed by color, motion, position, or icon alone.
- Animation is disabled or materially reduced when reduced motion is requested.
- At 320 px width and 200% zoom, content does not require two-dimensional scrolling for use.
- Automated axe checks report no serious or critical violations on the primary page, detail, and cart states.

## Error and recovery contract

- Malformed persisted cart data never throws during rendering.
- Storage read/write failures preserve the in-memory session and show no alarming technical error.
- Search input longer than 100 characters is safely truncated for matching and remains plain text.
- Unknown or obsolete stored product identifiers are discarded.
