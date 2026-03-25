---
estimated_steps: 6
estimated_files: 2
---

# T03: Responsive audit and overflow fix across all breakpoints

**Slice:** S01 — Responsive Sweep and Hamburger Menu
**Milestone:** M005

## Description

Systematic test at 320px, 375px, 768px, 1024px, 1280px to confirm zero horizontal overflow, correct column counts, sub-nav behavior, timeline visibility, and overall layout correctness. Fix any issues found.

## Steps

1. Open `index.html` in browser, set DevTools to 320px wide. Check `document.documentElement.scrollWidth <= document.documentElement.clientWidth`. Note any overflow. Inspect cards (should be 1 column), nav (hamburger), timelines (colonial, revolucion, nacional — all should fit).
2. Repeat at 375px. Check sub-nav inside `#periodo-revolucion` scrolls horizontally (`overflow-x: auto`). Verify hamburger still active.
3. Repeat at 768px. Nav should display normally (no hamburger). Grid should show 2 columns. Timeline-aside should be hidden (≤48rem). Sub-nav should be normal (>640px).
4. Repeat at 1024px. Timeline-aside should be visible (>48rem). Grid should show 2-3 columns. Full nav visible.
5. Repeat at 1280px. Full 3-column grid, timeline-aside visible, all features at maximum layout.
6. Fix any issues found in `styles.css` or `index.html`. Common issues: `.colonial-timeline`, `.revolucion-timeline`, `.nacional-timeline` marker labels overflowing at narrow viewports; `.alberdi-quote` blockquote padding too wide; `.sub-nav` text truncation at narrow widths.

## Must-Haves

- [ ] Zero horizontal overflow at all 5 viewport sizes
- [ ] Correct grid column count at each breakpoint
- [ ] Sub-nav functional at all widths
- [ ] All 3 period timelines fit within viewport at 320px
- [ ] `document.querySelectorAll('.reveal').length >= 52` (no regression)

## Verification

- At each viewport (320, 375, 768, 1024, 1280): `document.documentElement.scrollWidth <= document.documentElement.clientWidth` → true
- Visual: cards in correct column layout, no clipped content, no overlapping elements
- `document.querySelectorAll('.reveal').length` ≥ 52

## Inputs

- T01 output — hamburger menu in place
- T02 output — touch targets and typography fixed
- `styles.css` — all existing responsive breakpoints
- `index.html` — full page structure

## Expected Output

- `styles.css` — any additional responsive fixes
- `index.html` — structural fixes if needed (unlikely)
- S01 responsive sweep verified at all 5 breakpoints
