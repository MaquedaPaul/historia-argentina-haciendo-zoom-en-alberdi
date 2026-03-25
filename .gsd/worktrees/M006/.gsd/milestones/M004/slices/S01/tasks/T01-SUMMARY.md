---
id: T01
parent: S01
milestone: M004
provides:
  - S01-CONTENT-DRAFT.md — complete 7-event verified content draft for #periodo-nacional (1860–1900) with certeza classification, source citations, Alberdi narrative angles, and image candidates
  - Certeza distribution: 6 hecho, 1 opinión (Evento 7 — Alberdi legado), 0 rumor
  - El crimen de la guerra quote correctly attributed (written ca. 1870, published 1895 Escritos Póstumos)
  - Alberdi death flagged: 19 de julio de 1884 [VERIFICACIÓN PENDIENTE]
  - Alberdi narrative arc closed in Evento 7: return 1879, diputado Tucumán, vicepresidente Cámara, death 1884, legacy
  - 23 source citations across 7 events (avg >3 per event; all hecho events have ≥2 independent sources)
  - Integration notes for T02 (image sourcing) and T03 (HTML): stagger delays, certeza classes, pending verification flags
key_files:
  - .gsd/milestones/M004/slices/S01/S01-CONTENT-DRAFT.md
key_decisions:
  - Evento 7 classified as "opinión (con elementos de hecho documentados)" — biographical facts (return, election, death) are hecho, but "legacy as intellectual father of the Constitution" is inherently historiographic interpretation; classifying the whole card as opinión is more epistemically honest than hecho
  - Roca quote in Evento 3 flagged as "verify against primary source before HTML blockquote" — present in multiple secondary sources but primary-source attribution not confirmed
patterns_established:
  - "Nota historiográfica" within a hecho card (Evento 3 — Conquista del Desierto) to document live historiographic debate without editorializing — extends M003 debate-card pattern to contested labeling, not just contested facts
  - Simultaneous events cross-reference: Evento 3 (Conquista del Desierto 1879) and Evento 7 (Alberdi's return 1879) are the same year — noted in Alberdi angle to reinforce narrative irony
observability_surfaces:
  - grep -c "^## Evento" S01-CONTENT-DRAFT.md → 7 (event count)
  - grep "VERIFICACIÓN PENDIENTE" S01-CONTENT-DRAFT.md → shows all unresolved flags before HTML integration
  - grep "Certeza:" S01-CONTENT-DRAFT.md → shows full certeza distribution at a glance
  - T02 image sourcing will resolve the 3 "Nota" flagged items before HTML work begins
duration: ~45 minutes
verification_result: passed
completed_at: 2026-03-19
blocker_discovered: false
---

# T01: Content draft — 7 verified events with certeza and Alberdi narrative

**S01-CONTENT-DRAFT.md written: 7 verified events for the 1860–1900 panoramic period, 6 hecho + 1 opinión, all with source citations, Alberdi angles, and image candidates — ready for image sourcing (T02) and HTML integration (T03).**

## What Happened

All research inputs (M004-RESEARCH.md, M004-CONTEXT.md, M003-SUMMARY.md) were read before writing. The draft was produced in a single Write call to avoid heredoc issues (per KNOWLEDGE.md). Each of the 7 events received: title, date range, certeza classification, 2–4 sentence extract, ≥2 source citations (for hecho events), direct quote with full attribution (Evento 2 — *El crimen de la guerra*; Evento 3 — Roca quote), Alberdi narrative angle, and image candidate with alternates.

The most deliberate content decisions:

1. **Evento 7 certeza as "opinión"** — The biographical facts (return 1879, elected diputado, vicepresidente Cámara, death July 19 1884) are verifiable hechos. But the card's function is to close Alberdi's narrative arc and assess his legacy — which is inherently a historiographic interpretation. Classifying it as opinión is more honest and also provides the `<blockquote>` structure that the HTML template requires for opinión cards.

2. **Evento 3 nota historiográfica** — The Conquista del Desierto card carries an explicit note that the "genocidio vs. construcción del Estado" debate is live and that the card documents facts without taking sides. This extends the M003 debate-card pattern to contested *labeling* of events, not just contested facts within events.

3. **El crimen de la guerra attribution** — The draft explicitly states: written ca. 1870, published posthumously in *Escritos Póstumos* tomo VIII (Buenos Aires, 1895). The Must-Have pitfall ("do NOT say published 1870") is addressed both in the Evento 2 attribution note and in the Common Pitfalls section of the research. The quote itself matches the CADEP 2022 / scielo.org.ar verified text.

4. **Alberdi death date** — Used "19 de julio de 1884 [VERIFICACIÓN PENDIENTE]" with an explicit note that sources diverge between June 19 and July 19. The integration notes section flags this for T02 resolution before HTML work.

5. **Cross-period narrative thread** — Evento 3 (Conquista del Desierto, 1878–1885) and Evento 7 (Alberdi returns 1879) overlap in time. This is called out in Evento 3's Alberdi angle as an intentional narrative irony: Alberdi returns to take his seat in Congress the same year Roca marches south with 6,000 troops to enforce the model Alberdi designed.

## Verification

All four task-plan verification checks executed and passed:

1. `grep -c "^## Evento" S01-CONTENT-DRAFT.md` → **7** ✅
2. Each event has Título, Fecha, Certeza, Extracto, Fuentes, Imagen, Ángulo Alberdi fields → **7/7** ✅
3. Evento 7 contains "19 de julio de 1884" + [VERIFICACIÓN PENDIENTE] → **present** ✅
4. Evento 2 contains "Escrito ca. 1870" + "Publicado póstumamente en *Escritos Póstumos*... (1895)" → **present** ✅

Additional checks:
- Certeza distribution: 6 hecho, 1 opinión, 0 rumor ✅
- 23 source bullet points across 7 events (≥2 per hecho event) ✅
- 7 image candidates (one per event) ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c "^## Evento" .gsd/milestones/M004/slices/S01/S01-CONTENT-DRAFT.md` | 0 (output: 7) | ✅ pass | <1s |
| 2 | `grep -E "\*\*Título:\*\*" ...DRAFT.md \| wc -l` | 0 (output: 7) | ✅ pass | <1s |
| 3 | `grep -E "\*\*Certeza:\*\*" ...DRAFT.md \| wc -l` | 0 (output: 7) | ✅ pass | <1s |
| 4 | `grep -E "### Fuentes" ...DRAFT.md \| wc -l` | 0 (output: 7) | ✅ pass | <1s |
| 5 | `grep -E "### Imagen" ...DRAFT.md \| wc -l` | 0 (output: 7) | ✅ pass | <1s |
| 6 | `grep "19 de julio de 1884" ...DRAFT.md` | 0 (found) | ✅ pass | <1s |
| 7 | `grep "VERIFICACIÓN PENDIENTE" ...DRAFT.md` | 0 (found 2x) | ✅ pass | <1s |
| 8 | `grep -i "escrito ca.*1870\|publicado.*1895" ...DRAFT.md` | 0 (found) | ✅ pass | <1s |
| 9 | Count source bullets: `grep -A 10 "### Fuentes" \| grep "^- " \| wc -l` | 0 (output: 23) | ✅ pass | <1s |

## Diagnostics

The S01-CONTENT-DRAFT.md file is the canonical content source for T02 and T03. Future agents should:

- `grep "VERIFICACIÓN PENDIENTE" S01-CONTENT-DRAFT.md` — shows all unresolved flags that must be resolved before HTML. Currently: 2 instances (Alberdi death date × 2 for the same fact).
- `grep "Certeza:" S01-CONTENT-DRAFT.md` — full certeza distribution at a glance.
- `grep "^## Evento" S01-CONTENT-DRAFT.md` — event list with anchors.
- `grep "Candidato:" S01-CONTENT-DRAFT.md` — all 7 image candidates for T02 Wikimedia API sourcing.

The 3 items flagged in "Notas de integración" (Alberdi death date, Roca quote attribution, Alberdi photo filename) are T02 inputs, not blockers for T02 itself — T02 will query the Wikimedia API for all 7 image candidates and can also resolve the Alberdi filename question in the same pass.

## Deviations

- Evento 7 certeza: the plan said "opinión/hecho" — the draft settles on "opinión (con elementos de hecho documentados)" with a certeza note explaining the reasoning. This is a clarification, not a deviation; the HTML integration (T03) will use `data-certeza="opinion"`.
- Roca quote in Evento 3 included in the Extracto text (not in a `<blockquote>`) with a flag to verify attribution before HTML blockquote treatment. The plan didn't specify HTML treatment at this stage.

## Known Issues

- **Alberdi death date unresolved** — "19 de julio de 1884" is the working date with [VERIFICACIÓN PENDIENTE]. Primary-source verification (Obras Completas t. VIII or period obituary) should happen before T03 HTML integration. T02 can potentially surface this via Wikimedia Commons photo metadata for the Alberdi portrait.
- **Roca quote primary source** — the quote about "seis mil soldados" appears in many secondary sources but the primary attribution (which document, which date) is not specified in M004-RESEARCH.md. Should be resolved before using in a `<blockquote>` in the HTML.

## Files Created/Modified

- `.gsd/milestones/M004/slices/S01/S01-CONTENT-DRAFT.md` — 7-event verified content draft for #periodo-nacional (1860–1900): 6 hecho + 1 opinión, 23 source citations, Alberdi narrative angles per card, 7 Wikimedia image candidates, integration notes for T02/T03, pending verification flags
