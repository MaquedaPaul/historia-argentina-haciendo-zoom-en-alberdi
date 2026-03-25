# S01: Contenido histórico verificado integrado en cards

**Goal:** Replace the 3 placeholder cards in `#periodo-colonial` with 6-7 fully researched, historically verified, certeza-classified event cards using the existing card templates. Every fact cross-referenced, every opinion attributed, every rumor sourced.

**Demo:** Open `index.html` in browser, scroll to the colonial section — see 6-7 event cards spanning ~1500-1807 with green/blue/amber certeza borders, indicator icons (✓/💬/⚠️), historically accurate content, and source citations. Cards use styled image placeholders (real images come in S02).

## Must-Haves

- 6-7 event cards covering: pueblos originarios (~1500), primera fundación de Buenos Aires (1536), segunda fundación (1580), misiones jesuíticas (1609-1767), Virreinato del Río de la Plata (1776), Invasiones Inglesas (1806-1807), and optionally La Ciudad de los Césares legend
- At minimum: 5 `card-hecho`, 1 `card-opinion`, 1 `card-rumor`
- Every hecho card cites at least one historical source in `<cite>`
- The opinión card has full attribution (author, work, date, context type)
- The rumor card explains the origin of the legend
- Grid wrapper uses `events-grid events-grid--certeza` class
- All cards have `reveal reveal-slide` classes with `--reveal-delay` stagger
- Intro paragraph enhanced with richer panoramic context
- Dates that are approximate show uncertainty (e.g., "~1500", "Siglo XVI")

## Proof Level

- This slice proves: integration (real content in real HTML using existing CSS/JS systems)
- Real runtime required: yes (browser rendering)
- Human/UAT required: yes (historical accuracy read-through)

## Verification

- Open `index.html` in browser, verify colonial section shows 6-7 cards with certeza styling
- Verify each card has correct certeza indicator icon and label
- Verify hecho cards have `<cite>` source footer
- Verify opinión card has blockquote with author, work title, date, and context type
- Verify rumor card has origin explanation footer
- Verify grid uses `events-grid--certeza` class (inspect DOM)
- Verify all cards have `data-certeza` attribute matching their class
- Scroll past section — verify reveal animations trigger on each card

## Tasks

- [x] **T01: Research, verify, and draft content for all 6-7 colonial events** `est:2h`
  - Why: Content accuracy is the hard constraint (D008, R012). All text must be researched and verified before touching HTML. This is the highest-risk task in the milestone.
  - Files: `.gsd/milestones/M002/slices/S01/S01-CONTENT-DRAFT.md` (working document)
  - Do: Research each of the 6-7 events using web sources. For each event: (1) write a 2-4 sentence excerpt appropriate for panoramic scope, (2) verify all dates/names/places against at least 2 sources, (3) classify certeza level, (4) note source citations, (5) for the opinión card find and verify an exact quote with full attribution, (6) for the rumor card identify and document the origin of the legend. Write all drafts into a content document before HTML integration. Use historically appropriate language — avoid anachronistic framing.
  - Verify: Content draft document exists with all 6-7 events, each with verified facts and source citations
  - Done when: All event content is drafted, verified, classified, and ready for HTML integration

- [x] **T02: Replace placeholder cards with verified content in index.html** `est:1h`
  - Why: This is the integration task — taking verified content and slotting it into the existing HTML structure using proven card templates.
  - Files: `index.html`
  - Do: (1) Change `events-grid` to `events-grid events-grid--certeza` on the grid wrapper. (2) Delete the 3 `event-card--placeholder` divs. (3) For each of the 6-7 events, create an `<article>` element copying the exact template structure from the `periodo-revolucion` cards (lines 140-212): certeza indicator div, card-image-placeholder div with descriptive alt text, year span, title h3, excerpt paragraph (for hecho/rumor) or blockquote (for opinión), and appropriate footer (card-source for hecho, card-opinion__attribution for opinión, card-rumor__origin for rumor). (4) Add `reveal reveal-slide` classes to every card. (5) Add `style="--reveal-delay: Xms"` with 0, 80, 160, 240, 320, 400, 480ms stagger. (6) Enhance the intro paragraph with richer panoramic context about the 300-year colonial period. (7) Verify the HTML structure matches the templates exactly — class names, nesting, data attributes.
  - Verify: Open `index.html` in browser. Colonial section shows 6-7 cards with correct certeza styling, indicators, and source citations. Scroll triggers reveal animations with visible stagger.
  - Done when: All placeholder cards replaced, all certeza types visually correct, reveal animations working, content matches the verified draft

## Observability / Diagnostics

**Runtime signals:**
- Browser DOM inspection: `document.querySelectorAll('#periodo-colonial [data-certeza]')` returns 6-7 elements, each with `data-certeza` value matching its card class (`hecho`, `opinion`, or `rumor`).
- Card count verification: `document.querySelectorAll('#periodo-colonial .event-card').length` should be 6 or 7.
- Certeza distribution: at least 1 `card-opinion`, at least 1 `card-rumor`, remainder `card-hecho`.
- Reveal animation: scroll past colonial section — `.reveal.is-visible` class should be applied to each card after intersection.

**Inspection surfaces:**
- Content draft: `.gsd/milestones/M002/slices/S01/S01-CONTENT-DRAFT.md` — the verified source of truth for all card text, citations, and certeza classifications.
- HTML source: `index.html` `#periodo-colonial` section — inspect card structure, `data-certeza` attributes, `<cite>` elements, blockquote attribution, rumor origin footers.

**Failure visibility:**
- Missing certeza styling: cards without `card-hecho`/`card-opinion`/`card-rumor` class will render with default card styling (no colored border) — visually obvious.
- Broken reveal: cards without `reveal reveal-slide` classes won't animate on scroll — visually obvious during scroll test.
- Missing citations: hecho cards without `<cite>` elements will have no source footer — visually obvious.

**Redaction constraints:**
- No secrets or credentials involved in this slice. All content is public historical information.

## Files Likely Touched

- `index.html` — Replace placeholder cards with 6-7 verified certeza cards, upgrade grid wrapper, enhance intro
- `.gsd/milestones/M002/slices/S01/S01-CONTENT-DRAFT.md` — Working document for content drafts (intermediate artifact)
