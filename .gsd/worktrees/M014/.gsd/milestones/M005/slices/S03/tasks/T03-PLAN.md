---
estimated_steps: 7
estimated_files: 1
---

# T03: Implement initAmbientSound() in app.js

**Slice:** S03 — Ambient Sound System
**Milestone:** M005

## Description

Add the `initAmbientSound()` function to `app.js` that manages the full sound lifecycle: mute/unmute toggle, period-aware track switching (observing which nav item is active), volume fades between tracks, session persistence via `sessionStorage`, and graceful autoplay rejection handling.

## Steps

1. Add `initAmbientSound()` function after the existing `initExpandCollapse()` function in `app.js`.
2. Inside the function: read `sessionStorage.getItem('sound-muted')` — if null or `'true'`, sound starts muted. Find `.sound-toggle` button and all 3 `<audio>` elements by ID. Map period IDs to audio element IDs: `{ 'periodo-colonial': 'sound-colonial', 'periodo-revolucion': 'sound-revolucion', 'periodo-nacional': 'sound-nacional' }`.
3. Add click listener on `.sound-toggle`: toggle `aria-pressed` attribute, update `sessionStorage`, update button emoji (`🔇` when muted, `🔊` when unmuted). On unmute: determine current active period from `.nav-item--active` class on nav list → play that period's audio with fade-in. On mute: fade out current track then `pause()`.
4. Implement `fadeIn(audioEl, targetVol, duration)` and `fadeOut(audioEl, duration)` helper functions using `setInterval` — increment/decrement `volume` by 0.01 every ~33ms (30 steps/sec). Target max volume: 0.15 (quiet, not intrusive). Clear interval when target reached.
5. Track switching: use `MutationObserver` on the `<ul class="nav-list">` to watch for `class` attribute changes on child `.nav-item` elements. When the active item changes and sound is unmuted: fade out current audio, then fade in the new period's audio.
6. Handle autoplay rejection: wrap `.play()` calls in a try/catch. On rejection, log `[Sound] Autoplay blocked — waiting for user gesture` and set a flag so the next user click retries.
7. Call `initAmbientSound()` from the init block alongside other `init*()` calls.

## Must-Haves

- [ ] Sound muted by default (no autoplay on page load)
- [ ] Toggle click plays/pauses audio with volume fade
- [ ] Track switches when active period changes (via MutationObserver)
- [ ] Volume never exceeds 0.15 (quiet ambient, not intrusive)
- [ ] `sessionStorage` persists mute state within session
- [ ] Autoplay rejection handled gracefully (no uncaught Promise rejection)
- [ ] `[Sound]` console.debug messages for all state transitions

## Verification

- Page load: all audio paused, button shows 🔇, `aria-pressed="false"`
- Click unmute: audio plays at low volume (~0.15), button shows 🔊, `aria-pressed="true"`
- Scroll to new period: previous track fades, new track fades in
- Click mute: audio fades to 0 and pauses
- Refresh: button shows 🔇 (default muted)
- Console: `[Sound]` debug lines for init, unmute, track switch, mute

## Inputs

- `app.js` — existing scroll spy that sets `.nav-item--active` on the nav list
- `index.html` — 3 `<audio>` elements and `.sound-toggle` button (from T02)
- Existing `SECTION_IDS` array in app.js for period ID mapping

## Expected Output

- `app.js` — `initAmbientSound()` function with full mute/unmute/track-switch/fade logic
