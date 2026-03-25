---
id: S07
parent: M007
milestone: M007
provides:
  - BIOG-21 (card-hecho): documented episode of Alberdi returning Quiroga's bank draft (libranza) in late 1834, with political and contextual framing, avoiding verbatim repetition of BIOG-18's blockquotes
  - BIOG-22 (card-opinion): four historiographically inferred reasons for the rejection, explicitly attributed to Mayer (*Alberdi y su tiempo*, EUDEBA 1963) and Halperin Donghi, with card-nota-certeza making inferential nature explicit
  - Thematic block "El rechazo del viaje: análisis" (h4 + events-grid--certeza) inside #rev-alberdi-quiroga — fulfills the explicit promise in BIOG-18's card-nota-certeza
  - data-certeza count raised from 54 to 56; .reveal count raised from 76 to 79
  - BIOG-18's promise ("El análisis de esa decisión se desarrolla en una sección posterior de este sitio") visibly fulfilled by BIOG-22 in the same sub-period
requires:
  - slice: S06
    provides: Perfil de Quiroga y circunstancias del encuentro establecidas; BIOG-18's card-nota-certeza promise anchored in the HTML as insertion context
affects:
  - S08
key_files:
  - index.html
  - .gsd/milestones/M007/slices/S07/S07-CONTENT-DRAFT.md
  - tmp-s07-biog21-22.txt
key_decisions:
  - BIOG-21 uses paraphrase of Obras Completas, not verbatim blockquotes — those are reserved exclusively to BIOG-18; BIOG-21 focuses on the contextual meaning (political symbolism of returning the money) rather than retelling the narrative
  - BIOG-22 card-opinion__quote wraps four numbered reasons as <p> elements within a single blockquote, mirroring the BIOG-16 pattern established in S04
  - card-nota-certeza in BIOG-21 clarifies that "gesto de independencia" framing is historiographic interpretation, not Alberdi's own words
  - card-nota-certeza in BIOG-22 explicitly names Mayer and Halperin Donghi as sources of the four inferences — makes the inferential nature of the analysis undeniable to the reader
  - New block is a thematic synthesis block (its own h4 + events-grid) inside the existing #rev-alberdi-quiroga sub-period, NOT a new sub-period — preserves sub-nav invariant (6 links)
  - S08 territory (Salón Literario narrative, Quiroga reading Alberdi's texts) left completely untouched — BIOG-22 names the Salón only as context for reason #4, not as content
patterns_established:
  - Promise-fulfillment verification pattern: confirm that the card containing the promise (BIOG-18 card-nota-certeza) and the card delivering it (BIOG-22) are in the same sub-period DOM section; DOM query `#rev-alberdi-quiroga [data-certeza]` confirms both are inside the section
  - Reveal animation blank-card workaround for Playwright: force `opacity:1, transform:none` via browser_evaluate before visual screenshot — cards render blank in headless mode before IntersectionObserver fires
  - Failure-path diagnostic grep must include `rumor` in exclusion list: `grep -v 'hecho\|opinion\|evidencia\|rumor'` — two pre-existing rumor cards otherwise appear as false positives
observability_surfaces:
  - grep -c 'data-certeza' index.html → 56
  - grep -c 'id="BIOG-21"' index.html → 1
  - grep -c 'id="BIOG-22"' index.html → 1
  - grep -c 'rev-alberdi-quiroga' index.html → 3 (unchanged)
  - grep -c 'sub-nav__link' index.html → 6 (unchanged)
  - browser DOM: document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length → 6
  - browser DOM: document.querySelectorAll('.reveal').length → 79
  - browser DOM: document.querySelector('#BIOG-22').dataset.certeza → "opinion"
drill_down_paths:
  - .gsd/milestones/M007/slices/S07/tasks/T01-SUMMARY.md
  - .gsd/milestones/M007/slices/S07/tasks/T02-SUMMARY.md
  - .gsd/milestones/M007/slices/S07/tasks/T03-SUMMARY.md
duration: 55m (T01: 25m, T02: 15m, T03: 15m)
verification_result: passed
completed_at: 2026-03-22
---

# S07: Por qué Alberdi rechazó el viaje a EE.UU. financiado por Quiroga

**Two new cards (BIOG-21 card-hecho + BIOG-22 card-opinion) integrated inside #rev-alberdi-quiroga as a thematic synthesis block, fulfilling BIOG-18's explicit promise and delivering the complete analysis of Alberdi's rejection of Quiroga's financed US trip — verified 14/14 across shell, DOM, and narrative layers.**

## What Happened

**T01 (content draft)** began by reading BIOG-18 closely to capture the exact two verbatim blockquotes already there — ensuring BIOG-21 would not repeat them. The plan called for a `card-hecho` expanding the episode and a `card-opinion` attributing the motivational analysis to historians. The key intellectual work was distinguishing what is *documented* (the returning of the libranza, the silence of Obras Completas on reasons) from what is *inferred* (the four reasons historians propose). The draft resolved this by putting all documented facts in BIOG-21 with a card-nota-certeza flagging interpretive framing, and all inferences in BIOG-22 explicitly attributed to Mayer and Halperin Donghi. The four-reasons structure for BIOG-22 followed the BIOG-16 pattern (numbered `<p>` elements inside a single `<blockquote class="card-opinion__quote">`). The draft also confirmed the insertion anchor at line 967.

**T02 (HTML integration)** wrote the full block to a temp file (`tmp-s07-biog21-22.txt`) using the Write tool — not a bash heredoc — then used the CRLF-safe Node.js splice pattern (split `\r\n`, findIndex anchor, splice, join `\r\n`). The insertion added 127 lines before `</div><!-- /#rev-alberdi-quiroga -->`, raising the file from 1916 to 2043 lines. All five Capa 1 checks passed on first attempt. The failure-path diagnostic revealed two pre-existing `data-certeza="rumor"` entries — confirmed valid, not errors.

**T03 (triple gate)** ran all three verification layers. Shell checks (5/5) confirmed structural integrity. DOM checks (4/4) confirmed runtime registration: 6 certeza cards in the section, 79 reveal elements total, BIOG-22 carrying `data-certeza="opinion"`. Narrative checks (5/5) confirmed: BIOG-21 doesn't lift BIOG-18's blockquotes, BIOG-22 names both historians in body and attribution footer, the card-nota-certeza makes the inferential nature explicit, and the next DOM sibling after `#rev-alberdi-quiroga` is `#rev-1800-1820` (clean narrative closure). Visual screenshot with force-revealed animation confirmed BIOG-21 (left, card-hecho) and BIOG-22 (right, card-opinion with "💬 Interpretación historiográfica" badge) render side-by-side in the two-column grid.

## Verification

**14/14 triple-gate checks passed:**

| Layer | Check | Result |
|-------|-------|--------|
| Shell | `grep -c 'data-certeza' index.html` → 56 | ✅ |
| Shell | `grep -c 'id="BIOG-21"' index.html` → 1 | ✅ |
| Shell | `grep -c 'id="BIOG-22"' index.html` → 1 | ✅ |
| Shell | `grep -c 'rev-alberdi-quiroga' index.html` → 3 | ✅ |
| Shell | `grep -c 'sub-nav__link' index.html` → 6 | ✅ |
| DOM | `.sub-nav .sub-nav__link` count → 6 | ✅ |
| DOM | `#rev-alberdi-quiroga [data-certeza]` count → 6 | ✅ |
| DOM | `.reveal` count → 79 | ✅ |
| DOM | `#BIOG-22` `dataset.certeza` → `"opinion"` | ✅ |
| Narrative | BIOG-21 does not verbatim repeat BIOG-18 quote 1 | ✅ |
| Narrative | BIOG-21 does not verbatim repeat BIOG-18 quote 2 | ✅ |
| Narrative | BIOG-22 names Mayer and Halperin Donghi | ✅ |
| Narrative | BIOG-18's promise ("se desarrolla en una sección posterior") fulfilled by BIOG-22 | ✅ |
| Narrative | Sub-period closes cleanly (next sibling: #rev-1800-1820) | ✅ |

## New Requirements Surfaced

- none

## Deviations

The thematic block's `aria-label` was taken from the S07-CONTENT-DRAFT.md ("El rechazo del viaje a Estados Unidos: hechos e interpretación") rather than the plan's suggested wording ("Por qué Alberdi rechazó el viaje a Estados Unidos"). The draft's label is more descriptively precise. No functional impact.

## Known Limitations

- The historiographic attribution to Mayer (*Alberdi y su tiempo*, EUDEBA 1963) and Halperin Donghi is correct in substance, but the direct page/passage citation was not verified against digitized copies of these books. This is flagged in the card-nota-certeza visible to readers. A future agent with access to these texts could add specific page references to strengthen the citations.
- The four inferred reasons in BIOG-22 represent scholarly consensus per the secondary literature — they are not Alberdi's own stated reasons, which he never wrote. This is the correct epistemic classification.

## Follow-ups

- S08 (Los escritos de Alberdi que leyó Facundo Quiroga) can now proceed: BIOG-22 mentions the Salón Literario connection as context for reason #4, giving S08 a natural narrative entry point.
- The `data-certeza="rumor"` exclusion fix in the failure-path diagnostic grep should be propagated back to the main ROADMAP or a project-level diagnostic note — currently only patched in S07-PLAN.md.

## Files Created/Modified

- `index.html` — BIOG-21 and BIOG-22 integrated inside #rev-alberdi-quiroga; data-certeza 54→56, .reveal 76→79, lines 1916→2043
- `.gsd/milestones/M007/slices/S07/S07-CONTENT-DRAFT.md` — new: complete HTML drafts for BIOG-21 and BIOG-22, certeza justification, insertion anchor, self-check table, expected metrics
- `tmp-s07-biog21-22.txt` — insertion block audit trail (127 lines)
- `.gsd/milestones/M007/slices/S07/S07-PLAN.md` — added Observability/Diagnostics section; updated failure-path diagnostic to include `rumor`
- `.gsd/milestones/M007/slices/S07/tasks/T02-PLAN.md` — added Observability Impact section
- `.gsd/milestones/M007/slices/S07/tasks/T03-PLAN.md` — added Observability Impact section

## Forward Intelligence

### What the next slice should know
- The `#rev-alberdi-quiroga` sub-period now contains 6 data-certeza cards (BIOG-17 through BIOG-22). The closing comment `</div><!-- /#rev-alberdi-quiroga -->` is now at line 1094 (was 967 before S07). Any S08 insertion that references this anchor must re-confirm the line number with a fresh grep.
- BIOG-22's four reasons include, as reason #4: "la efervescencia del ambiente intelectual porteño (Salón Literario en formación, Echeverría de regreso desde Europa en 1830)". S08 can reference this as the logical continuation — BIOG-22 creates the entry point, S08 delivers the detail.
- The thematic block pattern (h4 + events-grid INSIDE an existing sub-period, BEFORE its closing comment) is now established in two slices (S04 and S07). S08 should decide whether it adds another thematic block to the same sub-period or opens a new sub-period — the latter requires a new sub-nav link and bumps the link count from 6.
- `data-certeza="opinion"` (no accent) is the normalized form for this project since M004. BIOG-22 uses this form. S08 cards of type opinion must also use the no-accent form.

### What's fragile
- The insertion position (before `</div><!-- /#rev-alberdi-quiroga -->`) is now used twice (S06 and S07). If S08 also inserts there, it must first confirm the actual current line via Node.js findIndex — hardcoding line numbers will cause silent misplacements.
- BIOG-22's Mayer/Halperin citations lack page numbers. If a future human editor asks for more precise sourcing, this is the card to revisit first.

### Authoritative diagnostics
- `grep -c 'data-certeza' index.html` → 56 is the single fastest health signal for S07 completion; any other value means regression.
- `node -e "const h=require('fs').readFileSync('index.html','utf8'); const s=h.slice(h.indexOf('id=\"rev-alberdi-quiroga\"'), h.indexOf('</div><!-- /#rev-alberdi-quiroga -->')); console.log(s.includes('id=\"BIOG-21\"'), s.includes('id=\"BIOG-22\"'));"` → both true confirms placement integrity.

### What assumptions changed
- Original plan expected `data-certeza` baseline at 54 before S07; confirmed correct at start of T01 and T02.
- The reveal count baseline was stated as 76 in the plan; confirmed correct before insertion (76 → 79 after).
- S07-PLAN.md's failure-path diagnostic grep pattern (`grep -v 'hecho\|opinion\|evidencia'`) was missing `rumor` — two pre-existing rumor cards were producing false-positive output. Patched in T03.
