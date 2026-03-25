---
id: T02
parent: S01
milestone: M012
provides:
  - initAccordions() function in app.js — wraps sub-period content in .sub-period__body, sets initial state, makes h3 triggers accessible, handles click+keyboard toggle, re-triggers reveal-on-scroll post-expand
key_files:
  - app.js
key_decisions:
  - Inserted initAccordions() call at line 160, before revealOnScroll() at line 164 — guarantees collapsed sub-periods have max-height:0 when IntersectionObserver initializes, preventing premature reveal--no-anim on hidden elements
  - Used event delegation on #periodo-revolucion (single listener) rather than per-trigger listeners, consistent with initExpandCollapse() pattern
  - Used { once: true } on transitionend listener to avoid accumulating listeners on repeated expand/collapse cycles
patterns_established:
  - initAccordions() follows same JSDoc + ACCORDION_PREFIX logging convention as initAmbientSound() ([Sound]) and initExpandCollapse() ([Expand])
  - triggerRevealInBody() uses getBoundingClientRect() viewport check rather than re-observing via IntersectionObserver — simpler and synchronous post-transition
observability_surfaces:
  - "[Accordion] Initialized with N sub-periods." logged at init — confirm N=7 in DevTools Console
  - "[Accordion] Collapsed/Expanded: <id>" logged on each toggle
  - "document.querySelectorAll('.sub-period__body--collapsed').length" → count collapsed (expected 6 on load)
  - "document.querySelectorAll('.sub-period__title--trigger[aria-expanded=\"true\"]').length" → count expanded (expected 1 on load)
  - "document.querySelectorAll('.sub-period__body--collapsed .reveal--no-anim').length" → 0 expected; >0 means initAccordions() ran after revealOnScroll()
duration: ~15min
verification_result: passed
completed_at: 2026-03-24
blocker_discovered: false
---

# T02: Implementar `initAccordions()` en app.js y conectarlo al pipeline de init

**Added `initAccordions()` to app.js (118 lines) before `revealOnScroll()` in the init pipeline — wraps all 7 sub-period bodies in `.sub-period__body` divs, collapses 6 of them, adds ARIA attributes, and handles click+keyboard toggle with post-expand reveal re-trigger.**

## What Happened

Located the two insertion points in `app.js`:
1. **Call site** (line 160): added `initAccordions()` call with comment block immediately before the existing `revealOnScroll()` call at line 164.
2. **Function body** (lines 419–537): inserted the complete `initAccordions()` function (with JSDoc) between the closing `}` of `initExpandCollapse()` and the JSDoc of `initAmbientSound()` — consistent with how other init functions are organized in the file.

The function:
- Queries `#periodo-revolucion .sub-period` (finds 7 elements)
- For each: creates a `div.sub-period__body` wrapper, moves all children after the h3 trigger into it, adds `role="button"`, `tabindex="0"`, `aria-expanded`, `aria-controls` to the trigger, and adds `.sub-period__title--trigger` class
- Sets index 0 as expanded (aria-expanded="true"), all others as collapsed (aria-expanded="false" + `.sub-period__body--collapsed`)
- Attaches a single click listener and a single keydown listener (Enter/Space) to `#periodo-revolucion` via event delegation
- On expand: removes collapsed class, sets aria-expanded="true", then adds a `{ once: true }` transitionend listener on the body that calls `triggerRevealInBody()` to force `.reveal--visible` on any in-viewport elements that haven't been revealed yet

Also updated S01-PLAN.md:
- Marked T02 `[x]` done
- Added explicit failure-path diagnostic check to the Verification section (pre-flight item: init order check via node one-liner, and DevTools query for premature `reveal--no-anim`)

## Verification

Ran the T02 node verification script — all 10 checks passed in <1s. Ran all 6 slice-level bash checks — all passed.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `node -e ... 'initAccordions defined'` | 0 | ✅ pass | <1s |
| 2 | `node -e ... 'initAccordions called'` | 0 | ✅ pass | <1s |
| 3 | `node -e ... 'initAccordions before revealOnScroll'` | 0 | ✅ pass | <1s |
| 4 | `node -e ... 'sub-period__body wrapper created'` | 0 | ✅ pass | <1s |
| 5 | `node -e ... 'aria-expanded managed'` | 0 | ✅ pass | <1s |
| 6 | `node -e ... 'keyboard Enter/Space'` | 0 | ✅ pass | <1s |
| 7 | `node -e ... 'transitionend re-reveal'` | 0 | ✅ pass | <1s |
| 8 | `node -e ... 'ACCORDION prefix logging'` | 0 | ✅ pass | <1s |
| 9 | `node -e ... 'warn on missing sub-periods'` | 0 | ✅ pass | <1s |
| 10 | `node -e ... 'once:true on transitionend'` | 0 | ✅ pass | <1s |
| 11 | `grep -q 'sub-period__body--collapsed' styles.css` | 0 | ✅ pass | <1s |
| 12 | `grep -q 'sub-period__title--trigger' styles.css` | 0 | ✅ pass | <1s |
| 13 | `grep -q 'prefers-reduced-motion' styles.css` | 0 | ✅ pass | <1s |
| 14 | `grep -q '1000rem' styles.css` | 0 | ✅ pass | <1s |
| 15 | `grep -q '\[aria-expanded="true"\]' styles.css` | 0 | ✅ pass | <1s |
| 16 | `grep -q 'initAccordions' app.js` | 0 | ✅ pass | <1s |

## Diagnostics

- **Init order**: `grep -n 'initAccordions()\|revealOnScroll()' app.js` → 160 and 164 respectively — correct.
- **[Accordion] log on load**: Open DevTools Console when page loads → expect `[Accordion] Initialized with 7 sub-periods.` followed by 6× `Initially collapsed: <id>` and 1× `Initially expanded: rev-alberdi-formacion`.
- **Collapsed count**: `document.querySelectorAll('.sub-period__body--collapsed').length` → 6 on initial load.
- **Expanded count**: `document.querySelectorAll('.sub-period__title--trigger[aria-expanded="true"]').length` → 1 on initial load.
- **Wrong-order failure**: `document.querySelectorAll('.sub-period__body--collapsed .reveal--no-anim').length` → must be 0; any value >0 means init order was wrong.
- **Role check**: `document.querySelectorAll('.sub-period__title[role="button"]').length` → 7 (all triggers made interactive).

## Deviations

None. The function was implemented exactly as specified in T02-PLAN.md. The plan's code sample was copied verbatim; no structural changes were needed.

## Known Issues

None. The `{ once: true }` option on `addEventListener` is supported in all modern browsers (no IE11 concern as the rest of the codebase uses `querySelectorAll` and `closest` without polyfills). The `triggerRevealInBody()` approach covers elements visible immediately after expand; elements that require scrolling will be handled by the existing IntersectionObserver in `revealOnScroll()` as they enter the viewport normally.

## Files Created/Modified

- `app.js` — Added `initAccordions()` function (~118 lines with JSDoc) and its call in the init pipeline before `revealOnScroll()`. File grew from 810 to 940 lines.
- `.gsd/milestones/M012/slices/S01/S01-PLAN.md` — Marked T02 `[x]` done; added failure-path diagnostic verification block to the Verification section.
