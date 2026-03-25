---
estimated_steps: 4
estimated_files: 2
---

# T02: Integrar BIOG-23 y BIOG-24 en index.html

**Slice:** S08 — Los escritos de Alberdi que leyó Facundo Quiroga
**Milestone:** M007

## Description

Toma el HTML del S08-CONTENT-DRAFT.md (producido en T01) y lo inserta en `index.html` usando el patrón CRLF-safe Node.js probado en S06 y S07. El bloque (h4 + events-grid con BIOG-23 + BIOG-24) se inserta ANTES de `</div><!-- /#rev-alberdi-quiroga -->`. Después de la inserción, ejecuta los cinco Capa 1 checks para confirmar integridad estructural.

**Baselines esperados al inicio de este task:**
- `grep -c 'data-certeza' index.html` → 56
- `grep -c 'sub-nav__link' index.html` → 6
- `grep -c 'BIOG-23\|BIOG-24' index.html` → 0 (si es > 0, la inserción ya está aplicada — ir directo a verificación)

## Steps

1. **Pre-flight check:** `grep -c 'BIOG-23\|BIOG-24' index.html`. Si devuelve 0, proceder. Si devuelve > 0, la inserción ya está aplicada — saltar al paso 4 (verificación Capa 1).

2. **Escribir el bloque HTML al archivo temporal:** Usar el Write tool (NO heredoc) para crear `tmp-s08-biog23-24.txt` con el bloque completo tomado del S08-CONTENT-DRAFT.md. El bloque debe comenzar con el `<h4>` y terminar con el `</div>` cierre del events-grid.

3. **CRLF-safe Node.js splice:**
   ```js
   const fs = require('fs');
   const content = fs.readFileSync('index.html', 'utf8');
   const lines = content.split('\r\n');
   const newBlock = fs.readFileSync('tmp-s08-biog23-24.txt', 'utf8');
   const newLines = newBlock.split('\n').map(l => l.replace(/\r$/, ''));
   const idx = lines.findIndex(l => l.includes('</div><!-- /#rev-alberdi-quiroga -->'));
   if (idx === -1) throw new Error('Anchor not found');
   lines.splice(idx, 0, ...newLines);
   fs.writeFileSync('index.html', lines.join('\r\n'), 'utf8');
   console.log('Done. Anchor was at line', idx + 1, '(1-based)');
   ```
   Ejecutar con `node -e "..."`. Verificar que imprime "Done." y el número de línea.

4. **Capa 1 checks (todos deben pasar):**
   - `grep -c 'data-certeza' index.html` → 58
   - `grep -c 'id="BIOG-23"' index.html` → 1
   - `grep -c 'id="BIOG-24"' index.html` → 1
   - `grep -c 'rev-alberdi-quiroga' index.html` → 3
   - `grep -c 'sub-nav__link' index.html` → 6

## Must-Haves

- [ ] Pre-flight check ejecutado antes de la inserción
- [ ] El Write tool se usa para crear `tmp-s08-biog23-24.txt` — nunca un heredoc bash
- [ ] El splice usa `split('\r\n')` (no `split('\n')`) para preservar los line endings CRLF del archivo
- [ ] Los cinco Capa 1 checks pasan tras la inserción
- [ ] Si el pre-flight devuelve > 0 (inserción ya aplicada), no se duplica el contenido — se va directo a los checks

## Verification

- `grep -c 'data-certeza' index.html` → 58

## Observability Impact

- Signals added: `data-certeza` count 56 → 58; `.reveal` elements 79 → 82 (h4 + 2 cards)
- Failure state exposed: si el count se queda en 56 tras la inserción, el anchor no fue encontrado o el splice tuvo un error silencioso — re-confirmar la cadena del anchor con `grep -n '/#rev-alberdi-quiroga' index.html` y repetir el splice

## Inputs

- `.gsd/milestones/M007/slices/S08/S08-CONTENT-DRAFT.md` — HTML completo de BIOG-23 y BIOG-24 con el bloque h4 + events-grid (producido en T01)
- `index.html` — archivo destino; línea del anchor confirmada en T01

## Expected Output

- `index.html` — BIOG-23 y BIOG-24 integradas dentro de `#rev-alberdi-quiroga`; `data-certeza` count 56 → 58; `.reveal` count 79 → 82
- `tmp-s08-biog23-24.txt` — archivo temporal de auditoría del bloque insertado
