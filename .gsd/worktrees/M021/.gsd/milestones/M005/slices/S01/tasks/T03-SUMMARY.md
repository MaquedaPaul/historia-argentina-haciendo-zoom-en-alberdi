---
id: T03
parent: S01
milestone: M005
provides:
  - Zero horizontal overflow confirmed at all 5 breakpoints (320px, 375px, 768px, 1024px, 1280px)
  - Correct grid column counts at each breakpoint (1/1/2/2/3)
  - Fixed grid-template-columns override to use max-width:40rem instead of 48rem, enabling 2-column layout at 768px
  - Reduced .events-grid--certeza minmax minimum from 22rem to 20rem to allow 2 columns at 768px with standard gap
  - Sub-nav horizontal scroll functional at ≤640px
  - All 3 period timelines (colonial, revolucion, nacional) fit within viewport at 320px
key_files:
  - styles.css
key_decisions:
  - Grid single-column override moved from max-width:48rem to max-width:40rem — enables 2 columns at 768px (the exact 48rem boundary was catching 768px)
  - .events-grid--certeza minmax min changed from 22rem to 20rem — 22rem with 32px gap required 736px for 2 columns, exceeding the 720px available at 768px; 20rem requires only 672px
patterns_established:
  - When using auto-fill with minmax and gap, account for gap in column-fit calculation: N_cols × min_width + (N_cols-1) × gap must be ≤ container width
  - At exact breakpoint boundaries (768px = 48rem), max-width media queries ARE inclusive — always test at the exact boundary pixel value
observability_surfaces:
  - Overflow check: document.documentElement.scrollWidth > document.documentElement.clientWidth — must return false at all viewports
  - Grid column check: getComputedStyle(document.querySelector('.events-grid')).gridTemplateColumns.split(' ').length — expect 1/1/2/2/3 at 320/375/768/1024/1280px
  - Touch target check: [...document.querySelectorAll('.card-expand-toggle, .nav-link, .hamburger-toggle')].filter(el => el.offsetHeight < 44)
duration: 30m
verification_result: passed
completed_at: 2026-03-19
blocker_discovered: false
---

# T03: Responsive audit and overflow fix across all breakpoints

**Audited all 5 target viewports and fixed single-column grid lock at 768px by moving the grid override from max-width:48rem to 40rem and reducing certeza card minmax from 22rem to 20rem.**

## What Happened

Systematic browser audit at 320px, 375px, 768px, 1024px, 1280px revealed one layout issue: the grid was showing **1 column at 768px** instead of the required 2 columns.

**Root cause investigation:** The `@media (max-width: 48rem)` block previously contained `grid-template-columns: 1fr` for both `.events-grid` and `.events-grid--certeza`. At 768px (= exactly 48rem), this rule was active and overriding the auto-fill layout. Additionally, even after removing the override, the certeza grid's base rule `minmax(min(100%, 22rem), 1fr)` with `gap: 32px` could not fit 2 columns at 720px (`2 × 352 + 32 = 736 > 720`).

**Two fixes applied to `styles.css`:**

1. **Moved single-column grid override from `@media (max-width: 48rem)` to `@media (max-width: 40rem)`** — removed `grid-template-columns: 1fr` from both the main layout `@media (max-width: 48rem)` block and the certeza cards block, added a new `@media (max-width: 40rem)` section that sets both grids to `1fr`. This ensures at 768px and above, auto-fill determines column count.

2. **Reduced `.events-grid--certeza` minmax minimum from `22rem` to `20rem`** — at 768px, container width ≈ 720px, gap = 32px. With 20rem (320px): `2 × 320 + 32 = 672 < 720` → 2 columns fit. With 22rem (352px): `2 × 352 + 32 = 736 > 720` → only 1 column fits. The card minimum width remains generous for certeza cards.

**All other breakpoints passed without changes:** 320px and 375px showed no overflow, correct 1-column layout, hamburger visible, all touch targets ≥44px. 1024px showed 2 columns and timeline-aside visible. 1280px showed 3 columns, timeline-aside visible, no overflow.

## Verification

Verified at all 5 breakpoints after fix:

**320px:**
- No horizontal overflow: `scrollWidth=305, clientWidth=305` ✅
- Grid: 1 column ✅
- Hamburger visible (`display: flex`), `aria-expanded="false"` ✅
- Timeline-aside hidden ✅
- Touch target failures: 0 ✅
- Reveal count: 52 ✅
- All 3 timelines (colonial, revolucion, nacional) within viewport ✅
- Timeline labels don't overflow at 320px ✅
- Sub-nav `overflow-x: auto` applied ✅

**375px:**
- No horizontal overflow ✅
- Grid: 1 column ✅
- Hamburger visible ✅
- Sub-nav `overflow-x: auto` ✅
- Touch target failures: 0 ✅

**768px:**
- No horizontal overflow (`scrollWidth=753`) ✅
- Grid: 2 columns (`344.4px 344.4px`) ✅
- Hamburger hidden (`display: none`) ✅
- Timeline-aside hidden (≤48rem boundary) ✅

**1024px:**
- No horizontal overflow ✅
- Grid: 2 columns ✅
- Hamburger hidden ✅
- Timeline-aside visible (`display: block`) ✅

**1280px:**
- No horizontal overflow ✅
- Grid: 3 columns (`352px 352px 352px`) ✅
- Hamburger hidden ✅
- Timeline-aside visible ✅
- Reveal count: 52 (no regression) ✅

**Slice-level DOM checks:**
- `document.querySelector('.hamburger-toggle')` exists with `aria-expanded="false"` ✅
- `document.querySelectorAll('.reveal').length` = 52 ✅
- `document.documentElement.scrollWidth > document.documentElement.clientWidth` = `false` at 320px ✅
- Touch target filter at 320px returns empty array ✅

**Hamburger interaction test:** Click opens nav (aria-expanded="true", nav-list--open class, max-height:192px). Click again closes (aria-expanded="false") ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | Overflow check at 320px: `scrollWidth > clientWidth` | — | ✅ false | <1s |
| 2 | Grid columns at 320px | — | ✅ 1 column | <1s |
| 3 | Touch target filter at 320px | — | ✅ empty array | <1s |
| 4 | Reveal count | — | ✅ 52 | <1s |
| 5 | Overflow check at 375px | — | ✅ false | <1s |
| 6 | Sub-nav overflow-x at 375px | — | ✅ auto | <1s |
| 7 | Grid columns at 768px | — | ✅ 2 columns | <1s |
| 8 | Hamburger hidden at 768px | — | ✅ display:none | <1s |
| 9 | Overflow check at 768px | — | ✅ false | <1s |
| 10 | Grid columns at 1024px | — | ✅ 2 columns | <1s |
| 11 | Timeline-aside at 1024px | — | ✅ display:block | <1s |
| 12 | Grid columns at 1280px | — | ✅ 3 columns | <1s |
| 13 | Overflow check at 1280px | — | ✅ false | <1s |
| 14 | Hamburger aria-expanded default | — | ✅ "false" | <1s |
| 15 | No JS errors | — | ✅ 0 errors | <1s |
| 16 | No failed network requests | — | ✅ 0 failures | <1s |
| 17 | Timeline labels overflow check at 320px | — | ✅ none overflow | <1s |

## Diagnostics

- **Overflow diagnostic:** `document.documentElement.scrollWidth > document.documentElement.clientWidth` — returns `false` when OK, `true` on failure.
- **Grid column count:** `getComputedStyle(document.querySelector('.events-grid')).gridTemplateColumns.split(' ').length` — expect 1 at ≤640px, 2 at 768px–1024px, 3 at 1280px.
- **Touch target check:** `[...document.querySelectorAll('.card-expand-toggle, .nav-link, .hamburger-toggle')].filter(el => el.offsetHeight < 44)` — empty array = pass.
- **Hamburger state:** `.hamburger-toggle[aria-expanded]` attribute — `"false"` = closed, `"true"` = open.
- **Sub-nav scroll:** `document.querySelector('.sub-nav').scrollWidth > document.querySelector('.sub-nav').clientWidth` — true when content overflows and scrolling is needed.

## Deviations

- **Grid breakpoint changed from 48rem to 40rem for single-column override:** The plan mentioned "Fix any issues found" — the 768px 2-column failure was found and fixed with this breakpoint adjustment. This is not a plan deviation, it's the explicit fix step.
- **`.events-grid--certeza` minmax reduced from 22rem to 20rem:** The previous value physically prevented 2 columns at 768px due to gap arithmetic (`2 × 352 + 32 = 736 > 720px`). Reducing to 20rem allows 2 columns while still providing a generous card minimum width.

## Known Issues

None. All 5 breakpoints pass all verification checks.

## Files Created/Modified

- `styles.css` — (1) Removed `grid-template-columns: 1fr` from `@media (max-width: 48rem)` block; (2) Added `@media (max-width: 40rem)` block setting both grids to 1fr; (3) Changed `.events-grid--certeza` minmax from `22rem` to `20rem`
