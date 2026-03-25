---
id: T01
parent: S13
milestone: M008
provides:
  - S13-CONTENT-DRAFT.md with full card prose for S13-1 and S13-2
  - T02 Recipe HTML block ready for verbatim splice into index.html
key_files:
  - .gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md
key_decisions:
  - Both cards use data-certeza="hecho" — no historiographic ambiguity in 1828–1832 factual narrative
  - Campaña del Desierto nuance placed explicitly in S13-2 prose body, not as footnote
  - Stagger delays reset to 0ms/80ms (not cumulative from S12)
patterns_established:
  - Content draft includes exact T02 Recipe HTML block in fenced code block — T02 is a mechanical copy-paste with zero authorship required
observability_surfaces:
  - test -s .gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md && echo OK
  - grep -c 'S13-' .gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md (must be >=2)
  - grep 'Balcarce' .gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md (must match)
duration: 8m
verification_result: passed
completed_at: 2026-03-23
blocker_discovered: false
---

# T01: Write S13 content draft with verified card text and T02 Recipe HTML

**Wrote S13-CONTENT-DRAFT.md with full verified prose for both cards (S13-1: Dorrego's execution and 1829 civil war; S13-2: first mandate 1829–1832 with explicit Campaña del Desierto / Balcarce nuance) and a complete T02 Recipe HTML block ready for verbatim splice.**

## What Happened

Loaded S13-CONTEXT.md and S13-RESEARCH.md to confirm verified chronology, image URLs, and sources. Read the existing card HTML pattern from index.html (lines 1620–1682, S11/S12 cards) to confirm exact attributes and class names. Applied the pre-flight observability fixes to S13-PLAN.md (added `## Observability / Diagnostics` section and a diagnostic failure-path check in the Verification block) and to T01-PLAN.md (added `## Observability Impact` section). Wrote S13-CONTENT-DRAFT.md with:

- **Card S13-1** narrative: Lavalle coup (1 Dec 1828) → Dorrego's summary execution at Navarro (13 Dec 1828, no trial) → federal milicias rally under Rosas → Puente de Márquez (April 1829) → Convenio de Cañuelas (24 Jun 1829) + Convenio de Barracas (24 Aug 1829) → Legislatura elects Rosas governor (8 Dec 1829). Image: `Juan_Manuel_de_Rosas_1829.jpg` (unused, PD). Sources: Lynch (1981 cap. 3), Saldías (1892 t. I), Halperín Donghi (1972).
- **Card S13-2** narrative: Rosas governs with ordinary powers (Suma del Poder Público rejected by Legislatura) → fiscal consolidation, milicia strengthening, order restoration → December 1832 retirement when Suma still not granted → explicit nuance: the Campaña del Desierto (1833) was commanded by Rosas as military officer while Governor Juan Ramón Balcarce held the governorship. Image: `Juan_Manuel_de_Rosas_by_Descalzi_oval.png` (unused, PD). Sources: Lynch (1981 cap. 3), Saldías (1892), Zinny (1882).
- **T02 Recipe HTML block** at end of draft: complete `<article>` elements with all attributes, class names, image tags, prose paragraphs, and `<footer><cite>` — ready for verbatim splice.

## Verification

Ran T01 verification commands immediately after writing the draft:

1. `test -s ... && echo OK` → `PASS: file non-empty` ✅
2. `grep -c 'S13-'` → 10 (≥2 required) ✅
3. `grep 'Balcarce\|Campaña del Desierto'` → matched in both prose body and T02 Recipe HTML sections ✅

Also ran partial slice-level checks: draft file OK ✅, marker in index.html intact (1 occurrence) ✅, no CSS/JS drift ✅. The `data-certeza` count (69) and `S13-` in index.html (0) remain at pre-T02 values — expected since T02 has not run.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -s .gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md && echo OK` | 0 | ✅ pass | <1s |
| 2 | `grep -c 'S13-' .gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md` | 0 | ✅ pass (10 ≥ 2) | <1s |
| 3 | `grep 'Balcarce\|Campaña del Desierto' S13-CONTENT-DRAFT.md` | 0 | ✅ pass (matched) | <1s |
| 4 | `grep -c 'cards will be appended here' index.html` | 0 | ✅ pass (1) | <1s |
| 5 | `git diff --name-only HEAD -- styles.css app.js` | 0 | ✅ pass (empty) | <1s |

## Diagnostics

- `test -s .gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md && echo OK` — confirms draft artifact was written.
- `grep -c 'S13-' .gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md` — confirms both data-id markers present.
- `grep 'Balcarce' .gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md` — confirms the Campaña del Desierto nuance was not lost.
- T02 Recipe HTML block is in a fenced code block at the end of the draft — if missing, `grep '## T02 Recipe HTML' S13-CONTENT-DRAFT.md` returns nothing and T02 must re-request T01.

## Deviations

None. All steps executed as planned.

## Known Issues

None. Both image URLs confirmed unused in index.html (existing Rosas images at lines 1353, 1654, 1708, 1730 are different files).

## Files Created/Modified

- `.gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md` — Created: full content draft with card prose and T02 Recipe HTML block
- `.gsd/milestones/M008/slices/S13/S13-PLAN.md` — Modified: added `## Observability / Diagnostics` section and diagnostic failure-path check in Verification block (pre-flight fix)
- `.gsd/milestones/M008/slices/S13/tasks/T01-PLAN.md` — Modified: added `## Observability Impact` section (pre-flight fix)
