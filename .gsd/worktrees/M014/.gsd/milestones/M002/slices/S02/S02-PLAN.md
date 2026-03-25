# S02: Multimedia, imágenes reales y pulido visual

**Goal:** Enrich the colonial section with real historical images from Wikimedia Commons, add at least one embedded video or CSS animation, add responsive iframe CSS, and verify the complete section meets all acceptance criteria.

**Demo:** Open `index.html` in browser, scroll to the colonial section — cards display real historical images (paintings, maps, engravings from Wikimedia Commons), at least one embedded video or animated element is present and functional, reveal animations stagger smoothly, and the section delivers a complete panoramic reading experience at both desktop and mobile viewports.

## Must-Haves

- Real historical images (Wikimedia Commons public domain) on at least 5 cards, replacing image placeholders
- At least 1 embedded video (YouTube/Vimeo iframe) or CSS animation in the section
- Responsive iframe/video CSS (~10-15 lines) if video embed is used
- All images have descriptive `alt` text for accessibility
- Fallback styling for images that fail to load
- Complete section passes all M002 acceptance criteria

## Proof Level

- This slice proves: final-assembly (all M002 acceptance criteria verified in browser)
- Real runtime required: yes (browser rendering, external image/video loading)
- Human/UAT required: yes (visual quality check, narrative flow read-through)

## Verification

- Open `index.html` in browser: at least 5 cards show real images (not placeholders)
- Video or animation element is visible and functional in the section
- Images have proper `alt` text (inspect DOM)
- Resize to mobile (~375px): images scale responsively, video maintains aspect ratio
- Full acceptance criteria checklist:
  - ✅ 5+ events with text + image
  - ✅ Coherent 300-year panoramic narrative
  - ✅ At least 1 video or animation
  - ✅ All facts verified (done in S01)
  - ✅ Content classified by certeza level
  - ✅ Opinions with full attribution
  - ✅ Rumors explicitly marked

## Integration Closure

- Upstream surfaces consumed: S01's complete card structure in `index.html` with image placeholder divs
- New wiring introduced in this slice: responsive iframe CSS in `styles.css`, `<img>` elements replacing `.card-image-placeholder` divs
- What remains before the milestone is truly usable end-to-end: nothing — this is the final slice

## Tasks

- [x] **T01: Add real historical images from Wikimedia Commons to cards** `est:1h`
  - Why: Cards currently use styled text placeholders. Real images transform the reading experience and satisfy the "texto + imagen" acceptance criterion (R002).
  - Files: `index.html`, `styles.css`
  - Do: (1) For each of the 6-7 cards, find an appropriate public domain image on Wikimedia Commons — colonial-era maps, period paintings, engravings, illustrations. (2) Replace each `div.card-image-placeholder` with an `<img>` element inside a wrapper div, using the Wikimedia Commons direct file URL. (3) Add descriptive `alt` text to every image. (4) Add CSS for card images: `max-width: 100%`, `aspect-ratio` or `max-height` constraint, `object-fit: cover`, and a fallback background color/text for broken images. (5) Keep at least 1 styled placeholder as a fallback demonstration for events where no suitable image exists. Verify all images are public domain (pre-1900 works, PD-old tag on Wikimedia).
  - Verify: Open browser — at least 5 cards show real images. Images scale properly at desktop and mobile. Alt text present on all images (inspect DOM).
  - Done when: At least 5 cards have real historical images from Wikimedia Commons with proper alt text and responsive sizing

- [x] **T02: Add embedded video or CSS animation and responsive media CSS** `est:45m`
  - Why: The acceptance criteria require "al menos 1 video o animación en la sección" (R005). Need responsive iframe CSS that doesn't exist yet.
  - Files: `index.html`, `styles.css`
  - Do: (1) Search for a suitable short documentary or educational video about colonial Argentina (Spanish language preferred, embeddable). (2) If found: add a `<div class="responsive-video">` wrapper after the events-grid (or between thematic groups of cards) containing an `<iframe>` with the video embed. Add ~10-15 lines of CSS for `.responsive-video` using `aspect-ratio: 16/9` with `max-width` constraint and centering. Add a descriptive heading or caption. (3) If no suitable video found: create a CSS-animated element — e.g., an animated timeline bar that visually spans the 1500-1807 period, or a map reveal animation using CSS keyframes. (4) Ensure the media element is responsive and doesn't break the page layout at any viewport width.
  - Verify: Open browser — video plays or animation runs in the colonial section. Resize to mobile — media element adapts without overflow. Inspect CSS — responsive wrapper styles are present.
  - Done when: At least 1 multimedia element (video or animation) is present, functional, and responsive in the colonial section

- [x] **T03: Final verification against all M002 acceptance criteria** `est:30m`
  - Why: Final integration check to ensure all acceptance criteria are met before marking the milestone complete.
  - Files: `index.html` (read-only verification)
  - Do: (1) Open `index.html` in browser at desktop viewport. (2) Verify each of the 7 acceptance criteria from M002-CONTEXT.md. (3) Check reveal animation stagger across all cards. (4) Read through all card content for narrative coherence. (5) Test at mobile viewport (~375px) for layout integrity. (6) Verify all `data-certeza` attributes match card classes. (7) Check that no placeholder cards remain from the original 3. Document any issues found and fix them.
  - Verify: All 7 acceptance criteria pass. No visual or content issues at desktop or mobile. All certeza types present with correct visual treatment.
  - Done when: Clean pass on all acceptance criteria with no outstanding issues

## Files Likely Touched

- `index.html` — Replace image placeholders with real `<img>` elements, add video/animation embed
- `styles.css` — Add responsive image CSS for cards, add responsive iframe/video wrapper CSS

## Observability / Diagnostics

- **Runtime signals:** Browser console logs `[Images] Fallback handlers set for N card images.` on page load, confirming fallback JS initialized. Image load failures emit `[Images] Failed to load: <url>` warnings.
- **Inspection surfaces:** Open DevTools → Elements: each `.card-image img` shows `loading="lazy"`, Wikimedia `src`, and descriptive `alt`. CSS `.card-image` enforces `max-height: 220px` and `overflow: hidden`. The `.img-fallback` / `.img-error` classes activate on broken images.
- **Failure visibility:** Broken images show sepia-toned fallback with truncated alt text via CSS `::after` pseudo-element. Network tab shows image request status.
- **Redaction constraints:** No secrets or user data involved — all images are public domain from Wikimedia Commons.
