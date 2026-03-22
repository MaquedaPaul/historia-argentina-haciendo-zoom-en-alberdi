---
estimated_steps: 5
estimated_files: 2
---

# T02: Integrar BIOG-19 y BIOG-20 en index.html con inserción CRLF-safe

**Slice:** S06 — Quién era Facundo Quiroga y con quién estaba cuando recibió la carta
**Milestone:** M007

## Description

Insertar el bloque temático con BIOG-19 y BIOG-20 dentro del sub-período `#rev-alberdi-quiroga` existente, usando el patrón Node.js CRLF-safe establecido en S02–S05. El ancla de inserción es la línea `</div><!-- /#rev-alberdi-quiroga -->` (~línea 848 post-S05). El sub-nav NO cambia (6 links permanecen).

## Steps

1. **Pre-flight check**: ejecutar `grep -c 'id="BIOG-19"\|id="BIOG-20"' index.html` → debe ser 0. Si es >0, las cards ya están presentes — omitir inserción y saltar directamente al paso 5 de verificación.

2. Escribir el bloque completo a insertar en un archivo temp (`/tmp/s06-biog19-20.txt`) usando el `Write` tool (NO heredoc). El bloque debe incluir:
   - `<h4 class="sub-period__subtitle reveal reveal-fade" style="--reveal-delay: 0ms">Facundo Quiroga: el hombre que conoció Alberdi</h4>`
   - `<div class="events-grid events-grid--certeza" aria-label="Perfil biográfico de Facundo Quiroga">`
   - Comentario + `<article id="BIOG-19">` con todo su contenido (del draft T01)
   - Comentario + `<article id="BIOG-20">` con todo su contenido (del draft T01)
   - `</div>` (cierre del events-grid)
   
   El HTML del bloque proviene íntegramente de `S06-CONTENT-DRAFT.md` — copiar sin modificar.

3. Usar Node.js CRLF-safe para insertar:
   ```js
   const fs = require('fs');
   const content = fs.readFileSync('index.html', 'utf8');
   const lines = content.split('\r\n');
   const newBlock = fs.readFileSync('/tmp/s06-biog19-20.txt', 'utf8');
   const newLines = newBlock.split('\n').map(l => l.replace(/\r$/, ''));
   const anchor = '        </div><!-- /#rev-alberdi-quiroga -->';
   const idx = lines.findIndex(l => l === anchor);
   if (idx === -1) { console.error('ANCHOR NOT FOUND'); process.exit(1); }
   lines.splice(idx, 0, ...newLines);
   fs.writeFileSync('index.html', lines.join('\r\n'), 'utf8');
   console.log('Inserted at line', idx, '— new length:', lines.length);
   ```
   Si `ANCHOR NOT FOUND`: verificar la línea exacta con `grep -n 'rev-alberdi-quiroga' index.html` y ajustar el string de búsqueda.

4. Verificar inmediatamente:
   - `grep -c 'data-certeza' index.html` → debe ser 54 (era 52)
   - `grep -c 'id="BIOG-19"' index.html` → 1
   - `grep -c 'id="BIOG-20"' index.html` → 1
   - `grep -c 'sub-nav__link' index.html` → 6 (sin cambio)

5. Verificar ausencia de CRLF doble:
   ```bash
   node -e "const t=require('fs').readFileSync('index.html','utf8');if(t.match(/\r\r/g)){console.error('CRLF doble detectado');process.exit(1);}else{console.log('OK: sin CRLF doble');}"
   ```

## Must-Haves

- [ ] Pre-flight check ejecutado antes de insertar
- [ ] Inserción usa Node.js `split('\r\n')` / `join('\r\n')` — nunca `split('\n')`
- [ ] Ancla de inserción es `</div><!-- /#rev-alberdi-quiroga -->` — el bloque se inserta ANTES de esta línea
- [ ] `grep -c 'data-certeza' index.html` → 54 después de insertar
- [ ] `grep -c 'sub-nav__link' index.html` → 6 (sin cambio — no se añade nuevo sub-nav link)
- [ ] Sin CRLF doble

## Verification

- `grep -c 'data-certeza' index.html` → 54
- `grep -c 'id="BIOG-19"' index.html` → 1
- `grep -c 'id="BIOG-20"' index.html` → 1
- `node -e "const t=require('fs').readFileSync('index.html','utf8');if(t.match(/\r\r/g)){process.exit(1);}else{console.log('OK');}"`  → exit 0

## Observability Impact

- Signals added/changed: `data-certeza` count sube de 52 a 54; `.reveal` count sube de 73 a ≥75 (h4 + 2 cards)
- How a future agent inspects this: `grep -n 'id="BIOG-19"\|id="BIOG-20"' index.html` devuelve las líneas exactas de inserción
- Failure state exposed: `grep -c 'data-certeza' index.html` → 52 en lugar de 54 significa que la inserción no ocurrió o las cards no tienen el atributo `data-certeza`

## Inputs

- `index.html` — archivo a modificar; línea de ancla `</div><!-- /#rev-alberdi-quiroga -->` (~línea 848)
- `.gsd/milestones/M007/slices/S06/S06-CONTENT-DRAFT.md` — HTML completo de BIOG-19 y BIOG-20 producido por T01
- `.gsd/KNOWLEDGE.md` — sección "Node.js Line-Split/Splice for CRLF HTML Files" y sección "Pre-flight Check Before HTML Insertion in a Worktree"

## Expected Output

- `index.html` — modificado: bloque `<h4 class="sub-period__subtitle">` + `<div class="events-grid events-grid--certeza">` con BIOG-19 y BIOG-20 insertados dentro de `#rev-alberdi-quiroga`, antes de su cierre; `data-certeza=54`, `sub-nav=6`
