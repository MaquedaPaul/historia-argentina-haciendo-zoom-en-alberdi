# M005 — Research: Pulido Final y Deploy

**Date:** 2026-03-19

## Summary

M005 is the polish and ship milestone. The codebase exits M004 in a technically solid state: 177 KB of well-structured HTML/CSS/JS, 34 event cards, 52 reveal elements, 3 animated timelines, a working sub-nav with 3 concurrent IntersectionObservers, expand/collapse toggles, and consistent `prefers-reduced-motion` coverage. The foundation is strong. M005's job is to add the final layer of polish and get the project deployed.

The four work areas are: (1) scroll-triggered animations and parallax, (2) ambient sound system, (3) responsive sweep, and (4) optimization and deploy. These areas are not equally risky. Responsiveness has partial coverage already but has real gaps. Sound is the only area with zero existing infrastructure and a hard "optional/mute" UX requirement. Animations extend well-established patterns. Deploy is lightweight for a static site with no build step.

**Recommended slice order:** Responsive sweep first (highest visibility impact, independent of other work), then animations (extends existing patterns), then sound (isolated feature, can be dropped without affecting anything else), then deploy (final gate). Sound can be treated as optional scope — if time or asset quality is a concern, the milestone succeeds without it since R006 says "optional" and D005 says "without narration."

## Recommendation

Work in four slices ordered by risk and dependency:

1. **S01 — Responsive sweep:** Audit and fix mobile gaps. The nav at 320px stacks vertically (already handled at 30rem breakpoint) but there is no hamburger menu — the three nav items collapse into a column, which works but is not polished. The sub-nav inside `#periodo-revolucion` already handles horizontal scroll on mobile (640px breakpoint). The main site nav does NOT have a hamburger — the context says to add one. Gap assessment: events-grid uses `auto-fill, minmax(min(100%, 20rem), 1fr)` which naturally goes to 1-column on mobile — already correct. `period` padding is reduced at 48rem — already handled. The `timeline-aside` is `display:none` at 48rem — already correct. The main gaps are likely typography scale, touch targets, and the nav collapse pattern.

2. **S02 — Animations and parallax:** Extend the existing reveal system with reveal-on-scroll refinements, inter-period transition effects, and subtle parallax on the three period section backgrounds (which are already CSS `linear-gradient` — parallax would be a JS `background-position` offset on scroll, not CSS `background-attachment: fixed` which performs poorly on mobile).

3. **S03 — Sound system:** Zero existing infrastructure. Implement as a fully self-contained IIFE module appended to `app.js`. Must be: optional by default (sound off), toggle-able (mute button in nav or floating), low volume, and triggered by scroll events rather than autoplay. Audio assets must be sourced from public domain / CC0 repositories (Freesound.org, Wikimedia Commons audio). This is the only slice with external asset dependency — free public domain audio files for colonial, revolutionary, and national periods.

4. **S04 — Optimization and deploy:** Images are already `loading="lazy"` on all 33 images. Files are vanilla static (HTML/CSS/JS only, no build step). CSS is 59 KB, JS is 15 KB, HTML is 103 KB — total ~177 KB without images. Google Fonts add 1 round-trip. The main optimization wins are: add `font-display: swap` via the Google Fonts URL (already partially done with `display=swap` in the URL — confirmed at line 12 of `index.html`). Deploy target: GitHub Pages (simplest: push to `main`, enable Pages from repo settings) or Netlify drop (drag-and-drop the folder).

## Implementation Landscape

### Key Files

- `index.html` — 1,259 lines. The main target for HTML-level responsive fixes (touch targets, aria attributes, hamburger button if added). No build step — changes are direct edits.
- `styles.css` — 2,326 lines. Contains all existing breakpoints. Inconsistency: some breakpoints use `rem` (48rem, 30rem), others use `px` (640px). M005 responsive work should normalize to `rem` for consistency. Existing breakpoints:
  - `48rem` (~768px): `.timeline-aside` hidden, `.events-grid` → 1-column, `.site-header` padding reduced, `.alberdi-quote` margins zeroed, all timeline card responsive states
  - `30rem` (~480px): `.nav-list` → column layout, `.sub-nav__link-label` hidden, sublabels hidden on dense timelines
  - `640px` (mixing px and rem — inconsistency): `.sub-nav` → horizontal scroll, `.sub-period__title` font scaled, `.nacional-timeline` responsive
- `app.js` — 441 lines. Single IIFE with 4 self-contained functions: `revealOnScroll()`, `initSubNav()`, `initExpandCollapse()`, and image fallback handler. Sound system should be added as a 5th function `initAmbientSound()` at the same level, called from the init block near line ~148 where the other `init*()` calls live.

### Responsive Gaps Found

The current nav at ≤320px becomes a vertical stack of 3 full-width links — it works but consumes ~100px of viewport height at the top. The context's task list says "hamburger menu for mobile." This is a non-trivial addition: requires a toggle button in the HTML, JS state management for open/close, and CSS for the drawer/overlay. **Decision needed:** full hamburger drawer vs. keeping the stack (which already works). The current vertical stack at 30rem is actually functional — the question is whether a hamburger is worth the implementation complexity for 3 nav items. Recommend presenting both options in the roadmap planner note.

**Missing breakpoint coverage:** No explicit tablet breakpoint (768px–1024px) is defined in CSS. The `auto-fill` grid handles this gracefully (2-column at 768px → ~900px, then 3-column), so no explicit tablet rule may be needed. The `timeline-aside` is hidden at 48rem — but it reappears above 48rem even on tablets, which is correct.

**Sub-nav on mobile:** The `.sub-nav` at 640px switches to `overflow-x: auto` with hidden scrollbar — this is already done and correct. No change needed.

**Card touch targets:** `.card-expand-toggle` has no minimum touch target size specified. Should be ≥44px height (WCAG 2.5.5). Add `min-height: 44px` at mobile breakpoints.

### Animation Gaps Found

Reveal system is comprehensive (52 elements, stagger delays, `prefers-reduced-motion`). What M005 adds:

- **Inter-period transitions:** currently no visual transition between sections when nav-clicking. Could add a mild scale/opacity transition on the `.period` receiving focus. Low complexity.
- **Parallax:** The three period sections use CSS `linear-gradient` backgrounds. Parallax can be implemented as a scroll-event handler that sets `background-position` on `.period` elements — but this is performance-sensitive. **Recommendation:** Use `transform: translateY()` on a dedicated `::before` pseudo-element with `will-change: transform` and `position: absolute` instead of `background-attachment: fixed` (which bypasses GPU compositing on most mobile browsers and causes jank). Set `overflow: hidden` on the parent. This is a CSS-only approach that's safe on mobile.
- **Special event animations:** The context mentions special animations for Revolución de Mayo and Caseros. These could be a shimmer/glow effect on specific cards when they first reveal (via a brief `box-shadow` animation triggered at `reveal--visible`). Low complexity, high impact.

### Sound System Architecture

Zero infrastructure today. The Web Audio API approach is overkill for ambient clips — use `<audio>` elements with `preload="none"` (avoids loading until needed). Pattern:

```html
<!-- Hidden audio elements (added to index.html near </body>) -->
<audio id="sound-colonial" src="audio/campanas-coloniales.mp3" preload="none" loop></audio>
<audio id="sound-revolucion" src="audio/marcha-revolucion.mp3" preload="none" loop></audio>
<audio id="sound-nacional" src="audio/milonga-nacional.mp3" preload="none" loop></audio>
```

The `initAmbientSound()` function in `app.js` would:
1. Initialize with sound globally muted (`sessionStorage` persists choice within session)
2. Add a floating mute toggle button (or integrate into the sticky nav)
3. Piggyback on the existing `setActiveSection()` callback — swap ambient tracks when the active period changes
4. Fade between tracks using `volume` ramp with `setInterval` (Web Audio API is not needed for simple fades)

**Audio asset sourcing:** Freesound.org (CC0 / CC BY) is the most reliable source. Relevant search terms:
- Colonial period: "campanas iglesia", "market colonial", "horse hooves cobblestone"  
- Revolution period: "cannon shot", "crowd cheering", "military drum"
- National period: "accordion tango", "train steam locomotive 19th century", "harbor ship bells"

Files must be: ≤500KB each, MP3 format (widest browser support), loop-able (no jarring cut at loop point). A single MP3 per period is sufficient (no per-event triggers for first implementation).

**Mute button:** A floating `<button>` fixed to bottom-right corner is the simplest approach. Alternative: add a mute icon to the sticky `.site-nav`. The floating button is more discoverable on first use.

### Deploy Options

The project is a static folder with 3 files (`index.html`, `styles.css`, `app.js`) plus any audio assets. No build step, no package.json, no dependencies beyond Google Fonts CDN.

**GitHub Pages:**
- Enable in repo settings → Pages → Source: "Deploy from branch" → `main` → `/` (root)
- URL: `https://<username>.github.io/<repo-name>/`
- No config file needed for root deployment
- First commit needed (git is initialized but has no commits yet — `git log` shows "no commits yet")

**Netlify:**
- Drop folder at app.netlify.com → instant deploy
- Custom domain support, HTTPS automatic
- No `netlify.toml` needed for static root

**Recommendation:** GitHub Pages (free, integrates with existing git repo, permanent URL). Add a `README.md` before first commit for project visibility.

### Optimization State

| Asset | Current | Action Needed |
|-------|---------|---------------|
| HTML | 103 KB | No minification needed — static single page loads once |
| CSS | 59 KB | Could minify to ~40 KB but zero build step makes this manual; low priority |
| JS | 15 KB | Already small; no minification needed |
| Images | 33 × Wikimedia 500px thumbs (external CDN) | `loading="lazy"` already on all 33; no local copies to optimize |
| Fonts | Google Fonts (2 round-trips) | `display=swap` already in URL; `font-display: swap` active |
| Audio (new) | 0 | 3 × ≤500KB MP3s; load with `preload="none"` |

**Lighthouse targets:** Score >90 on Performance is achievable. Main risks:
- Google Fonts render-blocking: the `<link rel="preconnect">` is already in `index.html`. The `display=swap` parameter is already in the Fonts URL. No additional action needed.
- LCP: The hero header has no image (text-only) — LCP will be the header text render, which is fast.
- CLS: No layout shifts expected (grid with `auto-fill` + `min()` clamping; no dynamically sized images above the fold).
- FID/INP: Single vanilla JS file (15 KB), no framework overhead.

### Build Order

1. **S01 Responsive first** — independent of all other work, highest impact on R007, needed for Lighthouse mobile score
2. **S02 Animations second** — extends existing CSS/JS patterns, no new dependencies, can be done in parallel with S01 if needed
3. **S03 Sound third** — isolated new feature, zero coupling to other slices, can be dropped entirely if audio assets prove unusable
4. **S04 Deploy last** — requires stable final state; GitHub Pages setup is ~5 minutes once code is committed

### Verification Approach

- **Responsive:** Browser DevTools emulation at 320px, 375px, 768px, 1024px, 1280px. Check nav behavior, card layout, sub-nav horizontal scroll, timeline visibility.
- **Animations:** Visual inspection in browser, `scroll-into-view` testing for each timeline. Verify `prefers-reduced-motion` by enabling it in OS/DevTools.
- **Sound:** Manual play/mute cycle; verify `preload="none"` means no network requests until first unmute; test across section transitions.
- **Performance:** Lighthouse audit in Chrome DevTools (Incognito mode, mobile preset). Target: Performance >90, Accessibility >90.
- **Deploy:** Verify live URL loads all 3 files and fonts correctly (HTTPS, no mixed content).

## Constraints

- **No build step** (D001) — no minification pipeline, no bundler, no PostCSS. Any optimization must be manual or zero-config.
- **Python unavailable** in this shell — use Node.js for any scripted file manipulation (per KNOWLEDGE.md).
- **Bash heredocs unreliable** for large content blocks on Windows/Git Bash — write to temp file first, then append (per KNOWLEDGE.md).
- **Wikimedia images are external URLs** — no local image files to optimize with `webp`/`avif` conversion. Lazy loading already applied.
- **`color-mix()` CSS function** is used in `styles.css` (card-expand-toggle, card-detail borders) — this requires Chrome 111+, Safari 16.2+, Firefox 113+. Fine for deploy but worth noting for cross-browser testing (S04-T05).
- **`backdrop-filter`** on `.site-nav` and `.sub-nav` requires `-webkit-backdrop-filter` fallback — already present in the CSS. No action needed.
- **Three IntersectionObservers** are currently running concurrently. A fourth (for parallax or special card animations) must use a distinct `rootMargin` and element scope (per KNOWLEDGE.md D023 pattern).

## Common Pitfalls

- **`background-attachment: fixed` for parallax** — DO NOT USE. This disables GPU compositing on mobile Safari and Chrome mobile, causing scroll jank. Use `transform: translateY()` on an `::before` pseudo-element instead.
- **Audio autoplay blocked by browsers** — All modern browsers block audio autoplay without a user gesture. The sound system MUST be opt-in (mute-by-default, user clicks to enable). Attempting to `play()` without a prior user gesture will silently fail or throw a DOMException.
- **`display=swap` is already in the Google Fonts URL** — do not add a separate `@font-face { font-display: swap }` block for Google Fonts; it would conflict and has no effect for hosted fonts. The URL parameter already handles this.
- **`events-grid--certeza` mixing units** — some breakpoints use `px` (640px) and some use `rem` (48rem). When adding new responsive rules, match the nearest existing breakpoint value rather than adding new pixel values. Prefer `rem`.
- **Card stagger `--reveal-delay` is set by `applyStaggerDelays()` in JS** — do not add `style="--reveal-delay: Nms"` on new elements manually if they're in a group; the JS auto-applies stagger to consecutive `.reveal` children of the same parent. Manual inline values override this.
- **GitHub Pages with no prior commits** — the repo is initialized but has 0 commits. The first commit must include all 3 source files plus any audio assets. `git add .` then `git commit` before enabling Pages.

## Open Risks

- **Audio asset quality:** Free CC0 audio for 16th–19th century Argentine context (campanas coloniales, cañones, milonga 1880s) may be hard to find at acceptable quality. Plan B: skip ambient sound entirely (R006 says "optional") and close S03 as out-of-scope with a note. This should be decided at the start of S03 after a brief asset search.
- **Sub-nav + hamburger menu stacking interaction:** If a hamburger menu is implemented, the `.sub-nav` sticky positioning (which stacks under `.site-nav` via `top: var(--nav-height)`) will need to account for the expanded hamburger height. This could cause a visual glitch. Mitigation: use `position: sticky; top: calc(var(--nav-height) + var(--hamburger-menu-height, 0px))` with a CSS custom property set by JS when the menu is open.
- **Lighthouse score on slow networks:** The 33 external Wikimedia images are the main performance unknown. All have `loading="lazy"`, so only images in the initial viewport will block LCP. The header has no images — LCP should be the H1 text. Score >90 is realistic.
- **`color-mix()` cross-browser:** IE11 is already dead but Safari 15 (released 2021) does not support `color-mix()`. If the target audience includes older Apple devices, the expand/collapse toggle borders will fall back to a transparent border. This is cosmetic, not functional.

## Requirements Assessment

Active requirements vs. M005 scope:

| Req | Status | M005 Action |
|-----|--------|-------------|
| R005 (multimedia) | active | Sound (S03) and special card animations (S02) close this requirement |
| R006 (ambient sound) | active | S03 is the primary owner |
| R007 (responsive) | active | S01 is the primary owner; current mobile support is functional but not fully polished |

**Candidate new requirement (advisory):** The deploy task (S04) produces a live public URL — there is no existing requirement for the site to be publicly accessible. The acceptance criteria in M005-CONTEXT says "Sitio publicado y accesible." This could be formalized as a new R015 if the project tracking conventions require it. Not blocking.

**Scope boundary (advisory):** The context includes "Minificar CSS/JS" (S04-T02). Given zero build step and the already-small file sizes (59 KB CSS, 15 KB JS), minification adds complexity with minimal Lighthouse gain. Recommend treating as optional/deferred rather than blocking the milestone.
