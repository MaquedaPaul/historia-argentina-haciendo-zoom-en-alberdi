---
id: T02
parent: S16
milestone: M008
provides:
  - Three S16 Mazorca repression cards (S16-1, S16-2, S16-3) spliced into index.html before append marker
key_files:
  - index.html
  - C:/tmp/s16-cards.html
  - C:/tmp/index.html.bak-s16
key_decisions:
  - none (mechanical splice; all authorship decisions made in T01)
patterns_established:
  - none new (follows established Node.js splice pattern from prior slices)
observability_surfaces:
  - "Node.js splice script prints 'Spliced OK at line N' to stdout on success; MARKER NOT FOUND + exit(1) on failure"
  - "grep -n 'data-id=\"S16-' index.html — shows exact card line positions (1802, 1820, 1835)"
  - "grep -c 'cards will be appended here' index.html — confirms marker intact for S17"
  - "C:/tmp/index.html.bak-s16 — pre-splice recovery backup"
duration: ~5 minutes
verification_result: passed
completed_at: 2026-03-23
blocker_discovered: false
---

# T02: Splice S16 cards into index.html before append marker

**Spliced three Mazorca repression cards (S16-1 card-hecho, S16-2 card-hecho, S16-3 card-opinion/debatido) into index.html at line 1800, raising data-certeza count from 76 to 79 with all slice checks passing.**

## What Happened

Preconditions confirmed first (76 `data-certeza`, marker present once, draft non-empty). Recovery backup written to `C:/tmp/index.html.bak-s16`. T02 Recipe HTML extracted from `S16-CONTENT-DRAFT.md` and written to `C:/tmp/s16-cards.html` via the Write tool (not heredoc). Node.js splice ran with ASCII-only marker substring `'cards will be appended here by subsequent slices'`, found the marker at line 1800, and inserted the three cards immediately before it. All six verification checks passed in the first run — no debugging required.

S16-1 (La Mazorca: estructura y métodos) lands at line 1802, S16-2 (El exilio como represión) at line 1820, S16-3 (¿Cuántas víctimas? debate historiográfico) at line 1835. The append marker remains at exactly one occurrence for S17.

## Verification

All checks run after splice; all passed:

```bash
grep -c 'data-certeza' index.html           # → 79 ✅
grep -c 'data-id="S16-' index.html          # → 3  ✅
grep -c 'data-id="S16-1"' index.html        # → 1  ✅ (dup guard)
grep -c 'cards will be appended here' index.html  # → 1  ✅
git diff --name-only HEAD -- styles.css app.js    # → (empty) ✅
test -s C:/tmp/index.html.bak-s16           # → BACKUP_OK ✅
grep -c 'card-nota-historiografica' index.html    # → 5 (≥3 required) ✅
test -s .gsd/milestones/M008/slices/S16/S16-CONTENT-DRAFT.md && echo OK  # → OK ✅
```

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c 'data-certeza' index.html` | 0 | ✅ pass (79) | <1s |
| 2 | `grep -c 'data-id="S16-' index.html` | 0 | ✅ pass (3) | <1s |
| 3 | `grep -c 'data-id="S16-1"' index.html` | 0 | ✅ pass (1) | <1s |
| 4 | `grep -c 'cards will be appended here' index.html` | 0 | ✅ pass (1) | <1s |
| 5 | `git diff --name-only HEAD -- styles.css app.js` | 0 | ✅ pass (empty) | <1s |
| 6 | `test -s C:/tmp/index.html.bak-s16 && echo BACKUP_OK` | 0 | ✅ pass | <1s |
| 7 | `grep -c 'card-nota-historiografica' index.html` | 0 | ✅ pass (5 ≥ 3) | <1s |
| 8 | `test -s .gsd/.../S16-CONTENT-DRAFT.md && echo OK` | 0 | ✅ pass | <1s |

## Diagnostics

- `grep -n 'data-id="S16-' index.html` → lines 1802, 1820, 1835 (S16-1, S16-2, S16-3)
- `grep -n 'cards will be appended here' index.html` → gives current marker line for S17 targeting
- `diff C:/tmp/index.html.bak-s16 index.html | head -60` → shows exactly what was inserted
- `C:/tmp/index.html.bak-s16` → recovery point if rollback needed
- `C:/tmp/s16-cards.html` → the spliced HTML snippet for inspection

## Deviations

none

## Known Issues

none

## Files Created/Modified

- `index.html` — 3 new S16 cards inserted before append marker; data-certeza count now 79
- `C:/tmp/s16-cards.html` — temp splice snippet (not committed)
- `C:/tmp/index.html.bak-s16` — pre-splice recovery backup (not committed)
