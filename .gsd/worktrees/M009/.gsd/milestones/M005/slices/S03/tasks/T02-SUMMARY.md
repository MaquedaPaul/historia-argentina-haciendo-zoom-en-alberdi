---
id: T02
parent: S03
milestone: M005
provides:
  - index.html — 3 <audio> elements with preload="none" loop + floating .sound-toggle button
  - styles.css — .sound-toggle fixed-circle styles, hover/focus/active states, responsive breakpoints
key_files:
  - index.html
  - styles.css
key_decisions:
  - Placed audio elements and sound-toggle button immediately before <script src="app.js"> so T03's JS can reference them via getElementById/querySelector on DOMContentLoaded without race conditions.
  - Used `display:flex` on .sound-toggle to center the emoji icon vertically and horizontally without extra markup.
  - Used `color-mix(in srgb, ...)` for the aria-pressed="true" active tint, consistent with the pattern already used throughout styles.css for period-color mixing.
patterns_established:
  - sound-toggle active state detected via CSS attribute selector [aria-pressed="true"] — no JS class needed for styling, T03 only needs to flip the attribute.
observability_surfaces:
  - DOM check: `document.querySelectorAll('audio[preload="none"]').length === 3`
  - DOM check: `document.querySelector('.sound-toggle').getAttribute('aria-pressed')` → "false" on load
  - DOM check: `Array.from(document.querySelectorAll('audio')).every(a => a.paused)` → true on load
  - Visual check: button visible at bottom-right corner at 1280px and 375px viewports
  - No-overflow check: `document.documentElement.scrollWidth <= document.documentElement.clientWidth`
duration: 20m
verification_result: passed
completed_at: 2026-03-19
blocker_discovered: false
---

# T02: Add audio elements and mute toggle markup

**Added 3 `<audio preload="none" loop>` elements and a floating 48×48px `.sound-toggle` button with `aria-pressed="false"` to index.html, plus full CSS styling with hover/focus/active states and responsive breakpoints.**

## What Happened

Inserted HTML immediately before `<script src="app.js">`:
- `<audio id="sound-colonial" src="audio/colonial.mp3" preload="none" loop>` 
- `<audio id="sound-revolucion" src="audio/revolucion.mp3" preload="none" loop>`
- `<audio id="sound-nacional" src="audio/nacional.mp3" preload="none" loop>`
- `<button class="sound-toggle" aria-pressed="false" aria-label="Activar sonido ambiental" title="Sonido ambiental">🔇</button>`

Added `.sound-toggle` CSS block to the end of `styles.css` using existing design tokens (`--color-card-bg`, `--shadow-elevated`, `--color-celeste-soft`, `--ease-out`, `--duration-fast`). Key style decisions:
- `position: fixed; bottom: 1.25rem; right: 1.25rem; z-index: 200` — floats above all content (max existing z-index was 110).
- `width: 3rem; height: 3rem; border-radius: 50%` — 48px circle, meets ≥44px touch target.
- `[aria-pressed="true"]` selector applies celeste accent tint to signal sound-on state. T03 JS only needs to flip `aria-pressed` — no class toggling needed.
- `@media (max-width: 48rem)` and `@media (max-width: 30rem)` reduce bottom/right offsets slightly for mobile browser chrome.
- `@media (prefers-reduced-motion: reduce)` skips the `transform: scale(1.05)` hover animation.

## Verification

Ran local server on port 7777, verified via `browser_evaluate` and screenshots:

1. `document.querySelectorAll('audio[preload="none"]').length` → **3** ✅
2. All audio `loop` attributes set → `every(a => a.loop)` → **true** ✅
3. All audio paused on load → `every(a => a.paused)` → **true** ✅
4. `.sound-toggle` exists → **true** ✅
5. `aria-pressed` on load → **"false"** ✅
6. `aria-label` → **"Activar sonido ambiental"** ✅
7. Button text → **"🔇"** ✅
8. Computed `position` → **fixed** ✅
9. Computed `width/height` → **48px × 48px** ✅
10. Computed `z-index` → **200** ✅
11. Horizontal overflow → **false** at 1280px ✅
12. Button visible in viewport at 375px → **true** (`getBoundingClientRect` fully within window) ✅
13. `preload="none"` count → **3** ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `document.querySelectorAll('audio[preload="none"]').length === 3` | — | ✅ pass | <1s |
| 2 | `document.querySelector('.sound-toggle')` exists | — | ✅ pass | <1s |
| 3 | `.sound-toggle[aria-pressed]` === "false" on load | — | ✅ pass | <1s |
| 4 | `Array.from(document.querySelectorAll('audio')).every(a => a.paused)` === true | — | ✅ pass | <1s |
| 5 | Computed style: width 48px, height 48px, position fixed, z-index 200 | — | ✅ pass | <1s |
| 6 | No horizontal overflow at 1280px viewport | — | ✅ pass | <1s |
| 7 | Button visible in viewport at 375×667px (rect fully inside window) | — | ✅ pass | <1s |
| 8 | Visual screenshot at 375px — button rendered at bottom-right | — | ✅ pass | 2s |

## Observability Impact

**New signals this task introduces:**

- **DOM state check:** `document.querySelectorAll('audio[preload="none"]').length === 3` — confirms markup exists and preload is correctly suppressed.
- **Mute state (pre-T03):** `document.querySelector('.sound-toggle').getAttribute('aria-pressed')` → `"false"` (muted). After T03, T03's JS will flip this to `"true"` when sound plays.
- **All paused on load:** `Array.from(document.querySelectorAll('audio')).every(a => a.paused)` → `true` — confirms no autoplay violation.
- **Audio IDs:** `sound-colonial`, `sound-revolucion`, `sound-nacional` — T03 references these by ID to play/pause per-period tracks.
- **CSS active state:** `.sound-toggle[aria-pressed="true"]` renders with celeste accent tint — visual signal for developers that aria attribute is correct.

**Failure visibility:**
- If audio elements are missing: T03's `getElementById('sound-colonial')` returns `null` → T03 should guard with null-check and log `[Sound] Audio element missing`.
- If CSS fails to load: button still functional (native button element), just unstyled.
- If `preload` attribute is wrong: `document.querySelectorAll('audio[preload="none"]').length` returns < 3.

## Diagnostics

```js
// Quick health check after T03 is implemented:
document.querySelectorAll('audio[preload="none"]').length // → 3
document.querySelector('.sound-toggle').getAttribute('aria-pressed') // → "false" | "true"
Array.from(document.querySelectorAll('audio')).every(a => a.paused) // → true on load
sessionStorage.getItem('sound-muted') // → null | "true" | "false" (set by T03)

// Inspect individual audio readiness:
Array.from(document.querySelectorAll('audio')).map(a => ({id: a.id, paused: a.paused, readyState: a.readyState}))
```

## Deviations

None. All 4 plan steps implemented exactly as specified.

## Known Issues

None.

## Files Created/Modified

- `index.html` — Added 3 `<audio>` elements with `preload="none" loop` and floating `.sound-toggle` button before `<script src="app.js">`
- `styles.css` — Added `.sound-toggle` block (fixed 48px circle, hover/focus/active states, responsive breakpoints, reduced-motion)
