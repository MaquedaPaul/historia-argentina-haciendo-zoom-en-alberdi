# S02: Verificación visual + Fix pre-deploy

**Goal:** Verificar en un browser real que el lightbox modal funciona correctamente en todos los contextos del sitio — incluyendo imágenes reveladas por acordeones de M012 — y aplicar cualquier fix necesario antes del deploy.
**Demo:** Un ejecutor lanza el servidor local, abre el sitio, clickea imágenes en las tres secciones de contenido (colonial, revolución, nacional), expande un acordeón y clickea la imagen revelada, verifica cierre por Esc/overlay/botón, verifica comportamiento mobile, y el script de verificación estructural pasa en verde.

## Must-Haves

- Click en imágenes de `.card-image` en las tres secciones abre el modal con la imagen grande y caption
- Imágenes dentro de `.card-detail` expandidos (M012 accordion) también abren el modal (event delegation)
- Esc, click en overlay y botón × cierran el modal; el foco regresa a la imagen trigger
- Mobile (375px viewport): la imagen no desborda el viewport, el modal es usable
- Script Node.js de verificación estructural termina con exit 0

## Verification

```bash
node .gsd/milestones/M013/slices/S02/verify-s02.js
```

El script verifica:
- `#img-modal` existe con `role="dialog"`, `aria-modal="true"`, atributo `hidden` por defecto
- `.modal-close` existe dentro del modal
- `.img-modal__img` existe
- `initImageModal` está presente en `app.js`
- Delegación en `document.body` y handler de `Escape` presentes en `app.js`
- 57 imágenes con clase `.card-image` en el HTML (±5 tolerancia — confirma que no se rompió la estructura)
- JS pasa `new Function()` sin errores de sintaxis

## Tasks

- [x] **T01: Verificación en browser y fix de regresiones** `est:45m`
  - Why: El modal nunca fue probado en un browser real — S01 solo verificó estructura estática. Esta es la prueba de integración real: comportamiento dinámico, animaciones, focus, mobile, y la integración con los acordeones de M012.
  - Files: `index.html`, `styles.css`, `app.js`
  - Do: (1) Iniciar servidor local con `npx serve .` en el directorio del worktree y abrir `http://localhost:3000` en el browser via `browser_navigate`. (2) Clickear una imagen en la sección colonial → verificar que el modal abre, la imagen se muestra, el caption tiene texto. (3) Cerrar con botón ×, con Esc, y con click en overlay — verificar que el modal cierra y el foco regresa. (4) Expandir un card de M012 (`.card-expand-toggle`) y luego clickear la imagen revelada dentro del `.card-detail` — verificar que el event delegation funciona. (5) Verificar en viewport 375px (`browser_set_viewport`) que la imagen no desborda. (6) Si se encuentran bugs: aplicar fix en los archivos correspondientes y re-verificar. Bugs conocidos a vigilar según S01 Forward Intelligence: `document.body.style.overflow='hidden'` puede no funcionar en iOS Safari (workaround: agregar `document.body.style.position='fixed'` si el scroll no se bloquea en viewport mobile).
  - Verify: `node -e "try{new Function(require('fs').readFileSync('app.js','utf8'));console.log('OK')}catch(e){console.error(e);process.exit(1)}"` pasa; el browser muestra el modal abierto y cerrado correctamente.
  - Done when: El modal abre y cierra en los tres contextos (colonial, revolución/nacional, dentro de acordeón expandido), el viewport mobile 375px no desborda, y el JS no tiene errores de sintaxis.

- [x] **T02: Escribir y ejecutar script de verificación estructural** `est:15m`
  - Why: El deploy (S03) necesita un gate mecánico que confirme que la estructura del modal y la integridad de los archivos no se rompieron durante ningún fix. El script también sirve como regresión para futuros agentes.
  - Files: `.gsd/milestones/M013/slices/S02/verify-s02.js`
  - Do: Crear el script `verify-s02.js` en el directorio de la slice. El script debe: (1) Leer `index.html` y verificar con regex: `id="img-modal"`, `role="dialog"`, `aria-modal="true"`, atributo `hidden` en el elemento, `class="modal-close"`, `img-modal__img`. (2) Leer `app.js` y verificar: `initImageModal`, `document.body`, `Escape`, `openModal`, `closeModal`. (3) Verificar JS syntax con `new Function()`. (4) Contar `class="card-image"` en el HTML: debe ser ≥ 50 (hay 57 en el estado actual — que no haya regresión). (5) Reportar PASS/FAIL por check y salir con `process.exit(1)` si alguno falla. Ejecutar el script con `node verify-s02.js` desde el worktree root. El path relativo para leer archivos desde el script debe usar `path.join(__dirname, '../../../../../../', 'index.html')` — el script vive en `.gsd/milestones/M013/slices/S02/` y los archivos de contenido en el worktree root.
  - Verify: `node .gsd/milestones/M013/slices/S02/verify-s02.js` termina con exit 0 y muestra todos los checks en PASS.
  - Done when: El script existe, es ejecutable con Node.js, y termina con exit 0 en el worktree actual.

## Files Likely Touched

- `index.html` — posibles fixes de modal (si se encuentran bugs en T01)
- `styles.css` — posibles fixes CSS (overflow iOS, z-index)
- `app.js` — posibles fixes JS (overflow mobile, edge cases)
- `.gsd/milestones/M013/slices/S02/verify-s02.js` — script de verificación estructural (nuevo)

## Observability / Diagnostics

**Runtime signals:**
- `document.getElementById('img-modal').hasAttribute('hidden')` → `true` cuando cerrado, `false` cuando abierto
- `document.querySelector('.card-image img').getAttribute('tabindex')` → `"0"` si `initImageModal()` se ejecutó correctamente; `null` si el script falló antes de llegar a esa función
- `document.querySelector('.card-image img').style.cursor` → `"zoom-in"` si init OK
- `document.body.style.overflow` y `document.documentElement.style.overflow` → ambos `"hidden"` con modal abierto, `""` con modal cerrado
- Console DevTools: `[Modal] Image modal initialized.` confirma init exitoso; `[Modal] Required elements not found — modal disabled.` indica fallo de init

**Failure visibility:**
- Si el modal no abre al clickear una imagen: verificar que `#img-modal` está en el DOM ANTES de `<script src="app.js">` (bug encontrado en T01: el modal estaba después del script, causando que `getElementById('img-modal')` retornara `null`)
- Si el scroll del body no se bloquea en iOS: verificar que ambos `document.body.style.overflow` y `document.documentElement.style.overflow` están seteados a `'hidden'`
- Si el event delegation no funciona: `document.body.addEventListener` debe estar activo — testeable via `var img = document.querySelector('.card-image img'); img.click()` en consola

**Inspection surfaces:**
- `node .gsd/milestones/M013/slices/S02/verify-s02.js` — verificación estructural completa
- `node -e "new Function(require('fs').readFileSync('app.js','utf8'))"` — syntax check rápido
- Browser DevTools > Elements > `#img-modal[hidden]` — estado del modal

**Redaction:** No hay datos de usuario ni secrets en esta slice — todos los valores son estructurales/DOM.
