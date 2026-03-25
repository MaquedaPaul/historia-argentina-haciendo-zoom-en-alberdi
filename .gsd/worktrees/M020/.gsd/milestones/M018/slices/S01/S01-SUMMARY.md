---
id: S01
parent: M018
milestone: M018
provides:
  - S01-CONTENT-DRAFT.md — 4 CAM cards estructuradas con certeza, excerpts verificados, ≥2 fuentes cada una, y 3 thumburls CONFIRMADO via Wikimedia Commons API
requires: []
affects:
  - S02
key_files:
  - .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md
key_decisions:
  - CAM-4 clasificada como card-hecho (no card-opinion) — todos los hechos inmediatos post-Caseros tienen fechas y actores documentados con precisión
  - Cita de Alberdi en CAM-4 incorporada como paráfrasis atribuida en el excerpt, no como nuevo blockquote alberdi-quote (restricción del sitio respetada: ya existen 6)
  - Siempre consultar commons.wikimedia.org/w/api.php para imageinfo — en.wikipedia.org devuelve `missing` silencioso para archivos de Commons
  - CAM-3 filename candidato `La_Batalla_de_Caseros_2.JPG` no existe; reemplazado por `La-batalla-de-caseros.JPG` (confirmado via Commons search API)
patterns_established:
  - Draft format: YAML frontmatter + secciones ## CAM-N con Título / Año-display / Clase CSS / data-certeza / Justificación / Excerpt / Fuentes / Imagen candidata / Restricciones — formato contrato S01→S02 para M018
  - Anti-duplication checklist al final del draft: permite a T02 y S02 verificar restricciones SP3-6 a primera vista
  - Estado de imagen en draft: PENDIENTE → CONFIRMADO/FALLO con thumburl completo y nota de alternativa; ningún PENDIENTE sin resolver antes de entregar el draft a S02
observability_surfaces:
  - "grep -c '^## CAM-' .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md → 4"
  - "grep -c 'CONFIRMADO' .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md → ≥3 (actualmente 4)"
  - "grep 'PENDIENTE' .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md || echo OK → OK (sin PENDIENTE sin resolver)"
  - "wc -l .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md → 186 (≥120)"
drill_down_paths:
  - .gsd/milestones/M018/slices/S01/tasks/T01-SUMMARY.md
  - .gsd/milestones/M018/slices/S01/tasks/T02-SUMMARY.md
duration: ~45m total (T01 ~20m + T02 ~25m)
verification_result: passed
completed_at: 2026-03-24
---

# S01: Investigación y borrador

**Producido `S01-CONTENT-DRAFT.md` con 4 cards verificadas (CAM-1 a CAM-4) sobre el proceso 1851–1852 que llevó a Caseros: Pronunciamiento de Urquiza, alianzas con Brasil/Uruguay, Ejército Grande, y pasos constituyentes inmediatos. Tres imágenes confirmadas via Wikimedia Commons API con thumburls completos listos para HTML.**

## What Happened

**T01** consumió la investigación preexistente de S01-RESEARCH.md y la estructuró en el formato contrato S01→S02. Cada una de las 4 secciones `## CAM-N` incluye: título, año-display, clase CSS y data-certeza con justificación explícita, excerpt de 2–4 oraciones en español construido desde hechos verificados, ≥2 fuentes citadas, y un bloque de imagen candidata con filename Wikimedia y estado PENDIENTE. Un checklist anti-duplicación al final del draft permite a S02 verificar a primera vista que ningún dato de SP3-6 se repite como claim central.

La única decisión de clasificación no trivial fue CAM-4: el plan la marcaba como posiblemente `card-opinion`, pero todos los contenidos (renuncia de Rosas el 3 feb, nombramiento de Vicente López el 4 feb, Acuerdo de San Nicolás del 31 may 1852, rechazo de Buenos Aires en septiembre 1852) son actos jurídicos documentados con fechas y actores precisos → `card-hecho`. La cita de Alberdi se incorporó como paráfrasis atribuida dentro del excerpt, sin crear un nuevo `<blockquote class="alberdi-quote">` (seis ya existen en el sitio).

**T02** verificó las 3 imágenes candidatas contra la Wikimedia Commons API. El hallazgo crítico: `en.wikipedia.org/w/api.php` retorna `missing: ""` para los tres filenames aunque existen en Commons — endpoint incorrecto. Al cambiar a `commons.wikimedia.org/w/api.php` se obtuvieron resultados correctos:

- **CAM-1** `Justo_J._Urquiza._Presidente_of_the_Argentine_Confederation.jpg` → CONFIRMADO (1064×1352 px, thumburl 500px obtenido)
- **CAM-2** `Batalha_dos_Santos_Logares_(3_de_fevereiro_de_1852).jpg` → CONFIRMADO (1534×950 px, thumburl 500px obtenido)
- **CAM-3** `La_Batalla_de_Caseros_2.JPG` → FALLO (no existe en Commons); Commons search API encontró alternativa `La-batalla-de-caseros.JPG` (2197×582 px) → CONFIRMADO (alternativa)
- **CAM-4** imagen opcional `Acuerdo_de_San_Nicolas_1852.jpg` → FALLO; documentadas dos alternativas verificadas para uso discrecional de S02

El draft fue actualizado con todos los thumburls, estados PENDIENTE eliminados, FALLOs documentados con resoluciones, y frontmatter actualizado a VERIFICADO. Ningún PENDIENTE sin resolver quedó en el draft.

KNOWLEDGE.md fue actualizado con dos entradas nuevas: (1) usar commons.wikimedia.org no en.wikipedia.org para imageinfo de archivos Commons; (2) distinción underscore/space en títulos de filenames.

## Verification

Todos los checks del slice plan ejecutados y pasados:

```bash
grep -c "^## CAM-" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md   # → 4 ✅
grep -c "CONFIRMADO" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md # → 4 (≥3) ✅
test -s .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md && echo OK   # → OK ✅
grep "FALLO" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md         # → entradas documentadas, todas resueltas ✅
grep "PENDIENTE" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md || echo "OK"  # → OK ✅
wc -l .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md                # → 186 (≥120) ✅
```

Verificación estructural adicional:
- 4 cards con data-certeza="hecho": CAM-1, CAM-2, CAM-3, CAM-4 ✅
- ≥2 fuentes por card: CAM-1 (3), CAM-2 (3), CAM-3 (3), CAM-4 (3) ✅
- Checklist anti-SP3-6 presente al final del draft ✅
- Ningún `alberdi-quote` nuevo creado ✅
- Anchor de inserción documentado (`</div><!-- /#rev-1835-1852 -->`) ✅

## New Requirements Surfaced

- none

## Deviations

1. **Endpoint Wikimedia cambiado de `en.wikipedia.org` a `commons.wikimedia.org`:** El plan T02 especificaba `en.wikipedia.org/w/api.php`. Ese endpoint retorna `missing` silencioso para archivos de Commons. Cambiado al endpoint correcto per KNOWLEDGE.md.

2. **CAM-3 filename alternativo:** Plan indicaba `La_Batalla_de_Caseros_2.JPG`. No existe en Commons. Reemplazado por `La-batalla-de-caseros.JPG` encontrado vía Commons search API — funcionalidad equivalente (panorama del campo de batalla).

3. **CAM-4 clasificada como `card-hecho`** en lugar de la clasificación ambigua del plan ("puede ser hecho o opinión") — todos los contenidos son actos jurídicos documentados, no interpretaciones.

## Known Limitations

- Las entradas FALLO en el draft (CAM-3 candidato original y CAM-4 opcional) activan el check `grep "FALLO"`, pero son FALLOs documentados y resueltos — no FALLOs pendientes. El check real de salud es ausencia de PENDIENTE sin resolver.
- La cita de Alberdi en CAM-4 es paráfrasis atribuida, no cita directa verificada contra paginación de *Bases* (1852). Si S02 quiere convertirla en blockquote directo, debe verificar texto exacto contra edición digital.
- CAM-4 no tiene imagen primaria asignada (sin imagen obligatoria por plan); S02 puede usar opcionalmente `Caseros.jpg` o la litografía Carlo Penuti, ambas con thumburls verificados en el draft.

## Follow-ups

- S02 debe verificar que la anchor `</div><!-- /#rev-1835-1852 -->` aún existe en esa posición si M017 fue aplicado primero (M017 puede haber desplazado líneas).
- Si M017 introdujo `#rev-urquiza-perfil`, el bloque `#rev-camino-caseros` de M018 debe insertarse DESPUÉS de él para mantener coherencia narrativa (perfil → acciones 1851-1852).

## Files Created/Modified

- `.gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md` — **nuevo** — 4 CAM cards con estructura completa, 3 thumburls CONFIRMADO, listo para S02
- `.gsd/KNOWLEDGE.md` — actualizado con 2 entradas: (1) endpoint Commons vs Wikipedia para imageinfo; (2) underscore/space en filenames Wikimedia

## Forward Intelligence

### What the next slice should know

- **El draft es el contrato completo para S02.** Cada sección CAM-N incluye todo lo que S02 necesita: título, año-display, clase CSS, data-certeza, excerpt listo para copiar, fuentes para `<cite>`, y thumburl exacto para `<img src="...">`. No se requiere investigación adicional para ninguna de las 4 cards.
- **Anchor de inserción:** El bloque completo va INMEDIATAMENTE ANTES de `</div><!-- /#rev-1835-1852 -->`. Si M017 fue aplicado primero, va DESPUÉS de `</div><!-- /#rev-urquiza-perfil -->`.
- **Sub-nav:** Añadir `<a href="#rev-camino-caseros" class="sub-nav__link">El camino a Caseros</a>` en el bloque sub-nav de #periodo-revolucion (~líneas 325–333 de index.html).
- **CAM-3 usa `La-batalla-de-caseros.JPG`** (con guiones, no guiones bajos). El thumburl exacto está en el draft. No usar `La_Batalla_de_Caseros_2.JPG` — no existe en Commons.
- **CAM-4 Alberdi:** La paráfrasis atribuida en el excerpt puede ir como texto corrido. Si S02 quiere presentarla como bloque visual, usar `card-opinion__context` no `alberdi-quote`.

### What's fragile

- **La cita de Alberdi en CAM-4** es paráfrasis de fuente secundaria, no texto verificado contra edición primaria de *Bases* (1852). Presentarla como cita directa entre comillas sin verificación sería incorrecto.
- **CAM-3 imagen (2197×582 px panorama)** es muy apaisada (3.77:1 de ratio). En el contenedor card-image del sitio (ratio ~4:3 o 16:9), puede necesitar `object-position: center top` o similar para mostrar bien. S02 debe verificar visualmente.

### Authoritative diagnostics

- `grep -c "CONFIRMADO" S01-CONTENT-DRAFT.md` → valor 4 confirma que los 3 thumburls de imágenes primarias y la nota de imagen alternativa de CAM-4 están presentes.
- `grep "Estado:" S01-CONTENT-DRAFT.md` → lista los 3 estados de imagen con thumburl confirmados.
- `grep "PENDIENTE" S01-CONTENT-DRAFT.md || echo OK` → la señal más rápida de que el draft está listo para S02.

### What assumptions changed

- **Asunción original:** `en.wikipedia.org/w/api.php` es suficiente para verificar imágenes Wikimedia. **Realidad:** Retorna `missing` silencioso para archivos de Commons. Siempre usar `commons.wikimedia.org/w/api.php`.
- **Asunción original:** Los filenames candidatos de S01-RESEARCH.md existen exactamente en Commons. **Realidad:** `La_Batalla_de_Caseros_2.JPG` no existe (probablemente renombrado). Siempre verificar via API antes de confiar en filenames de investigación preliminar.
