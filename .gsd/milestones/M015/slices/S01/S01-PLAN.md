# S01: Investigación y borrador

**Goal:** Producir `S01-CONTENT-DRAFT.md` — un borrador verificado con 5 cards sobre la formación de la Generación del 37 (1830–1837) listo para ser integrado en HTML por S02.
**Demo:** El archivo `S01-CONTENT-DRAFT.md` existe, contiene las 5 cards (GEN37-1 a GEN37-5) con certeza, texto, fuente, y metadata de inserción. No hay flags `[VERIFICAR]`/`[PENDIENTE]` sin resolver. S02 puede consumir el draft directamente sin investigación adicional.

## Must-Haves

- `S01-CONTENT-DRAFT.md` con 5 cards: GEN37-1 (Echeverría regresa), GEN37-2 (círculo + caminatas), GEN37-3 (Salón Literario inaugural), GEN37-4 (dinámica generacional), GEN37-5 (Asociación de Mayo)
- Cada card tiene: ID, título, año display, certeza, excerpt (2-4 oraciones), fuente citada, y clase HTML a usar
- GEN37-3 incluye card-nota-certeza sobre discrepancia de fecha 23 vs. 26 junio 1837
- Mapa de superposición explícito: qué no duplicar de BIOG-11, SP2-4, SP3-3
- Metadata de inserción: sección ID (`#rev-generacion-37`), punto de inserción (línea 1439), sub-nav link

## Verification

- `test -f .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md`
- `grep -c "^## GEN37-" .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md` devuelve `5`
- `! grep -qi "\[VERIFICAR\]\|\[PENDIENTE\]\|TBD" .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md`

## Tasks

- [x] **T01: Escribir el borrador de contenido verificado (S01-CONTENT-DRAFT.md)** `est:45m`
  - Why: Es el único entregable de S01. La investigación ya está completa en S01-RESEARCH.md — esta tarea transforma los hechos verificados en cards estructuradas listas para HTML.
  - Files: `.gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md`
  - Do: Ver T01-PLAN.md para pasos detallados.
  - Verify: `grep -c "^## GEN37-" .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md` devuelve `5` y `! grep -qi "\[VERIFICAR\]\|\[PENDIENTE\]\|TBD" .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md`
  - Done when: El archivo existe con 5 cards completas (ID, certeza, excerpt, cite, clase HTML), sin flags sin resolver, y con la metadata de inserción para S02.

## Files Likely Touched

- `.gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md`

## Observability / Diagnostics

**Runtime signals:** S01 produces a static Markdown file — no process, no server, no runtime. Failure is observable at the file-system level.

**Inspection surfaces:**
- `test -f .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md` — confirms the artifact exists
- `grep -c "^## GEN37-" ...S01-CONTENT-DRAFT.md` — counts card headers; must return `5`
- `! grep -qi "\[VERIFICAR\]\|\[PENDIENTE\]\|TBD" ...S01-CONTENT-DRAFT.md` — confirms no unresolved research flags remain

**Failure state visibility:**
- If `grep -c` returns `< 5`: a card was omitted — cross-check against GEN37-1…GEN37-5 IDs in the file
- If the flag grep returns matches: search by line number (`grep -n`) to locate the unresolved flag and the card that contains it
- If the file is missing entirely: T01 did not complete; resume from T01-PLAN.md Step 1

**Redaction constraints:** None — this file contains no secrets, PII, or credentials. All content is public historiographic research.

**Downstream observability:** S02's HTML integration can be verified with `grep -c 'data-certeza=' index.html` (should increase by 5 from baseline 93 to 98) and `awk '/id="rev-generacion-37"/{found=1} found && /data-certeza=/{count++} found && /\/#rev-generacion-37/{print count; exit}' index.html` (should return 5).
