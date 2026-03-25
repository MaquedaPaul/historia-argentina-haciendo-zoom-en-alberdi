---
id: T01
parent: S15
milestone: M008
provides:
  - S15-CONTENT-DRAFT.md with verified historical prose for both cards
  - Verbatim T02 Recipe HTML block (entity-encoded) ready for mechanical splice in T02
  - Observability section added to S15-PLAN.md
key_files:
  - .gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md
key_decisions:
  - Stagger delays: S15-1 = 0ms, S15-2 = 80ms (follows S14 pattern)
  - S15-2 has no image (consistent with S14-3 historiographic note card)
  - "Barranca Yaco" (with "a") used throughout — matches existing page occurrences
  - Reinafé execution date: 25 October 1837 confirmed from Lynch cap. 4 and Saldías t. I
  - Santos Pérez = material executor; Reinafé brothers = organizers (legally distinct roles)
patterns_established:
  - Content draft separates historical accuracy decisions (T01) from mechanical HTML splice (T02)
  - card-nota-historiografica block names all three positions: liberal, revisionist, contemporary synthesis
observability_surfaces:
  - test -s .gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md — confirms draft exists
  - grep -c "^## Card S15-" .gsd/.../S15-CONTENT-DRAFT.md — expects 2
  - grep -c "T02 Recipe" .gsd/.../S15-CONTENT-DRAFT.md — expects 1
  - After T02: grep -c 'data-certeza' index.html — expects 76
duration: ~10m
verification_result: passed
completed_at: 2026-03-23
blocker_discovered: false
---

# T01: Author S15-CONTENT-DRAFT.md with historical prose and verbatim T02 Recipe HTML

**Created S15-CONTENT-DRAFT.md with verified prose for two Barranca Yaco cards and a fully entity-encoded T02 Recipe HTML block ready for mechanical splice.**

## What Happened

Read S15-PLAN.md, T01-PLAN.md, S15-RESEARCH.md, and index.html lines 1718–1768 to confirm the exact HTML card structure used by S14. The S14 cards confirmed: `card-hecho` / `card-opinion` classes, `card-certeza-indicator` structure (✓ for hecho, ⚖ for debatido), `card-image` div for cards with images (omitted for historiographic note cards), `event-card__year` span, `event-card__title` h3, `event-card__excerpt` p, optional `card-nota-historiografica` p, and `card-source` footer with cite.

Pre-flight: Added the missing `## Observability / Diagnostics` section to S15-PLAN.md as required by the pre-flight instructions.

Then wrote the content draft at `.gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md` with:

- **Overview** section summarizing both cards
- **## Card S15-1** section with full prose, sources, and image attribution (Descalzi, public domain, Barranca_Yaco_2.jpeg 500px thumb)
- **## Card S15-2** section with three-hypothesis prose, historiographic positions, and sources
- **## T02 Recipe** section with verbatim HTML for both cards — zero bare non-ASCII characters confirmed via Node.js check

Key accuracy decisions baked into the draft:
- "Barranca Yaco" (with "a") used as primary form throughout (9 occurrences; "Barranco Yaco" = 0)
- Execution date of Reinafé brothers: 25 de octubre de 1837
- Santos Pérez clearly labeled as material executor; Reinafé brothers as organizers — distinct roles established by the judicial process
- Three historiographic positions named in card-nota-historiografica: liberal (Sarmiento/Mitre/López), revisionist (José María Rosa, 1964), contemporary synthesis (Lynch, 1981)

## Verification

All three T01 checks passed:

```bash
test -s .gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md && echo OK       → OK
grep -c "^## Card S15-" .gsd/.../S15-CONTENT-DRAFT.md                         → 2
grep -c "T02 Recipe" .gsd/.../S15-CONTENT-DRAFT.md                            → 1
```

Content spot-checks:
- `data-certeza="hecho"` present ✅
- `data-certeza="debatido"` present ✅
- `data-id="S15-1"` present ✅
- `data-id="S15-2"` present ✅
- `card-nota-historiografica` present (4 occurrences: prose + recipe) ✅
- "Barranca Yaco" = 9, "Barranco Yaco" = 0 ✅
- `reveal-delay: 0ms` = 1 ✅
- `reveal-delay: 80ms` = 1 ✅
- Non-ASCII chars in recipe block: 0 (all entity-encoded) ✅

Slice-level checks (pre-T02 baseline):
- `data-certeza` count in index.html: 74 (will become 76 after T02) ✅
- Append marker present: 1 ✅
- CSS/JS diff: empty ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -s .gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md && echo OK` | 0 | ✅ pass | <1s |
| 2 | `grep -c "^## Card S15-" .gsd/.../S15-CONTENT-DRAFT.md` → 2 | 0 | ✅ pass | <1s |
| 3 | `grep -c "T02 Recipe" .gsd/.../S15-CONTENT-DRAFT.md` → 1 | 0 | ✅ pass | <1s |
| 4 | Non-ASCII in recipe block (Node.js check) → 0 | 0 | ✅ pass | <1s |
| 5 | `grep -c 'data-certeza' index.html` → 74 (pre-T02 baseline) | 0 | ✅ pass | <1s |
| 6 | `grep -c 'cards will be appended here' index.html` → 1 | 0 | ✅ pass | <1s |
| 7 | `git diff --name-only HEAD -- styles.css app.js` → empty | 0 | ✅ pass | <1s |

## Diagnostics

- **T02 can proceed**: Read `## T02 Recipe` section from `S15-CONTENT-DRAFT.md`, extract the HTML block between the triple-backtick fences, write to `C:/tmp/s15-cards.html`, then run the Node.js splice before the `cards will be appended here by subsequent slices` marker.
- **Recovery**: If T02 fails or corrupts index.html, restore from `C:/tmp/index.html.bak-s15` (created by T02 before the splice).
- **Failure inspection**: If after T02 `grep -c 'data-certeza' index.html` is still 74, either the temp file was empty or the splice did not find the marker — check `C:/tmp/s15-cards.html` exists and `grep 'cards will be appended here' index.html` returns 1.

## Deviations

- Added `## Observability / Diagnostics` section and failure-path diagnostic check to S15-PLAN.md, as required by the pre-flight instructions. This was a pre-flight fix, not a plan deviation.
- `grep -c "T02 Recipe"` count was initially 3 due to references in the Observability Impact and Accuracy Checklist sections of the draft; fixed by rewording those references to avoid the literal string, bringing the count to 1 as required.

## Known Issues

None. T02 can proceed immediately.

## Files Created/Modified

- `.gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md` — complete content draft: prose for both cards, sources, image note, and verbatim T02 Recipe HTML block (entity-encoded)
- `.gsd/milestones/M008/slices/S15/S15-PLAN.md` — added `## Observability / Diagnostics` section (pre-flight fix)
