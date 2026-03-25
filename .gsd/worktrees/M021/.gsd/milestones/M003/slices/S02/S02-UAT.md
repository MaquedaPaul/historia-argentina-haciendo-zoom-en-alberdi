# S02: Sub-navigation, animated timeline, expand/collapse — UAT

**Milestone:** M003
**Written:** 2026-03-19

## UAT Type

- UAT mode: live-runtime + human-experience
- Why this mode is sufficient: All three features (sub-nav, timeline, expand/collapse) are interactive behaviors that require a running browser at multiple viewport sizes. Structural assertions (card count, link count, marker count, aria state) are run as JS in the browser console; visual and interactive behavior is verified by a human tester.

## Preconditions

1. Serve `index.html` from a local HTTP server (not file://) — `node -e "require('http').createServer(require('fs').createReadStream.bind(require('fs'))).listen(8085)"` or equivalent. Chrome and Firefox both work; Safari is fine for visual checks.
2. Start with viewport at **1200px wide** (browser default or DevTools).
3. Navigate to the page root (`http://localhost:PORT/`) — do NOT deep-link to a hash; you need the page to load from the top so timeline animation fires correctly on scroll.
4. Open browser DevTools console (F12) and clear any existing logs.

## Smoke Test

Scroll down to the `#periodo-revolucion` section. You should see:
- A sticky bar below the main nav with 4 links: "1800-1820 La Revolución", "1820-1835 Ensayos", "1835-1852 Rosas y el Exilio", "1852-1860 La Constitución" (labels may be abbreviated on mobile).
- After scrolling past all 4 sub-periods, a horizontal timeline labeled "Línea de tiempo: 1800–1860" with 10 date markers (1810 through 1860) animating onto the track.

If both of these are visible, the smoke test passes. Continue with full test cases.

## Test Cases

---

### 1. Sub-navigation structure and rendering (desktop 1200px)

1. Load the page and scroll to `#periodo-revolucion`.
2. In the browser console, run:
   ```js
   document.querySelectorAll('.sub-nav a').length
   ```
3. **Expected:** `4`
4. Run:
   ```js
   window.getComputedStyle(document.querySelector('.sub-nav')).position
   ```
5. **Expected:** `"sticky"`
6. Visually confirm the sub-nav bar is pinned below the main navigation bar and does not overlap it.
7. **Expected:** Sub-nav is visually distinct (warm background, celeste bottom border on active link), all 4 links visible, comfortable spacing.

---

### 2. Sub-nav scroll tracking — active state updates

1. Load page from top. Navigate to `#periodo-revolucion`.
2. Check the active link:
   ```js
   document.querySelector('.sub-nav a.sub-nav__link--active')?.getAttribute('href')
   ```
3. **Expected:** `"#rev-1800-1820"` (first sub-period active on entry)
4. Scroll slowly down through the section until "1820-1835" sub-period is visible in the top third of the viewport.
5. **Expected:** Active link updates to the "1820-1835" link (celeste underline moves). Run the query again to confirm `"#rev-1820-1835"`.
6. Continue scrolling through "1835-1852" and "1852-1860".
7. **Expected:** Active link tracks the visible sub-period at each transition. Console shows `[SubNav]` log on each change.

---

### 3. Sub-nav click scrolling

1. Scroll so you are anywhere inside `#periodo-revolucion`.
2. Click the "1852-1860" sub-nav link.
3. **Expected:** Page smoothly scrolls to the `#rev-1852-1860` sub-period. URL hash updates to `#rev-1852-1860`. Active link switches to "1852-1860".
4. Click the "1800-1820" link.
5. **Expected:** Page smoothly scrolls back to the first sub-period. URL hash updates to `#rev-1800-1820`.

---

### 4. Sub-nav disappears outside section

1. Scroll above `#periodo-revolucion` (into the colonial section or header).
2. **Expected:** Sub-nav bar is not visible (it uses `position:sticky` inside the section — it sticks only while the section is in the viewport).
3. Scroll below `#periodo-revolucion` (into any subsequent section).
4. **Expected:** Sub-nav bar is not visible.

---

### 5. Animated timeline — 10 markers fire on scroll

1. Load page from top (critical — must not be scrolled to timeline yet).
2. Scroll past all 4 sub-periods until the "Línea de tiempo: 1800–1860" element comes into view.
3. **Expected:** Progress bar fills from left to right over ~2.5 seconds. Then marker dots pop in sequentially from left (1810) to right (1860) with staggered delays. Labels appear slightly after each dot.
4. Run in console:
   ```js
   document.querySelectorAll('.revolucion-timeline__marker').length
   ```
5. **Expected:** `10`
6. Run:
   ```js
   document.querySelector('.revolucion-timeline.reveal--visible') !== null
   ```
7. **Expected:** `true`
8. Visually confirm: labels for 1820, 1829, and 1838 appear **above** the track (alternating with below-track labels for surrounding dates). No labels overlap.

---

### 6. Timeline readability at 1920px

1. Set DevTools viewport to 1920px wide.
2. Scroll to the timeline.
3. **Expected:** All 10 markers visible with comfortable spacing. Above/below labels clearly separated. Label text legible (no clipping). Progress bar fills the full width.

---

### 7. Expand/collapse — open and close a toggle

1. At 1200px viewport, scroll to the card "El Cabildo Abierto y la Revolución de Mayo" (sub-period 1800-1820, first card).
2. Locate the "Ver más" button at the bottom of the card (just above the `<cite>` footer).
3. In console: `document.querySelectorAll('.card-expand-toggle').length` → **Expected:** `4`
4. Click "Ver más".
5. **Expected:**
   - Button text changes to "Ver menos"
   - Arrow icon rotates 180° (smooth transition)
   - Detail panel slides open with a smooth `max-height` transition revealing 2 paragraphs of extended content
   - `aria-expanded` on the button is now `"true"`
6. Run:
   ```js
   document.querySelector('.card-detail--expanded') !== null
   ```
7. **Expected:** `true`
8. Click "Ver menos".
9. **Expected:**
   - Panel collapses smoothly (max-height: 0 transition)
   - Button text returns to "Ver más"
   - Icon rotates back
   - `aria-expanded` is `"false"`
   - After ~350ms, the panel is hidden again (native hidden attribute restored)

---

### 8. Multiple toggles expand independently

1. Scroll to the card "El exilio de la Generación del 37" (sub-period 1835-1852).
2. Click its "Ver más" toggle.
3. Without collapsing it, scroll to "*Bases y puntos de partida*" card (sub-period 1852-1860) and click its "Ver más" toggle.
4. **Expected:** Both detail panels are expanded simultaneously. Neither interferes with the other.
5. Run:
   ```js
   document.querySelectorAll('.card-detail--expanded').length
   ```
6. **Expected:** `2`

---

### 9. Reveal system not broken by expand/collapse

1. After expanding a toggle, scroll away from `#periodo-revolucion` and back.
2. **Expected:** The card's expand state is preserved (if you expanded it, it stays expanded; no re-collapse from IntersectionObserver).
3. Run:
   ```js
   document.querySelectorAll('#periodo-revolucion .event-card.reveal--visible').length
   ```
4. **Expected:** ≥19 (most cards will be in `reveal--visible` state by the time you've scrolled the full section)

---

### 10. Mobile viewport — sub-nav (375px)

1. Set DevTools viewport to 375px wide.
2. Navigate to `#periodo-revolucion`.
3. **Expected:** Sub-nav shows 4 links in a horizontal row. Year ranges are visible (e.g. "1800-1820"). Descriptive labels may be hidden (only year ranges show). Row is horizontally scrollable if needed.
4. Tap the "1852-1860" link.
5. **Expected:** Page scrolls to that sub-period. Active state updates.

---

### 11. Mobile viewport — timeline (375px)

1. At 375px, scroll to the "Línea de tiempo: 1800–1860" timeline.
2. **Expected:** Progress bar and all 10 marker dots are visible across the full width. Sublabel text (event names below year numbers) is hidden — only year numbers show. No dots overlap or clip outside the track boundary.

---

### 12. Mobile viewport — expand/collapse (375px)

1. At 375px, scroll to "El Cabildo Abierto y la Revolución de Mayo".
2. Click "Ver más".
3. **Expected:** Detail panel expands. No horizontal overflow (content stays within card width). Text is legible. No elements extend beyond the viewport.

---

## Edge Cases

### E1 — Reduced motion preference

1. In DevTools, enable "Emulate CSS media feature `prefers-reduced-motion: reduce`".
2. Scroll to the timeline.
3. **Expected:** Timeline progress bar and markers appear instantly in their final state — no animation, no delay. All 10 markers are visible immediately.
4. Click a "Ver más" expand toggle.
5. **Expected:** Content appears instantly — no slide animation. Button text still updates ("Ver más" → "Ver menos").

---

### E2 — Timeline already in viewport on page load

1. Navigate directly to `http://localhost:PORT/#rev-1852-1860` (the last sub-period, near the timeline).
2. Scroll the page slightly to bring the timeline fully into view.
3. **Expected:** The timeline element may have `reveal--no-anim` class (skips animation — correct behavior for elements already in viewport on load). All 10 markers are still visible in their final state.
4. This is documented expected behavior. ✓

---

### E3 — Fast scroll through section

1. Quickly scroll from the top of `#periodo-revolucion` to below it in one fast motion.
2. **Expected:** Sub-nav active state may skip sub-periods during fast scroll — this is acceptable. The IntersectionObserver fires asynchronously; it catches up correctly when scrolling slows. Cards already in viewport should receive `reveal--no-anim` or `reveal--visible` (not stuck in unrevealed state).

---

### E4 — Console diagnostics visibility

1. In DevTools console, filter on `[SubNav]`.
2. **Expected:** Initialization log ("Initialized sub-nav observer for N sub-period(s)") and active-state change logs are visible.
3. Filter on `[Expand]`.
4. **Expected:** Initialization log ("Initialized with 4 toggle(s)") visible. Each click produces a log with card title and new state.

---

## Failure Signals

- Sub-nav shows 0 links → `<nav class="sub-nav">` not found in HTML; check index.html around the `.period-intro` block
- Active link never updates on scroll → observer `rootMargin` wrong or `.sub-period` elements missing their IDs (`rev-*`)
- Timeline shows fewer than 10 markers → `.revolucion-timeline__marker` elements missing from HTML; check after `#rev-1852-1860`
- Timeline animation never fires → check classList: `reveal--no-anim` is correct behavior; neither class means IntersectionObserver not firing
- Expand toggle does nothing → filter console on `[Expand]`; if init shows 0 toggles, HTML structure is broken; if click log fires but panel doesn't open, check `btn.nextElementSibling.classList.contains('card-detail')`
- Sub-nav visible outside `#periodo-revolucion` → sub-nav is not `position:sticky` inside the section (check CSS)
- Cards not revealing on scroll → check `reveal--visible` is being added; may be a conflict if `initExpandCollapse()` or `initSubNav()` threw an error before `revealOnScroll()` ran

## Not Proven By This UAT

- **Long-term scroll performance** — no profiling of IntersectionObserver overhead across all 3 observers over extended scroll sessions
- **Animated timeline on Safari iOS** — tested Chrome/Firefox desktop only; `color-mix()` and `@keyframes` with nth-child delays were not tested on Safari iOS (they are supported since Safari 16.2, but visual rendering differences exist)
- **Accessibility keyboard navigation** — tab order through sub-nav links and expand buttons not tested with a screen reader or keyboard-only navigation
- **Edge/IE compatibility** — not a target; `color-mix()` is unsupported in legacy browsers

## Notes for Tester

- The timeline animation won't play if you navigate directly to a hash below the timeline or if the browser restores scroll position to that area on reload. This is expected behavior (documented in KNOWLEDGE.md). To test the animation, always load from the top and scroll down.
- All `[SubNav]` and `[Expand]` console messages can be noisy during scroll. Filter by prefix to isolate the signal you need.
- The expand/collapse hidden-attribute restoration happens ~350ms after clicking "Ver menos" — the panel appears fully collapsed before the `hidden` attribute is set. This is intentional and correct.
- At 320px, only year numbers appear on the timeline (sublabels hidden). This is intentional — sublabel text at that density is unreadable. If you want to see sublabels, test at 480px+.
- 4 of the 20 event cards have expand toggles. The other 16 do not. This is by design (major events only).
