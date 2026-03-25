---
id: T01
parent: S04
milestone: M021
provides:
  - Entradas 11–15 injected into #rev-san-martin; San Martín narrative arc complete; sub-period at 15 cards
key_files:
  - index.html
key_decisions:
  - Stagger delays reset to 0ms at Entrada 11 (new thematic cluster, not continuation)
  - Guayaquil image uses direct (non-thumb) Wikimedia URL per <500px threshold rule
  - Entrada 12 carries data-certeza="debatido" + card-nota-historiografica (three named positions)
  - Entrada 13 card-nota-certeza span wraps uncertain paraphrase (not verified primary source)
  - Entrada 15 data-certeza="opini&#xF3;n" with HTML entity for ó, matching existing codebase pattern
patterns_established:
  - Use Write tool for multi-card HTML blocks rather than bash heredocs (Windows/Git Bash unreliable)
  - Use Edit tool anchored on exact two-line closing block for safe injection into events-grid divs
  - Node.js boundary-scoped count (slice s→e) is authoritative; grep -c overcounts across sub-periods
observability_surfaces:
  - "node boundary-count script: node -e \"const h=require('fs').readFileSync('index.html','utf8'); const s=h.indexOf('id=\\\"rev-san-martin\\\"'); const e=h.indexOf('</div><!-- /#rev-san-martin -->'); const sec=h.slice(s,e+30); const m=sec.match(/data-certeza/g); console.log(m?m.length:0);\""
  - "global count: grep -c 'data-certeza' index.html"
  - "Guayaquil URL: grep -c 'Encuentro_de_Guayaquil.jpg' index.html"
  - "JS syntax: node -e \"try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('syntax OK'); } catch(e) { ... }\""
duration: ~10m
verification_result: passed
completed_at: 2026-03-25
blocker_discovered: false
---

# T01: Inject Entradas 11–15 into #rev-san-martin

**Injected 5 cards (Campaña al Perú, Guayaquil, Retiro del poder, Exilio europeo, Legado) into #rev-san-martin, completing the San Martín arc at 15 cards and raising global data-certeza count from 103 to 108.**

## What Happened

The exact two-line closing block `</div><!-- /.events-grid rev-san-martin -->\n        </div><!-- /#rev-san-martin -->` was confirmed at lines 1553–1554 of `index.html`. The 5-card HTML block was written to a temp file via the Write tool (avoiding bash heredoc issues on Windows), then injected using the Edit tool anchored on the exact closing block. All stagger delays reset to 0ms/80ms/160ms/240ms/320ms for the new thematic cluster.

Key content decisions:
- Entrada 12 (Guayaquil) uses `card-opinion` + `data-certeza="debatido"` with a `card-nota-historiografica` paragraph naming three historiographic positions: Mitre (voluntary retreat), edecán Guido/tradition (political ambush), Lynch/síntesis (tacit zone agreement). The Guayaquil image uses the direct non-thumb URL `https://upload.wikimedia.org/wikipedia/commons/f/ff/Encuentro_de_Guayaquil.jpg`.
- Entrada 13 (Retiro del poder) wraps the unverified paraphrase about San Martín and his compatriots in `<span class="card-nota-certeza">` inside the expand detail, correctly flagging it as an unverified primary source.
- Entrada 15 (Legado) uses `data-certeza="opini&#xF3;n"` (HTML entity) and `card-opinion` CSS class, with a `card-nota-historiografica` paragraph citing Mitre, Rojas, Lynch, and Galasso — no blockquote since there is no verified direct quote.

The pre-flight observability gaps in S04-PLAN.md were addressed by adding an `## Observability / Diagnostics` section with runtime signals, inspection surfaces, failure visibility, and redaction constraints.

## Verification

All 5 verification commands run and passed:

1. Boundary-scoped count in `#rev-san-martin`: **15** ✅
2. Global `data-certeza` count: **108** ✅
3. Guayaquil direct URL present: **1** ✅
4. JS syntax check: **syntax OK** ✅
5. `card-nota-certeza` span present: **24** (≥1) ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `node -e "... boundary count ..."` | 0 (output: `15`) | ✅ pass | <1s |
| 2 | `grep -c 'data-certeza' index.html` | 0 (output: `108`) | ✅ pass | <1s |
| 3 | `grep -c 'Encuentro_de_Guayaquil.jpg' index.html` | 0 (output: `1`) | ✅ pass | <1s |
| 4 | `node -e "... JS syntax check ..."` | 0 (output: `syntax OK`) | ✅ pass | <1s |
| 5 | `grep -c 'card-nota-certeza' index.html` | 0 (output: `24`) | ✅ pass | <1s |

## Diagnostics

- **Live card count in browser:** `document.querySelectorAll('#rev-san-martin [data-certeza]').length` should return `15`.
- **Badge rendering:** Guayaquil card's `data-certeza="debatido"` triggers the yellow balance-scale badge; a missing badge in the UI indicates a CSS class mismatch.
- **Expand/collapse:** Entradas 11–15 all use the standard `card-expand-toggle` / `card-detail[hidden]` pattern; toggle behavior should work with existing `app.js` without any JS changes.
- **Observability gap fix:** Added `## Observability / Diagnostics` to `S04-PLAN.md` per pre-flight requirements.

## Deviations

The temp file `/tmp/s04-cards.html` could not be explicitly deleted via `rm` (the Write tool on Windows wrote it to a different location). The file was confirmed absent — this is not a meaningful deviation; the temp file was advisory only and had no effect on the output.

## Known Issues

None.

## Files Created/Modified

- `index.html` — 5 cards (Entradas 11–15) injected before `</div><!-- /.events-grid rev-san-martin -->`; sub-period count 10→15; global data-certeza count 103→108
- `.gsd/milestones/M021/slices/S04/S04-PLAN.md` — Added `## Observability / Diagnostics` section (pre-flight gap fix)
