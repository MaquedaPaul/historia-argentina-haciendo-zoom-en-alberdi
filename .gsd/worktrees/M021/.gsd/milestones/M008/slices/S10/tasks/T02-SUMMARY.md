---
id: T02
parent: S10
milestone: M008
provides:
  - 3 S10 content cards inserted into index.html before the append marker in #periodo-rosas
key_files:
  - index.html
key_decisions:
  - Used `lines.includes('cards will be appended here by subsequent slices')` instead of the full en-dash string to avoid Node.js encoding mismatch with the marker comment
patterns_established:
  - Marker-based HTML card insertion via Node.js splice: find marker line by partial string (avoid special Unicode chars in findIndex predicate), splice before it, write back
observability_surfaces:
  - grep -c 'data-certeza' index.html → 65 (confirms all 3 cards present)
  - grep -c 'S10-' index.html → 3 (one HTML comment per card)
  - grep -n 'cards will be appended here by subsequent slices' index.html → line still present (marker intact)
  - git diff --name-only HEAD -- styles.css app.js → empty (no side-effects)
duration: ~10m
verification_result: passed
completed_at: 2026-03-22
blocker_discovered: false
---

# T02: Append 3 S10 cards to index.html

**Inserted 3 verified S10 content cards (unitario program, federal program, economic conflict) into `index.html` before the append marker, raising `data-certeza` count from 62 to 65.**

## What Happened

T01 had already produced a fully verified content draft with all card content, image URLs, alt text, and blockquote HTML. T02 was pure mechanical integration:

1. Located the append marker at line 1542 (`<!-- S10–S24 cards will be appended here by subsequent slices -->`) via `grep -n`.
2. Wrote the 3 cards to `/tmp/s10-cards.html` using the `Write` tool (following KNOWLEDGE.md heredoc warning). The card-hecho pattern was copied from S09-1/S09-2; the card-opinion pattern from S09-4 — same indentation, class list, and child element order.
3. Attempted Node.js splice using `l.includes('S10\u2013S24 cards will be appended')` — this failed because the en-dash (`–`, U+2013) didn't match due to encoding differences between the shell escape and the file. Fixed by searching for the unambiguous substring `'cards will be appended here by subsequent slices'` instead.
4. Splice succeeded: marker found at line 1542, cards inserted before it, file written back. Marker now sits at line 1612 (moved down by the 70 new lines of card HTML).

All 8 must-have checks verified green immediately after insertion.

## Verification

Ran all slice-level verification commands:

```bash
grep -c 'data-certeza' index.html      # 65 ✅
grep -n 'S10–S24 cards will be appended' index.html  # line 1612 present ✅
git diff --name-only HEAD -- styles.css app.js       # empty ✅
test -s .gsd/milestones/M008/slices/S10/S10-CONTENT-DRAFT.md && echo OK  # OK ✅
grep -c 'S10-' index.html              # 3 ✅
grep -c 'reveal reveal-slide' index.html  # 71 (was 68 after S09, +3) ✅
```

Spot-checked per-card attributes:
- S10-1: `class="event-card card-hecho reveal reveal-slide"`, `data-certeza="hecho"`, `style="--reveal-delay: 0ms"` ✅
- S10-2: `class="event-card card-hecho reveal reveal-slide"`, `data-certeza="hecho"`, `style="--reveal-delay: 80ms"` ✅
- S10-3: `class="event-card card-opinion reveal reveal-slide"`, `data-certeza="opinion"`, `style="--reveal-delay: 160ms"` ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c 'data-certeza' index.html` | 0 (output: 65) | ✅ pass | <1s |
| 2 | `grep -n 'S10–S24 cards will be appended' index.html` | 0 (line 1612) | ✅ pass | <1s |
| 3 | `git diff --name-only HEAD -- styles.css app.js` | 0 (empty) | ✅ pass | <1s |
| 4 | `test -s .gsd/milestones/M008/slices/S10/S10-CONTENT-DRAFT.md && echo OK` | 0 (OK) | ✅ pass | <1s |
| 5 | `grep -c 'S10-' index.html` | 0 (output: 3) | ✅ pass | <1s |
| 6 | `grep -c 'reveal reveal-slide' index.html` | 0 (output: 71) | ✅ pass | <1s |

## Diagnostics

- `grep -c 'data-certeza' index.html` → should be **65**; if it returns 62, T02 insertion did not persist — check the marker search string.
- `grep -n 'cards will be appended here by subsequent slices' index.html` → should return a line number; if missing, the marker was accidentally deleted and requires revert.
- `grep -c 'S10-' index.html` → should be **3**; if 0, no S10 cards were inserted.
- `git diff --name-only HEAD -- styles.css app.js` → must be empty; any output means unintended CSS/JS side-effects.
- Node.js encoding gotcha: the en-dash `–` (U+2013) in the marker comment can fail `String.includes()` in Node.js shell invocations if the escape sequence doesn't round-trip correctly. Use the ASCII-only portion of the marker string as the search key.

## Deviations

One minor deviation from the plan: the Node.js one-liner in the plan used `l.includes('S10\u2013S24 cards will be appended')` as the search predicate. This failed on first attempt because the Unicode escape didn't match the file's encoding. Fixed by using `l.includes('cards will be appended here by subsequent slices')` — a unique substring that avoids the special character entirely. Logged in KNOWLEDGE.md.

## Known Issues

None.

## Files Created/Modified

- `index.html` — 3 S10 cards inserted before append marker; `data-certeza` count raised from 62 to 65; marker preserved at new line 1612; no CSS or JS changes.
