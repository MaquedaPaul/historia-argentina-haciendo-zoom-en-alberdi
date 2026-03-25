# S17: ¿Sin Rosas, Argentina sería un caos?

**Goal:** Add one interpretive card presenting the "historical necessity" argument for Rosas — would Argentina have dissolved into civil war without him? — with the revisionista and liberal/synthesis counter-positions represented in a `card-nota-historiografica`. Card spliced into `#periodo-rosas` before the append marker.

**Demo:** After T02, `grep -c 'data-certeza' index.html` returns 80, `grep -c 'data-id="S17-' index.html` returns 1, the append marker remains intact at one occurrence, and `git diff --name-only HEAD -- styles.css app.js` is empty.

## Must-Haves

- One `card-opinion` with `data-certeza="opinión"` and `data-id="S17-1"`, stagger `0ms`
- No image — consistent with S14-3, S15-2, S16-3 interpretation-card pattern
- `card-nota-historiografica` with two positions: revisionista (Irazusta 1941) and liberal/síntesis (Halperín Donghi 1972, Lynch 1981 cap. 10)
- Scope boundary enforced: internal order only — no "bloqueos" / foreign-policy sovereignty (that belongs to S22); no repetition of the general liberal/revisionist polarity from S14-3
- Zero new CSS or JS — hard constraint
- All non-ASCII characters in the T02 Recipe HTML block encoded as HTML entities

## Verification

```bash
grep -c 'data-certeza' index.html          # → 80 (was 79, +1)
grep -c 'data-id="S17-' index.html        # → 1
grep -c 'data-id="S17-1"' index.html      # → 1
grep -c 'cards will be appended here' index.html  # → 1 (marker intact)
git diff --name-only HEAD -- styles.css app.js    # → (empty)
test -s C:/tmp/index.html.bak-s17 && echo BACKUP_OK
grep -c 'card-nota-historiografica' index.html    # → 6 (was 5, +1)
test -s .gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md && echo DRAFT_OK
```

## Tasks

- [x] **T01: Author S17-CONTENT-DRAFT.md — necessity argument card** `est:20m`
  - Why: Creates the prose, sources, and verbatim T02 Recipe HTML block for the single S17-1 card. All historical accuracy and certeza classification work happens here before touching index.html.
  - Files: `.gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md`
  - Do: Write content draft with card title, year label, excerpt (framing the 1820–1829 chaos baseline and Rosas's stability argument), and a two-position `card-nota-historiografica` (revisionista: Irazusta 1941 on coalition indispensability; liberal/síntesis: Halperín Donghi 1972 + Lynch 1981 cap. 10 on temporary necessity becoming obstacle). T02 Recipe HTML block must use HTML entities for all non-ASCII. Scope boundary: internal order only — do not include bloqueos/sovereignty (S22) or repeat S14-3's general tiranía/caudillo polarity.
  - Verify: `test -s .gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md && echo DRAFT_OK`
  - Done when: Draft file exists and non-empty; T02 Recipe HTML block is present; sources cited for both nota positions.

- [x] **T02: Splice S17-1 card into index.html before append marker** `est:10m`
  - Why: Inserts the authored card into the live page. Mechanical step — the historical work was done in T01.
  - Files: `index.html`, `C:/tmp/s17-cards.html`, `C:/tmp/index.html.bak-s17`
  - Do: (1) Confirm preconditions: `grep -c 'data-certeza' index.html` = 79, marker present once. (2) Write recovery backup to `C:/tmp/index.html.bak-s17`. (3) Write T02 Recipe HTML block (from draft) to `C:/tmp/s17-cards.html`. (4) Run Node.js splice using ASCII-only marker substring `'cards will be appended here by subsequent slices'` — insert `C:/tmp/s17-cards.html` content immediately before the marker line. (5) Run all 8 verification checks.
  - Verify: `grep -c 'data-certeza' index.html` returns 80; `grep -c 'data-id="S17-' index.html` returns 1; `grep -c 'cards will be appended here' index.html` returns 1; `git diff --name-only HEAD -- styles.css app.js` is empty.
  - Done when: All 8 verification checks pass.

## Observability / Diagnostics

**Runtime signals:**
- `grep -c 'data-certeza' index.html` — should be 80 after T02 (79 before); any value other than 80 post-T02 indicates the splice failed or double-inserted
- `grep -c 'data-id="S17-1"' index.html` — should be exactly 1 after T02; 0 = splice missed, >1 = duplicate insert
- `grep -c 'cards will be appended here' index.html` — should be exactly 1 at all times; 0 = marker was corrupted by a splice; 2 = marker was duplicated
- `grep -c 'card-nota-historiografica' index.html` — should be 6 after T02 (was 5); regression to 5 = nota block was dropped in entity-encoding step

**Inspection surfaces:**
- `C:/tmp/index.html.bak-s17` — pre-splice recovery backup; presence confirms T02 ran the backup step before mutating index.html
- `C:/tmp/s17-cards.html` — temp splice snippet; inspect to verify entity encoding is intact before the Node.js splice runs
- `.gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md` — source of truth for prose and Recipe HTML; compare against index.html post-T02 to confirm nothing was dropped

**Failure visibility:**
- If `grep -c 'data-certeza' index.html` returns 79 after T02: the Node.js splice did not insert the card — check that the ASCII-only marker substring matched and that `s17-cards.html` was non-empty
- If entity encoding corruption occurs (garbled characters appear in browser): compare `C:/tmp/s17-cards.html` against the Recipe block in the draft to find the malformed entity
- If the browser renders a `⚖` icon instead of `💬`: the certeza-indicator icon entity was wrong — `&#x1F4AC;` (💬) is correct for `data-certeza="opinión"` cards

**Redaction constraints:** None — this slice contains no PII, credentials, or sensitive tokens. All content is public historiographic material.

## Files Likely Touched

- `index.html` — 1 new S17-1 card inserted before append marker
- `.gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md` — created in T01
- `C:/tmp/s17-cards.html` — temp splice snippet (not committed)
- `C:/tmp/index.html.bak-s17` — pre-splice recovery backup (not committed)
