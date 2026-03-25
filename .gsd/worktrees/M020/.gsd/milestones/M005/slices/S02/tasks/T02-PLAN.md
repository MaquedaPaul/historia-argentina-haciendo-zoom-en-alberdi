---
estimated_steps: 5
estimated_files: 2
---

# T02: Add special glow animation to key event cards

**Slice:** S02 — Parallax and Special Card Animations
**Milestone:** M005

## Description

Add a distinctive golden glow animation to the Revolución de Mayo and Batalla de Caseros event cards that fires once when the cards are first revealed on scroll. This uses the existing reveal system — no new IntersectionObserver needed. The glow is a `box-shadow` pulse keyframe gated on `.reveal--visible.card--key-event`.

## Steps

1. In `index.html`, identify the Revolución de Mayo card (first card in `#rev-1800-1820` sub-period) and the Batalla de Caseros card (in `#rev-1835-1852`). Add the class `card--key-event` to each card's root element (the `.event-card` div).
2. In `styles.css`, add `@keyframes key-event-glow`: `0% { box-shadow: 0 0 0 0 rgba(184,134,11,0); } 40% { box-shadow: 0 0 20px 4px rgba(184,134,11,0.25); } 100% { box-shadow: 0 0 0 0 rgba(184,134,11,0); }`. Duration 1.2s, ease-in-out, `forwards` fill mode.
3. Add rule: `.reveal--visible.card--key-event { animation: key-event-glow 1.2s ease-in-out 0.3s forwards; }` — the 0.3s delay lets the reveal fade-in start before the glow fires.
4. Add `prefers-reduced-motion` rule: `.card--key-event { animation: none; }`.
5. Test: scroll to Revolución de Mayo → golden glow pulse once. Scroll to Caseros → same. Enable reduced motion → no glow. Existing reveal fade/slide still works on both cards.

## Must-Haves

- [ ] `card--key-event` class on Revolución de Mayo and Caseros cards
- [ ] Golden glow fires once on reveal, does not repeat
- [ ] `prefers-reduced-motion` disables the glow
- [ ] Existing reveal-fade/reveal-slide transition not broken on these cards

## Verification

- Scroll to Revolución de Mayo card at 1280px: golden glow appears briefly on reveal
- Scroll to Caseros card: same golden glow
- `document.querySelectorAll('.card--key-event').length === 2`
- Enable `prefers-reduced-motion: reduce` → no glow animation
- `document.querySelectorAll('.reveal').length >= 52` (no regression)

## Inputs

- `index.html` — Revolución de Mayo card and Caseros card markup (inside `#periodo-revolucion`)
- `styles.css` — existing reveal CSS (lines 710-760), existing `prefers-reduced-motion` blocks
- T01 output — parallax already in place

## Expected Output

- `index.html` — `card--key-event` class added to 2 cards
- `styles.css` — `@keyframes key-event-glow` + `.reveal--visible.card--key-event` animation rule + reduced-motion fallback
