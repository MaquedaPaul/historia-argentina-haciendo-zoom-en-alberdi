---
id: T02
parent: S03
milestone: M007
provides:
  - 3 cards BIOG-9/10/11 integradas en #rev-alberdi-formacion con data-certeza, reveal reveal-slide y stagger delays correctos
  - Puente narrativo blockquote.alberdi-quote con cita del Fragmento preliminar al cierre del sub-período
  - Título sub-período y sub-nav link actualizados a 1810–1838
key_files:
  - index.html
key_decisions:
  - No se ejecutaron pasos 3-8 del plan porque T02 ya estaba completado al arrancar — index.html ya tenía BIOG-9/10/11, el puente narrativo y el título/sub-nav actualizados a 1838
  - Todos los checks de verificación pasaron sin ninguna acción adicional de inserción
patterns_established:
  - Antes de ejecutar pasos de inserción en worktree, verificar siempre si el trabajo ya fue aplicado con grep -c/grep -n para no duplicar inserciones
observability_surfaces:
  - grep -c 'data-certeza' index.html → 45 (post-T02 baseline)
  - grep -c 'reveal reveal-slide|reveal reveal-fade' index.html → 65 (post-T02 baseline)
  - grep -n 'BIOG-9|BIOG-10|BIOG-11' index.html → 3 líneas (una por card)
  - grep -n 'alberdi-quote' index.html → 2 blockquotes (línea ~320 original + línea ~630 nuevo cierre)
  - document.querySelectorAll('#rev-alberdi-formacion [data-certeza]').length en DevTools → 11
duration: ~10min (verificación + documentación; integración ya aplicada)
verification_result: passed
completed_at: 2026-03-20
blocker_discovered: false
---

# T02: Integrar BIOG-9, BIOG-10, BIOG-11 en index.html y actualizar el sub-período biográfico

**Integración de BIOG-9/10/11 verificada completa: 45 cards `data-certeza`, 65 elementos reveal, título y sub-nav actualizados a 1810–1838, puente narrativo con cita del *Fragmento preliminar* al cierre de `#rev-alberdi-formacion`.**

## What Happened

Al cargar el contexto e inspeccionar `index.html`, se detectó que todos los pasos de integración de T02 ya estaban aplicados en el worktree:

- **BIOG-9** (`card-hecho`, 640ms) en línea 542: "El regreso a la tierra natal: Tucumán bajo Heredia" — con `card-nota-certeza` sobre las cuestiones sucesorias.
- **BIOG-10** (`card-hecho`, 720ms) en línea 570: "Alejandro Heredia: el caudillo ilustrado que protegió a Alberdi" — con `card-nota-certeza` sobre el vínculo pedagógico documentado en Wikipedia EN.
- **BIOG-11** (`card-hecho`, 800ms) en línea 598: "De vuelta en Buenos Aires: el *Fragmento preliminar* y el umbral del Salón Literario" — con `card-nota-certeza` sobre la distinción tesis/obra independiente.
- **Puente narrativo** en línea 630: `<blockquote class="alberdi-quote reveal reveal-slide">` con cita "Los pueblos, como los hombres, no tienen alas; hacen sus jornadas a pie, y paso a paso" del *Fragmento preliminar* (1837) — distinta de la cita existente en ~línea 320.
- **Título sub-período**: `Alberdi: Los años de formación (1810–1838)` — ya actualizado.
- **Sub-nav link**: `1810–1838` con sub-label "Los años de formación" — ya actualizado.

El trabajo de verificación consistió en confirmar que cada elemento cumplía exactamente la especificación del plan y del borrador S03-CONTENT-DRAFT.md, y en ejecutar todos los checks cuantitativos de slice-level verification.

## Verification

Todos los checks del task plan y del slice plan pasaron:

- `grep -c 'data-certeza' index.html` → **45** (≥45 ✅)
- `grep 'BIOG-9\|BIOG-10\|BIOG-11' index.html | wc -l` → **3** (≥3 ✅)
- `grep -E 'Heredia|Fragmento preliminar' index.html | wc -l` → **23** (≥4 ✅)
- `grep '1810.*1838' index.html | wc -l` → **3** (≥1 ✅)
- `grep -c 'reveal reveal-slide\|reveal reveal-fade' index.html` → **65** (≥64 ✅)
- `sed -n '344,643p' index.html | grep -c 'data-certeza'` → **11** (≥11 ✅)
- `git diff --name-only` → solo `index.html`; `styles.css` y `app.js` sin modificar ✅
- `test -f .gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md` → archivo existe, 21887 bytes ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c 'data-certeza' index.html` | 0 (output: 45) | ✅ pass | <1s |
| 2 | `grep 'BIOG-9\|BIOG-10\|BIOG-11' index.html \| wc -l` | 0 (output: 3) | ✅ pass | <1s |
| 3 | `grep -E 'Heredia\|Fragmento preliminar' index.html \| wc -l` | 0 (output: 23) | ✅ pass | <1s |
| 4 | `grep '1810.*1838' index.html \| wc -l` | 0 (output: 3) | ✅ pass | <1s |
| 5 | `grep -c 'reveal reveal-slide\|reveal reveal-fade' index.html` | 0 (output: 65) | ✅ pass | <1s |
| 6 | `sed -n '344,643p' index.html \| grep -c 'data-certeza'` | 0 (output: 11) | ✅ pass | <1s |
| 7 | `git diff --name-only` | 0 (index.html only) | ✅ pass | <1s |
| 8 | `test -f .gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |

## Diagnostics

Superficies de inspección post-T02:

- `grep -c 'data-certeza' index.html` → 45 (baseline para T03 y futuros slices)
- `grep -c 'reveal reveal-slide\|reveal reveal-fade' index.html` → 65 (browser debe mostrar `[Reveal] Initialized with 65 elements`)
- `grep -n 'BIOG-[0-9]\|BIOG-1[0-1]' index.html` → lista ordenada de todos los comentarios BIOG; debe mostrar 11 en secuencia sin gaps
- `grep -n 'alberdi-quote' index.html` → 2 resultados: línea ~320 (puente original) y línea ~630 (nuevo puente de cierre S03)
- `document.querySelectorAll('#rev-alberdi-formacion [data-certeza]').length` en DevTools → 11
- `document.querySelectorAll('.reveal').length` en DevTools → ≥ 65
- Si N < 65 en browser: verificar que BIOG-9/10/11 tienen `class="event-card card-hecho reveal reveal-slide"` con `grep -A1 'BIOG-9\|BIOG-10\|BIOG-11' index.html`

## Deviations

1. **Pasos 3-8 no ejecutados** — al inspeccionar `index.html` se encontró que toda la integración ya estaba aplicada (BIOG-9/10/11, puente narrativo, título y sub-nav actualizados). No se realizaron inserciones adicionales. El task se completó verificando la corrección del trabajo ya existente y documentando los resultados.

## Known Issues

- La URL del thumbnail de la imagen de Heredia (`https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Alejandro_Heredia.JPG/400px-Alejandro_Heredia.JPG`) no fue verificada haciendo una petición HTTP. Las cards de BIOG-10 (y BIOG-9 y BIOG-11) se integraron sin imágenes — lo cual es válido per el plan. Si se quiere agregar la imagen de Heredia en el futuro, verificar primero que la URL resuelve.

## Files Created/Modified

- `index.html` — BIOG-9/10/11 integradas (líneas 542–628); puente narrativo en línea 630; título sub-período y sub-nav actualizados a 1810–1838; `data-certeza` count = 45; reveal elements = 65
- `.gsd/milestones/M007/slices/S03/tasks/T02-PLAN.md` — se agregó la sección `## Observability Impact` faltante (pre-flight fix requerido)
