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

- `grep -c 'data-certeza' index.html` aumenta en ≥4 respecto al valor pre-S01.
- `grep 'Salvador.*Alberdi\|Belgrano\|1810.*Tucumán' index.html` devuelve ≥2 matches.
- Abrir el sitio en browser → navegar a la nueva sección → confirmar que las 4 cards hacen reveal al scroll.

## Tasks

- [ ] **T01: Research y borrador de contenido verificado (Bloques 1–4)** `est:2h`
  - Why: el contenido histórico debe verificarse antes de integrarlo en HTML; errores en HTML son costosos de corregir.
  - Files: `.gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md` (crear)
  - Do: buscar en fuentes primarias y secundarias los datos para los 4 bloques: (1) nacimiento 29-ago-1810, nombre completo Juan Bautista Alberdi, lugar San Miguel de Tucumán — verificar contra *Mi vida privada* y Mayer; (2) padre Salvador María Alberdi — fechas de participación en campañas de Belgrano (Batalla de Tucumán 24-set-1812, Batalla de Salta 20-feb-1813) — verificar que el padre estuvo o apoyó desde Tucumán, no necesariamente en el campo de batalla; (3) madre Josefa Rosa Aráoz, fecha de muerte; hermanos — al menos Felipe Alberdi es conocido, identificar otros; (4) muerte del padre 1824 — verificar año exacto. Para el Bloque 3 (¿todos apoyaron Mayo?): documentar que la élite tucumana estaba dividida; que el padre fue patriota; que el propio Alberdi adulto escribió sobre los límites de Mayo. Escribir el borrador en `S01-CONTENT-DRAFT.md` con estructura: Título → Fecha → Certeza → Excerpt (2-4 oraciones) → Fuentes (≥2) → Cita para HTML.
  - Verify: `S01-CONTENT-DRAFT.md` existe y tiene los 4 bloques con ≥2 fuentes cada uno.
  - Done when: borrador completo con fechas verificadas y ningún `[VERIFICACIÓN PENDIENTE]` sin resolver o con nota explícita de por qué es incierto.

- [ ] **T02: Crear sub-período biográfico en index.html e integrar cards S01** `est:1.5h`
  - Why: los bloques necesitan un contenedor HTML propio dentro de `#periodo-revolucion`, antes del sub-período "Revolución e Independencia (1800–1820)" ya existente.
  - Files: `index.html`
  - Do: insertar un nuevo `<div id="rev-alberdi-formacion" class="sub-period reveal reveal-fade">` con `<h3 class="sub-period__title">Alberdi: Los años de formación (1810–1838)</h3>` inmediatamente antes del primer `<div id="rev-1800-1820"`. Agregar las 4 cards del bloque S01 dentro de un `<div class="events-grid events-grid--certeza">`. Usar los templates existentes (card-hecho, card-opinion). Agregar `style="--reveal-delay: Nms"` con incrementos de 80ms. Incluir `<cite>` en cada card.
  - Verify: `grep -c 'rev-alberdi-formacion' index.html` = 1. Las 4 nuevas cards tienen `data-certeza`. Abrir browser y confirmar reveal-on-scroll.
  - Done when: 4 cards visibles en el browser con reveal funcional y contenido del borrador integrado.

- [ ] **T03: Verificación histórica y corrección** `est:30m`
  - Why: validación cruzada final antes de declarar S01 completo.
  - Files: `index.html`, `S01-CONTENT-DRAFT.md`
  - Do: re-leer cada card en el browser. Verificar que: (a) la fecha de nacimiento es 29-ago-1810; (b) las batallas de Belgrano tienen fechas correctas (Tucumán 24-set-1812, Salta 20-feb-1813); (c) los nombres de familia son correctos; (d) ninguna cita directa es una paráfrasis presentada como cita. Corregir cualquier error encontrado.
  - Verify: lectura completa de las 4 cards en browser sin errores detectables.
  - Done when: ningún error histórico identificado; todas las citas tienen fuente explícita.

## Files Likely Touched

- `index.html`
- `.gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md` (nuevo)
