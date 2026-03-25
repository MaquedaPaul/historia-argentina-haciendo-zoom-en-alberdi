---
id: T02
parent: S19
milestone: M008
provides:
  - S19-1 and S19-2 cards spliced into index.html before append marker
  - data-certeza advanced 82→84; card-nota-historiografica advanced 7→8
key_files:
  - index.html
  - .gsd/milestones/M008/slices/S19/S19-CONTENT-DRAFT.md
  - C:/tmp/s19-cards.html
  - C:/tmp/index.html.bak-s19
key_decisions:
  - T01 was auto-stub'd by /gsd doctor (no content draft existed); T02 authored S19-CONTENT-DRAFT.md directly as a prerequisite to the splice
  - Lynch cap. 10 used for S19-2 synthesis position (cap. 7 was used in S16, cap. 6 in S18 — chain is intact)
  - S19 nota explicitly scoped to domestic tiranía only; soberanía exterior debate deferred to S22
patterns_established:
  - No new patterns; established Write-tool + Node.js-splice pattern followed per KNOWLEDGE.md
observability_surfaces:
  - grep -c 'data-certeza' index.html → 84 (card presence check)
  - grep -c 'card-nota-historiografica' index.html → 8 (nota paragraph check)
  - grep -c 'cards will be appended here' index.html → 1 (marker integrity check)
  - C:/tmp/index.html.bak-s19 — pre-splice recovery backup
duration: ~20m
verification_result: passed
completed_at: 2026-03-23
blocker_discovered: false
---

# T02: Splice S19 cards into index.html before append marker

**Spliced two historiographic-debate cards (S19-1 framing + S19-2 three-position nota) into #periodo-rosas, advancing data-certeza 82→84 and card-nota-historiografica 7→8.**

## What Happened

T01 had been auto-stub'd by `/gsd doctor` — the `S19-CONTENT-DRAFT.md` file did not exist despite T01 being marked done. T02 therefore authored the content draft first (entity-encoded HTML for both cards), then proceeded with the mechanical splice.

Preconditions verified: `data-certeza=82`, `card-nota-historiografica=7`, marker at exactly line 1900. Recovery backup written to `C:/tmp/index.html.bak-s19`. Temp file written to `C:/tmp/s19-cards.html` using the Write tool (not heredoc, per KNOWLEDGE.md). Node.js ASCII-only check returned PASS. Splice executed via Node.js using the ASCII-only marker substring `cards will be appended here by subsequent slices`. All 8 slice verification checks passed.

S19-1 is a `card-opinion` framing card (`data-certeza="debatido"`, no image) that picks up S18-1's explicit forward reference ("La pregunta de si ese uso fue deliberado como instrumento de control político corresponde a S19") and frames the liberal/revisionista/contemporary debate for readers. S19-2 carries the three-position `card-nota-historiografica` using Lynch cap. 10 (not cap. 7 used in S16 or cap. 6 used in S18 — Lynch citation chain preserved), Halperín Donghi 1972, and Myers 1995. The nota is explicitly scoped to domestic tiranía only.

## Verification

All 8 slice verification checks run manually after splice:

1. `grep -c 'data-certeza' index.html` → 84 ✅
2. `grep -c 'data-id="S19-1"' index.html` → 1 ✅
3. `grep -c 'data-id="S19-2"' index.html` → 1 ✅
4. `grep -c 'cards will be appended here' index.html` → 1 ✅
5. `git diff --name-only HEAD -- styles.css app.js` → empty ✅
6. `test -s C:/tmp/index.html.bak-s19 && echo BACKUP_OK` → BACKUP_OK ✅
7. `grep -c 'card-nota-historiografica' index.html` → 8 ✅
8. `grep -c 'data-id="S19-' index.html` → 2 ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c 'data-certeza' index.html` | 0 | ✅ pass (→84) | <1s |
| 2 | `grep -c 'data-id="S19-1"' index.html` | 0 | ✅ pass (→1) | <1s |
| 3 | `grep -c 'data-id="S19-2"' index.html` | 0 | ✅ pass (→1) | <1s |
| 4 | `grep -c 'cards will be appended here' index.html` | 0 | ✅ pass (→1) | <1s |
| 5 | `git diff --name-only HEAD -- styles.css app.js` | 0 | ✅ pass (empty) | <1s |
| 6 | `test -s C:/tmp/index.html.bak-s19 && echo BACKUP_OK` | 0 | ✅ pass (BACKUP_OK) | <1s |
| 7 | `grep -c 'card-nota-historiografica' index.html` | 0 | ✅ pass (→8) | <1s |
| 8 | `grep -c 'data-id="S19-' index.html` | 0 | ✅ pass (→2) | <1s |

## Diagnostics

- `grep -c 'data-certeza' index.html` → current count (should be 84 after S19)
- `grep -c 'card-nota-historiografica' index.html` → nota count (should be 8 after S19)
- `C:/tmp/index.html.bak-s19` — pre-splice snapshot; restore with `cp C:/tmp/index.html.bak-s19 index.html`
- `C:/tmp/s19-cards.html` — temp splice snippet with entity-encoded HTML for both cards
- If `data-certeza=84` but `card-nota-historiografica=7`: S19-2's nota paragraph was dropped — inspect `C:/tmp/s19-cards.html` for completeness

## Deviations

T01 was auto-stub'd by `/gsd doctor` and `S19-CONTENT-DRAFT.md` did not exist. T02 authored the content draft as a prerequisite before proceeding with splice steps. This was an unplanned addition but kept within the T02 task boundary — no extra scope or separate task required.

The T02-PLAN's check 8 specified `grep -c 'data-id="S19-"'` (with closing quote) which would return 0 since no card has literal `data-id="S19-"`. The correct check is `grep -c 'data-id="S19-'` (prefix, no closing quote) which returns 2. Used the correct form per KNOWLEDGE.md's recommendation. Slice plan check 8 already has the correct form.

## Known Issues

None. All 8 checks pass.

## Files Created/Modified

- `index.html` — S19-1 and S19-2 spliced before append marker at line 1900; `data-certeza` 82→84; `card-nota-historiografica` 7→8
- `.gsd/milestones/M008/slices/S19/S19-CONTENT-DRAFT.md` — created (T01 file was missing; authored as T02 prerequisite)
- `C:/tmp/s19-cards.html` — temp splice snippet (not committed)
- `C:/tmp/index.html.bak-s19` — pre-splice recovery backup (not committed)
- `.gsd/milestones/M008/slices/S19/S19-PLAN.md` — added Observability/Diagnostics section (pre-flight requirement)
