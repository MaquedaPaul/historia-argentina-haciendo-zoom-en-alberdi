# S19: ¿Rosas fue un tirano?

**Goal:** Integrate two historiographic-debate cards into `#periodo-rosas` presenting the central tiranía question: a framing card (S19-1, `card-opinion`, `data-certeza="debatido"`) and a three-position `card-nota-historiografica` card (S19-2) covering the liberal (Sarmiento/Mitre), revisionista (Irazusta/Rosa), and contemporary synthesis (Halperín Donghi/Lynch/Myers) positions. Zero new CSS or JS.

**Demo:** After splice, `grep -c 'data-certeza' index.html` returns 84; `grep -c 'card-nota-historiografica' index.html` returns 8; S19-1 and S19-2 both appear in the DOM; CSS/JS files unchanged; the append marker remains intact at exactly 1 occurrence.

## Must-Haves

- S19-1: framing card, `card-opinion`, `data-certeza="debatido"`, `reveal-slide`, `--reveal-delay: 0ms`, picks up S18's explicit forward reference ("La pregunta de si ese uso fue deliberado como instrumento de control político corresponde a S19"), no image, `&#x2696;` certeza icon.
- S19-2: `card-opinion`, `data-certeza="debatido"`, `reveal-slide`, `--reveal-delay: 80ms`, `card-nota-historiografica` paragraph with three-position format (liberal / revisionista / síntesis contemporánea), each position with explicit Author, Title, Year attribution.
- S19 nota scoped to domestic tiranía (represión, libertades, personalismo) — does NOT adjudicate soberanía exterior argument (reserved for S22).
- All non-ASCII in the T02 Recipe HTML block entity-encoded; Node.js ASCII-only check must pass before splice.
- No image reuse: Rosas portraits (S13, S14) and Sarmiento portrait (S09) already used. If using Mitre portrait (`Bartolome_Mitre_Retrato.jpg`, CC BY-SA 4.0), include `<p class="img-attribution">` inside `.card-image`.
- Sources used in S19 cite distinct chapters from Lynch and Halperín Donghi that were NOT used in S14–S18 (Lynch cap. 10 for historiographic debate; earlier chapters already used).

## Verification

| Check | Command | Expected |
|-------|---------|----------|
| 1 | `grep -c 'data-certeza' index.html` | 84 |
| 2 | `grep -c 'data-id="S19-1"' index.html` | 1 |
| 3 | `grep -c 'data-id="S19-2"' index.html` | 1 |
| 4 | `grep -c 'cards will be appended here' index.html` | 1 |
| 5 | `git diff --name-only HEAD -- styles.css app.js` | empty |
| 6 | `test -s C:/tmp/index.html.bak-s19 && echo BACKUP_OK` | BACKUP_OK |
| 7 | `grep -c 'card-nota-historiografica' index.html` | 8 |
| 8 | `grep -c 'data-id="S19-'` | 2 |

## Tasks

- [x] **T01: Author S19-CONTENT-DRAFT.md with historical prose and entity-encoded T02 Recipe HTML** `est:25m`
  - Why: Separates high-stakes historiographic authoring (certeza classification, source selection, scope boundary enforcement) from mechanical splice. Establishes the verbatim HTML that T02 will write to `C:/tmp/s19-cards.html`.
  - Files: `.gsd/milestones/M008/slices/S19/S19-CONTENT-DRAFT.md`
  - Do: Author full UTF-8 prose for both cards. Then write the T02 Recipe block with all non-ASCII entity-encoded. S19-1: framing card, `data-certeza="debatido"`, no image, picks up S18 forward reference. S19-2: three-position nota, optionally include Mitre portrait with CC BY-SA 4.0 attribution block. S19 nota must NOT cover soberanía exterior (S22's territory) — add explicit scope boundary note. Use Lynch cap. 10 (NOT cap. 7 which was used in S16).
  - Verify: `test -s .gsd/milestones/M008/slices/S19/S19-CONTENT-DRAFT.md`
  - Done when: Draft exists, T02 Recipe block is present, Node.js entity check on the Recipe block returns PASS.

- [x] **T02: Splice S19 cards into index.html before append marker** `est:15m`
  - Why: Delivers the actual user-visible content — both cards visible in `#periodo-rosas` with reveal-on-scroll animation.
  - Files: `index.html`, `C:/tmp/s19-cards.html`, `C:/tmp/index.html.bak-s19`
  - Do: Verify preconditions (`data-certeza=82`, `card-nota-historiografica=7`, marker=1). Backup index.html to `C:/tmp/index.html.bak-s19`. Write T02 Recipe block from draft to `C:/tmp/s19-cards.html` via Write tool (not heredoc). Run Node.js ASCII-only check on the temp file. Splice via Node.js using ASCII-only marker substring `cards will be appended here by subsequent slices`. Run all 8 verification checks.
  - Verify: `grep -c 'data-certeza' index.html` returns 84 AND `grep -c 'card-nota-historiografica' index.html` returns 8.
  - Done when: All 8 checks from the Verification table pass; `git diff --name-only HEAD -- styles.css app.js` returns empty.

## Observability / Diagnostics

- **Splice result:** `grep -c 'data-certeza' index.html` → 84 confirms both cards present (each adds 1 `data-certeza` attribute).
- **Card identity:** `grep -c 'data-id="S19-1"' index.html` and `grep -c 'data-id="S19-2"' index.html` → 1 each — unambiguous card presence check.
- **Marker integrity:** `grep -c 'cards will be appended here' index.html` → 1 confirms append marker was not deleted or duplicated.
- **CSS/JS guard:** `git diff --name-only HEAD -- styles.css app.js` → empty confirms zero regressions to style/behavior.
- **Recovery surface:** `C:/tmp/index.html.bak-s19` is the pre-splice snapshot; restore with `cp C:/tmp/index.html.bak-s19 index.html` if any check fails after splice.
- **Nota presence:** `grep -c 'card-nota-historiografica' index.html` → 8 confirms S19-2's three-position nota was not dropped during splice.
- **Failure state:** If `data-certeza=84` but `card-nota-historiografica=7`, the S19-2 nota paragraph was accidentally omitted from the temp file. Check `C:/tmp/s19-cards.html` for completeness.

## Files Likely Touched

- `index.html` — S19-1 and S19-2 spliced before append marker; `data-certeza` 82→84; `card-nota-historiografica` 7→8
- `.gsd/milestones/M008/slices/S19/S19-CONTENT-DRAFT.md` — created by T01
- `C:/tmp/s19-cards.html` — temp splice snippet (not committed)
- `C:/tmp/index.html.bak-s19` — pre-splice recovery backup (not committed)
