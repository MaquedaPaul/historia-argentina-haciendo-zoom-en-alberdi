# S16: La represión rosista — ¿perseguía y mataba?

**Goal:** Add three verified historical cards to `#periodo-rosas` documenting the Mazorca repression apparatus, the mechanics of exile and punzó coercion, and the historiographic debate over scale and systematicity — with certeza differentiated by hecho vs. debatido.
**Demo:** After T02, `grep -c 'data-certeza' index.html` returns 79 (was 76), `grep -c 'data-id="S16-' index.html` returns 3, the append marker is still present exactly once, and `git diff --name-only HEAD -- styles.css app.js` returns empty.

## Must-Haves

- S16-1 (`card-hecho`, `data-certeza="hecho"`, 0ms stagger): Mazorca mechanics — structure (Sociedad Popular Restauradora → enforcement branch), the "degüello" as signature method, documented individual cases beyond Maza (Juan Bautista Peña, Agustín Maza, the 1840 "Noche de los cuchillos"), and the obligatory color punzó enforcement system. Does NOT repeat the SP3-2 overview of 1839–1842 that is already in `index.html`.
- S16-2 (`card-hecho`, `data-certeza="hecho"`, 80ms stagger): Exile mechanics — who fled under threat (Alberdi, Echeverría, López, Varela brothers), property confiscation pattern, the assassination of Florencio Varela in Montevideo (20 March 1848, attributed to Mazorca agent by liberal historians with note on dispute), and the color punzó as daily coercion system. Does NOT repeat SP3-3's ideas-in-exile angle.
- S16-3 (`card-opinion`, `data-certeza="debatido"`, 160ms stagger): Scale and systematicity debate with `<p class="card-nota-historiografica">` naming three positions (liberal estimate, revisionist contextualization, contemporary synthesis) with explicit source attribution. Does NOT repeat the general polarity already in S14-3.
- Zero new CSS or JS. All non-ASCII characters HTML-entity-encoded in the T02 Recipe block.

## Verification

```bash
# Primary outcome checks
grep -c 'data-certeza' index.html                         # Expected: 79
grep -c 'data-id="S16-' index.html                        # Expected: 3
grep -c 'cards will be appended here' index.html          # Expected: 1 (marker still present)
git diff --name-only HEAD -- styles.css app.js            # Expected: (empty)
test -s .gsd/milestones/M008/slices/S16/S16-CONTENT-DRAFT.md && echo OK   # Expected: OK

# Failure-path / diagnostic checks
# If the splice silently failed or doubled cards, this catches it:
grep -c 'data-id="S16-1"' index.html                     # Expected: 1 (not 0, not 2)
# Verify recovery backup was created before splice (non-empty)
test -s /tmp/index.html.bak-s16 || test -s C:/tmp/index.html.bak-s16 && echo BACKUP_OK
# Verify card-nota-historiografica is present in S16 cards
grep -c 'card-nota-historiografica' index.html            # Expected: ≥3 (2 from S14-3+S15-2, plus at least 1 new from S16-3)
```

## Observability / Diagnostics

- Inspection surfaces: `grep -n 'data-id="S16-' index.html` shows exact line positions of spliced cards; `grep -n 'cards will be appended here' index.html` gives current marker line for next slice targeting.
- Failure visibility: If splice fails, `C:/tmp/index.html.bak-s16` (or `/tmp/index.html.bak-s16`) is the recovery point. If `grep -c 'data-id="S16-1"' index.html` returns 0, the temp file `C:/tmp/s16-cards.html` contains the unspliced HTML for manual inspection.
- Node.js splice errors print to stderr; a non-zero exit or the absence of "Spliced OK" in stdout indicates failure before any file was modified (the splice script reads first, writes only on success).

## Tasks

- [x] **T01: Author S16 content draft with three verified historical cards** `est:20m`
  - Why: Locks in historical accuracy, scope decisions, certeza assignments, and entity-encoded HTML — the high-risk work that T02 depends on mechanically.
  - Files: `.gsd/milestones/M008/slices/S16/S16-CONTENT-DRAFT.md`
  - Do: Write `S16-CONTENT-DRAFT.md` with prose sections for all three cards, then a verbatim T02 Recipe HTML block. See T01-PLAN.md for complete steps.
  - Verify: `grep -c "^## Tarjeta S16-" .gsd/milestones/M008/slices/S16/S16-CONTENT-DRAFT.md` returns 3; `grep -q "T02 Recipe" .gsd/milestones/M008/slices/S16/S16-CONTENT-DRAFT.md && echo OK`
  - Done when: `S16-CONTENT-DRAFT.md` exists, has 3 card sections with verified sources, and the T02 Recipe block contains entity-encoded HTML for all three cards.

- [x] **T02: Splice S16 cards into index.html before append marker** `est:15m`
  - Why: Integrates the draft content into the live page using the established Node.js splice pattern.
  - Files: `index.html`, `C:/tmp/s16-cards.html` (temp), `C:/tmp/index.html.bak-s16` (backup)
  - Do: Read Recipe block from draft, create backup, write temp HTML via Write tool, run Node.js splice using ASCII-only marker substring. See T02-PLAN.md for complete steps.
  - Verify: `grep -c 'data-certeza' index.html` returns 79; `grep -c 'data-id="S16-' index.html` returns 3; `grep -c 'cards will be appended here' index.html` returns 1; `git diff --name-only HEAD -- styles.css app.js` returns empty.
  - Done when: All five verification checks pass with no CSS/JS modifications.

## Files Likely Touched

- `.gsd/milestones/M008/slices/S16/S16-CONTENT-DRAFT.md` — created in T01
- `index.html` — 3 cards spliced in T02
- `C:/tmp/s16-cards.html` — temp file for splice (not committed)
- `C:/tmp/index.html.bak-s16` — recovery backup (not committed)
