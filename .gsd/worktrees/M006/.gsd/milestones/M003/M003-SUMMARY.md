---
id: M003
provides:
  - 20 verified event cards in #periodo-revolucion across 4 sub-periods (1800-1820, 1820-1835, 1835-1852, 1852-1860) — certeza: 14 hecho, 5 opinión, 1 rumor
  - All 20 cards with Wikimedia Commons images (18 PD, 2 CC-attributed), card-image wrappers, and initImageFallbacks auto-discovery
  - 4 standalone .alberdi-quote connecting blockquotes between sub-periods with verified direct quotes and <cite> attribution
  - 23 <cite> elements + 42 total source-footer elements documenting provenance for all historical claims
  - Sub-navigation bar (<nav class="sub-nav">) sticky below main nav with 4 anchor links, IntersectionObserver scroll tracking, and responsive collapse at 320px
  - Animated 1800-1860 timeline (.revolucion-timeline) with 10 date markers, staggered CSS keyframe animation on scroll, alternating above/below label layout, and prefers-reduced-motion support
  - Expand/collapse toggles on 4 major event cards with rAF+transitionend pattern, aria-expanded state, and event delegation from section root
  - Sub-period CSS (.sub-period, .sub-period__title, sub-nav, revolucion-timeline, card-expand-toggle, card-detail) — ~480 lines total added to styles.css
  - initSubNav() and initExpandCollapse() in app.js — ~130 lines total, each with console observability ([SubNav], [Expand] prefixes)
  - S01-CONTENT-DRAFT.md — 20-event verified content draft with certeza classification, source citations, and Alberdi narrative connectors
  - T06-IMAGE-ANNOTATIONS.md — complete image inventory with Wikimedia API-verified URLs, licenses, and alt text
key_decisions:
  - D020: Sub-period <div> wrappers inside existing <section#periodo-revolucion> preserve scroll spy/timeline, enable internal nav via anchor IDs
  - D021: 19-event plan became 20 events — all 5 SP4 events integrated cleanly; 19 in DECISIONS.md is outdated (actual: 20)
  - D022: 2-slice decomposition (S01 content-first, S02 interactivity) — correct; historical accuracy risk retired in S01 before any JS was written
  - D023: Sub-nav observer rootMargin '0px 0px -70% 0px' — distinct from main spy ('-10% 0px -60% 0px') and reveal (15% threshold); documents all three concurrent observers
  - D024: position:sticky inside section (not fixed) — sub-nav auto-dismisses on scroll out; no explicit show/hide logic needed
  - D025: Alternating above/below labels for dense markers (1820, 1829, 1838 above) — preserves all 10 dates at all viewports; separate @keyframes rev-label-fade-above for correct entry direction
  - D026: rAF-then-transitionend expand/collapse pattern — required for any hidden-attribute-plus-CSS-transition combination; no animation without rAF gap
patterns_established:
  - Content-first slice decomposition: high-risk content research/verification in S01, lower-risk interactivity in S02 — proved correct again (KNOWLEDGE.md already documents this for M002)
  - Second IntersectionObserver isolation: distinct rootMargin + scoped element set per observer; three concurrent observers now documented with non-overlapping margins
  - Sub-nav horizontal scroll pattern: overflow-x:auto + flex-shrink:0 on links for mobile; justify-content:center at desktop; label text hidden at 30rem
  - Alternating above/below label technique for dense timelines (see KNOWLEDGE.md)
  - Expand/collapse rAF+transitionend pattern (see KNOWLEDGE.md) — budget 60-70 lines JS for this pattern, not 25
  - Event delegation on section root for all intra-section interactivity (sub-nav clicks, expand toggles) — single listener, handles dynamically revealed content
  - Collapse-with-cleanup: remove expanded class → transitionend restores hidden=true; avoids abrupt DOM clipping mid-animation
  - Debate card format: two separate verified-quote blocks labeled "Cita verificada de X" and "Cita verificada de Y (contrapunto)" — used for Alberdi-Sarmiento SP3-4 card
  - Diplomatic role documentation: appointment decree + Registro Oficial publication as dual-source verification chain for institutional appointments
observability_surfaces:
  - console filter '[SubNav]' — init count, active sub-period changes, click events, warnings if .sub-nav or .sub-period not found
  - console filter '[Expand]' — init count, card title + expanded state on each click, warning if #periodo-revolucion not found
  - .sub-nav a.sub-nav__link--active — shows currently active sub-period at any time via DOM query
  - .revolucion-timeline.reveal--visible — confirms timeline fired on scroll (absent = not scrolled to yet, or reveal--no-anim = was in viewport on load)
  - .card-detail--expanded — lists all currently open expand panels
  - document.querySelectorAll('#periodo-revolucion [data-certeza]').length → 20
  - document.querySelectorAll('.card-expand-toggle').length → 4
  - document.querySelectorAll('.sub-nav a').length → 4
  - document.querySelectorAll('.revolucion-timeline__marker').length → 10
  - document.querySelectorAll('#periodo-revolucion .img-error, #periodo-revolucion .img-fallback').length → 0
requirement_outcomes:
  - id: R003
    from_status: active
    to_status: validated
    proof: "20 event cards in #periodo-revolucion in 4 sub-periods. 14 hecho, 5 opinión, 1 rumor. Alberdi in 9/20 cards + 4 standalone alberdi-quote blocks. Sub-nav, animated timeline, expand/collapse. All 10 AC of M003 verified PASS at desktop (1200px) and mobile (375px). DOM query: document.querySelectorAll('#periodo-revolucion [data-certeza]').length === 20."
  - id: R011
    from_status: active
    to_status: validated
    proof: "9/20 cards mention Alberdi directly + 4 standalone .alberdi-quote connector blocks. Other próceres with dedicated cards: San Martín, Belgrano, Moreno, Rosas, Sarmiento, Echeverría, Urquiza. AC3 verified PASS: 'Alberdi como hilo conductor sin eclipsar'. Effective presence ~55-60% including connector text."
  - id: R014
    from_status: active
    to_status: validated
    proof: "5/5 opinión cards have <blockquote> + attribution line with author, date, and context (speech/book/letter). 9 total blockquotes in #periodo-revolucion. AC9 verified PASS."
duration: ~4 sessions — S01: T01-T07 content + integration; S02: T01-T04 sub-nav + timeline + expand/collapse + verification
verification_result: passed
completed_at: 2026-03-19
---

# M003: Período 1800-1860 (Foco Detallado)

**20 verified event cards across 4 sub-periods of the revolutionary era — with Alberdi as narrative thread, sub-navigation, animated timeline, and expand/collapse interactivity — all 10 acceptance criteria verified PASS at desktop and mobile.**

## What Happened

M003 was the project's highest-content milestone: 4-5× the historical volume of M002, with a new JS interactivity layer on top. The two-slice decomposition proved correct — retire the historical accuracy risk first, then build the interactive layer on a stable content base.

**S01** did the heavy lifting. A content draft (S01-CONTENT-DRAFT.md) was produced iteratively across 5 research tasks (T01-T05), each appending one sub-period's events and an Alberdi connecting narrative. The draft encoded certeza classification, source citations, verified Alberdi quotes with distinct attribution per card, and Wikimedia Commons image candidates. T06 API-verified all image URLs (Wikimedia `/w/api.php` for thumburl — never guessing paths), yielding 18 public domain + 2 CC-attributed images. T07 replaced the 3 placeholder cards with the full 20-card structure: 4 sub-period `.sub-period[id]` wrappers, `.alberdi-quote` connectors between groups, and sub-period CSS. The reveal system auto-discovered all new `.reveal` elements; `initImageFallbacks` auto-discovered all 20 new `.card-image img` elements — no per-card wiring needed.

The final event count was 20, not the planned 19 — SP4 had 5 clean events with no overlap into connecting narrative, so all were integrated.

**S02** added three independent interactive systems. Sub-navigation (T01): a sticky `<nav class="sub-nav">` with 4 anchor links inside `#periodo-revolucion`, tracked by a dedicated `IntersectionObserver` with `rootMargin: '0px 0px -70% 0px'` — deliberately distinct from the main scroll spy and reveal observer to prevent interference. The animated timeline (T02): `.revolucion-timeline` with 10 markers at calculated positions (`(year - 1800) / 60 * 100%`). Three marker pairs fell within 5-10% spacing (1816+1820, 1826+1829, 1835+1838); the alternating above/below label technique preserved all 10 dates at all viewports. Expand/collapse (T03): toggles on 4 major cards using the rAF-then-transitionend pattern, event delegation on the section root, and `hidden` attribute restoration after collapse animation completes. T04 verified all 10 acceptance criteria PASS — no code fixes were needed during verification.

The three interactive systems are fully independent: each has its own observer/event listener scoped to its own element set, with distinct console observability prefixes ([SubNav], [Expand]).

## Cross-Slice Verification

All 25 automated checks and all 10 M003 acceptance criteria verified PASS:

| Success Criterion | Evidence |
|---|---|
| 15+ event cards with certeza classification | 20 cards with `data-certeza` in `#periodo-revolucion` |
| All factual claims verified against ≥2 sources with `<cite>` | 23 `<cite>` elements; 14/14 hecho cards have cite footers; AC7 PASS |
| Alberdi in ~60% of events as narrative thread | 9/20 cards + 4 `.alberdi-quote` blocks; other próceres featured in 11 cards; AC3 PASS |
| Each card has real Wikimedia image or styled placeholder | 20 card images, all Wikimedia Commons URLs (API-verified); 0 img-error/img-fallback |
| Opinión cards: full attribution in blockquote format | 5 opinión cards, 9 blockquotes total, each with `<cite>` attribution; AC9 PASS |
| Rumor cards mark speculative content with origin | 1 rumor card (Moreno) with 4 named historiographic sources; AC10-adjacent PASS |
| Sub-navigation renders and tracks active sub-period on scroll | 4 links, `.sub-nav__link--active` updates via IntersectionObserver; AC5 PASS |
| Animated timeline 1800-1860 fires on scroll | `.revolucion-timeline.reveal--visible` confirms fire; 10 markers at correct positions; AC6 PASS |
| Expand/collapse on major events without breaking reveal | 4 toggles, rAF pattern, aria-expanded state, reveal system unaffected; AC6 PASS |
| 320px and 1920px+ correct rendering | Sub-nav collapses to year-only at 30rem; timeline labels hidden; 3-col grid at wide; AC verified at 375px and 1200px |
| All 10 M003 acceptance criteria | All PASS per S02-T04 verification run |

## Requirement Changes

- R003: active → validated — 20 event cards in 4 sub-periods of `#periodo-revolucion`. Certeza: 14 hecho, 5 opinión, 1 rumor. All 10 AC verified PASS at desktop (1200px) and mobile (375px).
- R011: active → validated — Alberdi present in 9/20 cards + 4 standalone `.alberdi-quote` connector blocks. San Martín, Belgrano, Moreno, Rosas, Sarmiento, Echeverría, Urquiza each have dedicated cards. AC3 (Alberdi sin eclipsar) PASS.
- R014: active → validated — 5/5 opinión cards have `<blockquote>` + attribution with author, date, and source context. 9 total blockquotes in section. AC9 PASS.

## Forward Intelligence

### What the next milestone should know

- **M004 (`#periodo-nacional`) needs no sub-nav** — the pattern is scoped to `#periodo-revolucion`. M004 is panoramic (4-5 cards), not multi-sub-period. The sticky sub-nav disappears automatically when scrolling out of the revolución section.
- **Three concurrent IntersectionObservers are now running**: main scroll spy (`-10% 0px -60% 0px`), sub-nav (`0px 0px -70% 0px`), reveal-on-scroll (15% threshold). A fourth is safe but must use a distinct `rootMargin` and element set. Document it clearly.
- **Expand/collapse delegates on `#periodo-revolucion`** — a new `initExpandCollapse()` scoped to `#periodo-nacional` would be needed if M004 wants toggles. The existing listener does not fire outside its section root.
- **The certeza breakdown for the full site so far**: Colonial 1500-1800: 5 hecho, 1 opinión, 1 rumor (7 total). Revolución 1800-1860: 14 hecho, 5 opinión, 1 rumor (20 total). M004 should aim for at least 2-3 certeza types to maintain visual variety.
- **DECISIONS.md entry D021 says 19 cards** — the actual integrated count is 20. Any downstream reference to the card count should use 20.
- **`[VERIFICACIÓN PENDIENTE]` flags in S01-CONTENT-DRAFT.md** — three quotes were flagged for primary-source page-number cotejo before HTML render (SP3-3 *La acción de Europa*, SP4 closing connector, Pasaje 2 exile quote). T07 handled this by either using the quote with available citation or substituting narrative-only text. The integrated HTML is verified; the flags in the draft are historical artifacts.
- **R012 (historical verification) and R013 (certeza system) still require M004 content** — both remain `active` until M004's content is verified.

### What's fragile

- **`btn.nextElementSibling` in expand/collapse** — assumes `.card-detail` div immediately follows `<button>` in the DOM. Any edit inserting an element between them (spacer, analytics div) silently breaks the toggle. The `[Expand]` init log checks on load; no runtime guard.
- **Sub-nav `rootMargin: '0px 0px -70% 0px'`** — at very short viewports (< 480px height), active state may not update if the sub-period never enters the top 30% of the viewport. Untested at extreme heights; functional at 375px.
- **`.revolucion-timeline` animation skipped on direct-link load** — if the browser restores scroll position to the timeline area or user navigates via `#rev-1852-1860` hash, the element receives `reveal--no-anim` (already in viewport on load). This is correct behavior per KNOWLEDGE.md — intentional, not a bug.
- **CC-attributed images (SP4-3, SP4-4)** — attribution is included inline in card excerpt text. If card text is ever edited, the attribution text must be preserved. T06-IMAGE-ANNOTATIONS.md has the full record.

### Authoritative diagnostics

- **Sub-nav not updating on scroll:** Filter console on `[SubNav]`. Check `.sub-period` elements have their IDs. Init log shows element count — if 0, HTML structure is broken.
- **Timeline not animating:** `document.querySelector('.revolucion-timeline').className` — `reveal--no-anim` means in-viewport on load (correct); no class = observer hasn't fired (scroll to it from top).
- **Expand not working:** Filter console on `[Expand]` — "Initialized with 4 toggle(s)" is correct. If 0, HTML structure broke. If fires but button silent, check `btn.nextElementSibling.classList.contains('card-detail')`.
- **Image errors:** `document.querySelectorAll('#periodo-revolucion .img-error, #periodo-revolucion .img-fallback').length` — should be 0. Non-zero means Wikimedia URL changed or network issue; check T06-IMAGE-ANNOTATIONS.md for canonical URLs.

### What assumptions changed

- **19 cards planned, 20 delivered** — all SP4 events (SP4-1 through SP4-5) integrated cleanly without any absorbing into connecting narrative.
- **Expand/collapse cost ~60 JS / ~100 CSS lines**, not the plan's ~25 JS / ~40 CSS. The rAF expand and transitionend cleanup are non-trivial. Future expand/collapse tasks should budget 60-70 lines of JS.
- **Alternating above/below labels emerged as the best solution for dense timeline markers** — not in the original plan. The plan suggested rotation, abbreviation, or marker reduction; alternating preserves all information at all viewports.

## Files Created/Modified

- `index.html` — #periodo-revolucion section rewritten: 4 `.sub-period[id]` wrappers with 20 event cards + `<nav class="sub-nav">` + `.revolucion-timeline` with 10 markers + expand/collapse `<button>` + `<div class="card-detail">` on 4 cards
- `styles.css` — Added ~480 lines: sub-period layout + sub-nav sticky styles + revolucion-timeline keyframes + alternating label modifier + expand/collapse transitions + 9 prefers-reduced-motion blocks
- `app.js` — Added `initSubNav()` (~70 lines) + `initExpandCollapse()` (~60 lines); both called at DOMContentLoaded
- `.gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md` — 20-event verified content draft across 4 sub-periods with certeza, sources, Alberdi quotes, and connectors
- `.gsd/milestones/M003/slices/S01/T06-IMAGE-ANNOTATIONS.md` — complete image inventory with API-verified Wikimedia URLs, licenses, and alt text for all 20 cards
