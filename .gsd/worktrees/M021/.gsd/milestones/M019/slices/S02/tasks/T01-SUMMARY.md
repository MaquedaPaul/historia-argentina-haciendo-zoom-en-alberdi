---
id: T01
parent: S02
milestone: M019
provides:
  - 4 cards card-hecho (M019-1..4) insertadas en index.html dentro de #rev-1852-1860 antes de SP4-1
  - Stagger SP4-1..5 incrementados en 320ms (320ms → 640ms)
key_files:
  - index.html
key_decisions:
  - Reutilizar imágenes ya presentes en index.html (Mitre Manzoni 1861 para Card 1, Urquiza retrato para Cards 2 y 3, mapa Argentina/BsAs para Card 4) en lugar de buscar URLs nuevas — sin riesgo de 404 y coherente con las imágenes del grid
patterns_established:
  - card-hecho con blockquote.card-opinion__quote funciona combinando ambas clases en un mismo artículo (patrón ya establecido en SP4-1)
  - Editar delays SP4 con el comentario de card como prefijo de oldText garantiza coincidencia unívoca aunque el valor del delay sea genérico
observability_surfaces:
  - grep -c "M019-[1-4]" index.html → 4 confirma presencia
  - grep -A3 "SP4-1" index.html | grep "reveal-delay" → 320ms confirma stagger
  - Browser DevTools Elements → #rev-1852-1860 .events-grid para inspeccionar orden visual
duration: 15m
verification_result: passed
completed_at: 2026-03-25
blocker_discovered: false
---

# T01: Insertar 4 cards M019 en index.html y ajustar stagger SP4

**Insertadas las 4 cards card-hecho (Caseros, Acuerdo de San Nicolás, Disolución de la Legislatura, Revolución del 11 de Septiembre) en #rev-1852-1860 antes de SP4-1, y actualizados los 5 delays de SP4 en +320ms cada uno.**

## What Happened

Leí `S01-CONTENT-DRAFT.md` para extraer excerpts, citas textuales (Cards 2 y 3), fuentes e indicaciones de imagen. Luego leí las líneas ~2270–2430 de `index.html` para confirmar el punto de inserción exacto (antes del comentario `<!-- SP4-1: Bases de Alberdi — OPINIÓN -->`) y las URLs de imagen ya disponibles en el archivo.

Inserté los 4 bloques HTML en un solo `edit` usando el comentario SP4-1 como ancla de oldText. Luego hice 5 edits individuales para actualizar los delays de SP4-1..5, usando en cada uno el comentario de la card como prefijo de oldText para garantizar coincidencia unívoca.

Correcciones aplicadas vs. el draft de S01:
- `data-certeza=[hecho]` en el ejemplo del draft → `data-certeza="hecho"` en el HTML real (obligatorio según el plan)
- Cards 2 y 3 llevan `<blockquote class="card-opinion__quote">` con cita + `<footer class="card-opinion__attribution">` siguiendo el patrón de SP4-1

## Verification

Ejecuté todos los checks del plan sobre el archivo modificado:

1. `grep -c "M019-[1-4]" index.html` → **4** ✅
2. `grep -c 'data-certeza=\[hecho\]' index.html` → **0** ✅
3. `grep -A3 "SP4-1" index.html | grep "reveal-delay"` → `--reveal-delay: 320ms` ✅
4. `grep -A3 "SP4-5" index.html | grep "reveal-delay"` → `--reveal-delay: 640ms` ✅
5. `node -e "...syntax check..."` → **OK** ✅
6. `grep -n 'blockquote class="card-opinion__quote"' index.html` confirmó blockquotes en líneas 2321 (M019-2) y 2345 (M019-3) ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c "M019-[1-4]" index.html` | 0 | ✅ pass (→ 4) | <1s |
| 2 | `grep -c 'data-certeza=\[hecho\]' index.html` | 1 (0 matches) | ✅ pass (→ 0) | <1s |
| 3 | `grep -A3 "SP4-1" index.html \| grep "reveal-delay"` | 0 | ✅ pass (→ 320ms) | <1s |
| 4 | `grep -A3 "SP4-5" index.html \| grep "reveal-delay"` | 0 | ✅ pass (→ 640ms) | <1s |
| 5 | node JS syntax check on app.js | 0 | ✅ pass (→ OK) | <1s |

## Diagnostics

- **Presencia cards:** `grep -c "M019-[1-4]" index.html` → 4
- **Orden visual:** `grep -n "M019-[1-4]\|SP4-[1-5]" index.html` muestra comentarios en orden cronológico correcto
- **Stagger completo:** `grep -n "reveal-delay" index.html | grep -A0 ""` (filtrar por rango de líneas 2287–2480)
- **Reveal en browser:** DevTools → Elements → buscar `#rev-1852-1860` → confirmar `.is-visible` se agrega al hacer scroll
- **Imágenes:** Network tab → filtrar por `wikimedia` para ver si las URLs de imagen responden 200

## Deviations

Ninguna. El plan fue seguido exactamente. Las imágenes reutilizadas ya estaban en el archivo (sin búsqueda adicional), conforme a las instrucciones del plan.

## Known Issues

Ninguno.

## Files Created/Modified

- `index.html` — 4 cards M019 insertadas en líneas 2287–2380 (Caseros, Acuerdo S. Nicolás, Disolución Legislatura, Revolución 11/Sept); delays SP4-1..5 actualizados a 320ms, 400ms, 480ms, 560ms, 640ms respectivamente
- `.gsd/milestones/M019/slices/S02/S02-PLAN.md` — sección `## Observability / Diagnostics` añadida (requerida por pre-flight checks)
