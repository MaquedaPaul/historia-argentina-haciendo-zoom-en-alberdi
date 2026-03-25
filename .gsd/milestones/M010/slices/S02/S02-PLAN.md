# S02: Integración HTML — cards en index.html

**Goal:** Integrar las 11 cards de la Semana de Mayo (7 day-by-day + 3 temáticas + 1 nota historiográfica) en `index.html`, dentro del sub-período `#rev-1800-1820`, inmediatamente después de SP1-1 (la card panorámica existente) y antes de SP1-2.
**Demo:** Abriendo `index.html` en el navegador, en la sección "Revolución e Independencia (1800–1820)" se ven primero la card panorámica SP1-1 (intacta), luego 11 cards nuevas con certeza correcta, imágenes cargadas, citas de fuente, y animación reveal-on-scroll funcionando para cada una. No hay CSS ni JS nuevo. La card SP1-1 sigue intacta.

## Must-Haves

- Las 11 cards están integradas en el `events-grid` de `#rev-1800-1820`, después de SP1-1 y antes de SP1-2
- Cada card tiene: clase `card-hecho` o `card-opinion`, atributo `data-certeza` correcto, `card-certeza-indicator` con icono y label apropiados, imagen con `<img src>` verificada (o fallback styled si imagen no disponible), `<span class="event-card__year">`, `<h3 class="event-card__title">`, `<p class="event-card__excerpt">`, `<footer class="card-source"><cite>`
- Las 5 cards `debatido` usan `class="event-card card-opinion"` con `data-certeza="debatido"` y `card-certeza-label="Debatido historiográficamente"` — per D052/D058 y el patrón establecido en el codebase existente
- La Card Temática 4 (debate historiográfico) incluye `<p class="card-nota-historiografica">` — per D052/D058 y KNOWLEDGE.md
- Todas las cards tienen `class="reveal reveal-slide"` y `style="--reveal-delay: Nms"` con delays en incrementos de 80ms comenzando desde 80ms (SP1-1 permanece en 0ms; SP1-2 a SP1-5 se retrasan correlativamente)
- SP1-1 no fue modificada
- No se introdujo CSS ni JS nuevo
- El sistema reveal-on-scroll funciona (clases heredadas automáticamente por el IntersectionObserver existente)

## Verification

```bash
# 1. Las 11 nuevas cards están en el archivo
node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.slice(h.indexOf('<!-- SP1-1:'),h.indexOf('<!-- SP1-2:')); console.log('New cards between SP1-1 and SP1-2:', (m.match(/article class=\"event-card/g)||[]).length-1)" 
# Expected: 11

# 2. Las cards tienen data-certeza distribuidos correctamente (5 hecho + 5 debatido + 1 en nota historiográfica)
node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.slice(h.indexOf('<!-- SP1-1:'),h.indexOf('<!-- SP1-2:')); console.log('hecho:', (m.match(/data-certeza=\"hecho\"/g)||[]).length); console.log('debatido:', (m.match(/data-certeza=\"debatido\"/g)||[]).length);"
# Expected: hecho: 6 (SP1-1 + 5 new), debatido: 5

# 3. card-nota-historiografica presente en el rango
node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.slice(h.indexOf('<!-- SP1-1:'),h.indexOf('<!-- SP1-2:')); console.log('card-nota-historiografica:', (m.match(/card-nota-historiografica/g)||[]).length);"
# Expected: >= 1

# 4. Todos los img src apuntan a URLs absolutas (no placeholders vacíos)
node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.slice(h.indexOf('<!-- SP1-1:'),h.indexOf('<!-- SP1-2:')); const imgs=[...m.matchAll(/img src=\"([^\"]+)\"/g)].map(x=>x[1]); console.log('Images:',imgs);"
# Expected: each URL starts with https:// (or is a fallback styled container)

# 5. SP1-1 intacta — título no cambió
grep -q "El Cabildo Abierto y la Revolución de Mayo" index.html && echo "SP1-1 title intact"

# 6. Sin CSS ni JS nuevo
git diff --name-only HEAD 2>/dev/null | grep -v "index.html" | grep -q "styles.css\|app.js" && echo "FAIL: CSS/JS modified" || echo "PASS: No CSS/JS changes"
```

## Tasks

- [x] **T01: Verificar URLs de imágenes Wikimedia para las 11 cards** `est:45m`
  - Why: S01 marcó todas las URLs de Wikimedia como `[FUENTE PENDIENTE]` — no se puede integrar `<img src>` sin verificar las URLs de thumbs 500px via API o confirmar que la URL base es correcta. KNOWLEDGE.md documenta que construir paths de thumbnail directamente falla por los hashes MD5. Este task produce el manifiesto de imágenes verificadas que T02 consume mecánicamente.
  - Files: `.gsd/milestones/M010/slices/S02/tasks/T01-IMAGE-MANIFEST.md` (nuevo)
  - Do: Para cada una de las 8 imágenes candidatas del draft (Cisneros, Saavedra, Belgrano, Cabildo Abierto, Plaza de Mayo, Moreno, Belgrano alternativa, Cabildo exterior), query la Wikimedia API con `prop=imageinfo&iiprop=url&iiurlwidth=500`. Resolver fallbacks para los casos sin imagen verificada (French/Berutti, imagen debate historiográfico). Escribir el manifiesto con: card ID → `<img src>` URL final → alt text.
  - Verify: `test -f .gsd/milestones/M010/slices/S02/tasks/T01-IMAGE-MANIFEST.md && grep -c "^|" .gsd/milestones/M010/slices/S02/tasks/T01-IMAGE-MANIFEST.md | awk '{if($1>=8) print "PASS"; else print "FAIL"}'`
  - Done when: El manifiesto existe y tiene ≥8 filas con URL verificada o fallback explícito para cada card que tiene imagen en el draft

- [x] **T02: Integrar las 11 cards en index.html usando el manifiesto de imágenes** `est:90m`
  - Why: Esta es la entrega principal del slice — las 11 cards del draft de S01 escritas en HTML siguiendo los patrones del codebase existente, con imágenes verificadas del manifiesto T01, certeza correcta, y stagger delays coherentes.
  - Files: `index.html`
  - Do: Leer el manifiesto de T01, leer el draft S01-CONTENT-DRAFT.md, escribir las 11 cards como HTML entre SP1-1 y SP1-2. Actualizar los `--reveal-delay` de SP1-2 a SP1-5 para continuar la secuencia (SP1-1=0ms, nuevas cards=80ms…960ms, SP1-2+=1040ms en adelante). Ver especificaciones exactas en T02-PLAN.md.
  - Verify: `node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.slice(h.indexOf('<!-- SP1-1:'),h.indexOf('<!-- SP1-2:')); console.log((m.match(/article class=\"event-card/g)||[]).length-1)" | grep -q "11" && echo "PASS" || echo "FAIL"`
  - Done when: `index.html` contiene 11 nuevas cards entre SP1-1 y SP1-2, con certeza correcta, imágenes, citas, reveal-on-scroll wired, y SP1-1 intacta

## Observability / Diagnostics

**Runtime signals:**
- After T02 integrates cards, open `index.html` in browser → DevTools Network tab → filter by `upload.wikimedia.org` — all image requests should return HTTP 200. Any 4xx indicates a broken image URL from the manifest.
- `document.querySelectorAll('.card-nota-certeza')` in DevTools console returns any unresolved epistemic flags left visible in rendered HTML.
- `document.querySelectorAll('.card-nota-historiografica')` confirms the historiographic note is present in the DOM (expected count: ≥1).
- Scroll spy and reveal system: open DevTools Console — no JS errors on scroll should appear. The IntersectionObserver wires up new cards automatically; if a card never gains `reveal--visible`, check that `class="reveal reveal-slide"` is present on the `<article>` element.

**Inspection surfaces:**
- `T01-IMAGE-MANIFEST.md` is the single source of truth for image URLs. Inspect it to understand why any image is broken or missing before touching `index.html`.
- `grep -n "img src" index.html` lists all image src attributes after T02 — each should be a `https://upload.wikimedia.org/...` URL.
- `grep -n "card-image" index.html` lists card-image blocks; cards intentionally without images (Temática 4) will be absent.

**Failure visibility:**
- Broken image → browser renders `alt` text + broken-image icon. The `initImageFallbacks` function in `app.js` catches these and applies a styled fallback class — visible as a gray placeholder box.
- Missing `data-certeza` attribute → certeza filter in the UI shows the card as unclassified. Check with `document.querySelectorAll('[data-certeza]')` after page load.
- Missing `reveal reveal-slide` class → card appears immediately without scroll animation (not a functional failure, but a visual regression). Check with `document.querySelectorAll('article.event-card:not(.reveal)')`.

**Redaction constraints:** No personal data in these cards. Wikimedia image URLs are public. No secrets or env vars involved.

## Verification (with diagnostic failure-path checks)

```bash
# 1. Las 11 nuevas cards están en el archivo
node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.slice(h.indexOf('<!-- SP1-1:'),h.indexOf('<!-- SP1-2:')); console.log('New cards between SP1-1 and SP1-2:', (m.match(/article class=\"event-card/g)||[]).length-1)" 
# Expected: 11

# 2. Las cards tienen data-certeza distribuidos correctamente (5 hecho + 5 debatido + 1 en nota historiográfica)
node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.slice(h.indexOf('<!-- SP1-1:'),h.indexOf('<!-- SP1-2:')); console.log('hecho:', (m.match(/data-certeza=\"hecho\"/g)||[]).length); console.log('debatido:', (m.match(/data-certeza=\"debatido\"/g)||[]).length);"
# Expected: hecho: 6 (SP1-1 + 5 new), debatido: 5

# 3. card-nota-historiografica presente en el rango
node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.slice(h.indexOf('<!-- SP1-1:'),h.indexOf('<!-- SP1-2:')); console.log('card-nota-historiografica:', (m.match(/card-nota-historiografica/g)||[]).length);"
# Expected: >= 1

# 4. Todos los img src apuntan a URLs absolutas (no placeholders vacíos)
node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.slice(h.indexOf('<!-- SP1-1:'),h.indexOf('<!-- SP1-2:')); const imgs=[...m.matchAll(/img src=\"([^\"]+)\"/g)].map(x=>x[1]); console.log('Images:',imgs);"
# Expected: each URL starts with https:// (or is a fallback styled container)

# 5. SP1-1 intacta — título no cambió
grep -q "El Cabildo Abierto y la Revolución de Mayo" index.html && echo "SP1-1 title intact"

# 6. Sin CSS ni JS nuevo
git diff --name-only HEAD 2>/dev/null | grep -v "index.html" | grep -q "styles.css\|app.js" && echo "FAIL: CSS/JS modified" || echo "PASS: No CSS/JS changes"

# 7. DIAGNÓSTICO — si las verificaciones 1-4 fallan: inspeccionar el rango SP1-1..SP1-2
node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.slice(h.indexOf('<!-- SP1-1:'),h.indexOf('<!-- SP1-2:')); console.log('Range length (chars):', m.length); console.log('article tags found:', (m.match(/<article/g)||[]).length);"
# Si range length < 500, el marcador SP1-1 o SP1-2 puede estar mal nombrado
```

## Files Likely Touched

- `index.html`
- `.gsd/milestones/M010/slices/S02/tasks/T01-IMAGE-MANIFEST.md` (nuevo)
