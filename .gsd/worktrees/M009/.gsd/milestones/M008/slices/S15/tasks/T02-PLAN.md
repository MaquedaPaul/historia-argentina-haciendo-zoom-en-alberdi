---
estimated_steps: 5
estimated_files: 3
---

# T02: Splice the two S15 cards into index.html before the append marker

**Slice:** S15 — El asesinato de Facundo Quiroga — ¿fue Rosas?
**Milestone:** M008

## Description

Read the T02 Recipe HTML block from `S15-CONTENT-DRAFT.md`, write it to a temp file, and splice it into `index.html` immediately before the append marker comment using Node.js. This is the same pattern used by S13 and S14.

**Preconditions (verify before splicing):**
- `grep -c 'data-certeza' index.html` = 74
- `grep -c 'cards will be appended here' index.html` = 1

## Steps

1. **Read the T02 Recipe block** from `.gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md` — copy the verbatim HTML between the `## T02 Recipe` header and the end of file (or next section). This is the HTML-entity-encoded block ready for splice.

2. **Create backup**: 
   ```bash
   mkdir -p C:/tmp && cp index.html C:/tmp/index.html.bak-s15
   ```

3. **Write the T02 Recipe HTML to a temp file** using the Write tool (NOT a heredoc):
   - Path: `C:/tmp/s15-cards.html`
   - Content: the verbatim T02 Recipe HTML block from the CONTENT-DRAFT.md

4. **Run Node.js splice** to insert the cards before the append marker:
   ```bash
   node -e "
   const fs = require('fs');
   const html = fs.readFileSync('index.html', 'utf8');
   const cards = fs.readFileSync('C:/tmp/s15-cards.html', 'utf8');
   const marker = 'cards will be appended here by subsequent slices';
   const pos = html.indexOf(marker);
   if (pos === -1) { console.error('MARKER NOT FOUND'); process.exit(1); }
   const lineStart = html.lastIndexOf('\n', pos) + 1;
   const result = html.slice(0, lineStart) + cards + '\n' + html.slice(lineStart);
   fs.writeFileSync('index.html', result, 'utf8');
   console.log('Spliced OK at char ' + pos);
   "
   ```
   
   **Critical rules:**
   - Use `'cards will be appended here by subsequent slices'` as the search substring — ASCII-only, no en-dash (per KNOWLEDGE.md).
   - The splice inserts BEFORE the marker line (the marker must remain exactly once after splice).
   - Read `C:/tmp/s15-cards.html` NOT `C:/tmp/s15-cards.html` with a heredoc or inline string.

5. **Verify all five checks**:
   ```bash
   grep -c 'data-certeza' index.html           # expect 76
   grep -c 'data-id="S15-' index.html          # expect 2
   grep -c 'cards will be appended here' index.html  # expect 1
   git diff --name-only HEAD -- styles.css app.js    # expect empty (no output)
   test -s .gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md && echo OK
   ```

## Must-Haves

- [ ] Backup created at `C:/tmp/index.html.bak-s15` before any edit
- [ ] Temp file `C:/tmp/s15-cards.html` written via Write tool (not heredoc)
- [ ] Node.js splice uses ASCII-only marker substring `cards will be appended here by subsequent slices`
- [ ] `grep -c 'data-certeza' index.html` = 76 after splice
- [ ] `grep -c 'data-id="S15-' index.html` = 2 after splice
- [ ] `grep -c 'cards will be appended here' index.html` = 1 after splice (marker not consumed)
- [ ] `git diff --name-only HEAD -- styles.css app.js` produces no output (zero CSS/JS changes)
- [ ] S15-1 appears before S15-2 in the file; both appear before the append marker

## Verification

```bash
grep -c 'data-certeza' index.html           # expect 76
grep -c 'data-id="S15-' index.html          # expect 2
grep -c 'cards will be appended here' index.html  # expect 1
git diff --name-only HEAD -- styles.css app.js    # expect empty
```

**Note on grep-c multiplier:** S15 cards follow the S13/S14 pattern — each card has both an HTML comment `<!-- S15-N: ... -->` AND a `data-id="S15-N"` attribute. Therefore `grep -c 'S15-' index.html` will return 4 (2 per card × 2 cards). Use `grep -c 'data-id="S15-'` for an unambiguous 1-per-card count.

## Recovery

If splice produces incorrect output:
```bash
cp C:/tmp/index.html.bak-s15 index.html
```
Then diagnose by checking `grep -n 'cards will be appended here' index.html` to confirm marker position, and re-read `C:/tmp/s15-cards.html` to confirm its content before retrying.

## Inputs

- `.gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md` — T02 Recipe HTML block (output of T01)
- `index.html` — current page with 74 `data-certeza` cards and the append marker at line ~1768
- S14 Summary: confirms data-certeza=74, marker present once, ASCII-only splice pattern is reliable

## Expected Output

- `index.html` — 2 new S15 cards (S15-1 `card-hecho` and S15-2 `card-opinion` with `data-certeza="debatido"`) inserted before the append marker; data-certeza count = 76
- `C:/tmp/s15-cards.html` — temp splice input (not committed)
- `C:/tmp/index.html.bak-s15` — pre-splice recovery backup (not committed)
