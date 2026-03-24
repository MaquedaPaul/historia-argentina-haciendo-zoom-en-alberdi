---
estimated_steps: 5
estimated_files: 3
---

# T02: Splice S16 cards into index.html before append marker

**Slice:** S16 — La represión rosista — ¿perseguía y mataba?
**Milestone:** M008

## Description

Mechanically splice the three S16 cards from the T02 Recipe HTML block (authored in T01) into `index.html` before the append marker. Low-risk task if T01 is clean. Uses the established Node.js splice pattern: backup → write temp file via Write tool (not heredoc) → findIndex on ASCII-only marker substring → insert before marker → write back.

## Steps

1. **Confirm preconditions** before touching `index.html`:
   - `grep -c 'data-certeza' index.html` → must be 76 (three new cards will bring it to 79)
   - `grep -c 'cards will be appended here' index.html` → must be 1
   - `test -s .gsd/milestones/M008/slices/S16/S16-CONTENT-DRAFT.md && echo OK` → must print OK
   - If any check fails, STOP and resolve before proceeding.

2. **Create recovery backup**:
   - `mkdir -p C:/tmp && cp index.html C:/tmp/index.html.bak-s16`
   - Verify: `test -s C:/tmp/index.html.bak-s16 && echo BACKUP_OK`
   - (If `/tmp/` works in current environment, that path is also acceptable — use whichever works.)

3. **Extract the T02 Recipe HTML block from the draft** and write it to `C:/tmp/s16-cards.html` using the Write tool (not a heredoc or shell echo). The Recipe block is the verbatim HTML section at the bottom of `S16-CONTENT-DRAFT.md`, between the `<!-- T02 Recipe: START -->` and `<!-- T02 Recipe: END -->` markers (or equivalent delimiter used in T01).

4. **Run the Node.js splice**:
   ```bash
   node -e "
   const fs = require('fs');
   const html = fs.readFileSync('index.html', 'utf8');
   const cards = fs.readFileSync('C:/tmp/s16-cards.html', 'utf8');
   const lines = html.split('\n');
   const idx = lines.findIndex(l => l.includes('cards will be appended here by subsequent slices'));
   if (idx === -1) { console.error('MARKER NOT FOUND'); process.exit(1); }
   lines.splice(idx, 0, ...cards.split('\n'));
   fs.writeFileSync('index.html', lines.join('\n'), 'utf8');
   console.log('Spliced OK at line', idx);
   "
   ```
   - The search substring `'cards will be appended here by subsequent slices'` is ASCII-only (no en-dash). Per KNOWLEDGE.md, never use the en-dash in the Node.js search string.
   - If the script prints `MARKER NOT FOUND` and exits 1, the file has NOT been modified. Check `grep -n 'cards will be appended here' index.html` for the actual marker text and adjust the substring.

5. **Run all verification checks** (see Verification section below).

## Must-Haves

- [ ] Recovery backup created at `C:/tmp/index.html.bak-s16` (or `/tmp/index.html.bak-s16`) before any modification.
- [ ] Temp file written via Write tool, not heredoc or shell echo.
- [ ] ASCII-only marker substring used in `findIndex`.
- [ ] Splice reports success ("Spliced OK") before verification.
- [ ] All five verification checks pass.
- [ ] Zero CSS or JS changes.

## Verification

```bash
grep -c 'data-certeza' index.html                        # Expected: 79
grep -c 'data-id="S16-' index.html                       # Expected: 3 (one data-id per card)
grep -c 'data-id="S16-1"' index.html                     # Expected: 1 (not 0, not 2 — duplicate guard)
grep -c 'cards will be appended here' index.html         # Expected: 1 (marker still present)
git diff --name-only HEAD -- styles.css app.js           # Expected: (empty)
test -s C:/tmp/index.html.bak-s16 || test -s /tmp/index.html.bak-s16 && echo BACKUP_OK
```

Note on grep counts: Each S16 card has both `<!-- S16-N: ... -->` HTML comment AND `data-id="S16-N"` attribute. `grep -c 'data-id="S16-'` gives exactly 1 match per card (3 total). `grep -c 'S16-'` gives 2 per card (6 total) — use the `data-id` form for unambiguous card counting (per KNOWLEDGE.md pattern established in S13).

## Observability Impact

- Signals added/changed: Node.js splice prints "Spliced OK at line N" to stdout on success, `MARKER NOT FOUND` + exit(1) on failure. Failure leaves `index.html` unmodified.
- How a future agent inspects this: `grep -n 'data-id="S16-' index.html` gives exact line positions; `grep -c 'cards will be appended here' index.html` confirms marker is intact for S17.
- Failure state exposed: If splice fails silently (wrong byte count), `diff index.html C:/tmp/index.html.bak-s16 | head -40` shows what changed (or didn't). The backup is the recovery path.

## Inputs

- `.gsd/milestones/M008/slices/S16/S16-CONTENT-DRAFT.md` — T02 Recipe HTML block produced by T01; must exist and be non-empty.
- `index.html` — precondition: `data-certeza` count = 76, append marker present exactly once.

## Expected Output

- `index.html` — 3 new S16 cards (S16-1, S16-2, S16-3) inserted immediately before the append marker; `data-certeza` count = 79; append marker still present once; no CSS or JS changes.
- `C:/tmp/s16-cards.html` — temp splice snippet (not committed).
- `C:/tmp/index.html.bak-s16` — pre-splice recovery backup (not committed).
