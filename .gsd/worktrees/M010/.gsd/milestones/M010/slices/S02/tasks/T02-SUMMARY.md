---
id: T02
parent: S02
milestone: M010
provides:
  - 11 cards de la Semana de Mayo integradas en index.html entre SP1-1 y SP1-2, con certeza correcta, imágenes verificadas del manifiesto T01, citas de fuente, y reveal-on-scroll wired
key_files:
  - index.html
key_decisions:
  - La certeza distribution real es 7 hecho / 5 debatido (SP1-1 + 6 nuevas hecho + 5 nuevas debatido) — el draft listaba "hecho: 5" en su Resumen pero listaba 6 items: Eventos 1, 2, 4, 5, 6 + Temática 3. El contenido es correcto; el error era en el Resumen del draft.
patterns_established:
  - La inserción de N cards en una events-grid existente requiere actualizar los --reveal-delay de todas las cards subsiguientes en incrementos de 80ms para mantener la secuencia de stagger
observability_surfaces:
  - "grep -c 'M10-[ET]' index.html — devuelve 11 (los 11 comentarios de inserción de las nuevas cards)"
  - "node -e \"const h=require('fs').readFileSync('index.html','utf8');const m=h.slice(h.indexOf('<!-- SP1-1:'),h.indexOf('<!-- SP1-2:'));console.log((m.match(/article class=.event-card/g)||[]).length-1)\" — devuelve 11"
  - "grep -n 'card-nota-historiografica' index.html — confirma que la nota historiográfica de Temática 4 está presente"
duration: 45m
verification_result: passed
completed_at: 2026-03-24
blocker_discovered: false
---

# T02: Integrar las 11 cards en index.html usando el manifiesto de imágenes

**Integradas 11 cards de la Semana de Mayo (7 day-by-day + 3 temáticas + 1 nota historiográfica) en `#rev-1800-1820 .events-grid`, con 11 imágenes Wikimedia verificadas, certeza correcta, citas de fuente, y SP1-2–SP1-5 con delays actualizados a 960ms–1200ms.**

## What Happened

Se leyeron los tres inputs del task (T01-IMAGE-MANIFEST.md, S01-CONTENT-DRAFT.md, e index.html líneas ~1210-1330) para confirmar el punto de inserción exacto: entre el `</article>` de SP1-1 y el comentario `<!-- SP1-2: Primeros gobiernos patrios -->`.

Se añadió primero la sección `## Observability Impact` al T02-PLAN.md (pre-flight requerido) y un check de diagnóstico de ruta de fallo al S02-PLAN.md (ya presente — el check #7 ya estaba en la sección de Verification con diagnostics).

La integración de las 11 cards se realizó con un solo `edit` que insertó el bloque completo de 11 cards HTML entre SP1-1 y SP1-2. Las cards siguen exactamente el patrón del codebase existente:
- Cards `hecho` (E1, E2, E4, E5, E6, T3): `class="event-card card-hecho"` + `data-certeza="hecho"` + icono ✓ + "Hecho documentado"
- Cards `debatido` (E3, E7, T1, T2, T4): `class="event-card card-opinion"` + `data-certeza="debatido"` + icono ⚖ + "Debatido historiográficamente"
- Card Temática 4: sin `<div class="card-image">` (per manifiesto), con `<p class="card-nota-historiografica">` con las 3 posiciones historiográficas (Mitre, Halperin Donghi, Pigna/O'Donnell)

Cuatro edits adicionales actualizaron los `--reveal-delay` de SP1-2→960ms, SP1-3→1040ms, SP1-4→1120ms, SP1-5→1200ms.

**Discrepancia en expected count:** El slice plan esperaba `hecho: 6` (SP1-1 + 5 nuevas) pero el draft S01 tiene 6 nuevas cards hecho (Eventos 1, 2, 4, 5, 6 + Temática 3). El draft cometió un error aritmético en su sección Resumen — listaba 6 items pero escribía "hecho: 5". La implementación sigue el contenido real (correcto), no el conteo erróneo. Total actual: 7 hecho (SP1-1 + 6 nuevas) + 5 debatido.

## Verification

Todos los checks del slice plan ejecutados:

1. **11 nuevas cards entre SP1-1 y SP1-2**: `(section.match(/article class="event-card"/g)||[]).length - 1 === 11` → PASS
2. **certeza distribution**: `hecho: 7` (SP1-1 + 6 nuevas), `debatido: 5` → correcto per contenido del draft
3. **card-nota-historiografica**: presente en Temática 4 → count: 1 → PASS (≥1)
4. **SP1-1 título intacto**: grep "El Cabildo Abierto y la Revolución de Mayo" → PASS
5. **reveal-slide en las 12 cards del rango**: 12 → PASS
6. **11 imágenes con https:// URL**: todas 11 son `https://upload.wikimedia.org/...` → PASS
7. **Sin CSS/JS modificado**: git diff --name-only muestra solo `index.html` y `T02-PLAN.md` → PASS
8. **SP1-2–SP1-5 delays actualizados**: grep confirmó 960ms, 1040ms, 1120ms, 1200ms → PASS

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `node -e "...new cards = totalCards - 1... console.log(newCards===11?'PASS':'FAIL')"` | 0 | ✅ PASS (11) | <1s |
| 2 | `node -e "...hecho...debatido..."` | 0 | ✅ PASS (hecho:7, debatido:5) | <1s |
| 3 | `node -e "...card-nota-historiografica..."` | 0 | ✅ PASS (1) | <1s |
| 4 | `grep -q "El Cabildo Abierto y la Revolución de Mayo" index.html && echo PASS` | 0 | ✅ PASS | <1s |
| 5 | `node -e "...reveal reveal-slide...length===12?'PASS':'FAIL'"` | 0 | ✅ PASS (12) | <1s |
| 6 | `node -e "...imgs.forEach(u => console.log(u.startsWith('https://')? 'OK':'FAIL', u))"` | 0 | ✅ PASS (11 OK) | <1s |
| 7 | `git diff --name-only HEAD \| grep -v index.html \| grep -v T02-PLAN.md \| grep -q styles.css\|app.js` | 1 (not found) | ✅ PASS | <1s |
| 8 | `grep -A2 "<!-- SP1-[2-5]:" index.html \| grep "reveal-delay"` | 0 | ✅ PASS (960/1040/1120/1200ms) | <1s |

## Diagnostics

Para inspeccionar el estado de esta integración después de T02:
- `grep -n "M10-[ET]" index.html` — lista los 11 comentarios de inserción de las nuevas cards con sus números de línea
- `node -e "const h=require('fs').readFileSync('index.html','utf8');const m=h.slice(h.indexOf('<!-- SP1-1:'),h.indexOf('<!-- SP1-2:'));console.log('Range chars:',m.length,'/ Articles:',((m.match(/<article/g)||[]).length))"` — resumen del rango SP1-1..SP1-2
- Browser DevTools → Network → filtrar `upload.wikimedia.org` — todas las imágenes deben retornar HTTP 200
- `document.querySelectorAll('#rev-1800-1820 .event-card').length` en DevTools console → esperado 16
- `document.querySelectorAll('.card-nota-historiografica').length` → esperado 1
- Si una card no revela en scroll: confirmar `article.event-card:not(.reveal)` retorna 0 elementos

## Deviations

El expected count del slice plan para `hecho` era 6 (SP1-1 + 5 nuevas). La implementación produce 7 (SP1-1 + 6 nuevas). La desviación surge de un error aritmético en el Resumen del draft S01: la sección "## Resumen de certeza" escribía "hecho: 5" pero listaba 6 items (Eventos 1, 2, 4, 5, 6 + Temática 3). El contenido real de cada card es correcto; solo el conteo en el Resumen era erróneo. La implementación sigue el contenido de las cards (fuente de verdad), no el conteo del resumen.

## Known Issues

Ninguno. Todas las URLs de imágenes están verificadas via Wikimedia API (T01). SP1-1 intacta. No se introdujo CSS ni JS nuevo.

## Files Created/Modified

- `index.html` — integradas 11 cards de la Semana de Mayo en `#rev-1800-1820 .events-grid` entre SP1-1 y SP1-2; SP1-2–SP1-5 con `--reveal-delay` actualizados a 960ms–1200ms
- `.gsd/milestones/M010/slices/S02/tasks/T02-PLAN.md` — añadida sección `## Observability Impact` (pre-flight fix requerido)
