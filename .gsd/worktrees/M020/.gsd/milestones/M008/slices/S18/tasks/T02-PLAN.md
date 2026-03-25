---
estimated_steps: 6
estimated_files: 3
---

# T02: Splice S18 cards into index.html before append marker

**Slice:** S18 — Los unitarios conspiraban
**Milestone:** M008

## Description

Mechanical integration task: take the verbatim HTML from the T02 Recipe block in `S18-CONTENT-DRAFT.md`, write it to a temp file, and splice it into `index.html` immediately before the append marker using the established Node.js one-liner pattern. Then run all 8 verification checks to confirm the splice is correct. No historical judgment required — all content decisions were made in T01.

**Starting state (preconditions):**
- `grep -c 'data-certeza' index.html` → 80
- `grep -c 'cards will be appended here' index.html` → 1 (marker at line ~1866)
- `grep -c 'card-nota-historiografica' index.html` → 6

**Target state after splice:**
- `grep -c 'data-certeza' index.html` → 82
- `grep -c 'card-nota-historiografica' index.html` → 7

## Steps

1. **Confirm preconditions** before touching anything:
   ```bash
   grep -c 'data-certeza' index.html          # must be 80
   grep -c 'cards will be appended here' index.html  # must be 1
   grep -c 'card-nota-historiografica' index.html    # must be 6
   ```
   If any check fails, stop — S17 may not have completed correctly. Do not proceed.

2. **Create temp directory and write recovery backup**:
   ```bash
   mkdir -p C:/tmp
   cp index.html C:/tmp/index.html.bak-s18
   test -s C:/tmp/index.html.bak-s18 && echo BACKUP_OK
   ```

3. **Extract T02 Recipe HTML from draft and write to temp file**: Read the T02 Recipe HTML block from `S18-CONTENT-DRAFT.md` (everything between the `## T02 Recipe HTML` header and the closing delimiter). Write it to `C:/tmp/s18-cards.html` using the Write tool (NOT bash heredoc — per KNOWLEDGE.md bash heredoc reliability entry). The file should contain only the two `<article>` elements and their leading HTML comments.

4. **Run Node.js splice one-liner** (ASCII-only marker substring — never use the en-dash from the comment):
   ```bash
   node -e "const fs=require('fs'); const idx=fs.readFileSync('index.html','utf8'); const cards=fs.readFileSync('C:/tmp/s18-cards.html','utf8'); const marker='cards will be appended here by subsequent slices'; const pos=idx.indexOf(marker); if(pos===-1){console.error('MARKER NOT FOUND');process.exit(1);} const lineStart=idx.lastIndexOf('\n',pos)+1; const result=idx.slice(0,lineStart)+cards+'\n'+idx.slice(lineStart); fs.writeFileSync('index.html',result,'utf8'); console.log('splice ok, pos='+pos);"
   ```
   The one-liner must print `splice ok, pos=NNN`. If it prints `MARKER NOT FOUND`, stop and diagnose (check marker text in `C:/tmp/s18-cards.html` vs. actual marker in index.html).

5. **Run all 8 verification checks** in sequence:
   ```bash
   grep -c 'data-certeza' index.html                        # → 82
   grep -c 'data-id="S18-1"' index.html                    # → 1
   grep -c 'data-id="S18-2"' index.html                    # → 1
   grep -c 'cards will be appended here' index.html         # → 1
   git diff --name-only HEAD -- styles.css app.js           # (empty)
   test -s C:/tmp/index.html.bak-s18 && echo BACKUP_OK     # → BACKUP_OK
   grep -c 'card-nota-historiografica' index.html           # → 7
   grep -c 'data-id="S18-' index.html                      # → 4 (2 per card: HTML comment + data-id attribute)
   ```

6. **If any check fails**: restore from backup first (`cp C:/tmp/index.html.bak-s18 index.html`), diagnose the specific failure (entity encoding corruption, marker mismatch, wrong card count), fix `C:/tmp/s18-cards.html`, then repeat steps 4–5.

## Must-Haves

- [ ] Preconditions confirmed before any file mutation (80 data-certeza, marker at 1, nota count at 6)
- [ ] Recovery backup exists and is non-empty at `C:/tmp/index.html.bak-s18`
- [ ] Node.js splice one-liner uses ASCII-only marker substring (no en-dash)
- [ ] All 8 verification checks pass
- [ ] `git diff --name-only HEAD -- styles.css app.js` is empty (zero new CSS/JS)

## Verification

```bash
grep -c 'data-certeza' index.html          # → 82
grep -c 'cards will be appended here' index.html  # → 1
git diff --name-only HEAD -- styles.css app.js    # (empty)
```

## Inputs

- `.gsd/milestones/M008/slices/S18/S18-CONTENT-DRAFT.md` — T02 Recipe HTML block (verbatim HTML to splice; all non-ASCII must be entities)
- `index.html` — live page; current state: 80 data-certeza, append marker at line ~1866, 6 card-nota-historiografica blocks

## Expected Output

- `index.html` — S18-1 and S18-2 cards spliced before the append marker; data-certeza count 80→82; card-nota-historiografica count 6→7; marker intact at exactly 1 occurrence
- `C:/tmp/s18-cards.html` — temp splice snippet (not committed)
- `C:/tmp/index.html.bak-s18` — pre-splice recovery backup (not committed)
