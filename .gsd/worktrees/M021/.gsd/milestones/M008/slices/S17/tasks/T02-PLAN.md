# T02: Splice S17-1 card into index.html before append marker

## Description

Mechanical splice task. Take the T02 Recipe HTML block from `S17-CONTENT-DRAFT.md` and insert it into `index.html` immediately before the append marker `<!-- S10–S24 cards will be appended here by subsequent slices -->`. This is a low-risk step if T01 was completed correctly — all content decisions are already made.

## Steps

1. **Confirm preconditions:**
   ```bash
   grep -c 'data-certeza' index.html          # must be 79
   grep -c 'cards will be appended here' index.html  # must be 1
   test -s .gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md && echo DRAFT_OK
   ```
   If any check fails, do not proceed — debug the issue first.

2. **Write recovery backup:**
   ```bash
   mkdir -p C:/tmp
   cp index.html C:/tmp/index.html.bak-s17
   test -s C:/tmp/index.html.bak-s17 && echo BACKUP_OK
   ```

3. **Extract the T02 Recipe HTML block from the draft:**
   - Read `S17-CONTENT-DRAFT.md` and copy the T02 Recipe HTML block
   - Write it to `C:/tmp/s17-cards.html` using the Write tool (not a heredoc — per KNOWLEDGE.md)
   - Verify: `test -s C:/tmp/s17-cards.html && echo SNIPPET_OK`

4. **Run the Node.js splice:**
   ```bash
   node -e "
   const fs = require('fs');
   const html = fs.readFileSync('index.html', 'utf8');
   const snippet = fs.readFileSync('C:/tmp/s17-cards.html', 'utf8');
   const marker = 'cards will be appended here by subsequent slices';
   const idx = html.indexOf(marker);
   if (idx === -1) { console.error('MARKER NOT FOUND'); process.exit(1); }
   const lineStart = html.lastIndexOf('\n', idx) + 1;
   const newHtml = html.slice(0, lineStart) + snippet + '\n' + html.slice(lineStart);
   fs.writeFileSync('index.html', newHtml, 'utf8');
   console.log('SPLICE_OK');
   "
   ```
   - The marker substring is ASCII-only — no en-dash or Unicode (per KNOWLEDGE.md)
   - Inserts the snippet immediately before the marker line

5. **Run all 8 verification checks:**
   ```bash
   grep -c 'data-certeza' index.html          # → 80
   grep -c 'data-id="S17-' index.html        # → 1
   grep -c 'data-id="S17-1"' index.html      # → 1
   grep -c 'cards will be appended here' index.html  # → 1 (marker intact)
   git diff --name-only HEAD -- styles.css app.js    # → (empty)
   test -s C:/tmp/index.html.bak-s17 && echo BACKUP_OK
   grep -c 'card-nota-historiografica' index.html    # → 6
   test -s .gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md && echo DRAFT_OK
   ```

6. **If any check fails:**
   - Restore backup: `cp C:/tmp/index.html.bak-s17 index.html`
   - Debug: inspect `C:/tmp/s17-cards.html` for malformed HTML or missed entity encoding
   - Re-run from step 3

## Must-Haves

- Backup written before any modification to index.html
- ASCII-only marker substring in Node.js one-liner (no en-dash, no Unicode escapes)
- Snippet file written with Write tool, not a bash heredoc
- Append marker remains at exactly one occurrence after splice
- No modifications to styles.css or app.js
- All 8 verification checks pass

## Verification

```bash
grep -c 'data-certeza' index.html                    # → 80
grep -c 'data-id="S17-' index.html                  # → 1
grep -c 'data-id="S17-1"' index.html                # → 1
grep -c 'cards will be appended here' index.html    # → 1
git diff --name-only HEAD -- styles.css app.js      # → (empty)
test -s C:/tmp/index.html.bak-s17 && echo BACKUP_OK
grep -c 'card-nota-historiografica' index.html      # → 6
test -s .gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md && echo DRAFT_OK
```

## Inputs

- `.gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md` — T02 Recipe HTML block (entity-encoded)
- `index.html` — target file; baseline state: 79 `data-certeza`, 5 `card-nota-historiografica`, marker at ~line 1850

## Expected Output

- `index.html` — 1 new S17-1 card inserted before append marker; `data-certeza` count = 80; `card-nota-historiografica` count = 6
- `C:/tmp/s17-cards.html` — temp splice snippet (not committed)
- `C:/tmp/index.html.bak-s17` — pre-splice recovery backup (not committed)
- All 8 verification checks pass
