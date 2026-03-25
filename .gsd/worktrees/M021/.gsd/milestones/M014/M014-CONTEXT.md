# M014: Las Tertulias de Mariquita Sánchez

**Gathered:** 2026-03-24
**Status:** Ready for planning

## Project Description

Sección nueva dentro de `index.html` que narra las tertulias de Mariquita Sánchez de Thompson (1786–1868) como espacio político y cultural del siglo XIX rioplatense. El contenido sigue el sistema de cards hecho/opinión/rumor con citas verificadas — cero invención, todo clasificado por nivel de certeza.

## Why This Milestone

Las tertulias de Mariquita son un episodio documentado y central del período 1810–1860: conectan la Revolución de Mayo, la era de Rosas, y el exilio de la Generación del 37. Alberdi la conoció, Echeverría la frecuentó, Gutiérrez le regaló libros. Es el hilo social que conecta varios milestones del proyecto.

## User-Visible Outcome

### When this milestone is complete, the user can:

- Leer una nueva sección en el sitio sobre las tertulias de Mariquita con cards verificadas
- Ver quiénes asistieron a sus salones en tres etapas históricas distintas
- Distinguir qué es hecho documentado, qué es interpretación historiográfica, y qué es tradición popular (ej. el Himno)

### Entry point / environment

- Entry point: `index.html` en el navegador (sitio estático)
- Environment: local + GitHub Pages
- Live dependencies: ninguna

## Completion Class

- Contract complete: nuevas cards en index.html con data-certeza y citas; verificación estructural pasa
- Integration complete: las cards siguen los patrones HTML/CSS/JS establecidos (reveal, lightbox, stagger)
- Operational complete: n/a (sitio estático)

## Final Integrated Acceptance

- La nueva sección aparece en el sitio sin romper ninguna sección existente
- Cada card tiene `data-certeza` y `<cite>` con fuente real
- El Himno Nacional aparece como `card-rumor` o con `card-nota-historiografica` dado el debate historiográfico

## Risks and Unknowns

- El episodio del Himno tiene múltiples versiones en conflicto — requiere tratamiento historiográfico explícito (card-nota o card-rumor)
- La "Generación del 37 en su salón" ya tiene contenido en M011 — hay que verificar superposición y complementar, no duplicar

## Existing Codebase / Prior Art

- `index.html` línea ~502: "La tienda de Maldes, Volney y el piano de Mariquita" — Alberdi y el piano de Mariquita ya mencionados
- `index.html` línea ~19.17: Mariquita vinculada a la Generación del 37 en el período Rosas
- `app.js`: `initImageModal()` — lightbox automático para imágenes de cards
- Patrón `card-nota-historiografica`: párrafo inline para hechos historiográficamente contestados
- Patrón `card-rumor`: para tradición oral no confirmada (ej. el Himno)
- Retrato de Mariquita por Rugendas (Montevideo, 1845) disponible en Wikimedia Commons

## Relevant Requirements

- R001 — Todo contenido debe tener fuente verificable o certeza explícita
- R002 — Nuevas secciones siguen los patrones HTML/CSS establecidos

## Scope

### In Scope

- Tres etapas de las tertulias: época revolucionaria (1810s), era Rosas (1830s), exilio Montevideo (1837–1852) y regreso
- Quiénes asistieron con nombres documentados
- El debate historiográfico del Himno Nacional
- Conexión con la Generación del 37
- Alberdi sobre Mariquita (cita verificada: "Fue la personalidad más importante...")
- Imagen: retrato de Rugendas (CC o dominio público)

### Out of Scope / Non-Goals

- Biografía completa de Mariquita (solo lo relativo a las tertulias)
- Comparación con salones europeos (contexto mínimo, no tema central)

## Technical Constraints

- HTML/CSS/JS vanilla, zero build step
- Seguir exactamente los patrones de card existentes (estructura, clases, stagger delays)
- Verificar que el count de `.reveal` en app.js no rompa el sistema (actualmente 52 elementos)
- Modal HTML debe aparecer antes del script tag (invariante documentado en KNOWLEDGE.md)

## Integration Points

- `index.html` — nueva `<section>` o sub-sección dentro del período existente
- `styles.css` — probablemente no requiere CSS nuevo (patrones ya existen)
- Wikimedia API — para verificar URLs de imágenes

## Open Questions

- ¿Dentro de qué período va la sección? Las tertulias abarcan 1810–1860 (colonial + revolución). Probable: nueva sub-sección dentro de `#periodo-revolucion`, o sección propia.
- ¿Cuántas cards? Estimo 5–7 para cubrir las tres etapas sin redundar con contenido existente.
