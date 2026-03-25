---
id: S02
parent: M016
milestone: M016
provides:
  - Sub-period #rev-alberdi-mitre with 4 history cards visible in index.html
  - 8th sub-nav link wired to #rev-alberdi-mitre inside #periodo-revolucion
requires:
  - slice: S01
    provides: S01-CONTENT-DRAFT.md with 4 verified cards (3 hecho, 1 opinión)
affects: []
key_files:
  - index.html
key_decisions:
  - Wikimedia images for Cards B, C, D were MISSING per API; applied fallbacks: Cards A+B share Mitre retrato general, Card C uses Alberdi SP4-1 portrait, Card D uses inline SVG placeholder
  - card-nota-historiografica placed directly inside <article> (not collapsible) — following the established pattern for contested-history epistemic notices
  - card-opinion__quote uses nested <footer class="card-opinion__attribution"> with card-opinion__author + card-opinion__context, per real codebase pattern
patterns_established:
  - Card structure: event-card__year + event-card__title directly inside <article>, no card-header/card-body wrappers
  - card-nota-historiografica goes inside <article> after the excerpt <p>, always visible (not collapsible)
  - Card D (opinión) uses card-opinion__quote > <blockquote> + <footer class="card-opinion__attribution"> > card-opinion__author + card-opinion__context
  - Sub-period wrapper uses classes: sub-period reveal reveal-fade
  - Grid container uses: events-grid events-grid--certeza
observability_surfaces:
  - grep -c "rev-alberdi-mitre" index.html → 3 (≥2 pass)
  - node certeza check → hecho:3, card-opinion:6 (≥1 pass)
  - node cite count → 4 (≥4 pass)
  - node card-nota-historiografica → PRESENT
  - node JS syntax check → syntax OK
  - node banned-phrase check (BIOG-13, SP4-3) → both absent (OK)
  - Browser SubNav log: "[SubNav] Initialized with 8 sub-periods, 8 links" + "[SubNav] Active sub-period → rev-alberdi-mitre" on scroll
drill_down_paths:
  - .gsd/milestones/M016/slices/S02/tasks/T01-SUMMARY.md
duration: ~20m
verification_result: passed
completed_at: 2026-03-24
---

# S02: Integración HTML

**Sub-period #rev-alberdi-mitre with 4 verified history cards (3 hecho, 1 opinión) inserted into index.html — all 6 slice verification checks pass, section renders in browser with sub-nav, certeza styling, nota historiográfica, and zero new JS errors.**

## What Happened

T01 inserted a 126-line sub-period block into `index.html` between `</div><!-- /#rev-1852-1860 -->` and `<!-- REVOLUCION TIMELINE:`. The block contains 4 cards derived from `S01-CONTENT-DRAFT.md`:

- **Card A** (hecho): Alberdi y Mitre se unen contra Rosas, 1848–1852
- **Card B** (hecho): Caseros — victoria compartida, futuros separados, 1852
- **Card C** (hecho): La Constitución de 1853 — legado de Alberdi, derrota política, 1853 — includes `card-nota-historiografica` for the historiographic debate on Alberdi's dual victory/defeat
- **Card D** (opinión): Pavón y el modelo de país, 1861–1862 — Mayer paraphrase with `card-opinion__quote` blockquote, `card-opinion__attribution` footer

Before inserting, the executor verified Wikimedia image URLs for Cards B, C, D via the Commons API — all three specific images were MISSING. Fallbacks applied as specified in the task plan: Cards A and B both use the confirmed Mitre retrato general URL, Card C uses the confirmed Alberdi SP4-1 portrait URL, Card D uses an inline SVG placeholder. Image fallback was handled automatically by the existing `initImageFallbacks` system.

The 8th sub-nav link (`<a href="#rev-alberdi-mitre">1848–1862 Alberdi y Mitre</a>`) was added after the `#rev-1852-1860` link. Browser SubNav log confirmed: "Initialized with 8 sub-periods, 8 links" and "[SubNav] Active sub-period → rev-alberdi-mitre" on scroll-in.

## Verification

All 6 slice verification checks run and pass:

| # | Check | Result | Verdict |
|---|-------|--------|---------|
| 1 | `grep -c "rev-alberdi-mitre" index.html` | 3 | ✅ ≥2 |
| 2 | Certeza distribution (hecho + card-opinion) | hecho:3, card-opinion:6 | ✅ ≥1 |
| 3 | `<cite>` count in block | 4 | ✅ ≥4 |
| 4 | `card-nota-historiografica` in block | PRESENT | ✅ |
| 5 | JS syntax check (`new Function(app.js)`) | syntax OK | ✅ |
| 6 | Banned phrases (BIOG-13, SP4-3) | both absent | ✅ |

Browser confirmed: all 4 cards render with correct certeza badges, correct year labels, excerpt text, and cite footers. Card C shows `Nota historiográfica:` paragraph. Card D shows `OPINIÓN HISTORIOGRÁFICA` badge and blockquote. Sub-nav link navigates correctly. Reveal animation fires. No new JS errors.

## New Requirements Surfaced

- none

## Deviations

- Cards B, C, D images: the three specific Wikimedia URLs were MISSING per API. Applied fallbacks as specified in T01-PLAN.md. This was the expected fallback path documented before execution.
- `S02-PLAN.md` received a minor addition (`## Observability / Diagnostics` section) as a pre-flight gap fix required by task instructions — not a deviation from slice goals.

## Known Limitations

- Cards A and B share the same fallback image (Mitre retrato general). A future task could source a confirmed distinct image for Card B (Batalla de Pavón or the Acuerdo de San Nicolás). Cosmetic only — no content or functional issue.
- Card D SVG placeholder triggers a `[WARNING] [Images] Failed to load` console warning from the app's fallback handler (the handler also processes `data:` URIs). Cosmetic only — the image area renders correctly.
- One pre-existing 404 error appears on each page load (unrelated to M016); was present before this slice.

## Follow-ups

- Source a distinct confirmed image URL for Card B (Batalla de Pavón) to differentiate it visually from Card A. Candidate: Wikimedia search for "Batalla de Pavón" or "Acuerdo San Nicolás Alberdi".

## Files Created/Modified

- `index.html` — Added `#rev-alberdi-mitre` sub-period block (4 cards) and 8th sub-nav link
- `.gsd/milestones/M016/slices/S02/S02-PLAN.md` — Added `## Observability / Diagnostics` section (pre-flight gap fix)

## Forward Intelligence

### What the next slice should know
- M016 is fully complete — both S01 (research/draft) and S02 (HTML integration) are done. The `#rev-alberdi-mitre` sub-period is live in `index.html` and the site renders correctly.
- The sub-nav in `#periodo-revolucion` now has 8 links. Any future slice adding a 9th sub-period must verify the sub-nav doesn't overflow its container on mobile. At 8 links, it still fits within the sticky bar.
- The `card-nota-historiografica` paragraph pattern (visible, non-collapsible) is now used in two places: M004 Conquista del Desierto (Card 3 of `#periodo-nacional`) and M016 Card C of `#rev-alberdi-mitre`. This is the established pattern — do not make it collapsible.

### What's fragile
- Cards A and B share the same fallback image URL — if a future task targets Card B specifically by image, it will also affect Card A. Distinguish them before any image-related work.
- Card D SVG inline placeholder: the `data:` URI scheme causes the app's fallback handler to log a warning on every page load. If the fallback handler is ever updated to treat `data:` URIs differently, Card D's placeholder behavior may change.

### Authoritative diagnostics
- `grep -c "rev-alberdi-mitre" index.html` — fastest sanity check; must return ≥2
- Browser DevTools console: `[SubNav] Initialized with 8 sub-periods, 8 links` — confirms the link is registered; `[SubNav] Active sub-period → rev-alberdi-mitre` — confirms scroll detection works
- `node -e "new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK')"` — JS parse check after any app.js edit

### What assumptions changed
- Assumed 3 of the 4 specific Wikimedia images would be available — all 3 (Cards B, C, D) were MISSING per the Commons API. The fallback path worked as designed, but the section visually uses only 2 distinct images (Mitre portrait and Alberdi portrait) instead of 4.
