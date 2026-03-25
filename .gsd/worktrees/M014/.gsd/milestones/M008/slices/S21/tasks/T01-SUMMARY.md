---
id: T01
parent: S21
milestone: M008
provides:
  - S21-CONTENT-DRAFT.md with two-card prose and entity-encoded T02 Recipe block
key_files:
  - .gsd/milestones/M008/slices/S21/S21-CONTENT-DRAFT.md
key_decisions:
  - S21-2 uses data-certeza="opini&#xF3;n" (entity-encoded) with &#x1F4AC; icon per D057/D058 taxonomy — endorsement question is interpretive, not a contested fact
  - S21-2 has no image (consistent with pure historiographic debate card pattern in M008)
  - Lynch cap. 4 consumed by S21 (caps. 1–3 used by prior slices; cap. 8 remains for S22 diplomacy/bloqueos)
  - S21-1 references the Suma grant as "abril de 1835" without re-narrating plebiscite event (scope boundary maintained)
patterns_established:
  - card-nota-historiografica inside S21-2 article, after excerpt paragraph, before footer (confirmed pattern)
  - Three-position historiographic debate: revisionista (Irazusta) / liberal (Mitre) / síntesis contemporánea (Lynch + Myers)
observability_surfaces:
  - test -s .gsd/milestones/M008/slices/S21/S21-CONTENT-DRAFT.md — T01 artifact existence check
  - node entity-check on Recipe block — confirms 0 non-ASCII lines in splice-ready HTML
  - node scope-boundary check — confirms no banned S14-1 strings in Recipe block
  - post-splice: grep -c 'data-certeza' index.html → 88; grep -c 'data-id="S21-' index.html → 2
duration: ~15m
verification_result: passed
completed_at: 2026-03-23
blocker_discovered: false
---

# T01: Author S21 content draft with two-card prose and entity-encoded T02 Recipe block

**Authored S21-CONTENT-DRAFT.md with two cards: constitutional mechanics of the Suma (hecho) and three-position historiographic debate on provincial endorsement (opinión), with fully entity-encoded T02 Recipe block passing all checks.**

## What Happened

Read S21-RESEARCH.md, S21-PLAN.md, S21-T01-PLAN.md, and gathered reference materials from: (1) S14-1 in index.html to confirm exact scope boundary (plebiscite event, 9.316 votes, 13 April 1835, "Restaurador de las Leyes" — all in S14-1, not to be repeated); (2) live card-nota-historiografica examples at lines 1761–1925 of index.html to confirm placement pattern (after excerpt, before footer); (3) S20-CONTENT-DRAFT.md for Recipe block format and entity-encoding conventions; (4) KNOWLEDGE.md for platform-specific gotchas (no `grep -P`, use Node.js for non-ASCII detection).

Wrote `.gsd/milestones/M008/slices/S21/S21-CONTENT-DRAFT.md` with three sections:

**S21-1 (card-hecho):** Explains the constitutional scope of the Suma — it was strictly a Buenos Aires provincial instrument concentrating executive, legislative, and judicial powers in the gobernador. Lists all 14 provinces of the 1835 Confederation (including Jujuy, autonomous since 1834). Explains the Pacto Federal (4 January 1831) as the only interprovincial instrument, which delegated only foreign relations to Buenos Aires — not a national executive or legislature. References the Suma grant as "con la Suma ya otorgada en abril de 1835" (back-reference to S14-1, not re-narration). Image: Carlos Pellegrini, "Buenos Aires — San Nicolás" (ca. 1829), public domain.

**S21-2 (card-opinion, data-certeza="opini&#xF3;n"):** Three-position historiographic debate on whether the provinces "endorsed" the Suma. Revisionista position (Irazusta 1941): Pacto Federal gave Rosas de facto national authority; Suma was the formal expression of existing political reality. Liberal position (Mitre 1857): Suma was a Buenos Aires internal act; provincial silence reflected coercive dominance, not consent. Contemporary synthesis (Lynch 1981 cap. 4, Myers 1995 cap. 2): legally provincial, but Rosas exercised it as de facto national instrument by controlling Aduana revenues and diplomatic recognition; the conceptual ambiguity was deliberate. card-nota-historiografica block placed after excerpt, before footer. No image (consistent with pure debate card pattern).

**T02 Recipe block:** Verbatim entity-encoded HTML for both cards, with all non-ASCII characters converted to HTML entities (á=&#xE1;, é=&#xE9;, etc.). The `ü` in "ambigüedad" → `&#xFC;` was encoded correctly in the nota historiográfica.

Also added `## Observability / Diagnostics` section to S21-PLAN.md per pre-flight requirement.

## Verification

All four T01 verification checks passed:

1. `test -s .gsd/milestones/M008/slices/S21/S21-CONTENT-DRAFT.md` → FILE_EXISTS_AND_NONEMPTY
2. `grep -c '## S21-' S21-CONTENT-DRAFT.md` → 2 (both S21-1 and S21-2 sections present)
3. `grep -c '## T02 Recipe' S21-CONTENT-DRAFT.md` → 1
4. Node.js entity-check on Recipe block → PASS (0 non-ASCII lines)
5. Scope boundary check → SCOPE_CHECK: PASS (no banned strings: 9,316 / 9316 / "Restaurador de las Leyes" / "13 de abril de 1835")

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -s .gsd/milestones/M008/slices/S21/S21-CONTENT-DRAFT.md && echo FILE_EXISTS_AND_NONEMPTY` | 0 | ✅ pass | <1s |
| 2 | `grep -c '## S21-' .gsd/milestones/M008/slices/S21/S21-CONTENT-DRAFT.md` → 2 | 0 | ✅ pass | <1s |
| 3 | `grep -c '## T02 Recipe' .gsd/milestones/M008/slices/S21/S21-CONTENT-DRAFT.md` → 1 | 0 | ✅ pass | <1s |
| 4 | Node.js entity-check on Recipe block | 0 | ✅ PASS | <1s |
| 5 | Node.js scope boundary check (no banned strings in Recipe) | 0 | ✅ SCOPE_CHECK: PASS | <1s |

Slice-level verification (post-T02, not yet runnable — T02 hasn't spliced yet):
- `grep -c 'data-certeza' index.html` → 86 (unchanged, T02 not run)
- `grep -c 'data-id="S21-' index.html` → 0 (unchanged, T02 not run)
- `grep -c 'cards will be appended here' index.html` → 1 (marker intact)

## Diagnostics

To inspect this task's output:
- `cat .gsd/milestones/M008/slices/S21/S21-CONTENT-DRAFT.md` — full prose + Recipe block
- Node.js entity-check command (see Observability section in S21-PLAN.md) — verify Recipe block is ASCII-only
- Node.js scope-boundary check (see Observability section) — verify no S14-1 fact re-narration in Recipe

Failure state: if T02 splice fails, restore from `C:/tmp/index.html.bak-s21` (created by T02 before splice).

## Deviations

None. Followed plan exactly. S21-2 confirmed image-free per plan guidance (consistent with S17-1, S18-1, S19-1/S19-2 opinion/debate card pattern in M008). Lynch cap. 4 consumed (plan specified cap. 4 for S21; KNOWLEDGE.md Lynch citation chain updated mentally — cap. 8 remains for S22).

## Known Issues

None.
