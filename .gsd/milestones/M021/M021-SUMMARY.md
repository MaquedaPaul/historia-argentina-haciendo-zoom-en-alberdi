---
id: M021
provides:
  - Sub-período #rev-san-martin dentro de #periodo-revolucion con 15 event cards cubriendo el arco completo San Martín (formación en España → identidad criolla → logias → Granaderos → San Lorenzo → Cuyo → Cruce de los Andes → Chacabuco → Cancha Rayada/Maipú → Perú → Guayaquil → retiro → exilio → legado)
  - Sub-nav link "1812–1822 / San Martín Libertador" (#rev-san-martin, 8vo link en #periodo-revolucion)
  - 4 nuevos marcadores en revolucion-timeline: 1812 (below, 20.00%), 1813 (above, 21.67%), 1817 (above, 28.33%), 1818 (below, 30.00%) — total 14 marcadores en el timeline
  - CSS stagger extension a nth-child(15) en styles.css para los nuevos marcadores
  - Notas historiográficas tres-posiciones con atribución explícita en logias (Entradas 3, 4) y Guayaquil (Entrada 12)
  - Legado tratado como card-opinion pura (Entrada 15, data-certeza="opinión")
key_decisions:
  - "#rev-san-martin insertado entre #rev-1800-1820 y el CONECTOR ALBERDI SP1→SP2 — coherencia narrativa: San Martín activo 1812–1822 encaja después del sub-período 1800–1820"
  - "Granularidad de batallas: San Lorenzo (card propia), Cuyo/preparación (card propia), Cruce (card propia), Chacabuco (card propia), Cancha Rayada+Maipú (par indisoluble), Perú (card propia), Guayaquil (card debate propia), retiro/exilio/legado (3 cards) — total 15 cards"
  - "Guayaquil como debate historiográfico sin veredicto: tres posiciones nombradas (Mitre/retiro voluntario, Guido-tradición/emboscada política, Lynch/acuerdo tácito) — D069"
  - "Logias masónicas y Gran Bretaña: card-opinion con tres hipótesis numeradas y atribución por hipótesis — D070"
  - "data-certeza='debatido' (sin acento) para cards historiográficamente contestadas — distinción respecto de 'opinión' con acento"
  - "Stagger delays S04 Entradas 11–15 reset a 0ms (nuevo cluster temático, no continuación de S03 delays de 720ms)"
  - "nth-child(15) en styles.css extiende tabla de stagger para cubrir los 4 marcadores nuevos que desplazaron marcadores existentes a posiciones 12–15"
patterns_established:
  - "Wikimedia Commons API (commons.wikimedia.org/w/api.php) como fuente primaria para imágenes de historia latinoamericana — Wikipedia EN retorna 'missing' para ~57% de los archivos de historia hispanoamericana"
  - "Imágenes <500px usan URL directa sin /thumb/ — campos thumburl no existen o apuntan a rutas inválidas para imágenes bajo el umbral"
  - "card-nota-historiografica siempre fuera de card-detail y antes del footer cite — nota epistémica debe ser visible sin interacción del usuario"
  - "Node.js boundary-scoped count (indexOf start→end) es el método autoritativo para contar cards en un sub-período — grep -A N sobreestima cuando la sección excede N líneas"
  - "Write tool para bloques HTML multi-card evita unreliability de bash heredocs en Windows/Git Bash"
  - "/gsd doctor stubs (result: unknown, doctor_generated: true) indican trabajo NO ejecutado — verificar DOM state antes de escribir slice summary"
  - "nth-child stagger tables en styles.css deben extenderse cuando se agregan marcadores nuevos — fallo silencioso (opacity:0 permanente) sin error JS"
observability_surfaces:
  - "document.querySelectorAll('#rev-san-martin [data-certeza]').length === 15 — conteo autoritativo de cards"
  - "document.querySelectorAll('.revolucion-timeline__marker').length === 14 — integridad del timeline"
  - "grep -c 'href=\"#rev-san-martin\"' index.html === 1 — presencia del sub-nav link"
  - "grep -c 'data-certeza' index.html === 108 — conteo global de certeza"
  - "node -e boundary count (indexOf rev-san-martin → /div<!-- /#rev-san-martin -->) — método preferido sobre grep -A N"
  - "[SubNav] Initialized with 8 sub-periods, 8 links. — log de consola confirma sub-nav link detectado"
requirement_outcomes:
  - id: R012
    from_status: validated
    to_status: validated
    proof: "15 entradas verificadas contra ≥2 fuentes en S01-CONTENT-DRAFT.md. Certeza asignada a todas las cards. Imágenes Wikimedia verificadas via Commons API. Notas historiográficas con atribución explícita en Entradas 3, 4, 12. Sin PENDIENTEs en el draft."
  - id: R013
    from_status: validated
    to_status: validated
    proof: "15 cards en #rev-san-martin con data-certeza: 11 hecho, 3 debatido, 1 opinión. events-grid--certeza presente. Sistema visual diferenciado operativo."
duration: ~105min (S01: ~45min, S02: ~15min, S03: ~15min closer, S04: ~10min, S05: ~20min)
verification_result: passed
completed_at: 2026-03-25
---

# M021: San Martín — Formación, Campañas y Retiro del Poder

**Sub-período `#rev-san-martin` con 15 cards historiográficamente verificadas que cubren el arco completo San Martín — integrado en `#periodo-revolucion` con sub-nav link, 4 nuevos marcadores de timeline (1812/1813/1817/1818), y tratamiento sin veredicto de Guayaquil y las logias masónicas.**

## What Happened

M021 se ejecutó en 5 slices. S01 entregó el contrato de entrada: `S01-CONTENT-DRAFT.md` con 15 entradas estructuradas, URLs Wikimedia verificadas via Commons API, certeza asignada, y notas historiográficas tres-posiciones en las Entradas 3, 4 y 12. El research requirió corregir 4 de 7 nombres de archivo Wikimedia (inválidos en Wikipedia EN; existentes en Commons), y estableció el patrón de usar URL directa para imágenes <500px que no tienen thumburl válido.

S02 integró las Entradas 1–6 (formación en España, identidad criolla, logias, Granaderos, San Lorenzo) en un nuevo `<div id="rev-san-martin">` usando el patrón de sub-período existente. Las dos cards `debatido` (logias masónicas, identidad criolla) llevan `card-nota-historiografica` visible fuera del `card-detail` colapsable. La inserción se ancló en `</div><!-- /#rev-1800-1820 -->` — no en número de línea.

S03 tuvo una anomalía: T01 fue marcado como done por el executor pero el trabajo nunca se ejecutó (stub de `/gsd doctor` con `result: unknown`). El closer detectó el DOM state incorrecto (6 cards, no 10) y ejecutó T01 durante el cierre del slice, inyectando las 4 cards de batallas (Cuyo/preparación, Cruce de los Andes, Chacabuco, Cancha Rayada+Maipú). Esto estableció el patrón de verificación: siempre confirmar DOM state antes de escribir el slice summary.

S04 completó el arco con 5 cards (Campaña al Perú, Guayaquil, Retiro, Exilio, Legado). La card de Guayaquil es la más compleja del milestone: `card-opinion` + `data-certeza="debatido"` + `card-nota-historiografica` con tres posiciones nombradas y atribución explícita (Mitre, Guido/tradición, Lynch). Sin veredicto — satisface D069. Los stagger delays se resetearon a 0ms en Entrada 11, tratando el cluster Perú/retiro como un nuevo grupo temático en lugar de continuar los 720ms acumulados de S03.

S05 completó la integración de navegación: sub-nav link "1812–1822 / San Martín Libertador" (8vo link, auto-detectado por `initSubNav()`), 4 nuevos marcadores en `revolucion-timeline` con alternancia above/below para el cluster 1812–1818 (densidad máxima: 4 marcadores en 6 años), y extensión de la tabla de stagger CSS a `nth-child(15)`. Esta última era crítica: los 4 marcadores nuevos insertados en posiciones DOM 3, 4, 6, 7 desplazaron los marcadores existentes a posiciones 12–15, que habrían permanecido en `opacity:0` permanente sin la extensión CSS.

## Cross-Slice Verification

### Success Criterion 1: Sub-período `#rev-san-martin` visible en `#periodo-revolucion` con ≥14 cards
**PASSED** — `document.querySelectorAll('#rev-san-martin [data-certeza]').length` = **15** (≥14 requerido). Verificado con Node.js boundary-scoped count (indexOf start→end de la sección).

### Success Criterion 2: Arco narrativo completo: infancia → oficial español → logias → Granaderos → batallas → retiro
**PASSED** — Las 15 cards cubren: infancia en Yapeyú (E1), oficial español (E2), logias y regreso (E3), identidad criolla (E4), Granaderos (E5), San Lorenzo (E6), Cuyo/preparación (E7), Cruce de los Andes (E8), Chacabuco (E9), Cancha Rayada+Maipú (E10), Perú (E11), Guayaquil (E12), retiro del poder (E13), exilio europeo (E14), legado (E15).

### Success Criterion 3: Batallas individuales con fecha exacta, contexto estratégico y significado
**PASSED** — San Lorenzo (3 feb. 1813), Chacabuco (12 feb. 1817), Cancha Rayada (19 mar. 1818), Maipú (5 abr. 1818), y el Cruce de los Andes (enero 1817) tienen fechas exactas, contexto estratégico (Plan Maitland, 6 columnas, etc.) y significado en el card-detail expandible. Verificado en S01-CONTENT-DRAFT.md y confirmado en índex.html.

### Success Criterion 4: Guayaquil como debate historiográfico (card-opinion con nota historiográfica, múltiples hipótesis, sin veredicto)
**PASSED** — Entrada 12 usa `card-opinion` + `data-certeza="debatido"` + `card-nota-historiografica` con tres posiciones nombradas (Mitre: retiro voluntario; edecán Guido/tradición: emboscada política; Lynch/síntesis: acuerdo tácito de zonas de influencia). Sin veredicto explícito. `grep -c 'card-nota-historiografica' index.html` = 4 (2 en S02, 2 en S04).

### Success Criterion 5: Logias masónicas y Gran Bretaña como card-opinion con atribución historiográfica explícita
**PASSED** — Entradas 3 y 4 usan `data-certeza="debatido"` + `card-nota-historiografica` con hipótesis numeradas y atribución por posición. Verificado en DOM: `document.querySelectorAll('#rev-san-martin .card-nota-historiografica').length` = 4 (incluyendo E12 y E15).

### Success Criterion 6: Sub-nav tiene link a `#rev-san-martin`
**PASSED** — `grep -c 'href="#rev-san-martin"' index.html` = **1**. Link: `<a href="#rev-san-martin" class="sub-nav__link">1812–1822<span class="sub-nav__link-label">San Martín Libertador</span></a>`. Auto-detectado por `initSubNav()` como 8vo link.

### Success Criterion 7: `revolucion-timeline` con marcadores 1812 y 1817 como mínimo
**PASSED** — 4 marcadores San Martín añadidos: 1812 (`--marker-pos: 20.00%`, below), 1813 (`--marker-pos: 21.67%`, above), 1817 (`--marker-pos: 28.33%`, above), 1818 (`--marker-pos: 30.00%`, below). Total marcadores en timeline: **14**. Verificado: `grep -c 'revolucion-timeline__marker' index.html` = 14.

### Success Criterion 8: Sin errores JS en consola
**PASSED** — `new Function(require('fs').readFileSync('app.js','utf8'))` = `syntax OK`. No se añadió JS nuevo; todo el comportamiento (expand/collapse, reveal-on-scroll, lightbox, sub-nav IntersectionObserver) auto-descubre los nuevos elementos via event delegation y DOM scanning en init.

### Success Criterion 9: Correcto en 320px y 1920px+
**PASSED** (verificado en S05) — Sub-nav en 320px: `overflow-x: auto`, scrollea horizontalmente sin overflow. En 1920px: todos los 8 links visibles. Cards en `events-grid--certeza` con `minmax(min(100%, 22rem), 1fr)` adaptan el grid automáticamente.

### Definition of Done Verification

| Criterion | Status |
|-----------|--------|
| ≥14 cards en `#rev-san-martin` con data-certeza, imágenes y cites | ✅ 15 cards, 15 card-images, 15 cite elements |
| Arco completo cubierto: formación → logias → Granaderos → batallas → retiro | ✅ E1–E15 cubren el arco completo |
| Sub-nav link a `#rev-san-martin` presente | ✅ 8vo link, label "1812–1822 / San Martín Libertador" |
| `revolucion-timeline` con marcadores 1812 y 1817 | ✅ 4 marcadores: 1812/1813/1817/1818 |
| Sin errores JS en consola | ✅ syntax OK, 0 errores (14 debug logs) |
| Correcto en 320px y 1920px+ | ✅ verificado en S05 UAT |
| `document.querySelectorAll('#rev-san-martin .event-card').length >= 14` | ✅ 15 |
| Todos los slices [x] con summaries | ✅ S01–S05 completados con summaries |

## Requirement Changes

- R012 (verificación de rigurosidad histórica): validated → validated — S01-CONTENT-DRAFT.md entregó 15 entradas con ≥2 fuentes verificadas por hecho, certeza asignada, imágenes Wikimedia verificadas via Commons API, y notas historiográficas con atribución explícita. Sin PENDIENTEs en el draft al cierre de S01.
- R013 (sistema de certeza): validated → validated — 15 cards con data-certeza en #rev-san-martin (11 hecho, 3 debatido, 1 opinión); `events-grid--certeza` presente; sistema visual diferenciado operativo. Distribución consistente con el resto del sitio.

## Forward Intelligence

### What the next milestone should know

- **`revolucion-timeline` está en densidad máxima en la zona 1810–1820** — hay 4 marcadores en 6 años (~10% del track). Añadir más marcadores en esa zona requeriría ocultar sublabels en mobile o usar `display:none` en algunos labels. El próximo milestone que agregue timeline markers debe auditar el cluster existente antes de insertar.
- **La tabla nth-child de stagger en `styles.css` llega a nth-child(15)** — cualquier milestone que agregue marcadores al `revolucion-timeline` debe extender la tabla. El fallo es silencioso (opacity:0 permanente sin error JS). Verificar el máximo actual con `grep -c 'nth-child(' styles.css` antes de insertar nuevos marcadores.
- **El sub-nav de `#periodo-revolucion` tiene 8 links** — el 9no link futuro puede causar overflow en 320px si todos los labels son largos. El label "1812–1822" (7 chars + sublabel) es el más corto — futuros labels deben mantenerse ≤12 chars para el span principal.
- **`data-certeza="debatido"` (sin acento) es el valor establecido para cards historiográficamente contestadas** — distinto de `"opinión"` con acento HTML entity. Queries de verificación que busquen cards de debate deben usar `[data-certeza="debatido"]`, no `[data-certeza="debatido"]` con acento.
- **Patrón de verificación de DOM state antes de escribir slice summary es obligatorio** — S03 estableció que un `status: done` en frontmatter no garantiza ejecución. Siempre confirmar conteos DOM antes de cerrar un slice. Si el summary body es un stub de `/gsd doctor` (`result: unknown`), asumir que el trabajo NO se realizó.
- **`#rev-san-martin` está posicionado entre `#rev-1800-1820` y el CONECTOR ALBERDI SP1→SP2** en el DOM — el IntersectionObserver de sub-nav lo detecta en ese orden. La posición es coherente narrativamente (San Martín activo 1812–1822).

### What's fragile

- **Imagen `Uniformes_Granaderos_a_caballo_1816.png` (Entrada 5)** — URL directa sin `/thumb/` (495px). Si una herramienta de optimización de imágenes intenta agregar rutas `/thumb/`, esta imagen fallará con 404. La URL directa es la única forma correcta.
- **Imagen `Encuentro_de_Guayaquil.jpg` (Entrada 12)** — misma situación: 484px, URL directa. `grep -n 'Encuentro_de_Guayaquil' index.html` para verificar que la URL es directa.
- **`card-nota-historiografica` en E15 (Legado)** — nombra historiadores (Mitre, Rojas, Lynch, Galasso) sin blockquote directo. Si una auditoría de contenido requiere que todas las `card-opinion` tengan `<blockquote>`, esta card necesitará actualización.
- **CSS nth-child stagger tabla manual** — no se auto-extiende. El fallo (opacity:0 permanente en marcadores) no tiene señal de error JS. Chequear siempre antes de agregar marcadores al timeline.

### Authoritative diagnostics

- `document.querySelectorAll('#rev-san-martin [data-certeza]').length` — debe ser 15; cualquier valor menor indica inject error o remoción accidental
- `document.querySelectorAll('.revolucion-timeline__marker').length` — debe ser 14; 10 indica que los 4 nuevos no se inyectaron
- `grep -c 'data-certeza' index.html` — debe ser 108; línea de base post-M021
- `[SubNav] Initialized with 8 sub-periods, 8 links.` en consola — si muestra 7, el link `#rev-san-martin` no está en el DOM o no tiene la clase `sub-nav__link`
- `node -e "const h=require('fs').readFileSync('index.html','utf8'); const s=h.indexOf('id=\"rev-san-martin\"'); const e=h.indexOf('</div><!-- /#rev-san-martin -->'); const sec=h.slice(s,e+30); console.log((sec.match(/data-certeza/g)||[]).length);"` — método boundary-scoped autoritativo

### What assumptions changed

- **Suposición de S01:** Las 7 imágenes candidatas del research serían encontrables con sus nombres en Wikimedia. **Realidad:** 4 de 7 nombres eran incorrectos — la API de Wikipedia EN retornó `"missing"`. Commons API fue necesaria como fuente primaria.
- **Suposición de S03:** El executor de T01 ejecutó el trabajo. **Realidad:** T01 nunca se ejecutó — el summary era un stub de `/gsd doctor`. La detección temprana (verificar DOM antes de escribir slice summary) evitó que el error llegara a S04.
- **Suposición de S05:** Insertar marcadores en posiciones intermedias no desplaza los nth-child de marcadores existentes significativamente. **Realidad:** Los 4 marcadores nuevos en posiciones DOM 3, 4, 6, 7 desplazaron los marcadores existentes (antes posiciones 3–11) a posiciones 5, 8–15. Sin extensión a nth-child(15), 4 marcadores habrían quedado permanentemente invisibles.

## Files Created/Modified

- `index.html` — `<div id="rev-san-martin">` con 15 cards insertado entre `#rev-1800-1820` y CONECTOR ALBERDI SP1→SP2; 1 sub-nav link `#rev-san-martin`; 4 marcadores de timeline (1812/1813/1817/1818)
- `styles.css` — 8 reglas CSS de stagger añadidas (4 dot + 4 label para nth-child 12–15)
- `.gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md` — draft canónico con 15 entradas, URLs Wikimedia verificadas, certeza, notas historiográficas
- `.gsd/milestones/M021/M021-SUMMARY.md` — este archivo
