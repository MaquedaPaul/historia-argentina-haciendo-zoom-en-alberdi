# S02: Integración HTML — sub-período #rev-invasiones-inglesas con cards completas

**Goal:** Integrar el sub-período `#rev-invasiones-inglesas` en `index.html` como un bloque de 18 `<article>` cards con certeza, imágenes, expand/collapse y `card-nota-historiografica` donde el draft lo exige; actualizar el sub-nav y preparar el bloque para que S03 añada los marcadores de timeline y los conectores narrativos.

**Demo:** `querySelectorAll('#rev-invasiones-inglesas [data-certeza]').length >= 18` es `true`; el sub-nav tiene un link `<a href="#rev-invasiones-inglesas">`; expand/collapse funciona en cards con detalle; reveal-on-scroll opera sobre todos los nuevos elementos; sin errores JS en consola; correcto en 320px y 1920px+.

## Must-Haves

- Sub-período `<div id="rev-invasiones-inglesas" class="sub-period reveal reveal-fade">` integrado en `#periodo-revolucion` **antes** de `#rev-alberdi-formacion`
- 18 `<article>` cards (INV-01 a INV-18) con `data-certeza`, certeza-indicator, año, título, excerpt, y `<footer class="card-source"><cite>` con fuentes
- 6 cards con `card-nota-historiografica` (INV-04, INV-07, INV-08, INV-13, INV-16, INV-18 — según draft)
- 4 cards como `card-rumor` o con sección `card-rumor` embebida (INV-04, INV-07, INV-13, INV-16 — según draft)
- 11 cards con `<div class="card-detail" hidden>` + `<button class="card-expand-toggle">` (todas las que tienen "Detalle expandible" en el draft)
- 15 cards con `<div class="card-image"><img ...></div>` con URLs verificadas del draft; 3 PLACEHOLDERs resueltos o reemplazados por imagen alternativa documentada en el draft
- Sub-nav actualizado con `<a href="#rev-invasiones-inglesas">` como primer link (1806–1807 es cronológicamente anterior a todos los otros sub-períodos)
- Stagger delays: `--reveal-delay: 0ms` a `--reveal-delay: 1360ms` (18 cards × 80ms, reseteando por grupo si hay sub-secciones)
- Sin errores JS en consola al cargar y al usar expand/collapse
- Verificable via DOM query en Node.js headless

## Proof Level

- This slice proves: integration (HTML en el navegador, expand/collapse, reveal-on-scroll)
- Real runtime required: yes (browser/Node.js para verificación DOM)
- Human/UAT required: yes (visual 320px y 1920px+)

## Verification

```bash
# V1: conteo de cards con certeza en el nuevo sub-período
node -e "
const fs = require('fs');
const html = fs.readFileSync('index.html','utf8');
const matches = html.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/);
if (!matches) { console.error('FAIL: sub-período no encontrado'); process.exit(1); }
const block = matches[0];
const cards = (block.match(/data-certeza/g)||[]).length;
console.log('Cards con data-certeza:', cards);
if (cards < 18) { console.error('FAIL: esperadas >= 18, encontradas ' + cards); process.exit(1); }
console.log('PASS');
"

# V2: sub-nav link presente
grep -q 'href="#rev-invasiones-inglesas"' index.html && echo "PASS: sub-nav link encontrado" || echo "FAIL: sub-nav link ausente"

# V3: expand/collapse botones presentes en el sub-período
node -e "
const fs = require('fs');
const html = fs.readFileSync('index.html','utf8');
const matches = html.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/);
const block = matches ? matches[0] : '';
const toggles = (block.match(/card-expand-toggle/g)||[]).length;
console.log('Expand toggles encontrados:', toggles);
if (toggles < 10) { console.error('FAIL: esperados >= 10 toggles'); process.exit(1); }
console.log('PASS');
"

# V4: imágenes sin src vacío (indica PLACEHOLDER no resuelto silenciosamente)
node -e "
const fs = require('fs');
const html = fs.readFileSync('index.html','utf8');
const matches = html.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/);
const block = matches ? matches[0] : '';
const emptySrc = (block.match(/src=\"\"/g)||[]).length;
if (emptySrc > 0) { console.error('FAIL: ' + emptySrc + ' img con src vacío encontradas'); process.exit(1); }
console.log('PASS: ninguna img con src vacío');
"

# V5: sin errores de sintaxis JS
node -e "
try {
  new Function(require('fs').readFileSync('app.js','utf8'));
  console.log('PASS: app.js syntax OK');
} catch(e) {
  if (e instanceof SyntaxError) { console.error('FAIL SYNTAX:', e.message); process.exit(1); }
  else console.log('PASS: app.js syntax OK (runtime-only error)');
}
"

# V6: card-nota-historiografica presente en el bloque (>=4)
node -e "
const fs = require('fs');
const html = fs.readFileSync('index.html','utf8');
const matches = html.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/);
const block = matches ? matches[0] : '';
const notas = (block.match(/card-nota-historiografica/g)||[]).length;
console.log('card-nota-historiografica encontradas:', notas);
if (notas < 4) { console.error('FAIL: esperadas >= 4'); process.exit(1); }
console.log('PASS');
"
```

**Failure-path diagnostic:** Si V1 falla, `grep -n "rev-invasiones-inglesas" index.html` muestra si el bloque existe pero las cards faltan. Si V3 falla, `grep -c "card-expand-toggle" index.html` da el total global — comparar con el conteo esperado post-S02. Si V4 falla, `grep -n 'src=""' index.html` localiza las imágenes vacías. Si V5 falla, el mensaje SyntaxError incluye línea y columna.

## Observability / Diagnostics

- **Runtime signals:** expand/collapse usa `card-expand-toggle` con `aria-expanded` que cambia de `false` a `true` — inspeccionable via `document.querySelector('.card-expand-toggle').getAttribute('aria-expanded')` en DevTools. El reveal-on-scroll agrega `reveal--visible` a cada card cuando entra en viewport — inspeccionable via `document.querySelectorAll('#rev-invasiones-inglesas .reveal--visible').length`.
- **Inspection surfaces:**
  - `node -e "const h=require('fs').readFileSync('index.html','utf8'); console.log((h.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/)||[''])[0].length + ' chars')"` — muestra si el bloque existe y su tamaño
  - `grep -c "data-certeza" index.html` — conteo global de cards (pre/post S02 debería incrementar en 18)
  - `grep -n "card-nota-historiografica" index.html` — localiza todas las notas historiográficas por línea
- **Failure visibility:** Los 3 PLACEHOLDERs de imagen (INV-03, INV-05, INV-09) son el mayor riesgo de imagen vacía. `initImageFallbacks()` en `app.js` dispara para cualquier `<img>` que falle al cargar — esto es comportamiento esperado para PLACEHOLDERs, pero `src=""` los hace fallar silenciosamente sin fallback. Verificación V4 detecta este estado.
- **Redaction constraints:** Ninguna — contenido histórico público, sin datos sensibles.

## Integration Closure

- Upstream surfaces consumed: `S01-CONTENT-DRAFT.md` (18 entradas INV-01 a INV-18 con contenido final), `index.html` (estructura existente del `#periodo-revolucion` y sub-nav), `styles.css` (clases existentes: `card-hecho`, `card-opinion`, `card-rumor`, `card-nota-historiografica`, `card-expand-toggle`, `card-detail`, `events-grid--certeza`, `sub-period`, `reveal`, `reveal-fade`, `reveal-slide`)
- New wiring introduced: `<div id="rev-invasiones-inglesas">` insertado antes de `<div id="rev-alberdi-formacion">`; `<a href="#rev-invasiones-inglesas">` agregado al `<nav class="sub-nav">`; el sub-nav IntersectionObserver auto-descubre el nuevo sub-período por clase `.sub-period` — sin cambios en `app.js`
- What remains before the milestone is truly usable end-to-end: S03 (timeline markers 1806/1807, card contexto europeo integrada, nexo causal explícito en el flujo narrativo)

## Tasks

- [x] **T01: Insertar sub-período wrapper, sub-nav link y cards INV-01 a INV-09** `est:2h`
  - Why: La primera mitad del draft (contexto virreinal, expedición Popham/Beresford, caída de Buenos Aires, Sobremonte, tesoro, Liniers, Álzaga, destitución Sobremonte, regimientos criollos) debe integrarse en HTML antes de poder testear nada.
  - Files: `index.html`
  - Do: (1) Abrir `S01-CONTENT-DRAFT.md`, leer INV-01 a INV-09. (2) Antes de `<div id="rev-alberdi-formacion"` en `index.html`, insertar `<div id="rev-invasiones-inglesas" class="sub-period reveal reveal-fade">` con `<h3>`, `<div class="events-grid events-grid--certeza">`, y las 9 primeras cards. (3) Cada card sigue la plantilla exacta del codebase (ver ejemplo abajo). (4) INV-04 y INV-07 requieren `<p class="card-nota-historiografica">` dentro del `<div class="card-detail">`. (5) Agregar `<a href="#rev-invasiones-inglesas" class="sub-nav__link">1806–1807<span class="sub-nav__link-label">Invasiones Inglesas</span></a>` como **primer** link del `<nav class="sub-nav">`. (6) Stagger delays: INV-01=0ms, INV-02=80ms, ..., INV-09=640ms.
  - Verify: `node -e "const h=require('fs').readFileSync('index.html','utf8'); const b=(h.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/)||[''])[0]; console.log('certeza cards:',(b.match(/data-certeza/g)||[]).length);"` → debe mostrar ≥ 9; `grep -q 'href="#rev-invasiones-inglesas"' index.html && echo PASS`
  - Done when: 9 cards presentes en el DOM del bloque `#rev-invasiones-inglesas`, sub-nav link presente, stagger correcto.

- [x] **T02: Agregar cards INV-10 a INV-18 y cerrar el sub-período** `est:2h`
  - Why: La segunda mitad del draft (Saavedra, Belgrano, Pueyrredón, fuga de Beresford, desfase informativo, Defensa de Buenos Aires, Whitelocke en juicio, Bayona, nexo causal) completa las 18 cards y el bloque queda listo para verificación.
  - Files: `index.html`
  - Do: (1) Leer INV-10 a INV-18 del draft. (2) Agregar las 9 cards dentro de `<div id="rev-invasiones-inglesas">` continuando desde donde T01 terminó. (3) INV-13 tiene una sección `card-rumor` embebida (el rol de Ana Périchon): renderizarla como `<p class="card-rumor__text">` con `<footer class="card-rumor__origin">` dentro del `<div class="card-detail">`, precedida de la narrativa de Rodríguez Peña/Padilla como `card-hecho`. (4) INV-16 (Whitelocke) requiere `<p class="card-nota-historiografica">` con las 4 hipótesis sobre el bombardeo como lista — dentro del `<div class="card-detail">`. (5) INV-18 (nexo causal) es `card-opinion` con `<blockquote class="card-opinion__quote">` citando la frase sobre condiciones necesarias vs. causas suficientes. (6) Cerrar `</div><!-- /#rev-invasiones-inglesas -->` después de INV-18. (7) Stagger: INV-10=720ms, INV-11=800ms, ..., INV-18=1360ms.
  - Verify: `node -e "const h=require('fs').readFileSync('index.html','utf8'); const b=(h.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/)||[''])[0]; console.log('certeza cards:',(b.match(/data-certeza/g)||[]).length);"` → debe mostrar 18; `grep -q '\/\*.*\/#rev-invasiones-inglesas\|<!-- \/#rev-invasiones-inglesas' index.html && echo "cierre encontrado"`
  - Done when: 18 `data-certeza` en el bloque; cierre del `</div>` con comentario; INV-16 tiene card-nota-historiografica; INV-18 está marcada como card-opinion.

- [x] **T03: Resolver PLACEHOLDERs de imagen, verificar DOM completo y responsiveness** `est:1h`
  - Why: Los 3 PLACEHOLDERs de imagen (INV-03, INV-05, INV-09) necesitan resolución antes de que el slice esté completo. Las verificaciones V1–V6 del slice deben pasar todas. El layout 320px y 1920px+ debe ser correcto.
  - Files: `index.html`
  - Do: (1) Para INV-03 (caída de Buenos Aires — sin ilustración verificada): usar imagen alternativa documentada en el draft — el retrato de Beresford ya verificado (`William_Carr_Beresford_...jpg`) con caption contextual, o buscar en Wikimedia Commons `File:Buenos_Aires_1806.jpg` / `File:Battle_of_Buenos_Aires_1806.jpg` via API antes de fallback. (2) Para INV-05 (tesoro en Londres): usar el retrato de Beresford ya verificado (el mismo retrato puede reutilizarse en INV-02 con alt text diferente) o `File:Home_Popham_portrait.jpg`; si ninguno aplica, usar `<div class="card-image-placeholder">` con texto descriptivo en lugar de `<img src="">`. (3) Para INV-09 (soldado Patricios): buscar en Wikimedia API `File:Patricios Buenos Aires` / `File:Regimiento de Patricios`; si no existe, usar `<div class="card-image-placeholder">` con alt text. (4) Verificar que ninguna `<img>` en `#rev-invasiones-inglesas` tenga `src=""`. (5) Correr los 6 comandos de verificación del slice. (6) Abrir `index.html` en navegador y verificar en viewport 320px (una columna, cards legibles) y 1920px+ (grid de 2+ columnas, sin overflow).
  - Verify: Correr los comandos V1–V6 listados en la sección Verification de este plan; todos deben retornar `PASS`. Para responsiveness: `grep -q 'card-image-placeholder\|src="https://' index.html` en el bloque `#rev-invasiones-inglesas` — no debe haber `src=""`.
  - Done when: V1–V6 todos PASS; ningún `src=""` en el bloque; 320px y 1920px+ verificados visualmente sin overflow ni cards rotas.

## Files Likely Touched

- `index.html` — inserción del sub-período completo (≈600–800 líneas nuevas), actualización del sub-nav
- `S01-CONTENT-DRAFT.md` — leído como fuente, no modificado
