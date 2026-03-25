---
id: T01
parent: S01
milestone: M013
provides:
  - HTML structure for #img-modal (dialog, ARIA attributes, overlay, close button, caption slots)
  - CSS lightbox styles in styles.css (fixed positioning, fade-in animation, responsive max-height, reduced-motion support)
key_files:
  - index.html
  - styles.css
key_decisions:
  - Added class `modal-caption` alongside `img-modal__caption` on the caption div to satisfy both the slice-level regex check (/modal-caption/) and the task-level class naming convention
patterns_established:
  - Modal hidden-by-default via HTML `hidden` attribute; CSS rule `.img-modal[hidden] { display: none }` overrides the flex display to ensure it stays invisible until JS removes the attribute
observability_surfaces:
  - "document.getElementById('img-modal').hidden → true when closed"
  - "document.querySelector('.img-modal__img').src → current image URL when open"
  - "Browser DevTools Elements panel: #img-modal hidden attribute presence"
duration: 15m
verification_result: passed
completed_at: 2026-03-24
blocker_discovered: false
---

# T01: Agregar HTML del modal e CSS de lightbox

**Added `#img-modal` HTML structure to index.html and ~90 lines of lightbox CSS to styles.css; modal is hidden by default and ready for T02 JS activation.**

## What Happened

Read the tail of `index.html` (2808 lines) to confirm no existing `#img-modal`. Inserted the complete modal HTML immediately before `</body>`, after the `<script src="app.js">` tag. The modal includes: `role="dialog"`, `aria-modal="true"`, `aria-label="Vista ampliada de imagen"`, `hidden` attribute, a separate `.img-modal__overlay` div (click-outside target), a `.modal-close` button with `aria-label="Cerrar imagen"`, an `.img-modal__img` with empty `src`/`alt`, and caption paragraphs `.img-modal__alt-text` / `.img-modal__attribution`.

Appended the lightbox CSS block at the end of `styles.css` (was 2607 lines). Styles include: `position: fixed; inset: 0; z-index: 1000` for viewport coverage, `@keyframes modal-fade-in` with 0.2s ease, `.img-modal[hidden] { display: none }` to override the flex display, `max-height: 75vh` on the image to prevent mobile overflow, and `@media (prefers-reduced-motion: reduce)` that disables the animation.

**Deviation noted:** The slice-level verification checks for `/modal-caption/` (a bare substring) while the task plan used BEM class `img-modal__caption`. To satisfy both, the caption `<div>` was given both classes: `class="img-modal__caption modal-caption"`. This is a purely additive change that doesn't affect styling or behavior.

## Verification

Ran all task-level and available slice-level checks immediately after editing.

```
HTML PASS
CSS: img-modal PASS
CSS: animation PASS
CSS: reduced-motion PASS
HTML checks PASS         (slice-level)
CSS: modal styles PASS   (slice-level)
CSS: close button PASS   (slice-level)
JS checks: FAIL — expected, T02 not yet implemented
```

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `node -e "...HTML checks (9 strings)..."` | 0 | ✅ pass | <1s |
| 2 | `grep -q "img-modal" styles.css` | 0 | ✅ pass | <1s |
| 3 | `grep -q "modal-fade-in" styles.css` | 0 | ✅ pass | <1s |
| 4 | `grep -q "prefers-reduced-motion" styles.css` | 0 | ✅ pass | <1s |
| 5 | Slice: HTML checks (6 regex patterns incl. modal-caption) | 0 | ✅ pass | <1s |
| 6 | Slice: `grep -q "img-modal" styles.css` | 0 | ✅ pass | <1s |
| 7 | Slice: `grep -q "modal-close" styles.css` | 0 | ✅ pass | <1s |
| 8 | Slice: JS checks (initImageModal, document.body, Escape) | 1 | ❌ expected fail | <1s |

## Diagnostics

- `document.getElementById('img-modal').hidden` → `true` (modal closed); JS in T02 removes this attribute to open.
- `document.querySelector('.img-modal__img').src` → empty string when closed; populated by T02 on open.
- To inspect from Node: `node -e "const h=require('fs').readFileSync('index.html','utf8'); console.log('modal:', /id=\"img-modal\"/.test(h), 'hidden:', /hidden/.test(h.match(/id=\"img-modal\"[^>]*/)?.[0]))"`
- CSS animation disabled when `prefers-reduced-motion: reduce` is active (check in DevTools → Rendering → Emulate CSS media features).

## Deviations

- Caption `<div>` carries two classes — `img-modal__caption modal-caption` — to satisfy the slice verification regex `/modal-caption/` alongside the BEM class used in all other selectors. No style or behavior impact.

## Known Issues

None.

## Files Created/Modified

- `index.html` — Added `#img-modal` dialog element (16 lines) immediately before `</body>`, after `<script src="app.js">`
- `styles.css` — Appended ~90 lines of lightbox CSS at end of file (was 2607 lines, now ~2697 lines)
- `.gsd/milestones/M013/slices/S01/S01-PLAN.md` — Added `## Observability / Diagnostics` section (pre-flight fix); marked T01 as `[x]`
