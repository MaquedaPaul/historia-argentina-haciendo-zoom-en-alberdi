---
estimated_steps: 5
estimated_files: 3
---

# T02: Splice S21 cards into index.html before append marker

**Slice:** S21 — La Suma del Poder Público — ¿avalada por todas las provincias?
**Milestone:** M008

## Description

Read the T02 Recipe block from `S21-CONTENT-DRAFT.md`, write it to a temp file, back up `index.html`, and use a Node.js Array.splice to insert both S21 cards immediately before the append marker comment. This is the mechanical integration step that makes the content live on the page.

The implementation pattern is identical to S13–S20. The only splice-specific constraint: use the ASCII-only substring `cards will be appended here by subsequent slices` to locate the marker line — the full comment contains an en-dash (U+2013) which can fail in Node.js one-liners due to shell encoding (see KNOWLEDGE.md).

## Steps

1. **Precondition checks** — run all before touching index.html:
   ```bash
   test -s .gsd/milestones/M008/slices/S21/S21-CONTENT-DRAFT.md && echo DRAFT_OK
   grep -c 'data-certeza' index.html     # must return 86
   grep -n 'cards will be appended here by subsequent slices' index.html  # record line N
   ```
   If `DRAFT_OK` is not printed, author the content draft per T01 steps before continuing.
   If `data-certeza` count is not 86, investigate before proceeding.

2. **Write temp card file** — use the Write tool (not heredoc) to create `C:/tmp/s21-cards.html` with the verbatim HTML from the `## T02 Recipe` section of `S21-CONTENT-DRAFT.md`. Create the directory first:
   ```bash
   mkdir -p C:/tmp
   ```
   The temp file must contain exactly the two `<article>` blocks (S21-1 first, S21-2 second) with a blank line between them. No surrounding `<div>` wrapper.

3. **Backup**:
   ```bash
   cp index.html C:/tmp/index.html.bak-s21
   test -s C:/tmp/index.html.bak-s21 && echo BACKUP_OK
   ```

4. **Splice** — Node.js Array.splice immediately before the marker line:
   ```bash
   node -e "
   const fs=require('fs');
   const lines=fs.readFileSync('index.html','utf8').split('\n');
   const cards=fs.readFileSync('C:/tmp/s21-cards.html','utf8');
   const idx=lines.findIndex(l=>l.includes('cards will be appended here by subsequent slices'));
   if(idx===-1){console.error('MARKER NOT FOUND');process.exit(1);}
   lines.splice(idx,0,cards);
   fs.writeFileSync('index.html',lines.join('\n'),'utf8');
   console.log('Spliced at line '+idx);
   "
   ```

5. **Verify all checks** — run each and confirm expected value:
   ```bash
   grep -c 'data-certeza' index.html                    # → 88
   grep -c 'data-id="S21-' index.html                  # → 2
   grep -c 'cards will be appended here' index.html     # → 1 (marker intact)
   git diff --name-only HEAD -- styles.css app.js       # → (empty)
   test -s C:/tmp/index.html.bak-s21 && echo BACKUP_OK
   ```
   If `data-certeza` ≠ 88: restore from backup (`cp C:/tmp/index.html.bak-s21 index.html`), diagnose the Recipe block entity encoding, fix, and retry from step 2.
   If `data-id="S21-"` count ≠ 2: one card may have failed encoding — restore and retry.
   If marker count ≠ 1: marker was duplicated or removed — restore immediately and examine the splice logic.

## Must-Haves

- [ ] Precondition checks pass before splice: DRAFT_OK, data-certeza=86, marker found.
- [ ] Backup at `C:/tmp/index.html.bak-s21` confirmed non-empty before splice.
- [ ] Node.js splice exits without error and prints "Spliced at line N".
- [ ] `grep -c 'data-certeza' index.html` returns 88 after splice.
- [ ] `grep -c 'data-id="S21-' index.html` returns 2 after splice.
- [ ] Append marker remains intact: `grep -c 'cards will be appended here' index.html` returns 1.
- [ ] `git diff --name-only HEAD -- styles.css app.js` is empty (zero CSS/JS changes).

## Verification

- `grep -c 'data-certeza' index.html` returns 88
- `grep -c 'data-id="S21-' index.html` returns 2
- `grep -c 'cards will be appended here' index.html` returns 1
- `git diff --name-only HEAD -- styles.css app.js` produces no output

## Inputs

- `.gsd/milestones/M008/slices/S21/S21-CONTENT-DRAFT.md` — T02 Recipe block with entity-encoded HTML for both cards (produced by T01).
- `index.html` — target file; currently has data-certeza=86, append marker at ~line 1972.
- KNOWLEDGE.md entries: en-dash splice rule (use ASCII-only substring), /tmp path rule (use C:/tmp/), Write-tool-not-heredoc rule.

## Expected Output

- `index.html` — modified: S21-1 (card-hecho) and S21-2 (card-opinion) spliced before the append marker; data-certeza count advances from 86 to 88.
- `C:/tmp/s21-cards.html` — temp file (not committed): entity-encoded HTML for both S21 cards.
- `C:/tmp/index.html.bak-s21` — backup (not committed): pre-splice snapshot of index.html.
