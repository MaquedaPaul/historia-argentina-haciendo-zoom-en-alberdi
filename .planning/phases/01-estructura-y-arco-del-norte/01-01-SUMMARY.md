---
phase: 01-estructura-y-arco-del-norte
plan: "01"
subsystem: UI / Structure
tags: [css, html, sub-nav, sub-period, certeza-cards, scaffold]
dependency_graph:
  requires: []
  provides: [rev-alto-peru-guerra-gaucha sub-period skeleton, .card-nota-historiografica CSS rule]
  affects: [index.html sub-nav, styles.css certeza card section]
tech_stack:
  added: []
  patterns: [CSS custom property callout block, anchor-based sub-nav link]
key_files:
  created: []
  modified:
    - styles.css
    - index.html
decisions:
  - .card-nota-historiografica added as generic reusable callout class (not Huaqui-specific) — applies retroactively to all existing unstyled uses
  - Sub-period id=rev-alto-peru-guerra-gaucha positioned after #rev-1800-1820 block as new standalone sub-period
metrics:
  duration: "~5 minutes"
  completed: "2026-03-26"
  tasks_completed: 2
  files_modified: 2
---

# Phase 01 Plan 01: Estructura y Arco del Norte — Structural Scaffold Summary

**One-liner:** Added CSS callout rule for `.card-nota-historiografica` and empty `#rev-alto-peru-guerra-gaucha` sub-period scaffold with sub-nav link, ready for card insertion by Plans 02 and 03.

---

## What Was Built

### Task 1: .card-nota-historiografica CSS rule (styles.css)

Added a new CSS rule block to `styles.css` immediately after the `.card-rumor:hover` closing brace and before the `/* ---- Responsive adjustments for certeza cards ---- */` comment (now at line 1325-1339).

The rule creates a left-bordered callout block using existing CSS custom property tokens:
- `border-left: 3px solid var(--certeza-opinion)` — opinion-level blue accent
- `background: var(--certeza-opinion-soft)` — subtle tinted background
- `font-size: 0.875rem`, `line-height: 1.6` — readable callout typography
- `border-radius: 0 4px 4px 0` — rounded right corners, flush left

No new CSS variables introduced. Retroactively styles all existing `.card-nota-historiografica` paragraphs in the page (previously unstyled).

### Task 2: Sub-nav link and sub-period skeleton (index.html)

Two insertions:

**Sub-nav link (line 367):** Added `<a href="#rev-alto-peru-guerra-gaucha" class="sub-nav__link">1810–1821<span class="sub-nav__link-label">Alto Peru y la Frontera</span></a>` immediately after the `#rev-1800-1820` link and before `#rev-1820-1835` — correct chronological position.

**Sub-period skeleton (lines 2349-2360):** Added empty sub-period block after `</div><!-- /#rev-1800-1820 -->` and before the Alberdi connector blockquote:
- `div#rev-alto-peru-guerra-gaucha.sub-period.reveal.reveal-fade`
- `h3.sub-period__title` with copy "Alto Peru y la Frontera Norte — Expediciones 1810–1815"
- `div.events-grid.events-grid--certeza` with `aria-label` attribute
- Placeholder comment for Plans 02/03 card insertion
- No JavaScript added or modified

---

## Verification Results

| Check | Result |
|-------|--------|
| `grep "card-nota-historiografica" styles.css` | PASS — rule present |
| `grep -c "rev-alto-peru-guerra-gaucha" index.html` | 3 matches (href, id, closing comment) |
| `.card-nota-historiografica` positioned after `.card-rumor:hover`, before `@media` | PASS |
| Sub-nav link after `#rev-1800-1820`, before `#rev-1820-1835` | PASS |
| Sub-period block after `#rev-1800-1820` close, before Alberdi connector | PASS |
| `class="sub-period reveal reveal-fade"` present | PASS |
| `class="events-grid events-grid--certeza"` present | PASS |
| `aria-label` on events-grid | PASS |
| No new CSS variables | PASS |
| No JavaScript added | PASS |

---

## Commits

| Task | Commit | Message |
|------|--------|---------|
| Task 1 | `2342b67` | feat(01-01): add .card-nota-historiografica CSS callout rule |
| Task 2 | `397ab00` | feat(01-01): add sub-nav link and sub-period skeleton for Alto Peru |

---

## Deviations from Plan

None — plan executed exactly as written.

---

## Known Stubs

The sub-period `#rev-alto-peru-guerra-gaucha` events-grid is intentionally empty — this is the scaffold's purpose. Plans 02 and 03 will insert ALTO-01 through ALTO-05 and ARCO-01 cards. The empty grid does not prevent this plan's goal (establishing the container) from being achieved.

---

## Self-Check: PASSED

- styles.css: `.card-nota-historiografica` rule present at lines 1325-1338 — FOUND
- index.html: `rev-alto-peru-guerra-gaucha` present at lines 367, 2353, 2360 — FOUND
- Commit `2342b67` — FOUND
- Commit `397ab00` — FOUND
