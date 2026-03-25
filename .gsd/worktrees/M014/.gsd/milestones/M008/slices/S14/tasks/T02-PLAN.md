---
estimated_steps: 5
estimated_files: 3
---

# T02: Splice S14 cards into index.html before append marker

**Slice:** S14 — El segundo gobierno de Rosas — el Restaurador
**Milestone:** M008

## Description

Mechanically splice the 3 S14 cards from the T02 Recipe HTML block in S14-CONTENT-DRAFT.md into `index.html`. This task performs zero authorship — it copies the verbatim HTML from T01's draft into a temp file, then uses Node.js to insert it before the append marker in `#periodo-rosas`. The result must raise `data-certeza` count from 71 to 74.

## Steps

1. **Confirm preconditions:**
   ```bash
   grep -c 'data-certeza' index.html           # Must be 71
   grep -c 'cards will be appended here' index.html  # Must be 1
   test -s .gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md && echo OK
   ```
   If data-certeza ≠ 71, stop and report the discrepancy before continuing.

2. **Backup index.html:**
   ```bash
   mkdir -p C:/tmp
   cp index.html C:/tmp/index.html.bak-s14
   ```

3. **Write the T02 Recipe HTML block to temp file** using the Write tool (not heredoc):
   - Read the "T02 Recipe HTML block" section from `.gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md`
   - Copy the verbatim HTML into `C:/tmp/s14-cards.html` using the Write tool

4. **Node.js splice** — insert s14-cards.html content before the marker:
   ```bash
   node -e "
   const fs = require('fs');
   const idx = fs.readFileSync('index.html', 'utf8');
   const cards = fs.readFileSync('C:/tmp/s14-cards.html', 'utf8');
   const marker = 'cards will be appended here by subsequent slices';
   const pos = idx.indexOf(marker);
   if (pos === -1) { console.error('MARKER NOT FOUND'); process.exit(1); }
   const lineStart = idx.lastIndexOf('\n', pos) + 1;
   const newContent = idx.slice(0, lineStart) + cards + '\n' + idx.slice(lineStart);
   fs.writeFileSync('index.html', newContent, 'utf8');
   console.log('Spliced OK at char ' + lineStart);
   "
   ```
   Use the ASCII-only substring `'cards will be appended here by subsequent slices'` — do NOT include the en-dash or the full comment text (per KNOWLEDGE.md en-dash/Unicode rule).

5. **Run verification checks:**
   ```bash
   grep -c 'data-certeza' index.html          # Must be 74
   grep -c 'data-id="S14-' index.html         # Must be 3
   grep -c 'cards will be appended here' index.html  # Must remain 1
   git diff --name-only HEAD -- styles.css app.js    # Must be empty
   ```
   If any check fails: restore with `cp C:/tmp/index.html.bak-s14 index.html` and diagnose.

## Must-Haves

- [ ] `C:/tmp/index.html.bak-s14` created before any modification
- [ ] Temp file written via Write tool, not heredoc (per KNOWLEDGE.md bash heredoc reliability rule)
- [ ] Node.js splice uses ASCII-only marker substring (no en-dash)
- [ ] `grep -c 'data-certeza' index.html` = 74 after splice
- [ ] `grep -c 'data-id="S14-' index.html` = 3 after splice
- [ ] `grep -c 'cards will be appended here' index.html` = 1 after splice
- [ ] `git diff --name-only HEAD -- styles.css app.js` is empty

## Verification

- `grep -c 'data-certeza' index.html` returns 74
- `grep -c 'data-id="S14-' index.html` returns 3
- `grep -c 'cards will be appended here' index.html` returns 1
- `git diff --name-only HEAD -- styles.css app.js` produces no output

## Inputs

- `.gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md` — T02 Recipe HTML block from T01. Copy verbatim into C:/tmp/s14-cards.html.
- `index.html` — current state with 71 data-certeza attributes and marker at `<!-- S10–S24 cards will be appended here by subsequent slices -->` (currently near line 1717, but use grep to find the exact line since prior splices may have shifted it).
- KNOWLEDGE.md (key rules): Windows `/tmp` → use `C:/tmp/`; heredoc → Write tool; Node.js en-dash → ASCII-only substring; `grep -c 'data-id="S14-'` is unambiguous 1-per-card count.

## Expected Output

- `index.html` — Modified: 3 new cards (S14-1, S14-2, S14-3) inserted before append marker in `#periodo-rosas`; data-certeza count = 74.
- `C:/tmp/s14-cards.html` — Temp file used for splice (not committed).
- `C:/tmp/index.html.bak-s14` — Recovery backup (not committed).
