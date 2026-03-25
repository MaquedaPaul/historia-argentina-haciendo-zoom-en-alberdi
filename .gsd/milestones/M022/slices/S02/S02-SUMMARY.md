---
id: S02
parent: M022
provides:
  - contain-intrinsic-size actualizado a 3200px (era 2400px)
  - period--revolucion usa content-visibility:visible (siempre en viewport)
  - timeline-aside: top:calc(nav-height+3rem) en lugar de top:50%/translateY(-50%)
  - Sin layout jump visible al scrollear entre períodos
  - Timeline no solapa hero ni cards
key_files:
  - styles.css (bloque .period y .timeline-aside)
key_decisions:
  - "period--revolucion: content-visibility:visible — ocupa el 87% de la página, no hay ganancia en ocultarlo"
  - "timeline-aside: Opción A (top ajustado, mantiene position:fixed) — mínimo cambio, sin riesgo de romper layout"
duration: 20min
verification_result: pass
completed_at: 2026-03-25T19:50:00Z
---

# S02: Content-visibility calibrada y timeline reposicionado

**Layout jumps eliminados y timeline lateral sin solapar contenido**

## What Happened

T01: `contain-intrinsic-size` subió de 2400px a 3200px (más cercano a las alturas reales de colonial/nacional ~3000px). `periodo-revolucion` pasó a `content-visibility:visible` porque ocupa el 87% de la página — el browser nunca lo descarta de todos modos, y con auto causaba jank.

T02: `timeline-aside` cambió de `top:50%;transform:translateY(-50%)` a `top:calc(var(--nav-height,3.5rem)+3rem)`. El elemento queda fijo debajo del nav sticky en lugar de centrado en el viewport.

## Deviations
T01 y T02 se implementaron en una sola pasada (eran independientes y pequeños).

## Files Created/Modified
- `styles.css` — bloque .period + nuevo .period--revolucion override + bloque .timeline-aside
