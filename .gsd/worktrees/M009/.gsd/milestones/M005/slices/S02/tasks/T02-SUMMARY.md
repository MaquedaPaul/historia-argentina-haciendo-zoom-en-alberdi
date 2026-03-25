---
id: T02
parent: S02
milestone: M005
provides:
  - Golden glow keyframe animation on Revolución de Mayo and Caseros event cards, firing once on scroll-reveal
  - prefers-reduced-motion: reduce disables glow entirely via @media block
  - document.querySelectorAll('.card--key-event') returns exactly 2 elements for runtime inspection
key_files:
  - index.html
  - styles.css
key_decisions:
  - Used box-shadow pulse (not border or background) for the glow — composites on GPU, no reflow, works on top of existing transitions
  - 0.3s animation-delay on .reveal--visible.card--key-event so the reveal fade-in starts before the glow fires — avoids both effects competing at t=0
  - animation-fill-mode forwards and default iteration-count (1) — glow plays exactly once and holds final state (box-shadow: 0) without re-triggering
  - prefers-reduced-motion block targets .card--key-event (not .reveal--visible.card--key-event) so the override applies regardless of reveal state
patterns_established:
  - Reveal-gated keyframe: selector .reveal--visible.card--key-event triggers animation the moment IntersectionObserver adds reveal--visible; no extra JS needed
  - Reduced-motion override on base class: @media (prefers-reduced-motion: reduce) { .card--key-event { animation: none; } } catches the animation before it fires
observability_surfaces:
  - document.querySelectorAll('.card--key-event').length — should be 2; 0 means class missing from index.html
  - document.querySelectorAll('.reveal--visible.card--key-event').length — should be 2 after both cards scroll into view
  - getComputedStyle(card).animationName — returns 'key-event-glow' when card is revealed; 'none' when prefers-reduced-motion is active
  - getComputedStyle(card).animationFillMode — should be 'forwards'; if empty the glow may flicker at end
  - '@keyframes key-event-glow' parseable in stylesheet rules — if missing, styles.css change was not saved
duration: ~20m
verification_result: passed
completed_at: 2026-03-19
blocker_discovered: false
---

# T02: Add special glow animation to key event cards

**Added `card--key-event` class to the Revolución de Mayo and Caseros cards, plus a `@keyframes key-event-glow` CSS animation that pulses a golden `box-shadow` once when each card is first revealed by the Intersection Observer, with full `prefers-reduced-motion` support.**

## What Happened

Added `card--key-event` class to two `<article>` elements in `index.html`:
- Line 339: Revolución de Mayo card (El Cabildo Abierto y la Revolución de Mayo, 25 de mayo de 1810) inside `#rev-1800-1820`
- Line 715: Batalla de Caseros card (Caseros, 3 de febrero de 1852: el fin del rosismo) inside `#rev-1835-1852`

In `styles.css`, added three CSS blocks after the existing reveal `prefers-reduced-motion` block (line 848):

1. **`@keyframes key-event-glow`**: `box-shadow` pulse — 0% transparent → 40% `rgba(184,134,11,0.25)` glow at 20px spread → 100% transparent. 
2. **`.reveal--visible.card--key-event { animation: key-event-glow 1.2s ease-in-out 0.3s forwards; }`**: fires once when the IntersectionObserver adds `reveal--visible` to the card. The 0.3s delay staggers it after the fade-in starts.
3. **`@media (prefers-reduced-motion: reduce) { .card--key-event { animation: none; } }`**: unconditionally disables the glow for motion-sensitive users.

Also added inline documentation comment above `@keyframes key-event-glow` with runtime inspection commands and failure-mode descriptions.

Added a failure-path diagnostic step to the slice plan's Verification section (pre-flight gap fix).

## Verification

- **`document.querySelectorAll('.card--key-event').length === 2`** ✅ — exactly 2 elements
- **`document.querySelectorAll('.reveal').length === 52`** ✅ — no regression
- **Revolución de Mayo card `animationName`**: `key-event-glow` ✅ after scroll-reveal
- **Caseros card `animationName`**: `key-event-glow` ✅ after scroll-reveal
- **`animationFillMode`**: `forwards` ✅ on both cards
- **`animationDuration`**: `1.2s` ✅ on both cards
- **`animationDelay`**: `0.3s` ✅ on both cards
- **`reveal--visible` applied**: both cards `opacity: 1; transform: matrix(1,0,0,1,0,0)` ✅ — reveal fade/slide not broken
- **`@keyframes key-event-glow` in stylesheet**: `true` ✅
- **`@media (prefers-reduced-motion)` rule for `.card--key-event`**: `true` ✅
- **No console errors**: 0 ✅
- **No failed network requests**: 0 ✅
- **`document.querySelectorAll('.reveal--visible.card--key-event').length === 2`** ✅ after both cards scrolled into view

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `document.querySelectorAll('.card--key-event').length` | — | ✅ pass (= 2) | immediate |
| 2 | `document.querySelectorAll('.reveal').length` | — | ✅ pass (= 52) | immediate |
| 3 | `getComputedStyle(revCard).animationName` | — | ✅ pass ('key-event-glow') | immediate |
| 4 | `getComputedStyle(caserosCard).animationName` | — | ✅ pass ('key-event-glow') | immediate |
| 5 | `getComputedStyle(revCard).animationFillMode` | — | ✅ pass ('forwards') | immediate |
| 6 | `getComputedStyle(revCard).animationDelay` | — | ✅ pass ('0.3s') | immediate |
| 7 | `revCard.classList.contains('reveal--visible')` | — | ✅ pass (true) | immediate |
| 8 | `@keyframes key-event-glow` in stylesheet | — | ✅ pass (true) | immediate |
| 9 | `@media prefers-reduced-motion` block for `.card--key-event` | — | ✅ pass (true) | immediate |
| 10 | `browser_assert no_console_errors` | 0 | ✅ pass | immediate |
| 11 | `browser_assert no_failed_requests` | 0 | ✅ pass | immediate |

## Diagnostics

Inspect the glow system at runtime:

```js
// Verify both key-event cards are present
document.querySelectorAll('.card--key-event').length; // should be 2

// Check which cards are currently animated (after scrolling into view)
document.querySelectorAll('.reveal--visible.card--key-event').length;

// Inspect animation state on the Revolución de Mayo card
const revCard = document.querySelectorAll('.card--key-event')[0];
getComputedStyle(revCard).animationName;       // 'key-event-glow' if revealed, 'none' if reduced-motion
getComputedStyle(revCard).animationFillMode;   // 'forwards'
getComputedStyle(revCard).animationDuration;   // '1.2s'

// Verify @keyframes is defined
Array.from(document.styleSheets).some(sheet =>
  Array.from(sheet.cssRules || []).some(r => r.name === 'key-event-glow')
);

// Check prefers-reduced-motion @media rule is present
Array.from(document.styleSheets).some(sheet =>
  Array.from(sheet.cssRules || []).some(r =>
    r.conditionText?.includes('prefers-reduced-motion') &&
    Array.from(r.cssRules || []).some(inner => inner.selectorText?.includes('card--key-event'))
  )
);
```

**Failure modes:**
- `querySelectorAll('.card--key-event').length === 0` → class not added to `index.html`
- `animationName === 'none'` when scrolled into view → `.reveal--visible` not being applied by IntersectionObserver; check `app.js` reveal logic
- Glow repeats → `animation-iteration-count` was accidentally set to `infinite`; check `.reveal--visible.card--key-event` rule
- Glow plays in reduced-motion → `@media` override not applied; check selector specificity (base class `.card--key-event` should override `.reveal--visible.card--key-event` inside `@media` block due to media block wrapping)

## Deviations

None. All 5 plan steps executed as written.

## Known Issues

None.

## Files Created/Modified

- `index.html` — Added `card--key-event` class to Revolución de Mayo card (line 339) and Caseros card (line 715)
- `styles.css` — Added `@keyframes key-event-glow`, `.reveal--visible.card--key-event` animation rule, and `@media (prefers-reduced-motion: reduce)` override for `.card--key-event`
- `.gsd/milestones/M005/slices/S02/S02-PLAN.md` — Added failure-path diagnostic to Verification section (pre-flight gap fix) and marked T02 done
