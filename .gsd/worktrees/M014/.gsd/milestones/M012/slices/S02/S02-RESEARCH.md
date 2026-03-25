# S02: Verificación y Pulido — Research

**Date:** 2026-03-24

## Summary

S02 is pure browser verification of the S01 implementation. All static checks pass: `app.js` has no syntax errors, `styles.css` has balanced braces, all 7 sub-period IDs are present in the DOM, the init pipeline correctly places `initAccordions()` before `revealOnScroll()`, and the audio/sub-nav elements are all intact.

The implementation is ready to test in browser. S02 has one real task (T01: browser UAT) and a conditional task (T02: fix regressions). If T01 finds no issues, the slice is complete. If T01 finds issues, T02 fixes them. The research below documents everything the executor needs to know before opening DevTools.

## Recommendation

Start with the server, navigate the page, and run the DevTools diagnostic queries before clicking anything visual. The console prefix pattern (`[Accordion]`, `[Reveal]`, `[SubNav]`, `[Sound]`) gives instant health signals. If the console shows 7 sub-periods initialized, 6 collapsed, and 1 expanded — the implementation is correct. Then verify visual behavior: chevron rotation, animation smoothness, keyboard navigation, and mobile layout. Document any regressions as inline findings and fix them in T02.

## Implementation Landscape

### Key Files

- `index.html` (271KB, 2809 lines) — contains the 7 `.sub-period` divs inside `#periodo-revolucion`. All have `h3.sub-period__title` as the first child (confirmed). Sub-nav, audio elements, and reveal classes are all present.
- `app.js` (35KB, ~940 lines) — `initAccordions()` at lines 419–527; called at line 160, before `revealOnScroll()` at line 164. No syntax errors.
- `styles.css` (69KB) — accordion CSS block starts after `@media (max-width: 640px)` sub-period rules; `max-height: 1000rem` for expanded state, `prefers-reduced-motion` support present.

### Structure Confirmation (static analysis)

All 7 sub-periods inside `#periodo-revolucion` (confirmed via `querySelectorAll('#periodo-revolucion .sub-period')` returns 7):

| ID | h3 as first child | Notes |
|----|-------------------|-------|
| `rev-alberdi-formacion` | ✓ | index 0 — expanded by default |
| `rev-alberdi-quiroga` | ✓ | collapsed |
| `rev-1800-1820` | ✓ | collapsed |
| `rev-1820-1835` | ✓ | collapsed |
| `periodo-rosas` | ✓ | collapsed — 36 reveal elements, ~99KB content |
| `rev-1835-1852` | ✓ | collapsed |
| `rev-1852-1860` | ✓ | collapsed |

`#periodo-rosas` also carries `class="sub-period"` — JS picks it up as index 4 (collapsed). Its 36 `.reveal` children are inside the dynamically-created `.sub-period__body` wrapper and are correctly queued for reveal on expand via `triggerRevealInBody()`.

### Build Order

T01 (browser UAT) → T02 (fixes, if needed). There's no S02 code to write unless T01 finds regressions.

### Verification Approach

**Serve the page:** `npx http-server . -p 8080 -c-1` (or `python -m http.server 8080` — python is available). Navigate to `http://localhost:8080`.

**DevTools Console diagnostic queries (run before visual testing):**

```js
// 1. Accordion health — must be 6 collapsed, 1 expanded
document.querySelectorAll('.sub-period__body--collapsed').length;         // → 6
document.querySelectorAll('.sub-period__title--trigger[aria-expanded="true"]').length; // → 1

// 2. Init order correctness
document.querySelectorAll('.sub-period__body--collapsed .reveal--no-anim').length; // → 0 (critical)

// 3. Triggers created
document.querySelectorAll('.sub-period__title--trigger').length;           // → 7

// 4. Console prefix log: "[Accordion] Initialized with 7 sub-periods." must appear
// Check DevTools Console for [Accordion], [SubNav], [Sound], [Reveal] prefixes

// 5. Sub-nav active state
document.querySelector('.sub-nav__link--active');                          // → link to #rev-alberdi-formacion
```

**Visual checklist (desktop 1280px):**

1. 6 sub-periods show only their h3 header + chevron (▶) pointing right
2. `rev-alberdi-formacion` shows full content (expanded), chevron pointing down (▼)
3. Click any collapsed header → content expands smoothly in ~0.45s; chevron rotates 90°
4. Click expanded header → content collapses smoothly; chevron returns to ▶
5. Sub-nav sticky bar visible when scrolling within `#periodo-revolucion`
6. Sub-nav links highlight the currently visible sub-period
7. After expanding a sub-period and scrolling, cards reveal with fade animation
8. Sound toggle works (mute/unmute audio); track switches between periods

**Keyboard accessibility checklist:**

1. `Tab` focuses each `.sub-period__title--trigger` — visible focus ring (blue outline)
2. `Enter` on a focused trigger → toggles accordion
3. `Space` on a focused trigger → toggles accordion (no page scroll)
4. `aria-expanded` attribute updates correctly on each toggle (inspect in DevTools Elements tab)
5. `aria-controls` points to the body wrapper ID on each trigger

**Mobile checklist (375px viewport):**

1. All 6 accordions start collapsed; 1 expanded (same as desktop)
2. Sub-nav bar scrolls horizontally (overflow-x: auto) — all 7 links accessible
3. Accordion expand/collapse works with touch
4. Cards render in single column inside expanded sub-periods
5. `@media (prefers-reduced-motion: reduce)` check: toggle system preference, accordion should expand/collapse instantly

## Common Pitfalls

- **`#periodo-rosas` animation may feel slow at the end** — CSS animates `max-height` 0→1000rem uniformly over 0.45s, but actual content is ~875rem. The last ~12% of the animation time will run through "empty" space. This is a cosmetic limitation of the `max-height` transition technique. If it feels janky, the fix is to reduce `max-height` to `900rem` in `styles.css` — this keeps sufficient headroom while shortening the "empty" tail. Not a regression — was pre-existing in the design.

- **Sub-nav click to a collapsed sub-period does NOT auto-expand** — this is correct per spec (`sigue funcionando`). The user is scrolled to the h3 header, which is visible even when collapsed. They must click the header to expand. Do not add auto-expand unless the roadmap explicitly requires it.

- **`padding-right` on trigger may look like extra space** — `.sub-period__title--trigger` adds `padding-right: var(--space-xl)` as "space for chevron." Since the chevron `::after` uses `margin-left: auto` on a flex container, it's already pushed to the right edge of the h3. The `padding-right` creates extra space AFTER the chevron against the container edge. This is cosmetic and acceptable. Fix only if it visually crowds the layout on mobile.

- **Grep is unavailable in Windows shell** — use `node -e` equivalents for any static checks. This was established in S01.

- **`triggerRevealInBody()` uses synchronous `getBoundingClientRect()`** — it fires inside `transitionend` (post-expansion). Elements above viewport fold won't be force-revealed (they're handled by the existing IntersectionObserver's catch-up scroll listener). This is correct behavior.

## Open Risks

- **`#periodo-rosas` content height** — 36 reveal elements, ~99KB of content. If expanded content height actually exceeds 1000rem (16,000px), content would be clipped. Verify by running `document.querySelector('#periodo-rosas .sub-period__body').scrollHeight` in DevTools after expanding. Expect <14,000px. If > 16,000px, increase `max-height` to `1500rem` in `styles.css`.

- **Audio system on mobile Safari** — audio autoplay is blocked on iOS until user interaction. The sound toggle acts as the interaction gate. If the first click on the toggle doesn't activate sound, it may be a browser autoplay policy issue — not a regression from M012.
