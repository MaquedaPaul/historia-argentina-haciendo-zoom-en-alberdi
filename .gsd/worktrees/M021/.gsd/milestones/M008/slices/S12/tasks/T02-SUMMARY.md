---
id: T02
parent: S12
milestone: M008
provides:
  - 2 cards card-hecho (S12-1 y S12-2) spliced into index.html before the append marker; data-certeza count raised from 67 to 69
key_files:
  - index.html
  - C:/tmp/s12-cards.html
key_decisions:
  - Used C:/tmp/ instead of /tmp/ because this is a Windows environment; /tmp does not exist
  - ASCII-only marker substring used in Node.js splice to avoid en-dash encoding failure
patterns_established:
  - On Windows, write temp files to C:/tmp/ not /tmp/; create directory first with mkdir -p C:/tmp
  - Pre-splice backup at C:/tmp/index.html.bak-s12 created as standard recovery artifact
observability_surfaces:
  - "grep -c 'data-certeza' index.html  → 69 (was 67)"
  - "grep -n 'cards will be appended here by subsequent slices' index.html  → line 1682 (S13 insertion point)"
  - "Recovery: cp C:/tmp/index.html.bak-s12 index.html"
duration: 8m
verification_result: passed
completed_at: 2026-03-23
blocker_discovered: false
---

# T02: Insertar las 2 cards S12 en index.html antes del marcador de append

**Spliced 2 card-hecho articles (caudillos 1820–1852 and Pacto Federal 1831) into index.html at line 1646, raising data-certeza count from 67 to 69; all 5 slice verification checks pass.**

## What Happened

1. Read S12-CONTENT-DRAFT.md to extract the "T02 Recipe" HTML block — verified both S12-1 and S12-2 comments, correct classes (`event-card card-hecho reveal reveal-slide`), and stagger delays (0ms / 80ms).
2. Located the append marker with `grep -n`: line 1647, exactly one occurrence, as expected.
3. Created backup at `C:/tmp/index.html.bak-s12` before any modification.
4. Wrote the cards HTML to `C:/tmp/s12-cards.html` using the Write tool (not heredoc). Note: `/tmp` does not exist on Windows — used `C:/tmp/` with `mkdir -p` first.
5. Ran the Node.js one-liner with ASCII-only marker `'cards will be appended here by subsequent slices'` (no en-dash). Splice reported "Spliced at line 1646".
6. Ran all verification checks — all passed on first attempt.

## Verification

All five slice-level verification checks passed:

```
grep -c 'data-certeza' index.html   → 69  ✅
grep -c 'S12-' index.html           → 2   ✅
grep -c 'cards will be appended here' index.html  → 1  ✅
git diff --name-only HEAD -- styles.css app.js     → (empty)  ✅
test -s .gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md && echo OK  → OK  ✅
```

Marker new position: **line 1682** (S13 insertion point).

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c 'data-certeza' index.html` | 0 (output: 69) | ✅ pass | <1s |
| 2 | `grep -c 'S12-' index.html` | 0 (output: 2) | ✅ pass | <1s |
| 3 | `grep -c 'cards will be appended here' index.html` | 0 (output: 1) | ✅ pass | <1s |
| 4 | `git diff --name-only HEAD -- styles.css app.js` | 0 (empty output) | ✅ pass | <1s |
| 5 | `test -s .gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md && echo OK` | 0 (output: OK) | ✅ pass | <1s |

## Diagnostics

- **Card count:** `grep -c 'data-certeza' index.html` → 69
- **Slice marker line (S13 insertion point):** `grep -n 'cards will be appended here by subsequent slices' index.html` → **line 1682**
- **Recovery artifact:** `C:/tmp/index.html.bak-s12` — pre-splice backup; restore with `cp C:/tmp/index.html.bak-s12 index.html`
- **CSS/JS safety:** `git diff --name-only HEAD -- styles.css app.js` → empty (no accidental changes)
- **Inserted HTML range:** lines 1647–1681 (35 lines of 2 cards + comments)

## Deviations

- `/tmp/s12-cards.html` path specified in plan does not work on Windows; used `C:/tmp/s12-cards.html` instead. Backup also written to `C:/tmp/index.html.bak-s12` (plan specified `/tmp/index.html.bak-s12`). All functionality equivalent.

## Known Issues

None.

## Files Created/Modified

- `index.html` — 2 new card-hecho articles (S12-1 and S12-2) inserted before append marker; data-certeza count = 69; marker at line 1682
- `C:/tmp/s12-cards.html` — temporary file with HTML for both S12 cards (Write tool, not heredoc)
- `C:/tmp/index.html.bak-s12` — pre-splice backup for recovery
