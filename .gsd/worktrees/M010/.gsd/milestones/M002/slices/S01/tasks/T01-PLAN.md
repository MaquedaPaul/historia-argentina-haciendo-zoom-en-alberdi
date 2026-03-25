---
estimated_steps: 7
estimated_files: 1
---

# T01: Research, verify, and draft content for all 6-7 colonial events

**Slice:** S01 — Contenido histórico verificado integrado en cards
**Milestone:** M002

## Description

Research and draft historically verified content for 6-7 events spanning the Argentine colonial period (~1500-1807). Each event needs a 2-4 sentence excerpt, certeza classification, and source citations. This is the highest-risk task in M002 — every fact must be cross-referenced against reliable historical sources before any HTML integration happens. The content draft serves as the verified source of truth for T02's HTML integration.

## Steps

1. Research pueblos originarios pre-conquest (~1500): identify major groups (Diaguitas, Guaraníes, Mapuches, Querandíes, etc.), their geographic distribution, and approximate population. Classify as `hecho` with archaeological/ethnohistorical sources. Use "~1500" or "Siglo XVI" for date display since pre-contact dates are approximate.
2. Research primera fundación de Buenos Aires by Pedro de Mendoza (1536): verify exact date (February 3, 1536), circumstances (expedition from Spain, hostile conditions, Querandí resistance), and outcome (abandonment ~1541). Classify as `hecho`. Source: expedition chronicles.
3. Research segunda fundación de Buenos Aires by Juan de Garay (1580): verify date (June 11, 1580), the founding act, and its permanence. Classify as `hecho`. Source: founding documents.
4. Research Jesuit Missions (Misiones jesuíticas, 1609-1767): find a period chronicle quote or attributed observation about the mission system for the `opinión` card. Verify the quote's author, date, work, and context. The missions are well-documented but period observations carry interpretive framing.
5. Research Virreinato del Río de la Plata (1776): verify the royal decree, Carlos III, Buenos Aires as capital, and the geopolitical reasons. Classify as `hecho`. Source: royal decree documentation.
6. Research Invasiones Inglesas (1806-1807): verify dates of both invasions, key figures (Beresford, Liniers, Alzaga), and the criollo identity impact. Classify as `hecho`. Source: military records, contemporary accounts.
7. Research La Ciudad de los Césares legend (XVI-XVIII centuries): identify the origin of the legend, its various versions, and why it persisted. Classify as `rumor`. Document the legend's origin and the fact that no evidence was ever found.

## Must-Haves

- [ ] All 6-7 events researched with 2-4 sentence excerpts
- [ ] Every date, name, and place cross-referenced against at least 2 sources
- [ ] Each event classified: hecho / opinión / rumor
- [ ] Source citations documented for every event
- [ ] Opinión card has exact quote with full attribution (author, work, date, context type)
- [ ] Rumor card has documented origin explanation
- [ ] Approximate dates marked with uncertainty indicators (~, "Siglo XVI")
- [ ] Language is historically appropriate — no anachronistic framing

## Verification

- Content draft file exists at `.gsd/milestones/M002/slices/S01/S01-CONTENT-DRAFT.md`
- File contains 6-7 event entries, each with: title, date, certeza type, excerpt text, source citations
- At least 1 entry is classified as opinión with a verified quote and full attribution
- At least 1 entry is classified as rumor with origin documented
- All remaining entries are classified as hecho with source citations

## Inputs

- M002-RESEARCH.md — content plan table identifying the 7 candidate events with certeza types
- M002-CONTEXT.md — slice S01 task list (T01-T05) defining the 5 research topics

## Expected Output

- `.gsd/milestones/M002/slices/S01/S01-CONTENT-DRAFT.md` — Verified content draft with all 6-7 events ready for HTML integration in T02

## Observability Impact

**Signals changed:** This task creates the content draft artifact — the verified source of truth. No runtime signals change (no HTML/CSS/JS modified).

**How a future agent inspects this task:**
- Read `.gsd/milestones/M002/slices/S01/S01-CONTENT-DRAFT.md` — should contain 7 event entries, each with title, date, certeza type, excerpt text, and source citations.
- Verify at least 1 entry classified as `opinión` with full quote attribution (author, work, date, context type).
- Verify at least 1 entry classified as `rumor` with documented origin.
- Remaining entries should be `hecho` with source citations.

**Failure state visibility:**
- If the content draft is missing or incomplete, T02 (HTML integration) cannot proceed — T02's plan explicitly depends on this artifact.
- If sources are missing or dates unverified, the content fails the D008/R012 hard constraint on historical accuracy.
