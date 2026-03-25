---
id: S17
parent: M008
milestone: M008
provides:
  - S17-1 card-opinion "¿Era Rosas un mal necesario?" spliced into #periodo-rosas before append marker
  - card-nota-historiografica with two explicitly attributed positions (Irazusta 1941 revisionista; Halperín Donghi 1972 + Lynch 1981 liberal/síntesis)
  - Scope boundary established: internal-order counterfactual only; bloqueos/sovereignty → S22; general tiranía/caudillo polarity → S14-3
requires:
  - slice: S16
    provides: Repression cards completed; data-certeza count at 79; append marker intact
affects:
  - S18
  - S19
  - S22
key_files:
  - index.html
  - .gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md
  - C:/tmp/s17-cards.html
  - C:/tmp/index.html.bak-s17
key_decisions:
  - data-certeza="opinión" (accented) distinguishes S17-1 from "debatido" used in S14-3/S15-2/S16-3 — semantic distinction per D052
  - certeza-indicator: &#x1F4AC; (💬) with label "Opinión / debate interpretativo" — consistent with existing opinion card pattern pre-S14
  - Two-position nota (revisionista + liberal/síntesis) — Halperín Donghi/Lynch synthesis IS the liberal counter-argument; no third position needed here
  - reveal-fade animation class per S17-PLAN spec — distinct from reveal-slide used in S14-S16 interpretation cards
  - ASCII-only marker substring in Node.js splice — avoids en-dash/Unicode shell encoding failure (per M008-S10 KNOWLEDGE entry)
patterns_established:
  - S17 scope boundary: internal-order counterfactual (1820–1829 chaos baseline) only; bloqueos/sovereignty → S22; do not repeat S14-3's general tiranía/caudillo polarity
  - Two-position nota is correct when contemporary historiography (Halperín Donghi, Lynch) provides the liberal/síntesis counter — no third position required unless the synthesis is substantially distinct from both prior camps
observability_surfaces:
  - grep -c 'data-certeza' index.html → 80 (was 79; +1 confirms splice)
  - grep -c 'data-id="S17-1"' index.html → 1 (card identity)
  - grep -c 'cards will be appended here' index.html → 1 (marker integrity)
  - grep -c 'card-nota-historiografica' index.html → 6 (was 5; +1 confirms nota block)
  - C:/tmp/index.html.bak-s17 — pre-splice recovery backup
  - C:/tmp/s17-cards.html — inspect for entity encoding integrity
drill_down_paths:
  - .gsd/milestones/M008/slices/S17/tasks/T01-SUMMARY.md
  - .gsd/milestones/M008/slices/S17/tasks/T02-SUMMARY.md
duration: 23m (T01: 15m, T02: 8m)
verification_result: passed
completed_at: 2026-03-23
---

# S17: ¿Sin Rosas, Argentina sería un caos?

**One interpretive opinion card "¿Era Rosas un mal necesario?" spliced into #periodo-rosas with a two-position card-nota-historiografica (Irazusta 1941 vs. Halperín Donghi/Lynch); all 8 slice verification checks pass; data-certeza count raised from 79 to 80.**

## What Happened

**T01** authored `S17-CONTENT-DRAFT.md` before any index.html mutation. The research phase confirmed that S17 required a distinct approach from S14-3 and S16-3: those cards used `data-certeza="debatido"` (the contested-fact classification), while S17's question — "was Rosas historically necessary?" — is an interpretive/counterfactual argument, not a factual dispute. The plan correctly called for `data-certeza="opinión"` and `card-opinion` CSS class. Reconnaissance of existing opinion-type cards established that the correct certeza indicator is 💬 (`&#x1F4AC;`) with label "Opinión / debate interpretativo", not ⚖ (which is the debatido icon).

The draft framed the 1820–1829 chaos baseline as the counterfactual anchor (Cepeda 1820, eight governors in one year, Dorrego fusilamiento December 1828), then presented two attributed historiographic positions: (1) Irazusta's revisionista thesis that Rosas was structurally indispensable — no other actor could simultaneously hold estancieros, interior caudillos, and rural popular classes in coalition; (2) Halperín Donghi/Lynch's liberal/síntesis position that historical necessity applied to the 1829–~1845 window but not the final decade — Urquiza achieved the 1853 Constitution in under 18 months post-Caseros, proving the country needed strong authority, not Rosas specifically. The T02 Recipe HTML block encoded all non-ASCII as HTML entities (á→&#xE1;, é→&#xE9;, ó→&#xF3;, etc.) per established Windows-safe pattern.

**T02** executed the mechanical splice: confirmed preconditions (79 data-certeza, marker at 1 occurrence), wrote recovery backup to `C:/tmp/index.html.bak-s17`, wrote entity-encoded snippet to `C:/tmp/s17-cards.html` via Write tool, then ran the Node.js one-liner with ASCII-only marker substring `'cards will be appended here by subsequent slices'`. The splice located the marker line boundary via `lastIndexOf('\n', idx)` and inserted the card immediately before it. All 8 verification checks passed on first attempt.

## Verification

All 8 slice-level verification checks from the plan:

| # | Command | Result | Verdict |
|---|---------|--------|---------|
| 1 | `grep -c 'data-certeza' index.html` | 80 | ✅ pass |
| 2 | `grep -c 'data-id="S17-' index.html` | 1 | ✅ pass |
| 3 | `grep -c 'data-id="S17-1"' index.html` | 1 | ✅ pass |
| 4 | `grep -c 'cards will be appended here' index.html` | 1 | ✅ pass |
| 5 | `git diff --name-only HEAD -- styles.css app.js` | (empty) | ✅ pass |
| 6 | `test -s C:/tmp/index.html.bak-s17 && echo BACKUP_OK` | BACKUP_OK | ✅ pass |
| 7 | `grep -c 'card-nota-historiografica' index.html` | 6 | ✅ pass |
| 8 | `test -s S17-CONTENT-DRAFT.md && echo DRAFT_OK` | DRAFT_OK | ✅ pass |

## New Requirements Surfaced

- none

## Deviations

**certeza-indicator icon changed from ⚖ (&#x2696;) to 💬 (&#x1F4AC;):** The slice plan did not specify an icon but T01 reconnaissance established that `card-opinion` cards with `data-certeza="opinion"` all use 💬 with "Opinión atribuida" or similar label, while ⚖ is exclusively used for `data-certeza="debatido"`. Updated to 💬 for visual consistency. Not a scope change.

## Known Limitations

- None. The card is complete and the nota is verifiable against the cited editions.

## Follow-ups

- S18 can now proceed: the append marker remains intact at exactly 1 occurrence; data-certeza stands at 80.
- S22 (soberanía exterior / bloqueos) must NOT revisit the internal-order counterfactual argued here — that boundary was enforced in the S17 scope.

## Files Created/Modified

- `index.html` — S17-1 card spliced before append marker; data-certeza count 79→80; card-nota-historiografica count 5→6
- `.gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md` — created (T01): prose, two-position nota, entity-encoded T02 Recipe HTML block
- `C:/tmp/s17-cards.html` — temp splice snippet (not committed)
- `C:/tmp/index.html.bak-s17` — pre-splice recovery backup (not committed)

## Forward Intelligence

### What the next slice should know
- **The append marker is at exactly 1 occurrence** immediately before `</div><!-- /.events-grid S09 -->`. This is the only valid insertion point for S18 and all subsequent cards. Use the same ASCII-only marker substring: `'cards will be appended here by subsequent slices'`.
- **data-certeza count is 80.** S18's first verification precondition should expect 80 as the starting baseline.
- **S17's nota established the two-position format** as correct for counterfactual/necessity arguments where contemporary historiography (Halperín Donghi/Lynch) serves as the liberal counter. Use the three-position format only when the synthesis is substantively distinct from both earlier camps (as established in S16-3).
- **S18 concerns real unitario conspiracies** (Asociación de Mayo, bloqueo francés, Coalición del Norte) — these are documented factual events (`card-hecho` with `card-nota-historiografica` if their relationship to Rosas's repression is contested), not interpretive arguments. Different certeza classification than S17.

### What's fragile
- **Entity encoding of `opini&#xF3;n` in `data-certeza`** — the attribute value uses an HTML entity instead of the native character. Browser behavior is correct (entity is decoded before attribute comparison), but CSS attribute selectors written as `[data-certeza="opinión"]` (native char) will NOT match this card. Any CSS or JS that selects by certeza value must use the normalized form. The certeza-indicator JS already handles this (it reads the attribute then sets a display class, not a CSS selector). Future slice authors adding certeza-aware CSS: test with both encoded and native forms.
- **card-nota-historiografica count is now 6** — this is the new baseline. Any post-splice check expecting 5 is stale.

### Authoritative diagnostics
- `grep -c 'data-certeza' index.html` — single most reliable splice confirmation signal; should be 80 until S18 adds its cards
- `grep -n 'S17-1' index.html` — returns lines 1850–1851; the card is immediately above the append marker

### What assumptions changed
- **S17 plan assumed ⚖ icon for opinión cards** — reconnaissance found 💬 is correct for opinion-type cards; ⚖ is debatido. Updated in T01 before any HTML was written. No correction needed in index.html.
