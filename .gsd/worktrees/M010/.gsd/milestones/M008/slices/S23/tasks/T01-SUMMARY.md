---
id: T01
parent: S23
milestone: M008
provides:
  - S23-CONTENT-DRAFT.md with entity-encoded T02 Recipe HTML for two Encarnación Ezcurra cards
key_files:
  - .gsd/milestones/M008/slices/S23/S23-CONTENT-DRAFT.md
key_decisions:
  - Used "Sociedad Popular Restauradora" (not "Mazorca") for Encarnación's organisation, consistent with her death in 1838 before the repressive Mazorca period
  - card-nota-historiografica uses two-position format (Irazusta revisionista / Lynch synthesis), mirroring S21-2 pattern — three positions not needed since Lynch IS the synthesis
  - S23-2 has no card-image block, mirroring S21-2 no-image pattern for interpretive companion cards
  - Marriage date uses year only ("en 1813") — exact day disputed between sources
patterns_established:
  - T02 Recipe HTML fully entity-encoded with no raw non-ASCII characters in the splice block (ENTITY_PASS verified)
  - Scope boundary enforced: no banned terms (Mazorca, Caseros, etc.) in T02 Recipe (SCOPE_PASS verified)
observability_surfaces:
  - test -s .gsd/milestones/M008/slices/S23/S23-CONTENT-DRAFT.md
  - node entity check returns ENTITY_PASS
  - node scope check returns SCOPE_PASS
duration: ~15m
verification_result: passed
completed_at: 2026-03-23
blocker_discovered: false
---

# T01: Author S23-CONTENT-DRAFT.md with Encarnación Ezcurra cards and entity-encoded T02 Recipe

**Authored S23-CONTENT-DRAFT.md with two Encarnación Ezcurra cards (S23-1 card-hecho, S23-2 card-opinion) and fully entity-encoded T02 Recipe HTML; both ENTITY_PASS and SCOPE_PASS verified.**

## What Happened

Read structural reference cards S20-1, S20-2, S21-1, S21-2, and S22-1 from index.html to confirm the card-hecho / card-opinion pattern, image caption class (`card-image__caption`), certeza indicator block structure, and stagger delay reset convention (0ms / 80ms per slice).

Reviewed S23-RESEARCH.md for historical facts, constraints, and the Lynch cap. 5 attribution requirement. Key content decisions:

- **S23-1 (`card-hecho`):** Documents Encarnación's role as political operator during Rosas's desert campaign (1833–1835), the Revolución de los Restauradores (October 1833), her cross-class intelligence network, and the Sociedad Popular Restauradora. Death noted as 20 October 1838 with explicit statement that the brazo armado only became a repressive instrument after her death — keeping "Mazorca" out of the T02 Recipe block entirely.
- **S23-2 (`card-opinion`):** Two-position nota historiográfica: Irazusta (revisionista, co-constitutive role) vs. Lynch cap. 5 (synthesis, essential but in function of Rosas's project). No card-image block, mirroring S21-2. No direct quotes — attributed paraphrase throughout per KNOWLEDGE.md protocol.
- Marriage date uses year only ("en 1813") to avoid the March/May discrepancy between sources.

Wrote the draft, then ran both verification checks:
- ENTITY_PASS — T02 Recipe block has zero raw non-ASCII characters
- SCOPE_PASS — no banned terms (Mazorca, Caseros, Barranco Yaco, etc.) in T02 Recipe

Also added `## Observability / Diagnostics` to S23-PLAN.md and `## Observability Impact` to T01-PLAN.md as required by pre-flight instructions.

## Verification

```
test -s .gsd/milestones/M008/slices/S23/S23-CONTENT-DRAFT.md  → FILE_EXISTS
ENTITY_PASS (node entity check on T02 Recipe block)
SCOPE_PASS  (node scope-boundary check on T02 Recipe block)
```

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -s .gsd/milestones/M008/slices/S23/S23-CONTENT-DRAFT.md && echo FILE_EXISTS` | 0 | ✅ pass | <1s |
| 2 | `node -e "... ENTITY_PASS check ..."` | 0 (ENTITY_PASS) | ✅ pass | <1s |
| 3 | `node -e "... SCOPE_PASS check ..."` | 0 (SCOPE_PASS) | ✅ pass | <1s |

## Diagnostics

- `test -s .gsd/milestones/M008/slices/S23/S23-CONTENT-DRAFT.md` — confirms file exists and is non-empty
- `node -e "const f=require('fs').readFileSync('.gsd/milestones/M008/slices/S23/S23-CONTENT-DRAFT.md','utf8'); const r=f.slice(f.indexOf('## T02 Recipe')); const lines=r.split('\n').filter(l=>/[^\x00-\x7F]/.test(l)); console.log(lines.length===0?'ENTITY_PASS':'ENTITY_FAIL:'+lines.length);"` — ENTITY_PASS expected
- `node -e "const f=require('fs').readFileSync('.gsd/milestones/M008/slices/S23/S23-CONTENT-DRAFT.md','utf8'); const r=f.slice(f.indexOf('## T02 Recipe')); const banned=['Barranco Yaco','Mazorca','bloqueo franc','bloqueo anglo','Vuelta de Obligado','Caseros']; const found=banned.filter(b=>r.includes(b)); console.log(found.length===0?'SCOPE_PASS':'SCOPE_FAIL:'+found.join(','));"` — SCOPE_PASS expected

## Deviations

None. Task followed the plan exactly.

## Known Issues

None.

## Files Created/Modified

- `.gsd/milestones/M008/slices/S23/S23-CONTENT-DRAFT.md` — created; contains prose sections S23-1, S23-2, and fully entity-encoded T02 Recipe HTML block
- `.gsd/milestones/M008/slices/S23/S23-PLAN.md` — added `## Observability / Diagnostics` section (pre-flight fix)
- `.gsd/milestones/M008/slices/S23/tasks/T01-PLAN.md` — added `## Observability Impact` section (pre-flight fix)
