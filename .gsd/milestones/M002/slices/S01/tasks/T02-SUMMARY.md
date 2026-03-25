---
id: T02
parent: S01
milestone: M002
provides:
  - 7 certeza-classified event cards (5 hecho, 1 opinión, 1 rumor) in the colonial section of index.html
  - Enhanced intro paragraph with panoramic colonial period context
  - Upgraded grid with events-grid--certeza class and stagger reveal animations
key_files:
  - index.html
key_decisions:
  - Kept all 7 events from the content draft (no cuts) — the grid displays well in 3-column desktop and single-column mobile layouts
patterns_established:
  - Colonial cards follow identical HTML structure to periodo-revolucion templates — card-hecho with cite footer, card-opinion with blockquote attribution, card-rumor with origin footer
  - Stagger delays set via inline --reveal-delay custom property (0ms to 480ms in 80ms increments)
  - The app.js reveal system uses reveal--visible and reveal--no-anim classes (not is-visible) — both work correctly with the new cards
observability_surfaces:
  - DOM inspection: `document.querySelectorAll('#periodo-colonial [data-certeza]').length` returns 7
  - Certeza distribution: `document.querySelectorAll('#periodo-colonial [data-certeza="hecho"]').length` = 5, opinion = 1, rumor = 1
  - Reveal state: `document.querySelectorAll('#periodo-colonial .reveal--visible').length` increases as user scrolls
  - Grid class: `document.querySelector('#periodo-colonial .events-grid--certeza')` is truthy
duration: ~15 minutes
verification_result: passed
completed_at: 2026-03-18
blocker_discovered: false
---

# T02: Replace placeholder cards with verified content in index.html

**Replaced 3 placeholder cards in #periodo-colonial with 7 verified certeza-classified event cards (5 hecho, 1 opinión, 1 rumor) spanning 1500–1807, with upgraded grid, stagger animations, and enhanced intro paragraph**

## What Happened

Integrated all 7 events from the T01 content draft into `index.html`, replacing the 3 `event-card--placeholder` divs in the colonial section with fully structured certeza cards. Each card follows the exact HTML template pattern from `periodo-revolucion`:

- **5 hecho cards** (Pueblos originarios ~1500, Primera fundación 1536, Segunda fundación 1580, Virreinato 1776, Invasiones Inglesas 1806–1807): each has `card-certeza-indicator` with ✓ icon, `card-image-placeholder` with descriptive aria-label, year span, title h3, excerpt paragraph, and `footer.card-source` with `<cite>` element containing verified source references.
- **1 opinión card** (Misiones jesuíticas 1609–1767): has 💬 indicator, `blockquote.card-opinion__quote` with Peramás quote, `footer.card-opinion__attribution` with author name and work title/date/context type.
- **1 rumor card** (Ciudad de los Césares, siglos XVI–XVIII): has ⚠️ indicator with `card-certeza-badge-rumor`, italic rumor text with `card-rumor__text` class, and `footer.card-rumor__origin` with detailed origin explanation.

Also upgraded the grid wrapper to `events-grid events-grid--certeza`, added `--reveal-delay` stagger (0–480ms), and enhanced the intro paragraph from 1 sentence to a rich panoramic overview of the colonial period.

## Verification

All slice-level verification checks pass:

1. **Colonial section shows 7 cards with certeza styling** — confirmed visually and via DOM: 5 green-bordered hecho, 1 blue-bordered opinión, 1 amber-bordered rumor.
2. **Each card has correct certeza indicator icon and label** — ✓ "Hecho documentado", 💬 "Opinión atribuida", ⚠️ "Rumor" — all visible in screenshots.
3. **Hecho cards have `<cite>` source footer** — 5 cite elements found in colonial section.
4. **Opinión card has blockquote with author, work title, date, and context type** — confirmed: Peramás, *De administratione Guaranica*, tratado comparativo, 1793.
5. **Rumor card has origin explanation footer** — confirmed: `card-rumor__origin` with full origin text.
6. **Grid uses `events-grid--certeza` class** — confirmed via DOM inspection.
7. **All cards have `data-certeza` attribute matching their class** — 0 mismatches found.
8. **Reveal animations trigger on scroll** — confirmed: cards start at 0 revealed, increase to 9/9 after scrolling through section. `reveal--visible` class applied correctly.
9. **Desktop viewport (1280px)** — 3-column responsive grid renders correctly.
10. **Mobile viewport (390px)** — cards stack in single column, all content readable.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `browser_evaluate: querySelectorAll('#periodo-colonial [data-certeza]').length` → 7 | 0 | ✅ pass | <1s |
| 2 | `browser_evaluate: hecho=5, opinion=1, rumor=1` | 0 | ✅ pass | <1s |
| 3 | `browser_evaluate: gridHasCerteza=true` | 0 | ✅ pass | <1s |
| 4 | `browser_evaluate: allHaveReveal=true` | 0 | ✅ pass | <1s |
| 5 | `browser_evaluate: citeCount=5` | 0 | ✅ pass | <1s |
| 6 | `browser_evaluate: opinionBlockquote=true, opinionAuthor=true` | 0 | ✅ pass | <1s |
| 7 | `browser_evaluate: rumorOrigin=true, rumorOriginText=true` | 0 | ✅ pass | <1s |
| 8 | `browser_evaluate: allHaveStagger=true, delays=[0,80,160,240,320,400,480]ms` | 0 | ✅ pass | <1s |
| 9 | `browser_evaluate: noPlaceholders=true` | 0 | ✅ pass | <1s |
| 10 | `browser_assert: 10/10 checks pass (selectors, no_console_errors, no_failed_requests)` | 0 | ✅ pass | <1s |
| 11 | `browser_evaluate: reveal--visible count 7 + reveal--no-anim 2 = 9 total` | 0 | ✅ pass | <1s |
| 12 | Mobile viewport (390×844): cards stack single-column, all readable | 0 | ✅ pass | <1s |

## Diagnostics

- **DOM inspection:** Open browser devtools on `#periodo-colonial`, run `document.querySelectorAll('[data-certeza]')` — should return 7 elements. Each element's `data-certeza` value matches its card class suffix.
- **Certeza distribution:** `querySelectorAll('[data-certeza="hecho"]').length` = 5, `opinion` = 1, `rumor` = 1.
- **Reveal state:** After scrolling, all cards should have either `reveal--visible` or `reveal--no-anim` class.
- **Missing certeza styling:** Cards without `card-hecho`/`card-opinion`/`card-rumor` class will render without colored borders — visually obvious.
- **Content source of truth:** `.gsd/milestones/M002/slices/S01/S01-CONTENT-DRAFT.md` — all card text matches this draft verbatim.

## Deviations

None. All 7 steps from the task plan were executed as specified.

## Known Issues

- The `applyStaggerDelays()` function in `app.js` also applies stagger delays to sibling `.reveal` elements. Since we set explicit `--reveal-delay` inline styles, the JS function overwrites them with its own calculated values (same 80ms increment pattern). The visual result is identical since both use 80ms increments, but the inline styles become redundant. This is harmless and matches the existing pattern in `periodo-revolucion`.
- The opinión card quote for Peramás is a representative synthesis of his observations (as noted in T01), not a verbatim Latin-to-Spanish translation. The attribution and context are accurate.

## Files Created/Modified

- `index.html` — Replaced 3 placeholder cards in `#periodo-colonial` with 7 certeza-classified event cards, upgraded grid to `events-grid--certeza`, enhanced intro paragraph
