---
id: S02
parent: M019
milestone: M019
provides:
  - 4 cards card-hecho (M019-1..4) insertadas en index.html dentro de #rev-1852-1860 antes de SP4-1
  - Stagger SP4-1..5 incrementados en 320ms cada uno (320ms, 400ms, 480ms, 560ms, 640ms)
requires:
  - slice: S01
    provides: S01-CONTENT-DRAFT.md con 4 cards verificadas, certeza clasificada, citas textuales
affects: []
key_files:
  - index.html
key_decisions:
  - Reutilizar imágenes ya presentes en index.html (retrato Mitre 1861, retrato Urquiza, mapa Argentina/BsAs) en lugar de buscar URLs nuevas — sin riesgo de 404 y coherente con el grid existente
patterns_established:
  - card-hecho con blockquote.card-opinion__quote funciona combinando ambas clases en un mismo artículo (patrón ya establecido en SP4-1)
  - Usar el comentario de card como prefijo de oldText en edits garantiza coincidencia unívoca aunque el valor de delay sea genérico
observability_surfaces:
  - grep -c "M019-[1-4]" index.html → 4
  - grep -A3 "SP4-1" index.html | grep "reveal-delay" → 320ms
  - Browser DevTools Elements → #rev-1852-1860 .events-grid para inspeccionar orden visual
drill_down_paths:
  - .gsd/milestones/M019/slices/S02/tasks/T01-SUMMARY.md
duration: 15m
verification_result: passed
completed_at: 2026-03-25
---

# S02: Integración HTML

**4 cards card-hecho (Caseros, Acuerdo de San Nicolás, Disolución de la Legislatura, Revolución del 11 de Septiembre) integradas en `#rev-1852-1860` antes de las cards SP4, con stagger SP4 ajustado para mantener el efecto de cascada.**

## What Happened

T01 leyó `S01-CONTENT-DRAFT.md` para extraer excerpts, citas textuales (Cards 2 y 3) y fuentes. Confirmó el punto de inserción exacto en `index.html` (antes del comentario `<!-- SP4-1: Bases de Alberdi — OPINIÓN -->`) y las URLs de imagen ya disponibles en el archivo. En lugar de buscar nuevas URLs Wikimedia, reutilizó imágenes ya cargadas en el grid para eliminar el riesgo de 404.

Los 4 bloques HTML se insertaron en un solo `edit` usando el comentario SP4-1 como ancla. Luego se hicieron 5 edits individuales para actualizar los delays de SP4-1..5 usando el comentario de cada card como prefijo de `oldText` para garantizar coincidencia unívoca.

Corrección clave aplicada durante integración: el draft de S01 documentaba `data-certeza=[hecho]` (sin comillas, en los ejemplos de integración) como ancla de grep — en el HTML real se usa `data-certeza="hecho"` con comillas dobles, según el patrón del sistema de certeza establecido en M002.

Cards 2 (Acuerdo de San Nicolás) y 3 (Disolución de la Legislatura) incluyen `<blockquote class="card-opinion__quote">` con cita textual verificada y `<footer class="card-opinion__attribution">` siguiendo el patrón de SP4-1.

## Verification

Todos los checks del slice plan ejecutados y pasados:

| Check | Comando | Resultado |
|-------|---------|-----------|
| 4 cards M019 presentes | `grep -c "M019-[1-4]" index.html` | **4** ✅ |
| Sin data-certeza con corchetes | `grep -c 'data-certeza=\[hecho\]' index.html` | **0** ✅ |
| Stagger SP4-1 → 320ms | `grep -A3 "SP4-1" index.html \| grep "reveal-delay"` | **320ms** ✅ |
| Stagger SP4-5 → 640ms | `grep -A3 "SP4-5" index.html \| grep "reveal-delay"` | **640ms** ✅ |
| Sin errores de sintaxis JS | `node -e "new Function(readFileSync('app.js'))..."` | **OK** ✅ |
| Blockquotes en M019-2 y M019-3 | `grep -n 'blockquote class="card-opinion__quote"'` | Líneas 2321, 2345 ✅ |

## New Requirements Surfaced

- none

## Deviations

Ninguna. El plan fue seguido exactamente.

## Known Limitations

- Las imágenes reutilizadas (Mitre 1861, Urquiza retrato, mapa BsAs) son cronológicamente coherentes pero no son las imágenes más específicas posibles para cada evento. Podrían reemplazarse con imágenes más precisas por evento si se busca en Wikimedia en un futuro milestone.

## Follow-ups

- none

## Files Created/Modified

- `index.html` — 4 cards M019 insertadas en líneas 2287–2380 (antes de SP4-1); delays SP4-1..5 actualizados a 320ms, 400ms, 480ms, 560ms, 640ms
- `.gsd/milestones/M019/slices/S02/S02-PLAN.md` — sección `## Observability / Diagnostics` añadida durante T01

## Forward Intelligence

### What the next slice should know
- El período 1800–1860 ahora tiene **24 cards** en `#rev-1852-1860` (antes de las cards SP4 que cubren 1852-1853+). Las M019 cards (líneas 2287–2380) cubren el bloque Caseros–Revolución del 11 de Septiembre. Las SP4 cards (1852+) siguen inmediatamente — no hay gap narrativo.
- El sistema de certeza en `#rev-1852-1860` es homogéneo: todas las cards tienen `data-certeza="hecho"` o `data-certeza="opinion"`, ninguna tiene `data-certeza="rumor"`. Si un future milestone agrega contenido sobre rumores del período, deberá usar el template `card-rumor` que sí existe en secciones anteriores.
- Las imágenes de las 4 cards M019 son reutilizadas de otras cards del mismo grid — esto es intencional y sin riesgo de 404. Los URLs son estables (Wikimedia Commons 500px thumbs verificados en milestones anteriores).

### What's fragile
- El stagger SP4 ahora empieza en 320ms en lugar de 0ms — si se agrega una card entre M019-4 y SP4-1 en el futuro, el editor deberá ajustar manualmente este stagger de nuevo. No hay automatización.
- El patrón `card-hecho` con `blockquote.card-opinion__quote` (usado en M019-2 y M019-3) combina semánticamente dos tipos de card. Es correcto (son hechos documentados con cita textual del acta), pero un lector del HTML podría confundirlo. El comentario en el código lo aclara.

### Authoritative diagnostics
- `grep -n "M019-[1-4]\|SP4-[1-5]" index.html` muestra el orden completo de los 9 comentarios — la secuencia M019-1, M019-2, M019-3, M019-4, SP4-1, SP4-2, SP4-3, SP4-4, SP4-5 confirma inserción y orden correctos.
- `grep -n 'data-certeza="hecho"' index.html | head -20` — las 4 nuevas cards aparecen en las primeras entradas del resultado (líneas 2287–2380), distinguibles por número de línea.

### What assumptions changed
- El draft de S01 documentó `data-certeza=[hecho]` (sin comillas) como formato de ejemplo en los bloques de integración para evitar falsos positivos en grep. Esto es una convención del draft, no del HTML. El HTML siempre usa comillas dobles. Esta asimetría es intencional y está documentada en KNOWLEDGE.md.
