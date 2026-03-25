# S07: Por qué Alberdi rechazó el viaje a EE.UU. financiado por Quiroga

**Goal:** Deliver two new cards (BIOG-21 `card-hecho`, BIOG-22 `card-opinion`) inside a new thematic block within `#rev-alberdi-quiroga`, fulfilling the explicit promise made in BIOG-18's `card-nota-certeza` that "las razones del rechazo… se desarrollan en una sección posterior de este sitio." The new block covers: the documented facts of the devolution (BIOG-21) and the historiographically inferred reasons for the rejection (BIOG-22), with clear certeza classification and attribution.

**Demo:** The site shows, within the existing "Alberdi y Facundo Quiroga (1834–1835)" sub-period: a new thematic block titled "El rechazo del viaje: análisis" containing BIOG-21 (the documented episode of returning the libranza, expanded from BIOG-18's preview) and BIOG-22 (the historiographic reading of motivations, attributed to Mayer and Halperin Donghi). Both cards use existing CSS classes. No new sub-nav link. No new sub-period.

## Must-Haves

- BIOG-21 (`card-hecho`) narrates the documented episode of returning the bank draft without verbatim-repeating the quotes already used in BIOG-18 — it expands or contextualizes them.
- BIOG-22 (`card-opinion`) attributes the motivational analysis to named historians (Mayer, Halperin Donghi), never presenting inferences as facts.
- `data-certeza="opinion"` (no accent) on BIOG-22 — matches the normalized form used since M004.
- BIOG-21 and BIOG-22 go in their own thematic block (new `<h4 class="sub-period__subtitle reveal reveal-fade">` + new `<div class="events-grid events-grid--certeza">`), NOT appended to the Quiroga thematic block (BIOG-19 + BIOG-20).
- No new sub-nav link added; `sub-nav__link` count remains 6.
- No new sub-period created; `rev-alberdi-quiroga` mention count remains 3.
- Insertion is CRLF-safe (Node.js `split('\r\n')` / `splice` / `join('\r\n')` pattern).

## Verification

**Shell checks (Capa 1):**
```bash
grep -c 'data-certeza' index.html            # → 56 (was 54)
grep -c 'id="BIOG-21"' index.html            # → 1
grep -c 'id="BIOG-22"' index.html            # → 1
grep -c 'rev-alberdi-quiroga' index.html     # → 3 (unchanged)
grep -c 'sub-nav__link' index.html           # → 6 (unchanged)
```

**DOM queries (Capa 2):**
```js
document.querySelectorAll('.sub-nav .sub-nav__link').length         // → 6
document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length  // → 6 (was 4)
document.querySelectorAll('.reveal').length                          // → 79 (was 76)
document.querySelector('#BIOG-22').dataset.certeza                  // → "opinion"
```

**Narrative check (Capa 3):**
- BIOG-21 does not verbatim-repeat the two blockquotes already in BIOG-18 (extends or complements them).
- BIOG-22 clearly attributes motivational analysis to named historians — never states inferences as facts.
- The two new cards follow coherently from BIOG-18's promise.
- The closure of the sub-period still feels narratively complete.

## Tasks

- [x] **T01: Write S07-CONTENT-DRAFT.md with verified content for BIOG-21 and BIOG-22** `est:45m`
  - Why: High-risk intellectual work — nailing certeza classification and sourcing the historiographic reasons before touching HTML. The draft forces the decision on which quotes to use, how to avoid repeating BIOG-18's quotes verbatim, and how to attribute the motivational analysis to historians without fabricating sources.
  - Files: `.gsd/milestones/M007/slices/S07/S07-CONTENT-DRAFT.md`
  - Do: Draft BIOG-21 as `card-hecho` expanding the episode of the libranza devolution. Extend context (not verbatim copy) from the BIOG-18 quotes — e.g., add surrounding narrative from *Obras Completas* or *Mi vida privada* if available, or contextualize the devolution within the political situation of late 1834. Draft BIOG-22 as `card-opinion` analyzing the four historiographically inferred reasons: (1) independence from federal patronage — Alberdi was unitario-aligned and accepting Quiroga's money would have compromised him; (2) the Buenos Aires intellectual scene was accelerating (Echeverría back from Europe 1830, Asociación de Mayo forming); (3) Europe was Alberdi's actual destination preference (his 1838 exile went to Montevideo/Chile, not the US); (4) practical timing — *Fragmento preliminar* (1837) and Salón Literario required Buenos Aires presence. Attribute these reasons to Mayer (*Alberdi y su tiempo*, EUDEBA, 1963) and/or Halperin Donghi. Add a `card-nota-certeza` if the Mayer attribution cannot be directly verified — fall back to "Alberdi's subsequent behavior as circumstantial evidence" if needed. BIOG-22 must use `data-certeza="opinion"` (no accent). No image for either card (follows BIOG-18 and BIOG-20 image-free pattern).
  - Verify: `test -f .gsd/milestones/M007/slices/S07/S07-CONTENT-DRAFT.md` and file contains both `BIOG-21` and `BIOG-22` sections with full HTML excerpts.
  - Done when: The draft contains complete HTML markup for both cards, certeza classification justified in prose, and at least one named historian attributed for BIOG-22's motivational analysis.

- [x] **T02: Integrate BIOG-21 and BIOG-22 into index.html** `est:20m`
  - Why: Splice the two-card thematic block into `index.html` immediately before `</div><!-- /#rev-alberdi-quiroga -->` using the CRLF-safe Node.js pattern.
  - Files: `index.html`, temp file for new block HTML
  - Do: (1) Pre-flight: `grep -c 'id="BIOG-21"' index.html` must return 0 — if 1, skip insertion and go directly to verification. (2) Write the new block to a temp file using the `Write` tool (no heredocs). The block structure: `<h4 class="sub-period__subtitle reveal reveal-fade" style="--reveal-delay: 0ms">El rechazo del viaje: análisis</h4>` + `<div class="events-grid events-grid--certeza" aria-label="...">` containing BIOG-21 (stagger 0ms) and BIOG-22 (stagger 80ms) + `</div>`. (3) CRLF-safe splice: `fs.readFileSync('index.html','utf8')`, `split('\r\n')`, find anchor line `</div><!-- /#rev-alberdi-quiroga -->`, `splice(anchorIndex, 0, ...newLines)`, `join('\r\n')`, `writeFileSync`. (4) Immediate check: `grep -c 'data-certeza' index.html` must return 56.
  - Verify: `grep -c 'data-certeza' index.html` → 56; `grep -c 'id="BIOG-21"' index.html` → 1; `grep -c 'id="BIOG-22"' index.html` → 1.
  - Done when: Both card IDs present exactly once, data-certeza count is 56, file integrity intact (no CRLF corruption).

- [x] **T03: Triple gate — shell + DOM + narrative verification** `est:20m`
  - Why: The three-layer gate established in S01–S06 is the slice's objective stopping condition. Shell checks prove structural integrity; DOM queries prove runtime registration; narrative check proves coherence and no regressions.
  - Files: `index.html` (read-only in this task)
  - Do: Run all Capa 1 shell checks. Open the site in browser. Run all Capa 2 DOM queries via `browser_evaluate`. Scroll through the `#rev-alberdi-quiroga` sub-period and read BIOG-21 and BIOG-22 in sequence for Capa 3 narrative check — verify: BIOG-21 doesn't verbatim repeat BIOG-18's blockquotes, BIOG-22 attributes motivations to historians, the two new cards fulfill BIOG-18's promise, sub-period closure still feels narratively complete.
  - Verify: All 5 Capa 1 shell checks pass. All 4 Capa 2 DOM queries return expected values. Capa 3 narrative checks pass (no contradictions, no fabricated sources, no regressions).
  - Done when: 14/14 checks pass (5 shell + 4 DOM + 5 narrative: BIOG-21 ≠ verbatim BIOG-18 quotes, BIOG-22 names historians, BIOG-22 uses `data-certeza="opinion"`, sub-nav count = 6, sub-period still narratively complete).

## Observability / Diagnostics

**Runtime signals after T02 integration:**
- `grep -c 'data-certeza' index.html` — must return 56; any other value indicates a missing or duplicate insertion.
- `grep -c 'id="BIOG-21"' index.html` and `grep -c 'id="BIOG-22"' index.html` — must each return 1; 0 means insertion failed, >1 means duplicate.
- Browser DOM: `document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length` — must return 6 after T02; if 4, the new cards weren't inserted inside the right section.
- Browser DOM: `document.querySelectorAll('.reveal').length` — must return 79; if 76, the new `<h4 class="reveal reveal-fade">` + two BIOG cards weren't counted.
- Browser DOM: `document.querySelector('#BIOG-22').dataset.certeza` — must return `"opinion"` (no accent); any other value indicates a certeza attribute error.

**Inspection surfaces:**
- `S07-CONTENT-DRAFT.md` — human-readable audit trail of certeza classification decisions and source attribution before HTML integration.
- Browser DevTools → Elements → `#rev-alberdi-quiroga` — visually inspect the new thematic block and cards after T02.
- Browser Console → run DOM queries in Capa 2 directly for live verification.

**Failure visibility:**
- If `data-certeza` count is 55 (not 56): one card is missing its attribute — check BIOG-22 for missing `data-certeza="opinion"`.
- If `rev-alberdi-quiroga` count changes from 3: a new sub-period was accidentally created — undo and re-insert within existing div.
- If `sub-nav__link` count changes from 6: a nav link was accidentally added — undo.
- CRLF corruption: if `index.html` renders incorrectly, re-run T02 with `split('\r\n')` / `join('\r\n')` (not `\n`).

**Redaction constraints:**
- No secrets, API keys, or credentials in this slice. All content is historiographic prose for a public educational website.

**Failure-path diagnostic check (Capa 1+):**
```bash
# If data-certeza count is wrong, identify which card is the culprit:
grep -n 'data-certeza' index.html | grep -v 'hecho\|opinion\|evidencia\|rumor'
# Expected output: empty (valid certeza values: hecho, opinion, evidencia, rumor)
# Note: two pre-existing cards carry data-certeza="rumor" — these are valid and expected.
```

**Additional failure-path checks (T03 exit gate):**
```bash
# Verify BIOG-21 and BIOG-22 are inside #rev-alberdi-quiroga (not outside):
node -e "
  const html = require('fs').readFileSync('index.html','utf8');
  const start = html.indexOf('id=\"rev-alberdi-quiroga\"');
  const end = html.indexOf('</div><!-- /#rev-alberdi-quiroga -->');
  const section = html.slice(start, end);
  console.log('BIOG-21 in section:', section.includes('id=\"BIOG-21\"'));
  console.log('BIOG-22 in section:', section.includes('id=\"BIOG-22\"'));
"
# Expected: both true

# Verify no verbatim repeat of BIOG-18 blockquotes in BIOG-21:
grep -c 'Lo visité con repetición' index.html    # → 1 (only in BIOG-18)
grep -c 'Al día siguiente le hice una visita respetuosa' index.html  # → 0 (not in BIOG-21; BIOG-21 uses paraphrase)
```

## Files Likely Touched

- `index.html`
- `.gsd/milestones/M007/slices/S07/S07-CONTENT-DRAFT.md` (new)
