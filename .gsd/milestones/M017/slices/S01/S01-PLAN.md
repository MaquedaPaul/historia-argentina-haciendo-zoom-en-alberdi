# S01: Investigación y borrador

**Goal:** Producir `S01-CONTENT-DRAFT.md` con 6 cards verificadas sobre Urquiza (URQ-1 a URQ-6), listas para que S02 las integre en `index.html`. Cada card tiene certeza asignada, fuentes citadas, texto de excerpt, y URLs de imágenes confirmadas o marcadas.
**Demo:** El archivo `.gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md` existe, contiene 6 secciones (URQ-1 a URQ-6), y la sección de imágenes tiene las URLs de Wikimedia verificadas vía API para las dos imágenes pendientes (Palacio San José y daguerrotipo Fredricks).

## Must-Haves

- `S01-CONTENT-DRAFT.md` con 6 cards estructuradas (URQ-1 a URQ-6)
- Certeza correcta por card: URQ-1/2/3/4 = hecho, URQ-5 = debatido, URQ-6 = opinión
- Cada card-hecho con ≥2 fuentes citadas
- URLs Wikimedia verificadas vía API para Palacio San José y daguerrotipo Fredricks (2 imágenes pendientes)
- Sin inventar citas directas — paráfrasis atribuidas claramente marcadas como tal
- Sin duplicar contenido ya en index.html (cita Alberdi línea 2274–2276 no repetida)

## Verification

- `test -f .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md`
- `grep -c "^## URQ-" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md` devuelve 6
- `grep -c "data-certeza=" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md` devuelve ≥6
- `grep "thumburl\|thumb_url\|URL confirmada\|CONFIRMADO" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md` muestra al menos 2 URLs/filenames confirmados para imágenes pendientes

## Integration Closure

- Upstream surfaces consumed: `S01-RESEARCH.md` (hechos verificados, fuentes, estructura de cards)
- New wiring introduced: `S01-CONTENT-DRAFT.md` es el único output — insumo directo de S02
- What remains before the milestone is truly usable end-to-end: S02 integra el draft en index.html como sub-período `#rev-urquiza-perfil`

## Tasks

- [x] **T01: Escribir borrador de 6 cards Urquiza en S01-CONTENT-DRAFT.md** `est:45m`
  - Why: Produce el artefacto principal del slice — el borrador verificado que S02 consumirá directamente para generar HTML.
  - Files: `.gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md`
  - Do: Crear el archivo con 6 secciones (URQ-1 a URQ-6), cada una con: título, certeza, fecha display, excerpt (2–4 oraciones), fuentes (≥2 para hecho), atribución de citas, notas de imagen. Usar los hechos verificados de S01-RESEARCH.md. Para URQ-5 usar paráfrasis atribuidas (no cita directa inventada). Para URQ-6 no repetir la cita Alberdi ya en línea 2274–2276. Marcar imágenes pendientes como `[URL-PENDIENTE-VERIFICAR]` para que T02 las complete.
  - Verify: `grep -c "^## URQ-" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md` devuelve 6
  - Done when: El archivo existe con 6 secciones URQ-1 a URQ-6, cada una con certeza, excerpt, y fuentes.

- [x] **T02: Verificar URLs Wikimedia vía API y patchear el draft** `est:20m`
  - Why: S02 necesita URLs de imagen válidas y estables. El daguerrotipo Fredricks y Palacio San José no están en uso en el sitio actualmente — sus URLs exactas deben confirmarse antes de pasarlas a S02.
  - Files: `.gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md`
  - Do: Usar la API de Wikimedia Commons (`/w/api.php?action=query&titles=File:NOMBRE&prop=imageinfo&iiprop=url,size&iiurlwidth=500`) para confirmar thumburls de: (1) `Daguerrotipo_de_Justo_José_de_Urquiza_(recorte).jpg`, (2) `Palacio_San_José_(Entre_Ríos).jpg`. Si algún filename no existe, usar `list=search&srnamespace=6` para encontrar el nombre correcto. Las imágenes ya en uso (`Justo_José_de_Urquiza.jpg` línea 1636, `Justo_José_de_Urquiza_(retrato).jpg` línea 2328) no necesitan re-verificación. Reemplazar los marcadores `[URL-PENDIENTE-VERIFICAR]` en el draft con las URLs confirmadas o con el filename correcto si el original era incorrecto.
  - Verify: `grep "\[URL-PENDIENTE-VERIFICAR\]" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md` devuelve 0 líneas
  - Done when: Todas las URLs de imagen en el draft están confirmadas o marcadas explícitamente como `[NO-DISPONIBLE-EN-COMMONS]` si no existe la imagen.

## Files Likely Touched

- `.gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md` (creado por T01, patcheado por T02)

## Observability / Diagnostics

**Runtime signals produced by this slice:**
- `S01-CONTENT-DRAFT.md` is the primary artifact — its existence and content are the sole runtime surface. No server processes, background jobs, or browser state are involved.
- `[URL-PENDIENTE-VERIFICAR]` markers in the draft are the "pending" signal visible to T02 and future agents. `grep "\[URL-PENDIENTE-VERIFICAR\]" S01-CONTENT-DRAFT.md` tells the current verification state at a glance.
- `[PARÁFRASIS — NO USAR COMO CITA DIRECTA]` markers are the epistemic-integrity signal — `grep "PARÁFRASIS" S01-CONTENT-DRAFT.md` shows all attributions that need upgrade before going to production HTML.

**Inspection surfaces:**
- `grep -c "^## URQ-" S01-CONTENT-DRAFT.md` → card count (expect 6)
- `grep -c "data-certeza=" S01-CONTENT-DRAFT.md` → certeza annotation count (expect ≥6)
- `grep "URL-PENDIENTE" S01-CONTENT-DRAFT.md` → unresolved image URLs (expect 0 after T02)
- `grep "PARÁFRASIS" S01-CONTENT-DRAFT.md` → attributed paraphrases (non-zero is correct during draft phase)

**Failure visibility:**
- If T01 fails mid-write (tool error), the file may be absent or truncated. `test -f S01-CONTENT-DRAFT.md && wc -l S01-CONTENT-DRAFT.md` surfaces this.
- If T02 Wikimedia API calls fail, URLs remain as `[URL-PENDIENTE-VERIFICAR]` — visible via grep, not silently wrong.
- A "silent bad state" would be a direct quote presented as paraphrase without the `[PARÁFRASIS]` marker. The Alberdi Quote Verification Protocol (KNOWLEDGE.md) is the process control for this.

**Redaction constraints:** No secret data in this slice. All content is public-domain historical research. No env vars needed.

**Failure-path diagnostic check:**
- `grep -c "\[URL-PENDIENTE-VERIFICAR\]" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md` — after T02 this must return 0; a non-zero result indicates a Wikimedia API failure or missing T02 execution. This is the primary inspectable failure state for this slice.
