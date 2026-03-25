# S03: Timeline, nexo causal y contexto napoleónico — UAT

**Milestone:** M020
**Written:** 2026-03-25

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: S03 sólo modifica HTML y CSS estáticos. Todos los entregables son verificables mediante DOM queries en el archivo y comprobaciones de consola JS. No hay lógica nueva en app.js; las animaciones se activan via IntersectionObserver existente que no requiere verificación de runtime adicional más allá de confirmar que las clases `reveal` están presentes.

## Preconditions

1. `index.html` y `styles.css` en el worktree M020 reflejan los cambios de S03 (T01 + T02 completos)
2. Node.js disponible en el shell para las verificaciones de artifact
3. Para la sección de browser runtime: abrir `index.html` directamente en un browser moderno (Chrome/Firefox/Edge) o via `http-server` local

## Smoke Test

```bash
node -e "
const h = require('fs').readFileSync('index.html', 'utf8');
const css = require('fs').readFileSync('styles.css', 'utf8');
const has1806 = h.includes('--marker-pos: 10.00%');
const has1807 = h.includes('--marker-pos: 11.67%');
const hasConnector = (h.match(/rev-invasiones-inglesas[\s\S]*?id=\"rev-alberdi-formacion\"/)||[''])[0].includes('alberdi-quote');
let maxNth = 0;
const re = /revolucion-timeline__marker:nth-child\((\d+)\)/g;
let m; while ((m = re.exec(css)) !== null) { maxNth = Math.max(maxNth, parseInt(m[1])); }
const ok = has1806 && has1807 && hasConnector && maxNth >= 13;
console.log(ok ? 'SMOKE: OK' : 'SMOKE: FAIL', { has1806, has1807, hasConnector, maxNth });
"
```

**Expected:** `SMOKE: OK { has1806: true, has1807: true, hasConnector: true, maxNth: 13 }`

---

## Test Cases

### 1. Marcador 1806 presente en el timeline con posición correcta

```bash
node -e "
const h = require('fs').readFileSync('index.html', 'utf8');
const has1806pos = h.includes('--marker-pos: 10.00%');
const has1806label = h.includes('1806') && h.includes('Invasión');
console.log('pos 10.00%:', has1806pos, '| label 1806/Invasión:', has1806label);
"
```

**Expected:** `pos 10.00%: true | label 1806/Invasión: true`

**Verifica:** El marcador 1806 existe en el track HTML con la posición calculada (10.00% = año 1806 en el rango 1800–1860) y la etiqueta "1806 / Invasión".

---

### 2. Marcador 1807 presente con modificador --above para evitar solapamiento

```bash
node -e "
const h = require('fs').readFileSync('index.html', 'utf8');
const track = (h.match(/revolucion-timeline__track[\s\S]*?<!-- \/.revolucion-timeline__track/)||[''])[0];
const has1807above = track.includes('--marker-pos: 11.67%') && track.includes('marker--above');
const has1807label = track.includes('1807') && track.includes('Defensa');
console.log('pos 11.67% con --above:', has1807above, '| label 1807/Defensa:', has1807label);
"
```

**Expected:** `pos 11.67% con --above: true | label 1807/Defensa: true`

**Verifica:** El marcador 1807 tiene la clase `revolucion-timeline__marker--above` para que su etiqueta quede por encima del track, evitando solapamiento con la etiqueta de 1806 que queda por debajo.

---

### 3. Total de marcadores en el timeline = 12

```bash
node -e "
const h = require('fs').readFileSync('index.html', 'utf8');
const track = (h.match(/revolucion-timeline__track[\s\S]*?<!-- \/.revolucion-timeline__track/)||[''])[0];
const count = (track.match(/class=\"revolucion-timeline__marker/g)||[]).length;
console.log('marker count:', count);
console.assert(count === 12, 'Expected exactly 12 markers, got ' + count);
"
```

**Expected:** `marker count: 12`

**Verifica:** Los 10 marcadores originales (1810–1860) más los 2 nuevos (1806, 1807) suman exactamente 12. Ningún marcador fue duplicado ni eliminado.

---

### 4. CSS stagger cubre los 12 marcadores (nth-child 2–13)

```bash
node -e "
const css = require('fs').readFileSync('styles.css', 'utf8');
let min = Infinity, max = 0;
const re = /revolucion-timeline__marker:nth-child\((\d+)\)/g;
let m; while ((m = re.exec(css)) !== null) {
  const n = parseInt(m[1]);
  min = Math.min(min, n);
  max = Math.max(max, n);
}
console.log('nth-child range:', min, '–', max);
console.assert(min === 2, 'min should be 2');
console.assert(max === 13, 'max should be 13');
"
```

**Expected:** `nth-child range: 2 – 13`

**Verifica:** El CSS cubre exactamente los 12 marcadores (nth-child(2) para 1806 … nth-child(13) para 1860). Un max menor de 13 significaría que los marcadores 1852 y/o 1860 quedaron con opacity:0 permanente.

---

### 5. Marcadores 1806 y 1807 aparecen cronológicamente antes que 1810 en el track

```bash
node -e "
const h = require('fs').readFileSync('index.html', 'utf8');
const track = (h.match(/revolucion-timeline__track[\s\S]*?<!-- \/.revolucion-timeline__track/)||[''])[0];
const pos1806 = track.indexOf('10.00%');
const pos1807 = track.indexOf('11.67%');
const pos1810 = track.indexOf('16.67%');
console.log('1806 pos in HTML:', pos1806, '| 1807:', pos1807, '| 1810:', pos1810);
console.assert(pos1806 < pos1810, '1806 debe aparecer antes de 1810 en el track');
console.assert(pos1807 < pos1810, '1807 debe aparecer antes de 1810 en el track');
console.assert(pos1806 < pos1807, '1806 debe aparecer antes de 1807 en el track');
"
```

**Expected:** Los tres asserts pasan; los números de posición cumplen `pos1806 < pos1807 < pos1810`.

**Verifica:** El orden de los marcadores en el HTML determina el orden de animación (stagger CSS nth-child). Los nuevos marcadores deben estar físicamente antes que 1810 en el DOM para que la secuencia animada sea cronológica.

---

### 6. Conector narrativo entre #rev-invasiones-inglesas y #rev-alberdi-formacion

```bash
node -e "
const h = require('fs').readFileSync('index.html', 'utf8');
const between = (h.match(/rev-invasiones-inglesas[\s\S]*?id=\"rev-alberdi-formacion\"/)||[''])[0];
const checks = {
  hasAlberdiQuote: between.includes('alberdi-quote'),
  hasRevealSlide: between.includes('reveal-slide'),
  hasBayona: between.includes('Bayona'),
  hasNapoleon: between.includes('Napoleón') || between.includes('Napoleon'),
  hasSaavedra: between.includes('Saavedra'),
  has1810: between.includes('1810'),
  hasAlberdi1810: between.includes('Alberdi') && between.includes('1810'),
  charsOk: between.length > 500
};
console.log(checks);
const allOk = Object.values(checks).every(Boolean);
console.log(allOk ? 'ALL CHECKS PASS' : 'SOME CHECKS FAILED');
"
```

**Expected:** Todos los valores `true`, `ALL CHECKS PASS`.

**Verifica:** El bloque conector existe, tiene las clases correctas para el reveal system, y contiene los elementos narrativos requeridos: Bayona, Napoleón, la cadena milicia→Primera Junta (Saavedra), la fecha 1810, y el nacimiento de Alberdi.

---

### 7. Sin regresión en el sub-período #rev-invasiones-inglesas

```bash
node -e "
const h = require('fs').readFileSync('index.html', 'utf8');
const b = (h.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/)||[''])[0];
const certeza = (b.match(/data-certeza/g)||[]).length;
const notas = (b.match(/card-nota-historiografica/g)||[]).length;
console.log('certeza:', certeza, '| notas-historiograficas:', notas);
console.assert(certeza >= 18, 'regression: certeza count dropped below 18');
console.assert(notas >= 4, 'regression: nota-historiografica count dropped below 4');
"
```

**Expected:** `certeza: 18 | notas-historiograficas: 4` (o superior).

**Verifica:** Las modificaciones de S03 no alteraron el contenido de las 18 cards del sub-período invasiones inglesas entregadas en S02.

---

### 8. Sin errores de sintaxis JavaScript

```bash
node -e "
try {
  new Function(require('fs').readFileSync('app.js', 'utf8'));
  console.log('JS syntax OK');
} catch(e) {
  if (e instanceof SyntaxError) { console.error('SYNTAX ERROR:', e.message); process.exit(1); }
  else console.log('JS syntax OK');
}
"
```

**Expected:** `JS syntax OK`

**Verifica:** S03 no modifica `app.js`. Este check confirma que ningún cambio accidental contaminó el archivo JS.

---

## Edge Cases

### Marcadores 1806 y 1807 ya en viewport al cargar la página (sin animación)

Si el usuario abre la página con el timeline ya visible (scroll previo guardado, o viewport muy alto), los marcadores 1806 y 1807 recibirán la clase `reveal--no-anim` en lugar de `reveal--visible`. Aparecerán correctamente en su posición final pero sin animación de entrada.

**Expected:** Comportamiento correcto — los marcadores son visibles y están en la posición correcta. La ausencia de animación es intencional (documentada en KNOWLEDGE.md: "Reveal System: reveal--no-anim vs reveal--visible").

---

### Conector narrativo visible entre cards al hacer scroll

Al hacer scroll entre la última card del sub-período invasiones y el inicio del sub-período biográfico de Alberdi, el bloque `alberdi-quote` debe aparecer con animación slide (no fade — el reveal-slide da un efecto de deslizamiento lateral distinto al reveal-fade de las cards).

**Verificar en browser:**
1. Abrir `index.html` en browser
2. Hacer scroll hasta el final de `#rev-invasiones-inglesas`
3. Continuar scrolleando
4. **Expected:** Aparece un bloque de texto narrativo con fondo diferenciado (estilo alberdi-quote) que menciona Bayona, los hombres de 1806, la Primera Junta, y el nacimiento de Alberdi. Luego arranca el sub-período "Formación e infancia".

---

### Etiquetas de marcadores 1806 y 1807 no se solapan

En el timeline, 1806 y 1807 están a sólo 1.67% de distancia. El marcador 1806 tiene label below; el marcador 1807 tiene label above (`--above`).

**Verificar en browser:**
1. Abrir `index.html` y hacer scroll hasta el `revolucion-timeline`
2. Una vez animado, observar los primeros dos marcadores (1806 y 1807) en el extremo izquierdo del track
3. **Expected:** Las dos etiquetas ("1806 / Invasión" y "1807 / Defensa") son legibles y no se superponen. La etiqueta de 1806 aparece debajo del track; la de 1807 aparece arriba.

---

## Failure Signals

- `marker count: X` donde X ≠ 12 → marcador duplicado o faltante en el track HTML
- `pos 10.00%: false` → marcador 1806 no insertado o posición incorrecta
- `nth-child range: 2 – 11` (max=11) → CSS stagger no actualizado; los marcadores 1852 y 1860 quedarán con opacity:0 permanente
- `hasAlberdiQuote: false` → conector narrativo no insertado o insertado en la sección equivocada
- `hasBayona: false` o `hasNapoleon: false` → texto del conector incompleto (no cumple criterio del milestone)
- `certeza: <18` → regresión en el sub-período invasiones (alguna card fue modificada o eliminada accidentalmente)
- `JS syntax OK` → cualquier output distinto indica corrupción de app.js

## Not Proven By This UAT

- Que la animación de stagger se reproduce correctamente en un browser real (la secuencia 1806→1807→1810→...→1860 no puede verificarse sin runtime). Los valores CSS son correctos según artifact checks, pero la experiencia visual requiere un browser.
- Que el conector narrativo es historiográficamente correcto más allá de los hechos explícitamente verificados en S01 (INV-17, INV-18). La precisión del HMS Mistletoe como el barco específico está documentada en el content draft pero no re-verificada en este UAT.
- Responsividad de los nuevos marcadores en 320px (mobile) — el patrón de hide sublabels en mobile ya existía para los 10 marcadores anteriores y aplica automáticamente; se asume que funciona por transitividad.

## Notes for Tester

- Los checks de artifact (Test Cases 1–8) son deterministas y deben pasar todos sin excepción.
- Para el Edge Case de browser visual, prestar atención especial a si los marcadores 1806 y 1807 animan en orden cronológico (1806 primero, luego 1807, luego 1810) — el stagger CSS nth-child garantiza esto, pero es el aspecto más importante de verificar visualmente.
- El conector narrativo intencionalmente NO atribuye ninguna cita a Alberdi — usa "Síntesis editorial" como fuente. Esto es correcto historiográficamente (no existen citas de Alberdi sobre las invasiones inglesas en el content draft).
- Si se abre la página en mobile (375px), las sublabels de los marcadores del timeline son `display: none` por diseño — sólo se muestra el año principal. Correcto.
