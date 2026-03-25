# S02: Formación en España, identidad criolla, logias y Granaderos

**Goal:** Integrar el contenedor `#rev-san-martin` con las primeras 6 cards del arco San Martín (Entradas 1–6 del content draft) en `index.html`, estableciendo la estructura del sub-período sobre la que S03 y S04 agregarán cards adicionales.

**Demo:** `document.querySelectorAll('#rev-san-martin .event-card').length` retorna 6 en la consola del navegador; las dos cards debatido (Entradas 3 y 4) muestran el indicador de balance-scale y la nota historiográfica visible sin necesidad de expandir; expand/collapse funciona en las 6 cards sin código JS nuevo.

## Must-Haves

- `<div id="rev-san-martin" ...>` insertado en `index.html` entre `</div><!-- /#rev-1800-1820 -->` y `<!-- CONECTOR ALBERDI — SP1 → SP2 (Pasaje 1) -->` (anchor textual exacto)
- 6 cards presentes: 4 `data-certeza="hecho"` (Entradas 1, 2, 5, 6) y 2 `data-certeza="debatido"` (Entradas 3, 4)
- `events-grid--certeza` en el grid container del sub-período
- `card-nota-historiografica` visible (fuera de `card-detail hidden`) en Entradas 3 y 4
- Imagen de Granaderos (Entrada 5) usa URL directa sin `/thumb/` — es 495px
- Imagen de San Lorenzo (Entrada 6) usa thumb 500px estándar
- Entradas 1–4 usan fallback Gil de Castro (mismo URL ya presente en index.html)
- Expand/collapse presente (`card-expand-toggle` + `card-detail hidden`) en las 6 cards
- Sin nuevo JS ni CSS
- `node -e "new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK')"` retorna `OK`

## Verification

```bash
# Sub-período existe exactamente una vez
grep -c 'id="rev-san-martin"' index.html   # → 1

# 6 nuevas cards (baseline era 93 data-certeza en index.html)
grep -c 'data-certeza' index.html          # → 99

# 2 cards debatido nuevas (baseline era 5, pasan a 7)
grep -c 'data-certeza="debatido"' index.html  # → 7

# 2 notas historiográficas nuevas
grep -c 'card-nota-historiografica' index.html  # → 14 (era 12 antes)

# Granaderos usa URL directa (sin /thumb/)
grep 'Uniformes_Granaderos' index.html | grep -v '/thumb/'  # → 1 match

# JS no corrompido
node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK'); } catch(e) { if (e instanceof SyntaxError) console.error('SYNTAX ERROR:', e.message); else console.log('OK'); }"
# → OK
```

## Observability / Diagnostics

**Runtime inspection surfaces:**
- `document.querySelectorAll('#rev-san-martin .event-card').length` en consola del navegador → 6 cuando S02 está completo, 0 si el bloque no se insertó.
- `document.querySelectorAll('#rev-san-martin .card-nota-historiografica').length` → 2 (Entradas 3 y 4); 0 si las notas se pusieron dentro de `card-detail` (fallo de posición).
- `document.querySelectorAll('#rev-san-martin [data-certeza="debatido"]').length` → 2; 0 si la codificación fue errónea.
- `document.querySelector('#rev-san-martin img[src*="Uniformes_Granaderos"]')?.src` → debe contener la URL directa sin `/thumb/`; una respuesta 404 en la imagen indica que se usó la ruta de thumb en lugar de la URL directa.

**Failure states visibles:**
- Si `#rev-san-martin` no existe, el sub-nav link `1812–1822` no tendrá target válido → scroll silencioso al top de la página.
- Si `card-nota-historiografica` está dentro de `card-detail hidden`, el texto no será visible hasta que el usuario expanda la card — inspeccionable via `document.querySelector('.card-nota-historiografica').closest('[hidden]')` (debe ser null).
- Si el Edit de index.html corrupta la estructura, el JS existente puede lanzar excepciones en la consola; verificar con `node -e "new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK')"`.

**Redacción:** No hay datos de usuario ni secretos en estas cards — son contenido histórico estático.

## Tasks

- [x] **T01: Crear e insertar bloque HTML de #rev-san-martin con 6 cards en index.html** `est:45m`
  - Why: Es el único entregable de S02 — crea el sub-período y las primeras 6 cards del arco San Martín, estableciendo la estructura sobre la que S03 y S04 van a hacer append.
  - Files: `index.html`, `.gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md` (lectura), `tmp-san-martin-s02.html` (archivo temporal)
  - Do: Ver T01-PLAN.md para pasos detallados
  - Verify: `grep -c 'id="rev-san-martin"' index.html` → 1; `grep -c 'data-certeza' index.html` → 99; `grep -c 'card-nota-historiografica' index.html` → 14; `grep 'Uniformes_Granaderos' index.html | grep -v '/thumb/'` → 1 match
  - Done when: `document.querySelectorAll('#rev-san-martin .event-card').length === 6` en consola del navegador; notas historiográficas visibles en Entradas 3 y 4; JS syntax check pasa

## Files Likely Touched

- `index.html`
