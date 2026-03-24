---
estimated_steps: 4
estimated_files: 2
---

# T01: Agregar HTML del modal e CSS de lightbox

**Slice:** S01 — Implementar lightbox modal
**Milestone:** M013

## Description

Agregar el elemento HTML `#img-modal` al final del `<body>` de `index.html` y las reglas CSS correspondientes al final de `styles.css`. El modal queda estático (oculto por defecto); el JS del T02 lo activará. Este task no toca `app.js`.

## Steps

1. **Leer el final de `index.html`** para encontrar el cierre `</body>` y confirmar que no existe ya un `#img-modal`.

2. **Insertar el HTML del modal** inmediatamente antes de `</body>` en `index.html`:

```html
<!-- ===== Lightbox Modal ===== -->
<div id="img-modal" class="img-modal" role="dialog" aria-modal="true" aria-label="Vista ampliada de imagen" hidden>
  <div class="img-modal__overlay" aria-hidden="true"></div>
  <div class="img-modal__container">
    <button class="modal-close" aria-label="Cerrar imagen">
      <span aria-hidden="true">×</span>
    </button>
    <img class="img-modal__img" src="" alt="">
    <div class="img-modal__caption">
      <p class="img-modal__alt-text"></p>
      <p class="img-modal__attribution"></p>
    </div>
  </div>
</div>
```

3. **Agregar reglas CSS al final de `styles.css`** (después de los estilos del `.sound-toggle`):

```css
/* ===================================================================
   Lightbox Modal
   =================================================================== */

.img-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: modal-fade-in 0.2s ease forwards;
}

.img-modal[hidden] {
  display: none;
}

@keyframes modal-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.img-modal__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.82);
  cursor: pointer;
}

.img-modal__container {
  position: relative;
  z-index: 1;
  max-width: min(90vw, 900px);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.img-modal__img {
  display: block;
  max-width: 100%;
  max-height: 75vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 4px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.6);
}

.img-modal__caption {
  color: #e8dcc8;
  text-align: center;
  font-family: var(--font-body);
  font-size: 0.85rem;
  line-height: 1.5;
  max-width: 640px;
}

.img-modal__alt-text {
  margin: 0 0 0.25rem;
  font-style: italic;
}

.img-modal__attribution {
  margin: 0;
  opacity: 0.75;
  font-size: 0.78rem;
}

.modal-close {
  position: absolute;
  top: -2.5rem;
  right: 0;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #fff;
  font-size: 1.5rem;
  line-height: 1;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, border-color 0.15s;
}

.modal-close:hover,
.modal-close:focus-visible {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.8);
  outline: none;
}

@media (prefers-reduced-motion: reduce) {
  .img-modal {
    animation: none;
  }
}

@media (max-width: 30rem) {
  .img-modal__container {
    max-width: 96vw;
  }
  .img-modal__img {
    max-height: 65vh;
  }
}
```

4. **Verificar** que el HTML y el CSS tienen sintaxis correcta (sin etiquetas sin cerrar, sin `{` desbalanceadas).

## Must-Haves

- [ ] `id="img-modal"` con `role="dialog"`, `aria-modal="true"`, `aria-label="Vista ampliada de imagen"` y atributo `hidden` en el HTML
- [ ] Elemento `.img-modal__overlay` separado del contenedor (permite "click fuera cierra" sin capturar clicks en la imagen)
- [ ] Botón `.modal-close` con `aria-label="Cerrar imagen"`
- [ ] Imagen `.img-modal__img` con `src=""` y `alt=""` vacíos (se populan via JS en T02)
- [ ] `<p class="img-modal__alt-text">` y `<p class="img-modal__attribution">` vacíos para caption y atribución
- [ ] CSS usa `display: none` cuando `hidden` está presente (la regla `.img-modal[hidden] { display: none }`)
- [ ] `max-height: 75vh` en la imagen — previene desbordamiento en mobile
- [ ] `@media (prefers-reduced-motion: reduce)` desactiva la animación
- [ ] No rompe nada existente — el modal está `hidden` por defecto y no interfiere con el layout

## Verification

```bash
node -e "
const h = require('fs').readFileSync('index.html','utf8');
const checks = [
  'id=\"img-modal\"',
  'role=\"dialog\"',
  'aria-modal=\"true\"',
  'aria-label=\"Vista ampliada de imagen\"',
  'modal-close',
  'img-modal__overlay',
  'img-modal__img',
  'img-modal__alt-text',
  'img-modal__attribution',
];
let ok = true;
checks.forEach(s => { if (!h.includes(s)) { console.error('FAIL missing:', s); ok = false; } });
if (ok) console.log('HTML PASS');
"
grep -q "img-modal" styles.css && echo "CSS: img-modal PASS" || echo "CSS FAIL"
grep -q "modal-fade-in" styles.css && echo "CSS: animation PASS" || echo "CSS animation FAIL"
grep -q "prefers-reduced-motion" styles.css && echo "CSS: reduced-motion PASS" || echo "CSS reduced-motion FAIL"
```

## Inputs

- `index.html` — archivo HTML existente; insertar el modal antes de `</body>`
- `styles.css` — hoja de estilos existente (2607 líneas); agregar al final después de los estilos `.sound-toggle`
- No depende de T02 — este task es independiente del JS

## Expected Output

- `index.html` — con el elemento `#img-modal` estructurado justo antes de `</body>`
- `styles.css` — con los ~70 líneas de estilos del lightbox al final del archivo
