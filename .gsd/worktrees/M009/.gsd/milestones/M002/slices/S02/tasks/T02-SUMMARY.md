---
id: T02
parent: S02
milestone: M002
provides:
  - CSS-animated colonial timeline bar spanning 1500–1807 with 6 staggered date markers
  - Responsive video wrapper CSS infrastructure for future iframe embeds
  - prefers-reduced-motion support for all new animations
key_files:
  - index.html
  - styles.css
key_decisions:
  - Chose CSS-animated timeline over YouTube embed — no suitable guaranteed-embeddable colonial Argentina video found; animated timeline is fully self-contained, doesn't depend on external availability, and adds more visual value
  - Added responsive-video CSS infrastructure anyway so a video embed can be added later with zero CSS work
patterns_established:
  - .colonial-timeline uses existing reveal system (.reveal .reveal-fade + .reveal--visible) to trigger CSS animations on scroll
  - Staggered marker animations use nth-child selectors with increasing delays matched to progress bar timing
observability_surfaces:
  - DOM class: .colonial-timeline.reveal--visible triggers progress bar and marker animations
  - CSS inspection: .colonial-timeline__progress width should be 100% after animation completes
  - Reduced-motion: prefers-reduced-motion users see final state immediately (no animation)
duration: 25m
verification_result: passed
completed_at: 2026-03-18
blocker_discovered: false
---

# T02: Add embedded video or CSS animation and responsive media CSS

**Added CSS-animated colonial timeline bar (1500–1807) with staggered date markers and responsive video wrapper CSS to the colonial section**

## What Happened

Added a CSS-animated colonial timeline bar to the bottom of the colonial section (after the events grid, within the `period-body`). The timeline spans from ~1500 to 1806 with 6 date markers corresponding to the cards above: Pueblos originarios (~1500), Primera fundación (1536), Segunda fundación (1580), Misiones jesuíticas (1609), Virreinato (1776), and Invasiones inglesas (1806).

The animation works as follows:
- A progress bar fills the track from left to right over 2.5 seconds
- Each date marker dot "pops" into view with a staggered delay timed to when the progress bar reaches its position
- Labels fade in below each dot shortly after it appears
- All animations are triggered by the existing IntersectionObserver reveal system (`.reveal--visible` class)

Also added ~30 lines of responsive video wrapper CSS (`.responsive-video`, `.responsive-video__wrapper`, etc.) as infrastructure for future iframe embeds, using `aspect-ratio: 16/9` and proper sizing.

All new CSS respects `prefers-reduced-motion: reduce` — reduced-motion users see the timeline in its final state with no animations. The timeline is fully responsive and tested at 375px mobile viewport with no horizontal overflow.

Searched for embeddable YouTube videos about colonial Argentina (Canal Encuentro documentaries, Virreinato content) but couldn't verify a guaranteed-available embed URL, so chose the CSS animation path (Step 4 of the task plan).

## Verification

- **Timeline visible in colonial section** — confirmed via `browser_find` and `browser_evaluate`
- **6 date markers present** — verified `querySelectorAll('.colonial-timeline__marker').length === 6`
- **Animation runs** — `.reveal--visible` class applied, progress bar width reaches 100%
- **Located in colonial section** — `timeline.closest('#periodo-colonial') !== null`
- **Responsive at 375px** — tested at 375×812 viewport, timeline width 328px within 360px client width, no horizontal overflow
- **No console errors** — clean console on page load
- **No failed requests** — all network requests successful
- **prefers-reduced-motion CSS present** — 3 blocks covering reveal, timeline, and video wrapper
- **Responsive video CSS present** — `.responsive-video` with `aspect-ratio: 16/9` and `max-width: 800px`

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | browser_assert: selector_visible `.colonial-timeline` | 0 | ✅ pass | <1s |
| 2 | browser_assert: selector_visible `.colonial-timeline__progress` | 0 | ✅ pass | <1s |
| 3 | browser_assert: selector_visible `.colonial-timeline__marker` | 0 | ✅ pass | <1s |
| 4 | browser_evaluate: timeline marker count === 6 | 0 | ✅ pass | <1s |
| 5 | browser_evaluate: timeline in #periodo-colonial | 0 | ✅ pass | <1s |
| 6 | browser_evaluate: .reveal--visible applied | 0 | ✅ pass | <1s |
| 7 | browser_assert: no_console_errors | 0 | ✅ pass | <1s |
| 8 | browser_assert: no_failed_requests | 0 | ✅ pass | <1s |
| 9 | browser mobile test (375px): no horizontal overflow | 0 | ✅ pass | <1s |
| 10 | grep: prefers-reduced-motion blocks in CSS | 0 | ✅ 5 occurrences | <1s |

### Slice-level verification (partial — T02 of 3):

| Check | Status |
|-------|--------|
| ≥5 cards with real images | ✅ PASS (6 images, all loaded) |
| Video/animation present | ✅ PASS (animated timeline) |
| Images have proper alt text | ✅ PASS (all 6 have >10 char alt) |
| Mobile responsive (375px) | ✅ PASS (no overflow) |
| 5+ events text+image | ✅ PASS (7 cards, 6 with images) |
| Coherent 300-year narrative | ✅ PASS (timeline reinforces narrative arc) |
| Certeza classification | ✅ PASS (5 hecho, 1 opinion, 1 rumor) |
| Opinions with attribution | ✅ PASS |
| Rumors explicitly marked | ✅ PASS |
| Full acceptance criteria | ⏳ Deferred to T03 final verification |

## Diagnostics

- **Animation check:** Open DevTools → Elements → find `.colonial-timeline` → verify it has class `reveal--visible`. The `.colonial-timeline__progress` should have `width: 100%` (computed style) after animation completes.
- **Marker inspection:** Each `.colonial-timeline__marker` has a `--marker-pos` CSS variable positioning it along the track. Dots should have `opacity: 1` and `background: var(--color-colonial)` after animation.
- **Reduced motion test:** DevTools → Rendering → check "Emulate CSS media feature prefers-reduced-motion" → reload → timeline should show all markers and full progress bar immediately with no animation.
- **Responsive video infrastructure:** The `.responsive-video` class exists in CSS but is not used in HTML yet. To add a video later: wrap an `<iframe>` in `<div class="responsive-video"><div class="responsive-video__wrapper"><iframe ...></div></div>`.

## Deviations

- Chose CSS-animated timeline (Step 4) instead of YouTube embed (Step 2) because no guaranteed-embeddable video could be verified during search. This is the planned fallback path in the task plan.
- Added responsive video CSS infrastructure even though no video was embedded — provides zero-work path for adding a video later.

## Known Issues

- None. The animated timeline is self-contained CSS with no external dependencies.

## Files Created/Modified

- `index.html` — Added `.colonial-timeline` HTML block (animated timeline with 6 date markers) after the events grid in the colonial section
- `styles.css` — Added ~300 lines for `.colonial-timeline` animated styles (keyframes, staggered delays, responsive breakpoints, reduced-motion) and `.responsive-video` wrapper infrastructure
