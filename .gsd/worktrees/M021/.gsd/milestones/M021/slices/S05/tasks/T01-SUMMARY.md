---
id: T01
parent: S05
milestone: M021
provides:
  - Sub-nav link to #rev-san-martin (8th link in .sub-nav)
  - 4 new revolucion-timeline markers (1812, 1813, 1817, 1818)
  - CSS stagger rules for nth-child(12)–(15) in dots and labels
key_files:
  - index.html
  - styles.css
  - .gsd/milestones/M021/slices/S05/S05-PLAN.md
key_decisions:
  - Markers 1813 and 1817 use --above modifier to prevent label overlap with 1812/1816
  - CSS stagger delays for new markers continue proportionally: dots 2.50/2.65/2.80/2.95s; labels 2.70/2.85/3.00/3.15s
patterns_established:
  - nth-child stagger tables in CSS must be extended whenever new timeline markers are added; missing rules leave markers permanently at opacity:0
observability_surfaces:
  - "[SubNav] Initialized with 8 sub-periods, 8 links." in browser console confirms the new link is present
  - document.querySelectorAll('.revolucion-timeline__marker').length === 14 is the canonical DOM integrity check
  - document.querySelectorAll('#rev-san-martin [data-certeza]').length === 15 confirms S04 integrity is unchanged
duration: 20m
verification_result: passed
completed_at: 2026-03-25
blocker_discovered: false
---

# T01: Añadir sub-nav link, timeline markers y CSS stagger para #rev-san-martin

**Added sub-nav link to #rev-san-martin, inserted 4 timeline markers (1812/1813/1817/1818) in chronological order, and extended CSS stagger to nth-child(15) — all 8 verification checks pass, milestone M021 criteria met.**

## What Happened

Three surgical edits were made in order:

1. **Sub-nav link** — Inserted `<a href="#rev-san-martin" class="sub-nav__link">1812–1822<span class="sub-nav__link-label">San Martín Libertador</span></a>` immediately after the `#rev-1800-1820` link (line ~330 in index.html). The SubNav JS module auto-detected 8 links on page load (previously 7).

2. **Timeline markers batch 1** — Inserted two markers between 1810 and 1816:
   - 1812 at `--marker-pos: 20.00%` (below, standard)
   - 1813 at `--marker-pos: 21.67%` (above, `--above` modifier to avoid label overlap with 1812)

3. **Timeline markers batch 2** — Inserted two markers between 1816 and 1820:
   - 1817 at `--marker-pos: 28.33%` (above, to avoid label overlap with 1816)
   - 1818 at `--marker-pos: 30.00%` (below, standard)

4. **CSS stagger extension** — Added 4 dot rules (nth-child 12–15, delays 2.50/2.65/2.80/2.95s) after the existing nth-child(11) dot rule, and 4 label rules (nth-child 12–15, delays 2.70/2.85/3.00/3.15s) after the existing nth-child(11) label rule. Without these, the 4 new markers at nth-child positions 3, 4, 6, 7 would have remained permanently invisible after the 4-marker shift pushed the old nth-child(11) → (15) boundary.

The existing markers were not renumbered in nth-child terms — the new markers were inserted into positions 3, 4, 6, 7, shifting existing markers 3–11 to positions 5, 8–15. The stagger extension to nth-child(15) covers all 14 markers (progress div is nth-child(1)).

## Verification

All 8 bash checks and 4 browser DOM assertions confirmed passing:

```
grep -c 'href="#rev-san-martin"' index.html      → 1
grep -c 'revolucion-timeline__marker' index.html  → 14
grep -c 'marker-pos: 20.00%' index.html           → 1
grep -c 'marker-pos: 28.33%' index.html           → 1
grep -c 'nth-child(15)' styles.css                → 2
grep -c 'data-certeza' index.html                 → 108
node JS syntax check                              → syntax OK
node boundary count #rev-san-martin               → 15
```

Browser DOM at runtime:
- `a[href="#rev-san-martin"]` textContent = "1812–1822San Martín Libertador" ✅
- `.revolucion-timeline__marker` count = 14 ✅
- `#rev-san-martin [data-certeza]` count = 15 ✅
- 0 console errors (14 debug-only `[DEBUG]` logs) ✅
- Sub-nav at 320px: `overflow-x: auto`, scrollWidth > clientWidth (expected) ✅
- Sub-nav at 1920px: 8 links visible, all `.sub-nav__link` rendered ✅
- Guayaquil `data-certeza="debatido"` card has `card-opinion` class ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c 'href="#rev-san-martin"' index.html` | 0 | ✅ pass (→1) | <1s |
| 2 | `grep -c 'revolucion-timeline__marker' index.html` | 0 | ✅ pass (→14) | <1s |
| 3 | `grep -c 'marker-pos: 20.00%' index.html` | 0 | ✅ pass (→1) | <1s |
| 4 | `grep -c 'marker-pos: 28.33%' index.html` | 0 | ✅ pass (→1) | <1s |
| 5 | `grep -c 'nth-child(15)' styles.css` | 0 | ✅ pass (→2) | <1s |
| 6 | `grep -c 'data-certeza' index.html` | 0 | ✅ pass (→108) | <1s |
| 7 | `node JS syntax check (app.js)` | 0 | ✅ pass (syntax OK) | <1s |
| 8 | `node boundary count #rev-san-martin` | 0 | ✅ pass (→15) | <1s |

## Diagnostics

**How to inspect this feature after the fact:**

- Browser console at page load: look for `[SubNav] Initialized with 8 sub-periods, 8 links.` — if it shows 7, the sub-nav edit is missing.
- `document.querySelectorAll('.revolucion-timeline__marker').length` in DevTools console: must be 14.
- If 4 markers appear invisible after scroll-reveal: check that `styles.css` contains nth-child(12), (13), (14), (15) rules for both `.revolucion-timeline__dot` and `.revolucion-timeline__label`. The invisible-markers bug has no JS error surface — it silently stays at `opacity:0`.
- Timeline marker positions: inspect `--marker-pos` CSS custom property in DevTools Elements panel on the marker divs.

## Deviations

None. All steps followed the T01-PLAN exactly. The nth-child mapping in the plan was correct: new markers at positions 3, 4, 6, 7; old markers shift to 5, 8–15.

## Known Issues

None.

## Files Created/Modified

- `index.html` — added 1 sub-nav link (#rev-san-martin) and 4 timeline markers (1812/1813/1817/1818)
- `styles.css` — added 8 CSS stagger rules (4 dot + 4 label for nth-child 12–15)
- `.gsd/milestones/M021/slices/S05/S05-PLAN.md` — added `## Observability / Diagnostics` section (pre-flight requirement)
