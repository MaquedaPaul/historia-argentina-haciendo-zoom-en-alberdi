---
id: T01
parent: S03
milestone: M001
provides:
  - Three certeza card variants (hecho, opinión, rumor) with full HTML markup and CSS
  - Reusable card template structure for M002/M003/M004
key_files:
  - index.html
  - styles.css
key_decisions:
  - Cards placed in periodo-revolucion section replacing placeholder cards; other sections keep placeholders for now
  - Color palette: green (#4a7c59) for hecho, blue (#4a6fa5) for opinión, amber (#b8860b) for rumor
  - Card structure uses article elements with data-certeza attribute for programmatic access
patterns_established:
  - Card certeza indicator bar at top with icon + label
  - Image placeholder with 16:9 aspect ratio
  - Type-specific footers: source citation (hecho), blockquote attribution (opinión), origin note (rumor)
observability_surfaces:
  - DOM query: document.querySelectorAll('.card-hecho, .card-opinion, .card-rumor') returns 3 elements
  - Computed style: distinct borderLeftColor per card type (green/blue/amber)
  - Reveal integration: cards carry .reveal .reveal-slide classes, logged by [Reveal] observer
duration: 20min
verification_result: passed
completed_at: 2026-03-18
blocker_discovered: false
---

# T01: Cards de eventos con niveles de certeza

**Built three visually distinct certeza card variants (hecho/opinión/rumor) with semantic HTML and 304 lines of new CSS, replacing placeholder cards in the revolution section.**

## What Happened

Replaced the four placeholder event cards in the `periodo-revolucion` section with three certeza-typed cards, one per type:

1. **Card Hecho (green):** Solid left border, ✓ icon, "HECHO DOCUMENTADO" indicator bar, green-tinted background gradient, source citation footer. Content: "Se forma la Primera Junta de gobierno" (25 de mayo de 1810).

2. **Card Opinión (blue):** Blue left border, 💬 icon, "OPINIÓN ATRIBUIDA" indicator, blockquote interior with large decorative curly quote, author attribution in blue. Content: Alberdi quote on constitutional organization (1852).

3. **Card Rumor (amber):** Amber left border, ⚠️ icon, "RUMOR" badge pill, italic body text, dashed-border "Origen del rumor" footer. Content: Supposed poisoning of Mariano Moreno (1811).

CSS adds 364 total lines (304 non-blank) under the `/* Cards de certeza */` section, including:
- CSS custom properties for certeza accent palette
- Shared card structure (indicator bar, image placeholder, inner spacing)
- Three complete variant blocks with distinct colors, backgrounds, and footers
- Hover enhancements per type
- Responsive adjustments for mobile
- Removed old placeholder certeza stubs

All cards use `article` elements with `data-certeza` attribute, carry `.reveal .reveal-slide` classes for scroll animation, and follow the existing `.event-card` base pattern.

## Verification

- 3 cards visible on page, one per certeza type
- All structural elements present: date, title, image placeholder, text, type-specific footer
- Computed border-left colors are distinct: rgb(74,124,89), rgb(74,111,165), rgb(184,134,11)
- Rumor text renders in italic (fontStyle: "italic")
- All cards have `.reveal` classes for scroll animation
- No console errors
- 12/12 browser assertions passed

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | browser_evaluate: DOM structure checks (16 properties) | 0 | ✅ pass | <1s |
| 2 | browser_evaluate: computed styles + color distinction | 0 | ✅ pass | <1s |
| 3 | browser_assert: 12 checks (selectors, text, no errors) | 0 | ✅ pass | <1s |
| 4 | Visual screenshot: 3 cards side-by-side with clear differentiation | — | ✅ pass | — |
| 5 | CSS line count: 304 non-blank new lines (≥80 required) | 0 | ✅ pass | <1s |

## Diagnostics

- **DOM inspection:** `document.querySelectorAll('[data-certeza]')` returns all certeza cards with their type.
- **Style verification:** Check `getComputedStyle(el).borderLeftColor` for each card type.
- **Reveal status:** Look for `[Reveal]` console debug messages to confirm animation triggers.
- **Fallback:** Cards without certeza CSS fall back to base `.event-card` style — readable but undifferentiated.

## Deviations

- Replaced 4 placeholder cards with 3 certeza cards (not a 1:1 replacement — the plan called for 3 specific example cards, which is what was built). The old placeholder content (Revolución de Mayo, Independencia, Constitución, Caseros) was superseded by the certeza examples.
- Old `.certeza-hecho`, `.certeza-opinion`, `.certeza-rumor`, and `.certeza-badge` stubs removed and replaced with the full implementation.

## Known Issues

None.

## Files Created/Modified

- `index.html` — Replaced placeholder event cards in periodo-revolucion section with 3 certeza-typed article cards (hecho, opinión, rumor) with full semantic markup
- `styles.css` — Added 364 lines of certeza card CSS (custom properties, 3 variant blocks, shared structure, hover states, responsive rules); removed old placeholder stubs
- `.gsd/milestones/M001/slices/S03/S03-PLAN.md` — Added Observability/Diagnostics and Verification sections
- `.gsd/milestones/M001/slices/S03/tasks/T01-PLAN.md` — Added Observability Impact section
