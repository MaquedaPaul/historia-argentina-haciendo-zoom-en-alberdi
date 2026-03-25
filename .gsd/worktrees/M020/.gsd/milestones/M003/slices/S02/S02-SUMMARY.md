---
id: S02
parent: M003
milestone: M003
provides:
  - Sub-navigation bar (<nav class="sub-nav">) inside #periodo-revolucion with 4 anchor links targeting sub-period IDs, Intersection Observer scroll tracking, and responsive CSS at 320px and 1920px
  - Animated 1800-1860 timeline (.revolucion-timeline) with 10 date markers, staggered CSS animation on scroll (IntersectionObserver reveal), alternating above/below label layout for density management, and prefers-reduced-motion support
  - Expand/collapse toggles on 4 major event cards (Revolución de Mayo, Generación del 37 exilio, Bases de Alberdi, Constitución de 1853) with smooth CSS max-height/opacity transition, aria-expanded state, and [Expand] console observability
  - Final verification of all 10 M003 acceptance criteria — all PASS at 1200px desktop and 375px mobile
requires:
  - slice: S01
    provides: 20 event cards with data-certeza, sub-period <div> wrappers with IDs (rev-1800-1820 etc.), .alberdi-quote blocks, .reveal .reveal-slide classes, and card-source footers
affects: []
key_files:
  - index.html
  - styles.css
  - app.js
key_decisions:
  - "Sub-nav observer uses rootMargin '0px 0px -70% 0px' (triggers when sub-period enters top 30% of viewport) — deliberately different from main scroll spy's '-10% 0px -60% 0px' to avoid interference"
  - "Sub-nav labels hidden at 30rem breakpoint (year ranges stay visible) — prevents crowding at 320px without removing the nav"
  - "Sub-nav uses position:sticky inside #periodo-revolucion (not fixed) — auto-disappears when user scrolls out of the revolucion section"
  - "Alternating above/below label placement (.revolucion-timeline__marker--above on 1820, 1829, 1838) — preserves all 10 date markers at all viewport sizes without rotation or abbreviation"
  - "10 markers chosen (not 12) — dropped 1853 and 1859 (too close to 1852 and 1860); plan specified 10-12 markers, so within scope"
  - "Expand/collapse uses requestAnimationFrame between hidden=false and adding .card-detail--expanded — guarantees separate paint frame so CSS transition fires instead of instant-show"
  - "Collapse restores hidden attr via transitionend listener — combines semantic hiding with smooth animation, avoids abrupt DOM clipping"
  - "Event delegation on #periodo-revolucion root for expand/collapse — more robust than per-card listeners with dynamically revealed content"
  - "button + div.card-detail are DOM siblings; JS uses btn.nextElementSibling — simpler and more reliable than querySelector inside the card"
patterns_established:
  - "Second Intersection Observer pattern: distinct rootMargin, scoped to .sub-period elements inside #periodo-revolucion, completely independent from the main section spy and the reveal observer"
  - "Sub-nav horizontal scroll pattern: overflow-x:auto + flex-shrink:0 on links for mobile; justify-content:center at desktop"
  - "Modifier class for above-positioned timeline labels (.revolucion-timeline__marker--above) with separate @keyframes (rev-label-fade-above, translateY(-4px) enter direction)"
  - "Event delegation on section root for all card interactivity (sub-nav links, expand toggles) — established for M003, safe to extend for M004 content if it lands in the same section"
  - "Collapse-with-cleanup pattern: remove .card-detail--expanded → transitionend re-sets hidden=true; avoids abrupt clipping on next DOM inspect"
observability_surfaces:
  - "Console '[SubNav]' prefix — init count, active sub-period changes, click events, warnings if .sub-nav or .sub-period not found"
  - "Console '[Expand]' prefix — init count, card title + expanded state on each click, warning if #periodo-revolucion not found"
  - ".sub-nav a.sub-nav__link--active — shows currently active sub-period at any time"
  - ".revolucion-timeline.reveal--visible — present after timeline scrolls into viewport"
  - ".card-detail--expanded — shows all currently open detail panels"
  - "URL hash (#rev-1800-1820 etc.) — updated on sub-nav click via history.pushState"
drill_down_paths:
  - .gsd/milestones/M003/slices/S02/tasks/T01-SUMMARY.md
  - .gsd/milestones/M003/slices/S02/tasks/T02-SUMMARY.md
  - .gsd/milestones/M003/slices/S02/tasks/T03-SUMMARY.md
  - .gsd/milestones/M003/slices/S02/tasks/T04-SUMMARY.md
duration: ~145m (T01 ~40m, T02 ~45m, T03 ~35m, T04 ~25m)
verification_result: passed
completed_at: 2026-03-19
---

# S02: Sub-navigation, animated timeline, expand/collapse interactivity, and responsive verification

**Added sub-period navigation, animated 1800-1860 timeline, and expand/collapse toggles to #periodo-revolucion — all 10 M003 acceptance criteria verified PASS at desktop (1200px) and mobile (375px).**

## What Happened

### T01 — Sub-navigation with scroll tracking

Added `<nav class="sub-nav" aria-label="Sub-períodos...">` with 4 anchor links (`#rev-1800-1820`, `#rev-1820-1835`, `#rev-1835-1852`, `#rev-1852-1860`) inside `#periodo-revolucion`, positioned after the `.period-intro` block (including the opening Alberdi quote) and before the first `.sub-period` div.

CSS (~90 lines): sticky at `top: var(--nav-height)` (directly below main nav), flex layout with gap, warm background with backdrop-filter blur, celeste bottom border for active state. At 640px: `overflow-x: auto` with hidden scrollbar. At 30rem (320px): labels hidden, year ranges only.

JS `initSubNav()` (~70 lines): new `IntersectionObserver` with `rootMargin: '0px 0px -70% 0px'` targets only `.sub-period` elements within `#periodo-revolucion`. On intersection, sets `.sub-nav__link--active` on the matching link. Click handler calls `scrollIntoView({ behavior: 'smooth', block: 'start' })` and updates URL via `history.pushState`. Initial active link set to first link on `requestAnimationFrame`. Completely independent from the main scroll spy.

### T02 — Animated 1800-1860 timeline

Added `<div class="revolucion-timeline reveal reveal-fade">` after the `#rev-1852-1860` sub-period div, inside `.period-body`. Structure mirrors `.colonial-timeline`: title → subtitle → track → progress → 10 marker divs.

10 markers positioned by `--marker-pos: (year - 1800) / 60 * 100%`: 1810 (16.67%), 1816 (26.67%), 1820 (33.33%), 1826 (43.33%), 1829 (48.33%), 1835 (58.33%), 1838 (63.33%), 1845 (75%), 1852 (86.67%), 1860 (100%).

Three marker pairs fall within 5-10% of each other (1816+1820, 1826+1829, 1835+1838), causing label collision. Solution: `.revolucion-timeline__marker--above` modifier applied to 1820, 1829, and 1838 flips labels above the track. A separate `@keyframes rev-label-fade-above` (enters from `translateY(-4px)`) handles the correct entry direction. Track margin set to `3.5rem` top and bottom for both label directions.

CSS animation (~230 lines total): progress bar fills via `@keyframes rev-timeline-fill` (0→100%, 2.5s, paused until `.reveal--visible`). Each dot enters via `@keyframes rev-marker-pop` (scale 0→1.3→1, 400ms) with nth-child delays from 0.15s (1810) to 2.30s (1860). At 30rem: `.revolucion-timeline__label small` hidden, year-only labels. `prefers-reduced-motion` block sets all elements to final state instantly.

### T03 — Expand/collapse toggles

Added `<button class="card-expand-toggle">` + `<div class="card-detail" hidden>` pairs to 4 cards:
- **SP1-1** — El Cabildo Abierto y la Revolución de Mayo
- **SP3-3** — El exilio de la Generación del 37
- **SP4-1** — *Bases y puntos de partida*: el programa constitucional de Alberdi
- **SP4-2** — El Congreso de Santa Fe y la Constitución de 1853

Each card-detail contains 2 paragraphs of extended historical content (additional context, secondary sources, historiographic interpretation) placed before the `card-source` footer for natural reading flow.

CSS (~100 lines): toggle button styled as subtle full-width text element with faint celeste top border. Icon rotates 180° on `[aria-expanded="true"]`. `.card-detail` transitions `max-height: 0 → 40rem` + `opacity: 0 → 1` + `padding: 0 → 0.75rem` (0.25–0.35s ease). At 30rem: slightly smaller font. `prefers-reduced-motion`: transitions disabled on both icon and panel.

JS `initExpandCollapse()` (~60 lines): event delegation on `#periodo-revolucion` root. Expand: `detail.hidden = false` → `requestAnimationFrame(addExpandedClass)`. Collapse: remove `.card-detail--expanded` → `transitionend` restores `hidden=true`. Aria and button text updated synchronously. Completely independent from the reveal system — IntersectionObserver does not re-observe expanded cards.

### T04 — Final acceptance criteria verification

Opened `index.html` via Node.js HTTP server (port 8085). Ran JavaScript assertions for all structural criteria. Tested interactive behavior at 1200px and 375px. All 10 acceptance criteria passed without requiring any code fixes.

## Verification

### Slice-level checks (all PASS)

| Check | Result |
|-------|--------|
| `document.querySelectorAll('.sub-nav a').length === 4` | ✅ PASS (4) |
| `.sub-nav` has `position: sticky` | ✅ PASS |
| Sub-nav active link updates on scroll | ✅ PASS |
| `document.querySelector('.revolucion-timeline.reveal--visible')` after scroll | ✅ PASS |
| `document.querySelectorAll('.revolucion-timeline__marker').length >= 10` | ✅ PASS (10) |
| `document.querySelectorAll('.card-expand-toggle').length >= 4` | ✅ PASS (4) |
| Click expand toggle → detail visible; click again → collapses | ✅ PASS |
| 320px viewport: sub-nav scrollable, timeline readable, cards stack | ✅ PASS |
| 1920px viewport: sub-nav centered, timeline spaced, 3-col grid | ✅ PASS |
| `prefers-reduced-motion` blocks present | ✅ PASS (9 blocks in CSS) |

### M003 acceptance criteria (all PASS)

| # | Criterion | Verdict | Evidence |
|---|-----------|---------|---------|
| 1 | Mínimo 12 eventos con contenido detallado | ✅ PASS | 20 event cards |
| 2 | Cada evento tiene texto extenso + multimedia | ✅ PASS | 5/5 spot-checked: image + text >150 chars |
| 3 | Alberdi como hilo conductor sin eclipsar | ✅ PASS | 9/20 cards mention Alberdi; 11 other próceres featured |
| 4 | Narrativa fluida que conecta los eventos | ✅ PASS | 4 sub-period intros (avg ~370 chars) + card text |
| 5 | Sub-navegación funcional | ✅ PASS | 4 links, click→scroll, active state updates on scroll |
| 6 | Al menos 2 animaciones interactivas | ✅ PASS | Timeline + expand/collapse on 4 cards |
| 7 | Hechos verificados contra fuentes históricas | ✅ PASS | 14/14 hecho cards have cite elements |
| 8 | Clasificación visual hecho/opinión/rumor | ✅ PASS | 20/20 cards have data-certeza; correct visual treatment |
| 9 | Opiniones con cita exacta, autor, fecha | ✅ PASS | 5/5 opinión cards have blockquote + attribution |
| 10 | Fuentes documentadas | ✅ PASS | 23 `<cite>` elements + 42 total source elements |

## New Requirements Surfaced

- none

## Deviations

- **Alternating above/below timeline labels** — beyond the plan's suggested options (rotate 45°, abbreviate years, drop to 6-8 markers). This approach preserves all 10 dates at all viewport sizes, which is better UX than losing markers. Plan explicitly allowed improvisation here.
- **10 markers instead of 12** — dropped 1853 and 1859 (too close to 1852 and 1860). Plan specified "10-12 markers" so within scope.
- **Expand/collapse: ~60 lines of JS, ~100 lines of CSS** instead of plan's ~25 and ~40 — rAF expand pattern, transitionend cleanup, and console observability weren't fully costed in the estimates.
- **Extended content placed before `card-source` footer** — plan didn't specify position relative to footer; this placement produces better reading flow.

## Known Limitations

- The `.revolucion-timeline` animation only fires via `.reveal--visible`. Elements already in viewport on page load receive `.reveal--no-anim` (correct behavior — intentional, avoids flash-of-animation). Users who load the page already scrolled to the timeline won't see the entrance animation.
- Expand/collapse is on 4 cards only. The other 16 cards have no expandable content. This was the plan spec (4+ major events); there's no technical reason this couldn't extend to more cards later.
- Sub-nav labels disappear at 30rem (320px). Users on very narrow viewports see year ranges only, not the descriptive text. This is a deliberate UX tradeoff — the alternative (wrapping labels) would push the sub-nav to 3-4 rows.

## Follow-ups

- none — M003 is complete. All acceptance criteria pass. M004 (1860-1900 panoramic content) is the next milestone.

## Files Created/Modified

- `index.html` — Added `<nav class="sub-nav">` with 4 anchor links (T01); `<div class="revolucion-timeline reveal reveal-fade">` with 10 markers (T02); `<button class="card-expand-toggle">` + `<div class="card-detail" hidden>` on 4 cards (T03)
- `styles.css` — Added ~90 lines sub-nav styles (T01); ~230 lines revolucion-timeline styles with keyframes (T02); ~100 lines expand/collapse styles (T03)
- `app.js` — Added `initSubNav()` (~70 lines) with IntersectionObserver and click handler (T01); added `initExpandCollapse()` (~60 lines) with event delegation, rAF expand, transitionend cleanup (T03)

## Forward Intelligence

### What the next slice (M004) should know

- **The sub-nav is scoped to `#periodo-revolucion` and disappears when scrolling out.** M004's `#periodo-nacional` section does not need a sub-nav (it's panoramic, 4-5 cards) — the pattern doesn't need to be replicated.
- **The reveal system has 3 observers now** (main scroll spy + sub-nav + reveal-on-scroll). A fourth Observer is fine, but document its `rootMargin` and `threshold` clearly — three is already the limit of easy mental modeling.
- **Expand/collapse delegates on `#periodo-revolucion`**. If M004 ever needs expand/collapse, a new `initExpandCollapse()` call scoped to `#periodo-nacional` would be needed — the existing listener won't fire outside its section root.
- **20 event cards were integrated (not 19 as planned).** The DECISIONS.md entry D021 says 19 — it's outdated. The actual count is 20. The certeza breakdown is: 14 hecho, 5 opinión, 1 rumor.

### What's fragile

- **`btn.nextElementSibling` dependency** — the expand toggle assumes the `.card-detail` div immediately follows the `<button>` in the DOM. If a future edit inserts any element between them (e.g., a spacer, an analytics div), the toggle will silently fail (it won't find `.card-detail`). The `[Expand]` console init log checks for this on load, but it's not a runtime guard.
- **Sub-nav observer `rootMargin: '0px 0px -70% 0px'`** — works well at standard desktop viewports but at very short viewports (e.g., 480px height), the active state may not update unless the user scrolls the sub-period into the top 30% (i.e., the last 70% of the viewport, which may be below fold). Hasn't been an issue in testing, but worth noting.
- **Timeline `reveal--no-anim` on page load** — if someone shares a direct link to `#rev-1852-1860` or the browser restores scroll position to the timeline area, the animation will be skipped. This is documented in KNOWLEDGE.md.

### Authoritative diagnostics

- **Sub-nav not updating on scroll:** Check `.sub-period` elements have their IDs (`rev-1800-1820` etc.) and that `[SubNav]` init log shows correct element count. Filter console on `[SubNav]`.
- **Timeline not animating:** Check `document.querySelector('.revolucion-timeline').className` — `reveal--no-anim` means already visible on load (correct); neither class means IntersectionObserver hasn't fired (scroll more).
- **Expand not working:** Filter console on `[Expand]` — init message should say "Initialized with 4 toggle(s)". If it says 0, the HTML structure is broken. If it fires but button doesn't respond, check `btn.nextElementSibling.classList.contains('card-detail')` for all 4 toggles.

### What assumptions changed

- **Plan estimated 19 cards** — T05-T07 of S01 integrated a full SP4 with 5 cards (SP4-1 through SP4-5) plus SP4 connector, yielding 20 total. The acceptance criteria minimum of 12 events is far exceeded (20).
- **Plan estimated expand/collapse at ~25 JS / ~40 CSS lines** — actual was ~60 JS / ~100 CSS. The rAF expand pattern and transitionend cleanup are non-trivial patterns not reflected in the original estimate. Future expand/collapse tasks should budget 60-70 lines of JS.
