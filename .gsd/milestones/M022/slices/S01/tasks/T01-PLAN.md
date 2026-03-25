# T01: Fix sub-nav overflow desktop

**Slice:** S01
**Milestone:** M022

## Goal

Hacer que el `.sub-nav` con 9 links sea scrolleable horizontalmente en todos los anchos de viewport, con un indicador visual (fade/sombra) en los bordes para indicar que hay más contenido.

## Must-Haves

### Truths
- `subNav.scrollWidth <= subNav.clientWidth` en viewport de 1280px (actualmente 1335 > 1152)
- Sub-nav scrolleable sin scrollbar visible en Chrome/Firefox/Safari
- Fade en borde derecho cuando hay contenido oculto a la derecha
- Fade en borde izquierdo cuando se ha scrolleado y hay contenido oculto a la izquierda
- En mobile (≤640px) el comportamiento existente (overflow-x: auto, justify: flex-start) no cambia

### Artifacts
- `styles.css` — modificar `.sub-nav` desktop: cambiar `justify-content: center` por `flex-start` con `overflow-x: auto`, y agregar fades via `::before`/`::after` pseudo-elementos. ~20 líneas modificadas/agregadas.

### Key Links
- El fade usa `::before`/`::after` en `.sub-nav` con `pointer-events: none; position: sticky` o gradiente. No requiere JS.

## Steps
1. Leer el bloque `.sub-nav` en `styles.css` (líneas ~2005–2130) para entender el CSS actual exacto
2. Cambiar `justify-content: center` a `justify-content: flex-start` en `.sub-nav` desktop
3. Agregar `overflow-x: auto; scrollbar-width: none` y `::-webkit-scrollbar { display: none }` para desktop
4. Agregar fade derecho/izquierdo con pseudo-elemento `::after` en el contenedor padre `.period-body` o en `.sub-nav` mismo usando `position: sticky` con gradiente
5. Verificar en browser a 1280px: `document.querySelector('.sub-nav').scrollWidth` ≤ `clientWidth`
6. Verificar que el tab activo sea visible al navegar por el sub-nav (scroll into view en JS si es necesario — revisar si app.js ya lo hace)

## Context
- `.sub-nav` actual: `flex-wrap: nowrap; justify-content: center; overflow: hidden (por defecto)` — esto hace que los tabs se salgan del contenedor sin scroll
- El mobile breakpoint `@media (max-width: 640px)` ya tiene `overflow-x: auto; justify-content: flex-start` — la solución desktop es llevar ese mismo patrón
- `::before`/`::after` en `.sub-nav` ya están en uso para accent bars en otros elementos — confirmar que no hay conflicto antes de agregar fades
- El `.period--featured::before` fue migrado a `::after` en M005 (D034) — no hay conflicto con `.sub-nav::after`
