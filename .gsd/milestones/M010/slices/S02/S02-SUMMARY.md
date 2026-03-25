---
id: S02
parent: M010
milestone: M010
provides:
  - 11 cards de la Semana de Mayo integradas en index.html dentro de #rev-1800-1820, entre SP1-1 y SP1-2
  - Manifiesto de imágenes verificadas via Wikimedia API (T01-IMAGE-MANIFEST.md)
  - Stagger delays actualizados para SP1-2–SP1-5 (960ms–1200ms) para mantener secuencia coherente
requires:
  - slice: S01
    provides: Draft verificado con 7 días clave + 4 cards temáticas, fuentes identificadas, certeza asignada
key_files:
  - index.html
  - .gsd/milestones/M010/slices/S02/tasks/T01-IMAGE-MANIFEST.md
key_decisions:
  - Evento 3 (22 mayo) usa Acta del 22 de mayo (documento primario) en lugar de Cabildo_abierto.jpg (Subercaseaux) — evita triple duplicación visual con SP1-1 y Temática 2
  - Temática 4 (debate historiográfico) no tiene bloque card-image — ninguna imagen apropiada disponible sin fair use; fallback = omitir el div completamente
  - Certeza distribution real es 7 hecho / 5 debatido, no 6/5 como estimaba el plan — el draft S01 tenía error aritmético en su Resumen (listaba 6 items marcados hecho pero escribía "hecho: 5")
  - SP1-2–SP1-5 recibieron delays actualizados a 960/1040/1120/1200ms para mantener stagger coherente tras insertar 11 cards nuevas
patterns_established:
  - Búsqueda de retratos históricos en Commons via srsearch con términos "retrato" + nombre reduce false positives de PDFs
  - Category:May_Revolution en Commons contiene actas históricas como imágenes JPEG directas
  - Acuarelas Vidal (1817–1820) son la fuente PD más apropiada para imágenes del espacio urbano de Buenos Aires circa 1810
  - Cuando N cards se insertan en una events-grid existente, todos los --reveal-delay de las cards subsiguientes deben actualizarse en incrementos de 80ms
observability_surfaces:
  - "grep -n 'M10-[ET]' index.html — lista los 11 comentarios de inserción de las cards nuevas con número de línea"
  - "node -e \"const h=require('fs').readFileSync('index.html','utf8');const m=h.slice(h.indexOf('<!-- SP1-1:'),h.indexOf('<!-- SP1-2:'));console.log((m.match(/article class=.event-card/g)||[]).length-1)\" — devuelve 11"
  - "grep -n 'card-nota-historiografica' index.html — confirma nota historiográfica de Temática 4 presente"
  - "document.querySelectorAll('#rev-1800-1820 .event-card').length en DevTools — esperado 16"
drill_down_paths:
  - .gsd/milestones/M010/slices/S02/tasks/T01-SUMMARY.md
  - .gsd/milestones/M010/slices/S02/tasks/T02-SUMMARY.md
duration: ~80m (T01: ~35m, T02: ~45m)
verification_result: passed
completed_at: 2026-03-24
---

# S02: Integración HTML — cards en index.html

**11 cards de la Semana de Mayo (7 day-by-day + 3 temáticas + 1 nota historiográfica) integradas en `#rev-1800-1820 .events-grid` entre SP1-1 y SP1-2, con imágenes Wikimedia verificadas via API, certeza correcta, citas de fuente, y reveal-on-scroll wired sin CSS ni JS nuevo.**

## What Happened

### T01 — Verificación de imágenes

T01 ejecutó el protocolo de verificación Wikimedia API para las 11 cards del draft S01. Se consultó `?action=query&titles=File:FILENAME&prop=imageinfo&iiprop=url&iiurlwidth=500` por cada candidato. Resultado: 10 de 11 cards con URL confirmada; 1 card (Temática 4 — debate historiográfico) sin imagen disponible por ausencia de imágenes de dominio público apropiadas (portadas de libro requieren fair use).

Decisión de coherencia visual clave: Evento 3 (22 mayo) recibió `Acta_del_22_de_mayo_de_1810.jpg` en lugar de `Cabildo_abierto.jpg` (Subercaseaux). SP1-1 ya usa Subercaseaux; Temática 2 también lo reutiliza — una tercera aparición en Evento 3 crearía saturación visual. El acta del Cabildo es además el documento primario más coherente para una card sobre el debate y la votación.

Se descubrió que `Acta_capitular_1810.jpg` (candidato original del draft) no existe en Commons. La búsqueda via `Category:May_Revolution` encontró el acta real. Para French y Berutti (sin candidato en el draft), la búsqueda `srsearch=Domingo French retrato srnamespace=6` encontró `Domingo_French_(retrato).jpg`.

T01 también añadió la sección `## Observability / Diagnostics` al S02-PLAN.md como pre-flight requirement.

### T02 — Integración HTML

T02 consumió el manifiesto T01 y el draft S01-CONTENT-DRAFT.md para integrar las 11 cards con un único `edit` sobre `index.html`. Las cards siguen exactamente los patrones del codebase:

- **6 cards hecho** (E1, E2, E4, E5, E6, T3): `class="event-card card-hecho"` + `data-certeza="hecho"` + icono ✓ + label "Hecho documentado"
- **5 cards debatido** (E3, E7, T1, T2, T4): `class="event-card card-opinion"` + `data-certeza="debatido"` + icono ⚖ + label "Debatido historiográficamente"
- **Card Temática 4**: sin `<div class="card-image">` (per manifiesto), con `<p class="card-nota-historiografica">` que presenta las 3 posiciones historiográficas (Mitre, Halperin Donghi, Pigna/O'Donnell)
- **Todos los 12 artículos del rango** (SP1-1 + 11 nuevas) tienen `class="reveal reveal-slide"` y `style="--reveal-delay: Nms"`

Cuatro edits adicionales actualizaron los `--reveal-delay` de SP1-2→960ms, SP1-3→1040ms, SP1-4→1120ms, SP1-5→1200ms para mantener la secuencia de stagger coherente después de las 11 cards nuevas.

**Discrepancia aritmética del draft:** El Resumen de certeza de S01-CONTENT-DRAFT.md decía "hecho: 5" pero listaba 6 items. T02 siguió el contenido real de cada card (fuente de verdad), no el conteo erróneo. Total final: 7 hecho (SP1-1 + 6 nuevas) + 5 debatido.

## Verification

Todos los checks del slice plan ejecutados y pasados:

| # | Check | Resultado |
|---|-------|-----------|
| 1 | 11 nuevas cards entre SP1-1 y SP1-2 | ✅ PASS (11) |
| 2 | certeza distribution: hecho:7, debatido:5 | ✅ PASS |
| 3 | card-nota-historiografica presente | ✅ PASS (count: 1) |
| 4 | Todos los img src con https:// | ✅ PASS (11 URLs, todas `https://upload.wikimedia.org/...`) |
| 5 | SP1-1 título intacto | ✅ PASS |
| 6 | Sin CSS ni JS nuevo | ✅ PASS |
| 7 | reveal-slide en los 12 artículos del rango | ✅ PASS (12) |
| 8 | SP1-2–SP1-5 delays: 960/1040/1120/1200ms | ✅ PASS |
| 9 | 12 `<footer class="card-source">` en el rango | ✅ PASS |
| 10 | 12 `card-certeza-indicator` en el rango | ✅ PASS |
| 11 | 12 `event-card__year` en el rango | ✅ PASS |

## New Requirements Surfaced

- Ninguno nuevo. R012 (rigor histórico) y R013 (certeza) continúan validados por la distribución hecho/debatido correcta.

## Deviations

**Certeza distribution: 7 hecho / 5 debatido (plan esperaba 6/5).** El slice plan decía "hecho: 6 (SP1-1 + 5 nuevas)" pero el draft S01 tenía un error aritmético en su Resumen — listaba 6 items como hecho (Eventos 1, 2, 4, 5, 6 + Temática 3) pero escribía "hecho: 5". T02 siguió el contenido real de las cards, no el conteo erróneo del Resumen. La desviación no es un defecto — el contenido es correcto.

## Known Limitations

- **Imágenes duplicadas:** Eventos 1 y 4 comparten retrato de Cisneros; Eventos 6 y Temática 3 comparten retrato de Saavedra. Aceptable: el personaje es el mismo, no hay alternativa verificada disponible en Commons.
- **Temática 4 sin imagen:** Sin bloque `<div class="card-image">`. La card es visualmente más austera que las demás, pero no hay imagen de dominio público apropiada para el "debate historiográfico" como concepto.
- **Cisneros y Saavedra son imágenes pequeñas** (448px y 362px respectivamente) — la API devolvió URL directa sin thumb. Se usan con `width="100%"` para escalar correctamente al contenedor, per KNOWLEDGE.md.

## Follow-ups

- Ninguno bloqueante. Las URLs de imágenes pequeñas (Cisneros, Saavedra, French) deben mantenerse sin modificación — son las URLs correctas de la API para imágenes menores a 500px.

## Files Created/Modified

- `index.html` — 11 cards de la Semana de Mayo integradas entre SP1-1 y SP1-2; SP1-2–SP1-5 con `--reveal-delay` actualizados
- `.gsd/milestones/M010/slices/S02/tasks/T01-IMAGE-MANIFEST.md` — manifiesto nuevo con 11 entradas verificadas via Wikimedia API
- `.gsd/milestones/M010/slices/S02/tasks/T02-PLAN.md` — sección `## Observability Impact` añadida (pre-flight fix)
- `.gsd/milestones/M010/slices/S02/S02-PLAN.md` — sección `## Observability / Diagnostics` añadida + check diagnóstico #7

## Forward Intelligence

### What the next slice should know
- Las cards de la Semana de Mayo tienen IDs de comentario `<!-- M10-E1: -->` a `<!-- M10-E7: -->` y `<!-- M10-T1: -->` a `<!-- M10-T4: -->`. Estos sirven como anclas de búsqueda en el archivo.
- El `events-grid` de `#rev-1800-1820` ahora tiene 16 cards (SP1-1 a SP1-5 + las 11 nuevas). El `--reveal-delay` de SP1-5 está en 1200ms — la próxima inserción en cualquier sub-período de este bloque debe calcular desde ese máximo más 80ms.
- La certeza distribution de toda la sección `#rev-1800-1820` es ahora: 7 hecho + 5 debatido en el sub-período sp1 (1810); el resto de los sub-períodos sp2–sp4 mantienen su distribución preexistente.

### What's fragile
- **URLs de Cisneros y Saavedra sin `/thumb/`** — son URLs directas del archivo original pequeño. Si en el futuro alguien "actualiza" estas URLs para forzar un thumb path, las imágenes se rompen. La ausencia de `/thumb/` es correcta, no un error.
- **Stagger delay de SP1-2 a SP1-5 ajustado a 960–1200ms** — si futuras cards se insertan entre SP1-1 y SP1-2 en otro slice, habrá que volver a actualizar estos delays.

### Authoritative diagnostics
- `grep -n "M10-[ET]" index.html` — lista los 11 comentarios con números de línea exactos; primer acceso confiable antes de cualquier edición
- `node -e "const h=require('fs').readFileSync('index.html','utf8');const m=h.slice(h.indexOf('<!-- SP1-1:'),h.indexOf('<!-- SP1-2:'));console.log('Range chars:',m.length,'Articles:',((m.match(/<article/g)||[]).length))"` — resumen del rango en una línea

### What assumptions changed
- **"El manifiesto necesitaría 8 imágenes"** (estimación del plan) → En realidad 11 cards necesitaban cobertura de imagen: se encontraron URLs para 10, con 1 fallback explícito "sin imagen". El número de imágenes únicas es 8 (Cisneros, Belgrano, Acta 22 mayo, Plaza Victoria, Saavedra, Moreno, French, Cabildo_abierto) porque Cisneros y Saavedra aparecen dos veces cada uno.
- **"hecho: 5 nuevas"** (estimación del draft S01) → 6 nuevas hecho. El Resumen del draft tenía un error aritmético.
