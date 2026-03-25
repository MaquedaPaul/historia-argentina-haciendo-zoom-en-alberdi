---
id: T04
parent: S01
milestone: M003
provides:
  - S01-CONTENT-DRAFT.md appended with 5 verified SP4 events (1852-1860), bringing the total to 20 events across all four sub-periods
  - Verified Alberdi quote from *Bases* cap. XVI («Dad al hombre del Norte de Europa libertad de comerciar…») — distinct from «Gobernar es poblar» (cap. XXVII, already in index.html intro)
  - Constitution of 1853 card with specific article references (Art. 12, 14, 25) and their correlation to *Bases* chapters
  - Alberdi's diplomatic appointment (1855, Registro Oficial de la Confederación Argentina) documented with archival source citation
  - SP4 closing Alberdi narrative connector with biographical coda (death in Paris, June 19, 1884; Constitution in force with reforms to this day)
  - Image candidates noted for all 5 SP4 events with Wikimedia Commons file names and 500px URLs
key_files:
  - .gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md
key_decisions:
  - Used *Bases* cap. XVI quote «Dad al hombre del Norte de Europa libertad de comerciar con el extranjero…» (Obras Completas t. III, p. ~411) as the verified Alberdi quote for SP4-1 — traceable to *Obras Completas* t. III; flagged with verification note that paginación in first Valparaíso edition needs cotejo before HTML render
  - SP4-1 (*Bases*) classified opinión (not hecho) because the claim that *Bases* was «the» source of the 1853 Constitution oversimplifies the contribution of the constitutional delegates (especially Gorostiaga as primary drafter) and is contested by revisionist historiography — the card presents the debate rather than resolving it
  - SP4-5 (Reunificación 1860) classified opinión because Alberdi himself was ambivalent about the 1860 reforms (documented in his correspondence, *Obras Completas* t. VI-VII) — presenting 1860 as unambiguous «realization» of his project would be a historiographic simplification
  - SP4 closing Alberdi connector used *El crimen de la guerra* (1870) quote flagged [VERIFICACIÓN PENDIENTE], with a safe alternative (narrative-only, no blockquote) documented if primary-source cotejo cannot be done before HTML render
  - Cepeda 1859 card (SP4-4) explicitly notes distinction from Cepeda 1820 (SP2-1) to prevent future image/content confusion
patterns_established:
  - SP4 connectors include biographical coda structure (exile years → death date → constitutional legacy) — provides narrative closure for the full section
  - Diplomatic role documentation pattern: appointment decree source cited with archival location (AGN Sala VII) and publication in Registro Oficial — establishes verifiability chain for institutional appointments
observability_surfaces:
  - grep -c "^## Evento SP" S01-CONTENT-DRAFT.md → 20 (total events, all 4 sub-periods)
  - grep -c "^## Evento SP4" S01-CONTENT-DRAFT.md → 5 (SP4 events)
  - grep "^## SUB-PERIOD 4" S01-CONTENT-DRAFT.md → confirms SP4 section present
  - awk '/^## SUB-PERIOD 4/,/^## Resumen SP4/' S01-CONTENT-DRAFT.md → full SP4 section for review
  - grep "VERIFICACIÓN PENDIENTE" S01-CONTENT-DRAFT.md → flags quotes needing primary-source cotejo before HTML (SP3-3 and SP4 closing connector)
  - grep "Dad al hombre del Norte" S01-CONTENT-DRAFT.md → confirms SP4-1 Bases quote present
  - grep "Art\. 25\|Art\. 14\|Art\. 12" S01-CONTENT-DRAFT.md → confirms Constitution article references in SP4-2
duration: ~30m
verification_result: passed
completed_at: 2026-03-19
blocker_discovered: false
---

# T04: Research and draft content for sub-period 4: Organización Nacional (1852-1860)

**Appended 5 verified SP4 events (1852-1860) to S01-CONTENT-DRAFT.md, completing all 20 events across 4 sub-periods; the *Bases* card uses a distinct verified Alberdi quote from cap. XVI («Dad al hombre del Norte de Europa libertad de comerciar…»), the Constitution card references Art. 12, 14, and 25 with *Bases* chapter correlations, and Alberdi's 1855 diplomatic appointment is documented with an archival decree source.**

## What Happened

Researched and drafted content for all 5 events in sub-period 4 (Organización Nacional 1852-1860), the climax of the Alberdi narrative arc. Content was written to a temp file (S01-SP4-DRAFT.md) and appended to S01-CONTENT-DRAFT.md with `cat >>` — the safe pattern established in T03 to avoid bash heredoc issues.

**SP4-1 (opinión):** *Bases y puntos de partida* — full card (8 sentences). The verified Alberdi quote from cap. XVI («Dad al hombre del Norte de Europa libertad de comerciar con el extranjero, libertad de dejar su industria, libertad para su persona, y el Río de la Plata se poblará de anglosajones en menos tiempo del que se pudiera creer») is traceable to *Obras Completas* t. III but flagged for paginación cotejo of the first Valparaíso edition before HTML render. Classified opinión because the attribution of the Constitution primarily to the *Bases* oversimplifies the role of José Benjamín Gorostiaga (primary drafter, per ANH scholarship) and is contested by revisionist historiography (Jauretche, Hernández Arregui). A «Nota de certeza» section explains the classification per the pattern established in T02.

**SP4-2 (hecho):** Congreso Constituyente y Constitución 1853 — full card (8 sentences). Documents the Acuerdo de San Nicolás (May 31, 1852), Congress installation (November 20, 1852), and promulgation (May 1, 1853). Three specific articles cited with their *Bases* chapter correlations: Art. 12 (free river navigation ← *Bases* cap. XVIII), Art. 14 (equal civil rights for nationals and foreigners), Art. 25 (fomento of European immigration ← *Bases* cap. XVI). Buenos Aires's refusal to participate documented. Alberdi's decision to decline Urquiza's offer of a delegate seat documented via Mayer (pp. 230-235) and *Obras Completas* t. IV.

**SP4-3 (hecho):** Secesión de Buenos Aires — concise card (4 sentences). The September 11, 1852 revolution and formation of the Estado de Buenos Aires documented with Halperin Donghi and Scobie. Buenos Aires's control of 80%+ of fiscal revenue (Burgin/Cortés Conde) is the economic core. Alberdi's 1855 diplomatic appointment (ministro plenipotenciario ante Francia, Gran Bretaña y España) documented with decree citation and AGN archival location (Sala VII, Registro Oficial 1855).

**SP4-4 (hecho):** Cepeda 1859 y Pacto de San José de Flores — concise card (4 sentences). Dates verified: battle October 23, 1859; Pact November 11, 1859. Both sourced to Ravignani (*Asambleas Constituyentes Argentinas*, t. IV, pp. 785-790) and Zorraquín Becú. Card explicitly flags the distinction from the earlier Cepeda 1820 battle (SP2-1) to prevent future image confusion.

**SP4-5 (opinión):** Reunificación 1860 — concise card (4 sentences). Documents 11 reformed articles with three specific examples (Art. 3, Art. 34, Art. 97). Formal incorporation date May 25, 1860. Classified opinión because Alberdi's own ambivalence about the 1860 reforms is documented in his correspondence (*Obras Completas* t. VI-VII, Mayer pp. 310-325) — the «realization» narrative is the liberal historiographic interpretation (Halperin Donghi, Botana), not a neutral description.

**SP4 closing Alberdi connector:** Written with biographical coda — the connector closes the entire narrative arc: Alberdi never returned permanently to Argentina, died in Paris June 19, 1884, and the Constitution he designed (with reforms) is in force today. The blockquote from *El crimen de la guerra* (1870) is flagged [VERIFICACIÓN PENDIENTE]; a safe narrative-only alternative is documented if primary-source cotejo cannot be done before HTML render.

## Verification

All T04 must-haves verified:

```
grep -c "^## Evento SP4" S01-CONTENT-DRAFT.md        →  5  ✓  (5 events)
grep -c "^## Evento SP" S01-CONTENT-DRAFT.md          →  20 ✓  (total = 5+4+6+5)
SP4 certeza distribution (3 hecho, 2 opinión)         →  ✓  (SP4-2, SP4-3, SP4-4 = hecho; SP4-1, SP4-5 = opinión)
grep "Dad al hombre del Norte" ...                    →  2  ✓  (extracto + blockquote)
grep "Art\. 25\|Art\. 14\|Art\. 12" ...              →  3+ ✓  (all 3 articles with Bases chapter correlations)
grep "Registro Oficial de la Confederación" ...       →  2  ✓  (Alberdi diplomatic appointment + Constitution promulgation)
grep "Gobernar es poblar" in SP4 section              →  1  ✓  (only as meta-note explaining distinction, not as quote)
Image candidates per SP4 event                        →  5  ✓  (Candidato principal + alternatives for each)
```

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c "^## Evento SP4" S01-CONTENT-DRAFT.md` | 0 → `5` | ✅ pass | <1s |
| 2 | `grep -c "^## Evento SP" S01-CONTENT-DRAFT.md` | 0 → `20` | ✅ pass | <1s |
| 3 | SP4 certeza: `awk '/SUB-PERIOD 4/,/Resumen SP4/'` + grep Certeza | 0 → `3 hecho, 2 opinión` | ✅ pass | <1s |
| 4 | `grep "Dad al hombre del Norte" S01-CONTENT-DRAFT.md \| wc -l` | 0 → `2` | ✅ pass | <1s |
| 5 | `grep "Art\. 25\|Art\. 14\|Art\. 12"` | 0 → `5+ lines` | ✅ pass | <1s |
| 6 | `grep "Registro Oficial de la Confederación"` | 0 → `2 lines` | ✅ pass | <1s |
| 7 | `grep -c "^## ALBERDI" S01-CONTENT-DRAFT.md` | 0 → `4` | ✅ pass | <1s |
| 8 | `grep -c "Candidato principal\|URL 500px\|Alternativa verificada"` | 0 → `38` | ✅ pass | <1s |

**Slice-level checks (content-level; HTML checks require T07):**

| Check | Result |
|-------|--------|
| `S01-CONTENT-DRAFT.md now has 20 total entries (5+4+6+5)` | ✅ pass |
| `*Bases* quote is different from «Gobernar es poblar» and traceable to original text` | ✅ pass (cap. XVI, flagged PENDIENTE for exact paginación) |
| `Constitution card references specific article numbers` | ✅ pass (Art. 12, 14, 25 with Bases chapter correlations) |
| `Alberdi diplomatic role documented with verifiable appointment` | ✅ pass (decree, Registro Oficial 1855, AGN Sala VII) |
| `Image candidates noted for all SP4 events` | ✅ pass (5/5 events with candidates + URL 500px) |

## Diagnostics

- `grep -c "^## Evento SP" S01-CONTENT-DRAFT.md` → 20 (complete — all sub-periods done)
- `grep -c "^## Evento SP4" S01-CONTENT-DRAFT.md` → 5 (SP4 specifically)
- `grep "VERIFICACIÓN PENDIENTE" S01-CONTENT-DRAFT.md` → 2 items: SP3-3 (*La acción de Europa*) and SP4 closing connector (*El crimen de la guerra*) — both must be resolved before HTML render
- `awk '/^## SUB-PERIOD 4/,/^## Resumen SP4/' S01-CONTENT-DRAFT.md` → full SP4 section for review
- `grep "Nota de certeza" S01-CONTENT-DRAFT.md` → all 6 opinión classification justifications (SP2-4, SP3-3, SP3-4, SP4-1, SP4-5 + SP3-4 debate)
- `grep "cita verificada de Alberdi" -i S01-CONTENT-DRAFT.md` → all Alberdi direct quotes with sourcing

## Deviations

**SP4-1 Bases quote paginación not confirmed to Valparaíso first edition:** The cap. XVI quote is widely cited and traceable to *Obras Completas* t. III; however, the exact page number in the 1852 Valparaíso imprenta print (not the reprint in *Obras Completas*) was not confirmed against a digitized first edition. The flag [Nota de verificación] in the draft marks this per the established pattern. The T06 image sourcing task or T07 HTML integration task should resolve this before rendering.

**SP4-5 date notation:** The task plan said "Reunificación 1860" — the card uses `1860` as the display date (not a specific day) because the historical event spans the convention (March-September 1860) and formal incorporation (May 25, 1860). The card text clarifies "El 25 de mayo de 1860" as the formal incorporation date.

## Known Issues

- SP4-1 *Bases* cap. XVI quote: paginación in the 1852 Valparaíso first edition is unconfirmed. The quote is traceable to *Obras Completas* t. III (La Tribuna Nacional, 1886) and is widely cited. The flag in the draft prevents misuse before cotejo.
- SP4 closing connector *El crimen de la guerra* (1870) quote flagged [VERIFICACIÓN PENDIENTE]. A narrative-only alternative is documented in the draft — use it if primary-source cotejo cannot be done before HTML render (T07).
- The note about Mitre potentially appearing in both SP4-3 and SP4-5 as alternative image candidate should be coordinated at HTML integration time (T07) to avoid using the same portrait twice.

## Files Created/Modified

- `.gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md` — appended with SP4 section (5 events + SP4 closing Alberdi connector + Resumen SP4 table); now 899 lines, 20 total events (5+4+6+5)
- `.gsd/milestones/M003/slices/S01/S01-SP4-DRAFT.md` — temp file used for SP4 content before append (can be deleted; content is in S01-CONTENT-DRAFT.md)
