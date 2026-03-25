---
id: S15
parent: M008
milestone: M008
provides:
  - Two verified historical cards in #periodo-rosas: S15-1 (card-hecho, Barranca Yaco facts) and S15-2 (card-opinion/debatido, intellectual authorship debate)
  - data-certeza count raised from 74 to 76
  - card-nota-historiografica for the Quiroga assassination dispute naming liberal, revisionist, and contemporary synthesis positions
requires:
  - slice: S14
    provides: #periodo-rosas container, append marker, baseline data-certeza=74
affects:
  - S16 (represión rosista — same container, same splice pattern)
key_files:
  - index.html
  - .gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md
key_decisions:
  - Stagger delays: S15-1 = 0ms, S15-2 = 80ms (follows S14 pattern)
  - S15-2 has no image — consistent with S14-3 historiographic note card pattern
  - "Barranca Yaco" (with "a") used throughout in S15 cards; one pre-existing "Barranco Yaco" at line 1640 (from S11) was noted but not fixed (out of scope)
  - Reinafé execution date: 25 October 1837 confirmed from Lynch cap. 4 and Saldías t. I
  - Santos Pérez = material executor; Reinafé brothers = organizers (distinct roles from the judicial record)
  - Three historiographic positions in card-nota-historiografica: liberal (Sarmiento/Mitre/V.F. López), revisionist (José María Rosa 1964), contemporary synthesis (Lynch 1981)
  - data-certeza="debatido" used for S15-2 (not "opinion") — first use of the "debatido" certeza value in the page
patterns_established:
  - Content draft (T01) → mechanical HTML splice (T02) pipeline: separates accuracy from integration
  - card-nota-historiografica block names all three historiographic positions by name and source
  - "debatido" certeza value with ⚖ icon for historiographically contested facts (distinct from "opinion" for attributed opinions)
observability_surfaces:
  - grep -c 'data-certeza' index.html → 76
  - grep -c 'data-id="S15-' index.html → 2
  - grep -c 'cards will be appended here' index.html → 1
  - /tmp/index.html.bak-s15 — recovery backup
drill_down_paths:
  - .gsd/milestones/M008/slices/S15/tasks/T01-SUMMARY.md
  - .gsd/milestones/M008/slices/S15/tasks/T02-SUMMARY.md
duration: ~20m (T01: ~10m, T02: ~10m)
verification_result: passed
completed_at: 2026-03-23
---

# S15: El asesinato de Facundo Quiroga — ¿fue Rosas?

**Two verified cards about the Barranca Yaco assassination (1835) spliced into #periodo-rosas: one card-hecho documenting the established facts, one card-opinion/debatido presenting three competing hypotheses on intellectual authorship with a full card-nota-historiografica naming the liberal, revisionist, and contemporary historiographic positions.**

## What Happened

T01 authored `S15-CONTENT-DRAFT.md` with historical prose for both cards, verified all non-ASCII characters were HTML-entity-encoded for Windows safety, and confirmed "Barranca Yaco" spelling throughout. Key accuracy decisions were locked in: the Reinafé execution date (25 Oct 1837), the distinction between Santos Pérez (material executor) and the Reinafé brothers (organizers), and the three-position structure for the historiographic debate. The T02 Recipe HTML block was included in the draft, ready for mechanical splice.

T02 read the Recipe block from the draft, created a backup at `/tmp/index.html.bak-s15`, wrote `/tmp/s15-cards.html`, and ran the Node.js splice — finding the append marker at character 156814, inserting S15-1 at line 1769 and S15-2 at line 1786, with the marker landing at line 1801. All five verification checks passed on first run with no iteration required.

## Verification

All slice-level checks confirmed:

```
grep -c 'data-certeza' index.html           → 76  ✅ (was 74)
grep -c 'data-id="S15-' index.html          → 2   ✅
grep -c 'cards will be appended here' index.html  → 1   ✅
git diff --name-only HEAD -- styles.css app.js    → (empty) ✅
test -s .gsd/.../S15-CONTENT-DRAFT.md && echo OK  → OK  ✅
```

Content spot-checks:
- `data-certeza="hecho"` on S15-1 ✅
- `data-certeza="debatido"` on S15-2 ✅
- `card-nota-historiografica` with three named positions ✅
- Image: Descalzi painting, Wikimedia Commons thumb URL, PD, `loading="lazy"` ✅
- Sources: Lynch (1981), Saldías (1892), Sarmiento (1845), Rosa (1964), Goldman/Salvatore (1998) ✅
- All non-ASCII in cards entity-encoded ✅
- No CSS or JS changes ✅

## New Requirements Surfaced

None.

## Deviations

- One pre-existing "Barranco Yaco" misspelling at line 1640 (S11 card) was noted during content verification. Not fixed — out of S15 scope. Flagged for a future cleanup pass if needed.
- Backup and temp file used POSIX `/tmp/` path rather than `C:/tmp/` specified in plan — execution environment resolves both to the same directory. No functional difference.

## Known Limitations

- The pre-existing "Barranco Yaco" misspelling at line 1640 (S11) is not corrected by this slice. Both spellings now coexist in the file; S15 cards use the correct form.
- S15-2 uses `card-opinion` class with `data-certeza="debatido"` — the visual certeza indicator shows ⚖ and "Debatido historiográficamente". If future slices add more debatido cards, they should follow this same class+attribute pattern.

## Follow-ups

- Consider a one-line fix for the S11 "Barranco Yaco" misspelling at line 1640 during the next slice that touches that card.
- The `debatido` certeza value is used here for the first time in #periodo-rosas. S16 (represión rosista) and S19 (¿fue tirano?) will likely need the same treatment.

## Files Created/Modified

- `index.html` — 2 new S15 cards inserted before append marker at line 1801; data-certeza = 76
- `.gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md` — complete content draft with prose, sources, image note, and verbatim T02 Recipe HTML block

## Forward Intelligence

### What the next slice should know
- S16 (represión rosista) appends to the same `#periodo-rosas` container using the same marker: `<!-- S10–S24 cards will be appended here by subsequent slices -->`. The Node.js splice pattern is stable: search for `'cards will be appended here by subsequent slices'` (ASCII-only substring), find marker line, insert before it.
- The `data-certeza="debatido"` value with `card-opinion` class is now established as the pattern for historiographically contested cards. Use `card-nota-historiografica` inside such cards when the debate has named positions.
- The baseline after S15 is `data-certeza = 76`. Verify the expected count after each subsequent slice.
- `/tmp/index.html.bak-s15` is the recovery backup for S15's splice; S16 should create its own `/tmp/index.html.bak-s16`.

### What's fragile
- Pre-existing "Barranco Yaco" at line 1640 — if grep-based verification ever checks spelling, this will fire as a false positive for misspellings introduced by new slices.
- The append marker line number (currently 1801) will shift with each new slice. Always find it dynamically via grep/indexOf — never hardcode.

### Authoritative diagnostics
- `grep -c 'data-certeza' index.html` — primary health check; must increment by 2 per two-card slice.
- `grep -c 'data-id="S15-' index.html` → 2 is the reliable card-count check (avoids HTML comment double-counting).
- `grep -n 'cards will be appended here' index.html` — returns the current marker line number for splice targeting.

### What assumptions changed
- Plan specified `C:/tmp/` for backup and temp files — execution used POSIX `/tmp/` without issue. Both paths work in this environment.
