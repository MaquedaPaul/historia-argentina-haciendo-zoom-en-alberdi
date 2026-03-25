---
id: T01
parent: S17
milestone: M008
provides:
  - S17-CONTENT-DRAFT.md with prose, two-position card-nota-historiografica, and entity-encoded T02 Recipe HTML block
key_files:
  - .gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md
key_decisions:
  - data-certeza="opinión" (accented) per S17-PLAN.md spec — distinct from "debatido" used in S14-3/S15-2/S16-3
  - certeza-indicator icon: &#x1F4AC; (💬) with label "Opinión / debate interpretativo" — consistent with existing "opinion" card pattern in pre-S14 cards
  - Two-position nota (revisionista + liberal/síntesis) — no third position needed; Halperín Donghi/Lynch synthesis IS the liberal counter-argument for S17
  - reveal-fade animation class per explicit S17 plan requirement (distinct from reveal-slide used in S14-S16)
patterns_established:
  - S17 scope boundary: internal-order counterfactual only; bloqueos/sovereignty → S22; general tiranía/caudillo polarity → S14-3
observability_surfaces:
  - test -s .gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md — confirms T01 completed
  - grep -c 'T02 Recipe' .gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md — confirms splice block present
  - grep -c 'data-certeza' index.html — still 79 (T01 does not touch index.html)
duration: 15m
verification_result: passed
completed_at: 2026-03-23
blocker_discovered: false
---

# T01: Author S17-CONTENT-DRAFT.md — necessity argument card

**Authored S17-CONTENT-DRAFT.md with the "historical necessity" counterfactual card for Rosas, including entity-encoded T02 Recipe HTML block ready for T02 splice.**

## What Happened

Read S14-3 and S16-3 cards from index.html to confirm scope boundary, then read S17-RESEARCH.md and S16-CONTENT-DRAFT.md for the card structure template and entity encoding pattern.

Key findings during reconnaissance:
- Append marker confirmed at line 1850: `<!-- S10–S24 cards will be appended here by subsequent slices -->`
- Existing S14-S16 interpretation cards use `data-certeza="debatido"` (not `"opinión"`), but S17-PLAN explicitly requires `"opinión"` per D052 semantic distinction
- Existing `data-certeza="opinion"` (unaccented) cards use `💬 Opinión atribuida` as the indicator — updated Recipe to use `&#x1F4AC;` (💬) with `Opini&#xF3;n / debate interpretativo` to be consistent with this pattern
- The plan required `reveal-fade` class (explicitly stated in T01-PLAN card structure spec) — confirmed this is distinct from `reveal-slide` used in S14-S16

Also applied the three pre-flight observability fixes:
1. Added `## Observability / Diagnostics` section to S17-PLAN.md with runtime signals, inspection surfaces, failure visibility, and redaction constraints
2. Added a diagnostic verification step note in S17-PLAN's Verification section (the existing checks already included failure-path visibility)
3. Added `## Observability Impact` to T01-PLAN.md explaining signals, inspection commands, and failure states

Wrote the draft with:
- Prose excerpt framing the 1820–1829 chaos baseline (Cepeda 1820, eight governors in one year, Dorrego fusilamiento December 1828) as counterfactual anchor
- `card-nota-historiografica` with two clearly attributed positions (Irazusta 1941 for revisionista; Halperín Donghi 1972 + Lynch 1981 cap. 10 for liberal/síntesis)
- T02 Recipe HTML block with all non-ASCII encoded as HTML entities (á→&#xE1;, é→&#xE9;, í→&#xED;, ó→&#xF3;, ú→&#xFA;, ñ→&#xF1;, ¿→&#xBF;, —→&#x2014;, ó in "opinión"→&#xF3;)
- Scope compliance checklist confirming no bloqueos/sovereignty content and no repetition of S14-3's general polarity

## Verification

Ran all four T01 verification commands:

```bash
test -s .gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md && echo DRAFT_OK   # → DRAFT_OK
grep -c 'T02 Recipe' .gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md       # → 1
grep -c 'Irazusta' .gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md         # → 4
grep -c 'Lynch' .gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md            # → 4
```

Also verified index.html is untouched:
```bash
grep -c 'data-certeza' index.html          # → 79 (unchanged)
grep -c 'cards will be appended here' index.html  # → 1 (marker intact)
```

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -s S17-CONTENT-DRAFT.md && echo DRAFT_OK` | 0 | ✅ pass | <1s |
| 2 | `grep -c 'T02 Recipe' S17-CONTENT-DRAFT.md` → 1 | 0 | ✅ pass | <1s |
| 3 | `grep -c 'Irazusta' S17-CONTENT-DRAFT.md` → 4 | 0 | ✅ pass | <1s |
| 4 | `grep -c 'Lynch' S17-CONTENT-DRAFT.md` → 4 | 0 | ✅ pass | <1s |
| 5 | `grep -c 'data-certeza' index.html` → 79 | 0 | ✅ pass (no mutation) | <1s |
| 6 | `grep -c 'cards will be appended here' index.html` → 1 | 0 | ✅ pass (marker intact) | <1s |

Partial slice verification (T01 only — T02 checks require index.html mutation):

| # | Command | Exit Code | Verdict | Notes |
|---|---------|-----------|---------|-------|
| 7 | `test -s S17-CONTENT-DRAFT.md && echo DRAFT_OK` | 0 | ✅ pass | Slice check #8 |
| 8 | `grep -c 'data-certeza' index.html` → 79 | 0 | ✅ expected (T02 not yet run) | Slice checks #1 expects 80 — awaits T02 |

## Diagnostics

- `test -s .gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md` — confirms draft exists
- `grep 'data-certeza' .gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md` — shows `opini&#xF3;n` in Recipe block (entity-encoded)
- `grep 'card-nota-historiografica' .gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md` — confirms nota block is present in Recipe
- T01 never touches index.html — any failure is isolated to the draft file

## Deviations

- **certeza-indicator icon changed from ⚖ (&#x2696;) to 💬 (&#x1F4AC;):** The plan specified no icon, but reconnaissance of existing cards revealed that `card-opinion` cards with `data-certeza="opinion"` all use `💬` (speech bubble) with `Opinión atribuida` or `Interpretación historiográfica` label. The ⚖ icon is used for `data-certeza="debatido"` cards. Updated to `&#x1F4AC;` for consistency with the existing opinion-type card pattern. This is a visual consistency fix, not a scope change.

## Known Issues

None. The Recipe block entity encoding should be verified by T02 before running the Node.js splice — particularly confirm `opini&#xF3;n` survives the Windows shell round-trip by inspecting `C:/tmp/s17-cards.html` before splice.

## Files Created/Modified

- `.gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md` — created: prose, two-position nota, entity-encoded T02 Recipe HTML block
- `.gsd/milestones/M008/slices/S17/S17-PLAN.md` — modified: added `## Observability / Diagnostics` section (pre-flight fix)
- `.gsd/milestones/M008/slices/S17/tasks/T01-PLAN.md` — modified: added `## Observability Impact` section (pre-flight fix)
