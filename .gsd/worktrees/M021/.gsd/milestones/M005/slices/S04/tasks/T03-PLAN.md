---
estimated_steps: 5
estimated_files: 3
---

# T03: Lighthouse audit and final fixes

**Slice:** S04 — Optimization and Deploy
**Milestone:** M005

## Description

Run Lighthouse mobile audit against the deployed site and fix any issues needed to meet the >90 targets on Performance and Accessibility.

## Steps

1. Open Chrome Incognito → DevTools → Lighthouse → select Mobile, all categories → run audit on the deployed URL.
2. Record scores: Performance, Accessibility, Best Practices, SEO. Target: all >90.
3. If Performance <90: check for render-blocking resources (Google Fonts is preconnected + `display=swap` — should be fine). Check Total Blocking Time — if high, look for long JS tasks. Check LCP — should be the H1 text, not an image.
4. If Accessibility <90: check for missing alt text, insufficient color contrast, ARIA issues, missing form labels, focus order problems. Fix in `index.html`/`styles.css`. Common issues: contrast ratio on muted text, missing `lang` attribute (already present), skip link (not present — add if needed for score).
5. Apply fixes, redeploy, re-audit until all scores >90.

## Must-Haves

- [ ] Lighthouse mobile Performance >90
- [ ] Lighthouse mobile Accessibility >90
- [ ] All fixes committed and deployed

## Verification

- Lighthouse mobile audit at deployed URL: Performance >90, Accessibility >90
- No Lighthouse critical issues remaining

## Inputs

- Deployed site URL (from T02)
- All source files in deployed state

## Expected Output

- `styles.css`, `index.html`, `app.js` — any Lighthouse-driven fixes
- Updated deployment with fixes applied
- Lighthouse scores confirmed >90
