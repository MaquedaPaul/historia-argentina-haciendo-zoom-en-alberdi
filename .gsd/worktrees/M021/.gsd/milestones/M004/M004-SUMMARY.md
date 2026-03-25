---
id: M004
provides:
  - "#periodo-nacional section with 7 fully-verified event cards (6 hecho + 1 opinión) covering Argentina's 1860–1900 national organization era"
  - Wikimedia Commons photographs for all 7 cards (6 PD + 1 CC BY-SA 2.0 with attribution block)
  - Certeza system applied: data-certeza attributes, certeza indicators, card-hecho/card-opinion classes
  - events-grid--certeza container class on the nacional events grid
  - Staggered reveal-slide animations (0ms–480ms, 80ms increments) on all 7 cards
  - Animated .nacional-timeline with 7 date markers, scoped keyframes, prefers-reduced-motion support, reveal system integration
  - Alberdi narrative arc closed: return 1879, diputado Tucumán, vicepresidente Cámara, death July 19 1884 (with VERIFICACIÓN PENDIENTE flag), legacy blockquote
  - .alberdi-quote closing connector paragraph after the events grid
  - card-nota-historiografica pattern for the Conquista del Desierto contested-history card
  - card-nota-certeza span for the Alberdi death date inline epistemic flag
  - CC BY-SA 2.0 img-attribution block inside .card-image for the Alberdi portrait
  - 23 source citations across 7 events; 8 <cite> elements in the section
key_decisions:
  - Evento 7 classified as opinión — biographical facts (return, election, death) are hecho, but "legacy as intellectual father" is historiographic interpretation; opinión is more epistemically honest
  - Alberdi death date: July 19 1884 adopted with [VERIFICACIÓN PENDIENTE] flag — sources diverge between June 19 and July 19; flagged inline with card-nota-certeza span
  - data-certeza="opinion" (no accent) used on Alberdi card — consistent with prior-period normalization in codebase; both variants are valid
  - Chose Campaña_del_Desierto_1879.JPG (Pozzo field photograph) over the Blanes heroic painting — primary-source documentary photograph preferred over interpretive art
  - Antoni Pozzo visual thread: same photographer links Eventos 3 (Conquista del Desierto) and 4 (Roca portrait), reinforcing narrative continuity
  - Gigantografía_Inmigrantes_esperan_su_turno.jpg used for Evento 5 — photo of historical photograph at MUNTREF; best available PD image of Hotel de Inmigrantes interior with actual immigrants
  - CC BY-SA 2.0 attribution placed inside .card-image immediately after <img> — co-locates license with image as required by CC conventions
  - Nota historiográfica for Conquista del Desierto rendered as visible <p class="card-nota-historiografica"> — not collapsible, because meta-epistemic notices must be visible
  - 1880 marker placed --above on nacional-timeline to prevent overlap with 1878 (45%/50% cluster)
patterns_established:
  - card-nota-historiografica paragraph pattern: inline bold label + note documenting live historiographic debate within a hecho card, without editorializing
  - card-nota-certeza span pattern: inline epistemic flag visible in rendered HTML for unresolved verification issues within specific facts
  - img-attribution inside .card-image: CC license attribution co-located with image (separate from card-source <cite> footer)
  - data-certeza accent normalization: "opinion" (no accent) and "opinión" (with accent) both in use; verification selectors must query both variants
  - Third timeline variant: nacional-timeline follows colonial/revolucion structural pattern; nth-child stagger offset starts at child(2) because __progress is first child of __track
observability_surfaces:
  - document.querySelectorAll('#periodo-nacional [data-certeza]').length → 7
  - document.querySelectorAll('#periodo-nacional .card-image img').length → 7
  - document.querySelector('#periodo-nacional .events-grid--certeza') !== null → true
  - document.querySelectorAll('#periodo-nacional .img-error, #periodo-nacional .img-fallback').length → 0
  - document.querySelectorAll('.nacional-timeline__marker').length → 7
  - document.querySelectorAll('.reveal').length → 52 (was 51 before M004/S02)
  - document.querySelectorAll('.card-nota-certeza') → shows all inline epistemic flags in rendered HTML
  - grep -n "VERIFICACIÓN PENDIENTE" index.html → shows unresolved flags still requiring primary-source confirmation
requirement_outcomes:
  - id: R004
    from_status: active
    to_status: validated
    proof: "7 event cards visible in #periodo-nacional with Wikimedia photographs, source citations, and certeza classification — covering presidencias fundacionales, Guerra Triple Alianza, Conquista del Desierto, federalización, Generación del 80, Crisis del 90, and Alberdi legacy. Verified via DOM: data-certeza count=7, card-image img count=7, events-grid--certeza present."
  - id: R005
    from_status: active
    to_status: active
    proof: "Animated .nacional-timeline with 7 markers fires on scroll; 7 Wikimedia photographs; no embeddable video found for this era. Partial coverage: images + timeline animation delivered. Full multimedia sweep (video, audio, data animations) deferred to M005."
  - id: R012
    from_status: active
    to_status: validated
    proof: "23 source citations across 7 events (avg >3 per event); all 6 hecho cards have ≥2 independent sources; Alberdi death date uncertainty flagged with card-nota-certeza; Roca quote deferred due to unconfirmed primary-source attribution; S01-CONTENT-DRAFT.md documents verification protocol. M002 and M003 previously validated."
  - id: R013
    from_status: active
    to_status: validated
    proof: "All 7 cards have data-certeza attributes (6 hecho + 1 opinión), certeza indicator badges, and card-hecho/card-opinion CSS classes. events-grid--certeza class applied. Visual treatment consistent with M002/M003 patterns. Verified via DOM: certeza types = ['hecho','opinion'], all 7 cards classified."
duration: S01 (~3h) + S02 (~45m) = ~3h45m
verification_result: passed
completed_at: 2026-03-19T21:37:00.000Z
---

# M004: Período 1860–1900 (Panorámico)

**Completed the third historical section with 7 verified event cards covering Argentina's national organization era — replacing 3 placeholder stubs with fully-sourced content, Wikimedia photographs, certeza classification, animated timeline, and Alberdi's narrative closure.**

## What Happened

M004 delivered in two slices following the proven content-first pattern from M002/M003.

**S01** did the heavy lifting across three tasks. T01 produced `S01-CONTENT-DRAFT.md` — a 7-event verified content draft with certeza classification (6 hecho + 1 opinión), source citations (23 total), Alberdi narrative angles for each event, and image candidates. The most sensitive claim — Alberdi's death date — was flagged as `[VERIFICACIÓN PENDIENTE]` after sources diverged between June 19 and July 19, 1884; July 19 was adopted with a visible inline flag. T02 API-verified all 7 Wikimedia Commons images, yielding 6 PD images and 1 CC BY-SA 2.0 (the Alberdi portrait from the bastique/Flickr/Museo Histórico Nacional collection, same source family as M003). A noteworthy curatorial decision: the Antonio Pozzo 1879 field photograph of the army at Río Negro was chosen over the Juan Manuel Blanes heroic painting for Evento 3 — a primary-source documentary photograph was judged more appropriate than interpretive art for a contested-history card. The same photographer links Eventos 3 and 4 (Pozzo also photographed Roca as Minister of War), creating an unplanned visual thread across those two adjacent cards. T03 replaced the 3 placeholder stubs in `#periodo-nacional` with all 7 cards, and introduced two new inline annotation patterns: `card-nota-historiografica` for the Conquista del Desierto contested-history notice, and `card-nota-certeza` for the Alberdi death date epistemic flag. A closing `.alberdi-quote` blockquote was added after the events grid, completing the three-period narrative arc for Alberdi.

**S02** added the `.nacional-timeline` and ran final verification. T01 followed the established colonial/revolucion timeline pattern exactly — outer container with reveal classes, inner track with progress bar + 7 dated markers, scoped CSS keyframes with `nac-` prefix, staggered dot animations via `nth-child(2)–(8)` selectors (offset by 1 because the `__progress` div is first child), and `prefers-reduced-motion` final-state block. The 1880 marker received the `--above` modifier to prevent overlap with the 1878 marker at the 45%/50% cluster. The reveal system auto-discovered the new element as its 52nd target with no JS changes. T02 ran the final verification pass and confirmed all 10 success criteria PASS at both 1280px desktop and 375px mobile. One finding during verification: the Alberdi opinión card uses `data-certeza="opinion"` (no accent), consistent with prior-period normalization across the codebase — this is now documented as a cross-period pattern that all future verification queries must account for.

## Cross-Slice Verification

All 10 success criteria from the roadmap were verified in S02/T02 via live DOM queries and visual inspection:

| # | Criterion | Evidence | Status |
|---|-----------|----------|--------|
| 1 | 7 cards with `data-certeza` | `querySelectorAll('#periodo-nacional [data-certeza]').length === 7` | ✅ PASS |
| 2 | 7 `.card-image img` elements | `querySelectorAll('#periodo-nacional .card-image img').length === 7` | ✅ PASS |
| 3 | ≥2 certeza types | `['hecho','opinion']` — 6 hecho + 1 opinión | ✅ PASS |
| 4 | Alberdi arc closes explicitly | DOM text contains `1884`, `diputado`, `legado`, `alberdi-quote` | ✅ PASS |
| 5 | All hecho cards ≥2 sources + `<cite>` | 8 `<cite>` elements; all 6 hecho cards cite ≥2 independent sources | ✅ PASS |
| 6 | Opinión card has `<blockquote>` + attribution | Alberdi card: blockquote with `card-opinion__author` + `card-opinion__context` | ✅ PASS |
| 7 | Animated timeline fires on scroll | `.nacional-timeline.reveal--visible` confirmed after scroll; 7 markers | ✅ PASS |
| 8 | `events-grid--certeza` class present | `querySelector('#periodo-nacional .events-grid--certeza') !== null` | ✅ PASS |
| 9 | Staggered reveal on cards | `--reveal-delay` values: 0ms, 80ms, 160ms, 240ms, 320ms, 400ms, 480ms | ✅ PASS |
| 10 | 0 `.img-error` / `.img-fallback` | `querySelectorAll('#periodo-nacional .img-error, .img-fallback').length === 0` | ✅ PASS |

**Responsive verification:** Desktop 1280px — all 7 cards render, timeline with above/below labels correct, no overflow. Mobile 375px — `scrollWidth === clientWidth (360px)`, timeline condensed, sublabels hidden, no horizontal overflow.

**Regression:** Colonial timeline, revolución sub-nav, 4 expand/collapse toggles, main scroll spy, and IntersectionObserver reveal system all confirmed functional. Total reveal elements: 52 (was 51).

## Requirement Changes

- **R004**: active → validated — 7 event cards in `#periodo-nacional` with verified content, Wikimedia photographs, certeza classification, and source citations confirmed via DOM queries and visual inspection at desktop and mobile.
- **R005**: active → active — Animated timeline and 7 photographs delivered; no embeddable video found for the 1860–1900 era. Full multimedia treatment (video, audio, data animations) deferred to M005.
- **R012**: active → validated — Historical accuracy verification protocol completed for M004: 23 source citations, all 6 hecho cards have ≥2 independent sources, Alberdi death date uncertainty explicitly flagged, S01-CONTENT-DRAFT.md documents full verification trail. M002 and M003 previously validated.
- **R013**: active → validated — Certeza system fully applied in M004: `data-certeza` on all 7 cards, certeza indicator badges, card-hecho/card-opinion classes, events-grid--certeza container. Completes certeza coverage across all three content milestones (M002, M003, M004).

## Forward Intelligence

### What the next milestone should know

- **Three full content periods are now complete.** The site covers 1500–1900 with 34 event cards (7 colonial + 20 revolución + 7 nacional), three animated timelines, certeza classification throughout, and Alberdi's narrative arc closed. M005 is the final polish milestone.
- **The `data-certeza` accent normalization is a known cross-period inconsistency.** Some periods use `"opinión"` (with accent), others use `"opinion"` (without accent). Any M005 verification, search, or JS code that reads certeza values must query BOTH variants: `[data-certeza="opinion"], [data-certeza="opinión"]`.
- **Alberdi death date remains unresolved.** The `card-nota-certeza` span in the Alberdi card flags July 19, 1884 as pending primary-source verification. If M005 includes a final historical review pass, this is the one open epistemic item in M004.
- **The Roca quote** ("Gobernar es poblar" variant attributed to Roca) was flagged as unconfirmed against a primary source. The card uses Alberdi's quote instead; no Roca blockquote was included. No action needed unless a primary source is found.
- **CSS keyframe namespace:** colonial = `col-`, revolucion = no prefix (legacy), nacional = `nac-`. If M005 adds any new animated section, use a distinct prefix to avoid collisions.
- **52 reveal elements** as of M004 completion. If M005 adds new reveal elements, the initialization log will show the new count; any drop below 52 indicates a regression.

### What's fragile

- **Alberdi portrait CC BY-SA 2.0 attribution** — the `img-attribution` block inside `.card-image` is the only license-required attribution in the section. If the image is ever replaced or the card is restructured, the attribution must travel with the image.
- **The antonio Pozzo visual thread (Eventos 3–4)** is documented in captions and the S01 summary but not surfaced in visible UI. If a future editor changes either image, the thematic connection breaks silently.
- **The `nacional-timeline__progress` div is the first child** of `.nacional-timeline__track`, which is why stagger selectors start at `nth-child(2)`. This is a structural quirk not shared by the colonial timeline (where the progress bar is a `::before` pseudo-element). Future edits to the track HTML must preserve this structure or update the nth-child selectors accordingly.

### Authoritative diagnostics

- `document.querySelectorAll('#periodo-nacional [data-certeza]').length` → should be 7; if 0, the section or attributes were removed.
- `document.querySelectorAll('.reveal').length` → should be ≥52; if lower, a reveal element was removed or mis-classed.
- `grep -n "VERIFICACIÓN PENDIENTE" index.html` → shows all unresolved epistemic flags in the live HTML.
- `document.querySelectorAll('.card-nota-certeza')` → returns all inline epistemic notices; currently 1 (Alberdi death date).
- `document.querySelectorAll('.img-error, .img-fallback').length` → should be 0; any non-zero value means `initImageFallbacks` fired on a broken image.

### What assumptions changed

- **"7 event cards is the same as the colonial period"** — true for count, but M004 cards are denser. Each covers multi-year events vs. the colonial single-event cards. The panoramic scope (D003) was well-calibrated.
- **"The opinión card would be the Alberdi El crimen de la guerra quote"** — the final design used the legacy/legacy-as-architect assessment as the opinión card instead, with the "El crimen de la guerra" reference folded into the Guerra Triple Alianza hecho card. This is more epistemically correct: the legacy claim is genuinely interpretive; the war and the book's existence are hecho.
- **"Video embeds would be available"** — no suitable embeddable video was found for the 1860–1900 era. The animated timeline serves as the animation/multimedia element instead. The `responsive-video` CSS wrapper built in M002 remains available for future addition.

## Files Created/Modified

- `index.html` — Replaced 3 placeholder stubs in `#periodo-nacional` with 7 fully-verified event cards + closing alberdi-quote + nacional-timeline; section now lines 965–1224
- `styles.css` — Appended `.nacional-timeline` scoped CSS block (~230 lines) with keyframes, stagger delays, responsive breakpoints, and prefers-reduced-motion
- `.gsd/milestones/M004/slices/S01/S01-CONTENT-DRAFT.md` — 7-event verified content draft with certeza classification, 23 source citations, and Alberdi angles
- `.gsd/milestones/M004/slices/S01/T02-IMAGE-ANNOTATIONS.md` — 7 API-verified Wikimedia Commons image records with URLs, licenses, alt text, and T03 integration notes
- `.gsd/milestones/M004/slices/S02/S02-SUMMARY.md` — Slice summary for S02
- `.gsd/milestones/M004/M004-SUMMARY.md` — This file
