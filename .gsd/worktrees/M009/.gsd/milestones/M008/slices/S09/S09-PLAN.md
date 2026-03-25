# S09: Origen de unitarios y federales

**Goal:** Create the opening block of the new `#periodo-rosas` sub-period in `index.html` with 4 cards explaining the origin of the unitario/federal divide, including a content draft with verified historical facts and sources.
**Demo:** Scrolling past the `#rev-1820-1835` sub-period reveals a new `#periodo-rosas` sub-period titled "Unitarios, Federales y la Era de Rosas (1820–1852)" with 4 cards: the aduana tension post-1810, the Directorio collapse (1816–1820), Rivadavia's constitution and its rejection (1826–1827), and an opinion card on when the identities crystallized (ca. 1826–1829). The sub-nav gains a new link. No new CSS or JS is added.

## Must-Haves

- `S09-CONTENT-DRAFT.md` with 4 card entries, each having title, date display, certeza, excerpt (2–4 sentences), ≥2 sources, image URL (verified via Wikimedia API or explicit fallback), and framing notes.
- New `<div id="periodo-rosas">` sub-period container inserted after `</div><!-- /#rev-1820-1835 -->` (line 1438) and before the SP2→SP3 Alberdi-quote connector.
- 4 cards inside the container: 3 `card-hecho` + 1 `card-opinion`, all with `data-certeza` attribute, `reveal reveal-slide` classes, and stagger delays (0ms / 80ms / 160ms / 240ms).
- Sub-nav gains one new `<a href="#periodo-rosas">` link after the existing `#rev-1820-1835` link (line 330).
- No modifications to existing SP2 cards (they must not be edited or removed).
- No new CSS or JS files modified.
- `grep -c 'data-certeza' index.html` equals 62 (58 + 4).

## Verification

```bash
# New card count
grep -c 'data-certeza' index.html
# Expected: 62

# New sub-period container exists
grep -c 'id="periodo-rosas"' index.html
# Expected: 1

# Sub-nav link added
grep -c 'href="#periodo-rosas"' index.html
# Expected: 1

# SP2 cards untouched (all 4 still present)
grep -c 'id="rev-1820-1835"' index.html
# Expected: 1

# No CSS or JS touched
git diff --name-only HEAD -- styles.css app.js
# Expected: no output (empty)

# Content draft exists and is non-empty
test -s .gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md && echo "OK"
# Expected: OK
```

## Tasks

- [x] **T01: Write S09 content draft with verified historical facts and Wikimedia images** `est:45m`
  - Why: Content accuracy is the highest-risk work in this slice. The draft captures verified facts, honest certeza decisions, and confirmed image URLs before any HTML is written — making T02 mechanical copy-paste.
  - Files: `.gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md`
  - Do: Write a markdown file with 4 card entries. For each card include: title, year display, certeza type, excerpt (2–4 sentences), ≥2 sources with full bibliographic form, a Wikimedia API-verified image URL (or explicit named fallback with rationale), and a framing note explaining how this card differs from the existing SP2 card that covers related ground. The 4 cards: (1) `card-hecho` — aduana tension and economic roots of the conflict, 1810–1820; (2) `card-hecho` — the Directorio unitario 1816–1820 and its collapse at Cepeda (framing: WHY Cepeda happened, not what happened — SP2-1 already covers the event itself); (3) `card-hecho` — Rivadavia's Constitución de 1826 and provincial rejection (framing: the economic reason for rejection — the capitalización law that stripped Buenos Aires's customs revenue — not just "provinces said no" — SP2-3 already covers the basic fact); (4) `card-opinion` — when did the identities "unitario/federal" crystallize as political identities, ca. 1826–1829 (certeza: "opinion", no accent, per KNOWLEDGE.md). For images, look up candidates using the Wikimedia Commons search API (`https://en.wikipedia.org/w/api.php?action=query&list=search&srnamespace=6&srsearch=...&format=json`) before committing to a URL. Avoid images already used in SP2 (Rivadavia portrait `Bernardino_Rivadavia.jpg` used in SP2-3, Rosas portrait used in SP2-1, Quiroga portrait used in SP2-2, Alberdi portrait used in SP2-4). All facts, dates, and sources must be verified — flag any unresolved items with `[VERIFICAR]`. Do NOT synthesize direct quotes from secondary sources (KNOWLEDGE.md: Alberdi Quote Verification Protocol).
  - Verify: `test -s .gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md && grep -c '^## Card' .gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md` returns 4
  - Done when: The draft file exists with 4 card sections, each containing title, certeza, excerpt, ≥2 sources, and an image note with either a confirmed Wikimedia URL or an explicit fallback decision.

- [x] **T02: Integrate S09 cards into index.html — create #periodo-rosas sub-period** `est:30m`
  - Why: Makes the S09 content visible in the live site and establishes the `#periodo-rosas` container that all 16 M008 slices (S09–S24) will populate. Also adds the sub-nav link for this new section.
  - Files: `index.html`
  - Do: Using the content from `S09-CONTENT-DRAFT.md` (output of T01), make two targeted edits to `index.html`:
    **Edit 1 — Insert new sub-period block:** After the line `</div><!-- /#rev-1820-1835 -->` (currently line 1438) and BEFORE the `<!-- CONECTOR ALBERDI — SP2 → SP3 (Pasaje 2) -->` blockquote, insert the new `#periodo-rosas` sub-period div. Structure: `<div id="periodo-rosas" class="sub-period reveal reveal-fade">` with a `<h3 class="sub-period__title">Unitarios, Federales y la Era de Rosas (1820–1852)</h3>` and one `<div class="events-grid events-grid--certeza" aria-label="Origen de unitarios y federales">` containing the 4 S09 cards. Use the exact card HTML patterns from existing cards in SP2: `card-hecho` pattern from SP2-1 (lines 1345–1367) and `card-opinion` pattern from SP2-4 (lines 1408–1436). Each card must have: `data-certeza` attribute, `reveal reveal-slide` classes, staggered `--reveal-delay` (0ms/80ms/160ms/240ms), `card-certeza-indicator` div, `card-image` div with `<img loading="lazy">`, `event-card__year` span, `event-card__title` h3, `event-card__excerpt` p, and `card-source` footer with `<cite>`. The opinion card (card 4) must use a `<blockquote class="card-opinion__quote">` with `card-opinion__attribution`, `card-opinion__author`, and `card-opinion__context` structure — if a direct historiographic quote is available from the draft, use it; otherwise attribute the interpretation to the historian by name in the context span without fabricating a quote.
    **Edit 2 — Sub-nav link:** After the existing `<a href="#rev-1820-1835" ...>1820–1835...` link (line 330), add one new line: `<a href="#periodo-rosas" class="sub-nav__link">1820–1852<span class="sub-nav__link-label">Unitarios y Federales</span></a>`.
    Do NOT touch styles.css or app.js. Do NOT modify any existing cards in SP2.
  - Verify: `grep -c 'data-certeza' index.html` returns 62; `grep -c 'id="periodo-rosas"' index.html` returns 1; `grep -c 'href="#periodo-rosas"' index.html` returns 1; `git diff --name-only HEAD -- styles.css app.js` returns empty
  - Done when: All 4 verification commands pass and the `#periodo-rosas` div is correctly positioned between `</div><!-- /#rev-1820-1835 -->` and the `<!-- CONECTOR ALBERDI — SP2 → SP3 -->` blockquote.

## Observability / Diagnostics

**Runtime signals after T02:**
- `grep -c 'data-certeza' index.html` → must equal 62 (58 baseline + 4 S09 cards). Any other value indicates a card was skipped or a duplicate was inserted.
- `grep -c 'id="periodo-rosas"' index.html` → must equal 1. Zero means the sub-period container was not inserted; >1 means duplicated insertion.
- `grep -c 'href="#periodo-rosas"' index.html` → must equal 1. Zero means the sub-nav link is missing.

**Inspectable failure states:**
- If `grep -c 'data-certeza' index.html` returns 60 instead of 62: one card is missing its `data-certeza` attribute. Search with `grep -n 'card-hecho\|card-opinion' index.html | tail -10` to find the malformed card.
- If `grep -c 'id="rev-1820-1835"' index.html` returns 0: an SP2 card was accidentally deleted. Restore from git: `git diff HEAD index.html | grep '^-.*rev-1820-1835'`.
- If `git diff --name-only HEAD -- styles.css app.js` returns output: a prohibited file was modified. Revert immediately with `git checkout HEAD -- styles.css app.js`.

**Content draft inspection:**
- `grep -c '^## Card' .gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md` → must return 4.
- `grep 'Certeza.*opinion' .gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md` → must match card S09-4 with `opinion` (no accent).

**Redaction constraints:** No personal data, no API keys, no secrets in any file in this slice.

**Diagnostic for image failures:** The Wikimedia image URLs are verified via API (see S09-CONTENT-DRAFT.md Image Verification Log). If an image renders broken in browser, check via: `curl -I '<URL>'` — KNOWLEDGE.md notes Wikimedia rate-limits curl with 429 but images load fine in browsers. Do not diagnose broken images from curl failures.

## Files Likely Touched

- `.gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md` (created by T01)
- `index.html` (edited by T02 — two insertion points)
