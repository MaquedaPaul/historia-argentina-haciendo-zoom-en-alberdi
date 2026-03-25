---
id: T01
parent: S07
milestone: M007
provides:
  - Complete HTML content for BIOG-21 (card-hecho) and BIOG-22 (card-opinion) ready for T02 integration
  - Certeza classification justification for both cards
  - Insertion anchor confirmation (line 967 in index.html)
  - Verbatim BIOG-18 quote exclusion verified
key_files:
  - .gsd/milestones/M007/slices/S07/S07-CONTENT-DRAFT.md
key_decisions:
  - BIOG-21 uses paraphrase of Obras Completas, not verbatim blockquotes (those are reserved to BIOG-18)
  - BIOG-22 card-opinion__quote wraps four numbered reasons as <p> elements within a single blockquote, mirroring BIOG-16 pattern
  - card-nota-certeza in BIOG-21 clarifies that "gesto de independencia" framing is historiographic, not Alberdi's own words
  - card-nota-certeza in BIOG-22 explicitly names Mayer and Halperin Donghi as sources of the four inferences
  - S08 territory (Salón Literario narrative) left untouched — BIOG-22 only names it as context in reason #4
patterns_established:
  - card-opinion inside BIOG-series uses event-card__body wrapper with card-certeza-indicator before event-card__header (matching BIOG-16 / line-697 pattern)
  - card-nota-certeza used to bridge from a hecho card that describes symbolic framing to its historiographic source in the companion opinion card
observability_surfaces:
  - grep -c 'data-certeza' index.html → 56 after T02
  - grep -c 'id="BIOG-21"' index.html → 1 after T02
  - grep -c 'id="BIOG-22"' index.html → 1 after T02
  - S07-CONTENT-DRAFT.md section 8 tracks expected metrics before/after T02 integration
duration: 25m
verification_result: passed
completed_at: 2026-03-22
blocker_discovered: false
---

# T01: Write S07-CONTENT-DRAFT.md with verified content for BIOG-21 and BIOG-22

**Drafted complete HTML for BIOG-21 (card-hecho) and BIOG-22 (card-opinion) with certeza classification justified, Mayer/Halperin Donghi attributed, and BIOG-18 verbatim quotes excluded.**

## What Happened

Read BIOG-18 (lines 792–845 in index.html) to capture the exact verbatim quotes already there — two blockquotes from *Obras Completas* about Quiroga conversations and the bank draft devolution. Confirmed that BIOG-21 must not reproduce these.

Read the `card-opinion` template patterns (lines 173, 393, 519, 697–715 in index.html) to identify the correct HTML structure for BIOG-22 inside a BIOG-series card (which uses `event-card__body` > `event-card__header` > `event-card__content` > `event-card__footer` with `card-certeza-indicator` before the header).

Read the S07-RESEARCH.md file for source guidance and the four inferred reasons from Mayer/Halperin Donghi.

Confirmed the insertion anchor: `</div><!-- /#rev-alberdi-quiroga -->` is at line 967 (1-indexed).

Added the `## Observability / Diagnostics` section to S07-PLAN.md (pre-flight requirement from task plan).

Wrote S07-CONTENT-DRAFT.md with:
1. Pre-flight verbatim quote documentation (so T02 can confirm no repetition)
2. Insertion anchor confirmation (line 967)
3. Prose certeza classification justification for both cards
4. Complete HTML for BIOG-21 (card-hecho, paraphrasing the devolution episode with contextual framing)
5. Complete HTML for BIOG-22 (card-opinion, four numbered reasons in a single blockquote with Mayer+Halperin Donghi attribution and card-nota-certeza)
6. Complete thematic block HTML (h4 + events-grid wrapping both cards) ready for T02 splice
7. Self-check table verifying all must-haves
8. Expected metrics table for T02 post-integration verification

**BIOG-21 design decision:** The two BIOG-18 verbatim quotes are only in the pre-flight documentation section of the draft (markdown blockquotes for reference). The BIOG-21 card body uses paraphrase only — «una visita respetuosa» and «renunciando al proyecto de viaje para los Estados Unidos» appear as condensed inline paraphrase, not as extracted blockquotes. The card focuses on the contextual meaning (late 1834, political significance of returning Quiroga's money) rather than the narration itself.

**BIOG-22 design decision:** Four inferred reasons presented as `<p>` elements inside a single `<blockquote class="card-opinion__quote">`, each with a bold number heading. The `<footer class="card-opinion__attribution">` names Mayer and Halperin Donghi with proper citation. A `card-nota-certeza` inside `event-card__content` makes the inferential nature explicit.

## Verification

Ran all four T01 verification commands:

```bash
test -f .gsd/milestones/M007/slices/S07/S07-CONTENT-DRAFT.md   # PASS
grep -c 'BIOG-21\|BIOG-22' .gsd/.../S07-CONTENT-DRAFT.md        # → 31 (≥2 ✅)
grep -c 'data-certeza="opinion"' .gsd/.../S07-CONTENT-DRAFT.md  # → 5 (≥1 ✅)
grep -c 'Mayer\|Halperin' .gsd/.../S07-CONTENT-DRAFT.md         # → 21 (≥1 ✅)
```

Confirmed verbatim BIOG-18 quotes appear only in the pre-flight documentation section of the draft (lines 13–15), not in any BIOG-21 HTML content.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -f .gsd/milestones/M007/slices/S07/S07-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |
| 2 | `grep -c 'BIOG-21\|BIOG-22' S07-CONTENT-DRAFT.md` | 0 | ✅ pass (31 ≥ 2) | <1s |
| 3 | `grep -c 'data-certeza="opinion"' S07-CONTENT-DRAFT.md` | 0 | ✅ pass (5 ≥ 1) | <1s |
| 4 | `grep -c 'Mayer\|Halperin' S07-CONTENT-DRAFT.md` | 0 | ✅ pass (21 ≥ 1) | <1s |
| 5 | `grep -n 'Lo visité con repetición\|Al día siguiente le hice'` (scope check) | 0 | ✅ pass (only lines 13–15, not in BIOG-21 HTML) | <1s |

**Slice-level Capa 1 checks (pre-T02, expected to fail — noted for T03):**
- `grep -c 'data-certeza' index.html` → 54 (will be 56 after T02) — expected pre-T02 state
- `grep -c 'id="BIOG-21"' index.html` → 0 (will be 1 after T02) — expected pre-T02 state
- `grep -c 'id="BIOG-22"' index.html` → 0 (will be 1 after T02) — expected pre-T02 state

## Diagnostics

- `S07-CONTENT-DRAFT.md` is the human-readable audit trail. Section 1 documents which BIOG-18 quotes to avoid. Section 6 has the complete block HTML ready for copy-paste or programmatic insertion in T02. Section 7 self-check table confirms all must-haves.
- After T02 integration: `grep -c 'data-certeza' index.html` must return 56; `grep -c 'id="BIOG-21"\|id="BIOG-22"' index.html` must return 2.
- If T02's CRLF-safe splice fails: re-run with `split('\r\n')` / `join('\r\n')` as documented in KNOWLEDGE.md.

## Deviations

None. The draft follows the task plan exactly: BIOG-21 as `card-hecho` with paraphrase, BIOG-22 as `card-opinion` with four-reason analysis attributed to Mayer/Halperin Donghi, no verbatim BIOG-18 quotes in BIOG-21, S08 territory untouched.

## Known Issues

None. All T01 must-haves met. The only items left for this slice are T02 (HTML integration) and T03 (triple gate verification).

## Files Created/Modified

- `.gsd/milestones/M007/slices/S07/S07-CONTENT-DRAFT.md` — new file: complete HTML drafts for BIOG-21 and BIOG-22, certeza justification, insertion anchor confirmation, self-check table, and expected metrics
- `.gsd/milestones/M007/slices/S07/S07-PLAN.md` — added `## Observability / Diagnostics` section (pre-flight gap fix)
