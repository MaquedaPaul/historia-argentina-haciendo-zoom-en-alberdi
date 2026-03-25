---
id: T01
parent: S02
milestone: M004
provides:
  - Nacional timeline HTML with 7 date markers at calculated positions across the 1860–1900 span
  - Scoped CSS keyframes for progress bar fill, dot pop, and label fade animations
  - prefers-reduced-motion final-state block
  - Reveal system integration (auto-discovered via .reveal .reveal-fade classes)
key_files:
  - index.html
  - styles.css
key_decisions:
  - Applied --above modifier to 1880 marker to prevent overlap with 1878 (45%/50% cluster)
  - Used nth-child(2)–nth-child(8) selectors because __progress div is first child of __track
  - Reused identical timing pattern as colonial-timeline (7 markers, 2.5s fill, 0.15s–2.3s stagger)
  - Scoped all keyframes with nac- prefix (nac-timeline-fill, nac-marker-pop, nac-label-fade, nac-label-fade-above)
patterns_established:
  - Third timeline variant following colonial/revolucion pattern; selector offsets start at nth-child(2) due to __progress being first child
observability_surfaces:
  - .nacional-timeline.reveal--visible confirms animation fired on scroll
  - .nacional-timeline.reveal--no-anim means element was in-viewport on load (correct catch-up behavior)
  - document.querySelectorAll('.nacional-timeline__marker').length === 7 verifies marker count
  - [Reveal] Initialized with 52 elements confirms new reveal element added (was 51)
duration: ~25m
verification_result: passed
completed_at: 2026-03-19
blocker_discovered: false
---

# T01: Nacional timeline HTML + CSS

**Added animated 1860–1900 `.nacional-timeline` with 7 date markers, scoped CSS keyframes, and reveal system auto-discovery — visible and animating at both 1200px desktop and 375px mobile with no horizontal overflow.**

## What Happened

Inserted `.nacional-timeline.reveal.reveal-fade` div inside `#periodo-nacional .period-body` between the `.period-intro` and `.events-grid--certeza`, following the exact pattern of `.colonial-timeline` and `.revolucion-timeline`.

**HTML (index.html):** The structure is: outer div with title/subtitle, inner `.nacional-timeline__track` containing `.nacional-timeline__progress` plus 7 `.nacional-timeline__marker` divs. Each marker has a `.nacional-timeline__dot` span and `.nacional-timeline__label` span (year + `<small>` sublabel). Marker positions computed as `(year - 1860) / 40 * 100%`: 1862→5%, 1865→12.5%, 1878→45%, 1880→50%, 1884→60%, 1890→75%, 1900→100%. The 1880 marker uses the `--above` modifier since 45%/50% is a tight cluster — its label appears above the track to avoid overlap with 1878.

**CSS (styles.css, ~230 lines appended):** Scoped entirely to `.nacional-timeline`. Includes: container layout, progress bar with `nac-timeline-fill` keyframe (0→100% width, plays on `.reveal--visible`), dot animation `nac-marker-pop` with nth-child(2)–(8) stagger delays (0.15s to 2.30s), label fade with `nac-label-fade` (downward) and `nac-label-fade-above` (upward for the `--above` marker). Responsive blocks at `max-width: 48rem` condense sizing, and `max-width: 30rem` hides sublabels. `prefers-reduced-motion` block sets all elements to final state (progress at 100%, dots visible with `--color-nacional`, labels opaque) with no animation.

**No JS changes needed.** The reveal system auto-discovered the new element; console showed `[Reveal] Initialized with 52 elements` (was 51) and `[Reveal] Revealed: div.nacional-timeline.reveal--visible` on scroll.

## Verification

Ran in-browser DOM queries and visual inspection:

1. `document.querySelector('.nacional-timeline') !== null` → `true`
2. `document.querySelectorAll('.nacional-timeline__marker').length === 7` → `true`
3. `document.querySelector('.nacional-timeline').classList.contains('reveal')` → `true`
4. `.nacional-timeline.reveal--visible` class present after scrolling into view → `true`
5. `document.querySelector('#periodo-nacional .events-grid--certeza') !== null` → `true`
6. All 7 marker positions verified: `["5%","12.5%","45%","50%","60%","75%","100%"]`
7. No horizontal overflow at 375px: `body.scrollWidth === body.clientWidth` (360px), timeline right edge 344px
8. No console errors — only expected `[DEBUG]` signals from ScrollSpy, Reveal, SubNav, Expand, Images
9. Visual screenshot at 1200px: progress bar filled, dots on track, 1880 "Roca" above, all sublabels readable
10. Visual screenshot at 375px: year labels visible, sublabels hidden (correct), no overflow

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `document.querySelector('.nacional-timeline') !== null` | — | ✅ pass | <1s |
| 2 | `document.querySelectorAll('.nacional-timeline__marker').length === 7` | — | ✅ pass | <1s |
| 3 | `.nacional-timeline.classList.contains('reveal')` | — | ✅ pass | <1s |
| 4 | `.nacional-timeline.classList.contains('reveal--visible')` after scroll | — | ✅ pass | ~1.5s |
| 5 | `document.querySelector('#periodo-nacional .events-grid--certeza') !== null` | — | ✅ pass | <1s |
| 6 | No horizontal overflow at 375px (`body.scrollWidth > body.clientWidth`) | — | ✅ pass | <1s |
| 7 | No console errors (only [DEBUG] entries) | — | ✅ pass | — |
| 8 | Visual: desktop 1200px screenshot — timeline renders with all 7 markers, above/below labels correct | — | ✅ pass | — |
| 9 | Visual: mobile 375px screenshot — years readable, sublabels hidden, no overflow | — | ✅ pass | — |

## Diagnostics

- `document.querySelector('.nacional-timeline').classList` — should include `reveal reveal-fade reveal--visible` (or `reveal--no-anim` if loaded in-viewport)
- `document.querySelectorAll('.nacional-timeline__marker').length` — should be 7
- Computed style `animation-play-state` on `.nacional-timeline__progress` — `running` when `reveal--visible` is present
- Console: `[Reveal] Initialized with 52 elements` (one more than before) and `[Reveal] Revealed: div.nacional-timeline.reveal--visible` on scroll confirm correct integration

## Deviations

None. All steps executed exactly as planned. The `--above` modifier for 1880 was anticipated in the plan (Step 6) and applied as expected given the 45%/50% cluster density confirmed visually.

## Known Issues

None.

## Files Created/Modified

- `index.html` — Inserted `.nacional-timeline` div (80 lines) inside `#periodo-nacional .period-body` between `.period-intro` and `.events-grid--certeza`
- `styles.css` — Appended `.nacional-timeline` scoped CSS block (~230 lines) with keyframes, stagger delays, responsive breakpoints, and prefers-reduced-motion
