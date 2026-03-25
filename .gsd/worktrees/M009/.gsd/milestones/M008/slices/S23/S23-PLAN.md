# S23: Encarnación Ezcurra — influencia sobre mujeres y apoyo a Rosas

**Goal:** Add two cards documenting the political role of Encarnación Ezcurra (1833–1838): one `card-hecho` covering the Sociedad Popular Restauradora, the intelligence correspondence, and the Revolución de los Restauradores (October 1833); and one `card-opinion` presenting the historiographic debate over the scale and autonomy of her political agency. Advances the `data-certeza` count from 89 to 91.

**Demo:** `grep -c 'data-certeza' index.html` returns 91; `grep -c 'data-id="S23-' index.html` returns 2; both cards are visible in `#periodo-rosas` immediately before the append marker; `grep -c 'card-nota-historiografica' index.html` returns 11; no new CSS or JS.

## Must-Haves

- Two cards: S23-1 (`card-hecho`, `data-certeza="hecho"`) and S23-2 (`card-opinion`, `data-certeza="opini&#xF3;n"`)
- S23-1 image: Encarnación Ezcurra 1835 portrait (García de Molino / Morel, PD, Wikimedia Commons 500px thumb)
- S23-2: embedded `card-nota-historiografica` with two-position historiographic debate (Irazusta revisionista vs. Lynch liberal synthesis), no separate image
- Entity-encoded T02 Recipe HTML — no raw non-ASCII characters in the splice block
- Stagger: S23-1 `--reveal-delay: 0ms`, S23-2 `--reveal-delay: 80ms` (slice-level reset, per KNOWLEDGE.md)
- Scope boundary: S23 must NOT re-narrate Barranco Yaco / Quiroga (S15), the Mazorca repression period (S16), the bloqueos (S14-2/S22-1), or Caseros — Encarnación died in 1838, before all these events
- Zero new CSS or JS (D001 hard constraint)
- `grep -c 'cards will be appended here' index.html` = 1 after splice (marker intact)

## Verification

```bash
grep -c 'data-certeza' index.html              # expect 91
grep -c 'data-id="S23-' index.html             # expect 2
grep -c 'cards will be appended here' index.html  # expect 1 (marker intact)
grep -c 'card-nota-historiografica' index.html  # expect 11
git diff --name-only HEAD -- styles.css app.js    # expect empty
test -s C:/tmp/index.html.bak-s23 && echo BACKUP_OK
```

Scope-boundary check (Node.js, ASCII-only):
```js
node -e "const f=require('fs').readFileSync('.gsd/milestones/M008/slices/S23/S23-CONTENT-DRAFT.md','utf8'); const r=f.slice(f.indexOf('## T02 Recipe')); const banned=['Barranco Yaco','Mazorca','bloqueo franc','bloqueo anglo','Vuelta de Obligado','Caseros']; const found=banned.filter(b=>r.includes(b)); console.log(found.length===0?'SCOPE_PASS':'SCOPE_FAIL:'+found.join(','));"
```

## Observability / Diagnostics

**Runtime signals:**
- `grep -c 'data-certeza' index.html` — tracks total certeza card count; must reach 91 after T02 splice
- `grep -c 'data-id="S23-' index.html` — confirms both S23 cards were spliced (expect 2)
- `grep -c 'cards will be appended here' index.html` — confirms append marker is intact (expect 1)
- `grep -c 'card-nota-historiografica' index.html` — confirms nota count increased by 1 (expect 11)

**Inspection surfaces:**
- `.gsd/milestones/M008/slices/S23/S23-CONTENT-DRAFT.md` — T01 output; inspect for entity encoding issues and scope-boundary violations before T02 runs
- `C:/tmp/s23-cards.html` — T02 intermediate file; inspect to verify HTML before splice
- `C:/tmp/index.html.bak-s23` — backup; verify with `test -s C:/tmp/index.html.bak-s23`

**Failure visibility:**
- Entity check failure: `node -e "..."` returns `ENTITY_FAIL:N lines with non-ASCII` — fix by encoding the offending characters before T02
- Scope check failure: `SCOPE_FAIL:term` — revise T02 Recipe to remove banned terms
- Splice failure: `grep -c 'data-certeza' index.html` still returns 89 — restore from backup and retry
- CSS/JS contamination: `git diff --name-only HEAD -- styles.css app.js` returns non-empty — revert immediately

**Redaction:** No secrets or credentials in this slice; all content is historical and archival.

## Tasks

- [x] **T01: Author S23-CONTENT-DRAFT.md with Encarnación Ezcurra cards and entity-encoded T02 Recipe** `est:30m`
  - Why: Produces the verified content draft and verbatim splice-ready HTML for T02. Historical accuracy and entity encoding are the only real risks in this slice — T02 is mechanical once T01 is correct.
  - Files: `.gsd/milestones/M008/slices/S23/S23-CONTENT-DRAFT.md`
  - Do: See T01-PLAN.md for full steps. Write two card entries (S23-1 hecho, S23-2 opinión) with prose metadata and a fully entity-encoded `## T02 Recipe` HTML block. Key constraints: do not assert exact marriage date (use year 1813 only); reference the Sociedad Popular Restauradora as the precursor institution (not "the Mazorca"); note that Encarnación died 20 October 1838 before the repressive Mazorca period; use the Lynch cap. 5 attributed-paraphrase pattern (no direct quote). Run entity check and scope-boundary check before marking done.
  - Verify: `test -s .gsd/milestones/M008/slices/S23/S23-CONTENT-DRAFT.md`
  - Done when: File exists, entity check returns ENTITY_PASS, scope-boundary check returns SCOPE_PASS

- [x] **T02: Splice S23-1 and S23-2 into index.html before the append marker** `est:15m`
  - Why: Integrates the two S23 cards into the live `#periodo-rosas` events-grid, advancing the data-certeza count from 89 to 91.
  - Files: `index.html`, `C:/tmp/s23-cards.html`, `C:/tmp/index.html.bak-s23`
  - Do: See T02-PLAN.md for full steps. Verify T01 output exists, confirm baseline at 89 data-certeza cards, write Recipe HTML to `C:/tmp/s23-cards.html`, backup `index.html`, splice using Node.js Array.splice with ASCII-only marker substring `cards will be appended here by subsequent slices`, run all verification checks.
  - Verify: `grep -c 'data-certeza' index.html` returns 91 and `grep -c 'data-id="S23-' index.html` returns 2
  - Done when: All six verification checks pass (data-certeza=91, S23 cards=2, marker intact, nota count=11, no CSS/JS changes, backup exists)

## Files Likely Touched

- `index.html` — splice target: two new cards before append marker
- `.gsd/milestones/M008/slices/S23/S23-CONTENT-DRAFT.md` — T01 output
- `C:/tmp/s23-cards.html` — temp file (not committed)
- `C:/tmp/index.html.bak-s23` — backup (not committed)
