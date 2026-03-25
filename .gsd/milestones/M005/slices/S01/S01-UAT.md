---
id: S01
parent: M005
type: artifact-driven
---

# S01: UAT

- Browser DevTools emulation at 320px: hamburger visible, no horizontal scroll, touch targets ≥44px
- Browser DevTools emulation at 375px: same checks + sub-nav horizontal scroll functional inside `#periodo-revolucion`
- Browser DevTools emulation at 768px: nav displays normally (no hamburger), grid shows 2 columns
- Browser DevTools emulation at 1280px: full layout, timeline-aside visible, 3-column grid
- DOM check: `document.querySelector('.hamburger-toggle')` exists and has `aria-expanded="false"` by default
- DOM check: `document.querySelectorAll('.reveal').length >= 52` (no regression)
- Failure-path check: `document.documentElement.scrollWidth > document.documentElement.clientWidth` returns `false` at 320px — if `true`, horizontal overflow exists and must be fixed
- Touch target failure check: `[...document.querySelectorAll('.card-expand-toggle, .nav-link, .hamburger-toggle')].filter(el => el.offsetHeight < 44)` returns empty array — any items in this list identify elements below the 44px WCAG minimum
