---
estimated_steps: 4
estimated_files: 0
---

# T02: Final verification — all 10 success criteria

**Slice:** S02 — Timeline animada 1860–1900 + verificación final
**Milestone:** M004

## Description

Systematic verification of all 10 M004 success criteria at 1200px desktop and 375px mobile viewports. Also verify no regressions in colonial (M002) and revolución (M003) sections. This is the milestone's completion gate.

## Steps

1. Open `index.html` in the browser at 1200px viewport width. Run DOM query checks:
   - `document.querySelectorAll('#periodo-nacional [data-certeza]').length === 7`
   - `document.querySelectorAll('#periodo-nacional .card-image img').length === 7`
   - `document.querySelector('#periodo-nacional .events-grid--certeza') !== null`
   - `document.querySelectorAll('#periodo-nacional cite').length >= 7`
   - `document.querySelectorAll('#periodo-nacional .img-error, #periodo-nacional .img-fallback').length === 0`
   - `document.querySelector('.nacional-timeline') !== null`
   - `document.querySelectorAll('.nacional-timeline__marker').length === 7`
2. Visual checks at 1200px: certeza badges visible, images loaded (no broken icons), opinión card has blockquote with attribution, Alberdi closure card mentions death 1884 + legacy, timeline animates on scroll.
3. Switch to 375px mobile: cards stack in single column, images scale proportionally, timeline condenses, no horizontal scrollbar, text readable.
4. Regression check: scroll through all 3 periods (colonial → revolución → nacional). Verify scroll spy updates nav active state, sub-nav tracks revolución sub-periods, reveal animations fire, expand/collapse toggles work on revolución cards, colonial timeline animates. No console errors.

## Must-Haves

- [ ] All 10 M004 success criteria PASS
- [ ] No regressions in colonial and revolución sections
- [ ] No new console errors

## Verification

- All 10 checks documented as PASS/FAIL
- Zero console errors related to M004 changes
- Regression check confirms all existing functionality intact

## Inputs

- `index.html` — complete with S01 cards + S02 timeline
- `styles.css` — with `.nacional-timeline` styles
- M004-ROADMAP.md success criteria list

## Expected Output

- Verification results confirming milestone completion (documented in task summary)
