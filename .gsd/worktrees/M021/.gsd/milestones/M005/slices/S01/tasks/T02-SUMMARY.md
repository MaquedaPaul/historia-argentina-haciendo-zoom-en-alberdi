---
id: T02
parent: S01
milestone: M005
provides:
  - WCAG 2.5.5 compliant touch targets (≥44px) for .card-expand-toggle, .nav-link, .hamburger-toggle, and .timeline-point at all relevant breakpoints
  - Clean typography scaling at 320px with no heading overflow or text below 12px
key_files:
  - styles.css
key_decisions:
  - Added min-height:44px to .card-expand-toggle inside new @media (max-width:48rem) block rather than only at 30rem — applies the fix at all mobile widths as the plan specified
  - Added min-height:44px to .timeline-point in its base styles (not a media query) since the aside is already hidden below 48rem and the fix is needed at 1024px+
patterns_established:
  - Touch target enforcement pattern: add min-height:44px + display:flex + align-items:center to any interactive element that lacks a guaranteed height
observability_surfaces:
  - DOM query for failures: [...document.querySelectorAll('.card-expand-toggle, .nav-link, .hamburger-toggle')].filter(el => el.offsetHeight < 44) — returns empty array when all targets meet WCAG minimum
  - Overflow check: document.documentElement.scrollWidth > document.documentElement.clientWidth — returns false at 320px (no horizontal overflow)
duration: 20m
verification_result: passed
completed_at: 2026-03-19
blocker_discovered: false
---

# T02: Fix touch targets and mobile typography

**Added WCAG 2.5.5 compliant min-height:44px to card expand toggles, nav links, and timeline points; confirmed typography floors prevent overflow at 320px.**

## What Happened

Three CSS changes were made to `styles.css`:

1. **`.card-expand-toggle` at ≤48rem** — Added a new `@media (max-width: 48rem)` block with `min-height: 44px; display: flex; align-items: center;`. The base styles already had `display: flex; align-items: center;`, so the media block reinforces that and adds the height floor.

2. **`.nav-link` at ≤30rem** — Added `min-height: 44px` to the existing `.nav-link` rule in the `@media (max-width: 30rem)` block. The nav links switch to a horizontal row layout here with `display: flex; align-items: center;` already in place; only the height minimum was missing.

3. **`.timeline-point` base styles** — Added `min-height: 44px` directly to the base `.timeline-point` rule (not behind a media query), since the aside is already hidden at ≤48rem and the target is desktop (1024px+). This also applies globally, which is fine.

Typography audit:
- `.header-title`: `clamp(2.2rem, 5vw, 3.8rem)` — floor `2.2rem` = 35.2px at 320px. ✅ No change needed.
- `.period-title`: `clamp(1.8rem, 3.5vw, 2.8rem)` — floor `1.8rem` = 28.8px at 320px. ✅ The plan suggested lowering to 1.6rem but 1.8rem already provides a better floor; no change made.
- `.card-source cite`: `0.78rem` = 12.48px ≥ 12px minimum. ✅ No change needed.
- No heading overflow detected at 320px via `scrollWidth > clientWidth` check on all h1/h2/h3/.period-title elements.

Pre-flight fix also applied: added two failure-path diagnostic checks to S01-PLAN.md Verification section (overflow boolean check and touch-target filter command).

## Verification

Verified at 320px viewport via `browser_evaluate`:
- All 4 `.card-expand-toggle` elements: `offsetHeight = 44` (all ≥44px) ✅
- All 3 `.nav-link` elements: `offsetHeight = 44` (all ≥44px) ✅
- `.hamburger-toggle`: `offsetHeight = 44` ✅
- No failing touch targets: `[...document.querySelectorAll('.card-expand-toggle, .nav-link, .hamburger-toggle')].filter(el => el.offsetHeight < 44)` → empty array ✅
- No horizontal overflow: `document.documentElement.scrollWidth > document.documentElement.clientWidth` → `false` ✅
- No heading text overflow at 320px ✅
- `.header-title` computed: 35.2px, `.period-title` min: 28.8px, `.card-source cite` min: 12.48px ✅

At 768px: hamburger hidden, no overflow ✅
At 1280px: hamburger hidden, timeline-aside visible, `.timeline-point` min height = 44px ✅

Slice verification DOM checks:
- `document.querySelector('.hamburger-toggle')` exists with `aria-expanded="false"` ✅
- `document.querySelectorAll('.reveal').length` = 52 (no regression) ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `[...document.querySelectorAll('.card-expand-toggle')].map(el => el.offsetHeight)` at 320px | — | ✅ [44,44,44,44] | <1s |
| 2 | `[...document.querySelectorAll('.nav-link')].map(el => el.offsetHeight)` at 320px | — | ✅ [44,44,44] | <1s |
| 3 | `document.documentElement.scrollWidth > document.documentElement.clientWidth` at 320px | — | ✅ false | <1s |
| 4 | Touch target filter at 320px | — | ✅ empty array | <1s |
| 5 | `.timeline-point` min offsetHeight at 1280px | — | ✅ 44px | <1s |
| 6 | `.reveal` count | — | ✅ 52 (no regression) | <1s |
| 7 | Hamburger aria-expanded default | — | ✅ "false" | <1s |

## Diagnostics

- **Touch target check:** `[...document.querySelectorAll('.card-expand-toggle, .nav-link, .hamburger-toggle')].filter(el => el.offsetHeight < 44)` — must return empty array at 320px viewport; any items indicate WCAG violations.
- **Overflow check:** `document.documentElement.scrollWidth > document.documentElement.clientWidth` — must return `false` at 320px; `true` means horizontal overflow exists.
- **Typography check:** `parseFloat(getComputedStyle(document.querySelector('.period-title')).fontSize)` — must be ≥25.6 (1.6rem) at any viewport.

## Deviations

- **`.period-title` clamp floor not lowered:** The plan said "Adjust floor to 1.6rem minimum" but the current floor is already `1.8rem` (28.8px) which is better than 1.6rem. Lowering it would weaken the protection. No change made; the typography is already within spec.
- **`.timeline-point` fix applied in base styles** rather than a media query, since the fix is primarily for 1024px+ (desktop) and the element is already hidden at ≤48rem. This is cleaner and broader.

## Known Issues

None.

## Files Created/Modified

- `styles.css` — Added `@media (max-width: 48rem)` block for `.card-expand-toggle` min-height; added `min-height: 44px` to `.nav-link` at ≤30rem and to `.timeline-point` base styles
- `.gsd/milestones/M005/slices/S01/S01-PLAN.md` — Added two failure-path diagnostic checks to the Verification section (pre-flight fix)
