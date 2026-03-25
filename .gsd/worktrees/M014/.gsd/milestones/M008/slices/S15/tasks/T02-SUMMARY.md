---
id: T02
parent: S15
milestone: M008
provides:
  - Two S15 cards (S15-1 card-hecho, S15-2 card-opinion/debatido) spliced into index.html before the append marker
  - data-certeza count raised from 74 to 76
key_files:
  - index.html
key_decisions:
  - Used /tmp/s15-cards.html (POSIX path) instead of C:/tmp/s15-cards.html — working environment uses bash/Node on Linux/WSL path conventions
  - Backup written to /tmp/index.html.bak-s15 for recovery
patterns_established:
  - Same Node.js splice pattern as S13/S14: read marker via indexOf, find lineStart via lastIndexOf('\n'), insert before marker line
observability_surfaces:
  - grep -c 'data-certeza' index.html → 76 (primary health check post-splice)
  - grep -c 'data-id="S15-' index.html → 2 (exact card count, unambiguous vs. HTML comment matches)
  - grep -c 'cards will be appended here' index.html → 1 (marker not consumed)
  - /tmp/index.html.bak-s15 — recovery backup; restore with: cp /tmp/index.html.bak-s15 index.html
duration: ~10m
verification_result: passed
completed_at: 2026-03-23
blocker_discovered: false
---

# T02: Splice the two S15 cards into index.html before the append marker

**Spliced S15-1 (Barranca Yaco ambush, card-hecho) and S15-2 (intellectual authorship debate, card-opinion/debatido) into index.html at line 1769, raising data-certeza count from 74 to 76.**

## What Happened

Verified preconditions: `data-certeza` count = 74, append marker present exactly once. Created backup at `/tmp/index.html.bak-s15`. Wrote the verbatim T02 Recipe HTML block from `S15-CONTENT-DRAFT.md` to `/tmp/s15-cards.html` using the Write tool (5323 bytes). Ran the Node.js splice — found the marker at char 156814, inserted both cards before the marker line. Post-splice: S15-1 at line 1769, S15-2 at line 1786, marker at line 1801.

## Verification

All five checks passed immediately on first run:

```bash
grep -c 'data-certeza' index.html           # → 76 ✅
grep -c 'data-id="S15-' index.html          # → 2  ✅
grep -c 'cards will be appended here' index.html  # → 1  ✅
git diff --name-only HEAD -- styles.css app.js    # → (empty) ✅
test -s .gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md && echo OK  # → OK ✅
```

Order check confirmed: S15-1 (line 1769) < S15-2 (line 1786) < marker (line 1801).

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c 'data-certeza' index.html` → 76 | 0 | ✅ pass | <1s |
| 2 | `grep -c 'data-id="S15-' index.html` → 2 | 0 | ✅ pass | <1s |
| 3 | `grep -c 'cards will be appended here' index.html` → 1 | 0 | ✅ pass | <1s |
| 4 | `git diff --name-only HEAD -- styles.css app.js` → empty | 0 | ✅ pass | <1s |
| 5 | `test -s .gsd/.../S15-CONTENT-DRAFT.md && echo OK` → OK | 0 | ✅ pass | <1s |

## Diagnostics

- **Primary health check:** `grep -c 'data-certeza' index.html` → must be 76 after this task.
- **Card count check:** `grep -c 'data-id="S15-' index.html` → 2 (use this not `grep -c 'S15-'` which returns 4 due to HTML comment matches).
- **Marker integrity:** `grep -c 'cards will be appended here' index.html` → 1.
- **Recovery:** If index.html is corrupted, restore with: `cp /tmp/index.html.bak-s15 index.html`.
- **Splice input inspection:** `cat /tmp/s15-cards.html` — shows exactly what was inserted.

## Deviations

- Backup and temp file written to `/tmp/` (POSIX path) rather than `C:/tmp/` as written in the plan — the execution environment resolves both to the same Linux/WSL temp directory. No functional difference.

## Known Issues

None.

## Files Created/Modified

- `index.html` — 2 new S15 cards inserted before the append marker at line 1801; data-certeza count = 76
- `/tmp/s15-cards.html` — splice input temp file (not committed)
- `/tmp/index.html.bak-s15` — pre-splice recovery backup (not committed)
