---
verdict: pass
remediation_round: 0
---

# Milestone Validation: M021

## Success Criteria Checklist

- [x] **Sub-período `#rev-san-martin` visible en `#periodo-revolucion` con ≥14 cards** — evidence: `article.event-card` count within `#rev-san-martin` boundary = 15; DOM query `[data-certeza]` within boundary = 15. Both ≥14. ✓
- [x] **Arco narrativo completo: infancia → oficial español → logias → Granaderos → batallas → retiro** — evidence: all 12 narrative topics verified present in section HTML: Yapeyú/infancia ✓, oficial español ✓, logias ✓, Granaderos ✓, San Lorenzo ✓, Cruce de los Andes ✓, Chacabuco ✓, Maipú ✓, Perú ✓, Guayaquil ✓, retiro ✓, exilio/Boulogne ✓. ✓
- [x] **Batallas individuales con fecha exacta, contexto estratégico y significado** — evidence: S03 and S04 summaries confirm San Lorenzo (3 feb 1813), Cruce (enero 1817), Chacabuco (12 feb 1817), Cancha Rayada (19 mar 1818), Maipú (5 abr 1818), Campaña al Perú (1820–1821); each card has expand/collapse detail with strategic context and cited sources. ✓
- [x] **Guayaquil tratada como debate historiográfico (card-opinion con nota historiográfica, múltiples hipótesis, sin veredicto)** — evidence: Guayaquil card at boundary index 34000–37772 has `card-opinion` class, `data-certeza="debatido"`, `card-nota-historiografica` paragraph with three named positions (Mitre, Guido/traditional, Lynch/synthesis), and explicit "Ninguna hipótesis tiene prueba documental directa" (no verdict). ✓
- [x] **Logias masónicas y rol de Gran Bretaña tratados como card-opinion con atribución historiográfica explícita** — evidence: two logias/masónicas cards (Entradas 3 and 4) have `data-certeza="debatido"`, `card-nota-historiografica` paragraphs with named historiographic positions and explicit attribution per position. `card-nota-historiografica` count in section = 4. ✓
- [x] **Sub-nav tiene link a `#rev-san-martin`** — evidence: `grep -c 'href="#rev-san-martin"' index.html` = 1; sub-nav has 8 anchor links with `sub-nav__link` class; `#rev-san-martin` is the 4th link in order (after `#rev-1800-1820`). ✓
- [x] **`revolucion-timeline` tiene marcadores para el período San Martín (mínimo 1812 Granaderos y 1817 Cruce)** — evidence: 4 markers added: 1812 (`--marker-pos: 20.00%`, below), 1813 (`--marker-pos: 21.67%`, above), 1817 (`--marker-pos: 28.33%`, above), 1818 (`--marker-pos: 30.00%`, below). Total timeline markers = 14. ✓
- [x] **Sin errores JS en consola** — evidence: `new Function(app.js)` → `syntax OK`; zero `console.error` calls in app.js; S05 summary reports 0 console errors with 14 `[DEBUG]`-only logs. ✓
- [x] **Correcto en 320px y 1920px+** — evidence: S05 verification confirmed sub-nav `overflow-x: auto` scrolls correctly at 320px; all 8 links visible at 1920px. Sub-period uses `reveal reveal-fade` class; grid is `events-grid--certeza` which uses responsive `minmax` auto-fill. ✓

## Slice Delivery Audit

| Slice | Claimed | Delivered | Status |
|-------|---------|-----------|--------|
| S01 | `S01-CONTENT-DRAFT.md` with ≥15 verified entries, certeza, Wikimedia URLs, historiographic notes, structural decisions | 15 entries, certeza on all, 7 Wikimedia URLs verified via Commons API (3 direct, 4 resolved via search), 3 entries with `nota-historiografica: true`, all structural decisions documented (insertion point, sub-nav label, timeline markers, encoding) | pass |
| S02 | `#rev-san-martin` container + 6 cards (Entradas 1–6) in index.html; expand/collapse functional; reveal-on-scroll operative | Container inserted between `#rev-1800-1820` and CONECTOR ALBERDI SP1→SP2; 6 cards (2 debatido with nota-historiografica, 4 hecho); all checks passed at slice time (data-certeza=99, div count=1) | pass |
| S03 | 4 battle cards (Cuyo, Cruce, Chacabuco, Cancha Rayada+Maipú) injected; boundary count ≥10 | 4 cards injected (Entradas 7–10); boundary count = 10; global certeza = 103; stagger 480/560/640/720ms; note: T01 executor stub — closer performed the injection | pass |
| S04 | 5 cards (Entradas 11–15: Perú, Guayaquil, Retiro, Exilio, Legado); boundary count ≥14; Guayaquil as card-opinion/debatido | 5 cards injected; boundary count raised to 15; global certeza 103→108; Guayaquil has card-opinion + data-certeza="debatido" + nota-historiografica + three named positions + no verdict; Legado uses `data-certeza="opini&#xF3;n"` (HTML entity) | pass |
| S05 | Sub-nav link to `#rev-san-martin`; 2+ timeline markers (1812 and 1817 minimum); CSS stagger extension to nth-child(15); all DoD checks pass | 1 sub-nav link inserted (8th link, "1812–1822 / San Martín Libertador"); 4 timeline markers (1812/1813/1817/1818); CSS nth-child(12)–(15) rules added (2 each = 8 total); all 9 verification checks passed | pass |

## Cross-Slice Integration

All boundary map entries align with delivered outputs:

- **S01 → S02/S03/S04:** `S01-CONTENT-DRAFT.md` delivered with the exact structure (entry headers, certeza, wikimedia URLs, nota-historiografica flags, implementation notes section) that S02/S03/S04 consumed. Insertion anchor `</div><!-- /#rev-1800-1820 -->` was present as specified.
- **S02 → S03:** Sub-period container and 6 initial cards established. S03 injected at the `</div><!-- /.events-grid rev-san-martin -->` anchor. Stagger delay continuation (S02 ended at 400ms, S03 started at 480ms) verified correct.
- **S03 → S04:** 10-card state handed off correctly (boundary count = 10, global certeza = 103). S04 found and used the same injection anchor; raised counts to 15 / 108.
- **S04 → S05:** 15-card sub-period delivered complete. S05 found `</div><!-- /#rev-san-martin -->` closing comment as specified; added sub-nav link and timeline markers without touching sub-period content. CSS stagger extended to cover shifted nth-child positions caused by 4 new markers inserted at DOM positions 3, 4, 6, 7.

No boundary mismatches detected.

**Note on DOM position:** `#rev-san-martin` (at HTML position ~105429) is correctly placed between `#rev-1800-1820` (~94482) and `#rev-1820-1835` (~153861) in the document flow. The sub-nav link order confirms: `#rev-alberdi-formacion` → `#rev-alberdi-quiroga` → `#rev-1800-1820` → `#rev-san-martin` → `#rev-1820-1835` → `#rev-1835-1852` → `#rev-1852-1860`. The earlier positions of `rev-alberdi-formacion` and `rev-alberdi-quiroga` reflect their pre-existing placement in the document; `#rev-san-martin` is correctly inserted after `#rev-1800-1820` as decided in S01 (D068).

## Requirement Coverage

Active requirements addressed by M021:

| Requirement | Coverage | Evidence |
|-------------|----------|----------|
| R001 (single-page scroll narrative) | continued | New sub-period integrates into existing scroll flow |
| R005 (multimedia: images) | continued | 15 card-image blocks with Wikimedia URLs verified via API; 6 have battle-specific paintings |
| R007 (responsive 320px–1920px+) | verified | S05 confirmed sub-nav scrolls at 320px, all links visible at 1920px |
| R012 (historical rigor per milestone) | covered | S01 verified ≥2 sources per entry; certeza assigned to all 15; no PENDIENTE flags in draft |
| R013 (certeza system) | covered | 15 cards with data-certeza: 11 hecho / 3 debatido / 1 opinión — system applied without new CSS (D052) |
| R014 (attributed opinions) | covered | 4 `card-nota-historiografica` paragraphs with named historian attributions per position (Mitre, Lynch, Rojas, Galasso, edecán Guido); Guayaquil and logias cards explicitly name each position's proponent |

No active requirements are left unaddressed by this milestone. R006 (ambient sounds) and R007 (responsive design) remain tracked to M005/active; M021 does not regress either.

## Verdict Rationale

All 9 success criteria pass with direct DOM evidence:

1. **≥14 cards in `#rev-san-martin`** — 15 article.event-card elements confirmed via boundary-scoped Node.js count.
2. **Complete narrative arc** — all 12 topic tokens found in section HTML.
3. **Individual battles with exact dates** — 6 battle cards with dates confirmed in S03/S04 summaries and index.html content.
4. **Guayaquil as historiographic debate** — card-opinion + debatido + nota-historiografica + three named positions + no verdict, all present in card boundary 34000–37772.
5. **Logias as card-opinion with explicit attribution** — Entradas 3 and 4 have debatido + nota-historiografica with named positions.
6. **Sub-nav link** — `href="#rev-san-martin"` present, 8 total sub-nav links.
7. **Timeline markers 1812 and 1817** — both present; 4 total San Martín markers (1812/1813/1817/1818); 14 total timeline markers.
8. **No JS errors** — syntax clean; no console.error calls; CSS stagger extended to nth-child(15) preventing silent opacity:0 failures.
9. **Correct at 320px and 1920px+** — verified in S05 with responsive sub-nav behavior.

All 5 slices delivered their specified outputs. Cross-slice boundaries aligned correctly. No active requirements left unaddressed. No regressions to prior milestones detected (global certeza count 108 is consistent with S04's final state; app.js unchanged; no CSS regressions noted).

Verdict: **pass**.

## Remediation Plan

None required.
