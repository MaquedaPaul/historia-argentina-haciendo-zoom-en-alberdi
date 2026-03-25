# S01: Contenido verificado + imágenes + integración HTML

**Goal:** Replace the 3 placeholder stubs in `#periodo-nacional` with 7 verified event cards — each with Wikimedia Commons photographs, certeza classification, source citations, and Alberdi narrative connections — culminating in the explicit closure of Alberdi's narrative arc (death 1884, legacy).

**Demo:** Open `index.html` in a browser, scroll to the "Consolidación y Modernización" section. 7 event cards are visible with certeza badges (hecho/opinión), real photographs, source citations. The final card (or closing connector) narrates Alberdi's return, diputación, death, and legacy. DOM query `document.querySelectorAll('#periodo-nacional [data-certeza]').length` returns 7.

## Must-Haves

- 7 event cards with `data-certeza` attribute and correct certeza visual treatment
- All 7 cards have real Wikimedia Commons images (API-verified URLs, 500px thumbnails where available)
- At least 5 hecho cards with `<cite>` source footers referencing ≥2 sources
- At least 1 opinión card with `<blockquote>` and full attribution
- Alberdi closure: final card or closing `.alberdi-quote` covers return (1879), diputado, death (July 19, 1884), and legacy
- `events-grid--certeza` class on the grid container
- `--reveal-delay` stagger on all 7 cards (0ms, 80ms, 160ms, ...)
- No changes to `app.js` — reveal system and image fallbacks auto-discover new elements

## Verification

- `document.querySelectorAll('#periodo-nacional [data-certeza]').length === 7`
- `document.querySelectorAll('#periodo-nacional .card-image img').length === 7`
- `document.querySelectorAll('#periodo-nacional .img-error, #periodo-nacional .img-fallback').length === 0`
- `document.querySelectorAll('#periodo-nacional cite').length >= 7`
- `document.querySelector('#periodo-nacional .events-grid--certeza') !== null`
- Visual check: cards render at 1200px and 375px without overflow or broken images

## Observability / Diagnostics

- Runtime signals: `initImageFallbacks()` in app.js auto-discovers new `.card-image img` elements — console log confirms count on load
- Inspection surfaces: `document.querySelectorAll('#periodo-nacional [data-certeza]')` — returns all cards with certeza type; `.card-certeza-label` text shows classification
- Failure visibility: `.img-error` or `.img-fallback` class on images indicates broken Wikimedia URLs; check `T03-IMAGE-ANNOTATIONS.md` for canonical URLs

## Integration Closure

- Upstream surfaces consumed: existing card templates (`.card-hecho`, `.card-opinion`), certeza CSS system, reveal system, image fallback JS
- New wiring introduced in this slice: none — all patterns reused from M002/M003
- What remains before the milestone is truly usable end-to-end: S02 timeline animation + final verification

## Tasks

- [x] **T01: Content draft — 7 verified events with certeza and Alberdi narrative** `est:2h`
  - Why: Historical accuracy is the dominant risk. The content draft catches factual errors, certeza misclassification, and Alberdi narrative gaps before any HTML work.
  - Files: `.gsd/milestones/M004/slices/S01/S01-CONTENT-DRAFT.md`
  - Do: Using M004-RESEARCH.md verified facts, write 7 event entries with: title, year range, certeza type, 2-4 sentence excerpt, sources (≥2 for hecho), direct quotes with full attribution for opinión cards, Alberdi angle per card (from research content plan table), and image candidate filename. Final event (#7) must explicitly close Alberdi's arc: return 1879, diputado, death July 19 1884 [VERIFICACIÓN PENDIENTE], legacy. Use the exact dates and facts from the research's "Hechos Verificados Clave" section. Flag Alberdi death date with [VERIFICACIÓN PENDIENTE] per research guidance. Include the *El crimen de la guerra* quote from CADEP 2022 for the Guerra del Paraguay card.
  - Verify: `grep -c "^## Evento" S01-CONTENT-DRAFT.md` returns 7. Each entry has Certeza, Fuentes, and Imagen fields.
  - Done when: 7 events documented with certeza classification, ≥2 sources per hecho, Alberdi closure explicit in event #7

- [x] **T02: Wikimedia image sourcing — API-verified URLs for 7 cards** `est:45m`
  - Why: Images must be verified via Wikimedia API before HTML integration — guessing thumbnail paths fails due to MD5 hash directories (KNOWLEDGE.md).
  - Files: `.gsd/milestones/M004/slices/S01/T02-IMAGE-ANNOTATIONS.md`
  - Do: For each of the 7 image candidates from the content draft, query the Wikimedia API (`/w/api.php?action=query&titles=File:FILENAME&prop=imageinfo&iiprop=url&iiurlwidth=500&format=json`) to get verified thumbnail URLs. For images smaller than 500px, use the direct URL per KNOWLEDGE.md. Record: filename, verified URL, license (PD-old/PD-Art/CC), alt text (descriptive, 1 sentence), and attribution requirement (CC only). Use Wikimedia search API (`list=search&srnamespace=6`) if candidate filenames from research are missing. Prioritize Antonio Pozzo expedition photos for Conquista del Desierto.
  - Verify: 7 entries in T02-IMAGE-ANNOTATIONS.md, each with a verified URL (not guessed). Test at least 2 URLs with `curl -I` to confirm HTTP 200.
  - Done when: All 7 image URLs API-verified and documented with license and alt text

- [x] **T03: HTML integration — replace 3 stubs with 7 verified cards** `est:1h30m`
  - Why: The stubs are placeholders without certeza, images, or sources. This task replaces them with the real content from the verified draft and image annotations.
  - Files: `index.html`
  - Do: In `#periodo-nacional`, replace the 3 `event-card--placeholder` stubs and their parent `events-grid` div with a new `events-grid events-grid--certeza` div containing all 7 cards. Each card follows the established template: `<article class="event-card card-{certeza} reveal reveal-slide" data-certeza="{type}" style="--reveal-delay: {N*80}ms">` with card-certeza-indicator, card-image (Wikimedia URL + descriptive alt + `loading="lazy"`), year span, h3 title, excerpt paragraph, and cite/blockquote footer per certeza type. Add one `.alberdi-quote` closing connector after the events-grid to seal Alberdi's narrative arc. Do NOT add sub-nav, sub-periods, or expand/collapse — M004 is panoramic (D003). Do NOT modify `styles.css` or `app.js` — all needed classes already exist.
  - Verify: Open in browser. `document.querySelectorAll('#periodo-nacional [data-certeza]').length === 7`. `document.querySelector('.events-grid--certeza')` inside `#periodo-nacional` is not null. All 7 images render (no broken image icons). Reveal animations fire on scroll.
  - Done when: 7 cards visible with certeza badges, real images, source citations, Alberdi closure, and reveal stagger — all rendering correctly at 1200px

## Files Likely Touched

- `.gsd/milestones/M004/slices/S01/S01-CONTENT-DRAFT.md` (new)
- `.gsd/milestones/M004/slices/S01/T02-IMAGE-ANNOTATIONS.md` (new)
- `index.html` (modify `#periodo-nacional` section)
