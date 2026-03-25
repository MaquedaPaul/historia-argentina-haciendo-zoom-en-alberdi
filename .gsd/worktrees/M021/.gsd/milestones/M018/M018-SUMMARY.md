---
id: M018
provides:
  - Sub-período `#rev-camino-caseros` dentro de `#rev-1835-1852` con 4 cards `card-hecho` (CAM-1…CAM-4) sobre el proceso 1851–1852 que llevó a Caseros
  - Sub-nav link 8° en el bloque de navegación de #periodo-revolucion: `href="#rev-camino-caseros"`
  - 70 `data-certeza="hecho"` cards en el sitio (eran 66 antes de M018)
key_decisions:
  - CAM-4 clasificada como card-hecho (no card-opinion) — todos los hechos inmediatos post-Caseros tienen fechas y actores precisos documentados
  - Alberdi en CAM-4: paráfrasis atribuida incorporada como closing sentence del excerpt — sin nuevo alberdi-quote (cuenta queda en 6)
  - CAM-4 renderizada sin card-image div — no hay imagen de dominio público verificada para el período constituyente inmediato post-Caseros
  - CAM-3 img usa inline style `object-fit: cover; object-position: center top` — panorama La-batalla-de-caseros.JPG es 2197×582 px (ratio 3.77:1) y colapsa sin cover explícito
  - Wikimedia endpoint: usar `commons.wikimedia.org/w/api.php`, no `en.wikipedia.org/w/api.php` — el segundo retorna `missing` silencioso para archivos de Commons
patterns_established:
  - Draft format: YAML frontmatter + secciones ## CAM-N con Título / Año-display / Clase CSS / data-certeza / Justificación / Excerpt / Fuentes / Imagen candidata / Restricciones — formato contrato S01→S02
  - Anti-duplication checklist al final del draft: permite a S02 verificar restricciones de no-duplicación a primera vista
  - Estado de imagen en draft: PENDIENTE → CONFIRMADO/FALLO con thumburl completo; ningún PENDIENTE sin resolver antes de entregar a la siguiente slice
  - New sub-period grids within an existing period use `--reveal-delay` stagger starting from 0ms (independent of sibling grids)
observability_surfaces:
  - "grep -c 'id=\"rev-camino-caseros\"' index.html → 1"
  - "grep -c 'href=\"#rev-camino-caseros\"' index.html → 1"
  - "grep -c 'data-certeza=\"hecho\"' index.html → 70 (baseline post-M018)"
  - "grep -c 'class=\"alberdi-quote' index.html → 6 (locked count)"
  - "node -e \"try{new Function(require('fs').readFileSync('app.js','utf8'));console.log('OK');}catch(e){console.error(e.message);}\" → syntax OK"
requirement_outcomes:
  - id: R001
    from_status: active
    to_status: active
    proof: No change — página sigue cargando correctamente con la nueva sección añadida; JS syntax OK; sub-nav y reveal system intactos.
  - id: R002
    from_status: active
    to_status: active
    proof: R002 cubre 1500-1800; M018 añade contenido 1851-1852 dentro de R003's scope (1800-1860). No hay transición de estado para R002 en este milestone.
duration: ~1h total (S01 ~45m + S02 ~15m)
verification_result: passed
completed_at: 2026-03-24
---

# M018: El Camino a Caseros

**Integró 4 cards `card-hecho` verificadas sobre el proceso 1851–1852 que llevó a Caseros — Pronunciamiento de Urquiza, alianzas, Ejército Grande, y primeros pasos constituyentes — como sub-período `#rev-camino-caseros` dentro de `#rev-1835-1852`, sin duplicar el contenido existente sobre la batalla.**

## What Happened

**S01** produjo el contrato de contenido completo: `S01-CONTENT-DRAFT.md` con 4 secciones CAM estructuradas (título, año-display, clase CSS, data-certeza con justificación, excerpt verificado, ≥3 fuentes por card, e imagen candidata con estado). El trabajo de investigación se apoyó en `S01-RESEARCH.md` preexistente y lo tradujo al formato contrato S01→S02, separando completamente la fase de riesgo alto (verificación histórica y clasificación de certeza) de la integración HTML.

La decisión no trivial de S01 fue clasificar CAM-4 como `card-hecho` en lugar de `card-opinion`: el contenido real — renuncia de Rosas (3 feb 1852), nombramiento de Vicente López (4 feb), Acuerdo de San Nicolás (31 may), rechazo de Buenos Aires (sep 1852) — son actos jurídicos documentados con fechas y actores precisos, no interpretaciones. La cita de Alberdi de *Bases* (1852) se incorporó como paráfrasis atribuida en el excerpt para mantener la voz narrativa sin añadir un séptimo `alberdi-quote` (restricción documentada del sitio).

T02 de S01 verificó las tres imágenes candidatas contra la Wikimedia Commons API, descubriendo que `en.wikipedia.org/w/api.php` retorna `missing` silencioso para archivos de Commons. Al cambiar al endpoint correcto (`commons.wikimedia.org/w/api.php`): CAM-1 y CAM-2 se confirmaron directamente; CAM-3 requirió un candidato alternativo (`La-batalla-de-caseros.JPG` con guiones, no `La_Batalla_de_Caseros_2.JPG` que no existe); CAM-4 no tiene imagen primaria verificada y se renderizó sin `card-image`. Este hallazgo se documentó en KNOWLEDGE.md.

**S02** realizó dos ediciones quirúrgicas a `index.html`:

1. **Sub-nav link** — insertó `<a href="#rev-camino-caseros" class="sub-nav__link">` entre los links existentes `#rev-1835-1852` y `#rev-1852-1860`, completando el octavo link de sub-navegación del período revolución.

2. **Bloque HTML** — insertó inmediatamente después de `</div><!-- /.events-grid SP3 -->` y antes de `</div><!-- /#rev-1835-1852 -->`: un `<h4 class="sub-period__subtitle">` con reveal y un `<div id="rev-camino-caseros" class="events-grid events-grid--certeza">` con 4 cards.

Todo el contenido de las cards se tomó verbatim del `S01-CONTENT-DRAFT.md` — ningún dato histórico nuevo fue inventado durante la integración. CAM-3 recibió `object-fit: cover; object-position: center top` inline por el ratio extremadamente apaisado (3.77:1) del panorama de batalla. El conteo `data-certeza="hecho"` pasó de 66 a 70.

## Cross-Slice Verification

**Success criterion 1: Cards documentadas sobre el proceso previo a Caseros (Pronunciamiento, alianzas, campaña)**
- ✅ `grep -c 'id="rev-camino-caseros"' index.html` → 1 (grid presente)
- ✅ 4 comentarios `<!-- CAM-1 -->` a `<!-- CAM-4 -->` en index.html líneas 2273+
- ✅ CAM-1: "El Pronunciamiento de Urquiza (1° de mayo de 1851)" — 3 fuentes citadas
- ✅ CAM-2: "La triple alianza y la campaña en la Banda Oriental (1851)" — 3 fuentes citadas
- ✅ CAM-3: "El Ejército Grande cruza el Paraná (diciembre 1851)" — 3 fuentes citadas, composición documentada per Levene (28.189 hombres)
- ✅ CAM-4: "Después de Caseros: los primeros pasos constituyentes (3 feb – 31 may 1852)" — 3 fuentes citadas

**Success criterion 2: La batalla tiene datos verificados (fuerzas, fecha, resultado) en card-hecho con fuente**
- ✅ CAM-3 contiene: "~45.000 soldados vs. ~22.000", fecha 3 de febrero de 1852, resultado y renuncia de Rosas ese mismo día
- ✅ `data-certeza="hecho"` en todas las cards CAM-1…CAM-4
- ✅ `grep -c 'data-certeza="hecho"' index.html` → 70 (≥18 requeridos)

**Success criterion 3: No duplica la card existente de Caseros en index.html**
- ✅ `grep '45.000' index.html | grep ' vs'` → 1 línea (línea 2262, card existente SP3-6)
- ✅ El texto de CAM-3 cubre la composición del Ejército Grande y el cruce del Paraná — complementa SP3-6 sin repetir sus claims centrales (mención de Caseros en CAM-3 es contexto del advance, no re-narración de la batalla)
- ✅ Anti-duplication checklist en S01-CONTENT-DRAFT.md verificado por S02 antes de integrar

**Definition of Done:**
- ✅ [x] S01: Investigación y borrador — S01-SUMMARY.md existe, verification_result: passed
- ✅ [x] S02: Integración HTML — S02-SUMMARY.md existe, verification_result: passed
- ✅ Cards sobre el camino a Caseros en index.html — 4 cards, `#rev-camino-caseros` presente
- ✅ No duplica contenido existente — anti-duplication verificado
- ✅ Sin errores JS — `node new Function()` → syntax OK

## Requirement Changes

- R001 (página web single-page): active → active — milestone añade contenido sin romper navegación; JS syntax OK; sub-nav y reveal intactos. Sin cambio de estado.
- R003 (sección 1800-1860 con Alberdi como hilo conductor): active → no cambia — el contenido de M018 cae dentro del scope de R003 (1800-1860, Caseros, proceso constituyente). R003 ya estaba validado en M003; M018 extiende la sección sin requerir re-validación del requisito completo.

## Forward Intelligence

### What the next milestone should know

- **Baseline de cards post-M018:** `data-certeza="hecho"` → 70; `class="alberdi-quote"` → 6. Cualquier verificación que use conteos absolutos debe partir de estos valores.
- **El sub-período `#rev-camino-caseros` está dentro de `#rev-1835-1852`**, que contiene también los sub-períodos SP3 (la Generación del 37), SP4 (la era de Rosas), y SP5 (Caseros existente). El nuevo bloque es el 6° sub-período dentro de `#rev-1835-1852`. Si M019 añade contenido sobre la ruptura Mitre-Urquiza (1852), el punto de inserción natural es DESPUÉS de `#rev-camino-caseros`.
- **CAM-4 no tiene imagen** — no hay imagen de dominio público verificada para el período constituyente inmediato. Si M019 o un milestone futuro quiere añadir imagen a CAM-4, debe verificar `Acuerdo_de_San_Nicolas_1852.jpg` o la litografía Carlo Penuti (ambas con nota de alternativas en S01-CONTENT-DRAFT.md).
- **La cita de Alberdi en CAM-4** es paráfrasis de *Bases* (1852), no cita directa verificada contra edición primaria. Si un milestone futuro quiere convertirla en blockquote directo, debe verificar el texto exacto contra una edición digitalizada.
- **M017 y M018 son independientes** en el HTML pero comparten el período `#rev-1835-1852`. Verificar orden de sub-períodos si M017 fue mergeado después de M018.

### What's fragile

- **Thumb URLs de Wikimedia (CAM-1, CAM-2, CAM-3)** — paths construidos via Commons API. Si Commons renombra o mueve los archivos, las imágenes se rompen. `initImageFallbacks` en `app.js` maneja degradación graceful (sin `<img>` roto visible al usuario).
- **CAM-3 imagen panorámica (2197×582 px, ratio 3.77:1)** — el inline style `object-fit: cover; object-position: center top` mitiga el problema visual, pero en viewports muy estrechos la imagen puede mostrar una franja muy delgada. Verificar en 320px si se añade nuevo contenido a esa card.
- **CAM-4 Alberdi quote** — el inline `«El pueblo que ha combatido veinte años…»` también aparece en el bloque `alberdi-quote` conector que sigue a `#rev-camino-caseros`. Es intencional (el conector da contexto de cita completa), pero un editor futuro puede marcarlo como duplicación aparente.

### Authoritative diagnostics

- `grep -c 'data-certeza="hecho"' index.html` → 70 es el baseline post-M018
- `grep -c 'class="alberdi-quote' index.html` → 6 es el conteo bloqueado
- `grep -n 'id="rev-camino-caseros"' index.html` → línea 2273 es el punto de inserción del grid
- `grep -n 'href="#rev-camino-caseros"' index.html` → línea 333 es el sub-nav link
- `node -e "try{new Function(require('fs').readFileSync('app.js','utf8'));console.log('OK');}catch(e){console.error(e.message);}"` → syntax OK

### What assumptions changed

- **Asunción original:** `en.wikipedia.org/w/api.php` es suficiente para verificar imágenes Wikimedia. **Realidad:** Retorna `missing` silencioso para archivos de Commons. Siempre usar `commons.wikimedia.org/w/api.php`.
- **Asunción original del plan:** `data-certeza="hecho"` baseline era ~14 cards. **Realidad:** Era 66 antes de M018 (milestones posteriores a M003 ya habían añadido muchas más). El threshold ≥18 del plan siempre estuvo muy por debajo del baseline real.
- **Asunción original:** `La_Batalla_de_Caseros_2.JPG` existe en Commons. **Realidad:** No existe (probablemente renombrado). El filename real es `La-batalla-de-caseros.JPG` (con guiones).

## Files Created/Modified

- `index.html` — sub-nav link `href="#rev-camino-caseros"` (línea 333) y bloque HTML de 4 cards `#rev-camino-caseros` (líneas 2272–~2560) dentro de `#rev-1835-1852`
- `.gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md` — nuevo — 4 CAM cards con estructura completa, thumburls CONFIRMADO, checklist anti-duplicación
- `.gsd/KNOWLEDGE.md` — 2 entradas nuevas: endpoint Commons vs Wikipedia; underscore/space en filenames Wikimedia. 1 entrada nueva: dot español como separador de miles en patrones grep.
- `.gsd/milestones/M018/M018-SUMMARY.md` — este archivo
