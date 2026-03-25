# M021: San Martín — Formación, Campañas y Retiro del Poder

**Vision:** Sub-período `#rev-san-martin` con ~15 cards que cubren el arco completo de San Martín: formación en España como oficial profesional, identidad criolla, logias masónicas y la decisión de volver, creación de los Granaderos, batallas completas (San Lorenzo → Cruce de los Andes → Chacabuco → Cancha Rayada → Maipú → Perú → Guayaquil), y el retiro voluntario del poder como acto de coherencia política.

## Success Criteria

- Sub-período `#rev-san-martin` visible en `#periodo-revolucion` con ≥14 cards
- Arco narrativo completo: infancia → oficial español → logias → Granaderos → batallas → retiro
- Batallas individuales con fecha exacta, contexto estratégico y significado
- Guayaquil tratada como debate historiográfico (card-opinion con nota historiográfica, múltiples hipótesis, sin veredicto)
- Logias masónicas y rol de Gran Bretaña tratados como card-opinion con atribución historiográfica explícita
- Sub-nav tiene link a `#rev-san-martin`
- `revolucion-timeline` tiene marcadores para el período San Martín (mínimo 1812 Granaderos y 1817 Cruce)
- Sin errores JS en consola
- Correcto en 320px y 1920px+

## Key Risks / Unknowns

- **Research histórico extenso** — 15+ cards a nivel de detalle máximo es la tarea de mayor riesgo
- **Imágenes Wikimedia para batallas específicas** — grabados del siglo XIX pueden no tener calidad suficiente o no existir para todas las batallas
- **Posición narrativa del sub-período** — ¿dónde en el flujo? (antes de `#rev-1800-1820` o como sub-período separado entre los existentes)

## Proof Strategy

- **Research histórico** → retirar en S01 con content draft verificado contra ≥2 fuentes por hecho, certeza asignada, imágenes Wikimedia verificadas via API
- **Integración HTML** → retirar en S02/S03/S04 confirmando `querySelectorAll('#rev-san-martin [data-certeza]').length >= 14`
- **Timeline y sub-nav** → retirar en S05 confirmando marcadores visibles y link en sub-nav

## Verification Classes

- Contract verification: DOM queries para conteo de cards, certeza distribution, cite elements, sub-nav link, timeline markers
- Integration verification: reveal-on-scroll, image fallbacks, expand/collapse — auto-descubren nuevos elementos sin cambios JS
- Operational verification: ninguna (static)
- UAT / human verification: coherencia narrativa del arco San Martín, check visual en 320px y 1920px+

## Milestone Definition of Done

- ≥14 cards integradas en `#rev-san-martin` con data-certeza, imágenes y cites
- Arco completo cubierto: formación → logias → Granaderos → batallas → retiro
- Sub-nav link a `#rev-san-martin` presente
- `revolucion-timeline` con marcadores 1812 y 1817 como mínimo
- Sin errores JS en consola
- Correcto en 320px y 1920px+
- `document.querySelectorAll('#rev-san-martin .event-card').length >= 14` pasa en consola

## Requirement Coverage

- Covers: D003 (detalle en período 1800–1860), D009/D010 (sistema certeza), D020 (sub-period structure)
- Partially covers: D008 (rigorosidad histórica — aplica completamente en S01)
- Leaves for later: ninguno nuevo

## Slices

- [x] **S01: Research y content draft verificado — arco completo San Martín** `risk:high` `depends:[]`
  > After this: draft markdown con ≥15 entradas verificadas contra ≥2 fuentes, certeza asignada, imágenes Wikimedia identificadas via API, posición del sub-período en el flujo decidida, granularidad de batallas confirmada — listo para integración HTML sin trabajo editorial adicional.

- [x] **S02: Formación en España, identidad criolla, logias y Granaderos** `risk:medium` `depends:[S01]`
  > After this: cards de formación militar, identidad criolla, logias masónicas (con nota historiográfica) y Granaderos a Caballo integradas en `#rev-san-martin`; expand/collapse funciona en cards con detalle; reveal-on-scroll opera correctamente.

- [x] **S03: Batallas y campañas — San Lorenzo hasta Maipú** `risk:medium` `depends:[S02]`
  > After this: cards de San Lorenzo, Cuyo/preparación, Cruce de los Andes, Chacabuco, Cancha Rayada y Maipú integradas con fechas exactas, contexto estratégico y imágenes; `querySelectorAll('#rev-san-martin [data-certeza]').length >= 10` es true.

- [x] **S04: Perú, Guayaquil y retiro del poder** `risk:medium` `depends:[S03]`
  > After this: cards de campaña al Perú, debate historiográfico de Guayaquil (card con nota historiográfica), y retiro del poder (negativa a guerras civiles, exilio, Boulogne-sur-Mer) integradas; `querySelectorAll('#rev-san-martin [data-certeza]').length >= 14` es true.

- [x] **S05: Sub-nav, timeline y verificación final** `risk:low` `depends:[S04]`
  > After this: sub-nav tiene link a `#rev-san-martin`; `revolucion-timeline` tiene marcadores 1812 y 1817; verificación DOM completa pasa; correcto en 320px y 1920px+; sin errores JS.

## Boundary Map

### S01 → S02/S03/S04

Produces:
- `S01-CONTENT-DRAFT.md` — ≥15 entradas estructuradas: título, año, certeza, excerpt (2–4 oraciones), detalle expandible (2–4 párrafos), fuentes (≥2 por hecho), imagen Wikimedia (URL verificada + alt text), notas historiográficas donde aplique
- Certeza asignada a cada card: hecho / opinión / rumor
- Imágenes Wikimedia verificadas via API (500px thumb o direct URL para imágenes pequeñas)
- Flag para cards que requieren `card-nota-historiografica` (logias, Guayaquil, retiro)
- Decisión sobre posición del sub-período en el flujo de `#periodo-revolucion`
- Decisión sobre granularidad de batallas (card por batalla vs. pairs)

Consumes:
- nada (primer slice)

### S02 → S03

Produces:
- `<div id="rev-san-martin" class="sub-period reveal reveal-fade">` integrado en `index.html`
- Cards de las primeras secciones: formación en España (2 cards), identidad criolla (1 card), logias y regreso (2 cards), Granaderos (1–2 cards) — ~6–7 cards
- Estructura del sub-período establecida y estable para que S03 pueda append cards de batallas

Consumes:
- Content draft de S01

### S03 → S04

Produces:
- Cards de batallas integradas: San Lorenzo, Cuyo/preparación, Cruce de los Andes, Chacabuco, Cancha Rayada, Maipú — ~6 cards
- `querySelectorAll('#rev-san-martin [data-certeza]').length >= 10`

Consumes:
- Sub-período existente de S02

### S04 (consumes S03)

Produces:
- Cards de campaña al Perú, debate Guayaquil, retiro del poder — ~4 cards adicionales
- `querySelectorAll('#rev-san-martin [data-certeza]').length >= 14`

Consumes:
- Sub-período existente de S03 (append al final del grid de cards)

### S05 (consumes S04)

Produces:
- `<a href="#rev-san-martin">` en el sub-nav (línea ~326–335 de index.html)
- 2+ nuevos marcadores en `revolucion-timeline`: 1812 (Granaderos) y 1817 (Cruce) con `--marker-pos` calculado via fórmula `(año - 1800) / 60 * 100`
- Verificación DOM completa: ≥14 cards, sub-nav link, timeline markers, 320px/1920px+, sin errores JS

Consumes:
- Sub-período completo de S04
- Estado actual del `revolucion-timeline` (10 marcadores existentes, rango 1800–1860)
