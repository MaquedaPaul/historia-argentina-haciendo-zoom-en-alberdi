---
id: T02
parent: S21
milestone: M008
provides:
  - S21-1 (card-hecho, constitutional mechanics of the Suma) and S21-2 (card-opinion, historiographic debate on provincial endorsement) spliced into index.html before the append marker
key_files:
  - index.html
  - C:/tmp/s21-cards.html
  - C:/tmp/index.html.bak-s21
key_decisions:
  - No deviations from splice pattern established in S13–S20 — Node.js Array.splice with ASCII-only marker substring, Write tool for temp file (not heredoc)
patterns_established:
  - S21 confirms the Write-tool-not-heredoc pattern for temp card files (avoids shell encoding issues with entity-encoded HTML)
observability_surfaces:
  - grep -c 'data-certeza' index.html → 88 (post-splice running total)
  - grep -c 'data-id="S21-' index.html → 2 (both S21 cards present)
  - grep -c 'cards will be appended here' index.html → 1 (marker intact)
  - test -s C:/tmp/index.html.bak-s21 && echo BACKUP_OK (restore point available)
  - cp C:/tmp/index.html.bak-s21 index.html (full restore if needed)
duration: ~5m
verification_result: passed
completed_at: 2026-03-23
blocker_discovered: false
---

# T02: Splice S21 cards into index.html before append marker

**Spliced S21-1 (constitutional mechanics of the Suma) and S21-2 (historiographic debate on provincial endorsement) into index.html at line 1971, advancing data-certeza count from 86 to 88 with all slice verification checks passing.**

## What Happened

1. **Precondition checks:** Confirmed DRAFT_OK (S21-CONTENT-DRAFT.md non-empty), data-certeza=86, and append marker at line 1972 (grep -n output).

2. **Backup:** Copied index.html to `C:/tmp/index.html.bak-s21`; confirmed BACKUP_OK before any modifications.

3. **Temp file:** Used Write tool to create `C:/tmp/s21-cards.html` with the verbatim entity-encoded HTML from the T02 Recipe block in S21-CONTENT-DRAFT.md — two `<article>` blocks separated by a blank line, no surrounding wrapper.

4. **Splice:** Node.js Array.splice found the marker at index 1971 (zero-based), inserted the cards content immediately before it, and rewrote index.html. Exit code 0, output: "Spliced at line 1971".

5. **Verification:** All five checks passed immediately — no restore needed.

## Verification

All must-have checks confirmed in a single verification pass:

- `grep -c 'data-certeza' index.html` → **88** ✅ (expected 88)
- `grep -c 'data-id="S21-' index.html` → **2** ✅ (expected 2)
- `grep -c 'cards will be appended here' index.html` → **1** ✅ (marker intact)
- `git diff --name-only HEAD -- styles.css app.js` → **(empty)** ✅ (no CSS/JS changes)
- `test -s C:/tmp/index.html.bak-s21 && echo BACKUP_OK` → **BACKUP_OK** ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c 'data-certeza' index.html` → 88 | 0 | ✅ pass | <1s |
| 2 | `grep -c 'data-id="S21-' index.html` → 2 | 0 | ✅ pass | <1s |
| 3 | `grep -c 'cards will be appended here' index.html` → 1 | 0 | ✅ pass | <1s |
| 4 | `git diff --name-only HEAD -- styles.css app.js` → (empty) | 0 | ✅ pass | <1s |
| 5 | `test -s C:/tmp/index.html.bak-s21 && echo BACKUP_OK` | 0 | ✅ pass | <1s |

## Diagnostics

To inspect what this task built:
- `grep -n 'data-id="S21-' index.html` — confirm both S21-1 and S21-2 card lines and their positions in the file
- `grep -A5 'data-id="S21-1"' index.html` — spot-check S21-1 card opening
- `grep -A5 'data-id="S21-2"' index.html` — spot-check S21-2 card opening
- `grep -c 'card-nota-historiografica' index.html` — confirm nota historiográfica block in S21-2 is present
- `test -s C:/tmp/index.html.bak-s21 && echo BACKUP_OK` — restore point still available

Failure state: `cp C:/tmp/index.html.bak-s21 index.html` restores pre-splice state if post-deploy issues are found.

## Deviations

None. Followed plan exactly. Splice ran cleanly on first attempt with all counts matching expected values.

## Known Issues

None.

## Files Created/Modified

- `index.html` — modified: S21-1 (card-hecho) and S21-2 (card-opinion) spliced before the append marker; data-certeza count advances from 86 to 88
- `C:/tmp/s21-cards.html` — created: temp file with entity-encoded HTML for both S21 cards (not committed)
- `C:/tmp/index.html.bak-s21` — created: pre-splice backup of index.html (not committed)
