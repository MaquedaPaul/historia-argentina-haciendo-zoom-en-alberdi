# S02: Content-visibility calibrada y timeline reposicionado

**Goal:** Eliminar el layout jump al scrollear entre períodos (corrigiendo `contain-intrinsic-size` con valores reales) y reposicionar el timeline lateral para que no tape el hero ni el contenido de cards.

**Demo:** Se puede scrollear de colonial a revolución a nacional sin ningún salto brusco de layout. El timeline lateral aparece debajo del sticky nav y se mantiene fuera del área del hero.

## Must-Haves

- Sin layout jump visible al scrollear entre los tres períodos
- `contain-intrinsic-size` de cada período refleja su altura real (medida post-S01)
- `.timeline-aside` no se superpone al header hero en ningún scroll position
- `.timeline-aside` no tapa las cards de la primera sección visible
- Funcionalidad del timeline (scroll spy, click para ir a sección) sin regresiones

## Tasks

- [ ] **T01: Corregir contain-intrinsic-size y eliminar layout jumps**
  Medir la altura real de cada período post-S01 y actualizar `contain-intrinsic-size` en el CSS. Evaluar si `content-visibility: auto` sigue siendo necesario o si la alternativa de `will-change: transform` en los periods es más estable.

- [ ] **T02: Reposicionar timeline-aside**
  Cambiar el `.timeline-aside` de `position: fixed; top: 50%; transform: translateY(-50%)` a una posición que respete el nav height y no solape el hero. Evaluar si `position: sticky` dentro del `<main>` es mejor opción que `fixed`.

## Files Likely Touched

- `styles.css` — bloques `.period` (contain-intrinsic-size) y `.timeline-aside` / `.timeline-track`
