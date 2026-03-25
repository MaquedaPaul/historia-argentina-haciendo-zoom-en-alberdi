---
id: S02
parent: M007
milestone: M007
provides:
  - 4 biographical cards (BIOG-5..BIOG-8) integrated into #rev-alberdi-formacion in index.html
  - S02-CONTENT-DRAFT.md with 4 verified biographical blocks ready for narrative continuation
  - Baseline post-S02: data-certeza=42, card-nota-certeza=10, reveal elements=61, SubNav links=5
  - Two material corrections to M007-CONTEXT.md planning document (first employment; Cané friendship date)
requires:
  - slice: S01
    provides: "#rev-alberdi-formacion sub-period with events-grid--certeza and BIOG-1..4; sub-nav link; baseline data-certeza=38; reveal element count=57"
affects:
  - S03
key_files:
  - index.html
  - .gsd/milestones/M007/slices/S02/S02-CONTENT-DRAFT.md
key_decisions:
  - "BIOG-7 content: verified first employment is 'dependiente en tienda de Maldes', NOT 'copista en escribanía' (M007-CONTEXT planning error corrected against Mi vida privada)"
  - "Alberdi–Cané friendship: begins 1824 at the Colegio, 13 years before the Salón Literario — confirmed as BIOG-5 fact, no card-nota-certeza needed"
  - "BIOG-8 classified as card-opinion: its central claim (law as political instrument) is a historiographic reading, not a primary-source statement about motivation"
  - "Colegio de Ciencias Morales founded ca. 1818 (not 1823 as M007-CONTEXT stated); four law institutions disambiguated"
patterns_established:
  - "Node.js line-split/splice on CRLF files: split on \\r\\n, find insertion index, splice, rejoin with \\r\\n — avoids heredoc fragility (per KNOWLEDGE.md)"
  - "Three-layer gate: (1) quantitative shell/node checks, (2) browser JS console signals, (3) manual narrative coherence read — all three required for slice exit"
  - "Mixed stagger temporal overlap: BIOG-6 (ca. 1825–1826) and BIOG-7 (ca. 1825–1832) overlap intentionally — simultaneous/consecutive events narrated in separate thematic cards"
observability_surfaces:
  - "grep -c 'data-certeza' index.html → 42 (post-S02 baseline)"
  - "grep -c 'card-nota-certeza' index.html → 10 (post-S02 baseline)"
  - "document.querySelectorAll('.reveal').length → 61"
  - "document.querySelectorAll('#rev-alberdi-formacion [data-certeza]').length → 8 (4 S01 + 4 S02)"
  - "[Reveal] Initialized with 61 elements (JS console)"
  - "[SubNav] Initialized with 5 sub-periods, 5 links (JS console — invariant, S02 adds no nav link)"
drill_down_paths:
  - .gsd/milestones/M007/slices/S02/tasks/T01-SUMMARY.md
  - .gsd/milestones/M007/slices/S02/tasks/T02-SUMMARY.md
  - .gsd/milestones/M007/slices/S02/tasks/T03-SUMMARY.md
duration: ~2h30m (T01 ~90min, T02 ~25min, T03 ~15min)
verification_result: passed
completed_at: 2026-03-20
---

# S02: De Tucumán a Buenos Aires — primeros pasos (1824–1833)

**4 verified biographical cards (BIOG-5..BIOG-8) integrated into #rev-alberdi-formacion, extending Alberdi's biographical arc from his 1824 arrival in Buenos Aires through his 1834 law degree — with two material corrections to planning assumptions and a full three-layer verification pass.**

## What Happened

S02 followed the same three-task structure established in S01: research and draft first (T01), HTML integration second (T02), verification gate third (T03).

**T01 (Research — ~90min):** Investigated the four biographical blocks (BIOG-5..BIOG-8) using web sources that cite *Mi vida privada* (Alberdi, ca. 1872–82) directly, plus the academic paper by Yanzi Ferreira (ANCMYP, 2002). Two material corrections to the M007-CONTEXT planning document emerged:

- **First employment**: The planning document said "copista en escribanía". No source supports this. *Mi vida privada* (via cervantesvirtual.com) names the actual employer: "la casa de comercio de un amigo nuestro, don J. B. Maldes, que había sido dependiente de mi padre en Tucumán." All secondary sources confirm: dependiente in a tienda de comercio, not a copyist in a notary's office. BIOG-7 uses the verified fact.

- **Alberdi–Cané friendship**: The S02 plan asked whether the relationship predated the 1837 Salón Literario and flagged it as uncertain. Multiple sources (JURSOC UNLP PDF, elhistoriador.com.ar, larramendi.es academic study) confirm the friendship began in 1824 when they were "compañeros de banco" at the Colegio de Ciencias Morales — 13 years before the Salón. Reported as a confirmed fact in BIOG-5, no epistemic flag required.

Additional research clarified the institutional history: the Colegio de Ciencias Morales was established ca. 1818 (not 1823 as M007-CONTEXT stated), and four distinct institutions must not be conflated — Colegio (secondary), UBA Facultad de Leyes (theory), Universidad de Córdoba (where the degree was granted, 24 May 1834), and the Academia de Jurisprudencia Teórica Práctica (practical training, post-1834). This disambiguation appears explicitly in BIOG-8.

**T02 (Integration — ~25min):** Used the Node.js line-split/splice approach (per KNOWLEDGE.md) to insert four cards after BIOG-4's closing `</article>` tag on line 439, using CRLF-safe file handling. All `[INCIERTO]` and `[PARÁFRASIS]` flags from the draft were rendered as `<span class="card-nota-certeza">` inline notes in HTML. No `[VERIFICACIÓN PENDIENTE]` content was used in any card — specifically, the unverified "copista en escribanía" claim was correctly omitted.

BIOG-8 was classified as `card-opinion` (not `card-hecho`) because its central claim — that Alberdi studied law as a political instrument rather than from legal vocation — is a historiographic reading attributable to biographers and to Alberdi's later works, not a direct primary-source statement about his motivation at the time. The factual scaffolding (dates, institutions, degree) is solid; the framing is interpretive. A single card can only carry one certeza class; `card-opinion` is the honest classification.

**T03 (Verification gate — ~15min):** All seven slice-level checks (V1–V7) passed without requiring any corrections. T02 had integrated the cards correctly on the first attempt. Browser verification confirmed `[Reveal] Initialized with 61 elements` and `[SubNav] Initialized with 5 sub-periods, 5 links` in the JS console. The narrative transition from BIOG-4 ("la beca que, en 1824, llevaría al joven tucumano a Buenos Aires") to BIOG-5 ("En 1824, con 14 años, Juan Bautista Alberdi emprendió el viaje") is seamless. Apéndice T03 was added to the draft with a full epistemic audit table.

## Verification

All V1–V7 slice checks and all browser observability checks passed:

| Check | Result | Value |
|-------|--------|-------|
| V1 — data-certeza count ≥42 | ✅ pass | 42 |
| V2 — keywords present ≥2 times | ✅ pass | 6 occurrences |
| V3 — BIOG-[5678] comments ≥4 | ✅ pass | 4 |
| V4 — #rev-alberdi-formacion delimited correctly | ✅ pass | open L344, close L544, BIOG-8 on L517 |
| V5 — card-nota-certeza count ≥4 | ✅ pass | 10 |
| V6 — no CSS/JS changes | ✅ pass | empty diff |
| V7 — draft exists, BIOG-5..8 in HTML ≥4 | ✅ pass | 4 |
| OBS — reveal elements in DevTools | ✅ pass | 61 |
| OBS — #rev-alberdi-formacion [data-certeza] | ✅ pass | 8 |
| OBS — SubNav links | ✅ pass | 5 (invariant) |
| OBS — [Reveal] console signal | ✅ pass | present |
| OBS — [SubNav] console signal | ✅ pass | present |
| NAR — BIOG-4→5 transition | ✅ pass | seamless |
| NAR — BIOG-6/7 temporal overlap | ✅ pass | intentional, narratively correct |

## New Requirements Surfaced

None. S02 deepens existing requirements (R011 Alberdi as narrative thread, R012 historical rigor, R013 certeza system) without surfacing gaps that would require new requirements.

## Deviations

1. **"Copista en escribanía" corrected to "dependiente en tienda de Maldes"**: The task plan preserved the M007-CONTEXT framing. Research found no source supporting "copista" — *Mi vida privada* names the Maldes commercial house explicitly. BIOG-7 uses the verified datum.

2. **Alberdi–Cané resolved as confirmed fact (not uncertain)**: The plan asked to flag the Cané friendship date as uncertain if pre-1837 evidence was weak. It was strong — multiple independent sources confirm 1824. No `card-nota-certeza` flag added for this element.

3. **BIOG-8 classified as card-opinion (not mixed hecho/opinión)**: The plan described a "mixed" classification approach. A single HTML article element cannot carry two certeza values. The card's narrative center of gravity is interpretive, so `card-opinion` is the honest classification. The factual dates/institutions remain in the card body.

## Known Limitations

- 2 `VERIFICACIÓN PENDIENTE` items remain in `S02-CONTENT-DRAFT.md`: (1) whether "copista en escribanía" appears in a different passage of *Mi vida privada* not accessible via the cervantesvirtual.com extract; (2) the exact year Alberdi abandoned the internado (ca. 1825–1826 is the supported range, but no source gives a precise year). Both are rendered as `card-nota-certeza` spans in the HTML — visible to readers, not silent omissions.
- The BIOG-4 `card-nota-certeza` flag (father's death date ca. 1822, S01 unresolved) remains open — this is a S01 issue documented in T03's audit table, not a S02 regression.
- BIOG-8 covers events through 1834 (degree in Córdoba) and briefly references the post-return Academia de Jurisprudencia. The S03 plan opens with the 1833 return to Tucumán — there is a slight temporal overlap between BIOG-8 and S03's opening. S03 should position its first card as beginning in Tucumán (1833) rather than repeating the Córdoba degree narrative.

## Follow-ups

- The "copista en escribanía" claim should be verified against a complete digitized edition of *Escritos póstumos* t. I — if it does appear, it could represent a second period of employment not captured by the Maldes story.
- The exact year of internado abandonment (precise date within the 1825–1826 window) could be resolved against Mayer, *Alberdi y su tiempo* (Buenos Aires, 1973) — a specialized biography that may have primary-source precision.
- BIOG-6 quote ("Me fue imposible soportar la disciplina") should be verified against the full *Escritos póstumos* t. I text before being promoted from `[PARÁFRASIS]` to a direct quote.

## Files Created/Modified

- `index.html` — 4 biographical cards (BIOG-5..BIOG-8) inserted after BIOG-4 in `#rev-alberdi-formacion .events-grid--certeza`; data-certeza raised from 38 → 42; card-nota-certeza raised from 4 → 10; reveal elements raised from 57 → 61; no changes to styles.css or app.js
- `.gsd/milestones/M007/slices/S02/S02-CONTENT-DRAFT.md` — created in T01 (4 verified blocks + appendices); Apéndice T03 added (epistemic audit table, observability baseline, coherence table, V1–V7 verdicts)
- `.gsd/milestones/M007/slices/S02/S02-PLAN.md` — V7 failure-path diagnostic check added to Verification section; T01, T02, T03 marked [x]
- `.gsd/KNOWLEDGE.md` — 3 new entries added: Alberdi's first employment (Maldes, not escribanía); Cané friendship dating (1824); law training institution disambiguation (4 institutions)

## Forward Intelligence

### What the next slice should know

- **S03 opens in Tucumán, 1833**: BIOG-8 closes with Alberdi's degree in Córdoba (24 May 1834) and brief mention of the Academia de Jurisprudencia. S03's first card should anchor in Tucumán (1833 return under Felipe's direction) rather than resuming from Buenos Aires — the S02/S03 boundary is a geographic change, not just a temporal one.
- **Alejandro Heredia** (gobernador de Tucumán 1832–1838) is the key political figure for S03. Alberdi's relationship with Heredia is mentioned in S02 planning as a "risk:medium" research task — start with secondary sources on Heredia's administration.
- **The Academia de Jurisprudencia** appears at the tail of BIOG-8 as a post-1834 institution. S03 may need to extend this thread if Alberdi's practical legal training interleaves with the Tucumán period.
- **Mariquita Sánchez de Thompson** appears in BIOG-7 as the person who rented Alberdi a room and had a piano he used. She is a well-documented historical figure (1786–1868) and a plausible bridge character for S03 if her salon connections are relevant.
- **Miguel Cané (padre)** is established as a friendship from 1824. S03 should not re-introduce him as a new acquaintance — reference him as an existing friend when needed.

### What's fragile

- **BIOG-8 card-opinion classification** — future editors may want to convert this to `card-hecho` if they find a direct Alberdi quote about studying law for political reasons. The current classification is epistemically honest; changing it requires a verified primary-source quote, not just a biographical paraphrase.
- **BIOG-6 quote attribution** — "Me fue imposible soportar la disciplina" is used with hedged attribution ("escribiría después en sus memorias"). If the full *Escritos póstumos* text is ever consulted and this phrase is not found verbatim, the card needs editing to remove the implied direct quote.

### Authoritative diagnostics

- `grep -n 'BIOG-[1-8]' index.html` — lists all biographical cards by identifier; the authoritative way to check card sequence integrity before any S03 insertion
- `grep -c 'data-certeza' index.html` — quantitative card count; post-S02 baseline is 42; any S03 insertion must raise this
- `document.querySelectorAll('.card-nota-certeza').length` — post-S02 baseline is 10; use to verify that new S03 cards don't accidentally drop existing flags
- `[Reveal] Initialized with N elements` in JS console — post-S02 baseline is 61; N should increase by the number of new S03 cards

### What assumptions changed

- **"Colegio de Ciencias Morales fundado en 1823"** → actually founded ca. 1818 (under a different name, reorganized later). Do not cite 1823 in any S03 content.
- **"Felipe organized a beca through political connections in 1824"** → more precisely, the beca was managed under the administration of governor Martín Rodríguez. The 1824 year is confirmed with high confidence; the exact mechanism of the scholarship is less precisely documented.
- **"Copista en escribanía"** → "dependiente en tienda de Maldes". If this matters for S04's multifaceted profile card, the facet-list should not include "copista/escribano" as an early role — it isn't documented.
