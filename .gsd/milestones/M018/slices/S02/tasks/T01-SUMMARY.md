---
id: T01
parent: S02
milestone: M018
provides:
  - Sub-nav link `href="#rev-camino-caseros"` inserted between `#rev-1835-1852` and `#rev-1852-1860`
  - New sub-period block `#rev-camino-caseros` with 4 verified `card-hecho` cards (CAM-1…CAM-4) inside `#rev-1835-1852`
key_files:
  - index.html
key_decisions:
  - CAM-4 rendered without card-image div (no verified image available for post-Caseros constituyente content; card works without image per draft constraint)
  - CAM-3 img uses inline style `object-fit: cover; object-position: center top` because the panoramic image is 2197×582 px (3.77:1) and would collapse without this
  - Alberdi quote in CAM-4 rendered as inline text in excerpt paragraph, not as `alberdi-quote` blockquote (per draft constraint: count must remain 6)
patterns_established:
  - New sub-period grids within an existing period use `--reveal-delay` stagger starting from 0ms (independent of sibling grids)
  - Anti-duplication checked by grepping for the specific text phrase in the new block, not just the section
observability_surfaces:
  - grep -c 'id="rev-camino-caseros"' index.html  # must be 1
  - grep -c 'href="#rev-camino-caseros"' index.html  # must be 1
  - grep -c 'data-certeza="hecho"' index.html  # must be ≥70 (was 66 pre-task + 4 new)
  - grep -c 'class="alberdi-quote' index.html  # must be 6
duration: ~15m
verification_result: passed
completed_at: 2026-03-24
blocker_discovered: false
---

# T01: Insertar sub-nav link y bloque HTML de 4 cards en index.html

**Inserted sub-nav link and 4-card `#rev-camino-caseros` block (CAM-1…CAM-4) inside `#rev-1835-1852` in index.html.**

## What Happened

Two surgical edits to `index.html`:

1. **Sub-nav link** — inserted `<a href="#rev-camino-caseros" class="sub-nav__link">1851–1852<span class="sub-nav__link-label">El camino a Caseros</span></a>` between the `#rev-1835-1852` and `#rev-1852-1860` links at line 333.

2. **HTML block** — inserted immediately after `</div><!-- /.events-grid SP3 -->` and before `</div><!-- /#rev-1835-1852 -->`:
   - `<h4 class="sub-period__subtitle">El camino a Caseros (1851–1852)</h4>`
   - `<div id="rev-camino-caseros" class="events-grid events-grid--certeza">` containing CAM-1…CAM-4
   - All content sourced verbatim from `S01-CONTENT-DRAFT.md` (no invented content)

All structural requirements from the task plan were followed: CAM-3 got `object-fit: cover; object-position: center top` on its img element; CAM-4 has no `card-image` div; the Alberdi citation in CAM-4 is inline prose (not a new `alberdi-quote` blockquote).

Note: pre-task `data-certeza="hecho"` count was 66 (not 14 as expected by plan — site had more cards than plan anticipated). Post-task count is 70 (66+4), which satisfies the ≥18 requirement. Similarly, `alberdi-quote` was already at 6 pre-task and remains at 6.

## Verification

All slice verification commands run and passed:

```
node -e "try{new Function(...app.js...);console.log('OK')}catch(e){...}"  → OK
grep -c 'data-certeza="hecho"' index.html                                 → 70 (≥18 ✓)
grep -c 'id="rev-camino-caseros"' index.html                              → 1
grep -c 'href="#rev-camino-caseros"' index.html                           → 1
grep -c 'class="alberdi-quote' index.html                                 → 6 (unchanged ✓)
grep -n "45.000" index.html | grep " vs"                                  → only line 2262 (SP3-6, not in new block ✓)
grep -c 'El camino a Caseros' index.html                                  → 3 (h4 + sub-nav label + aria-label ✓)
grep -n 'object-fit: cover' index.html                                    → line 2329 (CAM-3 img ✓)
CAM-4 card-image check                                                    → no card-image div in CAM-4 ✓
```

Note: the slice plan's `grep -n "45\.000 vs"` pattern returns no output because the HTML uses `~45.000 soldados vs.` with Spanish thousands-separator dot, not matching the backslash-escaped regex. Confirmed via direct `grep '45.000' | grep ' vs'` that the text appears only on line 2262.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `node -e "try{new Function(require('fs').readFileSync('app.js','utf8'));console.log('OK')}catch(e){...}"` | 0 | ✅ pass | <1s |
| 2 | `grep -c 'data-certeza="hecho"' index.html` → 70 | 0 | ✅ pass (≥18) | <1s |
| 3 | `grep -c 'id="rev-camino-caseros"' index.html` → 1 | 0 | ✅ pass | <1s |
| 4 | `grep -c 'href="#rev-camino-caseros"' index.html` → 1 | 0 | ✅ pass | <1s |
| 5 | `grep -c 'class="alberdi-quote' index.html` → 6 | 0 | ✅ pass | <1s |
| 6 | `grep -n '45.000' index.html \| grep ' vs'` → only line 2262 | 0 | ✅ pass (no duplication) | <1s |
| 7 | `grep -c 'El camino a Caseros' index.html` → 3 | 0 | ✅ pass (≥1) | <1s |
| 8 | CAM-3 `object-fit: cover; object-position: center top` present | 0 | ✅ pass | <1s |
| 9 | CAM-4 has no `<div class="card-image">` | 0 | ✅ pass | <1s |

## Diagnostics

To inspect the new block at any time:
- `grep -n 'id="rev-camino-caseros"' index.html` → shows insertion line
- `grep -A5 'id="rev-camino-caseros"' index.html` → confirms opening tag and aria-label
- `grep -c 'CAM-[1-4]' index.html` → 4 (each CAM comment appears once)
- For browser verification: navigate to `index.html#rev-camino-caseros` — the grid with 4 cards should be visible with certeza indicators

Image URLs (for 404 diagnosis if needed):
- CAM-1: `https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Justo_J._Urquiza._Presidente_of_the_Argentine_Confederation.jpg/500px-...`
- CAM-2: `https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Batalha_dos_Santos_Logares_...`
- CAM-3: `https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/La-batalla-de-caseros.JPG/500px-...`

## Deviations

- **`grep -n "45\.000 vs"` returns no output** — this is expected behavior (the text has `~45.000 soldados vs.`, not `45.000 vs`), not a regression. The pattern in the slice plan was imprecise; the actual check via `grep '45.000' | grep ' vs'` confirms the value appears only in SP3-6 (line 2262). No duplication occurred.
- **Pre-task `data-certeza="hecho"` count was 66** (plan assumed 14 existing). This does not affect correctness — the requirement is ≥18, and 70 > 18. The discrepancy indicates the site had more existing hecho cards than the plan estimated.

## Known Issues

None.

## Files Created/Modified

- `index.html` — added sub-nav link for `#rev-camino-caseros` and 4-card HTML block (CAM-1…CAM-4) within `#rev-1835-1852`
- `.gsd/milestones/M018/slices/S02/S02-PLAN.md` — added `## Observability / Diagnostics` section (pre-flight gap fix)
