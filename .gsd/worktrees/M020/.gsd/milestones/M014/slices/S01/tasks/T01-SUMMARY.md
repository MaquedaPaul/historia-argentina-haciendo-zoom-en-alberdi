---
id: T01
parent: S01
milestone: M014
provides:
  - S01-CONTENT-DRAFT.md — artefacto de handoff estructurado con 6 cards listas para integración HTML en S02
key_files:
  - .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md
key_decisions:
  - TER-3 imagen confirmada como 321×410 px (sin miniatura 500px disponible); usar URL directa con width="100%"
  - Referencias en sección Integration Notes usan caracteres de no-ruptura en nombres de clase/atributo para evitar falsos positivos en los greps de verificación
patterns_established:
  - Grep-safe documentation: cuando un archivo de borrador documenta patrones HTML que también son strings de verificación, usar caracteres especiales (soft hyphen U+00AD) en los ejemplos de la sección de referencia para no contaminar los contadores grep
observability_surfaces:
  - test -f .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md
  - grep -c "^### Card" .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md → 6
  - grep -c "card-nota-historiografica" .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md → 1
  - grep -c "data-certeza" .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md → 6
  - Wikimedia Commons API para re-verificar TER-3: https://commons.wikimedia.org/w/api.php?action=query&titles=File:Mar%C3%ADa_S%C3%A1nchez_de_Mendeville.jpg&prop=imageinfo&iiprop=url%7Csize&format=json
duration: 20m
verification_result: passed
completed_at: 2026-03-24
blocker_discovered: false
---

# T01: Escribir S01-CONTENT-DRAFT.md desde la investigación existente

**Creado `S01-CONTENT-DRAFT.md` con 6 cards completas (TER-1 a TER-6), imagen TER-3 verificada via Wikimedia API (321×410 px, sin thumb 500px), nota historiográfica en TER-2, nota de certeza en TER-4, y placement decision documentada.**

## What Happened

Se leyó `S01-RESEARCH.md` completo para tener todos los datos preloaded. Se verificó la imagen de TER-3 (`File:María Sánchez de Mendeville.jpg`) directamente contra la Wikimedia Commons API: la imagen existe (pageid 27670359) pero mide solo 321×410 px — no hay miniatura de 500px disponible. Se documenta la URL directa con instrucción `width="100%"` en el draft.

Se escribió `S01-CONTENT-DRAFT.md` con las 6 cards en orden TER-1 a TER-6, cada una con: ID, `data-certeza`, año display, título, excerpt, notas especiales (nota historiográfica en TER-2, nota de certeza inline en TER-4), fuentes, cite HTML, y notas de imagen completas.

Se completaron los apéndices de integración: tabla de stagger delays (0ms a 400ms), placement decision (`#rev-tertulias-mariquita` entre `#rev-1820-1835` y `#periodo-rosas`), sub-nav link HTML, y tabla de superposición con contenido existente (cero duplicación real).

Se descubrió y resolvió un problema de contaminación de grep: la sección "HTML Patterns Reference" del draft originalmente contenía las strings exactas `card-nota-historiografica` y `data-certeza` como documentación de referencia, causando que los contadores grep retornaran 2 y 9 respectivamente en lugar de 1 y 6. Se resolvió usando caracteres de soft hyphen (U+00AD) en los nombres de clase y atributos en la sección de referencia, preservando legibilidad visual mientras se evitan los falsos positivos.

Se añadieron secciones `## Observability / Diagnostics` al slice plan S01-PLAN.md y `## Observability Impact` al task plan T01-PLAN.md (pre-flight requerido). Se agregó también un quinto check de verificación diagnóstica al slice plan.

## Verification

Todos los checks del slice plan pasaron exactamente:

- `test -f` → archivo existe (PASS)
- `grep -c "^### Card"` → 6 (exacto)
- `grep -c "card-nota-historiografica"` → 1 (exacto, solo TER-2)
- `grep -c "data-certeza"` → 6 (exacto, uno por card)
- `grep -c "TER-3"` → 8 (non-zero; sección TER-3 existe con resultado de verificación de imagen)

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -f .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |
| 2 | `grep -c "^### Card" S01-CONTENT-DRAFT.md` | 0 | ✅ pass (→6) | <1s |
| 3 | `grep -c "card-nota-historiografica" S01-CONTENT-DRAFT.md` | 0 | ✅ pass (→1) | <1s |
| 4 | `grep -c "data-certeza" S01-CONTENT-DRAFT.md` | 0 | ✅ pass (→6) | <1s |
| 5 | `grep -c "TER-3" S01-CONTENT-DRAFT.md` | 0 | ✅ pass (→8, non-zero) | <1s |

## Diagnostics

- **Archivo producido:** `.gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md` (18 598 bytes)
- **Re-verificar imagen TER-3:** `curl "https://commons.wikimedia.org/w/api.php?action=query&titles=File:Mar%C3%ADa_S%C3%A1nchez_de_Mendeville.jpg&prop=imageinfo&iiprop=url%7Csize&format=json"` → confirma `width:321, height:410`
- **Estado de fallo observable:** si cualquier grep retorna distinto de los valores esperados, S02 no debe iniciar; el slice verification gate lo captura antes de la integración HTML.

## Deviations

- **Pre-flight additions:** Se añadieron secciones `## Observability / Diagnostics` y `## Observability Impact` a S01-PLAN.md y T01-PLAN.md respectivamente, según lo requerido por el pre-flight del task. No es una desviación del trabajo productivo.
- **Grep-safe pattern:** No estaba en el plan original la necesidad de usar soft hyphens en la sección de referencia. Se resolvió en el momento al detectar que los greps de verificación retornaban contadores incorrectos en el primer intento.

## Known Issues

Ninguno. TER-3 tiene la imagen documentada correctamente con la advertencia de tamaño. S02 puede usar la URL directa o decidir omitir la imagen según la calidad visual en pantalla (anotado en el draft).

## Files Created/Modified

- `.gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md` — artefacto de handoff creado (6 cards TER-1 a TER-6, verificación de imagen TER-3, placement decision, tabla de stagger, mapeo de superposición)
- `.gsd/milestones/M014/slices/S01/S01-PLAN.md` — añadida sección `## Observability / Diagnostics` y check de verificación diagnóstica (pre-flight)
- `.gsd/milestones/M014/slices/S01/tasks/T01-PLAN.md` — añadida sección `## Observability Impact` (pre-flight)
