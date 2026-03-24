---
estimated_steps: 5
estimated_files: 1
---

# T02: Implementar JS de apertura, cierre y accesibilidad

**Slice:** S01 — Implementar lightbox modal
**Milestone:** M013

## Description

Agregar la función `initImageModal()` dentro del IIFE de `app.js`. Esta función implementa toda la interactividad del lightbox: event delegation en `document.body` para abrir el modal al clickear cualquier `.card-image img`, población de imagen/caption/atribución, focus trap, cierre con Esc, cierre con click en overlay, y devolución de focus al trigger al cerrar.

**Punto crítico de integración:** La delegación de eventos debe hacerse en `document.body` (no en `.card-image` ni en la sección), para cubrir imágenes que se revelan dinámicamente cuando el usuario expande los accordeones (`.card-expand-toggle` / `.card-detail`). Las imágenes dentro de `.card-detail` tienen `hidden` por defecto y se revelan posteriormente — un listener en el DOM inicial no las capturaría.

## Steps

1. **Leer el final del IIFE en `app.js`** para encontrar el punto de inserción correcto (antes del cierre `})();`). Las otras funciones `init*` se llaman al final del IIFE:
   - `initExpandCollapse()` — en línea ~350
   - `initSubNav()` — en línea ~630
   - `initHamburgerMenu()` — en línea ~740
   El nuevo `initImageModal()` debe agregarse después de `initHamburgerMenu()` y antes de `})();`.

2. **Insertar la función `initImageModal()`** en `app.js`. Estructura de la función:

```javascript
  // ============================================================
  // Lightbox Modal
  // ============================================================
  function initImageModal() {
    var modal    = document.getElementById('img-modal');
    var overlay  = modal && modal.querySelector('.img-modal__overlay');
    var closeBtn = modal && modal.querySelector('.modal-close');
    var modalImg = modal && modal.querySelector('.img-modal__img');
    var altText  = modal && modal.querySelector('.img-modal__alt-text');
    var attrEl   = modal && modal.querySelector('.img-modal__attribution');

    if (!modal || !overlay || !closeBtn || !modalImg) {
      console.warn('[Modal] Required elements not found — modal disabled.');
      return;
    }

    var lastTrigger = null;

    /** Open the modal with data from the clicked image. */
    function openModal(img) {
      // Populate image
      modalImg.src = img.src;
      modalImg.alt = img.alt || '';

      // Caption: alt text
      altText.textContent = img.alt || '';

      // Attribution: look for .img-attribution inside the same .card-image wrapper
      var cardImage = img.closest('.card-image');
      var attribution = cardImage && cardImage.querySelector('.img-attribution');
      if (attribution) {
        attrEl.innerHTML = attribution.innerHTML;
        attrEl.style.display = '';
      } else {
        attrEl.textContent = '';
        attrEl.style.display = 'none';
      }

      // Store trigger and show modal
      lastTrigger = img;
      modal.removeAttribute('hidden');
      closeBtn.focus();
      document.body.style.overflow = 'hidden'; // prevent background scroll
    }

    /** Close the modal and restore focus. */
    function closeModal() {
      modal.setAttribute('hidden', '');
      modalImg.src = '';
      document.body.style.overflow = '';
      if (lastTrigger) {
        lastTrigger.focus();
        lastTrigger = null;
      }
    }

    // ---- Event: open modal on .card-image img click (event delegation) ----
    document.body.addEventListener('click', function (e) {
      var img = e.target.closest('.card-image img');
      if (!img) return;
      openModal(img);
    });

    // ---- Event: close via overlay click ----
    overlay.addEventListener('click', closeModal);

    // ---- Event: close via × button ----
    closeBtn.addEventListener('click', closeModal);

    // ---- Event: Esc closes modal; Tab cycles focus (focus trap) ----
    modal.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
        return;
      }
      if (e.key === 'Tab') {
        // Focus trap: cycle between closeBtn and modalImg only
        var focusable = modal.querySelectorAll('button, [href], img[tabindex], [tabindex="0"]');
        // closeBtn is the only interactive element — keep focus there
        e.preventDefault();
        closeBtn.focus();
      }
    });

    // ---- Make images keyboard-accessible: Enter/Space opens modal ----
    document.body.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var img = document.activeElement;
      if (!img || !img.matches('.card-image img')) return;
      e.preventDefault();
      openModal(img);
    });

    // ---- Make .card-image img focusable and visually indicate clickability ----
    document.querySelectorAll('.card-image img').forEach(function (img) {
      img.setAttribute('tabindex', '0');
      img.style.cursor = 'zoom-in';
    });

    console.debug('[Modal] Image modal initialized.');
  }
```

3. **Llamar `initImageModal()`** justo antes del cierre `})();` del IIFE, después de `initHamburgerMenu()`.

4. **Agregar estilo `cursor: zoom-in`** para imágenes en `.card-image` dentro del CSS de `styles.css` — este es un ajuste menor de UX que puede hacerse aquí o en el T01 (si no se hizo allí). Si ya está cubierto en T01, omitir. Agregar al bloque de la imagen en el lightbox CSS:

```css
.card-image img {
  cursor: zoom-in;
}
```

   **Nota:** Este CSS puede ir en `styles.css` o hacerse inline en JS (`img.style.cursor = 'zoom-in'`). La forma JS del Step 2 ya lo cubre inline para las imágenes presentes al cargar; para imágenes en `.card-detail` que se revelan después, el cursor se set vía CSS rule en styles.css (más robusto).

5. **Verificar sintaxis JS** ejecutando:

```bash
node -e "eval(require('fs').readFileSync('app.js','utf8'))" 2>&1 | head -5
```
   Si no hay output, el JS está libre de errores de sintaxis.

## Must-Haves

- [ ] Event delegation en `document.body` (no en `.card-image` ni en `section`) — cubre imágenes reveladas por accordeones
- [ ] `img.closest('.card-image img')` → `e.target.closest('.card-image img')` — usa `closest()` para tolerar clicks en descendientes
- [ ] Attribution se lee de `.img-attribution` dentro del mismo `.card-image` (no del `<cite>` del footer del card)
- [ ] `lastTrigger` guarda el elemento `<img>` trigger; `closeModal()` le devuelve el focus
- [ ] `modal.removeAttribute('hidden')` para abrir; `modal.setAttribute('hidden', '')` para cerrar (consistent con el atributo `hidden` del HTML)
- [ ] `document.body.style.overflow = 'hidden'` al abrir; restaurado al cerrar
- [ ] Esc handler en el `modal` (no en `window`) — scoped al modal para no interferir con otros handlers de teclado
- [ ] `initImageModal()` se llama dentro del IIFE (no fuera de él)
- [ ] No rompe `initImageFallbacks()` existente — el handler de error de imagen sigue funcionando

## Verification

```bash
# 1. Función existe y se llama
grep -q "function initImageModal" app.js && echo "function exists PASS" || echo "FAIL: function missing"
grep -q "initImageModal()" app.js && echo "function called PASS" || echo "FAIL: not called"

# 2. Event delegation en document.body
grep -q "document\.body\.addEventListener" app.js && echo "event delegation PASS" || echo "FAIL: event delegation"

# 3. Esc key handler
grep -q "Escape" app.js && echo "Esc handler PASS" || echo "FAIL: Esc"

# 4. Attribution sourcing from .img-attribution
grep -q "img-attribution" app.js && echo "attribution PASS" || echo "FAIL: attribution"

# 5. Focus management
grep -q "lastTrigger" app.js && echo "focus restore PASS" || echo "FAIL: focus restore"

# 6. Sin errores de sintaxis JS
node -e "eval(require('fs').readFileSync('app.js','utf8'))" 2>&1 | grep -v "^$" && echo "syntax errors found" || echo "syntax OK PASS"
```

## Inputs

- `app.js` (810 líneas) — IIFE existente. Insertar `initImageModal()` antes del cierre `})();`. La estructura del IIFE termina en:
  ```
    initHamburgerMenu();
  
  })();
  ```
- `index.html` — modal HTML creado en T01 (`#img-modal`, `.modal-close`, `.img-modal__img`, `.img-modal__alt-text`, `.img-modal__attribution`, `.img-modal__overlay`)
- **Clave:** `.img-attribution` es un `<p>` dentro de `.card-image`, solo en 3 tarjetas (líneas 1725, 1980, 2740 en index.html). La mayoría de tarjetas no tienen `.img-attribution` — en ese caso `attrEl` debe quedar vacío/oculto.
- Accordeones: `.card-detail` (con `hidden`) contiene texto pero NO imágenes (verificado en codebase). Sin embargo, la spec del M013-CONTEXT requiere event delegation en `document.body` para cubrir el caso general (futuras imágenes en accordeones).

## Observability Impact

**What changes when this task runs:**
- `initImageModal()` attaches two `click` listeners on `document.body` and one `keydown` listener on `#img-modal`. Inspect via DevTools → Event Listeners panel on those elements.
- When the modal is open: `document.getElementById('img-modal').hidden === false`; `document.querySelector('.img-modal__img').src` contains the image URL; `document.body.style.overflow === 'hidden'`.
- When the modal is closed: `hidden` attribute is restored; `document.querySelector('.img-modal__img').src === ''`; `document.body.style.overflow === ''`.
- `console.debug('[Modal] Image modal initialized.')` fires at page load if `initImageModal()` was called successfully.
- `console.warn('[Modal] Required elements not found — modal disabled.')` fires if `#img-modal` or its required children are missing from the DOM.

**Failure state visibility:**
- If `initImageModal` was never called: no `click` listener on `document.body` for `.card-image img`; DevTools → Event Listeners on `body` will show no modal-related handler.
- If modal stays open after Esc: inspect `modal.addEventListener('keydown', ...)` was attached — check DevTools Event Listeners on `#img-modal`.
- If attribution shows when it shouldn't: `attrEl.style.display` should be `'none'` when no `.img-attribution` sibling found.

**Diagnostic command:**
```bash
node -e "
const js = require('fs').readFileSync('app.js','utf8');
console.log('initImageModal defined:', /function initImageModal/.test(js));
console.log('initImageModal called:', /initImageModal\(\)/.test(js));
console.log('event delegation:', /document\.body\.addEventListener/.test(js));
console.log('Esc handler:', /Escape/.test(js));
console.log('focus restore:', /lastTrigger/.test(js));
"
```

## Expected Output

- `app.js` — función `initImageModal()` insertada dentro del IIFE, llamada al final, con event delegation, attribution sourcing, focus management, Esc/click-outside, y sin errores de sintaxis
