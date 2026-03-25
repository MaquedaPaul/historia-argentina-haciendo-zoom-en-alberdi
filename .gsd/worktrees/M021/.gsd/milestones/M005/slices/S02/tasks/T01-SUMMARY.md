---
id: T01
parent: S02
milestone: M005
provides:
  - Parallax background effect on all 3 .period sections via CSS ::before + JS scroll listener
  - prefers-reduced-motion: reduce disables parallax entirely
  - [Parallax] console.debug init signal
key_files:
  - styles.css
  - app.js
key_decisions:
  - Moved .period--featured::before (4px accent bar) to ::after to avoid pseudo-element conflict with the new parallax ::before layer
  - Used CSS custom property --parallax-y on each .period element (set via JS) consumed by .period::before transform, avoiding background-attachment: fixed jank
  - Capped parallax offset at ±30px for subtlety; used requestAnimationFrame guard (rafPending flag) to prevent scroll handler flooding
patterns_established:
  - CSS custom property driven parallax: JS sets --parallax-y on element, CSS ::before reads it via transform: translateY(var(--parallax-y, 0px))
  - prefers-reduced-motion check at function top with early return — no scroll listener attached when reduced motion is active
observability_surfaces:
  - console.debug('[Parallax] Initialized with N sections.') — fires on load when reduced-motion is not active
  - console.debug('[Parallax] Skipped — prefers-reduced-motion: reduce is active.') — fires when reduced motion detected
  - console.warn('[Parallax] No .period elements found — parallax idle.') — fires if DOM missing expected elements
  - el.style.getPropertyValue('--parallax-y') on any .period element shows current offset (DevTools inspectable)
  - document.querySelectorAll('.period') returns all 3 animated sections
duration: ~25m
verification_result: passed
completed_at: 2026-03-19
blocker_discovered: false
---

# T01: Implement parallax on period section backgrounds

**Added CSS ::before parallax background layer to all 3 period sections, driven by a passive scroll → requestAnimationFrame → CSS custom property pipeline, with full prefers-reduced-motion disablement.**

## What Happened

Added `overflow: hidden` and a `::before` pseudo-element rule to `.period` in `styles.css`. The pseudo-element uses `inset: -20% 0` (extends 20% beyond top and bottom) with `background: inherit` so it mirrors the section's gradient background. `transform: translateY(var(--parallax-y, 0px))` shifts it based on the JS-set custom property.

**Pseudo-element conflict discovered and resolved:** `.period--featured::before` was already defined as a 4px blue accent bar at the top of the revolución section. Adding the parallax `::before` to `.period` would have been overridden by the more specific `.period--featured::before` rule, breaking the accent bar. Resolution: moved the accent bar to `.period--featured::after`, freeing `::before` for the parallax layer on all 3 sections.

In `app.js`, added `initParallax()` function called alongside `revealOnScroll()` in the init block. It:
1. Checks `window.matchMedia('(prefers-reduced-motion: reduce)').matches` and returns early if true
2. Queries all `.period` elements (finds 3)
3. Logs `[Parallax] Initialized with 3 sections.`
4. Attaches a passive scroll listener with `requestAnimationFrame` guard (single pending RAF per scroll burst)
5. On each RAF frame, computes `offset = (rect.top / vh) * -30`, capped at ±30px, and sets `--parallax-y` on each period element
6. Runs `updateParallax()` once on init to set initial positions

A `@media (prefers-reduced-motion: reduce)` block in `styles.css` sets `.period::before { transform: none; will-change: auto; }` so even if JS somehow ran, the CSS layer would not shift.

## Verification

- **3 period elements confirm `--parallax-y` set on load:** `periodo-colonial: 30px`, `periodo-revolucion: -30px`, `periodo-nacional: -30px` — all capped at ±30px as expected at page bottom.
- **`overflow: hidden` confirmed:** `getComputedStyle('.period--colonial').overflow === 'hidden'` ✅
- **`::before` rendering correctly on colonial:** `transform: matrix(1, 0, 0, 1, 0, -21)`, `z-index: -1`, `position: absolute`, `will-change: transform` ✅
- **`::before` parallax layer on featured section:** height = 12919px (full section height + 20% inset), z-index: -1, transform active ✅
- **`::after` accent bar on featured section:** height: 4px, z-index: 1, top: 0px — accent bar preserved ✅
- **Scroll updates values:** After scrolling 600px, colonial changed from -21px to 1.46px (section moved past viewport) ✅
- **No horizontal overflow at 1280px:** `scrollWidth <= clientWidth` → true ✅
- **No horizontal overflow at 375px:** `scrollWidth <= clientWidth` → true ✅
- **`.reveal` count not regressed:** 52 elements ✅
- **`prefers-reduced-motion` CSS rule verified in file:** `@media (prefers-reduced-motion: reduce) { .period::before { transform: none; will-change: auto; } }` at styles.css line 440 ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `document.querySelectorAll('.period').length === 3` | — | ✅ pass | immediate |
| 2 | `el.style.getPropertyValue('--parallax-y')` on all 3 periods | — | ✅ pass | immediate |
| 3 | `getComputedStyle('.period--colonial').overflow === 'hidden'` | — | ✅ pass | immediate |
| 4 | `getComputedStyle(featured, '::before').transform` includes translateY | — | ✅ pass | immediate |
| 5 | `getComputedStyle(featured, '::after').height === '4px'` (accent bar preserved) | — | ✅ pass | immediate |
| 6 | `document.querySelectorAll('.reveal').length >= 52` | — | ✅ pass | immediate |
| 7 | `scrollWidth <= clientWidth` at 1280px | — | ✅ pass | immediate |
| 8 | `scrollWidth <= clientWidth` at 375px | — | ✅ pass | immediate |
| 9 | parallax values update after scroll | — | ✅ pass | immediate |

## Diagnostics

To inspect the parallax system at runtime:
```js
// Current offset on each section
document.querySelectorAll('.period').forEach(el =>
  console.log(el.id, el.style.getPropertyValue('--parallax-y'))
);

// Verify ::before pseudo-element is the parallax layer
getComputedStyle(document.querySelector('.period--colonial'), '::before').transform;

// Verify ::after accent bar on featured section
getComputedStyle(document.querySelector('.period--featured'), '::after').height; // '4px'
```

If `::before` is not visible:
- Check `background: inherit` is resolving — the parent `.period--*` must have a `background` property set (not `background-color` only)
- Check `z-index: -1` — parent's `background` may be covering it
- Check `inset: -20% 0` is supported (Chrome 87+, Firefox 87+)

Console signal for reduced-motion: if `[Parallax] Skipped` appears in console, reduced-motion was detected and no scroll listener was attached.

## Deviations

**Planned:** `.period--featured::before` used for parallax (inheriting `.period::before` rule).
**Actual:** `.period--featured::before` was already defined as a 4px accent bar decoration. Due to CSS specificity (`.period--featured::before` > `.period::before`), the accent bar would have overridden the parallax. Resolution: moved accent bar from `::before` to `::after` on `.period--featured`. This preserves both effects without conflict. The parallax `::before` now works identically on all 3 period sections.

## Known Issues

None.

## Files Created/Modified

- `styles.css` — Added `overflow: hidden` to `.period`, added `.period::before` parallax rule, moved `.period--featured::before` accent bar to `::after`, added `@media (prefers-reduced-motion: reduce)` block for `.period::before`
- `app.js` — Added `initParallax()` function with passive scroll listener + RAF guard; called from init block after `revealOnScroll()`
