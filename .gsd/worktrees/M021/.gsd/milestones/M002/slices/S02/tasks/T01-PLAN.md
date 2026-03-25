---
estimated_steps: 5
estimated_files: 2
---

# T01: Add real historical images from Wikimedia Commons to cards

**Slice:** S02 — Multimedia, imágenes reales y pulido visual
**Milestone:** M002

## Description

Replace the styled text placeholders (`div.card-image-placeholder`) on the colonial period cards with real historical images sourced from Wikimedia Commons. All images must be public domain (pre-1900 artworks or maps with PD-old licensing). Add CSS for responsive card images with fallback styling for broken images.

## Steps

1. For each of the 6-7 events, search Wikimedia Commons for an appropriate public domain image: period paintings, maps, engravings, or illustrations related to the specific event. Prioritize images with clear PD-old or PD-Art license tags.
2. Replace `div.card-image-placeholder` elements with `<div class="card-image"><img src="..." alt="..." loading="lazy"></div>` structure. Use Wikimedia Commons thumbnail URLs (scaled to ~400-600px width) to avoid loading massive originals.
3. Write descriptive alt text for every image that conveys the historical content (not just "painting" — describe what the image depicts in context).
4. Add CSS for `.card-image` and `.card-image img`: `width: 100%`, `max-height: 220px`, `object-fit: cover`, `border-radius` matching card design, and a sepia-toned fallback `background-color` with centered text for broken images.
5. For any event where no suitable image can be found, keep the existing `.card-image-placeholder` with enhanced descriptive text.

## Must-Haves

- [ ] At least 5 cards have real `<img>` elements with Wikimedia Commons URLs
- [ ] All images are public domain (verified PD-old or equivalent)
- [ ] All images have descriptive `alt` text
- [ ] CSS handles responsive sizing (images don't overflow cards)
- [ ] Fallback styling exists for broken image loads
- [ ] Images use `loading="lazy"` for performance

## Verification

- Open `index.html` in browser: at least 5 colonial cards display real images
- Images render at appropriate size within cards (not stretched, not pixelated)
- Resize to 375px mobile viewport: images scale down without overflow
- Right-click → inspect: all `<img>` elements have non-empty `alt` attributes
- Disconnect network → reload: fallback styling visible on broken images

## Inputs

- `index.html` — S01's completed colonial section with `card-image-placeholder` divs
- `styles.css` — Existing `.card-image-placeholder` CSS to supplement (not replace)

## Expected Output

- `index.html` — 5+ cards with real `<img>` elements replacing placeholders
- `styles.css` — `.card-image` and `.card-image img` responsive styles (~15-20 lines)

## Observability Impact

- **New signals:** Console debug log `[Images] Fallback handlers set for N card images.` confirms fallback JS initialized. `[Images] Failed to load: <url>` warnings on broken images.
- **Inspection surface:** DevTools Elements panel — every `.card-image img` has `loading="lazy"`, a Wikimedia `src` URL, and descriptive `alt` text. CSS `.card-image` enforces `max-height: 220px`, `overflow: hidden`, `object-fit: cover`.
- **Failure state:** Broken images get `.img-error` class (hides broken icon) and parent `.card-image` gets `.img-fallback` class (shows sepia background with truncated alt text via `::after`).
