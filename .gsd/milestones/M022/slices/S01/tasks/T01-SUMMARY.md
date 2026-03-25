---
id: T01
parent: S01
milestone: M022
provides:
  - Sub-nav con overflow-x:auto y justify-content:flex-start en desktop
  - Scrollbar oculto (scrollbar-width:none + ::-webkit-scrollbar:none)
  - Mobile media query limpiado de propiedades duplicadas
key_files:
  - styles.css (bloque .sub-nav)
key_decisions:
  - "justify-content: flex-start — tabs suman 1550px en contenedor 1152px, center causaba overflow"
  - "Fades laterales descartados — pseudo-elementos no funcionan bien en flex scroll container"
duration: 15min
verification_result: pass
completed_at: 2026-03-25T19:20:00Z
---

# T01: Fix sub-nav overflow desktop

**Sub-nav con 9 links scrolleable horizontalmente en todos los anchos**

## What Happened

Cambié `justify-content: center` a `flex-start` + `overflow-x: auto` + scrollbar oculto. El mobile media query ya tenía este patrón, lo limpié para no duplicar.

## Deviations
Fades laterales descartados — no funcionan en flex scroll. El tab cortado en el borde derecho cumple la función de indicador visual.

## Files Created/Modified
- `styles.css` — bloque .sub-nav modificado
