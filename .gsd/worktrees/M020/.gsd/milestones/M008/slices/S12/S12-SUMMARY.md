---
id: S12
parent: M008
milestone: M008
provides:
  - 2 card-hecho articles in #periodo-rosas explaining (1) fragmented governance 1820–1852 (caudillos + Buenos Aires aduana) and (2) the Pacto Federal 1831 as the constitutional backbone of the Confederación without a central State
requires:
  - slice: S11
    provides: Referentes de cada bando (perfiles de líderes unitarios y federales) as context; append marker at known line
affects:
  - S13 (next slice — first Rosas government; insertion point is now line 1682)
key_files:
  - index.html
  - .gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md
key_decisions:
  - Both cards are purely factual (data-certeza="hecho") — no historiographic debate introduced; debate reserved for S17–S19
  - 3 sources per card (plan required ≥2); S12-2 includes the Pacto Federal primary text as one of three
  - Stagger resets to 0ms/80ms (per-slice rule, not cumulative from S11)
  - Used C:/tmp/ instead of /tmp/ because this is a Windows environment
  - ASCII-only marker substring used in Node.js splice to avoid en-dash encoding failure
patterns_established:
  - On Windows, write temp files to C:/tmp/ not /tmp/; create directory first with mkdir -p C:/tmp
  - Pre-splice backup at C:/tmp/index.html.bak-s12 created as standard recovery artifact
  - Stagger delay resets to 0ms on each new slice — do NOT continue cumulative delay from prior slice
observability_surfaces:
  - "grep -c 'data-certeza' index.html  → 69 (was 67 before S12)"
  - "grep -n 'cards will be appended here by subsequent slices' index.html  → line 1682 (S13 insertion point)"
  - "Recovery: cp C:/tmp/index.html.bak-s12 index.html"
drill_down_paths:
  - .gsd/milestones/M008/slices/S12/tasks/T01-SUMMARY.md
  - .gsd/milestones/M008/slices/S12/tasks/T02-SUMMARY.md
duration: 16m (T01: 8m + T02: 8m)
verification_result: passed
completed_at: 2026-03-23
---

# S12: La gobernación en un país dividido — caudillos y Buenos Aires

**2 card-hecho articles (caudillos 1820–1852 and Pacto Federal 1831) spliced into #periodo-rosas; data-certeza count raised from 67 to 69; all 5 slice verification checks pass.**

## What Happened

**T01** produced `S12-CONTENT-DRAFT.md` with verified historical content and a complete T02 Recipe HTML block for both cards.

- **Card S12-1** (*Un país sin gobierno nacional — el poder real en manos de los caudillos, 1820–1852*): 5-sentence excerpt covering the absence of a national executive, caudillos as sovereign rulers of their provinces, and the Buenos Aires governor's de facto primacy through aduana control (~80% of fiscal revenue) and conduct of foreign relations. Three sources: Halperin Donghi (1972), Lynch (1981 cap. 2), Goldman y Salvatore (1998). Image: Rosas portrait (Wikimedia Commons, PD, API-verified).

- **Card S12-2** (*El Pacto Federal de 1831 — la Confederación sin Estado central*): 5-sentence excerpt covering signatories (Buenos Aires, Santa Fe, Entre Ríos), provisions (offensive/defensive alliance, free river navigation, Comisión Representativa), dissolution of the Comisión in 1832, Corrientes adhesion, and the Pacto's role as constitutional backbone until 1853. Three sources: Pacto Federal primary text (1831), Halperin Donghi (1972), Lynch (1981). Image: Flag-map of the Argentine Confederation (Wikimedia Commons, PD, API-verified).

Both cards are `data-certeza="hecho"` — no historiographic debate introduced. Stagger delays reset to 0ms/80ms per the per-slice rule.

**T02** spliced both cards into `index.html` before the append marker using Node.js (Write-tool temp file pattern, not heredoc; ASCII-only marker substring). Splice inserted at line 1646; marker moved to line 1682. Pre-splice backup written to `C:/tmp/index.html.bak-s12`.

## Verification

All five slice-level checks passed:

| Check | Command | Result |
|-------|---------|--------|
| data-certeza count | `grep -c 'data-certeza' index.html` | **69** (was 67) ✅ |
| S12 slice markers | `grep -c 'S12-' index.html` | **2** ✅ |
| Append marker unique | `grep -c 'cards will be appended here' index.html` | **1** ✅ |
| CSS/JS unchanged | `git diff --name-only HEAD -- styles.css app.js` | **(empty)** ✅ |
| Draft exists | `test -s S12-CONTENT-DRAFT.md && echo OK` | **OK** ✅ |

## New Requirements Surfaced

- None.

## Deviations

- `/tmp/s12-cards.html` path specified in plan does not work on Windows; used `C:/tmp/s12-cards.html` instead. Backup also written to `C:/tmp/index.html.bak-s12`. All functionality equivalent. (Pattern added to KNOWLEDGE.md as part of S12-T02 completion.)

## Known Limitations

- None. Both cards are complete and verified. The slice is narrowly scoped to the two specified factual topics; the historiographic debate about Rosas's governance belongs to S17–S19 as planned.

## Follow-ups

- None within S12 scope. S13 (primer gobierno de Rosas) can begin immediately — insertion point is **line 1682**.

## Files Created/Modified

- `index.html` — 2 new card-hecho articles (S12-1 and S12-2) inserted before append marker at line 1646; data-certeza count = 69; marker now at line 1682
- `.gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md` — created; contains S12-1 and S12-2 card content with sources, image URLs, alt text, and complete T02 Recipe HTML
- `.gsd/milestones/M008/slices/S12/S12-PLAN.md` — added missing Observability/Diagnostics section (T01 pre-flight fix)
- `C:/tmp/s12-cards.html` — temporary HTML file (Write tool pattern)
- `C:/tmp/index.html.bak-s12` — pre-splice backup for recovery

## Forward Intelligence

### What the next slice should know
- The S13 insertion point is **line 1682** in the current `index.html`. Confirm with `grep -n 'cards will be appended here by subsequent slices' index.html` before splicing — never hard-code the line number.
- Both S12 cards use the Rosas portrait image (`thumb/3/39/Retrato_de_Juan_Manuel_de_Rosas...`). S13 should use a different image to avoid visual repetition — consider the 1830s lithograph or the second-term portrait if Wikimedia has it.
- The Pacto Federal 1831 is now introduced in S12-2. S13 (first government 1829–1832) chronologically precedes the Pacto — narrate it as the lead-up to the Pacto, which is already explained in S12-2. Avoid duplicating the Pacto explanation.

### What's fragile
- `C:/tmp/index.html.bak-s12` is the only recovery artifact from T02's splice. If `index.html` is corrupted before this backup is superseded, restoring with `cp C:/tmp/index.html.bak-s12 index.html` will lose S12 cards (count drops back to 67) — which is acceptable as a recovery option, but S12 T02 would need re-running.

### Authoritative diagnostics
- `grep -n 'cards will be appended here by subsequent slices' index.html` — single most reliable signal for the current insertion point. Trust this line number, not any cached value.
- `grep -c 'data-certeza' index.html` — running tally of all cards; must be 69 after S12 and increase by 2 per two-card slice.

### What assumptions changed
- Plan assumed `/tmp/` was available for temp files — it is not on Windows. All future slices must use `C:/tmp/` with `mkdir -p C:/tmp` first. This is now documented in KNOWLEDGE.md.
