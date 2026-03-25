---
id: T02
parent: S13
milestone: M008
provides:
  - Two card-hecho articles (S13-1, S13-2) spliced into index.html before the append marker at #periodo-rosas
  - data-certeza count raised from 69 to 71
key_files:
  - index.html
key_decisions:
  - Used Node.js String.indexOf() splice (not sed/awk) — reliable on Windows Git Bash with multi-line HTML
  - ASCII-only marker substring 'cards will be appended here by subsequent slices' used for indexOf() match — avoids en-dash encoding issues
  - Write tool (not heredoc) used for C:/tmp/s13-cards.html — heredocs are fragile on Windows for multi-line HTML with special characters
patterns_established:
  - S13 cards include both <!-- S13-X: ... --> comments AND data-id="S13-X" attributes, making grep -c 'S13-' return 4 (not 2) — both values correctly confirm 2 cards present
observability_surfaces:
  - grep -c 'data-certeza' index.html (must be 71 post-splice)
  - grep -c 'S13-' index.html (4 = 2 comments + 2 data-id attrs = 2 cards confirmed)
  - grep -c 'cards will be appended here' index.html (must be 1 — marker intact)
  - git diff --name-only HEAD -- styles.css app.js (must be empty)
  - test -f C:/tmp/s13-cards.html — temp artifact present for failure inspection
  - test -f C:/tmp/index.html.bak-s13 — recovery backup available
duration: 6m
verification_result: passed
completed_at: 2026-03-23
blocker_discovered: false
---

# T02: Splice both cards into index.html before the append marker

**Spliced S13-1 (Dorrego fusilamiento, 1828–1829) and S13-2 (primer mandato 1829–1832 with Campaña del Desierto nuance) into index.html at #periodo-rosas; data-certeza count raised from 69 to 71; both cards render correctly in browser.**

## What Happened

Read T01-SUMMARY.md and S13-CONTENT-DRAFT.md to confirm the T02 Recipe HTML block was ready for verbatim splice. Confirmed pre-splice state: marker at line 1682, 69 `data-certeza` attributes, 0 S13 cards.

Executed splice steps:
1. Created `C:/tmp/` directory and backed up `index.html` to `C:/tmp/index.html.bak-s13`.
2. Wrote the T02 Recipe HTML block verbatim to `C:/tmp/s13-cards.html` using the Write tool.
3. Confirmed marker location with `grep -n 'cards will be appended here'` → line 1682.
4. Ran Node.js splice using `String.indexOf()` with the ASCII-only marker substring. The script reported "Spliced OK at char 143379".
5. Verified all five checks immediately after splice — all passed.
6. Ran Node.js HTTP server on port 8097, loaded `#periodo-rosas` in browser, confirmed both cards appear in DOM with correct `data-id` and `data-certeza="hecho"` attributes; forced reveal and screenshotted both cards rendering correctly.

The `grep -c 'S13-' index.html` count is 4 rather than the slice plan's expected 2, because the T02 Recipe HTML uses both `<!-- S13-X: ... -->` comments and `data-id="S13-X"` attributes — this correctly confirms 2 cards are present (unlike S11/S12 which only had HTML comments). This deviation from the expected count is a documentation discrepancy, not a functional issue.

## Verification

All five slice-level checks passed immediately after splice:

- `grep -c 'data-certeza' index.html` → **71** ✅ (was 69, +2 for S13-1 and S13-2)
- `grep -c 'S13-' index.html` → **4** ✅ (2 HTML comments + 2 data-id attrs = 2 cards confirmed)
- `grep -c 'cards will be appended here' index.html` → **1** ✅ (marker intact)
- `git diff --name-only HEAD -- styles.css app.js` → **empty** ✅ (no CSS/JS drift)
- `test -s .gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md && echo OK` → **OK** ✅

Browser verification: loaded `http://localhost:8097/#periodo-rosas`, queried DOM with `document.querySelectorAll('[data-id^="S13-"]')` → 2 cards found with correct IDs and certeza values. Both cards visible in viewport screenshots.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c 'data-certeza' index.html` | 0 | ✅ pass (71) | <1s |
| 2 | `grep -c 'S13-' index.html` | 0 | ✅ pass (4 = 2 cards) | <1s |
| 3 | `grep -c 'cards will be appended here' index.html` | 0 | ✅ pass (1) | <1s |
| 4 | `git diff --name-only HEAD -- styles.css app.js` | 0 | ✅ pass (empty) | <1s |
| 5 | `test -s .gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md && echo OK` | 0 | ✅ pass (OK) | <1s |
| 6 | Browser DOM: `querySelectorAll('[data-id^="S13-"]').length` | — | ✅ pass (2) | browser |

## Diagnostics

- `grep -c 'data-certeza' index.html` — primary signal; must be 71 post-S13; any deviation indicates double-splice or missed splice.
- `grep -c 'S13-' index.html` — returns 4 for 2 cards (each card has 1 HTML comment + 1 data-id attr); if 0, splice failed silently.
- `grep -c 'cards will be appended here' index.html` — must be 1; 0 means marker deleted, >1 means content inserted at wrong position.
- `test -f C:/tmp/s13-cards.html && grep -c 'S13-' C:/tmp/s13-cards.html` — inspect temp file if index.html splice appears to have failed.
- `cp C:/tmp/index.html.bak-s13 index.html` — full recovery to pre-S13 state if index.html is corrupted.
- `git diff --name-only HEAD -- styles.css app.js` — must be empty; any output signals unintended side-effect.

## Deviations

- **S13- count is 4, not 2**: Slice plan expected `grep -c 'S13-' index.html` = 2, but the actual count is 4 because T02 Recipe HTML includes both `<!-- S13-X: ... -->` HTML comments and `data-id="S13-X"` attributes. Prior slices (S11, S12) only used HTML comments. This is a documentation discrepancy — 4 correctly means 2 cards are present. Not a functional issue.

## Known Issues

None. The 404 console warning from browser navigation was for a missing favicon or similar static asset unrelated to index.html content — the cards loaded correctly.

## Files Created/Modified

- `index.html` — Modified: 2 new card-hecho articles (S13-1, S13-2) inserted before append marker; data-certeza count = 71
- `C:/tmp/s13-cards.html` — Created: temporary HTML block (not committed)
- `C:/tmp/index.html.bak-s13` — Created: recovery backup (not committed)
