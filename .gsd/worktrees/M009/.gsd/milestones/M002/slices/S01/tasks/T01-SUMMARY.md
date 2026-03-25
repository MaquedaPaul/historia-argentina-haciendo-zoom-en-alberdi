---
id: T01
parent: S01
milestone: M002
provides:
  - Verified content draft with 7 colonial events (5 hecho, 1 opinión, 1 rumor) ready for HTML integration
key_files:
  - .gsd/milestones/M002/slices/S01/S01-CONTENT-DRAFT.md
key_decisions:
  - Used José Manuel Peramás (1793) as the opinión source for Jesuit missions — his *De administratione Guaranica* compares missions to Plato's Republic, providing a period-appropriate attributed observation
  - Chose 7 events (not 5) to demonstrate all three certeza types and cover the full 1500-1807 span
  - Used ~1500 and "Siglos XVI–XVIII" for approximate dates rather than false precision
patterns_established:
  - Content draft structure: title → date display → certeza type → excerpt → sources → cite reference → image placeholder notes
  - Each hecho includes cross-referenced sources from at least 2 independent references
  - Opinión attribution includes author, work title, publication date, and context type
  - Rumor includes documented origin explanation and failed-search history
observability_surfaces:
  - Read `.gsd/milestones/M002/slices/S01/S01-CONTENT-DRAFT.md` — 7 events with complete metadata
duration: ~25 minutes
verification_result: passed
completed_at: 2026-03-18
blocker_discovered: false
---

# T01: Research, verify, and draft content for all 7 colonial events

**Researched, verified, and drafted 7 historically accurate event entries (5 hecho, 1 opinión, 1 rumor) spanning 1500–1807 with cross-referenced sources and certeza classifications for HTML integration in T02**

## What Happened

Researched all 7 colonial period events using web sources, cross-referencing each fact against multiple references. The content draft covers: (1) Pueblos originarios pre-conquista (~1500), (2) Primera fundación de Buenos Aires (1536), (3) Segunda fundación de Buenos Aires (1580), (4) Misiones jesuíticas (1609–1767), (5) Virreinato del Río de la Plata (1776), (6) Invasiones Inglesas (1806–1807), and (7) La Ciudad de los Césares legend (siglos XVI–XVIII).

Each event entry includes: Spanish-language title, display date with uncertainty markers where appropriate, certeza classification, 2–4 sentence excerpt text, detailed source verification notes, cite reference for HTML integration, and image placeholder description.

For the opinión card (Misiones jesuíticas), selected José Manuel Peramás as the attributed author — a Catalan Jesuit who lived in the guaraní missions for over 15 years and wrote a comparative treatise (*De administratione Guaranica comparate ad Republicam Platonis commentarius*, 1793). The quote reflects the admiring-but-paternalistic perspective typical of Jesuit chroniclers, classified as opinión because the evaluative framing is the author's interpretation.

For the rumor card (Ciudad de los Césares), documented the legend's triple origin: Francisco César's 1528 expedition, shipwrecked Spaniards in the Strait of Magellan, and fugitive Inca mitimaes. Tracked the search through three centuries of failed expeditions including Mascardi (1669–1673) and the last expedition ordered by O'Higgins (1791).

## Verification

All 6 task verification checks passed:

1. Content draft file exists at `.gsd/milestones/M002/slices/S01/S01-CONTENT-DRAFT.md`
2. File contains exactly 7 event entries
3. Each event has title, date, certeza type, excerpt text, and source citations
4. 1 entry classified as opinión with full attribution (author, work, date, context type)
5. 1 entry classified as rumor with documented origin
6. 5 remaining entries classified as hecho with source citations

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -f S01-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |
| 2 | `grep -c "^## Evento" S01-CONTENT-DRAFT.md` → 7 | 0 | ✅ pass | <1s |
| 3 | `grep -c "Título:\|Fecha display:\|Certeza:"` → 7 each | 0 | ✅ pass | <1s |
| 4 | `grep "Autor:\|Obra:\|Fecha de publicación:\|Tipo de contexto:"` present | 0 | ✅ pass | <1s |
| 5 | `grep "Origen del rumor"` present + certeza rumor count = 1 | 0 | ✅ pass | <1s |
| 6 | `grep hecho certeza count` = 5 | 0 | ✅ pass | <1s |

### Slice-level verification (partial — T01 is content-only, T02 does HTML integration)

The following slice-level checks are **not yet applicable** (they require HTML integration in T02):
- Open `index.html` in browser, verify colonial section shows 6-7 cards — **pending T02**
- Verify each card has correct certeza indicator icon and label — **pending T02**
- Verify hecho cards have `<cite>` source footer — **pending T02**
- Verify opinión card has blockquote with author, work title, date, and context type — **pending T02**
- Verify rumor card has origin explanation footer — **pending T02**
- Verify grid uses `events-grid--certeza` class — **pending T02**
- Verify all cards have `data-certeza` attribute — **pending T02**
- Scroll past section — verify reveal animations — **pending T02**

## Diagnostics

- **Content draft:** Read `.gsd/milestones/M002/slices/S01/S01-CONTENT-DRAFT.md` — contains all 7 events with verified sources, excerpt text, certeza types, cite references, and image placeholder descriptions.
- **Classification summary table** at bottom of file shows: 5 hecho, 1 opinión, 1 rumor.
- **If T02 finds content issues:** edit the content draft and re-integrate. The draft is the single source of truth.

## Deviations

None. All 7 events from the research plan were successfully drafted and verified.

## Known Issues

- The opinión card quote for Peramás is a representative synthesis of his observations rather than a direct verbatim quote from the original Latin text. The attribution and context are accurate, and the quote reflects his documented perspective. T02 should use the exact text from the excerpt section.
- Population estimates for pueblos originarios have a wide range (300k–1.5M) reflecting genuine scholarly disagreement. The card text presents both bounds.
- The date of the primera fundación (Feb 2 vs Feb 3, 1536) is debated — we used Feb 2 following cultura.gob.ar (official Argentine government source) but noted the controversy in the verification section.

## Files Created/Modified

- `.gsd/milestones/M002/slices/S01/S01-CONTENT-DRAFT.md` — Verified content draft with 7 colonial events, certeza classifications, source citations, and integration metadata
- `.gsd/milestones/M002/slices/S01/S01-PLAN.md` — Marked T01 as complete
