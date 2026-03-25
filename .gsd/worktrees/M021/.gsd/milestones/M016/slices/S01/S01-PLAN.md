# S01: Investigación y borrador

**Goal:** Producir `S01-CONTENT-DRAFT.md` con 4 cards verificadas sobre la relación Alberdi-Mitre (1848–1862), sin duplicar contenido ya existente en index.html, listo para que S02 integre al HTML.
**Demo:** `S01-CONTENT-DRAFT.md` existe con 4 secciones de card (A, B, C, D), cada una con título, certeza, fecha, HTML-ready excerpt con entities, al menos una fuente académica en `<cite>`, y sin mencionar frases ya usadas en BIOG-13 ni SP4-3.

## Must-Haves

- `S01-CONTENT-DRAFT.md` con 4 cards completas (A: Valparaíso, B: Los Debates, C: Pavón/cesación, D: polémica historiográfica)
- Cada card con `data-certeza` correcto: A=hecho, B=hecho, C=hecho (con `card-nota-historiografica`), D=opinión
- No duplicar frases de BIOG-13 ("varado en París sin sueldo") ni SP4-3 ("revolución encabezada por Mitre separó Buenos Aires de la Confederación")
- Ninguna cita directa Alberdi-Mitre fabricada — paráfrasis atribuida a fuentes secundarias solamente
- Accents encoded como HTML entities en los bloques verbatim HTML (D053): `opini&#xF3;n`, etc.

## Verification

- `test -f .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md`
- `grep -c "^## Card" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md` devuelve 4
- `grep -q "card-certeza-indicator" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md`
- `! grep -q "varado en París sin sueldo y sin regreso" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md`
- `! grep -q "revolución encabezada por Mitre separó" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md`

## Integration Closure

- Upstream surfaces consumed: ninguno (S01 no depende de ninguna otra slice de M016)
- New wiring introduced in this slice: produce `S01-CONTENT-DRAFT.md` — el único artefacto que S02 consume
- What remains before the milestone is truly usable end-to-end: S02 (integración HTML)

## Tasks

- [x] **T01: Redactar S01-CONTENT-DRAFT.md con 4 cards Alberdi-Mitre verificadas** `est:1h`
  - Why: Es el único entregable de S01. La investigación ya está completa en S01-RESEARCH.md; el executor debe traducirla a un draft estructurado con HTML-ready snippets, certeza correcta, y fuentes verificadas.
  - Files: `.gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md`
  - Do: Ver T01-PLAN.md para steps completos
  - Verify: `grep -c "^## Card" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md` devuelve 4; `! grep -q "varado en París sin sueldo y sin regreso" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md`
  - Done when: `S01-CONTENT-DRAFT.md` tiene 4 secciones `## Card`, cada una con snippet HTML completo incluyendo `data-certeza`, `<cite>` con fuente, y `card-certeza-indicator`; ninguna frase duplicada de BIOG-13 o SP4-3.

## Observability / Diagnostics

**Runtime signals:** Este slice produce un único artefacto estático (`S01-CONTENT-DRAFT.md`). No hay proceso de build ni runtime. Los "runtime signals" son los resultados de los checks de verificación.

**Inspection surfaces:**
- `grep -c "^## Card" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md` — debe retornar 4; si retorna < 4, alguna card falta o su encabezado no sigue el patrón `## Card X`.
- `grep "data-certeza" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md` — lista los valores de certeza para inspección rápida.
- `grep "card-nota-historiografica" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md` — debe aparecer en Card C; ausencia indica que la nota del debate de Pavón fue omitida.
- `grep "<cite>" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md | wc -l` — debe ser ≥ 4 (una cite por card mínimo).

**Failure visibility:**
- Si `grep -c "^## Card"` retorna < 4: el draft está incompleto; revisar si alguna card no tiene el encabezado exacto `## Card [A-D]`.
- Si los greps de frases baneadas devuelven matches: buscar si la frase aparece en checklists de documentación (no en el HTML) — los checklists deben usar nombres cortos en lugar de las frases literales.
- Si `grep -q "card-certeza-indicator"` falla: ninguna card tiene el indicator div; el HTML de alguna card está incompleto.

**Redaction constraints:** Ninguna información sensible en este artefacto. Las URLs de Wikimedia son públicas. Las fuentes académicas son citaciones estándar. No hay tokens, keys, ni PII.

**Diagnostic command de fallo-path:**
```bash
grep -n "varado en París\|revolución encabezada por Mitre separó\|El crimen de la guerra" \
  .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md
```
Si retorna líneas, las frases baneadas están en el archivo — identificar si son del HTML o de los checklists y corregir según corresponda.

## Files Likely Touched

- `.gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md`
