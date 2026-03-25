# S02: Navegación y timeline interactiva

**Goal:** JavaScript para scroll spy, smooth scroll, timeline visual lateral e animaciones reveal-on-scroll.
**Demo:** Al scrollear la página, la timeline lateral se actualiza mostrando el período actual. Al clickear en la nav, la página scrollea suavemente. Los elementos aparecen con animación al entrar en viewport.

## Must-Haves
- Scroll spy detecta sección actual y actualiza nav/timeline
- Smooth scroll al clickear links de navegación
- Timeline lateral visible que indica posición cronológica
- Animaciones de entrada (fade-in, slide) al scrollear
- Todo funciona sin librerías externas (vanilla JS)

## Tasks

- [x] **T01: Timeline lateral + scroll spy + smooth scroll**
  Crear timeline visual lateral fija, implementar scroll spy con Intersection Observer, smooth scroll en nav links.

- [x] **T02: Animaciones reveal-on-scroll**
  Implementar sistema de animaciones de entrada para elementos al entrar en viewport usando Intersection Observer.

## Observability / Diagnostics
- **Console logging:** `app.js` logs scroll spy state changes at `debug` level (`[ScrollSpy]` prefix) — visible in DevTools when debugging
- **Active state in DOM:** Current period reflected via `.timeline-point--active` and `.nav-item--active` classes — inspectable via DevTools Elements panel
- **Intersection Observer status:** On load, logs observer initialization and observed section IDs to console
- **Failure visibility:** If no sections are found for observation, a `console.warn('[ScrollSpy] No sections found')` is emitted
- **No secrets or sensitive data** are involved in this slice

## Verification
- [x] `app.js` exists and is ≥60 lines
- [x] Timeline aside element present in index.html DOM
- [x] Scroll spy updates `.nav-item--active` when scrolling between sections
- [x] Clicking nav link smooth-scrolls to target section
- [x] Clicking timeline point smooth-scrolls to target section
- [x] Timeline point `.timeline-point--active` updates on scroll
- [x] Browser console shows no JS errors on page load
- [x] Diagnostic check: `console.debug` messages from `[ScrollSpy]` visible when scrolling

## Files Likely Touched
- index.html (agregar timeline markup)
- styles.css (estilos timeline, animaciones CSS)
- app.js (nuevo: scroll spy, smooth scroll, reveal)
