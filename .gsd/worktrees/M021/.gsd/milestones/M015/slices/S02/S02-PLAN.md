# S02: Integración HTML

**Goal:** Insertar las 5 cards de la Generación del 37 en `index.html` y añadir el CSS mínimo para que `<aside class="card-nota-certeza">` tenga distinción visual.
**Demo:** La sección `#rev-generacion-37` aparece en el sitio entre `#rev-1820-1835` y `#periodo-rosas`, con 5 cards que se revelan con animación al hacer scroll, y el sub-nav link `1830–1837` activo.

## Must-Haves

- Las 5 cards (GEN37-1 a GEN37-5) están en `index.html` con `data-certeza` correcto
- El sub-nav link `#rev-generacion-37` está presente con `<span class="sub-nav__link-label">`
- `.card-nota-certeza:not(span)` tiene regla CSS (`border-left`, `padding`, `font-size`)
- `grep -c 'data-certeza=' index.html` devuelve 98 (era 93)
- No hay errores de sintaxis JS en `app.js`

## Verification

```bash
# Section and sub-nav link inserted
grep -n "rev-generacion-37" index.html
# → ≥2 matches (opening div, closing comment, plus sub-nav href)

# data-certeza count rose from 93 to 98
grep -c 'data-certeza=' index.html
# → 98

# Sub-nav link uses correct span class
grep -n "rev-generacion-37" index.html | grep "sub-nav__link-label"
# → 1 match

# No JS syntax errors
node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK'); } catch(e) { if(e instanceof SyntaxError) console.error('SYNTAX ERROR:',e.message); else console.log('OK'); }"
# → OK

# CSS rule present
grep -n "card-nota-certeza:not(span)" styles.css
# → 1 match
```

## Observability / Diagnostics

**Runtime signals:**
- `grep -c 'data-certeza=' index.html` is the canonical count check — expected 98 after S02/T01.
- `grep -n "rev-generacion-37" index.html` reveals section presence and sub-nav wiring in one command.
- `node -e "new Function(require('fs').readFileSync('app.js','utf8'))"` surfaces JS parse errors immediately.

**Inspection surfaces:**
- Browser DevTools → Elements → `#rev-generacion-37` confirms DOM structure and `data-certeza` attributes.
- Browser DevTools → Console for any scroll-reveal JS errors at runtime.
- `grep -n "card-nota-certeza:not(span)" styles.css` confirms CSS rule is present (T02).

**Failure visibility:**
- If `data-certeza` count ≠ 98, the missing/extra cards can be identified with `grep -n 'data-certeza=' index.html | tail -20`.
- If the section is missing from the DOM, `grep -n "rev-generacion-37" index.html` returns 0 lines.
- If the sub-nav link is malformed (bare `<span>`), `grep "rev-generacion-37" index.html | grep "sub-nav__link-label"` returns 0 lines.

**Redaction:** No secrets or PII involved; all content is public historical text.

## Tasks

- [x] **T01: Splice section block and sub-nav link into index.html** `est:20m`
  - Why: Inserts the complete HTML produced by S01 into the two required locations in index.html.
  - Files: `index.html`, `.gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md`
  - Do: Two Edit operations using anchor strings (not raw line numbers). Section block goes after `</div><!-- /#rev-1820-1835 -->`. Sub-nav link goes after `<a href="#rev-1820-1835" class="sub-nav__link">` line. **Critical:** sub-nav link must use `<span class="sub-nav__link-label">Generación del 37</span>` — the draft uses a bare `<span>` which is incorrect.
  - Verify: `grep -c 'data-certeza=' index.html` returns 98; `grep -n "rev-generacion-37" index.html` returns ≥3 lines.
  - Done when: `data-certeza` count is 98 and `rev-generacion-37` appears in both the section div and the sub-nav link with the correct span class.

- [x] **T02: Add CSS for card-nota-certeza block variant and run final verification** `est:15m`
  - Why: The `<aside class="card-nota-certeza">` on GEN37-3 has no CSS rule; it renders flat. Also performs final JS syntax check and browser verification.
  - Files: `styles.css`
  - Do: Insert a `.card-nota-certeza:not(span)` rule near line 1152 (after `.card-opinion` block). Rule needs `border-left: 3px solid var(--color-accent, #b08a4a)`, `padding: 0.5rem 0.75rem`, `margin: 0.75rem 0`, `font-size: 0.875rem`, `color: var(--color-text-muted, #5a5a5a)`. Then run JS syntax check and open `index.html` in browser to confirm section renders.
  - Verify: `grep -n "card-nota-certeza:not(span)" styles.css` returns 1 match; JS syntax check prints `OK`; browser shows 5 cards in the new section.
  - Done when: CSS rule is present, JS check passes, and section is visually confirmed in browser.

## Files Likely Touched

- `index.html`
- `styles.css`
