# S01: Investigación y borrador de contenido

**Goal:** Producir `S01-CONTENT-DRAFT.md` — el artefacto de handoff para S02 — con 6 cards sobre las tertulias de Mariquita Sánchez, fuentes verificadas, certeza clasificada, URLs de imágenes confirmadas, y notas de integración HTML.
**Demo:** `S01-CONTENT-DRAFT.md` existe, contiene 6 secciones (TER-1 a TER-6), cada una con título, certeza, excerpt, fuentes, cite HTML, y notas de imagen. Verificado por grep.

## Must-Haves

- `S01-CONTENT-DRAFT.md` con 6 cards completas (TER-1 a TER-6)
- Cada card tiene `certeza`, `excerpt`, `fuentes` (≥2 para hecho), y `cite HTML`
- TER-2 tiene `card-nota-historiografica` explícita (episodio del Himno)
- TER-3 tiene la URL de imagen de `File:María Sánchez de Mendeville.jpg` verificada o marcada como "verificar tamaño antes de usar"
- Mapeo de superposición con content existente documentado (sin duplicación real confirmada)
- Placement decision documentada (inserción entre `#rev-1820-1835` y `#periodo-rosas`)

## Verification

- `test -f .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md`
- `grep -c "^### Card" .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md` returns `6`
- `grep -c "card-nota-historiografica" .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md` returns `1`
- `grep -c "data-certeza" .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md` returns `6`
- `grep -c "TER-3" .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md` returns non-zero (failure path: missing TER-3 section means image verification was skipped)

## Observability / Diagnostics

- **Artifact existence:** `test -f .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md` — pass = artifact produced; fail = task incomplete.
- **Structural signals:** `grep -c "^### Card"` and `grep -c "data-certeza"` both return `6`; `grep -c "card-nota-historiografica"` returns `1`. Any other value indicates a malformed draft.
- **Image verification log:** TER-3 image dimensions are documented inline in the draft (`⚠ imagen pequeña (321×410 px)`). A future agent can re-run the Wikimedia Commons API call to confirm: `https://commons.wikimedia.org/w/api.php?action=query&titles=File:Mar%C3%ADa_S%C3%A1nchez_de_Mendeville.jpg&prop=imageinfo&iiprop=url%7Csize&format=json`.
- **Failure state:** If `S01-CONTENT-DRAFT.md` is missing or truncated, S02 cannot proceed; the grep verification checks will fail with exit code 1. No silent failure path exists — all signals are file-system observable.
- **Redaction constraints:** No secrets or credentials in this slice. All image URLs are public Wikimedia Commons links.

## Integration Closure

- Upstream surfaces consumed: `S01-RESEARCH.md` (ya completo — toda la investigación histórica está hecha)
- New wiring introduced in this slice: `S01-CONTENT-DRAFT.md` como contrato formal para S02
- What remains before the milestone is truly usable end-to-end: S02 integra las cards en `index.html`

## Tasks

- [x] **T01: Escribir S01-CONTENT-DRAFT.md desde la investigación existente** `est:45m`
  - Why: El artefacto de handoff no existe aún. S02 no puede ejecutarse sin él. `S01-RESEARCH.md` contiene todo el material; este task lo formaliza como draft estructurado listo para copy-paste en HTML.
  - Files: `.gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md`
  - Do: Escribir el archivo con las 6 cards desde `S01-RESEARCH.md`. Verificar la URL de `File:María Sánchez de Mendeville.jpg` vía Wikimedia API antes de incluirla. Marcar el resultado de esa verificación explícitamente en la card TER-3.
  - Verify: `grep -c "^### Card" .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md` returns `6`
  - Done when: El archivo existe con 6 cards completas, cada una con certeza, excerpt, fuentes, cite HTML; TER-2 contiene `card-nota-historiografica`; TER-3 tiene URL de imagen verificada o flaggeada.

## Files Likely Touched

- `.gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md` (creado)
