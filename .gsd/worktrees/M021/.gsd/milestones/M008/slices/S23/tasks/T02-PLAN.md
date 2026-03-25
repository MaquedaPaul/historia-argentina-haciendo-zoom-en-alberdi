---
estimated_steps: 5
estimated_files: 3
---

# T02: Splice S23-1 and S23-2 into index.html before the append marker

**Slice:** S23 — Encarnación Ezcurra — influencia sobre mujeres y apoyo a Rosas
**Milestone:** M008

## Description

Splice the entity-encoded HTML for cards S23-1 (`card-hecho`) and S23-2 (`card-opinion`) — authored by T01 — into `index.html` immediately before the append marker comment `<!-- S10–S24 cards will be appended here by subsequent slices -->`. Uses the established Node.js Array.splice pattern with the ASCII-only marker substring. Advances `data-certeza` count from 89 to 91 and `card-nota-historiografica` count from 10 to 11.

## Steps

1. **Verify T01 precondition.** Run:
   ```bash
   test -s .gsd/milestones/M008/slices/S23/S23-CONTENT-DRAFT.md && echo DRAFT_OK || echo DRAFT_MISSING
   ```
   If DRAFT_MISSING, author the content draft per T01-PLAN.md before continuing — T01 must produce the draft before T02 can run.

2. **Confirm baseline.** Run:
   ```bash
   grep -c 'data-certeza' index.html
   ```
   Must return 89. If different, investigate before proceeding — a prior splice may have been partially applied or the baseline differs from the S22 end-state.

3. **Write card HTML to temp file.** Extract the T02 Recipe HTML block from `S23-CONTENT-DRAFT.md` and write it to `C:/tmp/s23-cards.html` using the Write tool (not a bash heredoc — per KNOWLEDGE.md Bash Heredoc Reliability entry). The content is the raw HTML between the `## T02 Recipe` heading and end of file (or the next `##` heading). Ensure `C:/tmp/` directory exists:
   ```bash
   mkdir -p C:/tmp
   ```

4. **Backup and splice.**
   ```bash
   cp index.html C:/tmp/index.html.bak-s23
   ```
   Then run the Node.js splice:
   ```js
   node -e "
   const fs = require('fs');
   const lines = fs.readFileSync('index.html', 'utf8').split('\n');
   const cards = fs.readFileSync('C:/tmp/s23-cards.html', 'utf8');
   const idx = lines.findIndex(l => l.includes('cards will be appended here by subsequent slices'));
   if (idx === -1) { console.error('MARKER NOT FOUND'); process.exit(1); }
   lines.splice(idx, 0, cards);
   fs.writeFileSync('index.html', lines.join('\n'), 'utf8');
   console.log('Spliced at line', idx);
   "
   ```
   Use the ASCII-only substring `cards will be appended here by subsequent slices` (no en-dash or special characters) per KNOWLEDGE.md Node.js en-dash/Unicode entry. Do NOT hardcode a line number — the marker must be found dynamically.

5. **Run all verification checks.** Execute each check and confirm expected values:
   ```bash
   grep -c 'data-certeza' index.html              # expect 91
   grep -c 'data-id="S23-' index.html             # expect 2
   grep -c 'cards will be appended here' index.html  # expect 1 (marker intact)
   grep -c 'card-nota-historiografica' index.html  # expect 11
   git diff --name-only HEAD -- styles.css app.js    # expect empty (no output)
   test -s C:/tmp/index.html.bak-s23 && echo BACKUP_OK
   ```
   Also run scope-boundary check on the draft (belt-and-suspenders):
   ```js
   node -e "const f=require('fs').readFileSync('.gsd/milestones/M008/slices/S23/S23-CONTENT-DRAFT.md','utf8'); const r=f.slice(f.indexOf('## T02 Recipe')); const banned=['Barranco Yaco','Mazorca','bloqueo franc','bloqueo anglo','Vuelta de Obligado','Caseros']; const found=banned.filter(b=>r.includes(b)); console.log(found.length===0?'SCOPE_PASS':'SCOPE_FAIL:'+found.join(','));"
   ```

   If any verification check fails:
   - Restore: `cp C:/tmp/index.html.bak-s23 index.html`
   - Diagnose: inspect `C:/tmp/s23-cards.html` for malformed HTML or encoding issues
   - Fix and retry from step 3

## Must-Haves

- [ ] Backup at `C:/tmp/index.html.bak-s23` exists before any edit to `index.html`
- [ ] `grep -c 'data-certeza' index.html` = 91
- [ ] `grep -c 'data-id="S23-' index.html` = 2
- [ ] `grep -c 'cards will be appended here' index.html` = 1 (marker intact — not consumed)
- [ ] `grep -c 'card-nota-historiografica' index.html` = 11
- [ ] `git diff --name-only HEAD -- styles.css app.js` is empty
- [ ] Scope-boundary check returns SCOPE_PASS
- [ ] Both S23 cards appear immediately before the append marker (not after closing `</div>`)

## Verification

- `grep -c 'data-certeza' index.html` returns 91
- `grep -c 'data-id="S23-' index.html` returns 2
- `grep -c 'cards will be appended here' index.html` returns 1
- `grep -c 'card-nota-historiografica' index.html` returns 11
- `git diff --name-only HEAD -- styles.css app.js` is empty (no output)
- `test -s C:/tmp/index.html.bak-s23 && echo BACKUP_OK` prints BACKUP_OK

## Inputs

- `.gsd/milestones/M008/slices/S23/S23-CONTENT-DRAFT.md` — T01 output: entity-encoded T02 Recipe HTML block (must exist and be non-empty before this task runs)
- `index.html` — current state with 89 `data-certeza` cards, 10 `card-nota-historiografica` elements, and append marker at ~line 2026 (use grep, not hardcoded line number)
- `C:/tmp/index.html.bak-s22` — available as prior restore point if needed

## Expected Output

- `index.html` — modified: S23-1 (`card-hecho`, `data-certeza="hecho"`) and S23-2 (`card-opinion`, `data-certeza="opini&#xF3;n"`) spliced before the append marker; `data-certeza` count advances from 89 to 91; `card-nota-historiografica` count advances from 10 to 11
- `C:/tmp/s23-cards.html` — created (temp, not committed): entity-encoded HTML for S23-1 and S23-2
- `C:/tmp/index.html.bak-s23` — created (temp, not committed): pre-splice restore point
