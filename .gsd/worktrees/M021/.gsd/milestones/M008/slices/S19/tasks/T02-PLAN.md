---
estimated_steps: 5
estimated_files: 3
---

# T02: Splice S19 cards into index.html before append marker

**Slice:** S19 — ¿Rosas fue un tirano?
**Milestone:** M008

## Description

Mechanical splice task: take the entity-encoded HTML from T01's `S19-CONTENT-DRAFT.md` T02 Recipe block, write it to a temp file, run the ASCII-only check, then splice it into `index.html` before the append marker using the established Node.js pattern. Verify all 8 checks pass. No creative or editorial work — T01 produced the content; this task delivers it to the browser.

## Steps

1. **Verify preconditions** before any modification:
   - `grep -c 'data-certeza' index.html` → 82
   - `grep -c 'card-nota-historiografica' index.html` → 7
   - `grep -c 'cards will be appended here' index.html` → 1
   - If any check fails, stop and investigate before proceeding.

2. **Create recovery backup:**
   ```bash
   mkdir -p C:/tmp && cp index.html C:/tmp/index.html.bak-s19
   test -s C:/tmp/index.html.bak-s19 && echo BACKUP_OK
   ```

3. **Write the T02 Recipe block to temp file** using the Write tool (NOT heredoc — per KNOWLEDGE.md). Copy the verbatim HTML from the "## T02 Recipe — Entity-Encoded HTML" section of `S19-CONTENT-DRAFT.md` into `C:/tmp/s19-cards.html`.

4. **Run ASCII-only check** on the temp file:
   ```bash
   node -e "const f=require('fs').readFileSync('C:/tmp/s19-cards.html','utf8'); const bad=f.split('\n').filter(l=>/[^\x00-\x7F]/.test(l)); console.log(bad.length===0?'PASS':'FAIL:'+bad.length);"
   ```
   If check returns FAIL, do NOT proceed — fix the non-ASCII characters in the temp file first.

5. **Splice via Node.js using ASCII-only marker substring:**
   ```javascript
   const fs = require('fs');
   const idx = fs.readFileSync('index.html', 'utf8');
   const lines = idx.split('\n');
   const markerIdx = lines.findIndex(l => l.includes('cards will be appended here by subsequent slices'));
   if (markerIdx === -1) { console.log('MARKER NOT FOUND'); process.exit(1); }
   console.log('Splice at line:', markerIdx + 1);
   const snippet = fs.readFileSync('C:/tmp/s19-cards.html', 'utf8').split('\n');
   lines.splice(markerIdx, 0, ...snippet);
   fs.writeFileSync('index.html', lines.join('\n'), 'utf8');
   console.log('DONE');
   ```
   Run as: `node -e "<above script as one line>"`

6. **Run all 8 verification checks** (see Verification section below). All must pass before marking T02 done.

## Must-Haves

- [ ] Precondition checks pass before any modification (step 1).
- [ ] Recovery backup exists at `C:/tmp/index.html.bak-s19` and is non-empty.
- [ ] ASCII-only check returns PASS before splice.
- [ ] Node.js splice uses `includes('cards will be appended here by subsequent slices')` — no Unicode characters in the search string.
- [ ] `grep -c 'data-certeza' index.html` returns 84 after splice.
- [ ] `grep -c 'card-nota-historiografica' index.html` returns 8 after splice.
- [ ] `grep -c 'cards will be appended here' index.html` returns 1 after splice (marker preserved).
- [ ] `git diff --name-only HEAD -- styles.css app.js` returns empty (zero CSS/JS changes).

## Verification

```bash
grep -c 'data-certeza' index.html           # → 84
grep -c 'data-id="S19-1"' index.html        # → 1
grep -c 'data-id="S19-2"' index.html        # → 1
grep -c 'cards will be appended here' index.html  # → 1
git diff --name-only HEAD -- styles.css app.js    # → empty
test -s C:/tmp/index.html.bak-s19 && echo BACKUP_OK  # → BACKUP_OK
grep -c 'card-nota-historiografica' index.html    # → 8
grep -c 'data-id="S19-"' index.html         # → 2
```

All 8 checks must pass. If `data-certeza` returns 84 but `card-nota-historiografica` returns 7, the S19-2 nota paragraph is missing — check the Recipe block in the temp file.

## Inputs

- `.gsd/milestones/M008/slices/S19/S19-CONTENT-DRAFT.md` — T02 Recipe HTML block from T01 (verbatim entity-encoded HTML for both cards)
- `index.html` — current production file; preconditions: `data-certeza=82`, `card-nota-historiografica=7`, marker at exactly 1 occurrence
- `.gsd/KNOWLEDGE.md` — Node.js splice pattern, ASCII-only marker search, Write-tool-not-heredoc rule, C:/tmp/ path convention, grep-c count rule (1 per card for `data-id="SXX-"` attribute searches)

## Expected Output

- `index.html` — S19-1 and S19-2 cards spliced before the append marker; `data-certeza` advanced from 82 to 84; `card-nota-historiografica` advanced from 7 to 8; CSS/JS unchanged; append marker intact at exactly 1 occurrence
- `C:/tmp/s19-cards.html` — temp splice snippet (not committed)
- `C:/tmp/index.html.bak-s19` — pre-splice recovery backup (not committed)
