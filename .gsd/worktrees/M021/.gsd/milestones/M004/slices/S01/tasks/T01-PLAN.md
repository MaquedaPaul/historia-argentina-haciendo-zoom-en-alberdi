---
estimated_steps: 8
estimated_files: 1
---

# T01: Content draft — 7 verified events with certeza and Alberdi narrative

**Slice:** S01 — Contenido verificado + imágenes + integración HTML
**Milestone:** M004

## Description

Write the structured content draft for all 7 events of the 1860–1900 panoramic period, using the pre-verified facts from M004-RESEARCH.md. Each event gets a title, date range, certeza classification, 2–4 sentence historical excerpt, ≥2 source citations (for hecho), direct quotes with attribution (for opinión), Alberdi narrative angle, and image candidate filename. Event #7 explicitly closes Alberdi's arc: return to Argentina (1879), elected diputado by Tucumán, death in Neuilly-sur-Seine (July 19, 1884 [VERIFICACIÓN PENDIENTE]), and legacy as intellectual father of the 1853 Constitution and author of *El crimen de la guerra*.

## Steps

1. Create `S01-CONTENT-DRAFT.md` with header metadata (date, period, scope, certeza distribution target)
2. Write Evento 1: Presidencias históricas (Mitre 1862–1868, Sarmiento 1868–1874, Avellaneda 1874–1880) — hecho. Include Alberdi angle: revocado de funciones diplomáticas, crítico desde París.
3. Write Evento 2: Guerra de la Triple Alianza (1865–1870) — hecho. Include verified *El crimen de la guerra* quote: «el derecho de la guerra, es… el derecho del homicidio, del robo, del incendio, de la devastación en la más grande escala posible». Note: written ca. 1870, published 1895 (Escritos Póstumos). Paraguay demographic loss 60–69%.
4. Write Evento 3: Conquista del Desierto (1878–1885) — hecho with nota historiográfica. Roca as Ministro de Guerra, 6.000 troops, 1.313 muertos / 10.500+ capturados. Antonio Pozzo as official photographer. Classify as hecho with explicit debate note (genocidio vs. construcción del Estado).
5. Write Evento 4: Federalización de Buenos Aires / 1ª presidencia de Roca (1880) — hecho. Ley 1029, Roca asumió Oct 12 1880, "Paz y Administración", La Plata founded 1882, Ley 1420 (1884).
6. Write Evento 5: Generación del 80 / inmigración masiva / modelo agroexportador (1880–1900) — hecho. Ley Avellaneda 817 (1876), census data (1.8M in 1869 → 1/3 foreign by 1914), Buenos Aires growth. Alberdi angle: "Gobernar es poblar" from *Bases* partially realized.
7. Write Evento 6: Crisis 1890 / Revolución del Parque / nacimiento UCR — hecho. Baring Brothers default June 1890, revolution July 26, Juárez Celman resignation Aug 6, Unión Cívica splits 1891 → UCR (Alem) + UCN (Mitre). Alberdi angle: dead since 1884, liberalism continues without him.
8. Write Evento 7: Últimos años de Alberdi (1879–1884) — opinión/hecho. Return 1879, elected diputado Tucumán, vicepresidente Cámara, reconciled with Sarmiento, returned to France, death July 19 1884 in Neuilly-sur-Seine [VERIFICACIÓN PENDIENTE]. Legacy: intellectual father of Constitution 1853, *El crimen de la guerra* as proto-international law treatise.

## Must-Haves

- [ ] 7 events documented with complete metadata
- [ ] Each hecho has ≥2 cited sources from M004-RESEARCH verified facts
- [ ] *El crimen de la guerra* quote correctly attributed: written ca. 1870, published 1895 (not "published 1870")
- [ ] Alberdi death dated July 19, 1884 with [VERIFICACIÓN PENDIENTE] flag
- [ ] Certeza distribution: ~5-6 hecho, ~1 opinión, 0-1 rumor
- [ ] Image candidate filename included per event

## Verification

- `grep -c "^## Evento" .gsd/milestones/M004/slices/S01/S01-CONTENT-DRAFT.md` returns 7
- Each event entry has fields: Título, Fecha, Certeza, Extracto, Fuentes, Imagen, Ángulo Alberdi
- Alberdi death in Evento 7 reads "19 de julio de 1884" with [VERIFICACIÓN PENDIENTE]
- *El crimen de la guerra* in Evento 2 says "escrito ca. 1870, publicado 1895"

## Inputs

- `.gsd/milestones/M004/M004-RESEARCH.md` — pre-verified facts, dates, quotes, and sources for all 7 events
- `.gsd/milestones/M004/M004-CONTEXT.md` — event structure and Alberdi narrative angles
- `.gsd/milestones/M003/M003-SUMMARY.md` — forward intelligence on certeza distribution and Alberdi closure

## Expected Output

- `.gsd/milestones/M004/slices/S01/S01-CONTENT-DRAFT.md` — complete 7-event content draft ready for image sourcing and HTML integration
