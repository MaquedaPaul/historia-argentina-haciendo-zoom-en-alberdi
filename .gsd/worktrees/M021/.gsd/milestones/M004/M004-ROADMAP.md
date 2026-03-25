# M004: Período 1860–1900 (Panorámico)

**Vision:** Complete the third and final historical section with 7 verified event cards covering Argentina's national organization era — foundational presidencies, Guerra del Paraguay, Conquista del Desierto, federalización, immigration/modernization, Crisis del 90, and Alberdi's death/legacy — with Wikimedia Commons photographs, certeza classification, an animated 1860–1900 timeline, and the closure of Alberdi's narrative arc. All content verified against historical sources with full certeza treatment.

## Success Criteria

- 7 event cards visible in `#periodo-nacional` with `data-certeza` attributes and certeza-aware visual treatment
- Each card has a real Wikimedia Commons photograph (this era had photography — no placeholders)
- At least 2 certeza types represented (hecho + opinión minimum; rumor optional)
- Alberdi's narrative arc closes explicitly: return to Argentina (1879), diputado, death (1884), legacy
- All factual claims verified against ≥2 sources with `<cite>` elements
- Opinión cards have `<blockquote>` with full attribution (author, date, source context)
- Animated timeline 1860–1900 fires on scroll with staggered markers
- `events-grid--certeza` class present on the grid container
- Section reads coherently as a 40-year panoramic narrative at desktop (1200px) and mobile (375px)
- `initImageFallbacks` auto-discovers all new card images (0 img-error/img-fallback elements)

## Key Risks / Unknowns

- **Alberdi death date conflict** (June 19 vs July 19, 1884) — Research recommends July 19 with [VERIFICACIÓN PENDIENTE]. Whichever date is used, the card must flag the uncertainty explicitly. This is the most sensitive historical claim in M004.
- **Wikimedia image availability for Crisis 1890** — Revolución del Parque may have fewer photographic options than other events. Portraits of Alem or Juárez Celman are the fallback.
- **Historical accuracy at scale** — 7 events across 40 years with verified dates, names, quotes, and Alberdi narrative connections. The research file has pre-verified most facts; the content draft task confirms and cites them.

## Proof Strategy

- Alberdi death date → retire in S01 by using July 19 with an explicit [VERIFICACIÓN PENDIENTE] nota de certeza, documented in the content draft before any HTML integration
- Image availability → retire in S01 by API-verifying all 7 Wikimedia image URLs before HTML integration
- Historical accuracy → retire in S01 by producing a verified content draft with ≥2 sources per hecho card before touching HTML

## Verification Classes

- Contract verification: DOM queries — `document.querySelectorAll('#periodo-nacional [data-certeza]').length === 7`, `document.querySelectorAll('#periodo-nacional .card-image img').length === 7`, `document.querySelectorAll('#periodo-nacional .img-error, #periodo-nacional .img-fallback').length === 0`
- Integration verification: browser render at 1200px and 375px — cards display correctly, reveal animations fire, images load, timeline animates on scroll
- Operational verification: none (static site)
- UAT / human verification: narrative flow reads coherently as panoramic overview; Alberdi closure feels like a natural ending to his arc; certeza badges are visually distinct

## Milestone Definition of Done

This milestone is complete only when all are true:

- All 7 event cards integrated in `#periodo-nacional` with certeza classification, Wikimedia images, and source citations
- `events-grid--certeza` class applied to the grid container
- Animated timeline 1860–1900 renders and fires on scroll via the reveal system
- Alberdi's narrative arc explicitly closes (return 1879, diputado, death 1884, legacy statement)
- Every factual claim verified against ≥2 sources; opinión cards have full blockquote attribution
- All 10 success criteria re-checked via DOM queries and visual inspection at 1200px and 375px
- No new JS runtime errors; existing scroll spy, sub-nav, and reveal systems unaffected
- R004, R012, R013 requirements satisfied by the integrated content

## Requirement Coverage

- Covers: R004 (sección 1860–1900 panorámica), R012 (verificación histórica M004), R013 (sistema de certeza M004)
- Partially covers: R005 (multimedia — images + timeline animation; no video unless embeddable source found), R007 (responsive verified at 375px–1200px; full 320px–1920px+ in M005)
- Leaves for later: R001 (final full-page validation in M005), R006 (sonidos ambientales — M005), R007 (full responsive sweep — M005)
- Orphan risks: none — all Active requirements relevant to M004 are mapped

## Slices

- [x] **S01: Contenido verificado + imágenes + integración HTML** `risk:high` `depends:[]`
  > After this: 7 event cards with Wikimedia photos, certeza badges, source citations, and Alberdi narrative closure are visible in `#periodo-nacional` — replacing the 3 placeholder stubs
- [x] **S02: Timeline animada 1860–1900 + verificación final** `risk:low` `depends:[S01]`
  > After this: animated timeline with 7 markers fires on scroll; all 10 success criteria verified PASS at desktop and mobile; milestone complete

## Boundary Map

### S01 → S02

Produces:
- 7 `<article>` cards with `data-certeza`, `.card-image img`, and source `<cite>` elements inside `#periodo-nacional .events-grid--certeza`
- `.period-body` structure stable — S02 inserts the timeline element before or after the events grid
- `S01-CONTENT-DRAFT.md` with verified event data, certeza classifications, and Wikimedia URLs

Consumes:
- nothing (first slice)

### S02

Produces:
- `.nacional-timeline` element with 7 markers, CSS keyframes, and `prefers-reduced-motion` support
- Final verification results confirming all 10 success criteria PASS

Consumes:
- S01's stable `#periodo-nacional` HTML structure (cards, grid, period-body)
- Existing `.colonial-timeline` / `.revolucion-timeline` CSS patterns as template
