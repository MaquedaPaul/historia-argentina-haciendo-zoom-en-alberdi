---
id: T01
parent: S02
milestone: M015
provides:
  - "#rev-generacion-37 section block (5 cards) inserted into index.html between #rev-1820-1835 and #periodo-rosas"
  - "Sub-nav link for 1830–1837 / Generación del 37 inserted with correct sub-nav__link-label class"
key_files:
  - index.html
key_decisions:
  - "Used anchor-string Edit (not line numbers) so splice is robust to prior insertions"
  - "Sub-nav link uses <span class=\"sub-nav__link-label\"> per existing pattern — draft's bare <span> was intentionally corrected"
patterns_established:
  - "Section block placement: immediately after </div><!-- /#prev-section --> closing comment, before the next SUB-PERÍODO comment block"
observability_surfaces:
  - "grep -c 'data-certeza=' index.html → expected 98 post-T01"
  - "grep -n 'rev-generacion-37' index.html → expected 3 lines (sub-nav line 331, section open 1442, section close 1523)"
duration: 10m
verification_result: passed
completed_at: 2026-03-24
blocker_discovered: false
---

# T01: Splice section block and sub-nav link into index.html

**Inserted 5 Generación del 37 cards and sub-nav link into index.html; data-certeza count confirmed at 98.**

## What Happened

The complete `#rev-generacion-37` section block — authored and verified in S01 — was spliced into `index.html` using two anchor-string Edit operations:

1. **Section block** inserted after `</div><!-- /#rev-1820-1835 -->` (line 1440), placing 5 event-cards (GEN37-1 through GEN37-5) between the `#rev-1820-1835` and `#periodo-rosas` sub-periods. The block includes the `<aside class="card-nota-certeza">` element on GEN37-3 (Salón Literario card).

2. **Sub-nav link** inserted after the `#rev-1820-1835` link in the `.sub-nav` (line 331), using the corrected `<span class="sub-nav__link-label">Generación del 37</span>` — the content draft had used a bare `<span>` which was intentionally fixed per the task plan's critical constraint.

The pre-flight requirement to add `## Observability / Diagnostics` to S02-PLAN.md was also fulfilled.

## Verification

All task must-haves confirmed in a single bash pass:

```bash
grep -c 'data-certeza=' index.html        # 98 ✅
grep -n "rev-generacion-37" index.html    # 3 lines: 331, 1442, 1523 ✅
grep -n "rev-generacion-37" index.html | grep "sub-nav__link-label"  # 1 match ✅
grep -n "/#rev-1820-1835\|rev-generacion-37\|id=\"periodo-rosas\"" index.html  # correct order ✅
node -e "new Function(...app.js...)"      # OK ✅
```

Section order in file: `/#rev-1820-1835` (1440) → `#rev-generacion-37` open (1442) → `#rev-generacion-37` close (1523) → `#periodo-rosas` (1530).

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c 'data-certeza=' index.html` | 0 | ✅ pass (→98) | <1s |
| 2 | `grep -n "rev-generacion-37" index.html` | 0 | ✅ pass (3 lines) | <1s |
| 3 | `grep -n "rev-generacion-37" index.html \| grep "sub-nav__link-label"` | 0 | ✅ pass (1 match) | <1s |
| 4 | Section order check (grep for enclosing IDs) | 0 | ✅ pass (correct order) | <1s |
| 5 | `node -e "new Function(require('fs').readFileSync('app.js','utf8'))"` | 0 | ✅ pass (OK) | <1s |

## Diagnostics

- **Count check:** `grep -c 'data-certeza=' index.html` → 98 confirms all 5 cards are present.
- **Section presence:** `grep -n "rev-generacion-37" index.html` → lines 331, 1442, 1523.
- **Malformed sub-nav:** if span class is wrong, `grep "rev-generacion-37" index.html | grep "sub-nav__link-label"` returns empty.
- **Order verification:** `grep -n "/#rev-1820-1835\|rev-generacion-37\|periodo-rosas" index.html` shows the three landmarks in ascending line order.
- **JS runtime:** browser DevTools Console at page load surfaces any scroll-reveal errors against the new cards.

## Deviations

The sub-nav link indentation uses 14 spaces (`              <a href=...`) to match the surrounding lines, whereas the S01 draft used 14 spaces. No functional deviation from the task plan.

## Known Issues

None. T02 (CSS for `.card-nota-certeza:not(span)`) remains to be executed — the `<aside>` block inserted in GEN37-3 currently renders without visual distinction.

## Files Created/Modified

- `index.html` — 5 new event-cards in `#rev-generacion-37` section + sub-nav link for `1830–1837`
- `.gsd/milestones/M015/slices/S02/S02-PLAN.md` — added `## Observability / Diagnostics` section; marked T01 `[x]`
