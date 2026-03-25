---
id: T02
parent: S01
milestone: M013
provides:
  - initImageModal() function in app.js — event delegation, open/close, focus management, Esc/overlay close, keyboard accessibility, attribution sourcing
key_files:
  - app.js
  - styles.css
key_decisions:
  - Used `new Function()` wrapper (not `eval()`) for JS syntax verification in Node.js — avoids false-positive failures from DOM runtime errors when browser globals like `document` are undefined in Node
  - Added `cursor: zoom-in` as a CSS rule in styles.css in addition to the inline JS set — CSS rule covers dynamically-revealed images (e.g., future `.card-detail` images) that aren't in DOM at initialization time
patterns_established:
  - Event delegation on `document.body` for `.card-image img` click — tolerates images added after DOMContentLoaded via accordion expansion
  - `lastTrigger` pattern: save reference before opening, restore focus on close, then null the reference
  - `modal.removeAttribute('hidden')` / `modal.setAttribute('hidden', '')` pairing — consistent with HTML `hidden` attribute semantics set up in T01
observability_surfaces:
  - "document.getElementById('img-modal').hidden → false when open, true when closed"
  - "document.querySelector('.img-modal__img').src → current image URL when open, empty string when closed"
  - "document.body.style.overflow → 'hidden' when modal is open, '' when closed"
  - "console.debug('[Modal] Image modal initialized.') — fires on page load if init succeeded"
  - "console.warn('[Modal] Required elements not found — modal disabled.') — fires if #img-modal or children missing"
duration: 20m
verification_result: passed
completed_at: 2026-03-24
blocker_discovered: false
---

# T02: Implementar JS de apertura, cierre y accesibilidad

**Added `initImageModal()` to app.js with event delegation, focus management, Esc/overlay close, keyboard accessibility, and attribution sourcing — all slice-level verification checks now pass.**

## What Happened

Read the tail of `app.js` (810 lines) to confirm the IIFE ends with `initHamburgerMenu()` then `})();`. Applied the pre-flight fix to `T02-PLAN.md` by adding the required `## Observability Impact` section.

Inserted the `initImageModal()` function (105 lines) between the end of `initHamburgerMenu()` and the IIFE close `})();`. The function:
- Queries all required modal elements (`#img-modal`, `.img-modal__overlay`, `.modal-close`, `.img-modal__img`, `.img-modal__alt-text`, `.img-modal__attribution`) and guards with a `console.warn` if any are missing.
- `openModal(img)`: populates `modalImg.src/alt`, caption alt-text, reads `.img-attribution` from the same `.card-image` parent (showing/hiding `attrEl` accordingly), saves `lastTrigger`, removes `hidden`, focuses `closeBtn`, sets `body.overflow = 'hidden'`.
- `closeModal()`: restores `hidden`, clears `modalImg.src`, restores `body.overflow`, focuses and nulls `lastTrigger`.
- Three event listeners: `document.body` click delegation for `.card-image img`; `overlay.click` → close; `closeBtn.click` → close.
- `modal.keydown`: `Escape` → close; `Tab` → keep focus on `closeBtn` (focus trap).
- `document.body.keydown`: Enter/Space on focused `.card-image img` → open.
- `document.querySelectorAll('.card-image img')` loop sets `tabindex="0"` and `cursor: zoom-in` inline.

Added `cursor: zoom-in` as a CSS rule in `styles.css` for robustness — covers any `.card-image img` that may be rendered after page load.

## Verification

All task-level and slice-level checks passed:

```
function exists PASS
function called PASS
event delegation PASS
Esc handler PASS
attribution PASS
focus restore PASS
syntax OK PASS  (via new Function() wrapper — not eval())
HTML checks PASS
CSS: modal styles PASS
CSS: close button PASS
JS: function exists PASS
JS: event delegation PASS
JS: Esc key handler PASS
```

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -q "function initImageModal" app.js` | 0 | ✅ pass | <1s |
| 2 | `grep -q "initImageModal()" app.js` | 0 | ✅ pass | <1s |
| 3 | `grep -q "document\.body\.addEventListener" app.js` | 0 | ✅ pass | <1s |
| 4 | `grep -q "Escape" app.js` | 0 | ✅ pass | <1s |
| 5 | `grep -q "img-attribution" app.js` | 0 | ✅ pass | <1s |
| 6 | `grep -q "lastTrigger" app.js` | 0 | ✅ pass | <1s |
| 7 | `node -e "new Function(require('fs').readFileSync('app.js','utf8')); console.log('syntax OK PASS')"` | 0 | ✅ pass | <1s |
| 8 | Slice: HTML checks (6 regex patterns) | 0 | ✅ pass | <1s |
| 9 | Slice: `grep -q "img-modal" styles.css` | 0 | ✅ pass | <1s |
| 10 | Slice: `grep -q "modal-close" styles.css` | 0 | ✅ pass | <1s |
| 11 | Slice: `grep -q "initImageModal" app.js` | 0 | ✅ pass | <1s |
| 12 | Slice: `grep -q "document.body" app.js` | 0 | ✅ pass | <1s |
| 13 | Slice: `grep -q "Escape\|keydown" app.js` | 0 | ✅ pass | <1s |

## Diagnostics

- `document.getElementById('img-modal').hidden` → `false` when modal is open, `true` when closed.
- `document.querySelector('.img-modal__img').src` → the current enlarged image URL when open, empty string when closed.
- `document.body.style.overflow` → `'hidden'` when modal is open (background scroll locked), `''` when closed.
- `console.debug('[Modal] Image modal initialized.')` appears in browser console on page load if the function ran successfully.
- `console.warn('[Modal] Required elements not found — modal disabled.')` appears if `#img-modal` or any of its required children (`overlay`, `closeBtn`, `modalImg`) are missing from the DOM.
- To diagnose from Node: `node -e "const js=require('fs').readFileSync('app.js','utf8'); console.log('defined:', /function initImageModal/.test(js), 'called:', /initImageModal\(\)/.test(js))"`

## Deviations

- The `eval()` syntax check suggested in the task plan produces a false-positive `"syntax errors found"` output because Node.js throws `ReferenceError: document is not defined` at runtime when evaluating browser code. Used `new Function(src)` instead, which parses for syntax errors only without executing. Added to KNOWLEDGE.md.

## Known Issues

None.

## Files Created/Modified

- `app.js` — Added `initImageModal()` function (105 lines) and its call inside the IIFE; file grew from 810 to 915 lines
- `styles.css` — Appended `.card-image img { cursor: zoom-in }` rule (4 lines) at end of file
- `.gsd/milestones/M013/slices/S01/tasks/T02-PLAN.md` — Added `## Observability Impact` section (pre-flight fix)
- `.gsd/milestones/M013/slices/S01/S01-PLAN.md` — Marked T02 as `[x]`
