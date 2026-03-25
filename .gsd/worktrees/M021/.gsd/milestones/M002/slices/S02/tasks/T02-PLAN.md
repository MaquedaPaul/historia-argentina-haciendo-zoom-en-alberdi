---
estimated_steps: 4
estimated_files: 2
---

# T02: Add embedded video or CSS animation and responsive media CSS

**Slice:** S02 — Multimedia, imágenes reales y pulido visual
**Milestone:** M002

## Description

Add at least one multimedia element beyond images to the colonial section — either an embedded video (YouTube/Vimeo iframe) about colonial Argentina or a CSS animation (animated timeline, map reveal). Add the responsive CSS needed for iframe embedding since the project doesn't have this yet.

## Steps

1. Search for a suitable short documentary or educational video about colonial Argentina (Spanish language, embeddable, 3-15 minutes). Candidates: Canal Encuentro documentaries, educational animations about the Virreinato or colonial Buenos Aires.
2. If a suitable video is found: add a `<div class="responsive-video">` section after the events grid (or between thematic card groups) with an `<iframe>` embed, a heading, and a brief caption explaining the video's relevance.
3. Add responsive video CSS to `styles.css`: `.responsive-video` with `max-width: 800px`, `margin: auto`, `aspect-ratio: 16/9`, and the iframe filling its container. Include reduced-motion consideration.
4. If no suitable embeddable video is found: create a CSS-animated decorative element — e.g., an animated colonial-period timeline bar spanning 1500-1807 with key date markers that animate in sequence using CSS keyframes, fitting the sepia design palette.

## Must-Haves

- [ ] At least 1 video or CSS animation present in the colonial section
- [ ] Responsive at all viewports (no horizontal overflow)
- [ ] If video: has caption/heading for context
- [ ] If animation: respects `prefers-reduced-motion`
- [ ] New CSS is contained and doesn't affect other sections

## Verification

- Open browser: multimedia element is visible in the colonial section
- Video plays (if iframe) or animation runs (if CSS)
- Resize to 375px: element scales without breaking layout
- Check `styles.css`: responsive media CSS is present (~10-15 lines)

## Inputs

- `index.html` — S01's colonial section with complete card structure
- `styles.css` — Existing styles (no iframe/video CSS yet)

## Expected Output

- `index.html` — Multimedia element added to colonial section
- `styles.css` — Responsive video/animation CSS added (~10-20 lines)

## Observability Impact

- **New CSS animation signals:** The `.colonial-timeline` element animates on scroll via the existing IntersectionObserver (`reveal--visible` class). Progress bar fills over 2.5s, markers pop in staggered sequence. If animation doesn't play, check that `.reveal--visible` was applied.
- **Inspection surface:** DevTools → Elements → `.colonial-timeline` should have the `.reveal--visible` class when scrolled into view. The `.colonial-timeline__progress` bar width should be `100%` after animation completes.
- **Failure visibility:** If the timeline doesn't render, the `.colonial-timeline` container still shows as a card with title/subtitle (graceful degradation). The `prefers-reduced-motion` media query skips all animations — markers and progress bar are shown at final state immediately.
- **Responsive video wrapper:** The `.responsive-video` CSS class is ready for iframe embeds but currently unused. No runtime signal for this — it's infrastructure CSS.
