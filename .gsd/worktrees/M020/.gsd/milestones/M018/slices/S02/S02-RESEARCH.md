# S02: Integración HTML — Research

**Date:** 2026-03-24
**Slice:** M018-S02
**Risk:** Low — straightforward HTML integration of a fully-verified content draft

## Summary

S02 es integración mecánica. S01 entregó `S01-CONTENT-DRAFT.md` con 4 cards (CAM-1…CAM-4) completamente estructuradas: títulos, excerpts, fuentes, thumburls verificados, clase CSS y data-certeza para cada una. No hay investigación adicional que hacer.

El worktree M018 contiene `index.html` sin cambios de M017 (sin `#rev-urquiza-perfil`). El anchor de inserción `</div><!-- /#rev-1835-1852 -->` existe exactamente en línea 2270 y está disponible. El sub-nav tiene 7 links (líneas 327–333); se añade el octavo link a `#rev-camino-caseros` en posición lógica entre `#rev-1835-1852` y `#rev-1852-1860`.

La integración produce un nuevo `<div id="rev-camino-caseros">` inmediatamente ANTES de `</div><!-- /#rev-1835-1852 -->`, dentro del `#rev-1835-1852` sub-period. CAM-3 requiere atención especial al `object-position` por su panorama muy apaisado (2197×582 px, ratio 3.77:1).

## Recommendation

Integrar en una sola tarea: (1) añadir el sub-nav link, (2) escribir el bloque HTML de las 4 cards, (3) verificar JS syntax y DOM checks en browser.

Seguir exactamente los patrones de cards existentes en SP3 (líneas 2118–2268): mismo template `card-hecho`, misma estructura de `card-certeza-indicator`, `card-image`, `event-card__year`, `event-card__title`, `event-card__excerpt`, `card-source`. Copiar estructura de SP3-1 como template base — las 4 CAM cards son todas `card-hecho`.

**No crear** `card-expand-toggle` ni `card-detail` — el draft no incluye contenido para expand/collapse y las cards de hechos en SP3 no lo tienen tampoco.

**No crear** nuevo `<blockquote class="alberdi-quote">` — D069 y las restricciones del draft lo prohíben. La cita de Alberdi en CAM-4 va como texto corrido en el excerpt (`<p class="event-card__excerpt">`).

## Implementation Landscape

### Key Files

- `index.html` línea 2270 — anchor de inserción `</div><!-- /#rev-1835-1852 -->`. El bloque de 4 cards va DENTRO de `#rev-1835-1852`, justo antes de esta línea.
- `index.html` líneas 327–333 — sub-nav. El 8° link va en línea 333, antes de `<a href="#rev-1852-1860"...>`.
- `app.js` — sin cambios. `initImageFallbacks()` auto-descubre nuevas `.card-image img` en DOMContentLoaded. Sintaxis verificada OK.
- `.gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md` — fuente de verdad para todo el contenido.

### Estructura del bloque a insertar

El nuevo sub-período va DENTRO del `<div id="rev-1835-1852">` existente, inmediatamente antes del cierre `</div><!-- /.events-grid SP3 -->`:

```
<!-- El bloque va DENTRO de #rev-1835-1852, antes de </div><!-- /.events-grid SP3 --> -->
```

Concretamente, el orden en el DOM dentro de `#rev-1835-1852` quedará:

```
<div id="rev-1835-1852" class="sub-period reveal reveal-fade">
  <h3>La Época de Rosas...</h3>
  <div class="events-grid events-grid--certeza">
    <!-- SP3-1…SP3-6 (6 cards existentes) -->
  </div><!-- /.events-grid SP3 -->

  <!-- NUEVO: sub-sección #rev-camino-caseros -->
  <h4 class="sub-period__subtitle reveal reveal-fade" style="--reveal-delay: 0ms">
    El camino a Caseros (1851–1852)
  </h4>
  <div id="rev-camino-caseros" class="events-grid events-grid--certeza" aria-label="El camino a Caseros">
    <!-- CAM-1…CAM-4 -->
  </div><!-- /#rev-camino-caseros -->
</div><!-- /#rev-1835-1852 -->
```

**Alternativa más simple:** Crear `#rev-camino-caseros` como sub-`<div>` sin `class="sub-period"` dentro de `#rev-1835-1852` — solo un heading `h4` + nuevo `events-grid`. Esto evita anidar `sub-period` dentro de `sub-period` (el sub-nav observer ya apunta a `#rev-1835-1852`; el sub-nav link nuevo `#rev-camino-caseros` puede apuntar directamente al grid div con `id`).

### Stagger delays

Nuevo grid empieza desde 0ms. 4 cards = `0ms, 80ms, 160ms, 240ms`. Mismo patrón que SP3 y todos los otros grids.

### CAM-3: imagen panorámica

La imagen `La-batalla-de-caseros.JPG` tiene ratio 3.77:1 (2197×582). El contenedor `.card-image` del sitio usa una relación cercana a 4:3. Añadir `style="object-fit: cover; object-position: center top;"` en el `<img>` de CAM-3 para evitar distorsión.

### CAM-4: cita de Alberdi

La cita en el excerpt de CAM-4 va como texto corrido en `<p class="event-card__excerpt">`. El excerpt ya la incorpora como frase final con atribución ("Como sintetizó Juan Bautista Alberdi…"). Sin `blockquote`, sin `alberdi-quote`. Si se quisiera presentar visualmente como blockquote, usar `card-opinion__context` — pero dado que CAM-4 es `card-hecho`, lo correcto es mantenerlo en el `<p>` de excerpt con las comillas tipográficas ya presentes en el draft.

### Sub-nav link

```html
<a href="#rev-camino-caseros" class="sub-nav__link">1851–1852<span class="sub-nav__link-label">El camino a Caseros</span></a>
```

Insertar entre el link de `#rev-1835-1852` (línea 332) y el link de `#rev-1852-1860` (línea 333).

### Build Order

1. Añadir sub-nav link (línea 333, 1 línea de cambio)
2. Escribir bloque HTML de 4 cards antes de `</div><!-- /.events-grid SP3 -->` (línea ~2267)
3. Verificar: JS syntax check + DOM counts en browser

### Verification Approach

```bash
# Syntax check
node -e "try{new Function(require('fs').readFileSync('app.js','utf8'));console.log('OK')}catch(e){if(e instanceof SyntaxError)console.error('SYNTAX ERROR:',e.message);else console.log('OK')}"

# Card count en nuevo grid
grep -c 'data-certeza="hecho"' index.html   # debe ser ≥ 14+4 = 18

# ID presente
grep -c 'id="rev-camino-caseros"' index.html   # → 1

# Sub-nav link presente
grep -c 'href="#rev-camino-caseros"' index.html  # → 1

# Anti-duplicación: cifras SP3-6 no aparecen en nuevo bloque
grep -n "45.000 vs" index.html   # debe seguir siendo solo línea SP3-6

# No nuevo alberdi-quote
grep -c 'class="alberdi-quote"' index.html   # debe seguir siendo 4 (sin incremento)
```

Browser: navegar a `#rev-camino-caseros`, verificar 4 cards visibles con certeza-indicators, imágenes cargadas.

## Constraints

- **No anidar `class="sub-period"` dentro de `#rev-1835-1852`** — el sub-nav IntersectionObserver de app.js observa `.sub-period` elements y anidarlos podría crear interferencia. Usar `div` plano con `id` para el nuevo grid.
- **`alberdi-quote` count = 4** — no crear nuevo; restricción de D069.
- **`La-batalla-de-caseros.JPG`** (con guiones) es el filename correcto para CAM-3. No usar `La_Batalla_de_Caseros_2.JPG` (no existe en Commons).
- **CAM-4 sin imagen obligatoria** — la card funciona sin imagen. Si se incluye una de las opciones verificadas del draft (`Caseros.jpg` o la litografía Carlo Penuti), debe ir en `card-image` con `loading="lazy"`.
- **M017 NO está aplicado** en este worktree — no hay `#rev-urquiza-perfil`. El anchor de inserción es exactamente `</div><!-- /.events-grid SP3 -->` ~línea 2267, dentro del `#rev-1835-1852`.

## Common Pitfalls

- **Insertar antes de `</div><!-- /#rev-1835-1852 -->`** (cierre del sub-period) pero dentro de él, después del `</div><!-- /.events-grid SP3 -->`. El bloque no va dentro del grid SP3 existente — va como grid hermano dentro del mismo sub-period.
- **CAM-3 panorama aplastado** — sin `object-position` la imagen apaisada quedará aplastada o mostrará solo el centro. Ver nota de S01 Forward Intelligence.
- **Stagger restart desde 0ms** — el nuevo grid es independiente; no continuar desde los 400ms de SP3-6.
- **Sub-nav spy:** El JS observa `#rev-1835-1852` como sub-period; `#rev-camino-caseros` solo necesita ser un `id` para scroll-to, no una clase especial.
