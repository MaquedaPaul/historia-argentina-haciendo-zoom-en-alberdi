# S11: Referentes de cada bando

**Goal:** Add two `card-hecho` cards to `#periodo-rosas` introducing the principal unitario and federal leaders — Rivadavia, Lavalle, Paz, Florencio Varela, Juan Cruz Varela on one side; Rosas, Quiroga, López, Ramírez, Urquiza on the other — with dates, roles, and sourced biographical facts.
**Demo:** `grep -c 'data-certeza' index.html` returns 67 (was 65); `grep -c 'S11-' index.html` returns 2; no CSS or JS modified; `S11-CONTENT-DRAFT.md` exists and is non-empty.

## Must-Haves

- Two new `card-hecho` cards in `index.html`, inserted before the append marker, with `data-certeza="hecho"` on each
- S11-1: unitario leaders card — profiles Rivadavia, Lavalle, Paz, Florencio Varela, Juan Cruz Varela with dates and key roles; image: José María Paz 1887 homenaje portrait (500px, PD, not currently used)
- S11-2: federal leaders card — profiles Rosas, Quiroga, López, Ramírez, Urquiza with dates and key roles; image: Justo José de Urquiza oil painting by Josefa Díaz y Clucellas (1880, 500px, PD, third distinct Urquiza variant not currently used)
- Stagger delays reset to 0ms (S11-1) and 80ms (S11-2) — do NOT continue from S10's sequence
- Zero CSS or JS changes (D001 mandate)
- Append marker preserved at its current location after insertion

## Verification

```bash
grep -c 'data-certeza' index.html
# expected: 67

grep -c 'S11-' index.html
# expected: 2

grep -n 'cards will be appended here by subsequent slices' index.html
# expected: line present (marker intact)

git diff --name-only HEAD -- styles.css app.js
# expected: empty

test -s .gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md && echo OK
# expected: OK
```

## Tasks

- [x] **T01: Research and write S11 content draft with verified images** `est:25m`
  - Why: All historical facts, certeza classifications, image URLs, and source citations must be verified before HTML is touched. The content draft is the single source of truth for T02.
  - Files: `.gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md`
  - Do: (1) Read `.gsd/milestones/M008/slices/S10/S10-CONTENT-DRAFT.md` to confirm the card skeleton format. (2) Verify the two candidate images via the Wikimedia API: `Jose_maria_paz_retrato_homenaje.jpg` (S11-1) and `Justo_José_de_Urquiza.jpg` (S11-2, the 1880 oil painting — NOT the `(retrato)` or `983506` variants which are already used). Hit `https://en.wikipedia.org/w/api.php?action=query&titles=File:FILENAME&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=500&format=json` for each. Confirm `thumburl` and public domain license. (3) Write `S11-CONTENT-DRAFT.md` with two card entries — S11-1 and S11-2 — each with: title, year display (`1820 – 1852`), certeza=`hecho`, excerpt (3–5 sentences), ≥2 cited sources, cite reference text, and verified image info. (4) Append an Image Verification Log and a T02 Recipe section listing all HTML attributes for mechanical copy-paste.
  - Constraints: Do NOT reuse `General_Don_Juan_LaValle.jpg` (used in S10-3), `Bernardino_Rivadavia.jpg` (already used), `Retrato_de_Juan_Manuel_de_Rosas.jpg`/`Raymond_Monvoisin...` (both used), `Justo_José_de_Urquiza_(retrato).jpg`, or `Justo-jose-de-urquiza-983506.jpg`. S11-2 must introduce Urquiza in his role as *federal caudillo (pre-1851)*, not as the man who defeated Rosas — one sentence may note he later changed sides, but the Caseros narrative belongs to S13/S14. No synthesized direct quotes — biographical facts only for `card-hecho`. The S11-1 card must cross-reference S10 without restating S10's content: name the leaders who *embodied* the programs described there.
  - Verify: `test -s .gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md && grep -c "^## Card S11-" .gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md` — must return 2
  - Done when: `S11-CONTENT-DRAFT.md` exists with 2 card entries, Image Verification Log, and T02 Recipe section; both images confirmed via API as 500px PD thumbnails not in the current used-image list

- [x] **T02: Append 2 S11 cards to index.html** `est:15m`
  - Why: Mechanical HTML integration of the verified content draft into the `#periodo-rosas` events-grid.
  - Files: `index.html`
  - Do: (1) Find the append marker: `grep -n 'cards will be appended here by subsequent slices' index.html` — use the returned line number, never hardcode it. (2) Read `S11-CONTENT-DRAFT.md` T02 Recipe section for all card attributes. (3) Write the two cards to `/tmp/s11-cards.html` using the `Write` tool (do NOT use bash heredocs — per KNOWLEDGE.md). Card structure for both is `card-hecho` with `data-certeza="hecho"`. HTML comment before each: `<!-- S11-1: Los líderes unitarios -->` and `<!-- S11-2: Los líderes federales -->`. (4) Splice into `index.html` using Node.js: `node -e "const fs=require('fs'); const src=fs.readFileSync('/tmp/s11-cards.html','utf8'); const lines=fs.readFileSync('index.html','utf8').split('\n'); const idx=lines.findIndex(l=>l.includes('cards will be appended here by subsequent slices')); lines.splice(idx,0,src); fs.writeFileSync('index.html',lines.join('\n'),'utf8');"` — use the ASCII-only substring (no en-dash) per KNOWLEDGE.md.
  - Constraints: Both cards use `class="event-card card-hecho reveal reveal-slide"` with `data-certeza="hecho"`. Stagger: S11-1=`--reveal-delay: 0ms`, S11-2=`--reveal-delay: 80ms`. No sub-nav link — S09 already added the `#periodo-rosas` link. Do NOT touch `styles.css` or `app.js`.
  - Verify: `grep -c 'data-certeza' index.html` → 67; `grep -c 'S11-' index.html` → 2; `grep -n 'cards will be appended here by subsequent slices' index.html` → line present; `git diff --name-only HEAD -- styles.css app.js` → empty
  - Done when: All five verification commands pass

## Files Likely Touched

- `index.html`
- `.gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md` (new)

## Observability / Diagnostics

### Runtime signals

This slice is a static HTML content injection — there is no server process, event loop, or async state. Observability is satisfied by deterministic grep assertions on the output file.

| Signal | Command | Expected |
|--------|---------|---------|
| Card count (certeza attrs) | `grep -c 'data-certeza' index.html` | 67 |
| Slice marker presence | `grep -c 'S11-' index.html` | 2 |
| Append marker intact | `grep -n 'cards will be appended here by subsequent slices' index.html` | line present |
| CSS/JS untouched | `git diff --name-only HEAD -- styles.css app.js` | empty |
| Content draft non-empty | `test -s .gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md && echo OK` | OK |

### Inspection surfaces

- **Content draft**: `.gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md` — human-readable source of truth for all card attributes, image URLs, and source citations. Read this first when debugging incorrect card content.
- **Image URLs**: both thumb URLs in the Image Verification Log are direct CDN links — `curl -I <thumburl>` should return HTTP 200. If a card's image renders broken, compare the `src` attribute against the verified URL in the draft.
- **HTML structure**: `grep -A 30 'S11-1' index.html` and `grep -A 30 'S11-2' index.html` surface the injected card markup for inspection.

### Failure visibility

- If `grep -c 'data-certeza' index.html` returns 65 (not 67): T02 splice did not execute — the cards were not inserted.
- If it returns 69+: duplicate insertion — the splice ran more than once or a prior run was not rolled back.
- If `grep -c 'S11-' index.html` returns 0: the `<!-- S11-N: ... -->` HTML comments are absent — check the `/tmp/s11-cards.html` temp file.
- If the append marker line is gone: the Node.js splice replaced the marker instead of prepending before it — the `splice(idx,0,src)` logic must insert *before* idx, not replace it.

### Redaction constraints

No secrets or PII involved. All content is public-domain historical prose. Image URLs are public Wikimedia CDN links.
