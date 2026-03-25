---
id: M020
provides:
  - Sub-período #rev-invasiones-inglesas con 18 cards (INV-01 a INV-18) integradas en index.html antes de #rev-alberdi-formacion
  - Todos los actores clave cubiertos (Sobremonte, Liniers, Álzaga, Beresford, Popham, Whitelocke, Belgrano, Saavedra, Pueyrredón)
  - 4 card-nota-historiografica (INV-04 Sobremonte/protocolo Vértiz, INV-07 Álzaga/debate, INV-16 Whitelocke/no-artillería 4 hipótesis, INV-18 modelo tres causas)
  - 1 card-rumor__embedded en INV-13 (Ana Périchon / fuga de Beresford)
  - 1 card-opinion en INV-18 (nexo causal invasiones → Mayo 1810)
  - Sub-nav link <a href="#rev-invasiones-inglesas"> como primer elemento (posición cronológica correcta)
  - 2 marcadores en revolucion-timeline (1806 Invasión 10.00%, 1807 Defensa 11.67%) — total 12 marcadores (nth-child 2–13)
  - Bloque conector alberdi-quote reveal reveal-slide entre #rev-invasiones-inglesas y #rev-alberdi-formacion (Napoleón/Bayona/HMS Mistletoe/Primera Junta/nacimiento Alberdi)
  - Nexo causal invasiones→regimientos criollos→actores→Mayo 1810 explícito en INV-18 y en el conector narrativo
key_decisions:
  - D068: Protocolo Vértiz documentado como contexto del debate Sobremonte — card-nota-historiografica, sin exculpar ni condenar
  - D069: Cifra del tesoro dual — 1.086.208 pesos fuertes (Beresford a Castlereagh) en excerpt; 1.438.514 (Roberts, total cajas fiscales) en detalle expandible
  - D070: Ana Périchon card-rumor (no primary source); Rodríguez Peña y Padilla como organizadores documentados (hecho)
  - D071: Whitelocke no-bombardment — 4 hipótesis no excluyentes en card-nota-historiografica; hipótesis (a) preservación comercial como más documentada
  - D072: Salvador María Alberdi excluido — sin evidencia de presencia en Buenos Aires 1806-07; documentado explícitamente como ausencia en INV-12
  - D073: Nexo causal INV-18 como card-opinion — modelo de tres causas (invasiones + Ilustración + Bayona) evita determinismo; condiciones necesarias, no causas suficientes
  - D074: INV-05 imagen Popham (no Beresford) — Popham envió el tesoro a Londres; más preciso narrativamente
  - D075: INV-09 card-image-placeholder es estado final — ningún archivo Commons del soldado Patricios 1806 existe; no buscar más sin upload confirmado
  - D076: card-rumor__embedded para Ana Périchon — hecho primero, rumor delimitado al cierre del card-detail; no contamina certeza de la card principal
  - D077: INV-18 data-certeza="opinion" — conexiones causales son interpretaciones historiográficas, no hechos documentados
  - D078: Conector narrativo usa alberdi-quote (no narrative-connector) — consistencia visual con los 3 conectores previos del período revolución; cite = "Síntesis editorial" por transparencia
patterns_established:
  - card-rumor__embedded: hecho documentado primero, rumor sin fuente primaria como sección explícitamente delimitada al cierre del card-detail — no cambia data-certeza de la card
  - Al prepend markers en un CSS nth-child stagger: renumerar selectores +N, no cambiar delay values — los valores son semánticos, los selectores son posicionales
  - Marcador --above obligatorio cuando gap entre marcadores consecutivos es < 2% del track total
  - card-expand-toggle regex inflation: /card-expand-toggle/g cuenta 3× por botón; usar /<button class="card-expand-toggle"/g para conteo exacto
  - Retrato de actor como proxy de imagen de evento cuando no existe ilustración del evento en Commons — documentar con alt text específico a la acción de ese card
  - "Síntesis editorial" como atribución en <cite> cuando no existe cita real del personaje sobre el período tratado
observability_surfaces:
  - "node -e \"const h=require('fs').readFileSync('index.html','utf8'); const b=(h.match(/id=\\\"rev-invasiones-inglesas\\\"[\\s\\S]*?(?=id=\\\"rev-alberdi-formacion\\\")/)||[''])[0]; console.log('certeza:', (b.match(/data-certeza/g)||[]).length, '| buttons:', (b.match(/<button class=\\\"card-expand-toggle\\\"/g)||[]).length, '| notas:', (b.match(/card-nota-historiografica/g)||[]).length);\""
  - document.querySelectorAll('#rev-invasiones-inglesas [data-certeza]').length → 18
  - document.querySelectorAll('.revolucion-timeline__marker').length → 12
  - getComputedStyle(document.querySelectorAll('.revolucion-timeline__marker')[0]).getPropertyValue('--marker-pos') → ' 10.00%'
requirement_outcomes:
  - id: R003
    from_status: validated
    to_status: validated
    proof: Sub-período #rev-invasiones-inglesas con 18 cards extiende el contenido detallado del período 1800–1860 hacia atrás hasta 1806. certeza=18 confirmado via DOM query. Las invasiones inglesas ahora tienen cobertura al mismo nivel de detalle que los otros sub-períodos de M003.
  - id: R005
    from_status: active
    to_status: active
    proof: 15 imágenes Wikimedia Commons verificadas via API integradas en el nuevo sub-período (INV-01 a INV-18, 3 reutilizaciones documentadas, 1 card-image-placeholder para INV-09 donde no existe imagen Commons). Avanza el requisito pero no lo cierra — video/audio/data animations pendientes de otros milestones.
  - id: R012
    from_status: validated
    to_status: validated
    proof: 18 entradas verificadas contra ≥2 fuentes cada una. Certeza clasificada (17 hecho, 1 opinion). 4 card-nota-historiografica para debates sin resolución clara. S01-CONTENT-DRAFT.md documenta el protocolo completo de verificación histórica.
  - id: R013
    from_status: validated
    to_status: validated
    proof: Las 18 nuevas cards tienen data-certeza; distribución 17 hecho + 1 opinion. card-rumor__embedded en INV-13. Sistema de certeza extendido correctamente al nuevo sub-período sin cambios en JS.
duration: ~6 horas (S01: ~4.5h, S02: ~95min, S03: ~35min)
verification_result: passed
completed_at: 2026-03-25
---

# M020: Las Invasiones Inglesas — Detalle 1806–1807

**18 cards verificadas (INV-01–INV-18) en el sub-período #rev-invasiones-inglesas cubren todos los actores clave de 1806–07, con 4 notas historiográficas, rumor embebido, card-opinion del nexo causal, 2 marcadores en el revolucion-timeline, y un bloque conector Bayona→Primera Junta→Alberdi.**

## What Happened

M020 convirtió la card panorámica de las Invasiones Inglesas — que existía como una sola entrada en la sección colonial — en el sub-período más detallado del proyecto, construido en tres slices encadenados.

**S01 — Research y content draft:** Tres tareas de investigación producen `S01-CONTENT-DRAFT.md` con 18 entradas históricas (INV-01 a INV-18), cada una con certeza clasificada, fuentes verificadas (≥2 por entrada) e imágenes Wikimedia comprobadas vía API. El research resolvió todas las preguntas abiertas del plan: la cifra dual del tesoro (1.086.208 pesos fuertes enviados a Londres según Beresford a Castlereagh; 1.438.514 total de cajas fiscales según Roberts — ambas correctas para distintos scopes), el protocolo Vértiz como contexto del debate sobre la fuga de Sobremonte, los cuatro organizadores documentados de la fuga de Beresford (Rodríguez Peña y Padilla) vs. el rol de Ana Périchon como rumor sin fuente primaria, las cuatro hipótesis no excluyentes sobre por qué Whitelocke no usó artillería, la exclusión documentada de Salvador María Alberdi (sin evidencia de presencia en Buenos Aires 1806-07), y el modelo de tres causas para el nexo causal (invasiones + Ilustración + Bayona). S01 estableció el formato de entry que S02 reutilizó mecánicamente: título → año → certeza → excerpt → detalle expandible → fuentes → imagen.

**S02 — Integración HTML:** Dos tareas integran el bloque `<div id="rev-invasiones-inglesas">` con las 18 cards y una tercera tarea resuelve los PLACEHOLDERs de imagen. El sub-nav recibe el link `<a href="#rev-invasiones-inglesas">` como primer elemento (posición cronológica correcta — 1806-07 precede a todos los sub-períodos existentes). Las decisiones de imagen más importantes: INV-05 usa el retrato de Popham (quien envió el tesoro a Londres, más preciso que Beresford), INV-09 queda como `card-image-placeholder` definitivo (ninguna variante del filename del soldado Patricios 1806 existe en Commons), INV-16 usa la imagen de Álzaga como proxy de Whitelocke (cuyo retrato no existe en Commons). El mecanismo de `card-rumor__embedded` se establece como patrón: hecho documentado primero, rumor demarcado al cierre del `card-detail`, sin cambiar el `data-certeza` de la card principal. INV-18 es la única `card-opinion` del bloque — el nexo causal es interpretación historiográfica, no hecho documentado. Todos los checks V1–V6 pasan; layout responsive validado en 320px (1 columna) y 1920px (3 columnas); sin errores JS en consola.

**S03 — Timeline y nexo napoleónico:** Dos tareas breves completan el milestone. T01 inserta los marcadores 1806 (10.00%) y 1807 (11.67%) al inicio del `revolucion-timeline__track` y actualiza el bloque CSS stagger de 10 entradas (nth-child 2–11) a 12 entradas (nth-child 2–13), renumerando los selectores de los 10 marcadores existentes sin cambiar sus delay values. El marcador 1807 recibe `--above` para evitar solapamiento con 1806 (gap de 1.67%). T02 inserta el bloque conector `<blockquote class="alberdi-quote reveal reveal-slide">` entre `<!-- /#rev-invasiones-inglesas -->` y `<div id="rev-alberdi-formacion">`, sintetizando la cadena causal completa: Bayona 1808 → HMS Mistletoe → 25 de mayo de 1810 (los mismos hombres que votaron sus líderes en 1806 constituyen la Primera Junta) → 29 de agosto de 1810 (nacimiento de Alberdi en Tucumán). La `<cite>` se rotula "Síntesis editorial" — no existe cita real de Alberdi sobre las invasiones.

## Cross-Slice Verification

Todos los criterios de éxito del milestone verificados contra el HTML producido:

| Criterio | Verificación | Resultado |
|----------|-------------|-----------|
| `#rev-invasiones-inglesas` con 14+ cards | `data-certeza` en bloque = **18** | ✅ PASS |
| Todos los actores clave cubiertos | grep en bloque: Sobremonte(35), Liniers(38), Álzaga(25), Beresford(48), Popham(28), Whitelocke(14), Belgrano(21), Saavedra(18), Pueyrredón(15) | ✅ PASS |
| Tesoro 1.086.208 pesos documentado | `block.includes('1.086.208')` = true | ✅ PASS |
| Destitución de Sobremonte documentada | `block.includes('destituido')` = true | ✅ PASS |
| Regimientos criollos + elección de líderes | Patricios ✓, voto/pluralidad ✓ | ✅ PASS |
| Whitelocke / 4 hipótesis no-artillería | `Cuatro hipótesis no excluyentes` en card-nota-historiografica de INV-16 | ✅ PASS |
| Contexto europeo (Napoleón/Bayona) | conector entre secciones: Bayona ✓, Napoleón ✓ | ✅ PASS |
| Conexión causal milicias→Mayo 1810 explícita | INV-18 card-opinion + conector narrativo | ✅ PASS |
| Sub-nav link | `href="#rev-invasiones-inglesas"` como primer link | ✅ PASS |
| Timeline marcador 1806 | `--marker-pos: 10.00%` en track | ✅ PASS |
| Timeline marcador 1807 | `--marker-pos: 11.67%` en track | ✅ PASS |
| Total marcadores timeline | 12 marcadores (nth-child 2–13) | ✅ PASS |
| Sin errores JS | `new Function(app.js)` → syntax OK | ✅ PASS |
| Sin `src=""` | 0 atributos src vacíos en bloque | ✅ PASS |
| card-nota-historiografica ≥ 4 | 4 notas en INV-04, INV-07, INV-16, INV-18 | ✅ PASS |
| Responsive 320px | 1 columna, sin overflow (verificado en S02/T03) | ✅ PASS |
| Responsive 1920px | 3 columnas, sin overflow (verificado en S02/T03) | ✅ PASS |

**Definición de done:** Todos los slices `[x]`. Tres slice summaries existentes. Ningún criterio sin pasar.

## Requirement Changes

- R003: validated → validated — El sub-período #rev-invasiones-inglesas con 18 cards extiende el contenido detallado hacia 1806 dentro del período 1800–1860. R003 estaba validado por M003 (20 cards para 1810–1860); este milestone extiende hacia atrás sin modificar lo ya validado.
- R005: active → active — 15 imágenes Wikimedia verificadas integradas en el nuevo sub-período. El requisito avanza pero no se cierra — video, audio y animaciones de datos quedan pendientes.
- R012: validated → validated — 18 entradas con ≥2 fuentes, certeza clasificada, 4 debates documentados con card-nota-historiografica. Protocolo de verificación consistente con M002–M004.
- R013: validated → validated — Las 18 nuevas cards amplían el sistema certeza sin cambios en JS. Distribución: 17 hecho, 1 opinion, rumor embebido (no como card type sino como card-rumor__embedded dentro de card-hecho).

## Forward Intelligence

### What the next milestone should know

- **El revoluton-timeline tiene ahora 12 marcadores** (nth-child 2–13 en CSS stagger). El siguiente marcador a agregar sería nth-child(14) — basta con añadirlo al HTML en posición cronológica y agregar el selector CSS con el delay correspondiente. Los marcadores 1806 y 1807 están al inicio; cualquier marcador entre 1806 y 1810 requeriría insertar en el medio del track y renumerar (+1 todos los posteriores).

- **El bloque #rev-invasiones-inglesas tiene certeza=18 y notas=4.** Estos son los valores de referencia para checks de regresión. No bajar de estos valores en ediciones futuras.

- **INV-18 es la card-opinion del nexo causal.** Si un milestone futuro quisiera añadir más contenido sobre la conexión invasiones→revolución, debe construir sobre INV-18 sin duplicar su contenido. El conector narrativo `alberdi-quote` entre secciones es el cuarto conector de ese tipo en el período revolución.

- **INV-09 es card-image-placeholder definitivo** — los 3 filenames tentados en Commons no existen. No buscar más a menos que se conozca un upload específico. El placeholder tiene aria-label descriptivo correcto.

- **La ironía Liniers/Álzaga** (ejecutados en 1810 y 1812 por bandos opuestos) está documentada en los excerpts de sus cards respectivas — es el dato más memorable del sub-período y debe mantenerse visible en cualquier edición futura.

- **El conector narrativo menciona el HMS Mistletoe** como el barco que trajo la noticia de Bayona a Buenos Aires el 14 de mayo de 1810 — dato verificado en INV-17. Si investigación futura contradice este dato, el conector necesita actualización quirúrgica.

### What's fragile

- **Marcadores 1806/1807 muy próximos** — gap de 1.67% en el track. A resoluciones muy bajas o zoom muy alto las etiquetas pueden solaparse a pesar del modificador `--above` en 1807. Es el riesgo inherente a la densidad del período 1806–1810.

- **4 notas historiográficas exactamente** — V6 pasa con el mínimo. Las 4 notas están en INV-04 (Sobremonte), INV-07 (Álzaga), INV-16 (Whitelocke), INV-18 (nexo causal). Cualquier edición que elimine una de estas notas hace fallar las verificaciones de regresión.

- **Reutilización de retratos:** INV-03 e INV-15 usan retratos de Beresford y Liniers respectivamente (mismos que otras cards). INV-16 reutiliza la imagen de Álzaga (proxy de Whitelocke). Visualmente puede resultar repetitivo pero es la única opción verificada disponible en Commons.

### Authoritative diagnostics

- `node -e "const h=require('fs').readFileSync('index.html','utf8'); const b=(h.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/)||[''])[0]; console.log('certeza:', (b.match(/data-certeza/g)||[]).length, '| buttons:', (b.match(/<button class=\"card-expand-toggle\"/g)||[]).length, '| notas:', (b.match(/card-nota-historiografica/g)||[]).length, '| chars:', b.length);"` — estado completo del bloque en <1s

- `document.querySelectorAll('#rev-invasiones-inglesas [data-certeza]').length` → 18 (certeza count de runtime)

- `document.querySelectorAll('.revolucion-timeline__marker').length` → 12 (total marcadores en el timeline de revolución)

- `getComputedStyle(document.querySelectorAll('.revolucion-timeline__marker')[0]).getPropertyValue('--marker-pos')` → `' 10.00%'` (confirma que el primer marcador es 1806, no 1810)

### What assumptions changed

- **"Ilustración de la caída de Buenos Aires existe en Commons"** — no existe ninguna ilustración verificable de la escena del 27 de junio de 1806. INV-03 usa retrato de Beresford como proxy documentado.

- **"Retrato de Whitelocke está en Commons"** — confirmado que NO existe en Wikimedia Commons a marzo 2026. INV-16 usa imagen de Álzaga con nota explícita.

- **"Salvador María Alberdi conecta con las invasiones"** — no hay evidencia. La conexión R011 para este período es que Juan Bautista fue moldeado por el relato de las invasiones como mito fundacional, no por presencia directa de su padre.

- **"Ana Périchon organizó la fuga de Beresford"** — no hay fuente primaria que la vincule al evento. Rodríguez Peña y Padilla son los organizadores documentados. El rol de Périchon como amante de Liniers es una historia distinta y posterior.

- **S03 estimado en 75 minutos** — tomó ~35 minutos porque los patrones (nth-child stagger, alberdi-quote) ya estaban completamente establecidos en el codebase.

## Files Created/Modified

- `index.html` — sub-período `#rev-invasiones-inglesas` completo (~75.953 chars del bloque, 18 cards INV-01–INV-18 con certeza, imágenes, expand/collapse, 4 notas historiográficas, 1 card-rumor__embedded, 1 card-opinion) + sub-nav link como primer elemento + 2 marcadores en `revolucion-timeline__track` (1806 y 1807) + bloque conector `alberdi-quote` entre #rev-invasiones-inglesas y #rev-alberdi-formacion
- `styles.css` — bloque stagger `revolucion-timeline__marker:nth-child` expandido de 10 entradas (2–11) a 12 entradas (2–13), con dot y label rules para cada marcador; marcadores existentes 1810–1860 renumerados +2
- `.gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md` — draft con 18 entradas históricas verificadas (INV-01 a INV-18)
- `.gsd/milestones/M020/slices/S01/tasks/T01-DRAFT-PARTIAL.md` — checkpoint INV-01 a INV-05
- `.gsd/milestones/M020/slices/S01/tasks/T02-DRAFT-PARTIAL.md` — checkpoint INV-06 a INV-12
- `.gsd/milestones/M020/slices/S01/tasks/T03-DRAFT-PARTIAL.md` — checkpoint INV-13 a INV-18
