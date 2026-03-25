---
id: T02
parent: S22
milestone: M008
provides:
  - Card S22-1 (soberanía exterior debate) spliced into index.html before the append marker; data-certeza count advanced from 88 to 89
key_files:
  - index.html
  - C:/tmp/s22-cards.html
  - C:/tmp/index.html.bak-s22
key_decisions:
  - Used Write tool (not bash heredoc) to write temp card file, per KNOWLEDGE.md pattern for reliable multi-line HTML writes
patterns_established:
  - Node.js splice at marker substring `cards will be appended here by subsequent slices` (ASCII-only, no en-dash) confirmed working at line 2006 for M008 baseline
observability_surfaces:
  - "grep -c 'data-certeza' index.html → 89 (was 88 before S22)"
  - "grep -n 'data-id=\"S22-1\"' index.html → line 2008 (within #periodo-rosas section)"
  - "grep -n 'cards will be appended here' index.html → line 2026 (marker intact, immediately after card)"
  - "C:/tmp/index.html.bak-s22 — restore point if post-splice check fails"
  - "C:/tmp/s22-cards.html — isolated card HTML for encoding/structure inspection"
duration: ~5m
verification_result: passed
completed_at: 2026-03-23
blocker_discovered: false
---

# T02: Splice S22-1 into index.html before the append marker

**Spliced card S22-1 (foreign-policy sovereignty debate, Monvoisin portrait) into index.html at line 2006 immediately before the append marker; data-certeza count advanced from 88 to 89.**

## What Happened

Verified T01 preconditions: DRAFT_OK, baseline `data-certeza` count = 88. Wrote the entity-encoded Recipe HTML block from `S22-CONTENT-DRAFT.md` to `C:/tmp/s22-cards.html` using the Write tool. Backed up `index.html` to `C:/tmp/index.html.bak-s22`. Ran the Node.js Array.splice using the ASCII-only marker substring `cards will be appended here by subsequent slices`; splice inserted at line 2006. The card occupies lines 2007–2025 in the modified file; the append marker moved to line 2026, immediately after the closing `</article>` tag — correct relative position confirmed.

## Verification

All six verification checks passed on first attempt:

1. `grep -c 'data-certeza' index.html` → 89 ✅
2. `grep -c 'data-id="S22-' index.html` → 1 ✅
3. `grep -c 'cards will be appended here' index.html` → 1 (marker intact) ✅
4. `git diff --name-only HEAD -- styles.css app.js` → empty ✅
5. `test -s C:/tmp/index.html.bak-s22 && echo BACKUP_OK` → BACKUP_OK ✅
6. Node.js scope-boundary check on T02 Recipe block → SCOPE_PASS ✅

Positional check: `grep -n 'data-id="S22-1"' index.html` → line 2008; `grep -n 'cards will be appended here' index.html` → line 2026. Card is immediately before marker. ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c 'data-certeza' index.html` → 89 | 0 | ✅ pass | <1s |
| 2 | `grep -c 'data-id="S22-' index.html` → 1 | 0 | ✅ pass | <1s |
| 3 | `grep -c 'cards will be appended here' index.html` → 1 | 0 | ✅ pass | <1s |
| 4 | `git diff --name-only HEAD -- styles.css app.js` → (empty) | 0 | ✅ pass | <1s |
| 5 | `test -s C:/tmp/index.html.bak-s22 && echo BACKUP_OK` | 0 | ✅ pass | <1s |
| 6 | Node.js scope-boundary check → SCOPE_PASS | 0 | ✅ pass | <1s |

Slice-level checks (all pass — final task of S22):
- `grep -c 'data-certeza' index.html` → 89 ✅ (expect 89)
- `grep -c 'data-id="S22-' index.html` → 1 ✅ (expect 1)
- `grep -c 'cards will be appended here' index.html` → 1 ✅ (expect 1)
- `git diff --name-only HEAD -- styles.css app.js` → empty ✅ (expect empty)
- `test -s C:/tmp/index.html.bak-s22 && echo BACKUP_OK` → BACKUP_OK ✅

## Diagnostics

- `grep -n 'data-id="S22-1"' index.html` — locates card at line 2008 within `#periodo-rosas` section for visual inspection
- `grep -n 'cards will be appended here' index.html` — confirms append marker at line 2026 (immediately after card)
- `C:/tmp/index.html.bak-s22` — restore point; run `cp C:/tmp/index.html.bak-s22 index.html` if a later splice detects corruption
- `C:/tmp/s22-cards.html` — isolated card HTML; inspect for encoding or structure issues without touching index.html
- `grep -c 'data-certeza' index.html` — should remain 89 until the next slice adds a card

## Deviations

None. Followed the plan exactly.

## Known Issues

None.

## Files Created/Modified

- `index.html` — modified: S22-1 (`card-opinion`, `data-certeza="opini&#xF3;n"`) spliced before append marker at line 2006; `data-certeza` count advances from 88 to 89; `card-nota-historiografica` count advances from 9 to 10
- `C:/tmp/s22-cards.html` — created (temp, not committed): entity-encoded HTML for card S22-1
- `C:/tmp/index.html.bak-s22` — created (temp, not committed): pre-splice backup of index.html
