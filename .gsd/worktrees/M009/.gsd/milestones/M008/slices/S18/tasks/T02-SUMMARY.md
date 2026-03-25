---
id: T02
parent: S18
milestone: M008
provides:
  - index.html with S18-1 and S18-2 cards spliced before append marker; data-certeza count 80→82; card-nota-historiografica count 6→7
key_files:
  - index.html
key_decisions:
  - Check 8 in the plan ("data-id S18- → 4") was based on a faulty assumption that HTML comments would contain the string `data-id="S18-`; they don't — the grep correctly returns 2 (one per card's data-id attribute). Plan count was wrong; actual HTML is correct.
patterns_established:
  - grep -c 'data-id="S18-' counts attribute occurrences only (not HTML comments) — expect 2 for 2 cards, not 4
observability_surfaces:
  - grep -c 'data-certeza' index.html → 82 (health check)
  - grep -c 'card-nota-historiografica' index.html → 7 (health check)
  - grep -c 'cards will be appended here' index.html → 1 (marker integrity)
  - C:/tmp/index.html.bak-s18 → pre-splice backup (non-ASCII restore: cp C:/tmp/index.html.bak-s18 index.html)
duration: 8m
verification_result: passed
completed_at: 2026-03-23
blocker_discovered: false
---

# T02: Splice S18 cards into index.html before append marker

**Spliced S18-1 (Asociación de Mayo / bloqueo francés / Comisión Argentina, with card-nota-historiográfica) and S18-2 (Coalición del Norte with map image) into index.html before the append marker; all 8 verification checks pass; data-certeza count advanced from 80 to 82.**

## What Happened

Confirmed preconditions (data-certeza=80, marker=1, nota=6), created backup at `C:/tmp/index.html.bak-s18`, wrote snippet to `C:/tmp/s18-cards.html` using Write tool (not heredoc), then ran the Node.js splice one-liner with ASCII-only marker string (`cards will be appended here by subsequent slices`). Splice reported `pos=173822`. All 8 core checks passed immediately on first attempt. The S18 card HTML contains zero non-ASCII characters (confirmed via Node.js block-level check).

Note on check 8: the plan expected `grep -c 'data-id="S18-'` to return 4 ("2 per card including HTML comment"), but the HTML comments use the form `<!-- S18-1: ... -->` (no `data-id=` prefix), so grep correctly returns 2 (one attribute per card). The HTML structure is correct; the expected count in the plan was mistaken.

## Verification

All preconditions confirmed before any file mutation. Node.js splice ran cleanly on first attempt. Non-ASCII check on S18 card content block: zero bad lines (the 1 non-ASCII byte in the broad block range belonged to a pre-existing `<!-- S10–S24 -->` comment). Slice-level diagnostics: tiran boundary check clean (no `tiran` in S18 cards), CSS/JS diff empty.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c 'data-certeza' index.html` → 82 | 0 | ✅ pass | <1s |
| 2 | `grep -c 'data-id="S18-1"' index.html` → 1 | 0 | ✅ pass | <1s |
| 3 | `grep -c 'data-id="S18-2"' index.html` → 1 | 0 | ✅ pass | <1s |
| 4 | `grep -c 'cards will be appended here' index.html` → 1 | 0 | ✅ pass | <1s |
| 5 | `git diff --name-only HEAD -- styles.css app.js` → empty | 0 | ✅ pass | <1s |
| 6 | `test -s C:/tmp/index.html.bak-s18 && echo BACKUP_OK` → BACKUP_OK | 0 | ✅ pass | <1s |
| 7 | `grep -c 'card-nota-historiografica' index.html` → 7 | 0 | ✅ pass | <1s |
| 8 | `grep -c 'data-id="S18-' index.html` → 2 (plan said 4, but 2 is correct — see Deviations) | 0 | ✅ pass (structural content correct) | <1s |
| 9 | Node.js non-ASCII check on S18 card block → 0 lines | 0 | ✅ pass | <1s |
| 10 | `grep -c 'card-nota-historiografica' index.html` (slice check) → 7 | 0 | ✅ pass | <1s |
| 11 | `test -s .gsd/milestones/M008/slices/S18/S18-CONTENT-DRAFT.md && echo DRAFT_OK` → DRAFT_OK | 0 | ✅ pass | <1s |

## Diagnostics

- **Health check:** `grep -c 'data-certeza' index.html` → 82
- **Marker integrity:** `grep -c 'cards will be appended here' index.html` → 1
- **Nota count:** `grep -c 'card-nota-historiografica' index.html` → 7
- **Card locations in index.html:** S18-1 at line 1866, S18-2 at line 1882
- **Non-ASCII check for S18 block:** `node -e "const fs=require('fs'); const c=fs.readFileSync('index.html','utf8'); const s=c.indexOf('<!-- S18-1:'); const e=c.indexOf('<!-- S18-2:'); const s2=c.indexOf('<!-- S18-2:'); const e2=c.indexOf('cards will be appended here'); const block=c.slice(s,e)+c.slice(s2,e2); const bad=block.split('\n').filter(l=>/[^\x00-\x7F]/.test(l)); console.log(bad.length===0?'CLEAN':'FAIL: '+bad.length+' lines');"`
- **Rollback:** `cp C:/tmp/index.html.bak-s18 index.html`

## Deviations

- **Check 8 expected count:** Plan said `grep -c 'data-id="S18-'` should return 4 ("HTML comment + data-id attribute = 2 per card"). In practice, the HTML comments `<!-- S18-1: Los unitarios... -->` do not contain the string `data-id="S18-`, so grep correctly returns 2 (one per card's article element). The cards are structurally correct; the plan's expected count was based on a faulty understanding of what grep would match. No action needed.

## Known Issues

None. All slice-level verification checks pass.

## Files Created/Modified

- `index.html` — S18-1 and S18-2 cards spliced before append marker; data-certeza 80→82; card-nota-historiografica 6→7
- `C:/tmp/s18-cards.html` — temp splice snippet (not committed)
- `C:/tmp/index.html.bak-s18` — pre-splice recovery backup (not committed)
