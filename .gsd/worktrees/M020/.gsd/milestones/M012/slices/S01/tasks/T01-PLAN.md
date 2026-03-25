---
estimated_steps: 5
estimated_files: 1
---

# T01: Agregar CSS del accordion a styles.css

**Slice:** S01 — Accordion de Sub-períodos — CSS + JS
**Milestone:** M012

## Description

Agregar las reglas CSS necesarias para el sistema de accordion de sub-períodos. La tarea es puramente aditiva — no modifica CSS existente. El JS (T02) creará dinámicamente los wrappers `.sub-period__body` y añadirá la clase `.sub-period__title--trigger` a los headers; este CSS define su aspecto y comportamiento de transición.

El sitio usa un sistema de design tokens (variables CSS), patrón de accordion ya implementado para los card-detail expand/collapse (`max-height` + `opacity`), y la restricción de no romper el sistema de reveal existente. Las nuevas reglas deben ser compatibles con ambos.

**Constraint crítica:** El mayor sub-período (`#periodo-rosas`) tiene 35 cards con ~400px de altura cada una ≈ 14,000px ≈ 875rem. El valor de `max-height` del estado expandido debe ser ≥ 1000rem para acomodar este sub-período sin cortar contenido.

## Steps

1. **Localizar el punto de inserción en `styles.css`**: buscar la línea `/* Responsive: stack sub-period title on narrow viewports */` (alrededor de línea 1985). El nuevo bloque va justo después del bloque responsive de `.sub-period` (después del cierre de `@media (max-width: 640px)`), antes de la sección de sub-nav.

2. **Agregar el bloque CSS del accordion body**:
   ```css
   /* ==========================================================================
      Accordion de sub-períodos — M012
      ========================================================================== */

   /* Collapsible body wrapper (created dynamically by initAccordions() in app.js) */
   .sub-period__body {
     overflow: hidden;
     max-height: 1000rem; /* generous cap — largest sub-period (período-rosas) has ~35 cards */
     opacity: 1;
     transition: max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1),
                 opacity 0.35s ease;
   }

   .sub-period__body--collapsed {
     max-height: 0;
     opacity: 0;
   }
   ```

3. **Agregar el CSS del trigger (h3)**:
   ```css
   /* Trigger header — JS adds this class + role="button" + aria-expanded */
   .sub-period__title--trigger {
     cursor: pointer;
     user-select: none;
     padding-right: var(--space-xl, 1.5rem); /* space for chevron */
   }

   /* Chevron icon via CSS ::after */
   .sub-period__title--trigger::after {
     content: '▶';
     display: inline-block;
     font-size: 0.75em;
     margin-left: auto;
     transition: transform 0.3s ease;
     color: var(--color-celeste, #74acd3);
     flex-shrink: 0;
   }

   .sub-period__title--trigger[aria-expanded="true"]::after {
     transform: rotate(90deg);
   }

   .sub-period__title--trigger:focus-visible {
     outline: 2px solid var(--color-celeste, #74acd3);
     outline-offset: 3px;
     border-radius: 2px;
   }
   ```

4. **Agregar soporte `prefers-reduced-motion`**:
   ```css
   @media (prefers-reduced-motion: reduce) {
     .sub-period__body {
       transition: none;
     }
     .sub-period__title--trigger::after {
       transition: none;
     }
   }
   ```

5. **Verificar** que las nuevas reglas no colisionan con CSS existente ejecutando el comando de verificación.

## Must-Haves

- [ ] `.sub-period__body` con `overflow: hidden`, `max-height: 1000rem`, `opacity: 1` y `transition` definida
- [ ] `.sub-period__body--collapsed` con `max-height: 0` y `opacity: 0`
- [ ] `.sub-period__title--trigger` con `cursor: pointer` y `user-select: none`
- [ ] Pseudo-element `::after` con chevron `▶` que rota 90° cuando `aria-expanded="true"`
- [ ] `:focus-visible` outline visible (accesibilidad)
- [ ] `@media (prefers-reduced-motion: reduce)` desactiva transitions

## Verification

```bash
# Todas las claves del accordion están presentes en styles.css
grep -q 'sub-period__body--collapsed' styles.css && echo "PASS: collapsed class" || echo "FAIL"
grep -q 'sub-period__title--trigger' styles.css && echo "PASS: trigger class" || echo "FAIL"  
grep -q 'prefers-reduced-motion' styles.css && echo "PASS: reduced-motion" || echo "FAIL"
grep -q '1000rem' styles.css && echo "PASS: max-height cap generous" || echo "FAIL"
grep -q 'aria-expanded.*::after\|::after.*aria-expanded\|\[aria-expanded="true"\]' styles.css && echo "PASS: chevron rotation" || echo "FAIL"
```

## Observability Impact

- **Signals added/changed:** The six new CSS rule blocks create the visual failure surface — if the CSS is missing or overridden, the `.sub-period__body` divs (created by T02's JS) will render with no `overflow: hidden`, making all sub-periods fully expanded with no animation and no chevron visible.
- **How a future agent inspects this:** `grep -n 'sub-period__body\|sub-period__title--trigger' styles.css` — all new rules should appear at lines ≥2002. `grep -c 'sub-period__body' styles.css` should return 4 (body rule, collapsed rule, two reduced-motion rules). If that count is 0, the CSS block was not added.
- **Failure state exposed:** Missing CSS → all sub-periods expand on load (no collapse transition). Wrong `max-height` (e.g. `200rem` instead of `1000rem`) → largest sub-period (`#periodo-rosas`, ~35 cards ≈ 875rem) gets clipped mid-content. Missing `overflow: hidden` → collapsed body still visible (layout leak). Missing `prefers-reduced-motion` block → reduced-motion users see animation despite system preference.

## Inputs

- `styles.css` — archivo actual (~2607 líneas). La sección Sub-period está alrededor de línea 1941. El bloque responsive de `.sub-period` cierra alrededor de línea 1997. El nuevo bloque va después de ese cierre.
- **Patrón a seguir:** El accordion existente de card-detail usa `max-height: 40rem` (línea ~2192) — nuestro accordion de sub-períodos usa 1000rem por el mayor volumen de contenido.
- **Variables CSS disponibles:** `--color-celeste` (#74acd3), `--space-xl` (1.5rem), `--space-sm`.

## Expected Output

- `styles.css` — 6 nuevas reglas CSS (`.sub-period__body`, `.sub-period__body--collapsed`, `.sub-period__title--trigger`, `::after`, `[aria-expanded="true"]::after`, `@media prefers-reduced-motion`) insertadas en la sección de Sub-period, sin modificar nada existente.
