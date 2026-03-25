---
id: T03
parent: S03
milestone: M005
provides:
  - app.js — initAmbientSound() function with full mute/unmute/track-switch/fade/session-persistence logic
key_files:
  - app.js
key_decisions:
  - Used MutationObserver on .nav-item children (attributeFilter:['class']) rather than polling or a custom event; this piggybacks precisely on the existing setActiveSection() logic without any changes to the scroll spy.
  - Volume ceiling of 0.15 applied only during fade-in (fade starts at 0, increments to MAX_VOLUME=0.15). Paused audio retains browser default volume=1 but that never reaches the user.
  - On mute click, all non-paused tracks are faded out; any lingering fade-in intervals on non-playing tracks are also cleared to prevent stale timers.
  - Stored fade interval IDs in a WeakMap keyed by audio element, so clearFade() is O(1) and garbage-collects automatically if elements are removed.
  - sessionStorage null → muted (opt-in by default); only 'false' triggers unmuted start, matching the no-autoplay contract.
patterns_established:
  - initAmbientSound() MutationObserver pattern: observe .nav-item children with attributeFilter:['class'] to detect scroll spy active changes without modifying the scroll spy itself.
  - Fade via setInterval: volume increments by 0.01 every 33ms → 15 ticks → 500ms to reach 0.15. clearFade(el) kills any in-progress fade before starting a new one (no race conditions).
  - Autoplay rejection guard: wrap play() in try/catch, set pendingPlay=true on catch, retry on next user gesture (click).
observability_surfaces:
  - console.debug('[Sound]', ...) on: init, unmute, mute, fade-in start/end, fade-out start/end, track switch, autoplay blocked, MutationObserver attach
  - document.querySelector('.sound-toggle').getAttribute('aria-pressed') → "false" (muted) | "true" (playing)
  - sessionStorage.getItem('sound-muted') → null (first visit, muted) | "true" (muted) | "false" (playing)
  - Array.from(document.querySelectorAll('audio')).map(a => ({id:a.id,paused:a.paused,volume:a.volume}))
duration: 30m
verification_result: passed
completed_at: 2026-03-19
blocker_discovered: false
---

# T03: Implement initAmbientSound() in app.js

**Added `initAmbientSound()` to app.js implementing the full ambient sound lifecycle: opt-in mute toggle, period-aware track switching via MutationObserver, smooth 500ms volume cross-fades, sessionStorage mute persistence, and graceful autoplay rejection handling with retry-on-gesture.**

## What Happened

Added `initAmbientSound()` function to `app.js` immediately before `initSubNav()`, and called it from the init block after `initParallax()`. The function implements:

1. **Default mute state**: Reads `sessionStorage.getItem('sound-muted')` on init. `null` (first visit) or `'true'` → starts muted (🔇, `aria-pressed="false"`). Only `'false'` triggers unmuted start. This ensures no autoplay on page load.

2. **Toggle click handler**: Flips `isMuted`, writes to `sessionStorage`, updates button emoji (🔇/🔊) and `aria-pressed` attribute, and `aria-label` (localized Spanish). On unmute: determines active period from `.nav-item--active` → `playWithFade()`. On mute: `fadeOut()` all non-paused tracks.

3. **fadeIn / fadeOut helpers**: Use `setInterval` at 33ms intervals, incrementing/decrementing `volume` by 0.01. Ceiling: `MAX_VOLUME = 0.15`. Interval handles stored in a `WeakMap` keyed by audio element; `clearFade()` kills any in-progress fade before starting a new one, preventing race conditions. `fadeOut()` accepts an optional `onDone` callback, used for sequential cross-fades.

4. **Track switching**: `MutationObserver` on all `.nav-item` children with `attributeFilter: ['class']`. When any nav-item's class changes, `getActivePeriodId()` re-reads the DOM to find the new active period. If the period changed and sound is unmuted: `fadeOut(prev, () => playWithFade(next))` — the callback chains the fade-in after the fade-out completes.

5. **Autoplay rejection**: `play()` calls are wrapped in `try/catch`. On rejection, `pendingPlay = true` and `[Sound] Autoplay blocked — waiting for user gesture` is logged. The next click on the toggle checks `pendingPlay` and retries.

6. **MutationObserver fallback**: If `MutationObserver` is unavailable (very old browsers), falls back to a passive scroll event listener calling `handleActiveChange()`.

## Verification

All checks verified live in the browser via `browser_evaluate`:

- **Page load**: All 3 audio elements paused, 🔇 emoji, `aria-pressed="false"`, `sessionStorage: null`
- **Click unmute**: `aria-pressed="true"`, emoji → 🔊, `sessionStorage: "false"`, `sound-colonial.paused: false`
- **Fade-in completes (600ms)**: `sound-colonial.volume === 0.15` exactly
- **Click mute**: `aria-pressed="false"`, emoji → 🔇, `sessionStorage: "true"`  
- **Fade-out completes (600ms)**: `sound-colonial.paused: true`, `volume: 0`
- **Track switch (MutationObserver)**: Manually triggered class change on nav-items → colonial faded out + paused, revolución faded in + playing at 0.15
- **After reload with `sound-muted: "true"`**: All audio paused, 🔇, `aria-pressed="false"`
- **Mobile 375×667px**: Button 48×48px, fully within viewport, `inViewport: true`
- **`document.querySelectorAll('audio[preload="none"]').length === 3`**: ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `Array.from(document.querySelectorAll('audio')).every(a => a.paused)` on load | — | ✅ pass | <1s |
| 2 | `document.querySelectorAll('audio[preload="none"]').length === 3` | — | ✅ pass | <1s |
| 3 | `.sound-toggle[aria-pressed] === "false"` on load | — | ✅ pass | <1s |
| 4 | `.sound-toggle.textContent === "🔇"` on load | — | ✅ pass | <1s |
| 5 | `sessionStorage.getItem('sound-muted') === null` on first visit | — | ✅ pass | <1s |
| 6 | Click unmute → `aria-pressed === "true"`, emoji → 🔊, sessionStorage → "false" | — | ✅ pass | <1s |
| 7 | After 600ms fade-in: `sound-colonial.paused === false`, `.volume === 0.15` | — | ✅ pass | 0.6s |
| 8 | Click mute → `aria-pressed === "false"`, sessionStorage → "true" | — | ✅ pass | <1s |
| 9 | After 600ms fade-out: `sound-colonial.paused === true`, `.volume === 0` | — | ✅ pass | 0.6s |
| 10 | MutationObserver track switch: colonial paused, revolución playing at 0.15 | — | ✅ pass | 1.3s |
| 11 | Reload with `sound-muted:"true"` → all paused, 🔇, aria-pressed="false" | — | ✅ pass | 2s |
| 12 | Mobile 375px: button 48×48px, fully in viewport | — | ✅ pass | <1s |
| 13 | Playing audio max volume ≤ 0.15 | — | ✅ pass | <1s |

## Observability Impact

**New runtime signals introduced by this task:**

- **`[Sound]` console.debug stream**: Emitted for every state transition — init (muted:, sessionStorage was:), fade-in start/end (→ audio ID, vol), fade-out start/done (→ audio ID, paused), track switch (prevPeriod → newPeriod), user muted, user unmuted, MutationObserver attached to N nav items, autoplay blocked.
- **`aria-pressed` attribute on `.sound-toggle`**: `"false"` = currently muted/stopped; `"true"` = audio playing. CSS selector `.sound-toggle[aria-pressed="true"]` shows celeste accent tint as visual confirmation.
- **`sessionStorage.getItem('sound-muted')`**: `null` = first visit (muted by default); `"true"` = explicitly muted; `"false"` = explicitly unmuted.
- **Audio state inspection**: `Array.from(document.querySelectorAll('audio')).map(a => ({id:a.id,paused:a.paused,volume:a.volume}))` — only one element should be non-paused at any time; its volume should be 0.15 after fade completes.

**Failure visibility:**
- `[Sound] Required element missing — sound system disabled` → one of the DOM elements from T02 is absent
- `[Sound] Autoplay blocked — waiting for user gesture` → browser blocked the play() call; next user click will retry
- If MutationObserver fires but active period doesn't change: `handleActiveChange` returns early (no log), no side effects

## Diagnostics

```js
// Full sound system health check:
document.querySelector('.sound-toggle').getAttribute('aria-pressed') // → "false"|"true"
sessionStorage.getItem('sound-muted')  // → null|"true"|"false"
Array.from(document.querySelectorAll('audio')).map(a => ({id:a.id,paused:a.paused,volume:parseFloat(a.volume.toFixed(3))}))
// → at most one element with paused:false; its volume should be 0.15 after fade

// Trigger track switch manually:
document.querySelectorAll('.nav-item').forEach(item => {
  var link = item.querySelector('.nav-link');
  if (link && link.getAttribute('href') === '#periodo-nacional') {
    item.classList.add('nav-item--active');
  } else {
    item.classList.remove('nav-item--active');
  }
}); // → MutationObserver fires, cross-fade executes
```

## Deviations

None. All 7 plan steps implemented as specified.

## Known Issues

- The audio files are valid but silent (T01 placeholder decision). The sound system works correctly mechanically — toggle, fade, track switch, session persistence all function — but produces no audible output until real audio files replace the placeholders.
- Paused audio elements retain `volume: 1` (browser default). This is harmless because they never play at that volume — `playWithFade()` resets volume to 0 before calling `play()`. It could be cosmetically confusing in the devtools audio inspector.

## Files Created/Modified

- `app.js` — Added `initAmbientSound()` function (~160 lines) and `initAmbientSound()` call in init block
