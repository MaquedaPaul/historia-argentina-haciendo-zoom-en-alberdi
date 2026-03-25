---
estimated_steps: 6
estimated_files: 2
---

# T01: Insertar sub-período wrapper, sub-nav link y cards INV-01 a INV-09

**Slice:** S02 — Integración HTML — sub-período #rev-invasiones-inglesas con cards completas
**Milestone:** M020

## Description

Integrar la primera mitad del content draft (INV-01 a INV-09) en `index.html`. Esto incluye:
- El wrapper del sub-período `<div id="rev-invasiones-inglesas" ...>` insertado antes de `#rev-alberdi-formacion`
- El sub-nav link como primer elemento del `<nav class="sub-nav">`
- 9 cards (INV-01 a INV-09) con todos los campos requeridos: certeza-indicator, año, título, excerpt, imagen, expand/collapse con card-detail, card-nota-historiografica donde corresponde, y card-source con cite

El contenido factual, las imágenes verificadas, los textos expandibles y las notas historiográficas ya están completamente documentados en `S01-CONTENT-DRAFT.md`. Esta tarea es de integración mecánica, no de investigación.

## Steps

1. **Leer el content draft completo para INV-01 a INV-09.** Abrir `.gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md` y leer las entradas INV-01 a INV-09. Prestar atención especial a: tipo de certeza de cada entry (`✓ Hecho documentado`, `⚠ Debate histórico`, `✗ Rumor`), flags `card-nota-historiografica` (INV-04 y INV-07 los tienen), URLs de imágenes verificadas, y si la entry tiene "Detalle expandible" (todas tienen, → usar expand/collapse).

2. **Identificar el punto de inserción en `index.html`.** Buscar `<div id="rev-alberdi-formacion"` (línea ~346). El nuevo bloque va **inmediatamente antes** de esa línea. El sub-nav link va como **primer** `<a>` dentro de `<nav class="sub-nav">` (línea ~326).

3. **Insertar el sub-nav link.** En `<nav class="sub-nav" aria-label="Sub-períodos...">`, agregar como primer hijo:
   ```html
   <a href="#rev-invasiones-inglesas" class="sub-nav__link">1806–1807<span class="sub-nav__link-label">Invasiones Inglesas</span></a>
   ```

4. **Insertar el wrapper del sub-período antes de `#rev-alberdi-formacion`.** Agregar:
   ```html
   <!-- ══════════════════════════════════════════════════
        SUB-PERÍODO: Las Invasiones Inglesas (1806–1807)
        18 cards — INV-01 a INV-18 — hecho, opinión, rumor
        Fuentes: S01-CONTENT-DRAFT.md (M020/S01)
        Integrado en M020/S02/T01 (INV-01 a INV-09) y T02 (INV-10 a INV-18)
        ══════════════════════════════════════════════════ -->
   <div id="rev-invasiones-inglesas" class="sub-period reveal reveal-fade">
     <h3 class="sub-period__title">Las Invasiones Inglesas (1806–1807)</h3>
     <div class="events-grid events-grid--certeza" aria-label="Las Invasiones Inglesas al Río de la Plata (1806–1807)">
       <!-- cards INV-01 a INV-09 aquí -->
     </div>
   </div><!-- /#rev-invasiones-inglesas (T01: INV-01 a INV-09; T02 agrega INV-10 a INV-18) -->
   ```

5. **Escribir las 9 cards (INV-01 a INV-09) siguiendo la plantilla exacta del codebase.** Para cada card:
   - Tipo de card: `card-hecho` para `✓ Hecho documentado`; `card-opinion` para interpretaciones; `card-rumor` para rumores explícitos
   - `data-certeza`: `"hecho"`, `"opinion"`, o `"rumor"` (sin acento — consistente con cards existentes del mismo codebase)
   - `--reveal-delay`: INV-01=0ms, INV-02=80ms, INV-03=160ms, INV-04=240ms, INV-05=320ms, INV-06=400ms, INV-07=480ms, INV-08=560ms, INV-09=640ms
   - Certeza-indicator: `✓` / `💬` / `🔍` según tipo
   - Año/período: del campo "Año/Período" del draft
   - Título: del campo entry
   - Excerpt: del campo "Excerpt" del draft (2-4 oraciones)
   - Imagen: `<div class="card-image"><img src="URL" alt="ALT" loading="lazy"></div>` — URLs verificadas del draft. Para INV-03 (PLACEHOLDER de ilustración de caída de BA): usar el retrato de Beresford ya verificado (`https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/William_Carr_Beresford%2C_Viscount_Beresford_by_Sir_William_Beechey.jpg/500px-William_Carr_Beresford%2C_Viscount_Beresford_by_Sir_William_Beechey.jpg`) con alt text contextual, O usar `<div class="card-image-placeholder">` con texto descriptivo — **nunca `src=""`**.
   - Expand/collapse: todas las cards tienen "Detalle expandible" → agregar `<button class="card-expand-toggle" aria-expanded="false"><span class="card-expand-toggle__text">Ver más</span><span class="card-expand-toggle__icon" aria-hidden="true">▼</span></button><div class="card-detail" hidden>` con el contenido del "Detalle expandible", seguido de `</div>` antes del `<footer>`
   - **INV-04 (Sobremonte/fuga):** agregar `<p class="card-nota-historiografica"><strong>Nota historiográfica:</strong> ...</p>` dentro del `<div class="card-detail">` con el texto sobre el Protocolo Vértiz y el debate sobre la fuga
   - **INV-07 (Álzaga):** agregar `<p class="card-nota-historiografica"><strong>Nota historiográfica:</strong> ...</p>` sobre el debate del rol militar vs. logístico de Álzaga
   - Footer: `<footer class="card-source"><span class="card-source__icon" aria-hidden="true">📄</span><cite>fuentes del draft</cite></footer>`

6. **Verificar la estructura básica.** Correr:
   ```bash
   node -e "const h=require('fs').readFileSync('index.html','utf8'); const b=(h.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/)||[''])[0]; console.log('certeza cards:',(b.match(/data-certeza/g)||[]).length, '| expand toggles:',(b.match(/card-expand-toggle/g)||[]).length);"
   grep -q 'href="#rev-invasiones-inglesas"' index.html && echo "PASS: sub-nav link" || echo "FAIL: sub-nav link ausente"
   ```

## Must-Haves

- [ ] `<div id="rev-invasiones-inglesas" class="sub-period reveal reveal-fade">` insertado antes de `<div id="rev-alberdi-formacion"`
- [ ] `<a href="#rev-invasiones-inglesas" class="sub-nav__link">` presente como primer link en `<nav class="sub-nav">`
- [ ] 9 cards (INV-01 a INV-09) con `data-certeza`, certeza-indicator, año, título, excerpt, footer con `<cite>`
- [ ] Todas las 9 cards tienen expand/collapse (`card-expand-toggle` + `card-detail hidden`)
- [ ] INV-04 y INV-07 tienen `<p class="card-nota-historiografica">` dentro de `card-detail`
- [ ] Ninguna `<img>` con `src=""` — PLACEHOLDERs resueltos con imagen alternativa o `card-image-placeholder`
- [ ] Stagger delays: 0ms, 80ms, ..., 640ms en las 9 cards

## Verification

```bash
# Conteo de cards con certeza en el bloque (debe ser ≥9 tras T01)
node -e "
const h=require('fs').readFileSync('index.html','utf8');
const b=(h.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/)||[''])[0];
console.log('certeza:', (b.match(/data-certeza/g)||[]).length);
console.log('toggles:', (b.match(/card-expand-toggle/g)||[]).length);
console.log('notas:', (b.match(/card-nota-historiografica/g)||[]).length);
"

# Sub-nav link presente
grep -q 'href="#rev-invasiones-inglesas"' index.html && echo "PASS" || echo "FAIL"

# Sin src vacío en el bloque
node -e "
const h=require('fs').readFileSync('index.html','utf8');
const b=(h.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/)||[''])[0];
const empty=(b.match(/src=\"\"/g)||[]).length;
console.log(empty===0?'PASS: no src vacío':'FAIL: '+empty+' src vacíos');
"
```

## Inputs

- `.gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md` — fuente principal: INV-01 a INV-09 con todos los campos (certeza, excerpt, detalle expandible, fuentes, imágenes verificadas, notas historiográficas)
- `index.html` (líneas ~325–350) — ubicación del sub-nav y el punto de inserción antes de `#rev-alberdi-formacion`
- Plantilla de card existente: inspeccionar líneas ~351–420 de `index.html` para ver el patrón exacto de `card-hecho` con certeza-indicator, año, título, excerpt, expand/collapse y footer

**Imágenes verificadas clave de INV-01 a INV-09:**
- INV-01/Cevallos: `https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Pedro_de_Cevallos.jpg/500px-Pedro_de_Cevallos.jpg`
- INV-02/Popham: `https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Sir_Home_Riggs_Popham_from_NPG.jpg/500px-Sir_Home_Riggs_Popham_from_NPG.jpg`
- INV-03/Beresford (alternativa para PLACEHOLDER de caída): `https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/William_Carr_Beresford%2C_Viscount_Beresford_by_Sir_William_Beechey.jpg/500px-William_Carr_Beresford%2C_Viscount_Beresford_by_Sir_William_Beechey.jpg`
- INV-04/Sobremonte: `https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Rafael_de_Sobremonte.jpg/500px-Rafael_de_Sobremonte.jpg`
- INV-05/[PLACEHOLDER tesoro en Londres — ver T03 para resolución]
- INV-06/Liniers: `https://upload.wikimedia.org/wikipedia/commons/7/70/Santiago_de_Liniers.jpg`
- INV-07/Álzaga: `https://upload.wikimedia.org/wikipedia/commons/2/27/Malzaga.png`
- INV-08/Sobremonte: (mismo que INV-04, alt text diferente)
- INV-09/[PLACEHOLDER soldado Patricios — ver T03 para resolución]

**Fragmento de plantilla de card-hecho con expand/collapse (copiar estructura):**
```html
<article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: 0ms">
  <div class="card-certeza-indicator">
    <span class="card-certeza-icon" aria-hidden="true">✓</span>
    <span class="card-certeza-label">Hecho documentado</span>
  </div>
  <div class="card-image">
    <img src="URL" alt="ALT" loading="lazy">
  </div>
  <span class="event-card__year">AÑO</span>
  <h3 class="event-card__title">TÍTULO</h3>
  <p class="event-card__excerpt">EXCERPT</p>
  <button class="card-expand-toggle" aria-expanded="false">
    <span class="card-expand-toggle__text">Ver más</span>
    <span class="card-expand-toggle__icon" aria-hidden="true">▼</span>
  </button>
  <div class="card-detail" hidden>
    <p>DETALLE EXPANDIBLE PÁRRAFO 1</p>
    <p>DETALLE EXPANDIBLE PÁRRAFO 2</p>
    <!-- card-nota-historiografica va aquí si aplica -->
  </div>
  <footer class="card-source">
    <span class="card-source__icon" aria-hidden="true">📄</span>
    <cite>FUENTES</cite>
  </footer>
</article>
```

## Expected Output

- `index.html` modificado con:
  - `<a href="#rev-invasiones-inglesas">` como primer link del sub-nav
  - `<div id="rev-invasiones-inglesas">` insertado antes de `#rev-alberdi-formacion` con 9 cards (INV-01 a INV-09)
  - Comentario de cierre `<!-- /#rev-invasiones-inglesas (T01: INV-01 a INV-09; T02 agrega INV-10 a INV-18) -->`
- Verificación: 9 `data-certeza` en el bloque, 9 `card-expand-toggle`, sub-nav link presente, cero `src=""`


## Observability Impact

**Signals changed by this task:**
- `#rev-invasiones-inglesas` block added to DOM: `document.getElementById('rev-invasiones-inglesas')` returns non-null after T01.
- 9 `[data-certeza]` elements added inside the block: `document.querySelectorAll('#rev-invasiones-inglesas [data-certeza]').length` returns 9 (grows to 18 after T02).
- Sub-nav link added: `document.querySelector('a[href="#rev-invasiones-inglesas"]')` returns non-null.
- `aria-expanded` state on expand-toggles: `document.querySelectorAll('#rev-invasiones-inglesas .card-expand-toggle[aria-expanded="false"]').length` returns 9 (all collapsed initially).

**How a future agent inspects state:**
- Block size: `node -e "const h=require('fs').readFileSync('index.html','utf8'); console.log((h.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/)||[''])[0].length + ' chars')"`
- Card count: `grep -c "data-certeza" index.html` — should increase by 9 from the T01 baseline.
- Expand-toggle count: `grep -c "card-expand-toggle" index.html` — 3 occurrences per card (button + 2 spans); 9 cards = 27 occurrences added.
- Sub-nav: `grep -n 'href="#rev-invasiones-inglesas"' index.html` — should show the new link.
- Notas historiográficas: `grep -n "card-nota-historiografica" index.html` — T01 adds 2 (INV-04 and INV-07).

**Failure state visibility:**
- If the wrapper div is missing: `grep -n "rev-invasiones-inglesas" index.html` returns 0 or only the sub-nav link.
- If empty img src exists: `grep -n 'src=""' index.html` pinpoints the line.
- If app.js breaks: `node -e "new Function(require('fs').readFileSync('app.js','utf8'))"` exits non-zero with SyntaxError message.
