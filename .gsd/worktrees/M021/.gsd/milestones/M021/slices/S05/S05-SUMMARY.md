---
id: S05
parent: M021
milestone: M021
provides:
  - Sub-nav link to #rev-san-martin (8th link, "1812–1822 / San Martín Libertador")
  - 4 new revolucion-timeline markers: 1812 (below, 20.00%), 1813 (above, 21.67%), 1817 (above, 28.33%), 1818 (below, 30.00%)
  - CSS stagger rules for nth-child(12)–(15) for both dots and labels
  - Full milestone M021 DoD verification — all criteria pass
requires:
  - slice: S04
    provides: 15 cards in #rev-san-martin with data-certeza (11 hecho, 3 debatido, 1 opinión), 15 card-images, 15 cite elements
affects: []
key_files:
  - index.html
  - styles.css
key_decisions:
  - Markers 1813 and 1817 use --above modifier to prevent label overlap with adjacent 1812/1816 markers in a dense 4-marker cluster
  - CSS stagger delays for new markers continue proportionally: dots 2.50/2.65/2.80/2.95s; labels 2.70/2.85/3.00/3.15s
  - Sub-nav label "1812–1822 / San Martín Libertador" selected for conciseness and no overflow at 320px
patterns_established:
  - nth-child stagger tables in styles.css must be extended whenever new timeline markers are added — missing rules leave markers permanently at opacity:0 with no JS error signal
  - New markers inserted into intermediate positions shift all downstream nth-child indices; stagger extension to the new maximum covers all cases without renumbering
observability_surfaces:
  - "[SubNav] Initialized with 8 sub-periods, 8 links." in browser console — deviation from 8 indicates missing sub-nav link
  - document.querySelectorAll('.revolucion-timeline__marker').length === 14 — canonical DOM integrity check
  - document.querySelectorAll('#rev-san-martin [data-certeza]').length === 15 — S04 content integrity check
drill_down_paths:
  - .gsd/milestones/M021/slices/S05/tasks/T01-SUMMARY.md
duration: 20m
verification_result: passed
completed_at: 2026-03-25
---

# S05: Sub-nav, timeline y verificación final

**Sub-nav link to `#rev-san-martin`, 4 new `revolucion-timeline` markers (1812/1813/1817/1818), and CSS stagger extension to nth-child(15) — all 8 verification checks pass and all M021 milestone DoD criteria are met.**

## What Happened

S05 was a single-task slice — T01 made three surgical edits in order:

**1. Sub-nav link** — Inserted `<a href="#rev-san-martin" class="sub-nav__link">1812–1822<span class="sub-nav__link-label">San Martín Libertador</span></a>` immediately after the `#rev-1800-1820` link in the sub-nav (inside `#periodo-revolucion`). The SubNav IntersectionObserver module auto-detected 8 links on page load (previously 7). No JS changes were needed — the existing `initSubNav()` discovers links dynamically.

**2. Timeline markers** — Inserted 4 new `revolucion-timeline__marker` divs at chronologically correct positions, slotted between existing markers:
- 1812 at `--marker-pos: 20.00%` (below label) — Granaderos a Caballo / San Martín llega al Río de la Plata
- 1813 at `--marker-pos: 21.67%` (above label, `--above` modifier) — Asamblea XIII / Batalla de San Lorenzo
- 1817 at `--marker-pos: 28.33%` (above label, `--above` modifier) — Cruce de los Andes / Chacabuco
- 1818 at `--marker-pos: 30.00%` (below label) — Batalla de Maipú

The alternating above/below pattern was critical for the 1810–1820 cluster where 4 markers fall within a 6-year, ~10% track span. The 1813 marker uses above to clear the 1812 dot; 1817 uses above to clear the 1816 dot.

**3. CSS stagger extension** — Added 8 rules in `styles.css` (4 dot + 4 label for nth-child 12–15) continuing the existing delay progression. New dot delays: 2.50/2.65/2.80/2.95s. New label delays: 2.70/2.85/3.00/3.15s. The 4 new markers inserted at DOM positions 3, 4, 6, 7 shifted the pre-existing markers (formerly nth-child 3–11) to positions 5, 8–15. Without extending to nth-child(15), the 4 markers that shifted past position 11 would have remained permanently at `opacity:0` after scroll-reveal fired — with no JS error to surface the bug.

## Verification

All 8 bash checks and milestone DoD criteria confirmed:

| Check | Command | Result | Verdict |
|-------|---------|--------|---------|
| Sub-nav link | `grep -c 'href="#rev-san-martin"' index.html` | 1 | ✅ |
| Timeline markers total | `grep -c 'revolucion-timeline__marker' index.html` | 14 | ✅ |
| 1812 marker pos | `grep -c 'marker-pos: 20.00%' index.html` | 1 | ✅ |
| 1817 marker pos | `grep -c 'marker-pos: 28.33%' index.html` | 1 | ✅ |
| CSS stagger nth-child(15) | `grep -c 'nth-child(15)' styles.css` | 2 | ✅ |
| Global data-certeza | `grep -c 'data-certeza' index.html` | 108 | ✅ |
| JS syntax | `node -e "new Function(require('fs').readFileSync('app.js','utf8'))..."` | syntax OK | ✅ |
| Boundary count #rev-san-martin | Node.js boundary slice | 15 | ✅ |
| Sub-nav link count | Node.js sub-nav__link count | 8 OK | ✅ |

**Milestone M021 DoD verification:**

- `#rev-san-martin` has 15 article cards with data-certeza (11 hecho, 3 debatido, 1 opinión) — **≥14 ✅**
- 15 `card-image` blocks and 15 `<cite>` elements in section boundary — **✅**
- Sub-nav link `a[href="#rev-san-martin"]` present — **✅**
- `revolucion-timeline` has 14 markers; includes 1812 and 1817 — **✅**
- JS syntax OK, 0 console errors (14 debug-only `[DEBUG]` logs) — **✅**
- Sub-nav at 320px: `overflow-x: auto`, scrolls correctly — **✅**
- Sub-nav at 1920px: all 8 links visible — **✅**

## New Requirements Surfaced

- none

## Deviations

None. T01 followed the plan exactly. The nth-child positional mapping (new markers at positions 3, 4, 6, 7) was pre-computed in T01-PLAN and proved correct.

## Known Limitations

None. All milestone M021 criteria are met. The `data-certeza="debatido"` value (used by 3 Guayaquil/logias/retiro debate cards) is rendered with `card-opinion` CSS class — no dedicated `card-debatido` class exists (D052 decision: zero-new-CSS constraint).

## Follow-ups

None identified. M021 is complete.

## Files Created/Modified

- `index.html` — added 1 sub-nav link (`#rev-san-martin`) and 4 timeline markers (1812/1813/1817/1818) at correct chronological positions
- `styles.css` — added 8 CSS stagger rules (4 dot + 4 label for nth-child 12–15)

## Forward Intelligence

### What the next milestone should know
- The `revolucion-timeline` now has 14 markers. Future markers in the 1800–1860 range must use the `--above` modifier alternation pattern for any cluster denser than ~5-year spacing. The 1810–1820 zone is already at maximum visual density — adding more markers there would require label hiding at mobile.
- The sub-nav has 8 links: 1800-1810, 1810-1820, 1812-1822 (San Martín), 1820-1835, 1820-1852, 1835-1852, 1843-1852, 1852. Any future sub-period in `#periodo-revolucion` becomes the 9th link — extend CSS stagger if applicable.
- `#rev-san-martin` is positioned between `#rev-1800-1820` and `#rev-1820-1835` in the DOM. The sub-nav IntersectionObserver targets `.sub-period` elements in order — this position is intentional and correct for the narrative arc.
- The CSS nth-child stagger for `revolucion-timeline__dot` and `revolucion-timeline__label` now extends to 15. Any new markers added to this timeline require extending the table again — the silent `opacity:0` failure has no JS error surface.

### What's fragile
- The nth-child stagger in `styles.css` is a manually maintained table — it does not auto-extend. New markers silently fail to animate without a corresponding CSS extension. Future agents must check the current maximum nth-child value before inserting new markers.
- The `data-certeza="debatido"` / `card-opinion` combination (D052) means DOM queries counting opinion cards will count "debatido" cards as well if querying by CSS class. Query by `data-certeza` attribute for precise counts.

### Authoritative diagnostics
- `[SubNav] Initialized with 8 sub-periods, 8 links.` in browser console — shows 7 if sub-nav link is missing
- `document.querySelectorAll('.revolucion-timeline__marker').length` in DevTools — must be 14
- `document.querySelectorAll('#rev-san-martin [data-certeza]').length` — must be 15 (S04 content)
- If 4 markers are invisible after scroll-reveal: the nth-child stagger table in `styles.css` doesn't cover positions 12–15

### What assumptions changed
- None. All structural assumptions from the S05 plan proved correct — the nth-child mapping, the alternating above/below positions, and the SubNav auto-discovery all behaved as specified.
