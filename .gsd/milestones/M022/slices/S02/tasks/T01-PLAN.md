# T01: Corregir contain-intrinsic-size y eliminar layout jumps

**Slice:** S02
**Milestone:** M022

## Goal

Actualizar `contain-intrinsic-size` en el CSS para que cada período tenga un hint cercano a su altura real, eliminando el salto de layout cuando el período entra en viewport.

## Must-Haves

### Truths
- Sin layout jump visible al scrollear de colonial a revolución y de revolución a nacional
- `contain-intrinsic-size` de cada período es ≥ 80% de su offsetHeight real
- El rendimiento de scroll no empeora (no se elimina `content-visibility: auto` si no es necesario)

### Artifacts
- `styles.css` — cambio en el bloque `.period` (línea ~346) para separar los valores por período, o usar valores más cercanos a la realidad para cada uno. ~5–10 líneas.

### Key Links
- `styles.css` `.period` bloque → `contain-intrinsic-size` actual: `0 2400px` (global para los tres períodos)
- Los períodos tienen heights post-S01: colonial ~4100px, revolución ~48000px, nacional ~2600px

## Steps
1. Navegar al sitio con S01 aplicado y medir: `['periodo-colonial','periodo-revolucion','periodo-nacional'].map(id => ({id, h: document.getElementById(id).offsetHeight}))`
2. Decidir la estrategia: opción A — mantener `content-visibility: auto` pero con `contain-intrinsic-size` per-período correcto; opción B — remover `content-visibility: auto` del período revolución (tan grande que el browser no lo descarta de todos modos)
3. Si opción A: agregar CSS custom property por período (`.period--colonial { contain-intrinsic-size: 0 Xpx }`, `.period--revolucion { contain-intrinsic-size: 0 Xpx }`, etc.)
4. Si opción B: remover `content-visibility: auto` solo de `.period--revolucion` — es tan grande que no hay ganancia y hay mucho jank
5. Verificar en browser scrolleando lentamente de arriba a abajo: no debe haber salto visible
6. Verificar que las secciones colonial y nacional siguen mostrando sus cards al llegar al scroll

## Context
- `content-visibility: auto` permite al browser saltear rendering de secciones fuera de viewport. El `contain-intrinsic-size` es el "tamaño placeholder" que el browser usa para el scrollbar y el layout antes de renderizar el contenido real.
- Cuando el placeholder es 2400px pero el contenido real es 48689px, el scrollbar "salta" 46000px cuando el período entra en viewport.
- El período revolución ocupa ~87% de la página total — probablemente el browser no lo descarta nunca, entonces `content-visibility: auto` en ese período no da ganancia y solo causa problemas.
- Los períodos colonial y nacional sí pueden beneficiarse de `content-visibility: auto` porque son secciones compactas relativas al total.
