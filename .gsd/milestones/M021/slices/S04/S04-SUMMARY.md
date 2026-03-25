---
id: S04
parent: M021
milestone: M021
provides:
  - 5 cards (Entradas 11–15) injected into #rev-san-martin: Campaña al Perú, Guayaquil (card-opinion/debatido), Retiro del poder, Exilio europeo, Legado
  - Sub-period card count raised from 10 to 15; global data-certeza count raised from 103 to 108
  - San Martín narrative arc complete: formación → logias → Granaderos → batallas → Perú → Guayaquil → retiro → exilio → legado
requires:
  - slice: S03
    provides: Sub-period #rev-san-martin with 10 cards (Entradas 1–10, San Lorenzo through Maipú)
affects:
  - S05
key_files:
  - index.html
key_decisions:
  - Stagger delays reset to 0ms at Entrada 11 (new thematic cluster, not continuation of S03 delays)
  - Guayaquil image uses direct (non-thumb) Wikimedia URL https://upload.wikimedia.org/wikipedia/commons/f/ff/Encuentro_de_Guayaquil.jpg — image is 484px, below 500px threshold
  - Entrada 12 uses card-opinion + data-certeza="debatido" + card-nota-historiografica naming three historiographic positions (Mitre: voluntary retreat; edecán Guido/tradition: political ambush; Lynch/síntesis: tacit zone agreement)
  - Entrada 13 wraps uncertain paraphrase in <span class="card-nota-certeza"> — unverified primary source flagged inline for readers
  - Entrada 15 uses data-certeza="opini&#xF3;n" (HTML entity) matching existing codebase pattern for opinión cards
patterns_established:
  - Write tool for multi-card HTML blocks avoids bash heredoc unreliability on Windows/Git Bash
  - Edit tool anchored on exact two-line closing block is safe injection point for events-grid divs
  - Node.js boundary-scoped count (slice s→e) is authoritative; grep -c overcounts across sub-periods
observability_surfaces:
  - "Boundary count: node -e \"const h=require('fs').readFileSync('index.html','utf8'); const s=h.indexOf('id=\\\"rev-san-martin\\\"'); const e=h.indexOf('</div><!-- /#rev-san-martin -->'); const sec=h.slice(s,e+30); const m=sec.match(/data-certeza/g); console.log(m?m.length:0);\""
  - "Global count: grep -c 'data-certeza' index.html (should be 108)"
  - "Guayaquil URL: grep -c 'Encuentro_de_Guayaquil.jpg' index.html (should be 1)"
  - "JS syntax: node -e \"try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('syntax OK'); } catch(e) { ... }\""
  - "card-nota-certeza spans: grep -c 'card-nota-certeza' index.html (should be ≥1)"
drill_down_paths:
  - .gsd/milestones/M021/slices/S04/tasks/T01-SUMMARY.md
duration: ~10m
verification_result: passed
completed_at: 2026-03-25
---

# S04: Perú, Guayaquil y retiro del poder

**5 cards injected into `#rev-san-martin` complete the San Martín arc at 15 cards (global data-certeza: 108); Guayaquil treated as a three-position historiographic debate; Retiro del poder and exile documented with inline epistemic flags.**

## What Happened

S04 had a single task (T01): inject Entradas 11–15 into `#rev-san-martin` before the closing `</div><!-- /.events-grid rev-san-martin -->` anchor. The executor confirmed the exact two-line anchor at lines 1553–1554 of `index.html`, wrote the 5-card HTML block to a temp file via the Write tool (avoiding bash heredoc issues on Windows), and used the Edit tool to inject precisely at the anchor.

**Cards injected:**

| Entrada | Title | data-certeza | Card type |
|---------|-------|--------------|-----------|
| 11 | Campaña al Perú (1820–1821) | hecho | card-hecho |
| 12 | El encuentro de Guayaquil (1822) | debatido | card-opinion + card-nota-historiografica |
| 13 | El retiro voluntario del poder (1822) | hecho | card-hecho + card-nota-certeza span |
| 14 | Exilio europeo y Boulogne-sur-Mer (1824–1850) | hecho | card-hecho |
| 15 | Legado y síntesis historiográfica | opinión | card-opinion + card-nota-historiografica |

**Guayaquil historiographic treatment:** Three named positions in the `card-nota-historiografica` paragraph — Mitre (voluntary retreat, San Martín deferred to Bolívar's force), edecán Guido/traditional view (political ambush, Bolívar leveraged superior position), Lynch/synthesis (tacit zone-of-influence agreement). The card explicitly withholds a verdict, satisfying the milestone's requirement for Guayaquil as a debate, not a settled fact.

**Epistemic flagging:** Entrada 13 wraps the paraphrase "sus compatriotas no merecían sus sacrificios" in `<span class="card-nota-certeza">` inside the expand detail, marking it as an unverified primary source. Entrada 15 uses `data-certeza="opini&#xF3;n"` (HTML entity) matching the existing codebase pattern.

**Stagger delays** for Entradas 11–15 reset to 0/80/160/240/320ms — a new thematic cluster, not a continuation of S03 delays.

## Verification

All 5 verification commands run and passed:

| Check | Command | Result | Verdict |
|-------|---------|--------|---------|
| Boundary count in `#rev-san-martin` | `node -e "... boundary count ..."` | `15` | ✅ |
| Global data-certeza count | `grep -c 'data-certeza' index.html` | `108` | ✅ |
| Guayaquil direct URL | `grep -c 'Encuentro_de_Guayaquil.jpg' index.html` | `1` | ✅ |
| JS syntax check | `node -e "new Function(...)"` | `syntax OK` | ✅ |
| card-nota-certeza present | `grep -c 'card-nota-certeza' index.html` | `24` | ✅ |

## New Requirements Surfaced

- none

## Deviations

None. The temp file `/tmp/s04-cards.html` could not be explicitly deleted via `rm` (Write tool on Windows wrote it to a different location), but this had no effect on the output and is not a meaningful deviation.

## Known Limitations

- S05 still needs to add sub-nav link to `#rev-san-martin` and timeline markers for 1812 (Granaderos) and 1817 (Cruce) — this slice delivers content only, not navigation/timeline integration.
- Expand/collapse for Entradas 11–15 depends on the existing `app.js` `card-expand-toggle` delegation pattern — no new JS was written. This should work automatically via event delegation, but will be confirmed in S05's verification pass.
- The `data-certeza="debatido"` badge style must be confirmed rendering correctly in the browser — CSS class coverage was not audited in this slice (S05 UAT covers this).

## Follow-ups

- S05: Add `<a href="#rev-san-martin">` to the sub-nav (lines ~326–335 of index.html)
- S05: Add `revolucion-timeline` markers for 1812 and 1817 using `--marker-pos: calc((año - 1800) / 60 * 100%)`
- S05: Run full DOM verification: ≥14 cards, sub-nav link, timeline markers, 320px/1920px+, no JS console errors

## Files Created/Modified

- `index.html` — 5 cards (Entradas 11–15) injected before `</div><!-- /.events-grid rev-san-martin -->`; sub-period count 10→15; global data-certeza count 103→108
- `.gsd/milestones/M021/slices/S04/S04-PLAN.md` — Added `## Observability / Diagnostics` section (pre-flight gap fix)

## Forward Intelligence

### What the next slice should know
- The sub-period `#rev-san-martin` is now complete at 15 cards. The closing anchor comment is `</div><!-- /#rev-san-martin -->` — S05 must not inject content after this comment; only sub-nav and timeline edits are needed.
- The `revolucion-timeline` currently has 10 markers for the 1800–1860 range. The `--marker-pos` formula is `(año - 1800) / 60 * 100`. For 1812: `(12/60)*100 = 20%`. For 1817: `(17/60)*100 = 28.33%`. These positions fall between existing markers — check for label overlap with nearby markers and apply the `--above` modifier if needed (see KNOWLEDGE.md: Alternating Above/Below Labels).
- Sub-nav link placement: existing sub-period links are at lines ~326–335. Replicate the pattern exactly — anchor text should be "San Martín" or "Rev. San Martín" to match other sub-nav link lengths.

### What's fragile
- `data-certeza="debatido"` badge — this value was used in S04 for Guayaquil. If the CSS doesn't have a rule for `.event-card[data-certeza="debatido"]` (or a badge class derived from it), the card will render without a colored badge. S05 should verify the badge appears in the browser before closing the milestone.
- The `card-nota-historiografica` in Entrada 15 (Legado) has no blockquote — it names historians (Mitre, Rojas, Lynch, Galasso) without a direct quote. If future content audits require all `card-opinion` cards to have a `<blockquote>`, this card will need updating.

### Authoritative diagnostics
- `document.querySelectorAll('#rev-san-martin [data-certeza]').length` in browser devtools — returns `15` if all cards are present; any lower value means an inject error.
- `document.querySelector('[data-certeza="debatido"]')` — returns the Guayaquil card element; `null` means the attribute value doesn't match exactly (check for encoding).
- `grep -n 'Encuentro_de_Guayaquil' index.html` — confirms the non-thumb direct URL is present and line-locates it for visual inspection.

### What assumptions changed
- Original S04 plan assumed global data-certeza count before this slice would be 103. This was confirmed correct — S03 delivered 103 and S04 raised it to 108.
- The boundary anchor `</div><!-- /#rev-san-martin -->` existed exactly as specified in the plan — no whitespace mismatch occurred.
