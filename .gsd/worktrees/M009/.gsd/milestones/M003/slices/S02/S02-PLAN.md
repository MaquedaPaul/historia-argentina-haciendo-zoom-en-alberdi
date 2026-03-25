# S02: Sub-navigation, animated timeline, expand/collapse interactivity, and responsive verification

**Goal:** Add the three interactive features that elevate `#periodo-revolucion` from a long card list to a navigable, animated, detailed reading experience — then verify everything works at all viewports and all acceptance criteria pass.

**Demo:** Open `index.html`, scroll to `#periodo-revolucion`. A sticky sub-navigation bar shows 4 sub-period links that highlight as you scroll. The 1800-1860 animated timeline fires with staggered markers when scrolling past. Major event cards have an "expand" toggle revealing additional detail. Everything works at 320px and 1920px+. All 10 M003 acceptance criteria pass.

## Must-Haves

- Sub-navigation component (`<nav class="sub-nav">`) with 4 anchor links targeting sub-period IDs
- JS scroll tracking: a second Intersection Observer that updates active sub-nav link based on visible sub-period
- Animated timeline for 1800-1860 (`<div class="revolucion-timeline">`) extending the colonial timeline pattern with 10-12 date markers
- Expand/collapse toggle on at least 4 major event cards (Revolución de Mayo, Gen. del 37 exile, Bases, Constitución 1853)
- Responsive CSS for sub-nav, timeline, and expand/collapse at mobile (320px) and desktop (1920px+)
- `prefers-reduced-motion` blocks for all new animations
- Final verification of all 10 M003-CONTEXT acceptance criteria

## Proof Level

- This slice proves: final-assembly (all interactive elements integrated with all content, verified at multiple viewports)
- Real runtime required: yes (browser at 320px and 1920px+)
- Human/UAT required: yes (narrative flow, timeline readability, expand/collapse UX)

## Verification

- `document.querySelectorAll('.sub-nav a').length === 4` — sub-nav has 4 links
- Sub-nav active link updates on scroll (manual check)
- `document.querySelector('.revolucion-timeline.reveal--visible')` — timeline triggers on scroll
- `document.querySelectorAll('.revolucion-timeline__marker').length >= 10` — timeline markers present
- `document.querySelectorAll('.card-expand-toggle').length >= 4` — expand toggles on major cards
- Click an expand toggle → hidden content becomes visible; click again → it collapses
- At 320px viewport: sub-nav is scrollable or wraps; timeline is readable; cards stack vertically
- At 1920px viewport: sub-nav is centered; timeline has comfortable spacing; cards in 3-column grid
- `prefers-reduced-motion`: animations are replaced with instant final state (inspect via DevTools emulation)
- All 10 acceptance criteria from M003-CONTEXT.md verified (checklist walkthrough)

## Observability / Diagnostics

- Runtime signals: Console `[SubNav]` logs for active sub-period tracking; `[Reveal]` logs for timeline animation trigger
- Inspection surfaces: `.sub-nav a.sub-nav--active` for current sub-period; `.revolucion-timeline.reveal--visible` for timeline state; `.card-detail--expanded` for expanded cards
- Failure visibility: Sub-nav active state not updating → check Intersection Observer thresholds; Timeline not animating → check `.reveal--visible` class; Expand toggle not working → check event listener binding
- Redaction constraints: none

## Integration Closure

- Upstream surfaces consumed: Sub-period `<div>` wrappers with IDs from S01, card structure from S01, `.reveal` class system from app.js, `.colonial-timeline` CSS pattern from styles.css
- New wiring introduced in this slice: Second Intersection Observer for sub-nav scroll tracking, expand/collapse event listeners, `.revolucion-timeline` CSS animation set
- What remains before the milestone is truly usable end-to-end: nothing — this slice completes M003

## Tasks

- [x] **T01: Build sub-navigation component with scroll tracking** `est:40m`
  - Why: The sub-nav lets users jump between sub-periods and shows their current position within the section. This is a new UI pattern for the project — needs a new Intersection Observer with different thresholds than the main scroll spy.
  - Files: `index.html`, `styles.css`, `app.js`
  - Do: Add `<nav class="sub-nav" aria-label="Sub-períodos">` after the period intro in `#periodo-revolucion` with 4 anchor links. CSS: sticky positioning within the section, horizontal layout with scroll on mobile, active state styling using period accent color. JS: new Intersection Observer targeting `.sub-period` elements with `rootMargin: '0px 0px -70% 0px'` (trigger when sub-period enters top 30%). Update `.sub-nav--active` class on the corresponding link. Ensure it doesn't conflict with the main scroll spy Observer.
  - Verify: Click each sub-nav link → smooth scroll to sub-period. Scroll through section → active link updates. At 320px → sub-nav is usable (scrollable or wrapping).
  - Done when: Sub-nav renders, links work, active state tracks scroll position, responsive at 320px and 1920px

- [x] **T02: Build animated timeline for 1800-1860** `est:45m`
  - Why: The colonial section has a CSS-animated timeline (1500-1807); the revolucion section needs one for 1800-1860. This extends the proven `.colonial-timeline` pattern but with denser markers (10-12 vs. 6).
  - Files: `index.html`, `styles.css`
  - Do: Add `<div class="revolucion-timeline reveal reveal-fade">` after the last sub-period's card grid. Clone the `.colonial-timeline` CSS pattern but with new class names (`.revolucion-timeline`, `.revolucion-timeline__track`, `.revolucion-timeline__marker`, etc.). Place 10-12 markers at key dates: 1810, 1816, 1820, 1826, 1829, 1835, 1838, 1845, 1852, 1853, 1859, 1860. Use `--marker-pos` CSS custom property for positioning (percentage of 1800-1860 range). Stagger marker appearance with nth-child animation-delay. Add `prefers-reduced-motion` block. On mobile (< 768px), consider vertical orientation or smaller labels if horizontal is too dense.
  - Verify: Scroll to timeline → animation fires with staggered markers. At 320px → markers are readable and don't overlap. `document.querySelectorAll('.revolucion-timeline__marker').length >= 10`.
  - Done when: Timeline animates on scroll, all markers visible, readable at 320px and 1920px

- [x] **T03: Add expand/collapse toggle for detailed event cards** `est:35m`
  - Why: Major events deserve more detail than can fit in the initial card view. Expand/collapse lets users read extended content without overwhelming the scrolling experience. This is new JS interactivity for the project.
  - Files: `index.html`, `styles.css`, `app.js`
  - Do: On 4+ major event cards (Revolución de Mayo, Gen. del 37 exile, Alberdi's Bases, Constitución 1853), add a `<div class="card-detail">` section with additional content (2-3 more sentences, additional quotes or context) and a `<button class="card-expand-toggle">` to show/hide it. CSS: `.card-detail` hidden by default (`max-height: 0; overflow: hidden; transition`); `.card-detail--expanded` shows content (`max-height: none`). JS: event delegation on `#periodo-revolucion` for `.card-expand-toggle` clicks — toggle `.card-detail--expanded` on sibling `.card-detail`, update button text ("Ver más" / "Ver menos"). Ensure expanded content doesn't break reveal system (already-revealed cards won't re-trigger). Add `prefers-reduced-motion` for expand transition.
  - Verify: Click "Ver más" → detail expands smoothly. Click again → collapses. Scroll away and back → card stays in same state. At 320px → expand still works correctly. `document.querySelectorAll('.card-expand-toggle').length >= 4`.
  - Done when: Expand/collapse works on 4+ cards, smooth transition, doesn't break reveal, responsive

- [x] **T04: Final verification of all M003 acceptance criteria** `est:25m`
  - Why: The milestone has 10 specific acceptance criteria from M003-CONTEXT.md plus 10 success criteria from the roadmap. This task walks through each one in the browser and documents the result.
  - Files: `.gsd/milestones/M003/slices/S02/S02-SUMMARY.md`
  - Do: Open `index.html` in browser. Walk through each acceptance criterion systematically at desktop (1200px) and mobile (375px): (1) ≥12 events with detailed content, (2) each has text + multimedia, (3) Alberdi present as thread not protagonist, (4) narrative connects events, (5) sub-nav functional, (6) ≥2 interactive animations (timeline + expand/collapse), (7) all facts verified + classified, (8) opinions with exact citation, (9) rumors marked explicitly, (10) sources documented. Document PASS/FAIL for each with evidence. If any fail, fix them before marking done.
  - Verify: All 10 criteria PASS at both desktop and mobile viewpoints
  - Done when: All acceptance criteria verified and documented, any failures resolved

## Files Likely Touched

- `index.html` — sub-nav component, timeline HTML, expand/collapse markup on 4+ cards
- `styles.css` — sub-nav styles (~50 lines), revolucion-timeline animation (~120 lines), expand/collapse styles (~40 lines), responsive adjustments (~30 lines)
- `app.js` — sub-nav scroll tracking Observer (~40 lines), expand/collapse event delegation (~25 lines)
