---
id: T03
parent: S02
milestone: M003
provides:
  - Expand/collapse toggle on 4 major event cards in #periodo-revolucion (Revolución de Mayo, Generación del 37 exilio, Bases de Alberdi, Constitución de 1853)
  - Extended historical content (2 paragraphs each) revealed on demand via button click
  - aria-expanded / button-text state updates ("Ver más" ↔ "Ver menos") with icon rotation
  - prefers-reduced-motion: no CSS transition on expand/collapse
  - Responsive at 320px — expand toggle and content render without overflow
key_files:
  - index.html
  - styles.css
  - app.js
key_decisions:
  - Used event delegation on #periodo-revolucion (not per-card listeners) for robustness with dynamically revealed cards
  - Used `hidden` attribute (native HTML) as the off-state baseline, removed on expand, restored on collapse via transitionend listener — combines semantic hiding with CSS transition for accessible smooth animation
  - Used requestAnimationFrame between `hidden=false` and adding `.card-detail--expanded` to guarantee the browser paints the element before the transition fires (avoids instant-show with no animation)
  - button + div.card-detail are DOM siblings; JS uses `btn.nextElementSibling` — simpler and more robust than querySelector on the card
  - Extended content placed BEFORE the card-source footer — toggle button sits at natural card bottom before the citation, matching reading flow
patterns_established:
  - Event delegation pattern: single listener on section root, early-exit if `e.target.closest('.card-expand-toggle')` is null
  - Collapse-with-cleanup pattern: remove expanded class → transitionend removes hidden attr; avoids abrupt clipping on next DOM inspect
observability_surfaces:
  - Console '[Expand]' prefix — init logs toggle count; click logs card title + new expanded state; warning if #periodo-revolucion not found
  - '.card-detail--expanded' selector — shows all currently open detail panels
  - 'button.card-expand-toggle[aria-expanded="true"]' — shows which toggles are open
  - 'document.querySelectorAll(".card-expand-toggle").length' — should be 4
duration: ~35m
verification_result: passed
completed_at: 2026-03-19
blocker_discovered: false
---

# T03: Add expand/collapse toggle for detailed event cards

**Added expand/collapse toggle to 4 major event cards in #periodo-revolucion, with smooth CSS transition, aria-expanded tracking, and [Expand] console observability.**

## What Happened

Added `<button class="card-expand-toggle">` + `<div class="card-detail" hidden>` pairs to 4 cards:
- **SP1-1** — El Cabildo Abierto y la Revolución de Mayo (card-hecho)
- **SP3-3** — El exilio de la Generación del 37 (card-opinion)
- **SP4-1** — *Bases y puntos de partida*: el programa constitucional de Alberdi (card-opinion)
- **SP4-2** — El Congreso de Santa Fe y la Constitución de 1853 (card-hecho)

Each card gets 2 paragraphs of extended historical content: additional context, secondary sources, historiographic interpretation — all consistent with the factual standards of the surrounding content.

**CSS (~100 lines in styles.css):** `.card-expand-toggle` styled as a subtle full-width text button with a faint celeste top border (color-mix at 25% opacity). Icon rotates 180° via `transform: rotate(180deg)` on `[aria-expanded="true"]`. `.card-detail` uses `max-height: 0 → 40rem` + `opacity: 0 → 1` + `padding: 0 → 0.75rem` transition (0.25–0.35s ease). Responsive at 30rem: slightly smaller font. `prefers-reduced-motion` block sets transition: none on both toggle icon and detail panel.

**JS (~60 lines added to app.js):** `initExpandCollapse()` function called in the DOMContentLoaded sequence between `initSubNav()` and `revealOnScroll()`. Event delegation on `#periodo-revolucion` root. On expand: `detail.hidden = false` → `requestAnimationFrame(addExpandedClass)`. On collapse: remove expanded class → `transitionend` restores `hidden=true`. `aria-expanded` and button text updated synchronously on each click. Console `[Expand]` debug logs on init and every toggle event.

The expand/collapse system is completely independent from the reveal system — IntersectionObserver does not re-observe expanded cards, and expanding a card only changes its height, which does not affect the reveal thresholds of other elements.

## Verification

1. `document.querySelectorAll('.card-expand-toggle').length >= 4` → **4** ✅
2. Click toggle 1 → `aria-expanded = "true"`, text = "Ver menos", `card-detail.hidden = false`, `.card-detail--expanded` present ✅
3. Click toggle 1 again → `aria-expanded = "false"`, text = "Ver más", `.card-detail--expanded` absent, `hidden` restored after 500ms ✅
4. Toggles 2 and 3 independently expanded simultaneously — no interference ✅
5. `allTogglesHaveCorrectSiblings` (btn.nextElementSibling is .card-detail) → **true** for all 4 ✅
6. At 320px viewport: toggle 2 click → `aria-expanded = "true"`, detail visible, no overflow ✅ (verified via JS; content renders at x:20, w:268, fitting within 320px)
7. No console errors ✅
8. reveal system still working: `document.querySelectorAll('.event-card.reveal--visible').length` → **19** ✅

## Verification Evidence

| # | Command / Check | Exit Code | Verdict | Duration |
|---|----------------|-----------|---------|----------|
| 1 | `document.querySelectorAll('.card-expand-toggle').length >= 4` (browser JS) | — | ✅ pass (4) | instant |
| 2 | Click toggle → aria-expanded + class + hidden state | — | ✅ pass | instant |
| 3 | Click again → collapse + hidden restored after transitionend | — | ✅ pass (verified at 500ms) | 500ms |
| 4 | Two toggles expanded independently | — | ✅ pass | instant |
| 5 | All 4 toggles have .card-detail nextElementSibling | — | ✅ pass | instant |
| 6 | 320px viewport: expand still functional | — | ✅ pass | instant |
| 7 | `no_console_errors` browser assert | — | ✅ pass | instant |
| 8 | Reveal system not broken (19 revealed cards) | — | ✅ pass | instant |

**Slice-level check:** `document.querySelectorAll('.card-expand-toggle').length >= 4` → **PASS (4)**
**Slice-level check:** Click expand toggle → content visible, click again → collapses → **PASS**

## Diagnostics

To inspect the expand/collapse state at runtime:
- Open expand toggles: `document.querySelectorAll('.card-detail--expanded')` — length shows how many are open
- Specific toggle state: `document.querySelectorAll('.card-expand-toggle')[N].getAttribute('aria-expanded')` — "true" or "false"
- All 4 toggle DOM integrity: `Array.from(document.querySelectorAll('.card-expand-toggle')).every(btn => btn.nextElementSibling?.classList.contains('card-detail'))` — should be true

**If expand doesn't work:**
1. Check that `initExpandCollapse` was called → look for `[Expand] Initialized with 4 toggle(s)` in console (filter on `[Expand]`)
2. Check that `btn.nextElementSibling` is `.card-detail` → if not, HTML structure is broken; button should directly precede the detail div
3. Check for transition interference → `prefers-reduced-motion` should disable transitions, not prevent expand

**If content is hidden after expand:**
- Check `.card-detail--expanded` is present on the div → if not, `requestAnimationFrame` did not fire
- Check `max-height` computed style → should be `40rem` (640px at 16px base) when expanded

Console prefix `[Expand]` — filter browser console to see all expand/collapse events.

## Deviations

- **Extended content placed before `card-source` footer** — the plan shows `<button>` and `<div>` after the "main excerpt/quote" without specifying the position relative to the footer. Placing the toggle before the citation footer puts it in the most natural reading position (content → expand → source). This is better UX than putting it after the citation.
- **~60 lines of JS instead of ~25** — the plan underestimated because it didn't account for: the rAF expand pattern, the transitionend-based hidden restoration, console observability, and the JSDoc block for the function.
- **~100 lines of CSS instead of ~40** — the plan underestimated; actual CSS covers the button, icon, detail panel, responsive breakpoint, reduced-motion, and a JSDoc-style comment block.

## Known Issues

None. All must-haves met.

## Files Created/Modified

- `index.html` — Added `<button class="card-expand-toggle">` + `<div class="card-detail" hidden>` to 4 cards (lines 351-365, 645-660, 771-787, 802-818)
- `styles.css` — Added ~100 lines for `.card-expand-toggle`, `.card-detail`, `.card-detail--expanded`, responsive 30rem breakpoint, and prefers-reduced-motion block (appended after sub-nav styles)
- `app.js` — Added `initExpandCollapse()` function (~60 lines) with event delegation on #periodo-revolucion, rAF expand pattern, transitionend collapse cleanup, and [Expand] console observability; function called in DOMContentLoaded sequence
