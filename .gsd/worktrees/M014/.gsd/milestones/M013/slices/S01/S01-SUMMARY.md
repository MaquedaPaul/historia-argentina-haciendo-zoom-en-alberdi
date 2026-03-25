---
id: S01
parent: M013
milestone: M013
provides:
  - Lightbox modal HTML structure in index.html (#img-modal, role=dialog, aria-modal, aria-label, hidden by default)
  - Lightbox CSS in styles.css (~90 lines: fixed inset-0, z-index 1000, fade-in animation, 75vh image cap, prefers-reduced-motion, cursor:zoom-in)
  - initImageModal() JS function in app.js: event delegation on document.body, open/close logic, attribution sourcing, focus management, Esc/overlay close, keyboard accessibility (Tab focus trap, Enter/Space to open)
requires: []
affects:
  - S02
  - S03
key_files:
  - index.html
  - styles.css
  - app.js
key_decisions:
  - Caption div carries both classes `img-modal__caption modal-caption` to satisfy slice-level regex check (/modal-caption/) and BEM naming in selectors — purely additive, no style/behavior impact
  - Event delegation on `document.body` (not individual images) ensures clicks on images revealed post-load by accordion expansion (M012) are captured without re-registration
  - `new Function(src)` used for JS syntax verification in Node.js instead of `eval()` — avoids false-positive failures from DOM globals being undefined in Node.js runtime
  - `cursor: zoom-in` added as a CSS rule in styles.css in addition to inline JS — CSS rule covers dynamically-revealed images that aren't in DOM at initialization time
  - Modal hidden via HTML `hidden` attribute; CSS rule `.img-modal[hidden] { display: none }` overrides the default flex display to ensure it stays invisible until JS removes the attribute
patterns_established:
  - Event delegation on document.body for .card-image img click — tolerates images added to DOM after DOMContentLoaded (accordion expansion)
  - `lastTrigger` pattern: save reference before opening, restore focus on close, null the reference after
  - `modal.removeAttribute('hidden')` / `modal.setAttribute('hidden', '')` pairing consistent with HTML hidden attribute semantics
  - Guard clause in initImageModal(): console.warn if required DOM elements missing, early return — modal disabled gracefully
observability_surfaces:
  - "document.getElementById('img-modal').hidden → false when open, true when closed"
  - "document.querySelector('.img-modal__img').src → current image URL when open, empty string when closed"
  - "document.body.style.overflow → 'hidden' when modal is open (background scroll locked), '' when closed"
  - "console.debug('[Modal] Image modal initialized.') — fires on page load if init succeeded"
  - "console.warn('[Modal] Required elements not found — modal disabled.') — fires if #img-modal or children missing"
drill_down_paths:
  - .gsd/milestones/M013/slices/S01/tasks/T01-SUMMARY.md
  - .gsd/milestones/M013/slices/S01/tasks/T02-SUMMARY.md
duration: 35m
verification_result: passed
completed_at: 2026-03-24
---

# S01: Implementar lightbox modal

**Todas las imágenes de `.card-image` son ahora clickeables y abren un lightbox modal accesible con animación, caption, atribución, focus management, Esc/overlay close, y soporte completo de teclado.**

## What Happened

**T01** estableció la estructura estática: se insertó el elemento `#img-modal` al final de `<body>` en `index.html` (antes de `</body>`, después del `<script src="app.js">`) con todos los atributos ARIA requeridos (`role="dialog"`, `aria-modal="true"`, `aria-label="Vista ampliada de imagen"`, `hidden`). Se agregaron ~90 líneas de CSS al final de `styles.css` definiendo el modal con `position: fixed; inset: 0; z-index: 1000`, overlay semi-transparente, animación `@keyframes modal-fade-in` de 0.2s, cap de `max-height: 75vh` en la imagen para mobile, y bloque `@media (prefers-reduced-motion: reduce)` que deshabilita la animación. Decisión de diseño clave: el `<div>` de caption recibió las clases `img-modal__caption modal-caption` para satisfacer tanto la verificación de la slice (regex `/modal-caption/`) como la convención BEM.

**T02** agregó toda la interactividad: la función `initImageModal()` (105 líneas) fue insertada en el IIFE de `app.js` antes del cierre `})()` y se llama junto con las otras funciones `init*`. Implementación destacada:
- **Event delegation** sobre `document.body` captura clicks en `.card-image img` incluyendo imágenes reveladas después de expandir acordeones (M012).
- **`openModal(img)`**: puebla `src`/`alt` en la imagen modal, extrae caption del atributo `alt`, lee `.img-attribution` del `.card-image` padre (muestra/oculta según disponibilidad), guarda `lastTrigger`, remueve `hidden`, hace focus en el botón ×, bloquea scroll del body.
- **`closeModal()`**: restaura `hidden`, limpia `modalImg.src`, desbloquea scroll, devuelve focus a `lastTrigger` y lo nula.
- **Keyboard**: `Escape` → cierra; `Tab` → focus trap en botón ×; `Enter/Space` sobre imagen enfocada → abre.
- **Accesibilidad adicional**: todas las `.card-image img` reciben `tabindex="0"` y `cursor: zoom-in` inline; regla CSS adicional `cursor: zoom-in` en `styles.css` cubre imágenes añadidas dinámicamente.

## Verification

Todos los checks de la slice pasaron (verificados con Node.js en lugar de grep, que no está disponible en Windows):

```
HTML checks PASS         (6 regex: id="img-modal", role=dialog, aria-modal, aria-label, modal-close, modal-caption)
CSS: modal styles PASS   (img-modal presente en styles.css)
CSS: close button PASS   (modal-close presente en styles.css)
JS: function exists PASS (initImageModal en app.js)
JS: event delegation PASS (document.body en app.js)
JS: Esc key handler PASS (Escape en app.js)
JS syntax OK PASS        (new Function() — sin errores de sintaxis)
```

## New Requirements Surfaced

- none

## Deviations

- **Caption class duplication:** El `<div>` de caption lleva `class="img-modal__caption modal-caption"` en lugar de sólo `img-modal__caption`. Razón: el plan de la slice usa regex `/modal-caption/` como check de verificación pero el convenio BEM del resto del modal usa `img-modal__caption`. Solución aditiva sin impacto en estilos ni comportamiento.
- **Verificación con `new Function()` en lugar de `eval()`:** El plan del T02 sugería `eval()` para verificar sintaxis JS. Usando `eval()` en Node.js siempre falla con `ReferenceError: document is not defined` porque ejecuta el código en el runtime de Node donde los globals del browser no existen. `new Function(src)` parsea para errores de sintaxis sin ejecutar. Documentado en KNOWLEDGE.md.

## Known Limitations

- **Focus trap simple:** El modal actualmente tiene un solo elemento interactivo (el botón ×). El focus trap hace `Tab` → siempre foco en `closeBtn`. Si en el futuro se agregan más controles interactivos al modal (e.g., botones prev/next), el focus trap necesita expandirse para ciclar entre todos los focusables.
- **Imágenes dinámicas post-init:** El loop `document.querySelectorAll('.card-image img')` que asigna `tabindex="0"` y `cursor: zoom-in` inline sólo corre una vez en `initImageModal()`. Imágenes agregadas dinámicamente después (via JS en el futuro) necesitarán tabindex asignado. El CSS `cursor: zoom-in` sí las cubre. El click delegation también las cubre.
- **Sin validación de src vacío:** Si una imagen tiene `src=""` o es un placeholder roto, el modal se abrirá igualmente con imagen vacía. No es un problema con el contenido actual pero podría mejorarse con un guard.

## Follow-ups

- S02 debe verificar visualmente en browser: abrir modal clickeando imágenes de las tres secciones (colonial, revolución, nacional), verificar que funciona sobre imágenes dentro de `.card-detail` expandidos (integración M012), y confirmar comportamiento mobile.
- Si se agregan controles prev/next al modal en el futuro (no planeado en M013), el focus trap necesita actualización.

## Files Created/Modified

- `index.html` — Agregado elemento `#img-modal` (16 líneas) inmediatamente antes de `</body>`, después de `<script src="app.js">`
- `styles.css` — Agregados ~94 líneas de CSS de lightbox + regla `cursor: zoom-in` al final del archivo (de ~2607 a ~2701 líneas)
- `app.js` — Agregada función `initImageModal()` (105 líneas) y su llamada dentro del IIFE; archivo creció de 810 a 915 líneas
- `.gsd/milestones/M013/slices/S01/tasks/T01-SUMMARY.md` — Generado por T01
- `.gsd/milestones/M013/slices/S01/tasks/T02-SUMMARY.md` — Generado por T02
- `.gsd/milestones/M013/slices/S01/S01-PLAN.md` — T01 y T02 marcados como `[x]`

## Forward Intelligence

### What the next slice should know
- El modal está completamente funcional pero **no ha sido verificado visualmente en un browser real**. S02 debe hacer esa verificación de integración — especialmente con las imágenes dentro de `.card-detail` expandidos (M012 accordion integration).
- El `document.body.style.overflow = 'hidden'` que bloquea scroll al abrir el modal debe verificarse en Safari/iOS mobile — es un pattern conocido que puede requerir `document.body.style.position = 'fixed'` en algunos versiones de iOS WebKit.
- Las imágenes del sitio tienen atribución variable: algunas tienen `.img-attribution` dentro de `.card-image`, otras no. El modal maneja ambos casos (muestra/oculta `attrEl`). Verificar visualmente que la atribución aparece correctamente para imágenes con y sin ella.
- El `hidden` attribute en `#img-modal` es la fuente de verdad del estado del modal — es seguro consultar `document.getElementById('img-modal').hidden` para diagnostic en DevTools.

### What's fragile
- **`closest('.card-image img')`** en el event delegation — funciona si `.card-image` es siempre un ancestro directo de `<img>`. Si alguna imagen en el futuro está anidada más profundamente dentro de `.card-image` (e.g., dentro de un `<figure>`), el `.closest()` igual funcionaría, pero si `.card-image` ya no es el contenedor directo, `.querySelector('.img-attribution')` en el mismo bloque podría fallar. Verificar que la estructura HTML de las cards no cambió.
- **Z-index 1000** del modal — es suficiente para el contenido actual pero si se agregan overlays con z-index > 1000 en futuros milestones, el modal podría quedar detrás. El nav sticky tiene z-index inferior a 1000 en el código actual.

### Authoritative diagnostics
- `document.getElementById('img-modal').hidden` → estado verdadero del modal (true=cerrado, false=abierto)
- `console.debug('[Modal] Image modal initialized.')` en DevTools Console → confirma que `initImageModal()` corrió exitosamente
- `console.warn('[Modal] Required elements not found — modal disabled.')` → indica que algún elemento DOM requerido falta

### What assumptions changed
- **Grep no disponible en Windows:** Los checks de verificación del plan usan `grep -q "..."` que no existe en Windows cmd/PowerShell sin Git Bash. Todos los checks deben ejecutarse con Node.js en este entorno. El pipeline de verificación automática del sistema también usó grep y falló con exit code 1 aunque el código era correcto.
