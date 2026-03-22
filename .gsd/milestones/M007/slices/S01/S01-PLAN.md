# S01: Infancia, familia y años formativos (1810–1824)

**Goal:** Investigar, verificar e integrar en `index.html` los bloques de contenido sobre el nacimiento de Alberdi, la figura del padre (su rol en las campañas de Belgrano), los hermanos y la crianza, la posición familiar ante la Revolución de Mayo, y la muerte de ambos padres. Todo con fechas verificadas y fuentes citadas.
**Demo:** El visitante puede navegar a la sección biográfica de Alberdi y leer, con reveal-on-scroll, las cards sobre su infancia tucumana: nacimiento (1810), padre-patriota (Belgrano), hermanos y crianza sin madre, la pregunta de si todos apoyaron Mayo, y la doble orfandad.

## Must-Haves

- Card **hecho**: nacimiento de Alberdi el 29 de agosto de 1810 en Tucumán. Salvador María Alberdi como padre, su participación en las campañas del Norte (Batalla de Tucumán 1812, Salta 1813) bajo las órdenes de Belgrano.
- Card **hecho** + nota crianza: hermanos de Alberdi (nombres verificados), la madre Josefa Rosa Aráoz muerta cuando era bebé, la crianza bajo tutela del padre.
- Card **hecho/opinión**: el debate sobre la Revolución de Mayo en Tucumán — no todos eran patriotas; el padre fue patriota activo; la reflexión crítica adulta del propio Alberdi sobre los límites de la revolución.
- Card **hecho**: muerte de la madre (ca. 1813) y muerte del padre (1824) — la doble orfandad como hito biográfico.
- Todas las cards tienen `<cite>` con fuente verificada.
- Un archivo `S01-CONTENT-DRAFT.md` que precede la integración HTML, con fuentes anotadas.

## Proof Level

- This slice proves: integration (HTML real en el browser)
- Real runtime required: yes (verificar reveal-on-scroll en browser)
- Human/UAT required: yes (el usuario confirma precisión histórica)

## Verification

- `grep -c 'data-certeza' index.html` devuelve ≥38 (era 34 pre-S01; aumenta en ≥4 con las nuevas cards).
- `grep -q 'rev-alberdi-formacion' index.html && echo PASS || echo FAIL` devuelve PASS (el sub-período existe en el HTML).
- `grep 'Salvador.*Alberdi\|Belgrano\|1810.*Tucumán\|Josefa.*Aráoz' index.html | wc -l` devuelve ≥2 (los hechos biográficos centrales están presentes).
- `test -f .gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md && grep -c "^## Bloque" .gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md` devuelve ≥4 (los 4 bloques del draft están presentes).
- **Diagnóstico de certeza**: `node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.match(/data-certeza/g); console.log('data-certeza count:', m?m.length:0);"` — confirma el conteo exacto antes y después; si la integración rompió algo, el conteo lo revela.
- **Diagnóstico de flags epistémicos**: `grep -c 'card-nota-certeza' index.html` — si ≥1, listar con `grep -n 'card-nota-certeza' index.html` para ver qué hechos quedaron flaggeados como inciertos y necesitan resolución futura.

## Observability / Diagnostics

- Runtime signals: cada nueva card emite un `data-certeza` attribute que el CSS `events-grid--certeza` consume para el layout; la ausencia del atributo produce cards sin badge visual (detectable por inspección DOM). Las flags `card-nota-certeza` actúan como señales inline de incertidumbre epistémica no resuelta.
- Inspection surfaces: `grep -c 'data-certeza' index.html` (conteo pre/post); `document.querySelectorAll('.card-nota-certeza')` en DevTools (flags epistémicos activos); `document.querySelectorAll('.reveal:not(.reveal--visible):not(.reveal--no-anim)')` (elementos reveal no activados — revela si el IntersectionObserver falló para los nuevos elementos).
- Failure visibility: si `rev-alberdi-formacion` no tiene `class="sub-period reveal reveal-fade"`, el sub-período aparece sin animación de entrada pero el contenido es visible. Si falta `events-grid--certeza`, las cards se renderizan sin el layout de certeza pero el texto está accesible. Ambos son fallos visuales, no de accesibilidad crítica.
- Redaction constraints: ninguna (contenido histórico público, sin datos personales ni secretos).

## Integration Closure

- Upstream surfaces consumed: `index.html` (estructura `#periodo-revolucion` → sub-nav → sub-periods); templates de card existentes (card-hecho, card-opinion, card-rumor); sistema reveal-on-scroll (IntersectionObserver en `app.js` — sin modificar).
- New wiring introduced in this slice: nuevo `<div id="rev-alberdi-formacion" class="sub-period reveal reveal-fade">` insertado antes de `#rev-1800-1820`; nuevo link en `<nav class="sub-nav">` apuntando a `#rev-alberdi-formacion`.
- What remains before the milestone is truly usable end-to-end: S02–S04 añaden los 7 bloques biográficos restantes; S05–S08 añaden el arco Alberdi-Quiroga.

## Tasks

- [x] **T01: Research y borrador de contenido verificado (Bloques 1–4)** `est:2h`
  - Why: el contenido histórico debe verificarse antes de integrarlo en HTML; errores en HTML son costosos de corregir. El borrador también sirve como registro auditable de las fuentes usadas.
  - Files: `.gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md` (crear)
  - Do: buscar en fuentes primarias y secundarias los datos para los 4 bloques. (1) Nacimiento 29-ago-1810, nombre completo Juan Bautista Alberdi, lugar San Miguel de Tucumán — verificar contra *Mi vida privada* y Mayer *Alberdi y su tiempo*. (2) Padre Salvador María Alberdi — fechas de participación o apoyo a las campañas de Belgrano (Batalla de Tucumán 24-set-1812, Batalla de Salta 20-feb-1813) — verificar que el padre estuvo o apoyó desde Tucumán. (3) Madre Josefa Rosa Aráoz, fecha de muerte (ca. 1813); hermanos — al menos Felipe Alberdi es conocido, identificar otros. (4) Muerte del padre 1824 — verificar año exacto. Para el Bloque 3 (¿todos apoyaron Mayo?): documentar que la élite tucumana estaba dividida; que el padre fue patriota; que el propio Alberdi adulto escribió sobre los límites de Mayo. Escribir el borrador en `S01-CONTENT-DRAFT.md` con estructura por bloque: `## Bloque N: Título` → Certeza → Excerpt (2-4 oraciones) → Fuentes (≥2) → Cita HTML → Notas de imagen.
  - Verify: `test -f .gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md && grep -c "^## Bloque" .gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md` devuelve 4.
  - Done when: 4 bloques con ≥2 fuentes verificadas cada uno; cualquier fecha incierta marcada con `[INCIERTO — ver nota]` y explicación explícita; ninguna cita directa que sea paráfrasis presentada como cita.

- [x] **T02: Crear sub-período biográfico en index.html e integrar cards S01** `est:1.5h`
  - Why: los bloques necesitan un contenedor HTML propio dentro de `#periodo-revolucion`, antes del sub-período "Revolución e Independencia (1800–1820)" ya existente. También requiere actualizar el sub-nav para que el nuevo sub-período sea navegable.
  - Files: `index.html`
  - Do: (1) En el `<nav class="sub-nav">`, añadir un nuevo link `<a href="#rev-alberdi-formacion" class="sub-nav__link">1810–1824<span class="sub-nav__link-label">Infancia y Formación</span></a>` como primer elemento, antes del link `#rev-1800-1820`. (2) Inmediatamente antes del `<div id="rev-1800-1820"`, insertar el nuevo sub-período: `<div id="rev-alberdi-formacion" class="sub-period reveal reveal-fade"><h3 class="sub-period__title">Alberdi: Los años de formación (1810–1824)</h3><div class="events-grid events-grid--certeza">`. (3) Agregar las 4 cards del borrador S01-CONTENT-DRAFT.md usando los templates card-hecho / card-opinion existentes. Usar `style="--reveal-delay: 0ms"`, `80ms`, `160ms`, `240ms`. Incluir `<cite>` en cada card. Usar `card-nota-certeza` para fechas inciertas. Cerrar con `</div></div><!-- /#rev-alberdi-formacion -->`. (4) No añadir CSS ni JS nuevo — solo HTML dentro de los patrones existentes.
  - Verify: `grep -c 'data-certeza' index.html` devuelve ≥38. `grep -q 'rev-alberdi-formacion' index.html && echo PASS`. `grep -q 'sub-nav__link.*rev-alberdi-formacion\|rev-alberdi-formacion.*sub-nav' index.html && echo SUB-NAV-WIRED`.
  - Done when: 4 cards visibles en el browser con reveal-on-scroll funcional; el sub-nav incluye el nuevo enlace "1810–1824"; contenido del borrador integrado fielmente.

- [x] **T03: Verificación diagnóstica y corrección** `est:30m`
  - Why: validación cruzada final antes de declarar S01 completo; garantiza que la integración no introdujo regresiones en el conteo de cards o el layout de certeza.
  - Files: `index.html`, `.gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md`
  - Do: (1) Ejecutar `node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.match(/data-certeza/g); console.log('data-certeza count:', m?m.length:0);"` — confirmar que el conteo subió exactamente en 4 (o más si algún bloque se dividió en dos cards). (2) Ejecutar `grep -n 'card-nota-certeza' index.html` — si hay flags, anotarlos en el borrador como `[INCIERTO — visible en HTML]`. (3) Re-leer cada card en el browser: verificar que (a) la fecha de nacimiento es 29-ago-1810; (b) las batallas tienen fechas correctas (Tucumán 24-set-1812, Salta 20-feb-1813); (c) ninguna cita directa es una paráfrasis. (4) Verificar que el sub-nav link `#rev-alberdi-formacion` hace scroll suave al sub-período correcto. Corregir cualquier error encontrado.
  - Verify: `grep -c 'data-certeza' index.html` ≥38. `grep -c 'card-nota-certeza' index.html` devuelve un número ≥0 (puede ser 0 si todas las fechas se resolvieron). Lectura completa sin errores históricos detectados.
  - Done when: conteo de certeza verificado; flags epistémicos documentados o resueltos; sub-nav funcional; ningún error histórico identificado.

## Files Likely Touched

- `index.html`
- `.gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md` (nuevo)
