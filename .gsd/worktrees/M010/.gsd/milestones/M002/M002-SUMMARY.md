---
id: M002
provides:
  - Complete colonial period section (1500-1800) with 7 historically verified, certeza-classified event cards
  - 6 real Wikimedia Commons public domain images integrated with responsive sizing and fallback system
  - CSS-animated colonial timeline (1500-1807) with 6 staggered date markers as multimedia element
  - Responsive video wrapper CSS infrastructure for future iframe embeds
  - Image error fallback system (JS handler + CSS fallback display)
  - Established card-image pattern and content-draft workflow reusable in M003/M004
key_decisions:
  - 7 cards (not 5) to demonstrate all three certeza types and span 300 years coherently (D018)
  - CSS-animated timeline instead of YouTube embed — no guaranteed-embeddable colonial Argentina video found; self-contained CSS is more reliable (D019 fallback path)
  - Wikimedia Commons 500px thumbnails via API-verified URLs — balances quality and load time
  - Content+verification first (high risk), multimedia+polish second (low risk) — proved correct decomposition (D020)
  - Ciudad de los Césares kept as styled placeholder — no public domain image exists for a mythical city
patterns_established:
  - Content draft workflow: research → verify against ≥2 sources → classify certeza → draft excerpts → integrate HTML. Content draft as intermediate artifact (.gsd/milestones/M002/slices/S01/S01-CONTENT-DRAFT.md)
  - Card image pattern: .card-image wrapper with <img> inside replaces .card-image-placeholder; JS error handler adds .img-error/.img-fallback classes for CSS-driven fallback. Auto-discovered on load — no per-card wiring
  - CSS animation + reveal integration: .reveal .reveal-fade classes trigger IntersectionObserver → .reveal--visible fires CSS @keyframes. Stagger via nth-child animation-delay
  - Stagger delays on cards via inline --reveal-delay custom property (0ms to 480ms in 80ms increments)
  - Wikimedia API thumbnail URL verification rather than guessing paths from filenames
  - prefers-reduced-motion on all new animations (5 media query blocks)
observability_surfaces:
  - "DOM: document.querySelectorAll('#periodo-colonial [data-certeza]').length === 7 — authoritative card count"
  - "DOM: querySelectorAll('[data-certeza=\"hecho\"]').length === 5, opinion === 1, rumor === 1 — certeza distribution"
  - "Console: [Images] Fallback handlers set for N card images — confirms fallback JS initialized"
  - "DOM: .colonial-timeline.reveal--visible — timeline animation triggered"
  - "DOM: .card-image img naturalWidth > 0 — image loaded successfully"
  - "DOM: .img-error on img, .img-fallback on parent — broken image detected"
requirement_outcomes:
  - id: R002
    from_status: active
    to_status: validated
    proof: 7 event cards with text + images covering pueblos originarios, conquista, fundaciones, misiones jesuíticas, virreinato, invasiones inglesas, and Patagonian legend. 6 real Wikimedia Commons images + 1 styled placeholder. Verified at desktop (1200px) and mobile (375px) viewports.
  - id: R012
    from_status: active
    to_status: active
    proof: Colonial period content verified — 5 hecho cards with sources from Schmidl, Groussac, Actas del Cabildo, Real Cédula 1776, Roberts. Each cross-referenced against ≥2 sources. Status remains active because M003/M004 content still needs verification.
  - id: R013
    from_status: active
    to_status: active
    proof: Certeza system applied with real content — 5 hecho, 1 opinión (Peramás 1793), 1 rumor (Ciudad de los Césares, origin 1528). Visual indicators, data attributes, and footer patterns all working. Status remains active because M003/M004 still need certeza classification.
  - id: R005
    from_status: active
    to_status: active
    proof: Colonial section now has 6 real images + CSS animated timeline. Responsive video CSS infrastructure ready. Status remains active because M003/M004 sections still need multimedia.
  - id: R014
    from_status: active
    to_status: active
    proof: Opinión attribution demonstrated with Peramás (*De administratione Guaranica*, 1793, comparative treatise). Template validated. Status remains active — primary application is M003 (Alberdi, San Martín).
duration: ~3h
verification_result: passed
completed_at: 2026-03-18
---

# M002: Período 1500-1800 (Panorámico)

**Transformed the colonial period section from 3 placeholder cards into a complete panoramic reading experience with 7 historically verified, certeza-classified event cards, 6 real historical images, a CSS-animated timeline, and source citations — covering 300 years from pre-Columbian peoples through the British invasions of 1806.**

## What Happened

The milestone executed in two slices that cleanly separated the hard constraint (historical accuracy) from the additive enrichment (multimedia and polish).

**Slice S01 — Content research, verification, and integration:** The high-risk work came first. Seven colonial-era events were researched, verified against multiple historical sources, classified by certeza level (5 hecho, 1 opinión, 1 rumor), and drafted as a structured content document. The events span ~1500 to 1806: pre-Columbian peoples, the 1536 founding attempt of Buenos Aires, the 1580 refounding, Jesuit missions (16th-18th c.), creation of the Viceroyalty (1776), British invasions (1806), and the legend of Ciudad de los Césares. Each hecho was cross-referenced against at least 2 independent sources (Schmidl's chronicle, Groussac, Actas del Cabildo, the 1776 Royal Decree, Roberts). The opinión card uses José Manuel Peramás's 1793 treatise *De administratione Guaranica* comparing Jesuit missions to Plato's Republic — a period-appropriate attributed observation. The rumor card traces the Ciudad de los Césares legend to its documented 1528 origin. All 7 cards were then integrated into `index.html` following the exact card template structure from the revolución section, with the grid upgraded to `events-grid--certeza`, stagger reveal animations added, and the intro paragraph rewritten to frame the 300-year arc.

**Slice S02 — Images, animation, and verification:** With content proven, S02 replaced 6 of 7 card image placeholders with real public domain images from Wikimedia Commons (period paintings, engravings, maps, architectural photographs). The 7th card (Ciudad de los Césares — a mythical city that never existed) retained its styled placeholder intentionally. After searching for embeddable colonial Argentina documentaries without finding a guaranteed-available option, the planned CSS animation fallback (D019) was executed: a CSS-animated timeline bar spanning 1500-1807 with 6 date markers that appear in staggered sequence as the user scrolls. Responsive video CSS infrastructure was added anyway for zero-work future video additions. An image error fallback system (JS handler + CSS fallback display) was added to app.js. Final verification confirmed all 7 acceptance criteria pass at both desktop (1200px) and mobile (375px) viewports.

## Cross-Slice Verification

Each success criterion from the roadmap was verified:

| Criterion | Status | Evidence |
|-----------|--------|----------|
| 6-7 event cards spanning 1500-1807 with certeza classification | ✅ PASS | 7 cards: 5 hecho, 1 opinión, 1 rumor. DOM: `querySelectorAll('#periodo-colonial [data-certeza]').length === 7` |
| Every factual claim cross-referenced against ≥2 sources with `<cite>` elements | ✅ PASS | 5 cite elements on hecho cards. Sources: Schmidl, Groussac, Actas del Cabildo, Real Cédula 1776, Roberts |
| ≥1 opinión card with full attribution (who, when, context) | ✅ PASS | Peramás, *De administratione Guaranica*, 1793, comparative treatise. Blockquote with attribution footer |
| ≥1 rumor card with documented origin | ✅ PASS | Ciudad de los Césares — "Origen del rumor" footer tracing to 1528 survivors of Caboto expedition |
| Each card has real image or styled placeholder with alt text | ✅ PASS | 6 Wikimedia Commons images (all naturalWidth > 0) + 1 styled placeholder with descriptive alt text |
| ≥1 embedded video or CSS animation | ✅ PASS | CSS-animated colonial timeline with progress bar + 6 staggered date markers, triggered by reveal system |
| Coherent 300-year panoramic narrative, 2-4 sentence excerpts | ✅ PASS | Intro paragraph frames arc; 7 cards in chronological order ~1500→1806 |
| Reveal-on-scroll with staggered delays | ✅ PASS | 7 cards with --reveal-delay (0ms to 480ms), 10 total reveal elements in section |
| events-grid--certeza class on grid | ✅ PASS | Present on `.events-grid` container |

**Definition of Done:** All 8 items confirmed — cards integrated, certeza classes correct, citations present, multimedia renders, animations fire, intro paragraph contextualizes, browser-verified at desktop+mobile, all acceptance criteria satisfied.

## Requirement Changes

- **R002** (colonial period content): active → **validated** — 7 events with text + images covering pueblos originarios, conquista, fundaciones, misiones jesuíticas, virreinato, invasiones inglesas, and leyenda patagónica. Exceeds the "4-5+ events" minimum. Verified at desktop and mobile viewports.
- **R012** (historical verification): remains **active** — Colonial content fully verified with cross-referenced sources. Status stays active because M003 and M004 content still needs verification.
- **R013** (certeza classification): remains **active** — System demonstrated with all 3 types on real content (5 hecho, 1 opinión, 1 rumor). Stays active for M003/M004 application.
- **R005** (multimedia): remains **active** — Colonial section has 6 real images + CSS animated timeline + responsive video CSS infrastructure. Other sections still need multimedia.
- **R014** (opinión attribution): remains **active** — Template validated with Peramás (1793). Primary application is M003 (Alberdi, San Martín, etc.).

## Forward Intelligence

### What the next milestone should know
- The **card-image pattern** (`.card-image` wrapper with `<img>` inside) is established and should be reused directly in M003/M004. The fallback JS in `app.js` auto-discovers all `.card-image img` elements — no per-card wiring needed.
- The **content draft workflow** (research → verify → classify → draft → integrate) proved effective. Creating a structured content draft as an intermediate artifact before touching HTML catches errors early and keeps the integration task focused.
- The **animated timeline pattern** (`.colonial-timeline` + reveal system integration) could be replicated for other periods. Key: use `--marker-pos` CSS variables for positioning and nth-child stagger delays.
- The `.responsive-video` CSS class exists but is unused in HTML. To embed a video: `<div class="responsive-video"><div class="responsive-video__wrapper"><iframe ...></div></div>`.
- The opinión card pattern (blockquote + attribution footer) is ready for heavy use in M003 where Alberdi, San Martín, and other figures need quoted opinions on events.

### What's fragile
- **Wikimedia Commons image URLs** — Direct thumbnail URLs from the Wikimedia API. If Wikimedia changes their URL scheme or removes images, the fallback system activates (sepia background + alt text). Browsers load them fine, but curl/CLI requests get rate-limited without proper User-Agent headers.
- **Timeline marker positioning** — The `--marker-pos` percentages are manually calculated based on the 1500-1806 date range. Adding events or changing dates requires manual recalculation.
- **app.js reveal system uses `reveal--visible` and `reveal--no-anim` classes** (not `is-visible`). Future cards must use these exact class names to integrate with the IntersectionObserver.

### Authoritative diagnostics
- **`document.querySelectorAll('#periodo-colonial [data-certeza]')`** — Returns all classified cards with their certeza level. Fastest way to verify classification correctness.
- **Console `[Images]` logs** — Filter for `[Images]` to see fallback handler initialization count and any load failures.
- **`.reveal--visible` on `.colonial-timeline`** — If the timeline isn't animating, check this class first. Added by IntersectionObserver when element enters viewport.

### What assumptions changed
- **Assumed a suitable YouTube embed would be available for colonial Argentina** — No guaranteed-embeddable video was found. The CSS animation fallback (D019) was executed instead. Future milestones should plan CSS animation as the primary multimedia approach rather than relying on finding embeddable videos.
- **Assumed 5 cards would suffice** — Went to 7 to demonstrate all three certeza types and cover the full 300-year span coherently. The grid handles 7 cards well at both desktop (3-column) and mobile (single-column).

## Files Created/Modified

- `index.html` — Replaced 3 placeholder cards with 7 verified certeza-classified event cards; added 6 real Wikimedia Commons images; added CSS-animated colonial timeline; upgraded grid to events-grid--certeza; enhanced intro paragraph
- `styles.css` — Added ~25 lines for card image responsive styling and fallback; ~300 lines for colonial timeline animation; ~30 lines for responsive video wrapper infrastructure; 5 prefers-reduced-motion blocks
- `app.js` — Added `initImageFallbacks` function for card image error handling with CSS fallback classes
- `.gsd/milestones/M002/slices/S01/S01-CONTENT-DRAFT.md` — Structured content draft with 7 events, sources, certeza classifications, and image notes
- `.gsd/milestones/M002/slices/S01/S01-SUMMARY.md` — S01 slice summary
- `.gsd/milestones/M002/slices/S02/S02-SUMMARY.md` — S02 slice summary