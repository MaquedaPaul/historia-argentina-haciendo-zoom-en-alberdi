---
estimated_steps: 8
estimated_files: 3
---

# T01: Add hamburger menu toggle and mobile nav drawer

**Slice:** S01 — Responsive Sweep and Hamburger Menu
**Milestone:** M005

## Description

Add a hamburger menu toggle button to the site nav that replaces the vertical nav stack at ≤30rem (≈480px). The hamburger button is a 44px×44px CSS-only icon. Clicking it toggles an `aria-expanded` attribute and reveals the nav list with a smooth `max-height` transition. At viewports >30rem, the hamburger is hidden and the nav displays normally. A `--nav-height` CSS custom property on `<nav>` is updated by JS when the menu opens/closes so that the `.sub-nav` sticky offset inside `#periodo-revolucion` adjusts correctly.

## Steps

1. In `index.html`, add `<button class="hamburger-toggle" aria-expanded="false" aria-label="Menú de navegación"><span class="hamburger-toggle__bar"></span></button>` immediately before the `<ul class="nav-list">` inside `<nav class="site-nav">`.
2. In `styles.css`, add `.hamburger-toggle` styles: `display: none` by default (visible only at ≤30rem). The button is 44px×44px with three horizontal bars via `::before`, the inner `__bar` span, and `::after`. Position it centered or left-aligned within the nav. Style the open state: when `[aria-expanded="true"]`, transform top/bottom bars into an X.
3. In `styles.css`, at `@media (max-width: 30rem)`: show `.hamburger-toggle` (`display: flex`). Set `.nav-list` to `max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out;`. Add `.nav-list--open { max-height: 12rem; }` to reveal the list.
4. In `app.js`, add `initHamburgerMenu()` function: find `.hamburger-toggle`, add click listener that toggles `aria-expanded` and `.nav-list--open` class on `.nav-list`. Update `--nav-height` on the `<nav>` element when toggling (measure `nav.offsetHeight` after transition via `transitionend` listener or rAF).
5. Call `initHamburgerMenu()` in the init block alongside `initSubNav()` and `initExpandCollapse()`.
6. Ensure the hamburger menu closes when a nav link is clicked (smooth scroll to section + close menu).
7. At >30rem, ensure `.hamburger-toggle { display: none }` and `.nav-list { max-height: none; overflow: visible; }` — undo the mobile constraints.
8. Test at 375px (hamburger visible, toggles, nav links work) and 1280px (hamburger hidden, normal nav).

## Must-Haves

- [ ] Hamburger button with `aria-expanded` toggling correctly
- [ ] Nav list hidden by default at ≤30rem, revealed on hamburger click with smooth transition
- [ ] `--nav-height` CSS custom property updated on open/close
- [ ] Hamburger hidden at >30rem; nav list displays normally
- [ ] Nav links in hamburger close the menu on click
- [ ] Hamburger icon is pure CSS (no SVG or image asset)

## Verification

- At 375px viewport: `.hamburger-toggle` visible, `aria-expanded="false"` by default. Click → nav list slides open, `aria-expanded="true"`. Click nav link → menu closes, page scrolls.
- At 1280px viewport: `.hamburger-toggle` not visible. `.nav-list` displays as horizontal flex row.
- `document.querySelector('.hamburger-toggle').getAttribute('aria-expanded')` returns `"false"` on load.
- No horizontal overflow at 375px with menu open or closed.

## Inputs

- `index.html` lines 31-56 — existing `<nav class="site-nav">` markup
- `styles.css` lines 195-253 — existing `.site-nav`, `.nav-list`, `.nav-link` styles
- `styles.css` lines 690-710 — existing `@media (max-width: 30rem)` nav rules
- `app.js` lines 148-160 — init block where `initSubNav()` and `initExpandCollapse()` are called

## Expected Output

- `index.html` — hamburger `<button>` added inside `<nav>`
- `styles.css` — `.hamburger-toggle` base styles + ≤30rem responsive rules for nav drawer
- `app.js` — `initHamburgerMenu()` function added and called from init block
