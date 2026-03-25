---
id: T01
parent: S24
milestone: M008
provides:
  - S24-CONTENT-DRAFT.md with fully entity-encoded T02 Recipe HTML block (ENTITY_PASS + SCOPE_PASS confirmed)
key_files:
  - .gsd/milestones/M008/slices/S24/S24-CONTENT-DRAFT.md
key_decisions:
  - Image fallback: Buenos_Aires_1790.jpg (500px, HTTP 200 confirmed) used for S24-1 because Isola litograph (File:Encarnacion_Ezcurra_Isola.jpg) is missing from Wikimedia Commons
  - S24-2 runs without card-image block (mirrors S23-2 no-image pattern for interpretive companion cards)
  - data-certeza="opinión" (entity-encoded as opini&#xF3;n) for S24-2, consistent with D057 for historiographic interpretation cards
patterns_established:
  - Wikimedia API query pattern for litograph/portrait files; fallback to cityscape when portrait unavailable
  - Two-position card-nota-historiografica format confirmed for S24-2 (same structure as S23-2)
observability_surfaces:
  - ENTITY_PASS check: node -e on S24-CONTENT-DRAFT.md ## T02 Recipe section
  - SCOPE_PASS check: node -e banned-string scan on S24-CONTENT-DRAFT.md ## T02 Recipe section
  - T02 can inspect C:/tmp/s24-cards.html before splice; backup at C:/tmp/index.html.bak-s24
duration: ~15m
verification_result: passed
completed_at: 2026-03-23
blocker_discovered: false
---

# T01: Author S24-CONTENT-DRAFT.md with entity-encoded T02 Recipe HTML

**Authored S24-CONTENT-DRAFT.md with full prose sections and entity-encoded T02 Recipe HTML for both S24 cards; ENTITY_PASS and SCOPE_PASS confirmed.**

## What Happened

1. Read S24-RESEARCH.md and S24-PLAN.md to load all verified biographical facts, image guidance, scope boundary rules, and banned terms.
2. Read S23 card HTML (index.html lines 2027–2062) as structural reference for the T02 Recipe format.
3. Read DECISIONS.md (D001, D053, D057, D058) to confirm constraints.
4. Queried Wikimedia API for `File:Encarnacion_Ezcurra_Isola.jpg` — API returned `"missing"` (not on Commons). Searched for Buenos Aires colonial cityscape alternative: `File:Buenos_Aires_1790.jpg` returned a confirmed 500px thumb (780×454px original, HTTP 200). Used as S24-1 image; caption attributes it to Wikimedia Commons, public domain.
5. Wrote the draft with:
   - `## S24-1 Content` prose section (UTF-8): full name, birth 25 March 1795, father Juan Ignacio de Ezcurra (Pamplona/Cabildo/Consulado), mother Teodora Arguibel (French descent), merchant-class education, marriage 16 March 1813 (exact day), ages 18/20, Rosas's mother's opposition and ruse, sister María Josefa / Belgrano / Pedro Rosas y Belgrano adoption, no pre-Rosas public political activity documented.
   - `## S24-2 Content` prose section (UTF-8): two-position historiographic debate on autonomous agency vs. structural dependence — Ramos Mejía position (capital social propio, Mansilla anecdote) vs. Lynch synthesis (only became political in function of Rosas's project; correspondence irresoluble).
   - `## T02 Recipe` section: verbatim entity-encoded HTML for both cards following S23 pattern exactly.
6. S24-1: `card-hecho`, `data-certeza="hecho"`, `data-id="S24-1"`, `--reveal-delay: 0ms`, Buenos Aires 1790 image, year span `1795–1813`, all non-ASCII entity-encoded.
7. S24-2: `card-opinion`, `data-certeza="opini&#xF3;n"`, `data-id="S24-2"`, `--reveal-delay: 80ms`, no card-image block, two-position `card-nota-historiografica`.
8. Ran ENTITY_PASS check → `ENTITY_PASS`.
9. Ran SCOPE_PASS check → `SCOPE_PASS`.
10. Added `## Observability / Diagnostics` section to S24-PLAN.md (pre-flight requirement).

## Verification

All four must-have checks confirmed:

- `test -s .gsd/milestones/M008/slices/S24/S24-CONTENT-DRAFT.md` → exit 0 (file non-empty)
- `grep -c '## T02 Recipe' .gsd/milestones/M008/slices/S24/S24-CONTENT-DRAFT.md` → 1
- ENTITY_PASS node check → `ENTITY_PASS`
- SCOPE_PASS node check → `SCOPE_PASS`

Additional structural checks:
- `grep -c 'Encarnacion_Ezcurra_1835' S24-CONTENT-DRAFT.md` → 0 (S23-1 portrait correctly absent)
- Marriage date `16 de marzo de 1813` present in both prose and T02 Recipe sections (count 2)
- S24-2 no card-image block confirmed by Node.js parse
- `card-nota-historiografica` count in draft: 2 (one in prose section, one in T02 Recipe)

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -s .gsd/milestones/M008/slices/S24/S24-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |
| 2 | `grep -c '## T02 Recipe' S24-CONTENT-DRAFT.md` | 0 (output: 1) | ✅ pass | <1s |
| 3 | Node.js ENTITY_PASS check on ## T02 Recipe section | 0 (output: ENTITY_PASS) | ✅ pass | <1s |
| 4 | Node.js SCOPE_PASS check on ## T02 Recipe section | 0 (output: SCOPE_PASS) | ✅ pass | <1s |
| 5 | `grep -c 'Encarnacion_Ezcurra_1835' S24-CONTENT-DRAFT.md` | 1 (output: 0) | ✅ pass | <1s |
| 6 | Marriage date 16 March 1813 present | 0 (output: 2) | ✅ pass | <1s |
| 7 | S24-2 no card-image block (Node.js parse) | 0 (output: PASS_no_card_image_in_S24_2) | ✅ pass | <1s |

## Diagnostics

- **ENTITY_FAIL investigation:** If ENTITY_PASS fails in a future re-run, run `grep -n '[^\x00-\x7F]' .gsd/milestones/M008/slices/S24/S24-CONTENT-DRAFT.md` to locate offending lines (they'll be in the `## T02 Recipe` section — fix by converting the character to its HTML entity form).
- **SCOPE_FAIL investigation:** SCOPE_PASS check names the offending term(s); search the Recipe block for that term and remove/replace it.
- **Image verification:** The Buenos Aires 1790 fallback thumb URL is `https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Buenos_Aires_1790.jpg/500px-Buenos_Aires_1790.jpg`. Confirmed HTTP 200 at authoring time.

## Deviations

- **Image:** Plan said "query for `Encarnacion_Ezcurra_Isola.jpg`; if missing, fall back to Buenos Aires ca. 1800–1815 cityscape." Executed exactly as planned — Isola litograph missing, fallback used. The fallback image (`Buenos_Aires_1790.jpg`) is ca. 1790 rather than 1800–1815 but is the correct era and confirmed available.

## Known Issues

None. All must-haves satisfied; ENTITY_PASS and SCOPE_PASS confirmed. T02 may proceed.

## Files Created/Modified

- `.gsd/milestones/M008/slices/S24/S24-CONTENT-DRAFT.md` — complete draft: prose sections (UTF-8) + fully entity-encoded T02 Recipe HTML for S24-1 and S24-2
- `.gsd/milestones/M008/slices/S24/S24-PLAN.md` — added `## Observability / Diagnostics` section (pre-flight requirement)
