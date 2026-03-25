# T02: Reposicionar timeline-aside

**Slice:** S02
**Milestone:** M022

## Goal

Cambiar el `.timeline-aside` de `position: fixed; top: 50%; transform: translateY(-50%)` a una posición que no se superponga al hero ni a las cards en ningún scroll position.

## Must-Haves

### Truths
- El timeline lateral no tapa el texto del hero (header) cuando el usuario está en la parte superior
- El timeline lateral no tapa ninguna card en ningún scroll position
- Los tres puntos del timeline son clickeables y llevan a la sección correcta
- El label de hover sobre cada punto sigue siendo visible
- El timeline desaparece en mobile (verificar que el media query existente lo oculta)

### Artifacts
- `styles.css` — bloque `.timeline-aside` (líneas ~602–680) modificado

### Key Links
- `.timeline-aside` usa `position: fixed` — hay que evaluar si `position: sticky` dentro de `<aside>` en `<main>` es más adecuado, o si `fixed` con `top` ajustado es suficiente
- El header hero tiene ~500px de alto. El nav sticky tiene `--nav-height: 3.5rem` = 56px.

## Steps
1. Leer el bloque completo `.timeline-aside` en styles.css para ver posición, z-index, y media queries existentes
2. Evaluar las dos opciones:
   - **Opción A (mínimo cambio):** Mantener `position: fixed` pero cambiar `top: 50%` + `transform: translateY(-50%)` por `top: calc(var(--nav-height) + 3rem)`. El timeline queda fijo en la parte superior-izquierda del viewport, debajo del nav. Es simple pero el timeline siempre aparece aunque el usuario esté en el hero.
   - **Opción B (más correcta):** Cambiar a `position: sticky; top: calc(var(--nav-height) + 3rem); align-self: flex-start` dentro de un flex container en `<main>`. Requiere ajustar el layout del `<main>` (actualmente `position: relative; z-index: 1` sin flex).
3. Elegir Opción A si reestructurar el layout de `<main>` tiene riesgo de romper el parallax o el reveal. Elegir Opción B si el layout de `<main>` lo permite limpiamente.
4. Aplicar el fix y verificar en browser: scrollear al top → timeline no tapa el hero. Scrollear a la mitad → timeline visible y no tapa cards.
5. Verificar que `data-target` click navigation sigue funcionando (está en app.js — solo si se cambió el elemento padre)
6. Verificar en mobile (375px) que el timeline está oculto (media query en styles.css línea ~766)

## Context
- `.timeline-aside` actual: `position: fixed; left: var(--space-lg); top: 50%; transform: translateY(-50%); z-index: 90`
- Esto lo centra verticalmente en el viewport en todo momento — cuando el usuario está en el hero, el timeline aparece a mitad de pantalla superpuesto al texto
- La opción más segura dada la complejidad del layout (parallax, content-visibility, reveal) es Opción A con un ajuste mínimo
- El `z-index: 90` es igual al del `.sub-nav` — verificar que no haya conflicto con el sub-nav sticky cuando ambos están visibles
