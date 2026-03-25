---
id: T01
parent: S03
milestone: M020
provides:
  - Marcadores 1806 (Invasión) y 1807 (Defensa) en revolucion-timeline con posiciones 10.00% y 11.67%
  - CSS stagger actualizado de 10 a 12 entradas (nth-child 2–13) con delays cronológicos 0.05s–2.75s
key_files:
  - index.html
  - styles.css
key_decisions:
  - nth-child(2)=1806 y nth-child(3)=1807 al inicio del track; marcadores existentes renumerados +2 (4–13)
  - Marcador 1807 usa clase --above para evitar solapamiento de etiqueta con 1806 (mismo patrón que 1820, 1829, 1838)
patterns_established:
  - Al agregar marcadores al inicio de un timeline CSS stagger, basta renumerar los selectores nth-child sin cambiar los delay values de los marcadores existentes
observability_surfaces:
  - "node -e \"const h=require('fs').readFileSync('index.html','utf8'); const t=(h.match(/revolucion-timeline__track[\\s\\S]*?<!-- \\/.revolucion-timeline__track/)||[''])[0]; console.log('markers:', (t.match(/revolucion-timeline__marker/g)||[]).length);\""
  - "DevTools: document.querySelectorAll('.revolucion-timeline__marker').length → 12"
  - "DevTools: getComputedStyle(document.querySelectorAll('.revolucion-timeline__marker')[0]).getPropertyValue('--marker-pos') → ' 10.00%'"
duration: 20m
verification_result: passed
completed_at: 2026-03-25
blocker_discovered: false
---

# T01: Agregar marcadores 1806 y 1807 al revolucion-timeline

**Insertados marcadores 1806 (Invasión) y 1807 (Defensa) en el revolucion-timeline con posiciones 10.00%/11.67% y actualizado el CSS stagger de 10 a 12 entradas (nth-child 2–13).**

## What Happened

Se localizó el `revolucion-timeline__track` en `index.html` (línea 2963) y se insertaron dos nuevos marcadores `div.revolucion-timeline__marker` inmediatamente después del `div.revolucion-timeline__progress`, antes del comentario `<!-- Marker 1: 1810`:

- **Marker 0a: 1806** — `--marker-pos: 10.00%`, label below (clase base), texto "1806 / Invasión"
- **Marker 0b: 1807** — `--marker-pos: 11.67%`, label above (clase `revolucion-timeline__marker--above`), texto "1807 / Defensa"

En `styles.css` se reemplazó el bloque de stagger que antes cubría nth-child(2)–(11) (10 markers, 20 reglas) por un bloque que cubre nth-child(2)–(13) (12 markers, 24 reglas):
- Dot delays: 0.05s (1806), 0.20s (1807), 0.45s (1810) … 2.55s (1860)
- Label delays (dot + 0.20s): 0.25s (1806), 0.40s (1807), 0.65s (1810) … 2.75s (1860)
- Los delays de los 10 marcadores existentes 1810–1860 son idénticos a antes — solo cambió su número de selector.

El comentario del bloque CSS fue actualizado: "10 markers spread over 0.15s–2.3s" → "12 markers spread over 0.05s–2.55s".

También se aplicaron los pre-flight fixes requeridos: se añadió un comando diagnóstico de failure state a S03-PLAN.md y una sección `## Observability Impact` a T01-PLAN.md.

## Verification

Todos los checks de la tarea y del slice pasaron:

- `grep -c "revolucion-timeline__marker" index.html` → **12** (≥12 ✅)
- `grep "marker-pos: 10.00\|marker-pos: 11.67" index.html` → muestra las 2 nuevas líneas ✅
- CSS max nth-child → **13** ✅
- V1 (marcadores 1806/1807 en HTML): PASS ✅
- V2 (CSS nth-child(13) presente): PASS ✅
- V3 (conector narrativo entre invasiones y alberdi-formacion): PASS (pre-existente, chars=77050) ✅
- V4 (sintaxis JS): PASS ✅
- V5 (certeza=18, notas=4 — sin regresión): PASS ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| V1 | `node -e "... has1806/has1807 assert ..."` | 0 | ✅ pass | <1s |
| V2 | `node -e "... max nth-child assert(>=13) ..."` | 0 | ✅ pass | <1s |
| V3 | `node -e "... connector between sections ..."` | 0 | ✅ pass | <1s |
| V4 | `node -e "new Function(app.js) ..."` | 0 | ✅ pass | <1s |
| V5 | `node -e "... certeza>=18 && notas>=4 ..."` | 0 | ✅ pass | <1s |
| T-a | `grep -c "revolucion-timeline__marker" index.html` | 0 | ✅ 12 | <1s |
| T-b | `grep "marker-pos: 10.00\|marker-pos: 11.67" index.html` | 0 | ✅ 2 líneas | <1s |

## Diagnostics

- `document.querySelectorAll('.revolucion-timeline__marker').length` → debe retornar **12** en DevTools
- `getComputedStyle(document.querySelectorAll('.revolucion-timeline__marker')[0]).getPropertyValue('--marker-pos')` → `' 10.00%'` (primer marcador = 1806)
- Si los marcadores no aparecen al hacer scroll: verificar que `div.revolucion-timeline` tiene clases `reveal reveal-fade` (sin cambios en esta tarea)
- Failure state: si count < 12, el marcador fue insertado fuera del track; si max nth-child < 13, los marcadores 1852 y 1860 quedarán con opacity:0 permanente

## Deviations

none — la implementación siguió el plan exactamente. El bloque de label stagger (líneas 1761–1791) tuvo una discrepancia menor en la lectura inicial (parecía tener un typo `slovion` en nth-child(10)) que al inspeccionar no existía en el archivo real; el reemplazo procedió sin complicaciones.

## Known Issues

none

## Files Created/Modified

- `index.html` — 2 nuevos marcadores (1806, 1807) insertados en `revolucion-timeline__track` antes de Marker 1: 1810
- `styles.css` — bloque stagger `revolucion-timeline__marker:nth-child` expandido de 10 (2–11) a 12 entradas (2–13), dot y label rules
- `.gsd/milestones/M020/slices/S03/S03-PLAN.md` — añadido comando diagnóstico de failure state en sección Observability (pre-flight fix)
- `.gsd/milestones/M020/slices/S03/tasks/T01-PLAN.md` — añadida sección `## Observability Impact` (pre-flight fix)
