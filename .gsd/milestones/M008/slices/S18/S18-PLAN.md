# S18: Los unitarios conspiraban

**Goal:** Document the real unitario conspiracies (Asociación de Mayo, the bloqueo francés connection, the Coalición del Norte, the Comisión Argentina) that gave Rosas material grounds for claiming a genuine threat — and add a `card-nota-historiografica` distinguishing documented fact from Rosas's use of those facts as blanket pretext for repressing peaceful opponents.
**Demo:** Two `card-hecho` cards (S18-1: overview conspiracies with inline nota historiográfica; S18-2: Coalición del Norte 1840 with map image) are visible in the `#periodo-rosas` events-grid. `grep -c 'data-certeza' index.html` returns 82. The append marker remains intact at exactly 1 occurrence.

## Must-Haves

- S18-1: `card-hecho` covering Asociación de Mayo (1837–1838), apoyo al bloqueo francés (1838–1840), Comisión Argentina (1851), with Alberdi's dissent noted. `card-nota-historiografica` scoped to the pretext argument only (real conspiracies ≠ justification for repressing pacifists).
- S18-2: `card-hecho` covering the Coalición del Norte (1840–1841): Lavalle's invasion, Marco Avellaneda's uprising, coordinated French support, defeat and aftermath. Includes Wikimedia Commons map image at confirmed URL.
- Zero new CSS or JS introduced.
- All non-ASCII characters in the T02 Recipe HTML block encoded as HTML entities.
- Append marker remains intact (1 occurrence) after splice.

## Verification

```bash
grep -c 'data-certeza' index.html          # → 82 (+2 from S18-1 and S18-2)
grep -c 'data-id="S18-1"' index.html       # → 1
grep -c 'data-id="S18-2"' index.html       # → 1
grep -c 'cards will be appended here' index.html  # → 1 (marker intact)
git diff --name-only HEAD -- styles.css app.js    # (empty — no CSS/JS changes)
test -s C:/tmp/index.html.bak-s18 && echo BACKUP_OK   # → BACKUP_OK
grep -c 'card-nota-historiografica' index.html    # → 7 (+1: S18-1's nota)
test -s .gsd/milestones/M008/slices/S18/S18-CONTENT-DRAFT.md && echo DRAFT_OK  # → DRAFT_OK
```

## Observability / Diagnostics

**Runtime signals:**
- `grep -c 'data-certeza' index.html` — single-command health check; should return 82 after T02 splice
- `grep -c 'card-nota-historiografica' index.html` — should return 7 after T02 (was 6 before)
- `grep -c 'cards will be appended here' index.html` — must remain 1 (marker integrity check)

**Inspection surfaces:**
- `.gsd/milestones/M008/slices/S18/S18-CONTENT-DRAFT.md` — human-readable prose + T02 Recipe HTML block; entity check: `node -e "…"` as documented in T01 steps
- `C:/tmp/index.html.bak-s18` — pre-splice backup for rollback; `test -s C:/tmp/index.html.bak-s18 && echo BACKUP_OK`

**Failure visibility:**
- If T02 splice introduces non-ASCII bytes into index.html, the browser will not render the cards correctly. Diagnose with `node -e "const f=require('fs').readFileSync('index.html','utf8'); const m=f.match(/[^\x00-\x7F]/g); console.log(m ? m.length + ' non-ASCII chars' : 'clean');"` 
- If `data-certeza` count is wrong after splice, restore from backup: `cp C:/tmp/index.html.bak-s18 index.html`
- Scope boundary failure: search for `tiran` in S18 HTML block — should return zero hits

**Redaction:** No sensitive content in this slice. All sources are public domain or widely published academic works.

## Tasks

- [x] **T01: Author S18-CONTENT-DRAFT.md with full prose and entity-encoded T02 Recipe HTML** `est:20m`
  - Why: Creates the verified historical content and the verbatim HTML snippet that T02 will splice mechanically. Separates the high-risk creative/research work from the low-risk file manipulation.
  - Files: `.gsd/milestones/M008/slices/S18/S18-CONTENT-DRAFT.md`
  - Do:
    1. Write `S18-CONTENT-DRAFT.md` with two card entries following the established draft structure (Title → Year label → certeza → prose → sources → image notes → scope notes).
    2. **S18-1 prose** (card-hecho, no image): Cover Asociación de Mayo (Echeverría's Dogma Socialista, 1838, Buenos Aires intellectual circle → exile network); apoyo al bloqueo francés (1838–1840: exiliados in Montevideo and Paris lobbied the French government — Juan Cruz Varela and others documented); Alberdi's dissent (*La acción de la Europa en América*, Valparaíso, 1842 — argued European intervention was strategically and ethically wrong, showing the exile was not monolithic); Comisión Argentina (1851: organized in Montevideo with Urquiza and Brazil's backing, directly prepared Caseros). Year label: `1838 – 1851`. Title: "Los unitarios en el exilio conspiraban: la Asociación de Mayo, el bloqueo francés y la Comisión Argentina".
    3. **S18-1 `card-nota-historiografica`** (narrow — pretext argument only): These conspiracies were real documented events. The historiographic debate is whether Rosas used their existence as blanket cover to also target peaceful opponents who were not conspiring. Myers (*Orden y virtud*, UNQ, 1995) documents how the "conspirador unitario" label was applied beyond actual conspirators. Lynch (*Argentine Dictator*, Oxford, 1981, cap. 6) distinguishes documented plotters from those swept up in mass intimidation. Do NOT make the nota a general tiranía argument — that's S19's scope.
    4. **S18-2 prose** (card-hecho, with map image): Cover Lavalle's invasion from the litoral (July 1840) with French naval support and Uruguayan backing; Coalición del Norte — Marco Avellaneda (governor of Tucumán) plus Salta and Jujuy uprisings coordinated with Lavalle; defeat of coalition — Avellaneda captured and executed by order of Oribe on 3 November 1841 in Tucumán; Lavalle retreated northward and died in Jujuy on 9 October 1841 (shot through the window of the house where he sheltered); defeat confirmed Rosas's military dominance; followed by the most intense Mazorca repression period (1840–1842). Year label: `1840 – 1841`. Title: "La Coalición del Norte: Lavalle invade, las provincias se levantan". Image URL: `https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Mapa_ARGENTINA_1840_coalicion_del_norte.svg/500px-Mapa_ARGENTINA_1840_coalicion_del_norte.svg.png`. Alt text: "Mapa de Argentina hacia 1840 que muestra los movimientos militares de la Coalición del Norte".
    5. **Scope compliance checklist** in the draft:
       - S18 does NOT adjudicate whether Rosas was a tyrant (→ S19)
       - S18 covers the bloqueo francés from the unitario side (unitarios alentaron el bloqueo), NOT from Rosas's resistance side (→ S22)
       - Alberdi's dissent from the pro-intervention strategy is included (keeps R011 Alberdi thread alive)
    6. **T02 Recipe HTML block**: Write the verbatim splice HTML for both cards. ALL non-ASCII characters MUST be HTML entities (á→`&#xE1;`, é→`&#xE9;`, í→`&#xED;`, ó→`&#xF3;`, ú→`&#xFA;`, ñ→`&#xF1;`, ¿→`&#xBF;`, ó in `opinión`→`&#xF3;`). Card structure: `card-hecho reveal reveal-slide` with `data-certeza="hecho"`, certeza indicator `✓` (`&#x2713;`) with label "Hecho documentado". Stagger delays: S18-1 at 0ms, S18-2 at 80ms. S18-1 has no `<div class="card-image">` block. S18-2 has `<div class="card-image"><img src="[map URL]" alt="[alt]" loading="lazy"></div>`. Include `data-id="S18-1"` and `data-id="S18-2"` attributes. Include HTML comments `<!-- S18-1: ... -->` and `<!-- S18-2: ... -->` before each card.
    7. Verify all entities: run `grep -P '[^\x00-\x7F]' S18-CONTENT-DRAFT.md` on the T02 Recipe block section to confirm zero non-ASCII bytes in the HTML snippet.
  - Verify: `test -s .gsd/milestones/M008/slices/S18/S18-CONTENT-DRAFT.md && echo DRAFT_OK`
  - Done when: Draft file exists and is non-empty; the T02 Recipe HTML block is present and all non-ASCII in the HTML block are encoded as entities; scope compliance checklist is complete.

- [x] **T02: Splice S18 cards into index.html before append marker** `est:15m`
  - Why: Mechanically integrates the verified HTML from T01 into the live page. This is the integration step that makes the content visible and advances the data-certeza count from 80 to 82.
  - Files: `index.html`, `C:/tmp/s18-cards.html`, `C:/tmp/index.html.bak-s18`
  - Do:
    1. **Confirm preconditions**: `grep -c 'data-certeza' index.html` → 80; `grep -c 'cards will be appended here' index.html` → 1; `grep -c 'card-nota-historiografica' index.html` → 6. If any precondition fails, stop and diagnose before proceeding.
    2. **Write recovery backup**: `cp index.html C:/tmp/index.html.bak-s18` (create `C:/tmp/` first with `mkdir -p C:/tmp` if needed).
    3. **Write snippet file**: Copy the T02 Recipe HTML block verbatim from `S18-CONTENT-DRAFT.md` into `C:/tmp/s18-cards.html` using the Write tool (not heredoc — per KNOWLEDGE.md bash heredoc reliability entry).
    4. **Run Node.js splice one-liner** (ASCII-only marker substring — per KNOWLEDGE.md S10 entry on en-dash/Unicode failures):
       ```
       node -e "const fs=require('fs'); const idx=fs.readFileSync('index.html','utf8'); const cards=fs.readFileSync('C:/tmp/s18-cards.html','utf8'); const marker='cards will be appended here by subsequent slices'; const pos=idx.indexOf(marker); const lineStart=idx.lastIndexOf('\n',pos)+1; const result=idx.slice(0,lineStart)+cards+'\n'+idx.slice(lineStart); fs.writeFileSync('index.html',result,'utf8'); console.log('splice ok, pos='+pos);"
       ```
    5. **Run all 8 verification checks** in sequence:
       - `grep -c 'data-certeza' index.html` → 82
       - `grep -c 'data-id="S18-1"' index.html` → 1
       - `grep -c 'data-id="S18-2"' index.html` → 1
       - `grep -c 'cards will be appended here' index.html` → 1
       - `git diff --name-only HEAD -- styles.css app.js` → (empty)
       - `test -s C:/tmp/index.html.bak-s18 && echo BACKUP_OK` → BACKUP_OK
       - `grep -c 'card-nota-historiografica' index.html` → 7
       - `grep -c 'data-id="S18-' index.html` → 4 (2 attributes × 2 cards per KNOWLEDGE.md S13 multiplier rule; HTML comment + data-id = 2 matches per card)
    6. **If any check fails**: restore from backup (`cp C:/tmp/index.html.bak-s18 index.html`), diagnose the entity encoding or marker issue, fix `C:/tmp/s18-cards.html`, re-run the splice.
  - Verify: `grep -c 'data-certeza' index.html` returns 82 AND `grep -c 'cards will be appended here' index.html` returns 1
  - Done when: All 8 verification checks pass on first or recovered attempt; `git diff --name-only HEAD -- styles.css app.js` is empty.

## Files Likely Touched

- `.gsd/milestones/M008/slices/S18/S18-CONTENT-DRAFT.md`
- `index.html`
- `C:/tmp/s18-cards.html` (temp, not committed)
- `C:/tmp/index.html.bak-s18` (temp, not committed)
