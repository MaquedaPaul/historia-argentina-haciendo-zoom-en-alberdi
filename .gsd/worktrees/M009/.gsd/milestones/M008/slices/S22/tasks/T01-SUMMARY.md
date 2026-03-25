---
id: T01
parent: S22
milestone: M008
provides:
  - S22-CONTENT-DRAFT.md with entity-encoded T02 Recipe HTML block ready for splice
key_files:
  - .gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md
key_decisions:
  - Used S17-1/S21-2 pattern (single card-opinion with embedded card-nota-historiografica) rather than two-card split
  - Included optional Alberdi angle in excerpt as a one-sentence thread connecting unitario and revisionista foreign-policy positions
  - Distinct Monvoisin portrait URL (no-comma variant) confirmed to differ from the SP3 comma-variant already used
patterns_established:
  - Scope-boundary cross-reference phrasing: "detallados en las tarjetas S14-1 y S14-2" as the canonical opener for S22-class cards that presuppose bloqueo events
observability_surfaces:
  - "test -s .gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md && echo EXISTS"
  - "node entity-check on T02 Recipe block → ENTITY_PASS"
  - "node scope-boundary check on T02 Recipe block → SCOPE_PASS"
duration: ~15m
verification_result: passed
completed_at: 2026-03-23
blocker_discovered: false
---

# T01: Author S22-CONTENT-DRAFT.md with soberanía exterior debate and entity-encoded T02 Recipe

**Authored S22-CONTENT-DRAFT.md with entity-encoded HTML for card S22-1 framing the foreign-policy sovereignty debate; ENTITY_PASS and SCOPE_PASS on first attempt.**

## What Happened

Read S17-1 and S21-2 from index.html to confirm the structural pattern for `card-opinion` cards with embedded `card-nota-historiografica`. Verified the baseline `data-certeza` count (88) and confirmed the Monvoisin portrait URL is a distinct Wikimedia file from the one already used in SP3 (comma-variant vs. no-comma-variant). 

Added the pre-flight Observability sections to S22-PLAN.md (`## Observability / Diagnostics`) and T01-PLAN.md (`## Observability Impact`) before writing the draft.

Wrote S22-CONTENT-DRAFT.md with:
- A prose `## S22-1` section documenting card metadata, image, excerpt, and three-position nota historiográfica (revisionista / liberal / síntesis contemporánea)
- A `## T02 Recipe` section containing the verbatim entity-encoded HTML for card S22-1

The excerpt opens with the required cross-reference ("los hechos del período —detallados en las tarjetas S14-1 y S14-2—"), pivots immediately to the interpretive sovereignty question, and includes the optional Alberdi thread as a third sentence that complicates the clean revisionista/liberal binary. The nota historiográfica attributes: Irazusta & Irazusta 1934 + Irazusta 1941 (revisionista), Halperín Donghi 1972 (liberal), Lynch 1981 cap. 8 (síntesis). No events from S14-2 appear in the T02 Recipe HTML.

## Verification

All five T01 verification checks ran and passed:

1. `test -s .gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md` → file exists and is non-empty (7937 bytes)
2. `grep -c "^## S22-" ...S22-CONTENT-DRAFT.md` → 1
3. `grep -c "^## T02 Recipe" ...S22-CONTENT-DRAFT.md` → 1
4. Node.js entity check on T02 Recipe block → **ENTITY_PASS**
5. Node.js scope-boundary check on T02 Recipe block → **SCOPE_PASS**

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -s .gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |
| 2 | `grep -c "^## S22-" S22-CONTENT-DRAFT.md` → 1 | 0 | ✅ pass | <1s |
| 3 | `grep -c "^## T02 Recipe" S22-CONTENT-DRAFT.md` → 1 | 0 | ✅ pass | <1s |
| 4 | Node.js entity check → ENTITY_PASS | 0 | ✅ pass | <1s |
| 5 | Node.js scope-boundary check → SCOPE_PASS | 0 | ✅ pass | <1s |

Slice-level checks (partial, T02 not yet run):
- `grep -c 'data-certeza' index.html` → 88 (not yet 89; T02 will advance this)
- `grep -c 'data-id="S22-' index.html` → 0 (not yet 1; T02 will add the card)

## Diagnostics

- `test -s .gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md && echo EXISTS` — confirms T01 output
- `grep -c "^## T02 Recipe" .gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md` — confirms Recipe block present for T02 to consume
- If entity check fails after future edits: inspect lines output by the ENTITY_FAIL report and apply entity mappings from T01-PLAN.md step 3 table
- If scope check fails: search for banned terms (`Vuelta de Obligado`, `Convención Mackau`, `octubre de 1840`, `bloqueo francés`, `1838 y 1840`, `Caseros`, `3 de febrero de 1852`) in the T02 Recipe block and replace with cross-reference wording

## Deviations

None. Followed the plan exactly. The Alberdi sentence was included in the excerpt as permitted by the plan ("optional... if space allows").

## Known Issues

None.

## Files Created/Modified

- `.gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md` — new file; prose S22-1 section + entity-encoded T02 Recipe HTML for card S22-1 (soberanía exterior debate, Monvoisin portrait, three-position nota with Lynch cap. 8 synthesis)
- `.gsd/milestones/M008/slices/S22/S22-PLAN.md` — added `## Observability / Diagnostics` section (pre-flight fix)
- `.gsd/milestones/M008/slices/S22/tasks/T01-PLAN.md` — added `## Observability Impact` section (pre-flight fix)
