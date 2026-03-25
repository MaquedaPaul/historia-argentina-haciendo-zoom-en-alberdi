---
id: T01
parent: S01
milestone: M012
provides:
  - CSS rules for sub-period accordion (body, collapsed state, trigger header, chevron, focus-visible, reduced-motion)
key_files:
  - styles.css
key_decisions:
  - Used max-height 1000rem (not 200rem as S01 plan suggested) to accommodate the largest sub-period (#periodo-rosas, ~35 cards × ~400px ≈ 875rem)
  - Used .sub-period__body wrapper class (created dynamically by JS) rather than targeting .events-grid directly, matching the pattern described in T01-PLAN.md
patterns_established:
  - Accordion body uses max-height + opacity transition (same pattern as card-detail expand/collapse already in styles.css)
  - Chevron via CSS ::after on .sub-period__title--trigger, rotates 90° when aria-expanded="true"
observability_surfaces:
  - "grep -c 'sub-period__body' styles.css → returns 4 (body rule, collapsed rule, two reduced-motion rules)"
  - "grep -n 'sub-period__body\\|sub-period__title--trigger' styles.css → shows all 6 new rule blocks at lines 2002–2049"
duration: ~10min
verification_result: passed
completed_at: 2026-03-24
blocker_discovered: false
---

# T01: Agregar CSS del accordion a styles.css

**Added 6 CSS rule blocks for the sub-period accordion system (body, collapsed, trigger, chevron, focus-visible, reduced-motion) to styles.css at the correct insertion point after the sub-period responsive media query.**

## What Happened

Located the exact insertion point in `styles.css` — after the `@media (max-width: 640px)` block that contains `.sub-period__title` and `.sub-period` rules (closing at line ~1993), just before the `## Sub-navigation bar` section comment. Inserted the complete accordion CSS block as specified in T01-PLAN.md.

The six new rule groups added:
1. `.sub-period__body` — `overflow: hidden`, `max-height: 1000rem`, `opacity: 1`, `transition` (max-height 0.45s cubic-bezier + opacity 0.35s)
2. `.sub-period__body--collapsed` — `max-height: 0`, `opacity: 0`
3. `.sub-period__title--trigger` — `cursor: pointer`, `user-select: none`, `padding-right: var(--space-xl)`
4. `.sub-period__title--trigger::after` — chevron `▶` with `margin-left: auto`, `color: var(--color-celeste)`, `transition: transform 0.3s`
5. `.sub-period__title--trigger[aria-expanded="true"]::after` — `transform: rotate(90deg)`
6. `.sub-period__title--trigger:focus-visible` — `outline: 2px solid var(--color-celeste)`, `outline-offset: 3px`
7. `@media (prefers-reduced-motion: reduce)` — disables transitions on body and trigger `::after`

Also added `## Observability / Diagnostics` and `## Verification` sections to S01-PLAN.md to address the pre-flight gaps flagged in the task prompt.

## Verification

All 5 plan verification commands passed immediately after insertion.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -q 'sub-period__body--collapsed' styles.css` | 0 | ✅ pass | <1s |
| 2 | `grep -q 'sub-period__title--trigger' styles.css` | 0 | ✅ pass | <1s |
| 3 | `grep -q 'prefers-reduced-motion' styles.css` | 0 | ✅ pass | <1s |
| 4 | `grep -q '1000rem' styles.css` | 0 | ✅ pass | <1s |
| 5 | `grep -q '\[aria-expanded="true"\]' styles.css` | 0 | ✅ pass | <1s |

## Diagnostics

- **CSS presence check**: `grep -n 'sub-period__body\|sub-period__title--trigger' styles.css` — all new rules are at lines 2002–2049.
- **No collision**: The class names `.sub-period__body` and `.sub-period__title--trigger` did not exist in the file before this task; they are entirely new.
- **Failure state**: If this CSS is missing or overridden, the `.sub-period__body` divs (created by T02's JS) will have no `overflow: hidden` — sub-periods will render fully expanded with no animation, and the chevron won't appear.

## Deviations

None. The CSS was inserted exactly as specified in T01-PLAN.md. S01-PLAN.md suggested `200rem` as a sample max-height, but T01-PLAN.md is authoritative and specifies `1000rem` — used 1000rem.

## Known Issues

None. This task is purely additive CSS; T02 (JS implementation) will create the DOM elements that these rules target.

## Files Created/Modified

- `styles.css` — Added 6 accordion CSS rule blocks (~52 lines) after the sub-period responsive media query, before the sub-nav section.
- `.gsd/milestones/M012/slices/S01/S01-PLAN.md` — Added `## Observability / Diagnostics` and `## Verification` sections; marked T01 done.
