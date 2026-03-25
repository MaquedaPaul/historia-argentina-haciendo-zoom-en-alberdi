---
estimated_steps: 7
estimated_files: 2
---

# T02: Build animated timeline for 1800-1860

**Slice:** S02 — Sub-navigation, animated timeline, expand/collapse interactivity, and responsive verification
**Milestone:** M003

## Description

Create a CSS-animated timeline spanning 1800-1860 that fires when the user scrolls past it, extending the proven `.colonial-timeline` pattern. This timeline has 10-12 markers (vs. 6 for colonial) so density management is critical, especially on mobile.

## Steps

1. Add `<div class="revolucion-timeline reveal reveal-fade">` after the last sub-period's card grid (before the closing `</div>` of `.period-body`). Structure: title + subtitle → track div → progress bar → 10-12 marker divs each with a dot and label.
2. Clone the `.colonial-timeline` CSS classes as `.revolucion-timeline` equivalents. Key classes: `.revolucion-timeline__track`, `.revolucion-timeline__progress`, `.revolucion-timeline__marker`, `.revolucion-timeline__dot`, `.revolucion-timeline__label`.
3. Select 10-12 key dates: 1810 (Revolución), 1816 (Independencia), 1820 (Cepeda/Anarquía), 1826 (Rivadavia), 1829 (Rosas I), 1835 (Rosas II), 1838 (Exilio Gen37), 1845 (Facundo), 1852 (Caseros/Bases), 1853 (Constitución), 1859 (Cepeda II), 1860 (Reunificación). Calculate `--marker-pos` as percentage of 1800-1860 range: `(year - 1800) / 60 * 100%`.
4. CSS animation: progress bar width animates from 0 to 100% on `.reveal--visible`. Each marker dot fades in with staggered `animation-delay` using nth-child selectors. Labels fade in simultaneously with their dots.
5. Add `@media (prefers-reduced-motion: reduce)` block: set all elements to final state with no animation.
6. Mobile responsive (< 768px): reduce marker count or switch to vertical orientation if horizontal is too dense. Test with 10 markers at 320px — if labels overlap, either rotate labels 45°, use abbreviated year labels (just last 2 digits), or drop to 6-8 key dates on mobile.
7. Test: scroll to timeline at desktop → staggered animation fires. At 320px → markers readable, no overlap.

## Must-Haves

- [ ] `<div class="revolucion-timeline">` with ≥10 date markers
- [ ] Progress bar animation on scroll reveal
- [ ] Staggered marker appearance via nth-child delays
- [ ] `prefers-reduced-motion` support
- [ ] Readable at 320px and 1920px

## Verification

- `document.querySelectorAll('.revolucion-timeline__marker').length >= 10`
- `document.querySelector('.revolucion-timeline.reveal--visible')` exists after scrolling past
- At 320px → markers don't overlap, labels readable
- At 1920px → timeline has comfortable spacing
- With `prefers-reduced-motion` → elements appear in final state without animation

## Inputs

- `.colonial-timeline` CSS in `styles.css` (lines ~1187-1400) — pattern to clone and adapt
- `index.html` — S01's `#periodo-revolucion` section for placement

## Expected Output

- `index.html` — `<div class="revolucion-timeline">` added after last sub-period
- `styles.css` — ~120 lines for revolucion timeline (animation, markers, responsive, reduced-motion)
