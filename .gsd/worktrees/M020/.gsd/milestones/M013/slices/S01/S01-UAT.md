# S01: Implementar lightbox modal — UAT

**Milestone:** M013
**Written:** 2026-03-24

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: El lightbox es código estático (HTML/CSS/JS en archivos locales) sin servidor ni base de datos. La verificación de artefactos confirma estructura, estilos y lógica. La verificación visual en browser (S02) complementará con runtime checks; este UAT cubre los contratos de los artefactos.

## Preconditions

- Los tres archivos modificados existen en el working directory: `index.html`, `styles.css`, `app.js`
- Node.js disponible para ejecutar los checks (grep no disponible en Windows sin Git Bash)
- Para test en browser: abrir `index.html` directamente en un navegador moderno (Chrome/Firefox/Edge)

## Smoke Test

```bash
node -e "
const h=require('fs').readFileSync('index.html','utf8');
const c=require('fs').readFileSync('styles.css','utf8');
const j=require('fs').readFileSync('app.js','utf8');
console.assert(h.includes('id=\"img-modal\"'), 'modal HTML');
console.assert(c.includes('img-modal'), 'modal CSS');
console.assert(j.includes('initImageModal'), 'modal JS');
console.log('SMOKE TEST PASS');
"
```

**Expected:** `SMOKE TEST PASS` — confirma que los tres artefactos tienen las partes críticas.

---

## Test Cases

### 1. HTML — Estructura del modal con atributos ARIA

```bash
node -e "
const html = require('fs').readFileSync('index.html','utf8');
const checks = [
  [/id=\"img-modal\"/, 'modal id'],
  [/role=\"dialog\"/, 'role=dialog'],
  [/aria-modal=\"true\"/, 'aria-modal'],
  [/aria-label=/, 'aria-label on modal'],
  [/modal-close/, 'close button class'],
  [/modal-caption/, 'caption element'],
  [/hidden/, 'hidden by default'],
  [/img-modal__overlay/, 'overlay element'],
  [/img-modal__img/, 'image element'],
];
let ok = true;
checks.forEach(([re, name]) => { if (!re.test(html)) { console.error('FAIL:', name); ok = false; } });
if (ok) console.log('HTML checks PASS');
"
```

**Expected:** `HTML checks PASS` — todos los 9 checks deben pasar.

---

### 2. CSS — Estilos del lightbox presentes

```bash
node -e "
const css = require('fs').readFileSync('styles.css','utf8');
const checks = [
  ['img-modal', 'modal selector'],
  ['modal-close', 'close button'],
  ['modal-fade-in', 'fade animation'],
  ['prefers-reduced-motion', 'reduced motion'],
  ['z-index', 'z-index stacking'],
  ['zoom-in', 'cursor zoom-in'],
];
let ok = true;
checks.forEach(([s, name]) => { if (!css.includes(s)) { console.error('FAIL:', name); ok = false; } });
if (ok) console.log('CSS checks PASS');
"
```

**Expected:** `CSS checks PASS`

---

### 3. JS — Función initImageModal con event delegation y accesibilidad

```bash
node -e "
const js = require('fs').readFileSync('app.js','utf8');
const checks = [
  [/function initImageModal/, 'function defined'],
  [/initImageModal\(\)/, 'function called'],
  [/document\.body.*addEventListener|addEventListener.*document\.body/, 'event delegation on body'],
  [/Escape/, 'Esc key handler'],
  [/lastTrigger/, 'focus restore pattern'],
  [/img-attribution/, 'attribution sourcing'],
  [/tabindex/, 'keyboard accessibility'],
  [/removeAttribute\('hidden'\)/, 'open via hidden removal'],
  [/setAttribute\('hidden'/, 'close via hidden set'],
];
let ok = true;
checks.forEach(([re, name]) => { if (!re.test(js)) { console.error('FAIL:', name); ok = false; } });
if (ok) console.log('JS checks PASS');
"
```

**Expected:** `JS checks PASS`

---

### 4. JS — Sin errores de sintaxis

```bash
node -e "
try {
  new Function(require('fs').readFileSync('app.js','utf8'));
  console.log('JS syntax OK PASS');
} catch(e) {
  if (e instanceof SyntaxError) console.error('SYNTAX ERROR:', e.message);
  else console.log('syntax OK (runtime-only error)');
}
"
```

**Expected:** `JS syntax OK PASS`

---

### 5. Integración — Modal al final del body, después del script

```bash
node -e "
const html = require('fs').readFileSync('index.html','utf8');
const scriptIdx = html.lastIndexOf('<script src=\"app.js\">');
const modalIdx = html.indexOf('id=\"img-modal\"');
const bodyCloseIdx = html.lastIndexOf('</body>');
console.assert(modalIdx > scriptIdx, 'modal after script tag');
console.assert(modalIdx < bodyCloseIdx, 'modal before </body>');
console.log('Placement check PASS — modal at idx', modalIdx, ', script at', scriptIdx, ', </body> at', bodyCloseIdx);
"
```

**Expected:** `Placement check PASS` con índices confirmando que `scriptIdx < modalIdx < bodyCloseIdx`.

---

## Edge Cases

### Event delegation cubre imágenes en card-detail expandidos (M012 integration)

El event listener de apertura del modal usa `document.body.addEventListener('click', ...)` con `e.target.closest('.card-image img')`. Esto captura clicks en imágenes reveladas dinámicamente por acordeones M012.

**Verificar en browser:**
1. Abrir `index.html` en browser.
2. Expandir un card que tenga `.card-detail` (sección 1800-1860 tiene expand/collapse de M012).
3. Hacer click en la imagen dentro del detalle expandido.
4. **Expected:** El modal se abre con la imagen ampliada — confirma que event delegation funciona post-DOM-insertion.

---

### Esc cierra el modal

**Verificar en browser:**
1. Click en cualquier imagen de card → modal abre.
2. Presionar tecla `Escape`.
3. **Expected:** Modal se cierra, focus regresa a la imagen que lo abrió.

---

### Click en overlay cierra (no en la imagen)

**Verificar en browser:**
1. Click en cualquier imagen de card → modal abre.
2. Click en el área oscura alrededor de la imagen (el overlay).
3. **Expected:** Modal se cierra.
4. Click en la imagen ampliada dentro del modal.
5. **Expected:** Modal NO se cierra (click en imagen no propaga al overlay).

---

### Mobile — imagen no desborda el viewport

**Verificar en browser (DevTools mobile 375px):**
1. Abrir DevTools → Toggle Device Toolbar → iPhone SE (375×667).
2. Click en cualquier imagen de card → modal abre.
3. **Expected:** La imagen está contenida dentro del viewport, no hay scroll horizontal, la imagen no excede `75vh` de altura.

---

### Accesibilidad de teclado — Tab mantiene focus en modal

**Verificar en browser:**
1. Click en imagen → modal abre, focus en botón ×.
2. Presionar `Tab` repetidamente.
3. **Expected:** Focus permanece en el botón × (focus trap — el modal sólo tiene un elemento interactivo).
4. Presionar `Enter` o `Space` con focus en el botón ×.
5. **Expected:** Modal se cierra, focus regresa a la imagen trigger.

---

### Focus regresa al trigger correcto cuando múltiples imágenes existen

**Verificar en browser:**
1. Click en la imagen del Evento 3 (ej: sección colonial).
2. Cerrar con Esc.
3. **Expected:** Focus está sobre la imagen del Evento 3 (la que abrió el modal), no en otra imagen.
4. Tabular a la imagen del Evento 5.
5. Presionar Enter/Space → modal abre.
6. Cerrar con ×.
7. **Expected:** Focus regresa a la imagen del Evento 5.

---

### Modal sin atribución — se oculta el elemento de atribución

**Verificar en browser:**
1. Identificar un card que NO tenga `.img-attribution` dentro de `.card-image`.
2. Click en su imagen → modal abre.
3. **Expected:** El elemento `.img-modal__attribution` no es visible (hidden/empty), sin texto de atribución vacío visible.

---

### Modal con atribución — se muestra el elemento de atribución

**Verificar en browser:**
1. Identificar un card que SÍ tenga `.img-attribution` (ej: cards con fotografías Wikimedia con licencia CC).
2. Click en su imagen → modal abre.
3. **Expected:** El elemento `.img-modal__attribution` muestra el texto de atribución del HTML del card original.

---

## Failure Signals

- `console.warn('[Modal] Required elements not found — modal disabled.')` en DevTools Console → algún elemento del modal falta en el HTML
- Click en imagen y nada ocurre → `initImageModal()` no fue llamada, o el HTML del modal no existe
- Modal se abre pero imagen es `broken` / vacía → `modalImg.src` no se está poblando; verificar `.card-image img` selector
- Modal no cierra con Esc → keydown listener no está adjunto al elemento modal
- Scroll del fondo continúa cuando modal está abierto → `document.body.style.overflow = 'hidden'` no se aplica
- Focus no regresa tras cerrar → `lastTrigger` no fue guardado o fue nulado prematuramente
- Imagen desborda viewport en mobile → `.img-modal__img { max-height: 75vh }` no está en styles.css

## Not Proven By This UAT

- Verificación visual de apariencia real (colores, tamaños, fuentes, animación) — cubre S02
- Integración con acordeones M012 en browser real con estado dinámico expandido/colapsado — cubre S02
- Comportamiento en Safari/iOS mobile con `overflow:hidden` en body (puede necesitar `position:fixed`) — no verificado
- Performance: tiempo de apertura del modal con imágenes grandes de Wikimedia
- Cross-browser testing (Firefox, Safari, Edge) — no cubierto por artefact-driven UAT

## Notes for Tester

- Los checks de bash con `grep` no funcionan en Windows sin Git Bash; todos los test cases de este UAT usan Node.js intencionalmente.
- El modal está visible en el HTML con `hidden` attribute — esto es intencional. Abrir DevTools → Elements → buscar `#img-modal` para inspeccionar su estado.
- `document.getElementById('img-modal').hidden` en la consola del browser es el diagnóstico más rápido del estado del modal.
- Las imágenes placeholder (las que fallan y muestran el fallback de `initImageFallbacks`) también deben poder abrir el modal — el event delegation captura cualquier `<img>` dentro de `.card-image` independientemente de si su src cargó o no.
