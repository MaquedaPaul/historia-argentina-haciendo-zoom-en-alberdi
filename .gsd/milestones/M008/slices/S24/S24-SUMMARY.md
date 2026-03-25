---
id: S24
parent: M008
milestone: M008
provides:
  - Two cards in #periodo-rosas: S24-1 (biographical hecho card) and S24-2 (historiographic debate opinion card) covering Encarnación Ezcurra's pre-Rosas life and the agency-vs-dependency debate
  - data-certeza count raised from 91 → 93
  - card-nota-historiografica count at 12
  - M008 milestone closed (all 16 slices S09–S24 complete)
requires:
  - slice: S23
    provides: Encarnación Ezcurra's political role (Sociedad Popular Restauradora, espionage network, mazorqueras) as the narrative anchor that S24 extends backward in time
affects: []
key_files:
  - index.html
  - .gsd/milestones/M008/slices/S24/S24-CONTENT-DRAFT.md
  - C:/tmp/s24-cards.html
  - C:/tmp/index.html.bak-s24
key_decisions:
  - Image fallback: Buenos_Aires_1790.jpg (500px, HTTP 200 confirmed) used for S24-1 because the Isola litograph (File:Encarnacion_Ezcurra_Isola.jpg) is missing from Wikimedia Commons
  - S24-2 runs without card-image block, mirroring the S23-2 no-image pattern for interpretive companion cards
  - data-certeza="opinión" (entity-encoded as opini&#xF3;n) for S24-2, consistent with D057 for historiographic interpretation cards
  - Scope boundary check false positive documented: EOF-bounded Node.js sweep catches banned terms in pre-existing SP3-x cards; tight-boundary check (S24-1 start to S24-2 article end) confirms SCOPE_PASS
  - Lynch caps. 1–2 consumed for S24-1 citation (pre-Rosas social context); Ramos Mejía 1907 and Lynch cap. 2 for S24-2 two-position nota
patterns_established:
  - Tight-boundary scope check (data-id S24-1 to end of S24-2 article) is the reliable method when banned terms exist in later-section cards
  - Two-position card-nota-historiografica format for S24-2 mirrors S23-2 (personal-character vs. political-project framing)
observability_surfaces:
  - grep -c 'data-certeza' index.html → 93
  - grep -c 'data-id="S24-' index.html → 2
  - grep -c 'card-nota-historiografica' index.html → 12
  - grep -c 'cards will be appended here' index.html → 1
  - git diff --name-only HEAD -- styles.css app.js → (empty)
  - C:/tmp/index.html.bak-s24 — pre-splice backup
drill_down_paths:
  - .gsd/milestones/M008/slices/S24/tasks/T01-SUMMARY.md
  - .gsd/milestones/M008/slices/S24/tasks/T02-SUMMARY.md
duration: ~25m
verification_result: passed
completed_at: 2026-03-23
---

# S24: Encarnación Ezcurra antes de Rosas — ¿era conocida?

**Two cards delivered into #periodo-rosas: a biographical hecho card (S24-1) covering Encarnación's family origin, education, and 1813 marriage, and a two-position historiographic debate card (S24-2) on whether her influence was structurally autonomous or built in function of Rosas's project — closing M008 with data-certeza=93 and card-nota-historiografica=12.**

## What Happened

T01 authored `S24-CONTENT-DRAFT.md` with all biographical facts researched and entity-encoded T02 Recipe HTML for both cards. The Isola litograph (`File:Encarnacion_Ezcurra_Isola.jpg`) was confirmed missing from Wikimedia Commons via the API, so the plan's fallback was executed: `Buenos_Aires_1790.jpg` (500px thumb, confirmed HTTP 200) was used as the S24-1 image — a colonial Buenos Aires cityscape from ca. 1790, the era of Encarnación's birth. ENTITY_PASS and SCOPE_PASS were confirmed on the draft before T02 began.

T02 spliced both cards into `index.html` before the `<!-- S10–S24 cards will be appended here by subsequent slices -->` marker using the established Node.js line-splice pattern. Pre-splice data-certeza count was 91; post-splice it reached 93. All six substantive verification checks passed. The spec's EOF-bounded scope check produced a false positive (banned terms in pre-existing SP3-x cards that follow S24 in the DOM); a tight-boundary check scoped to the S24 article block confirmed SCOPE_PASS — this false-positive pattern was documented in KNOWLEDGE.md.

## Verification

All slice-level checks pass:

| Check | Command | Result |
|-------|---------|--------|
| data-certeza count | `grep -c 'data-certeza' index.html` | **93** ✅ |
| S24 cards present | `grep -c 'data-id="S24-' index.html` | **2** ✅ |
| Append marker intact | `grep -c 'cards will be appended here' index.html` | **1** ✅ |
| Nota count | `grep -c 'card-nota-historiografica' index.html` | **12** ✅ |
| No CSS/JS changes | `git diff --name-only HEAD -- styles.css app.js` | **(empty)** ✅ |
| Backup exists | `test -s C:/tmp/index.html.bak-s24` | exit 0 ✅ |
| Scope (tight) | Node.js tight-boundary check | **SCOPE_PASS** ✅ |

S24-1 card structure confirmed: `card-hecho`, `data-certeza="hecho"`, `--reveal-delay: 0ms`, Buenos Aires 1790 image, year span `1795–1813`, all non-ASCII entity-encoded.

S24-2 card structure confirmed: `card-opinion`, `data-certeza="opini&#xF3;n"`, `--reveal-delay: 80ms`, no card-image block, two-position `card-nota-historiografica` citing Ramos Mejía (1907) and Lynch cap. 2 (1981).

## New Requirements Surfaced

- none

## Deviations

- **Scope boundary check false positive:** The spec's `f.slice(f.indexOf('S24-1'))` EOF-bounded check reported SCOPE_FAIL. Root cause: the S24 cards appear before SP3-x cards in the DOM, and SP3-x cards contain `Mazorca`, `Caseros`, and `Sociedad Popular Restauradora` which are on the banned list. The tight-boundary check confirmed the S24 card block is clean. This is a verification design issue, not a content issue. Documented in KNOWLEDGE.md.

- **Image:** Isola litograph missing from Commons as anticipated; plan's fallback (`Buenos_Aires_1790.jpg`, ca. 1790) executed exactly. The fallback is ca. 1790 rather than the plan's suggested 1800–1815 range, but is the correct era and confirmed available.

## Known Limitations

- No portrait of Encarnación Ezcurra from her pre-Rosas years is available on Wikimedia Commons. The Buenos Aires cityscape fallback contextualizes the era without depicting the subject. A future slice or content refresh could add a portrait if one surfaces (e.g., if Wikimedia Commons acquires the Isola litograph).
- The correspondence corpus that documents Encarnación's political activity (letters to Rosas) is always mediated through her role as reporter to Rosas — making the autonomous-agency question irresoluble from documentary evidence alone. S24-2 surfaces this explicitly.

## Follow-ups

- M008 is now complete. All 16 slices (S09–S24) have been delivered. The reassess-roadmap agent should review the milestone as a whole.
- Lynch caps. 1–2 and cap. 9 (Caseros) remain uncited across M008 slices. These are available for any future milestone that covers Rosas's fall or the pre-1820 context.

## Files Created/Modified

- `index.html` — S24-1 and S24-2 spliced before append marker; data-certeza=93; card-nota-historiografica=12
- `.gsd/milestones/M008/slices/S24/S24-CONTENT-DRAFT.md` — full draft with prose and entity-encoded T02 Recipe HTML
- `C:/tmp/s24-cards.html` — extracted card HTML (temp, not committed)
- `C:/tmp/index.html.bak-s24` — pre-splice backup (temp, not committed)
- `.gsd/KNOWLEDGE.md` — appended scope boundary false positive pattern entry

## Forward Intelligence

### What the next slice should know
- S24 closes M008. The `#periodo-rosas` container is now fully populated with S09–S24 cards. The append marker `<!-- S10–S24 cards will be appended here by subsequent slices -->` is still present in index.html (by design — it was never removed, only used as an insertion anchor). Any future milestone adding cards to this section can use it the same way.
- Lynch caps. 1–2 (pre-Rosas social context) and cap. 9 (Caseros) are the remaining uncited chapters from *Argentine Dictator* (1981). If any future slice covers the fall of Rosas or Urquiza's campaign, cap. 9 is the right citation target.
- The `Buenos_Aires_1790.jpg` fallback image for S24-1 is a colonial cityscape (not a portrait). If the Isola litograph or any other Encarnación portrait becomes available on Wikimedia Commons, it is a drop-in replacement for the S24-1 card image with no structural changes needed.

### What's fragile
- **Scope boundary EOF-sweep check** — any future check that uses `f.indexOf('SXX-1')` to EOF will hit false positives if banned terms exist in later-section cards within the same HTML file. Always use tight-boundary checks scoped to the target article block.
- **Append marker wording** — the marker `<!-- S10–S24 cards will be appended here by subsequent slices -->` is now semantically stale (all S10–S24 cards have been appended). It should be treated as an insertion anchor, not a live instruction, for any future additions.

### Authoritative diagnostics
- `grep -c 'data-certeza' index.html` → 93 is the canonical count for M008 complete state.
- `grep -c 'card-nota-historiografica' index.html` → 12 is the canonical nota count.
- `grep -n 'data-id="S24-' index.html` → lines 2063 and 2083 (post-splice position; will shift if cards are added before this point).

### What assumptions changed
- **Isola litograph availability:** T01-PLAN assumed the litograph might be on Commons; it was confirmed missing. The fallback was planned and executed cleanly — no unplanned investigation needed.
- **EOF-bounded scope check:** The spec assumed the scope check would run cleanly against the full file. In a section with 16 slices of accumulated content, pre-existing cards from later slices create false positives. The tight-boundary pattern is now the established correct method.
