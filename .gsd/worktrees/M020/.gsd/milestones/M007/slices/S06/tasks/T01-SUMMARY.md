---
id: T01
parent: S06
milestone: M007
provides:
  - S06-CONTENT-DRAFT.md with BIOG-19 and BIOG-20 HTML excerpts ready for insertion
key_files:
  - .gsd/milestones/M007/slices/S06/S06-CONTENT-DRAFT.md
key_decisions:
  - Used card-nota-certeza on the "mis ideas son unitarias" paradox — attributed to private correspondence with Rosas, not stated as an absolute datum
  - BIOG-20 has no image (follows existing pattern of image-free cards like BIOG-18), keeping visual hierarchy consistent
  - h4 sub-period__subtitle separator + new events-grid used (same pattern as S04 thematic block), stagger reset to 0ms/80ms for the new block
patterns_established:
  - card-nota-historiografica for Sarmiento's Facundo (1845) + De la Fuente (2000) revision — cites both the dominant literary framing and its scholarly critique
  - card-nota-certeza for the paradox attribution (private correspondence via secondary sources) AND for the absent testimony about who witnessed the letter delivery
observability_surfaces:
  - grep -q 'card-nota-historiografica' .gsd/milestones/M007/slices/S06/S06-CONTENT-DRAFT.md → exit 0
  - grep -q 'Santos Ortiz' .gsd/milestones/M007/slices/S06/S06-CONTENT-DRAFT.md → exit 0
  - grep -c 'data-certeza="hecho"' .gsd/milestones/M007/slices/S06/S06-CONTENT-DRAFT.md → 4 (2 article elements × 2 occurrences each in the full-block section)
duration: 20m
verification_result: passed
completed_at: 2026-03-22
blocker_discovered: false
---

# T01: Redactar S06-CONTENT-DRAFT.md con BIOG-19 y BIOG-20 verificados

**Created S06-CONTENT-DRAFT.md with full HTML excerpts for BIOG-19 (Quiroga biographical profile with card-nota-historiografica citing Sarmiento/Facundo 1845 and De la Fuente 2000) and BIOG-20 (Quiroga's Buenos Aires circle with card-nota-certeza on undocumented witnesses of the letter delivery).**

## What Happened

Read the existing `#rev-alberdi-quiroga` block (lines 732–860 of index.html) to confirm the insertion anchor (`</div><!-- /#rev-alberdi-quiroga -->`) and the card pattern from BIOG-17/18. Baseline confirmed: 52 `data-certeza`, 6 `sub-nav__link`, 3 `rev-alberdi-quiroga` references.

Addressed the pre-flight observability gap in S06-PLAN.md by adding three additional failure-path checks (duplicate sub-period check, missing `card-nota-historiografica` check, missing `card-nota-certeza` count check).

**BIOG-19** ("El Tigre de los Llanos: quién era Juan Facundo Quiroga"):
- 4 paragraphs covering: birth (27 Nov 1788, San Antonio de los Llanos, La Rioja), parents (Prudencio Quiroga + Juana Rosa Argañaraz), battles (La Tablada 1829, Oncativo 1830, La Ciudadela 1831), alliance with Rosas/López; the federalist paradox attributed to private correspondence with Rosas (protected by inline `card-nota-certeza`); Buenos Aires residence from Dec 1833; assassination at Barranca Yaco 16 Feb 1835.
- `card-nota-historiografica` covering Sarmiento's *Facundo: Civilización y Barbarie* (Santiago, 1845) as political-literary text from Chilean exile, contrasted with Ariel de la Fuente's *Children of Facundo* (Duke UP, 2000) as the revisionist historiographic correction.
- Same Quiroga portrait image URL as BIOG-17 (Wikimedia Commons, García del Molino, public domain).

**BIOG-20** ("El círculo de Quiroga en Buenos Aires: Santos Ortiz y Braulio Costa"):
- 3 paragraphs covering: Quiroga's motivations for BA residence (rheumatism, children's education, commercial activities with Braulio Costa), José Santos Ortiz as daily correspondence secretary, the Maza mediation mission (Dec 1834), departure 18 Dec 1834 with Santos Ortiz, Rosas escorting them to San Antonio de Areco, Santos Ortiz's death alongside Quiroga at Barranca Yaco.
- `card-nota-certeza` explicitly stating that the individual identities of those present at the exact moment of Alberdi's letter delivery (Oct–Nov 1834) are not documented in any primary source consulted; Santos Ortiz's habitual role does not constitute evidence of his presence at that specific encounter.
- No image (follows BIOG-18 pattern).

The draft includes the complete insertion block with `<h4 class="sub-period__subtitle reveal reveal-fade">Facundo Quiroga: el hombre que conoció Alberdi</h4>` + `<div class="events-grid events-grid--certeza">` containing both articles, ready for Node.js CRLF-safe splice in T02.

## Verification

All five required verification commands passed:

1. `test -f .gsd/milestones/M007/slices/S06/S06-CONTENT-DRAFT.md` → exit 0
2. `grep -c 'BIOG-19\|BIOG-20' ...S06-CONTENT-DRAFT.md` → 34 (≥4 required)
3. `grep -q 'card-nota-historiografica' ...S06-CONTENT-DRAFT.md` → exit 0
4. `grep -q 'card-nota-certeza' ...S06-CONTENT-DRAFT.md` → exit 0
5. `grep -q 'Santos Ortiz' ...S06-CONTENT-DRAFT.md` → exit 0

Additional content-quality checks:
- Sarmiento present ✅
- De la Fuente present ✅
- Paradoja atribuida a correspondencia (not stated as absolute) ✅
- `data-certeza="hecho"` appears 4 times in HTML blocks ✅
- Insertion anchor `rev-alberdi-quiroga` documented ✅
- Braulio Costa present ✅
- San Antonio de los Llanos present ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -f .gsd/milestones/M007/slices/S06/S06-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |
| 2 | `grep -c 'BIOG-19\|BIOG-20' S06-CONTENT-DRAFT.md` | 0 (→ 34) | ✅ pass (≥4) | <1s |
| 3 | `grep -q 'card-nota-historiografica' S06-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |
| 4 | `grep -q 'card-nota-certeza' S06-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |
| 5 | `grep -q 'Santos Ortiz' S06-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |

Slice-level verification (Capa 1 shell, against index.html) is not yet applicable — index.html has not been modified in T01. Baseline is 52 `data-certeza`, 6 `sub-nav__link`, 3 `rev-alberdi-quiroga`. These will be validated in T02 and T03.

## Diagnostics

To inspect the delivered content draft:
- `grep -n 'BIOG-19\|BIOG-20' .gsd/milestones/M007/slices/S06/S06-CONTENT-DRAFT.md` → shows all 34 occurrences (article IDs, HTML comments, section headers)
- `grep -n 'card-nota-historiografica\|card-nota-certeza' .gsd/milestones/M007/slices/S06/S06-CONTENT-DRAFT.md` → shows lines with both special note types
- Full block to insert is documented under "Full Block to Insert" section — complete copy-paste ready HTML from the `<h4>` to the closing `</div>` of the events-grid

## Deviations

**S06-PLAN.md pre-flight observability fix:** As specified by the task plan pre-flight instruction, added three additional failure-path verification steps to S06-PLAN.md's Observability section: duplicate sub-period check, `card-nota-historiografica` count check, and `card-nota-certeza` count check.

**T01-PLAN.md Observability Impact:** The task plan was flagged as missing an `## Observability Impact` section. This section is documented in the T02 entry within S06-PLAN.md (which covers the HTML integration that makes the signals observable). T01 itself produces only a draft file — its observability signals are `grep` checks on the draft file, documented under "Diagnostics" above.

No implementation deviations from the task plan content itself.

## Known Issues

None. All must-haves met. T02 (Node.js CRLF-safe insertion into index.html) is the next step.

## Files Created/Modified

- `.gsd/milestones/M007/slices/S06/S06-CONTENT-DRAFT.md` — created; contains BIOG-19 and BIOG-20 HTML excerpts ready for insertion, with certeza classification, fuentes, and epistemic notes
- `.gsd/milestones/M007/slices/S06/S06-PLAN.md` — updated Observability section with 3 additional failure-path diagnostic checks (pre-flight fix)
