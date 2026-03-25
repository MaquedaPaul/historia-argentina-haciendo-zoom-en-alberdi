---
id: S04
parent: M005
milestone: M005
provides:
  - Lighthouse mobile Performance 96/100 (target >90) VALIDATED
  - Lighthouse mobile Accessibility 100/100 (target >90) VALIDATED
  - Lighthouse mobile SEO 100/100 VALIDATED
  - Skip link for keyboard navigation (WCAG 2.4.1)
  - All WCAG AA color contrast failures fixed
  - Async Google Fonts (non-render-blocking)
  - CLS fix via aspect-ratio on .card-image containers (0.182→0.067)
  - content-visibility: auto on .period sections (Style+Layout 1167ms→859ms)
  - Two git commits on main branch
requires: []
affects: []
key_files:
  - index.html
  - styles.css
key_decisions:
  - "D030: Skip CSS/JS minification — payload small enough without it"
  - "D035: --color-colonial-text / --color-nacional-text CSS vars darker than accent for WCAG AA on text"
  - "Deploy deferred at user request — no live HTTPS URL; Lighthouse validated locally"
patterns_established:
  - "Lighthouse CLI Windows: CHROME_PATH to Playwright Chromium binary; EPERM cleanup is harmless"
  - "content-visibility: auto on large off-screen sections reduces Style+Layout ~25%; add contain-intrinsic-size"
  - "Footer bg-warm (#ede6d6) + text-muted (#7a6b5a) = 4.14:1 FAILS AA; use --color-text in footer"
  - "aspect-ratio on image container prevents CLS before images load"
observability_surfaces:
  - "CHROME_PATH=path npx lighthouse http://localhost:8090 --form-factor=mobile --output=json --output-path=/tmp/lh.json"
  - "git log --oneline — 2 commits: 203432a (initial) + a64ebf2 (a11y/perf fixes)"
drill_down_paths:
  - .gsd/milestones/M005/slices/S04/tasks/T01-SUMMARY.md
  - .gsd/milestones/M005/slices/S04/tasks/T02-SUMMARY.md
  - .gsd/milestones/M005/slices/S04/tasks/T03-SUMMARY.md
duration: 3h
verification_result: passed
completed_at: 2026-03-20
---

# S04: Optimization and deploy

**Lighthouse mobile Performance 96 and Accessibility 100 achieved via a11y fixes, async fonts, CLS prevention, and content-visibility optimization; deploy deferred at user request.**

## What Happened

T01 created the initial git repository and committed all 8 site files (HTML, CSS, JS, 3 MP3 placeholders, README).

T02 attempted GitHub Pages deploy — no gh auth configured, no remote set. User chose to defer deploy and accept local Lighthouse scores.

T03 ran a full Lighthouse mobile audit locally against `npx http-server` port 8090 using the Playwright Chromium binary. Baseline was Performance 67, Accessibility 96. Applied targeted fixes:
- Accessibility: skip link, `aria-labelledby` on sections, `aria-hidden` on audio, darkened period badge text colors (colonial/nacional/celeste-deep/sepia-dark) to meet WCAG AA 4.5:1, footer text upgraded from text-muted to --color-text
- Performance: async Google Fonts preload, `content-visibility: auto` on `.period` sections, `aspect-ratio: 16/9` on `.card-image` containers

Final scores: Performance 96, Accessibility 100, SEO 100. All committed as `a64ebf2`.

## Verification

- Lighthouse mobile Performance: 96 ✅ (>90 target)
- Lighthouse mobile Accessibility: 100 ✅ (>90 target)
- Lighthouse mobile SEO: 100 ✅
- CLS: 0.074 (was 0.182) ✅
- TBT: 0ms ✅
- 0 accessibility failures ✅
- git: 2 commits, working tree clean ✅
- Browser: sound toggle functional, no console errors ✅

## Deviations

- Deploy to GitHub Pages/Netlify deferred at user request (T02 had no auth)
- Best Practices 73 — Google Fonts third-party cookie; not a slice target

## Known Limitations

- No live HTTPS URL — Lighthouse validated locally only
- Audio files are silent MP3 placeholders — real audio sourced in M006

## Follow-ups

- M006: Replace silent MP3 placeholders with real CC0/public domain music

## Files Created/Modified

- `index.html` — skip link, `id="main-content"`, `aria-labelledby` on 3 sections, `aria-hidden` on audio, async font preload
- `styles.css` — accessible text color vars, darkened celeste-deep/sepia-dark, footer contrast fix, skip-link CSS, `content-visibility: auto`, `aspect-ratio: 16/9`
- `README.md` — project documentation (T01)
- `audio/colonial.mp3`, `audio/revolucion.mp3`, `audio/nacional.mp3` — silent placeholders (T01)

## Forward Intelligence

### What the next slice should know
- Audio system in app.js is fully implemented — only the MP3 files need replacing, zero code changes
- The three audio element IDs are `sound-colonial`, `sound-revolucion`, `sound-nacional`
- Files must be named exactly `colonial.mp3`, `revolucion.mp3`, `nacional.mp3` in `audio/`

### What's fragile
- No live deployment — the site exists only locally at `http://localhost:8090`

### Authoritative diagnostics
- `git log --oneline` — 2 commits expected
- `ls -la audio/*.mp3` — files currently ~468KB each (silent synthetic MP3)
