---
estimated_steps: 9
estimated_files: 1
---

# T02: Integrar BIOG-9, BIOG-10, BIOG-11 en index.html y actualizar el sub-período biográfico

**Slice:** S03 — Regreso a Tucumán, Alejandro Heredia y vuelta a Buenos Aires (1833–1838)
**Milestone:** M007

## Description

Integrar las tres cards biográficas de S03 en `#rev-alberdi-formacion`, actualizar el título del sub-período y el sub-nav link para reflejar el rango 1810–1838, y agregar un puente narrativo (`<blockquote class="alberdi-quote">`) al cierre del sub-período biográfico. Todo usando el patrón CRLF-safe de Node.js establecido en S01/S02.

**NO tocar `styles.css` ni `app.js`** — este es contenido HTML puro que reutiliza todos los patrones visuales existentes.

## Steps

1. **Leer `S03-CONTENT-DRAFT.md`** para obtener el texto final de BIOG-9, BIOG-10, BIOG-11 y el puente narrativo. Confirmar la certeza de cada bloque y el texto del `<cite>` de cada card.

2. **Confirmar líneas de anclaje en index.html:**
   - `grep -n "BIOG-8\|events-grid.*certeza.*aria\|/#rev-alberdi-formacion" index.html` — identificar exactamente:
     - La línea del cierre `</article>` de BIOG-8 (actualmente ~línea 542).
     - La línea de `</div><!-- /.events-grid -->` del sub-período biográfico (actualmente ~línea 543).
     - La línea de `</div><!-- /#rev-alberdi-formacion -->` (actualmente ~línea 544).
   - `grep -n "sub-period__title\|1810.*1824\|alberdi-formacion" index.html` — identificar la línea del `<h3>` con el título del sub-período y el sub-nav link.

3. **Escribir el HTML de las cards en un archivo temporal** usando la herramienta `Write` (evitar heredocs — per KNOWLEDGE.md). El archivo temp debe contener:
   - Card BIOG-9 (`card-hecho`, `--reveal-delay: 640ms`)
   - Card BIOG-10 (certeza según draft, `--reveal-delay: 720ms`)
   - Card BIOG-11 (`card-hecho`, `--reveal-delay: 800ms`)
   Seguir los templates existentes:
   - `card-hecho`: `<article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: Nms">` + `<div class="card-certeza-indicator">` + `<span class="event-card__year">` + `<h3 class="event-card__title">` + `<p class="event-card__excerpt">` + `<footer class="card-source"><cite>...</cite></footer>`.
   - `card-opinion`: `<article class="event-card card-opinion reveal reveal-slide" data-certeza="opinion" style="--reveal-delay: Nms">` + `<blockquote class="card-opinion__quote">` + `<footer class="card-opinion__attribution">` con `<strong class="card-opinion__author">` y `<span class="card-opinion__context">`.
   - Si BIOG-10 tiene parte hecho y parte opinión — elegir la certeza dominante para el `data-certeza` attribute (una sola certeza por card, per D037).
   - Incluir `<span class="card-nota-certeza">[Nota: ...]</span>` inline donde el draft lo indique.
   - Para imágenes: incluir `<div class="card-image"><img src="..." alt="..." loading="lazy"></div>` solo si hay una imagen verificada. Si no hay imagen de Heredia, omitir el bloque de imagen (las cards sin imagen son válidas).

4. **Escribir el HTML del puente narrativo en otro archivo temporal:** `<blockquote class="alberdi-quote reveal reveal-slide"><p>...</p><cite>...</cite></blockquote>` — usar el texto exacto del borrador; la cita debe ser diferente a la de línea ~676.

5. **Insertar las cards con Node.js CRLF-safe (patrón de KNOWLEDGE.md):**
   ```
   node -e "
   const fs = require('fs');
   const html = fs.readFileSync('index.html', 'utf8');
   const cards = fs.readFileSync('temp-biog-s03.html', 'utf8');
   const lines = html.split('\r\n');
   // Encontrar la línea del cierre </article> de BIOG-8
   const anchorIdx = lines.findIndex(l => l.includes('</article>') && lines[lines.indexOf(l) - 2]?.includes('Jurisprudencia'));
   // Alternativa más segura: buscar el comentario BIOG-8 primero
   const biog8CommentIdx = lines.findIndex(l => l.includes('BIOG-8:'));
   // Luego buscar el </article> siguiente desde biog8CommentIdx
   let insertIdx = biog8CommentIdx;
   while (!lines[insertIdx].trim().startsWith('</article>')) insertIdx++;
   const newLines = cards.split('\n');
   lines.splice(insertIdx + 1, 0, ...newLines);
   fs.writeFileSync('index.html', lines.join('\r\n'), 'utf8');
   console.log('Inserted at line ' + (insertIdx + 1));
   "
   ```
   **Importante:** Verificar inmediatamente con `grep -c 'data-certeza' index.html` — si no subió en 3, el splice falló y hay que diagnosticar con `grep -n 'BIOG-[89]\|BIOG-10\|BIOG-11' index.html`.

6. **Insertar el puente narrativo** entre `</div><!-- /.events-grid -->` y `</div><!-- /#rev-alberdi-formacion -->` usando el mismo patrón Node.js CRLF-safe con el archivo temp del paso 4. Verificar con `grep -n 'alberdi-quote' index.html` que el nuevo blockquote aparece DESPUÉS del de línea ~320 (el del sub-período biográfico inicial) y ANTES de `/#rev-alberdi-formacion`.

7. **Actualizar el título del sub-período:** Cambiar `<h3 class="sub-period__title">Alberdi: Los años de formación (1810–1824)</h3>` a `(1810–1838)`. Usar `sed -i` o el patrón Node.js para un reemplazo exacto — verificar con `grep "sub-period__title" index.html`.

8. **Actualizar el sub-nav link:** Cambiar el texto del link de `1810–1824` a `1810–1838` en la línea ~327. El elemento es `<a href="#rev-alberdi-formacion" class="sub-nav__link">1810–1824<span ...>`. El sub-label "Infancia y Formación" puede actualizarse a "Los años de formación" si el borrador lo sugiere, o dejarse si es coherente. Verificar con `grep "sub-nav__link" index.html | head -3`.

9. **Verificación post-integración:**
   - `grep -c 'data-certeza' index.html` ≥ 45
   - `grep 'BIOG-9\|BIOG-10\|BIOG-11' index.html | wc -l` ≥ 3
   - `grep 'Heredia' index.html | wc -l` ≥ 4
   - `grep '1810.*1838\|Los años de formación (1810–1838)' index.html | wc -l` ≥ 1
   - `git diff --name-only` — NO debe incluir `styles.css` ni `app.js`.

## Must-Haves

- [ ] 3 nuevas cards con `data-certeza`, `reveal reveal-slide`, y `--reveal-delay` correcto (640ms, 720ms, 800ms).
- [ ] Puente narrativo `<blockquote class="alberdi-quote reveal reveal-slide">` insertado DESPUÉS del grid y ANTES de `/#rev-alberdi-formacion`.
- [ ] Título del sub-período actualizado a "(1810–1838)".
- [ ] Sub-nav link actualizado a "1810–1838".
- [ ] `styles.css` y `app.js` sin modificar.
- [ ] `grep -c 'data-certeza' index.html` ≥ 45.

## Verification

- `grep -c 'data-certeza' index.html` ≥ 45.
- `grep 'BIOG-9\|BIOG-10\|BIOG-11' index.html | wc -l` ≥ 3.
- `grep '1810.*1838' index.html | wc -l` ≥ 1.
- `git diff --name-only` no incluye `styles.css` ni `app.js`.

## Inputs

- `.gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md` — output de T01; contiene el HTML-listo de cada card y el puente narrativo.
- `index.html` — estado post-S02: 42 cards `data-certeza`; BIOG-8 en línea ~517–542; `#rev-alberdi-formacion` cierra en línea ~544; sub-nav en línea ~327.
- KNOWLEDGE.md (patrón Node.js CRLF-safe): split en `\r\n`, splice, join en `\r\n`. Verificar card count inmediatamente tras cada splice.
- Templates de card existentes en index.html — reutilizar la estructura exacta de BIOG-1..BIOG-8 para consistencia visual.

## Expected Output

- `index.html` — 3 cards nuevas (BIOG-9, BIOG-10, BIOG-11) en `#rev-alberdi-formacion`; puente narrativo al cierre del sub-período; título y sub-nav actualizados a 1838; `data-certeza` count ≥ 45; reveal elements count ≥ 64 (verificable en browser en T03).

## Observability Impact

**Signals that change after T02:**

- `grep -c 'data-certeza' index.html` → increases from 42 (post-S02) to ≥ 45. If still 42, the Node.js splice missed the anchor or the file was not saved correctly.
- `grep 'BIOG-9\|BIOG-10\|BIOG-11' index.html | wc -l` → 3. If 0, the insert was not applied.
- `grep -c 'reveal reveal-slide\|reveal reveal-fade' index.html` → ≥ 65. Browser console `[Reveal] Initialized with N elements` where N ≥ 64. If N < 64, one of the new cards is missing the `reveal reveal-slide` classes.
- `grep -n 'alberdi-quote' index.html` → should show TWO blockquotes: the existing one (around line 320) and the new closing bridge inside `#rev-alberdi-formacion` (before `/#rev-alberdi-formacion`). If only one appears, the bridge was not inserted.
- `grep '1810.*1838' index.html | wc -l` → ≥ 3 (sub-period title, sub-nav link, and aria-label). If 0, the sed/Node.js update failed silently.

**Failure inspection:**
- If `grep -c 'data-certeza'` stays at 42: `grep -n 'BIOG-8\|BIOG-9' index.html` to locate insertion point; check whether anchor line used in splice was BIOG-8's `</article>` or some other element.
- If browser console shows N < 64: `document.querySelectorAll('.reveal').length` in DevTools to count; `document.querySelectorAll('#rev-alberdi-formacion [data-certeza]').length` to verify section-level count = 11.
- If 1838 not in title: `grep -n 'sub-period__title.*Alberdi' index.html` to see what's there; re-apply sed replacement.
