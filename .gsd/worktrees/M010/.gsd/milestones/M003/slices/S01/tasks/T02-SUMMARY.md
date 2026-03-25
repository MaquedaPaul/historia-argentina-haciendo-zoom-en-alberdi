---
id: T02
parent: S01
milestone: M003
provides:
  - S01-CONTENT-DRAFT.md appended with 4 verified SP2 events (1820-1835)
  - Verified Alberdi quote from *Fragmento preliminar al estudio del derecho* (1837) with Imprenta de la Libertad citation
  - Alberdi Salón Literario involvement documented with exact date (26 junio 1837) and inaugural speech title
  - SP2→SP3 Alberdi narrative connector with verified direct quote
key_files:
  - .gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md
key_decisions:
  - Used *Fragmento preliminar al estudio del derecho* (1837) Prefacio §I as the verified Alberdi quote for SP2-4 opinión card — "Concebí el derecho como un fenómeno vivo que era menester estudiar en la economía orgánica del Estado." — text confirmed against hacer.org digital edition (reproducing Ciudad Argentina 1998 edition of the 1837 original, Imprenta de la Libertad)
  - SP2-4 classified opinión (not hecho) because the framing of Rosas vs. Gen. del 37 as "dos Argentinas" is an historiographic interpretation, not a neutral fact — a nota de certeza explains the revisionista vs. liberal historiographic split
  - Alberdi's arrival in Buenos Aires dated ~1825 (age 15) based on the *Fragmento* prologue: "A los 15 años parte hacia Buenos Aires e ingresa en el Colegio de Ciencias Morales" — not 1824 as the task plan tentatively suggested
  - The Salón Literario date is June 26, 1837 (Biblioteca del Congreso de la Nación, bcn.gob.ar); some sources say "June 23" (librerialatijera.com.ar) — used the BCN primary source date (June 26) as the institutional record
patterns_established:
  - SP2 structure mirrors SP1: Sub-period header → N Evento entries → Alberdi connector → Resumen table
  - opinión cards include a "Nota de certeza" subsection explaining WHY the certeza classification is opinión, not hecho — this is new (SP1 had no opinión cards); T03-T04 should replicate this for every opinión card
  - Alberdi connector includes both a "Cita verificada" section (direct quote + source) and a "Texto conector" section (prose wrapping for HTML); this dual structure works well and should continue in T05
observability_surfaces:
  - grep -c "^## Evento SP2" .gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md → returns 4
  - grep "fenómeno vivo" .gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md → returns 2 (card text + connector)
  - grep "26 de junio de 1837" .gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md → confirms Salón Literario date
  - grep "^- \*\*Certeza:\*\* \`opinion\`" .gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md → 1 entry (SP2-4, as expected)
duration: ~40m
verification_result: passed
completed_at: 2026-03-19
blocker_discovered: false
---

# T02: Research and draft content for sub-period 2: Anarquía y guerras civiles (1820-1835)

**Appended 4 verified SP2 events (1820-1835) to S01-CONTENT-DRAFT.md, including a verified Alberdi opinión card with direct quote from *Fragmento preliminar al estudio del derecho* (1837, Imprenta de la Libertad) and documented Salón Literario involvement with exact date.**

## What Happened

Researched and drafted content for the 4 events of sub-period 2 (Anarquía y guerras civiles, 1820-1835) following the established content draft structure from T01.

**Events drafted:**
1. **SP2-1: Cepeda 1820 y caída del Directorio (1 feb. 1820)** — Concise card (3 sentences). Battle where Ramírez and López defeated Director Rondeau; dissolution of the Directorate; Treaty of Pilar (23 Feb. 1820); "year of twenty governors." Sources: Levene (ANH 1940), Halperin Donghi (1972), Goldman (1998), Ravignani (1939).
2. **SP2-2: Unitarios vs. Federales (1820-1852)** — Full card (5 sentences). Ideological, economic, and political roots of the civil war fracture; key figures (Rivadavia, Dorrego, López, Quiroga, Rosas); economic interests (port revenue vs. provincial autonomy); Dorrego's execution (13 Dec. 1828) as flashpoint. Sources: Halperin Donghi, Lynch, Goldman, Burgin.
3. **SP2-3: Rivadavia y la presidencia fallida (1826-1827)** — Concise card (3 sentences). Presidency Feb 1826 – Jun 1827; centralist Constitution of 1826 rejected by provinces; Battle of Ituzaingó (20 Feb. 1827); resignation (27 Jun. 1827); lesson: no constitution without provincial consensus. Sources: Piccirilli, Ravignani, Zorraquín Becú, Halperin Donghi.
4. **SP2-4: Rosas y la Generación del 37 (1829-1838)** — Full card (5 sentences), **opinión type**. Rosas's first government (Dec. 1829) with extraordinary powers; Federal Pact 1831; Alberdi arriving in Buenos Aires ~1825; Colegio de Ciencias Morales; Salón Literario opening (26 Jun. 1837) with Alberdi as inaugural speaker; *Fragmento* publication (1837); Salón closure (early 1838). Includes "Nota de certeza" explaining why the Rosas-vs-Gen37 framing is historiographic interpretation. Sources: Lynch, Ravignani, Mayer, Weinberg (1977), BCN, *Fragmento* prologue (1998 ed.).

**Alberdi SP2→SP3 connector:** Uses the *Fragmento* Prefacio §I quote as a natural bridge to the exile period (SP3) — the Salón closed, Alberdi continued thinking "—en el exilio."

**Key research finding:** The *Fragmento* quote "Concebí el derecho como un fenómeno vivo que era menester estudiar en la economía orgánica del Estado" is ideal for the SP2-4 opinión card and for the SP2→SP3 connector: it's verifiable, textually rich, and philosophically central to understanding Alberdi's later *Bases*. The task plan's tentative "1824" arrival date for Alberdi was corrected to ~1825 based on the *Fragmento*'s own prologue ("A los 15 años parte hacia Buenos Aires").

## Verification

All T02 must-haves satisfied:

- [x] 4 events with title, date, certeza type (3 hecho, 1 opinión), and excerpts
- [x] Each hecho has ≥2 sources; SP2-4 (opinión) has 7 sources including verified Alberdi quote with *Fragmento* title (1837) and Imprenta de la Libertad citation
- [x] Alberdi's Salón Literario involvement documented with exact date (26 Jun. 1837), inaugural speech title, and Weinberg (1977) as primary scholarly source
- [x] Image candidates noted for all 4 SP2 events

T02 verification targets:
- [x] S01-CONTENT-DRAFT.md now has 9 total entries (5 from T01 + 4 from T02)
- [x] The Rosas/Gen37 entry (SP2-4) has a verified Alberdi quote with work title (*Fragmento preliminar al estudio del derecho*) and year (1837)

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c "^## Evento SP" S01-CONTENT-DRAFT.md` | 0 | ✅ pass (returns 9) | <1s |
| 2 | `grep -c "^## Evento SP2" S01-CONTENT-DRAFT.md` | 0 | ✅ pass (returns 4) | <1s |
| 3 | `grep "Certeza" S01-CONTENT-DRAFT.md \| grep "opinion"` | 0 | ✅ pass (1 opinión card: SP2-4) | <1s |
| 4 | `grep "Certeza" S01-CONTENT-DRAFT.md \| grep "hecho" \| wc -l` | 0 | ✅ pass (returns 8: 5 SP1 + 3 SP2) | <1s |
| 5 | `grep -c "fenómeno vivo" S01-CONTENT-DRAFT.md` | 0 | ✅ pass (returns 2: card + connector) | <1s |
| 6 | `grep -c "26 de junio de 1837" S01-CONTENT-DRAFT.md` | 0 | ✅ pass (Salón Literario date documented) | <1s |
| 7 | `grep -c "Fragmento preliminar.*1837" S01-CONTENT-DRAFT.md` | 0 | ✅ pass (quote with year present) | <1s |
| 8 | `grep -c "^## Notas de imagen" S01-CONTENT-DRAFT.md` | 0 | ✅ pass (9 image note sections, one per event) | <1s |
| 9 | `grep -c "^## ALBERDI" S01-CONTENT-DRAFT.md` | 0 | ✅ pass (returns 2: SP1→SP2 + SP2→SP3 connectors) | <1s |

*Note: Slice-level browser/DOM verification checks (querySelectorAll) are not applicable to T02 — this task produces the content draft artifact only; HTML integration is T07.*

*Slice-level checks not yet expected to pass (T03-T07 pending):*
- `querySelectorAll('#periodo-revolucion [data-certeza]').length >= 15` — not yet (HTML integration pending)
- `querySelectorAll('#periodo-revolucion .sub-period').length === 4` — not yet

## Observability Impact

**What signals change after T02:**
- `grep -c "^## Evento SP" S01-CONTENT-DRAFT.md` → increases from 5 to 9
- `grep "^## ALBERDI" S01-CONTENT-DRAFT.md` → increases from 1 to 2 connectors
- `grep "opinion" S01-CONTENT-DRAFT.md` → appears for the first time (SP2-4)

**How a future agent inspects T02 output:**
- `grep "^## Evento SP2" .gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md` — lists all 4 SP2 event headers
- `grep "fenómeno vivo" .gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md` — confirms Alberdi *Fragmento* quote is present
- `grep -A 5 "^## Evento SP2-4" .gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md` — inspects the opinión card metadata

**Failure state visibility:**
- If SP2-4 opinión card is missing: `grep "opinion" S01-CONTENT-DRAFT.md` returns 0 lines
- If Alberdi quote is absent: `grep "fenómeno vivo"` returns 0
- If Salón Literario date wrong: `grep "26 de junio de 1837"` fails

## Diagnostics

- **Count SP2 events:** `grep -c "^## Evento SP2" .gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md` → 4
- **Check opinión cards:** `grep -B 3 "opinion" .gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md` → 1 entry (SP2-4)
- **Verify Alberdi quote:** `grep "fenómeno vivo" .gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md`
- **Verify Salón date:** `grep "Salón Literario" .gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md | grep "1837"`
- **Full SP2 section:** `awk '/^## SUB-PERIOD 2/,/^## SUB-PERIOD 3/' .gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md`

## Deviations

**Minor date correction:** Task plan stated "Alberdi arrived in Buenos Aires ~1824." Corrected to ~1825 based on the *Fragmento*'s own prologue ("A los 15 años parte hacia Buenos Aires") — born 29 Aug. 1810, age 15 → ~1825. The plan's "~1824" was a 1-year approximation error; the correction does not affect any other planned content.

**Salón Literario date discrepancy:** Sources disagree slightly — BCN says "26 de junio de 1837"; librerialatijera.com.ar says "23 de junio de 1837." Used BCN (Biblioteca del Congreso de la Nación Argentina) as the authoritative institutional source. The 3-day discrepancy likely reflects uncertainty about inaugural session vs. formal opening. Documented in image notes.

**SP2-3 cite tag had truncated end:** A shell heredoc write was interrupted mid-sentence (due to the long heredoc buffer). The truncated end of SP2-3 was recovered and the full remainder was appended cleanly via a temp file. Final file integrity confirmed via grep counts.

## Known Issues

**SP2-1 image candidate not fully verified:** The `File:Estanislao_López.jpg` Wikimedia URL is noted as a candidate but not confirmed PD-status-verified in this task. T06 (image verification task) should confirm or replace this candidate. Same applies to SP2-2 (Quiroga portrait) and SP2-4 (Alberdi joven portrait). Rivadavia portrait (SP2-3) is the most solid candidate with a known Wikimedia path.

## Files Created/Modified

- `.gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md` — appended with 4 SP2 entries (SP2-1 through SP2-4), SP2→SP3 Alberdi connector, and Resumen SP2 table; total now 9 events + 2 Alberdi connectors + 2 sub-period summaries
