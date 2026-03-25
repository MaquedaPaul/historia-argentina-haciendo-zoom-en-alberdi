# M005: Pulido Final y Deploy

**Vision:** Ship the complete Historia Argentina 1500–1900 site with polished responsive design, fluid animations, optional ambient sound, and a live public URL — achieving Lighthouse >90 on mobile performance.

## Success Criteria

- Site renders correctly and is fully usable at 320px, 375px, 768px, 1024px, and 1280px+ viewports with no horizontal overflow
- A hamburger menu replaces the vertical nav stack at ≤30rem, opening/closing with smooth transition and correct ARIA state
- Touch targets on all interactive elements (nav links, expand toggles, timeline points) meet ≥44px minimum height at mobile viewports
- Parallax effect on period section backgrounds is visible during scroll at desktop and disabled (or `transform: none`) when `prefers-reduced-motion` is enabled
- Key event cards (Revolución de Mayo, Caseros) display a distinctive reveal animation (shimmer/glow) when first scrolling into view
- A mute/unmute toggle button is visible at all viewpoints; clicking it enables/disables ambient audio that changes per historical period
- Sound is muted by default — no audio plays until the user explicitly clicks unmute
- `prefers-reduced-motion` disables all new animations (parallax, special card effects) and falls back to final-state rendering
- Lighthouse mobile Performance score >90, Accessibility score >90
- Site is deployed and accessible at a public HTTPS URL (GitHub Pages or Netlify)
- Total reveal element count ≥52 (no regression from M004)

## Key Risks / Unknowns

- **Hamburger menu + sub-nav stacking** — The `.sub-nav` inside `#periodo-revolucion` uses `top: var(--nav-height)` for sticky positioning. A hamburger menu that expands the nav height will push the sub-nav down incorrectly unless the expanded height is communicated via CSS custom property. This is the only interaction risk between S01 and the existing codebase.
- **Audio asset quality** — Free CC0 audio clips for 16th–19th century Argentine context may not exist at acceptable quality on Freesound.org. If assets are unusable, S03 should be dropped rather than shipping poor-quality audio. R006 explicitly says sound is "optional."
- **Lighthouse mobile score with 33 external Wikimedia images** — All images are lazy-loaded and externally hosted (Wikimedia CDN), so LCP is the text header. But total transfer size and time-to-interactive on slow networks could drag the score below 90. The main lever is ensuring no render-blocking resources beyond the existing Google Fonts preconnect.

## Proof Strategy

- **Hamburger + sub-nav stacking** → retire in S01 by building the real hamburger menu and verifying sub-nav positioning at 375px with the menu both open and closed
- **Audio asset quality** → retire in S03-T01 by sourcing real audio files and testing loop quality before any JS implementation

## Verification Classes

- Contract verification: Browser DevTools responsive emulation at 320px, 375px, 768px, 1024px, 1280px; DOM queries for element counts, ARIA states, CSS custom properties
- Integration verification: Scroll-triggered animations fire correctly alongside existing reveal system (no observer interference); sound system piggybacks on `setActiveSection` without breaking scroll spy
- Operational verification: Deploy to GitHub Pages or Netlify; verify HTTPS, no mixed content, all 3 source files + audio assets load correctly
- UAT / human verification: Visual inspection of parallax smoothness, animation jank, hamburger menu feel, and audio fade transitions at desktop and mobile

## Milestone Definition of Done

This milestone is complete only when all are true:

- All four slices (responsive, animations, sound, deploy) are complete or explicitly deferred with rationale
- Hamburger menu, parallax, special animations, and sound toggle are wired into the live page and exercised at multiple viewports
- Lighthouse mobile audit returns Performance >90 and Accessibility >90
- Site is deployed at a public HTTPS URL and loads all content correctly
- Success criteria are re-checked against the live deployed site, not just local dev
- No regression: ≥52 reveal elements, 34 event cards, 3 animated timelines, sub-nav functional, expand/collapse functional

## Requirement Coverage

- Covers: R005 (multimedia — special animations and ambient sound complete the multimedia sweep), R006 (ambient sound — S03 is primary owner), R007 (responsive — S01 is primary owner)
- Partially covers: R001 (single-page with smooth navigation — hamburger menu improves mobile nav; deploy makes it publicly accessible)
- Leaves for later: none — all active requirements addressed
- Orphan risks: Alberdi death date `[VERIFICACIÓN PENDIENTE]` remains unresolved from M004 (not in M005 scope — would require primary-source research)

## Slices

- [x] **S01: Responsive sweep and hamburger menu** `risk:high` `depends:[]`
  > After this: Site is fully usable at 320px–1280px+ with a hamburger menu on mobile, ≥44px touch targets, and no horizontal overflow — verified visually in browser DevTools at 5 breakpoints.

- [x] **S02: Parallax and special card animations** `risk:medium` `depends:[]`
  > After this: Period sections have subtle parallax background movement on scroll, and Revolución de Mayo + Caseros cards display a distinctive glow animation on reveal — all with prefers-reduced-motion fallback.

- [x] **S03: Ambient sound system** `risk:medium` `depends:[]`
  > After this: A floating mute/unmute button toggles ambient audio that fades between period-specific tracks as the user scrolls — muted by default, no autoplay, preload="none" on all audio elements.

- [x] **S04: Optimization and deploy** `risk:low` `depends:[S01,S02,S03]`
  > After this: Site is live at a public HTTPS URL, Lighthouse mobile scores >90 on Performance and Accessibility, all features verified on the deployed version.

## Boundary Map

### S01 (Responsive)

Produces:
- `--nav-height` CSS custom property updated dynamically by JS when hamburger menu opens/closes (consumed by `.sub-nav` sticky positioning)
- Hamburger toggle `<button>` in `index.html` nav markup with `aria-expanded` state
- Mobile-safe touch targets (≥44px) on all interactive elements at ≤48rem

Consumes:
- nothing (first slice, extends existing CSS breakpoints)

### S02 (Animations)

Produces:
- `.period::before` pseudo-element parallax layer with `will-change: transform` on each `.period` section
- `.card--special-reveal` animation class for key event cards (Revolución de Mayo, Caseros)
- Fourth IntersectionObserver for parallax with distinct `rootMargin` from existing three

Consumes:
- nothing (independent of S01; extends existing reveal system and CSS patterns)

### S03 (Sound)

Produces:
- `<audio>` elements with `preload="none"` near `</body>` in `index.html`
- `initAmbientSound()` function in `app.js` with mute toggle, period-aware track switching, volume fade
- Floating mute button in `index.html` with CSS in `styles.css`
- 3 MP3 audio files in `audio/` directory (≤500KB each)

Consumes:
- nothing (independent; piggybacks on existing `setActiveSection` scroll spy via DOM observation, not by modifying the spy)

### S01, S02, S03 → S04 (Deploy)

Produces:
- Git initial commit with all source files + audio assets
- Live public HTTPS URL (GitHub Pages or Netlify)
- Lighthouse audit results confirming Performance >90, Accessibility >90

Consumes:
- Stable final state from S01 (responsive), S02 (animations), S03 (sound)
