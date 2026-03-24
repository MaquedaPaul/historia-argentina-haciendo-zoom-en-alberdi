# S24: Encarnación Ezcurra antes de Rosas — ¿era conocida?

**Goal:** Add two cards to `#periodo-rosas` covering Encarnación Ezcurra's pre-Rosas biography — family origin, education, social position, and the historiographic question of whether her political influence was structurally autonomous or constructed in function of Rosas's project.
**Demo:** `grep -c 'data-certeza' index.html` returns **93**; `grep -c 'data-id="S24-' index.html` returns **2**; `grep -c 'card-nota-historiografica' index.html` returns **12**; append marker intact at 1; no CSS/JS changes.

## Must-Haves

- S24-1: `card-hecho`, `data-certeza="hecho"` — biographical facts: full name, birth date (25 March 1795), father Juan Ignacio de Ezcurra (Cabildo / Consulado de Comercio), mother Teodora Arguibel (Argentine, French descent), elite merchant family, education in reading/writing/math for family business, marriage date 16 March 1813, sister María Josefa / Belgrano connection (Pedro Rosas y Belgrano adopted by the couple), no pre-Rosas public political activity documented.
- S24-2: `card-opinion`, `data-certeza="opinión"` — two-position `card-nota-historiografica` on whether her agency was structurally hers or built in function of Rosas; no card-image block (mirrors S23-2 / S21-2 no-image pattern for interpretive companion cards).
- Zero new CSS or JS (hard constraint D001).
- All non-ASCII characters in T02 Recipe HTML entity-encoded (D053).
- Stagger delay reset: S24-1 at `--reveal-delay: 0ms`, S24-2 at `--reveal-delay: 80ms`.
- Do NOT reuse `Encarnacion_Ezcurra_1835.jpg` — already in S23-1 on the same page.
- Scope boundary: no banned terms in T02 Recipe HTML (Mazorca, Caseros, Barranco Yaco, bloqueo franc, Vuelta de Obligado, Restauradores, Sociedad Popular Restauradora).

## Verification

| Check | Command | Expected |
|-------|---------|----------|
| data-certeza count | `grep -c 'data-certeza' index.html` | **93** |
| S24 cards present | `grep -c 'data-id="S24-' index.html` | **2** |
| Append marker intact | `grep -c 'cards will be appended here' index.html` | **1** |
| Nota count | `grep -c 'card-nota-historiografica' index.html` | **12** |
| No CSS/JS changes | `git diff --name-only HEAD -- styles.css app.js` | **(empty)** |
| Backup exists | `test -s C:/tmp/index.html.bak-s24` | exit 0 |
| Scope boundary | Node.js banned-string check | **SCOPE_PASS** |

## Tasks

- [x] **T01: Author S24-CONTENT-DRAFT.md with entity-encoded T02 Recipe HTML** `est:20m`
  - Why: Establishes all historical content and the verbatim HTML to be spliced. All accuracy, certeza classification, image selection, and entity-encoding decisions happen here. T02 is mechanical once T01 passes ENTITY_PASS and SCOPE_PASS.
  - Files: `.gsd/milestones/M008/slices/S24/S24-CONTENT-DRAFT.md`
  - Do: See T01-PLAN.md for full steps.
  - Verify: `test -s .gsd/milestones/M008/slices/S24/S24-CONTENT-DRAFT.md && grep -c '## T02 Recipe' .gsd/milestones/M008/slices/S24/S24-CONTENT-DRAFT.md`
  - Done when: Draft file exists, contains `## T02 Recipe` section, ENTITY_PASS confirmed (Node.js byte check on the Recipe block), SCOPE_PASS confirmed (Node.js banned-string check on the Recipe block).

- [x] **T02: Splice S24 cards into index.html before append marker** `est:10m`
  - Why: Delivers the two cards into the live page, completing S24 and closing M008.
  - Files: `index.html`, `C:/tmp/s24-cards.html`, `C:/tmp/index.html.bak-s24`
  - Do: See T02-PLAN.md for full steps.
  - Verify: All 7 verification checks in the table above pass.
  - Done when: `grep -c 'data-certeza' index.html` = 93 and `grep -c 'data-id="S24-' index.html` = 2.

## Observability / Diagnostics

**Runtime signals:**
- T01 ENTITY_PASS: `node -e "const f=require('fs').readFileSync('.gsd/milestones/M008/slices/S24/S24-CONTENT-DRAFT.md','utf8'); const recipe=f.slice(f.indexOf('## T02 Recipe')); const n=recipe.split('\n').filter(l=>/[^\x00-\x7F]/.test(l)); console.log(n.length===0?'ENTITY_PASS':'ENTITY_FAIL:'+n.length);"`
- T01 SCOPE_PASS: `node -e "const f=require('fs').readFileSync('.gsd/milestones/M008/slices/S24/S24-CONTENT-DRAFT.md','utf8'); const recipe=f.slice(f.indexOf('## T02 Recipe')); const banned=['Mazorca','Caseros','Barranco Yaco','bloqueo franc','Vuelta de Obligado','Restauradores','Sociedad Popular Restauradora']; const found=banned.filter(b=>recipe.includes(b)); console.log(found.length===0?'SCOPE_PASS':'SCOPE_FAIL:'+found.join(','));"`
- T02 splice pre-check: `grep -c 'cards will be appended here' index.html` must return 1 before and after splice.
- T02 post-splice: `grep -c 'data-certeza' index.html` must equal 93; `grep -c 'data-id="S24-' index.html` must equal 2.

**Inspection surfaces:**
- `.gsd/milestones/M008/slices/S24/S24-CONTENT-DRAFT.md` — human-readable draft with prose and verbatim Recipe block; open to verify content before T02.
- `C:/tmp/s24-cards.html` — extracted card HTML; inspect to verify entity encoding and structure before splice.
- `C:/tmp/index.html.bak-s24` — pre-splice backup; if post-splice verification fails, restore with `copy C:\tmp\index.html.bak-s24 index.html`.

**Failure visibility:**
- ENTITY_FAIL output names count of offending lines; grep `.gsd/milestones/M008/slices/S24/S24-CONTENT-DRAFT.md` for non-ASCII to locate them.
- SCOPE_FAIL output names the offending banned term(s).
- If `grep -c 'data-certeza' index.html` returns 91 after T02, the splice landed outside the marker or the Recipe block had encoding errors that corrupted the HTML.
- Backup path `C:/tmp/index.html.bak-s24` must never be redacted; it is a local temp file with no secrets.

## Files Likely Touched

- `index.html`
- `.gsd/milestones/M008/slices/S24/S24-CONTENT-DRAFT.md`
- `C:/tmp/s24-cards.html`
- `C:/tmp/index.html.bak-s24`
