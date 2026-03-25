---
id: M016
provides:
  - Sub-period #rev-alberdi-mitre with 4 verified history cards (3 hecho, 1 opinión) in index.html
  - 8th sub-nav link inside #periodo-revolucion wired to #rev-alberdi-mitre
  - S01-CONTENT-DRAFT.md with HTML-ready card drafts and 8 academic citations
key_decisions:
  - Wikimedia images for Cards B, C, D were MISSING per API; fallbacks applied: Cards A+B share Mitre retrato general, Card C uses Alberdi SP4-1 portrait, Card D uses inline SVG placeholder (D073)
  - card-nota-historiografica placed directly inside <article> (not collapsible) for the historiographic debate on Alberdi's constitutional legacy — established pattern from M004
  - Banned-phrase checklists in content drafts must use abbreviated references, not literal banned phrases, to avoid false-positive grep failures in slice verification
patterns_established:
  - Stagger delays 0/80/160/240ms for 4 cards in a new sub-period
  - Sub-period wrapper: class="sub-period reveal reveal-fade"; grid: class="events-grid events-grid--certeza"
  - card-opinion inner structure: card-opinion__quote > blockquote + footer.card-opinion__attribution > card-opinion__author + card-opinion__context
  - data-certeza="opini&#xF3;n" (HTML entity, with accent) on card-opinion articles — both accent variants in use across codebase
  - card-nota-historiografica: visible paragraph inside <article> after excerpt, never collapsible — for meta-epistemic notices on contested-history cards
observability_surfaces:
  - "grep -c 'rev-alberdi-mitre' index.html → 3 (≥2 = pass)"
  - "node -e \"new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK')\" → syntax OK"
  - "Browser DevTools: [SubNav] Initialized with 8 sub-periods, 8 links"
requirement_outcomes:
  - id: R001
    from_status: active
    to_status: active
    proof: M016 adds content to an existing section — no architecture change; page continues to load and navigate correctly
  - id: R002
    from_status: validated
    to_status: validated
    proof: M016 adds content to #periodo-revolucion (R003 scope), not the colonial section; R002 remains validated from M002
  - id: R012
    from_status: validated
    to_status: validated
    proof: 4 <cite> elements in new block; S01-RESEARCH.md documents source verification; no fabricated direct quotes — Card D blockquote explicitly marked as Mayer 1963 paraphrase
  - id: R013
    from_status: validated
    to_status: validated
    proof: All 4 new cards have data-certeza; distribution hecho×3 + opinión×1; events-grid--certeza class present on grid container
duration: ~50min (S01 ~30min + S02 ~20min)
verification_result: passed
completed_at: 2026-03-24
---

# M016: Alberdi y Mitre — Dos Proyectos de País

**Sub-period `#rev-alberdi-mitre` with 4 verified history cards (3 hecho, 1 opinión) integrated into `index.html`, covering the Alberdi–Mitre arc from their 1848 Valparaíso collaboration through the 1862 decree that left Alberdi without a post in Paris — all slice verification checks pass, sub-nav registers 8 links, and zero new JS errors.**

## What Happened

M016 executed in two slices with a clean handoff between research and integration.

**S01 (investigación y borrador)** produced `S01-CONTENT-DRAFT.md` with 4 HTML-ready cards covering the complete narrative arc: Card A (1848 — Mitre as Alberdi's secretary at *El Comercio de Valparaíso*, the antirrosista alliance); Card B (1852 — *Los Debates* founded and the post-Caseros split into two competing national projects); Card C (1853/1861-62 — the 1853 Constitution as Alberdi's intellectual legacy and political defeat, including a `card-nota-historiografica` for the historiographic debate on Urquiza's retreat at Pavón); Card D (1864 — the Alberdi vs. Mitre polemic over *Historia de Belgrano*, marked as `data-certeza="opinión"` with a Mayer 1963 paraphrase blockquote). S01 verified 8 academic citations, confirmed exact banned phrases from BIOG-13 and SP4-3 for non-duplication checking, and established the insertion point (`id="rev-alberdi-mitre"`, confirmed free at that date).

**S02 (integración HTML)** inserted a 87-line sub-period block into `index.html` between `</div><!-- /#rev-1852-1860 -->` and `<!-- REVOLUCION TIMELINE:`. Before inserting, the executor verified Wikimedia image URLs for Cards B, C, D via the Commons API — all three specific images were MISSING. Fallbacks were applied per the pre-flight plan: Cards A and B share the confirmed Mitre retrato general URL; Card C uses the confirmed Alberdi SP4-1 portrait; Card D uses an inline SVG placeholder. The 8th sub-nav link (`<a href="#rev-alberdi-mitre">`) was added at line 334. Browser verification confirmed: 8 sub-nav links initialized, scroll detection active (`[SubNav] Active sub-period → rev-alberdi-mitre`), all 4 cards rendering with correct certeza badges and cite footers, Card C showing the nota historiográfica, Card D showing the OPINIÓN HISTORIOGRÁFICA badge and blockquote.

One cross-slice lesson captured during S01: checklists that document banned phrases by quoting them literally cause false-positive failures in slice verification greps. The fix — use abbreviated references in checklists, reserve literal phrases for diagnostic grep commands only — is now documented in KNOWLEDGE.md.

## Cross-Slice Verification

**Success criterion 1: Cards documentadas sobre la relación Alberdi-Mitre 1852–1870**
- `grep -c '<article' block` → 4 cards ✅
- Coverage: 1848 (antirrosista alliance) → 1852 (post-Caseros split) → 1853/1861-62 (Constitution + Pavón + cesación) → 1864 (polemic) — arc fully covered ✅

**Success criterion 2: Ninguna afirmación sin fuente o sin certeza marcada**
- `data-certeza` on all 4 `<article>` elements: hecho×3, `opini&#xF3;n`×1 ✅
- `<cite>` elements in block: 4 (≥4 required) ✅
- No fabricated direct quotes; Card D blockquote explicitly a Mayer 1963 paraphrase ✅
- `card-nota-historiografica` present in Card C for historiographic debate ✅

**Success criterion 3: No duplica contenido ya existente en index.html**
- BIOG-13 banned phrase absent from `#rev-alberdi-mitre` block ✅
- SP4-3 banned phrase absent from `#rev-alberdi-mitre` block ✅
- (Both phrases appear in pre-existing cards at lines 661 and 2368 — not introduced by M016)

**Definition of done:**
- [x] S01 complete — S01-SUMMARY.md exists, verification_result: passed
- [x] S02 complete — S02-SUMMARY.md exists, verification_result: passed
- [x] Cards sobre Alberdi-Mitre en index.html — 4 cards in `#rev-alberdi-mitre` ✅
- [x] No duplica contenido existente — banned phrases absent from new block ✅
- [x] Sin errores JS — `new Function(app.js)` → syntax OK ✅

**Cross-slice integration points:**
- S01 `provides: S01-CONTENT-DRAFT.md` → consumed by S02: confirmed (S02-SUMMARY.md references draft; all 4 cards integrated)
- Insertion point `id="rev-alberdi-mitre"` was confirmed free and was used correctly

## Requirement Changes

- R001 (single-page web app): active → active — M016 adds content, not architecture; page integrity maintained
- R002 (sección colonial 1500-1800): validated → validated — unaffected; M016 targets #periodo-revolucion
- R012 (rigor histórico): validated → validated — 4 `<cite>` elements in new block; S01-RESEARCH.md documents source verification protocol; no fabricated quotes
- R013 (sistema de certeza): validated → validated — 4/4 new cards have `data-certeza`; `events-grid--certeza` present; opinión card uses `data-certeza="opini&#xF3;n"` (HTML entity, D053 compliant)

No requirements changed status during M016 — all impacted requirements were already validated and remain validated with the new content conforming to established patterns.

## Forward Intelligence

### What the next milestone should know
- The sub-nav in `#periodo-revolucion` now has 8 links (line 334 area). Any future slice adding a 9th sub-period must verify the sticky sub-nav doesn't overflow on mobile (375px). At 8 links it still fits; 9+ may require a scrollable sub-nav or condensed labels.
- Cards A and B share the same fallback image (Mitre retrato general, line ~2443 and ~2463). A future task targeting Card B's image will also affect Card A visually until a distinct confirmed URL is sourced. Candidate search: Wikimedia "Batalla de Pavón" or "Acuerdo San Nicolás".
- Card D's inline SVG placeholder triggers a `[WARNING] [Images] Failed to load` from the app's `initImageFallbacks` handler (handler also processes `data:` URIs). Cosmetic only — card renders correctly. If `initImageFallbacks` is ever updated to treat `data:` URIs differently, Card D behavior may change.
- The `card-nota-historiografica` visible paragraph pattern is now confirmed in two locations: M004 Conquista del Desierto (Card 3 of `#periodo-nacional`) and M016 Card C of `#rev-alberdi-mitre`. This is the canonical pattern — do not make it collapsible.
- `data-certeza="opini&#xF3;n"` (HTML entity, with accent) is on Card D. CSS verification queries must select both `[data-certeza="opinion"]` and `[data-certeza="opinión"]` to count all opinion cards across the codebase.

### What's fragile
- **Image de-duplication for Cards A+B** — both use the same Mitre portrait URL. Not broken, but visually repetitive. If a future milestone focuses on image quality, Card B is the priority.
- **Card D SVG placeholder** — the `data:` URI scheme is unusual in this codebase (all other cards use `https://` Wikimedia URLs). It works but is an outlier that could confuse future image-sourcing tasks.
- **8-link sub-nav capacity** — verified to fit at current breakpoints. The limit has not been stress-tested at 320px viewport width with 8 links.

### Authoritative diagnostics
- `grep -c "rev-alberdi-mitre" index.html` → must return 3 — fastest sanity check for block presence + sub-nav link
- `node -e "new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK')"` → syntax OK — verify after any app.js edit
- Browser DevTools: `[SubNav] Initialized with 8 sub-periods, 8 links` + `[SubNav] Active sub-period → rev-alberdi-mitre` on scroll-in — confirms the link is registered and IntersectionObserver fires correctly
- `document.querySelectorAll('#rev-alberdi-mitre article').length` → must return 4 in browser console

### What assumptions changed
- **Assumed 3 specific Wikimedia images would be available** (Cards B, C, D) — all 3 were MISSING per the Commons API during S02-T01. The pre-planned fallback path worked correctly, but the section now uses only 2 distinct images instead of 4.
- **Original timeline** estimated coverage to 1870; actual coverage ends at 1864 (the Alberdi–Mitre historiographic polemic). The arc is complete narratively — Alberdi without post in Paris after 1862 is Card C; the 1864 polemic is Card D. The 1865-1870 period (Guerra del Paraguay context) is already in M004 and out of scope.

## Files Created/Modified

- `index.html` — Added `#rev-alberdi-mitre` sub-period block (4 cards, lines 2432–2518) and 8th sub-nav link (line 334)
- `.gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md` — 4 HTML-ready cards with 8 academic citations (created by S01)
- `.gsd/milestones/M016/slices/S01/S01-PLAN.md` — Added `## Observability / Diagnostics` section (pre-flight gap fix)
- `.gsd/milestones/M016/slices/S02/S02-PLAN.md` — Added `## Observability / Diagnostics` section (pre-flight gap fix)
