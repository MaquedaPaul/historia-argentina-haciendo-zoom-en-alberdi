---
estimated_steps: 4
estimated_files: 1
---

# T02: Conector narrativo Napoleón/Bayona entre invasiones y formación de Alberdi

**Slice:** S03 — Timeline, nexo causal y contexto napoleónico
**Milestone:** M020

## Description

Hay un corte abrupto en la narrativa del sitio entre el final de `#rev-invasiones-inglesas` (1806–1810, última card = INV-18, nexo causal) y el inicio de `#rev-alberdi-formacion` (1810, nacimiento de Alberdi). El milestone requiere que el contexto europeo napoleónico y la conexión causal invasiones→Mayo 1810 sean "visibles en el flujo narrativo". Aunque INV-17 (Bayona) e INV-18 (nexo causal) están dentro del sub-período, no hay un elemento de transición que establezca el puente entre "el período de las invasiones terminó" y "nació la generación que haría la revolución".

Esta tarea inserta un bloque narrativo connector entre los dos sub-períodos usando la estructura `<blockquote class="alberdi-quote reveal reveal-slide">` que es el patrón establecido del codebase para conectores entre sub-secciones. El contenido sintetiza: Bayona 1808 como detonante político → las milicias criollas ya estaban listas → 1810 llegó el momento → y en ese mismo 1810, nació en Tucumán el niño Alberdi. Este conector hace explícita la transición de período histórico a período biográfico.

**Nota importante sobre certeza editorial:** Este bloque es síntesis editorial del redactor (no cita atribuible a Alberdi ni a un historiador específico). Usar la estructura `<blockquote class="alberdi-quote">` es apropiado como contenedor de transición narrativa — el codebase lo usa así en múltiples lugares (no siempre con citas de Alberdi; véase línea ~1864 o línea ~2635 de index.html para ejemplos con contenido narrativo). No inventar una cita falsa de Alberdi sobre 1806.

**Contexto de contenido** — datos verificados en INV-17 e INV-18 disponibles para el conector:
- Bayona: 5–6 de mayo de 1808, Fernando VII abdica; 4 de junio, José Bonaparte nombrado rey
- La noticia llegó a Buenos Aires el 14 de mayo de 1810 (vía HMS Mistletoe)
- 22 de mayo: Cabildo Abierto. 25 de mayo: Primera Junta
- Los milicias creadas en noviembre 1806 tenían como comandante a Cornelio Saavedra, que presidió la Primera Junta
- Juan Bautista Alberdi nació el 29 de agosto de 1810 en Tucumán — mismo año que la revolución

## Steps

1. **Localizar el punto de inserción** en `index.html`. Buscar la línea `</div><!-- /#rev-invasiones-inglesas` (~línea 876) y la línea `<div id="rev-alberdi-formacion"` (~línea 878). El nuevo bloque va entre esas dos líneas.

2. **Redactar el contenido del conector** — el bloque debe:
   - Nombrar explícitamente a Napoleón/Bayona y la crisis de legitimidad
   - Mencionar que los milicias de 1806 se convirtieron en los actores de 1810
   - Conectar con el nacimiento de Alberdi en 1810 como transición al sub-período siguiente
   - Ser conciso (3–5 oraciones máximo en el `<p>` narrativo)

3. **Insertar el bloque HTML** con la estructura `alberdi-quote reveal reveal-slide`:

   ```html
   <!-- CONECTOR NARRATIVO: Bayona → 1810 → nacimiento de Alberdi (M020-S03-T02) -->
   <blockquote class="alberdi-quote reveal reveal-slide">
     <p>Entre agosto de 1806 y mayo de 1810, el mundo cambió. En Bayona, Napoleón forzó la abdicación de los Borbones y nombró a su hermano José Bonaparte rey de España. La cadena de legitimidad que vinculaba las colonias con la Corona se rompió. El 14 de mayo de 1810, la noticia llegó a Buenos Aires. El 25 de mayo, los mismos hombres que en noviembre de 1806 habían elegido por votación a sus jefes militares — Saavedra, Belgrano, Pueyrredón — constituyeron la Primera Junta de Gobierno. El poder armado criollo, forjado en las invasiones inglesas, encontró su oportunidad política en la crisis española. Tres meses después, el 29 de agosto de 1810, en San Miguel de Tucumán, nació Juan Bautista Alberdi.</p>
     <cite>Síntesis editorial: datos de INV-17 (Bayona) e INV-18 (nexo causal) integrados en la narrativa del sitio.</cite>
   </blockquote>
   ```

   Nota: El texto del `<p>` puede ajustarse en tono y extensión. Lo esencial es que mencione: (1) Bayona/Napoleón, (2) la cadena milicia→actores de 1810, (3) el nacimiento de Alberdi como transición. La `<cite>` puede simplificarse o modificarse según criterio editorial.

4. **Verificar** que el bloque está correctamente posicionado y tiene las clases reveal:

   ```bash
   node -e "
   const h = require('fs').readFileSync('index.html', 'utf8');
   const between = (h.match(/rev-invasiones-inglesas[\s\S]*?id=\"rev-alberdi-formacion\"/)||[''])[0];
   console.log('has alberdi-quote:', between.includes('alberdi-quote'));
   console.log('has reveal-slide:', between.includes('reveal-slide'));
   console.log('has Bayona or Napoleón:', between.includes('Bayona') || between.includes('apole'));
   console.log('chars between sections:', between.length);
   "
   ```

## Must-Haves

- [ ] Bloque con clase `alberdi-quote reveal reveal-slide` insertado entre `<!-- /#rev-invasiones-inglesas -->` y `<div id="rev-alberdi-formacion">`
- [ ] El contenido menciona explícitamente el contexto europeo (Bayona, Napoleón, o José Bonaparte)
- [ ] El contenido establece la cadena causal hacia 1810 (los actores de las milicias como actores de la revolución)
- [ ] El contenido menciona el nacimiento de Alberdi en 1810 como transición al sub-período siguiente
- [ ] Las etiquetas HTML están correctamente cerradas (no dejar `<blockquote>` abierto)
- [ ] `node -e "new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK')"` — sin errores de sintaxis JS (app.js no se modifica, pero verificar como sanity check)

## Verification

- `node -e "const h=require('fs').readFileSync('index.html','utf8'); const between=(h.match(/rev-invasiones-inglesas[\s\S]*?id=\"rev-alberdi-formacion\"/)||[''])[0]; console.log('connector:', between.includes('alberdi-quote') || between.includes('reveal-slide'), '| Bayona:', between.includes('Bayona') || between.includes('apole'), '| chars:', between.length); console.assert(between.length > 500);"` — debe imprimir `connector: true | Bayona: true | chars: (>500)`
- `grep -c "rev-invasiones-inglesas" index.html` — debe ser ≥ 2 (el div id + el comentario de cierre + el sub-nav link)
- `! grep -q 'alberdi-quote.*alberdi-quote' index.html` — no debe haber tags duplicados (sanity check)

## Inputs

- `index.html` — línea ~876: `</div><!-- /#rev-invasiones-inglesas (INV-01 a INV-18 completo` y línea ~878: `<div id="rev-alberdi-formacion"`
- Datos de contenido verificados en INV-17 (~línea 811) e INV-18 (~línea 839) ya integrados en index.html — no re-buscar fuentes
- Patrón de `alberdi-quote`: `<blockquote class="alberdi-quote reveal reveal-slide"><p>...</p><cite>...</cite></blockquote>` (ver línea ~320, ~1251, ~1864 para ejemplos existentes)
- Datos de Alberdi: nació 29 de agosto de 1810 en Tucumán; padre Salvador Alberdi, amigo de Belgrano. Fuente en BIOG-1 (~línea 882 de index.html).

## Expected Output

- `index.html` — bloque `<blockquote class="alberdi-quote reveal reveal-slide">` insertado entre los dos sub-períodos, con contenido que nombra a Napoleón/Bayona, conecta las milicias de 1806 con los actores de 1810, y menciona el nacimiento de Alberdi en 1810 como transición narrativa al sub-período siguiente
