# S01: Estructura HTML y estilos base — UAT

**Milestone:** M001
**Written:** 2026-03-18

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: This slice produces static HTML/CSS with no runtime logic, API calls, or dynamic state. All acceptance criteria are verifiable by opening the page in a browser and inspecting the DOM and visual output.

## Preconditions

- Serve the project root with any static server: `npx serve . -l 3000` (or open `index.html` directly in a browser)
- Browser with dev tools available (Chrome or Firefox recommended)

## Smoke Test

Open `http://localhost:3000` (or the local file). The page should display a sepia-toned header with "Historia Argentina 1500–1900", a navigation bar with 3 period links, and scrollable content sections below.

## Test Cases

### 1. Page loads without errors

1. Open the page in the browser
2. Open browser dev tools → Console tab
3. **Expected:** No JavaScript errors or 404s. Console is clean.

### 2. Header structure and content

1. Inspect the top of the page
2. **Expected:** Header shows kicker text "Un recorrido por cuatro siglos de historia", the title "Historia Argentina 1500–1900", and a subtitle mentioning Juan Bautista Alberdi as "el pensador que soñó un país desde las ideas"

### 3. Navigation bar with 3 period links

1. Locate the navigation bar below the header
2. Inspect each nav link
3. **Expected:** Three links exist:
   - "1500–1800 / Período Colonial" → href `#periodo-colonial`
   - "1800–1860 / Revolución y Organización" → href `#periodo-revolucion`
   - "1860–1900 / Organización Nacional" → href `#periodo-nacional`

### 4. Sticky navigation

1. Scroll down past the header
2. **Expected:** The navigation bar stays fixed at the top of the viewport while scrolling

### 5. Section IDs and structure

1. In dev tools, run: `document.querySelectorAll('section[id^="periodo-"]').length`
2. **Expected:** Returns `3`
3. Verify IDs are exactly: `periodo-colonial`, `periodo-revolucion`, `periodo-nacional`

### 6. Period section content — Colonial (1500–1800)

1. Scroll to the first section
2. **Expected:**
   - Period years badge shows "1500 – 1800"
   - Title: "El Período Colonial"
   - Scope label: "Visión panorámica"
   - Introductory paragraph about three centuries of colonial history
   - 3 placeholder event cards (1536, 1776, 1806)

### 7. Period section content — Revolución (1800–1860) featured treatment

1. Scroll to the second section
2. **Expected:**
   - "Corazón del relato" badge visible at top of section
   - Period years badge shows "1800 – 1860"
   - Title: "Revolución y Organización Nacional"
   - Scope label: "Relato detallado — el corazón del proyecto"
   - Alberdi blockquote: «Gobernar es poblar.» with attribution
   - 4 placeholder event cards (1810, 1816, 1853, 1852)
   - Visual prominence: celeste gradient top border, larger headings compared to other sections

### 8. Period section content — Nacional (1860–1900)

1. Scroll to the third section
2. **Expected:**
   - Period years badge shows "1860 – 1900"
   - Title: "Consolidación y Modernización"
   - Scope label: "Visión panorámica"
   - 3 placeholder event cards (1862, 1880, 1884)

### 9. Footer content

1. Scroll to the bottom of the page
2. **Expected:**
   - Alberdi epigraph: «La patria no es el suelo. Tenemos suelo hace tres siglos, y solo tenemos patria desde 1810.»
   - Credits: "Historia Argentina 1500–1900 — Proyecto de divulgación histórica"
   - Note about certeza system: mentions "hecho documentado, opinión atribuida, o especulación señalada"
   - "Hilo conductor narrativo: Juan Bautista Alberdi (1810–1884)"

### 10. Sepia/parchment palette applied

1. Visually inspect the page background and text colors
2. In dev tools, check `getComputedStyle(document.documentElement).getPropertyValue('--color-bg')`
3. **Expected:** Background is a warm parchment/cream tone. Text is dark brown, not black. Overall aesthetic evokes historical documents.

### 11. Typography loads correctly

1. Inspect headings, body text, and the Alberdi blockquote
2. **Expected:**
   - Headings use a serif display font (Playfair Display) — visually ornate and bold
   - Blockquote text uses a different serif (Source Serif 4) — more readable at smaller sizes
   - Body/UI text uses a sans-serif (Lato) — clean and neutral

### 12. Event cards grid layout

1. At desktop width (≥1024px), inspect the event cards in any section
2. **Expected:** Cards display in a multi-column grid layout (2-3 cards per row depending on viewport width)
3. Resize browser to ~375px width
4. **Expected:** Cards stack into a single column

### 13. CSS custom properties loaded

1. In dev tools Console, run: `getComputedStyle(document.documentElement).getPropertyValue('--color-text')`
2. **Expected:** Returns a non-empty color value

### 14. Stylesheet linked correctly

1. In dev tools, run: `document.querySelector('link[rel="stylesheet"][href="styles.css"]') !== null`
2. **Expected:** Returns `true`

## Edge Cases

### Mobile viewport (≤30rem / ~480px)

1. Set viewport to 375px width (or use mobile emulation)
2. Scroll through the entire page
3. **Expected:** All content readable, nav items stack vertically, cards display single-column, no horizontal overflow

### Anchor navigation

1. Click on "1860–1900 / Organización Nacional" in the nav
2. **Expected:** Page scrolls smoothly to the `#periodo-nacional` section. URL updates with `#periodo-nacional` hash.

### Very wide viewport (≥1920px)

1. Expand browser to full HD width
2. **Expected:** Content remains centered and contained (not stretched edge-to-edge). Max-width constraints prevent unreadable line lengths.

## Failure Signals

- Console errors on page load (especially 404 for styles.css or font failures)
- Missing sections — fewer than 3 `section[id^="periodo-"]` elements
- Broken layout — overlapping elements, horizontal scroll, cards not in grid
- Raw unstyled HTML — stylesheet not loading
- Nav links pointing to wrong anchors or non-existent IDs
- Missing Alberdi references in header/footer
- Featured section (1800-1860) not visually distinct from other sections

## Requirements Proved By This UAT

- R001 — Single-page structure with 3 scrollable period sections
- R007 — Responsive layout verified at mobile and desktop breakpoints
- R010 — Nav with anchor links to all 3 periods (basic smooth scroll via CSS)

## Not Proven By This UAT

- R008 — Timeline visual with position indicator (requires S02 scroll spy)
- R009 — Reveal-on-scroll animations (requires S02 JavaScript)
- R010 — Full nav interaction with scroll spy active state tracking (S02)
- R013 — Certeza system visual differentiation (requires S03 card implementation)
- R002, R003, R004 — Content for each period (requires M002-M004)

## Notes for Tester

- The `.nav-item--active` class is currently hardcoded on the 1800-1860 nav item. This is intentional as a static placeholder — S02 will make this dynamic via scroll spy.
- Event cards have the class `event-card--placeholder` — these will be replaced with real content cards in S03 and content milestones.
- The certeza placeholder classes exist in CSS (`certeza-hecho`, `certeza-opinion`, `certeza-rumor`) but aren't applied to any elements yet — that's S03's scope.
- Google Fonts load from CDN. If testing offline, fonts will fall back to system serif/sans-serif. This is expected behavior.
