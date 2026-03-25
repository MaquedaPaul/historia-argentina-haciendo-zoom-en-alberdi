---
estimated_steps: 6
estimated_files: 1
---

# T03: HTML integration — replace 3 stubs with 7 verified cards

**Slice:** S01 — Contenido verificado + imágenes + integración HTML
**Milestone:** M004

## Description

Replace the 3 placeholder stubs in `#periodo-nacional .events-grid` with the full 7-card structure using verified content from T01 and API-verified image URLs from T02. Add `events-grid--certeza` to the grid container. Add one `.alberdi-quote` closing connector after the grid to seal Alberdi's narrative arc. No CSS or JS changes — all templates and systems are established.

## Steps

1. Read `S01-CONTENT-DRAFT.md` and `T02-IMAGE-ANNOTATIONS.md` for all card content and image URLs.
2. In `index.html`, locate the `#periodo-nacional .events-grid` div (lines ~984–1000). Replace the entire div (opening tag through closing tag) with a new `<div class="events-grid events-grid--certeza" aria-label="Eventos del período nacional">` containing all 7 cards.
3. For each of the 7 events, write the card following the established template:
   - **Hecho cards**: `<article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: {N*80}ms">` → `card-certeza-indicator` (✓ / "Hecho documentado") → `card-image` with `<img>` (Wikimedia URL, descriptive alt, `loading="lazy"`) → `event-card__year` → `event-card__title` → `event-card__excerpt` → `card-source` footer with `<cite>`.
   - **Opinión card**: Same structure but with `card-opinion`, certeza icon 💬 / "Opinión atribuida", and `<blockquote class="card-opinion__quote">` with `card-opinion__attribution` footer.
   - For Conquista del Desierto: add nota historiográfica inline (following M003 pattern for debate cards).
   - For Alberdi death card: include [VERIFICACIÓN PENDIENTE] flag in visible text (nota de certeza).
4. After the `events-grid--certeza` div (still inside `.period-body`), add a closing `.alberdi-quote` blockquote — a brief reflection on Alberdi's legacy as intellectual father of the Constitution, tying back to the narrative thread from M002 and M003.
5. Verify stagger delays: cards at 0ms, 80ms, 160ms, 240ms, 320ms, 400ms, 480ms.
6. Verify HTML validity: no unclosed tags, all `<article>` elements properly closed, `<img>` tags have `alt` attributes.

## Must-Haves

- [ ] `events-grid--certeza` class on the grid container
- [ ] 7 cards with `data-certeza` attributes and correct certeza visual treatment
- [ ] All 7 cards have `<img>` with Wikimedia URLs and descriptive `alt` text
- [ ] `--reveal-delay` stagger from 0ms to 480ms across 7 cards
- [ ] Closing `.alberdi-quote` connector after the events grid
- [ ] No modifications to `styles.css` or `app.js`
- [ ] All 3 placeholder stubs removed

## Verification

- `document.querySelectorAll('#periodo-nacional [data-certeza]').length === 7`
- `document.querySelectorAll('#periodo-nacional .card-image img').length === 7`
- `document.querySelector('#periodo-nacional .events-grid--certeza') !== null`
- `document.querySelectorAll('#periodo-nacional .alberdi-quote').length >= 1`
- `document.querySelectorAll('#periodo-nacional .img-error, #periodo-nacional .img-fallback').length === 0` (after page load)
- Visual: cards render at 1200px with certeza badges, images, and stagger animation
- Visual: cards stack correctly at 375px mobile width

## Inputs

- `.gsd/milestones/M004/slices/S01/S01-CONTENT-DRAFT.md` — verified event content (titles, excerpts, certeza, sources, quotes)
- `.gsd/milestones/M004/slices/S01/T02-IMAGE-ANNOTATIONS.md` — API-verified Wikimedia URLs, alt text, licenses
- `index.html` lines ~964–1000 — current `#periodo-nacional` section with 3 placeholder stubs

## Expected Output

- `index.html` — `#periodo-nacional` section rewritten with 7 real event cards + closing Alberdi quote

## Observability Impact

**Signals that change after T03 executes:**

- `document.querySelectorAll('#periodo-nacional [data-certeza]').length` → 7 (was: undefined / 0 with placeholder stubs)
- `document.querySelectorAll('#periodo-nacional .card-image img').length` → 7 (was: 0)
- `document.querySelector('#periodo-nacional .events-grid--certeza')` → non-null (was: null — grid had no `--certeza` modifier)
- `document.querySelectorAll('#periodo-nacional .alberdi-quote').length` → 1 (was: 0)
- `document.querySelectorAll('#periodo-nacional .event-card--placeholder').length` → 0 (was: 3)

**Console signal (pre-existing app.js initImageFallbacks):** On page load, `app.js` auto-discovers `.card-image img` elements; a console log confirms the count. After T03, the count for `#periodo-nacional` images jumps from 0 to 7. If it shows fewer, a Wikimedia URL failed to resolve.

**Failure visibility:**
- `.img-error` or `.img-fallback` CSS class on any `#periodo-nacional .card-image img` element indicates a broken Wikimedia URL. Inspect with: `document.querySelectorAll('#periodo-nacional .img-error, #periodo-nacional .img-fallback')`.
- If broken: re-verify the URL against T02-IMAGE-ANNOTATIONS.md. The Campaña del Desierto filename contains `ñ` (URL-encoded as `%C3%B1`) and an uppercase `.JPG` extension — both matter in the thumbnail path.
- The CC BY-SA 2.0 attribution block for Evento 7 (Alberdi portrait) must remain in the HTML; its absence is an IP compliance failure, not a rendering failure.

**Inspection commands for future agents:**
```
# Verify all 7 cards present
document.querySelectorAll('#periodo-nacional [data-certeza]').length  // → 7

# Check certeza distribution
Array.from(document.querySelectorAll('#periodo-nacional [data-certeza]')).map(e => e.dataset.certeza)
// → ["hecho","hecho","hecho","hecho","hecho","hecho","opinion"]

# Verify stagger delays
Array.from(document.querySelectorAll('#periodo-nacional .events-grid--certeza article')).map(e => e.style.getPropertyValue('--reveal-delay'))
// → ["0ms","80ms","160ms","240ms","320ms","400ms","480ms"]

# Check no broken images
document.querySelectorAll('#periodo-nacional .img-error, #periodo-nacional .img-fallback').length  // → 0
```
