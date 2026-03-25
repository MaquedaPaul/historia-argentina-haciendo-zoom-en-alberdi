---
id: T01
parent: S20
milestone: M008
provides:
  - S20-CONTENT-DRAFT.md with entity-encoded HTML for both S20-1 and S20-2 cards
key_files:
  - .gsd/milestones/M008/slices/S20/S20-CONTENT-DRAFT.md
key_decisions:
  - S20-1 uses card-hecho with card-image div (following S13 pattern, not S18 imageless pattern) — provides visual contrast via the Dorrego execution painting
  - S20-2 uses card-opinion with reveal-slide (not reveal-fade as in S17-1) — consistent with the slide animation used in adjacent S18/S19 cards
patterns_established:
  - Entity encoding for "constituyó": constituy&#xF3; (only terminal ó encoded — not constitu&#xF3;y&#xF3; which is wrong)
observability_surfaces:
  - node C:/tmp/ascii_check_s20.js — runs the T02-Recipe ASCII check, outputs PASS or FAIL with line count
  - node C:/tmp/verify_s20.js — runs 15 structural checks on the draft's Recipe block
duration: 25m
verification_result: passed
completed_at: 2026-03-23
blocker_discovered: false
---

# T01: Escribir S20-CONTENT-DRAFT.md con HTML entity-encoded para ambas cards

**Authored S20-CONTENT-DRAFT.md with fully entity-encoded T02 Recipe HTML for two new cards: S20-1 (hecho — the Brazil peace treaty context) and S20-2 (opinión — the fusilamiento as Argentina's foundational political rupture), ready for T02 splice.**

## What Happened

Read S20-RESEARCH.md, S20-CONTEXT.md, and the existing S13-1 and S17-1 patterns in index.html to establish the correct card structure and scope boundary. Confirmed `data-certeza` count is currently 84 (splice target: 86 after T02).

Wrote `S20-CONTENT-DRAFT.md` with:
- Prose sections for S20-1 and S20-2 in readable UTF-8 (for human review)
- A `## T02 Recipe` block at the end containing verbatim entity-encoded HTML for both cards

Fixed one encoding bug discovered post-write: `constitu&#xF3;y&#xF3;` → `constituy&#xF3;` (the word "constituyó" only has one accented character — the terminal `ó`). Used a Node.js replacement script to apply the fix cleanly.

**Scope guard respected:** S20-1 covers the PRIOR CONTEXT (Brazil war 1825–1828, Ponsonby's Preliminary Convention, Banda Oriental independence, treaty unpopularity as Lavalle's political pretext). S20-2 covers the POLITICAL MEANING (Saldías, Halperín Donghi, Lynch interpretations of the fusilamiento as foundational rupture). Neither card repeats S13-1's narrative of the golpe, the fusilamiento itself, Rosas's mobilization, Puente de Márquez, Cañuelas, Barracas, or the 8 Dec 1829 election.

Also applied the pre-flight fix to S20-PLAN.md: added `## Observability / Diagnostics` section with runtime signals, failure state inspection commands, restore procedure, and redaction constraints.

## Verification

Three checks run:

1. `test -s .gsd/milestones/M008/slices/S20/S20-CONTENT-DRAFT.md && echo DRAFT_OK` → DRAFT_OK
2. `grep -c 'T02 Recipe' .gsd/milestones/M008/slices/S20/S20-CONTENT-DRAFT.md` → 1
3. Node.js ASCII check on T02 Recipe block → PASS

Additionally ran 15-point structural check on Recipe block: all PASS (data-ids, certeza values, image URLs, stagger delays, icons, labels, CSS classes, negative checks for card-nota-historiografica and wrong Lavalle portrait).

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -s .gsd/milestones/M008/slices/S20/S20-CONTENT-DRAFT.md && echo DRAFT_OK` | 0 | ✅ pass | <1s |
| 2 | `grep -c 'T02 Recipe' .gsd/milestones/M008/slices/S20/S20-CONTENT-DRAFT.md` | 0 (→1) | ✅ pass | <1s |
| 3 | `node C:/tmp/node_ascii_check.js` (T02 Recipe ASCII check) | 0 → PASS | ✅ pass | <1s |
| 4 | `node C:/tmp/verify_s20.js` (15 structural checks) | 0 → all PASS | ✅ pass | <1s |

Slice verification checks (T01 scope only — index.html not yet modified):
- `grep -c 'data-certeza' index.html` → 84 (expected 86 after T02, not T01)
- `grep -c 'data-id="S20-1"' index.html` → 0 (expected 1 after T02)
- `grep -c 'data-id="S20-2"' index.html` → 0 (expected 1 after T02)

## Diagnostics

- `node C:/tmp/ascii_check_s20.js` — verify T02 Recipe block has no raw non-ASCII chars (outputs PASS/FAIL)
- `node C:/tmp/verify_s20.js` — verify 15 structural requirements of the Recipe block
- If ASCII check fails after editing the draft, run `grep -n 'constitu' .gsd/milestones/M008/slices/S20/S20-CONTENT-DRAFT.md` to spot encoding regressions

## Deviations

- Pre-flight fix applied to S20-PLAN.md as required by task instructions (added `## Observability / Diagnostics` section with failure-path diagnostics and restore procedure).
- Discovered and fixed encoding bug `constitu&#xF3;y&#xF3;` → `constituy&#xF3;` in the Recipe block (only the terminal `ó` of "constituyó" should be entity-encoded).
- S20-2 uses `reveal-slide` animation class (consistent with neighboring S18/S19 cards) rather than `reveal-fade` seen in S17-1. The task plan did not specify which animation variant — slide is the dominant pattern in recent slices and provides visual consistency.

## Known Issues

None.

## Files Created/Modified

- `.gsd/milestones/M008/slices/S20/S20-CONTENT-DRAFT.md` — new file: content draft with prose sections for S20-1 and S20-2 plus T02 Recipe block containing verbatim entity-encoded HTML for both cards
- `.gsd/milestones/M008/slices/S20/S20-PLAN.md` — modified: added `## Observability / Diagnostics` section (pre-flight fix)
