# S01: Sub-nav scrolleable y cards truncadas

**Goal:** Corregir los dos problemas de layout más inmediatos: el sub-nav que desborda en desktop y las 56 cards con texto sin límite que generan alturas de 1000–2500px.

**Demo:** El sub-nav de "Revolución y Organización" muestra todos los tabs en desktop sin cortarse. Las cards tienen máximo ~420px; el texto largo queda detrás de un "Ver más" usando el patrón card-expand-toggle ya existente.

## Must-Haves

- `.sub-nav` en desktop nunca desborda (scrollWidth ≤ clientWidth) — scrolleable con `-webkit-overflow-scrolling: touch` y sin scrollbar visible
- Indicador visual en los extremos del sub-nav cuando hay más contenido (fade o sombra)
- Las 56 cards con excerpt > 600 chars tienen `.event-card__excerpt` truncado y un `.card-expand-toggle` funcional
- Ninguna card supera 420px de alto en estado colapsado en desktop (1280px)
- Las 4 cards que ya tienen expand-toggle siguen funcionando igual
- Funcionalidad existente (reveal, scroll spy, modal) sin regresiones

## Tasks

- [x] **T01: Fix sub-nav overflow desktop**
  CSS: hacer el sub-nav scrolleable horizontalmente en todos los anchos, con fade en los bordes como indicador visual.

- [x] **T02: Wrap excerpts largos con expand/collapse**
  Para las 56 cards con excerpt > 600 chars: truncar el excerpt a ~4 líneas visibles, mover el texto completo a un `<div class="card-detail" hidden>`, y agregar el botón `<button class="card-expand-toggle">`. Reutiliza el patrón y CSS existentes. El JS en app.js ya maneja el toggle — no se necesita wiring adicional.

## Files Likely Touched

- `styles.css` — solo para el sub-nav fix (T01)
- `index.html` — markup de 56 cards (T02)
