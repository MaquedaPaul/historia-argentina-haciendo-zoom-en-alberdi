---
id: S02
parent: M013
milestone: M013
provides:
  - Browser-verified lightbox modal working in all three content sections (colonial, revolución, nacional)
  - Critical HTML-order bug fixed: modal HTML moved before script tag so initImageModal() runs correctly
  - iOS Safari scroll-lock fix applied (documentElement.style.overflow alongside body.style.overflow)
  - 16-check Node.js structural verification gate (verify-s02.js) — exits 0, green-lights S03 deploy
requires:
  - slice: S01
    provides: Lightbox modal implementation (HTML, CSS, JS — initImageModal, openModal, closeModal, event delegation)
affects:
  - S03
key_files:
  - index.html
  - app.js
  - .gsd/milestones/M013/slices/S02/verify-s02.js
key_decisions:
  - Moved <div id="img-modal"> before <script src="app.js"> — IIFE executes synchronously so the element must be in the DOM before the script tag
  - Added documentElement.style.overflow alongside body.style.overflow for iOS Safari scroll-lock completeness
  - Added an 8th HTML check (modal-before-script ordering) beyond the 7 in the plan — this ordering invariant is the primary regression vector
patterns_established:
  - HTML elements referenced by a synchronous IIFE must appear before the script tag in the DOM
  - Modal open/close state is inspectable via document.getElementById('img-modal').hasAttribute('hidden')
  - tabindex="0" on .card-image img is the authoritative signal that initImageModal() completed successfully
  - verify-s02.js uses path.resolve(__dirname, '../../../../../') to locate the worktree root (5 levels up from slices/S02/)
  - CI-friendly script pattern: [PASS]/[FAIL] per check, never throws, exits 1 on any failure
observability_surfaces:
  - node .gsd/milestones/M013/slices/S02/verify-s02.js — 16-check structural gate, exits 0 or 1
  - document.querySelector('.card-image img').getAttribute('tabindex') === '0' → initImageModal() ran to completion
  - document.querySelector('.card-image img').style.cursor === 'zoom-in' → init successful
  - document.getElementById('img-modal').hasAttribute('hidden') → true=closed, false=open
  - console.debug('[Modal] Image modal initialized.') → successful init
drill_down_paths:
  - .gsd/milestones/M013/slices/S02/tasks/T01-SUMMARY.md
  - .gsd/milestones/M013/slices/S02/tasks/T02-SUMMARY.md
duration: 55m
verification_result: passed
completed_at: 2026-03-24
---

# S02: Verificación visual + Deploy final

**Discovered and fixed a critical silent IIFE-ordering bug; lightbox modal now verified working across all three content sections and mobile, backed by a 16-check structural gate (exit 0).**

## What Happened

S01 delivered the lightbox modal implementation without live-browser testing. S02 was the real integration test.

**T01 — Browser verification and regression fixes:**

On first browser load, clicking images produced no response. The root cause was a completely silent failure: `<script src="app.js">` appeared at HTML line 2806 while `<div id="img-modal">` was at line 2809. The IIFE executes synchronously when parsed — `document.getElementById('img-modal')` returned `null`, the guard condition fired, and `initImageModal()` returned early without installing any event listeners. No error was thrown.

**Fix 1 (`index.html`):** Moved the `<!-- Lightbox Modal -->` block to before `<script src="app.js">`. The script now finds `#img-modal` at execution time, runs to completion, and sets `tabindex="0"` and `cursor: zoom-in` on all 57 `.card-image img` elements.

**Fix 2 (`app.js`):** Added `document.documentElement.style.overflow = 'hidden'` alongside the existing `document.body.style.overflow = 'hidden'` in both `openModal()` and `closeModal()`. iOS Safari requires both to be set to prevent background scrolling.

After fixes, all browser tests passed: modal opens in colonial, revolución, and nacional sections; all three close mechanisms work (× button, Esc, overlay click); focus returns to the trigger image after close; mobile 375×812 viewport shows image at 360px width without overflow.

**Accordion integration note:** The 4 `.card-detail` accordion sections (M012) contain only text — no `.card-image img` elements. The event delegation architecture (`document.body.addEventListener('click', ...)` with `e.target.closest('.card-image img')`) is correct and future-proof: if images are added to card-details later, they will work without any code change.

**T02 — Structural verification gate:**

Created `verify-s02.js` with 16 checks across HTML, JS, and CSS. The plan specified 15 checks; an extra HTML check was added to mechanically detect the T01 root cause (modal element position before script tag) — the most likely regression vector for future HTML edits.

All 16 checks pass (exit 0):
- HTML: `id="img-modal"`, `role="dialog"`, `aria-modal="true"`, `hidden`, `.modal-close`, `.img-modal__img`, 57 `.card-image` elements, modal before script
- JS: `initImageModal`, `document.body` delegation, `Escape` handler, `openModal`, `closeModal`, syntax valid via `new Function()`
- CSS: `img-modal` styles, `modal-close` styles

## Verification

| Check | Result |
|-------|--------|
| `node .gsd/milestones/M013/slices/S02/verify-s02.js` (16 checks) | ✅ exit 0, all PASS |
| JS syntax: `new Function(require('fs').readFileSync('app.js','utf8'))` | ✅ OK |
| Browser: click `.card-image img` colonial | ✅ modal opens |
| Browser: click `.card-image img` revolución | ✅ modal opens |
| Browser: click `.card-image img` nacional | ✅ modal opens |
| Browser: Esc closes modal | ✅ dialog_count 1→0, focus returns |
| Browser: overlay click closes modal | ✅ dialog_count 1→0, focus returns |
| Browser: × button closes modal | ✅ dialog_count 1→0, focus returns |
| Browser: mobile 375×812 — image within viewport | ✅ imgWidth=360 ≤ 375 |
| Browser: mobile — html.overflow='hidden' with modal open | ✅ confirmed |
| Browser: no console errors | ✅ confirmed |

## New Requirements Surfaced

- none

## Deviations

**T01 — Accordion image test not executable:** The plan specified clicking a `.card-image img` inside an expanded `.card-detail` (M012 accordion). In the actual HTML, none of the 4 `.card-detail` elements contain images — they are text-only. The event delegation architecture was verified correct via the other three sections; the delegation would work for card-detail images if they were added.

**T02 — 16 checks instead of 15:** Added one extra HTML check (modal-before-script ordering) beyond the plan's 7 HTML + 6 JS + 2 CSS = 15. This check directly encodes T01's root cause as a regression detector.

## Known Limitations

- No `.card-image img` elements inside `.card-detail` accordion sections exist in the current content. Event delegation is architecturally correct for this case but it could not be live-tested.
- The verify-s02.js structural gate does not cover runtime behavior (animation timing, focus trap completeness, ARIA live region announcements). It gates structure only.

## Follow-ups

- S03: `git push origin main` and verify GitHub Pages reflects all M010–M013 changes
- If images are ever added to `.card-detail` sections, the accordion integration must be live-tested (structural delegation is in place)

## Files Created/Modified

- `index.html` — Moved `<div id="img-modal">` block to before `<script src="app.js">` (was after; IIFE returned null for getElementById)
- `app.js` — Added `document.documentElement.style.overflow` toggling in `openModal()`/`closeModal()` for iOS Safari scroll-lock
- `.gsd/milestones/M013/slices/S02/verify-s02.js` — New 16-check Node.js structural verification gate; exits 0 on all pass

## Forward Intelligence

### What the next slice should know
- The site is fully self-contained static HTML/CSS/JS — deploy is `git push origin main` and GitHub Pages auto-builds from the main branch
- All 57 `.card-image` elements and the modal are verified working; no known regressions to the pre-M013 content
- The verify-s02.js gate (exit 0) is the mechanical green-light for the deploy step
- `node .gsd/milestones/M013/slices/S02/verify-s02.js` should be run after any future index.html edits to catch the ordering regression

### What's fragile
- HTML script/modal ordering — the `<div id="img-modal">` must appear before `<script src="app.js">` or initImageModal() silently fails with no error; the verify script checks this, but human editors may not know
- iOS Safari scroll-lock now requires both `body.style.overflow` and `documentElement.style.overflow`; removing either breaks mobile scroll containment

### Authoritative diagnostics
- `document.querySelector('.card-image img').getAttribute('tabindex') === '0'` — if this returns null, initImageModal() did not complete; check HTML ordering first
- `node .gsd/milestones/M013/slices/S02/verify-s02.js` — most reliable signal; runs in <1s and names the exact failing invariant

### What assumptions changed
- Plan assumed `.card-detail` accordion sections contain `.card-image img` elements — they do not in the current content; delegation is wired correctly but untestable until content is added
- S01 assumed the modal init worked silently — it didn't; the HTML-order IIFE timing issue was a complete silent failure that required T01's live-browser test to discover
