---
id: S02
parent: M005
milestone: M005
provides:
  - CSS ::before parallax background layer on all 3 .period sections, driven by JS passive scroll listener → requestAnimationFrame → --parallax-y CSS custom property
  - Golden box-shadow glow animation (@keyframes key-event-glow) on Revolución de Mayo and Caseros cards, firing once on scroll-reveal
  - prefers-reduced-motion: reduce disables both parallax and glow entirely
  - [Parallax] console.debug observability surface on initialization
  - document.querySelectorAll('.card--key-event') returns exactly 2 for runtime inspection
requires: []
affects:
  - S04
key_files:
  - styles.css
  - app.js
  - index.html
key_decisions:
  - "CSS custom property bridge for parallax: JS sets --parallax-y on .period elements; CSS ::before reads it via transform: translateY(var(--parallax-y, 0px)) — keeps JS minimal and CSS declarative"
  - "Moved .period--featured::before accent bar to ::after to free ::before for parallax layer (specificity conflict: .period--featured::before would override .period::before parallax rule)"
  - "Reveal-gated keyframe pattern: .reveal--visible.card--key-event triggers animation the moment IntersectionObserver adds reveal--visible — no extra JS needed"
  - "0.3s animation-delay on glow so reveal fade-in begins before glow fires — avoids both effects competing at t=0"
  - "prefers-reduced-motion override targets base class .card--key-event (not the compound selector) so it overrides regardless of reveal state"
patterns_established:
  - "CSS custom property driven parallax: JS sets --parallax-y on element, CSS ::before reads it via transform — avoids background-attachment: fixed GPU compositing issues on mobile"
  - "Reveal-gated keyframe: selector .reveal--visible.card--key-event triggers animation on IntersectionObserver class addition; no extra JS observer needed"
  - "Reduced-motion override on base class: @media (prefers-reduced-motion: reduce) { .card--key-event { animation: none; } } — more reliable than overriding compound selector"
observability_surfaces:
  - "console.debug('[Parallax] Initialized with 3 sections.') — fires on load when reduced-motion is inactive"
  - "console.debug('[Parallax] Skipped — prefers-reduced-motion: reduce is active.') — fires when reduced motion detected"
  - "console.warn('[Parallax] No .period elements found — parallax idle.') — fires if DOM missing expected elements"
  - "el.style.getPropertyValue('--parallax-y') on any .period — shows current parallax offset in DevTools"
  - "document.querySelectorAll('.card--key-event') — should return exactly 2"
  - "getComputedStyle(card).animationName — returns 'key-event-glow' after reveal, 'none' in reduced-motion"
drill_down_paths:
  - .gsd/milestones/M005/slices/S02/tasks/T01-SUMMARY.md
  - .gsd/milestones/M005/slices/S02/tasks/T02-SUMMARY.md
duration: ~45m
verification_result: passed
completed_at: 2026-03-19
---

# S02: Parallax and Special Card Animations

**Parallax backgrounds on all 3 period sections and a golden glow animation on the Revolución de Mayo and Caseros cards — both fully disabled by prefers-reduced-motion, no new IntersectionObservers, no regression in reveal element count.**

## What Happened

### T01 — Parallax on period section backgrounds

Added a `::before` pseudo-element rule to `.period` that extends 20% beyond the section's top and bottom edges (`inset: -20% 0`) and inherits the section's gradient background. A `transform: translateY(var(--parallax-y, 0px))` shifts this layer based on a CSS custom property set by JavaScript, producing a subtle depth effect during scroll.

In `app.js`, `initParallax()` is called from the main init block after `revealOnScroll()`. It first checks `window.matchMedia('(prefers-reduced-motion: reduce)')` and returns early if active (logging a debug signal). Otherwise it queries the 3 `.period` elements, attaches a passive scroll listener with a `requestAnimationFrame` guard (single pending RAF per scroll burst), and computes `offset = clamp(−30, (rect.top / vh) * −30, 30)` per section per frame.

**Pseudo-element conflict resolved:** `.period--featured::before` was already defined as a 4px blue accent bar. CSS specificity would have caused `.period--featured::before` to override `.period::before`, silently breaking the parallax on the revolution section. Resolution: moved the accent bar from `::before` to `::after` on `.period--featured`. Both effects now coexist without conflict on all 3 sections.

### T02 — Golden glow on key event cards

Added `card--key-event` class to two `<article>` elements in `index.html`:
- Revolución de Mayo card (El Cabildo Abierto, 25 de mayo de 1810) inside `#rev-1800-1820`
- Batalla de Caseros card (3 de febrero de 1852) inside `#rev-1835-1852`

In `styles.css`, added after the existing reveal reduced-motion block:
1. `@keyframes key-event-glow` — box-shadow pulse: transparent → `rgba(184,134,11,0.25)` golden glow at 40% → transparent, 1.2s ease-in-out
2. `.reveal--visible.card--key-event { animation: key-event-glow 1.2s ease-in-out 0.3s forwards; }` — the 0.3s delay staggers the glow after the fade-in starts
3. `@media (prefers-reduced-motion: reduce) { .card--key-event { animation: none; } }` — unconditional override before the compound selector can match

The glow uses `box-shadow` (not `border` or `background-color`) because box-shadow composites on the GPU without triggering reflow, and is compatible with the existing reveal `opacity`/`transform` transitions on these cards.

## Verification

All checks run against the live browser at http://localhost:8765:

| Check | Result |
|-------|--------|
| `document.querySelectorAll('.period').length` | ✅ 3 |
| `document.querySelectorAll('.card--key-event').length` | ✅ 2 |
| `document.querySelectorAll('.reveal').length` | ✅ 52 (no regression) |
| `--parallax-y` set on all 3 periods on load | ✅ colonial: −21px, revolución/nacional: −30px (capped) |
| `getComputedStyle('.period--colonial').overflow` | ✅ hidden |
| `::before` transform active on colonial section | ✅ `matrix(1,0,0,1,0,−21)` |
| `::after` accent bar preserved on featured section | ✅ `height: 4px`, `z-index: 1` |
| `::before` will-change: transform | ✅ |
| `@keyframes key-event-glow` in stylesheet | ✅ |
| `@media prefers-reduced-motion` block for `.period::before` | ✅ |
| `@media prefers-reduced-motion` block for `.card--key-event` | ✅ |
| Revolución de Mayo card `animationName` after reveal | ✅ `key-event-glow` |
| Caseros card `animationName` after reveal | ✅ `key-event-glow` |
| `animationFillMode` on both cards | ✅ `forwards` |
| `animationDelay` on both cards | ✅ `0.3s` |
| `document.querySelectorAll('.reveal--visible.card--key-event').length` | ✅ 2 after scroll |
| Parallax values update after scroll | ✅ colonial changed from −21px to +30px after scrolling to caseros |
| No horizontal overflow at 1280px | ✅ scrollWidth ≤ clientWidth |

## New Requirements Surfaced

None.

## Deviations

**T01:** `.period--featured::before` was already defined as a 4px accent bar (not documented in the plan). Moving it to `::after` was necessary to prevent the more-specific rule from overriding the parallax `::before` on the revolution section. The accent bar is visually identical in its new `::after` position.

No deviations in T02.

## Known Limitations

- Parallax offset is capped at ±30px, which is conservative. On very tall sections (the revolution section spans ~13,000px of rendered height), the cap means the effect is visually subtle compared to the full section height. This is intentional — more offset causes nausea on slow scrollers.
- The glow animation only fires for cards that receive `reveal--visible` from the IntersectionObserver (not `reveal--no-anim`). Cards already in the viewport at page load will be instantly visible without the glow. This is correct per-spec and matches the existing reveal system behavior documented in KNOWLEDGE.md.
- No `matchMedia` change listener is registered for the parallax — if the user changes their OS reduced-motion preference after page load, the scroll listener continues running (but the CSS `@media` block neutralizes the visual effect). A full solution would require listening to `mq.addEventListener('change', ...)`. Deferred — acceptable for the site's scope.

## Follow-ups

- S04 should verify that `console.debug` calls (parallax + any others) do not contribute to Lighthouse accessibility or best-practices deductions — they shouldn't, but worth confirming in the live audit.
- The `[VERIFICACIÓN PENDIENTE]` on Alberdi's death date (`card-nota-certeza` span) remains unresolved from M004. Not in M005 scope.

## Files Created/Modified

- `styles.css` — Added `overflow: hidden` to `.period`, `.period::before` parallax rule, moved `.period--featured::before` accent bar to `.period--featured::after`, `@keyframes key-event-glow`, `.reveal--visible.card--key-event` animation rule, `@media (prefers-reduced-motion: reduce)` blocks for both parallax and glow
- `app.js` — Added `initParallax()` function with passive scroll listener + RAF guard; called from init block after `revealOnScroll()`
- `index.html` — Added `card--key-event` class to Revolución de Mayo card (line 339) and Batalla de Caseros card (line 715)

## Forward Intelligence

### What the next slice should know
- **S03 (sound):** The parallax scroll listener (`window.addEventListener('scroll', ..., { passive: true })`) is already registered. If S03 also needs a scroll listener, both can coexist — passive listeners don't block each other. However, S03's plan says it piggybacks on `setActiveSection` via DOM observation, not direct scroll events, so there should be no conflict.
- **S04 (deploy/Lighthouse):** The `::before` layer uses `will-change: transform` on all 3 sections. This creates 3 additional GPU compositing layers. On low-memory mobile devices this could increase memory pressure. If Lighthouse flags memory as an issue, `will-change: auto` in the `prefers-reduced-motion` block already cleans this up for motion-sensitive users. For everyone else, 3 layers at this scale is well within norms.
- **The `.period--featured::after` is now the accent bar.** Any future CSS that targets `.period--featured::before` expecting the accent bar will find the parallax layer instead. The comment at line ~419 in `styles.css` documents this.
- **The `console.debug` in `initParallax` uses `var PARALLAX_PREFIX = '[Parallax]'`** — searchable string for filtering browser console output during debugging.

### What's fragile
- **`background: inherit` on `::before`** — If a future change to `.period--colonial`, `.period--revolucion`, or `.period--nacional` uses `background-color` instead of `background` shorthand, the pseudo-element will inherit a transparent background and the parallax layer will become invisible. Always use the `background` shorthand (not `background-color`) on `.period--*` elements.
- **`inset: -20%` browser support** — Requires Chrome 87+, Firefox 87+, Safari 14.1+. These are 2020-era versions. The site has no polyfill plan; if support for older browsers is ever needed, replace with explicit `top: -20%; bottom: -20%; left: 0; right: 0`.

### Authoritative diagnostics
- `el.style.getPropertyValue('--parallax-y')` on any `.period` element — shows live offset; if empty string, `initParallax` did not run (check console for `[Parallax]` signals)
- `getComputedStyle(document.querySelector('.period--featured'), '::after').height` — should be `4px`; if `0px`, the accent bar CSS rule is missing
- `getComputedStyle(document.querySelector('.card--key-event'), '::before')` is not used by S02 — the glow is `box-shadow` on the card itself, not a pseudo-element

### What assumptions changed
- **Original plan assumed `.period--featured::before` was unused** — it was already occupied by the accent bar decoration from M001. The `::after` migration was discovered during T01 execution and resolved cleanly.
- **Plan said "fourth IntersectionObserver not needed"** — confirmed correct. The parallax uses a passive scroll + rAF, not an observer. The three existing observers (scroll spy, reveal, sub-nav) remain unchanged.
