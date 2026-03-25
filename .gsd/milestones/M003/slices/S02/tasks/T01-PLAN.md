---
estimated_steps: 7
estimated_files: 3
---

# T01: Build sub-navigation component with scroll tracking

**Slice:** S02 — Sub-navigation, animated timeline, expand/collapse interactivity, and responsive verification
**Milestone:** M003

## Description

Add a sub-navigation bar inside `#periodo-revolucion` that lets users jump between the 4 sub-periods and highlights the currently visible sub-period as they scroll. This is a new UI pattern — requires a second Intersection Observer with different thresholds than the main scroll spy.

## Steps

1. Add `<nav class="sub-nav" aria-label="Sub-períodos">` after the `.period-intro` and before the first `.sub-period` div. Contains 4 anchor links: `<a href="#rev-1800-1820" class="sub-nav__link">1800–1820</a>`, etc.
2. CSS for `.sub-nav`: `position: sticky; top: 60px` (below the main nav), horizontal flex layout with gap, background matching section, subtle bottom border. `.sub-nav__link`: padding, transition for active state. `.sub-nav__link--active`: accent color underline/border-bottom using `--certeza-hecho` or period color. On mobile (< 768px): horizontal scroll with `overflow-x: auto`, smaller font.
3. JS: In app.js, add a new self-invoking function `initSubNav()`. Create an Intersection Observer targeting all `.sub-period` elements with `rootMargin: '0px 0px -70% 0px'` (trigger when sub-period enters top 30% of viewport). On intersection, set `.sub-nav__link--active` on the matching link (match via `href` attribute to sub-period `id`).
4. Add smooth scroll behavior to sub-nav links: click handler that prevents default, calls `scrollIntoView({ behavior: 'smooth', block: 'start' })` on the target sub-period.
5. Ensure the sub-nav only appears/works within `#periodo-revolucion` — it shouldn't interfere with the main scroll spy or nav for other sections.
6. Test at 320px (mobile): sub-nav is horizontally scrollable, active state visible, links work.
7. Test at 1920px (desktop): sub-nav is centered, links are spacious, active tracking works.

## Must-Haves

- [ ] `<nav class="sub-nav">` with 4 anchor links present in HTML
- [ ] Sticky positioning within the revolucion section
- [ ] Active link tracks scroll position via Intersection Observer
- [ ] Smooth scroll on link click
- [ ] Responsive at 320px (scrollable) and 1920px (centered)
- [ ] Does not conflict with main scroll spy

## Verification

- `document.querySelectorAll('.sub-nav a').length === 4`
- Click a sub-nav link → page scrolls to corresponding sub-period
- Scroll through section → active class updates on correct link
- At 320px viewport → sub-nav is usable
- At 1920px viewport → sub-nav is properly styled

## Inputs

- `index.html` — S01's sub-period `<div>` wrappers with IDs
- `app.js` — existing scroll spy and reveal Observer patterns
- `styles.css` — existing sticky nav and period styling

## Expected Output

- `index.html` — `<nav class="sub-nav">` added inside `#periodo-revolucion`
- `styles.css` — ~50 lines for sub-nav styling (layout, sticky, active state, responsive)
- `app.js` — ~40 lines for sub-nav scroll tracking Observer and click handler
