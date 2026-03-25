---
id: T01
parent: S14
milestone: M008
provides:
  - S14-CONTENT-DRAFT.md with verified prose and verbatim T02 Recipe HTML block for 3 cards (S14-1, S14-2, S14-3)
key_files:
  - .gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md
key_decisions:
  - Plebiscite figure 9,316 used (not 9,320) to match SP3-1 already in index.html and avoid visible contradiction
  - S14-2 scope limited to French blockade, Vuelta de Obligado, and Caseros arc — NOT repeating Mazorca (SP3-2) or Caseros detail (SP3-6)
  - S14-3 uses card-opinion class with data-certeza="debatido" (no card-debatido class exists; zero-new-CSS constraint preserved)
  - HTML entity-encoded special characters in Recipe block to avoid shell/encoding issues during T02 splice
patterns_established:
  - T02 Recipe HTML uses HTML entities (&#xF3; etc.) for non-ASCII characters in the verbatim splice block, ensuring encoding safety on Windows
observability_surfaces:
  - test -s .gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md && echo OK
  - grep -c 'data-id="S14-' .gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md (returns 3)
duration: ~15m
verification_result: passed
completed_at: 2026-03-23
blocker_discovered: false
---

# T01: Write S14-CONTENT-DRAFT.md with verified prose and T02 Recipe HTML block

**Wrote S14-CONTENT-DRAFT.md with verified historical prose for 3 cards (S14-1: Suma acquisition, S14-2: blockades and Caseros arc, S14-3: historiographic note) and a complete verbatim T02 Recipe HTML block using HTML entities for encoding safety.**

## What Happened

Read the SP3 cards in index.html (lines ~1720–1889) to confirm what NOT to duplicate: SP3-1 covers the Suma del Poder Público overview from an Alberdi-context angle; SP3-2 covers the Mazorca; SP3-6 covers the Caseros battle detail. Read S13-CONTENT-DRAFT.md for format reference and S14-RESEARCH.md for image URLs and source list.

Resolved the plebiscite vote count discrepancy: CONTEXT.md had 9,320 but SP3-1 in the live index.html already uses 9,316. Used 9,316 in S14-1 to avoid a visible contradiction on the same page — the research file confirmed this is the more commonly cited secondary-literature figure.

Wrote three card entries:
- **S14-1** (card-hecho, 0ms): Narrates Quiroga's assassination triggering the crisis, the Legislatura calling Rosas back, his demand for the Suma as condition, the plebiscite (9,316 / 4), the April 13 1835 formal grant, and the "Restaurador de las Leyes" title. Picks up the S13-2 thread explicitly ("denied in 1829, demanded as condition in 1835"). Image: `Divisas_de_la_época_de_Rosas.jpg` (CC BY 2.5 ar, attribution block placed inside .card-image per KNOWLEDGE.md pattern).
- **S14-2** (card-hecho, 80ms): Covers the French blockade 1838–1840 (Convention Mackau resolution), the Anglo-French blockade and Vuelta de Obligado (20 Nov 1845, defeat but sovereignty symbol, lifted 1850), and the Caseros arc (Ejército Grande, 3 Feb 1852, Rosas exile to Southampton, died 1877). Kept at the mandate-arc level, not repeating SP3-6 tactical Caseros detail. Image: `Batalla_de_la_Vuelta_de_Obligado.jpg` (Public domain).
- **S14-3** (card-opinion, data-certeza="debatido", 160ms): Brief historiographic note with `<p class="card-nota-historiografica">` noting the regime is contested between the liberal and revisionist schools, seeding S15–S19 without resolving the debate. No image (card is a meta-epistemic note, not a narrative event). Used card-opinion class (existing CSS class) since no card-debatido class exists — preserves zero-new-CSS constraint.

The T02 Recipe HTML block at the end of the draft uses HTML entities for all non-ASCII characters (accented vowels, em-dashes, guillemets) to ensure the verbatim splice survives Windows shell encoding round-trips during T02's Node.js one-liner.

Added the `## Observability / Diagnostics` section to S14-PLAN.md as required by the pre-flight check.

## Verification

Both task-level verification commands passed:

1. `test -s .gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md && echo OK` → printed `OK`
2. `grep -c 'data-id="S14-' .gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md` → returned `3`

Additional integrity checks confirmed:
- Plebiscite figure 9.316 present in both prose section and T02 Recipe HTML block
- `data-certeza="debatido"` present on S14-3
- `img-attribution` block present inside `.card-image` for S14-1
- `card-nota-historiografica` paragraph present in S14-3
- All three stagger delays (0ms, 80ms, 160ms) confirmed in grep output

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -s .gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md && echo OK` | 0 | ✅ pass | <1s |
| 2 | `grep -c 'data-id="S14-' .gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md` → 3 | 0 | ✅ pass | <1s |
| 3 | `grep '9.316' S14-CONTENT-DRAFT.md` (plebiscite figure check) | 0 | ✅ pass | <1s |
| 4 | `grep 'debatido\|img-attribution\|card-nota-historiografica' S14-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |

Slice-level verification checks (T02-gated) are expected to run in T02, not T01. The only T01-relevant slice check is `test -s .gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md && echo OK` — which passed.

## Diagnostics

- `test -s .gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md && echo OK` — confirms draft is non-empty
- `grep -c 'data-id="S14-' .gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md` — confirms 3 data-id occurrences
- `grep 'T02 Recipe' .gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md` — confirms the Recipe section header is present
- The T02 Recipe HTML block is delimited by ` ```html ` / ` ``` ` fences — T02 must extract only the content between those fences when writing `C:/tmp/s14-cards.html`

## Deviations

- **HTML entity encoding in Recipe block:** The task plan specified verbatim HTML prose. The draft uses HTML entities (&#xF3;, &#xE9;, etc.) for all non-ASCII characters in the T02 Recipe block. This is a proactive encoding safety measure based on the KNOWLEDGE.md entry about Windows shell/encoding issues with Node.js one-liners. The prose sections (above the Recipe block) use native UTF-8 Spanish characters for readability.
- **S14-PLAN.md observability section:** Added `## Observability / Diagnostics` section per pre-flight requirement. Not in original task plan steps but required by the pre-flight block.

## Known Issues

None. All must-haves are satisfied.

## Files Created/Modified

- `.gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md` — created; 3 card entries with prose, sources, image notes, and complete T02 Recipe HTML block (13,813 bytes)
- `.gsd/milestones/M008/slices/S14/S14-PLAN.md` — added `## Observability / Diagnostics` section (pre-flight requirement)
