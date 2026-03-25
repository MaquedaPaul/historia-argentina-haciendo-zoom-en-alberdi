# S02: Multimedia, imágenes reales y pulido visual — UAT

**Milestone:** M002
**Written:** 2026-03-18

## UAT Type

- UAT mode: mixed (artifact-driven DOM inspection + live-runtime visual verification)
- Why this mode is sufficient: The colonial section is a static HTML page with CSS animations — all acceptance criteria can be verified by DOM inspection and visual review in a browser at desktop and mobile viewports. No server-side logic, database, or API calls to test.

## Preconditions

- `index.html` served via any HTTP server (e.g., `npx serve .` or `python -m http.server`)
- Browser with DevTools available (Chrome recommended for Rendering panel)
- Network access to `upload.wikimedia.org` for image loading (or test with images cached)

## Smoke Test

Open `http://localhost:<port>/#periodo-colonial` — scroll down and confirm you see cards with real historical images (paintings, maps, engravings), not just colored text placeholders.

## Test Cases

### 1. Card count and image presence

1. Open `index.html` in browser, navigate to `#periodo-colonial`
2. Count the total number of event cards in the colonial section
3. Count how many cards display a real photographic/artistic image (not a text placeholder)
4. **Expected:** 7 total cards, at least 6 with real images. Exactly 1 card (Ciudad de los Césares) should show a styled text placeholder with amber styling.

### 2. Image sources are Wikimedia Commons

1. Open DevTools → Elements
2. Find all `<img>` elements inside `#periodo-colonial .card-image`
3. Check the `src` attribute of each image
4. **Expected:** All 6 image `src` URLs contain `upload.wikimedia.org`. No images from other domains.

### 3. Image alt text accessibility

1. In DevTools, inspect each `.card-image img` element
2. Read the `alt` attribute
3. **Expected:** Every image has a descriptive alt text (not empty, not generic like "image"). Each alt text should describe the specific historical content shown (e.g., mentions the event, people, or location depicted). Minimum ~50 characters each.

### 4. Image lazy loading

1. In DevTools, check the `loading` attribute on each `.card-image img`
2. **Expected:** All 6 images have `loading="lazy"`.

### 5. Certeza classification on all cards

1. In DevTools Console, run: `document.querySelectorAll('#periodo-colonial [data-certeza]').length`
2. Then: `Array.from(document.querySelectorAll('#periodo-colonial [data-certeza]')).map(el => el.dataset.certeza)`
3. **Expected:** 7 cards total. Values: 5× "hecho", 1× "opinion", 1× "rumor". Each card should have matching visual styling (green accent for hecho, blue for opinión, amber for rumor).

### 6. Hecho cards have source citations

1. For each card with `data-certeza="hecho"`, look for a `<cite>` element or source footer
2. Read the citation text
3. **Expected:** All 5 hecho cards have specific historical source citations (author, title, date). Sources should include primary references (Schmidl, Groussac, Actas del Cabildo, Real Cédula, etc.).

### 7. Opinión card has full attribution

1. Find the card with `data-certeza="opinion"` (Misiones jesuíticas)
2. Check for blockquote with attributed quote
3. Check for author name, source work, and date
4. **Expected:** Blockquote containing a period quote. Author: "José Manuel Peramás". Source: *De administratione Guaranica comparate ad Republicam Platonis commentarius*. Date/context: "tratado comparativo, 1793".

### 8. Rumor card is explicitly marked

1. Find the card with `data-certeza="rumor"` (Ciudad de los Césares)
2. Check for visible "RUMOR" badge
3. Check for "Origen del rumor" footer section
4. **Expected:** Amber "RUMOR" badge visible at top of card. Card text in italic. Footer section titled "Origen del rumor:" traces the legend origin to capitán Francisco César in 1528.

### 9. CSS-animated timeline present and functional

1. Scroll past all 7 cards to the bottom of the colonial section
2. Look for an animated timeline bar titled "Tres siglos de historia colonial"
3. Wait for the animation to complete (~3 seconds)
4. **Expected:** A horizontal timeline bar with 6 date markers (~1500, 1536, 1580, 1609, 1776, 1806). The progress bar should fill from left to right. Each marker dot should appear with a staggered delay. Labels should be visible below each marker.

### 10. Timeline integrates with reveal system

1. In DevTools, inspect the `.colonial-timeline` element
2. Check for `reveal--visible` class
3. Check the computed width of `.colonial-timeline__progress`
4. **Expected:** `.reveal--visible` class is present (added by IntersectionObserver when element entered viewport). Progress bar width should be >0 (full width after animation completes).

### 11. Mobile responsive layout (375px)

1. Open DevTools → toggle device toolbar → set to 375×812 (iPhone SE or similar)
2. Navigate to `#periodo-colonial` and scroll through all cards
3. Check for horizontal overflow: `document.body.scrollWidth > document.body.clientWidth`
4. **Expected:** Cards stack in single column. Images scale to full card width. Timeline adapts (labels may hide at small widths). No horizontal scrollbar. No text or images overflow their containers.

### 12. Narrative coherence read-through

1. Read the section intro paragraph
2. Read each card's content in order (top-left to bottom-right in desktop, top-to-bottom on mobile)
3. **Expected:** Cards flow chronologically: ~1500 (pueblos originarios) → 1536 (primera fundación) → 1580 (segunda fundación) → 1609–1767 (misiones jesuíticas) → 1776 (virreinato) → 1806–1807 (invasiones inglesas) → XVI–XVIII (Ciudad de los Césares legend). The narrative covers 300 years of colonial Argentina coherently without factual contradictions.

### 13. No original placeholder cards remain

1. In DevTools Console, run: `document.querySelectorAll('#periodo-colonial .event-card--placeholder').length`
2. **Expected:** 0 — no cards with the old placeholder class should remain.

## Edge Cases

### Broken image fallback

1. In DevTools → Network, block requests to `upload.wikimedia.org`
2. Reload the page
3. **Expected:** Images show a sepia-toned fallback background with truncated alt text. The `.img-error` class should be on the `<img>` element and `.img-fallback` on the parent `.card-image`. Console should show `[Images] Failed to load: <url>` warnings.

### Reduced motion preference

1. In DevTools → Rendering → check "Emulate CSS media feature prefers-reduced-motion"
2. Reload the page and scroll to the colonial section
3. **Expected:** The colonial timeline shows all markers and full progress bar immediately with no animation. Cards appear without reveal transitions. No animation should play.

### Very narrow viewport (320px)

1. Set viewport to 320×568 (iPhone SE 1st gen)
2. Scroll through the colonial section
3. **Expected:** No horizontal overflow. All content readable. Images scale down. Timeline markers may overlap labels but should not break layout.

## Failure Signals

- Any card showing a colored text div instead of a real image (except Ciudad de los Césares)
- Console errors related to image loading or JS execution
- `data-certeza` attribute missing on any card
- Hecho card without a `<cite>` or source footer
- Opinión card without author/source attribution
- Rumor card without "Origen del rumor" section
- Timeline not animating (missing `reveal--visible` class)
- Horizontal scrollbar at any viewport width ≥320px
- Broken layout (overlapping cards, images overflowing containers)

## Not Proven By This UAT

- Historical accuracy of the text content itself (verified in S01 against primary sources — this UAT checks structure and presentation, not historiographic correctness)
- Performance under slow network conditions (images are lazy-loaded but no performance budget is defined)
- Accessibility beyond alt text (screen reader navigation, focus management, ARIA landmarks for the timeline)
- Cross-browser compatibility beyond Chromium (not tested in Firefox or Safari)
- SEO or metadata quality

## Notes for Tester

- The 404 error that may appear on initial load is likely a missing `favicon.ico` — this is harmless and unrelated to the slice.
- The Ciudad de los Césares placeholder is **intentional** — don't flag it as a missing image. There is no historical image for a mythical city.
- The Karte-Indianer-Patagoniens.png on Card 1 is a modern cartographic reconstruction, not a period artifact — this was a deliberate sourcing choice documented in T01.
- Console debug logs (`[ScrollSpy]`, `[Reveal]`, `[Images]`) are expected and should not be confused with errors.
- The `.responsive-video` CSS class exists in the stylesheet but is not used in HTML — this is infrastructure for future video embeds and should not be flagged as dead code.
