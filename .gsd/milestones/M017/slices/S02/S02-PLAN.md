# S02: Integración HTML

**Goal:** Insertar la sección "Urquiza: Perfil y Trayectoria" en `index.html` — 6 cards verificadas con certeza, fuentes y 4 imágenes — visible en el sitio.
**Demo:** `grep -c 'data-id="URQ-' index.html` devuelve 6; `grep -c 'sub-nav__link' index.html` devuelve 8; `grep -c 'id="rev-urquiza-perfil"' index.html` devuelve 1; sin errores JS en app.js.

## Must-Haves

- Sub-nav tiene 8 links (nuevo: `href="#rev-urquiza-perfil"`)
- `<div id="rev-urquiza-perfil">` insertado inmediatamente antes de `<!-- /#rev-1835-1852 -->`
- 6 cards URQ-1–URQ-6 con `data-id`, `data-certeza`, y `class` correctos
- URQ-5 usa `data-certeza="debatido"` con class `card-opinion` y certeza-icon ⚖
- URQ-6 usa `data-certeza="opini&#xF3;n"` (entidad HTML) con class `card-opinion` y certeza-icon 💬
- URQ-3 excerpt preserva `<span class="card-nota-certeza">` inline
- URQ-6 NO añade nuevo `<blockquote>` de Alberdi (ya existe en línea ~2274–2276)
- Sin errores de sintaxis JS en app.js

## Verification

```bash
# 1. Sub-nav count = 8
grep -c 'sub-nav__link' index.html

# 2. Nueva sección presente (exactamente 1 vez)
grep -c 'id="rev-urquiza-perfil"' index.html

# 3. 6 cards URQ presentes
grep -c 'data-id="URQ-' index.html

# 4. URQ-5 debatido
grep -c 'data-id="URQ-5"' index.html

# 5. URQ-6 opinión con entidad HTML
grep 'opini&#xF3;n' index.html | grep -c 'URQ-6'

# 6. card-nota-certeza inline en URQ-3
grep -A5 'URQ-3' index.html | grep -c 'card-nota-certeza'

# 7. Anchor /#rev-1835-1852 intacto
grep -c '/#rev-1835-1852' index.html

# 8. Sin errores JS
node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK'); } catch(e) { if(e instanceof SyntaxError) console.error('SYNTAX:', e.message); else console.log('OK'); }"
```

Todos los checks deben devolver el valor esperado (1, 1, 6, 1, 1, 1, 1, "OK") antes de marcar S02 como completo.

## Tasks

- [x] **T01: Build and splice Urquiza HTML block into index.html** `est:45m`
  - Why: Es la entrega completa de S02 — insertar las 6 cards y el sub-nav link que hacen visible la sección Urquiza en el sitio.
  - Files: `index.html`, `.gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md`
  - Do: Construir el bloque HTML completo del sub-período (wrapper + 6 cards) en un archivo temporal `.gsd/tmp/urquiza-cards.html`; aplicar Edit 1 (sub-nav, 8° link); aplicar Edit 2 (body, insertar antes de `<!-- /#rev-1835-1852 -->`); ejecutar los 8 checks de verificación.
  - Verify: `grep -c 'data-id="URQ-' index.html` → 6; `grep -c 'sub-nav__link' index.html` → 8
  - Done when: Los 8 checks de verificación del slice pasan todos con el valor esperado.

## Observability / Diagnostics

This slice makes changes exclusively to static HTML — there is no runtime backend, no JS logic, and no async paths. Inspection surfaces are:

- **Grep-based structural checks** (see Verification section) — can be re-run at any time to confirm card count, section presence, and anchor integrity.
- **Browser DevTools → Elements panel** — inspect `#rev-urquiza-perfil` sub-period, cards `[data-id^="URQ-"]`, and sub-nav `[href="#rev-urquiza-perfil"]`.
- **JS syntax check** — `node -e "new Function(require('fs').readFileSync('app.js','utf8'))"` confirms no JS was inadvertently broken.
- **Failure state** — if edits are partially applied, `grep -c 'data-id="URQ-' index.html` will return a count < 6; `grep -c '/#rev-1835-1852' index.html` returning 0 means the closing anchor was clobbered.
- **Redaction:** No secrets or PII are involved; all content is public-domain historical text and Wikimedia Commons images.

> **Shell quoting caveat (documented in KNOWLEDGE.md):** On Windows/Git Bash, `grep 'opini&#xF3;n'` fails because `&` is a shell metacharacter. Use `node -e` or `$'...\x26...'` ANSI-C quoting to match literal HTML entities in grep patterns. Correct verification: `node -e "const fs=require('fs');const l=fs.readFileSync('index.html','utf8').split('\n');console.log(l.filter(x=>x.includes('opini&#xF3;n')&&x.includes('URQ-6')).length);"`. Similarly, `grep -A5 'URQ-3'` is insufficient — the `card-nota-certeza` span appears 10+ lines after the article opening tag; use `-A15` or node.

## Files Likely Touched

- `index.html`
