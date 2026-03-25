---
id: T01
parent: S02
milestone: M003
provides:
  - Sub-navigation bar inside #periodo-revolucion with 4 sub-period anchor links
  - Intersection Observer scroll tracking that updates the active sub-nav link
  - Smooth-scroll on sub-nav link click with URL hash update
  - Responsive CSS: sticky under main nav at desktop, horizontally scrollable at 320px
key_files:
  - index.html
  - styles.css
  - app.js
key_decisions:
  - Used rootMargin '0px 0px -70% 0px' for the sub-nav observer (triggers when sub-period enters top 30% of viewport) — distinct from the main scroll spy's '-10% 0px -60% 0px' to avoid interference
  - Sub-nav label text hidden via CSS at 30rem (320px) breakpoint — year range stays visible, labels are display:none to prevent crowding
  - Used position:sticky inside #periodo-revolucion (not fixed) so the sub-nav automatically disappears when user scrolls out of the revolucion section
patterns_established:
  - Second Intersection Observer pattern: distinct rootMargin, only observes .sub-period elements scoped to #periodo-revolucion, does not touch the main section spy
  - Sub-nav CSS uses justify-content:center at desktop, overflow-x:auto + flex-shrink:0 on links at mobile for horizontal scrollability
observability_surfaces:
  - Console '[SubNav]' debug logs — initialization count, active sub-period changes, click events, warnings if .sub-nav or .sub-period elements not found
  - '.sub-nav a.sub-nav__link--active' selector — shows currently active sub-period at any time
  - URL hash ('#rev-1800-1820' etc.) — updated on click via history.pushState
duration: ~40m
verification_result: passed
completed_at: 2026-03-19
blocker_discovered: false
---

# T01: Build sub-navigation component with scroll tracking

**Added sticky sub-nav bar inside #periodo-revolucion with 4 sub-period links, Intersection Observer scroll tracking, and responsive CSS for 320px and 1920px.**

## What Happened

Inserted `<nav class="sub-nav" aria-label="Sub-períodos...">` with 4 anchor links (`#rev-1800-1820`, `#rev-1820-1835`, `#rev-1835-1852`, `#rev-1852-1860`) inside `#periodo-revolucion`, positioned after the `.period-intro` block (including the Alberdi quote) and before the first `.sub-period` div.

Added ~90 lines of CSS: sticky positioning at `top: var(--nav-height)` (3.5rem, directly below main nav), flex layout with gap, warm background with backdrop-filter blur, celeste bottom border for active state. Mobile breakpoint at 640px switches to `overflow-x: auto` with hidden scrollbar. At 30rem (320px), labels are hidden via `display: none` — only the year ranges show.

Added `initSubNav()` function to app.js (~70 lines): a new `IntersectionObserver` with `rootMargin: '0px 0px -70% 0px'` targets only `.sub-period` elements within `#periodo-revolucion`. On intersection, the matching `.sub-nav__link--active` class is set. Click handler prevents default, calls `scrollIntoView({ behavior: 'smooth', block: 'start' })`, and updates URL via `history.pushState`. Initial active link is set to the first link on `requestAnimationFrame` if no intersection has fired yet.

The sub-nav does not observe or touch the main section spy Observer — they're completely independent.

## Verification

Verified in-browser at http://localhost:4200:

1. `document.querySelectorAll('.sub-nav a').length === 4` → **4** ✅
2. `document.querySelector('nav.sub-nav')` exists → **true** ✅
3. `window.getComputedStyle(document.querySelector('.sub-nav')).position` → **"sticky"** ✅
4. Scroll to sub-period 2 → `document.querySelector('.sub-nav a.sub-nav__link--active').getAttribute('href')` → **"#rev-1820-1835"** ✅
5. Click `a[href="#rev-1852-1860"]` → URL updates to `#rev-1852-1860`, active link updates ✅
6. At 320px viewport → sub-nav shows 4 year links in a row (labels hidden), scrollable if needed ✅
7. At 1920px viewport → sub-nav is centered, 4 links with full labels, comfortable spacing ✅
8. `[SubNav]` console logs fire on initialization and active-state changes ✅

## Verification Evidence

| # | Command / Check | Exit Code | Verdict | Duration |
|---|----------------|-----------|---------|----------|
| 1 | `document.querySelectorAll('.sub-nav a').length` (browser JS) | — | ✅ pass (4) | instant |
| 2 | `document.querySelector('nav.sub-nav')` | — | ✅ pass | instant |
| 3 | computed `position` of `.sub-nav` | — | ✅ pass (sticky) | instant |
| 4 | Active link after scroll to SP2 | — | ✅ pass (#rev-1820-1835) | instant |
| 5 | Click SP4 link → URL hash update | — | ✅ pass | instant |
| 6 | 320px viewport visual check | — | ✅ pass (usable, scrollable) | manual |
| 7 | 1920px viewport visual check | — | ✅ pass (centered, spacious) | manual |
| 8 | Console `[SubNav]` logs | — | ✅ pass (debug logs fire) | instant |

Slice-level check: `document.querySelectorAll('.sub-nav a').length === 4` → **PASS**

## Diagnostics

To inspect the sub-nav state at runtime:
- Active sub-period: `document.querySelector('.sub-nav a.sub-nav__link--active')?.getAttribute('href')`
- All link states: `Array.from(document.querySelectorAll('.sub-nav a')).map(a => ({href: a.getAttribute('href'), active: a.classList.contains('sub-nav__link--active')}))`
- If active state isn't updating: check that `.sub-period` elements have their IDs set (`#rev-1800-1820` etc.) and that the Intersection Observer rootMargin is correct ('0px 0px -70% 0px')
- Console prefix `[SubNav]` — filter browser console to see all sub-nav events

## Deviations

None. Implemented exactly as planned.

## Known Issues

None.

## Files Created/Modified

- `index.html` — Added `<nav class="sub-nav">` with 4 anchor links after `.period-intro`, before first `.sub-period`
- `styles.css` — Added ~90 lines: `.sub-nav`, `.sub-nav__link`, `.sub-nav__link--active`, responsive breakpoints at 640px and 30rem, `prefers-reduced-motion` block
- `app.js` — Added `initSubNav()` function (~70 lines) with IntersectionObserver, click handler, and initial active-state fallback
