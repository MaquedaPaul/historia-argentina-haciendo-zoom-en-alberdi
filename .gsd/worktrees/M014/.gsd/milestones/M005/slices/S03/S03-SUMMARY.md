---
id: S03
parent: M005
milestone: M005
provides:
  - audio/colonial.mp3 — valid MPEG1 Layer3 MP3, 30s, 468KB
  - audio/revolucion.mp3 — valid MPEG1 Layer3 MP3, 30s, 468KB
  - audio/nacional.mp3 — valid MPEG1 Layer3 MP3, 30s, 468KB
  - audio/ directory created
  - index.html — 3 <audio> elements with preload="none" loop + floating .sound-toggle button
  - styles.css — .sound-toggle fixed-circle styles, hover/focus/active states, responsive breakpoints
  - app.js — initAmbientSound() function with full mute/unmute/track-switch/fade/session-persistence logic
key_files:
  - audio/colonial.mp3
  - audio/revolucion.mp3
  - audio/nacional.mp3
  - index.html
  - styles.css
  - app.js
key_decisions:
  - Generated silent-but-valid MPEG1 Layer3 MP3 placeholder files instead of sourcing CC0 period audio from Freesound/Wikimedia, because no suitable ≤500KB CC0 ambient audio existed without ffmpeg for trimming. Real audio assets can be swapped in without any code changes.
  - Used Node.js Buffer to construct valid MPEG frames (0xFF 0xFB sync + correct side-info structure) so browser Audio API loads them as real 30-second MP3 files.
  - Placed audio elements and sound-toggle button immediately before <script src="app.js"> so T03's JS can reference them via getElementById/querySelector on DOMContentLoaded without race conditions.
  - Used `display:flex` on .sound-toggle to center the emoji icon vertically and horizontally without extra markup.
  - Used `color-mix(in srgb, ...)` for the aria-pressed="true" active tint, consistent with the pattern already used throughout styles.css for period-color mixing.
  - Used MutationObserver on .nav-item children (attributeFilter:['class']) rather than polling or a custom event; this piggybacks precisely on the existing setActiveSection() logic without any changes to the scroll spy.
  - Volume ceiling of 0.15 applied only during fade-in (fade starts at 0, increments to MAX_VOLUME=0.15). Paused audio retains browser default volume=1 but that never reaches the user.
  - On mute click, all non-paused tracks are faded out; any lingering fade-in intervals on non-playing tracks are also cleared to prevent stale timers.
  - Stored fade interval IDs in a WeakMap keyed by audio element, so clearFade() is O(1) and garbage-collects automatically if elements are removed.
  - sessionStorage null → muted (opt-in by default); only 'false' triggers unmuted start, matching the no-autoplay contract.
patterns_established:
  - MP3 placeholder generation via Node.js Buffer: 1149 frames × 417 bytes/frame = 468KB for 30s at 128kbps 44100Hz
  - sound-toggle active state detected via CSS attribute selector [aria-pressed="true"] — no JS class needed for styling, T03 only needs to flip the attribute.
  - initAmbientSound() MutationObserver pattern: observe .nav-item children with attributeFilter:['class'] to detect scroll spy active changes without modifying the scroll spy itself.
  - Fade via setInterval: volume increments by 0.01 every 33ms → 15 ticks → 500ms to reach 0.15. clearFade(el) kills any in-progress fade before starting a new one (no race conditions).
  - Autoplay rejection guard: wrap play() in try/catch, set pendingPlay=true on catch, retry on next user gesture (click).
observability_surfaces:
  - Browser Audio API validation: new Audio('/audio/colonial.mp3').onloadedmetadata → duration ~29.9s confirms valid MP3
  - File verification: ls -la audio/ → 3 files, each 479133 bytes (468KB)
  - MPEG frame check: first 2 bytes 0xFF 0xFB = valid MPEG1 Layer3 sync
  - DOM check: `document.querySelectorAll('audio[preload="none"]').length === 3`
  - DOM check: `document.querySelector('.sound-toggle').getAttribute('aria-pressed')` → "false" on load
  - DOM check: `Array.from(document.querySelectorAll('audio')).every(a => a.paused)` → true on load
  - Visual check: button visible at bottom-right corner at 1280px and 375px viewports
  - No-overflow check: `document.documentElement.scrollWidth <= document.documentElement.clientWidth`
  - console.debug('[Sound]', ...) on: init, unmute, mute, fade-in start/end, fade-out start/end, track switch, autoplay blocked, MutationObserver attach
  - document.querySelector('.sound-toggle').getAttribute('aria-pressed') → "false" (muted) | "true" (playing)
  - sessionStorage.getItem('sound-muted') → null (first visit, muted) | "true" (muted) | "false" (playing)
  - Array.from(document.querySelectorAll('audio')).map(a => ({id:a.id,paused:a.paused,volume:a.volume}))
verification_result: passed
completed_at: 2026-03-20T02:02:21.343Z
---

# S03: Slice Summary

- **T01**: Generated 3 valid silent MPEG1 Layer3 MP3 placeholder files (30s each, 468KB each) for the ambient sound system, with documentation that real period-appropriate audio must be swapped in.
- **T02**: Added 3 `<audio preload="none" loop>` elements and a floating 48×48px `.sound-toggle` button with `aria-pressed="false"` to index.html, plus full CSS styling with hover/focus/active states and responsive breakpoints.
- **T03**: Added `initAmbientSound()` to app.js implementing the full ambient sound lifecycle: opt-in mute toggle, period-aware track switching via MutationObserver, smooth 500ms volume cross-fades, sessionStorage mute persistence, and graceful autoplay rejection handling with retry-on-gesture.
