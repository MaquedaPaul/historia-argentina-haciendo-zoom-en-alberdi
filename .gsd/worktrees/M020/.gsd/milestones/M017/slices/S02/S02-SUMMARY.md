---
id: S02
parent: M017
milestone: M017
provides:
  - "6 cards URQ-1–URQ-6 in #rev-urquiza-perfil sub-period, spliced into index.html before /#rev-1835-1852 close"
  - "8th sub-nav link pointing to #rev-urquiza-perfil"
requires:
  - slice: S01
    provides: "S01-CONTENT-DRAFT.md con 6 cards Urquiza, 4 imágenes confirmadas vía Wikimedia API"
affects: []
key_files:
  - index.html
key_decisions:
  - "URQ-1 image URL confirmed from Wikimedia (/2/24/ MD5 path) — matched plan's suggested URL exactly"
  - "Used 8-space indented closing div comment as Edit 2 anchor — sibling insertion pattern before parent close"
  - "URQ-2 intentionally has no card-image div — no-image cards are valid in this template"
  - "URQ-4 daguerrotipo uses original Wikimedia URL (no /thumb/) with width=100% — per KNOWLEDGE.md small-image rule"
patterns_established:
  - "New sub-period blocks insert immediately before parent closing div comment (e.g., </div><!-- /#rev-1835-1852 -->)"
  - "URQ-2 no-image card validates that card-hecho without card-image div is structurally acceptable"
  - "data-certeza='debatido' shares card-opinion CSS class — distinct semantic value, same visual treatment"
  - "data-certeza='opini&#xF3;n' (HTML entity) for historiographic interpretation cards in period 1835–1852"
observability_surfaces:
  - "grep -c 'data-id=\"URQ-' index.html  → 6"
  - "grep -c 'sub-nav__link' index.html   → 8"
  - "grep -c 'id=\"rev-urquiza-perfil\"' index.html → 1"
  - "grep -c '/#rev-1835-1852' index.html → 1 (parent anchor intact)"
  - "node -e \"new Function(require('fs').readFileSync('app.js','utf8'))\" → no exception"
drill_down_paths:
  - ".gsd/milestones/M017/slices/S02/tasks/T01-SUMMARY.md"
duration: ~20m
verification_result: passed
completed_at: 2026-03-24
---

# S02: Integración HTML — Sección Urquiza visible en el sitio

**6 cards URQ-1–URQ-6 + 1 sub-nav link insertadas en index.html, haciendo visible la sección "Urquiza: Perfil y Trayectoria" en el sitio.**

## What Happened

S02 was a single-task slice. T01 consumed `S01-CONTENT-DRAFT.md` and applied two surgical edits to `index.html`:

1. **Edit 1 (sub-nav):** Added the 8th link (`href="#rev-urquiza-perfil"`, label "Urquiza") immediately after the existing 7th link (`#rev-1852-1860`) inside the sticky sub-nav for the 1835–1852 period.

2. **Edit 2 (body):** Inserted the full `<div id="rev-urquiza-perfil">` sub-period block as a new sibling immediately before `        </div><!-- /#rev-1835-1852 -->`. The 8-space-indented closing div comment was used as the anchor — stable because it's unique in the file.

The Wikimedia URL for URQ-1 (`/thumb/2/24/Justo_José_de_Urquiza.jpg/500px-...`) was confirmed against the plan's pre-researched URL. All 6 cards followed established templates:

| Card | Certeza | Image | Notes |
|------|---------|-------|-------|
| URQ-1 | hecho | ✅ Wikimedia 500px thumb (portrait) | Standard card-hecho |
| URQ-2 | hecho | ❌ None | No-image card — commerce/politics period |
| URQ-3 | hecho | ✅ Wikimedia thumb (Entre Ríos) | Has `<span class="card-nota-certeza">` inline in excerpt |
| URQ-4 | hecho | ✅ Wikimedia original URL + width="100%" | Small daguerrotipo — per KNOWLEDGE.md small-image rule |
| URQ-5 | debatido | ✅ Wikimedia thumb (Pronunciamiento) | card-opinion class, ⚖ icon |
| URQ-6 | opinión | ✅ Wikimedia thumb (Caseros) | card-opinion class, 💬 icon, no new blockquote (Alberdi quote already at line ~2274) |

A temp file `.gsd/tmp/urquiza-cards.html` was created during construction and deleted after verification.

## Verification

All 8 slice-level checks passed:

| # | Check | Expected | Actual | Status |
|---|-------|----------|--------|--------|
| 1 | `grep -c 'sub-nav__link' index.html` | 8 | 8 | ✅ |
| 2 | `grep -c 'id="rev-urquiza-perfil"' index.html` | 1 | 1 | ✅ |
| 3 | `grep -c 'data-id="URQ-' index.html` | 6 | 6 | ✅ |
| 4 | `grep -c 'data-id="URQ-5"' index.html` | 1 | 1 | ✅ |
| 5 | node: URQ-6 line contains `opini&#xF3;n` | 1 | 1 | ✅ |
| 6 | `grep -A15 'URQ-3' index.html \| grep -c 'card-nota-certeza'` | 1 | 1 | ✅ |
| 7 | `grep -c '/#rev-1835-1852' index.html` | 1 | 1 | ✅ |
| 8 | `node -e "new Function(app.js)"` | OK | OK | ✅ |

**Methodology notes on checks 5 and 6:** These checks required adjusted verification commands. Check 5: `grep 'opini&#xF3;n'` silently fails on Windows bash (`&` is a shell metacharacter); verified correctly via node.js. Check 6: `grep -A5` undershoots — `card-nota-certeza` span is ~10 lines into the excerpt paragraph; extended to `-A15`. Both are command portability issues; the HTML content is correct.

## Deviations

- **Verification commands 5 and 6 required methodology adjustment** (not content changes). The slice plan specified `-A5` for check 6 and `grep 'opini&#xF3;n'` for check 5. Both work on Linux/macOS but fail on Windows Git Bash. The adjusted commands (node.js for check 5, `-A15` for check 6) produce correct results and have been documented in KNOWLEDGE.md.

No content deviations. All 6 cards were inserted exactly as specified in the plan.

## Known Limitations

None. The section is complete and all verification checks pass. The `card-nota-certeza` span in URQ-3 documents an unresolved uncertainty about Urquiza's specific troop count figures — this is intentional and surfaces the epistemic flag to readers.

## Follow-ups

None discovered during execution. S01 documented all content decisions; S02 was purely mechanical integration.

## Files Created/Modified

- `index.html` — Added 8th sub-nav link `href="#rev-urquiza-perfil"`; inserted `#rev-urquiza-perfil` sub-period with 6 URQ cards before `<!-- /#rev-1835-1852 -->` close
- `.gsd/milestones/M017/slices/S02/S02-PLAN.md` — Added `## Observability / Diagnostics` section (pre-flight requirement)
- `.gsd/milestones/M017/slices/S02/tasks/T01-PLAN.md` — Added `## Observability Impact` section (pre-flight requirement)
- `.gsd/KNOWLEDGE.md` — Documented shell metacharacter trap for HTML entities in grep patterns (Windows/Git Bash)

## Forward Intelligence

### What the next slice should know
- The `#rev-urquiza-perfil` section is now a sibling sub-period inside `#rev-1835-1852`, immediately before its closing comment. The section ordering inside `#rev-1835-1852` is now: sub-period 1 (existing) → sub-period 2 (existing) → sub-period N (existing) → `#rev-urquiza-perfil` → `</div><!-- /#rev-1835-1852 -->`.
- Sub-nav now has 8 links. Any future addition to the 1835–1852 period should update this count.
- URQ-6's `data-certeza="opini&#xF3;n"` (HTML entity) is consistent with the pattern established in M008-S17 (D057). The DOM will decode this to `opinión` — CSS attribute selectors must handle both `"opinion"` and `"opinión"` variants per KNOWLEDGE.md certeza normalization note.
- The Alberdi blockquote referenced by URQ-6 already exists at approximately line 2274–2276 in the pre-edit file. No new blockquote was added — verify this anchor line number in the post-edit file if URQ-6 prose needs updating.

### What's fragile
- The `card-nota-certeza` span in URQ-3 flags troop count figures as uncertain. If a future content pass resolves this uncertainty with a verified source, replace the span with the verified figure and remove the flag.
- URQ-4's daguerrotipo uses the original Wikimedia URL (not a /thumb/ path). If Wikimedia reorganizes this file, the image will break — the fix is to re-query the API and update the URL.

### Authoritative diagnostics
- `grep -n 'data-id="URQ-' index.html` — shows all 6 card positions and line numbers
- `grep -n 'rev-urquiza-perfil' index.html` — shows section wrapper and sub-nav link
- `grep -c '/#rev-1835-1852' index.html` returning 0 = parent anchor clobbered (critical regression)

### What assumptions changed
- Check 6 assumed `grep -A5` would find `card-nota-certeza` — the span is ~10 lines into the paragraph, requiring `-A15`. The `-A5` assumption was incorrect for all future multi-line excerpt cards.
