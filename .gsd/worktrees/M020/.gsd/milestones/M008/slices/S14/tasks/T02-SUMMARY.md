---
id: T02
parent: S14
milestone: M008
provides:
  - 3 S14 cards (S14-1, S14-2, S14-3) spliced into index.html before append marker in #periodo-rosas; data-certeza count raised from 71 to 74
key_files:
  - index.html
key_decisions:
  - Used ASCII-only marker substring 'cards will be appended here by subsequent slices' (no en-dash) per KNOWLEDGE.md rule — confirmed marker found at char 148974
  - Wrote temp file via Write tool (not heredoc) per KNOWLEDGE.md bash heredoc reliability rule
  - Backup written to C:/tmp/index.html.bak-s14 before any modification
patterns_established:
  - Node.js splice pattern: lastIndexOf('\n', pos)+1 finds line start of marker line; insertion placed before that line so marker remains last after all S14 content
observability_surfaces:
  - grep -c 'data-certeza' index.html (must be 74 after splice)
  - grep -c 'data-id="S14-' index.html (must be 3)
  - grep -c 'cards will be appended here' index.html (must remain 1)
  - C:/tmp/s14-cards.html — verbatim splice snippet for post-hoc diffing
  - C:/tmp/index.html.bak-s14 — recovery backup if restoration needed
  - git diff --name-only HEAD -- styles.css app.js (must be empty)
duration: ~10m
verification_result: passed
completed_at: 2026-03-23
blocker_discovered: false
---

# T02: Splice S14 cards into index.html before append marker

**Spliced 3 S14 cards (el retorno/Suma del Poder Público, bloqueos/Vuelta de Obligado/Caseros arc, and the historiographic note) into index.html, raising data-certeza count from 71 to 74; all five slice-level verification checks pass.**

## What Happened

Confirmed preconditions: `grep -c 'data-certeza' index.html` returned 71; `grep -c 'cards will be appended here' index.html` returned 1. Both required.

Created `C:/tmp/index.html.bak-s14` as recovery backup before any modification.

Extracted the verbatim T02 Recipe HTML block from `S14-CONTENT-DRAFT.md` (content between the ` ```html ` / ` ``` ` fences) and wrote it to `C:/tmp/s14-cards.html` using the Write tool (7,814 bytes). Did not use a heredoc — per KNOWLEDGE.md reliability rule on Windows.

Ran the Node.js splice one-liner using the ASCII-only marker substring `'cards will be appended here by subsequent slices'` (no en-dash, no leading comment characters). The script:
1. Located the marker at char 148974
2. Found the line start via `lastIndexOf('\n', pos) + 1`
3. Prepended the 3-card HTML block (plus a trailing newline) immediately before the marker line
4. Wrote the result back to index.html

The splice reported `Spliced OK at char 148974` — no errors.

Immediately ran all four T02 verification checks and all five slice-level checks, all of which passed on the first attempt.

## Verification

All four task-level verification commands and all five slice-level commands passed on first attempt:

1. `grep -c 'data-certeza' index.html` → **74** ✅ (was 71, +3 cards)
2. `grep -c 'data-id="S14-' index.html` → **3** ✅
3. `grep -c 'cards will be appended here' index.html` → **1** ✅ (marker not duplicated/deleted)
4. `git diff --name-only HEAD -- styles.css app.js` → **(empty)** ✅ (zero CSS/JS changes)
5. `test -s .gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md && echo OK` → **OK** ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c 'data-certeza' index.html` → 74 | 0 | ✅ pass | <1s |
| 2 | `grep -c 'data-id="S14-' index.html` → 3 | 0 | ✅ pass | <1s |
| 3 | `grep -c 'cards will be appended here' index.html` → 1 | 0 | ✅ pass | <1s |
| 4 | `git diff --name-only HEAD -- styles.css app.js` → empty | 0 | ✅ pass | <1s |
| 5 | `test -s .gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md && echo OK` | 0 | ✅ pass | <1s |

## Diagnostics

- `grep -c 'data-certeza' index.html` — primary health signal; must be 74 after this splice.
- `grep -c 'data-id="S14-' index.html` — confirms all 3 cards present (1 per card, unambiguous).
- `grep -n 'cards will be appended here' index.html` — shows line number of marker; use to check splice position when debugging.
- `C:/tmp/s14-cards.html` — verbatim splice snippet (7,814 bytes); diff against index.html region to diagnose unexpected output.
- `C:/tmp/index.html.bak-s14` — pre-splice recovery backup; restore with `cp C:/tmp/index.html.bak-s14 index.html`.
- `git diff --name-only HEAD -- styles.css app.js` — confirms no CSS/JS drift.

## Deviations

None. All steps followed the task plan exactly: preconditions confirmed, backup created, Write tool used (not heredoc), ASCII-only marker substring, all 5 verification checks passed.

## Known Issues

None.

## Files Created/Modified

- `index.html` — 3 new S14 cards (S14-1, S14-2, S14-3) inserted before append marker in `#periodo-rosas`; data-certeza count = 74
- `C:/tmp/s14-cards.html` — temp file used for splice (not committed)
- `C:/tmp/index.html.bak-s14` — pre-splice recovery backup (not committed)
