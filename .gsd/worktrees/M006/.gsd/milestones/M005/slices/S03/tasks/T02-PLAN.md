---
estimated_steps: 4
estimated_files: 2
---

# T02: Add audio elements and mute toggle markup

**Slice:** S03 — Ambient Sound System
**Milestone:** M005

## Description

Add the HTML scaffold for the sound system: 3 `<audio>` elements with `preload="none"` and a floating mute/unmute toggle button. Style the button as a fixed circle at the bottom-right with ≥44px touch target.

## Steps

1. In `index.html`, before the `<script src="app.js">` line, add 3 `<audio>` elements: `<audio id="sound-colonial" src="audio/colonial.mp3" preload="none" loop></audio>`, same for `sound-revolucion` and `sound-nacional`.
2. Before the `<script>` line, add: `<button class="sound-toggle" aria-pressed="false" aria-label="Activar sonido ambiental" title="Sonido ambiental">🔇</button>`.
3. In `styles.css`, add `.sound-toggle` styles: fixed position bottom-right, 48px circle, `z-index: 200`, card background, divider border, medium shadow, smooth hover/focus transitions. On `[aria-pressed="true"]`, add a subtle accent border or background tint to indicate active state.
4. At ≤48rem breakpoint, ensure the button is still visible and doesn't overlap other fixed/sticky elements. Adjust `bottom`/`right` if needed.

## Must-Haves

- [ ] 3 `<audio>` elements with `preload="none"` and `loop` in DOM
- [ ] Floating button visible at all viewports (≥44px)
- [ ] Button has `aria-pressed="false"` and `aria-label` on load
- [ ] No layout shift from adding the fixed button

## Verification

- `document.querySelectorAll('audio[preload="none"]').length === 3`
- `document.querySelector('.sound-toggle')` exists with `aria-pressed="false"`
- Visual: button visible at bottom-right at 1280px and 375px
- No horizontal overflow introduced

## Inputs

- `index.html` lines 1257-1259 — area before `<script>` tag
- `styles.css` — existing design tokens for colors, shadows, borders
- T01 output — audio files in `audio/` directory

## Expected Output

- `index.html` — 3 `<audio>` elements + `.sound-toggle` button added
- `styles.css` — `.sound-toggle` positioning and styling rules
