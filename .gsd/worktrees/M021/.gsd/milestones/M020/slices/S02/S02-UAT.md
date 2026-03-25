# S02: Integración HTML — sub-período #rev-invasiones-inglesas con cards completas — UAT

**Milestone:** M020
**Written:** 2026-03-25

## UAT Type

- UAT mode: artifact-driven + live-runtime
- Why this mode is sufficient: El slice entrega HTML estático. La corrección se verifica via DOM queries en Node.js (artifact-driven) y en navegador real (live-runtime). No hay backend, base de datos, ni estado de usuario que requiera human-experience verification específica más allá del layout responsive.

## Preconditions

1. `index.html` y `app.js` en el directorio de trabajo (`C:/Users/gabri/Desktop/historia/.gsd/worktrees/M020`)
2. Node.js disponible en PATH (`node --version`)
3. Para tests de browser: servidor local activo (`npx http-server . -p 8080` o similar) o abrir `index.html` directamente en browser
4. Para viewport tests: DevTools disponibles (Chrome, Firefox, o Edge)

## Smoke Test

Ejecutar en el directorio del proyecto:

```bash
node -e "
const fs = require('fs');
const html = fs.readFileSync('index.html','utf8');
const block = (html.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/)||[''])[0];
const cards = (block.match(/data-certeza/g)||[]).length;
const link = html.includes('href=\"#rev-invasiones-inglesas\"');
console.log('Cards:', cards, '| Sub-nav link:', link);
if (cards >= 18 && link) console.log('SMOKE TEST PASS');
else console.error('SMOKE TEST FAIL');
"
```

**Esperado:** `Cards: 18 | Sub-nav link: true` + `SMOKE TEST PASS`

---

## Test Cases

### 1. Conteo de cards con certeza en el sub-período

**Propósito:** Verificar que las 18 cards están presentes y tienen `data-certeza` en el bloque correcto.

1. Ejecutar:
   ```bash
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
   ```
2. **Esperado:** `Cards con data-certeza: 18` + `PASS`

---

### 2. Sub-nav link presente y como primer elemento

**Propósito:** Verificar que el sub-nav tiene el link a `#rev-invasiones-inglesas` y que está posicionado antes de los otros sub-períodos.

1. Ejecutar:
   ```bash
   grep -n 'href="#rev-invasiones-inglesas"' index.html
   ```
2. **Esperado:** Una línea con `href="#rev-invasiones-inglesas"` y número de línea menor a los links de `#rev-alberdi-formacion`, `#rev-mayo-1810`, etc.

3. En browser, abrir `index.html`, scrollear a la sección Revolución, y verificar que el sub-nav sticky muestra "1806–1807 | Invasiones Inglesas" como primer item antes de "1810–1838", "1838–1852", etc.
4. **Esperado:** "1806–1807" aparece como primer link del sub-nav de la sección revolución.

---

### 3. Expand/collapse funciona en las 18 cards

**Propósito:** Verificar que el toggle de expandir/colapsar funciona correctamente en las cards del sub-período.

1. En browser, navegar a `#rev-invasiones-inglesas` (scrollear o usar el sub-nav link).
2. Hacer click en el botón "Leer más ↓" (o texto similar) de cualquiera de las 18 cards.
3. **Esperado:** El contenido expandible aparece con transición suave; el botón cambia a "Cerrar ↑" (o similar); `aria-expanded` pasa de `false` a `true`.
4. Hacer click nuevamente en el botón.
5. **Esperado:** El contenido colapsa con transición; el botón vuelve a su estado original; `aria-expanded` vuelve a `false`.
6. En DevTools, ejecutar: `document.querySelectorAll('#rev-invasiones-inglesas .card-expand-toggle').length`
7. **Esperado:** `18`

---

### 4. Notas historiográficas visibles en INV-04, INV-07, INV-16, INV-18

**Propósito:** Verificar que las 4 cards con debate historiográfico muestran la nota dentro del contenido expandible.

1. Ejecutar:
   ```bash
   node -e "
   const fs = require('fs');
   const html = fs.readFileSync('index.html','utf8');
   const block = (html.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/)||[''])[0];
   const notas = (block.match(/card-nota-historiografica/g)||[]).length;
   console.log('card-nota-historiografica encontradas:', notas);
   if (notas < 4) { console.error('FAIL: esperadas >= 4'); process.exit(1); }
   console.log('PASS');
   "
   ```
2. **Esperado:** `card-nota-historiografica encontradas: 4` + `PASS`

3. En browser, expandir la card de **Sobremonte** (INV-04, año 1806).
4. **Esperado:** Dentro del detalle expandido, aparece un párrafo con "**Nota historiográfica:**" describiendo el debate cobardía vs. protocolo Vértiz.

5. Expandir la card de **Álzaga** (INV-07, año 1806).
6. **Esperado:** Nota sobre el debate rol militar vs. logístico de Álzaga (Williams Alzaga vs. narrativa oficial).

7. Expandir la card de **Whitelocke** (INV-16, año 1807).
8. **Esperado:** Nota con las 4 hipótesis sobre por qué no se usó artillería: órdenes comerciales, temor a alienar población, subestimación de resistencia, problemas logísticos.

9. Expandir la card de **nexo causal** (INV-18, año 1810).
10. **Esperado:** Nota con el modelo de tres causas (invasiones + ideas ilustradas + crisis española/Bayona).

---

### 5. Rumor embebido en INV-13 (Ana Périchon / fuga de Beresford)

**Propósito:** Verificar que INV-13 muestra primero el hecho documentado (Rodríguez Peña / Padilla) y luego el rumor sobre Ana Périchon como sección claramente separada.

1. Ejecutar:
   ```bash
   grep -n 'card-rumor__embedded' index.html
   ```
2. **Esperado:** Al menos una línea con `card-rumor__embedded` dentro del rango de líneas del bloque `#rev-invasiones-inglesas`.

3. En browser, expandir la card de **Beresford prisionero** (INV-13, año 1806–1807).
4. **Esperado:** El detalle muestra primero la narrativa del hecho (Saturnino Rodríguez Peña, Martín de Álzaga, etc.) y luego una sección visualmente diferenciada (fondo ámbar o borde distintivo) con el rumor sobre Ana Périchon, con nota de origen que indica que no hay fuente primaria que la vincule directamente a la fuga.

---

### 6. INV-18 marcada como card-opinion con blockquote

**Propósito:** Verificar que la card del nexo causal tiene certeza "opinión" y usa el patrón de blockquote.

1. Ejecutar:
   ```bash
   node -e "
   const fs = require('fs');
   const html = fs.readFileSync('index.html','utf8');
   const block = (html.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/)||[''])[0];
   const opiniones = (block.match(/data-certeza=\"opinion\"/g)||[]).length;
   const blockquotes = (block.match(/card-opinion__quote/g)||[]).length;
   console.log('card-opinion:', opiniones, '| blockquotes:', blockquotes);
   if (opiniones < 1 || blockquotes < 1) { console.error('FAIL'); process.exit(1); }
   console.log('PASS');
   "
   ```
2. **Esperado:** `card-opinion: 1 | blockquotes: 1` + `PASS`

3. En browser, localizar la última card del bloque (INV-18, "Condiciones Necesarias, No Causas Suficientes", año 1806–1810).
4. **Esperado:** La card tiene indicador visual de "opinión" (color/badge diferente a las cards de hecho). Al expandir, muestra un blockquote con la cita sobre milicias como condición necesaria.

---

### 7. Sin imágenes con src vacío

**Propósito:** Verificar que no hay `<img src="">` que causarían fallback silencioso.

1. Ejecutar:
   ```bash
   node -e "
   const fs = require('fs');
   const html = fs.readFileSync('index.html','utf8');
   const block = (html.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/)||[''])[0];
   const emptySrc = (block.match(/src=\"\"/g)||[]).length;
   if (emptySrc > 0) { console.error('FAIL: ' + emptySrc + ' src vacíos'); process.exit(1); }
   console.log('PASS: ningún src vacío (' + emptySrc + ')');
   "
   ```
2. **Esperado:** `PASS: ningún src vacío (0)`

3. En browser, abrir DevTools → Network → filtrar por "Img". Scrollear a través del bloque `#rev-invasiones-inglesas`.
4. **Esperado:** Todas las imágenes cargan con status 200. INV-09 muestra un placeholder estilizado (no una imagen rota).

---

### 8. Reveal-on-scroll funciona para las 18 nuevas cards

**Propósito:** Verificar que el sistema IntersectionObserver auto-descubre las 18 cards sin cambios en app.js.

1. En browser, cargar `index.html` desde el top (sin scroll).
2. Abrir DevTools → Console.
3. Scrollear lentamente hacia abajo hasta `#rev-invasiones-inglesas`.
4. **Esperado:** Las cards aparecen con animación fade-in al entrar en viewport (efecto reveal). No hay errores JS en la consola relacionados con el reveal system.

5. En DevTools, ejecutar: `document.querySelectorAll('#rev-invasiones-inglesas .reveal--visible').length`
6. **Esperado:** Un número entre 1 y 18, dependiendo de cuántas cards han entrado en el viewport.

---

### 9. app.js sin errores de sintaxis

**Propósito:** Verificar que ninguna edición a index.html introdujo un error de sintaxis en app.js (sanity check).

1. Ejecutar:
   ```bash
   node -e "
   try {
     new Function(require('fs').readFileSync('app.js','utf8'));
     console.log('PASS: app.js syntax OK');
   } catch(e) {
     if (e instanceof SyntaxError) { console.error('FAIL SYNTAX:', e.message); process.exit(1); }
     else console.log('PASS: app.js syntax OK (runtime-only error)');
   }
   "
   ```
2. **Esperado:** `PASS: app.js syntax OK`

---

## Edge Cases

### Stagger completo: primera y última card

**Propósito:** Verificar que los delays de stagger cubren el rango completo 0ms–1360ms.

1. Ejecutar:
   ```bash
   node -e "
   const fs = require('fs');
   const html = fs.readFileSync('index.html','utf8');
   const block = (html.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/)||[''])[0];
   const delays = block.match(/--reveal-delay:\s*\d+ms/g)||[];
   console.log('Delays encontrados:', delays.length);
   console.log('Min:', delays[0], '| Max:', delays[delays.length-1]);
   "
   ```
2. **Esperado:** 18 delays encontrados; el primero es `0ms` y el último es `1360ms`.

---

### Sub-nav sticky activo al scrollear a #rev-invasiones-inglesas

**Propósito:** Verificar que el IntersectionObserver del sub-nav activa el link "1806–1807" al hacer scroll.

1. En browser, cargar `index.html`.
2. Abrir DevTools → Console.
3. Scrollear hasta que `#rev-invasiones-inglesas` sea la sección principal visible.
4. **Esperado:** En consola aparece `[SubNav] Active sub-period → rev-invasiones-inglesas`; el link "1806–1807" en el sub-nav tiene la clase activa (`.sub-nav__link--active` o similar, dependiendo de la implementación).

---

### Layout responsive en 320px — una columna sin overflow

**Propósito:** Verificar que en mobile estrecho las cards son legibles sin overflow horizontal.

1. En browser, abrir DevTools → Device toolbar → establecer viewport en 320px de ancho.
2. Scrollear al bloque `#rev-invasiones-inglesas`.
3. **Esperado:** Las cards se apilan en una sola columna. No hay scroll horizontal. El texto de títulos, excerpts y certeza-indicator es legible. Los botones de expand tienen tamaño de tap target adecuado (≥44px).
4. En DevTools Console, ejecutar:
   ```js
   const grid = document.querySelector('#rev-invasiones-inglesas .events-grid--certeza');
   const cs = getComputedStyle(grid);
   console.log('columns:', cs.gridTemplateColumns, '| overflow:', document.body.scrollWidth > document.body.clientWidth);
   ```
5. **Esperado:** `columns: "272.8px"` (o similar, 1 valor = 1 columna) y `overflow: false`.

---

### Layout responsive en 1920px — múltiples columnas

**Propósito:** Verificar que en desktop ancho las cards usan el espacio disponible.

1. En browser, establecer viewport en 1920px.
2. Scrollear al bloque `#rev-invasiones-inglesas`.
3. **Esperado:** Las cards aparecen en 3 columnas (o más). No hay desbordamiento.
4. En DevTools Console, ejecutar:
   ```js
   const grid = document.querySelector('#rev-invasiones-inglesas .events-grid--certeza');
   const cs = getComputedStyle(grid);
   console.log('columns:', cs.gridTemplateColumns);
   ```
5. **Esperado:** 3 valores en `gridTemplateColumns` (ej. `"352px 352px 352px"`).

---

### INV-09 muestra placeholder estilizado (no imagen rota)

**Propósito:** Verificar que la card del Regimiento de Patricios muestra un placeholder visual, no una imagen rota ni un espacio vacío.

1. En browser, navegar al bloque y localizar la card "Regimiento de Patricios" (INV-09, año 1806).
2. **Esperado:** En lugar de una `<img>`, aparece un contenedor estilizado con texto descriptivo (algo como "✦ Regimiento de Patricios ✦ 1806 — imagen de soldado en proceso de verificación"). No hay icono de imagen rota ni espacio en blanco inexplicable.
3. En DevTools, ejecutar:
   ```js
   document.querySelector('#rev-invasiones-inglesas .card-image-placeholder') !== null
   ```
4. **Esperado:** `true`

---

## Failure Signals

- **V1 falla (cards < 18):** `grep -n "rev-invasiones-inglesas" index.html` — verificar si el bloque existe y cuántas líneas tiene. Si el bloque existe pero faltan cards, revisar si el `</div>` del `events-grid` fue cerrado prematuramente.
- **V2 falla (sub-nav link ausente):** `grep -n "sub-nav" index.html | head -20` — verificar la estructura del sub-nav. Si el link falta, buscar la sección `<nav class="sub-nav">` y confirmar que el primer `<a>` tiene `href="#rev-invasiones-inglesas"`.
- **V3 falla (toggles < 10):** `grep -c "card-expand-toggle" index.html` da el total global. Si el total global es ≥54 pero el count en el bloque es < 10, el regex de extracción del bloque puede estar fallando — verificar que `id="rev-alberdi-formacion"` existe en el HTML y que el bloque no fue movido.
- **V4 falla (src vacíos):** `grep -n 'src=""' index.html` localiza las imágenes vacías por número de línea.
- **V5 falla (app.js syntax):** El mensaje SyntaxError incluye línea y columna. Verificar que no se haya editado app.js accidentalmente.
- **V6 falla (notas < 4):** `grep -n "card-nota-historiografica" index.html` lista todas las notas con número de línea. Las 4 esperadas están en INV-04, INV-07, INV-16, INV-18.
- **Expand/collapse no funciona:** Verificar en DevTools que `document.querySelector('.card-expand-toggle')` devuelve un elemento y que el event listener está registrado (`getEventListeners()` en Chrome).
- **Imágenes rotas en browser:** Filtrar consola por `[ImageFallback]` — si aparecen entradas, identificar qué URL falló. `grep -n 'src="https://' index.html | grep -v Popham | grep -v Liniers` para encontrar URLs no verificadas.

---

## Not Proven By This UAT

- **Corrección histórica del contenido:** El UAT verifica estructura HTML y comportamiento del browser, no la exactitud de los datos históricos. La verificación histórica fue responsabilidad de S01.
- **Marcadores de timeline 1806/1807:** No implementados en este slice — quedan para S03.
- **Card de contexto europeo (Napoleón/Bayona):** No implementada en este slice — queda para S03.
- **Conexión causal explícita en el flujo narrativo:** INV-18 sienta las bases, pero el conector visual/narrativo completo es responsabilidad de S03.
- **Accesibilidad completa (WCAG):** No auditada en este slice.
- **Performance / Lighthouse:** No medida en este slice — el bloque agrega ~75KB de HTML que puede afectar Time to First Byte en conexiones lentas.

---

## Notes for Tester

- **INV-09 intencionalmente no tiene imagen:** La card del Regimiento de Patricios usa un `card-image-placeholder` estilizado porque no existe imagen Commons verificable del soldado Patricios 1806. Esto es correcto, no un error a resolver.
- **INV-03 e INV-16 reutilizan imágenes:** INV-03 usa el retrato de Beresford (igual que INV-02) e INV-16 usa el retrato de Álzaga (igual que INV-07). Esto es conocido y aceptable — son las únicas imágenes verificadas disponibles en Commons para esos sujetos.
- **El conteo de toggles via regex** puede parecer "incorrecto" si se usa el regex sin ancla: `/card-expand-toggle/g` devuelve 54 para 18 botones (3 ocurrencias por botón: la clase del `<button>` + clases de los 2 `<span>` internos). Para contar botones exactos, usar `/<button class="card-expand-toggle"/g`.
- **INV-18 puede confundir:** Es la única `card-opinion` del bloque; visualmente tendrá un color de certeza-indicator diferente a las otras 17 cards de hecho. Esto es correcto — el nexo causal invasiones→Mayo 1810 es una interpretación historiográfica, no un hecho documentado.
- **La nota historiográfica de INV-18** desarrolla explícitamente el modelo de tres causas (invasiones + ideas ilustradas + crisis española/Bayona). Si el texto parece "demasiado largo" es porque el plan especificó documentar todas las hipótesis.
