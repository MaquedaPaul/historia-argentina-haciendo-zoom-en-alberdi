# S03: Ambient Sound System

**Goal:** Implement an opt-in ambient audio system with period-specific tracks, a floating mute/unmute toggle, and smooth cross-fades between periods on scroll.
**Demo:** Click the floating mute button → ambient audio starts (colonial track if viewing colonial section). Scroll to revolución section → audio fades to revolution track. Click mute → all audio stops. Refresh page → sound is muted by default (no autoplay). On mobile, button is visible and functional.

## Must-Haves

- 3 MP3 audio files (≤500KB each) sourced from CC0/CC BY repositories, one per historical period
- `<audio>` elements in `index.html` with `preload="none"` and `loop`
- Floating mute/unmute `<button>` visible at all viewports (bottom-right corner, ≥44px touch target)
- Sound muted by default — no audio plays until user clicks unmute
- Track switching piggybacks on existing scroll spy's section detection (observes `.nav-item--active` changes or reads from DOM)
- Volume fade between tracks (not abrupt cut)
- `sessionStorage` persists mute/unmute choice within session

## Verification

- On page load: no audio plays. `document.querySelectorAll('audio').forEach(a => console.log(a.paused))` → all `true`.
- Click unmute button → current period's audio plays. `aria-pressed` toggles on the button.
- Scroll to different period → previous track fades out, new track fades in.
- Click mute → all audio pauses immediately. `sessionStorage.getItem('sound-muted')` === `'true'`.
- At 375px viewport: mute button visible and tappable (≥44px).
- `document.querySelectorAll('audio[preload="none"]').length === 3`

## Observability / Diagnostics

- Runtime signals: `[Sound]` console.debug for state changes (mute/unmute, track switch, fade start/end)
- Inspection surfaces: `document.querySelector('.sound-toggle').getAttribute('aria-pressed')` reflects mute state; `sessionStorage.getItem('sound-muted')` persists state
- Failure visibility: Autoplay rejection logged as `[Sound] Autoplay blocked — waiting for user gesture`

## Tasks

- [x] **T01: Source and add audio assets** `est:30m`
  - Why: Audio files are the external dependency that determines whether this slice is viable. Source first to retire the asset quality risk.
  - Files: `audio/` directory (new)
  - Do: Search Freesound.org for CC0 ambient audio: colonial (church bells, horse hooves, market ambience), revolución (military drums, cannon distant, crowd murmur), nacional (accordion/early tango, steam train, harbor). Download 3 clips, trim to ~30-60 seconds (loop-able), convert to MP3 at 128kbps (≤500KB each). If suitable clips cannot be found, document the search results and recommend dropping S03 (R006 says "optional"). Save to `audio/colonial.mp3`, `audio/revolucion.mp3`, `audio/nacional.mp3`.
  - Verify: 3 MP3 files exist in `audio/`, each ≤500KB, each loops cleanly (no jarring cut at the loop point).
  - Done when: 3 usable audio files in `audio/` or a documented decision to drop S03.

- [x] **T02: Add audio elements and mute toggle markup** `est:20m`
  - Why: HTML scaffolding for the audio system — audio elements and the floating button.
  - Files: `index.html`, `styles.css`
  - Do: In `index.html` before `</body>`, add 3 `<audio>` elements with `id="sound-colonial"`, `id="sound-revolucion"`, `id="sound-nacional"`, each with `preload="none"` and `loop`. Add a `<button class="sound-toggle" aria-pressed="false" aria-label="Activar sonido ambiental">🔇</button>` before `<script>`. In `styles.css`, style `.sound-toggle`: `position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 200; width: 48px; height: 48px; border-radius: 50%; border: 2px solid var(--color-divider); background: var(--color-card-bg); font-size: 1.2rem; cursor: pointer; box-shadow: var(--shadow-md); transition: background 0.2s, transform 0.2s;`. Add hover/focus states. When `[aria-pressed="true"]`, change icon to 🔊 (done via JS).
  - Verify: Button visible at bottom-right at both 1280px and 375px. All 3 `<audio>` elements present in DOM. `preload="none"` on all 3.
  - Done when: Audio markup and mute button in the page, styled correctly at all viewports.

- [x] **T03: Implement initAmbientSound() in app.js** `est:40m`
  - Why: The sound system logic — mute toggle, track switching, volume fades, session persistence.
  - Files: `app.js`
  - Do: Add `initAmbientSound()` function. On init: read `sessionStorage.getItem('sound-muted')` — default to `'true'` (muted). Find `.sound-toggle` button. On click: toggle `aria-pressed`, update `sessionStorage`, update button text content (🔇/🔊). If unmuting: play current period's audio at volume 0, fade to 0.15 over 500ms using `setInterval` (increment volume by 0.01 every 33ms). If muting: fade to 0 then pause. For track switching: observe which `.nav-item` has `--active` class via `MutationObserver` on the `<ul class="nav-list">` (watching class changes on children). When active period changes and sound is unmuted: fade out current track (500ms), then fade in new track (500ms). Max volume: 0.15 (low, not intrusive). Handle autoplay rejection: wrap `play()` in `try/catch`, log rejection as `[Sound] Autoplay blocked`. Call from init block.
  - Verify: Click unmute → audio plays at low volume. Scroll to new period → track fades. Click mute → audio stops. Refresh → muted by default. Console shows `[Sound]` debug lines for each state change.
  - Done when: Full sound lifecycle works — mute/unmute, track switching on scroll, volume fades, session persistence, autoplay rejection handled gracefully.

## Files Likely Touched

- `index.html` — 3 `<audio>` elements, mute toggle button
- `styles.css` — `.sound-toggle` fixed button styles
- `app.js` — `initAmbientSound()` function
- `audio/colonial.mp3`, `audio/revolucion.mp3`, `audio/nacional.mp3` — new audio assets
