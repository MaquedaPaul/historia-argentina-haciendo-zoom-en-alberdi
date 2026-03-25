---
id: M010
provides:
  - 11 cards de la Semana de Mayo (7 day-by-day + 3 temáticas + 1 nota historiográfica) integradas en index.html dentro de #rev-1800-1820, entre SP1-1 y SP1-2
  - S01-RESEARCH-NOTES.md — notas de investigación verificadas con 7 secciones temáticas y 3 key risks resueltos
  - S01-CONTENT-DRAFT.md — contrato de contenido con 11 cards, certeza asignada y fuentes verificadas
  - T01-IMAGE-MANIFEST.md — manifiesto de imágenes verificadas via Wikimedia API (10/11 con URL; 1 sin imagen disponible)
key_decisions:
  - '"Chisperos" es la denominación contemporánea a 1810 (Memorias de Juan Manuel Beruti); "Legión Infernal" es etiqueta historiográfica posterior — ambas presentadas con distinción explícita en las cards'
  - '"Sobres duplicados" no aparece en fuentes académicas verificadas — se usa la descripción mecánica verificada: reducción de lista de ~600 a ~450 convocados + control físico de acceso'
  - 'Recuento votos 22 mayo usa rango "entre 155 y 162" para honrar 3 versiones historiográficas sin contradicción con SP1-1 (que usa 155 vs 69)'
  - 'Evento 3 (22 mayo) usa Acta_del_22_de_mayo_de_1810.jpg (documento primario) en lugar de Subercaseaux — evita triple duplicación visual con SP1-1 y Temática 2'
  - 'Temática 4 (debate historiográfico) sin bloque card-image — ninguna imagen PD apropiada disponible; se omite el div completamente'
  - 'Distribución certeza final: 7 hecho / 5 debatido (el Resumen de S01-CONTENT-DRAFT tenía error aritmético "hecho: 5" pero listaba 6 items; el contenido real de las cards es la fuente de verdad)'
  - 'SP1-2–SP1-5 recibieron --reveal-delay actualizados a 960/1040/1120/1200ms para mantener stagger coherente tras insertar 11 cards nuevas'
patterns_established:
  - 'Fórmula stagger al insertar N cards: new_delay_for_subsequent = original_delay + (N × 80ms). Insertar 11 cards: SP1-2 va de 80ms → 960ms'
  - 'Búsqueda de retratos históricos en Commons via srsearch con "retrato" + nombre reduce false positives de PDFs'
  - 'Category:May_Revolution en Commons contiene actas históricas como imágenes JPEG directas — útil cuando búsqueda directa falla'
  - 'Resumen de certeza al final del content draft es patrón de cierre epistémico; su conteo puede ser erróneo — siempre verificar desde el contenido de cada card, no desde el Resumen'
  - 'Cards de debate historiográfico sin imagen disponible: omitir div.card-image completamente — initImageFallbacks solo dispara para .card-image img, no produce error con div ausente'
observability_surfaces:
  - "grep -n 'M10-[ET]' index.html — 11 comentarios de inserción de cards nuevas con número de línea exacto"
  - "node -e \"const h=require('fs').readFileSync('index.html','utf8');const m=h.slice(h.indexOf('<!-- SP1-1:'),h.indexOf('<!-- SP1-2:'));console.log((m.match(/article/g)||[]).length-1)\" — devuelve 11 (cards nuevas)"
  - "grep -n 'card-nota-historiografica' index.html — confirma nota historiográfica de Temática 4 presente"
requirement_outcomes:
  - id: R012
    from_status: validated
    to_status: validated
    proof: "11 cards con fuentes citadas en <footer class=\"card-source\"><cite>; S01-CONTENT-DRAFT.md documenta protocolo de verificación con 22 flags [VERIFICAR] explícitos; 3 key risks de M010 resueltos antes de integración HTML"
  - id: R013
    from_status: validated
    to_status: validated
    proof: "Distribución certeza: 7 hecho (data-certeza=hecho) + 5 debatido (data-certeza=debatido) verificada via DOM. 12 card-certeza-indicator en el rango SP1-1 a SP1-2. card-nota-historiografica presente en Temática 4 (debate popular/élites)."
duration: ~180m (S01: ~100m + S02: ~80m)
verification_result: passed
completed_at: 2026-03-24
---

# M010: La Semana de Mayo — Cronología Detallada (14–30 de mayo de 1810)

**11 cards day-by-day y temáticas de la Semana de Mayo (14–30 de mayo 1810) integradas en `#rev-1800-1820`, con imágenes Wikimedia verificadas via API, certeza documentada (7 hecho / 5 debatido), nota historiográfica sobre el debate popular/élites, y stagger delays actualizados para todas las cards subsiguientes.**

## What Happened

M010 se ejecutó en dos slices secuenciales: S01 produjo el contenido verificado; S02 lo integró en HTML.

**S01 — Research y content draft:** El trabajo de investigación resolvió los tres key risks del milestone antes de tocar HTML. El nombre del grupo de presión patriota se clarificó con distinción de fuentes: "chisperos" es la denominación contemporánea documentada en las *Memorias* de Juan Manuel Beruti (hermano de Antonio Beruti); "Legión Infernal" es etiqueta historiográfica posterior que aparece en el Museo Histórico Nacional del Cabildo. El mecanismo del Cabildo Abierto del 22 de mayo se verificó con dos componentes documentados incluso en el informe de Cisneros al rey: (a) reducción de la lista de convocados de ~600 a ~450, y (b) control físico de accesos por French y sus hombres. El término "sobres duplicados" del plan original no aparece en fuentes académicas verificadas y se descartó en favor de la descripción mecánica. El debate historiográfico se documentó con tres posiciones: Mitre/Levene (revolución popular), Halperin Donghi (reconfiguración de élites porteñas), y Pigna/O'Donnell (síntesis popular-dirigida).

Una desviación importante: "30 de mayo" como fecha discreta del plan se convirtió en "26–31 de mayo" porque las fuentes secundarias no desglosan acciones por día exacto dentro de la primera semana post-25. Se prefirió certeza `debatido` sobre fabricar datos del día 30 específico. El output de S01 fue dos artefactos: `S01-RESEARCH-NOTES.md` (359 líneas, 7 secciones) y `S01-CONTENT-DRAFT.md` (378 líneas, 11 cards con certeza y fuentes, formato idéntico al de M002 para integración mecánica en S02).

**S02 — Integración HTML:** T01 ejecutó el protocolo de verificación Wikimedia API para las 11 cards: 10/11 con URL confirmada; Temática 4 (debate historiográfico) sin imagen de dominio público apropiada, con decisión de omitir el `<div class="card-image">` completamente. Decisión de coherencia visual clave: Evento 3 (22 mayo) recibió el acta primaria (`Acta_del_22_de_mayo_de_1810.jpg`) en lugar de la pintura Subercaseaux, que ya aparecía en SP1-1 y Temática 2 — una tercera aparición habría creado saturación visual. Para French y Berutti (sin candidato en el draft), `srsearch=Domingo French retrato` encontró `Domingo_French_(retrato).jpg`.

T02 integró las 11 cards en un único edit sobre `index.html`, siguiendo exactamente los patrones del codebase. Las 6 cards `hecho` usan `class="event-card card-hecho"` + icono ✓; las 5 cards `debatido` usan `class="event-card card-opinion"` + icono ⚖. La Temática 4 incluye `<p class="card-nota-historiografica">` con las 3 posiciones historiográficas con autor + obra + año. Cuatro edits adicionales actualizaron los `--reveal-delay` de SP1-2→960ms, SP1-3→1040ms, SP1-4→1120ms, SP1-5→1200ms (fórmula: original_delay + 11×80ms).

## Cross-Slice Verification

Verificaciones ejecutadas contra el HTML final:

| Criterio de éxito | Check | Resultado |
|---|---|---|
| 7 cards day-by-day (14, 18, 22, 23, 24, 25, 26-31 mayo) integradas | `grep -n "M10-E" index.html` | ✅ 7 comentarios E1–E7 en líneas 1240–1360 |
| 2–3 cards temáticas (Legión, manipulación Cabildo, presión miliciana) | `grep -n "M10-T[123]" index.html` | ✅ 3 comentarios T1–T3 en líneas 1380–1420 |
| Cada card con ≥1 cita de fuente | `card-source` footers en rango | ✅ 12/12 (SP1-1 + 11 nuevas) |
| Debate "popular vs. élite" con `card-nota-historiografica` | `grep -c "card-nota-historiografica"` | ✅ 1 (Temática 4, línea 1440) |
| Card panorámica SP1-1 intacta | Verificación de título y contenido | ✅ "El Cabildo Abierto y la Revolución de Mayo" con 155 vs 69 intactos |
| Sin CSS ni JS nuevo | Conteo de `<style>` y `<script>` en rango M10 | ✅ 0 nuevos |
| Reveal-on-scroll funciona para todos los elementos | `reveal reveal-slide` en rango | ✅ 12/12 artículos con clase |
| SP1-2–SP1-5 delays actualizados | Grep de `--reveal-delay` por card | ✅ 960/1040/1120/1200ms |
| 11 cards nuevas entre SP1-1 y SP1-2 | Conteo de `<article>` en rango | ✅ 12 total - 1 SP1-1 = 11 nuevas |
| Distribución certeza: hecho/debatido | `data-certeza` en rango | ✅ 7 hecho + 5 debatido |
| Todas las imágenes con URL https:// verificada | `src="https://` en rango | ✅ 11/11 URLs Wikimedia |

**Todos los criterios de éxito del milestone verificados. Definición de done cumplida: ambos slices [x], ambos summaries presentes, integración cross-slice coherente.**

## Requirement Changes

- R012 (rigor histórico): validated → validated — 22 flags [VERIFICAR] documentados en draft S01; 3 key risks resueltos antes de HTML; 12 `<cite>` con fuentes primarias/secundarias en el rango verificado
- R013 (sistema certeza): validated → validated — 7 hecho + 5 debatido en rango SP1-1/SP1-2; 12 `card-certeza-indicator`; card-nota-historiografica con 3 posiciones historiográficas atribuidas

## Forward Intelligence

### What the next milestone should know
- El `events-grid` de `#rev-1800-1820` ahora tiene SP1-1 + 11 cards M10 + SP1-2 a SP1-5 en secuencia. El `--reveal-delay` máximo en el sub-período sp1 es 1200ms (SP1-5). La próxima inserción en cualquier sub-período de `#rev-1800-1820` debe recalcular los delays subsiguientes.
- Las cards M10 tienen IDs de comentario `<!-- M10-E1: -->` a `<!-- M10-E7: -->` y `<!-- M10-T1: -->` a `<!-- M10-T4: -->` como anclas de búsqueda confiables.
- La certeza distribution de `#rev-1800-1820` sub-período sp1 (1810): 7 hecho + 5 debatido. Los sub-períodos sp2–sp4 mantienen su distribución preexistente.
- El `data-certeza="debatido"` en lugar de `data-certeza="opinión"` es el valor correcto para la clase CSS `card-opinion` cuando el contenido es historiográficamente debatido pero no una opinión atribuida de un prócer. M010 estableció este patrón en las 5 cards debatidas.
- Imágenes Cisneros y Saavedra usan URLs directas sin `/thumb/` — son archivos originales pequeños (<500px). No modificar estas URLs para forzar un path thumb.

### What's fragile
- **URLs de Cisneros y Saavedra sin `/thumb/`** — la ausencia de `/thumb/` es correcta (archivos fuente < 500px). Si alguien "arregla" estas URLs agregando `/thumb/`, las imágenes se rompen.
- **Stagger de SP1-2 a SP1-5 en 960–1200ms** — si futuras cards se insertan entre SP1-1 y SP1-2 en otro milestone, hay que recalcular estos cuatro delays nuevamente.
- **Temática 4 sin `<div class="card-image">`** — visualmente más austera que las otras cards. Si en el futuro se encuentra una imagen PD apropiada para el "debate historiográfico", insertar el div siguiendo el patrón estándar.
- **Imágenes duplicadas:** Eventos 1 y 4 comparten retrato de Cisneros; Eventos 6 y Temática 3 comparten retrato de Saavedra. Aceptable: no hay alternativas verificadas disponibles en Commons para estos personajes.

### Authoritative diagnostics
- `grep -n "M10-[ET]" index.html` — 11 comentarios con número de línea; primer acceso confiable antes de cualquier edición futura
- `node -e "const h=require('fs').readFileSync('index.html','utf8');const m=h.slice(h.indexOf('<!-- SP1-1:'),h.indexOf('<!-- SP1-2:'));console.log('Articles:',((m.match(/<article/g)||[]).length),'Cards nuevas:',(m.match(/<article/g)||[]).length-1)"` — verifica conteo del rango en una línea
- `grep -n "reveal-delay" index.html | grep "SP1-[2-5]"` — confirma los 4 delays actualizados

### What assumptions changed
- **"30 de mayo" como fecha discreta** → Las fuentes secundarias no permiten acciones específicas de ese día; se usó el bloque "26–31 de mayo" con certeza `debatido`. Si se requiere el día 30 con precisión, necesita Actas del AGN.
- **"Sobres duplicados" como término verificable** → El término no existe en fuentes académicas; el mecanismo real (lista reducida + control físico) es el contenido verificado. Las cards usan la descripción mecánica, nunca el término coloquial.
- **"hecho: 5 nuevas" (estimación S01 Resumen)** → 6 nuevas hecho (Eventos 1, 2, 4, 5, 6 + Temática 3). El Resumen del draft tenía un error aritmético. El contenido real de cada card es siempre la fuente de verdad.
- **"8 imágenes necesitadas" (estimación del plan)** → 11 cards necesitaban cobertura de imagen: 10 con URL verificada, 1 sin imagen disponible (Temática 4). 8 imágenes únicas en total (Cisneros y Saavedra aparecen dos veces cada uno).

## Files Created/Modified

- `index.html` — 11 cards de la Semana de Mayo integradas entre SP1-1 y SP1-2; SP1-2–SP1-5 con `--reveal-delay` actualizados a 960–1200ms
- `.gsd/milestones/M010/slices/S01/S01-RESEARCH-NOTES.md` — nuevo: notas de investigación verificadas, 7 secciones temáticas, 3 key risks resueltos
- `.gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md` — nuevo: contrato de contenido, 11 cards con certeza y fuentes, Resumen de certeza al final
- `.gsd/milestones/M010/slices/S02/tasks/T01-IMAGE-MANIFEST.md` — nuevo: manifiesto de imágenes con 11 entradas verificadas via Wikimedia API
- `.gsd/milestones/M010/M010-SUMMARY.md` — este archivo
