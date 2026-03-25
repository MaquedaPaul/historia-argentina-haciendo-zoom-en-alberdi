# T02: Splice both cards into index.html before the append marker

**Slice:** S13 — El primer gobierno de Rosas — cómo llegó al poder
**Slice goal:** Two `card-hecho` articles narrating Rosas's rise (1828–1829) and first mandate (1829–1832) live in `#periodo-rosas`.

## Description

Take the T02 Recipe HTML block from `S13-CONTENT-DRAFT.md` and splice it into `index.html` immediately before the multi-slice append marker comment. Uses the Write-tool temp file + Node.js pattern (no heredoc). Raises `data-certeza` count from 69 to 71.

## Inputs

- `.gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md` — produced by T01; contains the T02 Recipe HTML block
- `index.html` — target file; append marker currently at line 1682 (confirm with grep before splicing)

## Steps

1. **Read** the T02 Recipe HTML block from `S13-CONTENT-DRAFT.md` (the section after `## T02 Recipe HTML`).

2. **Create temp directory:**
   ```bash
   mkdir -p C:/tmp
   ```

3. **Write** the HTML block to `C:/tmp/s13-cards.html` using the **Write tool** (not a bash heredoc — heredocs are unreliable on Windows/Git Bash for multi-line HTML content).

4. **Back up** the current `index.html`:
   ```bash
   cp index.html C:/tmp/index.html.bak-s13
   ```

5. **Find the insertion line:**
   ```bash
   grep -n 'cards will be appended here by subsequent slices' index.html
   ```
   Record the line number (expected ~1682, but trust grep, not the cached value).

6. **Splice** using Node.js with the ASCII-only marker substring (no en-dash):
   ```bash
   node -e "
   const fs = require('fs');
   const html = fs.readFileSync('index.html', 'utf8');
   const cards = fs.readFileSync('C:/tmp/s13-cards.html', 'utf8');
   const MARKER = 'cards will be appended here by subsequent slices';
   const idx = html.indexOf(MARKER);
   if (idx === -1) { console.error('MARKER NOT FOUND'); process.exit(1); }
   const lineStart = html.lastIndexOf('\n', idx) + 1;
   fs.writeFileSync('index.html', html.slice(0, lineStart) + cards + '\n' + html.slice(lineStart), 'utf8');
   console.log('Spliced OK at char', lineStart);
   "
   ```

7. **Verify all five checks:**
   ```bash
   grep -c 'data-certeza' index.html           # must be 71
   grep -c 'S13-' index.html                   # must be 2
   grep -c 'cards will be appended here' index.html  # must be 1
   git diff --name-only HEAD -- styles.css app.js    # must be empty
   test -s .gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md && echo OK
   ```

## Must-Haves

- The marker comment `<!-- S10–S24 cards will be appended here by subsequent slices -->` remains present exactly once after the splice — new cards go BEFORE it.
- `data-certeza` count increases from 69 to exactly **71** (2 new cards).
- `grep -c 'S13-' index.html` returns **2** (one match per card's `data-id`).
- `styles.css` and `app.js` are **unchanged** — `git diff --name-only HEAD -- styles.css app.js` returns empty.
- No sub-nav link added (the `#periodo-rosas` sub-nav was added by S09 — do NOT add another).

## Recovery

If `index.html` is corrupted: `cp C:/tmp/index.html.bak-s13 index.html` (restores to pre-S13 state; S13 T02 can then be re-run).

## Windows Constraints

- Use `C:/tmp/` not `/tmp/` — `/tmp` does not exist in this Windows/Git Bash environment.
- Use the Node.js `String.indexOf()` splice (not grep line-number + `sed`) — sed multi-line insertion is fragile with HTML.
- ASCII-only marker substring in Node.js (`'cards will be appended here by subsequent slices'`) — the en-dash in the full comment fails to match via shell escaping. This substring is unique and sufficient.

## Expected Output

- `index.html` — 2 new `card-hecho` articles (S13-1, S13-2) inserted before the append marker; `data-certeza` count = **71**; marker still present at its new position.
- `C:/tmp/s13-cards.html` — temporary artifact (not committed).
- `C:/tmp/index.html.bak-s13` — recovery backup (not committed).
