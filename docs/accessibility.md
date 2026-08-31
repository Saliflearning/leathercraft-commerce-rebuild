# Accessibility

Accessibility is an acceptance criterion, not an afterthought.

## Implemented

- Semantic header, navigation, main, sections, headings, lists, buttons, dialog, and footer.
- A keyboard-visible skip link that moves focus to the main landmark.
- Visible focus styles and controls with explicit accessible names.
- Search and category filtering with a live result count and recoverable empty state.
- A modal product dialog with initial focus, Tab containment, Escape close, and focus restoration.
- Cart updates exposed through live status text, with quantity boundaries expressed in labels and disabled states.
- Layout checks at desktop, mobile, 200% zoom-equivalent width, and reduced-motion preference.
- Original decorative/product vectors with meaningful text alternatives supplied by their surrounding interface.

## Automated coverage

Playwright exercises the recruiter story and commerce journey in Chromium. Axe runs on the case-study, catalog, product-dialog, and cart states with zero serious or critical findings required. Component tests cover evidence labels, dialog focus behavior, discovery controls, and cart interactions.

## Limits

Automated tooling detects only a subset of accessibility problems. This version has not been evaluated by people who use screen readers, magnification, switch control, speech input, or other assistive technology. Such research would be required before calling the experience comprehensively accessible.
