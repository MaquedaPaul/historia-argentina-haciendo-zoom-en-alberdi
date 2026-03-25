---
id: T03
parent: S04
milestone: M005
provides:
  - Lighthouse mobile Performance 96/100 (target >90) VALIDATED
  - Lighthouse mobile Accessibility 100/100 (target >90) VALIDATED
  - Lighthouse mobile SEO 100/100 VALIDATED
  - Skip link for keyboard navigation (WCAG 2.4.1)
  - All WCAG AA color contrast failures fixed
  - Async Google Fonts (non-render-blocking)
  - CLS fix via aspect-ratio on .card-image containers
  - content-visibility: auto on .period sections
  - Second git commit a64ebf2 with all a11y and performance fixes
key_files:
  - index.html
  - styles.css
key_decisions:
  - "D035: --color-colonial-text / --color-nacional-text CSS vars darker than accent for WCAG AA on text while preserving saturated accent for borders/decorative"
  - "Deploy deferred at user request; Lighthouse validated locally against npx http-server port 8090 with Playwright Chromium binary"
patterns_established:
  - "Lighthouse CLI Windows: CHROME_PATH=~/.../ms-playwright/chromium-1208/chrome-win64/chrome.exe; cleanup EPERM is harmless, report writes to /tmp/lh-report.json"
  - "content-visibility: auto on .period reduces Style+Layout from 1167ms to 859ms; add contain-intrinsic-size to avoid scrollbar jank"
  - "Footer uses bg-warm (#ede6d6); text-muted (#7a6b5a) = 4.14:1 on that bg — FAILS AA; use --color-text in footer"
  - "aspect-ratio on image container (not just img) prevents CLS before images load"
observability_surfaces:
  - "CHROME_PATH=path npx lighthouse http://localhost:8090 --form-factor=mobile --output=json --output-path=/tmp/lh.json"
  - "git log --oneline — 2 commits: 203432a (initial) + a64ebf2 (a11y/perf fixes)"
  - "grep 'color-colonial-text' styles.css — verify #7a5f42 accessible value"
  - "document.querySelector('.skip-link') — must exist in DOM"
duration: 90m
verification_result: passed
completed_at: 2026-03-20
blocker_discovered: false
---

# T03: Lighthouse audit and final fixes

**Lighthouse mobile Performance 96 and Accessibility 100 achieved via skip link, WCAG AA contrast fixes, async fonts, aspect-ratio CLS prevention, and content-visibility optimization; deploy remains deferred at user request.**

## What Happened

No live URL existed (T02 deploy deferred at user request), so Lighthouse was run locally against `npx http-server` on port 8090 using the Playwright Chromium binary.

**Baseline run 1:** Performance 67, Accessibility 96, SEO 100.

**Fixes applied to `index.html` and `styles.css`:**

Accessibility (96→100):
1. Skip link `<a href="#main-content" class="skip-link">` + `id="main-content" tabindex="-1"` on `<main>`
2. `aria-labelledby` on all 3 `<section>` period elements pointing at their `<h2>` IDs
3. `aria-hidden="true"` on ambient `<audio>` elements
4. New CSS vars `--color-colonial-text: #7a5f42` (5.22:1 on bg) and `--color-nacional-text: #7a5e3c` (5.30:1)
5. `--color-celeste-deep` darkened `#4a8ab5`→`#2e6b96` (3.31:1→5.06:1)
6. `--color-sepia-dark` darkened `#8b7355`→`#6e5a40` (3.95:1→5.79:1)
7. Footer text changed from `--color-text-muted` to `--color-text` (bg-warm makes muted fail at 4.14:1)
8. Card placeholder text: removed `opacity:0.6`, changed to `--color-text`

Performance (67→96):
1. Google Fonts: `rel="preload" as="style" onload="..."` + `<noscript>` — eliminates render-block
2. `content-visibility: auto` + `contain-intrinsic-size: 0 2400px` on `.period` — Style+Layout 1167ms→859ms
3. `aspect-ratio: 16 / 9` on `.card-image` — CLS 0.182→0.067

All committed as `a64ebf2`.

## Must-Haves

- [x] Lighthouse mobile Performance >90 — **96** ✅
- [x] Lighthouse mobile Accessibility >90 — **100** ✅
- [x] All fixes committed — **a64ebf2** ✅

## Verification

Final Lighthouse run: Performance 96, Accessibility 100, SEO 100, CLS 0.074, TBT 0ms.
`git log --oneline` shows 2 commits. `git status` clean. Sound toggle functional. No console errors.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | Lighthouse mobile Performance | — | ✅ 96/100 (>90) | ~15s |
| 2 | Lighthouse mobile Accessibility | — | ✅ 100/100 (>90) | ~15s |
| 3 | Lighthouse mobile CLS | — | ✅ 0.074 (was 0.182) | ~15s |
| 4 | Lighthouse A11Y failures | — | ✅ 0 failures | ~15s |
| 5 | `git log --oneline` | 0 | ✅ 2 commits | <1s |
| 6 | `git status` | 0 | ✅ clean | <1s |
| 7 | browser_assert sound-toggle visible | — | ✅ pass | <1s |
| 8 | browser_assert no_console_errors | — | ✅ pass | <1s |

## Diagnostics

```bash
# Confirm 2 commits
git log --oneline
# a64ebf2 a11y and perf fixes...
# 203432a Historia Argentina...

# Verify accessible color vars
grep "color-colonial-text\|color-celeste-deep\|color-sepia-dark" styles.css | head -5

# Verify skip link
grep "skip-link\|main-content" index.html | head -4

# Re-run Lighthouse
CHROME_PATH="$LOCALAPPDATA/ms-playwright/chromium-1208/chrome-win64/chrome.exe" \
  npx lighthouse http://localhost:8090 --form-factor=mobile \
  --output=json --output-path=/tmp/lh.json \
  --chrome-flags="--headless --no-sandbox --disable-dev-shm-usage"
```

## Deviations

1. No live HTTPS URL — user chose "Accept local Lighthouse scores" when prompted
2. Performance variance across runs (67, 72, 96) — jump reflects async fonts + content-visibility; local uncompressed server inflates baseline
3. Best Practices 73 — Google Fonts third-party cookie; not a slice target

## Known Issues

- No live deployment — slice's HTTPS URL goal unmet; Lighthouse validated locally only
- Best Practices 73 — Google Fonts cookie, not fixable without self-hosting fonts

## Files Created/Modified

- `index.html` — skip link, `id="main-content"`, `aria-labelledby` on 3 sections, `aria-hidden` on audio, async font preload
- `styles.css` — accessible text color vars, darkened celeste-deep/sepia-dark globally, footer contrast fix, placeholder contrast fix, skip-link CSS, `content-visibility: auto` on `.period`, `aspect-ratio: 16/9` on `.card-image`
