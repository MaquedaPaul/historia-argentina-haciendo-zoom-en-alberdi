---
id: T02
parent: S03
milestone: M020
provides:
  - Bloque conector narrativo `alberdi-quote reveal reveal-slide` insertado entre #rev-invasiones-inglesas y #rev-alberdi-formacion que cierra el arco europeo (Bayona → crisis legitimidad → Mayo 1810 → nacimiento de Alberdi)
key_files:
  - index.html
key_decisions:
  - Usada la estructura `<blockquote class="alberdi-quote reveal reveal-slide">` como contenedor de transición narrativa (patrón establecido del codebase, no requiere cita real de Alberdi)
  - `<cite>` rotulada como "Síntesis editorial" para transparencia historiográfica
  - Añadido detalle del *HMS Mistletoe* (nombre del barco que trajo la noticia de Bayona) con etiqueta `<em>` para precisión factual
patterns_established:
  - El conector entre sub-períodos histórico→biográfico usa el patrón `alberdi-quote` con `reveal reveal-slide` para diferenciarse visualmente de las tarjetas de eventos (`reveal reveal-fade`)
observability_surfaces:
  - "node -e \"const h=require('fs').readFileSync('index.html','utf8'); const b=(h.match(/rev-invasiones-inglesas[\\s\\S]*?id=\\\"rev-alberdi-formacion\\\"/)||[''])[0]; console.log('connector:', b.includes('alberdi-quote'), '| Bayona:', b.includes('Bayona'), '| chars:', b.length);\""
  - "DevTools: document.querySelectorAll('.alberdi-quote').length — debe ser ≥ 1 en la sección de invasiones"
  - "Failure visible: si el bloque no aparece al hacer scroll entre invasiones y alberdi-formacion, verificar que `blockquote.alberdi-quote` tiene clases `reveal reveal-slide` y que el IntersectionObserver en app.js está registrando elementos con clase `reveal`"
duration: 15m
verification_result: passed
completed_at: 2026-03-25
blocker_discovered: false
---

# T02: Conector narrativo Napoleón/Bayona entre invasiones y formación de Alberdi

**Insertado bloque narrativo `alberdi-quote reveal reveal-slide` entre #rev-invasiones-inglesas y #rev-alberdi-formacion que nombra explícitamente a Napoleón/Bayona, conecta las milicias de 1806 con los actores de la Primera Junta, y cierra con el nacimiento de Alberdi el 29 de agosto de 1810 como transición al sub-período biográfico.**

## What Happened

Se localizó el punto de inserción exacto: entre la línea `</div><!-- /#rev-invasiones-inglesas ... -->` (línea 876) y `<div id="rev-alberdi-formacion"` (línea 878 original). El bloque fue insertado con la siguiente estructura, siguiendo el patrón `alberdi-quote` del codebase:

```html
<!-- CONECTOR NARRATIVO: Bayona → 1810 → nacimiento de Alberdi (M020-S03-T02) -->
<blockquote class="alberdi-quote reveal reveal-slide">
  <p>Entre agosto de 1806 y mayo de 1810, el mundo cambió. En Bayona, Napoleón forzó la abdicación de los Borbones y nombró a su hermano José Bonaparte rey de España. La cadena de legitimidad que vinculaba las colonias con la Corona se rompió. El 14 de mayo de 1810, la noticia llegó a Buenos Aires a bordo del <em>HMS Mistletoe</em>. El 25 de mayo, los mismos hombres que en noviembre de 1806 habían elegido por votación a sus jefes militares — Saavedra, Belgrano, Pueyrredón — constituyeron la Primera Junta de Gobierno. El poder armado criollo, forjado en las invasiones inglesas, encontró su oportunidad política en la crisis española. Tres meses después, el 29 de agosto de 1810, en San Miguel de Tucumán, nació Juan Bautista Alberdi.</p>
  <cite>Síntesis editorial: datos de INV-17 (Bayona, 1808) e INV-18 (nexo causal invasiones→Mayo 1810) integrados en la narrativa del sitio.</cite>
</blockquote>
```

El contenido cumple los tres requisitos del plan:
1. **Bayona/Napoleón** — nombrado explícitamente en la segunda oración
2. **Cadena milicia→actores de 1810** — Saavedra, Belgrano, Pueyrredón conectados desde 1806 hasta el 25 de mayo
3. **Nacimiento de Alberdi** — última oración, 29 de agosto de 1810, como transición al sub-período biográfico

Ajuste editorial menor respecto al texto del plan: se añadió `<em>HMS Mistletoe</em>` para preservar el detalle factual del barco (dato verificado en INV-17) y se actualizó la `<cite>` para incluir el año entre paréntesis.

## Verification

Todos los checks de la tarea y del slice pasaron sin errores.

**Verificaciones de tarea:**
- `has alberdi-quote: true` ✅
- `has reveal-slide: true` ✅
- `has Bayona or Napoleon: true` ✅
- `chars between sections: 78140` (≫500) ✅
- JS syntax OK (`app.js` sin modificar) ✅
- `grep -c "rev-invasiones-inglesas" index.html` → 3 (≥2) ✅
- Duplicate alberdi-quote inline: none ✅

**Slice verification completa (V1–V5):**
- V1: markers=16, 1806=true, 1807=true ✅
- V2: max nth-child=13 ✅
- V3: connector present=true, chars=78140 ✅
- V4: JS syntax OK ✅
- V5: certeza=18, notas=4, sin regresión ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| T-a | `node -e "... between.includes('alberdi-quote') && Bayona && chars>500 ..."` | 0 | ✅ pass | <1s |
| T-b | `node -e "new Function(app.js) ..."` | 0 | ✅ pass | <1s |
| T-c | `grep -c "rev-invasiones-inglesas" index.html` | 0 | ✅ 3 | <1s |
| T-d | `node -e "... no duplicate alberdi-quote ..."` | 0 | ✅ pass | <1s |
| V1 | `node -e "... markers 1806/1807 assert ..."` | 0 | ✅ pass | <1s |
| V2 | `node -e "... max nth-child assert(>=13) ..."` | 0 | ✅ pass | <1s |
| V3 | `node -e "... connector present assert ..."` | 0 | ✅ pass | <1s |
| V4 | `node -e "new Function(app.js) ..."` | 0 | ✅ pass | <1s |
| V5 | `node -e "... certeza>=18 && notas>=4 ..."` | 0 | ✅ pass | <1s |

## Diagnostics

- `node -e "const h=require('fs').readFileSync('index.html','utf8'); const b=(h.match(/rev-invasiones-inglesas[\s\S]*?id=\"rev-alberdi-formacion\"/)||[''])[0]; console.log('connector:', b.includes('alberdi-quote'), '| Bayona:', b.includes('Bayona'), '| HMS:', b.includes('Mistletoe'), '| chars:', b.length);"` — verifica presencia y contenido del conector
- DevTools: `document.querySelectorAll('.alberdi-quote').length` — debe ser ≥ 1 en el área de invasiones
- Si el bloque no aparece visualmente al hacer scroll: confirmar que `blockquote.alberdi-quote` tiene clases `reveal reveal-slide` y que el IntersectionObserver en app.js registra `.reveal` (sin cambios en app.js, debería funcionar automáticamente)
- Failure state visible: ausencia del bloque entre las dos sub-secciones al inspeccionar DOM entre `#rev-invasiones-inglesas` y `#rev-alberdi-formacion`

## Deviations

Ajuste editorial menor: se añadió `<em>HMS Mistletoe</em>` al texto del conector (nombre del barco que llevó la noticia de Bayona a Buenos Aires) para mayor precisión factual, y se actualizó la `<cite>` con el año "(Bayona, 1808)" entre paréntesis. Ambos son refinamientos del texto propuesto en el plan, no desvíos estructurales.

## Known Issues

none

## Files Created/Modified

- `index.html` — bloque `<blockquote class="alberdi-quote reveal reveal-slide">` insertado entre `<!-- /#rev-invasiones-inglesas -->` y `<div id="rev-alberdi-formacion">`, cerrando el arco europeo napoleónico y conectando con el nacimiento de Alberdi
