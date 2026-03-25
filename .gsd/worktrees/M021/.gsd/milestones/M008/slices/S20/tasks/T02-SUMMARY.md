---
id: T02
parent: S20
milestone: M008
provides:
  - index.html with S20-1 and S20-2 cards spliced before append marker; data-certeza count 84→86
key_files:
  - index.html
key_decisions:
  - Used Write tool (not heredoc) for C:/tmp/s20-cards.html — consistent with established pattern for temp HTML files in this project
patterns_established:
  - Splice approach: write temp file → backup index.html → Node.js findIndex + splice → verify all 6 checks; this is the canonical S20 card injection pattern
observability_surfaces:
  - grep -c 'data-certeza' index.html → 86 (primary health metric)
  - grep -c 'data-id="S20-' index.html → 2 (both cards present)
  - grep -c 'cards will be appended here' index.html → 1 (marker intact)
  - test -s C:/tmp/index.html.bak-s20 && echo BACKUP_OK (backup available for restore)
  - grep -Pn '[^\x00-\x7F]' index.html | tail -20 (non-ASCII regression check)
duration: 10m
verification_result: passed
completed_at: 2026-03-23
blocker_discovered: false
---

# T02: Escribir temp HTML, hacer backup, y splicear cards en index.html

**Spliced S20-1 (Convención Preliminar de 1828) and S20-2 (fusilamiento as foundational rupture) into index.html before the append marker, advancing data-certeza from 84 to 86 with zero new CSS/JS.**

## What Happened

1. **Precondition checks:** Confirmed S20-CONTENT-DRAFT.md existed with T02 Recipe block (authored by T01). Verified index.html state: 84 `data-certeza`, 1 append marker, 0 S20 cards — all correct.

2. **Temp file written:** `C:/tmp/s20-cards.html` written via Write tool with the two `<article>` elements (S20-1 and S20-2) and their HTML comments from the T02 Recipe block. Content is entirely entity-encoded (no raw UTF-8).

3. **Backup made:** `cp index.html C:/tmp/index.html.bak-s20` → verified with `test -s` → BACKUP_OK.

4. **Splice executed:** Node.js script split index.html on `\n`, found the marker line (`cards will be appended here by subsequent slices`) at line 1932, spliced the cards content immediately before it using `Array.splice`, and wrote back to `index.html`.

5. **Pre-flight fix:** Added `## Observability Impact` section to T02-PLAN.md as required by the pre-flight instructions (the plan was flagged as missing this section). T01 had already applied the S20-PLAN.md pre-flight fix.

## Verification

All 6 must-have checks ran cleanly after the splice:

```
grep -c 'data-certeza' index.html       → 86  ✅
grep -c 'data-id="S20-1"' index.html   → 1   ✅
grep -c 'data-id="S20-2"' index.html   → 1   ✅
grep -c 'cards will be appended here'  → 1   ✅ (marker intact)
git diff --name-only HEAD -- styles.css app.js → (empty)  ✅
test -s C:/tmp/index.html.bak-s20      → BACKUP_OK  ✅
```

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c 'data-certeza' index.html` | 0 (→86) | ✅ pass | <1s |
| 2 | `grep -c 'data-id="S20-1"' index.html` | 0 (→1) | ✅ pass | <1s |
| 3 | `grep -c 'data-id="S20-2"' index.html` | 0 (→1) | ✅ pass | <1s |
| 4 | `grep -c 'cards will be appended here' index.html` | 0 (→1) | ✅ pass | <1s |
| 5 | `git diff --name-only HEAD -- styles.css app.js` | 0 (→empty) | ✅ pass | <1s |
| 6 | `test -s C:/tmp/index.html.bak-s20 && echo BACKUP_OK` | 0 (→BACKUP_OK) | ✅ pass | <1s |

Slice verification (all checks — this is the final task of S20):

| # | Command | Expected | Actual | Verdict |
|---|---------|----------|--------|---------|
| 1 | `grep -c 'data-certeza' index.html` | 86 | 86 | ✅ pass |
| 2 | `grep -c 'data-id="S20-1"' index.html` | 1 | 1 | ✅ pass |
| 3 | `grep -c 'data-id="S20-2"' index.html` | 1 | 1 | ✅ pass |
| 4 | `grep -c 'cards will be appended here' index.html` | 1 | 1 | ✅ pass |
| 5 | `git diff --name-only HEAD -- styles.css app.js` | (empty) | (empty) | ✅ pass |
| 6 | `test -s C:/tmp/index.html.bak-s20 && echo BACKUP_OK` | BACKUP_OK | BACKUP_OK | ✅ pass |

## Diagnostics

- `grep -c 'data-certeza' index.html` → 86 is the primary health metric for this slice.
- `grep -n 'data-id="S20-' index.html` → shows exact line numbers; S20-1 and S20-2 should appear immediately before the append marker line.
- `grep -Pn '[^\x00-\x7F]' index.html | tail -20` → any matches in the spliced region indicate raw UTF-8 escaped entity encoding (should be zero).
- Restore: `cp C:/tmp/index.html.bak-s20 index.html` then re-verify with `grep -c 'data-certeza' index.html` = 84.

## Deviations

- Pre-flight fix applied to T02-PLAN.md: added `## Observability Impact` section (the plan was flagged as runtime-relevant but missing this section). T01 had already handled the S20-PLAN.md pre-flight fix.

## Known Issues

None.

## Files Created/Modified

- `index.html` — modified: S20-1 and S20-2 cards spliced at line 1932 (before append marker); data-certeza count 84→86
- `C:/tmp/s20-cards.html` — new temp file: entity-encoded HTML for both S20 cards (not committed)
- `C:/tmp/index.html.bak-s20` — new backup: pre-splice snapshot of index.html (not committed)
- `.gsd/milestones/M008/slices/S20/tasks/T02-PLAN.md` — modified: added `## Observability Impact` section (pre-flight fix)
