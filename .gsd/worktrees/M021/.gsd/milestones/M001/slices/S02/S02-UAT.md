# S02: Navegación y timeline interactiva — UAT

**Milestone:** M001
**Written:** 2026-03-18

## UAT Type

- UAT mode: live-runtime
- Why this mode is sufficient: This slice delivers interactive JavaScript behavior (scroll spy, smooth scroll, reveal animations) that can only be verified in a running browser. All features are client-side with no backend.

## Preconditions

- A local HTTP server serving the project root (e.g., `npx serve -l 8080 .`)
- Browser open at http://localhost:8080
- Browser viewport at desktop width (≥1024px) for timeline visibility

## Smoke Test

Open http://localhost:8080. Confirm: (1) the page loads without errors, (2) a vertical timeline with 3 dots is visible on the left edge, (3) the first dot (1500–1800) has a highlighted/active appearance.

## Test Cases

### 1. Timeline visibility and structure

1. Load the page at desktop width (≥1024px)
2. Look at the left edge of the viewport
3. **Expected:** A fixed vertical timeline with 3 dots connected by a line. The top dot labeled "1500–1800" should appear active (filled/highlighted). The other two dots ("1800–1860", "1860–1900") should appear inactive (hollow/dimmer).

### 2. Scroll spy updates timeline

1. Start at the top of the page
2. Scroll down slowly until the "Revolución y Organización (1800–1860)" section header is near the top of the viewport
3. **Expected:** The second timeline dot (1800–1860) becomes active. The first dot becomes inactive. The nav bar item "1800–1860" also gains the active style.
4. Continue scrolling to the "Organización Nacional (1860–1900)" section
5. **Expected:** The third timeline dot (1860–1900) becomes active.

### 3. Nav link smooth scroll

1. Scroll to the top of the page
2. Click the "1860–1900 Organización Nacional" nav link in the navigation bar
3. **Expected:** The page smooth-scrolls (not instant jump) to the Organización Nacional section. The URL hash updates to `#periodo-nacional`. The nav item and timeline dot for 1860–1900 become active.

### 4. Timeline point click smooth scroll

1. After test 3, click the first timeline dot (1500–1800) on the left
2. **Expected:** The page smooth-scrolls back to the Período Colonial section. The URL hash updates to `#periodo-colonial`. The first timeline dot and nav item become active.

### 5. Reveal animations on scroll

1. Reload the page (F5)
2. Observe the hero section — the main heading and subheading should be visible immediately (no animation flash)
3. Scroll down slowly
4. **Expected:** As content elements enter the viewport, they fade in or slide up into view. Period headers fade in. Event cards slide up with staggered timing (each card appears slightly after the previous one).

### 6. All reveals complete after full scroll

1. Scroll all the way to the bottom of the page
2. Open browser DevTools console
3. Run: `document.querySelectorAll('.reveal--visible').length`
4. **Expected:** Returns 17 (all reveal elements have been triggered)

### 7. Console diagnostics present

1. Reload the page
2. Open browser DevTools console (filter to "verbose" or "debug" level)
3. **Expected:** Messages include `[ScrollSpy] Initialized with 3 sections` and `[Reveal] Initialized with 17 elements`
4. Scroll down through the page
5. **Expected:** Messages appear for each section change (`[ScrollSpy] Active section → periodo-...`) and each reveal (`[Reveal] Revealed: ...`)

### 8. No JavaScript errors

1. Reload the page
2. Open browser DevTools console
3. Scroll through the entire page, clicking nav links and timeline points
4. **Expected:** Zero errors in the console. Only debug-level messages from [ScrollSpy] and [Reveal].

## Edge Cases

### Fast scroll / keyboard jump

1. Reload the page
2. Press Ctrl+End (or Cmd+End on Mac) to jump to the bottom instantly
3. **Expected:** All content elements are visible (no stuck invisible elements). The last timeline dot is active. No console errors.

### Browser resize across breakpoint

1. Load the page at desktop width (≥1024px) — timeline should be visible
2. Resize browser window to <768px width
3. **Expected:** Timeline aside disappears (hidden on mobile). Nav bar remains visible and functional.
4. Resize back to ≥1024px
5. **Expected:** Timeline reappears with correct active state.

### Hash navigation on load

1. Navigate directly to http://localhost:8080/#periodo-nacional
2. **Expected:** Page loads scrolled to the Organización Nacional section. The third timeline dot and nav item are active. Content elements in view are visible without animation flash.

## Failure Signals

- Timeline dots visible but none are active → scroll spy observer not firing
- Clicking nav link causes instant jump instead of smooth scroll → smooth scroll handler not attached or `behavior: 'smooth'` not supported
- Content elements invisible until interacted with → reveal observer not triggering, check for `.reveal--visible` class
- Console shows `[ScrollSpy] No sections found` → section IDs changed or missing
- Console shows `[Reveal] No .reveal elements found` → reveal classes not applied to HTML elements
- JavaScript errors on load → syntax error in app.js or script not loaded

## Requirements Proved By This UAT

- R008 — Timeline visual shows current chronological position (Tests 1, 2)
- R009 — Reveal-on-scroll animations work with smooth transitions (Tests 5, 6)
- R010 — Quick navigation between periods via click (Tests 3, 4)

## Not Proven By This UAT

- R007 — Full responsive testing across all breakpoints (only basic mobile breakpoint check in edge cases)
- Performance under heavy content load (current page has placeholder content; M002-M004 will add real content)
- Accessibility with screen readers (nav and timeline have aria-labels, but not tested with assistive technology)

## Notes for Tester

- The timeline is intentionally hidden on mobile — this is by design, not a bug
- Reveal animations respect `prefers-reduced-motion` — if your OS has "reduce motion" enabled, elements will appear instantly without animation
- The [ScrollSpy] and [Reveal] console messages are at `debug` level — you may need to enable "Verbose" log level in DevTools to see them
- Current content is placeholder — event cards show "Próximamente" text. This is expected; real content comes in M002-M004
