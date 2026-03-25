# S02: Integración HTML y verificación

**Goal:** Insertar las 6 cards de las tertulias de Mariquita Sánchez en `index.html` como nueva sección `#rev-tertulias-mariquita`, con sub-nav link, stagger delays correctos, y nota historiográfica en TER-2 visible.
**Demo:** Abrir `index.html` en browser, navegar a `#rev-tertulias-mariquita` desde el sub-nav, ver 6 cards con certeza classification, TER-2 con nota historiográfica visible, y consola sin errores JS.

## Must-Haves

- Nueva sección `<div id="rev-tertulias-mariquita" class="sub-period reveal reveal-fade">` insertada entre `#rev-1820-1835` y `#periodo-rosas` en `index.html`
- Sub-nav link `<a href="#rev-tertulias-mariquita">` añadido en `<nav class="sub-nav">`
- 6 cards (TER-1 a TER-6) con `data-certeza` correcto y `<cite>` con fuente real en cada una
- TER-2 incluye `<p class="card-nota-historiografica">` visible (no colapsada)
- TER-4 incluye `<span class="card-nota-certeza">` inline
- Reveal/stagger funciona al scrollear (no errores JS en consola)
- Ninguna sección existente rota

## Verification

```bash
# 1. Sección nueva existe (2 menciones: apertura div + sub-nav link)
grep -c "rev-tertulias-mariquita" index.html
# → 2

# 2. Exactamente 6 cards con data-certeza en la nueva sección
grep -A250 "id=\"rev-tertulias-mariquita\"" index.html | grep -m1 -c "data-certeza"
# Alternativa más directa — contar total de data-certeza, debe haber incrementado en 6
grep -c 'data-certeza=' index.html
# → valor previo + 6

# 3. Nota historiográfica presente (incremento de 1 sobre baseline de 7)
grep -c "card-nota-historiografica" index.html
# → 8

# 4. card-nota-certeza inline de TER-4 presente
grep -c "card-nota-certeza" index.html
# → incremento de 1 sobre baseline

# 5. Sub-nav link en sub-nav
grep -n "rev-tertulias-mariquita" index.html
# → debe mostrar 1 línea con class="sub-nav__link" y 1 línea con id="rev-tertulias-mariquita"

# 6. Sin sintaxis rota: archivo cierra correctamente
tail -10 index.html
# → debe contener </html>
```

Browser verification:
- Abrir `index.html` directamente
- Navegar a `#rev-tertulias-mariquita` via sub-nav
- 6 cards visibles, TER-2 muestra nota historiográfica en texto visible
- Consola DevTools: 0 errores JS

## Tasks

- [x] **T01: Insertar sección #rev-tertulias-mariquita en index.html y verificar** `est:45m`
  - Why: Es el único entregable del slice — escribir el HTML completo de las 6 cards usando el contenido verificado de `S01-CONTENT-DRAFT.md`, insertarlo en el punto correcto de `index.html`, agregar el sub-nav link, y confirmar que el sitio funciona correctamente.
  - Files: `index.html`
  - Do: Leer `S01-CONTENT-DRAFT.md` completo. Insertar bloque HTML de `#rev-tertulias-mariquita` (con 6 cards siguiendo los templates card-hecho/card-rumor/card-opinion) después de la línea que contiene `</div><!-- /#rev-1820-1835 -->`. Agregar sub-nav link en la línea después de `#rev-1820-1835`. Ejecutar greps de verificación. Abrir en browser y confirmar render.
  - Verify: `grep -c "rev-tertulias-mariquita" index.html` → 2; `grep -c "card-nota-historiografica" index.html` → 8; abrir en browser sin errores JS.
  - Done when: Sección visible en browser, 6 cards con certeza classification, TER-2 con nota historiográfica visible, 0 errores JS en consola.

## Observability / Diagnostics

**Runtime signals:**
- Browser console: `[DEBUG] [SubNav] Active sub-period → rev-tertulias-mariquita` — confirms IntersectionObserver registered the new section
- Browser console: `[DEBUG] [Reveal] Revealed: div#rev-tertulias-mariquita.sub-period.reveal--visible` and 6 `article.event-card.*.reveal--visible` lines — confirms stagger animations triggered
- `[DEBUG] [Images] Fallback handlers set for N card images` — N increments by 3 (TER-1, TER-2, TER-3 have images)

**Inspection surfaces:**
- `grep -c "rev-tertulias-mariquita" index.html` → ≥2 (sub-nav link + div id, plus HTML comments)
- `grep -c 'data-certeza=' index.html` → 99 (baseline 93 + 6)
- `document.getElementById('rev-tertulias-mariquita').querySelectorAll('[data-certeza]').length` → 6
- `document.querySelector('a[href="#rev-tertulias-mariquita"]').className` → includes `sub-nav__link`

**Failure visibility:**
- If section missing: `getElementById('rev-tertulias-mariquita')` returns null; sub-nav link has no target
- If wrong card count: `querySelectorAll('[data-certeza]').length` returns ≠ 6
- If nota historiográfica missing: `querySelector('.card-nota-historiografica')` returns null inside section
- Pre-existing 404: `favicon.ico` — not related to this slice

**Redaction constraints:** None — all content is public domain historical information.

## Files Likely Touched

- `index.html`
