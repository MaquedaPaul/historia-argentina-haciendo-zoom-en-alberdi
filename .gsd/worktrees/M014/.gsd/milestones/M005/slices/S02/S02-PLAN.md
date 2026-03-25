# S02: Parallax and Special Card Animations

**Goal:** Add subtle parallax background movement on period sections and distinctive glow/shimmer animations on key event cards (Revolución de Mayo, Caseros), with full `prefers-reduced-motion` support.
**Demo:** Scroll through the page — period section backgrounds shift slightly (parallax). Revolución de Mayo and Caseros cards display a brief golden glow when first revealed. Enable `prefers-reduced-motion` in DevTools — parallax and glow are disabled, elements render in final state.

## Must-Haves

- Parallax effect on `.period` section backgrounds via `::before` pseudo-element with `transform: translateY()`
- Special glow animation on Revolución de Mayo and Batalla de Caseros cards on first reveal
- `prefers-reduced-motion` disables both parallax and glow
- No additional IntersectionObserver needed for parallax (use passive scroll listener on `requestAnimationFrame`)
- No interference with existing reveal system (52+ elements, stagger delays preserved)

## Verification

- Scroll through page at 1280px: parallax visible on all 3 period sections
- Revolución de Mayo card and Caseros card show glow effect when scrolled into view
- Enable `prefers-reduced-motion: reduce` in DevTools → no parallax, no glow, elements in final state
- `document.querySelectorAll('.reveal').length >= 52` (no regression)
- No visible jank during scroll (parallax uses `transform` not `background-position`)
- **Failure-path diagnostic:** `document.querySelectorAll('.card--key-event').length === 2` — if 0, class is missing from `index.html`; if glow does not play, verify `.reveal--visible` is being applied by the Intersection Observer; if glow repeats, check `animation-fill-mode: forwards` is present and `animation-iteration-count` is not set to `infinite`

## Observability / Diagnostics

- Runtime signals: `[Parallax]` console.debug when parallax initializes with element count
- Inspection surfaces: `document.querySelectorAll('.card--key-event')` returns the specially animated cards
- Failure visibility: Missing `::before` pseudo-elements detectable via DevTools Computed styles

## Tasks

- [x] **T01: Implement parallax on period section backgrounds** `est:30m`
  - Why: Adds depth and polish to the scroll experience — the main visual enhancement for M005.
  - Files: `styles.css`, `app.js`
  - Do: In `styles.css`, add `position: relative; overflow: hidden;` to `.period` (already has `position: relative`). Add `.period::before` with `content: ''; position: absolute; inset: -20% 0; background: inherit; z-index: -1; will-change: transform; pointer-events: none;`. In `app.js`, add `initParallax()` function: on passive scroll event, use `requestAnimationFrame` to set `transform: translateY(${offset}px)` on each `.period::before` (use `el.style.setProperty('--parallax-y', offset + 'px')` and CSS `transform: translateY(var(--parallax-y, 0px))`). The offset should be a fraction (0.15×) of the element's scroll position relative to viewport. Wrap in `matchMedia('(prefers-reduced-motion: reduce)')` check — skip entirely if user prefers reduced motion. Call from init block.
  - Verify: Scroll at 1280px — background shifts subtly on each section. Enable reduced motion → no shift. No horizontal overflow introduced.
  - Done when: Parallax visible on scroll, disabled by reduced-motion, no jank.

- [x] **T02: Add special glow animation to key event cards** `est:25m`
  - Why: Revolución de Mayo and Caseros are the two most pivotal events — visual emphasis on reveal makes them stand out.
  - Files: `index.html`, `styles.css`
  - Do: In `index.html`, add `card--key-event` class to the Revolución de Mayo card (Evento 1 in `#rev-1800-1820`) and the Batalla de Caseros card (in `#rev-1835-1852`). In `styles.css`, add `@keyframes key-event-glow` animation: a brief (1.2s) `box-shadow` pulse from transparent → golden glow → transparent (using `var(--gold)` or `rgba(184,134,11,0.3)`). Gate it on `.reveal--visible.card--key-event` — the glow fires once when the reveal system adds `reveal--visible`. Add `animation-fill-mode: forwards` so the glow doesn't repeat. Add `prefers-reduced-motion` block that sets `animation: none` for `.card--key-event`.
  - Verify: Scroll to Revolución de Mayo card — golden glow appears once. Scroll to Caseros — same effect. Enable reduced motion → no glow. Cards still reveal normally with fade/slide.
  - Done when: Both cards glow on first reveal; reduced-motion disables it; no interference with existing reveal transitions.

## Files Likely Touched

- `index.html` — `card--key-event` class on 2 cards
- `styles.css` — `.period::before` parallax layer, `@keyframes key-event-glow`, responsive/reduced-motion blocks
- `app.js` — `initParallax()` function
