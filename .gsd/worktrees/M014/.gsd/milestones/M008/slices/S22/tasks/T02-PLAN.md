---
estimated_steps: 5
estimated_files: 3
---

# T02: Splice S22-1 into index.html before the append marker

**Slice:** S22 — ¿Sin Rosas la Patria hubiera caído?
**Milestone:** M008

## Description

Splice the entity-encoded HTML for card S22-1 (authored by T01) into `index.html` immediately before the append marker comment `<!-- S10–S24 cards will be appended here by subsequent slices -->`. Uses the established Node.js Array.splice pattern with the ASCII-only marker substring. Advances `data-certeza` count from 88 to 89.

## Steps

1. **Verify T01 precondition.** Run:
   ```bash
   test -s .gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md && echo DRAFT_OK || echo DRAFT_MISSING
   ```
   If DRAFT_MISSING, author the content draft per T01-PLAN.md steps before continuing.

2. **Confirm baseline.** Run:
   ```bash
   grep -c 'data-certeza' index.html
   ```
   Must return 88. If different, investigate before proceeding — a prior slice may have been partially applied.

3. **Write card HTML to temp file.** Extract the T02 Recipe HTML block from `S22-CONTENT-DRAFT.md` and write it to `C:/tmp/s22-cards.html` using the Write tool (not a bash heredoc — per KNOWLEDGE.md). The content is the raw HTML between the `## T02 Recipe` heading and end of file (or next `##` heading). Ensure `C:/tmp/` directory exists: `mkdir -p C:/tmp`.

4. **Backup and splice.**
   ```bash
   cp index.html C:/tmp/index.html.bak-s22
   ```
   Then run the Node.js splice:
   ```js
   node -e "
   const fs = require('fs');
   const lines = fs.readFileSync('index.html', 'utf8').split('\n');
   const cards = fs.readFileSync('C:/tmp/s22-cards.html', 'utf8');
   const idx = lines.findIndex(l => l.includes('cards will be appended here by subsequent slices'));
   if (idx === -1) { console.error('MARKER NOT FOUND'); process.exit(1); }
   lines.splice(idx, 0, cards);
   fs.writeFileSync('index.html', lines.join('\n'), 'utf8');
   console.log('Spliced at line', idx);
   "
   ```
   Note: use the ASCII-only substring `cards will be appended here by subsequent slices` (no en-dash) per KNOWLEDGE.md.

5. **Run all verification checks.** Execute each check and confirm expected values:
   ```bash
   grep -c 'data-certeza' index.html              # expect 89
   grep -c 'data-id="S22-' index.html             # expect 1
   grep -c 'cards will be appended here' index.html  # expect 1 (marker intact)
   git diff --name-only HEAD -- styles.css app.js    # expect empty
   test -s C:/tmp/index.html.bak-s22 && echo BACKUP_OK
   ```
   Also run scope-boundary check:
   ```js
   node -e "const f=require('fs').readFileSync('.gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md','utf8'); const r=f.slice(f.indexOf('## T02 Recipe')); const banned=['Vuelta de Obligado','Convenci\u00f3n Mackau','octubre de 1840','bloqueo franc\u00e9s','1838 y 1840','Caseros','3 de febrero de 1852']; const found=banned.filter(b=>r.includes(b)); console.log(found.length===0?'SCOPE_PASS':'SCOPE_FAIL:'+found.join(','));"
   ```

   If any verification check fails:
   - Restore: `cp C:/tmp/index.html.bak-s22 index.html`
   - Diagnose: inspect `C:/tmp/s22-cards.html` for malformed HTML or encoding issues
   - Fix and retry

## Must-Haves

- [ ] Backup at `C:/tmp/index.html.bak-s22` exists before any edit to `index.html`
- [ ] `grep -c 'data-certeza' index.html` = 89
- [ ] `grep -c 'data-id="S22-' index.html` = 1
- [ ] `grep -c 'cards will be appended here' index.html` = 1 (marker intact — not consumed)
- [ ] `git diff --name-only HEAD -- styles.css app.js` is empty
- [ ] Scope-boundary check returns SCOPE_PASS
- [ ] Card S22-1 appears immediately before the append marker (not after closing `</div>`)

## Verification

- `grep -c 'data-certeza' index.html` returns 89
- `grep -c 'data-id="S22-' index.html` returns 1
- `grep -c 'cards will be appended here' index.html` returns 1
- `git diff --name-only HEAD -- styles.css app.js` is empty (no output)
- `test -s C:/tmp/index.html.bak-s22 && echo BACKUP_OK` prints BACKUP_OK

## Inputs

- `.gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md` — T01 output: entity-encoded T02 Recipe HTML block (must exist and be non-empty before this task runs)
- `index.html` — current state with 88 `data-certeza` cards and append marker at ~line 2007 (use grep, not hardcoded line number)
- `C:/tmp/index.html.bak-s21` — available as prior restore point if needed

## Expected Output

- `index.html` — modified: S22-1 (`card-opinion`, `data-certeza="opini&#xF3;n"`) spliced before the append marker; `data-certeza` count advances from 88 to 89; `card-nota-historiografica` count advances from 9 to 10
- `C:/tmp/s22-cards.html` — created (temp, not committed): entity-encoded HTML for S22-1
- `C:/tmp/index.html.bak-s22` — created (temp, not committed): pre-splice backup
