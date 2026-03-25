---
estimated_steps: 5
estimated_files: 1
---

# T03: Resolver PLACEHOLDERs de imagen, verificar DOM completo y responsiveness

**Slice:** S02 — Integración HTML — sub-período #rev-invasiones-inglesas con cards completas
**Milestone:** M020

## Description

Tarea final de S02: resolver los 3 PLACEHOLDERs de imagen que el content draft documentó como sin-verificar (INV-03, INV-05, INV-09), correr los 6 comandos de verificación del slice, y confirmar el layout responsive en 320px y 1920px+.

Los PLACEHOLDERs son el mayor riesgo de integración: si se dejaron como `<img src="">`, `initImageFallbacks()` en `app.js` no puede recuperarlos (el fallback requiere que la URL falle, no que esté vacía). Esta tarea garantiza que todos los `<img>` tienen URLs válidas o `<div class="card-image-placeholder">` con texto descriptivo.

T01 y T02 deben haberse completado antes de esta tarea.

## Steps

1. **Verificar el estado actual del bloque.**
   ```bash
   node -e "
   const h=require('fs').readFileSync('index.html','utf8');
   const b=(h.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/)||[''])[0];
   console.log('Total chars del bloque:', b.length);
   console.log('certeza cards:', (b.match(/data-certeza/g)||[]).length);
   console.log('src vacíos:', (b.match(/src=\"\"/g)||[]).length);
   console.log('card-image-placeholder:', (b.match(/card-image-placeholder/g)||[]).length);
   "
   ```
   Si `certeza cards` es < 18, T02 no está completa — detener y reportar. Si `src vacíos` > 0, proceder con el paso 2.

2. **Resolver PLACEHOLDERs — buscar en Wikimedia Commons API para cada uno:**

   **INV-03 (ilustración de la caída de Buenos Aires, junio 1806):**
   Intentar buscar via curl con UA:
   ```bash
   curl -s "https://en.wikipedia.org/w/api.php?action=query&titles=File:Battle_of_Buenos_Aires_1806.jpg&prop=imageinfo&iiprop=url&iiurlwidth=500&format=json" -H "User-Agent: historia-proyecto/1.0"
   ```
   Si el archivo existe y retorna `thumburl`, usar esa URL. Si no existe, usar el retrato de Beresford ya verificado:
   `https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/William_Carr_Beresford%2C_Viscount_Beresford_by_Sir_William_Beechey.jpg/500px-William_Carr_Beresford%2C_Viscount_Beresford_by_Sir_William_Beechey.jpg`
   con alt: "Brigadier general William Carr Beresford, comandante de la primera invasión inglesa que tomó Buenos Aires el 27–28 de junio de 1806."
   Si ninguna imagen aplica narrativamente, usar `<div class="card-image-placeholder" aria-label="...">`.

   **INV-05 (tesoro de Buenos Aires en Londres):**
   El draft sugiere el retrato de Beresford (ya verificado) o de Popham. Popham es el que envió el tesoro a Londres — usar su retrato:
   `https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Sir_Home_Riggs_Popham_from_NPG.jpg/500px-Sir_Home_Riggs_Popham_from_NPG.jpg`
   con alt: "Sir Home Riggs Popham, el comodoro que envió a Londres el tesoro de 1.086.208 pesos fuertes capturado en Buenos Aires en 1806, anticipando el regreso con más tropas."

   **INV-09 (soldado del Regimiento de Patricios, 1806–1807):**
   Intentar buscar:
   ```bash
   curl -s "https://commons.wikimedia.org/w/api.php?action=query&titles=File:Patricios_soldier_1806.jpg&prop=imageinfo&iiprop=url&iiurlwidth=500&format=json" -H "User-Agent: historia-proyecto/1.0"
   ```
   También intentar: `File:Regimiento_de_Patricios_1806.jpg`, `File:Soldier_of_the_Patricios_1806.jpg`. Si ninguno existe, usar `<div class="card-image-placeholder" aria-label="Soldado del Regimiento de Patricios (1806–1807) — el primer cuerpo miliciano criollo de Buenos Aires, fundado el 15 de septiembre de 1806 con jefes elegidos por votación popular"><span class="card-image-placeholder__text">Regimiento de Patricios (1806) — Sin imagen disponible en Wikimedia Commons</span></div>`.

3. **Actualizar las 3 cards en `index.html`.** Reemplazar cualquier `<img src="">` o PLACEHOLDER incompleto con la solución elegida en el paso 2. Para imágenes que reutilizan un retrato ya usado en otra card, asegurarse de que el `alt` text es diferente y contextualmente específico para esta card.

4. **Correr todos los comandos de verificación del slice (V1–V6):**
   ```bash
   # V1: ≥18 data-certeza en el bloque
   node -e "const h=require('fs').readFileSync('index.html','utf8'); const b=(h.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/)||[''])[0]; const c=(b.match(/data-certeza/g)||[]).length; console.log('V1:', c>=18?'PASS ('+c+')':'FAIL ('+c+')');"

   # V2: sub-nav link
   grep -q 'href="#rev-invasiones-inglesas"' index.html && echo "V2: PASS" || echo "V2: FAIL"

   # V3: ≥10 expand toggles en el bloque
   node -e "const h=require('fs').readFileSync('index.html','utf8'); const b=(h.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/)||[''])[0]; const t=(b.match(/card-expand-toggle/g)||[]).length; console.log('V3:', t>=10?'PASS ('+t+')':'FAIL ('+t+')');"

   # V4: sin src="" en el bloque
   node -e "const h=require('fs').readFileSync('index.html','utf8'); const b=(h.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/)||[''])[0]; const e=(b.match(/src=\"\"/g)||[]).length; console.log('V4:', e===0?'PASS':'FAIL ('+e+' src vacíos)');"

   # V5: app.js syntax OK
   node -e "try{new Function(require('fs').readFileSync('app.js','utf8'));console.log('V5: PASS')}catch(e){if(e instanceof SyntaxError){console.error('V5: FAIL SYNTAX:',e.message);process.exit(1)}else console.log('V5: PASS')}"

   # V6: ≥4 card-nota-historiografica en el bloque
   node -e "const h=require('fs').readFileSync('index.html','utf8'); const b=(h.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/)||[''])[0]; const n=(b.match(/card-nota-historiografica/g)||[]).length; console.log('V6:', n>=4?'PASS ('+n+')':'FAIL ('+n+')');"
   ```

5. **Verificar responsiveness visual** abriendo `index.html` en un navegador (o via DevTools emulation) a 320px de ancho y 1920px de ancho:
   - **320px:** El grid debe mostrar 1 columna. Las cards no deben tener overflow horizontal. El texto debe ser legible. Los expand/collapse deben funcionar.
   - **1920px:** El grid debe mostrar 2+ columnas. Las imágenes deben llenar los contenedores sin distorsión.
   - Comprobar que el sub-nav sticky muestra el link `1806–1807` cuando se scrollea hasta `#rev-invasiones-inglesas`.

   Si se detecta overflow o layout roto: `grep -n "rev-invasiones-inglesas\|events-grid\|sub-period" styles.css` para verificar que no se necesita ninguna regla CSS nueva (el patrón existente debería funcionar sin modificaciones).

## Must-Haves

- [ ] Los 3 PLACEHOLDERs (INV-03, INV-05, INV-09) resueltos con imagen alternativa verificada o `card-image-placeholder` — nunca `src=""`
- [ ] V1 PASS (≥18 `data-certeza` en bloque)
- [ ] V2 PASS (sub-nav link presente)
- [ ] V3 PASS (≥10 expand toggles)
- [ ] V4 PASS (0 `src=""`)
- [ ] V5 PASS (app.js syntax OK)
- [ ] V6 PASS (≥4 `card-nota-historiografica`)
- [ ] Layout correcto en 320px (1 columna, sin overflow) y 1920px+ (2+ columnas)

## Verification

```bash
# Todos los checks en un solo bloque
node -e "
const h=require('fs').readFileSync('index.html','utf8');
const b=(h.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/)||[''])[0];
if(!b){console.error('FAIL: bloque no encontrado');process.exit(1);}
const checks=[
  ['V1 certeza>=18', (b.match(/data-certeza/g)||[]).length >= 18],
  ['V3 toggles>=10', (b.match(/card-expand-toggle/g)||[]).length >= 10],
  ['V4 src-vacíos=0', (b.match(/src=\"\"/g)||[]).length === 0],
  ['V6 notas>=4', (b.match(/card-nota-historiografica/g)||[]).length >= 4],
];
let allPass=true;
checks.forEach(([name,pass])=>{console.log(pass?'PASS':'FAIL',name);if(!pass)allPass=false;});
process.exit(allPass?0:1);
"
grep -q 'href="#rev-invasiones-inglesas"' index.html && echo "PASS V2 sub-nav" || echo "FAIL V2 sub-nav"
node -e "try{new Function(require('fs').readFileSync('app.js','utf8'));console.log('PASS V5 syntax')}catch(e){if(e instanceof SyntaxError){console.error('FAIL V5:',e.message)}else console.log('PASS V5 syntax')}"
```

## Observability Impact

- **Signals added/changed:** El bloque `#rev-invasiones-inglesas` agrega 18 elementos al pool de `revealOnScroll()` — el observer los detecta automáticamente al cargar, sin cambios en `app.js`. Los expand/collapse son manejados por event delegation ya configurado en `app.js` (`document.addEventListener('click', ...)`) — los nuevos botones son auto-descubiertos.
- **How a future agent inspects this:** `document.querySelectorAll('#rev-invasiones-inglesas [data-certeza]').length` en consola del navegador → debe ser 18. `document.querySelectorAll('#rev-invasiones-inglesas .reveal--visible').length` indica cuántas cards han entrado en viewport (útil para debuggear reveal-on-scroll).
- **Failure state exposed:** Si `initImageFallbacks()` en `app.js` activa su fallback para alguna imagen del nuevo bloque, lo loggea en consola como `[ImageFallback] ...`. Inspeccionar DevTools console con el filtro `ImageFallback` para detectar imágenes rotas en runtime.

## Inputs

- `index.html` — con el bloque `#rev-invasiones-inglesas` completo (18 cards de T01+T02) listo para la verificación final
- `.gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md` — tabla de imágenes verificadas (al final del archivo, sección "Resumen de imágenes verificadas via API") para referencia en resolución de PLACEHOLDERs

**Conocimiento previo relevante (del S01 Summary / KNOWLEDGE.md):**
- Wikimedia rate-limita sin User-Agent — agregar `-H "User-Agent: historia-proyecto/1.0"` a todos los curl
- Imágenes pequeñas en Commons no tienen `/thumb/` path — si la API retorna URL directa (sin `/thumb/`), usar `width="100%"` en el `<img>`
- `initImageFallbacks()` en `app.js` auto-descubre todos `.card-image img` en DOMContentLoaded — sin wiring manual necesario
- El expand/collapse usa event delegation en el section root — nuevas cards son auto-descubiertas

## Expected Output

- `index.html` con los 3 PLACEHOLDERs resueltos (imágenes alternativas o `card-image-placeholder`)
- Todos los checks V1–V6 retornando PASS
- Layout visual correcto en 320px y 1920px+ (confirmado manualmente)
- Slice S02 completo y listo para que S03 agregue los marcadores de timeline y los conectores narrativos
