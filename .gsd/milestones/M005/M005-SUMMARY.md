---
id: M005
provides:
  - Complete Historia Argentina 1500-1900 site with hamburger nav, parallax, timelines, sound system, and responsive design
  - Lighthouse mobile Performance 96/100 and Accessibility 100/100
  - Two git commits on main branch (203432a initial, a64ebf2 a11y/perf fixes)
key_decisions:
  - "D030: Skip CSS/JS minification — payload small enough, zero build step preserved"
  - "D031: CSS ::before parallax with JS custom property bridge, not background-attachment:fixed"
  - "D032: Grid single-column override at 40rem not 48rem"
  - "D033: .events-grid--certeza minmax 20rem for 2 columns at 768px"
  - "D034: .period--featured::before accent bar migrated to ::after to free ::before for parallax"
  - "D035: -text CSS variable variants for WCAG AA contrast on text, preserving saturated accents for decorative use"
patterns_established:
  - "Silent MPEG1 L3 MP3 placeholders via Node.js Buffer — valid 30s files, real audio swap-in with zero code changes"
  - "MutationObserver on nav-item classlist for sound track switching — decoupled from scroll spy"
  - "Lighthouse CLI on Windows: CHROME_PATH to Playwright Chromium; EPERM cleanup harmless"
  - "content-visibility: auto + contain-intrinsic-size on off-screen sections reduces mobile CPU ~25%"
  - "aspect-ratio on image containers prevents CLS; footer bg-warm requires --color-text not text-muted"
observability_surfaces:
  - "CHROME_PATH=~/.../chromium-1208/chrome-win64/chrome.exe npx lighthouse <url> --form-factor=mobile --output=json --output-path=/tmp/lh.json"
  - "git log --oneline — 2 commits on main"
  - "document.querySelector('.skip-link') — accessibility skip nav present"
requirement_outcomes: []
duration: ~3 weeks
verification_result: passed
completed_at: 2026-03-20
---

# M005: Pulido Final y Deploy

**Complete site shipped with hamburger nav, parallax, animated timelines, ambient sound system, and Lighthouse mobile Performance 96 / Accessibility 100 — deploy deferred at user request.**

## What Happened

S01 built the responsive hamburger menu and fixed the CSS grid breakpoint (40rem not 48rem) to restore 2-column card layout at 768px. The sub-nav sticky positioning inside the revolución section was verified to work with the expanded hamburger height.

S02 added parallax backgrounds to period sections using CSS `::before` + JS custom property bridge, a golden glow reveal animation on key event cards, and a `--featured` accent bar (migrated from `::before` to `::after` to avoid pseudo-element conflict with parallax).

S03 implemented the full ambient sound system: generated valid silent MP3 placeholders via Node.js Buffer, added three `<audio>` elements, a mute/unmute toggle button with correct ARIA state, and MutationObserver-based track switching that piggybacks on the existing scroll spy without modifying it.

S04 ran Lighthouse mobile audit (baseline Performance 67, Accessibility 96), applied targeted fixes — skip link, `aria-labelledby` on sections, WCAG AA color contrast fixes via -text CSS variable variants, async Google Fonts preload, `content-visibility: auto` on period sections, `aspect-ratio` on image containers — and reached Performance 96, Accessibility 100. All changes committed.

## Cross-Slice Verification

- Hamburger menu: opens/closes with smooth transition, ARIA state correct, sub-nav unaffected ✅
- Parallax: visible on scroll at desktop, disabled with prefers-reduced-motion ✅
- Golden glow: fires on reveal for Revolución de Mayo and Caseros cards ✅
- Sound toggle: muted by default, unmutes on click, track changes per period ✅
- Lighthouse mobile Performance: **96** ✅ (>90 target)
- Lighthouse mobile Accessibility: **100** ✅ (>90 target)
- Lighthouse mobile SEO: **100** ✅
- CLS: 0.074 (was 0.182) ✅
- TBT: 0ms ✅
- git: 2 commits, clean working tree ✅

## Forward Intelligence

### What the next milestone should know
- Audio files `audio/colonial.mp3`, `audio/revolucion.mp3`, `audio/nacional.mp3` are silent placeholders — the system works, only the files need replacing
- Audio element IDs: `sound-colonial`, `sound-revolucion`, `sound-nacional`
- No live deployment exists — site runs locally at `http://localhost:8090` via `npx http-server`
- To deploy: `gh auth login` then `gh repo create historia-argentina --public --source=. --remote=origin --push`, enable GitHub Pages in repo settings

### What's fragile
- No live HTTPS URL — Lighthouse scores validated locally only (uncompressed server inflates performance baseline vs deployed gzip)
- Silent MP3 placeholders — user sees the sound toggle but hears nothing until M006 completes

### Authoritative diagnostics
- `git log --oneline` — 2 commits: 203432a + a64ebf2
- `ls -la audio/*.mp3` — three ~468KB silent files (will be replaced in M006)

### What assumptions changed
- Deploy was assumed straightforward but required gh auth + remote setup that wasn't available; deferred at user request

## Files Created/Modified

- `index.html` — hamburger nav, audio elements, skip link, aria attributes, async fonts
- `styles.css` — hamburger CSS, parallax, golden glow, accessible color vars, content-visibility, aspect-ratio
- `app.js` — hamburger toggle, parallax rAF loop, sound system with MutationObserver track switching
- `audio/colonial.mp3`, `audio/revolucion.mp3`, `audio/nacional.mp3` — silent placeholders
- `README.md` — project documentation
