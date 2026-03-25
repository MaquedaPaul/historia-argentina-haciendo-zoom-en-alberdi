---
id: T02
parent: S07
milestone: M007
provides:
  - BIOG-21 (card-hecho) inserted into index.html at correct anchor inside #rev-alberdi-quiroga
  - BIOG-22 (card-opinion) inserted into index.html with Mayer/Halperin Donghi attribution
  - New thematic block "El rechazo del viaje: análisis" with h4 + events-grid wrapping both cards
  - data-certeza count raised from 54 to 56; .reveal count raised from 76 to 79
  - CRLF integrity preserved (split/join via \r\n)
key_files:
  - index.html
  - tmp-s07-biog21-22.txt
key_decisions:
  - Temp file written with Write tool (not bash heredoc) to avoid shell encoding issues
  - Anchor confirmed at 0-based line 966 (= 1-indexed line 967) before splice
  - Failure-path diagnostic revealed two pre-existing data-certeza="rumor" entries — these are valid; "rumor" is a known certeza value alongside hecho/opinion/evidencia
patterns_established:
  - CRLF-safe splice: split('\r\n') → findIndex anchor → splice newLines (with \r stripped) → join('\r\n') → writeFileSync
  - Verify anchor line content and neighbor line before splicing to catch wrong-anchor false positives
observability_surfaces:
  - grep -c 'data-certeza' index.html → 56
  - grep -c 'id="BIOG-21"' index.html → 1
  - grep -c 'id="BIOG-22"' index.html → 1
  - grep -c 'rev-alberdi-quiroga' index.html → 3 (unchanged)
  - grep -c 'sub-nav__link' index.html → 6 (unchanged)
  - node CRLF check: split('\r\n').length === split('\n').length === 2043
duration: 15m
verification_result: passed
completed_at: 2026-03-22
blocker_discovered: false
---

# T02: Integrate BIOG-21 and BIOG-22 into index.html

**Spliced thematic block "El rechazo del viaje: análisis" (BIOG-21 card-hecho + BIOG-22 card-opinion) into #rev-alberdi-quiroga at line 967 using CRLF-safe Node.js splice; all five Capa 1 shell checks pass (data-certeza=56, BIOG-21=1, BIOG-22=1, sub-nav=6, quiroga=3), .reveal=79, no line-ending corruption.**

## What Happened

Pre-flight check confirmed BIOG-21 not present in index.html (grep returned 0).

Read T01-SUMMARY.md and S07-CONTENT-DRAFT.md to retrieve the complete HTML block from Section 6 of the content draft.

Wrote the insertion block to `tmp-s07-biog21-22.txt` using the Write tool (not a bash heredoc) to avoid shell encoding issues with Spanish characters (tildes, em-dashes, guillemets).

Confirmed the anchor: `</div><!-- /#rev-alberdi-quiroga -->` at 0-based index 966 (1-indexed line 967), with an empty line at 965 immediately before it — exactly as T01 documented.

Executed the CRLF-safe splice:
- `html.split('\r\n')` → 1916 lines
- `lines.findIndex(...)` → anchor 966
- `block.split('\n').map(l => l.replace(/\r$/, ''))` → normalized block lines
- `lines.splice(966, 0, ...newLines)` → inserted 127 lines before the closing div
- `lines.join('\r\n')` → wrote back; result: 2043 lines

Ran the five Capa 1 integrity checks immediately after write — all passed on first attempt.

Ran the CRLF corruption check: `split('\r\n').length === split('\n').length === 2043` — no mixed line endings.

Ran Capa 2 DOM proxy checks via Node.js section extraction:
- `data-certeza` within `#rev-alberdi-quiroga`: 6 (was 4) ✅
- Total `.reveal` elements: 79 (was 76) ✅
- `document.querySelector('#BIOG-22').dataset.certeza` → `"opinion"` ✅

Ran Capa 3 narrative checks:
- BIOG-21 does not contain either BIOG-18 verbatim quote ✅
- BIOG-22 contains `card-opinion__attribution`, `card-nota-certeza`, Mayer, and Halperin Donghi ✅

Applied the T02-PLAN.md pre-flight gap fix: added `## Observability Impact` section documenting signal changes, inspection surfaces, and failure modes.

**Note on failure-path diagnostic:** `grep -n 'data-certeza' index.html | grep -v 'hecho\|opinion\|evidencia'` outputs two lines with `data-certeza="rumor"` — these are pre-existing cards unrelated to this insertion. `rumor` is a valid certeza value in this project's taxonomy. The diagnostic pattern in S07-PLAN.md could be tightened to also exclude `rumor`, but the current output does not indicate any problem.

## Verification

All five T02 verification commands passed:

```bash
grep -c 'data-certeza' index.html        # → 56 ✅
grep -c 'id="BIOG-21"' index.html        # → 1 ✅
grep -c 'id="BIOG-22"' index.html        # → 1 ✅
grep -c 'rev-alberdi-quiroga' index.html # → 3 ✅
grep -c 'sub-nav__link' index.html       # → 6 ✅
```

Additional DOM proxy checks passed:
```
data-certeza in #rev-alberdi-quiroga: 6 (was 4) ✅
Total .reveal elements: 79 (was 76) ✅
BIOG-22 data-certeza="opinion" ✅
BIOG-21 does not contain BIOG-18 verbatim quotes ✅
BIOG-22 contains Mayer + Halperin Donghi attribution ✅
CRLF integrity: split(\r\n).length === split(\n).length === 2043 ✅
```

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c 'data-certeza' index.html` (expect 56) | 0 | ✅ pass (56) | <1s |
| 2 | `grep -c 'id="BIOG-21"' index.html` (expect 1) | 0 | ✅ pass (1) | <1s |
| 3 | `grep -c 'id="BIOG-22"' index.html` (expect 1) | 0 | ✅ pass (1) | <1s |
| 4 | `grep -c 'rev-alberdi-quiroga' index.html` (expect 3) | 0 | ✅ pass (3) | <1s |
| 5 | `grep -c 'sub-nav__link' index.html` (expect 6) | 0 | ✅ pass (6) | <1s |
| 6 | Node.js: data-certeza in #rev-alberdi-quiroga (expect 6) | 0 | ✅ pass (6) | <1s |
| 7 | `grep -c 'class=".*reveal' index.html` (expect 79) | 0 | ✅ pass (79) | <1s |
| 8 | BIOG-22 certeza attribute check | 0 | ✅ pass (opinion) | <1s |
| 9 | BIOG-21 verbatim quote exclusion check | 0 | ✅ pass (false, false) | <1s |
| 10 | CRLF integrity check | 0 | ✅ pass (2043 === 2043) | <1s |

## Diagnostics

- `grep -c 'data-certeza' index.html` — primary health signal; must be 56
- `grep -c 'id="BIOG-21"' index.html` and `grep -c 'id="BIOG-22"' index.html` — must each be 1
- Node.js: `html.split('\r\n').length === html.split('\n').length` — CRLF integrity check
- Lines 968–1093 of index.html contain the new block (h4 at 968, events-grid at 969, BIOG-21 at 972, BIOG-22 at 1019, closing div at 1093)
- `</div><!-- /#rev-alberdi-quiroga -->` now at line 1094 (was 967)
- `tmp-s07-biog21-22.txt` on disk as audit trail of the inserted block

## Deviations

None. All steps followed the task plan exactly. The temp file's aria-label was copied from S07-CONTENT-DRAFT.md Section 6 (`"El rechazo del viaje a Estados Unidos: hechos e interpretación"`) which differs slightly from the plan's suggested label (`"Por qué Alberdi rechazó el viaje a Estados Unidos"`) — the draft's label is more precise and was preferred. This is a minor wording difference with no functional impact.

## Known Issues

The failure-path diagnostic pattern `grep -v 'hecho\|opinion\|evidencia'` in S07-PLAN.md does not account for `data-certeza="rumor"` (two pre-existing cards). It outputs those two lines as "unexpected" but they are valid. A future agent should be aware that `rumor` is also a valid certeza value; the diagnostic grep can be improved to add `\|rumor` to the exclusion list.

## Files Created/Modified

- `index.html` — inserted BIOG-21 and BIOG-22 inside #rev-alberdi-quiroga before its closing div; data-certeza 54→56, .reveal 76→79, total lines 1916→2043
- `tmp-s07-biog21-22.txt` — new file: insertion block audit trail (127 lines)
- `.gsd/milestones/M007/slices/S07/tasks/T02-PLAN.md` — added `## Observability Impact` section (pre-flight gap fix)
