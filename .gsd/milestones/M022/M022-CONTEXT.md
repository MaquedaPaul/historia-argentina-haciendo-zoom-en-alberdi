# M022: Pulido Visual Global

**Gathered:** 2026-03-25
**Status:** Ready for planning

## Project Description

Sitio web estático (HTML + CSS + JS vanilla) que narra la historia argentina 1500–1900 con Juan Bautista Alberdi como hilo conductor. Acumuló 21 milestones de contenido e interactividad. La UI muestra problemas visuales acumulados que degradan la experiencia.

## Why This Milestone

El sitio tiene contenido excelente pero la UI se fue degradando a medida que se agregaron milestones. Los problemas son visibles e inmediatos: el sub-nav desborda, las cards son innavegablemente largas, el layout salta al scrollear, y el timeline lateral se superpone al contenido. Necesita un pulido global antes de ser compartido.

## User-Visible Outcome

### When this milestone is complete, the user can:

- Navegar el sub-nav de "Revolución y Organización" sin que se corten los tabs
- Leer las cards sin que el texto se extienda infinitamente — hay un "Leer más" para el detalle
- Scrollear la página sin saltos bruscos de layout al entrar a nuevas secciones
- Ver el timeline lateral correctamente posicionado sin que tape contenido del hero o las cards
- Usar el sitio en mobile (375px) con la misma calidad que en desktop

### Entry point / environment

- Entry point: `index.html` en navegador
- Environment: local dev + GitHub Pages
- Live dependencies: Google Fonts (ya asíncrono), Wikimedia imágenes (ya con fallback)

## Completion Class

- Contract complete means: verificación de dimensiones en browser sin layout jump
- Integration complete means: todo funciona en el mismo HTML/CSS/JS sin cambios de estructura
- Operational complete means: sin regresiones en funcionalidad existente (scroll spy, reveal, modal, audio, accordions)

## Final Integrated Acceptance

- Sub-nav con 9 links visible completo en 1280px y scrolleable en mobile
- Ninguna card supera ~420px sin estar expandida
- Sin layout jump visible al scrollear entre períodos
- Timeline lateral visible pero no tapando contenido en ningún scroll position

## Risks and Unknowns

- `content-visibility: auto` con intrinsic-size incorrecto — período revolución mide 48689px real vs 2400px estimado. Corregirlo mal puede empeorar el jank. Riesgo alto.
- Cards con texto largo: el contenido es real e intencional. El "Leer más" requiere el patrón expand/collapse ya existente — verificar que el wiring en app.js soporte cards sin `data-id` antes de reimplementar.
- Sub-nav overflow fix en desktop puede requerir scroll horizontal o reducción de padding/font-size — hay que probar ambas opciones en browser.

## Existing Codebase / Prior Art

- `styles.css` L2005 — `.sub-nav` con `flex-wrap: nowrap; justify-content: center` — causa overflow en desktop
- `styles.css` L579 — `.event-card__excerpt` sin max-height ni line-clamp — texto puede ser infinito
- `styles.css` L346 — `contain-intrinsic-size: 0 2400px` para todos los períodos (revolución mide 48689px real)
- `styles.css` L602 — `.timeline-aside { position: fixed; top: 50%; }` — centrado en viewport siempre, superpuesto al hero
- `app.js` — patrón `card-expand-toggle` ya implementado y funcional (D026)
- `styles.css` L2128–2232 — `.card-expand-toggle` y `.card-detail` ya definidos, reutilizables

> See `.gsd/DECISIONS.md` para todas las decisiones arquitectónicas.

## Relevant Requirements

- Este milestone no agrega contenido — solo corrige presentación visual existente.

## Scope

### In Scope

- Fix sub-nav overflow en desktop (overflow-x: auto + scroll visual indicator)
- Truncar excerpts largos con expand/collapse pattern existente
- Corregir `contain-intrinsic-size` para cada período con valor real medido
- Corregir posicionamiento del timeline-aside (no tapar hero ni cards)
- Revisión global de espaciados, tipografía y mobile (375px)

### Out of Scope / Non-Goals

- No agregar nuevo contenido histórico
- No cambiar diseño visual general (paleta, tipografía, layout de cards)
- No tocar lógica de scroll spy, reveal, modal, ni audio
- No minificar ni hacer build step

## Technical Constraints

- Zero build step (D001) — solo HTML/CSS/JS vanilla
- No introducir nuevas dependencias
- No romper ninguna funcionalidad existente
- Mantener `data-certeza` y clases de certeza tal como están

## Integration Points

- `index.html` — markup para wrap de excerpts en card-expand-toggle donde sea necesario
- `styles.css` — todos los fixes de layout y dimensionado
- `app.js` — mínima intervención solo si el expand/collapse necesita wiring adicional
