# S21: La Suma del Poder Público — ¿avalada por todas las provincias?

**Goal:** Add two cards to `index.html` explaining (1) the constitutional mechanics of the Suma del Poder Público — what the three-power concentration actually meant, the 14 provinces in 1835, and why the Buenos Aires Legislatura grant did not legally bind the other provinces — and (2) the historiographic debate over whether the other provinces "endorsed" it, using a `card-nota-historiografica` with three positions.
**Demo:** After T02 completes, `grep -c 'data-certeza' index.html` returns 88 (up from 86), `grep -c 'data-id="S21-' index.html` returns 2, and the append marker remains intact. The two cards are visible in the `#periodo-rosas` section with correct certeza classification, sources, and reveal animations.

## Must-Haves

- S21-1 (`card-hecho`): covers constitutional mechanics of the Suma — what "concentration of the three powers" meant for the Buenos Aires Legislatura, the list of 14 provinces, and the structural distinction between the BA Legislatura's competence and the other provinces' non-competence under the Confederation structure.
- S21-1 does NOT repeat S14-1 content: no re-narration of the plebiscite event, the 9,316 vote count, the 13 April 1835 formalization date, or the "Restaurador de las Leyes" title.
- S21-2 (`card-opinion`, `data-certeza="opinión"`, entity-encoded): historiographic debate on provincial endorsement — three positions (revisionist, liberal, contemporary synthesis) each with author + title + year attribution.
- S21-2 includes a `card-nota-historiografica` block placed after `<p class="event-card__excerpt">` and before `<footer class="card-source">`.
- Plebiscite figure: 9,316 (matching S14-1, per D051).
- Zero new CSS or JS.
- All non-ASCII characters in the T02 Recipe HTML block are HTML-entity-encoded (D053).
- Node.js splice uses the ASCII-only marker substring `cards will be appended here by subsequent slices`.

## Verification

```bash
grep -c 'data-certeza' index.html                    # → 88
grep -c 'data-id="S21-' index.html                  # → 2
grep -c 'cards will be appended here' index.html     # → 1 (marker intact)
git diff --name-only HEAD -- styles.css app.js       # → (empty)
test -s C:/tmp/index.html.bak-s21 && echo BACKUP_OK
```

## Observability / Diagnostics

**Runtime signals for S21:**
- The primary observable artifact is `.gsd/milestones/M008/slices/S21/S21-CONTENT-DRAFT.md` (T01 output). Existence and non-emptiness are verified with `test -s`.
- Entity-encoding correctness is verified with the Node.js recipe check: `node -e "const f=require('fs').readFileSync('.gsd/milestones/M008/slices/S21/S21-CONTENT-DRAFT.md','utf8'); const recipe=f.slice(f.indexOf('## T02 Recipe')); const lines=recipe.split('\\n').filter(l=>/[^\\x00-\\x7F]/.test(l)); console.log(lines.length===0?'PASS':'FAIL:'+lines.length);"` — returns `PASS` or `FAIL: N non-ASCII lines`.
- Post-splice, `grep -c 'data-certeza' index.html` reports the running total of certeza-classified cards in the live page; expected value after S21 is 88.
- Post-splice, `grep -c 'data-id="S21-' index.html` confirms both S21 cards are present (expected: 2).
- Marker integrity: `grep -c 'cards will be appended here' index.html` must remain 1 throughout — a value of 0 signals the marker was accidentally removed; a value >1 signals a duplicate.
- Failure state: if the splice fails or produces wrong counts, the backup `C:/tmp/index.html.bak-s21` enables full restore via `cp C:/tmp/index.html.bak-s21 index.html`.
- Scope boundary check: `node -e "const f=require('fs').readFileSync('.gsd/milestones/M008/slices/S21/S21-CONTENT-DRAFT.md','utf8'); const r=f.slice(f.indexOf('## T02 Recipe')); const banned=['9,316','9316','Restaurador de las Leyes','13 de abril de 1835']; const found=banned.filter(b=>r.includes(b)); console.log(found.length===0?'SCOPE_PASS':'SCOPE_FAIL:'+found.join(','));"` — must return `SCOPE_PASS`.
- **Redaction:** No secrets or sensitive data appear in this slice. All content is public-domain historical scholarship.

## Tasks

- [x] **T01: Author S21 content draft with two-card prose and entity-encoded T02 Recipe block** `est:25m`
  - Why: Establishes the historical content, certeza classification, sources, and verbatim entity-encoded HTML that T02 will splice. All accuracy and scope decisions happen here.
  - Files: `.gsd/milestones/M008/slices/S21/S21-CONTENT-DRAFT.md`
  - Do:
    1. Write `S21-CONTENT-DRAFT.md` with two sections — S21-1 prose and S21-2 prose — followed by a T02 Recipe block containing entity-encoded HTML for both cards.
    2. **S21-1 prose** (`card-hecho`): Explain that the Suma del Poder Público (Ley del 13 de abril de 1835) concentrated executive, legislative, and judicial powers in the gobernador of Buenos Aires, effectively dissolving the Legislatura as a co-equal branch. List the 14 provinces of the Confederation in 1835: Buenos Aires, Córdoba, Corrientes, Entre Ríos, Santa Fe, Santiago del Estero, Tucumán, Salta, Mendoza, San Juan, La Rioja, Catamarca, San Luis, Jujuy (autonomous since 1834). Explain the Confederation's jurisdictional structure: each province was sovereign over its own internal affairs; the Pacto Federal (4 January 1831) delegated only *relaciones exteriores* to Buenos Aires/Rosas — it did NOT create a national legislature or national executive. Therefore, the Suma was legally a Buenos Aires-internal instrument; Rosas could not pass laws binding Córdoba or Tucumán by virtue of it. Reference (don't narrate) that the Suma was granted in April 1835 — S14-1 already covers the plebiscite event. Sources: Lynch, J., *Argentine Dictator*, Oxford, 1981, cap. 4; Myers, J., *Orden y virtud*, UNQ, 1995; Zinny, A., *Historia de los gobernadores*, 1882; Saldías, A., *Historia de la Confederación Argentina*, t. II, 1892.
    3. **S21-2 prose** (`card-opinion`, certeza `opinión`): Frame the interpretive question — did the other provinces endorse the Suma? Present three positions with attribution: (a) Revisionist (Irazusta, Rosa): the Pacto Federal gave Rosas de facto national authority; all 14 governors were aligned with the federal cause; the Suma was the formal expression of what was already the political reality. Cite: Irazusta, J., *Vida política de Juan Manuel de Rosas*, Buenos Aires, 1941. (b) Liberal (Mitre): the Suma was a Buenos Aires internal act; the other provinces' silence reflected Rosas's coercive dominance, not genuine consent. Cite: Mitre, B., *Historia de Belgrano y de la Independencia Argentina*, 1857. (c) Contemporary synthesis (Lynch 1981, Myers 1995): legally the Suma was confined to Buenos Aires; practically Rosas wielded it as a de facto national instrument by controlling customs revenue (the Aduana) and diplomatic recognition. The conceptual confusion between "BA governor with extraordinary powers" and "national ruler" was a deliberate ambiguity that served Rosas's interests. Cite: Lynch, cap. 4; Myers, cap. 2.
    4. **T02 Recipe block**: Write the verbatim HTML for both cards with all non-ASCII characters entity-encoded. S21-1: `card-hecho` with `card-image` div (Pellegrini image URL: `https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Buenos_Aires_-_San_Nicol%C3%A1s_-_Carlos_Pellegrini.jpg/500px-Buenos_Aires_-_San_Nicol%C3%A1s_-_Carlos_Pellegrini.jpg`), `data-id="S21-1"`, stagger `--reveal-delay: 0ms`. S21-2: `card-opinion` with `data-certeza="opini&#xF3;n"`, `data-id="S21-2"`, stagger `--reveal-delay: 80ms`, `card-nota-historiografica` block inside the article body (after excerpt, before footer).
    5. Run entity-check on the Recipe block via Node.js: `node -e "const f=require('fs').readFileSync('.gsd/milestones/M008/slices/S21/S21-CONTENT-DRAFT.md','utf8'); const recipe=f.slice(f.indexOf('## T02 Recipe')); const lines=recipe.split('\n').filter(l=>/[^\x00-\x7F]/.test(l)); console.log(lines.length===0?'PASS':'FAIL:'+lines.length);"` — must return PASS.
    6. Verify scope boundary: confirm the draft does NOT contain the strings `9,316`, `9316`, `Restaurador de las Leyes`, or `13 de abril de 1835` as standalone claims (these belong to S14-1). If present, reframe as references, not re-narrations.
  - Verify: `test -s .gsd/milestones/M008/slices/S21/S21-CONTENT-DRAFT.md && grep -c '## S21-' .gsd/milestones/M008/slices/S21/S21-CONTENT-DRAFT.md` returns 2 (both sections present); `grep -c '## T02 Recipe' .gsd/milestones/M008/slices/S21/S21-CONTENT-DRAFT.md` returns 1.
  - Done when: `S21-CONTENT-DRAFT.md` exists, has sections for S21-1, S21-2, and T02 Recipe; entity-check on the Recipe block passes (0 raw non-ASCII lines); scope boundary check shows no standalone re-narration of S14-1 facts.

- [x] **T02: Splice S21 cards into index.html before append marker** `est:15m`
  - Why: Materializes the content draft into the live page. After this, S21 is visually present in `#periodo-rosas` with correct reveal animations.
  - Files: `index.html`, `C:/tmp/s21-cards.html`, `C:/tmp/index.html.bak-s21`
  - Do:
    1. **Precondition check**: verify `test -s .gsd/milestones/M008/slices/S21/S21-CONTENT-DRAFT.md`. If missing, author the draft per T01 steps before continuing.
    2. **Confirm current data-certeza count**: `grep -c 'data-certeza' index.html` must return 86.
    3. **Find marker line**: `grep -n 'cards will be appended here by subsequent slices' index.html` — record line number N.
    4. **Create temp dir**: `mkdir -p C:/tmp`
    5. **Write temp card file**: Use the Write tool to create `C:/tmp/s21-cards.html` with the verbatim entity-encoded HTML from the T02 Recipe block of `S21-CONTENT-DRAFT.md`. Both cards go in this file (S21-1 first, then S21-2), separated by a blank line.
    6. **Backup**: `cp index.html C:/tmp/index.html.bak-s21`
    7. **Splice**: Run Node.js to insert the temp file content immediately before line N (the marker line):
       ```
       node -e "
       const fs=require('fs');
       const lines=fs.readFileSync('index.html','utf8').split('\n');
       const cards=fs.readFileSync('C:/tmp/s21-cards.html','utf8');
       const idx=lines.findIndex(l=>l.includes('cards will be appended here by subsequent slices'));
       lines.splice(idx,0,cards);
       fs.writeFileSync('index.html',lines.join('\n'),'utf8');
       console.log('Spliced at line '+idx);
       "
       ```
    8. **Verify all checks pass** (run each command, confirm expected value):
       - `grep -c 'data-certeza' index.html` → 88
       - `grep -c 'data-id="S21-' index.html` → 2
       - `grep -c 'cards will be appended here' index.html` → 1
       - `git diff --name-only HEAD -- styles.css app.js` → (empty)
       - `test -s C:/tmp/index.html.bak-s21 && echo BACKUP_OK` → BACKUP_OK
    9. If `data-certeza` count is not 88: `diff C:/tmp/index.html.bak-s21 index.html | head -60` to diagnose, then restore from backup and retry with corrected card HTML.
  - Verify: `grep -c 'data-certeza' index.html` returns 88 AND `grep -c 'data-id="S21-' index.html` returns 2 AND `grep -c 'cards will be appended here' index.html` returns 1.
  - Done when: All 5 verification checks pass; `git diff --name-only HEAD -- styles.css app.js` is empty (no CSS/JS changes).

## Files Likely Touched

- `index.html` — splice target: S21-1 and S21-2 cards inserted before append marker
- `.gsd/milestones/M008/slices/S21/S21-CONTENT-DRAFT.md` — new: prose + entity-encoded HTML for both cards
- `C:/tmp/s21-cards.html` — temp (not committed)
- `C:/tmp/index.html.bak-s21` — backup (not committed)
