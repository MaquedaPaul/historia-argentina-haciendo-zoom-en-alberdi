---
id: T01
parent: S16
milestone: M008
provides:
  - S16-CONTENT-DRAFT.md with verified historical prose and verbatim T02 Recipe HTML for three Mazorca repression cards
key_files:
  - .gsd/milestones/M008/slices/S16/S16-CONTENT-DRAFT.md
key_decisions:
  - Florencio Varela assassination (20 March 1848) attributed per liberal historiography, not asserted as fact — revisionists dispute the Mazorca agent claim
  - S16-1 uses Facundo cover (1845, PD) as image — preferred over a portrait because it is the primary source document that systematically described the repression
  - S16-2 carries no image, consistent with S14-3 and S15-2 historiographic/context card pattern
  - card-nota-historiografica in S16-3 covers three distinct positions (liberal estimate, revisionist contextualization, contemporary synthesis) without repeating the general liberal/revisionist polarity already seeded in S14-3
patterns_established:
  - HTML entities used for ALL non-ASCII in the T02 Recipe block (ó→&#xF3;, é→&#xE9;, etc.) — encoding safety on Windows
  - Stagger delays reset to 0ms/80ms/160ms for each slice's own card group
observability_surfaces:
  - grep -c 'data-certeza' index.html → 79 after T02 (was 76)
  - grep -c 'data-id="S16-' index.html → 3 after T02
  - grep -c 'cards will be appended here' index.html → 1 (marker intact)
  - C:/tmp/index.html.bak-s16 → pre-splice backup for diff inspection
duration: ~20m
verification_result: passed
completed_at: 2026-03-23
blocker_discovered: false
---

# T01: Author S16-CONTENT-DRAFT.md with historical prose and verbatim T02 Recipe HTML

**Created S16-CONTENT-DRAFT.md with three Mazorca repression cards (two card-hecho + one card-opinion/debatido) and fully entity-encoded T02 Recipe HTML ready for mechanical splice.**

## What Happened

1. Read SP3-2 (index.html lines 1842–1868) to confirm exact scope: SP3-2 already covers the 1839–1842 period overview, Manuel Vicente Maza assassination, Lynch's caveat on exaggeration, and Salón Literario closure. S16-1 scope defined around what SP3-2 does NOT cover: Mazorca structure (Sociedad Popular Restauradora → enforcement branch), the "degüello" method, named victims beyond Maza (Agustín Maza, Juan Bautista Peña), the "Noche de los cuchillos" (June–July 1840), and punzó enforcement mechanics.

2. Read SP3-3 (index.html lines 1869–1900+) to confirm scope: SP3-3 covers Alberdi's Valparaíso quote and the intellectual production of the exiles. S16-2 was scoped to the repression mechanics of exile — property confiscation, departure under duress, Florencio Varela assassination, and punzó as daily coercion system — without touching the literary/intellectual angle.

3. Read S15 card HTML (index.html lines 1769–1800) to confirm the exact structural template including entity-encoding patterns, CSS classes, certeza indicators, and source footer markup.

4. Wrote S16-CONTENT-DRAFT.md with:
   - Overview section documenting what this slice does NOT duplicate
   - Prose sections for all three cards with sources
   - T02 Recipe HTML block with all non-ASCII encoded as HTML entities

Content decisions locked in:
- S16-1 (card-hecho, 0ms): Mazorca structure and documented mechanics — goes deeper than SP3-2's overview
- S16-2 (card-hecho, 80ms): Exile as repression — confiscations, Florencio Varela assassination (attributed, not asserted), punzó coercion
- S16-3 (card-opinion/debatido, 160ms): Scale debate with card-nota-historiografica covering liberal estimate, revisionist contextualization, and contemporary synthesis

## Verification

```
test -s .gsd/milestones/M008/slices/S16/S16-CONTENT-DRAFT.md && echo OK
→ OK

grep -c "^## Card S16-" .gsd/milestones/M008/slices/S16/S16-CONTENT-DRAFT.md
→ 3

grep -c "T02 Recipe" .gsd/milestones/M008/slices/S16/S16-CONTENT-DRAFT.md
→ 1

grep -c 'data-id="S16-' .gsd/milestones/M008/slices/S16/S16-CONTENT-DRAFT.md
→ 3

grep 'data-certeza=' .gsd/milestones/M008/slices/S16/S16-CONTENT-DRAFT.md (recipe lines)
→ data-certeza="hecho" (S16-1, 0ms), data-certeza="hecho" (S16-2, 80ms), data-certeza="debatido" (S16-3, 160ms)
```

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -s .gsd/milestones/M008/slices/S16/S16-CONTENT-DRAFT.md && echo OK` | 0 | ✅ pass | <1s |
| 2 | `grep -c "^## Card S16-" .gsd/milestones/M008/slices/S16/S16-CONTENT-DRAFT.md` (returns 3) | 0 | ✅ pass | <1s |
| 3 | `grep -c "T02 Recipe" .gsd/milestones/M008/slices/S16/S16-CONTENT-DRAFT.md` (returns 1) | 0 | ✅ pass | <1s |

Slice verification checks (T01 partial pass — T02 not yet run):
- `test -s .gsd/milestones/M008/slices/S16/S16-CONTENT-DRAFT.md && echo OK` → ✅ OK
- `grep -c 'data-certeza' index.html` → pending T02 (currently 76, expected 79 after T02)
- `grep -c 'data-id="S16-' index.html` → pending T02
- `grep -c 'cards will be appended here' index.html` → pending T02
- `git diff --name-only HEAD -- styles.css app.js` → ✅ empty (no CSS/JS changes in T01)

## Diagnostics

After T02 runs, inspection points:
- `grep -n 'data-id="S16-' index.html` — shows insertion line; should immediately precede the append marker comment
- `diff C:/tmp/index.html.bak-s16 index.html` — confirms exactly what was inserted and nothing else changed
- Load `index.html` in browser → DevTools → `#periodo-rosas` → look for `[data-id="S16-1"]`, `[data-id="S16-2"]`, `[data-id="S16-3"]`
- If entity encoding is wrong: cards will show `?` or mojibake in title/excerpt text

## Deviations

None — executed exactly as specified in T01-PLAN.md.

## Known Issues

None.

## Files Created/Modified

- `.gsd/milestones/M008/slices/S16/S16-CONTENT-DRAFT.md` — created; contains three-card prose, sources, and T02 Recipe HTML block with full entity encoding
- `.gsd/milestones/M008/slices/S16/S16-PLAN.md` — added `## Observability / Diagnostics` section and slice verification diagnostics (pre-flight gap fix)
