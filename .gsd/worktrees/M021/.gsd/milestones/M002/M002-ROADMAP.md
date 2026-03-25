# M002: Período 1500-1800 (Panorámico)

**Vision:** The colonial period section transforms from 3 placeholder cards into a fully researched, historically verified, certeza-classified, multimedia-enriched narrative covering ~300 years of Argentine history in panoramic scope. Every fact is verified, every opinion attributed, every rumor marked. The section becomes a real reading experience with images and at least one video or animation.

## Success Criteria

- The `#periodo-colonial` section displays 6-7 event cards spanning 1500-1807, each with certeza classification (hecho/opinión/rumor) and corresponding visual treatment
- Every factual claim (date, name, place, event) in the cards has been cross-referenced against at least 2 historical sources and cited in `<cite>` elements
- At least 1 opinión card includes full attribution: who said it, when, and in what context (chronicle, letter, or report)
- At least 1 rumor card explicitly identifies the origin of the legend/speculation
- Each card has either a real image (Wikimedia Commons public domain) or a styled placeholder with historically descriptive alt text
- At least 1 embedded video or CSS animation is present and functional in the section
- The section reads as a coherent 300-year panoramic narrative, with each card's excerpt limited to 2-4 sentences
- Reveal-on-scroll animations trigger correctly with staggered delays on all new cards
- The events-grid uses the `events-grid--certeza` class for proper card sizing

## Key Risks / Unknowns

- **Historical accuracy of colonial-era content** — Incorrect dates, names, or events would violate the project's hardest constraint (D008, R012). Some colonial dates are approximate or debated.
- **Video embed availability** — Finding a quality, short, embeddable Spanish-language documentary about colonial Argentina may be difficult.

## Proof Strategy

- Historical accuracy → retire in S01 by researching and verifying all 6-7 events against reliable sources before integrating into HTML, with source citations in every card
- Video embed availability → retire in S02 by sourcing an embeddable video or falling back to a CSS animation if no suitable video is found

## Verification Classes

- Contract verification: Browser-based visual inspection of card rendering, certeza indicators, grid layout, and responsive behavior
- Integration verification: Existing JS reveal-on-scroll system automatically picks up new `.reveal` elements — verify animation triggers on the expanded card set
- Operational verification: none (static site)
- UAT / human verification: Read-through of all card content for historical coherence, narrative flow, and appropriate certeza classification

## Milestone Definition of Done

This milestone is complete only when all are true:

- All 6-7 event cards are integrated into `index.html` with verified historical content
- Every card uses the correct certeza class (`card-hecho`, `card-opinion`, or `card-rumor`) with matching `data-certeza` attribute
- Source citations are present on all hecho cards; attribution is complete on opinión cards; origin is documented on rumor cards
- At least 1 multimedia element (image or video) renders in the section
- Reveal animations fire correctly with stagger delays when scrolling to the colonial section
- The section intro paragraph provides panoramic context for the 300-year period
- Content has been visually verified in a browser at desktop and mobile viewport widths
- All acceptance criteria from the M002 context are satisfied

## Requirement Coverage

- **Covers:** R002 (colonial period content with 4-5+ events), R012 (historical verification), R013 (certeza classification system applied to real content)
- **Partially covers:** R005 (multimedia — images + video in this section; other sections addressed in M003/M004), R014 (opinión attribution — demonstrated in colonial period; primary application is M003)
- **Leaves for later:** R001 (full site — ongoing), R003 (1800-1860 detailed content — M003), R004 (1860-1900 content — M004), R006 (ambient sounds — M005), R007 (full responsive testing — M005), R011 (Alberdi as narrative thread — M003, he was born 1810)
- **Orphan risks:** none

## Slices

- [x] **S01: Contenido histórico verificado integrado en cards** `risk:high` `depends:[]`
  > After this: The colonial section displays 6-7 event cards with verified historical content, certeza classification, visual indicators, and source citations — all visible in the browser using the existing card templates and styled image placeholders.
- [x] **S02: Multimedia, imágenes reales y pulido visual** `risk:low` `depends:[S01]`
  > After this: All acceptance criteria are met — cards have real historical images from Wikimedia Commons, at least one embedded video or CSS animation is present, reveal animations are staggered, and the section delivers a complete panoramic reading experience.

## Boundary Map

### S01

Produces:
- 6-7 `<article>` elements in `index.html` inside `#periodo-colonial .events-grid`, each following the exact card template structure from `periodo-revolucion` (certeza indicator, image placeholder, year, title, excerpt/quote, source/attribution/origin footer)
- Grid wrapper upgraded to `events-grid events-grid--certeza`
- Enhanced intro paragraph with richer panoramic context
- All content historically verified with sources documented in `<cite>` elements

Consumes:
- Existing card HTML templates from `periodo-revolucion` section (lines 140-212 of `index.html`)
- Existing CSS certeza card system (lines 790-1132 of `styles.css`)
- Existing reveal animation system (JS auto-detects `.reveal` elements)

### S01 → S02

Produces:
- Complete card structure with `.card-image-placeholder` divs ready to be replaced with real `<img>` elements
- Stable card count and layout that S02 can enhance without restructuring

Consumes (S02):
- S01's integrated cards — S02 replaces image placeholders with real images, adds video embed, adds stagger delays, and polishes layout

---

# Decisions Register

| # | When | Scope | Decision | Choice | Rationale | Revisable? |
|---|------|-------|----------|--------|-----------|------------|
| D017 | M002 | content | Number of event cards for colonial period | 6-7 cards (5 hecho, 1 opinión, 1 rumor) | Panoramic scope (D003) needs enough events to cover 300 years coherently without becoming exhaustive. 6-7 cards with 2-4 sentence excerpts balances breadth with conciseness. At least 1 of each certeza type demonstrates the classification system with real content. | Yes |
| D018 | M002 | content | Image sourcing strategy | Wikimedia Commons public domain images + styled placeholders as fallback | Colonial-era artworks, maps, and engravings (pre-1900) are public domain. Wikimedia Commons provides reliable hotlinking. Styled placeholders with descriptive alt text serve as fallback for events without suitable images. No local image assets needed. | Yes |
| D019 | M002 | design | Video embed approach | Responsive iframe wrapper with aspect-ratio CSS (fallback: CSS animation) | Need ~10-15 lines of new CSS for responsive iframe embedding. If no suitable embeddable video is found, a CSS-animated timeline or map reveal serves as the multimedia requirement. | Yes |
| D020 | M002 | process | Slice decomposition for M002 | 2 slices: content+verification first (high risk), then multimedia+polish (low risk) | Content accuracy is the hard constraint and highest risk — must be proven first. Multimedia is additive enrichment that can be simplified if needed. Separating them keeps each slice focused and independently demoable. | No |
