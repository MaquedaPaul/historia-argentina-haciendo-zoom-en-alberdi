---
estimated_steps: 6
estimated_files: 2
---

# T01: Implement parallax on period section backgrounds

**Slice:** S02 — Parallax and Special Card Animations
**Milestone:** M005

## Description

Add a subtle parallax effect to the three `.period` section backgrounds. The approach uses a `::before` pseudo-element with `transform: translateY()` driven by a CSS custom property set via JS scroll listener. This avoids `background-attachment: fixed` which causes jank on mobile. The effect is disabled entirely when `prefers-reduced-motion` is enabled.

## Steps

1. In `styles.css`, add to `.period`: `overflow: hidden;` (it already has `position: relative`).
2. Add `.period::before` rule: `content: ''; position: absolute; inset: -20% 0; background: inherit; z-index: -1; will-change: transform; transform: translateY(var(--parallax-y, 0px)); pointer-events: none;`.
3. In `styles.css`, inside the existing `prefers-reduced-motion` blocks (or add a new one near the `.period` styles), set `.period::before { transform: none; will-change: auto; }`.
4. In `app.js`, add `initParallax()` function. Check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` — if true, return early. Collect all `.period` elements. Add a passive scroll listener that uses `requestAnimationFrame` to calculate each `.period`'s offset: `const rect = el.getBoundingClientRect(); const offset = (rect.top / window.innerHeight) * -30;` (capped at ±30px). Set `el.style.setProperty('--parallax-y', offset + 'px')`.
5. Call `initParallax()` from the init block alongside other `init*()` calls.
6. Test: scroll at 1280px and 375px — parallax visible, no jank, no horizontal overflow.

## Must-Haves

- [ ] `.period::before` pseudo-element renders on all 3 period sections
- [ ] `--parallax-y` updates on scroll via `requestAnimationFrame`
- [ ] `prefers-reduced-motion: reduce` disables the effect completely
- [ ] No horizontal overflow introduced by the pseudo-element
- [ ] `overflow: hidden` on `.period` prevents parallax bleed

## Verification

- Scroll at 1280px: subtle background shift visible on each period section
- DevTools `prefers-reduced-motion: reduce` → no shift, `transform: none` on `::before`
- `document.documentElement.scrollWidth <= document.documentElement.clientWidth` at 375px → true
- Console: `[Parallax] Initialized with 3 sections.`

## Inputs

- `styles.css` lines 260-265 — `.period` base styles
- `styles.css` lines 322-341 — `.period--colonial`, `.period--revolucion`, `.period--nacional` background gradients
- `app.js` lines 148-160 — init block

## Expected Output

- `styles.css` — `.period::before` parallax layer + reduced-motion fallback
- `app.js` — `initParallax()` function with scroll handler
