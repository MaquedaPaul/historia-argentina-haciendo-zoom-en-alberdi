---
id: S02
parent: M018
milestone: M018
provides:
  - Sub-nav link `href="#rev-camino-caseros"` between `#rev-1835-1852` and `#rev-1852-1860`
  - New sub-period block `#rev-camino-caseros` with 4 verified `card-hecho` cards (CAM-1…CAM-4) inside `#rev-1835-1852`
requires:
  - slice: S01
    provides: S01-CONTENT-DRAFT.md with 4 verified cards and overlap map
affects: []
key_files:
  - index.html
key_decisions:
  - CAM-4 rendered without card-image div — no verified public domain image available for post-Caseros constituyente content; card functions correctly without image
  - CAM-3 img uses inline style `object-fit: cover; object-position: center top` because the panoramic La-batalla-de-caseros.JPG is 2197×582 px (3.77:1 ratio) and collapses without explicit cover treatment
  - Alberdi citation in CAM-4 rendered as inline prose in excerpt paragraph, not as a new `alberdi-quote` blockquote — keeps alberdi-quote count at 6 per plan constraint
  - Pre-task `data-certeza="hecho"` count was 66 (not 14 as plan assumed); post-task count is 70 — satisfies ≥18 requirement
patterns_established:
  - New sub-period grids within an existing period use `--reveal-delay` stagger starting from 0ms (independent of sibling grids)
  - Anti-duplication verified by grepping for the exact phrase in the new block, not just the section ID
  - `grep -n "45\.000 vs"` returns no output because HTML uses Spanish thousands-separator dot `~45.000 soldados vs.` — use `grep '45.000' | grep ' vs'` for this check
observability_surfaces:
  - grep -c 'id="rev-camino-caseros"' index.html  # 1
  - grep -c 'href="#rev-camino-caseros"' index.html  # 1
  - grep -c 'data-certeza="hecho"' index.html  # 70 (≥18 ✓)
  - grep -c 'class="alberdi-quote' index.html  # 6 (unchanged ✓)
drill_down_paths:
  - .gsd/milestones/M018/slices/S02/tasks/T01-SUMMARY.md
duration: ~15m
verification_result: passed
completed_at: 2026-03-24
---

# S02: Integración HTML

**Integrated 4 verified `card-hecho` cards (CAM-1…CAM-4) for "El camino a Caseros (1851–1852)" into `index.html` as sub-period `#rev-camino-caseros` inside `#rev-1835-1852`, with sub-nav link, certeza indicators, images with fallback, and zero JS errors.**

## What Happened

S02 had a single task (T01) that performed two surgical edits to `index.html`:

**1. Sub-nav link** — inserted `<a href="#rev-camino-caseros" class="sub-nav__link">` between the existing `#rev-1835-1852` and `#rev-1852-1860` nav links, completing the 8th sub-nav entry for the revolución period.

**2. HTML block** — inserted immediately after `</div><!-- /.events-grid SP3 -->` and before `</div><!-- /#rev-1835-1852 -->`:
- `<h4 class="sub-period__subtitle">El camino a Caseros (1851–1852)</h4>`
- `<div id="rev-camino-caseros" class="events-grid events-grid--certeza" aria-label="...">` with 4 cards

All card content was sourced verbatim from `S01-CONTENT-DRAFT.md` — no new historical claims were invented during integration.

**Cards delivered:**
- **CAM-1** — El Pronunciamiento de Urquiza (1 de mayo de 1851): portrait of Urquiza, 3 sources cited
- **CAM-2** — La triple alianza y la campaña en la Banda Oriental (1851): Batalha dos Santos Lugares painting, 3 sources cited
- **CAM-3** — El Ejército Grande cruza el Paraná y avanza sobre Buenos Aires (dic 1851 – ene 1852): panoramic La-batalla-de-caseros.JPG with `object-fit: cover; object-position: center top`, 3 sources cited
- **CAM-4** — Después de Caseros: los primeros pasos constituyentes (3 feb – 31 may 1852): no image (no verified PD image available), Alberdi quote inline in prose, 3 sources cited

## Verification

All 9 verification checks passed:

| Check | Result |
|-------|--------|
| JS syntax (app.js) | OK |
| `data-certeza="hecho"` count ≥ 18 | 70 ✓ |
| `id="rev-camino-caseros"` present | 1 ✓ |
| `href="#rev-camino-caseros"` present | 1 ✓ |
| `class="alberdi-quote"` unchanged | 6 ✓ |
| Anti-duplication: `45.000 vs` only on line 2262 | ✓ |
| `El camino a Caseros` present | 3 ✓ |
| CAM-3 `object-fit: cover; object-position: center top` | line 2329 ✓ |
| CAM-4 has no `<div class="card-image">` | ✓ |

## New Requirements Surfaced

- none

## Deviations

- **`grep -n "45\.000 vs"` pattern** from the slice plan returns no output — the HTML uses `~45.000 soldados vs.` with a Spanish thousands-separator dot. Not a regression; confirmed via `grep '45.000' | grep ' vs'` that the text appears only in SP3-6 (line 2262). The slice plan's regex was imprecise.
- **Pre-task `data-certeza="hecho"` count was 66** (plan assumed 14 existing → ≥18 threshold). Actual baseline was much higher due to cards added in later milestones. Post-task count is 70. Requirement is satisfied; the discrepancy is only in the plan's baseline assumption.

## Known Limitations

- CAM-4 has no image — no verified public domain image exists for the immediate post-Caseros constituyente period. The card is complete and readable without one.
- Image URLs depend on Wikimedia Commons availability. If Wikimedia changes thumb paths, the `initImageFallbacks()` function in `app.js` provides automatic visual fallback (no broken `<img>` tags shown to users).

## Follow-ups

- none — slice is complete per milestone DoD

## Files Created/Modified

- `index.html` — added sub-nav link for `#rev-camino-caseros` and 4-card HTML block (CAM-1…CAM-4) within `#rev-1835-1852`
- `.gsd/milestones/M018/slices/S02/S02-PLAN.md` — added `## Observability / Diagnostics` section (pre-flight gap fix by executor)

## Forward Intelligence

### What the next slice should know
- M018 is complete — both slices are done. No further slices are planned.
- The `#rev-camino-caseros` grid follows all established patterns (`events-grid--certeza`, `card-hecho`, `card-certeza-indicator`, `card-source cite`, `--reveal-delay` stagger). Any future slice adding cards to this grid can copy CAM-1 as a template.
- The `data-certeza="hecho"` count is now 70. Any verification check that asserts a specific count should use ≥N, not =N.

### What's fragile
- **Wikimedia thumb URLs** (CAM-1, CAM-2, CAM-3) — these are constructed thumb paths; if Commons renames or moves the files, the images will break. The `initImageFallbacks` in `app.js` handles graceful degradation.
- **CAM-4 Alberdi quote** — the inline quote `«El pueblo que ha combatido veinte años…»` is also repeated verbatim in the existing `alberdi-quote` blockquote connector block that follows `#rev-camino-caseros`. This is intentional (the connector gives full citation context) but a future editor might flag it as apparent duplication.

### Authoritative diagnostics
- `grep -c 'data-certeza="hecho"' index.html` → 70 is the authoritative post-M018 baseline count for hecho cards
- `grep -c 'class="alberdi-quote' index.html` → 6 is the locked count; should not grow without a deliberate decision
- `grep -n 'id="rev-camino-caseros"' index.html` → line 2273 is the grid insertion point

### What assumptions changed
- Plan assumed 14 existing `data-certeza="hecho"` cards → actual was 66. The ≥18 threshold was always met, but any future plan that hardcodes a baseline count from this plan will be wrong.
