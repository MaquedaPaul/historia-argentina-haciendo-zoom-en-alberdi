# S01: Responsive Sweep and Hamburger Menu

**Goal:** Make the site fully usable across all viewports (320px–1280px+) with a mobile hamburger menu, proper touch targets, and no layout breakage.
**Demo:** Open browser DevTools, test at 320px, 375px, 768px, 1024px, and 1280px — hamburger menu opens/closes smoothly at ≤30rem, all cards display in correct column count, no horizontal overflow at any size, all touch targets ≥44px.

## Must-Haves

- Hamburger menu toggle at ≤30rem with smooth open/close transition and correct `aria-expanded` state
- `--nav-height` CSS custom property updated by JS when hamburger opens (so `.sub-nav` top offset adjusts)
- ≥44px minimum touch targets on `.card-expand-toggle`, `.nav-link`, `.timeline-point` at mobile breakpoints
- No horizontal overflow (`scrollWidth === clientWidth`) at 320px and 375px
- Typography scales readable at 320px (no text clipping, no overflow)

## Verification

- Browser DevTools emulation at 320px: hamburger visible, no horizontal scroll, touch targets ≥44px
- Browser DevTools emulation at 375px: same checks + sub-nav horizontal scroll functional inside `#periodo-revolucion`
- Browser DevTools emulation at 768px: nav displays normally (no hamburger), grid shows 2 columns
- Browser DevTools emulation at 1280px: full layout, timeline-aside visible, 3-column grid
- DOM check: `document.querySelector('.hamburger-toggle')` exists and has `aria-expanded="false"` by default
- DOM check: `document.querySelectorAll('.reveal').length >= 52` (no regression)
- Failure-path check: `document.documentElement.scrollWidth > document.documentElement.clientWidth` returns `false` at 320px — if `true`, horizontal overflow exists and must be fixed
- Touch target failure check: `[...document.querySelectorAll('.card-expand-toggle, .nav-link, .hamburger-toggle')].filter(el => el.offsetHeight < 44)` returns empty array — any items in this list identify elements below the 44px WCAG minimum

## Observability / Diagnostics

- Runtime signals: `[Nav]` console.debug prefix for hamburger open/close state changes
- Inspection surfaces: `.hamburger-toggle[aria-expanded]` reflects current menu state; `getComputedStyle(nav).getPropertyValue('--nav-height')` shows current nav height
- Failure visibility: Horizontal overflow detectable via `document.documentElement.scrollWidth > document.documentElement.clientWidth`

## Tasks

- [x] **T01: Add hamburger menu toggle and mobile nav drawer** `est:45m`
  - Why: The nav at ≤30rem stacks into a 100px-high vertical list that wastes viewport space. A hamburger menu is the standard mobile pattern and is explicitly requested in M005-CONTEXT.
  - Files: `index.html`, `styles.css`, `app.js`
  - Do: Add a `<button class="hamburger-toggle" aria-expanded="false" aria-label="Menú">` before the `<ul class="nav-list">` in the `<nav>`. Add CSS: at ≤30rem, hide `.nav-list` by default (`max-height: 0; overflow: hidden; transition: max-height 0.3s ease`), show `.hamburger-toggle` as a 44px×44px button with a hamburger icon (3 CSS lines via `::before`/`::after` + border). On click, JS toggles `aria-expanded` and adds `.nav-list--open` class (which sets `max-height: 12rem`). At >30rem, hide `.hamburger-toggle` via `display:none` and ensure `.nav-list` has `max-height: none`. Update `--nav-height` custom property on `<nav>` dynamically when menu opens/closes (for sub-nav offset). Use CSS hamburger icon (no SVG/image needed).
  - Verify: At 375px viewport, hamburger button visible, click opens 3 nav links, click again closes. `aria-expanded` toggles correctly. At 1280px, hamburger hidden, nav displays normally.
  - Done when: Hamburger toggle works at ≤30rem and is invisible at >30rem; `--nav-height` updates on open/close.

- [x] **T02: Fix touch targets and mobile typography** `est:30m`
  - Why: `.card-expand-toggle` has no minimum height — WCAG 2.5.5 requires ≥44px for touch targets. Typography at 320px may clip or overflow.
  - Files: `styles.css`
  - Do: At ≤48rem breakpoint, add `min-height: 44px` to `.card-expand-toggle`. Verify `.nav-link` padding already provides ≥44px hit area (current padding is `var(--space-sm) var(--space-xs)` at ≤48rem — may need increase). Add `min-height: 44px` to `.timeline-point` if needed. Check `clamp()` font sizes on `.period-title`, `.header-title` at 320px — ensure no overflow. Verify `.card-source cite` font size is ≥12px at mobile.
  - Verify: DevTools at 320px — inspect computed height of all toggle buttons, nav links. No element smaller than 44px tap area. No text overflow on any heading.
  - Done when: All interactive elements at mobile breakpoints have ≥44px minimum touch target height.

- [x] **T03: Responsive audit and overflow fix across all breakpoints** `est:30m`
  - Why: Final verification that all 5 target viewports render correctly with no horizontal overflow.
  - Files: `styles.css` (any fixes), `index.html` (if structural fixes needed)
  - Do: Systematically test at 320px, 375px, 768px, 1024px, 1280px. Check: no horizontal scroll at any size. Cards use correct column count (1 at ≤48rem, 2 at ~768px, 3 at 1280px). Sub-nav scrolls horizontally at ≤640px. Timeline-aside hidden at ≤48rem. Alberdi-quote margins correct at mobile. `.nacional-timeline`, `.colonial-timeline`, `.revolucion-timeline` fit within viewport at all sizes. Fix any issues found.
  - Verify: `document.documentElement.scrollWidth <= document.documentElement.clientWidth` at each viewport. Visual inspection confirms correct layout.
  - Done when: Zero horizontal overflow at all 5 viewport sizes; layout adapts correctly at each breakpoint.

## Files Likely Touched

- `index.html` — hamburger button markup
- `styles.css` — hamburger CSS, touch target fixes, any overflow fixes
- `app.js` — hamburger toggle JS, `--nav-height` dynamic update
