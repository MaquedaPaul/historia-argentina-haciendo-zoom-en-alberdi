---
estimated_steps: 6
estimated_files: 1
---

# T02: Integrar sub-período #rev-alberdi-quiroga en index.html (CRLF-safe)

**Slice:** S05 — El encuentro entre Alberdi y Facundo Quiroga — la carta
**Milestone:** M007

## Description

Tomar el contenido verificado del draft (T01) e integrarlo en `index.html` como un nuevo sub-período `#rev-alberdi-quiroga` con 2 cards (BIOG-17 y BIOG-18), más un 6º link en el sub-nav. La integración usa el patrón CRLF-safe con Node.js documentado en KNOWLEDGE.md — nunca heredoc.

El archivo `index.html` usa CRLF (`\r\n`). El Node.js script debe: (1) leer el archivo con `utf8`, (2) splitear en `\r\n`, (3) hacer splice, (4) rejoinear con `\r\n` antes de escribir. Cualquier split en `\n` corrupta silenciosamente el archivo.

## Steps

1. **Pre-flight check:** `grep -c 'BIOG-1[78]\|rev-alberdi-quiroga' index.html`. Si el resultado es ≥1, el trabajo ya está aplicado — saltar al paso 6 (verificación). Si es 0, continuar.

2. **Preparar el HTML del sub-nav link:** Escribir con la herramienta Write (no heredoc) el texto del link a un archivo temp (e.g. `/tmp/s05-subnav.txt`):
   ```
           <a href="#rev-alberdi-quiroga" class="sub-nav__link">1834–1835<span class="sub-nav__link-label">Alberdi y Quiroga</span></a>
   ```
   La indentación debe coincidir con los links vecinos (10 espacios, o una tabulación — verificar con `grep -n 'sub-nav__link' index.html | head -5` para ver la indentación exacta).

3. **Preparar el HTML del sub-período completo:** Escribir con el Write tool a un archivo temp (e.g. `/tmp/s05-subperiodo.txt`) el bloque completo del sub-período, incluyendo:
   - Comentario de sección con separador `══════════`
   - `<div id="rev-alberdi-quiroga" class="sub-period reveal reveal-fade">`
   - `<h3 class="sub-period__title">Alberdi y Facundo Quiroga (1834–1835)</h3>`
   - `<div class="events-grid events-grid--certeza" aria-label="El encuentro entre Alberdi y Facundo Quiroga">`
   - **BIOG-17** (`card-hecho`, stagger 0ms): artículo con imagen de Quiroga (URL: `https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Facundo_Quiroga_por_Garc%C3%ADa_del_Molino.jpg/500px-Facundo_Quiroga_por_Garc%C3%ADa_del_Molino.jpg`), texto del encuentro y la carta, cita directa "acogió [a Alberdi] con mucha gracia", card-nota-certeza sobre el contenido de la carta de Heredia, y footer con `<cite>` que atribuye a Alberdi, *Obras Completas*, La Tribuna Nacional, Buenos Aires, 1886–1887
   - **BIOG-18** (`card-hecho`, stagger 80ms): artículo con las dos citas directas de Alberdi (conversaciones "ajenas del todo a la política" + fascinación "ese hombre extraordinario"; devolución de la "orden contra el Banco"), dos card-nota-certeza (motivos del rechazo en S07; Quiroga asesinado Barranca Yaco 16 feb. 1835), y footer con `<cite>` igual
   - Cierre del events-grid, cierre del sub-period div, comentario `<!-- /#rev-alberdi-quiroga -->`

4. **Inserción 1 — sub-nav link:** Node.js CRLF-safe script:
   ```javascript
   const fs = require('fs');
   const content = fs.readFileSync('index.html', 'utf8');
   const lines = content.split('\r\n');
   // Encontrar el índice de la línea con href="#rev-alberdi-formacion"
   const anchorIdx = lines.findIndex(l => l.includes('href="#rev-alberdi-formacion"'));
   if (anchorIdx === -1) { console.error('ANCHOR NOT FOUND'); process.exit(1); }
   const newLink = fs.readFileSync('/tmp/s05-subnav.txt', 'utf8').replace(/\n/g, '');
   lines.splice(anchorIdx + 1, 0, newLink);
   fs.writeFileSync('index.html', lines.join('\r\n'), 'utf8');
   console.log('Sub-nav link inserted after line', anchorIdx + 1);
   ```

5. **Inserción 2 — sub-período:** Segundo Node.js CRLF-safe script (ejecutar después del anterior, para que los índices de línea ya reflejen la inserción del link):
   ```javascript
   const fs = require('fs');
   const content = fs.readFileSync('index.html', 'utf8');
   const lines = content.split('\r\n');
   // Encontrar el cierre de #rev-alberdi-formacion
   const anchorIdx = lines.findIndex(l => l.includes('</div><!-- /#rev-alberdi-formacion -->'));
   if (anchorIdx === -1) { console.error('ANCHOR NOT FOUND'); process.exit(1); }
   const subperiodHtml = fs.readFileSync('/tmp/s05-subperiodo.txt', 'utf8');
   const newLines = subperiodHtml.split('\n');
   lines.splice(anchorIdx + 1, 0, ...newLines);
   fs.writeFileSync('index.html', lines.join('\r\n'), 'utf8');
   console.log('Sub-period inserted after line', anchorIdx + 1, '— total lines:', lines.length);
   ```
   Después de la inserción, eliminar los archivos temp: `rm /tmp/s05-subnav.txt /tmp/s05-subperiodo.txt`.

6. **Verificación inmediata:** `grep -c 'data-certeza' index.html` → ≥52; `grep -c 'BIOG-1[78]' index.html` → 2; `grep -c 'rev-alberdi-quiroga' index.html` → ≥2; `grep -c 'sub-nav__link' index.html` → 6.

## Must-Haves

- [ ] Pre-flight check ejecutado antes de cualquier inserción
- [ ] Ambas inserciones usan Node.js split(`\r\n`) / join(`\r\n`) — nunca heredoc, nunca split(`\n`)
- [ ] El sub-período usa la clase `reveal reveal-fade` (no solo `reveal`)
- [ ] Las 2 cards tienen `class="event-card card-hecho reveal reveal-slide"` con `data-certeza="hecho"`
- [ ] BIOG-17 tiene la imagen de Quiroga con la URL exacta ya en el sitio (línea ~904 del archivo original)
- [ ] BIOG-18 tiene exactamente 2 `<span class="card-nota-certeza">` visibles en el HTML
- [ ] `grep -c 'data-certeza' index.html` → ≥52 después de la inserción
- [ ] Archivos temp eliminados después de la inserción
- [ ] El archivo `index.html` no contiene `\r\r` (CRLF doble) — verificar con `grep -Pc '\r\r' index.html` → 0

## Verification

- `grep -c 'data-certeza' index.html` → ≥52
- `grep -c 'BIOG-1[78]' index.html` → 2
- `grep -c 'rev-alberdi-quiroga' index.html` → ≥2
- `grep -q 'orden contra el Banco\|hombre extraordinario' index.html && echo OK`
- `grep -Pc '\r\r' index.html` → 0 (sin CRLF doble)

## Inputs

- `.gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md` — texto HTML de BIOG-17 y BIOG-18 listo para copiar; stagger delays; URL de la imagen; textos de card-nota-certeza; citas directas de *Obras Completas*
- `index.html` — estado post-S04: data-certeza=50, reveal=70, sub-nav con 5 links, línea 327 con `href="#rev-alberdi-formacion"`, línea 729 con `</div><!-- /#rev-alberdi-formacion -->`

## Expected Output

- `index.html` — modificado con +1 sub-nav link (6 total) + sub-período `#rev-alberdi-quiroga` con BIOG-17 y BIOG-18; data-certeza=52, reveal=73; ~55 nuevas líneas (1 sub-nav + ~54 sub-período)
