---
id: S02
parent: M014
milestone: M014
provides:
  - Sección #rev-tertulias-mariquita con 6 cards (TER-1 a TER-6) en index.html
  - Sub-nav link "1810–1868 Tertulias de Mariquita" operativo (8 sub-períodos total)
  - TER-2 card-rumor con nota historiográfica visible (Himno Nacional tratamiento historiográfico)
  - TER-4 card-hecho con card-nota-certeza inline
  - data-certeza count: 99 (baseline 93 + 6 nuevas cards)
requires:
  - slice: S01
    provides: S01-CONTENT-DRAFT.md con 6 cards verificadas, certeza clasificada, fuentes, URLs de imagen
affects: []
key_files:
  - index.html
key_decisions:
  - Node.js replace pattern para inserción de bloques HTML largos (evita bash heredoc en Windows/Git Bash)
  - TER-3 imagen directa sin /thumb/ — imagen 321×410px no genera miniatura 500px en Wikimedia
  - HTML comments dentro del bloque insertan extras en grep count (4 vs 2 para rev-tertulias-mariquita) — funcionally correct
patterns_established:
  - Inserción Node.js: fs.readFileSync → string.replace(marker, marker + block) → fs.writeFileSync
  - Sub-nav link añadido con Edit tool (marcador de línea estable) en lugar de Node.js replace
observability_surfaces:
  - Browser console: "[DEBUG] [SubNav] Initialized with 8 sub-periods, 8 links." confirma link registrado
  - Browser console: "[DEBUG] [Reveal] Revealed: div#rev-tertulias-mariquita.sub-period.reveal--visible" confirma stagger
  - Browser console: "[DEBUG] [SubNav] Active sub-period → rev-tertulias-mariquita" confirma observer
  - JS: document.getElementById('rev-tertulias-mariquita').querySelectorAll('[data-certeza]').length → 6
  - grep -c 'data-certeza=' index.html → 99
drill_down_paths:
  - .gsd/milestones/M014/slices/S02/tasks/T01-SUMMARY.md
duration: 20m
verification_result: passed
completed_at: 2026-03-24
---

# S02: Integración HTML y verificación

**Sección #rev-tertulias-mariquita insertada en index.html con 6 cards verificadas, sub-nav link operativo, nota historiográfica de TER-2 visible, y reveal/stagger confirmados en browser vía IntersectionObserver.**

## What Happened

S01 entregó `S01-CONTENT-DRAFT.md` con 6 cards completamente redactadas: título, fecha, certeza (hecho/rumor/opinión), excerpt, fuentes, HTML de `<cite>`, URLs de imagen, y la nota historiográfica para TER-2. S02 tenía un único task: integrar ese contenido en `index.html`.

T01 (único task de este slice) leyó el draft completo, construyó el bloque HTML de 6 cards usando los templates card-hecho/card-rumor/card-opinion establecidos, y lo insertó en `index.html` usando Node.js (patrón `fs.readFileSync → string.replace → fs.writeFileSync`). Esta decisión evitó los fallos de bash heredoc en Windows/Git Bash documentados en KNOWLEDGE.md. El bloque fue insertado inmediatamente después del marcador `</div><!-- /#rev-1820-1835 -->`, posicionando la nueva sección entre `#rev-1820-1835` y `#periodo-rosas`, exactamente como especificaba el plan.

El sub-nav link fue añadido con el Edit tool: `<a href="#rev-tertulias-mariquita" class="sub-nav__link">1810–1868<span class="sub-nav__link-label">Tertulias de Mariquita</span></a>`. El IntersectionObserver del sub-nav lo registró automáticamente — el log de inicialización pasó de "7 sub-periods, 7 links" a "8 sub-periods, 8 links".

TER-3 requirió decisión de imagen: el archivo Wikimedia `María Sánchez de Mendeville.jpg` mide 321×410px, por debajo del umbral para generar thumb de 500px. Se usó URL directa con `width="100%"` siguiendo el patrón KNOWLEDGE.md para imágenes pequeñas.

Verificación estructural: todos los greps pasaron. Verificación de browser: sección existe, 6 cards con certeza correcta, nota historiográfica y nota-certeza visibles como texto en DOM, sub-nav activo. Consola: 0 errores JS (el único ERROR es favicon.ico 404 preexistente, no relacionado con M014).

## Verification

Verificación estructural (grep):
- `grep -c "rev-tertulias-mariquita" index.html` → **4** (≥2 requerido: sub-nav link en l.331 + div id en l.1447 + 2 HTML comments — todos correctos)
- `grep -c 'data-certeza=' index.html` → **99** (baseline 93 + 6 nuevas)
- `grep -c "card-nota-historiografica" index.html` → **13** (baseline 12 + 1 nueva TER-2)
- `grep -c "card-nota-certeza" index.html` → **25** (baseline 23 + 2: 1 span real en TER-4 + 1 en HTML comment del template)
- `tail -5 index.html` → contiene `</html>` ✅

Verificación DOM en browser (JavaScript evaluation):
- `sectionExists`: true
- `cardCount`: 6
- `certezas`: ["hecho","rumor","hecho","hecho","opinion","opinion"]
- `notaHistoriograficaExists`: true — texto comienza "Nota historiográfica: Mariquita Sánchez nunca dejó escrito n…"
- `notaCertezaExists`: true — texto comienza "[Nota: la cita \"la madame Sévigné del Río de la Plata\" se at…"
- `subNavLinkCount`: 8 (era 7 antes de S02)

Señales de consola confirmadas:
- `[SubNav] Initialized with 8 sub-periods, 8 links.` ✅
- `[Reveal] Revealed: div#rev-tertulias-mariquita.sub-period.reveal--visible` ✅
- `[SubNav] Active sub-period → rev-tertulias-mariquita` ✅
- 6 eventos de reveal para las cards de las tertulias ✅

Verificación de sección con awk (límites exactos de la sección):
- `awk '/id="rev-tertulias-mariquita"/{found=1} found && /data-certeza=/{count++} found && /\/#rev-tertulias-mariquita/{print count; exit}' index.html` → **6** ✅

## New Requirements Surfaced

- none

## Deviations

1. **`rev-tertulias-mariquita` grep count = 4, no 2**: El plan esperaba 2 (sub-nav link + div id). El HTML del bloque incluye un comment de apertura (`<!-- id="rev-tertulias-mariquita" -->`) y uno de cierre (`<!-- /#rev-tertulias-mariquita -->`). Los 2 elementos funcionales están presentes y correctos. Desviación cosmética.

2. **`card-nota-certeza` grep count = 25, no 24**: El HTML comment `<!-- TER-4: ... (con card-nota-certeza inline) -->` agrega 1 match extra. El `<span class="card-nota-certeza">` real está presente exactamente una vez en TER-4. El Must-Have está cumplido.

## Known Limitations

- La imagen de TER-3 (Mariquita Sánchez, 321×410px) es de baja resolución para pantallas retina. Reemplazable en un futuro slice de imágenes si se encuentra un retrato de mayor resolución.
- El sub-nav link muestra "1810–1868Tertulias de Mariquita" (el label del sub-nav concatena el año y el texto del span sin espacio visible entre ellos en el DOM — es un artefacto del markup, se ve correctamente en pantalla gracias al CSS block del span).

## Follow-ups

- none — el milestone M014 está completo con S01 + S02.

## Files Created/Modified

- `index.html` — Añadida sección `#rev-tertulias-mariquita` (~130 líneas, TER-1 a TER-6) después de la línea 1439; sub-nav link añadido en línea 331.

## Forward Intelligence

### What the next slice should know
- Las tertulias están entre `#rev-1820-1835` y `#periodo-rosas`. Cualquier contenido nuevo que se inserte entre esos dos puntos debe ser consciente de que esa zona ya está ocupada por la sección de Mariquita.
- El sub-nav del `#periodo-revolucion` ahora tiene 8 links. Si se agregan más sub-períodos, el observer del sub-nav los detecta automáticamente (no requiere cambios en app.js) — pero el layout del sub-nav puede necesitar ajuste CSS si los 8+ links no caben en una línea.
- El total de `data-certeza=` en index.html es 99. Los baselines de verifications futuras deben usar 99 como punto de partida, no 93.

### What's fragile
- La imagen de TER-3 usa URL directa (sin /thumb/) — si Wikimedia renombra o mueve el archivo, la imagen rompe silenciosamente. Hay un fallback handler en app.js que mostrará el placeholder de imagen rota automáticamente.
- Los HTML comments del bloque (`<!-- id="..." -->`, `<!-- /# -->`) son parte del template heredado de otras secciones. Si un futuro grep verifica "exactamente 2" menciones de un id, fallará. El patrón correcto es verificar con awk/límite de sección, no grep -c.

### Authoritative diagnostics
- `awk` con límites de sección es el método correcto para contar cards dentro de una sección específica — grep -A N puede salir de los límites.
- `[SubNav] Initialized with N sub-periods, N links.` en consola es el indicador más confiable de que el sub-nav detectó la nueva sección.
- `grep -n "rev-tertulias-mariquita" index.html` muestra las 4 líneas: l.331 (sub-nav), l.1445 (comment), l.1447 (div id), l.1558 (closing comment).

### What assumptions changed
- El plan esperaba grep count = 2 para el id de la sección. El patrón real de HTML comments del codebase produce 4. Este desvío es consistente con otras secciones del codebase que también tienen comments de apertura y cierre.
