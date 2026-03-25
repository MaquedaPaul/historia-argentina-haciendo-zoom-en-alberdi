# S02: Timeline animada 1860–1900 + verificación final

**Goal:** Add an animated 1860–1900 timeline with 7 date markers following the established colonial/revolucion timeline CSS pattern, and run the final verification pass confirming all 10 M004 success criteria PASS at desktop and mobile.

**Demo:** Open `index.html`, scroll to the `#periodo-nacional` section from above. The timeline element (placed between period-intro and events-grid) animates on scroll — a progress bar fills left-to-right and 7 date markers pop in sequence with staggered delays. At 375px mobile, labels condense. All 10 M004 success criteria verified via DOM queries and visual inspection.

## Must-Haves

- `.nacional-timeline` element with 7 markers at calculated positions across a 40-year span (1862–1900)
- CSS keyframes scoped to `.nacional-timeline` — progress bar fill + dot + label fade animations
- `prefers-reduced-motion` media query sets final state with no animation
- Fires via existing reveal system (`.reveal .reveal-fade` classes → `.reveal--visible` trigger)
- All 10 M004 success criteria verified PASS at 1200px desktop and 375px mobile

## Verification

- `document.querySelector('.nacional-timeline') !== null`
- `document.querySelectorAll('.nacional-timeline__marker').length === 7`
- `document.querySelector('.nacional-timeline').classList.contains('reveal')` — confirms reveal system integration
- All 10 M004 success criteria from M004-ROADMAP.md verified PASS
- No new console errors after page load
- Existing scroll spy, sub-nav, and reveal systems unaffected (test by scrolling through all 3 periods)

## Observability / Diagnostics

- Runtime signals: `.nacional-timeline.reveal--visible` confirms animation fired on scroll; `.nacional-timeline.reveal--no-anim` means in-viewport on load (correct behavior per KNOWLEDGE.md)
- Inspection surfaces: `document.querySelectorAll('.nacional-timeline__marker').length` — should be 7; marker positions at `--marker-pos` CSS custom property
- Failure visibility: no animation = check if reveal class was applied; `reveal--no-anim` = scroll to it from top of page

## Integration Closure

- Upstream surfaces consumed: S01's `#periodo-nacional .period-body` structure (stable), existing `.colonial-timeline` / `.revolucion-timeline` CSS patterns as template
- New wiring introduced in this slice: ~80-100 lines of CSS for `.nacional-timeline` keyframes; no new JS (reveal system auto-discovers the element)
- What remains before the milestone is truly usable end-to-end: nothing — this is the final slice

## Tasks

- [x] **T01: Nacional timeline HTML + CSS** `est:1h`
  - Why: The timeline is the primary multimedia element for the panoramic period (S03 in M004-CONTEXT). It follows the proven colonial/revolucion pattern — no new JS, just HTML + CSS + reveal integration.
  - Files: `index.html`, `styles.css`
  - Do: Add a `.nacional-timeline` div inside `#periodo-nacional .period-body`, positioned between `.period-intro` and `.events-grid--certeza`. Include title ("Cuatro décadas de transformación"), subtitle, track with progress bar, and 7 markers at calculated positions: `(year - 1860) / 40 * 100%` for years 1862, 1865, 1878, 1880, 1884, 1890, 1900 (approximate — from the 7 event dates). Each marker has a `.nacional-timeline__dot` and `.nacional-timeline__label` with year and short sublabel. Add `.reveal .reveal-fade` classes. In `styles.css`, add scoped `.nacional-timeline` styles following the `.colonial-timeline` pattern: track layout, progress bar `@keyframes`, dot animation with nth-child stagger delays, label fade. Add `@media (prefers-reduced-motion: reduce)` block. Markers are spaced more evenly than M003's revolucion-timeline (events are 2-10 years apart vs. M003's 2-3 years), so alternating above/below labels (D025) are likely NOT needed — confirm visually and add only if overlap occurs. No JS changes — the reveal system auto-discovers `.reveal` elements.
  - Verify: `document.querySelector('.nacional-timeline') !== null`. `document.querySelectorAll('.nacional-timeline__marker').length === 7`. Scroll to section from top — progress bar fills and dots pop sequentially. At 375px: labels readable, no horizontal overflow.
  - Done when: Timeline renders, animates on scroll, and respects prefers-reduced-motion

- [x] **T02: Final verification — all 10 success criteria** `est:30m`
  - Why: The milestone is only complete when all success criteria are verified PASS. This task runs the systematic check and documents results.
  - Files: none (verification only)
  - Do: Open `index.html` in the browser. Run these checks at 1200px viewport:
    1. `document.querySelectorAll('#periodo-nacional [data-certeza]').length === 7`
    2. `document.querySelectorAll('#periodo-nacional .card-image img').length === 7` — all loaded (no broken icons)
    3. Certeza types: check `data-certeza` values include at least 2 types (hecho + opinión)
    4. Alberdi closure: final card or `.alberdi-quote` mentions death 1884 and legacy
    5. `document.querySelectorAll('#periodo-nacional cite').length >= 7`
    6. Opinión card(s) have `<blockquote>` with attribution
    7. `.nacional-timeline` animates on scroll with 7 markers
    8. `events-grid--certeza` present: `document.querySelector('#periodo-nacional .events-grid--certeza') !== null`
    9. `document.querySelectorAll('#periodo-nacional .img-error, #periodo-nacional .img-fallback').length === 0`
    10. Switch to 375px: cards stack, images scale, timeline condenses, no horizontal overflow
    
    Also verify no regressions: scroll through colonial and revolución sections — scroll spy, sub-nav, reveal, timeline, expand/collapse all functional.
  - Verify: All 10 checks PASS. No console errors. Existing sections unaffected.
  - Done when: All 10 M004 success criteria verified PASS at desktop and mobile; no regressions in colonial/revolución sections

## Files Likely Touched

- `index.html` (timeline HTML insertion)
- `styles.css` (nacional-timeline CSS — ~80-100 lines)
