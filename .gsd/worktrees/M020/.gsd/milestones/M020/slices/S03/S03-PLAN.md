# S03: Timeline, nexo causal y contexto napoleónico

**Goal:** Agregar marcadores 1806 y 1807 al `revolucion-timeline` e insertar un conector narrativo entre `#rev-invasiones-inglesas` y `#rev-alberdi-formacion` que cierre explícitamente el arco europeo (Bayona → crisis de legitimidad → Mayo 1810) antes del sub-período biográfico de Alberdi.

**Demo:** `revolucion-timeline` muestra marcadores 1806 y 1807 animados antes de 1810; un bloque narrativo entre las dos sub-secciones conecta el contexto europeo napoleónico con la revolución de 1810 y la formación de Alberdi; todos los checks de verificación pasan; sin errores JS en consola.

## Must-Haves

- 2 nuevos marcadores en `revolucion-timeline`: `1806 | Invasión` (`--marker-pos: 10.00%`) y `1807 | Defensa` (`--marker-pos: 11.67%`), ambos animados con el mismo sistema de stagger CSS que los marcadores existentes
- El marcador 1807 usa modificador `--above` para evitar solapamiento de etiquetas con 1806
- El CSS stagger en `styles.css` se actualiza de 10 a 12 entradas: nth-child rules para los 12 marcadores (nth-child(2) a nth-child(13)) con delays en orden cronológico
- Un conector narrativo (bloque `alberdi-quote` extendido) insertado entre `</div><!-- /#rev-invasiones-inglesas -->` y `<div id="rev-alberdi-formacion">` que mencione explícitamente el contexto europeo (Napoleón, Bayona, José Bonaparte) y la cadena de causalidad invasiones → milicias criollas → 1810
- Sin regresiones: los 10 marcadores existentes mantienen sus posiciones relativas y sus delays de animación; app.js sin cambios; sin errores JS en consola

## Proof Level

- This slice proves: integration (cambios HTML + CSS que se activan via IntersectionObserver reveal)
- Real runtime required: sí — las animaciones del timeline requieren verificación en browser
- Human/UAT required: no (verificación mecánica cubre todos los criterios)

## Verification

```bash
# V1: Marcadores 1806 y 1807 presentes en el HTML
node -e "
const h = require('fs').readFileSync('index.html', 'utf8');
const track = (h.match(/revolucion-timeline__track[\s\S]*?<\/div><!-- \/.revolucion-timeline__track/)||[''])[0];
const markers = (track.match(/revolucion-timeline__marker/g)||[]).length;
const has1806 = h.includes('--marker-pos: 10.00%') || h.includes('marker-pos: 10%');
const has1807 = h.includes('--marker-pos: 11.67%');
console.log('markers:', markers, '| 1806:', has1806, '| 1807:', has1807);
console.assert(has1806, '1806 marker missing');
console.assert(has1807, '1807 marker missing');
"

# V2: CSS tiene stagger rules para nth-child(2) a nth-child(13) — 12 marcadores
node -e "
const css = require('fs').readFileSync('styles.css', 'utf8');
let max = 0;
const re = /revolucion-timeline__marker:nth-child\((\d+)\)/g;
let m; while ((m = re.exec(css)) !== null) { max = Math.max(max, parseInt(m[1])); }
console.log('max nth-child:', max);
console.assert(max >= 13, 'CSS stagger must cover nth-child(13) for 12 markers');
"

# V3: Conector narrativo presente entre las dos sub-secciones
node -e "
const h = require('fs').readFileSync('index.html', 'utf8');
const between = (h.match(/rev-invasiones-inglesas[\s\S]*?id=\"rev-alberdi-formacion\"/)||[''])[0];
const hasQuote = between.includes('alberdi-quote') || between.includes('reveal-slide');
console.log('connector present:', hasQuote, '| chars:', between.length);
console.assert(hasQuote, 'Narrative connector missing between invasiones and alberdi-formacion');
"

# V4: Sin errores de sintaxis JS
node -e "
try {
  new Function(require('fs').readFileSync('app.js', 'utf8'));
  console.log('JS syntax OK');
} catch(e) {
  if (e instanceof SyntaxError) { console.error('SYNTAX ERROR:', e.message); process.exit(1); }
  else console.log('JS syntax OK');
}
"

# V5 (observability / estado completo del bloque invasiones): certeza count no regresionó
node -e "
const h = require('fs').readFileSync('index.html', 'utf8');
const b = (h.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/)||[''])[0];
console.log('certeza:', (b.match(/data-certeza/g)||[]).length, '| notas:', (b.match(/card-nota-historiografica/g)||[]).length, '| chars:', b.length);
console.assert((b.match(/data-certeza/g)||[]).length >= 18, 'regression: certeza count dropped below 18');
console.assert((b.match(/card-nota-historiografica/g)||[]).length >= 4, 'regression: nota-historiografica count dropped below 4');
"
```

## Observability / Diagnostics

- Runtime signals: consola del browser — `[SubNav] Active sub-period → rev-invasiones-inglesas` al scrollear; marcadores del timeline se animan al entrar en viewport via `.reveal--visible`. Los marcadores 1806 y 1807 deben aparecer antes que 1810 en la secuencia animada.
- Inspection surfaces:
  - `node -e "const h=require('fs').readFileSync('index.html','utf8'); const t=(h.match(/revolucion-timeline__track[\s\S]*?<\/div><!-- \/.revolucion-timeline__track/)||[''])[0]; console.log('markers in track:', (t.match(/revolucion-timeline__marker/g)||[]).length, t.slice(0,400));"` — cuenta marcadores y muestra inicio del track
  - DevTools: `document.querySelectorAll('.revolucion-timeline__marker').length` → debe retornar 12
  - DevTools: `getComputedStyle(document.querySelectorAll('.revolucion-timeline__marker')[0]).getPropertyValue('--marker-pos')` → `10.00%` (primer marcador = 1806)
- Failure visibility: si los marcadores 1806/1807 no aparecen al hacer scroll al timeline, el IntersectionObserver no los está procesando — verificar que el `div.revolucion-timeline` tiene clases `reveal reveal-fade`; el sistema los auto-descubre sin cambios en app.js
- **Failure diagnostic**: `node -e "const h=require('fs').readFileSync('index.html','utf8'); const t=(h.match(/revolucion-timeline__track[\s\S]*?<!-- \/.revolucion-timeline__track/)||[''])[0]; const cnt=(t.match(/revolucion-timeline__marker/g)||[]).length; console.log(cnt>=12?'OK '+cnt+' markers':'FAIL expected 12 got '+cnt); console.log('1806:',h.includes('--marker-pos: 10.00%'),'1807:',h.includes('--marker-pos: 11.67%'));"` — imprime estado observable del HTML y falla con mensaje explícito si falta algún marcador
- Redaction constraints: ninguna (proyecto estático, sin secretos)

## Integration Closure

- Upstream surfaces consumed: `index.html` (sub-período `#rev-invasiones-inglesas` completo de S02, `revolucion-timeline` existente de M003-S02), `styles.css` (stagger CSS rules del timeline), `app.js` (sin cambios — auto-descubre nuevos marcadores)
- New wiring introduced in this slice: 2 nuevos marker divs en el track HTML + 2 nuevas reglas CSS nth-child (12 y 13) + re-numeración de las 10 existentes (ahora nth-child 4–13) + bloque connector HTML entre sub-secciones
- What remains before the milestone is truly usable end-to-end: nada — S03 es el cierre final del milestone M020

## Tasks

- [x] **T01: Agregar marcadores 1806 y 1807 al revolucion-timeline** `est:45m`
  - Why: El milestone requiere que `revolucion-timeline` muestre marcadores para las Invasiones Inglesas (1806 Invasión, 1807 Defensa) como prueba visual de que el período está integrado en la narrativa cronológica.
  - Files: `index.html`, `styles.css`
  - Do: Insertar 2 nuevos `div.revolucion-timeline__marker` al inicio del track (inmediatamente después de `div.revolucion-timeline__progress`), antes del marcador 1810 existente. 1806 a `--marker-pos: 10.00%` (below), 1807 a `--marker-pos: 11.67%` (above — `revolucion-timeline__marker--above` para evitar solapamiento de label con 1806). En CSS, agregar reglas nth-child(2) y nth-child(3) para los nuevos marcadores y renumerar las 10 existentes a nth-child(4)–nth-child(13). Los delays de dot y label para los nuevos marcadores: nth-child(2) dot: 0.05s label: 0.25s; nth-child(3) dot: 0.20s label: 0.40s. Los delays existentes para 1810–1860 se conservan ajustando solo el selector (nth-child shift +2).
  - Verify: `node -e "const css=require('fs').readFileSync('styles.css','utf8'); let max=0; const re=/revolucion-timeline__marker:nth-child\((\d+)\)/g; let m; while((m=re.exec(css))!==null){max=Math.max(max,parseInt(m[1]));} console.log('max nth-child:', max); console.assert(max>=13);"` && `grep -c "marker-pos: 10" index.html`
  - Done when: `document.querySelectorAll('.revolucion-timeline__marker').length` retorna 12 en DevTools; marcadores 1806 y 1807 visibles en el track antes de 1810; CSS cubre nth-child(2) a nth-child(13); sin errores JS en consola

- [x] **T02: Conector narrativo Napoleón/Bayona entre invasiones y formación de Alberdi** `est:30m`
  - Why: El milestone requiere que "hay una card o bloque narrativo sobre Napoleón/Bayona/crisis de legitimidad integrado" y que "la conexión causal explícita invasiones→Mayo 1810 está visible en el flujo narrativo". INV-17 e INV-18 cubren el contenido factual; este conector cierra el arco narrativo entre el sub-período de invasiones y el sub-período biográfico de Alberdi, usando el nacimiento de Alberdi en 1810 como eje de transición.
  - Files: `index.html`
  - Do: Insertar un bloque `<blockquote class="alberdi-quote reveal reveal-slide">` entre `</div><!-- /#rev-invasiones-inglesas -->` (línea ~876) y `<div id="rev-alberdi-formacion">` (línea ~878). El contenido debe mencionar: (1) las Bayona de 1808 como el detonante político; (2) que los mismos hombres que defendieron Buenos Aires en 1806–1807 presidieron la revolución en 1810; (3) el nacimiento de Alberdi el 29 de agosto de 1810 como punto de transición — nació el año en que todas esas causas convergieron. No usar `<cite>` con una fuente falsa — este es un conector editorial, no una cita de Alberdi. Usar la estructura `<blockquote class="alberdi-quote ...">` + `<p>` narrativo + `<cite>` como nota contextual (puede omitir la `<cite>` si no hay fuente directa que citar). Alternativamente: si el contenido es puramente narrativo y no hay cita de Alberdi disponible sobre el 1806, usar un `<div class="narrative-connector reveal reveal-slide">` con `<p>` párrafos contextuales. Verificar que el `reveal reveal-slide` esté en el elemento raíz para que IntersectionObserver lo procese.
  - Verify: `node -e "const h=require('fs').readFileSync('index.html','utf8'); const between=(h.match(/rev-invasiones-inglesas[\s\S]*?id=\"rev-alberdi-formacion\"/)||[''])[0]; console.log('has connector:', between.includes('reveal-slide') || between.includes('alberdi-quote'), 'chars between:', between.length); console.assert(between.length > 500, 'connector may be missing — block too short');"` 
  - Done when: bloque narrativo presente entre los dos sub-períodos; menciona el contexto europeo (Bayona o Napoleón) y la cadena causal hacia 1810; tiene clases `reveal reveal-slide`; sin errores HTML (etiquetas cerradas)

## Files Likely Touched

- `index.html` — `revolucion-timeline__track` (2 nuevos marcadores), bloque conector entre `#rev-invasiones-inglesas` y `#rev-alberdi-formacion`
- `styles.css` — stagger rules nth-child(2)–(13) para `revolucion-timeline` (reemplaza las actuales nth-child(2)–(11))
