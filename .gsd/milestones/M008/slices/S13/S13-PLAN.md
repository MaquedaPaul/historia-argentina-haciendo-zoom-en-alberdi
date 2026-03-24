# S13: El primer gobierno de Rosas — cómo llegó al poder

**Goal:** Add two `card-hecho` articles to `#periodo-rosas` narrating (1) the crisis of 1828–1829 that brought Rosas to power (Dorrego's execution, civil war, Rosas's election as governor) and (2) the first mandate (1829–1832): what Rosas did, why he stepped down, and the key nuance that the Campaña del Desierto (1833) happened *after* he left office.

**Demo:** `grep -c 'data-certeza' index.html` returns **71** (was 69); `grep -c 'S13-' index.html` returns **2**; both cards are visible in the browser at `#periodo-rosas` with reveal-on-scroll; `git diff --name-only HEAD -- styles.css app.js` is empty.

## Must-Haves

- Card S13-1 (`data-certeza="hecho"`, `--reveal-delay: 0ms`): narrates the Lavalle coup (1 Dec 1828), Dorrego's execution (13 Dec 1828), the federal civil war, Puente de Márquez (April 1829), the two Convenios (Cañuelas June 1829, Barracas August 1829), and the Legislatura's election of Rosas as governor (8 Dec 1829). Image: `Juan_Manuel_de_Rosas_1829.jpg` (UNUSED, PD).
- Card S13-2 (`data-certeza="hecho"`, `--reveal-delay: 80ms`): narrates the first mandate (1829–1832) — ordinary powers (Suma del Poder Público rejected by Legislatura), fiscal consolidation, milicia strengthening, retirement in December 1832 when Suma still not granted — **including the explicit nuance** that the Campaña del Desierto (1833) was commanded by Rosas as military officer under Governor Balcarce, not as governor. Image: `Juan_Manuel_de_Rosas_by_Descalzi_oval.png` (UNUSED, PD).
- ≥2 cited sources per card (Lynch 1981, Saldías 1892, Halperín Donghi 1972, Zinny 1882).
- No new CSS or JS; no new sub-nav link.
- Stagger delays reset to 0ms/80ms (not cumulative from S12).

## Verification

```bash
grep -c 'data-certeza' index.html           # must be 71
grep -c 'S13-' index.html                   # must be 2
grep -c 'cards will be appended here' index.html  # must be 1 (marker untouched)
git diff --name-only HEAD -- styles.css app.js    # must be empty
test -s .gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md && echo OK
# Diagnostic failure path: if S13- count is 0, inspect temp file
test -f C:/tmp/s13-cards.html && grep -c 'S13-' C:/tmp/s13-cards.html || echo "WARN: temp file missing"
```

## Observability / Diagnostics

This slice produces only static HTML content — no runtime code, no JS logic, no CSS. Observability is limited to file-level signals:

- **Content present:** `test -s .gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md && echo OK` — confirms the draft artifact exists and is non-empty.
- **Cards injected:** `grep -c 'S13-' index.html` — a future agent can immediately confirm both cards were spliced.
- **Certeza count correct:** `grep -c 'data-certeza' index.html` — should be 71 after T02; any deviation signals a double-splice or missed splice.
- **Marker intact:** `grep -c 'cards will be appended here' index.html` — must stay at 1; going to 0 means the marker was deleted, >1 means content was inserted at wrong position.
- **No CSS/JS drift:** `git diff --name-only HEAD -- styles.css app.js` — must be empty; any output signals an unintended side-effect.
- **Failure visibility:** If `grep -c 'S13-' index.html` returns 0 after T02, the splice failed silently — inspect `C:/tmp/s13-cards.html` to confirm the HTML block was written, then re-run the Node.js splice.
- **Redaction:** No secrets, auth tokens, or user data are involved. All content is historical prose and public-domain image URLs.

## Tasks

- [x] **T01: Write S13 content draft with verified card text and T02 Recipe HTML** `est:20m`
  - Why: Separates the high-risk authorship work (historical accuracy, source verification, certeza classification) from the mechanical HTML splice. T02 becomes a low-risk copy-paste from this artifact.
  - Files: `.gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md`
  - Do: Write the draft file with full card text for S13-1 and S13-2. Include a clearly delimited **T02 Recipe HTML** block at the end with the exact `<article>` elements ready to splice — complete with `data-id`, `data-certeza`, `style="--reveal-delay: ..."`, image `src`/`alt`/`loading`, `<cite>`, `<h3>`, excerpt paragraphs, and source `<footer>`. Verify the Campaña del Desierto nuance appears explicitly in S13-2 prose. Use the context from `S13-CONTEXT.md` and `S13-RESEARCH.md` (already known to executor via task plan).
  - Verify: `test -s .gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md && echo OK`
  - Done when: Draft file exists, is non-empty, contains both cards' full prose and the T02 Recipe HTML block.

- [x] **T02: Splice both cards into index.html before the append marker** `est:20m`
  - Why: Delivers the actual user-facing content into the live HTML file, closing the slice.
  - Files: `index.html`, `C:/tmp/s13-cards.html` (temp), `C:/tmp/index.html.bak-s13` (backup)
  - Do: (1) `mkdir -p C:/tmp`. (2) Write the T02 Recipe HTML block from the draft to `C:/tmp/s13-cards.html` using the Write tool (not heredoc). (3) Back up: `cp index.html C:/tmp/index.html.bak-s13`. (4) Find marker line: `grep -n 'cards will be appended here by subsequent slices' index.html`. (5) Splice with Node.js using the ASCII-only marker substring `'cards will be appended here by subsequent slices'` (no en-dash). (6) Verify the five checks listed in the Verification section.
  - Verify: `grep -c 'data-certeza' index.html` returns 71; `grep -c 'S13-' index.html` returns 2; `grep -c 'cards will be appended here' index.html` returns 1; `git diff --name-only HEAD -- styles.css app.js` is empty.
  - Done when: All four verification checks pass and the marker is still present exactly once.

## Files Likely Touched

- `index.html`
- `.gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md`
- `C:/tmp/s13-cards.html` (temp)
- `C:/tmp/index.html.bak-s13` (backup)
