# S15: El asesinato de Facundo Quiroga — ¿fue Rosas?

**Goal:** Add 2 verified historical cards to `#periodo-rosas` narrating the Barranca Yaco ambush (16 Feb 1835) and the contested question of intellectual authorship, raising `data-certeza` count from 74 to 76.

**Demo:** `grep -c 'data-certeza' index.html` returns 76; `grep -c 'data-id="S15-' index.html` returns 2; marker still present; no CSS or JS changes.

## Must-Haves

- S15-1: `card-hecho`, `data-certeza="hecho"` — documented facts of the ambush: date (16 Feb 1835), location (Barranca Yaco), executor (Santos Pérez), convicts (Reinafé brothers), execution date (25 Oct 1837). Image: Descalzi painting from Wikimedia Commons.
- S15-2: `card-opinion`, `data-certeza="debatido"` — three hypotheses on intellectual authorship (Reinafé solos, Rosas as mastermind, Heredia as accomplice) with `<p class="card-nota-historiografica">` presenting the liberal vs. revisionist historiographic positions. No image.
- Zero new CSS or JS. All HTML uses existing classes: `card-hecho`, `card-opinion`, `card-certeza-indicator`, `card-nota-historiografica`.
- All non-ASCII characters in the T02 Recipe HTML block encoded as HTML entities (encoding safety on Windows).
- Spelling: "Barranca Yaco" (with "a") throughout, matching all existing occurrences in index.html.

## Verification

```bash
grep -c 'data-certeza' index.html           # expect 76
grep -c 'data-id="S15-' index.html          # expect 2
grep -c 'cards will be appended here' index.html  # expect 1 (marker not consumed)
git diff --name-only HEAD -- styles.css app.js    # expect empty (no output)
test -s .gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md && echo OK
```

## Tasks

- [x] **T01: Author S15-CONTENT-DRAFT.md with historical prose and verbatim T02 Recipe HTML** `est:20m`
  - Why: Creates the verified historical content and ready-to-splice HTML block. Separates high-risk accuracy work from mechanical HTML integration.
  - Files: `.gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md`
  - Do: Write the content draft with two cards. See T01-PLAN.md for full detail.
  - Verify: `test -s .gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md && grep -c "^## Card S15-" .gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md` returns 2
  - Done when: File exists, contains prose for both cards, sources, image notes, and the verbatim T02 Recipe block in HTML-entity form.

- [x] **T02: Splice the two S15 cards into index.html before the append marker** `est:15m`
  - Why: Integrates the authored content into the live page, completing the slice.
  - Files: `index.html`, `C:/tmp/s15-cards.html`, `C:/tmp/index.html.bak-s15`
  - Do: Read T02 Recipe from CONTENT-DRAFT.md; create backup; write temp file; Node.js splice; verify counts. See T02-PLAN.md for full detail.
  - Verify: `grep -c 'data-certeza' index.html` returns 76 AND `grep -c 'data-id="S15-' index.html` returns 2
  - Done when: All five verification checks pass; 2 new S15 cards visible in index.html before the append marker; no CSS/JS changes.

## Observability / Diagnostics

**Runtime signals:**
- `grep -c 'data-certeza' index.html` — primary health check; must jump from 74 → 76 after T02.
- `grep -c 'data-id="S15-' index.html` — confirms exactly 2 new cards were inserted (not 1, not 4).
- `grep -c 'cards will be appended here' index.html` — confirms marker was not consumed (must stay at 1).

**Inspection surfaces:**
- `.gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md` — readable artifact with all historical prose, entity-encoded HTML, and sources. Human-readable cross-check for accuracy before splice.
- `C:/tmp/s15-cards.html` — splice input file (written by T02 from CONTENT-DRAFT); diff this against the T02 Recipe block to verify fidelity.
- `C:/tmp/index.html.bak-s15` — pre-splice backup; restore with `copy C:\tmp\index.html.bak-s15 index.html` if T02 corrupts the file.

**Failure visibility:**
- If `grep -c 'data-certeza' index.html` returns 74 after T02, the splice did not run or the temp file was empty.
- If the marker check returns 0, the marker was accidentally consumed — restore from backup immediately.
- If `grep -c 'data-id="S15-' index.html` returns 4, the HTML comments `<!-- S15-N: ... -->` were also matched — this is a known false-positive pattern; verify with `grep 'data-id="S15-"' index.html | grep -v '<!--'`.

**Redaction constraints:** No PII in these cards. No API keys. The historical prose and image URL are both public domain.

**Failure-path diagnostic check:**
```bash
# If slice verification fails, run this to isolate which check is broken:
echo "data-certeza count:"; grep -c 'data-certeza' index.html
echo "S15 cards count:";    grep -c 'data-id="S15-' index.html
echo "Marker count:";       grep -c 'cards will be appended here' index.html
echo "Draft exists:";       test -s .gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md && echo OK || echo MISSING
```

## Files Likely Touched

- `index.html`
- `.gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md`
- `C:/tmp/s15-cards.html` (temp, not committed)
- `C:/tmp/index.html.bak-s15` (backup, not committed)
