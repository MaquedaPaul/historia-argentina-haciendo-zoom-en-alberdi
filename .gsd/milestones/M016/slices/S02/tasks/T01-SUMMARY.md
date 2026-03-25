---
id: T01
parent: S02
milestone: M016
provides:
  - Sub-period #rev-alberdi-mitre with 4 cards inserted in index.html
  - Sub-nav link to #rev-alberdi-mitre added after #rev-1852-1860
key_files:
  - index.html
key_decisions:
  - All three specific Wikimedia image URLs (Mitre 1852, Batalla de Pavón, Alberdi 1888) returned MISSING via API; used confirmed fallbacks (Mitre retrato general for Cards A+B, Alberdi SP4-1 portrait for Card C, inline SVG placeholder for Card D)
patterns_established:
  - Card structure uses event-card__year + event-card__title directly inside <article>, no card-header/card-body wrappers
  - card-nota-historiografica goes directly inside <article> after the excerpt <p>
  - card-opinion__quote uses nested <footer class="card-opinion__attribution"> with card-opinion__author + card-opinion__context
observability_surfaces:
  - grep -c "rev-alberdi-mitre" index.html (must return ≥2)
  - node verification scripts in S02-PLAN.md § Verification (certeza dist, cite count, nota-historiografica, banned phrases)
  - Browser DevTools SubNav log → "[SubNav] Active sub-period → rev-alberdi-mitre" fires on scroll
  - JS syntax check via new Function(app.js)
duration: ~20m
verification_result: passed
completed_at: 2026-03-24
blocker_discovered: false
---

# T01: Integrar 4 cards en index.html como sub-period #rev-alberdi-mitre

**Inserted sub-period #rev-alberdi-mitre with 4 history cards (3 hecho, 1 opinión) into index.html and wired sub-nav link — all 6 slice verification checks pass, section renders correctly in browser.**

## What Happened

Verified Wikimedia image URLs for Cards B, C, D via the API — all three returned MISSING. Applied fallbacks as specified: Cards A and B use the confirmed Mitre retrato URL, Card C uses the Alberdi SP4-1 portrait URL, Card D uses an inline SVG placeholder.

Inserted the full 126-line sub-period block between `</div><!-- /#rev-1852-1860 -->` and `<!-- REVOLUCION TIMELINE:` using the Edit tool. The block uses the real codebase pattern: `event-card__year` and `event-card__title` directly inside `<article>`, no `card-header`/`card-body` wrappers. Card C's `card-nota-historiografica` is placed directly inside `<article>` after the excerpt `<p>`. Card D's `card-opinion__quote` uses the full `<footer class="card-opinion__attribution">` structure.

Added the 8th sub-nav link `<a href="#rev-alberdi-mitre" ...>1848–1862 Alberdi y Mitre</a>` after the `#rev-1852-1860` link on line 333.

Verified in browser: app.js SubNav log shows `Initialized with 8 sub-periods, 8 links` and `Active sub-period → rev-alberdi-mitre` fires correctly on scroll. All 4 cards render with correct certeza styling, correct year labels, excerpt text, and cite footers. Card C shows `Nota historiográfica:` paragraph. Card D shows `OPINIÓN HISTORIOGRÁFICA` badge and blockquote with Mayer paraphrase.

## Verification

All 6 slice verification checks run and pass:

1. `grep -c "rev-alberdi-mitre" index.html` → **3** (≥2 required)
2. Certeza distribution: **hecho: 3, card-opinion class count: 6** (≥1 required — 6 reflects nested spans + classes)
3. `<cite>` count in block: **4** (≥4 required)
4. `card-nota-historiografica`: **PRESENT**
5. JS syntax: **OK**
6. Banned phrases BIOG-13 + SP4-3: **both absent (OK)**

Browser confirmed: section visible, sub-nav link navigates correctly, reveal animation picks up `div#rev-alberdi-mitre.sub-period`, no JS errors in console (the single pre-existing 404 error is unrelated to this task).

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c "rev-alberdi-mitre" index.html` | 0 | ✅ pass (→3, ≥2) | <1s |
| 2 | node certeza distribution check | 0 | ✅ pass (hecho:3, card-opinion:6) | <1s |
| 3 | node cite count check | 0 | ✅ pass (→4, ≥4) | <1s |
| 4 | node card-nota-historiografica check | 0 | ✅ pass (PRESENT) | <1s |
| 5 | `node -e "new Function(app.js)"` JS syntax | 0 | ✅ pass (syntax OK) | <1s |
| 6 | node banned phrases check (BIOG-13, SP4-3) | 0 | ✅ pass (both absent) | <1s |

## Diagnostics

- **SubNav init log:** `[SubNav] Initialized with 8 sub-periods, 8 links.` — confirms the new link was registered
- **SubNav active log:** `[SubNav] Active sub-period → rev-alberdi-mitre` — confirms scroll detection works
- **Reveal log:** `div#rev-alberdi-mitre.sub-period.reveal--visible` — confirms intersection observer fires
- **Images:** Cards A+B show alt-text fallback (Wikimedia image unavailable in local dev); Card C loads Alberdi portrait; Card D shows SVG placeholder. All handled by the app's existing `[Images] Fallback handlers` system.
- **Pre-existing 404:** One `Failed to load resource: 404` error appears on each page load; was present before this task and is unrelated to M016/S02.

## Deviations

- Cards B, C, D images: the three specific Wikimedia URLs were MISSING per API. Applied fallbacks as specified in T01-PLAN.md (Cards A+B: same Mitre retrato; Card C: Alberdi SP4-1 URL; Card D: inline SVG). This was the expected fallback path documented in the plan.
- S02-PLAN.md updated to add `## Observability / Diagnostics` section (pre-flight gap fix required by task instructions).

## Known Issues

- Cards A and B share the same fallback image URL (Mitre retrato general). A future task could source a distinct confirmed image for Card B. This is cosmetic only — no functional or content issue.
- Card D SVG placeholder shows alt-text via the app's fallback handler. The inline `data:` SVG URI triggers a `[WARNING] [Images] Failed to load` console warning (the app's fallback handler also tries to process it). This is cosmetic; the image area renders with the alt text.

## Files Created/Modified

- `index.html` — Added `#rev-alberdi-mitre` sub-period block (4 cards) between `/#rev-1852-1860` and `REVOLUCION TIMELINE`; added 8th sub-nav link
- `.gsd/milestones/M016/slices/S02/S02-PLAN.md` — Added `## Observability / Diagnostics` section (pre-flight gap fix)
