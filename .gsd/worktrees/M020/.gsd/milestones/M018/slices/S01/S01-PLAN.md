# S01: Investigación y borrador

**Goal:** Producir `S01-CONTENT-DRAFT.md` con 4 cards verificadas sobre el proceso previo a Caseros (Pronunciamiento, alianzas, Ejército Grande, consecuencias inmediatas), con imágenes confirmadas vía Wikimedia API.
**Demo:** `S01-CONTENT-DRAFT.md` existe con exactamente 4 secciones `## CAM-N`, cada una con certeza, excerpt, ≥2 fuentes, y al menos 3 imágenes marcadas CONFIRMADO con su `thumburl` completo.

## Must-Haves

- `S01-CONTENT-DRAFT.md` con 4 cards (CAM-1 a CAM-4) estructuradas y listas para que S02 las integre en HTML
- Ningún dato de la card SP3-6 existente se repite como claim central (batalla, cifras ~45.000 vs. ~22.000, exilio de Rosas)
- Imágenes: exactamente 3 `thumburl` confirmados via Wikimedia API (CAM-1, CAM-2, CAM-3); CAM-4 sin imagen obligatoria
- Cada card-hecho tiene ≥2 fuentes; la clasificación de certeza es justificada y consistente con el sistema del sitio

## Verification

```bash
# 4 secciones CAM presentes
grep -c "^## CAM-" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md
# → 4

# Al menos 3 imágenes confirmadas con thumburl
grep -c "CONFIRMADO" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md
# → >= 3

# Draft no vacío
test -s .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md && echo OK

# Failure-path diagnostic: check for FALLO entries (any = T02 needs follow-up)
grep "FALLO" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md || echo "No FALLO entries (ok)"

# Structural health: line count should be >= 120
wc -l .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md
# → >= 120
```

## Observability / Diagnostics

**Runtime signals this slice produces:**
- `S01-CONTENT-DRAFT.md` — primary artifact; its existence and section count are the main health signal
- `grep -c "^## CAM-"` → must return 4; any other value indicates incomplete or malformed draft
- `grep -c "CONFIRMADO"` → must return ≥3; failure means image verification (T02) is incomplete
- `test -s S01-CONTENT-DRAFT.md` → non-empty file check; failure means T01 never ran or wrote an empty file

**Inspection surfaces:**
- `wc -l .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md` — line count should be ~120+; <40 lines suggests truncated write
- `grep "FALLO" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md` — any FALLO entry means a Wikimedia image lookup failed and needs manual resolution before S02 runs
- `grep "^## CAM-" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md` — lists section headers for quick structural audit

**Failure-path visibility:**
- If T02's Wikimedia API call returns empty imageinfo (common when iiprop uses comma instead of %7C), the draft will contain `FALLO` entries; S02 must not proceed with a FALLO image
- If the draft file exists but has <4 CAM sections, T01 was interrupted mid-write; the file should be treated as corrupted and T01 re-run
- Any `thumburl` in the draft that is not an `upload.wikimedia.org/…/thumb/…` URL is suspect and should be re-verified

**Redaction constraints:** No PII or secrets in this slice — all data is public historical content from Wikimedia and academic sources.

## Integration Closure

- Upstream surfaces consumed: `S01-RESEARCH.md` (hechos, fechas, fuentes, imágenes candidatas)
- New wiring introduced: `S01-CONTENT-DRAFT.md` — contrato entre S01 y S02
- What remains: S02 convierte el draft en HTML, insertar en `index.html`, sub-nav

## Tasks

- [x] **T01: Escribir S01-CONTENT-DRAFT.md con las 4 cards verificadas** `est:45m`
  - Why: Produce el artefacto contrato que S02 consume. Toda la información factual ya está verificada en S01-RESEARCH.md; esta tarea la estructura en el formato de draft estándar del proyecto.
  - Files: `.gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md`
  - Do: Crear el draft con 4 secciones `## CAM-1` … `## CAM-4`. Para cada card incluir: título, año-display, certeza (clase CSS + data-certeza), excerpt 2–4 oraciones, ≥2 fuentes citadas, nombre de imagen candidata (filename Wikimedia), y nota de posición (sub-período `#rev-camino-caseros`, insertar antes de `</div><!-- /#rev-1835-1852 -->`). Respetar todas las restricciones: no duplicar SP3-6, no usar cifras de batalla, no crear nuevas clases CSS, no nuevo blockquote alberdi-quote en CAM-4.
  - Verify: `grep -c "^## CAM-" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md` → 4
  - Done when: Archivo existe con 4 secciones CAM, cada una con título, certeza, excerpt, y fuentes.

- [x] **T02: Verificar imágenes via Wikimedia API y actualizar draft** `est:30m`
  - Why: S02 necesita `thumburl` exactos para los `<img src="...">` del HTML. Los filenames están identificados pero los URLs de thumbnail deben confirmarse antes de que S02 los use.
  - Files: `.gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md`
  - Do: Para cada una de las 3 imágenes candidatas, consultar `https://en.wikipedia.org/w/api.php?action=query&titles=File:FILENAME&prop=imageinfo&iiprop=url%7Csize&iiurlwidth=500&format=json` (usar `%7C` no coma — D052). Filenames: `Justo_J._Urquiza._Presidente_of_the_Argentine_Confederation.jpg` (CAM-1), `Batalha_dos_Santos_Logares_(3_de_fevereiro_de_1852).jpg` (CAM-2), `La_Batalla_de_Caseros_2.JPG` (CAM-3). Anotar en cada sección del draft: `thumburl` completo y `CONFIRMADO` o `FALLO` con observación. Si alguna imagen falla, buscar alternativa en Wikimedia y documentarla.
  - Verify: `grep -c "CONFIRMADO" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md` → ≥3
  - Done when: ≥3 imágenes marcadas CONFIRMADO con su `thumburl` completo en el draft; ninguna imagen en estado PENDIENTE sin resolución.

## Files Likely Touched

- `.gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md` (nuevo)
