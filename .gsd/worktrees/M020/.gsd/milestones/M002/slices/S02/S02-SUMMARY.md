---
id: S02
parent: M002
milestone: M002
provides:
  - 6 real Wikimedia Commons public domain images on colonial period cards with responsive sizing and fallback styling
  - CSS-animated colonial timeline bar (1500–1807) with 6 staggered date markers as multimedia element
  - Responsive video wrapper CSS infrastructure for future iframe embeds
  - Image error fallback system (JS handler + CSS fallback display)
  - Complete colonial section passing all 7 M002 acceptance criteria
requires:
  - slice: S01
    provides: 7 event cards with verified historical content, certeza classification, and image placeholder divs ready for replacement
affects: []
key_files:
  - index.html
  - styles.css
  - app.js
key_decisions:
  - Used Wikimedia Commons API-verified thumbnail URLs (500px width) to avoid loading massive originals while ensuring browser compatibility
  - Chose CSS-animated timeline over YouTube embed — no suitable guaranteed-embeddable colonial Argentina video found; self-contained CSS is more reliable than external dependencies
  - Kept Ciudad de los Césares card as styled placeholder — no public domain image exists for a mythical city that was never found
  - Added responsive-video CSS infrastructure even without a video embed, enabling zero-work video addition later
patterns_established:
  - .card-image wrapper with img inside replaces .card-image-placeholder for real images; JS error handler adds .img-error/.img-fallback classes for CSS-driven fallback
  - .colonial-timeline integrates with existing reveal system (.reveal .reveal-fade + .reveal--visible) to trigger CSS keyframe animations on scroll
  - Staggered marker animations use nth-child selectors with delays timed to progress bar position
  - prefers-reduced-motion respected on all new animations (timeline, markers, video wrapper)
observability_surfaces:
  - "Console: [Images] Fallback handlers set for 6 card images. — confirms fallback JS initialized"
  - "Console warning: [Images] Failed to load: <url> — on broken images"
  - "DOM: .colonial-timeline.reveal--visible — timeline animation triggered (progress width > 0)"
  - "DOM: .card-image img naturalWidth > 0 — image loaded successfully"
  - "DOM: .img-error on img, .img-fallback on parent — broken image detected"
drill_down_paths:
  - .gsd/milestones/M002/slices/S02/tasks/T01-SUMMARY.md
  - .gsd/milestones/M002/slices/S02/tasks/T02-SUMMARY.md
  - .gsd/milestones/M002/slices/S02/tasks/T03-SUMMARY.md
duration: 1h25m
verification_result: passed
completed_at: 2026-03-18
---

# S02: Multimedia, imágenes reales y pulido visual

**Replaced 6 card placeholders with real Wikimedia Commons images, added CSS-animated colonial timeline with staggered date markers, and verified all 7 M002 acceptance criteria pass at desktop and mobile viewports**

## What Happened

This slice transformed the colonial section from text-only cards with styled placeholders into a complete multimedia reading experience. The work progressed in three tasks:

**T01 — Real historical images:** Replaced `div.card-image-placeholder` elements on 6 of 7 cards with real `<img>` elements sourced from Wikimedia Commons. Images include period paintings (Moreno Carbonero's founding of Buenos Aires), historical illustrations (Schmidl's 1536 engraving), maps (Virreinato del Río de la Plata, ethnographic map of indigenous peoples), architectural photographs (San Ignacio Miní ruins), and commemorative illustrations (Caras y Caretas 1906). All images are verified public domain (pre-1900 works or CC-licensed). Card 7 (Ciudad de los Césares — a mythical city) retained its enhanced placeholder since no suitable image exists. Added ~25 lines of CSS for responsive card images (`max-height: 220px`, `object-fit: cover`) and fallback styling. Added JS image error handler in `app.js`.

**T02 — CSS-animated timeline:** After searching for embeddable colonial Argentina documentaries without finding a guaranteed-available option, implemented the planned fallback: a CSS-animated timeline bar spanning 1500–1807 with 6 date markers. The progress bar fills left-to-right over 2.5s, and each marker dot appears with a staggered delay matching its chronological position. The animation triggers via the existing IntersectionObserver reveal system. Also added ~30 lines of responsive video wrapper CSS (`.responsive-video`) as infrastructure for future iframe embeds. All animations respect `prefers-reduced-motion`.

**T03 — Final verification:** Systematic check of all 7 M002 acceptance criteria at both desktop (1200px) and mobile (375px) viewports. All criteria passed without requiring fixes: 7 cards with correct certeza classification (5 hecho, 1 opinión, 1 rumor), 6 real images loaded, animated timeline functional, source citations on all hecho cards, full attribution on the opinión card, explicit origin documented on the rumor card, and no horizontal overflow on mobile.

## Verification

All slice-level checks passed:

| Check | Status | Evidence |
|-------|--------|----------|
| ≥5 cards with real images | ✅ PASS | 6 images from Wikimedia Commons, all loaded (naturalWidth > 0) |
| All images have descriptive alt text | ✅ PASS | All 6 have >50 char alt text describing historical content |
| All images use loading="lazy" | ✅ PASS | DOM inspection confirmed |
| Video/animation present | ✅ PASS | CSS-animated colonial timeline with 6 staggered markers |
| Timeline animation triggers on scroll | ✅ PASS | .reveal--visible applied, progress bar at 702px |
| 5+ events with text + image | ✅ PASS | 7 cards total, 6 with real images |
| Coherent 300-year panoramic narrative | ✅ PASS | Chronological flow ~1500→1806, intro paragraph frames arc |
| Certeza classification correct | ✅ PASS | 5 hecho, 1 opinión, 1 rumor with matching data-certeza attributes |
| Opinions with full attribution | ✅ PASS | Peramás, *De administratione Guaranica*, 1793 |
| Rumors explicitly marked | ✅ PASS | Amber badge + "Origen del rumor" footer tracing to 1528 |
| No placeholder cards from original | ✅ PASS | 0 .event-card--placeholder elements |
| Mobile responsive (375px) | ✅ PASS | No horizontal overflow, cards stack single-column |
| No console errors | ✅ PASS | Clean console (only debug logs) |
| No failed network requests | ✅ PASS | All resources loaded |
| Image fallback system works | ✅ PASS | .img-fallback::after CSS rule present, JS handler initialized |
| prefers-reduced-motion support | ✅ PASS | 5 media query blocks in CSS |

## New Requirements Surfaced

- none

## Deviations

- **Video → CSS animation fallback:** No suitable guaranteed-embeddable YouTube video about colonial Argentina was found during search. This was the planned fallback path (D019), so the CSS-animated timeline was implemented instead. Responsive video CSS infrastructure was added anyway for zero-work future video additions.
- **Ethnographic map for Card 1:** Used a modern cartographic reconstruction of Patagonian peoples rather than a period artifact — it's the most relevant period-specific option available on Wikimedia Commons and accurately depicts pre-colonial peoples.

## Known Limitations

- **Ciudad de los Césares card has no real image** — retained as styled placeholder because no public domain image exists for a city that was never found. This is intentional and documented.
- **No embedded video** — the CSS animated timeline satisfies the "video o animación" acceptance criterion, but a real video embed would add richer multimedia. The `.responsive-video` CSS infrastructure is ready for when a suitable video is found.
- **Wikimedia Commons rate-limits CLI/curl requests** — doesn't affect browser rendering but makes server-side image verification difficult. Images load fine in browsers.

## Follow-ups

- A suitable Spanish-language documentary about colonial Argentina could be added later using the existing `.responsive-video` CSS wrapper — zero additional CSS work needed.
- The image fallback system (JS handler + CSS fallback display) is ready to be reused in M003/M004 cards.

## Files Created/Modified

- `index.html` — Replaced 6 card-image-placeholder divs with card-image wrappers containing real `<img>` elements from Wikimedia Commons; added CSS-animated colonial timeline HTML block after events grid
- `styles.css` — Added ~25 lines for card image responsive styling and fallback; added ~300 lines for colonial timeline animation (keyframes, staggered delays, responsive breakpoints, reduced-motion); added ~30 lines for responsive video wrapper infrastructure
- `app.js` — Added `initImageFallbacks` function that sets error handlers on card images to apply CSS fallback classes

## Forward Intelligence

### What the next slice should know
- The card image pattern (`.card-image` wrapper with `<img>` inside) is established and can be reused directly in M003/M004 cards. The fallback JS in `app.js` auto-discovers all `.card-image img` elements on load — no per-card wiring needed.
- The animated timeline pattern (`.colonial-timeline` + reveal system integration) could be replicated for other periods. The key is using `--marker-pos` CSS variables for positioning and nth-child stagger delays.
- The `.responsive-video` CSS class exists but is unused in HTML. To embed a video: `<div class="responsive-video"><div class="responsive-video__wrapper"><iframe ...></div></div>`.

### What's fragile
- **Wikimedia Commons image URLs** — These are direct thumbnail URLs from the Wikimedia API. If Wikimedia changes their URL scheme or removes images, the fallback system will activate (sepia background + alt text). The URLs use the `/thumb/` path with explicit width (500px), which has been stable but isn't guaranteed.
- **Timeline marker positioning** — The `--marker-pos` percentages are manually calculated based on the 1500–1806 date range. If events are added or dates change, the positions need manual recalculation.

### Authoritative diagnostics
- **Console `[Images]` logs** — Filter console for `[Images]` to see fallback handler initialization count and any load failures. This is the fastest way to diagnose image issues.
- **DOM `data-certeza` attributes** — `document.querySelectorAll('#periodo-colonial [data-certeza]')` returns all classified cards with their certeza level. This is the authoritative check for classification correctness.
- **`.reveal--visible` on `.colonial-timeline`** — If the timeline isn't animating, check this class first. It's added by the IntersectionObserver in app.js when the element enters the viewport.

### What assumptions changed
- **Assumed a suitable YouTube embed would be available** — No guaranteed-embeddable colonial Argentina video was found. The CSS animation fallback path (planned in D019) was executed instead. Future milestones should plan for CSS animation as the primary multimedia approach rather than relying on finding embeddable videos.
