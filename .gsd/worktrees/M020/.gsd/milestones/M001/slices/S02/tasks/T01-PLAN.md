# T01: Timeline lateral + scroll spy + smooth scroll

**Slice:** S02
**Milestone:** M001

## Goal
Crear la timeline visual lateral fija que muestra la progresión cronológica, implementar scroll spy para detectar la sección actual, y smooth scroll al clickear navegación.

## Must-Haves

### Truths
- Timeline lateral visible en el lado izquierdo/derecho de la pantalla
- Timeline muestra los 3 períodos con indicador de posición actual
- Al scrollear, el indicador se mueve al período visible
- Al clickear un link de nav, la página scrollea suavemente a la sección
- Al clickear un punto de la timeline, también scrollea a la sección
- La nav se actualiza visualmente para mostrar el período activo

### Artifacts
- `app.js` — Scroll spy con Intersection Observer, smooth scroll handler. Min 60 líneas.
- `index.html` — Timeline markup agregado (aside o div fijo)
- `styles.css` — Estilos de timeline, estados activos de nav

### Key Links
- `app.js` → `index.html` via querySelector de secciones por ID
- Timeline markup → secciones via data-attributes o IDs
- `index.html` → `app.js` via script tag

## Steps
1. Agregar markup de timeline en index.html (aside fijo con puntos/línea)
2. Estilos CSS para timeline: posición fija, línea vertical, puntos por período, estado activo
3. Implementar Intersection Observer en app.js para detectar sección visible
4. Actualizar clase activa en nav y timeline al cambiar de sección
5. Implementar smooth scroll al clickear nav links (preventDefault + scrollIntoView)
6. Hacer que los puntos de la timeline también sean clickeables
7. Verificar en browser: scrollear y ver que todo se actualiza

## Context
- Usar Intersection Observer nativo (no librerías)
- Los IDs de sección son: periodo-colonial, periodo-revolucion, periodo-nacional
- La timeline debe ser discreta pero siempre visible

## Observability Impact
- **New signals:** `[ScrollSpy]` prefixed console.debug messages on section changes, observer init log with section count
- **Inspection surface:** DOM classes `.timeline-point--active` and `.nav-item--active` reflect current period — inspectable via `document.querySelector('.timeline-point--active')` in DevTools
- **Failure state:** `console.warn('[ScrollSpy] No sections found')` if section IDs missing from DOM; timeline renders but stays inert
