---
estimated_steps: 7
estimated_files: 1
---

# T02: Replace placeholder cards with verified content in index.html

**Slice:** S01 — Contenido histórico verificado integrado en cards
**Milestone:** M002

## Description

Take the verified content from T01's content draft and integrate it into `index.html`, replacing the 3 placeholder cards in `#periodo-colonial` with 6-7 properly structured certeza cards. Copy the exact HTML template patterns from the `periodo-revolucion` section to ensure CSS styling works correctly. Add reveal animation stagger delays. Enhance the intro paragraph.

## Steps

1. Upgrade the grid wrapper: change `<div class="events-grid"` to `<div class="events-grid events-grid--certeza"` on the colonial section's grid element (around line 96).
2. Delete all 3 `event-card--placeholder` div elements inside the colonial grid.
3. For each `hecho` event (5 cards): create an `<article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho">` element with the exact internal structure: `div.card-certeza-indicator` (✓ icon + "Hecho documentado"), `div.card-image-placeholder` with descriptive `aria-label` and inner text, `span.event-card__year`, `h3.event-card__title`, `p.event-card__excerpt`, and `footer.card-source` with `cite` element.
4. For the `opinión` event (1 card): create an `<article class="event-card card-opinion reveal reveal-slide" data-certeza="opinion">` with `div.card-certeza-indicator` (💬 icon + "Opinión atribuida"), image placeholder, year, title, and `blockquote.card-opinion__quote` containing `<p>` with the quote text and `footer.card-opinion__attribution` with `strong.card-opinion__author` and `span.card-opinion__context`.
5. For the `rumor` event (1 card): create an `<article class="event-card card-rumor reveal reveal-slide" data-certeza="rumor">` with `div.card-certeza-indicator` (⚠️ icon + `span.card-certeza-badge-rumor` "Rumor"), image placeholder, year, title, `p.event-card__excerpt.card-rumor__text`, and `footer.card-rumor__origin` with origin explanation.
6. Add stagger delays to all cards: `style="--reveal-delay: 0ms"`, `80ms`, `160ms`, `240ms`, `320ms`, `400ms`, `480ms` respectively.
7. Enhance the intro paragraph (`period-intro`) with richer panoramic context — expand it to 3-4 sentences covering the sweep of the colonial period while keeping it concise.

## Must-Haves

- [ ] Grid wrapper has `events-grid events-grid--certeza` class
- [ ] All 3 placeholder cards removed
- [ ] 6-7 new article elements with correct certeza classes and `data-certeza` attributes
- [ ] Every card has `reveal reveal-slide` classes
- [ ] Stagger delays applied via `--reveal-delay` custom property
- [ ] HTML structure matches `periodo-revolucion` templates exactly (class names, nesting, elements)
- [ ] Content matches the verified draft from T01 — no ad-hoc changes to facts/dates

## Verification

- Open `index.html` in browser at desktop viewport (~1200px+): colonial section shows 6-7 cards in a responsive grid
- Cards display correct certeza indicators: green border + ✓ for hecho, blue border + 💬 for opinión, amber border + ⚠️ for rumor
- Scroll past section — cards animate in with visible stagger (not all at once)
- Inspect DOM: every card has `data-certeza` attribute, grid has `events-grid--certeza` class
- Mobile viewport (~375px): cards stack in single column, all content readable

## Inputs

- `.gsd/milestones/M002/slices/S01/S01-CONTENT-DRAFT.md` — Verified content from T01
- `index.html` lines 140-212 — Card template patterns to replicate
- `index.html` lines 77-111 — Current colonial section to modify

## Expected Output

- `index.html` — Colonial section expanded from ~35 lines to ~200 lines with 6-7 verified certeza cards, upgraded grid, and enhanced intro
