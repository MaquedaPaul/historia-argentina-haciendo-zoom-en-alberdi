---
estimated_steps: 5
estimated_files: 1
---

# T02: Fix touch targets and mobile typography

**Slice:** S01 — Responsive Sweep and Hamburger Menu
**Milestone:** M005

## Description

Ensure all interactive elements meet WCAG 2.5.5 minimum touch target size (≥44px) at mobile breakpoints, and verify typography scales without clipping or overflow at 320px.

## Steps

1. In `styles.css` at the `@media (max-width: 48rem)` block, add `min-height: 44px; display: flex; align-items: center;` to `.card-expand-toggle`.
2. Verify `.nav-link` computed height at ≤30rem — current padding is `var(--space-sm) var(--space-md)` in row layout. If computed height < 44px, add `min-height: 44px` at the ≤30rem breakpoint.
3. Verify `.timeline-point` button height in the timeline-aside — already hidden at ≤48rem so no mobile fix needed, but confirm at 1024px the touch target is ≥44px.
4. Audit heading sizes at 320px: `.header-title` uses `clamp()` — verify it doesn't overflow. `.period-title` uses `clamp(1.8rem, 3.5vw, 2.8rem)` — at 320px this yields ~11.2px which is too small. Adjust floor to `1.6rem` minimum. Check `.card-source cite` font-size — ensure ≥12px.
5. Test at 320px viewport in DevTools: inspect all tap targets with Computed styles, verify no text overflow on headings.

## Must-Haves

- [ ] `.card-expand-toggle` has ≥44px height at ≤48rem
- [ ] `.nav-link` has ≥44px height at ≤30rem
- [ ] No heading text overflows its container at 320px
- [ ] Minimum body text is ≥12px at all breakpoints

## Verification

- DevTools at 320px: computed height of `.card-expand-toggle` ≥ 44px
- DevTools at 320px: computed height of `.nav-link` ≥ 44px
- No text-overflow visible on any heading at 320px
- `document.querySelectorAll('.card-expand-toggle').forEach(el => console.log(el.offsetHeight))` — all ≥44 at 320px viewport

## Inputs

- `styles.css` lines 1966-2009 — `.card-expand-toggle` styles
- `styles.css` lines 654-710 — existing responsive breakpoints
- T01 output — hamburger menu already in place

## Expected Output

- `styles.css` — touch target fixes in responsive breakpoints, typography floor adjustments
