# S01: Implementar lightbox modal

**Goal:** Todas las imágenes dentro de `.card-image` abren un lightbox modal al hacer click — con animación, accesibilidad y cierre correcto.
**Demo:** Click en cualquier imagen de card abre el modal con la imagen grande, caption y atribución. Esc y click en el overlay cierran el modal. Focus regresa al trigger. Funciona en mobile (imagen no se desborda del viewport) y cubre imágenes dentro de `.card-detail` expandidos.

## Must-Haves

- HTML del modal en `index.html`: `role="dialog"`, `aria-modal="true"`, botón ×, caption, atribución
- CSS en `styles.css`: posición fixed, z-index alto, fondo rgba oscuro, animación fade-in, max-height responsivo (90vh)
- Event delegation en `document.body` para capturar clicks en `.card-image img` (incluyendo imágenes tras accordeones expandidos)
- Al abrir: poblar `src`, `alt` como caption, leer `.img-attribution` del mismo `.card-image`; focus en botón ×; guardar trigger
- Al cerrar: ocultar modal, devolver focus al trigger
- Esc cierra; click en overlay cierra (no en la imagen); focus trap con Tab dentro del modal
- No romper `initImageFallbacks()` existente

## Verification

```bash
# HTML: modal element exists with required ARIA attributes
node -e "
const html = require('fs').readFileSync('index.html','utf8');
const checks = [
  [/id=\"img-modal\"/, 'modal id'],
  [/role=\"dialog\"/, 'role=dialog'],
  [/aria-modal=\"true\"/, 'aria-modal'],
  [/aria-label=/, 'aria-label'],
  [/modal-close/, 'close button class'],
  [/modal-caption/, 'caption element'],
];
let ok = true;
checks.forEach(([re, name]) => { if (!re.test(html)) { console.error('FAIL:', name); ok = false; } });
if (ok) console.log('HTML checks PASS');
"

# CSS: modal styles exist in styles.css
grep -q "img-modal" styles.css && echo "CSS: modal styles PASS" || echo "CSS: modal styles FAIL"
grep -q "modal-close" styles.css && echo "CSS: close button PASS" || echo "CSS: close button FAIL"

# JS: initImageModal function exists and is called
grep -q "initImageModal" app.js && echo "JS: function exists PASS" || echo "JS: function FAIL"
grep -q "document.body" app.js && echo "JS: event delegation PASS" || echo "JS: event delegation FAIL"
grep -q "Escape\|keydown" app.js && echo "JS: Esc key handler PASS" || echo "JS: Esc key FAIL"
```

## Tasks

- [x] **T01: Agregar HTML del modal e CSS de lightbox** `est:30m`
  - Why: La estructura del modal y sus estilos deben existir antes de que el JS pueda abrirlo. Sin HTML no hay nada que mostrar; sin CSS el modal no tiene apariencia ni posicionamiento correcto.
  - Files: `index.html`, `styles.css`
  - Do: Insertar el elemento `#img-modal` al final de `<body>` (antes del cierre `</body>`) en `index.html`. Agregar las reglas CSS del modal al final de `styles.css`.
  - Verify: `node -e "const h=require('fs').readFileSync('index.html','utf8'); ['id=\"img-modal\"','role=\"dialog\"','aria-modal=\"true\"','modal-close','modal-caption'].forEach(s=>{if(!h.includes(s))throw new Error('missing: '+s)}); console.log('PASS')"`
  - Done when: El elemento modal existe en el HTML con los atributos ARIA requeridos y los estilos del modal están en styles.css sin errores de sintaxis CSS.

- [x] **T02: Implementar JS de apertura, cierre y accesibilidad** `est:40m`
  - Why: El modal HTML/CSS del T01 es estático; este task agrega toda la interactividad: event delegation, población de contenido, focus trap, Esc, click-outside, y devolución de focus al trigger.
  - Files: `app.js`
  - Do: Agregar función `initImageModal()` dentro del IIFE de `app.js`, llamarla al final del IIFE (junto a las otras funciones `init*`). Usar event delegation en `document.body` (no en elementos individuales) para capturar clicks en `.card-image img`, incluyendo los que aparecen después de expandir accordeones (`.card-detail`).
  - Verify: `grep -q "initImageModal" app.js && grep -q "document\.body" app.js && grep -q "Escape" app.js && grep -q "focus-trap\|focusTrap\|modal-close\|firstFocusable" app.js && echo "PASS" || echo "FAIL"`
  - Done when: La función `initImageModal` existe en `app.js`, usa event delegation en `document.body`, maneja Esc, click-outside, y focus trap. El código no tiene errores de sintaxis JS (`node -e "require('fs').readFileSync('app.js','utf8')" 2>&1 | grep -v "^$"` devuelve vacío).

## Observability / Diagnostics

**Runtime signals:**
- Modal open state is visible as the `hidden` attribute on `#img-modal`: present = closed, absent = open.
- `data-trigger` on `#img-modal` (set by T02 JS) tracks which image triggered the modal — inspect via `document.getElementById('img-modal').dataset.trigger`.
- Browser DevTools → Elements panel: check `#img-modal` for `hidden` attribute and `src`/`alt` on `.img-modal__img`.

**Inspection surface:**
- `document.querySelector('#img-modal').hidden` → `true` when closed, `false` when open.
- `document.querySelector('.img-modal__img').src` → shows the currently displayed image URL when open.
- Console: `document.getElementById('img-modal')` to inspect full state.

**Failure visibility:**
- If modal doesn't open: verify event delegation on `document.body` is attached (`initImageModal` called).
- If image overflows: check `.img-modal__img` `max-height` (should be `75vh`) and `.img-modal__container` `max-height` (`90vh`).
- If focus doesn't return: verify `_trigger` variable is saved before opening.
- If animation doesn't play: check `prefers-reduced-motion` media query — intentionally disables animation.

**Redaction constraints:** No sensitive data — all content is historical image URLs and alt text.

**Diagnostic command:**
```bash
# Check modal element and its ARIA state
node -e "const h=require('fs').readFileSync('index.html','utf8'); console.log('modal found:', h.includes('id=\"img-modal\"')); console.log('hidden attr:', /id=\"img-modal\"[^>]*hidden/.test(h));"
```

## Files Likely Touched

- `index.html`
- `styles.css`
- `app.js`
