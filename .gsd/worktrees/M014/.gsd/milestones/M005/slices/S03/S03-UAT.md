---
id: S03
parent: M005
type: artifact-driven
---

# S03: UAT

- On page load: no audio plays. `document.querySelectorAll('audio').forEach(a => console.log(a.paused))` → all `true`.
- Click unmute button → current period's audio plays. `aria-pressed` toggles on the button.
- Scroll to different period → previous track fades out, new track fades in.
- Click mute → all audio pauses immediately. `sessionStorage.getItem('sound-muted')` === `'true'`.
- At 375px viewport: mute button visible and tappable (≥44px).
- `document.querySelectorAll('audio[preload="none"]').length === 3`
