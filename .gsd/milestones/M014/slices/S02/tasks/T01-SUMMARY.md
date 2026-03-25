---
id: T01
parent: S02
milestone: M014
provides:
  - Sección #rev-tertulias-mariquita con 6 cards (TER-1 a TER-6) insertada en index.html
  - Sub-nav link "1810–1868 Tertulias de Mariquita" operativo
  - TER-2 card-rumor con nota historiográfica visible
  - TER-4 card-hecho con card-nota-certeza inline
key_files:
  - index.html
key_decisions:
  - Node.js insert pattern (no heredoc en Windows/Git Bash) para bloques HTML largos
  - TER-3 imagen directa sin /thumb/ (imagen 321×410 no tiene miniatura 500px)
  - HTML comments en bloque insertan extras en grep count (4 vs expected 2 para rev-tertulias-mariquita) — funcionally correct
patterns_established:
  - Inserción Node.js: leer HTML como string, replace marker, writeFileSync — evita bash heredoc failures en Windows
observability_surfaces:
  - Browser console: "[DEBUG] [SubNav] Active sub-period → rev-tertulias-mariquita" confirma observer registration
  - Browser console: "[DEBUG] [Reveal] Revealed: div#rev-tertulias-mariquita" confirma stagger animations
  - JS: document.getElementById('rev-tertulias-mariquita').querySelectorAll('[data-certeza]').length → 6
  - JS: document.querySelector('.sub-nav__link--active').textContent → "1810–1868Tertulias de Mariquita" cuando en viewport
duration: 20m
verification_result: passed
completed_at: 2026-03-24
blocker_discovered: false
---

# T01: Insertar sección #rev-tertulias-mariquita en index.html y verificar

**Inserted 6-card section #rev-tertulias-mariquita (Las Tertulias de Mariquita Sánchez 1805–1868) into index.html with sub-nav link, stagger delays, TER-2 historiographic note, and TER-4 certeza note — all verified in browser via IntersectionObserver console signals.**

## What Happened

Read `S01-CONTENT-DRAFT.md` in full to extract exact excerpt text, cite HTML, image URLs, and the nota historiográfica for TER-2. Then:

1. Wrote the complete 6-card HTML block (TER-1 through TER-6) to `/tmp/ter-block.html` using the Write tool (avoiding bash heredoc which fails on Windows/Git Bash with long content — documented in KNOWLEDGE.md).

2. Inserted the block into `index.html` using Node.js: found the marker `</div><!-- /#rev-1820-1835 -->` and replaced it with itself + the new block. File size went from ~273K to ~286K bytes.

3. Added the sub-nav link after `#rev-1820-1835` using the Edit tool: `<a href="#rev-tertulias-mariquita" class="sub-nav__link">1810–1868<span class="sub-nav__link-label">Tertulias de Mariquita</span></a>`.

4. Served via `npx http-server` on port 8765 and navigated to `index.html#rev-tertulias-mariquita` in browser. DOM evaluation confirmed: section exists, 6 cards with correct certeza values (hecho/rumor/hecho/hecho/opinion/opinion), nota historiográfica text visible, nota certeza text visible, sub-nav link active (`sub-nav__link--active` class applied by IntersectionObserver).

## Verification

All grep-based must-haves passed:
- `data-certeza=` count: 99 (93 baseline + 6 new)
- `card-nota-historiografica` count: 13 (12 baseline + 1 new TER-2)
- `card-nota-certeza` count: 25 (23 baseline + 2: 1 real span in TER-4 + 1 in HTML comment for TER-4 label)
- `rev-tertulias-mariquita` count: 4 (sub-nav link + opening comment + div id + closing comment — all 4 are expected)
- `tail -5 index.html` contains `</html>` — file intact

Browser DOM checks (JavaScript evaluation):
- `sectionExists`: true
- `cardCount`: 6
- `cardCertezas`: ["hecho","rumor","hecho","hecho","opinion","opinion"]
- `notaHistoriograficaText`: "Nota historiográfica: Mariquita Sánchez nunca dejó escrito n…"
- `notaCertezaText`: "[Nota: la cita "la madame Sévigné del Río de la Plata" se at…"
- `titleText`: "Las Tertulias de Mariquita Sánchez (1805–1868)"
- Sub-nav link: `sub-nav__link sub-nav__link--active` class present

Console signals: `[DEBUG] [SubNav] Active sub-period → rev-tertulias-mariquita` ✅, 6 reveal events for new cards ✅

One pre-existing console `[ERROR]`: `favicon.ico 404` — present before this task, not caused by M014 changes.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c "rev-tertulias-mariquita" index.html` | 0 | ✅ 4 (≥2 required: sub-nav link + div id both present) | <1s |
| 2 | `grep -c 'data-certeza=' index.html` | 0 | ✅ 99 (baseline 93 + 6) | <1s |
| 3 | `grep -c "card-nota-historiografica" index.html` | 0 | ✅ 13 (baseline 12 + 1) | <1s |
| 4 | `grep -c "card-nota-certeza" index.html` | 0 | ✅ 25 (baseline 23 + 2 incl. HTML comment) | <1s |
| 5 | `tail -5 index.html` | 0 | ✅ contains `</html>` | <1s |
| 6 | Browser DOM: `getElementById('rev-tertulias-mariquita').querySelectorAll('[data-certeza]').length` | — | ✅ 6 | <1s |
| 7 | Browser console: `[SubNav] Active sub-period → rev-tertulias-mariquita` | — | ✅ observed | on nav |
| 8 | `grep "Mar.C3.ADa_S.C3.A1nchez_de_Mendeville" index.html \| grep -v thumb` | 0 | ✅ URL directa sin /thumb/ | <1s |

## Diagnostics

To inspect the new section state in a future session:
- `grep -n "rev-tertulias-mariquita" index.html` — shows line positions of sub-nav link and section div
- `grep -c 'data-certeza=' index.html` — should be 99; deviation indicates cards were removed or added
- Browser JS: `document.getElementById('rev-tertulias-mariquita').querySelectorAll('[data-certeza]').length` — should be 6
- Browser console on page load should include: `[SubNav] Initialized with 8 sub-periods, 8 links.` (was 7 before this task — now 8 after adding the tertulias link)

## Deviations

1. **`rev-tertulias-mariquita` grep count = 4, not 2**: The task plan expected 2 (sub-nav link + div id). The actual count is 4 because the HTML block template includes a comment with the id (`<!-- id="rev-tertulias-mariquita" -->`) and a closing comment (`<!-- /#rev-tertulias-mariquita -->`). The 2 functional occurrences (sub-nav link and div id) are both present and correct. This deviation is cosmetic.

2. **`card-nota-certeza` grep count = 25, not 24**: The HTML comment `<!-- TER-4: El salón en el exilio (con card-nota-certeza inline) -->` adds 1 extra grep match. The actual `<span class="card-nota-certeza">` element is present exactly once in TER-4 (line 1514). The Must-Have requirement (span present) is met.

3. **SubNav initialized with 8 links** (was implied 7+1=8 by the plan): Confirmed — console log shows `[SubNav] Initialized with 8 sub-periods, 8 links.` matching the new total.

## Known Issues

None. The pre-existing `favicon.ico 404` is noted but is a cosmetic pre-existing issue unrelated to this slice.

## Files Created/Modified

- `index.html` — Added section `#rev-tertulias-mariquita` (6 cards TER-1 to TER-6, ~130 lines) after line 1439 and sub-nav link at line 331
