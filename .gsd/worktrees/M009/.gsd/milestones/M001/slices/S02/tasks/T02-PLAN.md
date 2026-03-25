# T02: Animaciones reveal-on-scroll

**Slice:** S02
**Milestone:** M001

## Goal
Implementar sistema de animaciones de entrada para elementos de contenido al entrar en viewport.

## Must-Haves

### Truths
- Elementos con clase `.reveal` aparecen con animación al scrollear hasta ellos
- Al menos 2 tipos de animación: fade-in y slide-up
- Las animaciones son suaves (300-500ms) y no causan jank
- Elementos ya visibles al cargar la página se muestran sin animación

### Artifacts
- `app.js` — Función revealOnScroll() con Intersection Observer. Se agrega al archivo existente.
- `styles.css` — Clases de animación: .reveal, .reveal--visible, .reveal-fade, .reveal-slide

### Key Links
- `app.js` revealOnScroll() → elementos con clase `.reveal` en `index.html`

## Steps
1. Agregar clases CSS para estados de animación (.reveal = oculto, .reveal--visible = visible)
2. Definir variantes: .reveal-fade (opacity), .reveal-slide (translateY + opacity)
3. Agregar Intersection Observer en app.js que detecte elementos .reveal
4. Al entrar en viewport, agregar clase .reveal--visible
5. Marcar elementos placeholder en index.html con clases .reveal
6. Manejar caso de elementos ya visibles al cargar (no animar)
7. Verificar en browser: scroll y ver animaciones suaves

## Context
- Intersection Observer con threshold de 0.1-0.2 (aparecer cuando se ve un poco)
- rootMargin negativo para que aparezcan un poco antes de entrar completamente
- Las cards de S03 también usarán estas clases

## Observability Impact
- **Console logging:** `[Reveal]` prefixed `console.debug` messages on initialization (element count observed) and on each reveal transition
- **DOM state inspection:** `.reveal--visible` class on revealed elements — queryable via `document.querySelectorAll('.reveal--visible').length` in DevTools
- **Failure visibility:** If no `.reveal` elements found, `console.warn('[Reveal] No .reveal elements found')` is emitted
- **Stagger inspection:** Elements receive `--reveal-delay` CSS custom property for staggered animations — visible in DevTools computed styles
- **No secrets or sensitive data** involved
