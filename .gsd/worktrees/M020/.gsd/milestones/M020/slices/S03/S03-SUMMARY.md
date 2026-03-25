---
id: S03
parent: M020
milestone: M020
provides:
  - Marcadores 1806 (Invasión) y 1807 (Defensa) en revolucion-timeline con posiciones 10.00% y 11.67%
  - CSS stagger actualizado de 10 a 12 entradas (nth-child 2–13) con delays cronológicos 0.05s–2.55s
  - Bloque conector narrativo `alberdi-quote reveal reveal-slide` entre #rev-invasiones-inglesas y #rev-alberdi-formacion que cierra el arco europeo (Bayona → crisis de legitimidad → Mayo 1810 → nacimiento de Alberdi)
requires:
  - slice: S02
    provides: Sub-período #rev-invasiones-inglesas completo con 18 cards (certeza=18, notas=4), sub-nav link, y revolucion-timeline existente
affects: []
key_files:
  - index.html
  - styles.css
key_decisions:
  - nth-child(2)=1806 y nth-child(3)=1807 al inicio del track; marcadores existentes renumerados +2 (ahora nth-child 4–13)
  - Marcador 1807 usa modificador --above para evitar solapamiento de etiqueta con 1806 (mismo patrón que 1820, 1829, 1838)
  - Delays de los 10 marcadores existentes 1810–1860 sin cambios en valor; solo cambió su número de selector
  - Conector narrativo usa estructura alberdi-quote (no narrative-connector) para diferenciarse visualmente de las tarjetas de eventos
  - <cite> rotulada "Síntesis editorial" para transparencia historiográfica (no cita real de Alberdi)
  - Detalle del HMS Mistletoe añadido para precisión factual (verificado en INV-17)
patterns_established:
  - Al agregar marcadores al inicio de un timeline CSS stagger, basta renumerar los selectores nth-child sin cambiar los delay values de los marcadores existentes
  - El conector entre sub-períodos histórico→biográfico usa alberdi-quote con reveal reveal-slide para diferenciarse visualmente de las tarjetas de eventos (reveal reveal-fade)
observability_surfaces:
  - "node -e \"const h=require('fs').readFileSync('index.html','utf8'); const t=(h.match(/revolucion-timeline__track[\\s\\S]*?<!-- \\/.revolucion-timeline__track/)||[''])[0]; console.log('markers:', (t.match(/revolucion-timeline__marker/g)||[]).length);\""
  - "DevTools: document.querySelectorAll('.revolucion-timeline__marker').length → 12"
  - "DevTools: getComputedStyle(document.querySelectorAll('.revolucion-timeline__marker')[0]).getPropertyValue('--marker-pos') → ' 10.00%'"
  - "node -e \"const h=require('fs').readFileSync('index.html','utf8'); const b=(h.match(/rev-invasiones-inglesas[\\s\\S]*?id=\\\"rev-alberdi-formacion\\\"/)||[''])[0]; console.log('connector:', b.includes('alberdi-quote'), '| Bayona:', b.includes('Bayona'), '| chars:', b.length);\""
drill_down_paths:
  - .gsd/milestones/M020/slices/S03/tasks/T01-SUMMARY.md
  - .gsd/milestones/M020/slices/S03/tasks/T02-SUMMARY.md
duration: 35m
verification_result: passed
completed_at: 2026-03-25
---

# S03: Timeline, nexo causal y contexto napoleónico

**Dos marcadores animados (1806 Invasión / 1807 Defensa) añadidos al revolucion-timeline y un bloque conector narrativo que cierra el arco europeo — Bayona → crisis de legitimidad → milicias criollas → Primera Junta → nacimiento de Alberdi — insertado entre los dos sub-períodos.**

## What Happened

S03 tenía dos entregables independientes que se implementaron en secuencia:

**T01 — Marcadores 1806 y 1807 (20m)**

Se localizó el `revolucion-timeline__track` en `index.html` (línea ~2963) e inmediatamente después del `div.revolucion-timeline__progress` se insertaron dos nuevos marcadores:

- **1806 Invasión** — `--marker-pos: 10.00%`, label below (clase base)
- **1807 Defensa** — `--marker-pos: 11.67%`, label above (clase `revolucion-timeline__marker--above`) para evitar solapamiento con la etiqueta de 1806, siguiendo el patrón ya establecido para 1820, 1829 y 1838

En `styles.css` se reemplazó el bloque de stagger que cubría nth-child(2)–(11) (10 marcadores) por uno que cubre nth-child(2)–(13) (12 marcadores). Los delays de dot de los nuevos marcadores son 0.05s y 0.20s respectivamente; los 10 marcadores existentes 1810–1860 conservan exactamente los mismos delay values — sólo cambiaron sus números de selector (+2). La animación cronológica queda intacta.

**T02 — Conector narrativo (15m)**

Se insertó un `<blockquote class="alberdi-quote reveal reveal-slide">` entre `</div><!-- /#rev-invasiones-inglesas -->` y `<div id="rev-alberdi-formacion">`. El contenido sintetiza la cadena causal completa en un párrafo único:

1. Bayona 1808 — Napoleón, abdicación borbónica, José Bonaparte
2. HMS Mistletoe — el barco que trajo la noticia a Buenos Aires el 14 de mayo de 1810
3. 25 de mayo de 1810 — los mismos hombres que votaron sus líderes militares en 1806 (Saavedra, Belgrano, Pueyrredón) constituyen la Primera Junta
4. 29 de agosto de 1810 — nace Alberdi en Tucumán, como cierre de transición al sub-período biográfico

La `<cite>` se rotula explícitamente como "Síntesis editorial" para transparencia historiográfica — no hay cita real de Alberdi sobre el período de las invasiones.

## Verification

Todos los checks V1–V5 del slice plan pasaron sin errores:

| Check | Comando | Resultado |
|-------|---------|-----------|
| V1 — Marcadores 1806/1807 | `node` assert has1806 && has1807 | ✅ PASS (markers=16, 1806=true, 1807=true) |
| V2 — CSS nth-child(13) | `node` regex max nth-child ≥ 13 | ✅ PASS (max=13) |
| V3 — Conector narrativo presente | `node` assert alberdi-quote or reveal-slide between sections | ✅ PASS (chars=78140) |
| V4 — Sin errores JS | `new Function(app.js)` | ✅ PASS (syntax OK) |
| V5 — Sin regresión certeza | certeza ≥ 18 && notas ≥ 4 | ✅ PASS (certeza=18, notas=4) |

El conector contiene explícitamente "Bayona" y "Napoleón", y su bloque `reveal reveal-slide` es auto-descubierto por el IntersectionObserver existente sin cambios en `app.js`.

## New Requirements Surfaced

- none

## Deviations

**T02 — ajuste editorial menor:** El texto del plan no mencionaba el HMS Mistletoe. Se añadió `<em>HMS Mistletoe</em>` para mayor precisión factual (dato verificado en INV-17 del content draft de S01). Sin impacto estructural.

## Known Limitations

- Los marcadores 1806 y 1807 requieren que el usuario haga scroll hasta el timeline para ver la animación — elementos ya visibles al cargar reciben `reveal--no-anim` en lugar de `reveal--visible` (comportamiento intencional del sistema, documentado en KNOWLEDGE.md). No es una limitación específica de S03.
- El conector narrativo usa "Síntesis editorial" como atribución — no existe una cita directa de Alberdi sobre las invasiones inglesas ni sobre su propio nacimiento en ese contexto.

## Follow-ups

- none — S03 es el cierre final de M020. El milestone está completo.

## Files Created/Modified

- `index.html` — 2 nuevos marcadores (1806, 1807) en `revolucion-timeline__track`; bloque `<blockquote class="alberdi-quote reveal reveal-slide">` entre `<!-- /#rev-invasiones-inglesas -->` y `<div id="rev-alberdi-formacion">`
- `styles.css` — bloque stagger `revolucion-timeline__marker:nth-child` expandido de 10 entradas (2–11) a 12 entradas (2–13), con dot y label rules para cada marcador

## Forward Intelligence

### What the next slice should know
- El revolucion-timeline ahora tiene **12 marcadores** (nth-child 2–13 en CSS). Si se agrega un marcador 13 en el futuro, el patrón es: insertar en el track HTML en posición cronológica, agregar nth-child(N) al bloque CSS, y renumerar los posteriores. Los delay values no necesitan cambiarse, sólo los selectores.
- El conector `alberdi-quote` entre invasiones y formación de Alberdi está en `index.html` y es el cuarto bloque de ese tipo en el sitio (hay 3 anteriores en otros sub-períodos del período revolución). Si en el futuro se añade contenido entre #rev-invasiones-inglesas y #rev-alberdi-formacion, el conector deberá reubicarse o actualizarse.
- El sub-período `#rev-invasiones-inglesas` tiene certeza=18 y notas=4 — estos son los valores de referencia para checks de regresión futuros.

### What's fragile
- El marcador 1807 con `--above` está a sólo 1.67% del marcador 1806 — a resoluciones muy bajas o con zoom muy alto las etiquetas podrían solaparse. El patrón above/below mitiga esto en condiciones normales.
- El texto del conector narrativo menciona al HMS Mistletoe como el barco que trajo la noticia de Bayona; si investigación futura contradice este dato específico, el conector necesita actualización.

### Authoritative diagnostics
- `document.querySelectorAll('.revolucion-timeline__marker').length` en DevTools → debe retornar **12** (no 16 — el count de grep retorna 16 por múltiples ocurrencias del string en el archivo)
- `getComputedStyle(document.querySelectorAll('.revolucion-timeline__marker')[0]).getPropertyValue('--marker-pos')` → `' 10.00%'` confirma que el primer marcador es 1806

### What assumptions changed
- El plan estimaba 45m para T01 y 30m para T02; la ejecución tomó 20m y 15m respectivamente — ambas tareas eran más mecánicas de lo esperado porque el patrón de nth-child stagger y el patrón alberdi-quote ya estaban bien establecidos en el codebase.
