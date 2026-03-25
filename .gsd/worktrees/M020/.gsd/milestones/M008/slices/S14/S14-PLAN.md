# S14: El segundo gobierno de Rosas — el Restaurador

**Goal:** Add 3 verified cards to `#periodo-rosas` narrating the second Rosas mandate (1835–1852): the mechanics of the return and Suma del Poder Público acquisition (card-hecho), the geopolitical events of the mandate — French blockade, Vuelta de Obligado, Caseros (card-hecho), and a brief historiographic note seeding the S15–S19 debate (card-opinion, data-certeza="debatido").
**Demo:** `grep -c 'data-certeza' index.html` returns 74 (currently 71 + 3 new cards). `grep -c 'data-id="S14-' index.html` returns 3. Both S14 cards appear inside `#periodo-rosas` in browser. No CSS or JS was modified.

## Must-Haves

- 3 new cards inserted before `<!-- S10–S24 cards will be appended here by subsequent slices -->` marker in `#periodo-rosas`
- S14-1: `card-hecho`, `data-certeza="hecho"`, covers the return to power and Suma del Poder Público acquisition (1835). Uses plebiscite figure **9,316** (matches SP3-1) to avoid visible contradiction. Image: `Divisas_de_la_%C3%A9poca_de_Rosas.jpg` (CC BY 2.5 ar, attribution required). Explicitly links to S13-2 narrative thread ("denied the Suma in 1832, now demanded it as condition").
- S14-2: `card-hecho`, `data-certeza="hecho"`, covers geopolitical events NOT in SP3: French blockade (1838–1840), Anglo-French blockade and Vuelta de Obligado (1845), fall at Caseros (3 Feb 1852). Image: `Batalla_de_la_Vuelta_de_Obligado.jpg` (Public domain). Does NOT repeat the Caseros narrative detail already in SP3-6 — keeps the angle on the full mandate arc.
- S14-3: `card-opinion`, `data-certeza="debatido"`, with `card-nota-historiografica` paragraph seeding the debate that S15–S19 will develop. No image. Brief.
- Stagger delays reset: S14-1 = 0ms, S14-2 = 80ms, S14-3 = 160ms.
- Zero CSS or JS changes.
- `S14-CONTENT-DRAFT.md` written with full prose + verbatim T02 Recipe HTML block.

## Verification

```bash
# After T02 splice — run from working directory:
grep -c 'data-certeza' index.html          # Must be 74
grep -c 'data-id="S14-' index.html         # Must be 3
grep -c 'cards will be appended here' index.html  # Must remain 1
git diff --name-only HEAD -- styles.css app.js    # Must be empty
test -s .gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md && echo OK
```

## Tasks

- [x] **T01: Write S14-CONTENT-DRAFT.md with verified prose and T02 Recipe HTML block** `est:30m`
  - Why: All historical authorship, source verification, and image selection happens here. T02 is purely mechanical — it depends on this draft being complete and correct.
  - Files: `.gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md`
  - Do: Write the content draft with 3 card entries (S14-1, S14-2, S14-3) following the content-draft format established in S09–S13. Include: title, year display, certeza type, excerpt (3–5 sentences), sources, image URL, and attribution notes. For S14-1: use plebiscite figure 9,316 (not 9,320) to match SP3-1 already in index.html. For S14-2: cover French blockade 1838–1840, Vuelta de Obligado (20 Nov 1845), and fall at Caseros (3 Feb 1852) — events NOT covered by SP3; do not re-narrate the Caseros detail already in SP3-6. For S14-3: write a brief card-opinion/debatido paragraph with card-nota-historiografica. CC BY 2.5 ar attribution for S14-1 image (Divisas). At the end of the draft, include a complete "T02 Recipe HTML block" — the verbatim HTML for all 3 articles ready for splice, using data-id="S14-1", data-id="S14-2", data-id="S14-3", stagger delays 0ms/80ms/160ms.
  - Verify: `test -s .gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md && echo OK` and `grep -c 'T02 Recipe\|data-id="S14-' .gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md` returns ≥4 (1 section header + 3 data-id occurrences)
  - Done when: Draft file is non-empty, contains 3 card entries (S14-1, S14-2, S14-3) with prose, sources, image notes, and a complete verbatim T02 Recipe HTML block.

- [x] **T02: Splice S14 cards into index.html before append marker** `est:20m`
  - Why: Delivers the actual user-facing content into the page. Zero authorship — pure mechanical splice using the T02 Recipe HTML from S14-CONTENT-DRAFT.md.
  - Files: `index.html`, `C:/tmp/s14-cards.html`, `C:/tmp/index.html.bak-s14`
  - Do: (1) `mkdir -p C:/tmp` (2) Copy index.html to `C:/tmp/index.html.bak-s14` as recovery backup. (3) Copy the verbatim T02 Recipe HTML block from S14-CONTENT-DRAFT.md into a temp file `C:/tmp/s14-cards.html` using the Write tool (not heredoc — per KNOWLEDGE.md). (4) Run Node.js splice: read index.html, find marker using ASCII-only substring `'cards will be appended here by subsequent slices'` (no en-dash), insert s14-cards.html content immediately before the marker line, write back. (5) Run all 5 verification checks. (6) If any check fails, restore from backup and diagnose.
  - Verify: `grep -c 'data-certeza' index.html` = 74; `grep -c 'data-id="S14-' index.html` = 3; `grep -c 'cards will be appended here' index.html` = 1; `git diff --name-only HEAD -- styles.css app.js` is empty
  - Done when: All 4 bash checks pass, data-certeza count = 74, 3 S14 data-id cards confirmed in index.html.

## Observability / Diagnostics

**Runtime signals:**
- After T01: `test -s .gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md && echo OK` — confirms the draft file is non-empty.
- After T02: `grep -c 'data-certeza' index.html` must be 74; `grep -c 'data-id="S14-' index.html` must be 3.
- `grep -c 'cards will be appended here' index.html` must remain 1 — confirms the marker was not accidentally duplicated or deleted.
- `git diff --name-only HEAD -- styles.css app.js` must be empty — confirms zero CSS/JS changes.

**Inspection surfaces:**
- `S14-CONTENT-DRAFT.md` is the human-readable authorship record; all prose, sources, and image attribution live here.
- `C:/tmp/s14-cards.html` (after T02) holds the verbatim HTML snippet that was spliced — useful for diffing if the splice produced unexpected output.
- `C:/tmp/index.html.bak-s14` (after T02) is the pre-splice recovery backup.

**Failure visibility:**
- If `data-certeza` count is 73 or 72 after T02: one or two cards were not inserted. Check `grep -n 'cards will be appended here' index.html` to confirm marker is present, then inspect `C:/tmp/s14-cards.html` for malformed HTML.
- If `data-id="S14-"` count is wrong: check for typos in `data-id` attributes in the Recipe HTML block.
- If marker count is 0: the Node.js splice accidentally deleted the marker. Restore from `C:/tmp/index.html.bak-s14`.

**Redaction:** No sensitive data. All content is public-domain historical prose.

## Files Likely Touched

- `index.html` — 3 new cards inserted before append marker in `#periodo-rosas`
- `.gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md` — created in T01
- `C:/tmp/s14-cards.html` — temp file (not committed)
- `C:/tmp/index.html.bak-s14` — recovery backup (not committed)
