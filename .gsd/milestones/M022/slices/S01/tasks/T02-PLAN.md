# T02: Wrap excerpts largos con expand/collapse

**Slice:** S01
**Milestone:** M022

## Goal

Para las 56 cards con excerpt > 600 chars: truncar el texto visible a ~4 líneas y mover el resto a un `<div class="card-detail" hidden>` con botón `<button class="card-expand-toggle">`. El JS en app.js ya maneja el toggle — solo es trabajo de markup en index.html.

## Must-Haves

### Truths
- Ninguna card supera 420px de alto en estado colapsado en viewport 1280px
- Todas las cards afectadas tienen un botón "Ver más ▼" funcional
- Al hacer click en "Ver más", el texto completo se expande con la animación existente
- Las 4 cards que ya tienen card-expand-toggle siguen funcionando igual (no se tocan)
- La funcionalidad de reveal-on-scroll y modal de imágenes no se rompe

### Artifacts
- `index.html` — 56 cards modificadas. Cada card: excerpt truncado a ~300 chars + botón card-expand-toggle + div.card-detail con el texto restante

### Key Links
- `app.js` `initExpandCollapse()` — maneja todos los `.card-expand-toggle` por event delegation en `.site-main`. No requiere wiring adicional por card.
- `styles.css` `.card-detail` — ya tiene `max-height: 0; overflow: hidden` + transición. `.card-detail--expanded` lo expande. No requiere CSS nuevo.

## Steps
1. Leer el patrón HTML de una card que ya tiene card-expand-toggle (p.ej. la de "El Cabildo Abierto") para tener la estructura exacta
2. Identificar las 56 cards afectadas con un script en browser: `document.querySelectorAll('.event-card__excerpt')` filtrando `textContent.length > 600`
3. Para cada card afectada: editar el bloque en index.html — mantener los primeros ~280 chars del excerpt en `<p class="event-card__excerpt">`, mover el resto a `<div class="card-detail" hidden><p>...resto...</p></div>`, agregar el botón inmediatamente después del excerpt
4. Procesar las secciones en este orden para mantener contexto: `periodo-colonial` (2 cards), `rev-alberdi-formacion` (12 cards), `rev-alberdi-quiroga` (8 cards), `periodo-rosas` (28 cards), `rev-alberdi-rosas` (2), `rev-alberdi-balcarce` (4), `periodo-nacional` (5), `nacional-alberdi-vejez` (3)
5. Después de cada sección, verificar en browser que las cards de esa sección no superen 420px
6. Verificación final: `Math.max(...[...document.querySelectorAll('.event-card')].map(c => c.offsetHeight))` debe ser ≤ 420

## Context
- El patrón HTML de card-expand-toggle exacto está en index.html — buscar "card-expand-toggle" para encontrar los 4 ejemplos existentes
- El botón tiene texto "Ver más\n▼" con clase `card-expand-toggle__icon` para la flecha
- El `<div class="card-detail" hidden>` va DESPUÉS del botón y ANTES del `<footer>` / `<cite>` si los hay
- `initExpandCollapse()` en app.js usa event delegation en `.site-main` — funciona automáticamente para cualquier `.card-expand-toggle` nuevo sin wiring adicional
- 280 chars = ~3 líneas en Source Serif 4 a 0.95rem con line-height 1.65 en un contenedor de ~380px de ancho. Ajustar si alguna sección tiene texto diferente.
- Las cards de `rev-alberdi-quiroga` tienen excerpts de 1100–2500 chars — necesitan más agresivo truncado (primera oración o primer párrafo solamente, ~200 chars)
