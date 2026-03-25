---
estimated_steps: 7
estimated_files: 3
---

# T03: Add expand/collapse toggle for detailed event cards

**Slice:** S02 — Sub-navigation, animated timeline, expand/collapse interactivity, and responsive verification
**Milestone:** M003

## Description

Add expand/collapse functionality to 4+ major event cards so users can read extended detail without overwhelming the initial scroll experience. This is new JS interactivity for the project — the existing JS only has scroll spy and reveal animations. Must not break the reveal system.

## Steps

1. Identify the 4+ cards that get expand/collapse: Revolución de Mayo (1810), Generación del 37 exile, Alberdi's *Bases*, and Constitución 1853. These are the "full detailed" events that have the most content worth expanding.
2. For each selected card, add markup after the main excerpt/quote:
   ```html
   <button class="card-expand-toggle" aria-expanded="false">
     <span class="card-expand-toggle__text">Ver más</span>
     <span class="card-expand-toggle__icon" aria-hidden="true">▼</span>
   </button>
   <div class="card-detail" hidden>
     <p>Extended content: additional sentences, secondary quotes, extra context...</p>
   </div>
   ```
3. CSS for expand/collapse (~40 lines):
   - `.card-detail[hidden]`: display none (native HTML hidden attribute as base)
   - `.card-detail`: padding, border-top, transition on max-height and opacity
   - `.card-detail--expanded`: visible with smooth transition (remove `hidden` attr + add class)
   - `.card-expand-toggle`: styled as a subtle text button at card bottom, accent color on hover
   - `.card-expand-toggle[aria-expanded="true"] .card-expand-toggle__icon`: rotate 180°
4. JS in app.js (~25 lines): Use event delegation on `#periodo-revolucion` for click events on `.card-expand-toggle`. On click: find sibling `.card-detail`, toggle `hidden` attribute, toggle `.card-detail--expanded`, update `aria-expanded`, update button text ("Ver más" ↔ "Ver menos").
5. Ensure expanded content doesn't break the reveal system: cards are already revealed by the time a user clicks expand (they're reading the card), so the Intersection Observer won't re-trigger. The expand only changes card height, which is fine.
6. Add `prefers-reduced-motion` handling: if reduced motion, skip the transition (instant show/hide).
7. Test: click "Ver más" → detail expands. Click "Ver menos" → collapses. Scroll away and back → card maintains state. At 320px → expand still works, content doesn't overflow.

## Must-Haves

- [ ] `<button class="card-expand-toggle">` on ≥4 major event cards
- [ ] `<div class="card-detail">` with extended content hidden by default
- [ ] Click toggle shows/hides detail with smooth transition
- [ ] `aria-expanded` attribute updates correctly
- [ ] Button text changes between "Ver más" and "Ver menos"
- [ ] Does not break reveal animations
- [ ] Responsive at 320px

## Verification

- `document.querySelectorAll('.card-expand-toggle').length >= 4`
- Click a toggle → `aria-expanded` changes to "true" and `.card-detail` becomes visible
- Click again → `aria-expanded` changes to "false" and content hides
- Scroll to unrevealed cards → reveal animation still fires correctly
- At 320px → expand/collapse works, no overflow issues

## Inputs

- `index.html` — S01's card structure (identify the 4+ cards by their titles/IDs)
- `app.js` — existing event delegation patterns (main scroll spy uses Intersection Observer, not delegation, but the pattern is straightforward)
- `styles.css` — card styling context

## Expected Output

- `index.html` — 4+ cards modified with expand toggle markup and extended content
- `styles.css` — ~40 lines for expand/collapse styling
- `app.js` — ~25 lines for expand/collapse event delegation
