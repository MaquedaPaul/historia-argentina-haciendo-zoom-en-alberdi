---
id: S01
parent: M015
milestone: M015
provides:
  - S01-CONTENT-DRAFT.md con 5 cards verificadas (GEN37-1 a GEN37-5) listas para integración HTML
requires: []
affects:
  - S02
key_files:
  - .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md
key_decisions:
  - GEN37-4 blockquote redactado como síntesis parafraseable atribuida a Mayer/Halperin Donghi — no existe una cita textual única compacta en las fuentes; la atribución doble está en el footer del blockquote
  - card-nota-certeza de GEN37-3 usa 26 junio como fecha establecida (Weinberg 1977 + BCN) con mención de la alternativa 23 junio de fuentes secundarias menores
  - Los literales de flag (VERIFICAR, PENDIENTE, TBD) no deben aparecer en ninguna forma en el draft, ni siquiera en texto descriptivo — parafrasear como "marcadores de contenido pendiente"
patterns_established:
  - Flag literals (VERIFICAR, PENDIENTE, TBD) prohibited in any form in content drafts — paraphrase instead to avoid grep false positives
  - card-nota-certeza on GEN37-3 uses <aside> wrapper (not inline <span>) for date-dispute notices — visible block-level note rather than inline flag
  - card-opinion with attributed paraphrase (not synthesized direct quote) for historiographic-reading cards where sources don't provide a single compact primary-source quote
observability_surfaces:
  - "test -f .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md"
  - "grep -c '^## GEN37-' .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md → 5"
  - "! grep -qi '[VERIFICAR]|[PENDIENTE]|TBD' .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md → 0 matches"
drill_down_paths:
  - .gsd/milestones/M015/slices/S01/tasks/T01-SUMMARY.md
duration: 15m
verification_result: passed
completed_at: 2026-03-24
---

# S01: Investigación y borrador

**Produced `S01-CONTENT-DRAFT.md` — 5 verified historiographic cards (GEN37-1 to GEN37-5) with complete HTML ready for direct splice by S02, including insertion metadata, non-duplication map, and sub-nav link.**

## What Happened

S01 had only one task: transform pre-existing research (S01-RESEARCH.md) into a structured content draft. T01 executed this as a purely editorial task in ~15 minutes.

The five cards cover the formation of the Generación del 37 from a collective perspective:

- **GEN37-1** (1830): Echeverría's return from Paris — date of 28 June 1830 fixed from Aduana register via Weinberg 1977; intellectual influences (Saint-Simon, Byron, Hugo, Goethe) documented.
- **GEN37-2** (1832–1835): Formation of the circle at Sastre's bookshop — Echeverría–Gutiérrez friendship (1834), Alberdi joining the walks (1835); primary source is *Mi vida privada*.
- **GEN37-3** (26 Jun 1837): Salón Literario inaugural — three discourses, Vicente López y Planes presiding, Echeverría absent but present via *La Cautiva*; card-nota-certeza documents the 23 vs. 26 June date discrepancy, settling on Weinberg 1977 + BCN as canonical.
- **GEN37-4** (1837): Historiographic card-opinion on the generational dynamic (Echeverría as organizing teacher; Gutiérrez, Alberdi, Vicente Fidel López as younger executors) — attributed to Mayer 1963 and Halperin Donghi 1972 as an attributed paraphrase, not a synthesized direct quote.
- **GEN37-5** (1838): Closure of the Salón under Rosas pressure, clandestine founding of the Asociación de la Joven Generación Argentina (Jul–Aug 1838), the *Dogma Socialista* — primary sources are Echeverría's *Ojeada retrospectiva* (1846) and Alberdi's Valparaíso necrological (1851).

One false-positive was caught and fixed during execution: the verification checklist at the end of the draft contained the literal strings `[VERIFICAR]` / `[PENDIENTE]` / `TBD` as descriptive text, triggering the grep validation. These were replaced with "marcadores de contenido pendiente." This established a new pattern: flag literals must not appear in any form in drafts — paraphrase them instead.

The draft also includes:
- **Metadata de inserción**: section ID `#rev-generacion-37`, exact insertion point (after line 1439 `</div><!-- /#rev-1820-1835 -->`), sub-nav HTML
- **Non-duplication map**: BIOG-11, SP2-4, SP3-3, alberdi-quote — angles documented, differentiation rationale stated
- **Complete HTML block** ready to copy: section wrapper + 5 cards with stagger delays 0ms, 80ms, 160ms, 240ms, 320ms

## Verification

All three slice-plan checks passed:

| Check | Result |
|-------|--------|
| `test -f .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md` | ✅ file exists |
| `grep -c "^## GEN37-" S01-CONTENT-DRAFT.md` | ✅ returns `5` |
| `! grep -qi "\[VERIFICAR\]\|\[PENDIENTE\]\|TBD" S01-CONTENT-DRAFT.md` | ✅ no matches |

## New Requirements Surfaced

- none

## Deviations

One deviation from the task plan: T01-PLAN.md lacked an `## Observability Impact` section, which the pre-flight check required. The section was added to S01-PLAN.md before T01 proceeded.

GEN37-4's blockquote is an attributed paraphrase (not a direct literal quote from Mayer or Halperin Donghi) because the sources do not provide a single compact primary-source statement suitable for direct quotation. The Alberdi Quote Verification Protocol ("never synthesize a direct quote") was applied to historiographic secondary sources as well.

## Known Limitations

- GEN37-4 uses an attributed paraphrase for its blockquote. A future content pass with direct access to Mayer (1963) and Halperin Donghi (1972) by pagination could upgrade this to a verified direct quote.
- S01 does not verify the current line numbers in index.html (1439 for insertion point, 330 for sub-nav). S02 must confirm these before splicing.

## Follow-ups

- S02 must verify the exact line numbers in index.html before insertion — line 1439 and line 330 are from the research phase and may have shifted if any earlier slices added content.
- S02 should check that `data-certeza` count in index.html rises from 93 to 98 after integration as a post-splice diagnostic.

## Files Created/Modified

- `.gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md` — 5 cards GEN37-1…GEN37-5 with complete HTML, insertion metadata, non-duplication map
- `.gsd/milestones/M015/slices/S01/S01-PLAN.md` — `## Observability / Diagnostics` section added (pre-flight fix); T01 marked `[x]`

## Forward Intelligence

### What the next slice should know
- The HTML block in S01-CONTENT-DRAFT.md is **complete and ready to splice** — S02 does not need to write any new HTML, only locate the correct insertion points in index.html and splice.
- The non-duplication map explains the differentiation angle: M015 cards tell the *collective* formation story from Echeverría's perspective. BIOG-11 tells the *individual Alberdi* story. S02 must not add content that blurs this distinction.
- `card-nota-certeza` on GEN37-3 uses an `<aside>` element (block-level), not an inline `<span>`. This is intentional — the date dispute is substantive enough to warrant a visible block notice. The existing styles.css does not define `.card-nota-certeza` styling, so the `<aside>` will render with default paragraph typography. S02 should verify visually and add minimal CSS if it renders awkwardly.
- `data-certeza="opinión"` (with accent) is used on GEN37-4. CSS queries must handle both `"opinion"` and `"opinión"` — this is the established normalization pattern (KNOWLEDGE.md).

### What's fragile
- **Line number references (1439, 330)** — these were accurate at research time but will shift if any content was added before this point since then. S02 must use a grep-stable anchor comment or structural marker, not raw line numbers, for the actual splice.
- **`card-nota-certeza` block styling** — no CSS rule for `.card-nota-certeza` as a block-level `<aside>` exists. The inline `<span>` pattern (used in M004) had no styling issues because inline elements inherit text styles naturally. An `<aside>` may need a few lines of CSS in S02.

### Authoritative diagnostics
- `grep -n "rev-generacion-37" index.html` — confirms whether S02's section was spliced; should return 2+ matches (opening div + close comment)
- `grep -c 'data-certeza=' index.html` — should rise from 93 to 98 after S02
- `grep -n "card-nota-certeza" index.html` — locates the date-dispute aside in the rendered page

### What assumptions changed
- **Flag literal prohibition** — originally the draft checklist was intended to use the flag strings descriptively. Discovered during verification that even descriptive use triggers the grep check. Resolved by paraphrase — this rule is now explicit and documented.
