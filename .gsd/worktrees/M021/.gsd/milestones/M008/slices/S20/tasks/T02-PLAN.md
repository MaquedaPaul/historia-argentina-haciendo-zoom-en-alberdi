---
estimated_steps: 6
estimated_files: 4
---

# T02: Escribir temp HTML, hacer backup, y splicear cards en index.html

**Slice:** S20 — Lo del 29 — el fusilamiento de Dorrego y la crisis de 1829
**Milestone:** M008

## Description

Tomar el HTML de ambas cards del archivo `S20-CONTENT-DRAFT.md` (producido en T01), escribirlo a un temp file, hacer backup de `index.html`, y splicear las dos cards ANTES del append marker usando Node.js. El resultado: `data-certeza` avanza de 84 a 86, los dos cards S20-1 y S20-2 están en la página, el marker permanece intacto, y cero CSS/JS nuevos.

**Pattern:** Write tool para el temp file (no heredoc), Node.js para el splice, substring ASCII-only para encontrar el marker.

## Steps

1. **Verificar precondición: S20-CONTENT-DRAFT.md existe.** Si NO existe, autorarlo como prerequisito usando el contenido del bloque `## T02 Recipe` de T01-PLAN.md (ver sección Inputs). Solo continuar al paso 2 una vez que el draft exista y tenga contenido.

2. **Verificar precondiciones de index.html:**
   ```bash
   grep -c 'data-certeza' index.html          # debe ser 84
   grep -c 'cards will be appended here' index.html  # debe ser 1
   grep -c 'data-id="S20-' index.html         # debe ser 0 (cards no están todavía)
   ```

3. **Preparar directorio temp:**
   ```bash
   mkdir -p C:/tmp
   ```

4. **Escribir temp file** usando el Write tool (no heredoc) con el HTML verbatim de ambas cards. El HTML debe provenir del bloque T02 Recipe del draft. Escribir a `C:/tmp/s20-cards.html`. El contenido debe ser exactamente las dos cards sin texto circundante — solo los dos `<article>` elements con sus comentarios HTML precedentes.

5. **Backup de index.html:**
   ```bash
   cp index.html C:/tmp/index.html.bak-s20
   test -s C:/tmp/index.html.bak-s20 && echo BACKUP_OK
   ```

6. **Node.js splice** — insertar las cards ANTES del append marker:
   ```bash
   node -e "
   const fs = require('fs');
   const idx = fs.readFileSync('index.html', 'utf8');
   const cards = fs.readFileSync('C:/tmp/s20-cards.html', 'utf8');
   const MARKER = 'cards will be appended here by subsequent slices';
   const lines = idx.split('\n');
   const markerLine = lines.findIndex(l => l.includes(MARKER));
   if (markerLine === -1) { console.error('MARKER NOT FOUND'); process.exit(1); }
   lines.splice(markerLine, 0, cards);
   fs.writeFileSync('index.html', lines.join('\n'), 'utf8');
   console.log('Spliced at line', markerLine);
   "
   ```

## Must-Haves

- [ ] `C:/tmp/s20-cards.html` escrito con Write tool (no heredoc).
- [ ] Backup `C:/tmp/index.html.bak-s20` existe y tiene contenido (`test -s` pasa).
- [ ] El splice usa el substring ASCII-only `cards will be appended here by subsequent slices` — sin en-dash, sin caracteres non-ASCII.
- [ ] `grep -c 'data-certeza' index.html` = 86 tras el splice.
- [ ] `grep -c 'data-id="S20-1"' index.html` = 1.
- [ ] `grep -c 'data-id="S20-2"' index.html` = 1.
- [ ] `grep -c 'cards will be appended here' index.html` = 1 (marker intacto).
- [ ] `git diff --name-only HEAD -- styles.css app.js` retorna vacío.

## Verification

```bash
grep -c 'data-certeza' index.html                    # → 86
grep -c 'data-id="S20-1"' index.html                 # → 1
grep -c 'data-id="S20-2"' index.html                 # → 1
grep -c 'cards will be appended here' index.html     # → 1
git diff --name-only HEAD -- styles.css app.js       # → (vacío)
test -s C:/tmp/index.html.bak-s20 && echo BACKUP_OK  # → BACKUP_OK
```

Ejecutar todos los checks en orden y reportar cada resultado. Si alguno falla, usar el backup: `cp C:/tmp/index.html.bak-s20 index.html` y diagnosticar antes de reintentar.

## Inputs

- `.gsd/milestones/M008/slices/S20/S20-CONTENT-DRAFT.md` — producido en T01. Contiene el bloque `## T02 Recipe` con HTML entity-encoded listo para copiar.
- `index.html` — splice target; append marker en línea ~1933 (verificar con `grep -n 'cards will be appended here' index.html` — el número exacto puede haber variado).
- **Si S20-CONTENT-DRAFT.md no existe:** Usar el contenido del bloque "T02 Recipe" de T01-PLAN.md como fallback para autorarlo directamente (per KNOWLEDGE.md: T01 auto-stub gap pattern). Las dos cards son:
  - **S20-1** (`card-hecho`, `data-certeza="hecho"`, `data-id="S20-1"`, `--reveal-delay: 0ms`): imagen `Dorrego-fusilamiento.jpg` 500px thumb, año 1828, título sobre la Convención de Paz con Brasil y la vulnerabilidad de Dorrego, fuentes: Lynch cap. 3, Saldías t. I, Goldman/Salvatore 1998, Convención Preliminar 27 ago 1828.
  - **S20-2** (`card-opinion`, `data-certeza="opini&#xF3;n"`, `data-id="S20-2"`, `--reveal-delay: 80ms`): imagen `Juan_Lavalle.jpg` 500px thumb, año 1828-1829, título sobre la "línea de sangre" como ruptura fundacional, fuentes: Saldías 1892, Halperín Donghi 1972, Lynch cap. 3. Icono `&#x1F4AC;`, label `Interpretaci&#xF3;n historiogr&#xE1;fica`.

## Expected Output

- `index.html` — modificado con S20-1 y S20-2 spliceadas antes del append marker; `data-certeza` 84→86.
- `C:/tmp/s20-cards.html` — temp snippet (no committed).
- `C:/tmp/index.html.bak-s20` — backup pre-splice (no committed).

## Observability Impact

**Signals that change after this task:**

| Signal | Before T02 | After T02 | Check command |
|--------|-----------|-----------|---------------|
| `data-certeza` count | 84 | 86 | `grep -c 'data-certeza' index.html` |
| S20-1 card present | 0 | 1 | `grep -c 'data-id="S20-1"' index.html` |
| S20-2 card present | 0 | 1 | `grep -c 'data-id="S20-2"' index.html` |
| Append marker intact | 1 | 1 | `grep -c 'cards will be appended here' index.html` |
| Backup present | absent | present | `test -s C:/tmp/index.html.bak-s20 && echo BACKUP_OK` |

**How a future agent inspects this task:**
- Primary health metric: `grep -c 'data-certeza' index.html` → 86 confirms both cards landed.
- Card location: `grep -n 'data-id="S20-' index.html` → shows the exact line numbers and verifies cards appear BEFORE the append marker line.
- Non-ASCII regression: `grep -Pn '[^\x00-\x7F]' index.html | tail -20` → any matches in newly spliced lines indicate raw UTF-8 leaked through (should return 0 lines in the spliced region).
- Marker integrity: if count drops to 0, the splice consumed the marker (catastrophic); if count is 2, the splice duplicated it (also wrong). Either triggers restore from backup.

**Failure state that becomes visible:**
- `grep -c 'data-certeza' index.html` = 84 → splice didn't apply (check stderr for MARKER NOT FOUND).
- `grep -c 'data-certeza' index.html` > 86 → duplicate splice occurred; restore from backup.
- `grep -c 'cards will be appended here' index.html` = 0 → marker consumed; restore from backup.
- Restore command: `cp C:/tmp/index.html.bak-s20 index.html`
