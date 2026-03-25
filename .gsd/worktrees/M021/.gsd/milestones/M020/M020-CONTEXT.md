# M020: Las Invasiones Inglesas — Detalle 1806–1807

**Gathered:** 2026-03-25
**Status:** Ready for planning

## Project Description

Página web interactiva (HTML + CSS + JS vanilla, static deploy en GitHub Pages) que narra la historia argentina 1500–1900 con Juan Bautista Alberdi como hilo conductor. 103 cards existentes con sistema certeza (hecho/opinión/rumor), reveal-on-scroll, lightbox modal, expand/collapse, timelines animados y sub-nav sticky.

## Why This Milestone

Hoy las Invasiones Inglesas (1806–1807) existen solo como una card panorámica en la sección colonial (línea ~220 del HTML). El usuario quiere la película completa: quiénes fueron cada actor, cómo cayó la ciudad, cómo se reconquistó, qué pasó con cada figura clave, por qué Whitelocke no bombardeó, y cómo todo eso conecta causalmente con la Revolución de Mayo de 1810. También quiere el contexto europeo (Napoleón/Bayona) integrado en la narrativa de 1810. Nivel de detalle máximo — no panorámico.

## User-Visible Outcome

### Cuando este milestone esté completo, el usuario puede:

- Scrollear por un sub-período dedicado `#rev-invasiones-inglesas` dentro de `#periodo-revolucion` y leer 14–18 cards detalladas
- Leer la historia completa de cada actor clave con su trayectoria específica durante las invasiones: Sobremonte (fuga y tesoro), Liniers (reconquista desde Montevideo), Álzaga (Cabildo — debate historiográfico), Beresford (gobernador, rendición, fuga), Popham (cadena de información a Londres, corte marcial), Whitelocke (segunda invasión, estrategia fallida, rendición)
- Leer sobre Belgrano, Saavedra, Pueyrredón como actores emergentes que nacen políticamente en este período
- Entender por qué Whitelocke eligió el ataque frontal en lugar del bombardeo naval — con las hipótesis historiográficas y su nivel de certeza
- Leer sobre los regimientos criollos: cómo se formaron, cómo eligieron sus líderes (por primera vez por voto interno), qué regimientos existieron
- Leer el contexto europeo: Napoleón, Bayona 1808, José Bonaparte → crisis de legitimidad → Mayo 1810
- Ver la conexión causal explícita: milicias 1806 → actores de Mayo 1810 → Revolución
- Ver 2 nuevos marcadores en el revolucion-timeline (1806 y 1807)

### Entry point / environment

- Entry point: `index.html` en browser
- Environment: local dev + GitHub Pages static
- Live dependencies: ninguna

## Completion Class

- Contract complete means: 14+ cards integradas con `data-certeza`, `<cite>`, imágenes Wikimedia, reveal classes, expand/collapse donde corresponda
- Integration complete means: reveal-on-scroll auto-descubre nuevos elementos; initImageFallbacks auto-descubre nuevas `.card-image img`; sub-nav tiene link al nuevo sub-período; timeline tiene marcadores 1806/1807
- Operational complete means: ninguna (static)

## Final Integrated Acceptance

- `querySelectorAll('#rev-invasiones-inglesas [data-certeza]').length >= 14` → true
- revolucion-timeline muestra marcadores 1806 y 1807
- sub-nav tiene `<a href="#rev-invasiones-inglesas">`
- expand/collapse funciona sin errores JS en consola
- Sitio correcto en 320px y 1920px+

## Risks and Unknowns

- **Volumen de verificación histórica** — 14–18 cards con múltiples actores y claims específicos. El mayor riesgo. Mitigation: content draft verificado antes del HTML.
- **Ana Périchon y la fuga de Beresford** — evidencia parcialmente documentada. Clasificar como `card-rumor` con nota de certeza.
- **Álzaga en la Reconquista** — debate historiográfico sobre si coordinó milicias o solo logística. Usar `card-nota-historiografica`.
- **Whitelocke: por qué no bombardeó** — tema interpretativo. Presentar como `card-opinion` con las hipótesis historiográficas.
- **Salvador María Alberdi (padre)** — verificar si estuvo en Buenos Aires durante las invasiones. Si hay evidencia, incluir como hilo narrativo Alberdi.
- **Manuel de Rosas** — tenía ~13 años en 1806. Verificar conexión familiar o de formación antes de incluir.
- **Timeline con 12 marcadores** — agregar 1806 y 1807 al revolucion-timeline que hoy tiene 10 marcadores (10 = al límite del patrón establecido). Alternating-above/below ya documentado en KNOWLEDGE.md.

## Existing Codebase / Prior Art

- `index.html` línea ~220 — card panorámica existente de las Invasiones en la sección colonial. **Mantener intacta.**
- `index.html` línea ~325 — sub-nav: agregar `<a href="#rev-invasiones-inglesas">` antes del link a `#rev-alberdi-formacion`
- `index.html` línea ~348 — `#rev-alberdi-formacion` — el nuevo sub-período `#rev-invasiones-inglesas` va **antes** de este div
- `index.html` línea ~1208 — `#rev-1800-1820` — sub-período existente (1810 en adelante). Las nuevas cards de 1806-07 van en el nuevo sub-período, no aquí.
- `index.html` línea ~2430 — `revolucion-timeline` con 10 marcadores, primer marcador 1810. Agregar 1806 y 1807 antes.
- M003/S01 pattern: `S01-CONTENT-DRAFT.md` como artefacto intermedio antes del HTML
- M010 pattern: verificar cada claim contra ≥2 fuentes
- Expand/collapse: rAF entre `hidden=false` y `.expanded`; `transitionend` restaura `hidden` (KNOWLEDGE.md)
- `card-nota-historiografica`: para debates sobre clasificación de la card (KNOWLEDGE.md)
- `card-nota-certeza`: para flags epistémicos inline (KNOWLEDGE.md)

> Ver `.gsd/DECISIONS.md` para todas las decisiones arquitectónicas.

## Relevant Requirements

- R003 — contenido detallado del período 1800–1860: este milestone extiende hacia atrás hasta 1806
- R011 — Alberdi como hilo conductor: verificar conexión del padre Salvador María con el período

## Scope

### In Scope

- Nuevo sub-período `#rev-invasiones-inglesas` dentro de `#periodo-revolucion`, antes de `#rev-alberdi-formacion`
- 14–18 cards detalladas cubriendo los temas listados arriba
- Link en sub-nav al nuevo sub-período
- 2 marcadores nuevos en revolucion-timeline: 1806 y 1807
- Bloque de contexto europeo (Napoleón/Bayona) como card o `alberdi-quote` conector
- Conexión causal explícita hacia Revolución de Mayo

### Out of Scope / Non-Goals

- Modificar la card panorámica colonial existente (~línea 220)
- Modificar SP1-1 a SP1-5 en `#rev-1800-1820`
- Nuevo CSS ni JS
- Otros sub-períodos

## Technical Constraints

- Sin nuevo CSS ni JS — usar 100% patrones existentes
- `card-expand-toggle` + `card-detail hidden` para contenido expandible
- Wikimedia: verificar URLs con API antes de integrar
- Reveal: `.reveal .reveal-slide` en cards; `--reveal-delay` stagger de 80ms
- El nuevo sub-período debe tener clase `.sub-period` para que `initSubNav()` lo detecte

## Integration Points

- `initExpandCollapse()` — event delegation en `.period`, auto-descubre nuevos toggles
- `revealOnScroll()` — auto-descubre `.reveal`
- `initImageFallbacks()` — auto-descubre `.card-image img`
- `initSubNav()` — detecta `.sub-period` elements, el nuevo div debe tener esa clase
- sub-nav HTML — requiere agregar `<a href="#rev-invasiones-inglesas">` manualmente

## Open Questions

- **Salvador María Alberdi**: ¿participó en las milicias de 1806? Verificar en S01.
- **Ana Périchon**: ¿card-rumor o card-opinion? Depende de la evidencia encontrada en S01.
- **Álzaga**: ¿coordinó milicias o solo logística? Investigar — determina certeza de esa card.
- **Posición de `#rev-invasiones-inglesas` en el DOM**: debe ir entre el bloque `</nav>` del sub-nav (línea ~335) y el `<div id="rev-alberdi-formacion">` (línea ~348) para mantener el orden cronológico correcto en el HTML.
