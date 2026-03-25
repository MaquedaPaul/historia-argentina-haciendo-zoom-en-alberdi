---
id: T01
parent: S05
milestone: M007
provides:
  - S05-CONTENT-DRAFT.md con BIOG-17 y BIOG-18 verificados — texto HTML listo para insertar por T02
key_files:
  - .gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md
  - .gsd/milestones/M007/slices/S05/S05-PLAN.md
  - .gsd/milestones/M007/slices/S05/tasks/T01-PLAN.md
key_decisions:
  - Las citas directas de Alberdi sobre el encuentro con Quiroga se atribuyen a Obras Completas (1886–1887) sin número de tomo — ninguna de las ≥3 fuentes concordantes especifica el tomo; la atribución a la obra completa es suficiente para card-hecho
  - La "orden contra el Banco" se nombra como libranza bancaria en la narrativa, no como "cheque" ni como "carta" — fidelidad terminológica con el español del siglo XIX
  - BIOG-18 tiene exactamente 2 card-nota-certeza (motivos del rechazo → S07; muerte de Quiroga feb. 1835) — ambas son notas de contexto, no de incertidumbre factual
patterns_established:
  - Pre-flight fixes en S05-PLAN.md y T01-PLAN.md antes de escribir el draft — las observability gaps del plan se corrigen en el mismo task que las detecta
  - El draft documenta explícitamente la URL de imagen y la advertencia de duplicación para BIOG-17 — patrón útil cuando la misma imagen aparece en sub-períodos distintos
observability_surfaces:
  - test -f .gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md && echo EXISTS
  - grep -c 'BIOG-1[78]' .gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md
  - grep -q 'hombre extraordinario|orden contra el Banco' .gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md && echo OK
  - grep -n 'TBD|\[VERIFICAR\]' .gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md (solo debe aparecer como meta-documentación, no como placeholder real)
duration: ~25min
verification_result: passed
completed_at: 2026-03-22T02:41:10Z
blocker_discovered: false
---

# T01: Redactar S05-CONTENT-DRAFT.md con BIOG-17 y BIOG-18 verificados

**Creado S05-CONTENT-DRAFT.md con BIOG-17 (la carta de Heredia y el encuentro) y BIOG-18 (las conversaciones y el ofrecimiento del viaje), dos citas directas verificadas de Obras Completas, y HTML de excerpt listo para insertar.**

## What Happened

Se leyó S05-RESEARCH.md para confirmar los 11 hechos verificados, las dos citas directas exactas de *Obras Completas*, y la estructura del card inventory (BIOG-17/18). Antes de escribir el draft, se aplicaron los dos pre-flight fixes requeridos:

1. **T01-PLAN.md:** Se añadió la sección `## Observability Impact` que estaba ausente — describe las señales de inspección (file exists, grep BIOG count, quote presence, placeholder check) y el estado de fallo visible en T02/T03 río abajo.

2. **S05-PLAN.md:** Se añadió una sección `Failure-path diagnostics` a `## Observability / Diagnostics` con cuatro comandos shell concretos que detectan los modos de fallo más probables: inserción ausente, inserción parcial, doble-CRLF, y sub-nav sin sub-período correspondiente.

El draft resultante (`S05-CONTENT-DRAFT.md`) contiene:

- **BIOG-17** ("La carta de Heredia y el encuentro con Facundo Quiroga"): cita directa «me acogió con mucha gracia», URL exacta de la imagen de Quiroga (Wikimedia Commons, García del Molino), 5 fuentes, y card-nota-certeza sobre el contenido no reproducido de la carta de Heredia.

- **BIOG-18** ("Las conversaciones con el Tigre de los Llanos"): dos citas directas verificadas («ese hombre extraordinario» y «restituirle su orden contra el Banco»), 5 fuentes, y exactamente 2 card-nota-certeza: (1) motivos del rechazo → S07, (2) contexto de la muerte de Quiroga (feb. 1835).

- Excerpt HTML completo para cada card (listo para copiar por T02), incluyendo `<blockquote>` con `<cite>` apropiado.

- Notas de integración para T02: estructura del sub-período HTML, link del sub-nav, anchor de inserción, conteos esperados post-T02.

## Verification

Ejecutados los 5 checks de verificación del plan:

1. `test -f .gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md && echo EXISTS` → **EXISTS** ✅
2. `grep -c 'BIOG-1[78]' S05-CONTENT-DRAFT.md` → **17** (aparece múltiples veces en IDs, headers, y checklist) ✅
3. `grep -q 'hombre extraordinario|orden contra el Banco' S05-CONTENT-DRAFT.md && echo QUOTES OK` → **QUOTES OK** ✅
4. `grep -q 'Heredia|Felipe Alberdi' S05-CONTENT-DRAFT.md && echo NAMES OK` → **NAMES OK** ✅
5. `grep -n 'TBD|\[VERIFICAR\]' S05-CONTENT-DRAFT.md` → única línea es meta-documentación del checklist ("sin placeholders ni `[TBD]`"), no un placeholder real ✅ (CLEAN)

Adicionales:
- `grep -c 'card-nota-certeza' S05-CONTENT-DRAFT.md` → **4** (2 headers "card-nota-certeza (x2)" + 2 etiquetas individuales) ✅
- `grep -q 'Facundo_Quiroga_por_Garc' S05-CONTENT-DRAFT.md && echo IMAGE URL OK` → **IMAGE URL OK** ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -f S05-CONTENT-DRAFT.md && echo EXISTS` | 0 | ✅ pass | <1s |
| 2 | `grep -c 'BIOG-1[78]' S05-CONTENT-DRAFT.md` → 17 (≥2) | 0 | ✅ pass | <1s |
| 3 | `grep -q 'hombre extraordinario\|orden contra el Banco' S05-CONTENT-DRAFT.md && echo OK` | 0 | ✅ pass | <1s |
| 4 | `grep -q 'Heredia\|Felipe Alberdi' S05-CONTENT-DRAFT.md && echo OK` | 0 | ✅ pass | <1s |
| 5 | `grep -n 'TBD\|\[VERIFICAR\]' S05-CONTENT-DRAFT.md` → solo meta-doc line | 0 | ✅ pass | <1s |
| 6 | `grep -q 'Facundo_Quiroga_por_Garc' S05-CONTENT-DRAFT.md && echo OK` | 0 | ✅ pass | <1s |

## Diagnostics

El draft es un artefacto estático — sin señales de runtime. Para inspeccionarlo:

- `cat .gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md` — ver contenido completo
- `grep -n 'BIOG-1[78]' .gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md` — localizar las dos secciones
- `grep -n 'blockquote\|orden contra el Banco\|hombre extraordinario' .gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md` — verificar las citas directas HTML

Estado de fallo visible en T02 si el draft tiene problemas: T02 copia el excerpt HTML mecánicamente; si el HTML está incorrecto, `grep -c 'data-certeza' index.html` retornará <52 en el gate de T03.

## Deviations

La verificación del "CLEAN" check (`! grep -q 'TBD|\[VERIFICAR\]'`) no imprimió "CLEAN" porque el texto literal `[TBD]` aparece en la línea de checklist que documenta su ausencia: `"sin placeholders ni [TBD]"`. El draft no tiene placeholders reales — confirmado por inspección directa (`grep -n` muestra solo la meta-línea del checklist). No se modificó el draft; la desviación es en el test regex, no en el contenido.

## Known Issues

Ninguno. El draft está completo y listo para T02.

## Files Created/Modified

- `.gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md` — **creado** con BIOG-17 y BIOG-18 completos: texto HTML de excerpt, dos citas directas verificadas de *Obras Completas*, ≥2 fuentes por card, notas de imagen, y card-nota-certeza exactas
- `.gsd/milestones/M007/slices/S05/tasks/T01-PLAN.md` — **modificado** pre-flight: añadida sección `## Observability Impact` que estaba ausente
- `.gsd/milestones/M007/slices/S05/S05-PLAN.md` — **modificado** pre-flight: añadidos failure-path diagnostics concretos en `## Observability / Diagnostics`
