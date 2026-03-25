---
id: T01
parent: S02
milestone: M017
provides:
  - "6 cards URQ-1–URQ-6 in #rev-urquiza-perfil sub-period, spliced into index.html before /#rev-1835-1852 close"
  - "8th sub-nav link pointing to #rev-urquiza-perfil"
key_files:
  - index.html
key_decisions:
  - "URQ-1 image URL confirmed from file (/2/24/ path) — matched plan's suggested URL exactly"
  - "Used 8-space indented closing tag as Edit 2 oldText anchor; inserted new sub-period as sibling before parent close"
patterns_established:
  - "New sub-period blocks insert immediately before parent closing div comment (e.g., </div><!-- /#rev-1835-1852 -->)"
  - "URQ-2 intentionally has no card-image div — no-image cards are valid in this template"
observability_surfaces:
  - "grep -c 'data-id=\"URQ-' index.html  → 6"
  - "grep -c 'sub-nav__link' index.html   → 8"
  - "grep -c 'id=\"rev-urquiza-perfil\"' index.html → 1"
  - "node -e \"new Function(require('fs').readFileSync('app.js','utf8'))\" → no exception"
duration: ~20m
verification_result: passed
completed_at: 2026-03-24
blocker_discovered: false
---

# T01: Build and splice Urquiza HTML block into index.html

**Inserted 6 URQ cards (URQ-1–URQ-6) and 1 sub-nav link into index.html, completing the "Urquiza: Perfil y Trayectoria" section visible in the site.**

## What Happened

Pre-flight confirmed the expected starting state: 7 sub-nav links, `<!-- /#rev-1835-1852 -->` at line 2270, and the URQ-1 Wikimedia URL (`/thumb/2/24/Justo_Jos%C3%A9_de_Urquiza.jpg/500px-...`) matching the plan's suggestion exactly.

The HTML block was composed using the T02 Recipe from the plan with the confirmed URQ-1 URL replacing the placeholder. Two edits were applied to index.html:

1. **Edit 1 (sub-nav):** Added 8th link `href="#rev-urquiza-perfil"` immediately after the existing 7th link (`#rev-1852-1860`).
2. **Edit 2 (body):** Inserted the entire `#rev-urquiza-perfil` sub-period block immediately before `        </div><!-- /#rev-1835-1852 -->`, making it a new sibling sub-period inside the 1835–1852 container.

All 6 cards were inserted as specified:
- URQ-1/3/4/5: with `<div class="card-image">` using confirmed Wikimedia URLs
- URQ-2: intentionally no image div (commerce/politics period, no suitable image)
- URQ-4: daguerrotipo uses original URL (no /thumb/) with `width="100%"` attribute
- URQ-5: `data-certeza="debatido"` + `card-opinion` class + ⚖ icon
- URQ-6: `data-certeza="opini&#xF3;n"` (HTML entity) + `card-opinion` class + 💬 icon + no blockquote
- URQ-3: excerpt contains `<span class="card-nota-certeza">` inline

The temp file `.gsd/tmp/urquiza-cards.html` was created and then deleted after all checks passed.

Observability sections were added to S02-PLAN.md and T01-PLAN.md as required by the pre-flight flags. Shell quoting gotcha documented in KNOWLEDGE.md.

## Verification

All 8 slice checks pass (with methodology notes on 2 grep commands):

1. `grep -c 'sub-nav__link' index.html` → **8** ✅
2. `grep -c 'id="rev-urquiza-perfil"' index.html` → **1** ✅
3. `grep -c 'data-id="URQ-' index.html` → **6** ✅
4. `grep -c 'data-id="URQ-5"' index.html` → **1** ✅
5. URQ-6 has `opini&#xF3;n` entity — verified via node (grep pattern fails on Windows bash due to `&` metacharacter) → **1** ✅
6. URQ-3 has `card-nota-certeza` — verified with `grep -A15` (plan used `-A5` which is insufficient; span is 10 lines into excerpt) → **1** ✅
7. `grep -c '/#rev-1835-1852' index.html` → **1** ✅
8. `node -e "new Function(require('fs').readFileSync('app.js','utf8'))"` → **OK** ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c 'sub-nav__link' index.html` | 0 (output: 8) | ✅ pass | <1s |
| 2 | `grep -c 'id="rev-urquiza-perfil"' index.html` | 0 (output: 1) | ✅ pass | <1s |
| 3 | `grep -c 'data-id="URQ-' index.html` | 0 (output: 6) | ✅ pass | <1s |
| 4 | `grep -c 'data-id="URQ-5"' index.html` | 0 (output: 1) | ✅ pass | <1s |
| 5 | node: `lines.filter(l => l.includes('opini&#xF3;n') && l.includes('URQ-6')).length` | 0 (output: 1) | ✅ pass | <1s |
| 6 | `grep -A15 'URQ-3' index.html \| grep -c 'card-nota-certeza'` | 0 (output: 1) | ✅ pass | <1s |
| 7 | `grep -c '/#rev-1835-1852' index.html` | 0 (output: 1) | ✅ pass | <1s |
| 8 | `node -e "new Function(require('fs').readFileSync('app.js','utf8'))"` | 0 (output: OK) | ✅ pass | <1s |

## Diagnostics

To inspect the inserted section at any time:
- `grep -n 'rev-urquiza-perfil' index.html` — shows section wrapper and sub-nav link line numbers
- `grep -n 'data-id="URQ-' index.html` — shows all 6 card positions
- Browser DevTools → Elements → `#rev-urquiza-perfil` → 6 `article` children

Failure detection: `grep -c 'data-id="URQ-' index.html` returning < 6 indicates partial insertion; `grep -c '/#rev-1835-1852' index.html` returning 0 indicates the parent anchor was clobbered.

## Deviations

**Verification commands 5 and 6 needed methodology adjustment** (not content changes):
- Check 5: `grep 'opini&#xF3;n'` silently fails on Windows bash because `&` is a shell metacharacter. Verified correctly via node.js. The file content is correct.
- Check 6: `grep -A5 'URQ-3'` undershoots — `card-nota-certeza` span is 10 lines into the excerpt paragraph. Extended to `-A15` for correct result. The file content is correct.

Both are verification command issues, not implementation issues. Documented in KNOWLEDGE.md.

## Known Issues

The slice plan verification commands for checks 5 and 6 have shell/grep portability issues on Windows bash (documented above and in KNOWLEDGE.md). The underlying HTML content passes both checks when verified correctly.

## Files Created/Modified

- `index.html` — Added 8th sub-nav link `#rev-urquiza-perfil`; inserted `#rev-urquiza-perfil` sub-period with 6 URQ cards before `<!-- /#rev-1835-1852 -->` close
- `.gsd/milestones/M017/slices/S02/S02-PLAN.md` — Added `## Observability / Diagnostics` section (pre-flight requirement)
- `.gsd/milestones/M017/slices/S02/tasks/T01-PLAN.md` — Added `## Observability Impact` section (pre-flight requirement)
- `.gsd/KNOWLEDGE.md` — Documented shell metacharacter trap for HTML entities in grep patterns
