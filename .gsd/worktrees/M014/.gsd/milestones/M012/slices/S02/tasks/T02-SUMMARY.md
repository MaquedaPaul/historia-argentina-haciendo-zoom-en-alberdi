---
id: T02
parent: S02
milestone: M012
provides:
  - Fix D1: Removed reveal/reveal-fade classes from all 7 .sub-period containers in index.html — sub-periods now visible (opacity:1) without requiring IntersectionObserver to fire on 8000-17000px-tall elements
  - Fix D2: Changed max-height from 1000rem (16000px) to 1500rem (24000px) in .sub-period__body in styles.css — #periodo-rosas content (17719px) no longer clipped
  - Post-fix browser UAT: all 5 DevTools queries pass, accordion expand/collapse confirmed functional, no new regressions
key_files:
  - index.html
  - styles.css
key_decisions:
  - Removing reveal/reveal-fade from .sub-period containers is safe because the individual cards inside each sub-period already carry their own reveal classes — the container itself doesn't need to be a reveal unit, and a 15% intersection threshold on an 8000-17000px element can never fire in a 800px viewport
  - 1500rem (24000px) as max-height cap is generous enough for any reasonable sub-period content growth and still allows smooth CSS height transitions
patterns_established:
  - When a reveal element is too tall for its IntersectionObserver threshold to fire (element height > viewport / threshold), remove the reveal class from the container and rely on child-level reveal only
  - CSS max-height for accordion bodies should be set 1.4× the largest known content height to provide growth headroom
observability_surfaces:
  - "document.querySelectorAll('.sub-period').forEach(sp => console.log(sp.id, window.getComputedStyle(sp).opacity))" — all should show "1" post-fix
  - "document.querySelector('#periodo-rosas .sub-period__body').scrollHeight" — 17719 < 24000 confirms no clipping
  - "[Accordion] Initialized with 7 sub-periods." in console — accordion system unaffected by either fix
duration: ~20min
verification_result: passed
completed_at: 2026-03-24
blocker_discovered: false
---

# T02: Corregir regresiones encontradas en T01

**Removed `reveal reveal-fade` from 7 `.sub-period` containers and bumped `.sub-period__body` max-height from 1000rem to 1500rem, closing both defects from T01 with no new regressions.**

## What Happened

T01 reported 2 defects:

- **D1 (critical):** All 7 `.sub-period` containers had `reveal reveal-fade` classes, making them `opacity: 0` permanently because the IntersectionObserver `threshold: 0.15` can never fire on elements 8000–17000px tall in a viewport of 800px (15% of 8000px = 1200px — more than the full viewport height).
- **D2 (medium):** `#periodo-rosas .sub-period__body` had `max-height: 1000rem` (16000px) but its scrollHeight is 17719px — clipping ~1719px of content.

### Fix applied for D1

Removed `reveal reveal-fade` from all 7 `div.sub-period` elements in `index.html` (lines 346, 737, 1206, 1342, 1446, 2113, 2283). The sub-period containers go from `class="sub-period reveal reveal-fade"` to simply `class="sub-period"`. The individual cards inside each sub-period already carry their own `reveal` classes and are handled correctly by the IntersectionObserver — only the container-level reveal was broken.

### Fix applied for D2

Changed line 2004 of `styles.css` from:
```css
max-height: 1000rem; /* generous cap — largest sub-period (período-rosas) has ~35 cards */
```
to:
```css
max-height: 1500rem; /* generous cap — largest sub-period (período-rosas) has ~17719px; 1500rem=24000px covers it */
```

### No changes to app.js

Accordion logic (event delegation, aria-expanded toggling, reveal re-trigger on transitionend) was verified working correctly — no code changes required.

## Verification

**Fase 1 — Static diagnostic (both exit 0 post-fix):**

```bash
# Init order: PASS: initAccordions at line 160 < revealOnScroll at line 164
node -e "..." → exit 0

# CSS rules (updated for 1500rem): 5/5 PASS
node -e "..." → exit 0
```

**T02 verification commands (from task plan):**

```bash
# CSS critical rules still present — exit 0
node -e "..." checks: sub-period__body--collapsed ✅, sub-period__title--trigger ✅, prefers-reduced-motion ✅

# app.js syntax — ReferenceError (expected, not SyntaxError) → parse OK
node -e "require('./app.js')" → ReferenceError: document is not defined ✅
```

**Browser UAT post-fix (all pass):**

| Query | Expected | Got |
|-------|----------|-----|
| `.sub-period__body--collapsed` length | 6 | **6** ✅ |
| `.sub-period__title--trigger[aria-expanded="true"]` | 1 | **1** ✅ |
| `.sub-period__title--trigger` | 7 | **7** ✅ |
| `.sub-period__body--collapsed .reveal--no-anim` | 0 | **0** ✅ |
| `.sub-period__title--trigger[aria-controls]` | 7 | **7** ✅ |

**D1 verification:** `window.getComputedStyle(sp).opacity === "1"` for all 7 `.sub-period` elements — confirmed.

**D2 verification:** `document.querySelector('#periodo-rosas .sub-period__body').scrollHeight` = **17719** < maxHeight cap **24000px** (1500rem) — no clipping confirmed. offsetHeight = 17695px (24px diff is normal fractional-pixel layout rounding).

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `node -e "...initAccordions order check..."` | 0 | ✅ PASS | ~200ms |
| 2 | `node -e "...CSS rules check (5 rules incl 1500rem)..."` | 0 | ✅ PASS | ~200ms |
| 3 | `node -e "...T02 CSS critical rules..."` | 0 | ✅ PASS | ~200ms |
| 4 | `node -e "require('./app.js')"` | ReferenceError (expected) | ✅ PASS | ~200ms |
| 5 | DevTools: `.sub-period__body--collapsed` → 6 | — | ✅ PASS | — |
| 6 | DevTools: `.sub-period__title--trigger[aria-expanded="true"]` → 1 | — | ✅ PASS | — |
| 7 | DevTools: `.sub-period__title--trigger` → 7 | — | ✅ PASS | — |
| 8 | DevTools: `.sub-period__body--collapsed .reveal--no-anim` → 0 | — | ✅ PASS | — |
| 9 | DevTools: `.sub-period__title--trigger[aria-controls]` → 7 | — | ✅ PASS | — |
| 10 | D1: all 7 `.sub-period` opacity=1, hasReveal=false | — | ✅ PASS | — |
| 11 | D2: `#periodo-rosas` scrollHeight 17719 < cap 24000 | — | ✅ PASS | — |
| 12 | Visual: sub-period headers visible, expanded card content visible | — | ✅ PASS | — |

## Diagnostics

- **Check D1 healed:** `document.querySelectorAll('.sub-period').forEach(sp => console.log(sp.id, window.getComputedStyle(sp).opacity))` — should all print `"1"`
- **Check D2 healed:** `document.querySelector('#periodo-rosas .sub-period__body').scrollHeight` → `17719` (< 24000px cap → no clip)
- **Check accordion health:** `[Accordion] Initialized with 7 sub-periods.` in DevTools Console on page load
- **IntersectionObserver gotcha:** If a future sub-period grows taller than 24000px, bump max-height further. If a reveal container grows taller than `viewport_height / threshold`, it will never auto-reveal — move reveal to child level.

## Deviations

- The S02-PLAN Verification script checks for `'1000rem'` as a CSS presence test. After applying the D2 fix (`1000rem` → `1500rem`), this verbatim check would fail. The intent of the check is to confirm a generous max-height is set. T02 ran an updated version of the script that checks for `'1500rem'` instead, which passes correctly.
- `document.querySelector('#periodo-rosas .sub-period__body').scrollHeight` returned `17719` (previously documented in T01 as 17719), which exceeds the S02-PLAN's DevTools comment of `// → debe ser < 16000`. The correct target post-fix is `< 24000` (the new 1500rem cap). The content scrollHeight of 17719px is intrinsic and unchanged — only the cap was raised.

## Known Issues

- Sub-nav `position: sticky` still non-functional (pre-existing, not a M012 regression) — the parent `<section class="period">` has `overflow: hidden` which prevents sticky from working outside the section's scrollport. Out of scope for this milestone.

## Files Created/Modified

- `index.html` — Removed `reveal reveal-fade` classes from all 7 `.sub-period` div containers (lines 346, 737, 1206, 1342, 1446, 2113, 2283)
- `styles.css` — Changed `.sub-period__body` max-height from `1000rem` to `1500rem` (line 2004)
- `.gsd/milestones/M012/slices/S02/tasks/T02-SUMMARY.md` — this file
