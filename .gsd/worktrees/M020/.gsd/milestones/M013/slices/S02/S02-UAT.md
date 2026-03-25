# S02: Verificación visual + Deploy final — UAT

**Milestone:** M013
**Written:** 2026-03-24

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: Both tasks completed with mechanical verification (16-check Node.js gate exits 0) and live browser tests across all three content sections. The structural gate is re-runnable and encodes every behavioral invariant as a named check. Browser verification covered all three close mechanisms, all three content sections, and mobile viewport at 375px.

## Preconditions

1. Worktree root is `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M013`
2. `index.html`, `app.js`, `styles.css` are present at worktree root
3. `.gsd/milestones/M013/slices/S02/verify-s02.js` exists
4. Node.js is available on PATH
5. A local static server is running: `npx serve . --listen 3000` from the worktree root (or equivalent)

## Smoke Test

Run the structural gate:
```bash
node .gsd/milestones/M013/slices/S02/verify-s02.js
```
**Expected:** All 16 `[PASS]` lines printed, exit code 0. If this fails, stop — the build has a structural regression that must be fixed before any further testing.

---

## Test Cases

### 1. Modal opens on image click (colonial section)

1. Navigate to `http://localhost:3000` in a browser
2. Scroll to the **Época Colonial (1500–1800)** section
3. Click any `.card-image img` element (e.g., the first card's image)
4. **Expected:**
   - A modal dialog appears overlaying the page
   - The modal contains a large version of the clicked image
   - The modal contains a caption/alt text below the image
   - Focus moves to the close button ("Cerrar imagen") inside the modal
   - Background page is not scrollable

### 2. Modal opens on image click (revolución section)

1. Scroll to the **Revolución e Independencia (1800–1860)** section
2. Click any `.card-image img` in this section
3. **Expected:** Modal opens with the image and caption — same behavior as Test 1

### 3. Modal opens on image click (nacional section)

1. Scroll to the **Organización Nacional (1860–1900)** section
2. Click any `.card-image img` in this section
3. **Expected:** Modal opens with the image and caption — same behavior as Test 1

### 4. Close modal with × button

1. Open the modal by clicking any card image (any section)
2. Click the **×** (close) button inside the modal
3. **Expected:**
   - Modal closes (disappears from view)
   - Focus returns to the image that was clicked to open the modal
   - Background page is scrollable again

### 5. Close modal with Escape key

1. Open the modal by clicking any card image
2. Press the **Escape** key
3. **Expected:**
   - Modal closes
   - Focus returns to the trigger image
   - Background is scrollable again

### 6. Close modal by clicking the overlay

1. Open the modal by clicking any card image
2. Click outside the modal image container (on the dark semi-transparent overlay area)
3. **Expected:**
   - Modal closes
   - Focus returns to the trigger image
   - Background is scrollable again

### 7. Accordion expand does not break modal

1. Scroll to **Revolución e Independencia (1800–1860)**
2. Click a `.card-expand-toggle` button on any event card to expand its detail section
3. Confirm the `.card-detail` section expands (additional text content visible)
4. Click any `.card-image img` in the same section (outside the accordion detail)
5. **Expected:**
   - Modal opens normally — accordion state does not interfere with modal
   - Modal closes normally with any of the three close mechanisms

### 8. Mobile viewport — image does not overflow (375px)

1. Set browser viewport to **375px width** (DevTools device emulation or equivalent)
2. Open the modal by clicking any card image
3. **Expected:**
   - The modal image width is ≤ 375px (does not overflow the viewport)
   - The close button is visible within the viewport
   - The modal overlay covers the full screen
   - `document.body.style.overflow === 'hidden'` and `document.documentElement.style.overflow === 'hidden'` (checkable via DevTools console)

### 9. JS syntax is valid

```bash
node -e "new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK')"
```
**Expected:** Prints `OK`, exits 0.

### 10. initImageModal() ran to completion

In browser DevTools console after page load:
```js
document.querySelector('.card-image img').getAttribute('tabindex')
// Expected: "0"

document.querySelector('.card-image img').style.cursor
// Expected: "zoom-in"
```
**Expected:** Both return the values above. If either returns `null` or `""`, `initImageModal()` did not complete — check that `<div id="img-modal">` appears before `<script src="app.js">` in `index.html`.

---

## Edge Cases

### Modal state is inspectable via DOM

1. Open the modal
2. In DevTools console: `document.getElementById('img-modal').hasAttribute('hidden')`
3. **Expected:** `false` (modal is open — hidden attribute removed)
4. Close the modal
5. Run same command
6. **Expected:** `true` (modal is closed — hidden attribute present)

### 57 card images are present and clickable

In DevTools console:
```js
document.querySelectorAll('.card-image img').length
// Expected: 57

document.querySelectorAll('.card-image img[tabindex="0"]').length
// Expected: 57 (all initialized)
```

### Modal HTML appears before script tag (ordering invariant)

```bash
grep -n "img-modal\|app\.js" index.html | grep -E "id=\"img-modal\"|src=\"app\.js\""
```
**Expected:** The line with `id="img-modal"` has a **lower line number** than the line with `src="app.js"`. If not, `initImageModal()` will silently fail on next page load.

---

## Failure Signals

- **Modal does not open on image click:** Check `document.querySelector('.card-image img').getAttribute('tabindex')` — if `null`, init failed. Run `grep -n "img-modal\|app\.js" index.html` to verify ordering.
- **Background scrolls while modal is open:** iOS Safari scroll-lock not working. Check that both `document.body.style.overflow` and `document.documentElement.style.overflow` are `'hidden'` in `openModal()`.
- **Focus does not return to trigger after close:** Check `closeModal()` — it should call `trigger.focus()` where `trigger` is the stored reference to the last-clicked image.
- **Structural gate fails:** `node .gsd/milestones/M013/slices/S02/verify-s02.js` — each `[FAIL]` line names the exact broken invariant.
- **JS syntax error:** `node -e "new Function(require('fs').readFileSync('app.js','utf8'))"` — prints the SyntaxError message.

## Not Proven By This UAT

- ARIA screen reader experience (focus trap completeness, live region announcements) — not tested with actual AT
- Images inside `.card-detail` accordion sections (none exist in current content — event delegation is in place but cannot be live-tested)
- GitHub Pages deploy and live URL accessibility (covered by S03)
- Performance on low-end mobile devices or slow connections

## Notes for Tester

- The verify-s02.js gate is the fastest correctness signal — run it first before any manual testing
- The critical ordering invariant (modal before script) is the only failure mode that produces a completely silent symptom — no console error, no visible error, just no click response
- `tabindex="0"` on `.card-image img` elements is the authoritative "init succeeded" signal — check this first if clicks don't open the modal
- Accordion card-details in revolución contain only text — do not expect to find images inside expanded `.card-detail` elements
