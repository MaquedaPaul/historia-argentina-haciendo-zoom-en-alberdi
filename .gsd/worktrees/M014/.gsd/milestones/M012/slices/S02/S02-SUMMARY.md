---
id: S02
parent: M012
milestone: M012
provides:
  - Browser UAT confirming accordion functional state: 6 collapsed + 1 expanded on load, all 5 DevTools queries pass
  - Fix D1: Removed reveal/reveal-fade from all 7 .sub-period containers → sub-periods visible (opacity:1) on page load
  - Fix D2: max-height bumped from 1000rem to 1500rem → #periodo-rosas content (17719px) fully visible, no clipping
  - Keyboard navigation verified: Tab/Enter/Space/aria-expanded all functional across all 7 triggers
  - Mobile (375px) verified: accordion behavior identical to desktop, single-column card layout confirmed
  - Static diagnostics: both Fase 1 scripts exit 0 post-fix
  - KNOWLEDGE.md updated with two new entries (reveal-on-large-container, 1500rem cap)
requires:
  - slice: S01
    provides: initAccordions() function, CSS accordion rules, ARIA wiring, reveal re-trigger on transitionend, 7 sub-period DOM structure
affects: []
key_files:
  - index.html
  - styles.css
key_decisions:
  - Do NOT add reveal/reveal-fade to section-level containers taller than viewport/threshold — child-level reveal is sufficient and safer
  - 1500rem (24000px) is the correct max-height cap for .sub-period__body given #periodo-rosas scrollHeight of 17719px
patterns_established:
  - When a reveal container is taller than viewport_height/threshold, remove reveal classes from the container and rely on child-level reveal only
  - CSS max-height for accordion bodies should be set to ≥1.4× the largest known content scrollHeight to provide growth headroom
  - Always measure scrollHeight in an expanded browser (not estimated from card counts) before setting max-height
observability_surfaces:
  - "[Accordion] Initialized with 7 sub-periods." in DevTools Console on first frame — primary health signal
  - "document.querySelectorAll('.sub-period').forEach(sp => console.log(sp.id, window.getComputedStyle(sp).opacity))" — all should print "1"
  - "document.querySelector('#periodo-rosas .sub-period__body').scrollHeight" → 17719 (< 24000 cap = no clip)
  - "document.querySelectorAll('.sub-period__body--collapsed .reveal--no-anim').length" → 0 (init order correct)
drill_down_paths:
  - .gsd/milestones/M012/slices/S02/tasks/T01-SUMMARY.md
  - .gsd/milestones/M012/slices/S02/tasks/T02-SUMMARY.md
duration: ~65min (T01: ~45min, T02: ~20min)
verification_result: passed
completed_at: 2026-03-24
---

# S02: Verificación y Pulido

**Removed `reveal reveal-fade` from 7 `.sub-period` containers (permanent opacity:0 fix) and bumped max-height to 1500rem (#periodo-rosas clip fix) — accordion verified fully functional with no regressions in audio, reveal-on-scroll, keyboard navigation, or mobile layout.**

## What Happened

S02 was a two-task verification-and-fix slice. T01 ran the full UAT protocol (static diagnostics + browser DevTools queries + visual checklist for desktop/keyboard/mobile); T02 corrected the two defects T01 found.

### T01 — Diagnóstico estático + Browser UAT

Both Fase 1 static scripts exited 0 — init order correct (`initAccordions()` at line 160 < `revealOnScroll()` at line 164) and all 5 CSS rules present. All 5 DevTools queries on fresh load matched expected values: 6 collapsed bodies, 1 expanded trigger, 7 total triggers, 0 collapsed bodies with `reveal--no-anim`, 7 triggers with `aria-controls`.

Visual inspection uncovered a **critical defect** not catchable by static analysis: all 7 `.sub-period` containers had `reveal reveal-fade` classes in the HTML (a pre-existing condition from before M012). The `revealOnScroll()` IntersectionObserver uses `threshold: 0.15`. For containers measuring 7929–17719px tall, 15% of the element never fits inside an 800px viewport — the intersection never fires, leaving all sub-periods at `opacity: 0`. Headers were invisible and unclickable without a manual workaround.

A **medium defect** was also found: `#periodo-rosas .sub-period__body.scrollHeight` = 17719px, exceeding the `1000rem` (16000px) max-height cap set by S01. ~1719px of content was clipped when that sub-period was expanded.

The keyboard checklist passed cleanly: Tab focuses all 7 triggers (`tabindex="0"` confirmed), Enter and Space both toggle with correct `aria-expanded` updates, Space produces no page scroll. Mobile at 375px showed identical behavior.

One pre-existing issue noted but explicitly out of scope: the `.sub-nav`'s `position: sticky` is ineffective because its ancestor `<section class="period">` has `overflow: hidden`, which breaks sticky outside the section's scrollport. This predates M012 and was not regressed by it.

### T02 — Fixes

**Fix D1 (critical):** Removed `reveal reveal-fade` from all 7 `div.sub-period` elements in `index.html` (lines 346, 737, 1206, 1342, 1446, 2113, 2283). The individual cards, titles, and blockquotes inside each sub-period already carry their own `reveal` classes and animate correctly through the IntersectionObserver — the container-level reveal was redundant and broken. Post-fix: all 7 sub-period containers show `opacity: 1`.

**Fix D2 (medium):** Changed `.sub-period__body` `max-height` from `1000rem` to `1500rem` (24000px) in `styles.css` line 2004. Post-fix: `#periodo-rosas` scrollHeight of 17719px is fully contained within the 24000px cap. `offsetHeight` = 17695px (24px rounding difference is normal).

No changes to `app.js` were required — accordion logic, event delegation, ARIA management, and reveal re-trigger on `transitionend` were all correct from S01.

## Verification

**Fase 1 — Static diagnostics (both exit 0 post-fix):**
- Init order: `initAccordions` at line 160 < `revealOnScroll` at line 164 ✅
- CSS rules: `sub-period__body--collapsed` ✅ · `sub-period__title--trigger` ✅ · `1500rem` ✅ · `prefers-reduced-motion` ✅ · `aria-expanded` ✅

**Fase 2 — DevTools queries (all pass post-fix):**

| Query | Expected | Got |
|-------|----------|-----|
| `.sub-period__body--collapsed` | 6 | **6** ✅ |
| `.sub-period__title--trigger[aria-expanded="true"]` | 1 | **1** ✅ |
| `.sub-period__title--trigger` | 7 | **7** ✅ |
| `.sub-period__body--collapsed .reveal--no-anim` | 0 | **0** ✅ |
| `.sub-period__title--trigger[aria-controls]` | 7 | **7** ✅ |

**D1 post-fix:** All 7 `.sub-period` elements `opacity === "1"` ✅  
**D2 post-fix:** `scrollHeight` 17719 < cap 24000px ✅  
**app.js syntax:** `node -e "require('./app.js')"` → ReferenceError (expected, not SyntaxError) ✅

## New Requirements Surfaced

- none

## Deviations

- The S02-PLAN's Fase 1 static check verified `'1000rem'` as the CSS presence check. After the D2 fix, the check was updated to verify `'1500rem'` — reflecting the new cap. The spirit of the check (a generous max-height is set) was preserved.
- The S02-PLAN DevTools query comment `// → debe ser < 16000` for `#periodo-rosas` scrollHeight is now obsolete. The correct threshold post-fix is `< 24000`. The scrollHeight of 17719px is intrinsic content — only the cap changed.
- Visual checklist desktop items were completed by temporarily adding `reveal--no-anim` manually to sub-periods (before T02's fix) — this allowed the remaining checklist items (accordion toggle, audio, sub-nav, reveal-on-scroll) to be verified independently of the D1 defect.

## Known Limitations

- Sub-nav `position: sticky` does not adhere to the document scrollport — the parent `<section class="period">` has `overflow: hidden`, which confines sticky behavior to the section's local scroll context. This is a pre-existing issue from before M012 (present in commit e131d67). Not a regression; not in scope for M012.
- The `.sub-nav` does correctly highlight the active sub-period via IntersectionObserver (confirmed in T01: `[SubNav] Active sub-period →` appears in console). The limitation is purely visual stickiness, not the active-state logic.

## Follow-ups

- Sub-nav sticky fix (overflow:hidden on ancestor) could be addressed in a future milestone if the product owner prioritizes it. The fix would require removing or replacing `overflow: hidden` on `<section class="period">`, which may affect other layout properties (parallax, card overflow) and warrants its own investigation.
- If `#periodo-rosas` content grows beyond ~23000px (very unlikely without adding many new cards), the `1500rem` cap would need another bump. The knowledge entry documents the measurement protocol.

## Files Created/Modified

- `index.html` — Removed `reveal reveal-fade` classes from 7 `.sub-period` div containers (T02, Fix D1)
- `styles.css` — Changed `.sub-period__body` max-height from `1000rem` to `1500rem` (T02, Fix D2, line 2004)
- `.gsd/milestones/M012/slices/S02/tasks/T01-SUMMARY.md` — UAT results and defect documentation
- `.gsd/milestones/M012/slices/S02/tasks/T02-SUMMARY.md` — Fix documentation and post-fix verification
- `.gsd/KNOWLEDGE.md` — Two new entries added: "reveal reveal-fade on Large Section Containers" and "#periodo-rosas Sub-period Exceeds 1000rem"
- `.gsd/milestones/M012/slices/S02/S02-SUMMARY.md` — this file
- `.gsd/milestones/M012/slices/S02/S02-UAT.md` — UAT script

## Forward Intelligence

### What the next slice should know
- M012 is complete. The accordion system is fully functional: 6 collapsed + 1 expanded on load, smooth 0.45s CSS transitions, correct ARIA, keyboard navigable, mobile-identical behavior.
- The `.sub-period` containers are now bare (`class="sub-period"`) — no reveal classes. Any future slice that adds new sub-period containers must NOT add `reveal reveal-fade` to the container div. Child elements (cards, titles, alberdi-quote blocks) should carry their own `reveal` classes individually.
- The `max-height: 1500rem` cap on `.sub-period__body` is sufficient for current content. The formula is `1.4× largest_scrollHeight`. If content is added that grows a sub-period beyond ~23000px, bump the cap.

### What's fragile
- The `transitionend` re-trigger for reveal-on-scroll is a `{ once: true }` listener attached inside the toggle handler. It fires once per expand cycle. If accordion expand behavior is modified (e.g., new transitions added), verify the listener timing still works — `transitionend` fires after the last transition property completes, so if a new property has a longer duration, the re-trigger would be delayed accordingly.
- Sub-nav IntersectionObserver is scoped to `.sub-period` elements inside `#periodo-revolucion`. If sub-periods are ever added to other period sections, the observer must be updated to include them.

### Authoritative diagnostics
- `[Accordion] Initialized with N sub-periods.` in DevTools Console — canonical health signal; if absent, `initAccordions()` did not run.
- `document.querySelectorAll('.sub-period__body--collapsed .reveal--no-anim').length` → 0 means init order is correct; >0 means accordions ran after revealOnScroll.
- `Array.from(document.querySelectorAll('.sub-period')).map(sp => ({id: sp.id, opacity: window.getComputedStyle(sp).opacity}))` — all should show `"1"` after the D1 fix.

### What assumptions changed
- S01's estimate of `35 cards × 400px / 16 = 875rem` for `#periodo-rosas` was optimistic. Actual measured scrollHeight is 17719px (≈1107rem) — 27% higher than the estimate. Card height estimates are unreliable for dense sub-periods with blockquotes, images, and multi-section headers. Always measure `scrollHeight` in browser after expanding.
- The S02-PLAN assumed a `risk:low` slice. D1 (the reveal-on-container opacity bug) was a critical defect that would have left the entire accordion invisible to users — higher impact than anticipated, though the fix itself was straightforward.
