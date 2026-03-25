---
id: T02
parent: S11
milestone: M008
provides:
  - 2 S11 card-hecho cards inserted in index.html (#periodo-rosas) — Los líderes unitarios (S11-1) and Los líderes federales (S11-2)
key_files:
  - index.html
key_decisions:
  - Used Write tool for temp file instead of bash heredoc (KNOWLEDGE.md guidance for Windows/Git Bash reliability)
  - Used ASCII-only substring for findIndex to avoid en-dash encoding failures in Node.js one-liner
patterns_established:
  - Node.js splice at idx (not idx+1) inserts before the marker line — marker shifts down by block length (1611→1647)
  - Stagger resets to 0ms on first card of new slice, increments by 80ms per card within the slice
observability_surfaces:
  - grep -c 'data-certeza' index.html → 67 (was 65 before S11)
  - grep -c 'S11-' index.html → 2 (HTML comments confirming both cards present)
  - grep -n 'cards will be appended here by subsequent slices' index.html → line present (1647 after insertion)
  - grep -A 30 'S11-1' index.html / grep -A 30 'S11-2' index.html → full card markup for inspection
duration: ~5 minutes
verification_result: passed
completed_at: 2026-03-23
blocker_discovered: false
---

# T02: Append 2 S11 cards to index.html

**Inserted S11-1 (Los líderes unitarios) and S11-2 (Los líderes federales) as card-hecho articles in #periodo-rosas, raising data-certeza count from 65 to 67.**

## What Happened

1. Confirmed append marker at line 1612 via `grep -n` (as expected from S10). Baseline `data-certeza` count = 65.
2. Read T02 Recipe section of `S11-CONTENT-DRAFT.md` for all card attributes, image URLs, and cite text.
3. Wrote `/tmp/s11-cards.html` via the Write tool (not heredoc) containing both card articles with correct HTML class, data-certeza, stagger delays (0ms / 80ms), verified Wikimedia image URLs, and full excerpt + cite text matching the draft exactly.
4. Ran Node.js splice one-liner with ASCII-only marker substring — inserted at idx 1611 (0-based), marker shifted to line 1647.
5. All 5 verification checks passed immediately with no corrections needed.

## Verification

All slice-level verification commands passed in a single run:

- `grep -c 'data-certeza' index.html` → **67** ✅ (target was 67)
- `grep -c 'S11-' index.html` → **2** ✅ (both HTML comment markers present)
- `grep -n 'cards will be appended here by subsequent slices' index.html` → **line 1647** ✅ (marker preserved, shifted from 1612)
- `git diff --name-only HEAD -- styles.css app.js` → **(empty)** ✅ (no CSS/JS modified)
- `test -s .gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md && echo OK` → **OK** ✅

Card structure confirmed via `grep -A 30 'S11-1' index.html`: correct class (`event-card card-hecho reveal reveal-slide`), `data-certeza="hecho"`, stagger `--reveal-delay: 0ms` for S11-1 and `--reveal-delay: 80ms` for S11-2.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c 'data-certeza' index.html` | 0 | ✅ pass (67) | <1s |
| 2 | `grep -c 'S11-' index.html` | 0 | ✅ pass (2) | <1s |
| 3 | `grep -n 'cards will be appended here by subsequent slices' index.html` | 0 | ✅ pass (line 1647) | <1s |
| 4 | `git diff --name-only HEAD -- styles.css app.js` | 0 | ✅ pass (empty) | <1s |
| 5 | `test -s .gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md && echo OK` | 0 | ✅ pass (OK) | <1s |

## Diagnostics

- **Card count**: `grep -c 'data-certeza' index.html` → 67 (S11 contributes 2 of that total)
- **Card markup inspection**: `grep -A 30 'S11-1' index.html` and `grep -A 30 'S11-2' index.html`
- **Marker line**: `grep -n 'cards will be appended here by subsequent slices' index.html` → 1647
- **Image URLs**: Both are direct Wikimedia CDN links; `curl -I <url>` should return HTTP 200
  - S11-1: `https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Jose_maria_paz_retrato_homenaje.jpg/500px-Jose_maria_paz_retrato_homenaje.jpg`
  - S11-2: `https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Justo_Jos%C3%A9_de_Urquiza.jpg/500px-Justo_Jos%C3%A9_de_Urquiza.jpg`
- **Failure state**: If count returns 65, the splice did not execute. If 69+, duplicate insertion. If marker gone, splice replaced instead of prepended.

## Deviations

None. The task plan was followed exactly. The marker was at line 1612 as predicted; splice logic worked correctly on first attempt.

## Known Issues

None.

## Files Created/Modified

- `index.html` — 2 S11 card-hecho articles inserted before the S10–S24 append marker (lines ~1612–1646); data-certeza count raised from 65 to 67
- `/tmp/s11-cards.html` — temp file (ephemeral, not tracked); used as splice source
