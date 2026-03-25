# S02: Integración HTML

**Goal:** Insertar las 4 cards de `S01-CONTENT-DRAFT.md` en `index.html` como nuevo sub-period `#rev-alberdi-mitre`, adaptando la estructura HTML al patrón real del codebase, y verificar que el sitio renderiza correctamente sin errores JS.
**Demo:** Abrir el sitio en el browser, navegar a `#periodo-revolucion`, scrollear hasta el nuevo sub-period "Alberdi y Mitre: Dos Proyectos de País (1848–1862)" y ver 4 cards con certeza, imágenes, cites y la nota historiográfica en Card C, sin errores en consola.

## Must-Haves

- Sub-period `#rev-alberdi-mitre` insertado en `index.html` entre `</div><!-- /#rev-1852-1860 -->` y `<!-- REVOLUCION TIMELINE:`
- 4 cards adaptadas al patrón real del codebase: `event-card__year`, `event-card__title`, sin wrappers `card-header`/`card-body`
- Card D con `data-certeza="opini&#xF3;n"` (HTML entity, per D053) y estructura `card-opinion__quote` completa
- Card C con `<p class="card-nota-historiografica">` visible (no colapsable)
- Grid container con clases `events-grid events-grid--certeza`
- Sub-period wrapper con clases `sub-period reveal reveal-fade`
- Link al sub-nav apuntando a `#rev-alberdi-mitre` (después del link `#rev-1852-1860`)
- Sin errores JS en consola
- No duplica frases de BIOG-13 ni SP4-3

## Verification

```bash
# 1. Sub-period presente en HTML
grep -c "rev-alberdi-mitre" index.html
# → ≥ 2 (ID en wrapper + cierre + sub-nav)

# 2. Certeza correcta: 3 hecho, 1 opinión (card-opinion class)
node -e "
const html = require('fs').readFileSync('index.html','utf8');
const start = html.indexOf('id=\"rev-alberdi-mitre\"');
const end = html.indexOf('/#rev-alberdi-mitre');
const block = html.slice(start, end);
const hecho = (block.match(/data-certeza=\"hecho\"/g)||[]).length;
const opinion = (block.match(/card-opinion/g)||[]).length;
console.log('hecho:', hecho, '(expected 3) | card-opinion class count:', opinion, '(expected >=1)');
"

# 3. Cites preservadas (≥4 requerido por R012)
node -e "
const html = require('fs').readFileSync('index.html','utf8');
const start = html.indexOf('id=\"rev-alberdi-mitre\"');
const end = html.indexOf('/#rev-alberdi-mitre');
const block = html.slice(start, end);
console.log('<cite> count:', (block.match(/<cite>/g)||[]).length, '(expected ≥4)');
"

# 4. card-nota-historiografica presente en el bloque
node -e "
const html = require('fs').readFileSync('index.html','utf8');
const start = html.indexOf('id=\"rev-alberdi-mitre\"');
const end = html.indexOf('/#rev-alberdi-mitre');
const block = html.slice(start, end);
console.log('card-nota-historiografica:', block.includes('card-nota-historiografica') ? 'PRESENT' : 'MISSING');
"

# 5. JS syntax OK
node -e "
try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('syntax OK'); }
catch(e) { if (e instanceof SyntaxError) console.error('SYNTAX ERROR:', e.message); else console.log('syntax OK'); }
"

# 6. Frases baneadas ausentes en el bloque nuevo
node -e "
const html = require('fs').readFileSync('index.html','utf8');
const start = html.indexOf('id=\"rev-alberdi-mitre\"');
const end = html.indexOf('/#rev-alberdi-mitre');
const block = html.slice(start, end);
const b13 = block.includes('dej\xE1ndolo en Par\xEDs sin sueldo');
const sp43 = block.includes('revoluci\xF3n encabezada por Mitre separ\xF3');
console.log('BIOG-13 phrase:', b13 ? 'FOUND (BAD)' : 'absent (OK)');
console.log('SP4-3 phrase:', sp43 ? 'FOUND (BAD)' : 'absent (OK)');
"
```

## Tasks

- [x] **T01: Integrar 4 cards en index.html como sub-period #rev-alberdi-mitre** `est:45m`
  - Why: Cierra el milestone — las 4 cards verificadas de S01 deben ser visibles en el sitio.
  - Files: `index.html`
  - Do: Ver T01-PLAN.md para pasos detallados.
  - Verify: `grep -c "rev-alberdi-mitre" index.html` retorna ≥2; todos los checks de verificación de slice pasan.
  - Done when: Sub-period visible en browser, 4 cards con certeza correcta, nota historiográfica visible, sin errores JS en consola.

## Observability / Diagnostics

**Runtime signals after insertion:**
- `grep -c "rev-alberdi-mitre" index.html` — fast sanity check: must return ≥2
- All 6 verification node scripts in the Verification section above serve as inspectable failure state
- JS syntax check (`new Function(app.js)`) surfaces any parse error introduced by editing
- Browser DevTools console: zero errors is the acceptance criterion; any JS error means app.js was corrupted or a script tag was malformed
- Network tab: 4xx on any image means the fallback URL was wrong — but missing Wikimedia images render as broken `<img>` elements, not JS errors

**Failure visibility:**
- If the `end` comment `/#rev-alberdi-mitre` is missing, `html.indexOf('/#rev-alberdi-mitre')` returns -1 and the node scripts silently slice from start to end of file, producing misleading counts → check `end > start` if scripts report unexpectedly high counts
- Cards with wrong class names (`card-year` instead of `event-card__year`) fail silently in browser — no JS error, just unstyled text; the grep/node checks catch this

**Redaction:** No secrets or PII in this slice — all content is public-domain historical text and Wikimedia Commons images.

## Files Likely Touched

- `index.html`
