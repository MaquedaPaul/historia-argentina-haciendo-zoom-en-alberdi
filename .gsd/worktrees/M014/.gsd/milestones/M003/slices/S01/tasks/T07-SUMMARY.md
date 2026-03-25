---
id: T07
parent: S01
milestone: M003
provides:
  - "#periodo-revolucion section rewritten with 4 sub-period groups, 20 verified event cards, and 3 Alberdi connecting blockquotes integrated into index.html"
  - "Sub-period CSS (.sub-period, .sub-period__title) added to styles.css (~60 lines)"
key_files:
  - index.html
  - styles.css
key_decisions:
  - "Used 20 cards (all 4 SP events) rather than the plan's 19 — all 5 SP4 events integrated cleanly; no event was absorbed into the connecting narrative"
  - "The existing period-intro .alberdi-quote ('Gobernar es poblar') was retained, giving 4 total .alberdi-quote elements in #periodo-revolucion (slice check requires >=3)"
  - "SP3-5, SP4-2, SP4-3, SP4-5 use original-size images without /thumb/ path per T06 guidance; width='100%' set on those img tags"
  - "SP4-3 (CC BY 2.5) and SP4-4 (CC BY-SA 4.0) attribution included inline in card excerpt text"
patterns_established:
  - "Sub-period structure: .sub-period[id] > .sub-period__title + .events-grid.events-grid--certeza — each group resets --reveal-delay to 0ms and staggers 80ms per card"
  - ".sub-period__title uses ::before pseudo-element for decorative left accent bar (4px, var(--color-celeste))"
  - "Alberdi connecting blockquotes placed between sub-period wrappers (not inside them)"
observability_surfaces:
  - "[Reveal] Initialized with 45 elements — confirmed after integration"
  - "[Images] Fallback handlers set for 26 card images — auto-discovered all 20 new .card-image img elements"
  - "All 4 div#rev-* sub-period wrappers fire Revealed: log entries on scroll"
  - "Diagnostic: document.querySelectorAll('#periodo-revolucion [data-certeza]').length → 20"
  - "Diagnostic: document.querySelectorAll('#periodo-revolucion .img-error, #periodo-revolucion .img-fallback').length → 0"
duration: ~90min
verification_result: passed
completed_at: 2026-03-19
blocker_discovered: false
---

# T07: Integrate all cards into index.html with sub-period structure

**Replaced 3 placeholder cards in #periodo-revolucion with 20 verified event cards in 4 sub-period groups with Alberdi connecting narratives, Wikimedia images, and sub-period CSS — all slice verification checks pass.**

## What Happened

Read S01-CONTENT-DRAFT.md (all 20 events + T05 connecting narratives + T06 image URLs), read the colonial section for exact card template structure, then built the replacement HTML.

**HTML replacement:** Removed the 3-card placeholder grid and replaced it with the full sub-period structure:
- `#rev-1800-1820` (SP1): 5 hecho cards
- Alberdi connecting quote (Salón Literario, 1837)
- `#rev-1820-1835` (SP2): 4 cards (3 hecho, 1 opinión)
- Alberdi connecting quote (*Mi vida privada*)
- `#rev-1835-1852` (SP3): 6 cards (3 hecho, 2 opinión, 1 rumor)
- Alberdi connecting quote (*Bases* dedicatoria, 1852)
- `#rev-1852-1860` (SP4): 5 cards (3 hecho, 2 opinión)

**CSS addition (~60 lines):** `.sub-period`, `.sub-period__title` (with ::before accent bar), `.sub-period + .alberdi-quote` separator, responsive overrides.

All 20 cards use verified Wikimedia URLs from T06. `--reveal-delay` resets to 0ms per sub-period group, staggers 80ms per card.

## Verification

All slice verification DOM queries confirmed in browser:

| Check | Required | Actual | Result |
|-------|----------|--------|--------|
| `[data-certeza]` count | ≥ 15 | 20 | ✅ pass |
| `[data-certeza="hecho"]` | ≥ 10 | 14 | ✅ pass |
| `[data-certeza="opinion"]` | ≥ 4 | 5 | ✅ pass |
| `[data-certeza="rumor"]` | ≥ 1 | 1 | ✅ pass |
| `.sub-period` count | === 4 | 4 | ✅ pass |
| `.card-image img` count | ≥ 14 | 20 | ✅ pass |
| `cite` count | ≥ 10 | 23 | ✅ pass |
| `.alberdi-quote` count | ≥ 3 | 4 | ✅ pass |
| `.img-error/.img-fallback` | === 0 | 0 | ✅ pass |

Visual: green/blue/amber certeza indicators correct. Images load. Stagger reveal fires on scroll.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `document.querySelectorAll('#periodo-revolucion [data-certeza]').length` (browser eval → 20) | — | ✅ pass | <1s |
| 2 | `hecho count >= 10` (→ 14) | — | ✅ pass | <1s |
| 3 | `opinion count >= 4` (→ 5) | — | ✅ pass | <1s |
| 4 | `rumor count >= 1` (→ 1) | — | ✅ pass | <1s |
| 5 | `.sub-period count === 4` | — | ✅ pass | <1s |
| 6 | `.card-image img count >= 14` (→ 20) | — | ✅ pass | <1s |
| 7 | `cite count >= 10` (→ 23) | — | ✅ pass | <1s |
| 8 | `.alberdi-quote count >= 3` (→ 4) | — | ✅ pass | <1s |
| 9 | `.img-error/.img-fallback === 0` | — | ✅ pass | <1s |
| 10 | Console: `[Reveal] Initialized with 45 elements` | — | ✅ pass | <1s |
| 11 | Console: `[Images] Fallback handlers set for 26 card images` | — | ✅ pass | <1s |
| 12 | Visual screenshot: certeza indicators green/blue/amber correct | — | ✅ pass | screenshot |

## Diagnostics

- **Card inventory:** `document.querySelectorAll('#periodo-revolucion [data-certeza]')` → 20
- **Image load status:** `Array.from(document.querySelectorAll('#periodo-revolucion .card-image img')).map(img => ({src: img.src.split('/').pop(), loaded: img.complete && img.naturalWidth > 0}))`
- **Sub-period structure:** `Array.from(document.querySelectorAll('#periodo-revolucion .sub-period')).map(el => ({id: el.id, cards: el.querySelectorAll('[data-certeza]').length}))`
- **Broken images:** `document.querySelectorAll('#periodo-revolucion .img-error, #periodo-revolucion .img-fallback').length` → 0

## Deviations

- **20 cards instead of 19:** All 5 SP4 events integrated cleanly; no absorption needed. 20 cards exceeds the ≥15 minimum.
- **4 .alberdi-quote instead of 3:** Pre-existing period-intro quote preserved; 3 new connectors added. Total 4 passes the ≥3 check.

## Known Issues

None. All images load from Wikimedia. No broken image fallbacks active.

## Files Created/Modified

- `index.html` — `#periodo-revolucion` rewritten: 3 placeholder cards → 4 sub-period groups, 20 cards, 3 Alberdi connectors, 20 Wikimedia image URLs (~750 new lines replacing ~90 placeholder lines)
- `styles.css` — ~60 new lines for `.sub-period` and `.sub-period__title` styling appended at end of file
