# T02: Verificación final y screenshots

**Slice:** S03
**Milestone:** M022

## Goal

Recorrer la página completa a 1280px verificando que todos los fixes de M022 están en orden y documentar el estado final con screenshots de secciones clave.

## Must-Haves

### Truths
- Sub-nav scrollWidth ≤ clientWidth en 1280px
- `Math.max(...[...document.querySelectorAll('.event-card')].map(c => c.offsetHeight))` ≤ 420
- Sin layout jump al scrollear de colonial a revolución
- Timeline lateral posicionado sin solapar hero ni cards
- Expand/collapse funciona en una muestra de cards de cada sección
- Scroll spy activa el tab correcto del nav al scrollear

### Artifacts
- Screenshots capturadas: hero+nav, sección colonial, sub-nav de revolución, cards truncadas, timeline posicionado, mobile 375px

## Steps
1. Navegar a http://localhost:8080 a 1280px
2. Verificar sub-nav: `document.querySelector('.sub-nav').scrollWidth` vs `.clientWidth`
3. Verificar altura máxima de cards: console evaluar la expresión de max height
4. Scrollear lentamente de top a bottom — verificar sin layout jump
5. Tomar screenshots de secciones clave con `browser_screenshot`
6. Probar expand/collapse en 3 cards de distintas secciones
7. Probar que scroll spy actualiza el nav activo correctamente
8. Verificar modal de imágenes en una card con imagen
9. Si algo falla: crear una nota en STATE.md con el problema pendiente

## Context
- Este es el último task del milestone — el objetivo es confirmar que todo funciona y documentar.
- Si se encuentra un problema nuevo (no conocido), evaluarlo: si es menor (visual, no funcional), anotarlo en STATE.md como deuda técnica. Si es funcional, crear T03 de fix antes de cerrar el slice.
