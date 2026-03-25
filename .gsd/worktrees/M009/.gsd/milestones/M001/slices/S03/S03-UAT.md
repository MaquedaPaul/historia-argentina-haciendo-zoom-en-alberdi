# S03: Sistema de cards y niveles de certeza — UAT

**Milestone:** M001
**Written:** 2026-03-18

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: This is a pure HTML+CSS visual system with no backend, no data persistence, and no dynamic state. All verification can be done by inspecting the rendered page in a browser.

## Preconditions

- Open `index.html` in a browser (local file:// or served via any static server)
- No build step required — files are static HTML/CSS/JS

## Smoke Test

Scroll to the "Revolución y Organización" section. Three cards should be visible in a horizontal grid, each with a visually distinct colored left border (green, blue, amber) and a different header indicator bar.

## Test Cases

### 1. Three card types present and distinct

1. Open `index.html` and scroll to the "1800–1860" section
2. Locate the events grid containing the certeza cards
3. **Expected:** Three cards visible: "Se forma la Primera Junta de gobierno" (green border), "Alberdi y la organización nacional" (blue border), "El supuesto envenenamiento de Mariano Moreno" (amber border)
4. Each card has a colored indicator bar at the top with an icon and label

### 2. Card Hecho structure

1. Inspect the green-bordered card ("Primera Junta de gobierno")
2. **Expected:** 
   - Top indicator bar shows ✓ icon and "Hecho documentado" label
   - Image placeholder area with text "Ilustración del Cabildo Abierto"
   - Date: "25 de mayo de 1810"
   - Title: "Se forma la Primera Junta de gobierno"
   - Body text describing the event
   - Footer with 📄 icon and source citation: "Acta capitular del Cabildo de Buenos Aires, 25 de mayo de 1810."

### 3. Card Opinión structure

1. Inspect the blue-bordered card ("Alberdi y la organización nacional")
2. **Expected:**
   - Top indicator bar shows 💬 icon and "Opinión atribuida" label
   - Image placeholder with text "Retrato de J. B. Alberdi"
   - Date: "1852"
   - Title: "Alberdi y la organización nacional"
   - Blockquote with decorative large quotation mark and the Alberdi quote about constitución
   - Attribution footer: author "Juan Bautista Alberdi", source "*Bases y puntos de partida para la organización política de la República Argentina*", format "libro", year "1852"

### 4. Card Rumor structure

1. Inspect the amber-bordered card ("El supuesto envenenamiento de Mariano Moreno")
2. **Expected:**
   - Top indicator bar shows ⚠️ icon and a "Rumor" badge (pill-shaped)
   - Image placeholder with text "Retrato de Mariano Moreno"
   - Date: "4 de marzo de 1811"
   - Title: "El supuesto envenenamiento de Mariano Moreno"
   - Body text in italic describing the rumor
   - Dashed-border footer with 🔍 icon, "Origen del rumor:" header, and explanation of the rumor's source (Manuel Moreno's biography)

### 5. Visual differentiation at a glance

1. Zoom out or step back from the screen
2. **Expected:** Without reading text, the three cards are distinguishable by:
   - Border color (green vs blue vs amber)
   - Indicator bar color
   - Layout differences (plain text vs blockquote vs italic + badge)

### 6. Reveal animation integration

1. Reload the page and scroll slowly toward the certeza cards section
2. **Expected:** Cards animate in with a slide-up effect as they enter the viewport
3. Open browser console — look for `[Reveal] Revealed: article.event-card.card-hecho`, `.card-opinion`, and `.card-rumor` messages

### 7. DOM diagnostic check

1. Open browser DevTools console
2. Run: `document.querySelectorAll('.card-hecho').length === 1 && document.querySelectorAll('.card-opinion').length === 1 && document.querySelectorAll('.card-rumor').length === 1`
3. **Expected:** Returns `true`
4. Run: `[...document.querySelectorAll('[data-certeza]')].map(e => e.dataset.certeza)`
5. **Expected:** Returns `["hecho", "opinion", "rumor"]`

### 8. Computed style verification

1. In DevTools console, run:
   ```js
   ['card-hecho','card-opinion','card-rumor'].map(c => 
     getComputedStyle(document.querySelector('.'+c)).borderLeftColor
   )
   ```
2. **Expected:** Three distinct color values — green (rgb(74,124,89)), blue (rgb(74,111,165)), amber (rgb(184,134,11))

## Edge Cases

### Mobile responsive behavior

1. Resize browser to ≤768px width (or use DevTools mobile emulation)
2. **Expected:** Cards stack vertically in a single column. Indicator bars, text, and footers remain readable. No horizontal overflow.

### Missing image graceful fallback

1. Cards use `.card-image-placeholder` divs (not actual `<img>` tags)
2. **Expected:** Placeholder areas show descriptive text (e.g., "Ilustración del Cabildo Abierto"). When real images are added in M002–M004, placeholders will be replaced.

### Other sections unaffected

1. Scroll to the "1500–1800" and "1860–1900" sections
2. **Expected:** These sections still show their original placeholder cards (from S01) — they were not modified by S03.

## Failure Signals

- Cards all look the same (no color differentiation) → certeza CSS not loaded or classes missing
- Missing indicator bars → `.card-certeza-indicator` styles not applied
- No blockquote in opinión card → HTML structure wrong
- Rumor text not italic → `.card-rumor__text` style missing
- No "Rumor" badge → `.card-certeza-badge-rumor` element or styles missing
- Cards don't animate on scroll → missing `.reveal .reveal-slide` classes or app.js not loaded
- Console shows `[Reveal] Initialized with X elements` where X < 16 → cards not counted by reveal system

## Requirements Proved By This UAT

- R013 (partial) — Visual system for certeza classification is built and functional. Full proof requires content milestones (M002–M004) populating all events with correct certeza levels.
- R014 (partial) — Opinión card template with full attribution (author, source, format, date) is working. Full proof requires multiple attributed opinions across all periods.

## Not Proven By This UAT

- R013 full validation — requires all historical content to be classified and marked
- R014 full validation — requires multiple próceres' opinions with proper attribution
- Responsiveness across all breakpoints (only basic mobile check)
- Accessibility (screen reader experience with certeza types)
- Card template reusability at scale (only 3 cards exist currently)

## Notes for Tester

- The 404 error in console for `favicon.ico` is unrelated to this slice — ignore it.
- The three example cards use real Argentine historical events with accurate dates. The content quality is good enough to stay as-is when M002–M004 expand the sections.
- Hover states exist on each card type — hover to see subtle lift/shadow enhancement.
