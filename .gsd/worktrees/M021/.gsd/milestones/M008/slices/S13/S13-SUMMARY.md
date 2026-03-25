---
id: S13
parent: M008
milestone: M008
provides:
  - Two card-hecho articles at #periodo-rosas narrating (1) the 1828–1829 crisis that brought Rosas to power and (2) his first mandate 1829–1832 with explicit Campaña del Desierto nuance
  - data-certeza count raised from 69 to 71
  - S13-CONTENT-DRAFT.md with full card prose and verbatim T02 Recipe HTML block
requires:
  - slice: S12
    provides: Map of fragmented power and caudillo context that makes Rosas's rise legible
affects:
  - S14  # second mandate — builds directly on the first-mandate narrative established here
  - S20  # Dorrego fusilamiento — S13-1 covers the 1828–1829 crisis; S20 will deepen the Dorrego angle
key_files:
  - index.html
  - .gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md
key_decisions:
  - Both cards use data-certeza="hecho" — the 1828–1832 factual narrative has no historiographic ambiguity requiring debatido/rumor certeza
  - Campaña del Desierto (1833) nuance placed explicitly in S13-2 prose body — Rosas commanded it as military officer under Governor Balcarce, not as governor; this is a common misconception
  - Stagger delays reset to 0ms/80ms — not cumulative from S12; each slice's cards form their own visual group
  - ASCII-only substring used for Node.js marker indexOf() — avoids en-dash encoding failures confirmed in S10 knowledge
  - grep -c 'S13-' returns 4 (not 2) — each card has both an HTML comment and a data-id attribute; this is a documentation discrepancy not a functional issue
patterns_established:
  - Cards include both <!-- S13-X: ... --> HTML comments AND data-id="S13-X" attributes — grep -c 'S13-' now returns 2× card count, not 1×; downstream verification commands must account for this
  - Content draft → verbatim splice workflow confirmed again: T01 writes exact HTML, T02 does zero authorship — zero errors in either task
observability_surfaces:
  - grep -c 'data-certeza' index.html (71 post-S13; S14 target = 73)
  - grep -c 'S13-' index.html (4 = 2 cards confirmed)
  - grep -c 'cards will be appended here' index.html (must remain 1)
  - git diff --name-only HEAD -- styles.css app.js (must remain empty)
  - test -f C:/tmp/s13-cards.html — temp artifact for failure inspection
  - test -f C:/tmp/index.html.bak-s13 — recovery backup
drill_down_paths:
  - .gsd/milestones/M008/slices/S13/tasks/T01-SUMMARY.md
  - .gsd/milestones/M008/slices/S13/tasks/T02-SUMMARY.md
duration: 14m (T01: 8m + T02: 6m)
verification_result: passed
completed_at: 2026-03-23
---

# S13: El primer gobierno de Rosas — cómo llegó al poder

**Two verified card-hecho articles spliced into #periodo-rosas: S13-1 narrates the Dorrego fusilamiento and 1828–1829 civil war that put Rosas in power; S13-2 narrates the first mandate (1829–1832) with the explicit nuance that the Campaña del Desierto (1833) happened after Rosas left office.**

## What Happened

**T01** loaded S13-CONTEXT.md and S13-RESEARCH.md, read the existing card HTML pattern from index.html (S11/S12 cards at lines 1620–1682), and wrote S13-CONTENT-DRAFT.md with full verified prose for both cards plus a complete T02 Recipe HTML block ready for verbatim splice. The Campaña del Desierto nuance — that Rosas commanded the 1833 desert campaign as a military officer under Governor Juan Ramón Balcarce, not as governor — was placed explicitly in the S13-2 prose body, not buried as a footnote. Sources verified: Lynch (1981 cap. 3), Saldías (1892 t. I), Halperín Donghi (1972), Zinny (1882). Images: `Juan_Manuel_de_Rosas_1829.jpg` (S13-1, PD, confirmed unused) and `Juan_Manuel_de_Rosas_by_Descalzi_oval.png` (S13-2, PD, confirmed unused).

**T02** backed up index.html to `C:/tmp/index.html.bak-s13`, wrote the T02 Recipe HTML block to `C:/tmp/s13-cards.html` via Write tool (not heredoc), confirmed the marker at line 1682, and ran a Node.js String.indexOf() splice using the ASCII-only marker substring `'cards will be appended here by subsequent slices'` — avoiding the en-dash encoding failure documented in S10. The splice reported "Spliced OK at char 143379." All five verification checks passed immediately. Browser DOM query confirmed both cards present with correct data-id and data-certeza="hecho" attributes.

## Verification

All slice-level checks passed:

| Check | Command | Result |
|-------|---------|--------|
| data-certeza count | `grep -c 'data-certeza' index.html` | **71** ✅ |
| S13 cards present | `grep -c 'S13-' index.html` | **4** ✅ (2 cards) |
| Marker intact | `grep -c 'cards will be appended here' index.html` | **1** ✅ |
| No CSS/JS drift | `git diff --name-only HEAD -- styles.css app.js` | **empty** ✅ |
| Draft non-empty | `test -s S13-CONTENT-DRAFT.md && echo OK` | **OK** ✅ |
| Browser DOM | `querySelectorAll('[data-id^="S13-"]').length` | **2** ✅ |

## New Requirements Surfaced

- None.

## Deviations

- **S13- grep count = 4, not 2:** The slice plan expected `grep -c 'S13-' index.html` = 2. The T02 Recipe HTML uses both `<!-- S13-X: ... -->` HTML comments and `data-id="S13-X"` attributes (unlike prior slices S11/S12 which only used comments), so each card produces 2 grep matches. The count of 4 correctly confirms 2 cards are present. This is a documentation discrepancy, not a functional issue. Future slice plans should document this pattern explicitly.

## Known Limitations

- None. Both cards fully deliver the slice goal.

## Follow-ups

- S14 (second mandate 1835–1852) should explicitly link back to S13-2's retirement narrative — "when Rosas returned in 1835, he demanded and received the Suma del Poder Público he had been denied in 1832."
- S20 (Dorrego fusilamiento) will deepen the Dorrego angle that S13-1 covers in summary. S20 should not duplicate S13-1's content; it should extend it with Dorrego's own perspective and the political consequences.

## Files Created/Modified

- `index.html` — Modified: 2 new card-hecho articles (S13-1, S13-2) inserted before append marker; data-certeza count = 71
- `.gsd/milestones/M008/slices/S13/S13-CONTENT-DRAFT.md` — Created: full content draft with card prose and T02 Recipe HTML block
- `C:/tmp/s13-cards.html` — Created: temporary HTML block (not committed)
- `C:/tmp/index.html.bak-s13` — Created: recovery backup (not committed)

## Forward Intelligence

### What the next slice (S14) should know

- **S13-2 explicitly established that Rosas left in December 1832 because the Legislatura refused to grant Suma del Poder Público.** S14 must explain that he demanded it as a condition for returning in 1835 — this is the narrative thread that makes the Suma acquisition in S14 feel earned, not arbitrary.
- **The Campaña del Desierto (1833) happened between S13 and S14** — while Rosas was out of the governorship but commanding the desert campaign as a military officer under Balcarce. S14 should briefly anchor to this: Rosas returned from the campaign with enormous prestige that made his 1835 electoral win inevitable.
- **Both S13 image files are now in use** — `Juan_Manuel_de_Rosas_1829.jpg` (S13-1) and `Juan_Manuel_de_Rosas_by_Descalzi_oval.png` (S13-2). S14 needs different Rosas images. Candidates: `Retrato_de_Juan_Manuel_de_Rosas.jpg` or period portraits from the 1840s.
- **data-certeza target for S14:** current count = 71; S14 adds ≥2 cards → expected count ≥ 73. Adjust T02 verification target accordingly.
- **Stagger delays:** S14 cards should reset to 0ms / 80ms (same as S13) — not cumulative.

### What's fragile

- **The append marker** (`<!-- S10–S24 cards will be appended here by subsequent slices -->`) must remain intact at exactly one occurrence. Each slice must confirm this before and after splice.
- **grep -c 'S13-' = 4 pattern** — if a future agent writes a verification command expecting `grep -c 'SXX-' = 2` for 2 cards, it will fail for S13-style cards (with data-id attrs). Document the 2× multiplier in S14+ slice plans.

### Authoritative diagnostics

- `grep -c 'data-certeza' index.html` — primary card count signal; increment by 2 per S14 slice.
- `grep -c 'cards will be appended here' index.html` — must stay at 1 indefinitely.
- `test -f C:/tmp/index.html.bak-s13` — recovery point for S13 state; do not overwrite before S14 is confirmed working.

### What assumptions changed

- **Expected grep-c 'S13-' = 2** — actually 4. The data-id attribute pattern doubles the match count. This is now documented in KNOWLEDGE.md so S14+ plans can set the right expectation.
