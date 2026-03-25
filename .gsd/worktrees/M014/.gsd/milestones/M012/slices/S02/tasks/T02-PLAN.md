---
estimated_steps: 4
estimated_files: 3
---

# T02: Corregir regresiones encontradas en T01

**Slice:** S02 — Verificación y Pulido
**Milestone:** M012

## Description

Task condicional. Consume el reporte de defectos de T01-SUMMARY.md. Si T01 no encontró defectos, este task termina en <2 min como no-op. Si T01 encontró defectos, aplica los fixes específicos documentados en S02-RESEARCH (Common Pitfalls) y re-verifica las queries de DevTools hasta que todos los conteos sean correctos.

**Si T01-SUMMARY.md dice "T02 es no-op":** Marcar este task como `[x]` con nota "Sin regresiones en T01 — no se aplicaron cambios" y terminar.

## Steps

1. **Leer T01-SUMMARY.md:** Identificar la lista de defectos. Si está vacía → saltar al paso 4 (no-op).

2. **Aplicar fixes para cada defecto encontrado** según los patrones de S02-RESEARCH (Common Pitfalls). Fixes más probables:

   **Defecto A — `#periodo-rosas` contenido clippeado (scrollHeight > 14000px):**
   En `styles.css`, cambiar la línea `max-height: 1000rem` del bloque `.sub-period__body` a `max-height: 1500rem`. Solo si `document.querySelector('#periodo-rosas .sub-period__body').scrollHeight > 14000` post-expand.

   **Defecto B — `padding-right` en trigger visualmente denso en mobile (<640px):**
   En `styles.css`, dentro del bloque `@media (max-width: 640px)`, agregar:
   ```css
   .sub-period__title--trigger {
     padding-right: var(--space-md);
   }
   ```

   **Defecto C — Audio no funciona / sub-nav no responde:**
   Abrir DevTools Console y buscar errores `[Sound]` o `[SubNav]`. Cualquier error `TypeError` o `ReferenceError` indica que `initAmbientSound()` o `initSubNav()` falló — leer `app.js` en esas funciones (~líneas post-527) y corregir el error específico. Estos sistemas no fueron modificados en M012-S01, así que un error aquí es muy improbable; verificar que no sea un problema de caché del servidor.

   **Defecto D — Event delegation rota (`aria-expanded` no se actualiza):**
   En `app.js`, dentro de `initAccordions()`, verificar que el `addEventListener` está en `document.querySelector('#periodo-revolucion')` (el container section), no en los triggers individuales. Si está en triggers individuales, refactorizar a un único delegated listener con `.closest('.sub-period__title--trigger')`.

   **Defecto E — Reveal no se re-dispara post-expand:**
   En `app.js`, dentro de `initAccordions()`, verificar que el `transitionend` listener llama a `triggerRevealInBody(body)` donde `body` es el `.sub-period__body` div del sub-período expandido. Si `triggerRevealInBody` usa `getBoundingClientRect()` y el sub-período está fuera del viewport cuando se expande, los elementos fuera del viewport no se revelan inmediatamente — esto es comportamiento correcto (los maneja el IntersectionObserver existente). Solo es un defecto si elementos IN-viewport post-expand no se revelan.

3. **Re-verificar después de cada fix:** Recargar el sitio en browser y re-ejecutar las 5 queries de DevTools:
   ```js
   document.querySelectorAll('.sub-period__body--collapsed').length;                      // → 6
   document.querySelectorAll('.sub-period__title--trigger[aria-expanded="true"]').length; // → 1
   document.querySelectorAll('.sub-period__title--trigger').length;                       // → 7
   document.querySelectorAll('.sub-period__body--collapsed .reveal--no-anim').length;    // → 0
   document.querySelectorAll('.sub-period__title--trigger[aria-controls]').length;       // → 7
   ```
   Re-verificar también los checklist items específicos que fallaron en T01.

4. **No-op path:** Si T01 reportó cero defectos, escribir en T02-SUMMARY.md: "Sin regresiones en T01 — no se aplicaron cambios a app.js ni styles.css." y marcar done.

## Must-Haves

- [ ] Todos los defectos de T01-SUMMARY.md están cerrados (o T01 reportó cero defectos)
- [ ] Las 5 queries de DevTools retornan los valores esperados post-fix
- [ ] Los checklist items que fallaron en T01 están re-verificados y pasan
- [ ] Ningún fix introduce una nueva regresión en audio, sub-nav, o reveal

## Verification

```bash
# Si se modificó styles.css, verificar que los cambios son sintácticamente correctos:
node -e "
const fs = require('fs');
const css = fs.readFileSync('styles.css', 'utf8');
// Verificar que las reglas críticas siguen presentes
const checks = ['sub-period__body--collapsed','sub-period__title--trigger','prefers-reduced-motion'];
checks.forEach(c => console.log((css.includes(c)?'PASS':'FAIL')+': '+c));
"

# Si se modificó app.js, verificar sintaxis:
node -e "require('./app.js')" 2>&1 | head -5
# (Esperar error ReferenceError 'document is not defined' — esto es normal y esperado en Node.js; indica que el parse fue exitoso. Un SyntaxError indicaría un problema real.)

# No-op path: verificar que T02-SUMMARY.md fue escrito
node -e "require('fs').accessSync('.gsd/milestones/M012/slices/S02/tasks/T02-SUMMARY.md'); console.log('PASS: T02-SUMMARY.md exists');"
```

## Observability Impact

- Signals added/changed: Si se incrementa `max-height` de 1000rem a 1500rem, el cambio es visible en DevTools Elements (regla CSS en el panel Computed Styles del `.sub-period__body`)
- How a future agent inspects this: DevTools Console → `[Accordion]` logs + 5 queries de Fase 2
- Failure state exposed: Si el fix de max-height fue necesario, `document.querySelector('#periodo-rosas .sub-period__body').scrollHeight` > 14000 lo evidencia pre-fix

## Inputs

- `T01-SUMMARY.md` — lista de defectos encontrados (el input principal de este task)
- `app.js` — código de `initAccordions()` (líneas ~419–527) para localizar y corregir defectos C, D, E
- `styles.css` — reglas de accordion (para defectos A y B)
- S02-RESEARCH.md, sección "Common Pitfalls" — guía de fixes para cada categoría de defecto

## Expected Output

- `app.js` — corregido si se encontraron defectos C, D, o E (o sin cambios si no-op)
- `styles.css` — corregido si se encontraron defectos A o B (o sin cambios si no-op)
- `T02-SUMMARY.md` — escrito en `.gsd/milestones/M012/slices/S02/tasks/` con: lista de fixes aplicados (o "no-op"), valores de re-verificación de DevTools queries, confirmación de que M012 está completo
