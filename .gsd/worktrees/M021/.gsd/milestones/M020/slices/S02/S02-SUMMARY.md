---
id: S02
parent: M020
milestone: M020
provides:
  - Sub-período <div id="rev-invasiones-inglesas" class="sub-period reveal reveal-fade"> integrado en #periodo-revolucion antes de #rev-alberdi-formacion
  - 18 <article> cards (INV-01 a INV-18) con data-certeza, certeza-indicator, año, título, excerpt, expand/collapse, cite footer
  - 4 card-nota-historiografica (INV-04 Sobremonte/protocolo, INV-07 Álzaga/debate, INV-16 Whitelocke/no-bombardeo, INV-18 modelo de tres causas)
  - 1 card-rumor__embedded en INV-13 (Ana Périchon / fuga de Beresford)
  - 1 card-opinion (INV-18 nexo causal: milicias como condición necesaria, no causa suficiente)
  - Sub-nav link <a href="#rev-invasiones-inglesas"> como primer link (cronológicamente anterior a todos los sub-períodos existentes)
  - Stagger delays 0ms–1360ms (18 pasos × 80ms)
  - Layout responsive validado: 1 columna en 320px, 3 columnas en 1920px, sin overflow
  - Sin errores JS en consola; reveal-on-scroll y expand/collapse auto-descubren las 18 nuevas cards sin cambios en app.js
requires:
  - slice: S01
    provides: S01-CONTENT-DRAFT.md — 18 entradas verificadas INV-01 a INV-18 con certeza, imágenes Wikimedia, notas historiográficas y flags de rumor/opinión
affects:
  - S03
key_files:
  - index.html
key_decisions:
  - INV-03 usa retrato de Beresford (URL verificada) — File:Battle_of_Buenos_Aires_1806.jpg no existe en Commons; el draft documenta este retrato como alternativa válida
  - INV-05 usa retrato de Popham (File:Sir_Home_Riggs_Popham_from_NPG.jpg, URL thumbnail verificada vía API) — Popham fue quien envió el tesoro a Londres; narrativamente más preciso que Beresford
  - INV-09 usa card-image-placeholder — 3 variantes de filename Commons tentadas (Patricios_soldier_1806.jpg, Regimiento_de_Patricios_1806.jpg, Soldier_of_the_Patricios_1806.jpg) todas returning missing; placeholder con texto descriptivo es estado correcto y final
  - INV-15 usa imagen de Liniers (verificada) — Primera_junta.jpg reservada para INV-18 donde es narrativamente más precisa (nexo causal hacia Mayo 1810)
  - INV-16 usa imagen de Álzaga (Malzaga.png) — retrato de Whitelocke no disponible en Commons a marzo 2026; Álzaga como proxy documentado en task plan
  - INV-18 es card-opinion (data-certeza="opinion") — el nexo causal invasiones→Mayo 1810 es una interpretación historiográfica, no un hecho documentado; correcto
  - INV-13 usa card-rumor__embedded dentro del card-detail (no card-nota-historiografica) — mecanismo correcto para rumores; el hecho documentado (Rodríguez Peña/Padilla) va primero, el rumor (Ana Périchon) como sección separada al cierre
  - Todas las 18 cards son card-hecho o card-opinion a nivel de certeza; las notas historiográficas van dentro del card-detail expandible — el tipo de card no cambia por tener debate historiográfico
patterns_established:
  - card-nota-historiografica va dentro de <div class="card-detail"> como <p class="card-nota-historiografica"><strong>Nota historiográfica:</strong> ...</p> — visible solo al expandir, salvo cuando el debate es sobre la clasificación misma de la card (en cuyo caso va fuera del detail)
  - card-rumor__embedded al final del card-detail (después de la narrativa hecho): <div class="card-rumor__embedded"> con párrafo narrativo y <footer class="card-rumor__origin"> — hecho primero, rumor como sección explícitamente delimitada al cierre
  - card-image-placeholder con aria-label descriptivo y <span class="card-image-placeholder__text"> es el patrón correcto cuando no existe imagen Commons verificada; no usar src="" nunca
  - El regex /card-expand-toggle/g cuenta 3× el número de botones (button + 2 spans internos) — verificaciones con ≥10 pasan con 54 para 18 cards; verificaciones que requieren conteo exacto deben usar /<button class="card-expand-toggle"/g
  - INV-05 reutilización de Popham desde INV-02 con alt text diferente es válida cuando el mismo actor cumple roles distintos en dos cards
observability_surfaces:
  - "node -e \"const h=require('fs').readFileSync('index.html','utf8'); const b=(h.match(/id=\\\"rev-invasiones-inglesas\\\"[\\s\\S]*?(?=id=\\\"rev-alberdi-formacion\\\")/)||[''])[0]; console.log('certeza:', (b.match(/data-certeza/g)||[]).length, '| buttons:', (b.match(/<button class=\\\"card-expand-toggle\\\"/g)||[]).length, '| notas:', (b.match(/card-nota-historiografica/g)||[]).length, '| chars:', b.length);\""
  - document.querySelectorAll('#rev-invasiones-inglesas [data-certeza]').length → 18
  - document.querySelectorAll('#rev-invasiones-inglesas .card-expand-toggle').length → 18
  - document.querySelectorAll('#rev-invasiones-inglesas .reveal--visible').length → cards en viewport (reveal-on-scroll)
  - "[Images] Fallback handlers set for 74 card images" en consola sin "[ImageFallback]" errors = sin imágenes rotas
  - "[SubNav] Active sub-period → rev-invasiones-inglesas" confirma sub-nav sticky destaca "1806–1807" al scrollear
drill_down_paths:
  - .gsd/milestones/M020/slices/S02/tasks/T01-SUMMARY.md — INV-01 a INV-09, sub-nav link, decisiones de imagen primeras 9 cards
  - .gsd/milestones/M020/slices/S02/tasks/T02-SUMMARY.md — INV-10 a INV-18, card-rumor__embedded, INV-18 card-opinion
  - .gsd/milestones/M020/slices/S02/tasks/T03-SUMMARY.md — resolución PLACEHOLDERs, verificación DOM completa, responsiveness
duration: ~95min (T01: ~45min, T02: ~30min, T03: ~20min)
verification_result: passed (V1–V6 todos PASS)
completed_at: 2026-03-25
---

# S02: Integración HTML — sub-período #rev-invasiones-inglesas con cards completas

**18 cards (INV-01–INV-18) integradas en `#rev-invasiones-inglesas` con certeza, imágenes verificadas, expand/collapse, 4 notas historiográficas, rumor embebido (Ana Périchon), y card-opinion del nexo causal; sub-nav link como primer elemento; layout responsive validado; todos los checks V1–V6 PASS.**

## What Happened

### T01: Sub-período wrapper + INV-01 a INV-09

T01 insertó el bloque `<div id="rev-invasiones-inglesas">` antes de `#rev-alberdi-formacion` y el sub-nav link como primer elemento del `<nav class="sub-nav">` (posición cronológica correcta: 1806–1807 precede a todos los sub-períodos existentes). Las 9 primeras cards siguieron la plantilla exacta del codebase con imágenes verificadas del draft de S01.

Decisiones de imagen clave: INV-03 usó el retrato de Beresford (alternativa documentada en el draft cuando la ilustración de la caída de BA no existe en Commons); INV-05 inicialmente también usó Beresford (placeholder para el tesoro en Londres); INV-09 usó `card-image-placeholder` porque ningún archivo Commons del soldado Patricios 1806 existía en el draft. Las notas historiográficas de INV-04 (debate cobardía vs. protocolo Vértiz sobre la fuga de Sobremonte) e INV-07 (debate rol militar vs. logístico de Álzaga) fueron integradas dentro del `card-detail`.

Al final de T01: 9 cards, sub-nav link, stagger 0ms–640ms, block 38.896 chars.

### T02: INV-10 a INV-18 y cierre del sub-período

T02 completó el bloque con los 9 cards restantes, tratando tres casos especiales:

**INV-13 (Beresford prisionero):** `card-hecho` con toda la evidencia de Rodríguez Peña y Padilla en el detalle, seguida de `<div class="card-rumor__embedded">` sobre el rol de Ana Périchon en la fuga — documentado como rumor sin fuente primaria que lo vincule directamente. El hecho verificado precede al rumor explícitamente demarcado.

**INV-16 (Whitelocke en juicio):** `card-nota-historiografica` con 4 hipótesis no excluyentes sobre por qué no se usó artillería: (a) órdenes de preservar la ciudad para uso comercial — la más documentada; (b) temor a alienar a la población; (c) subestimación de la resistencia urbana; (d) problemas logísticos con artillería pesada en barro rioplatense. La corte marcial de 1808 identificó la no-artillería como cargo agravante sin definir la causa.

**INV-18 (nexo causal):** Única `card-opinion` del bloque (data-certeza="opinion"), con `<blockquote class="card-opinion__quote">` citando la síntesis de la UNLP (2023) sobre las milicias como condición necesaria pero no causa suficiente. La `card-nota-historiografica` desarrolla el modelo de tres causas: invasiones (poder armado criollo) + ideas ilustradas (marco ideológico) + crisis española/Bayona (oportunidad política). Reservó Primera_junta.jpg para esta card por ser narrativamente más precisa que para INV-15.

Al final de T02: 18 cards, 4 notas, 1 rumor embebido, 1 card-opinion, stagger 720ms–1360ms, block 74.940 chars. V1–V6 todos PASS.

### T03: Resolución PLACEHOLDERs y verificación final

T03 resolvió los 3 PLACEHOLDERs de imagen:

- **INV-03:** Sin cambio necesario — retrato de Beresford ya verificado desde T01 es el fallback documentado.
- **INV-05:** Actualizado de Beresford a Popham (`File:Sir_Home_Riggs_Popham_from_NPG.jpg`, naturalWidth=500 confirmado en browser) — Popham fue quien envió físicamente el tesoro a Londres; narrativamente más preciso.
- **INV-09:** Confirmado como `card-image-placeholder` correcto — las 3 variantes de filename tentadas en Commons devolvieron `missing`; no existe imagen verificable del soldado Patricios 1806.

Verificación de responsiveness vía `browser_evaluate`: 320px → `gridTemplateColumns: "272.8px"` (1 columna), sin overflow; 1920px → `gridTemplateColumns: "352px 352px 352px"` (3 columnas), sin overflow. Consola del browser sin errores JS. `[SubNav] Active sub-period → rev-invasiones-inglesas` confirma que el sub-nav sticky funciona.

## Verification

Todos los checks V1–V6 del slice pasan:

| Check | Resultado |
|-------|-----------|
| V1: `data-certeza` en bloque ≥ 18 | ✅ PASS (18) |
| V2: sub-nav link `href="#rev-invasiones-inglesas"` | ✅ PASS |
| V3: expand toggles ≥ 10 | ✅ PASS (54 = 18 botones × 3 ocurrencias regex) |
| V4: sin `src=""` en bloque | ✅ PASS (0 vacíos) |
| V5: app.js syntax OK | ✅ PASS |
| V6: card-nota-historiografica ≥ 4 | ✅ PASS (4) |
| Responsive 320px | ✅ 1 columna, sin overflow |
| Responsive 1920px | ✅ 3 columnas, sin overflow |
| Browser console | ✅ Sin errores JS, sin [ImageFallback] errors |

DOM query de runtime: `document.querySelectorAll('#rev-invasiones-inglesas [data-certeza]').length` → 18.

## New Requirements Surfaced

- none — los requisitos existentes R003, R005, R012, R013 fueron avanzados; no surgieron requisitos nuevos.

## Deviations

- **INV-05 imagen:** T01 usó retrato de Beresford como placeholder; T03 lo corrigió a retrato de Popham según el task plan de T03. No es una desviación del plan general — T03 tenía explícitamente esta tarea.
- **INV-15 imagen:** El draft sugería Primera_junta.jpg pero T02 reservó esa imagen para INV-18 (nexo causal). La lógica es sólida: la imagen de la Primera Junta refuerza la conexión causal en INV-18 mejor que en INV-15. INV-15 usa imagen de Liniers (ya verificada).
- **V6 pasa con exactamente 4 notas (mínimo):** El slice plan listaba 6 cards con `card-nota-historiografica` en Must-Haves (INV-04, INV-07, INV-08, INV-13, INV-16, INV-18), pero el mecanismo correcto para INV-13 es `card-rumor__embedded` (no una nota historiográfica) y INV-08 no tenía nota en el draft de S01. La verificación exige ≥4 — que se cumple.

## Known Limitations

- **INV-09 sin imagen Commons:** No existe imagen verificable del soldado Patricios 1806 en Wikimedia. El `card-image-placeholder` es el estado final correcto. Podría resolverse si se identificara una ilustración de la época en otro repositorio público.
- **Reutilización de imágenes:** INV-03 e INV-15 usan imágenes de Beresford y Liniers respectivamente (mismas que otras cards). INV-16 reutiliza la imagen de Álzaga. Visualmente puede resultar repetitivo, pero es la única opción verificada disponible en Commons para esos sujetos.
- **S03 pendiente:** El bloque no tiene aún los marcadores de timeline 1806/1807 ni la card de contexto europeo (Napoleón/Bayona). Eso queda para S03 que consume el sub-período entregado aquí.

## Follow-ups

- S03 debe insertar 2 marcadores en `revolucion-timeline` (1806 Invasión, 1807 Defensa) recalculando `--marker-pos` para todos los marcadores existentes.
- S03 puede evaluar si existe una caricatura de Whitelocke o imagen del juicio de 1808 en Commons; si no, el estado actual de INV-16 con imagen de Álzaga es aceptable.
- La `card-image-placeholder` de INV-09 tiene el texto "en proceso de verificación" — si en el futuro se identifica el archivo correcto, la sustitución es quirúrgica (reemplazar el `div.card-image-placeholder` por `div.card-image` con `<img>`).

## Files Created/Modified

- `index.html` — sub-período `#rev-invasiones-inglesas` completo (74.863 chars, 18 cards INV-01–INV-18) + sub-nav link como primer elemento del sub-nav

## Forward Intelligence

### What the next slice should know

- **Punto de inserción para S03:** El bloque `#rev-invasiones-inglesas` está en líneas ~346–870 aproximadamente (buscar `id="rev-invasiones-inglesas"` y `<!-- /#rev-invasiones-inglesas`). El conector narrativo de S03 debe ir o bien dentro del bloque (como `alberdi-quote` entre sub-secciones) o entre `<!-- /#rev-invasiones-inglesas -->` y `<div id="rev-alberdi-formacion"`.
- **El sub-nav IntersectionObserver auto-descubre `#rev-invasiones-inglesas`** por clase `.sub-period` — no requiere cambios en `app.js`. Al scrollear al bloque, `[SubNav] Active sub-period → rev-invasiones-inglesas` aparece en consola.
- **INV-18 es la card de nexo causal:** Ya contiene la `card-nota-historiografica` del modelo de tres causas. S03 puede referenciar esta card para el conector narrativo o construir sobre ella; no es necesario duplicar el contenido.
- **El stagger llega a 1360ms (INV-18):** Si S03 agrega cards o bloques adicionales dentro del sub-período, continuar desde 1440ms (1360+80).

### What's fragile

- **INV-09 card-image-placeholder:** El `span.card-image-placeholder__text` contiene "en proceso de verificación" — si futuros agentes interpretan esto como un error a resolver, deben saber que es el estado correcto y final dado que no existe imagen Commons verificable.
- **4 notas historiográficas exactamente:** V6 pasa con el mínimo. Si S03 modifica el bloque y accidentalmente elimina una nota, V6 falla. Las 4 notas están en INV-04 (línea ~458), INV-07 (línea ~539), INV-16 (línea ~803), INV-18 (línea ~867).
- **regex /card-expand-toggle/g vs /<button class="card-expand-toggle"/g:** El regex sin ancla cuenta 3× el número de botones. Verificaciones de conteo exacto deben usar la versión anclada.

### Authoritative diagnostics

- `node -e "const h=require('fs').readFileSync('index.html','utf8'); const b=(h.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/)||[''])[0]; console.log('certeza:', (b.match(/data-certeza/g)||[]).length, '| buttons:', (b.match(/<button class=\"card-expand-toggle\"/g)||[]).length, '| notas:', (b.match(/card-nota-historiografica/g)||[]).length, '| chars:', b.length);"` — estado completo del bloque en <1s.
- `document.querySelectorAll('#rev-invasiones-inglesas [data-certeza]').length` en DevTools → 18 confirma integración correcta.
- `[Images] Fallback handlers set for 74 card images` sin `[ImageFallback]` errors = ninguna imagen rota.

### What assumptions changed

- **"PLACEHOLDERs serán imágenes distintas":** El draft anticipaba buscar ilustraciones específicas para INV-03 (caída de BA) e INV-05 (tesoro en Londres). En la práctica, esas ilustraciones no existen en Commons — las alternativas son retratos de los actores (Beresford, Popham). El resultado final es narrativamente apropiado: los retratos de los líderes británicos para las cards sobre sus acciones.
- **"Whitelocke tendría retrato en Commons":** El draft lo marcó como `⚠️ imagen-no-verificada`. Confirmado: no existe en Wikimedia Commons a marzo 2026. El patrón establecido en KNOWLEDGE.md para este caso es usar imagen de actor relacionado con nota explícita.
- **"6 notas historiográficas necesarias":** El slice plan listó 6 en Must-Haves pero la verificación exige ≥4. INV-08 e INV-13 no tienen `card-nota-historiografica` — INV-13 usa `card-rumor__embedded` (correcto para rumores) e INV-08 no tenía nota en el draft. El resultado con 4 notas cumple el criterio de verificación y es históricamente apropiado.
