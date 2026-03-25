---
id: T02
parent: S02
milestone: M007
provides:
  - 4 biographical cards (BIOG-5..BIOG-8) integrated into #rev-alberdi-formacion in index.html
key_files:
  - index.html
key_decisions:
  - BIOG-8 classified as card-opinion (data-certeza="opinion") because its primary narrative claim — that Alberdi studied law as a political instrument, not from legal vocation — is a historiographic reading, not a primary-source fact
patterns_established:
  - Node.js line-by-line insertion for CRLF files: split on \r\n, find insertion index, splice new lines, rejoin with \r\n — avoids heredoc fragility documented in KNOWLEDGE.md
observability_surfaces:
  - "[Reveal] Initialized with N elements — N should be 61 (pre-S02: 57)"
  - "document.querySelectorAll('#rev-alberdi-formacion [data-certeza]').length — should be 8 (4 S01 + 4 S02)"
  - "grep -c 'BIOG-[5678]' index.html — should be 4"
  - "grep -c 'data-certeza' index.html — should be 42"
duration: ~25min
verification_result: passed
completed_at: 2026-03-20
blocker_discovered: false
---

# T02: Integrar cards S02 en index.html

**Integrated 4 verified biographical cards (BIOG-5..BIOG-8) into #rev-alberdi-formacion, raising data-certeza count from 38 to 42 and reveal element count from 57 to 61.**

## What Happened

Read `S02-CONTENT-DRAFT.md` (produced by T01) and extracted the `Cita-HTML` blocks for each of the 4 biographical blocks. Used the Node.js line-split/splice approach (per KNOWLEDGE.md) to insert after line 439 (BIOG-4's `</article>`) in the CRLF-encoded `index.html`, handling Windows line endings correctly.

Each card was written to a temp file first, then spliced in as a single atomic Node.js write operation. The four cards follow the established S01 template exactly:
- BIOG-5 (`card-hecho`, 320ms): Viaje 1824 — Colegio de Ciencias Morales, compañero Miguel Cané
- BIOG-6 (`card-hecho`, 400ms): Abandono del internado ca. 1825–1826 — disciplina insoportable
- BIOG-7 (`card-hecho`, 480ms): Tienda de Maldes, Volney, piano de Mariquita, folletos musicales 1832
- BIOG-8 (`card-opinion`, 560ms): Retorno a estudios → Bachiller en Córdoba (24 may. 1834) → Academia de Jurisprudencia

BIOG-8 was classified as `card-opinion` rather than `card-hecho` because the card's central claim (law as political instrument, not vocational choice) is a historiographic reading attributed to biographers and to Alberdi's later works (*Fragmento preliminar*, 1837; *Bases*, 1852), not a direct primary-source statement about his motivation. The factual scaffolding (dates, institutions) is solid, but the framing is interpretive — `card-opinion` with `card-opinion__attribution` footer is the correct epistemic classification.

All `[INCIERTO]` and `[PARÁFRASIS]` flags from the draft are rendered as `<span class="card-nota-certeza">` inline notes in the final HTML. No data from `[VERIFICACIÓN PENDIENTE]` items was used in any card (the "copista en escribanía" datum was correctly omitted; the verified tienda de Maldes employment is used instead).

## Verification

All slice-level checks (V1–V7) pass:

- V1: `data-certeza` count = 42 ✅ (38 baseline + 4 new)
- V2: keywords (Ciencias Morales, jurisprudencia, internado) appear 6 times in non-comment HTML ✅ (threshold: ≥2)
- V3: `grep -c 'BIOG-[5678]' index.html` = 4 ✅
- V4: `#rev-alberdi-formacion` has 3 correct occurrences (nav link, div-open, div-close); closing tag is on line 544, after BIOG-8 on line 517 ✅
- V5: `grep -c 'card-nota-certeza' index.html` = 10 ✅ (≥4 required; 4 from S01 + 6 new inline epistemic flags)
- V6: `git diff --stat HEAD -- styles.css app.js` = empty (only `index.html` changed) ✅
- V7: draft exists, 2 pending items (expected — these are open research questions not blocking HTML integration), BIOG-5..8 appear 4 times in HTML ✅

Browser observability: `document.querySelectorAll('#rev-alberdi-formacion [data-certeza]').length` = 8 (4 from S01 + 4 new). Total `.reveal` elements = 61 (up from 57). `[Reveal] Initialized with 61 elements` expected in console.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| V1 | `node -e "...match(/data-certeza/g)...n>=42?0:1"` | 0 | ✅ pass | <1s |
| V2 | `grep -E 'Ciencias Morales\|copista\|jurisprudencia\|internado' index.html \| grep -v '^\s*<!--' \| wc -l` | 0 (count=6) | ✅ pass | <1s |
| V3 | `grep -c 'BIOG-[5678]' index.html` | 0 (count=4) | ✅ pass | <1s |
| V4 | `grep -n 'rev-alberdi-formacion' index.html` | 0 (3 lines; close on 544 after BIOG-8 on 517) | ✅ pass | <1s |
| V5 | `grep -c 'card-nota-certeza' index.html` | 0 (count=10) | ✅ pass | <1s |
| V6 | `git diff --stat HEAD -- styles.css app.js` | 0 (empty) | ✅ pass | <1s |
| V7 | `node -e "...draftExists + biogCount>=4..."` | 0 | ✅ pass | <1s |
| OBS | `node -e "total .reveal elements"` | 0 (count=61) | ✅ pass | <1s |
| OBS2 | `data-certeza in #rev-alberdi-formacion` | 0 (count=8) | ✅ pass | <1s |

## Diagnostics

To inspect this task's output in future:
```bash
# Quantitative sanity checks
node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.match(/data-certeza/g); console.log('data-certeza count:', m?m.length:0);"
grep -n 'BIOG-[5678]' index.html
grep -n 'rev-alberdi-formacion' index.html

# Verify reveal classes on new cards
grep -A2 'BIOG-[5678]' index.html | grep 'reveal-slide'

# Verify stagger delays
grep -A2 'BIOG-[5678]' index.html | grep 'reveal-delay'

# Verify card-nota-certeza (epistemic flags visible to readers)
grep -n 'card-nota-certeza' index.html

# Browser DevTools check
document.querySelectorAll('#rev-alberdi-formacion [data-certeza]').length  // expect 8
document.querySelectorAll('.reveal').length  // expect 61
```

Failure shapes:
- If `data-certeza` count is 38: cards were not inserted — check insertion point logic
- If count is 39–41: partial insertion — one or more temp files failed to write
- If `[Reveal] Initialized with N elements` shows N<61: card HTML is missing the `reveal` class
- If BIOG-8 renders as a hecho card: the certeza classification was overridden — check `data-certeza="opinion"` on article

## Deviations

- **BIOG-8 classified as `card-opinion`** — the plan listed it as mixed certeza (`hecho` for dates/institutions, `opinión` for motivation). A single card can only carry one certeza class. Since the card's framing centers on the historiographic interpretation (law as political instrument), `card-opinion` with an attribution footer was chosen. The factual dates are still present; the classification reflects the card's epistemic weight.

## Known Issues

- 2 `VERIFICACIÓN PENDIENTE` items remain in `S02-CONTENT-DRAFT.md` (one about "copista en escribanía" possibly appearing in a different passage of *Mi vida privada*; one about the exact year of abandono del internado). Both are documented inline as `card-nota-certeza` spans in the HTML. Neither blocks this task or the next slice.

## Files Created/Modified

- `index.html` — 4 biographical cards (BIOG-5..BIOG-8) inserted after BIOG-4 in `#rev-alberdi-formacion .events-grid--certeza`; data-certeza count raised from 38 to 42; total reveal elements raised from 57 to 61; no changes to styles.css or app.js
