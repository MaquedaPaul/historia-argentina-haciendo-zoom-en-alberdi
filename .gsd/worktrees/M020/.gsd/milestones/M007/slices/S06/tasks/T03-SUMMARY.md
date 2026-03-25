---
id: T03
parent: S06
milestone: M007
provides:
  - Triple gate verification (shell + DOM + narrative coherence) confirming S06 integration is structurally correct and runtime-consistent
  - Apéndice T03 appended to S06-CONTENT-DRAFT.md with all 21 real check values and "Gate: 21/21 — S06 cerrado"
key_files:
  - index.html
  - .gsd/milestones/M007/slices/S06/S06-CONTENT-DRAFT.md
key_decisions:
  - Capa 3 narrative checks confirmed via direct HTML read (sed -n) + browser screenshot — not inferred from prose
  - .reveal count came out as 76 (base 73 + 3: h4.reveal-fade + BIOG-19.reveal-slide + BIOG-20.reveal-slide), exceeding the ≥75 threshold
patterns_established:
  - Slice exit gate: 10 shell checks + 5 DOM queries + 6 narrative checks = 21 total, all documented with real values in Apéndice T03
observability_surfaces:
  - grep -c 'data-certeza' index.html → 54 (failure: returns 52 = insertion did not occur)
  - grep -n 'id="BIOG-19"\|id="BIOG-20"' index.html → lines 853 and 922
  - document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length → 4 (failure: 2 = new cards not inside sub-period)
  - document.querySelectorAll('.reveal').length → 76 (failure: <75 = reveal registration missed)
  - grep -c 'card-nota-historiografica' index.html → 2 (failure: 1 = BIOG-19 note missing)
duration: 10m
verification_result: passed
completed_at: 2026-03-22
blocker_discovered: false
---

# T03: Triple gate de verificación — shell + DOM + coherencia narrativa

**Triple gate ejecutado: 21/21 checks pasan; BIOG-19 y BIOG-20 verificados estructural, runtime y narrativamente — S06 cerrado.**

## What Happened

Ejecuté las tres capas de verificación establecidas en el plan de S06:

**Capa 1 — Shell (10 checks):** Todos pasan. `data-certeza=54`, `id="BIOG-19"=1`, `id="BIOG-20"=1`, `rev-alberdi-quiroga=3` (sin sub-período duplicado), `sub-nav__link=6` (sin cambio). Las cinco búsquedas de texto (`San Antonio de los Llanos`, `Santos Ortiz`, `card-nota-historiografica`, `Braulio Costa`, `Barranca Yaco`) retornan exit 0.

**Capa 2 — DOM (5 queries):** Browser abierto en `file:///…/index.html`. Las cinco queries DOM evaluadas con `browser_evaluate`:
- `sub-nav .sub-nav__link.length` → 6 ✅
- `#rev-alberdi-quiroga [data-certeza].length` → 4 ✅ (era 2, subió +2)
- `#BIOG-19 .card-nota-historiografica !== null` → true ✅
- `#BIOG-20 .card-nota-certeza.length` → 1 ✅
- `.reveal.length` → 76 ✅ (base 73 + 3: el `<h4 class="sub-period__subtitle">` lleva `reveal reveal-fade`, más BIOG-19 y BIOG-20 con `reveal reveal-slide`)

**Capa 3 — Coherencia narrativa (6 checks):** Leí el HTML de BIOG-17, BIOG-18, BIOG-19 y BIOG-20 directamente (sed -n) y tomé screenshot browser. Confirmado: BIOG-19 es perfil biográfico personal (origen, batallas, muerte), no repite el contexto político federal de SP2-2 ni el episodio del encuentro de BIOG-17. BIOG-20 es el círculo bonaerense (Santos Ortiz, Braulio Costa, misión mediadora), no repite las conversaciones de BIOG-18 ni usa "ese hombre extraordinario". La `card-nota-historiografica` de BIOG-19 cita Sarmiento/*Facundo* (1845) + De la Fuente (2000) y es contextualmente distinta de la nota de BIOG-18 (que solo menciona Sarmiento de pasada en un `card-nota-certeza`). La `card-nota-certeza` de BIOG-20 acota explícitamente que los testigos del momento exacto de entrega de la carta no están documentados individualmente. Santos Ortiz está identificado como secretario para correspondencia habitual en BA (1833–1835), sin confusión con el momento de la entrega.

**Apéndice T03** añadido al final de `S06-CONTENT-DRAFT.md` con tabla completa de 21 checks y "Gate: 21/21 — S06 cerrado".

## Verification

```bash
grep -c 'data-certeza' index.html           # → 54 ✅
grep -c 'id="BIOG-19"' index.html           # → 1 ✅
grep -c 'id="BIOG-20"' index.html           # → 1 ✅
grep -c 'rev-alberdi-quiroga' index.html    # → 3 ✅
grep -c 'sub-nav__link' index.html          # → 6 ✅
grep -q 'San Antonio de los Llanos' index.html && echo OK   # → OK ✅
grep -q 'Santos Ortiz' index.html && echo OK                # → OK ✅
grep -q 'card-nota-historiografica' index.html && echo OK   # → OK ✅
grep -q 'Braulio Costa' index.html && echo OK               # → OK ✅
grep -q 'Barranca Yaco' index.html && echo OK               # → OK ✅
grep -q 'Apéndice T03' .gsd/milestones/M007/slices/S06/S06-CONTENT-DRAFT.md && echo OK  # → OK ✅
```

DOM (browser_evaluate):
```js
document.querySelectorAll('.sub-nav .sub-nav__link').length              // → 6 ✅
document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length  // → 4 ✅
document.querySelector('#BIOG-19 .card-nota-historiografica') !== null   // → true ✅
document.querySelectorAll('#BIOG-20 .card-nota-certeza').length          // → 1 ✅
document.querySelectorAll('.reveal').length                              // → 76 ✅
```

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c 'data-certeza' index.html` | 0 (→54) | ✅ pass | <1s |
| 2 | `grep -c 'id="BIOG-19"' index.html` | 0 (→1) | ✅ pass | <1s |
| 3 | `grep -c 'id="BIOG-20"' index.html` | 0 (→1) | ✅ pass | <1s |
| 4 | `grep -c 'rev-alberdi-quiroga' index.html` | 0 (→3) | ✅ pass | <1s |
| 5 | `grep -c 'sub-nav__link' index.html` | 0 (→6) | ✅ pass | <1s |
| 6 | `grep -q 'San Antonio de los Llanos' index.html` | 0 | ✅ pass | <1s |
| 7 | `grep -q 'Santos Ortiz' index.html` | 0 | ✅ pass | <1s |
| 8 | `grep -q 'card-nota-historiografica' index.html` | 0 | ✅ pass | <1s |
| 9 | `grep -q 'Braulio Costa' index.html` | 0 | ✅ pass | <1s |
| 10 | `grep -q 'Barranca Yaco' index.html` | 0 | ✅ pass | <1s |
| 11 | DOM: sub-nav__link.length | — (→6) | ✅ pass | <1s |
| 12 | DOM: #rev-alberdi-quiroga [data-certeza].length | — (→4) | ✅ pass | <1s |
| 13 | DOM: #BIOG-19 .card-nota-historiografica !== null | — (true) | ✅ pass | <1s |
| 14 | DOM: #BIOG-20 .card-nota-certeza.length | — (→1) | ✅ pass | <1s |
| 15 | DOM: .reveal.length | — (→76) | ✅ pass | <1s |
| 16 | Narrative: BIOG-19 ≠ SP2-2/BIOG-17 | — | ✅ pass | manual |
| 17 | Narrative: BIOG-20 ≠ BIOG-17/18 | — | ✅ pass | manual |
| 18 | Narrative: card-nota-historiografica content | — | ✅ pass | manual |
| 19 | Narrative: card-nota-certeza witnesses caveat | — | ✅ pass | manual |
| 20 | Narrative: Santos Ortiz correctly contextualized | — | ✅ pass | manual |
| 21 | `grep -q 'Apéndice T03' S06-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |

## Diagnostics

- BIOG-19 at index.html line 853, BIOG-20 at line 922: `grep -n 'id="BIOG-19"\|id="BIOG-20"' index.html`
- Failure signal: `grep -c 'data-certeza' index.html` → 52 = insertion did not occur
- Failure signal: `grep -c 'rev-alberdi-quiroga' index.html` → >3 = duplicate sub-period created
- Failure signal: `grep -c 'card-nota-historiografica' index.html` → 1 = BIOG-19 missing its historiographic note
- DOM failure path: `#rev-alberdi-quiroga [data-certeza].length` → 2 = new cards not inside sub-period
- .reveal count of 76 = 73 base + h4.reveal-fade + BIOG-19.reveal-slide + BIOG-20.reveal-slide (3 new elements)

## Deviations

- Gate table expanded to 21/21 instead of the plan's 19/19, adding two extra narrative checks (BIOG-19 ≠ SP2-2 and BIOG-19 ≠ BIOG-17 split into distinct checks; Santos Ortiz contextualization added as explicit check). All extra checks pass.

## Known Issues

None.

## Files Created/Modified

- `.gsd/milestones/M007/slices/S06/S06-CONTENT-DRAFT.md` — Apéndice T03 appended with 21-check gate table and "Gate: 21/21 — S06 cerrado"
