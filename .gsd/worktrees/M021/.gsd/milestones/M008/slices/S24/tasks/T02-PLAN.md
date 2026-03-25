---
estimated_steps: 5
estimated_files: 3
---

# T02: Splice S24 cards into index.html before append marker

**Slice:** S24 — Encarnación Ezcurra antes de Rosas — ¿era conocida?
**Milestone:** M008

## Description

Extract the T02 Recipe HTML from `S24-CONTENT-DRAFT.md`, write it to `C:/tmp/s24-cards.html` via the Write tool (not bash heredoc), back up `index.html`, run the Node.js Array.splice before the append marker, and verify all 7 checks. This closes S24 and completes M008's 16-slice content arc.

**Precondition check:** Before starting, verify T01's output exists: `test -s .gsd/milestones/M008/slices/S24/S24-CONTENT-DRAFT.md`. If missing, author the content draft following T01-PLAN.md steps first, then continue with the splice steps below.

## Steps

1. **Verify preconditions:**
   - `test -s .gsd/milestones/M008/slices/S24/S24-CONTENT-DRAFT.md` — if missing, stop and author T01 first.
   - `grep -c 'data-certeza' index.html` — confirm current count is **91**.
   - `grep -c 'cards will be appended here' index.html` — confirm marker is **1**.
   - Re-run ENTITY_PASS and SCOPE_PASS checks on the draft (same commands as T01 steps 5–6).

2. **Extract card HTML from draft:** Read the `## T02 Recipe` section of `S24-CONTENT-DRAFT.md`. Copy the verbatim HTML block (everything between the opening ` ```html ` fence and the closing ` ``` ` — do not include the fence markers themselves).

3. **Write card HTML to temp file:** Use the **Write tool** (not bash heredoc) to write the extracted HTML to `C:/tmp/s24-cards.html`. Create the directory first if needed: `mkdir -p C:/tmp`.

4. **Backup index.html:** `cp index.html C:/tmp/index.html.bak-s24`

5. **Splice cards before append marker** using Node.js:
   ```js
   const fs = require('fs');
   const lines = fs.readFileSync('index.html', 'utf8').split('\n');
   const idx = lines.findIndex(l => l.includes('cards will be appended here by subsequent slices'));
   const cards = fs.readFileSync('C:/tmp/s24-cards.html', 'utf8').split('\n');
   lines.splice(idx, 0, ...cards);
   fs.writeFileSync('index.html', lines.join('\n'), 'utf8');
   ```
   Run as: `node -e "..."` (inline) or write to a temp `.js` file and run with `node`. Use the ASCII-only marker substring `cards will be appended here by subsequent slices` — do NOT use the full marker string with the en-dash (`–`, U+2013) as it may fail to match in Node.js shell one-liners (KNOWLEDGE.md).

6. **Run all 7 verification checks** (see Verification section below). If any check fails:
   - Restore from backup: `cp C:/tmp/index.html.bak-s24 index.html`
   - Diagnose: check the temp file for encoding issues, confirm the marker was found (`idx !== -1`), re-read the draft for entity encoding errors.
   - Fix and re-run.

## Must-Haves

- [ ] `C:/tmp/index.html.bak-s24` exists before the splice runs
- [ ] Splice uses ASCII-only marker substring (`cards will be appended here by subsequent slices`), not the en-dash variant
- [ ] Write tool used for temp file creation, not bash heredoc
- [ ] All 7 verification checks pass after splice
- [ ] `git diff --name-only HEAD -- styles.css app.js` returns empty (no CSS/JS changes)

## Verification

| Check | Command | Expected |
|-------|---------|----------|
| data-certeza count | `grep -c 'data-certeza' index.html` | **93** |
| S24 cards present | `grep -c 'data-id="S24-' index.html` | **2** |
| Append marker intact | `grep -c 'cards will be appended here' index.html` | **1** |
| Nota count | `grep -c 'card-nota-historiografica' index.html` | **12** |
| No CSS/JS changes | `git diff --name-only HEAD -- styles.css app.js` | **(empty)** |
| Backup exists | `test -s C:/tmp/index.html.bak-s24` | exit 0 |
| Scope boundary | `node -e "const f=require('fs').readFileSync('index.html','utf8'); const banned=['Mazorca','Caseros','Barranco Yaco','bloqueo franc','Vuelta de Obligado','Restauradores','Sociedad Popular Restauradora']; const s24=f.slice(f.indexOf('S24-1')); const found=banned.filter(b=>s24.includes(b)); console.log(found.length===0?'SCOPE_PASS':'SCOPE_FAIL:'+found.join(','));"` | **SCOPE_PASS** |

## Inputs

- `.gsd/milestones/M008/slices/S24/S24-CONTENT-DRAFT.md` — T01 output; must exist and contain the `## T02 Recipe` section
- `index.html` — current state: `data-certeza` count = 91, append marker at 1, S23 cards confirmed at `data-id="S23-1"` and `data-id="S23-2"`

## Expected Output

- `index.html` — S24-1 and S24-2 spliced before append marker; `data-certeza` count = 93; `card-nota-historiografica` count = 12; all other structure unchanged.
- `C:/tmp/s24-cards.html` — temp file (not committed); extracted card HTML used for splice.
- `C:/tmp/index.html.bak-s24` — temp file (not committed); pre-splice restore point.
