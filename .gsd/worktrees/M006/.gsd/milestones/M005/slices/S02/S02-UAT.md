# S02: Parallax and Special Card Animations — UAT

**Milestone:** M005
**Written:** 2026-03-19

## UAT Type

- UAT mode: live-runtime
- Why this mode is sufficient: Both features (parallax and card glow) are purely visual and scroll-dependent. DOM inspection + computed style queries confirm the animations are wired correctly. The glow animation timing (1.2s) can be confirmed by watching the browser, and the parallax offset can be verified numerically via `--parallax-y` values. Browser DevTools emulation covers the reduced-motion path without requiring a real OS preference change.

## Preconditions

- Local server running at `http://localhost:8765` (or equivalent static file server from the project root)
- Browser viewport set to **1280px wide** for desktop tests
- Browser DevTools open (F12 / Cmd+Option+I) with Console tab ready
- Page fully loaded (no pending network requests)
- Scroll position at top of page before each test

---

## Smoke Test

Open http://localhost:8765 in browser. Open DevTools Console and run:

```js
document.querySelectorAll('.card--key-event').length    // → 2
document.querySelectorAll('.period').length              // → 3
document.querySelectorAll('.reveal').length              // → 52
document.querySelector('#periodo-colonial').style.getPropertyValue('--parallax-y')  // → e.g. "-21px"
```

**Expected:** All four return non-zero / non-empty values. If `--parallax-y` is an empty string, `initParallax` did not run — check the Console for `[Parallax]` log messages.

---

## Test Cases

### 1. Parallax initializes and logs correctly

1. Load http://localhost:8765 with scroll at top
2. Open DevTools → Console
3. **Expected:** Console shows `[Parallax] Initialized with 3 sections.`
4. Run: `['#periodo-colonial','#periodo-revolucion','#periodo-nacional'].map(id => document.querySelector(id).style.getPropertyValue('--parallax-y'))`
5. **Expected:** Array of 3 non-empty strings (e.g. `["-21px", "-30px", "-30px"]`). All values within the range `[-30px, 30px]`.

---

### 2. Parallax offset updates on scroll

1. Load page with scroll at top
2. Run in Console: `const before = document.querySelector('#periodo-colonial').style.getPropertyValue('--parallax-y'); before`
3. Note the initial value (should be a negative number near the capped −30px at page bottom, or a smaller absolute value if colonial is partially visible)
4. Slowly scroll down ~500px (hold arrow key or drag scrollbar)
5. Run: `document.querySelector('#periodo-colonial').style.getPropertyValue('--parallax-y')`
6. **Expected:** Value has changed from the initial reading. As the colonial section moves upward (past the viewport), the value increases toward +30px. As it enters from the bottom, the value is a negative number moving toward 0.

---

### 3. Parallax ::before pseudo-element is active and positioned correctly

1. Load page
2. Run in Console:
   ```js
   const colonial = document.querySelector('.period--colonial');
   const cs = getComputedStyle(colonial, '::before');
   ({ transform: cs.transform, zIndex: cs.zIndex, willChange: cs.willChange })
   ```
3. **Expected:**
   - `transform`: contains a matrix with a non-zero Y translation (e.g. `"matrix(1,0,0,1,0,-21)"`)
   - `zIndex`: `"-1"` (behind the section content)
   - `willChange`: `"transform"`

---

### 4. Featured section accent bar preserved after ::before migration

1. Run in Console:
   ```js
   const feat = document.querySelector('.period--featured');
   const after = getComputedStyle(feat, '::after');
   ({ height: after.height, zIndex: after.zIndex })
   ```
2. **Expected:** `height: "4px"`, `zIndex: "1"`
3. Scroll to the revolution period header and visually inspect the top edge of the section
4. **Expected:** A faint blue/celeste horizontal gradient bar is visible at the very top of the `#periodo-revolucion` section

---

### 5. Revolución de Mayo card glows on scroll-reveal

1. Load page with scroll at top (navigate to http://localhost:8765 fresh, not already mid-page)
2. Slowly scroll down until the colonial section cards have appeared
3. Continue scrolling into the `#rev-1800-1820` sub-section
4. **Expected:** As the "El Cabildo Abierto y la Revolución de Mayo" card enters the viewport, it first fades/slides in (existing reveal animation), then approximately 0.3s later a golden glow (`box-shadow`) pulses once and fades out over ~1.2s
5. After the animation completes, run in Console:
   ```js
   const revCard = document.querySelectorAll('.card--key-event')[0];
   getComputedStyle(revCard).animationName   // → "key-event-glow"
   getComputedStyle(revCard).animationFillMode // → "forwards"
   ```
6. **Expected:** Both values match. Card opacity is 1 (fully revealed). No repeated glowing.

---

### 6. Caseros card glows on scroll-reveal

1. Continue scrolling from test 5 (or navigate to #rev-1835-1852)
2. **Expected:** As "Caseros, 3 de febrero de 1852: el fin del rosismo" enters the viewport, the same golden glow animation fires once and stops
3. Run in Console:
   ```js
   const caserosCard = document.querySelectorAll('.card--key-event')[1];
   getComputedStyle(caserosCard).animationName   // → "key-event-glow"
   getComputedStyle(caserosCard).animationFillMode // → "forwards"
   revCard.classList.contains('reveal--visible')  // → true
   ```
4. **Expected:** All match. Run: `document.querySelectorAll('.reveal--visible.card--key-event').length`
5. **Expected:** `2` (both cards revealed, both glow animations run)

---

### 7. Glow animation keyframe is defined and does not repeat

1. Run in Console:
   ```js
   Array.from(document.styleSheets).some(sheet => {
     try { return Array.from(sheet.cssRules).some(r => r.name === 'key-event-glow'); }
     catch(e) { return false; }
   })
   ```
2. **Expected:** `true`
3. Scroll both key-event cards out of view and back into view (they are already `reveal--visible`)
4. **Expected:** The glow does NOT replay. The `animation-fill-mode: forwards` combined with `animation-iteration-count: 1` (default) ensures the animation is a one-shot event.

---

### 8. No regression — reveal element count

1. Run in Console: `document.querySelectorAll('.reveal').length`
2. **Expected:** `>= 52`. S02 added no new `.reveal` elements; this must not decrease from the M004 baseline.

---

## Edge Cases

### Reduced-motion: parallax disabled

1. Open DevTools → Rendering panel (three-dot menu → More Tools → Rendering)
2. Set **"Emulate CSS media feature prefers-reduced-motion"** to `prefers-reduced-motion: reduce`
3. Reload the page (http://localhost:8765)
4. Run in Console: `document.querySelector('#periodo-colonial').style.getPropertyValue('--parallax-y')`
5. **Expected:** Empty string `""` — `initParallax()` returned early without setting the property
6. Check Console for: `[Parallax] Skipped — prefers-reduced-motion: reduce is active.`
7. **Expected:** That exact message appears (not the "Initialized" message)
8. Run: `getComputedStyle(document.querySelector('.period--colonial'), '::before').transform`
9. **Expected:** `"none"` (CSS `@media` block overrides any transform)

---

### Reduced-motion: glow disabled

1. With `prefers-reduced-motion: reduce` still emulated (from edge case above)
2. Scroll to the Revolución de Mayo card
3. **Expected:** Card fades/slides in normally (existing reveal animation), but **no golden glow appears**
4. Run in Console:
   ```js
   const card = document.querySelectorAll('.card--key-event')[0];
   getComputedStyle(card).animationName  // → "none"
   ```
5. **Expected:** `"none"` — the `@media (prefers-reduced-motion: reduce) { .card--key-event { animation: none; } }` override is active
6. Reset the emulation to "No override" and reload to restore normal behavior

---

### No horizontal overflow introduced

1. Set viewport to **1280px** (default)
2. Run: `document.documentElement.scrollWidth <= document.documentElement.clientWidth`
3. **Expected:** `true`
4. Resize viewport to **375px** (DevTools device toolbar)
5. Run the same check
6. **Expected:** `true` — the parallax `::before` with `inset: -20% 0` must not protrude horizontally (it uses `overflow: hidden` on `.period`)

---

## Failure Signals

- `document.querySelectorAll('.card--key-event').length === 0` → `card--key-event` class was not added to `index.html`; check lines 339 and 715
- `--parallax-y` is empty string on load → `initParallax` did not run or returned early; check for `[Parallax]` in console
- `[Parallax] No .period elements found` in console → DOM structure has changed; `.period` class missing from section elements
- `animationName === 'none'` when card is visible (and reduced-motion is NOT active) → `.reveal--visible` class not being applied by IntersectionObserver; check `app.js` reveal observer
- Glow repeats on every scroll-out/scroll-in → `animation-iteration-count` accidentally set to `infinite`; check `.reveal--visible.card--key-event` CSS rule
- Accent bar missing from revolution section header → `::after` rule on `.period--featured` is absent; check `styles.css` around line 421
- Horizontal overflow visible → `overflow: hidden` missing from `.period` rule; check `styles.css`

---

## Not Proven By This UAT

- **Visual smoothness / jank during scroll** — The RAF guard and passive listener are in place, but actual 60fps smoothness depends on the user's GPU/CPU and cannot be confirmed by console checks alone. Human visual inspection during a slow scroll at desktop is needed.
- **Glow animation aesthetics** — Whether the golden glow color (`rgba(184,134,11,0.25)`) reads as "distinctive" or "subtle" is a subjective judgment. The color uses the same `--gold` value as the certeza amber palette. Human review during S04 UAT is recommended.
- **`prefers-reduced-motion` with an actual OS setting** — DevTools emulation tests the CSS media query path. The JS `window.matchMedia` check is also exercised by the emulation during page reload. Full OS-level testing (macOS Accessibility settings → Reduce Motion) would confirm both layers simultaneously.
- **Sound system integration** — S03 will add ambient audio. This UAT does not verify that the scroll listener from `initParallax` and any future S03 scroll listener coexist without interference.
- **Lighthouse scores** — Deferred to S04.

---

## Notes for Tester

- The glow animation is intentionally subtle — `rgba(184,134,11,0.25)` at 25% opacity. You are looking for a brief warm golden shimmer around the card, not a bright flash. If you can barely see it, that is by design.
- The parallax effect is also conservative (±30px max offset across sections that can be thousands of pixels tall). The movement is most visible when scrolling slowly through the transition between sections.
- When testing "glow does not repeat," the key mechanism is that `.reveal--visible` is only added once per element by the IntersectionObserver. Scrolling the card out and back will not remove `.reveal--visible`, so the CSS selector `.reveal--visible.card--key-event` will not re-trigger the animation (the `forwards` fill mode holds the end state).
- The `[Parallax]` console messages use `console.debug` — make sure your DevTools console is not filtering out "Verbose" level messages if you don't see them.
