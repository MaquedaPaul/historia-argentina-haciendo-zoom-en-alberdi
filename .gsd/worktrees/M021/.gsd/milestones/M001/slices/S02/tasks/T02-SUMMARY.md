---
id: T02
parent: S02
milestone: M001
provides:
  - Reveal-on-scroll animation system with .reveal, .reveal--visible, .reveal-fade, .reveal-slide classes
  - Intersection Observer-based reveal with stagger delays and fast-scroll catch-up
  - Already-visible-on-load detection via .reveal--no-anim class
key_files:
  - app.js
  - styles.css
  - index.html
key_decisions:
  - Used separate Intersection Observer from scroll spy (different thresholds and purposes)
  - Added scroll-event catch-up handler for elements skipped by fast/large scrolls
  - Stagger delay via --reveal-delay CSS custom property (80ms per sibling)
patterns_established:
  - '[Reveal]' prefixed console.debug for reveal system logging
  - .reveal base class with .reveal-fade and .reveal-slide variants
  - .reveal--no-anim for elements already in viewport at load time
observability_surfaces:
  - console.debug '[Reveal] Initialized with N elements' on load
  - console.debug '[Reveal] Revealed:' per element transition
  - console.debug '[Reveal] Already visible (skipping animation):' for no-anim elements
  - console.warn '[Reveal] No .reveal elements found' if no targets exist
  - DOM inspection: document.querySelectorAll('.reveal--visible').length
duration: 25min
verification_result: passed
completed_at: 2026-03-18
blocker_discovered: false
---

# T02: Animaciones reveal-on-scroll

**Added reveal-on-scroll animation system with fade-in and slide-up variants, stagger delays, and fast-scroll catch-up**

## What Happened

Implemented a complete reveal-on-scroll system using a second Intersection Observer (separate from the scroll spy). CSS classes define two animation variants: `.reveal-fade` (opacity transition) and `.reveal-slide` (opacity + translateY). The JS observer triggers `.reveal--visible` when elements enter the viewport at 15% visibility.

Three edge cases handled: (1) elements already visible at page load get `.reveal--no-anim` and appear instantly without flash, (2) sibling `.reveal` elements get staggered delays (80ms each via `--reveal-delay` CSS custom property), (3) fast scrolls that skip past elements are caught by a lightweight scroll-event handler that marks them as `reveal--no-anim`.

Added `prefers-reduced-motion` media query that disables all reveal animations entirely.

Applied `.reveal` classes to 17 content elements across all three period sections: period headers (fade), period intros (fade), event cards (slide), and the Alberdi quote (slide).

## Verification

- 17 `.reveal` elements detected on page load
- Progressive reveal confirmed: scrolling 400px → 2 revealed, 800px → 5, full scroll → 17/17
- Already-visible-on-load tested with 1200px viewport: 2 elements got `reveal--no-anim`
- No JS console errors on page load or during scroll
- No failed network requests
- Scroll spy, nav smooth scroll, timeline point smooth scroll all still working (T01 functionality preserved)
- Stagger delays verified via `--reveal-delay` CSS custom property on sibling cards

## Verification Evidence

| # | Check | Exit Code | Verdict | Duration |
|---|-------|-----------|---------|----------|
| 1 | app.js exists and is ≥60 lines (269 lines) | 0 | ✅ pass | <1s |
| 2 | Timeline aside present in DOM | — | ✅ pass | <1s |
| 3 | Scroll spy updates .nav-item--active on scroll | — | ✅ pass | <1s |
| 4 | Clicking nav link smooth-scrolls to target | — | ✅ pass | <1s |
| 5 | Clicking timeline point smooth-scrolls to target | — | ✅ pass | <1s |
| 6 | Timeline point .timeline-point--active updates | — | ✅ pass | <1s |
| 7 | No JS errors on page load | — | ✅ pass | <1s |
| 8 | [ScrollSpy] debug messages present in code | — | ✅ pass | <1s |
| 9 | All 17 .reveal elements revealed after full scroll | — | ✅ pass | 3s |
| 10 | Already-visible detection works (1200px viewport) | — | ✅ pass | <1s |

## Diagnostics

- **Reveal element count:** `document.querySelectorAll('.reveal').length` → 17
- **Revealed count:** `document.querySelectorAll('.reveal--visible').length` shows how many have animated in
- **Console debug:** Open DevTools, scroll page — look for `[Reveal] Revealed:` messages
- **No-anim elements:** `document.querySelectorAll('.reveal--no-anim').length` shows elements that were visible on load
- **Stagger inspection:** Select an event card in DevTools Elements, check computed `--reveal-delay` value

## Deviations

- Added scroll-event catch-up handler not in original plan — needed because Intersection Observer misses elements during very fast scrolls (e.g., programmatic scrollTo jumps). This is a robustness improvement, not a plan change.

## Known Issues

None.

## Files Created/Modified

- `app.js` — Added revealOnScroll(), applyStaggerDelays(), elLabel(), and scroll catch-up handler (~100 lines)
- `styles.css` — Added .reveal, .reveal--visible, .reveal--no-anim, .reveal-fade, .reveal-slide classes with prefers-reduced-motion support
- `index.html` — Added .reveal and variant classes to 17 content elements (period headers, intros, cards, quote)
- `.gsd/milestones/M001/slices/S02/tasks/T02-PLAN.md` — Added Observability Impact section
