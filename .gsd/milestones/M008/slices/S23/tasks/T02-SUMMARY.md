---
id: T02
parent: S23
milestone: M008
provides:
  - index.html with S23-1 (card-hecho) and S23-2 (card-opinion) spliced before the append marker; data-certeza count advanced from 89 to 91
key_files:
  - index.html
  - C:/tmp/s23-cards.html
  - C:/tmp/index.html.bak-s23
key_decisions:
  - No architectural decisions required; T02 is a pure mechanical splice following the established Node.js Array.splice pattern
patterns_established:
  - ASCII-only marker substring used for splice target (`cards will be appended here by subsequent slices`) — no en-dash or Unicode in the findIndex call
  - Write tool used for temp file creation (not bash heredoc), per KNOWLEDGE.md Bash Heredoc Reliability entry
observability_surfaces:
  - grep -c 'data-certeza' index.html returns 91
  - grep -c 'data-id="S23-' index.html returns 2
  - grep -c 'cards will be appended here' index.html returns 1 (marker intact)
  - grep -c 'card-nota-historiografica' index.html returns 11
  - test -s C:/tmp/index.html.bak-s23 && echo BACKUP_OK
duration: ~5m
verification_result: passed
completed_at: 2026-03-23
blocker_discovered: false
---

# T02: Splice S23-1 and S23-2 into index.html before the append marker

**Spliced S23-1 (card-hecho, Encarnación Ezcurra / Sociedad Popular Restauradora) and S23-2 (card-opinion, historiographic debate on her autonomy) into index.html; data-certeza count advanced from 89 to 91 and card-nota-historiografica count from 10 to 11.**

## What Happened

Verified T01 precondition: `S23-CONTENT-DRAFT.md` existed and was non-empty. Confirmed baseline at exactly 89 `data-certeza` cards as expected.

Used the Write tool to extract the T02 Recipe HTML block verbatim from `S23-CONTENT-DRAFT.md` and write it to `C:/tmp/s23-cards.html` (Write tool, not bash heredoc, per KNOWLEDGE.md reliability rule).

Backed up `index.html` to `C:/tmp/index.html.bak-s23` before any modification. Ran the Node.js Array.splice with the ASCII-only marker substring `cards will be appended here by subsequent slices` — marker found dynamically at line 2025. Splice completed without errors.

All six verification checks and the scope-boundary check passed on first attempt.

## Verification

```
grep -c 'data-certeza' index.html              → 91  ✅
grep -c 'data-id="S23-' index.html             → 2   ✅
grep -c 'cards will be appended here' index.html → 1  ✅  (marker intact)
grep -c 'card-nota-historiografica' index.html  → 11  ✅
git diff --name-only HEAD -- styles.css app.js  → (empty)  ✅
test -s C:/tmp/index.html.bak-s23               → BACKUP_OK  ✅
node scope-boundary check                        → SCOPE_PASS  ✅
```

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c 'data-certeza' index.html` | 0 (→ 91) | ✅ pass | <1s |
| 2 | `grep -c 'data-id="S23-' index.html` | 0 (→ 2) | ✅ pass | <1s |
| 3 | `grep -c 'cards will be appended here' index.html` | 0 (→ 1) | ✅ pass | <1s |
| 4 | `grep -c 'card-nota-historiografica' index.html` | 0 (→ 11) | ✅ pass | <1s |
| 5 | `git diff --name-only HEAD -- styles.css app.js` | 0 (empty) | ✅ pass | <1s |
| 6 | `test -s C:/tmp/index.html.bak-s23 && echo BACKUP_OK` | 0 (BACKUP_OK) | ✅ pass | <1s |
| 7 | `node -e "... SCOPE_PASS check ..."` | 0 (SCOPE_PASS) | ✅ pass | <1s |

## Diagnostics

**Observability Impact:**
- `grep -c 'data-certeza' index.html` — primary progress counter; now returns 91 (was 89 before this task)
- `grep -c 'data-id="S23-' index.html` — confirms both S23 cards are present; returns 2
- `grep -c 'cards will be appended here' index.html` — confirms append marker was not consumed; must remain 1 for all future slices
- `grep -c 'card-nota-historiografica' index.html` — nota count tracker; now returns 11 (was 10)
- `C:/tmp/index.html.bak-s23` — pre-splice restore point; restore with `cp C:/tmp/index.html.bak-s23 index.html` if a future splice goes wrong
- `C:/tmp/s23-cards.html` — the extracted card HTML; inspect to diagnose any rendering issue traced to S23 content

**Failure state visibility:**
- If data-certeza stays at 89 after a splice attempt: marker was not found or file write failed — restore from backup and check marker text
- If marker count drops to 0: the splice consumed the marker line (wrong `splice` offset) — restore from backup, fix to `splice(idx, 0, ...)` with zero-deletion second argument

## Deviations

None. Task followed the plan exactly. Splice landed at line 2025 (plan estimated ~2026 — within expected range).

## Known Issues

None.

## Files Created/Modified

- `index.html` — modified: S23-1 and S23-2 spliced before append marker at line 2025; data-certeza count = 91
- `C:/tmp/s23-cards.html` — created (temp, not committed): entity-encoded HTML for S23-1 and S23-2
- `C:/tmp/index.html.bak-s23` — created (temp, not committed): pre-splice restore point
