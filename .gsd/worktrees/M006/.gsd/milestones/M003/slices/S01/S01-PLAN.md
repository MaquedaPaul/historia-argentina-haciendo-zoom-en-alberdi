# S01: Content research, verification, and HTML integration of 19 event cards with images

**Goal:** Replace the 3 placeholder cards in `#periodo-revolucion` with 15-19 historically verified, certeza-classified event cards organized into 4 sub-periods, each with real Wikimedia Commons images, source citations, and Alberdi as narrative thread.

**Demo:** Open `index.html` in browser, scroll to `#periodo-revolucion`. See 4 sub-period groups (1800-1820, 1820-1835, 1835-1852, 1852-1860) with 15-19 event cards. Each card has a certeza indicator, a real image, and a source citation. Alberdi quotes and connecting text appear between sub-period groups. Cards reveal on scroll with stagger animation.

## Must-Haves

- Content draft with all 19 events: title, date, certeza type, detailed excerpt (4-8 sentences for major events, 2-4 for concise), verified sources (≥2 for hecho), and Alberdi connection notes
- Every Alberdi quote traced to original work (title, year, context) — no paraphrasing presented as direct quotes
- All 19 cards integrated into `index.html` following established card templates (card-hecho, card-opinion, card-rumor)
- Sub-period `<div>` wrappers with IDs and `<h3>` headers
- Real Wikimedia Commons images (API-verified 500px thumbnails) for at least 14 of 19 cards
- `.alberdi-quote` standalone blockquotes between sub-period groups as connecting narrative
- New CSS for sub-period headers and dividers (~30-40 lines)
- Reveal animations with stagger delays on all new cards

## Proof Level

- This slice proves: integration (real content verified against sources, integrated into live HTML with existing CSS/JS systems)
- Real runtime required: yes (browser verification of card rendering, image loading, reveal animations)
- Human/UAT required: yes (narrative flow read-through, Alberdi thread coherence, certeza classification consistency)

## Verification

- `document.querySelectorAll('#periodo-revolucion [data-certeza]').length >= 15` — minimum card count
- `document.querySelectorAll('#periodo-revolucion [data-certeza="hecho"]').length >= 10` — hecho count
- `document.querySelectorAll('#periodo-revolucion [data-certeza="opinion"]').length >= 4` — opinión count
- `document.querySelectorAll('#periodo-revolucion [data-certeza="rumor"]').length >= 1` — rumor count
- `document.querySelectorAll('#periodo-revolucion .sub-period').length === 4` — all 4 sub-periods present
- `document.querySelectorAll('#periodo-revolucion .card-image img').length >= 14` — images present
- `document.querySelectorAll('#periodo-revolucion cite').length >= 10` — source citations on hecho cards
- `document.querySelectorAll('#periodo-revolucion .alberdi-quote').length >= 3` — Alberdi connecting text
- Visual: all cards render with correct certeza styling (green/blue/amber indicators)
- Visual: images load or fallback gracefully (no broken image icons)
- Visual: stagger reveal animations fire on scroll
- Diagnostic: `document.querySelectorAll('#periodo-revolucion .img-error, #periodo-revolucion .img-fallback').length === 0` — no broken image fallbacks active (failure-path check)

## Observability / Diagnostics

- Runtime signals: Console `[Images] Fallback handlers set for N card images` — confirms image fallback JS covers new cards; `[Reveal] Initialized with N elements` — confirms reveal system discovers new cards
- Inspection surfaces: `document.querySelectorAll('#periodo-revolucion [data-certeza]')` for card inventory; `.card-image img` naturalWidth check for image load status
- Failure visibility: `.img-error` class on `<img>` and `.img-fallback` class on `.card-image` wrapper for broken images; `[Images] Failed to load:` console warnings
- Redaction constraints: none

## Tasks

- [x] **T01: Research and draft content for sub-period 1: Revolución e Independencia (1800-1820)** `est:45m`
  - Why: The content draft is the intermediate verification artifact that catches factual errors before HTML integration. This sub-period covers 5 events: Revolución de Mayo, Primeros gobiernos patrios, Campañas de Belgrano y San Martín, Congreso de Tucumán, and San Martín's continental campaigns.
  - Files: `.gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md`
  - Do: Research each event with ≥2 sources per hecho. Write detailed excerpts (4-8 sentences for major events like Revolución de Mayo and San Martín's campaigns; 2-4 for Primeros gobiernos). Classify certeza (all 5 are hecho). Note Alberdi's birth year (1810, Tucumán) as connecting context. Document all sources with full citation. Note image candidates from Wikimedia Commons.
  - Verify: Draft has 5 entries with title, date, certeza, excerpt, ≥2 sources each, and image notes
  - Done when: All 5 events for 1800-1820 are drafted with verified sources

- [x] **T02: Research and draft content for sub-period 2: Anarquía y guerras civiles (1820-1835)** `est:35m`
  - Why: This sub-period covers 4 events: Cepeda 1820, Unitarios vs Federales, Rivadavia, and Rosas + Generación del 37. The last event is the first with major Alberdi presence (Salón Literario).
  - Files: `.gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md` (append)
  - Do: Research each event. The Rosas/Gen. del 37 card is opinión type — needs Alberdi quote from the Salón Literario period or early writings. Verify Alberdi's timeline: arrived Buenos Aires ~1824, Colegio de Ciencias Morales, University, Salón Literario 1837. Document sources.
  - Verify: Draft has 4 entries (3 hecho, 1 opinión) with sources and Alberdi's Salón Literario context
  - Done when: All 4 events for 1820-1835 are drafted with verified sources

- [x] **T03: Research and draft content for sub-period 3: Época de Rosas (1835-1852)** `est:50m`
  - Why: This is the densest sub-period with 6 events including 2 opinión cards (Gen. del 37 exile and Alberdi-Sarmiento debate) and 1 rumor (Moreno's death — expanding existing placeholder). Alberdi is central to 3 of 6 events.
  - Files: `.gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md` (append)
  - Do: Research all 6 events. For the Alberdi-Sarmiento debate: verify "Civilización y Barbarie" (1845 Sarmiento) vs Alberdi's responses — needs precise quotes from both. For Mazorca: document both verified facts and speculative elements (rumor-adjacent content). Expand the existing Moreno death placeholder with more origin detail. For Caseros: verify date (3 Feb 1852), forces, outcome, Alberdi's position. Document all sources.
  - Verify: Draft has 6 entries (3 hecho, 2 opinión, 1 rumor) with Alberdi's exile arc coherent
  - Done when: All 6 events for 1835-1852 are drafted with verified sources and Alberdi quotes traced to originals

- [x] **T04: Research and draft content for sub-period 4: Organización Nacional (1852-1860)** `est:40m`
  - Why: This sub-period is the climax of Alberdi's story — *Bases*, the Constitution, his diplomatic role. 5 events including the key opinión card for *Bases y puntos de partida*. Must verify that "Gobernar es poblar" is from *Bases* (it is — widely documented).
  - Files: `.gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md` (append)
  - Do: Research all 5 events. For *Bases*: use extended quote beyond "Gobernar es poblar" — the intro already uses that quote, so the card needs a different passage showing constitutional vision. Verify Constitution 1853 articles that reflect Alberdi's proposals (immigration policy, federal structure, foreign trade). For secession/reunification: verify timeline (1852-1860 sequence). Document Alberdi's diplomatic role in Europe for the Confederación.
  - Verify: Draft has 5 entries (3 hecho, 2 opinión) with distinct Alberdi quotes (not repeating "Gobernar es poblar")
  - Done when: All 5 events for 1852-1860 are drafted with verified sources

- [x] **T05: Write Alberdi connecting narrative between sub-periods** `est:20m`
  - Why: Alberdi is the narrative thread. Between sub-period card groups, standalone `.alberdi-quote` blockquotes and connecting paragraphs trace his arc from birth (1810) through exile and *Bases* to the Constitution. This text binds the 4 sub-periods into a coherent narrative.
  - Files: `.gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md` (append section)
  - Do: Write 3-4 connecting passages (one between each sub-period pair). Each has a verified Alberdi quote + 2-3 sentences of biographical/intellectual context. Trace arc: birth in Tucumán during revolution → student encountering ideas in Buenos Aires → intellectual in exile producing transformative work → constitutional architect. Every quote must cite original work.
  - Verify: 3-4 connecting passages with verified quotes, distinct from card content
  - Done when: Connecting narrative drafted with sources, covering Alberdi's full 1810-1860 arc

- [x] **T06: Source Wikimedia Commons images for all 19 events** `est:30m`
  - Why: Each card needs a real image or styled placeholder. The 1800-1860 period has better image availability than colonial — portraits, battle paintings, engravings, and documents are widely available on Wikimedia Commons.
  - Files: `.gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md` (update image notes with verified URLs)
  - Do: For each event, search Wikimedia Commons for appropriate public domain images. Use the API to verify thumbnail URLs (500px). Priority images: Cabildo Abierto painting, San Martín portraits, Alberdi at multiple ages, Rosas portrait, Caseros battle, Constitution 1853 document. All must be pre-1900 or PD-tagged. Document verified URLs in the content draft.
  - Verify: At least 14 of 19 events have verified Wikimedia Commons thumbnail URLs
  - Done when: Image URLs documented in content draft, ready for HTML integration

- [x] **T07: Integrate all cards into index.html with sub-period structure** `est:60m`
  - Why: This is the mechanical integration task — taking verified content from the draft and putting it into HTML following established card templates. This is the largest task by line count (~600-800 new lines of HTML).
  - Files: `index.html`, `styles.css`
  - Do: Replace the 3 placeholder cards in `#periodo-revolucion` with the full card set. Add sub-period `<div class="sub-period" id="rev-XXXX-YYYY">` wrappers with `<h3>` headers. Use exact card template structure from colonial section. Add `.card-image` wrappers with `<img>` tags for Wikimedia images. Set `--reveal-delay` stagger on each card (80ms increments, reset per sub-period group). Add `.alberdi-quote` blockquotes between sub-period groups. Add ~30-40 lines of CSS for `.sub-period` headers and `.sub-period__title` styling. Update period intro paragraph if needed.
  - Verify: Open `index.html` in browser. Count cards: `querySelectorAll('#periodo-revolucion [data-certeza]').length >= 15`. Verify images load. Verify certeza indicators show correct colors. Verify reveal animations fire.
  - Done when: All cards visible in browser with correct certeza styling, images loading, and stagger animations working

## Files Likely Touched

- `.gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md` — new (intermediate research artifact)
- `index.html` — major modification (~600-800 new lines in `#periodo-revolucion`)
- `styles.css` — minor additions (~30-40 lines for sub-period headers/dividers)
