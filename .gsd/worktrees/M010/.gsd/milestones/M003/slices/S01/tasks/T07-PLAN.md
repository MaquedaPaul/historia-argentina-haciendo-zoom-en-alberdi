---
estimated_steps: 10
estimated_files: 2
---

# T07: Integrate all cards into index.html with sub-period structure

**Slice:** S01 — Content research, verification, and HTML integration
**Milestone:** M003

## Description

The mechanical integration task: take all verified content from S01-CONTENT-DRAFT.md and build it into `index.html` as HTML cards following established templates. Replace the 3 placeholder cards in `#periodo-revolucion` with the full 19-card set organized into 4 sub-period groups. Add sub-period CSS. This is the largest single task by line count (~600-800 new HTML lines).

## Steps

1. Read S01-CONTENT-DRAFT.md for the complete content (20 entries + 3 connecting narratives + image URLs).
2. Read the existing card templates in `#periodo-colonial` section for exact HTML structure of card-hecho, card-opinion, and card-rumor variants.
3. Remove the 3 placeholder cards in `#periodo-revolucion` (the `<div class="events-grid events-grid--certeza">` containing Primera Junta hecho, Alberdi opinión, and Moreno rumor cards).
4. Build the sub-period structure inside `#periodo-revolucion .period-body` (after the existing period-intro):
   - `<div id="rev-1800-1820" class="sub-period">` with `<h3 class="sub-period__title">Revolución e Independencia (1800–1820)</h3>` and `<div class="events-grid events-grid--certeza">` containing 5 cards
   - `.alberdi-quote` connecting blockquote after sub-period 1
   - `<div id="rev-1820-1835" class="sub-period">` with 4 cards
   - `.alberdi-quote` connecting blockquote after sub-period 2
   - `<div id="rev-1835-1852" class="sub-period">` with 6 cards
   - `.alberdi-quote` connecting blockquote after sub-period 3
   - `<div id="rev-1852-1860" class="sub-period">` with 4 cards (total 19 — note: one event from research may be absorbed into connecting narrative if count adjustment needed)
5. For each card, use the exact template from the colonial section:
   - **card-hecho**: `<article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho">` → certeza indicator → `.card-image` with `<img>` (or `.card-image-placeholder` if no image) → year → title → excerpt → `<footer class="card-source"><cite>...</cite></footer>`
   - **card-opinion**: same wrapper with `data-certeza="opinion"` → certeza indicator → image → year → title → `<blockquote class="card-opinion__quote">` with `<footer class="card-opinion__attribution">`
   - **card-rumor**: same wrapper with `data-certeza="rumor"` → certeza indicator → image → year → title → italic excerpt → `<footer class="card-rumor__origin">`
6. Set `--reveal-delay` stagger on cards within each sub-period group (reset to 0ms at start of each group, increment 80ms per card).
7. Add `<img>` tags with Wikimedia URLs inside `.card-image` wrappers. Use descriptive `alt` text. The `initImageFallbacks()` in app.js will auto-discover these.
8. Add ~30-40 lines of CSS to `styles.css` for `.sub-period` styling: `.sub-period__title` (typography, spacing, subtle decorative element), margin between sub-periods, optional sub-period divider line.
9. Open in browser and verify: card count, certeza indicators, images loading, reveal animations firing, stagger timing.
10. Run DOM queries to confirm counts match expectations.

## Must-Haves

- [ ] All 3 placeholder cards removed
- [ ] 4 sub-period `<div>` wrappers with correct IDs present
- [ ] 15+ cards with `data-certeza` attributes integrated
- [ ] 3 `.alberdi-quote` connecting blockquotes between sub-periods
- [ ] All cards use established template structure exactly
- [ ] `--reveal-delay` stagger applied per sub-period group
- [ ] `.card-image` wrappers with `<img>` tags for events with images
- [ ] Sub-period CSS added to `styles.css`

## Verification

- Open `index.html` in browser
- `document.querySelectorAll('#periodo-revolucion [data-certeza]').length >= 15`
- `document.querySelectorAll('#periodo-revolucion .sub-period').length === 4`
- `document.querySelectorAll('#periodo-revolucion .card-image img').length >= 14`
- `document.querySelectorAll('#periodo-revolucion .alberdi-quote').length >= 3`
- Visual: certeza indicators show green (hecho), blue (opinión), amber (rumor)
- Visual: images load (or fallback triggers)
- Visual: reveal stagger fires when scrolling through each sub-period

## Inputs

- `.gsd/milestones/M003/slices/S01/S01-CONTENT-DRAFT.md` — complete verified content with image URLs
- `index.html` lines ~293-396 — existing `#periodo-revolucion` section with 3 placeholder cards
- `styles.css` — existing certeza card CSS (lines ~769+)
- Colonial section in `index.html` — card templates for exact HTML structure reference

## Expected Output

- `index.html` — `#periodo-revolucion` section rewritten with 4 sub-periods, 15-19 cards, 3 connecting narratives (~600-800 new lines, replacing ~100 lines of placeholders)
- `styles.css` — ~30-40 new lines for `.sub-period` styling
