---
id: T01
parent: S02
milestone: M013
provides:
  - Browser-verified lightbox modal working in all three content sections (colonial, revolución, nacional)
  - Critical HTML order bug fixed: modal HTML moved before script tag so initImageModal() can find the DOM
  - iOS mobile scroll-lock fix applied (documentElement.style.overflow alongside document.body.style.overflow)
key_files:
  - index.html
  - app.js
key_decisions:
  - Moved <div id="img-modal"> before <script src="app.js"> to fix IIFE initialization timing
  - Added document.documentElement.style.overflow = 'hidden' as iOS Safari scroll-lock complement
patterns_established:
  - HTML elements referenced by a synchronous IIFE must appear before the script tag in the DOM
  - Modal open/close state is inspectable via document.getElementById('img-modal').hasAttribute('hidden')
  - tabindex="0" presence on .card-image img signals successful initImageModal() completion
observability_surfaces:
  - document.querySelector('.card-image img').getAttribute('tabindex') === '0' → init successful
  - document.querySelector('.card-image img').style.cursor === 'zoom-in' → init successful
  - document.getElementById('img-modal').hasAttribute('hidden') → modal state
  - console.debug('[Modal] Image modal initialized.') on successful init
  - node -e "new Function(require('fs').readFileSync('app.js','utf8'))" → JS syntax check
duration: 45m
verification_result: passed
completed_at: 2026-03-24
blocker_discovered: false
---

# T01: Verificación en browser y fix de regresiones

**Fixed critical HTML-order bug causing initImageModal() to silently fail; lightbox now works across all three sections and mobile viewport.**

## What Happened

On first browser load, clicking images didn't open the modal at all. Investigation revealed the root cause: `<script src="app.js">` appeared at HTML line 2806 while `<div id="img-modal">` was at line 2809. The IIFE executes synchronously on script parse — `document.getElementById('img-modal')` returned `null`, the guard condition fired, and `initImageModal()` returned early without setting up any event listeners. No console error was thrown, making this a completely silent failure.

**Fix applied to `index.html`:** Moved the `<!-- Lightbox Modal -->` block to appear *before* the `<script src="app.js">` tag. The script now finds `#img-modal` in the DOM at execution time, initializes correctly, and sets `tabindex="0"` and `cursor: zoom-in` on all 57 card images.

**Fix applied to `app.js`:** Added `document.documentElement.style.overflow = 'hidden'` alongside the existing `document.body.style.overflow = 'hidden'` in both `openModal()` and `closeModal()`. This is required on iOS Safari where `overflow: hidden` on `body` alone doesn't prevent background scrolling.

**Accordion integration finding:** The 4 `.card-detail` accordion sections in the revolución period contain only text — no images. The event delegation mechanism (`document.body.addEventListener('click', ...)` using `e.target.closest('.card-image img')`) is architecturally correct and would work for images inside card-details if they existed, but there are no such images in the current content. The must-have was interpreted as: the delegation mechanism is correct and confirmed working.

## Verification

**Visual browser tests (all passed):**
- Colonial section: clicked `.card-image img` → modal opened (dialog_count 0→1, focus moved to "Cerrar imagen")
- Revolución section: clicked `#periodo-revolucion .card-image img` → modal opened
- Nacional section: clicked `#periodo-nacional .card-image img` → modal opened
- Esc close: dialog_count 1→0, focus returned to `img` trigger
- Overlay click (x=100,y=400 in dark area): dialog_count 1→0, focus returned to trigger
- × button click: dialog_count 1→0, focus returned to trigger
- Accordion expand: `.card-expand-toggle` clicked, card-detail expanded (text-only content, no images to test)
- Mobile 375×812: image (360px wide) within 375px viewport, body.overflow='hidden', html.overflow='hidden', close button within viewport

**Static verification:**
- JS syntax: `node -e "new Function(require('fs').readFileSync('app.js','utf8'))"` → OK

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `node -e "new Function(require('fs').readFileSync('app.js','utf8'))"` | 0 | ✅ pass | <1s |
| 2 | Browser: click `.card-image img` (colonial) | - | ✅ pass (dialog_open) | - |
| 3 | Browser: Esc closes modal (colonial) | - | ✅ pass (dialog_count 1→0) | - |
| 4 | Browser: overlay click closes modal | - | ✅ pass (dialog_count 1→0) | - |
| 5 | Browser: × button closes modal | - | ✅ pass (dialog_count 1→0) | - |
| 6 | Browser: click `.card-image img` (revolución) | - | ✅ pass (dialog_open) | - |
| 7 | Browser: click `.card-image img` (nacional) | - | ✅ pass (dialog_open) | - |
| 8 | Browser: mobile 375×812 — image within viewport | - | ✅ pass (imgWidth=360 ≤ 375) | - |
| 9 | Browser: mobile — html.overflow='hidden' | - | ✅ pass | - |
| 10 | Browser: no console errors | - | ✅ pass | - |

## Diagnostics

**To verify modal init worked:**
```js
// In browser console:
document.querySelector('.card-image img').getAttribute('tabindex') // → "0" if OK
document.querySelector('.card-image img').style.cursor // → "zoom-in" if OK
```

**To check modal state:**
```js
document.getElementById('img-modal').hasAttribute('hidden') // → true=closed, false=open
```

**To verify HTML order is correct:**
```bash
grep -n "app.js\|img-modal" index.html | tail -10
# img-modal should appear at a lower line number than app.js
```

**To verify JS syntax:**
```bash
node -e "new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK')"
```

## Deviations

**Critical deviation from plan:** The accordion image test (step 4 of the plan) could not be executed as specified because none of the 4 `.card-detail` elements in the actual HTML contain images (`.card-image img`). The plan assumed card-details would have images. The event delegation mechanism is architecturally sound and was verified to work correctly for all other `.card-image img` elements across all three sections.

**Pre-flight observability additions:** Added `## Observability / Diagnostics` to `S02-PLAN.md` and `## Observability Impact` to `T01-PLAN.md` as required by the pre-flight gap check.

## Known Issues

None. The verify-s02.js script does not exist yet — that is T02's responsibility.

## Files Created/Modified

- `index.html` — Moved `<div id="img-modal">` block to appear before `<script src="app.js">` (was after; IIFE couldn't find modal at init time)
- `app.js` — Added `document.documentElement.style.overflow = 'hidden'/'` in `openModal()`/`closeModal()` as iOS Safari scroll-lock fix
- `.gsd/milestones/M013/slices/S02/S02-PLAN.md` — Added `## Observability / Diagnostics` section
- `.gsd/milestones/M013/slices/S02/tasks/T01-PLAN.md` — Added `## Observability Impact` section
- `.gsd/KNOWLEDGE.md` — Added entry about IIFE script tag order gotcha
