---
id: T01
parent: S12
milestone: M008
provides:
  - S12-CONTENT-DRAFT.md with verified historical content and complete T02 Recipe HTML for both cards
key_files:
  - .gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md
  - .gsd/milestones/M008/slices/S12/S12-PLAN.md
key_decisions:
  - Used 3 sources per card (≥2 required); S12-2 includes the Pacto Federal primary text as one of three
  - Stagger reset to 0ms/80ms per slice rule, not continued from S11
  - Kept both cards purely factual — no historiographic debate per plan (debate belongs to S17–S19)
patterns_established:
  - S12-CONTENT-DRAFT.md follows established draft pattern (metadata table + excerpt + sources + image table + T02 Recipe)
observability_surfaces:
  - grep -c 'T02 Recipe' .gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md  # must be >=1
  - grep -c 'data-certeza="hecho"' .gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md  # must be >=2 (recipe entries)
  - test -s .gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md && echo OK
duration: 8m
verification_result: passed
completed_at: 2026-03-23
blocker_discovered: false
---

# T01: Escribir S12-CONTENT-DRAFT.md con contenido verificado y receta HTML

**Wrote S12-CONTENT-DRAFT.md with verified historical content for both S12 cards and complete copy-paste HTML recipe for T02 insertion.**

## What Happened

Read S12-CONTEXT.md and S12-RESEARCH.md to absorb the historical framework, confirmed image URLs, and restriction notes. Reviewed existing `card-hecho` template from S11 cards in index.html (lines 1612–1651) to match the exact class/attribute pattern.

Drafted card S12-1 (Un país sin gobierno nacional — el poder real en manos de los caudillos, 1820–1852) with a 5-sentence excerpt covering: no national government, caudillos as sovereign rulers, Buenos Aires governor's de facto role via aduana control (~80% of fiscal revenue) and foreign relations delegation, and the absence of legal authority over other provinces. Three sources: Halperin Donghi 1972, Lynch 1981 cap. 2, Goldman y Salvatore 1998.

Drafted card S12-2 (El Pacto Federal de 1831 — la Confederación sin Estado central) with a 5-sentence excerpt covering: date and signatories (Buenos Aires, Santa Fe, Entre Ríos), provisions (offensive/defensive alliance, river navigation, Comisión Representativa), dissolution of the Comisión in 1832, Corrientes adhesion, and the Pacto's role as constitutional backbone until 1853. Three sources: Pacto Federal primary text (1831), Halperin Donghi 1972, Lynch 1981.

Both cards are `data-certeza="hecho"` — no historiographic debate introduced. Stagger resets to 0ms (S12-1) and 80ms (S12-2) per the slice rule.

The T02 Recipe section provides the full HTML block (~40 lines) ready for mechanical Node.js splice into index.html. The recipe uses ASCII-only marker substring `'cards will be appended here by subsequent slices'` per KNOWLEDGE.md rule on en-dash encoding.

Also fixed S12-PLAN.md by adding the missing `## Observability / Diagnostics` section (pre-flight requirement).

## Verification

Ran all T01 verification checks:

```bash
test -s .gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md && echo "archivo existe"
# → "archivo existe"

grep -c 'T02 Recipe' .gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md
# → 2 (>=1 required)

grep -c 'data-certeza="hecho"' .gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md
# → 5 (includes 2 recipe entries + metadata table rows)
```

Also ran slice verification checks that are applicable at T01 stage:
- `grep -c 'data-certeza' index.html` → 67 (unchanged, T02 not yet run ✅)
- `grep -c 'cards will be appended here' index.html` → 1 (marker intact ✅)
- `git diff --name-only HEAD -- styles.css app.js` → empty (no CSS/JS changes ✅)
- `test -s .gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md` → OK ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -s .gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md && echo OK` | 0 | ✅ pass | <1s |
| 2 | `grep -c 'T02 Recipe' .gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md` | 0 | ✅ pass (returned 2, ≥1 required) | <1s |
| 3 | `grep -c 'data-certeza="hecho"' .gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md` | 0 | ✅ pass (returned 5, ≥2 recipe entries) | <1s |
| 4 | `grep -c 'data-certeza' index.html` | 0 | ✅ pass (67, unchanged) | <1s |
| 5 | `grep -c 'cards will be appended here' index.html` | 0 | ✅ pass (1) | <1s |
| 6 | `git diff --name-only HEAD -- styles.css app.js` | 0 | ✅ pass (empty) | <1s |

## Diagnostics

To inspect what this task built:

```bash
# Confirm draft exists and is non-empty
test -s .gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md && echo OK

# Confirm both recipe entries are present
grep -c 'data-certeza="hecho"' .gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md
# Expected: 5 (2 metadata table cells + 2 article attributes + 1 checklist mention)

# View the T02 Recipe HTML block directly
grep -A 80 'T02 Recipe' .gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md | head -90

# Confirm image URLs are correct
grep 'thumb/3/39/Retrato' .gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md
grep 'thumb/7/76/Flag-map' .gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md
```

## Deviations

None. Followed the plan exactly. Added 3 sources per card (plan required ≥2) — using the third source available in the research eliminates any single-source weakness.

## Known Issues

None. Both image URLs are API-verified and unused in index.html per S12-RESEARCH.md. T02 can proceed directly to the Node.js splice.

## Files Created/Modified

- `.gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md` — created; contains S12-1 and S12-2 card content with sources, image URLs, alt text, and complete T02 Recipe HTML block (≈40 lines)
- `.gsd/milestones/M008/slices/S12/S12-PLAN.md` — added missing `## Observability / Diagnostics` section (pre-flight fix)
