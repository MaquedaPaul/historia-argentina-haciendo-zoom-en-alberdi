---
id: S01
parent: M010
milestone: M010
provides:
  - S01-RESEARCH-NOTES.md — notas de investigación verificadas con 7 secciones temáticas, 7 fechas clave, 3 key risks resueltos (nombre grupo French/Berutti, mecanismo Cabildo Abierto, debate historiográfico), y 7 candidatos de imagen Wikimedia
  - S01-CONTENT-DRAFT.md — contrato de contenido completo con 11 entradas de card (7 day-by-day + 3 temáticas + 1 nota historiográfica), certeza asignada a cada una, fuentes verificadas o explícitamente marcadas, listo para consumo mecánico por S02
requires:
  - slice: none
    provides: M010-CONTEXT.md, M010-ROADMAP.md (fechas y riesgos)
affects:
  - S02
key_files:
  - .gsd/milestones/M010/slices/S01/S01-RESEARCH-NOTES.md
  - .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md
key_decisions:
  - '"Chisperos" es la denominación contemporánea a 1810 (fuente: Memorias de Juan Manuel Beruti); "Legión Infernal" es etiqueta historiográfica posterior — usar ambas con distinción explícita'
  - '"Sobres duplicados" no aparece en fuentes académicas verificadas — mecanismo documentado es "control de acceso físico + alteración de la lista de convocados" (documentado en el propio informe de Cisneros al rey)'
  - 'El dato 155 vs 69 de SP1-1 es coherente con Rincón & Heavey (UNLP 2023) — no requiere corrección ni conflicto con contenido existente'
  - '"30 de mayo" del plan se convirtió en "26–31 de mayo" porque las fuentes no desglosan acciones por día exacto dentro de la primera semana post-25 — mejor certeza `debatido` que inventar datos del día 30'
  - 'El recuento del 22 de mayo tiene 3 versiones (155/69, 158/67, 162/64) — el draft usa el rango "entre 155 y 162" para honrar la variación sin elegir arbitrariamente'
  - 'La lluvia del 25 de mayo es `debatido` — aparece en la iconografía de Subercaseaux (1908) y está consolidada en el mito cultural, pero no verificada en actas primarias de ese día'
  - 'Card Temática 4 (nota historiográfica) usa clase CSS `card-opinion` per D052/D058 — el executor de S02 debe aplicar este CSS class, no crear uno nuevo'
patterns_established:
  - 'El Resumen de certeza al final del draft lista explícitamente todos los [VERIFICAR] pendientes — patrón de epistemic honesty heredado de M004, transferible a futuros milestones de contenido'
  - 'Gaps de verificación documentados con tres niveles: [VERIFICAR] (claim incierto), [VERIFICAR ATRIBUCIÓN] (cita directa sin verificar vs. original), [FUENTE PENDIENTE] (imagen sin URL verificada)'
  - 'Failure-state check para el draft: (## sections) - (### Fuentes sections) debe ser exactamente 1 (la sección Resumen); si es >1, alguna card carece de fuentes'
observability_surfaces:
  - 'grep -n "VERIFICAR" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md — 22 flags de claims inciertos con ubicación exacta'
  - 'grep -c "Certeza:" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md — devuelve 11 (cobertura completa de certeza)'
  - 'grep -c "^### Fuentes" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md — devuelve 11 (todas las cards tienen fuentes)'
  - 'grep -n "FUENTE PENDIENTE" S01-CONTENT-DRAFT.md — imágenes cuyas URLs de Wikimedia requieren verificación API antes de HTML'
drill_down_paths:
  - .gsd/milestones/M010/slices/S01/tasks/T01-SUMMARY.md
  - .gsd/milestones/M010/slices/S01/tasks/T02-SUMMARY.md
duration: ~100m (T01: ~60m + T02: ~40m)
verification_result: passed
completed_at: 2026-03-24
---

# S01: Research y Content Draft — 14 al 25 de mayo de 1810

**Draft de contenido verificado con 11 cards (7 day-by-day + 3 temáticas + 1 nota historiográfica), todos los key risks de M010 resueltos o explícitamente marcados, listo como contrato de contenido para S02.**

## What Happened

S01 produjo dos artefactos secuenciales: T01 generó las notas de investigación verificadas; T02 transformó esas notas en el contrato de contenido formal para S02.

**T01 — Investigación y verificación:** La investigación resolvió los 3 key risks de M010. El nombre del grupo French/Berutti se verificó: "chisperos" es la denominación documentada en fuentes primarias (Memorias de Juan Manuel Beruti, hermano de Antonio Beruti); "Legión Infernal" aparece en fuentes oficiales como el Museo Histórico Nacional del Cabildo pero no se encontró como denominación contemporánea a 1810. El mecanismo del Cabildo Abierto del 22 de mayo se verificó como doble: (a) reducción de la lista de convocados de ~600 a ~450, y (b) control físico de los accesos por French y sus hombres que impedía el ingreso de realistas — ambos documentados incluso en el informe de Cisneros al rey. El término "sobres duplicados" del plan original no aparece en ninguna fuente académica verificada; el draft usa la descripción del mecanismo en lugar del término no verificado. El debate historiográfico se documentó con tres posiciones: Mitre/Levene (revolución popular), Halperin Donghi (reconfiguración de élites), Pigna/O'Donnell (síntesis popular-dirigida). Las 7 fechas clave fueron verificadas individualmente: el dato 155 vs 69 del 22 de mayo existente en SP1-1 es coherente con la fuente académica más reciente (Rincón & Heavey, UNLP 2023). Se identificaron 7 candidatos de imagen Wikimedia con URLs pendientes de verificación API.

**T02 — Redacción del draft:** El `S01-CONTENT-DRAFT.md` se escribió siguiendo exactamente el formato de M002-S01-CONTENT-DRAFT.md para garantizar que el executor de S02 pueda hacer la integración HTML mecánicamente. Las 7 entradas day-by-day cubren: 14 mayo (llegada de noticias de España), 18 mayo (bando de Cisneros y reunión patriota), 22 mayo (Cabildo Abierto), 23 mayo (Junta Cisneriana), 24 mayo (presión popular), 25 mayo (Primera Junta), y 26–31 mayo (primeras acciones). Una desviación del plan: "30 mayo" se convirtió en "26–31 mayo" porque las fuentes secundarias no desglosan acciones por día exacto dentro de la primera semana — se prefirió certeza `debatido` sobre fabricar datos del día 30 específico. Las 3 cards temáticas cubren: el grupo de French/Berutti (con la distinción de nombres), la manipulación del Cabildo (con el mecanismo verificado), y la presión miliciana de Saavedra. La card nota historiográfica presenta las 3 posiciones del debate popular vs. élites con atribución completa (autor + obra + año) para cada una.

## Verification

Todos los checks del slice plan pasaron:

```
test -f S01-CONTENT-DRAFT.md                        → PASS
grep -c "^## " S01-CONTENT-DRAFT.md                 → 12  (≥10 requerido)
grep -c "^### Fuentes" S01-CONTENT-DRAFT.md         → 11  (≥9 requerido)
grep -c "Certeza:" S01-CONTENT-DRAFT.md             → 11  (≥9 requerido)
grep -c "card-nota-historiografica" S01-CONTENT-DRAFT.md → 2  (≥1 requerido)
grep -c "VERIFICAR" S01-CONTENT-DRAFT.md            → 22  (claims inciertos explicitados)
Failure-state: ## sections(12) - ### Fuentes(11) = 1  → PASS (solo Resumen sin fuentes)

test -f S01-RESEARCH-NOTES.md                       → PASS
grep -c "^## " S01-RESEARCH-NOTES.md               → 7   (≥5 requerido)
```

## New Requirements Surfaced

- Ninguno — S01 es producción de artefacto de contenido, no implementación de feature nuevo.

## Deviations

1. **"30 de mayo" → "26–31 de mayo":** El plan especificaba "30 de mayo" como séptima fecha. T01 encontró que las fuentes secundarias no desglosan acciones por día exacto dentro de la primera semana post-25 de mayo. La card se escribió como "26–31 de mayo (las primeras acciones de la Junta)" con certeza `debatido` para no fabricar hechos específicos del día 30.

2. **11 cards en lugar del mínimo de 9:** El plan requería ≥9 cards; se produjeron 11 (7 day-by-day + 3 temáticas + 1 nota historiográfica). La card de "presión miliciana" era opcional en el plan; se incluyó porque el material verificado en T01 la justificaba plenamente.

3. **URLs de Wikimedia sin verificación API:** Las limitaciones del entorno (Python y curl no disponibles, límite de web_search agotado en T01) impidieron verificar las URLs de thumbs de 500px via API durante S01. Las imágenes están identificadas por nombre de archivo; S02 debe verificar las URLs con el protocolo de KNOWLEDGE.md.

## Known Limitations

- **8 [VERIFICAR] flags pendientes en el draft:** Todos documentados en la sección "Resumen de certeza" del draft. Los más relevantes para S02: (a) URLs de thumbs de Wikimedia sin verificar via API — S02 debe verificarlas antes de integrar imágenes en HTML; (b) imagen específica de French o Berutti no encontrada — S02 necesitará una imagen alternativa para esa card.
- **Lluvia del 25 de mayo:** Certeza `debatido` — aparece en iconografía (Subercaseaux 1908) y está consolidada en el mito cultural, pero no verificada en actas primarias.
- **Acciones específicas del 30 de mayo:** Las fuentes cubren "las primeras semanas" en bloque. Si se requieren acciones exactas del día 30, se necesita consulta de Actas del AGN.

## Follow-ups

- **S02 debe verificar URLs de imágenes via Wikimedia API** antes de integrar `<img>` en HTML — usar el protocolo de KNOWLEDGE.md (query `/w/api.php` con `titles=File:...&prop=imageinfo&iiprop=url&iiurlwidth=500`).
- **S02 debe buscar imagen alternativa para la card de French/Berutti** — no se encontró retrato de French o Berutti específicamente; una opción es una imagen de la Plaza de Mayo de época o el Fuerte de Buenos Aires.
- **SP1-1 sigue intacta:** El dato 155 vs 69 en SP1-1 es coherente con las fuentes verificadas — S02 no necesita modificarla.

## Files Created/Modified

- `.gsd/milestones/M010/slices/S01/S01-RESEARCH-NOTES.md` — nuevo: 359 líneas, 7 secciones temáticas, 3 key risks de M010 resueltos, 15 marcadores [VERIFICAR] explícitos
- `.gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md` — nuevo: 378 líneas, 11 cards con certeza y fuentes, 1 card-nota-historiografica, Resumen de certeza al final
- `.gsd/milestones/M010/slices/S01/S01-PLAN.md` — modificado: diagnostic failure-path check agregado en Observability (T01 pre-flight), T01 y T02 marcados como `[x]`

## Forward Intelligence

### What the next slice should know

- **El draft es el contrato de S02 — no investigar de nuevo.** Todo el contenido histórico está en `S01-CONTENT-DRAFT.md`. El executor de S02 toma ese archivo como única fuente de verdad para las cards; re-investigar generaría inconsistencias con las decisiones ya tomadas sobre certeza y atribución.
- **La Card Temática 4 (nota historiográfica) usa clase CSS `card-opinion`** per D052/D058 — no crear una clase nueva. El `[card-nota-historiografica]` en el draft es una etiqueta para el executor de S02, no un CSS class literal.
- **El dato del voto del 22 de mayo en SP1-1 (155 vs 69) es compatible** con el draft — no hay conflicto ni necesidad de editar SP1-1.
- **Las 11 cards van dentro del sub-período `rev-1800-1820` en `index.html`**, después de la card SP1-1 (la panorámica de la Semana de Mayo que ya existe). S02 debe insertar después de SP1-1, no reemplazarla.
- **Orden cronológico de las cards en HTML:** Evento 1 (14 mayo) → Evento 2 (18 mayo) → Evento 3 (22 mayo) → Evento 4 (23 mayo) → Evento 5 (24 mayo) → Evento 6 (25 mayo) → Evento 7 (26–31 mayo) → Temática 1 (French/Berutti) → Temática 2 (Manipulación Cabildo) → Temática 3 (Presión miliciana) → Temática 4 (Debate popular/élites). Las cards temáticas después de las day-by-day para mantener el flujo narrativo.

### What's fragile

- **URLs de Wikimedia no verificadas** — si S02 usa las URLs base sin verificar via API, las imágenes pueden no cargarse (KNOWLEDGE.md documenta que el path de thumbs tiene hash MD5 y no se puede construir por guessing). Verificar todas las URLs antes de integrar.
- **La imagen del óleo de Subercaseaux (Cabildo Abierto del 22 de mayo)** ya está siendo usada en SP1-1 — si S02 la reutiliza en la Card del Evento 3, habrá duplicación visual en la misma página. Considerar una imagen distinta para el Evento 3 o añadir un `<cite>` diferente que justifique el contexto distinto.

### Authoritative diagnostics

- `grep -n "VERIFICAR" S01-CONTENT-DRAFT.md` — lista exacta de los 22 claims inciertos con número de línea; fuente autoritativa para saber qué necesita verificación adicional en S02.
- `grep "Certeza:" S01-CONTENT-DRAFT.md` — una línea por card; confirma cobertura completa y distribución (5 hecho, 5 debatido, 1 nota historiográfica implícita en Temática 4).
- `grep -A2 "^## Resumen de certeza" S01-CONTENT-DRAFT.md` — los 8 [VERIFICAR] pendientes listados explícitamente por categoría.

### What assumptions changed

- **"30 de mayo" como fecha discreta** → Las fuentes secundarias no permiten acciones específicas de ese día; se usó el bloque "26–31 de mayo" con certeza `debatido`. Si la card narrativa requiere "30 mayo" específico, necesita Actas del AGN.
- **"Sobres duplicados" como mecanismo documentado** → El término no existe en fuentes académicas verificadas; el mecanismo real tiene dos componentes (lista y control físico). S02 debe usar la descripción verificada, no el término coloquial.
- **Imagen de French o Berutti esperada** → No se encontró retrato verificado de ninguno de los dos en Wikimedia; S02 necesita una imagen de contexto (Plaza, Fuerte, o escarapela) como alternativa.
