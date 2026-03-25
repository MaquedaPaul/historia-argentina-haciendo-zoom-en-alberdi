---
id: T02
parent: S17
milestone: M008
provides:
  - S17-1 card spliced into index.html before append marker; all 8 slice verification checks pass
key_files:
  - index.html
  - C:/tmp/s17-cards.html
  - C:/tmp/index.html.bak-s17
key_decisions:
  - Used Write tool (not heredoc) to write snippet file per KNOWLEDGE.md — avoids Windows shell encoding issues
  - ASCII-only marker substring used in Node.js splice — no en-dash or Unicode
  - Snippet inserted before the marker line by locating lineStart via lastIndexOf('\n', markerIdx)
patterns_established:
  - Backup → Write snippet → Node.js splice → 8-check verification is the established pattern for all S17-style mechanical splice tasks
observability_surfaces:
  - grep -c 'data-certeza' index.html → 80 (was 79; confirms splice)
  - grep -c 'data-id="S17-1"' index.html → 1 (card identity check)
  - grep -c 'cards will be appended here' index.html → 1 (marker integrity)
  - grep -c 'card-nota-historiografica' index.html → 6 (nota block not dropped)
  - C:/tmp/index.html.bak-s17 — pre-splice recovery backup; presence = backup step ran
  - C:/tmp/s17-cards.html — inspect this file if entity encoding corruption suspected
duration: 8m
verification_result: passed
completed_at: 2026-03-23
blocker_discovered: false
---

# T02: Splice S17-1 card into index.html before append marker

**Spliced S17-1 "¿Era Rosas un mal necesario?" card into index.html before the append marker; all 8 slice verification checks pass with data-certeza count now 80.**

## What Happened

Confirmed preconditions (79 `data-certeza`, marker at 1 occurrence, draft non-empty), wrote recovery backup to `C:/tmp/index.html.bak-s17`, then wrote the entity-encoded T02 Recipe HTML block from `S17-CONTENT-DRAFT.md` to `C:/tmp/s17-cards.html` using the Write tool. Ran the Node.js one-liner with the ASCII-only marker substring `'cards will be appended here by subsequent slices'` — it located the marker, found the line boundary via `lastIndexOf('\n', idx)`, and inserted the snippet immediately before the marker line. All 8 verification checks passed on first attempt.

## Verification

All 8 plan-specified verification commands run immediately after splice:

```bash
grep -c 'data-certeza' index.html          # → 80 ✅
grep -c 'data-id="S17-' index.html        # → 1  ✅
grep -c 'data-id="S17-1"' index.html      # → 1  ✅
grep -c 'cards will be appended here' index.html  # → 1 ✅
git diff --name-only HEAD -- styles.css app.js    # → (empty) ✅
test -s C:/tmp/index.html.bak-s17 && echo BACKUP_OK  # → BACKUP_OK ✅
grep -c 'card-nota-historiografica' index.html    # → 6 ✅
test -s .gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md && echo DRAFT_OK  # → DRAFT_OK ✅
```

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c 'data-certeza' index.html` → 80 | 0 | ✅ pass | <1s |
| 2 | `grep -c 'data-id="S17-' index.html` → 1 | 0 | ✅ pass | <1s |
| 3 | `grep -c 'data-id="S17-1"' index.html` → 1 | 0 | ✅ pass | <1s |
| 4 | `grep -c 'cards will be appended here' index.html` → 1 | 0 | ✅ pass | <1s |
| 5 | `git diff --name-only HEAD -- styles.css app.js` → (empty) | 0 | ✅ pass | <1s |
| 6 | `test -s C:/tmp/index.html.bak-s17 && echo BACKUP_OK` → BACKUP_OK | 0 | ✅ pass | <1s |
| 7 | `grep -c 'card-nota-historiografica' index.html` → 6 | 0 | ✅ pass | <1s |
| 8 | `test -s .gsd/milestones/M008/slices/S17 S17-CONTENT-DRAFT.md && echo DRAFT_OK` → DRAFT_OK | 0 | ✅ pass | <1s |

## Diagnostics

- `grep -c 'data-certeza' index.html` — should be 80; any other value post-T02 indicates a splice failure or double-insert
- `grep -c 'data-id="S17-1"' index.html` — should be 1; 0 = splice missed, >1 = duplicate insert
- `grep -c 'cards will be appended here' index.html` — should be 1; 0 = marker corrupted; 2 = marker duplicated
- `grep -c 'card-nota-historiografica' index.html` — should be 6; value of 5 means nota block was dropped
- `C:/tmp/index.html.bak-s17` — pre-splice backup; restore with `cp C:/tmp/index.html.bak-s17 index.html`
- `C:/tmp/s17-cards.html` — inspect to verify entity encoding is intact if garbled characters appear in browser

## Deviations

None. Task executed exactly as planned.

## Known Issues

None.

## Files Created/Modified

- `index.html` — S17-1 card spliced before append marker; `data-certeza` count raised from 79 to 80; `card-nota-historiografica` count raised from 5 to 6
- `C:/tmp/s17-cards.html` — temp splice snippet (not committed; entity-encoded HTML from T02 Recipe block)
- `C:/tmp/index.html.bak-s17` — pre-splice recovery backup (not committed)
