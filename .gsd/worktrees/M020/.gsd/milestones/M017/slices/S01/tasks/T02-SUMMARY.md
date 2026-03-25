---
id: T02
parent: S01
milestone: M017
provides:
  - .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md — versión final con todas las imágenes resueltas (0 marcadores URL-PENDIENTE-VERIFICAR); listo para S02 (integración HTML)
key_files:
  - .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md
key_decisions:
  - Palacio San José: filename sugerido `Palacio_San_José_(Entre_Ríos).jpg` no existe en Commons — correcto es `Palacio_San_José_Fachada.JPG` (pageid 1709857); thumburl 500px verificado vía API
  - Daguerrotipo Fredricks: filename `Daguerrotipo_de_Justo_José_de_Urquiza_(recorte).jpg` existe (pageid 92037693) pero imagen es 421×540px (< 500px ancho) — no thumb path disponible, se usa URL del archivo original per KNOWLEDGE.md rule
  - Wikimedia Commons API requiere `iiprop=url%7Csize` (pipe URL-encoded), no `iiprop=url,size` — coma causa warning "Unrecognized value" y devuelve imageinfo vacío
patterns_established:
  - Para imágenes < 500px de ancho, Wikimedia API devuelve la URL del archivo original como thumburl — es correcto usarla directamente, no es un error
  - Cuando el filename sugerido arroja `"missing":""` en la API, usar `list=search&srnamespace=6&srsearch=...` para encontrar el filename correcto; siempre verificar el candidato encontrado con una segunda llamada API para obtener el thumburl real
  - La API de Wikimedia Commons requiere `iiprop` con valores separados por pipe URL-encoded (`%7C`), no comas
observability_surfaces:
  - "grep '[URL-PENDIENTE-VERIFICAR]' S01-CONTENT-DRAFT.md → 0 líneas (exit 1) = T02 completo"
  - "grep -c 'CONFIRMADO' S01-CONTENT-DRAFT.md → 4 filenames confirmados (URQ-1, URQ-3, URQ-4, URQ-5)"
  - "grep 'Thumburl 500px\\|URL (original = thumb)' S01-CONTENT-DRAFT.md → muestra las URLs reales para URQ-3 y URQ-4"
duration: ~15m
verification_result: passed
completed_at: 2026-03-24
blocker_discovered: false
---

# T02: Verificar URLs Wikimedia vía API y patchear el draft

**Verificadas vía Wikimedia Commons API ambas imágenes pendientes; `S01-CONTENT-DRAFT.md` patcheado con filename corregido (Palacio San José) y URL confirmada (daguerrotipo Fredricks); 0 marcadores `[URL-PENDIENTE-VERIFICAR]` restantes.**

## What Happened

Se leyó el draft producido por T01 para identificar los dos marcadores `[URL-PENDIENTE-VERIFICAR]` en URQ-3 (Palacio San José) y URQ-4 (daguerrotipo Fredricks).

**Descubrimiento crítico — API iiprop parameter:** La primera llamada API usó `iiprop=url,size` (como en el plan de referencia), que devolvió `imageinfo:[{}]` vacío con warning "Unrecognized value for parameter iiprop: url,size". Se corrigió a `iiprop=url%7Csize` (pipe URL-encoded) — las llamadas correctas devolvieron datos completos.

**Daguerrotipo Fredricks (URQ-4):** El filename `Daguerrotipo_de_Justo_José_de_Urquiza_(recorte).jpg` existe en Commons (pageid 92037693). La imagen mide 421×540px — menor que 500px de ancho, por lo que la API devuelve la URL del archivo original como thumburl (no hay thumb path disponible). URL confirmada: `https://upload.wikimedia.org/wikipedia/commons/2/2e/Daguerrotipo_de_Justo_Jos%C3%A9_de_Urquiza_%28recorte%29.jpg`

**Palacio San José (URQ-3):** El filename sugerido `Palacio_San_José_(Entre_Ríos).jpg` no existe en Commons (respuesta `"missing":""`). Se buscó con `list=search&srnamespace=6&srsearch=Palacio+San+Jose+Entre+Rios+Urquiza` — devolvió 160 resultados. El mejor candidato para "fachada" fue `Palacio_San_José_Fachada.JPG` (pageid 1709857, descripción explícita "Fachada del Palacio San José"). Se verificó con segunda llamada API: 1632×1224px, thumburl 500px confirmado: `https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Palacio_San_Jos%C3%A9_Fachada.JPG/500px-Palacio_San_Jos%C3%A9_Fachada.JPG`

Se aplicaron 3 edits quirúrgicos al draft:
1. Sección "Nota de imagen" de URQ-3: reemplazó el marcador pendiente con `[CONFIRMADO: filename corregido...]` + thumburl 500px + URL original
2. Sección "Nota de imagen" de URQ-4: reemplazó el marcador pendiente con `[CONFIRMADO: filename correcto...]` + URL (original = thumb)
3. Tabla de estado de imágenes al pie del draft: actualizó filas URQ-3 y URQ-4 de `⏳ [URL-PENDIENTE-VERIFICAR]` a `✅ CONFIRMADO`

Se añadió `## Observability Impact` a `T02-PLAN.md` (pre-flight gap requerido por el bloque Pre-flight del plan). S01-PLAN.md ya tenía la sección de Observabilidad añadida por T01 — no requirió modificación adicional.

## Verification

**Must-haves del task plan:**
1. ✅ API de Wikimedia consultada para ambas imágenes pendientes (4 llamadas en total: 2 con iiprop incorrecto detectado, 2 con corrección aplicada, 2 para candidatos Palacio San José)
2. ✅ Cero marcadores `[URL-PENDIENTE-VERIFICAR]` en el draft al finalizar — confirmado por grep (exit 1)
3. ✅ URQ-3 tiene thumburl 500px real (no URL de archivo original) — `500px-Palacio_San_José_Fachada.JPG` en la URL
4. ✅ URQ-4 usa URL de archivo original como thumb (imagen < 500px ancho — es el comportamiento correcto, no un fallback)
5. ✅ Para Palacio San José (imagen no existente): alternativa concreta con nombre de archivo específico `Palacio_San_José_Fachada.JPG` y pageid 1709857

**Slice verification — todos los checks pasan:**
- `test -f S01-CONTENT-DRAFT.md` → exit 0 ✅
- `grep -c "^## URQ-"` → 6 ✅
- `grep -c "data-certeza="` → 10 (≥6) ✅
- `grep "CONFIRMADO"` → 4 entradas (URQ-1, URQ-3, URQ-4, URQ-5) ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep "\[URL-PENDIENTE-VERIFICAR\]" S01-CONTENT-DRAFT.md` | 1 (no matches) | ✅ pass | <1s |
| 2 | `test -f .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |
| 3 | `grep -c "^## URQ-" S01-CONTENT-DRAFT.md` → 6 | 0 | ✅ pass | <1s |
| 4 | `grep -c "data-certeza=" S01-CONTENT-DRAFT.md` → 10 (≥6) | 0 | ✅ pass | <1s |
| 5 | `grep "CONFIRMADO" S01-CONTENT-DRAFT.md` → 4 entradas (URQ-1, URQ-3, URQ-4, URQ-5) | 0 | ✅ pass | <1s |
| 6 | Wikimedia API: daguerrotipo pageid=92037693, thumburl returned | N/A (HTTP 200) | ✅ pass | ~2s |
| 7 | Wikimedia API: Palacio Fachada pageid=1709857, thumburl 500px returned | N/A (HTTP 200) | ✅ pass | ~2s |

## Diagnostics

Para verificar el estado final del draft post-T02:

```bash
# Cero pendientes (exit 1 = PASS):
grep "\[URL-PENDIENTE-VERIFICAR\]" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md

# 4 imágenes confirmadas:
grep -c "CONFIRMADO" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md

# Ver las URLs reales de URQ-3 y URQ-4:
grep -A3 "Estado.*CONFIRMADO.*filename" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md

# Card count y certeza coverage (slice gates):
grep -c "^## URQ-" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md
grep -c "data-certeza=" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md
```

## Deviations

**API iiprop parameter format:** El plan de referencia usa `iiprop=url,size` (coma). La API real rechaza comas con warning y devuelve `imageinfo:[{}]` vacío. Se corrigió a `iiprop=url%7Csize` (pipe URL-encoded). No es una desviación del *objetivo* del task, sino una corrección de un error en el parámetro de referencia. Se documenta en KNOWLEDGE.md como patrón a no repetir.

**Palacio San José filename incorrecto:** El filename sugerido `Palacio_San_José_(Entre_Ríos).jpg` no existe en Commons. Se usó el fallback de búsqueda (`list=search`) tal como estipulado en el plan — no es una desviación, es el camino feliz del fallback definido.

**Dos llamadas API adicionales:** El plan estimaba una llamada por imagen (2 total). En la práctica fueron 4 llamadas útiles: 2 con iiprop incorrecto (detectaron el bug), más 1 para el search de Palacio San José, más 1 para verificar el candidato `Palacio_San_José_Fachada.JPG`. El resultado final es idéntico al requerido.

## Known Issues

Ninguno. El slice S01 está completo y todos los checks de verificación pasan. El output (`S01-CONTENT-DRAFT.md`) está listo para que S02 lo consuma.

## Files Created/Modified

- `.gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md` — modificado: 3 edits quirúrgicos; 2 marcadores `[URL-PENDIENTE-VERIFICAR]` reemplazados con URLs/filenames confirmados; tabla de estado de imágenes actualizada
- `.gsd/milestones/M017/slices/S01/tasks/T02-PLAN.md` — modificado: añadida sección `## Observability Impact` (pre-flight gap requerido)
