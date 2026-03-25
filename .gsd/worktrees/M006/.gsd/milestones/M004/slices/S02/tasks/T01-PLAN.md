---
estimated_steps: 6
estimated_files: 2
---

# T01: Nacional timeline HTML + CSS

**Slice:** S02 — Timeline animada 1860–1900 + verificación final
**Milestone:** M004

## Description

Add a `.nacional-timeline` animated element inside `#periodo-nacional` with 7 date markers spanning 1860–1900. The element follows the proven `.colonial-timeline` / `.revolucion-timeline` pattern: a horizontal track with a progress bar that fills on scroll, dots that pop in staggered sequence, and year labels that fade in. No new JS needed — the reveal system auto-discovers `.reveal .reveal-fade` elements.

## Steps

1. In `index.html`, insert the `.nacional-timeline` div inside `#periodo-nacional .period-body`, between the `.period-intro` and the `.events-grid--certeza`. Structure: outer div with `.nacional-timeline.reveal.reveal-fade`, h3 title, p subtitle, inner `.nacional-timeline__track` with `.nacional-timeline__progress` bar and 7 `.nacional-timeline__marker` elements.
2. Calculate marker positions as `(year - 1860) / 40 * 100%`: 1862→5%, 1865→12.5%, 1878→45%, 1880→50%, 1884→60%, 1890→75%, 1900→100%. Set each via `style="--marker-pos: X%"`.
3. Each marker contains: `.nacional-timeline__dot` span and `.nacional-timeline__label` with year + `<small>` sublabel (short event name, e.g., "Mitre", "Paraguay", "Desierto", "Roca", "Alberdi †", "Crisis", "Fin de siglo").
4. In `styles.css`, add `.nacional-timeline` block (~80-100 lines) scoped entirely to that class. Copy the structural pattern from `.colonial-timeline`: track flex layout, progress bar keyframes, dot animation with nth-child stagger (200ms, 400ms, ... per marker), label fade keyframes. Adjust progress bar timing for 7 markers instead of 7 colonial markers (same count — may reuse identical timings).
5. Add `@media (prefers-reduced-motion: reduce)` block that sets progress bar to full width and all dots/labels to final opacity with no animation.
6. Check if alternating above/below labels are needed (D025 pattern). With markers at 5%, 12.5%, 45%, 50%, 60%, 75%, 100% — the 45%/50%/60% cluster (1878/1880/1884) is the tightest. If labels overlap visually, apply `--above` modifier to 1880. Verify at 375px mobile.

## Must-Haves

- [ ] `.nacional-timeline` element with 7 markers at correct positions
- [ ] Progress bar fills left-to-right on `.reveal--visible`
- [ ] Dots pop in staggered sequence
- [ ] Labels fade in after dots
- [ ] `prefers-reduced-motion` sets final state with no animation
- [ ] No JS modifications — reveal system auto-discovers

## Verification

- `document.querySelector('.nacional-timeline') !== null`
- `document.querySelectorAll('.nacional-timeline__marker').length === 7`
- Scroll to section from page top — animation fires
- At 375px: no horizontal overflow, labels readable or condensed

## Inputs

- `index.html` — S01's stable `#periodo-nacional .period-body` structure
- `styles.css` — existing `.colonial-timeline` pattern (lines ~1184-1430) as CSS template
- KNOWLEDGE.md — reveal system behavior (`reveal--visible` vs `reveal--no-anim`)

## Expected Output

- `index.html` — `.nacional-timeline` div inserted inside `#periodo-nacional .period-body`
- `styles.css` — ~80-100 lines of `.nacional-timeline` scoped CSS appended
