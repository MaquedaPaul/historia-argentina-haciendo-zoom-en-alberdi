# M020: Las Invasiones Inglesas — Detalle 1806–1807

**Vision:** Transformar la card panorámica de las Invasiones Inglesas en el bloque más detallado del proyecto: 14–18 cards con los actores completos, los hechos verificados, las consecuencias políticas, y la conexión causal explícita con la Revolución de Mayo de 1810 — incluyendo el contexto europeo napoleónico.

## Success Criteria

- Sub-período `#rev-invasiones-inglesas` visible en `#periodo-revolucion` con 14+ cards
- Cada actor clave tiene su card o sección propia: Sobremonte, Liniers, Álzaga, Beresford, Popham, Whitelocke, Belgrano (transición a miliciano), Saavedra (Patricios), Pueyrredón
- El tesoro real capturado (~1.086.000 pesos fuertes) y la destitución de Sobremonte están documentados
- Los regimientos criollos y su sistema de elección de líderes están explicados
- La estrategia de Whitelocke (por qué no bombardeó) está presentada con las hipótesis historiográficas y su certeza
- El contexto europeo (Napoleón, Bayona, José Bonaparte → crisis de legitimidad → Mayo 1810) está integrado
- La conexión causal milicias 1806 → actores de Mayo 1810 está explícita
- Sub-nav tiene link al nuevo sub-período
- revolucion-timeline muestra marcadores 1806 y 1807

## Key Risks / Unknowns

- **Volumen de verificación histórica** — 14–18 cards a máximo nivel de detalle es la tarea de research más extensa del proyecto hasta ahora
- **Ana Périchon / fuga de Beresford** — evidencia parcial; nivel de certeza a determinar en S01
- **Whitelocke sin bombardeo** — interpretación historiográfica; múltiples hipótesis con distinto peso
- **Salvador María Alberdi** — verificar participación en las milicias como posible hilo narrativo
- **Timeline con 12 marcadores** — al límite del patrón actual; evaluar densidad visual

## Proof Strategy

- **Verificación histórica** → retirar en S01 con content draft verificado contra ≥2 fuentes por hecho, certeza asignada a cada claim, imágenes Wikimedia identificadas
- **Integración HTML** → retirar en S02 confirmando `querySelectorAll('#rev-invasiones-inglesas [data-certeza]').length >= 14`
- **Timeline y nexo causal** → retirar en S03 confirmando marcadores 1806/1807 visibles y card de contexto europeo integrada

## Verification Classes

- Contract verification: DOM queries para conteo de cards, certeza distribution, cite elements, sub-nav link, timeline markers
- Integration verification: reveal-on-scroll, image fallbacks, expand/collapse — todos auto-descubren los nuevos elementos sin cambios en JS
- Operational verification: ninguna (static)
- UAT / human verification: lectura de coherencia narrativa, check visual en 320px y 1920px+

## Milestone Definition of Done

- 14+ cards integradas en `#rev-invasiones-inglesas` con certeza, imágenes y citas
- Todos los actores clave cubiertos con su card o sección específica
- Sub-nav link a `#rev-invasiones-inglesas` presente
- revolucion-timeline con marcadores 1806 y 1807
- Card de contexto europeo (Napoleón/Bayona) integrada
- Conexión causal 1806→1810 explícita en la narrativa
- Sin errores JS en consola
- Correcto en 320px y 1920px+

## Requirement Coverage

- Covers: R003 (extiende detalle del período hacia 1806), R011 (hilo Alberdi si padre participó)
- Partially covers: R005 (imágenes nuevas para el período), R012 (verificación histórica para las nuevas cards)
- Leaves for later: ninguno nuevo
- Orphan risks: ninguno

## Slices

- [x] **S01: Research y content draft verificado — todos los actores y eventos 1806–1807** `risk:high` `depends:[]`
  > After this: draft markdown con 14–18 entradas verificadas contra ≥2 fuentes, certeza asignada, imágenes Wikimedia identificadas, temas en debate señalados con nota historiográfica — listo para integración HTML sin trabajo editorial adicional.

- [x] **S02: Integración HTML — sub-período #rev-invasiones-inglesas con cards completas** `risk:medium` `depends:[S01]`
  > After this: `querySelectorAll('#rev-invasiones-inglesas [data-certeza]').length >= 14` es true; sub-nav tiene link al nuevo sub-período; expand/collapse funciona en cards con detalle; reveal-on-scroll opera sobre todos los nuevos elementos; sitio correcto en 320px y 1920px+.

- [x] **S03: Timeline, nexo causal y contexto napoleónico** `risk:low` `depends:[S02]`
  > After this: revolucion-timeline muestra marcadores 1806 y 1807; hay una card o bloque narrativo sobre Napoleón/Bayona/crisis de legitimidad integrado; la conexión causal explícita invasiones→Mayo 1810 está visible en el flujo narrativo.

## Boundary Map

### S01 → S02

Produces:
- `S01-CONTENT-DRAFT.md` — 14–18 entradas estructuradas: título, año, certeza, excerpt (2–4 oraciones), detalle expandible (2–4 párrafos), fuentes (≥2 por hecho), imagen Wikimedia (URL + alt text), notas historiográficas donde aplique
- Certeza asignada a cada card: hecho / opinión / rumor
- Imágenes Wikimedia verificadas via API (URL de 500px thumb o direct URL para imágenes pequeñas)
- Flag explícito para cards que requieren `card-nota-historiografica` (Álzaga, Whitelocke estrategia)
- Flag explícito para cards `card-rumor` o `card-opinion` (Ana Périchon, rivalidad Liniers-Álzaga)
- Decisión sobre Salvador María Alberdi: incluir o no en narrativa

Consumes:
- nada (primer slice)

### S02 → S03

Produces:
- `<div id="rev-invasiones-inglesas" class="sub-period reveal reveal-fade">` integrado en `index.html` antes de `#rev-alberdi-formacion`
- 14+ `<article>` cards con `data-certeza`, estructura correcta de certeza-indicator, card-image, year, title, excerpt, expand/collapse donde corresponda, cite footer
- `<a href="#rev-invasiones-inglesas">` agregado al sub-nav
- Stagger correcto: `--reveal-delay: 0ms` a `--reveal-delay: N×80ms`

Consumes:
- Content draft completo de S01

### S03 (consumes S02)

Produces:
- 2 nuevos marcadores en `revolucion-timeline`: 1806 (Invasión) y 1807 (Defensa) con `--marker-pos` recalculado
- Card o `alberdi-quote` conector sobre contexto europeo (Napoleón/Bayona/José Bonaparte → crisis de legitimidad)
- Conexión causal explícita invasiones→regimientos→Mayo 1810 visible en el flujo narrativo

Consumes:
- Sub-período `#rev-invasiones-inglesas` existente en S02 (para posición del conector narrativo)
- Estado actual del `revolucion-timeline` en S02 (para recalcular `--marker-pos`)
