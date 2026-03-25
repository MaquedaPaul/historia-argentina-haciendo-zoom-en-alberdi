# M003: Período 1800-1860 (Foco Detallado)

**Vision:** Transform the `#periodo-revolucion` section from 3 placeholder cards into the project's richest section — 15-19 historically verified, certeza-classified event cards organized across 4 sub-periods (1800-1820, 1820-1835, 1835-1852, 1852-1860), with Alberdi as narrative thread, real Wikimedia Commons images, sub-period navigation, an animated timeline, and expand/collapse interactivity for detailed content.

## Success Criteria

- User can scroll through `#periodo-revolucion` and read 15+ detailed event cards organized into 4 chronological sub-periods, each with certeza classification visible
- Every factual claim in every card is verified against ≥2 historical sources, with `<cite>` elements documenting provenance
- Alberdi appears as contextualizing presence in ~60% of events through direct quotes, biographical notes, and connecting text — without eclipsing San Martín, Belgrano, Rosas, Sarmiento, or other próceres who have their own cards
- Each card has a real Wikimedia Commons image or a styled placeholder with descriptive alt text
- Opinión cards include full attribution (who, when, original work/context) in blockquote format
- Rumor cards explicitly mark speculative content with documented origin
- Sub-navigation within the period allows jumping between sub-periods and tracks scroll position
- An animated timeline spanning 1800-1860 fires on scroll with staggered date markers
- Major events have expand/collapse toggles revealing additional detail without overwhelming the initial view
- The section renders correctly at 320px and 1920px+ viewports

## Key Risks / Unknowns

- **Historical accuracy at scale** — 19 events with attributed quotes, dates, and sources is 4-5× the content volume of M002. A single fabricated quote or wrong date undermines the project's core promise (D008). This risk drives the content-first approach.
- **Alberdi quote sourcing** — *Bases* (1852) is widely available, but earlier works, exile-period letters, and speeches are less accessible. Some quotes may require secondary source attribution rather than direct citation.
- **Expand/collapse interaction is new** — The existing JS only has scroll spy and reveal animations. Adding toggle interactivity must not break the reveal system (expanded content pushing elements below viewport).
- **Timeline density** — 12-15 markers in 60 years (vs. 6 markers in 300 years for colonial). Horizontal layout may not work on mobile — may need vertical orientation or reduced marker count.

## Proof Strategy

- **Historical accuracy** → retire in S01 by producing a verified content draft with ≥2 sources per hecho event, then integrating all cards with `<cite>` elements. The draft is the intermediate verification artifact; the cards are the proof.
- **Expand/collapse interaction** → retire in S02 by implementing toggle functionality on ≥3 major event cards and verifying it doesn't break reveal animations.
- **Timeline density** → retire in S02 by building the animated timeline and verifying readability at 320px and 1920px+.

## Verification Classes

- Contract verification: DOM queries for card count (`querySelectorAll('#periodo-revolucion [data-certeza]').length >= 15`), certeza distribution, cite elements, image load status, sub-nav link targets
- Integration verification: Reveal system auto-discovers new `.reveal` elements, image fallback handlers auto-discover new `.card-image img` elements, scroll spy continues working with expanded section
- Operational verification: none (static site)
- UAT / human verification: Narrative flow read-through (Alberdi thread coherence, certeza classification consistency), responsive visual check at 320px and 1920px+, timeline animation timing

## Milestone Definition of Done

This milestone is complete only when all are true:

- All 15+ event cards are integrated into `index.html` with correct certeza classification, images, and source citations
- Every factual claim is verified against ≥2 historical sources with provenance documented
- Alberdi is present in ~60% of events as narrative thread without eclipsing other próceres
- Sub-navigation renders and tracks active sub-period on scroll
- Animated timeline for 1800-1860 fires correctly on scroll entry
- Expand/collapse toggles work on major events without breaking reveal animations
- Section renders correctly at 320px (mobile) and 1920px+ (desktop)
- All 10 acceptance criteria from M003-CONTEXT.md are verified against live behavior in browser

## Requirement Coverage

- Covers: R003 (detailed 1800-1860 content with Alberdi), R011 (Alberdi as narrative thread ~60%), R014 (opinión attribution with full provenance)
- Partially covers: R005 (multimedia — images + animated timeline + expand/collapse for this section), R012 (historical verification — for M003 content), R013 (certeza classification — for M003 content)
- Leaves for later: R004 (1860-1900 panoramic, M004), R006 (ambient sounds, M005), R007 (responsive polish, M005)
- Orphan risks: none — all active requirements relevant to this milestone are mapped

## Slices

- [x] **S01: Content research, verification, and HTML integration of 19 event cards with images** `risk:high` `depends:[]`
  > After this: User scrolls through `#periodo-revolucion` and reads 15-19 detailed event cards organized into 4 sub-periods (1800-1820, 1820-1835, 1835-1852, 1852-1860), each with certeza classification, real images, source citations, and Alberdi as connecting thread. All historical facts verified against ≥2 sources.
- [x] **S02: Sub-navigation, animated timeline, expand/collapse interactivity, and responsive verification** `risk:medium` `depends:[S01]`
  > After this: User can click sub-navigation links to jump between sub-periods with scroll tracking, see the 1800-1860 animated timeline fire on scroll, toggle detailed content on major events, and experience the complete section correctly on mobile and desktop. All M003 acceptance criteria verified.

## Boundary Map

### S01 → S02

Produces:
- 15-19 `<article>` cards with `data-certeza` attributes inside `<div class="sub-period">` wrappers with IDs (`rev-1800-1820`, `rev-1820-1835`, `rev-1835-1852`, `rev-1852-1860`)
- Each card follows established template: `card-hecho` (cite footer), `card-opinion` (blockquote + attribution), or `card-rumor` (origin footer)
- `.card-image` wrappers with `<img>` tags for Wikimedia Commons images (auto-discovered by existing `initImageFallbacks`)
- `.reveal .reveal-slide` classes on each card with `--reveal-delay` stagger
- `.alberdi-quote` standalone blockquotes between sub-period card groups
- Sub-period `<h3 class="sub-period__title">` headers within each wrapper
- Verified content draft at `.gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md`

Consumes:
- nothing (first slice)

### S02 (consumes S01)

Consumes:
- Sub-period `<div>` wrappers with IDs for sub-nav link targets
- Card structure for expand/collapse toggle insertion
- Sub-period boundaries for timeline marker positioning
- The complete card set to determine which events get expand/collapse treatment
