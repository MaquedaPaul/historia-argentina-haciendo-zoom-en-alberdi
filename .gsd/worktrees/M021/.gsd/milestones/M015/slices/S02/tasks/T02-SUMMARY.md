---
id: T02
parent: S02
milestone: M015
provides:
  - "CSS rule `.card-nota-certeza:not(span)` added to styles.css (line 1228) — block-level aside variant with amber left border, muted text, 0.875rem font"
  - "Slice S02 fully verified: 5 cards in #rev-generacion-37, data-certeza=98, sub-nav link present, JS syntax clean"
key_files:
  - styles.css
key_decisions:
  - "Inserted CSS rule after the last `.card-opinion__context` sub-rule and before the `/* CARD-RUMOR */` section comment — natural grouping for 'certeza card variants'"
  - "`:not(span)` qualifier preserved exactly as specified — prevents border-left from leaking to inline `<span class=\"card-nota-certeza\">` elements in BIOG cards (lines 381–560)"
patterns_established:
  - "New card-variant CSS goes after all `.card-opinion` sub-rules and before the `/* CARD-RUMOR */` block — consistent with the file's variant grouping"
observability_surfaces:
  - "`grep -n 'card-nota-certeza:not(span)' styles.css` → line 1228 confirms rule is present"
  - "`window.getComputedStyle(aside).borderLeftWidth` → '2.4px' (3px at 0.8 device pixel ratio) confirms rule applies to aside element"
  - "Browser DevTools → Elements → `aside.card-nota-certeza` → Computed tab shows borderLeft, padding, fontSize applied"
  - "If aside renders without border, inspect DevTools Styles — a specificity conflict would show the rule crossed out"
duration: 8m
verification_result: passed
completed_at: 2026-03-24
blocker_discovered: false
---

# T02: Add CSS for card-nota-certeza block variant and run final verification

**Added `.card-nota-certeza:not(span)` CSS rule to styles.css; all S02 slice verification checks pass; `<aside>` on GEN37-3 renders with amber left border in browser.**

## What Happened

A single CSS block was inserted into `styles.css` immediately after the `.card-opinion__context em` rule (which ends the `.card-opinion` sub-rule group) and before the `/* CARD-RUMOR */` section comment. The insertion uses an anchor-string Edit matching both the preceding and following lines, making it robust to future line-number drift.

The `:not(span)` qualifier ensures existing inline `<span class="card-nota-certeza">` elements in the BIOG biography cards (≈lines 381–560 of index.html) are unaffected — they retain normal inline flow without unwanted border-left and padding.

Browser verification was done on port 8767 (the pre-existing port 8765 server was serving a different project's `index.html`). DOM inspection confirmed: `sectionFound: true`, `cardCount: 5`, `asideFound: true`, `asideBorderLeftWidth: "2.4px"` (= 3px × device pixel ratio), `asidePaddingLeft: "12px"` (= 0.75rem), `asideFontSize: "14px"` (= 0.875rem). Console logs confirmed SubNav correctly tracks `rev-generacion-37` and Reveal shows all 5 cards with stagger animation.

## Verification

All task must-haves confirmed:

```
grep -n "card-nota-certeza:not(span)" styles.css
→ 1228:.card-nota-certeza:not(span) {  ✅

node -e "new Function(require('fs').readFileSync('app.js','utf8'))"
→ OK  ✅

grep -c 'data-certeza=' index.html
→ 98  ✅

grep -n "rev-generacion-37" index.html
→ 3 lines: 331 (sub-nav), 1442 (section open), 1523 (section close)  ✅

grep -n "rev-generacion-37" index.html | grep "sub-nav__link-label"
→ 1 match  ✅

Browser: 5 cards in #rev-generacion-37, aside with visible amber left border, no JS errors  ✅
```

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -n "card-nota-certeza:not(span)" styles.css` | 0 | ✅ pass (→ line 1228) | <1s |
| 2 | `node -e "new Function(require('fs').readFileSync('app.js','utf8'))"` | 0 | ✅ pass (→ OK) | <1s |
| 3 | `grep -c 'data-certeza=' index.html` | 0 | ✅ pass (→ 98) | <1s |
| 4 | `grep -n "rev-generacion-37" index.html` | 0 | ✅ pass (3 lines) | <1s |
| 5 | `grep -n "rev-generacion-37" index.html \| grep "sub-nav__link-label"` | 0 | ✅ pass (1 match) | <1s |
| 6 | Browser DOM: `aside.card-nota-certeza` computed style | n/a | ✅ pass (borderLeft solid, paddingLeft 12px) | <1s |
| 7 | Console: `[SubNav] Active sub-period → rev-generacion-37` | n/a | ✅ pass (no JS errors) | — |

## Diagnostics

- **CSS present:** `grep -n "card-nota-certeza:not(span)" styles.css` → line 1228.
- **Rule applying:** `window.getComputedStyle(document.querySelector('aside.card-nota-certeza')).borderLeftWidth` in browser console returns a non-zero value.
- **Specificity conflict check:** If aside renders without border, DevTools → Elements → aside → Styles tab will show the rule with a strikethrough indicating overriding specificity.
- **Inline span safety:** `document.querySelectorAll('span.card-nota-certeza')` in DevTools; their computed `borderLeftWidth` should be `0px` (rule does not apply to `<span>`).
- **SubNav tracking:** Console log `[SubNav] Active sub-period → rev-generacion-37` confirms the sub-nav activates correctly on scroll.

## Deviations

None. The CSS rule was inserted at the exact location specified in the task plan. The anchor strings used (`.card-opinion__context em { font-style: italic; }` → `/* CARD-RUMOR */`) matched exactly.

The Node.js dev server was started on port 8767 instead of 8765 because 8765 was already occupied by an unrelated Node.js process (from a different project session). This is a local environment detail, not a plan deviation.

## Known Issues

One pre-existing 404 error in the browser console (a resource unrelated to M015 changes). This issue predates S02 and is not introduced by T02.

## Files Created/Modified

- `styles.css` — added `.card-nota-certeza:not(span)` rule after `.card-opinion__context em` block (line 1228)
