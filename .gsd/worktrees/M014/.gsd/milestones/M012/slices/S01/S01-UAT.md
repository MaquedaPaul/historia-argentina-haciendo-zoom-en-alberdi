# S01: Accordion de Sub-períodos — UAT

**Milestone:** M012
**Written:** 2026-03-24

## UAT Type

- UAT mode: live-runtime
- Why this mode is sufficient: The accordion system is visual+interactive — collapsed/expanded state, CSS transitions, chevron rotation, keyboard navigation, and reveal-on-scroll re-trigger are all runtime behaviors that cannot be verified via static file inspection alone. Static checks (grep/node) confirmed implementation is present; browser UAT confirms it actually works.

## Preconditions

1. Open `index.html` from `C:/Users/gabri/Desktop/historia/` in Chrome or Firefox (open the main project root, NOT the worktree)
2. Open DevTools → Console tab
3. Navigate or scroll to the `#periodo-revolucion` section (the "Revolución e Independencia" section)
4. Do NOT pre-scroll — start from the top to ensure reveal system state is clean

## Smoke Test

Open DevTools Console immediately on load. Confirm you see:
```
[Accordion] Initialized with 7 sub-periods.
```
If this line is absent, `initAccordions()` did not run — stop and check the init pipeline in `app.js`.

## Test Cases

### 1. Initial State — 1 expanded, 6 collapsed

1. Load the page fresh (hard refresh: Ctrl+Shift+R)
2. Scroll to `#periodo-revolucion`
3. Observe all 7 sub-period headers

**Expected:**
- The first sub-period (`rev-alberdi-formacion` — "Formación de Alberdi") shows its full content (cards visible below the h3)
- Its h3 chevron (`▶`) points **downward** (rotated 90°)
- The remaining 6 sub-periods show only their h3 header — content is hidden
- Their chevrons point **right** (not rotated)

**DevTools Console evidence:**
```
[Accordion] Initially expanded: rev-alberdi-formacion
[Accordion] Initially collapsed: <id>  (× 6 lines)
```

**DevTools DOM evidence:**
```js
document.querySelectorAll('.sub-period__body--collapsed').length  // → 6
document.querySelectorAll('.sub-period__title--trigger[aria-expanded="true"]').length  // → 1
```

---

### 2. Click Toggle — Expand a Collapsed Sub-period

1. Click the h3 header of the second sub-period (e.g., "La Generación del 37")
2. Watch the body expand

**Expected:**
- The body slides open smoothly over ~0.45 seconds with a fade-in
- The chevron rotates from right (▶) to down (90°) during the transition
- `aria-expanded` changes from `"false"` to `"true"` on the h3
- Console logs: `[Accordion] Expanded: <id>`
- Cards inside the newly-expanded body animate in (reveal-on-scroll triggers)

**DevTools DOM evidence after expand:**
```js
document.querySelectorAll('.sub-period__body--collapsed').length  // → 5 (was 6)
```

---

### 3. Click Toggle — Collapse an Expanded Sub-period

1. Click the h3 of the currently-expanded sub-period (or any expanded one from Test 2)

**Expected:**
- The body slides closed smoothly over ~0.45 seconds with a fade-out
- The chevron rotates back from down to right
- `aria-expanded` changes from `"true"` to `"false"`
- Console logs: `[Accordion] Collapsed: <id>`
- Content is fully hidden after transition completes

---

### 4. Keyboard Navigation — Enter Key

1. Click anywhere on the page outside the accordions to blur focus
2. Press Tab repeatedly until a sub-period h3 trigger receives focus
3. Confirm visible focus ring (blue outline, `var(--color-celeste)`)
4. Press **Enter**

**Expected:**
- The focused accordion toggles (collapses if expanded, expands if collapsed)
- Same smooth transition as mouse click
- Same console log output as click

---

### 5. Keyboard Navigation — Space Key

1. Focus a sub-period h3 trigger (Tab to it)
2. Press **Space**

**Expected:**
- Same toggle behavior as Enter
- Page does NOT scroll (Space normally scrolls the page — the accordion handler should call `e.preventDefault()` for Space)

---

### 6. Reveal-on-Scroll Re-triggers After Expand

1. Collapse all sub-periods (click each expanded one to close it)
2. Scroll so the collapsed sub-period headers are in view but NOT expanded
3. Expand a collapsed sub-period by clicking its header
4. Observe the cards inside

**Expected:**
- Cards inside the newly-expanded body that are in the viewport animate in with their reveal animation (fade/slide)
- Console may log: `[Accordion] [Reveal] Triggered reveal in body: <id>`
- Cards NOT in the viewport after expand will animate in as you scroll to them (handled by the existing IntersectionObserver)

---

### 7. Init Order — No Premature reveal--no-anim on Collapsed Elements

1. Load page fresh
2. Run in DevTools Console:
   ```js
   document.querySelectorAll('.sub-period__body--collapsed .reveal--no-anim').length
   ```

**Expected:** `0`

Any value > 0 means `initAccordions()` ran AFTER `revealOnScroll()` — cards in collapsed sub-periods got `reveal--no-anim` applied and will not animate when expanded. This is a critical init-order failure.

---

### 8. Role and Tabindex — All 7 Triggers Are Keyboard-Accessible

1. In DevTools Console:
   ```js
   document.querySelectorAll('.sub-period__title[role="button"]').length
   document.querySelectorAll('.sub-period__title[tabindex="0"]').length
   document.querySelectorAll('[aria-expanded]').length
   ```

**Expected:** All three return `7`

---

## Edge Cases

### Rapid Toggle — No Broken State

1. Click a sub-period header 5 times rapidly

**Expected:**
- The accordion alternates between open and closed states without getting stuck
- No JavaScript errors in Console
- No accumulation of transitionend event listeners (verify: toggle open and check Console for `[Accordion] [Reveal]` — should appear once per expand, not multiple times)

---

### prefers-reduced-motion — Instant Toggle (No Animation)

1. In DevTools → Rendering → Emulate CSS media → prefers-reduced-motion: reduce
2. Toggle any accordion

**Expected:**
- The accordion opens/closes instantly (no sliding transition)
- Content still appears/disappears correctly
- Chevron still rotates (or rotates instantly)

---

### Multiple Expanded Simultaneously

1. Expand the second sub-period
2. Without collapsing it, expand the third sub-period

**Expected:**
- Both sub-periods are expanded simultaneously (this is NOT a single-open accordion — multiple can be open at once)
- No interference between them

---

## Failure Signals

- **No `[Accordion] Initialized` in Console** — `initAccordions()` did not run; check app.js init pipeline
- **All 7 sub-periods show content on load** — CSS not applied; `.sub-period__body--collapsed` rule missing from styles.css
- **No chevron (`▶`) visible on h3 headers** — `.sub-period__title--trigger::after` CSS rule missing or class not applied
- **No transition animation** — CSS transition missing or `prefers-reduced-motion` is active
- **Keyboard Enter/Space does nothing** — keydown event delegation not attached or `e.key` check failing
- **Space key scrolls the page** — `e.preventDefault()` missing for Space in the keydown handler
- **`reveal--no-anim` count > 0 on collapsed bodies** — wrong init order (initAccordions ran after revealOnScroll)
- **Cards don't animate on expand** — `triggerRevealInBody()` not called or transitionend listener not firing

## Not Proven By This UAT

- Audio ambient system functionality (verified in M005; regression check in S02)
- Sub-nav sticky behavior within #periodo-revolucion (verified in M003; regression check in S02)
- Mobile layout (375px) — requires DevTools responsive mode or physical device test (S02)
- Cross-browser compatibility beyond Chrome/Firefox
- Performance impact of 7 accordions on low-end devices

## Notes for Tester

- The worktree at `.gsd/worktrees/M012` is a development branch — open `index.html` from the worktree directory for testing M012 changes.
- All 7 sub-period IDs to reference: `rev-alberdi-formacion` (expanded by default), plus 6 others visible in the HTML with `id="rev-..."` attributes.
- The `[Accordion]` prefix in Console is set to `console.debug` — make sure Console level filter includes "Verbose" / "Debug" in DevTools, otherwise the logs may be hidden.
- If you see `[Accordion] No .sub-period elements found in #periodo-revolucion. Accordion idle.` in Console, the HTML structure has changed and `initAccordions()` cannot find its targets.
