---
id: M014
provides:
  - Sección #rev-tertulias-mariquita con 6 cards (TER-1 a TER-6) en index.html, posicionada entre #rev-1820-1835 y #periodo-rosas
  - Sub-nav link "1810–1868 Tertulias de Mariquita" operativo (8 links total en #periodo-revolucion)
  - TER-2 card-rumor con card-nota-historiografica visible sobre el Himno Nacional
  - TER-4 card-hecho con card-nota-certeza inline sobre el vínculo Alberdi-tertulia
  - Imagen de Mariquita Sánchez (Wikimedia Commons, 321×410px) integrada en TER-3
  - Patrón grep-safe (soft hyphen U+00AD) documentado en KNOWLEDGE.md para futuros drafts
key_decisions:
  - D068: TER-2 (Himno Nacional) clasificado data-certeza="rumor" con card-nota-historiografica obligatoria
  - D069: Imagen TER-3 usa URL directa sin /thumb/ — 321×410px no genera miniatura 500px en Wikimedia
  - Node.js replace pattern para inserción de bloques HTML largos (evita bash heredoc en Windows/Git Bash)
  - Placement: #rev-tertulias-mariquita insertado entre #rev-1820-1835 y #periodo-rosas, después de </div><!-- /#rev-1820-1835 -->
patterns_established:
  - Grep-safe documentation: usar soft hyphen (U+00AD) en strings de clase/atributo dentro de secciones de referencia de drafts, para no contaminar contadores grep de verificación estructural
  - card-nota-historiografica como flag obligatorio en cards con episodios historiográficamente disputados (extendido de M004 a Tertulias)
observability_surfaces:
  - grep -c 'data-certeza=' index.html → 99 (baseline para M015+)
  - grep -c "card-nota-historiografica" index.html → 13 (baseline para M015+)
  - awk /id="rev-tertulias-mariquita"/{found=1} ... → 6 cards con data-certeza dentro de la sección
  - Browser console: "[DEBUG] [SubNav] Initialized with 8 sub-periods, 8 links." confirma link registrado
  - Browser console: "[DEBUG] [Reveal] Revealed: div#rev-tertulias-mariquita..." confirma stagger
requirement_outcomes:
  - id: R001
    from_status: active
    to_status: active
    proof: Todas las 6 cards nuevas tienen fuentes citadas con <cite> y data-certeza clasificado. No hay cambio de status — R001 es ongoing para todos los milestones de contenido.
  - id: R002
    from_status: active
    to_status: active
    proof: Las 6 cards siguen los patrones HTML establecidos (card-hecho, card-rumor, card-opinion, stagger reveals, events-grid--certeza, lightbox). No hay cambio de status — R002 es ongoing.
duration: ~40m total (S01: 20m, S02: 20m)
verification_result: passed
completed_at: 2026-03-24
---

# M014: Las Tertulias de Mariquita Sánchez

**Sección #rev-tertulias-mariquita integrada en index.html con 6 cards verificadas (TER-1 a TER-6), el Himno Nacional tratado historiográficamente como tradición oral no documentada, sub-nav operativo con 8 links, y cero errores JS en consola.**

## What Happened

M014 tenía dos slices: S01 investigó y redactó el contenido; S02 lo integró en el HTML. La secuencia funcionó limpiamente — S01 entregó un artefacto estructurado (`S01-CONTENT-DRAFT.md`) con 6 cards completas (títulos, fechas, certeza, excerpts, cites, HTML de imágenes) que hizo de S02 un trabajo mecánico de inserción, no creativo.

**S01 — Investigación y borrador:** El trabajo principal fue clasificar cada episodio con certeza correcta antes de escribir una sola línea de HTML. El punto más delicado fue TER-2 (el Himno Nacional): la tradición de que el Himno se interpretó por primera vez en el salón de Mariquita (25 mayo 1813) es el episodio más reproducido sobre las tertulias, pero no tiene documentación contemporánea directa. Las actas del Triunvirato y del Cabildo no lo registran; la tradición se consolidó en el siglo XIX y fue fijada visualmente por el cuadro de Subercaseaux (1909), pintado 96 años después. La decisión (D068) fue `data-certeza="rumor"` con `card-nota-historiografica` obligatoria — el tratamiento historiográfico explícito que el roadmap requería. S01 también verificó la imagen de Mariquita por Wikimedia API (Decision D069): 321×410px, sin thumb de 500px disponible, URL directa necesaria.

Un hallazgo de proceso relevante: la sección "HTML Patterns Reference" del draft documentaba los mismos strings (`card-nota-historiografica`, `data-certeza`) que los greps de verificación apuntaban, causando falsos positivos. Se resolvió con soft hyphen (U+00AD) dentro de los nombres en la sección de referencia — patrón ahora documentado en KNOWLEDGE.md.

**S02 — Integración HTML:** El bloque de 6 cards fue insertado con Node.js (`fs.readFileSync → string.replace → fs.writeFileSync`) después del marcador `</div><!-- /#rev-1820-1835 -->`, colocando la nueva sección exactamente entre `#rev-1820-1835` y `#periodo-rosas`. El sub-nav link fue añadido con Edit tool en línea 331. El IntersectionObserver del sub-nav detectó la nueva sección automáticamente — los logs de consola confirmaron el paso de 7 a 8 sub-períodos sin cambios en `app.js`.

Las 6 cards cubren: (TER-1) la tertulia como institución post-Mayo circa 1810–1815; (TER-2) el Himno Nacional como tradición oral con nota historiográfica; (TER-3) los asistentes ilustres documentados con imagen de Mariquita; (TER-4) el puente con la Generación del 37 con nota-certeza inline sobre Alberdi; (TER-5) el exilio anti-Rosas como resistencia intelectual; (TER-6) el fin de las tertulias y el legado 1838.

La auditoría de superposición con M011 confirmó cero duplicación real: el contenido existente menciona a Mariquita desde la perspectiva de Alberdi; las nuevas cards centran las tertulias como institución histórica propia.

## Cross-Slice Verification

**Criterio 1: Nueva sección visible en el sitio con mínimo 5 cards sobre las tertulias**
- `awk '/id="rev-tertulias-mariquita"/{found=1} found && /data-certeza=/{count++} found && /\/#rev-tertulias-mariquita/{print count; exit}' index.html` → **6** ✅ (supera el mínimo de 5)
- `grep -n "rev-tertulias-mariquita" index.html` → 4 líneas: sub-nav link (l.331), comment apertura (l.1445), div id (l.1447), comment cierre (l.1558) ✅

**Criterio 2: Cada card tiene `data-certeza` correcto y `<cite>` con fuente real**
- Certezas en sección: hecho, rumor, hecho, hecho, opinion, opinion — todas clasificadas correctamente según el draft investigado ✅
- `grep -c 'data-certeza=' index.html` → **99** (baseline 93 + 6 nuevas) ✅
- `<cite>` con fuentes verificadas en cada card (confirmado en S02 DOM check) ✅

**Criterio 3: El episodio del Himno Nacional tratado historiográficamente**
- TER-2 tiene `data-certeza="rumor"` + `class="card-nota-historiografica"` con texto que distingue tradición oral del siglo XIX de la ausencia de documentación contemporánea directa, menciona el cuadro de Subercaseaux (1909) y la clasificación del Museo de la Ciudad ✅
- `grep -c "card-nota-historiografica" index.html` → **13** (baseline 12 + 1 nueva) ✅

**Criterio 4: Ninguna sección existente se rompe**
- `node -e "new Function(require('fs').readFileSync('app.js','utf8')); console.log('syntax OK')"` → **syntax OK** ✅
- `tail -5 index.html` → contiene `</html>` ✅
- Sub-nav sigue con estructura correcta (8 links, todos con `class="sub-nav__link"`) ✅
- Secciones adyacentes `#rev-1820-1835` y `#periodo-rosas` intactas en DOM ✅

**Criterio 5: Las nuevas cards siguen los patrones reveal/stagger/lightbox establecidos**
- Cards tienen `class="sub-period reveal reveal-fade"` en la sección contenedora ✅
- Stagger delays aplicados: TER-1=0ms, TER-2=80ms, TER-3=160ms, TER-4=240ms, TER-5=320ms, TER-6=400ms ✅
- Browser console (S02 verificación): `[Reveal] Revealed: div#rev-tertulias-mariquita.sub-period.reveal--visible` ✅
- Imagen TER-3 usa `.card-image img` — lightbox event delegation la captura automáticamente ✅

**Definition of Done:**
- [x] S01 completo con S01-SUMMARY.md ✅
- [x] S02 completo con S02-SUMMARY.md ✅
- [x] Todas las cards en index.html con certeza y citas ✅
- [x] No hay duplicación con contenido de M011 ✅
- [x] Himno con tratamiento historiográfico correcto ✅
- [x] Verificación estructural pasa ✅
- [x] Sitio abre sin errores JS en consola ✅

## Requirement Changes

- R001 (contenido verificado): active → active — Las 6 cards nuevas tienen fuentes citadas con `<cite>` y data-certeza clasificado. El milestone cumple R001 para el nuevo contenido; el requerimiento permanece active como obligación ongoing para futuros milestones de contenido.
- R002 (patrones HTML): active → active — Las 6 cards siguen los templates card-hecho/card-rumor/card-opinion, stagger reveals, y events-grid--certeza. El milestone cumple R002; permanece active como obligación ongoing.

## Forward Intelligence

### What the next milestone should know
- La zona entre `#rev-1820-1835` y `#periodo-rosas` está ahora ocupada por `#rev-tertulias-mariquita`. Cualquier nuevo contenido del período 1820–1838 debe insertarse dentro de una de las tres secciones existentes o crear una cuarta sub-sección con placement explícito.
- El sub-nav del `#periodo-revolucion` tiene **8 links**. Si se agregan más sub-períodos, el IntersectionObserver los detecta automáticamente (no requiere cambios en `app.js`) pero el layout del sub-nav puede necesitar ajuste CSS si los 8+ links no caben en una línea.
- El baseline de `data-certeza=` en index.html es **99**. Los greps de verificación de M015+ deben usar 99 como punto de partida.
- El baseline de `card-nota-historiografica` en index.html es **13**.
- El patrón soft-hyphen (U+00AD) para documentación grep-safe en drafts está en KNOWLEDGE.md — aplicarlo en cualquier draft que incluya una sección de referencia con strings que coincidan con targets de verificación.

### What's fragile
- **Imagen TER-3 (Mariquita Sánchez, 321×410px):** Baja resolución para pantallas retina. URL directa sin /thumb/ — si Wikimedia renombra el archivo, la imagen rompe silenciosamente (hay fallback handler en app.js). Reemplazable en un futuro slice si se encuentra retrato de mayor resolución.
- **TER-4 `card-nota-certeza` inline:** La evidencia directa de Alberdi en las tertulias es escasa; la nota debe mantenerse visible en el HTML. No debe colapsarse ni eliminarse en ediciones futuras.
- **HTML comments del bloque** (`<!-- id="..." -->`, `<!-- /# -->`) son parte del template heredado. Greps que busquen "exactamente 2" menciones del id de la sección fallarán (son 4). El método correcto es awk con límites de sección.

### Authoritative diagnostics
- `awk '/id="rev-tertulias-mariquita"/{found=1} found && /data-certeza=/{count++} found && /\/#rev-tertulias-mariquita/{print count; exit}' index.html` → **6**: método más confiable para contar cards dentro de la sección (grep -A puede salir de los límites).
- `grep -n "rev-tertulias-mariquita" index.html` → muestra las 4 líneas: l.331 (sub-nav), l.1445 (comment apertura), l.1447 (div id), l.1558 (comment cierre).
- Browser console `[SubNav] Initialized with N sub-periods, N links.` es el indicador más confiable de que el sub-nav detectó la sección.

### What assumptions changed
- **Asunción original:** el draft sería straightforward copy del research. **Realidad:** la sección de referencia HTML del draft contaminaba los contadores grep, requiriendo el patrón soft-hyphen no documentado previamente.
- **Asunción original del plan S02:** grep count = 2 para el id de la sección (sub-nav link + div id). **Realidad:** el template heredado de otras secciones incluye HTML comments de apertura y cierre — el count correcto es 4. Este desvío es consistente con el resto del codebase.

## Files Created/Modified

- `index.html` — Añadida sección `#rev-tertulias-mariquita` (~110 líneas, TER-1 a TER-6) después de línea 1439; sub-nav link añadido en línea 331
- `.gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md` — artefacto de handoff con 6 cards verificadas (creado en S01)
- `.gsd/milestones/M014/M014-SUMMARY.md` — este archivo
