---
id: T02
parent: S02
milestone: M003
provides:
  - Animated 1800-1860 timeline inside #periodo-revolucion with 10 date markers
  - Progress bar animation triggered on scroll via IntersectionObserver reveal system
  - Staggered marker dot/label entrance via nth-child CSS animation delays
  - Alternating above/below label placement to resolve density overlap in dense marker clusters
  - prefers-reduced-motion support (all elements rendered in final state instantly)
  - Responsive CSS at 320px (sublabels hidden) and 1920px (full labels, comfortable spacing)
key_files:
  - index.html
  - styles.css
key_decisions:
  - Alternating above/below label placement via .revolucion-timeline__marker--above class (applied to 1820, 1829, 1838) — cleaner than rotating labels or reducing marker count; preserves all 10 dates at all viewport sizes
  - 10 markers chosen (not 12) — dropped 1853 and 1859 which are too close to 1852 and 1860 to be legible even with alternating placement; kept 1852 (Caseros/Bases) and 1860 (Reunificación) as the more historically significant endpoints
  - Track top margin increased to 3.5rem (matching bottom) to accommodate above-positioned labels
  - Used color-mix() for track background and progress gradient — same pattern as the rest of the styles.css color system
patterns_established:
  - Modifier class pattern for above-positioned labels (.revolucion-timeline__marker--above) with separate @keyframes (rev-label-fade-above) for correct enter direction
  - All revolucion-timeline CSS in one contiguous block between the colonial-timeline block and the responsive-video block in styles.css
observability_surfaces:
  - '.revolucion-timeline.reveal--visible' — present after user scrolls timeline into viewport
  - '.revolucion-timeline__marker' count (should be 10) — detects marker HTML integrity
  - '.revolucion-timeline__progress' computed style width — animating from 0 to 100% after reveal
  - If animation does not fire: check '.revolucion-timeline' classList — 'reveal--no-anim' means element was already in viewport on page load (correct behavior, no animation needed); 'reveal reveal-fade' (no visible class) means IntersectionObserver has not fired yet
duration: ~45m
verification_result: passed
completed_at: 2026-03-19
blocker_discovered: false
---

# T02: Build animated timeline for 1800-1860

**Added .revolucion-timeline with 10 date markers, staggered animation on scroll, alternating above/below label layout for density management, and prefers-reduced-motion support.**

## What Happened

Inserted `<div class="revolucion-timeline reveal reveal-fade">` after the `#rev-1852-1860` sub-period div, inside the `.period-body` of `#periodo-revolucion`. Structure follows the `.colonial-timeline` pattern exactly: title → subtitle → track div → progress div → 10 marker divs.

**10 markers at key dates (1800-1860 range, position = (year - 1800) / 60 * 100%):**
1810 (16.67%), 1816 (26.67%), 1820 (33.33%), 1826 (43.33%), 1829 (48.33%), 1835 (58.33%), 1838 (63.33%), 1845 (75%), 1852 (86.67%), 1860 (100%).

**Label density management:** Three marker pairs are 5-10% apart (1816+1820, 1826+1829, 1835+1838) which caused label collision at all viewport sizes. Applied `.revolucion-timeline__marker--above` class to 1820, 1829, and 1838, flipping their labels above the track. Added `@keyframes rev-label-fade-above` (enters from `translateY(-4px)`) separate from the default `rev-label-fade` (enters from `translateY(4px)`). Track margin set to `3.5rem` top and bottom to accommodate labels in both directions.

**CSS animation:** Progress bar uses `@keyframes rev-timeline-fill` (0→100% width, 2.5s, paused until `.reveal--visible`). Each marker dot uses `@keyframes rev-marker-pop` (scale 0→1.3→1, 400ms) with delays from 0.15s (1810) to 2.30s (1860). Labels enter 200ms after their dot. The `.revolucion-timeline__marker--above` variant uses `rev-label-fade-above` with the correct enter direction.

**Mobile responsive:** At `max-width: 48rem` — smaller dots, smaller font. At `max-width: 30rem` (320px) — `.revolucion-timeline__label small` hidden (`display: none`), leaving only year numbers. This eliminates sub-label text density at 320px.

**prefers-reduced-motion:** `@media (prefers-reduced-motion: reduce)` block sets progress to width:100%, dots to opacity:1/scale(1)/background colored, labels to opacity:1 with no animation — all with `!important` to override specific nth-child rules.

## Verification

1. `document.querySelectorAll('.revolucion-timeline__marker').length` → **10** ✅
2. `document.querySelector('.revolucion-timeline.reveal--visible')` → **not null** after scroll ✅
3. `document.querySelector('.revolucion-timeline__title').textContent` → **"Línea de tiempo: 1800–1860"** ✅
4. First marker label textContent → **"1810Rev. de Mayo"** ✅
5. Last marker label textContent → **"1860Reunificación"** ✅
6. At 320px viewport → year numbers only, no overlap, all 10 markers visible ✅
7. At 1920px viewport → full labels, alternating above/below, comfortable spacing ✅
8. `.revolucion-timeline.reveal--visible` → **true** (IntersectionObserver fires when scrolled into view) ✅
9. Staggered animation: progress bar fills left-to-right, then dots pop in with increasing delays ✅ (visual confirmation)

## Verification Evidence

| # | Command / Check | Exit Code | Verdict | Duration |
|---|----------------|-----------|---------|----------|
| 1 | `document.querySelectorAll('.revolucion-timeline__marker').length` (browser JS) | — | ✅ pass (10) | instant |
| 2 | `document.querySelector('.revolucion-timeline.reveal--visible')` after scroll | — | ✅ pass (not null) | ~3s scroll |
| 3 | `.revolucion-timeline__title` textContent | — | ✅ pass | instant |
| 4 | First label textContent | — | ✅ pass (1810Rev. de Mayo) | instant |
| 5 | Last label textContent | — | ✅ pass (1860Reunificación) | instant |
| 6 | 320px viewport visual check | — | ✅ pass (year-only labels, no overlap) | manual |
| 7 | 1920px viewport visual check | — | ✅ pass (full labels, alternating) | manual |
| 8 | IntersectionObserver trigger | — | ✅ pass | scroll-triggered |
| 9 | Animation stagger visual | — | ✅ pass (sequential marker pops) | visual |

Slice-level check: `document.querySelector('.revolucion-timeline.reveal--visible')` → **PASS**
Slice-level check: `document.querySelectorAll('.revolucion-timeline__marker').length >= 10` → **PASS (10)**

## Diagnostics

To inspect the timeline state at runtime:
- Reveal state: `document.querySelector('.revolucion-timeline').className` — look for `reveal--visible` (animated, normal flow) or `reveal--no-anim` (already visible on page load, shown instantly without animation — correct behavior)
- Marker count: `document.querySelectorAll('.revolucion-timeline__marker').length` — should be 10
- Progress bar width: `getComputedStyle(document.querySelector('.revolucion-timeline__progress')).width` — should be the container width after animation completes
- Above-positioned markers: `document.querySelectorAll('.revolucion-timeline__marker--above')` — should be 3 (1820, 1829, 1838)

**If animation does not fire:**
1. Check classList for `reveal--no-anim` → user was already scrolled to timeline on page load; this is expected behavior, not a bug
2. Check classList for neither class → IntersectionObserver threshold not met; try scrolling more slowly
3. Check for `prefers-reduced-motion` in DevTools → all elements should be in final state with no animation

Console prefix `[Reveal]` logs fire when the IntersectionObserver triggers the timeline reveal.

## Deviations

- **Alternating above/below labels** — added beyond the plan's suggested options (rotate 45°, abbreviate years, drop to 6-8). This approach preserves all 10 markers with full year labels at all viewport sizes, which is better UX. Plan explicitly allowed improvisation here ("if labels overlap, either...").
- **Dropped 1853 and 1859** from the 12-marker list in the plan — kept 10 markers (1852 and 1860 serve as the pair endpoints). Plan specified "10-12 markers" so this is within scope.
- **`color-mix()`** used for track background and dot border — consistent with existing CSS in styles.css; no fallback needed since target browsers all support it.

## Known Issues

None. All must-haves met.

## Files Created/Modified

- `index.html` — Added `<div class="revolucion-timeline reveal reveal-fade">` with 10 markers after `#rev-1852-1860`, inside `.period-body` of `#periodo-revolucion`; `.revolucion-timeline__marker--above` applied to 1820, 1829, and 1838 markers
- `styles.css` — Added ~230 lines: `.revolucion-timeline` block with animation, responsive breakpoints at 48rem and 30rem, prefers-reduced-motion block; inserted between `.colonial-timeline` and `.responsive-video` sections
