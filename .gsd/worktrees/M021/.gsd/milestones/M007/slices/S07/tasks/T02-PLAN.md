---
estimated_steps: 5
estimated_files: 2
---

# T02: Integrate BIOG-21 and BIOG-22 into index.html

**Slice:** S07 — Por qué Alberdi rechazó el viaje a EE.UU. financiado por Quiroga
**Milestone:** M007

## Description

Insert the two-card thematic block from T01's content draft into `index.html` using the CRLF-safe Node.js splice pattern. The block goes immediately before `</div><!-- /#rev-alberdi-quiroga -->` (currently line ~967 of the 1916-line file). The insertion creates: a new `<h4 class="sub-period__subtitle reveal reveal-fade">` header + a new `<div class="events-grid events-grid--certeza">` containing BIOG-21 and BIOG-22.

No new sub-period. No new sub-nav link. All CSS classes are pre-existing.

## Steps

1. **Pre-flight check**: `grep -c 'id="BIOG-21"' index.html` — must return 0. If it returns 1, the insertion was already applied; skip to verification only.

2. **Write the insertion block to a temp file** using the `Write` tool (never a bash heredoc). The block structure:
   ```
   <h4 class="sub-period__subtitle reveal reveal-fade" style="--reveal-delay: 0ms">El rechazo del viaje: análisis</h4>
   <div class="events-grid events-grid--certeza" aria-label="Por qué Alberdi rechazó el viaje a Estados Unidos">

     <!-- BIOG-21: La devolución de la libranza -->
     [full BIOG-21 article HTML from S07-CONTENT-DRAFT.md]

     <!-- BIOG-22: El análisis historiográfico del rechazo -->
     [full BIOG-22 article HTML from S07-CONTENT-DRAFT.md]

   </div>
   ```
   Copy the exact HTML from `.gsd/milestones/M007/slices/S07/S07-CONTENT-DRAFT.md`. BIOG-21 uses `style="--reveal-delay: 0ms"`. BIOG-22 uses `style="--reveal-delay: 80ms"`.

3. **CRLF-safe splice** using Node.js:
   ```js
   const fs = require('fs');
   const html = fs.readFileSync('index.html', 'utf8');
   const lines = html.split('\r\n');  // MUST use \r\n, not \n
   const anchor = lines.findIndex(l => l.includes('</div><!-- /#rev-alberdi-quiroga -->'));
   // anchor should be the line with that closing comment (~line 967, 0-indexed ~966)
   const block = fs.readFileSync('tmp-s07-biog21-22.txt', 'utf8');
   const newLines = block.split('\n').map(l => l.replace(/\r$/, ''));
   lines.splice(anchor, 0, ...newLines);
   fs.writeFileSync('index.html', lines.join('\r\n'), 'utf8');
   ```
   Log the `anchor` index before splicing to confirm the right line was found.

4. **Immediate integrity check** after write:
   ```bash
   grep -c 'data-certeza' index.html   # must be 56
   grep -c 'id="BIOG-21"' index.html   # must be 1
   grep -c 'id="BIOG-22"' index.html   # must be 1
   ```
   If data-certeza is still 54, the splice found the wrong anchor or failed silently — do NOT proceed.

5. **Check for CRLF corruption**: `node -e "const f=require('fs').readFileSync('index.html','utf8'); console.log('lines:', f.split('\r\n').length, 'vs raw newlines:', f.split('\n').length);"` — the two counts should be equal (all newlines are CRLF). If they differ significantly, the join produced mixed line endings.

## Must-Haves

- [ ] Pre-flight check passes (BIOG-21 not already present) before any write
- [ ] Temp file written with `Write` tool (no bash heredoc)
- [ ] Node.js splice uses `split('\r\n')` and `join('\r\n')` — not `split('\n')`
- [ ] BIOG-21 stagger `0ms`, BIOG-22 stagger `80ms`
- [ ] `data-certeza` count is 56 immediately after write

## Verification

```bash
grep -c 'data-certeza' index.html        # → 56
grep -c 'id="BIOG-21"' index.html        # → 1
grep -c 'id="BIOG-22"' index.html        # → 1
grep -c 'rev-alberdi-quiroga' index.html # → 3 (unchanged)
grep -c 'sub-nav__link' index.html       # → 6 (unchanged)
```

## Inputs

- `.gsd/milestones/M007/slices/S07/S07-CONTENT-DRAFT.md` — T01's output, containing complete HTML for BIOG-21 and BIOG-22
- `index.html` — current state: 1916 lines, `data-certeza=54`, `.reveal=76`, BIOG-20 ends at ~line 965, `</div><!-- /#rev-alberdi-quiroga -->` at ~line 967
- KNOWLEDGE.md: "Node.js Line-Split/Splice for CRLF HTML Files" pattern — `split('\r\n')` / `splice` / `join('\r\n')`
- KNOWLEDGE.md: "Pre-flight Check Before HTML Insertion in a Worktree" — always grep for card ID before inserting

## Expected Output

- `index.html` — modified with BIOG-21 and BIOG-22 inserted; `data-certeza=56`, `.reveal` elements increase from 76 to 79 (h4.reveal-fade + 2×reveal-slide), `sub-nav__link=6` (unchanged), `rev-alberdi-quiroga=3` (unchanged)
- `tmp-s07-biog21-22.txt` — temp file (can be left as audit trail)

## Observability Impact

**Signals that change after T02:**

| Signal | Before | After | How to inspect |
|---|---|---|---|
| `grep -c 'data-certeza' index.html` | 54 | 56 | Shell — counts all `data-certeza` attributes |
| `grep -c 'id="BIOG-21"' index.html` | 0 | 1 | Shell — article presence |
| `grep -c 'id="BIOG-22"' index.html` | 0 | 1 | Shell — article presence |
| `.reveal` element count | 76 | 79 | `grep -c 'class=".*reveal' index.html` |
| `#rev-alberdi-quiroga [data-certeza]` count | 4 | 6 | Node.js section extraction (see S07-PLAN.md) |

**How a future agent inspects this task:**
- Run the five shell checks in the Verification section above — all must return exact expected values.
- Run the Node.js CRLF check to confirm no mixed line endings were introduced.
- Open `index.html` in a browser and navigate to `#rev-alberdi-quiroga`; the new "El rechazo del viaje: análisis" `<h4>` and two cards should appear after BIOG-20.
- Browser DevTools → Elements → `#BIOG-21` and `#BIOG-22` — inspect certeza badges and card structure.

**Failure state visibility:**
- `data-certeza=55`: one card is missing its attribute — check BIOG-22 for missing `data-certeza="opinion"`.
- `data-certeza=54` (unchanged): insertion failed silently — grep anchor was not found or splice was not written.
- `rev-alberdi-quiroga=4`: accidental new sub-period created — undo and re-insert within existing div.
- CRLF mismatch (split('\r\n').length ≠ split('\n').length): mixed line endings from bad join — re-run splice with `join('\r\n')`.
- `tmp-s07-biog21-22.txt` left on disk as audit trail — delete if cleanup is needed; does not affect the site.
