# S10: Ideas de unitarios y federales

**Goal:** Append 3 verified content cards to `#periodo-rosas` covering the ideological and economic programs of the unitario and federal bandos — going substantially deeper than SP2-2's three-sentence summary.
**Demo:** `grep -c 'data-certeza' index.html` returns 65 (62 + 3). The append marker comment is still present. `git diff --name-only HEAD -- styles.css app.js` is empty. Three new cards are visible in `#periodo-rosas`: one on the unitario program (certeza `hecho`), one on the federal program (certeza `hecho`), one on the economic substructure of the conflict (certeza `opinion`).

## Must-Haves

- 3 cards appended inside the `#periodo-rosas` events-grid, immediately before the append marker comment
- S10-1: unitario program card — centralismo, libre comercio, educación pública, representantes intelectuales (Echeverría *Dogma Socialista* 1837, Sarmiento *Facundo* 1845), certeza `hecho`
- S10-2: federal program card — autonomía provincial, proteccionismo, reparto de rentas, identidad criolla, Pacto Federal 1831 as constitutional instrument, certeza `hecho`
- S10-3: economic substructure card — aduana asymmetry, who controlled the port controlled the country, Halperin Donghi reframing, certeza `opinion` with blockquote attribution
- Each card has ≥2 cited sources, a Wikimedia-verified image (public domain or CC BY/BY-SA), and stagger delays 0ms / 80ms / 160ms
- No image reuse from existing cards (full used-image list in T01 plan)
- No CSS or JS changes
- Content differentiates from SP2-2 (which names the sides in 3 sentences) — each card must cover specific policy positions and named intellectual sources

## Verification

```bash
grep -c 'data-certeza' index.html
# expected: 65

grep -n 'S10–S24 cards will be appended' index.html
# expected: still present (marker not deleted)

git diff --name-only HEAD -- styles.css app.js
# expected: empty

test -s .gsd/milestones/M008/slices/S10/S10-CONTENT-DRAFT.md && echo "OK"
# expected: OK

grep -c 'S10-' index.html
# expected: ≥3 (3 HTML comments, one per card)
```

## Tasks

- [x] **T01: Research and write S10 content draft with verified images** `est:30m`
  - Why: Separates high-risk historical accuracy work from mechanical HTML integration. The draft catches certeza classification errors and image reuse conflicts before any HTML is touched.
  - Files: `.gsd/milestones/M008/slices/S10/S10-CONTENT-DRAFT.md`
  - Do: Write a content draft following the S09-CONTENT-DRAFT.md structure exactly. Three card entries: (1) El programa unitario — centralismo, libre comercio, educación pública, Rivadavia as praxis, Echeverría *Dogma Socialista* 1837, Sarmiento *Facundo* 1845; certeza `hecho`. (2) El programa federal — autonomía provincial, proteccionismo, reparto de rentas, identidad criolla/gaucha, Pacto Federal de 1831 as constitutional instrument, Rosas/Quiroga/López/Ramírez as representatives; certeza `hecho`. (3) El conflicto real: ¿quién controla la aduana? — 80% of national income, libre comercio destroying interior manufacturing, the paradox of provincial autonomy + redistribution demands, Halperin Donghi reframing (economic insertion not civilización/barbarie); certeza `opinion` attributed to Halperin Donghi. Verify each Wikimedia image via the API before recording URLs. See T01 plan for image candidates and full used-image list.
  - Verify: `test -s .gsd/milestones/M008/slices/S10/S10-CONTENT-DRAFT.md && grep -c "^## Card S10-" .gsd/milestones/M008/slices/S10/S10-CONTENT-DRAFT.md`
  - Done when: File exists and contains 3 card entries (## Card S10-1, ## Card S10-2, ## Card S10-3), each with title, certeza, excerpt, ≥2 sources, a verified Wikimedia image URL, and a framing note explaining how it differs from SP2-2.

- [x] **T02: Append 3 S10 cards to index.html** `est:20m`
  - Why: Integrates the verified content into the live page. Pure mechanical work once the content draft is complete.
  - Files: `index.html`
  - Do: Locate the append marker with `grep -n 'S10–S24 cards will be appended' index.html`. Write the 3 cards to a temp file following the exact HTML templates from S09 cards (card-hecho pattern for S10-1 and S10-2, card-opinion pattern for S10-3). Insert immediately BEFORE the marker comment. Use stagger delays 0ms, 80ms, 160ms. The marker comment must remain in place after insertion. Do NOT touch styles.css or app.js.
  - Verify: `grep -c 'data-certeza' index.html` returns 65. `grep -n 'S10–S24 cards will be appended' index.html` still returns a line. `git diff --name-only HEAD -- styles.css app.js` is empty.
  - Done when: `grep -c 'data-certeza' index.html` = 65, marker still present, no CSS/JS changes.

## Observability / Diagnostics

### Runtime signals after T02 completes
- `grep -c 'data-certeza' index.html` → **65** (62 baseline + 3 S10 cards)
- `grep -c 'S10-' index.html` → **≥3** (one HTML comment per card identifying it)
- `grep -n 'S10–S24 cards will be appended' index.html` → still present (marker not deleted)
- `git diff --name-only HEAD -- styles.css app.js` → empty (no CSS/JS changes)
- `test -s .gsd/milestones/M008/slices/S10/S10-CONTENT-DRAFT.md && echo OK` → `OK`

### Inspection surfaces
- The content draft at `.gsd/milestones/M008/slices/S10/S10-CONTENT-DRAFT.md` is the audit surface for historical accuracy, certeza classification, and image reuse checks. A future agent can diff it against the HTML to verify fidelity.
- Each card carries an HTML comment `<!-- S10-N: card title -->` immediately before the `<article>` tag, providing a grep-addressable identity marker.
- The Image Verification Log at the end of the content draft records each image candidate's API response status, license, and accept/reject decision — enabling image reuse audits for future slices.

### Failure visibility
- If `grep -c 'data-certeza' index.html` returns 62 (not 65), T02 did not insert cards — check whether the append marker line was found by `grep -n`.
- If the marker comment is missing, T02 accidentally deleted it — requires immediate revert.
- If any image thumburl returns a 404 or the API response has no `thumburl`, the image was rejected in the verification log and the card falls back to `no-image` class (CSS handles gracefully).
- `grep -c 'S10-' index.html` returning 0 means neither cards nor their identifier comments were appended.

### Redaction constraints
- No personal information. All content is historical (19th century public figures and documents).
- No synthetic direct quotes: all opinion cards use attributed paraphrase pattern with explicit [NO USAR COMO CITA DIRECTA] labels in the draft.

## Files Likely Touched

- `.gsd/milestones/M008/slices/S10/S10-CONTENT-DRAFT.md`
- `index.html`
