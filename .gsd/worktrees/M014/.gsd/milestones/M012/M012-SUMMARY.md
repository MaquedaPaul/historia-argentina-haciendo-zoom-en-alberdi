---
id: M012
provides:
  - CSS accordion rules for .sub-period__body (max-height 0→1500rem + opacity transition, 0.45s cubic-bezier, reduced-motion block, chevron via ::after, focus-visible outline)
  - initAccordions() in app.js — dynamic .sub-period__body wrapper creation, ARIA attrs (role=button, tabindex=0, aria-expanded, aria-controls), event delegation click+keydown Enter/Space, { once: true } transitionend reveal re-trigger
  - 7 functional accordion sub-periods in #periodo-revolucion: 1 expanded (rev-alberdi-formacion), 6 collapsed, all keyboard navigable
  - Fix: removed reveal/reveal-fade from 7 .sub-period containers (pre-existing opacity:0 bug made visible by accordion)
  - Fix: .sub-period__body max-height bumped from 1000rem to 1500rem (#periodo-rosas scrollHeight=17719px > 16000px cap)
  - KNOWLEDGE.md entries: reveal-on-large-containers permanent opacity:0, 1500rem measured cap with scrollHeight formula
key_decisions:
  - D062: JS creates dynamic div.sub-period__body wrapper — single coordinated max-height transition for heterogeneous content
  - D063: initAccordions() called BEFORE revealOnScroll() — collapsed elements must be max-height:0 when IntersectionObserver initializes
  - D064: Do NOT add reveal/reveal-fade to .sub-period containers — container-level reveal broken for elements taller than viewport/threshold
  - D065: max-height cap 1500rem (24000px) — #periodo-rosas measured scrollHeight 17719px; 1000rem was insufficient
patterns_established:
  - Accordion pattern: max-height 0→1500rem + opacity transition on .sub-period__body; chevron via CSS ::after; initAccordions() before revealOnScroll(); event delegation on section root; { once: true } transitionend re-reveal; .sub-period containers must NOT have reveal/reveal-fade classes (child-level reveal only)
  - Large-container reveal rule: never put reveal/reveal-fade on section containers taller than viewport/threshold; individual child elements carry their own reveal classes
  - scrollHeight measurement protocol: always measure scrollHeight in browser post-expand before setting max-height caps; never estimate from card-count formulas alone
observability_surfaces:
  - "[Accordion] Initialized with 7 sub-periods." in DevTools Console — canonical health signal; if absent, initAccordions() did not run
  - "document.querySelectorAll('.sub-period__body--collapsed').length" → 6 on initial load
  - "document.querySelectorAll('.sub-period__title--trigger[aria-expanded=\"true\"]').length" → 1 on initial load
  - "document.querySelectorAll('.sub-period__body--collapsed .reveal--no-anim').length" → 0 (init order correct iff 0)
  - "Array.from(document.querySelectorAll('.sub-period')).map(sp=>({id:sp.id,opacity:window.getComputedStyle(sp).opacity}))" → all "1"
requirement_outcomes: []
duration: ~95min (S01: ~30min, S02: ~65min)
verification_result: passed
completed_at: 2026-03-24
---

# M012: Layout Colapsable — Secciones Expandibles por Click

**Accordion collapse/expand system for all 7 sub-periods in #periodo-revolucion: CSS transitions, ARIA keyboard navigation, and reveal-on-scroll re-trigger — plus two pre-existing bugs surfaced and fixed by UAT.**

## What Happened

M012 was a two-slice milestone with a clean implementation phase (S01) and a verification-and-fix phase (S02).

**S01** delivered the complete accordion system in two parallel workstreams. The CSS work added 6 rule blocks (~52 lines) to `styles.css`: `.sub-period__body` with `max-height 1000rem` + `opacity` transition (0.45s cubic-bezier + 0.35s), the collapsed state (`max-height: 0; opacity: 0`), the trigger class with `cursor: pointer` and `padding-right`, a CSS `::after` chevron (`▶`) that rotates 90° on `[aria-expanded="true"]`, a `focus-visible` outline using `--color-celeste`, and a `prefers-reduced-motion` block disabling all transitions. The JS work added `initAccordions()` (~118 lines with JSDoc) to `app.js`: it queries `#periodo-revolucion .sub-period` (7 elements), dynamically creates a `div.sub-period__body` wrapper for all non-h3 children of each sub-period, wires ARIA attributes (`role="button"`, `tabindex="0"`, `aria-expanded`, `aria-controls`) onto the h3 trigger, initializes index 0 as expanded and indices 1–6 as collapsed, attaches a single click + single keydown (Enter/Space) delegation listener on `#periodo-revolucion`, and on each expand adds a `{ once: true }` `transitionend` listener that calls `triggerRevealInBody()` — a synchronous `getBoundingClientRect()` viewport check that forces `reveal--visible` on in-viewport elements not yet animated. The `initAccordions()` call was inserted at line 160, before `revealOnScroll()` at line 164, satisfying the critical init-order invariant. All 15 static checks (5 CSS + 10 JS) passed on first run with zero code corrections.

**S02** ran the full UAT protocol and found two defects not catchable by static analysis. The first (critical) was that all 7 `.sub-period` containers in `index.html` already carried `reveal reveal-fade` classes from a commit predating M012. The `revealOnScroll()` IntersectionObserver uses `threshold: 0.15`; for containers 7929–17719px tall, 15% of element height can never fit in an 800px viewport, so the observer never fires and all sub-periods stayed at `opacity: 0`. Headers were invisible and unclickable. The fix was to remove `reveal reveal-fade` from all 7 `.sub-period` divs in `index.html` — individual child cards already carry their own `reveal` classes. The second defect (medium) was that `#periodo-rosas .sub-period__body` had a measured `scrollHeight` of 17719px in browser, exceeding the `1000rem` (16000px) max-height cap set in S01, clipping ~5% of content. The fix was to change the cap to `1500rem` (24000px) in `styles.css`. No changes to `app.js` were needed. Post-fix, all 5 DevTools queries matched expected values, keyboard navigation passed across all 7 triggers, mobile at 375px was confirmed identical to desktop, and audio/sub-nav showed no regressions.

## Cross-Slice Verification

All 9 success criteria from M012-ROADMAP.md verified:

| Criterion | Evidence |
|-----------|----------|
| Each sub-period is a colapsable accordion | S01 CSS + JS confirmed; S02 DevTools: 6 collapsed bodies on load |
| First sub-period expanded by default | S01 index 0 (`rev-alberdi-formacion`) initialized with `aria-expanded="true"`, no `--collapsed`; S02 DevTools: exactly 1 `[aria-expanded="true"]` trigger |
| Others collapsed with visible header + chevron | S01: indices 1–6 `aria-expanded="false"` + `.sub-period__body--collapsed`; CSS `::after` chevron on trigger headers; S02 visual checklist passed |
| Smooth collapse/expand transition | S01: 0.45s cubic-bezier `max-height` + 0.35s `opacity`; `prefers-reduced-motion` block; S02 visual checklist confirmed smooth |
| Reveal-on-scroll re-triggers post-expand | S01: `triggerRevealInBody()` via `{ once: true }` `transitionend` listener; S02 DevTools: `.sub-period__body--collapsed .reveal--no-anim` === 0 (init order correct); reveal confirmed in browser |
| Sub-nav sticky still works | S02: `[SubNav] Active sub-period →` in DevTools console; active-state logic confirmed; pre-existing `overflow:hidden` limitation documented (not a M012 regression) |
| Ambient audio still works | S02 visual checklist: audio functionality verified, no regression; no changes to `initAmbientSound()` |
| Keyboard navigable (aria-expanded, Enter/Space) | S01: ARIA attrs + keydown delegation; S02: Tab focuses all 7 triggers, Enter/Space toggle confirmed, Space no page scroll |
| Mobile works same as desktop | S02: 375px viewport accordion behavior identical to desktop, single-column card layout confirmed |

**Definition of done:**
- [x] All slices marked `[x]` in roadmap
- [x] S01-SUMMARY.md exists and is complete
- [x] S02-SUMMARY.md exists and is complete  
- [x] M012-VALIDATION.md exists with verdict: pass
- [x] Cross-slice integration verified: S01 provides → S02 consumes alignment confirmed
- [x] Static checks (Node.js): 5/5 CSS + 5/5 JS + init-order = pass
- [x] Browser UAT: all 5 DevTools queries pass post-fix
- [x] No active requirements regressed

## Requirement Changes

No requirements changed status during M012. All in-scope requirements (R001, R005, R006, R007, R009, R010) were verified as not-regressed. M012 is a UX/navigation milestone — it adds accordion behavior to an existing content structure without introducing new content or modifying existing historical accuracy.

## Forward Intelligence

### What the next milestone should know
- The `.sub-period` containers in `index.html` are now bare (`class="sub-period"` only) — no `reveal` classes. Any future slice adding new `.sub-period` containers **must NOT add `reveal reveal-fade`** to the container div. Only child elements (cards, titles, quotes) should carry `reveal` classes.
- The `max-height: 1500rem` cap on `.sub-period__body` is sufficient for current content (largest: `#periodo-rosas` at 17719px = ~1107rem). The formula is: cap ≥ 1.4 × largest_scrollHeight. If `#periodo-rosas` grows beyond ~23000px (very unlikely without 40+ new dense cards), bump the cap. Always measure `scrollHeight` in browser, never estimate from card counts.
- `initAccordions()` is registered at line 160 in `app.js`, before `revealOnScroll()` at line 164. This ordering is a hard invariant (D063). If the init pipeline is ever refactored, preserve this order or the collapsed sub-period bodies will get `reveal--no-anim` prematurely.
- The `[Accordion]` console prefix is the primary runtime health signal. Open DevTools Console before testing — expect `[Accordion] Initialized with 7 sub-periods.` on load. If absent, `initAccordions()` did not run.

### What's fragile
- **`initAccordions()` assumes h3 is the first child of each `.sub-period`** — the function moves all non-h3 siblings into the wrapper body. If any sub-period's HTML structure has non-h3 content before the h3 (e.g., a decorative div before the trigger), that content would be excluded from the body wrapper. The 7 current sub-periods all have h3 as first child — verified.
- **`transitionend` re-reveal timing** — the `{ once: true }` listener fires after the longest transition property completes (max-height 0.45s). If a future CSS change adds a longer transition property to `.sub-period__body`, the re-reveal would be delayed by that duration. Harmless but worth knowing.
- **Sub-nav `position: sticky` is non-functional** — the ancestor `<section class="period">` has `overflow: hidden`, which confines sticky to the section's local scroll context. This is a pre-existing issue from before M012 (commit e131d67). The active-state IntersectionObserver logic is correct; only visual stickiness is affected. A fix would require removing or replacing `overflow: hidden` on `.period` sections, which may affect parallax and card overflow behavior.
- **Event delegation scoped to `#periodo-revolucion`** — the accordion listeners are attached to `#periodo-revolucion` only. If sub-periods are ever added to `#periodo-colonial` or `#periodo-nacional`, `initAccordions()` must be extended or generalized to cover those section IDs.

### Authoritative diagnostics
- `document.querySelectorAll('.sub-period__body--collapsed').length` → **6** on initial load; any other value means init is broken
- `document.querySelectorAll('.sub-period__title--trigger[aria-expanded="true"]').length` → **1** on initial load
- `document.querySelectorAll('.sub-period__body--collapsed .reveal--no-anim').length` → **0**; any >0 means `initAccordions()` ran after `revealOnScroll()`
- `Array.from(document.querySelectorAll('.sub-period')).map(sp => ({id: sp.id, opacity: window.getComputedStyle(sp).opacity}))` → all `"1"` post D1 fix; any `"0"` means `reveal reveal-fade` was re-added to a container
- `document.querySelector('#periodo-rosas .sub-period__body').scrollHeight` → ~17719px; must be < 24000 (1500rem cap)

### What assumptions changed
- S01's formula estimate for `#periodo-rosas` content height was `35 × 400 / 16 = 875rem`. Actual measured `scrollHeight` in browser was 17719px = ~1107rem — **27% higher** than the estimate. The formula underestimates because it ignores blockquote heights, image containers with `aspect-ratio`, multi-line headings, and section connectors. Always measure in browser; never trust card-count estimates for max-height decisions.
- S02-PLAN assessed `risk: low`. The D1 defect (reveal-on-container `opacity: 0`) was a **critical severity** issue that would have left the entire accordion invisible to users. The fix was simple (removing classes), but the impact was total. UAT scope was correctly designed to catch this; the risk assessment underestimated the pre-existing technical debt from the `reveal reveal-fade` classes on section containers.

## Files Created/Modified

- `styles.css` — S01: added 6 accordion CSS rule blocks (~52 lines) after sub-period responsive media query, before sub-nav section. S02: changed `.sub-period__body` max-height from `1000rem` to `1500rem` (line 2004)
- `app.js` — S01: added `initAccordions()` function (~118 lines with JSDoc) between `initExpandCollapse()` and `initAmbientSound()`, plus call at line 160. File grew from ~810 to ~940 lines
- `index.html` — S02: removed `reveal reveal-fade` from all 7 `.sub-period` div containers (lines 346, 737, 1206, 1342, 1446, 2113, 2283)
- `.gsd/KNOWLEDGE.md` — S02: two new entries added ("reveal reveal-fade on Large Section Containers" and "#periodo-rosas Sub-period Exceeds 1000rem")
- `.gsd/milestones/M012/M012-VALIDATION.md` — created by milestone validation gate; verdict: pass
- `.gsd/milestones/M012/slices/S01/S01-SUMMARY.md` — S01 slice summary
- `.gsd/milestones/M012/slices/S01/tasks/T01-SUMMARY.md`, `T02-SUMMARY.md`, `T03-SUMMARY.md` — task summaries
- `.gsd/milestones/M012/slices/S02/S02-SUMMARY.md` — S02 slice summary
- `.gsd/milestones/M012/slices/S02/tasks/T01-SUMMARY.md`, `T02-SUMMARY.md` — task summaries
- `.gsd/milestones/M012/slices/S02/S02-UAT.md` — UAT script and results
