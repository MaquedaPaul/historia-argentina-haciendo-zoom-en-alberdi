# S02: Integración HTML

**Goal:** Insertar las 4 cards verificadas de M019 (La Ruptura Mitre-Urquiza, 1852) en `index.html` y ajustar el stagger de las 5 cards SP4 existentes para mantener el efecto de cascada del grid.
**Demo:** Abrir `index.html` en el browser, scrollear a `#rev-1852-1860`, y ver las 4 nuevas cards `card-hecho` (Caseros, Acuerdo de San Nicolás, Disolución de la Legislatura, Revolución del 11 de Septiembre) antes de las cards de Alberdi/Bases, Congreso de Santa Fe, etc. — cada una con `data-certeza="hecho"`, cita textual en blockquote para Cards 2 y 3, y sin errores JS.

## Must-Haves

- 4 cards `card-hecho` insertadas en `index.html` dentro de `#rev-1852-1860 .events-grid`, antes del comentario `<!-- SP4-1 -->`
- `data-certeza="hecho"` (con comillas, sin corchetes) en las 4 cards
- Cards 2 y 3 incluyen `<blockquote class="card-opinion__quote">` con la cita textual verificada
- `--reveal-delay` de SP4-1..5 incrementados en 320ms (320ms, 400ms, 480ms, 560ms, 640ms)
- Sin errores JS en `app.js` (syntax check pasa)

## Verification

```bash
# 1. Las 4 cards M019 existen en el HTML
grep -c "M019-[1-4]" index.html   # debe ser 4

# 2. data-certeza correcto (sin corchetes)
grep -c 'data-certeza=\[hecho\]' index.html   # debe ser 0
grep -n 'data-certeza="hecho"' index.html | tail -10   # debe incluir 4 nuevas líneas

# 3. Stagger SP4 actualizado
grep -A2 "SP4-1" index.html | grep "reveal-delay"   # debe mostrar 320ms
grep -A2 "SP4-5" index.html | grep "reveal-delay"   # debe mostrar 640ms

# 4. Sin errores de sintaxis JS
node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK'); } catch(e) { if(e instanceof SyntaxError) console.error('SYNTAX ERROR:', e.message); else console.log('OK'); }"
```

## Tasks

- [x] **T01: Insertar 4 cards M019 en index.html y ajustar stagger SP4** `est:30m`
  - Why: Es la totalidad del trabajo de este slice — integrar el draft verificado de S01 en el HTML de producción y mantener el stagger visual coherente.
  - Files: `index.html`, `.gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md`
  - Do: Ver T01-PLAN.md para pasos detallados.
  - Verify: `grep -c "M019-[1-4]" index.html` → 4; `grep -c 'data-certeza=\[hecho\]' index.html` → 0; `grep -A2 "SP4-1" index.html | grep "reveal-delay"` → 320ms; node syntax check → OK
  - Done when: Las 4 verificaciones de arriba pasan y el browser muestra las 4 cards en `#rev-1852-1860` antes de las cards de Alberdi.

## Observability / Diagnostics

**Runtime signals:** The 4 new cards use `class="reveal reveal-slide"` — the `IntersectionObserver` in `app.js` adds the `is-visible` class when each card enters the viewport. If cards don't animate in, check DevTools → Elements for the `is-visible` class on `.reveal` elements in `#rev-1852-1860`.

**Inspection surfaces:**
- `grep -c "M019-[1-4]" index.html` — confirms 4 cards are present (expected: 4)
- `grep -n 'data-certeza="hecho"' index.html` — lists all hecho cards with line numbers
- Browser DevTools → Elements → search `#rev-1852-1860` → inspect `.events-grid` children order
- Browser DevTools → Console — no errors expected; any `img` 404s appear as network warnings, not JS errors

**Failure visibility:**
- If a card image 404s, `app.js`'s `onerror` handler hides the `.card-image` div (observable in Elements panel)
- If `data-certeza` is malformed, the `.card-certeza-indicator` will still render but the CSS filter won't apply the correct tint — visible as wrong background color
- Stagger regression: if SP4-1 still shows `0ms`, the cascade will overlap the 4 new cards; check via `grep -A3 "SP4-1" index.html | grep "reveal-delay"`

**Redaction constraints:** No secrets or PII in this slice. All content is public-domain historical text and Wikimedia Commons images.

## Files Likely Touched

- `index.html`
