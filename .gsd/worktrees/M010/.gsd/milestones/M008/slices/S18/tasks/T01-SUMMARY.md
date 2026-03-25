---
id: T01
parent: S18
milestone: M008
provides:
  - S18-CONTENT-DRAFT.md with full prose (UTF-8) and entity-encoded T02 Recipe HTML block
key_files:
  - .gsd/milestones/M008/slices/S18/S18-CONTENT-DRAFT.md
key_decisions:
  - S18-1 uses no image (consistent with S17-1 no-image pattern); Coalición del Norte map assigned exclusively to S18-2
  - card-nota-historiografica on S18-1 scoped narrowly to the pretext argument only — does not make a tiranía judgment (that boundary → S19)
  - Alberdi's La acción de la Europa en América (1842) included in S18-1 prose to maintain R011 thread without making S18 an Alberdi card
patterns_established:
  - T02 Recipe HTML block extracted between triple-backtick markers for easy node-based entity verification
  - Entity check uses Node.js (not grep -P which fails on this locale's encoding)
observability_surfaces:
  - grep -c 'data-certeza' index.html → baseline 80 before T02 splice
  - grep -c 'card-nota-historiografica' index.html → baseline 6 before T02 splice
  - node entity-check script documented in draft file Observability section
duration: 15m
verification_result: passed
completed_at: 2026-03-23
blocker_discovered: false
---

# T01: Author S18-CONTENT-DRAFT.md with full prose and entity-encoded T02 Recipe HTML

**Authored S18-CONTENT-DRAFT.md (117 lines) with full historical prose for both cards, scope compliance checklist, and T02 Recipe HTML block with all non-ASCII encoded as HTML entities — entity check passed (zero non-ASCII in recipe block).**

## What Happened

Read S18-RESEARCH.md, KNOWLEDGE.md entity encoding rules, and prior card examples (S16-1 with image, S16-2 without image, S16-3 with nota historiográfica, S17-1 opinion card) to establish the correct structural pattern.

Confirmed index.html preconditions: `data-certeza` count = 80, `card-nota-historiografica` count = 6, append marker at exactly 1 occurrence.

Wrote `S18-CONTENT-DRAFT.md` with:
1. **S18-1 prose** (card-hecho, no image, 0ms): Covers all four documented episodes — Asociación de Mayo (Echeverría's *Dogma Socialista*, 1838), apoyo al bloqueo francés (1838–1840, Juan Cruz Varela documented), Alberdi's dissent (*La acción de la Europa en América*, Valparaíso, 1842), and Comisión Argentina (1851 Urquiza/Brazil backing).
2. **S18-1 card-nota-historiografica**: Narrowly scoped to the pretext argument — conspiracies were real; Myers (1995) documents "conspirador" label applied beyond actual conspirators; Lynch (1981 cap. 6) distinguishes documented plotters from those swept by mass intimidation. Explicitly ends with "La pregunta de si ese uso fue deliberado como instrumento de control político corresponde a S19."
3. **S18-2 prose** (card-hecho, with map image, 80ms): Accurate dates — Lavalle invasion July 1840; Avellaneda executed 3 November 1841 in Tucumán; Lavalle died 9 October 1841 in Jujuy (shot through window). Map image at confirmed Wikimedia Commons URL.
4. **Scope compliance checklist** with 4 items confirming S18/S19/S22 boundaries.
5. **T02 Recipe HTML block** (between triple-backtick markers): Both cards with full entity encoding — á→`&#xE1;`, é→`&#xE9;`, í→`&#xED;`, ó→`&#xF3;`, ú→`&#xFA;`, ñ→`&#xF1;`, em dash→`&#x2014;`, en dash→`&#x2013;`, left/right curly quotes→`&#x201C;`/`&#x201D;`.
6. **Observability / Diagnostics** section at end of draft for T02 and future agents.

Also added `## Observability / Diagnostics` section to S18-PLAN.md as required by pre-flight check.

`grep -P` for non-ASCII check fails on this environment's locale (returns encoding error). Used Node.js instead, which reliably detects non-ASCII bytes — this is consistent with KNOWLEDGE.md which already recommends Node.js over bash for file manipulation.

## Verification

All three T01 verification commands ran and passed:
- `test -s .gsd/milestones/M008/slices/S18/S18-CONTENT-DRAFT.md && echo DRAFT_OK` → DRAFT_OK
- `wc -l .gsd/milestones/M008/slices/S18/S18-CONTENT-DRAFT.md` → 117 (≥ 80 ✓)
- `grep -c 'T02 Recipe' .gsd/milestones/M008/slices/S18/S18-CONTENT-DRAFT.md` → 4 (≥ 1 ✓)

Entity check via Node.js: zero non-ASCII lines in T02 Recipe block (ENTITY CHECK PASS).

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -s .gsd/milestones/M008/slices/S18/S18-CONTENT-DRAFT.md && echo DRAFT_OK` | 0 | ✅ pass | <1s |
| 2 | `wc -l .gsd/milestones/M008/slices/S18/S18-CONTENT-DRAFT.md` → 117 | 0 | ✅ pass (≥80) | <1s |
| 3 | `grep -c 'T02 Recipe' .gsd/milestones/M008/slices/S18/S18-CONTENT-DRAFT.md` → 4 | 0 | ✅ pass (≥1) | <1s |
| 4 | Node.js entity-check on T02 Recipe block | 0 | ✅ pass (0 non-ASCII lines) | <1s |
| 5 | `grep -c 'data-certeza' index.html` → 80 | 0 | ✅ pass (precondition confirmed) | <1s |
| 6 | `grep -c 'cards will be appended here' index.html` → 1 | 0 | ✅ pass (marker intact) | <1s |

Slice-level checks 1–7 (index.html modifications) are T02's responsibility.

## Diagnostics

- **T02 Recipe block location:** lines ~82–116 of S18-CONTENT-DRAFT.md, between triple-backtick markers starting with `<!-- S18-1:` and ending with `</article>`.
- **Entity check command for future agents:**
  ```
  node -e "const fs=require('fs'); const c=fs.readFileSync('.gsd/milestones/M008/slices/S18/S18-CONTENT-DRAFT.md','utf8'); const s=c.indexOf('\`\`\`\n<!-- S18-1'); const e=c.indexOf('\`\`\`\n\n---\n\n## Observability'); const b=c.slice(s+3,e); const n=b.split('\n').filter(l=>/[^\x00-\x7F]/.test(l)); console.log(n.length===0?'PASS':'FAIL: '+n.length+' lines');"
  ```
- **grep -P locale issue:** On this Windows/Git Bash environment, `grep -P '[^\x00-\x7F]'` errors with "supports only unibyte and UTF-8 locales". Use Node.js for byte-level non-ASCII checks. Add to KNOWLEDGE.md.

## Deviations

- **grep -P unavailable:** Used Node.js entity check instead of `grep -P`. Node.js is the established tool for file manipulation in this environment (per KNOWLEDGE.md "Python is not available" entry). The check is more precise anyway — it operates on the extracted block, not the whole file.
- **S18-PLAN.md missing Observability section:** Pre-flight check flagged this. Added `## Observability / Diagnostics` section to S18-PLAN.md as instructed.

## Known Issues

None. The draft is complete and ready for T02 mechanical splice.

## Files Created/Modified

- `.gsd/milestones/M008/slices/S18/S18-CONTENT-DRAFT.md` — full content draft: UTF-8 readable prose, scope compliance checklist, and entity-encoded T02 Recipe HTML block for both S18-1 and S18-2 cards
- `.gsd/milestones/M008/slices/S18/S18-PLAN.md` — added `## Observability / Diagnostics` section (pre-flight fix); marked T01 `[x]`
