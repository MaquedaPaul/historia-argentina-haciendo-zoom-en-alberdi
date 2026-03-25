# S03: Regreso a Tucumán, Alejandro Heredia y vuelta a Buenos Aires (1833–1838)

**Goal:** Investigar, verificar e integrar en `index.html` tres bloques biográficos (BIOG-9, BIOG-10, BIOG-11) que narran el regreso de Alberdi a Tucumán (ca. 1833–1834), su vínculo con el gobernador Alejandro Heredia, y el segundo regreso a Buenos Aires culminando con el *Fragmento preliminar* (1837) — cerrando el sub-período biográfico y conectando con el Salón Literario ya existente en el sitio.

**Demo:** El visitante puede leer en `#rev-alberdi-formacion` el arco completo de Alberdi desde su nacimiento (1810) hasta el umbral del Salón Literario de 1837 — con cards verificadas sobre la Tucumán de Heredia, la naturaleza del vínculo con el gobernador caudillo, y el regreso definitivo a Buenos Aires — seguido de un puente narrativo hacia las cards del Salón Literario ya existentes en el sub-período 1820–1835.

## Must-Haves

- Card **BIOG-9** (`card-hecho`): Regreso a Tucumán ca. 1833–1834 — motivaciones documentadas (asuntos de herencia, vínculos familiares); la Tucumán política de Heredia como contexto; `card-nota-certeza` si el año exacto no está confirmado en fuente primaria.
- Card **BIOG-10** (`card-hecho` para hechos de Heredia + `card-opinion` para la naturaleza del vínculo personal): Alejandro Heredia — gobernador 1832–1838, perfil como caudillo federal con gestos ilustrados, asesinado el 12 de noviembre de 1838; cómo se relacionó con Alberdi documentado con certeza explícita.
- Card **BIOG-11** (`card-hecho`): Vuelta a Buenos Aires ca. 1835–1836; el *Fragmento preliminar al estudio del Derecho* (1837) como primer texto constitucional; puente hacia el Salón Literario de 1837.
- Actualización del título del sub-período `#rev-alberdi-formacion` de "1810–1824" a "1810–1838" en el HTML y en el sub-nav link — para reflejar que el sub-período biográfico ahora cubre hasta el Salón Literario.
- Puente narrativo (`<blockquote class="alberdi-quote">`) al cierre de `#rev-alberdi-formacion` que conecte con el Salón Literario de 1837 — sin duplicar el conector existente en línea ~676 que ya cita el discurso inaugural.
- No duplicar la narrativa de las cards del Salón Literario existentes (SP2-4 en `#rev-1820-1835`).

## Proof Level

- This slice proves: integration + narrative coherence
- Real runtime required: yes (reveal-on-scroll + sub-nav deben registrar los nuevos elementos)
- Human/UAT required: yes (coherencia narrativa y ausencia de contradicciones con cards pre-existentes)

## Verification

- `grep -c 'data-certeza' index.html` devuelve ≥ 45 (post-S02 baseline = 42; S03 agrega ≥3 cards).
- `grep -E 'Heredia|Fragmento preliminar' index.html | wc -l` devuelve ≥ 4 matches.
- `grep 'BIOG-9\|BIOG-10\|BIOG-11' index.html | wc -l` devuelve ≥ 3 (al menos un comentario por bloque).
- `grep 'rev-alberdi-formacion.*1838\|1810.*1838' index.html` devuelve ≥ 1 match (título actualizado).
- `test -f .gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md` — borrador existe y no está vacío.
- **Failure-path / observability check:** Browser JS console muestra `[Reveal] Initialized with N elements` donde N ≥ 64 (post-S02 baseline = 61; 3 nuevas cards `reveal reveal-slide` + eventual actualización del sub-período). Si N < 64, alguna card no tiene las clases `reveal reveal-slide` correctas.
- Browser: `document.querySelectorAll('#rev-alberdi-formacion [data-certeza]').length` devuelve ≥ 11 (post-S02 = 8; S03 agrega ≥3 cards).

## Observability / Diagnostics

- Runtime signals: `[Reveal] Initialized with N elements` en JS console al cargar el sitio — la única señal de que el IntersectionObserver registró los nuevos elementos. Si N no aumenta en ≥3 respecto al baseline de 61, el insert fue incorrecto.
- Inspection surfaces:
  - `grep -c 'data-certeza' index.html` — card count quantitativo; baseline post-S02 = 42.
  - `grep -n 'BIOG-[0-9]' index.html` — lista todos los comentarios BIOG en orden; verifica secuencia sin gaps.
  - `document.querySelectorAll('.reveal').length` en DevTools — debe ser ≥ 64.
  - `document.querySelectorAll('.card-nota-certeza').length` en DevTools — no debe bajar de 10 (post-S02 baseline); S03 puede agregar flags adicionales.
- Failure visibility: Si `grep -c 'data-certeza'` no aumenta tras la integración, el Node.js splice usó el anchor incorrecto o la línea de inserción falló silenciosamente — diagnosticar con `grep -n 'BIOG-8\|BIOG-9' index.html` para localizar la posición exacta.
- Redaction constraints: ninguna — contenido histórico público.

## Integration Closure

- Upstream surfaces consumed: `index.html` (el grid de `#rev-alberdi-formacion` en líneas ~344–544; el sub-nav en líneas ~327–331); `S03-CONTENT-DRAFT.md` (producido en T01, consumido en T02).
- New wiring introduced: 3 cards nuevas con `data-certeza`, `reveal reveal-slide`, y `--reveal-delay` incremental; actualización del título del sub-período y del sub-nav label; `<blockquote class="alberdi-quote">` como cierre del sub-período biográfico.
- What remains before the milestone is truly usable end-to-end: S04 (perfil multifacético) cierra el arco completo de M007.

## Tasks

- [x] **T01: Investigar y redactar borrador verificado para BIOG-9, BIOG-10 y BIOG-11** `est:1.5h`
  - Why: Heredia es una figura menos documentada en las biografías estándar de Alberdi; la naturaleza exacta del vínculo entre ambos varía según la fuente. El borrador verificado elimina ambigüedades antes de tocar el HTML.
  - Files: `.gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md` (crear)
  - Do: Investigar y redactar los tres bloques:
    **BIOG-9 — Regreso a Tucumán (ca. 1833–1834):** Verificar el año exacto del regreso (Mayer sitúa ca. 1834; BIOG-8 cubre el grado en Córdoba el 24 mayo 1834 — el regreso a Tucumán puede ser posterior o parte del viaje de vuelta). Verificar las motivaciones documentadas: asuntos de herencia post-muerte del padre (ca. 1822), vínculos con el hermano Felipe. Nota: el padre murió ca. 1822 — los "asuntos de herencia" en 1834 pueden referirse a propiedades en Tucumán gestionadas por Felipe. Certeza sugerida: `card-hecho` con `card-nota-certeza` si el año exacto no está en fuente primaria.
    **BIOG-10 — Alejandro Heredia y el vínculo con Alberdi:** Verificar: Heredia gobernó Tucumán 1832–1838 (en algunos períodos con intermisión); fue un caudillo federal de la órbita rosista pero con gestos ilustrados (protegió actividad cultural en Tucumán); fue asesinado el 12 de noviembre de 1838 en Famaillá. Investigar cómo se conocieron Heredia y Alberdi: ¿fue a través del círculo letrado tucumano? ¿La familia Alberdi tenía vínculos previos con Heredia? Las fuentes secundarias (Mayer) mencionan el contacto pero ¿dan detalles? La naturaleza del vínculo personal es el elemento de mayor incertidumbre — si no hay fuente precisa, clasificar la evaluación del vínculo como `card-opinion`. Los hechos de Heredia (cargo, fechas, muerte) son `card-hecho`.
    **BIOG-11 — Vuelta a Buenos Aires y el Fragmento preliminar:** Verificar el año de regreso a Buenos Aires (ca. 1835–1836 según Mayer; algunos dicen 1835 directamente de Córdoba, otros 1836 tras estadía tucumana). El *Fragmento preliminar al estudio del Derecho* fue publicado en junio de 1837 por Imprenta de la Libertad — ¿fue la disertación de graduación (tesis) o una obra independiente? Mayer y el propio texto responden. El Salón Literario se inauguró el 26 de junio de 1837 — el mismo año que el *Fragmento*. La conexión con el Salón Literario ya está cubierta en SP2-4 y en el alberdi-quote connector de línea ~676 — el BIOG-11 debe conectar sin duplicar. Redactar también el texto del puente narrativo final (blockquote alberdi-quote) que cierre el sub-período biográfico — usar una cita de Alberdi que mire hacia adelante (hacia el Salón, hacia la generación del 37), distinta de la ya usada en línea ~676.
    Escribir el borrador completo con: título, fecha display, certeza, excerpt HTML-listo (2–4 oraciones), fuentes (≥2 por hecho), cite reference, notas sobre imagen (reutilizar imágenes existentes del sitio si hay retratos de Alberdi ya cargados).
  - Verify: `test -f .gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md && grep -c "^## BIOG" .gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md` devuelve ≥ 3.
  - Done when: borrador con BIOG-9, BIOG-10, BIOG-11 completos; fuentes citadas (≥2 por bloque hecho); sin `[VERIFICACIÓN PENDIENTE]` sin una nota de resolución o de incertidumbre documentada; certeza clasificada con justificación.

- [x] **T02: Integrar BIOG-9, BIOG-10, BIOG-11 en index.html y actualizar el sub-período biográfico** `est:1h`
  - Why: Materializar el borrador como HTML siguiendo los templates de card y el patrón de integración CRLF-safe establecido en S01/S02.
  - Files: `index.html`
  - Do:
    1. Leer el borrador `S03-CONTENT-DRAFT.md` para obtener el contenido final de cada card.
    2. Confirmar la línea exacta de inserción: `grep -n "BIOG-8\|/div.*events-grid\|/#rev-alberdi-formacion" index.html` — las cards se insertan DESPUÉS del `</article>` de cierre de BIOG-8 (actualmente ~línea 542) y ANTES de la línea `</div><!-- /.events-grid -->`.
    3. Usar el patrón Node.js CRLF-safe (per KNOWLEDGE.md): escribir el HTML de las 3 cards en un archivo temp, luego hacer el splice con `split('\r\n')`, `splice`, `join('\r\n')`. El anchor debe ser la línea exacta del comentario o cierre de BIOG-8.
    4. Stagger delays para las nuevas cards: BIOG-9 = `640ms` (continuando desde BIOG-8 en `560ms`), BIOG-10 = `720ms`, BIOG-11 = `800ms`.
    5. Actualizar el título del sub-período: cambiar `<h3 class="sub-period__title">Alberdi: Los años de formación (1810–1824)</h3>` → `(1810–1838)`.
    6. Actualizar el sub-nav link: cambiar `1810–1824` a `1810–1838` en la línea ~327.
    7. Agregar el puente narrativo (`<blockquote class="alberdi-quote reveal reveal-slide">`) DESPUÉS de `</div><!-- /.events-grid -->` y ANTES de `</div><!-- /#rev-alberdi-formacion -->` (actualmente línea ~544). Este blockquote usa la cita del borrador BIOG-11 (texto distinto al connector existente en línea ~676 que ya menciona el Salón de 1837).
    8. Verificar que no se rompe ninguna card pre-existente: `grep -c 'data-certeza' index.html` debe ser ≥ 45.
    9. Verificar que `styles.css` y `app.js` NO fueron modificados (`git diff --name-only`).
  - Verify: `grep -c 'data-certeza' index.html` ≥ 45; `grep 'BIOG-9\|BIOG-10\|BIOG-11' index.html | wc -l` ≥ 3; `grep '1810.*1838\|rev-alberdi-formacion.*1838' index.html | wc -l` ≥ 1.
  - Done when: 3 cards nuevas presentes en index.html con `data-certeza` correcto; sub-período y sub-nav actualizados a 1838; puente narrativo presente; sin cambios en CSS ni JS.

- [x] **T03: Verificación de tres capas — shell, browser y narrativa** `est:30m`
  - Why: S01 y S02 establecieron el patrón de gate de tres capas como requisito de calidad. S03 debe completar el mismo gate para dar por cerrado el sub-período biográfico completo.
  - Files: `index.html`, `.gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md`
  - Do:
    **Capa 1 — checks cuantitativos shell/node:**
    - `grep -c 'data-certeza' index.html` ≥ 45
    - `grep 'BIOG-9\|BIOG-10\|BIOG-11' index.html | wc -l` ≥ 3
    - `grep -E 'Heredia|Fragmento preliminar' index.html | wc -l` ≥ 4
    - `grep '1810.*1838\|rev-alberdi-formacion.*1838' index.html | wc -l` ≥ 1
    - `git diff --name-only` — styles.css y app.js NO deben aparecer
    **Capa 2 — señales de observabilidad browser (abrir el sitio en browser):**
    - `[Reveal] Initialized with N elements` en JS console: N ≥ 64
    - `document.querySelectorAll('#rev-alberdi-formacion [data-certeza]').length` ≥ 11
    - `document.querySelectorAll('.card-nota-certeza').length` ≥ 10 (no regresión)
    - `[SubNav] Initialized with 5 sub-periods, 5 links` (invariante — S03 no agrega sub-períodos ni links nuevos)
    - Verificar que al scrollear al sub-período biográfico se disparan los revels correctamente.
    **Capa 3 — coherencia narrativa manual:**
    - Leer en secuencia BIOG-1→BIOG-11 en el browser: cronología sin saltos (1810 → 1813 → 1822 → 1824 → ca.1826 → ca.1827–1832 → ca.1827–1834 → 1833–1834 → 1832–1838 → 1835–1837).
    - Verificar que la card BIOG-11 y el puente narrativo conectan sin duplicar SP2-4 ("El ascenso de Rosas y la Generación del 37") ni el alberdi-quote conector existente de línea ~676.
    - Verificar que Heredia (BIOG-10) no presenta contradicciones con SP2-1 (Cepeda 1820), SP2-2 (Unitarios vs. Federales) — el perfil de Heredia como federal debe ser coherente con lo que el sitio ya dice sobre los federales.
    - Si hay solapamientos o contradicciones, ajustar el texto de las cards nuevas.
    Documentar los resultados en `S03-CONTENT-DRAFT.md` como Apéndice T03.
  - Verify: `grep -c 'data-certeza' index.html` ≥ 45; `node -e "const h=require('fs').readFileSync('index.html','utf8'); const n=(h.match(/data-certeza/g)||[]).length; if(n<45) process.exit(1); console.log('OK: '+n+' cards')"` sale con código 0.
  - Done when: los 7 checks de capa 1 pasan; los 4 checks de capa 2 pasan en browser; la lectura de capa 3 confirma coherencia de BIOG-1→BIOG-11; Apéndice T03 documentado en el borrador.

## Files Likely Touched

- `index.html` — inserción de BIOG-9, BIOG-10, BIOG-11; actualización de título de sub-período y sub-nav; puente narrativo
- `.gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md` — creado en T01, ampliado con Apéndice T03
