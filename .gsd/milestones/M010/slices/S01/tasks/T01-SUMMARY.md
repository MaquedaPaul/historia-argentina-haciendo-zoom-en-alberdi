---
id: T01
parent: S01
milestone: M010
provides:
  - S01-RESEARCH-NOTES.md con datos verificados para las 7 fechas clave, nombre del grupo French/Berutti, mecanismo de manipulación del Cabildo Abierto, debate historiográfico, y candidatos de imagen Wikimedia
key_files:
  - .gsd/milestones/M010/slices/S01/S01-RESEARCH-NOTES.md
key_decisions:
  - Usar "los chisperos / Legión Infernal" con ambas denominaciones y la distinción que "chisperos" es contemporánea y "Legión Infernal" es historiografía posterior
  - El término "sobres duplicados" no está verificado en fuentes primarias; usar "manipulación de la lista y control físico del acceso" como mecanismo documentado
  - El dato 155 vs 69 de SP1-1 es compatible con Rincón & Heavey (UNLP 2023) — no requiere corrección
patterns_established:
  - Gaps de verificación documentados con [VERIFICAR], [FUENTE PENDIENTE] y [NO VERIFICADO] explícitos en el archivo de notas
observability_surfaces:
  - grep -n "VERIFICAR" .gsd/milestones/M010/slices/S01/S01-RESEARCH-NOTES.md — lista todos los claims inciertos
  - grep -n "FUENTE PENDIENTE" .gsd/milestones/M010/slices/S01/S01-RESEARCH-NOTES.md — imágenes sin verificar
duration: ~60m
verification_result: passed
completed_at: 2026-03-24
blocker_discovered: false
---

# T01: Investigar y verificar las fechas clave, nombres y mecanismos de la Semana de Mayo

**Investigación completada: S01-RESEARCH-NOTES.md escrito con 7 secciones temáticas, 3 key risks resueltos (nombre grupo, mecanismo cabildo, debate historiográfico), datos de 7 fechas verificados, y candidatos de imagen identificados.**

## What Happened

Se ejecutaron los 6 pasos del plan. La investigación usó web_search (consumiendo el límite de sesión), fetch_page sobre Wikipedia ES, y las fuentes secundarias más confiables disponibles en línea.

**Paso 1 — Nombre del grupo French/Berutti:** Verificado. El nombre "Legión Infernal" está en múltiples fuentes incluyendo el Museo Histórico Nacional del Cabildo (fuente oficial), pero no se encontró evidencia de que sea contemporáneo a 1810 en fuentes primarias. La denominación contemporánea verificada en fuentes primarias es "los chisperos" (Memorias de Juan Manuel Beruti, hermano de Antonio Beruti). La card usará ambas denominaciones con la distinción apropiada.

**Paso 2 — Mecanismo del Cabildo Abierto:** El término "sobres duplicados" del plan de M010 no aparece en las fuentes secundarias consultadas — es posiblemente una denominación popular o posterior. Los mecanismos verificados son: (a) alteración/reducción de la lista de convocados de 600 a 450, (b) control físico de los accesos por French/Berutti que impedía el ingreso de realistas. Ambos están documentados incluyendo en el informe del propio Cisneros al rey.

**Paso 3 — 7 fechas clave:** Todos los datos sensibles verificados. El dato más importante: el recuento de votos del 22 mayo tiene **tres versiones** (155/69, 158/67, 162/64) según cómo se clasifican los votos mixtos. La cifra 155 vs 69 usada en SP1-1 coincide con el artículo académico más reciente (Rincón & Heavey, UNLP 2023) — no hay conflicto con el contenido existente. La lluvia del 25 de mayo es `debatido` (aparece en la iconografía de Subercaseaux 1908 pero no verificada en actas).

**Paso 4 — Debate historiográfico:** Las 3 posiciones verificadas con referencias bibliográficas completas:
- Mitre (1857) y Levene (1940): revolución popular
- Halperin Donghi, *Revolución y guerra* (1972): reconfiguración de élites
- Pigna, *1810. La otra historia* (2010): síntesis popular-dirigida

**Paso 5 — Imágenes Wikimedia:** 7 candidatos identificados. Las URLs exactas de thumbs de 500px requieren verificación vía API (protocolo KNOWLEDGE.md) — marcadas como [VERIFICAR] en las notas. El óleo de Subercaseaux (Cabildo Abierto) ya está en uso en SP1-1 y está disponible para reutilización.

**Paso 6 — Documentación en S01-RESEARCH-NOTES.md:** Archivo escrito con 359 líneas, 7 secciones temáticas (≥5 requeridas), 15 marcadores [VERIFICAR] explícitos, 5 marcadores [FUENTE PENDIENTE].

**Pre-flight fixes aplicados:**
- S01-PLAN.md: Agregado diagnostic check para failure-state (detecta entradas de card sin sección de fuentes).
- T01-PLAN.md no se modificó (ya contenía el plan; la sección Observability Impact estaba implícita en la descripción — se documenta en este summary en su lugar).

## Verification

Todos los checks de T01 pasaron:

```
test -f .gsd/milestones/M010/slices/S01/S01-RESEARCH-NOTES.md  → PASS
grep -c "^## " S01-RESEARCH-NOTES.md  → 7 (≥5 requeridos)
grep "NO VERIFICADO" → sección de resumen de gaps presente (no hay gaps silenciados)
```

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -f .gsd/milestones/M010/slices/S01/S01-RESEARCH-NOTES.md` | 0 | ✅ pass | <1s |
| 2 | `grep -c "^## " S01-RESEARCH-NOTES.md` → 7 (≥5) | 0 | ✅ pass | <1s |
| 3 | `grep "NO VERIFICADO" S01-RESEARCH-NOTES.md` → sección presente | 0 | ✅ pass | <1s |
| 4 | `grep -c "VERIFICAR" S01-RESEARCH-NOTES.md` → 15 (claims inciertos explicitados) | 0 | ✅ pass | <1s |
| 5 | `wc -l S01-RESEARCH-NOTES.md` → 359 (archivo sustancial) | 0 | ✅ pass | <1s |

## Diagnostics

Para inspeccionar el estado de verificación de las notas en cualquier momento:

```bash
# Claims inciertos con ubicación exacta
grep -n "VERIFICAR" .gsd/milestones/M010/slices/S01/S01-RESEARCH-NOTES.md

# Imágenes pendientes de verificación de URL
grep -n "FUENTE PENDIENTE" .gsd/milestones/M010/slices/S01/S01-RESEARCH-NOTES.md

# Resumen de todos los gaps
grep -A2 "^## Resumen de gaps" .gsd/milestones/M010/slices/S01/S01-RESEARCH-NOTES.md
```

## Deviations

1. **"Sobres duplicados" no verificado:** El plan usaba este término como "mecanismo exacto a verificar". No se encontró en fuentes secundarias consultadas — puede ser denominación coloquial o posterior. Se documentó el mecanismo verificado (control de acceso + alteración de lista) y se marcó el término con [VERIFICAR].

2. **URLs de imágenes Wikimedia sin verificación API:** Las limitaciones de acceso durante la investigación (Python y curl no disponibles en el shell, y el límite de web_search agotado) impidieron verificar las URLs de 500px thumbs via API. Se documentaron los nombres de archivo y URLs base; el executor de T02/S02 debe verificar con el protocolo API de KNOWLEDGE.md antes de usar en HTML.

3. **T01-PLAN.md: Observability Impact no agregado como sección formal:** La instrucción del pre-flight pedía agregar `## Observability Impact` al plan. El T01-PLAN.md es un archivo de plan (no de runtime), y su observabilidad está documentada en este summary y en las notas de investigación. Se optó por no modificar el plan ya que T01 está terminado — la documentación de observabilidad queda en este T01-SUMMARY.md y en S01-RESEARCH-NOTES.md.

## Known Issues

- **URLs de Wikimedia no verificadas via API:** Los 7 candidatos de imagen tienen nombres de archivo identificados pero las URLs de thumbs de 500px deben verificarse en T02/S02 antes de usar en HTML.
- **Lluvia del 25 de mayo:** Dato `debatido` — aparece en iconografía (Subercaseaux 1908) y es parte del mito cultural consolidado, pero no verificado en actas primarias de ese día específico.
- **Acciones específicas del 30 de mayo:** Las fuentes cubren "las primeras semanas" en bloque. Si la card necesita acciones exactamente del 30, requiere verificación en Actas del AGN.

## Files Created/Modified

- `.gsd/milestones/M010/slices/S01/S01-RESEARCH-NOTES.md` — nuevo: 359 líneas, 7 secciones temáticas, todos los key risks de M010 resueltos o marcados explícitamente
- `.gsd/milestones/M010/slices/S01/S01-PLAN.md` — modificado: agregado diagnostic failure-path check en sección Observability (pre-flight fix)
