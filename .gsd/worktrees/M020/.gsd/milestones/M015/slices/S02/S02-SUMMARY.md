---
id: S02
parent: M015
milestone: M015
provides:
  - "5 Generación del 37 event cards (GEN37-1 through GEN37-5) in #rev-generacion-37 section of index.html"
  - "Sub-nav link '1830–1837 / Generación del 37' wired to #rev-generacion-37 with correct sub-nav__link-label span"
  - "CSS rule .card-nota-certeza:not(span) in styles.css — block-level aside with amber left border, muted text, 0.875rem font"
requires:
  - slice: S01
    provides: "S01-CONTENT-DRAFT.md with 5 verified cards (GEN37-1..5), certeza classifications, and block-level aside pattern for GEN37-3"
affects: []
key_files:
  - index.html
  - styles.css
key_decisions:
  - "Anchor-string Edit (not line numbers) for both splice operations — robust to prior insertions in a growing file"
  - "Sub-nav link corrected from S01 draft's bare <span> to <span class=\"sub-nav__link-label\"> per existing pattern"
  - "CSS .card-nota-certeza:not(span) inserted after .card-opinion sub-rules and before /* CARD-RUMOR */ — consistent with file's variant grouping"
  - ":not(span) qualifier preserves inline span variant in BIOG biography cards (lines 381–560) — no border-left bleed"
  - "Dev server on port 8767 (8765 occupied by unrelated project) — local env detail, not a plan deviation"
patterns_established:
  - "block-level <aside class=\"card-nota-certeza\"> pattern for substantive date/fact disputes — distinct from inline <span> variant for internal flags"
  - ".card-nota-certeza:not(span) CSS selector pattern — isolates block variant styling without affecting inline usage"
  - "New card-variant CSS goes after all .card-opinion sub-rules and before /* CARD-RUMOR */ block"
observability_surfaces:
  - "grep -c 'data-certeza=' index.html → 98 (canonical count; was 93 before M015)"
  - "grep -n 'rev-generacion-37' index.html → lines 331 (sub-nav), 1442 (section open), 1523 (section close)"
  - "grep -n 'card-nota-certeza:not(span)' styles.css → line 1228"
  - "node -e \"new Function(require('fs').readFileSync('app.js','utf8'))\" → OK"
  - "Browser: window.getComputedStyle(aside.card-nota-certeza).borderLeftWidth → '2.4px' (3px at 0.8 dpr)"
drill_down_paths:
  - ".gsd/milestones/M015/slices/S02/tasks/T01-SUMMARY.md"
  - ".gsd/milestones/M015/slices/S02/tasks/T02-SUMMARY.md"
duration: 18m
verification_result: passed
completed_at: 2026-03-24
---

# S02: Integración HTML

**5 Generación del 37 cards are live in index.html between #rev-1820-1835 and #periodo-rosas, with sub-nav link, reveal animation, and styled block-level certeza aside — all slice verification checks pass.**

## What Happened

S02 consumed the verified content draft from S01 and integrated it into the live site in two tasks.

**T01** performed two anchor-string Edit operations on `index.html`:

1. The complete `#rev-generacion-37` section block (5 event-cards, GEN37-1 through GEN37-5) was spliced immediately after `</div><!-- /#rev-1820-1835 -->`, placing the new sub-period in correct chronological order between the 1820–1835 sub-period and `#periodo-rosas`. GEN37-3 (Salón Literario) carries a `<aside class="card-nota-certeza">` documenting the 23-vs-26-June date dispute — the block-level variant established in KNOWLEDGE.md during S01.

2. The sub-nav link for `1830–1837 / Generación del 37` was inserted after the `#rev-1820-1835` link in the `.sub-nav`. The S01 draft used a bare `<span>` — T01 corrected this to `<span class="sub-nav__link-label">` per the existing sub-nav pattern.

The `data-certeza` count rose from 93 to 98, confirming all 5 cards are present.

**T02** added the missing CSS rule for the block-level `<aside class="card-nota-certeza">` variant. The `:not(span)` qualifier was essential: inline `<span class="card-nota-certeza">` elements in the BIOG biography section (≈lines 381–560) would otherwise acquire an unwanted `border-left` and `padding`. The rule was anchored after `.card-opinion__context em { font-style: italic; }` and before `/* CARD-RUMOR */` — the natural grouping for certeza card variants. Browser verification confirmed the aside on GEN37-3 renders with a 3px amber left border, 0.75rem left padding, and 0.875rem font size.

## Verification

All S02 must-haves confirmed:

```
grep -c 'data-certeza=' index.html         → 98  ✅
grep -n "rev-generacion-37" index.html     → 3 lines: 331, 1442, 1523  ✅
grep -n "rev-generacion-37" index.html | grep "sub-nav__link-label"  → 1 match  ✅
grep -n "card-nota-certeza:not(span)" styles.css  → line 1228  ✅
node -e "new Function(require('fs').readFileSync('app.js','utf8'))"  → OK  ✅
Browser: 5 cards, aside with amber border, SubNav tracks rev-generacion-37, no JS errors  ✅
```

## New Requirements Surfaced

- none

## Deviations

None. The sub-nav correction (bare `<span>` → `<span class="sub-nav__link-label">`) was explicitly anticipated in the task plan's "Critical" note — not a deviation.

## Known Limitations

- The one pre-existing 404 error in the browser console (unrelated resource) predates M015 and was not introduced by S02.
- No scroll-to-top button or progress indicator for the new sub-period — consistent with existing sub-periods; not a gap introduced here.

## Follow-ups

- none

## Files Created/Modified

- `index.html` — 5 new event-cards in `#rev-generacion-37` section (lines 1442–1523) + sub-nav link at line 331
- `styles.css` — `.card-nota-certeza:not(span)` rule at line 1228

## Forward Intelligence

### What the next slice should know
- The `data-certeza` canonical count is now **98**. Any future slice adding cards must update its expected count accordingly.
- The `#rev-generacion-37` section occupies lines 1442–1523 of `index.html`. When inserting a new sub-period after it, use `</div><!-- /#rev-generacion-37 -->` (line 1523) as the anchor string.
- The block-level `<aside class="card-nota-certeza">` now has CSS. Future uses of this pattern are fully styled — no additional CSS needed unless visual adjustments are desired.

### What's fragile
- The `:not(span)` selector is load-bearing — if a future card introduces a `<div class="card-nota-certeza">` or other block element that should NOT get the border styling, the selector will need to be made more specific (e.g., target `aside.card-nota-certeza` directly).
- Sub-nav link order is strictly sequential by line position in the `.sub-nav` list. Inserting a new link requires finding the correct anchor string — line numbers will drift as the file grows.

### Authoritative diagnostics
- `grep -c 'data-certeza=' index.html` is the canonical check for card count — single command, machine-verifiable.
- `grep -n 'rev-generacion-37' index.html` confirms section presence, sub-nav wiring, and closing comment in one pass.
- `node -e "new Function(require('fs').readFileSync('app.js','utf8'))"` is the correct JS syntax check (not `eval`) — see KNOWLEDGE.md entry.

### What assumptions changed
- No assumptions changed. The S01 draft was accurate and the integration was mechanical as intended.
