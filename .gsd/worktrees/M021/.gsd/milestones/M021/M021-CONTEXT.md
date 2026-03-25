# M021: San Martín — Formación, Campañas y Retiro del Poder

**Gathered:** 2026-03-25
**Status:** Ready for planning

## Project Description

Página web histórica interactiva (HTML + CSS + JS vanilla, single page) que narra la historia argentina 1500–1900 con Alberdi como hilo conductor. El sitio tiene tres períodos principales: colonial (7 cards), revolución (sub-períodos con 20+ cards, sub-nav sticky, timeline animado), y nacional (7 cards). M021 agrega un sub-período nuevo `#rev-san-martin` dentro de `#periodo-revolucion`, siguiendo exactamente el patrón estructural de todos los sub-períodos existentes.

## Why This Milestone

San Martín aparece en el sitio en dos cards panorámicas (SP1-3 y SP1-5 en `#rev-1800-1820`) con cobertura mínima. El usuario quiere un tratamiento en profundidad equivalente al que recibió Alberdi en M007 y las Invasiones Inglesas en M020: arco narrativo completo desde el origen hasta el final, con las preguntas abiertas tratadas honestamente como debate historiográfico.

## User-Visible Outcome

### Cuando este milestone esté completo, el usuario puede:

- Scrollear al sub-período San Martín y leer el arco completo: niño que sale del Río de la Plata → oficial español → vuelta por las logias → fundador de los Granaderos → estratega del cruce → libertador de Chile y Perú → retirado voluntario
- Ver cada batalla individual con fecha, contexto y significado estratégico
- Leer las hipótesis sobre Guayaquil y las logias con atribución historiográfica honesta, sin veredicto falso
- Ver marcadores del período San Martín en el `revolucion-timeline`
- Navegar al sub-período desde el sub-nav sticky

### Entry point / environment

- Entry point: `index.html` en el browser, scroll hasta `#rev-san-martin`
- Environment: local / GitHub Pages estático
- Live dependencies: imágenes Wikimedia (externas, cacheadas en CDN)

## Completion Class

- Contract complete: `querySelectorAll('#rev-san-martin [data-certeza]').length >= 14` es true; sub-nav tiene link a `#rev-san-martin`; timeline tiene marcadores 1812 y 1817 como mínimo
- Integration complete: reveal-on-scroll, expand/collapse, lightbox modal — todos auto-descubren los nuevos elementos sin cambios en JS
- Operational complete: ninguna (static)

## Final Integrated Acceptance

- `document.querySelectorAll('#rev-san-martin .event-card').length >= 14` en consola del browser
- Sub-nav tiene `<a href="#rev-san-martin">` visible
- Correcto en 320px (1 columna, sin overflow) y 1920px+ (grid multi-columna)
- Sin errores JS en consola

## Risks and Unknowns

- **Guayaquil** — nadie sabe qué se dijo; tratamiento como debate historiográfico (decisión tomada)
- **Logias masónicas y Gran Bretaña** — tres hipótesis, sin veredicto; card-opinion con atribución historiográfica explícita (decisión tomada)
- **Volumen de research** — 15+ cards con ≥2 fuentes verificadas por hecho; el research histórico es la tarea de mayor riesgo
- **Imágenes Wikimedia para batallas** — algunas batallas tienen grabados del siglo XIX; otras pueden no tener imagen adecuada y necesitar fallback
- **Granularidad de batallas** — San Lorenzo sola (única en suelo argentino); Cruce + Chacabuco agrupables; Cancha Rayada + Maipú agrupables; Perú + Guayaquil juntos

## Existing Codebase / Prior Art

- `index.html` línea 348: `<div id="rev-alberdi-formacion" class="sub-period reveal reveal-fade">` — patrón de sub-período a replicar
- `index.html` línea 325–335: sub-nav con links a todos los sub-períodos — agregar `<a href="#rev-san-martin">`
- `index.html` línea 2430–2502: `revolucion-timeline` con 10 marcadores (1810–1860); agregar marcadores para períodos San Martín (1812 Granaderos, 1813 San Lorenzo, 1817 Cruce, 1818 Maipú)
- `index.html` líneas 1308–1330: SP1-5 "San Martín: el cruce de los Andes" — card panorámica existente que M021 va a ampliar con sub-período propio (la card panorámica no se elimina)
- Patrón card-nota-historiografica: M004 + M008-S14 — párrafo inline para historia contestada
- Patrón card-opinion con múltiples hipótesis: M008-S16 — `card-nota-historiografica` con posiciones numeradas y atribución por posición
- Patrón expand/collapse: M003 — `card-detail` hidden con rAF + transitionend

> Ver `.gsd/DECISIONS.md` para todas las decisiones arquitectónicas y de patrón.

## Relevant Requirements

- D003 (panorámico vs. detallado): este milestone rompe la regla de 1800–1860 detallado dado que los otros sub-períodos ya son detallados — el "detallado" aplica al período completo
- D009 / D010 (sistema certeza): hecho / opinión / rumor con tratamiento visual diferenciado — aplica sin cambios
- D020 (sub-period structure): `<div class="sub-period">` con ID dentro de `#periodo-revolucion` — no `<section>` separada

## Scope

### In Scope

- Sub-período `#rev-san-martin` con ~15 cards cubriendo el arco completo
- Formación en España (infancia, cadete en Murcia, campañas en África, Bailén, Teniente Coronel)
- Identidad criolla en España (tensión peninsular/criollo, techo de cristal)
- Logias y decisión de volver (Cádiz, Londres, Álvear, Zapiola, Miranda; hipótesis historiográficas)
- Logias masónicas y la independencia americana (Logia Lautaro, paradoja Iglesia/masonería, intereses convergentes)
- Creación del Regimiento de Granaderos a Caballo (1812) + historia hasta hoy
- Combate de San Lorenzo (3 feb. 1813)
- Gobernación de Cuyo y preparación del cruce
- Cruce de los Andes (enero 1817)
- Batalla de Chacabuco (12 feb. 1817)
- Batalla de Cancha Rayada (19 mar. 1818) y reorganización post-derrota
- Batalla de Maipú (5 abril 1818)
- Campaña al Perú (1820–1822): expedición, Lima, declaración independencia, Protector
- Entrevista de Guayaquil con Bolívar (1822) — card de debate historiográfico
- El retiro del poder: negativa a guerras civiles, cartas, contraste con Lavalle/Álvear, exilio y muerte en Boulogne-sur-Mer (1850)
- Sub-nav link a `#rev-san-martin`
- Marcadores en `revolucion-timeline` para el período San Martín

### Out of Scope / Non-Goals

- Eliminar o modificar las cards panorámicas SP1-3 y SP1-5 existentes
- Período post-1850 (San Martín muere; el sitio ya cubre 1850–1860 en otros sub-períodos)
- Comparación detallada San Martín / Bolívar más allá de Guayaquil
- Vida privada de San Martín (Mercedes de Escalada, hija Mercedes) salvo que sea relevante para el retiro

## Technical Constraints

- Zero new JavaScript — todo el JS existente (expand/collapse, reveal, lightbox, sub-nav observer) auto-descubre nuevos elementos
- Imágenes: URLs Wikimedia Commons verificadas via API antes de usarlas en HTML
- Sub-nav: agregar link sin romper el sticky positioning existente
- Timeline: recalcular `--marker-pos` de marcadores existentes si se agregan marcadores antes de 1810 (los Granaderos son 1812, dentro del rango — no necesita recalculo)
- HTML debe insertarse antes de `#rev-1800-1820` (San Martín llega en 1812, narrativamente anterior a muchos eventos de ese sub-período) o después, según coherencia narrativa — decisión a tomar en S01

## Integration Points

- `revolucion-timeline` — agregar marcadores sin reordenar los 10 existentes; calcular `--marker-pos` con fórmula `(año - 1800) / (1860 - 1800) * 100`
- Sub-nav `#periodo-revolucion` — agregar `<a href="#rev-san-martin">` con label corto
- Lightbox modal — auto-descubre `.card-image img`; sin cambios JS
- Expand/collapse — auto-descubre `.card-expand-toggle`; sin cambios JS

## Open Questions

- **Posición del sub-período en el flujo narrativo** — ¿antes o después de `#rev-alberdi-formacion`? San Martín llega en 1812, Alberdi nace en 1810. Propuesta: insertar `#rev-san-martin` entre `#rev-invasiones-inglesas` (si existe) y `#rev-alberdi-formacion`, o entre `#rev-1800-1820` y `#rev-1820-1835`. A resolver en S01 con criterio de coherencia narrativa para el lector.
- **Granularidad de batallas** — confirmar en S01: San Lorenzo sola; Cruce + Chacabuco como par; Cancha Rayada + Maipú como par; Perú + Guayaquil juntos. O cada batalla con su card independiente si el research lo justifica.
