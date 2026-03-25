---
id: T01
parent: S08
milestone: M007
provides:
  - S08-CONTENT-DRAFT.md with complete HTML for BIOG-23 (card-hecho) and BIOG-24 (card-rumor) ready for T02 integration
key_files:
  - .gsd/milestones/M007/slices/S08/S08-CONTENT-DRAFT.md
key_decisions:
  - BIOG-24 classified as card-rumor (not card-opinion) because the question has no documented answer — the rumor classification is the honest one per D009/D010
  - The h4 subtitle uses "Los textos de Alberdi en 1834 y la evaluación de Quiroga" — scoped to both the catalog and the epistemic question to provide coherent thematic framing
patterns_established:
  - Failure-path diagnostic grep added to T01-PLAN.md's Observability Impact section (pre-flight fix applied before execution)
observability_surfaces:
  - "test -f .gsd/milestones/M007/slices/S08/S08-CONTENT-DRAFT.md → 0 means T01 ran"
  - "grep -c 'card-nota-certeza' S08-CONTENT-DRAFT.md → 2 means epistemic caveat is present in BIOG-23"
  - "grep -c 'card-rumor__origin' S08-CONTENT-DRAFT.md → 4 means BIOG-24 footer block is intact"
  - "grep 'Quiroga.*reaccionó|Quiroga.*pensó|Quiroga.*dijo.*texto' S08-CONTENT-DRAFT.md → 0 means no invented reaction"
duration: 20m
verification_result: passed
completed_at: 2026-03-22
blocker_discovered: false
---

# T01: Redactar S08-CONTENT-DRAFT con BIOG-23 y BIOG-24

**Creado S08-CONTENT-DRAFT.md con HTML completo para BIOG-23 (catálogo de obra 1832–1834, card-hecho) y BIOG-24 (laguna documental sobre lo que Quiroga leyó, card-rumor), listo para inserción en T02.**

## What Happened

1. **Pre-flight: fixed observability gaps.** Se aplicaron las dos correcciones pre-flight indicadas: (a) la S08-PLAN.md ya tenía el diagnostic grep en su sección Observability (no requería cambio); (b) T01-PLAN.md carecía de `## Observability Impact` — se añadió la sección completa con señales de estado, comandos de inspección futura, y failure-state diagnostics.

2. **Confirmación de baselines.** `grep -n '/#rev-alberdi-quiroga' index.html` → línea **1094**. `grep -c 'data-certeza' index.html` → **56**. `grep -c 'sub-nav__link' index.html` → **6**. Todos coinciden con los valores esperados del plan.

3. **Lectura de BIOG-17 y BIOG-18** para identificar los fragmentos verbatim a evitar: «El general Quiroga me acogió con mucha gracia», «Lo visité con repetición y muchas veces se entretuvo», «Al día siguiente le hice una visita respetuosa». Ninguna de estas frases aparece en el cuerpo HTML de BIOG-23 ni BIOG-24 (sí aparecen en la tabla de verificación del draft, que documenta su ausencia).

4. **Lectura de card-rumor templates existentes** (líneas 243 y 1457 de index.html) para confirmar la estructura exacta: `card-certeza-indicator` → `card-certeza-icon` (⚠️) + `card-certeza-badge-rumor` → cuerpo con `card-rumor__text` → `card-rumor__origin` footer con `card-rumor__origin-icon` (🔍) + `card-rumor__origin-text`. La estructura BIOG-24 sigue este patrón exactamente.

5. **Redacción de BIOG-23** (`card-hecho`): catálogo de los tres textos (dos musicales de 1832 + Memoria sobre Tucumán de 1834) con fechas, contexto editorial, y cierre sobre el tipo de apuesta que Quiroga hacía. `card-nota-certeza` explícita: "ninguna fuente consultada documenta que Quiroga haya leído alguno de estos textos. La base de su evaluación fue la carta de Heredia y las conversaciones directas." Fuentes: Laborde/larramendi.es, Wikipedia EN, elhistoriador.com.ar/Pigna. `data-certeza="hecho"`, `--reveal-delay: 0ms`.

6. **Redacción de BIOG-24** (`card-rumor`): reformula la pregunta honestamente. Declara que la pregunta no tiene respuesta documental. Referencia (sin repetir verbatim) que lo que Quiroga leyó fue la carta de Heredia (ya narrado en BIOG-17). Señala la Memoria sobre Tucumán como candidato más plausible con base circunstancial (nexo Heredia, contemporaneidad, tema). Añade que Quiroga murió en Barranca Yaco el 16 de febrero de 1835 — tres meses después del encuentro — sin que ninguna fuente haya registrado sus impresiones sobre la obra de Alberdi. `card-rumor__origin` footer con etiqueta "Laguna documental" y cita de fuentes. `data-certeza="rumor"`, `--reveal-delay: 80ms`.

7. **Escritura del draft.** Creado `S08-CONTENT-DRAFT.md` con: nota de inserción (anchor line 1094, baselines), bloque HTML completo con h4 + events-grid + BIOG-23 + BIOG-24, tabla self-check de must-haves, tabla de coherencia del arco BIOG-17…BIOG-24, y notas de implementación para T02.

## Verification

Todos los T01 verification checks pasan:

- `test -f .gsd/milestones/M007/slices/S08/S08-CONTENT-DRAFT.md` → exit 0 ✅
- `grep -c 'BIOG-2[34]' S08-CONTENT-DRAFT.md` → **17** (≥ 2) ✅

Checks adicionales sobre must-haves:
- `grep -c 'card-hecho' draft` → 2 (una en HTML, una en tabla) ✅
- `grep -c 'data-certeza="hecho"' draft` → 2 ✅
- `grep -c 'data-certeza="rumor"' draft` → 2 ✅
- `grep -c 'card-certeza-indicator' draft` → 2 ✅
- `grep -c 'card-certeza-badge-rumor' draft` → 2 ✅
- `grep -c 'card-rumor__origin' draft` → 4 ✅
- `grep -c 'card-nota-certeza' draft` → 2 ✅
- `grep 'Quiroga.*reaccionó|Quiroga.*pensó|Quiroga.*dijo.*texto' draft` → 0 (no invented reaction) ✅
- Anchor line 1094 confirmada en draft ✅

Slice-level shell checks (index.html, pre-T02):
- `grep -c 'data-certeza' index.html` → 56 (baseline, BIOG-23/24 no insertados aún) ✅ (esperado: pasa en T02 → 58)
- `grep -c 'rev-alberdi-quiroga' index.html` → 3 ✅
- `grep -c 'sub-nav__link' index.html` → 6 ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -f .gsd/milestones/M007/slices/S08/S08-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |
| 2 | `grep -c 'BIOG-2[34]' S08-CONTENT-DRAFT.md` (→17) | 0 | ✅ pass | <1s |
| 3 | `grep -c 'card-nota-certeza' S08-CONTENT-DRAFT.md` (→2) | 0 | ✅ pass | <1s |
| 4 | `grep -c 'card-rumor__origin' S08-CONTENT-DRAFT.md` (→4) | 0 | ✅ pass | <1s |
| 5 | `grep 'Quiroga.*reaccionó\|dijo.*texto' S08-CONTENT-DRAFT.md` | 1 (no match) | ✅ pass | <1s |
| 6 | `grep -c 'data-certeza' index.html` (→56 baseline) | 0 | ✅ pass | <1s |
| 7 | `grep -c 'rev-alberdi-quiroga' index.html` (→3) | 0 | ✅ pass | <1s |
| 8 | `grep -c 'sub-nav__link' index.html` (→6) | 0 | ✅ pass | <1s |

Note: Slice-level checks for BIOG-23/BIOG-24 in index.html (`grep -c 'id="BIOG-23"'` → 1, `grep -c 'id="BIOG-24"'` → 1, `grep -c 'data-certeza' index.html` → 58) will pass after T02 integration. Currently at 0/0/56 as expected for T01 (draft-only task).

## Diagnostics

- `test -f .gsd/milestones/M007/slices/S08/S08-CONTENT-DRAFT.md` → exits 0 = T01 complete
- `grep -c 'card-nota-certeza' .gsd/milestones/M007/slices/S08/S08-CONTENT-DRAFT.md` → 2 = epistemic caveat present in BIOG-23
- `grep -c 'card-rumor__origin' .gsd/milestones/M007/slices/S08/S08-CONTENT-DRAFT.md` → 4 = BIOG-24 footer intact
- `grep 'Quiroga.*reaccionó\|Quiroga.*pensó\|Quiroga.*dijo.*texto' .gsd/milestones/M007/slices/S08/S08-CONTENT-DRAFT.md` → exit 1 (no match) = no invented Quiroga reaction
- The draft's "Bloque HTML para insertar" section contains the exact copy-ready HTML for T02

## Deviations

- **S08-PLAN.md observability gap:** La S08-PLAN.md ya tenía la sección `## Observability / Diagnostics` con el failure-path diagnostic. No requería cambio. La flag del pre-flight item se resolvió confirmando que ya estaba implementado.
- **T01-PLAN.md observability gap:** Se añadió la sección `## Observability Impact` completa con señales de estado, comandos de inspección y failure states como indicado en el pre-flight.
- **`card-rumor__text` en BIOG-24 vs. estructura alternativa:** Las cards card-rumor del sitio (líneas 253 y 1470) usan `<p class="event-card__excerpt card-rumor__text">` directamente dentro del article, sin `event-card__header` estructurado. BIOG-24 mantiene el `event-card__header` (con year y title) para coherencia con el resto del arco BIOG-17…BIOG-24 que usa `event-card__body` estructura estándar. Esta es una variación menor compatible con las clases existentes.

## Known Issues

Ninguno. El draft está listo para T02.

## Files Created/Modified

- `.gsd/milestones/M007/slices/S08/S08-CONTENT-DRAFT.md` — draft completo con HTML de BIOG-23 y BIOG-24, nota de inserción (anchor línea 1094), tabla self-check de must-haves, tabla de coherencia del arco BIOG-17…BIOG-24, y notas de implementación para T02
- `.gsd/milestones/M007/slices/S08/tasks/T01-PLAN.md` — añadida sección `## Observability Impact` (pre-flight fix)
