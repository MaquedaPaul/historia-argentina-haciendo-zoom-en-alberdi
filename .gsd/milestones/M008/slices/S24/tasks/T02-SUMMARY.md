---
id: T02
parent: S24
milestone: M008
provides:
  - index.html with S24-1 and S24-2 spliced before append marker; data-certeza=93; card-nota-historiografica=12
key_files:
  - index.html
  - C:/tmp/s24-cards.html
  - C:/tmp/index.html.bak-s24
key_decisions:
  - Scope boundary check reports SCOPE_FAIL (EOF-bounded sweep catches pre-existing SP3-x banned terms); tight-boundary check confirms S24 cards are SCOPE_PASS — false positive documented in KNOWLEDGE.md
patterns_established:
  - Tight-boundary scope check (data-id S24-1 to end of S24-2 article) is the reliable method; EOF-bounded check produces false positives when banned terms exist in later-section cards
observability_surfaces:
  - C:/tmp/index.html.bak-s24 — pre-splice backup; restore with cp C:/tmp/index.html.bak-s24 index.html
  - C:/tmp/s24-cards.html — extracted card HTML; inspect for encoding issues if splice counts are wrong
  - grep -c 'data-certeza' index.html (expected 93), grep -c 'data-id="S24-' index.html (expected 2), grep -c 'card-nota-historiografica' index.html (expected 12)
duration: ~10m
verification_result: passed
completed_at: 2026-03-23
blocker_discovered: false
---

# T02: Splice S24 cards into index.html before append marker

**Spliced S24-1 (Encarnación Ezcurra biographical card) and S24-2 (historiographic debate card) into index.html before the append marker; all 6 substantive verification checks pass; data-certeza=93, card-nota-historiografica=12, marker intact, no CSS/JS changes.**

## What Happened

1. Verified preconditions: `S24-CONTENT-DRAFT.md` exists and non-empty; `grep -c 'data-certeza' index.html` returned 91; append marker count returned 1.
2. Re-confirmed ENTITY_PASS and SCOPE_PASS on S24-CONTENT-DRAFT.md T02 Recipe section (per T01 results).
3. Created `C:/tmp` directory and used the Write tool to write the extracted verbatim card HTML (between SPLICE-START and SPLICE-END markers) to `C:/tmp/s24-cards.html` (5238 bytes).
4. Backed up `index.html` to `C:/tmp/index.html.bak-s24`.
5. Ran Node.js splice: found marker at line 2061 (`cards will be appended here by subsequent slices`), spliced the S24 card lines before it; total post-splice line count 2809.
6. Ran all 7 verification checks:
   - `data-certeza`: 91 → **93** ✅
   - `S24 cards`: **2** ✅
   - `append marker`: **1** ✅
   - `nota count`: **12** ✅
   - CSS/JS diff: **empty** ✅
   - Backup exists: exit **0** ✅
   - Spec's EOF-bounded scope check: **SCOPE_FAIL** (false positive — banned terms in pre-existing SP3-x cards at end of `#periodo-rosas`; tight-boundary check confirms S24 cards are **SCOPE_PASS**) — documented in KNOWLEDGE.md.

## Verification

All six substantive checks pass. The seventh (scope boundary) produced a known false positive due to the EOF-bounded check design; verified S24 cards are clean using a tight-boundary check scoped to the S24 article block specifically.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c 'data-certeza' index.html` | 0 (output: 93) | ✅ pass | <1s |
| 2 | `grep -c 'data-id="S24-' index.html` | 0 (output: 2) | ✅ pass | <1s |
| 3 | `grep -c 'cards will be appended here' index.html` | 0 (output: 1) | ✅ pass | <1s |
| 4 | `grep -c 'card-nota-historiografica' index.html` | 0 (output: 12) | ✅ pass | <1s |
| 5 | `git diff --name-only HEAD -- styles.css app.js` | 0 (output: empty) | ✅ pass | <1s |
| 6 | `test -s C:/tmp/index.html.bak-s24` | 0 | ✅ pass | <1s |
| 7 | Spec EOF-bounded scope check on index.html | 0 (output: SCOPE_FAIL) | ⚠️ false positive | <1s |
| 7a | Tight-boundary scope check (S24 articles only) | 0 (output: SCOPE_PASS) | ✅ pass | <1s |

## Diagnostics

- **Restore from backup:** `cp C:/tmp/index.html.bak-s24 index.html`
- **Inspect card HTML:** `cat C:/tmp/s24-cards.html` — the extracted entity-encoded HTML used for splice
- **Marker position:** Marker was at line 2061 pre-splice; post-splice at line 2061 + number_of_card_lines
- **Scope false positive:** `node -e "const f=require('fs').readFileSync('index.html','utf8'); const s24_1=f.indexOf('data-id=\"S24-1\"'); const s24_2_end=f.indexOf('</article>',f.indexOf('data-id=\"S24-2\"'))+10; const block=f.slice(s24_1-200,s24_2_end); const banned=['Mazorca','Caseros','Barranco Yaco','bloqueo franc','Vuelta de Obligado','Restauradores','Sociedad Popular Restauradora']; console.log(banned.filter(b=>block.includes(b)).length===0?'SCOPE_PASS':'SCOPE_FAIL');"` — returns SCOPE_PASS confirming S24 cards are clean.

## Deviations

- **Scope boundary check false positive:** The spec's `f.slice(f.indexOf('S24-1'))` check sweeps to EOF and catches banned terms in pre-existing SP3-x cards in `#periodo-rosas`. This is not a content error in S24 — the S24 card block is clean. The tight-boundary check confirms SCOPE_PASS. Documented in KNOWLEDGE.md.

## Known Issues

None. S24 cards are content-correct, entity-encoded, and properly positioned before the append marker.

## Files Created/Modified

- `index.html` — S24-1 and S24-2 spliced before append marker; data-certeza=93; card-nota-historiografica=12; all other structure unchanged
- `C:/tmp/s24-cards.html` — extracted card HTML (temp file, not committed)
- `C:/tmp/index.html.bak-s24` — pre-splice backup (temp file, not committed)
- `.gsd/KNOWLEDGE.md` — appended scope boundary false positive pattern entry
