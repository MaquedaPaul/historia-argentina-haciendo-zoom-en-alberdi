---
verdict: pass
remediation_round: 0
---

# Milestone Validation: M020

## Success Criteria Checklist

- [x] **Sub-período `#rev-invasiones-inglesas` visible en `#periodo-revolucion` con 14+ cards**
  — Evidence: `document.querySelectorAll('#rev-invasiones-inglesas [data-certeza]').length` → **18** (verified via Node DOM extraction). Block is 75,953 chars, positioned before `#rev-alberdi-formacion` as required.

- [x] **Cada actor clave tiene su card o sección propia: Sobremonte, Liniers, Álzaga, Beresford, Popham, Whitelocke, Belgrano, Saavedra, Pueyrredón**
  — Evidence (mentions in block): Sobremonte 35, Liniers 38, Álzaga 25, Beresford 48, Popham 28, Whitelocke 14, Belgrano 21, Saavedra 18, Pueyrredón 15. All 9 actors have dedicated coverage.

- [x] **El tesoro real capturado (~1.086.000 pesos fuertes) y la destitución de Sobremonte están documentados**
  — Evidence: `block.includes('1.086')` → true; `block.includes('destitu')` → true. Both the Beresford/Castlereagh figure (1,086,208) and the Roberts figure (1,438,514) are documented with scope distinction per D069.

- [x] **Los regimientos criollos y su sistema de elección de líderes están explicados**
  — Evidence: `block.includes('regimiento')` → true; `block.includes('pluralidad') || block.includes('voto')` → true. The "a pluralidad de votos" fact is documented in the block.

- [x] **La estrategia de Whitelocke (por qué no bombardeó) está presentada con las hipótesis historiográficas y su certeza**
  — Evidence: `block.includes('bombardeo') || block.includes('artillería') || block.includes('hipótesis')` → true. INV-16 contains a `card-nota-historiografica` with 4 non-exclusive hypotheses; the corte marcial of 1808 is documented. Confirmed by V6 (notas=4, includes INV-16).

- [x] **El contexto europeo (Napoleón, Bayona, José Bonaparte → crisis de legitimidad → Mayo 1810) está integrado**
  — Evidence: `block.includes('Napole')` → true (INV-17 in block); connector between sections includes `Bayona` and `Napole` → both true. Three-cause model documented in INV-18.

- [x] **La conexión causal milicias 1806 → actores de Mayo 1810 está explícita**
  — Evidence: `block.includes('Mayo 1810')` → true (INV-18 as `card-opinion` with `card-nota-historiografica` model of three causes). Alberdi-quote connector reinforces the chain: milicias → Primera Junta → nacimiento de Alberdi.

- [x] **Sub-nav tiene link al nuevo sub-período**
  — Evidence: sub-nav link `href="#rev-invasiones-inglesas"` present → true; it is the **first** link in the sub-nav (position 1 of 8), correct chronological order before `#rev-alberdi-formacion`.

- [x] **revolucion-timeline muestra marcadores 1806 y 1807**
  — Evidence: `timeline1806` → true; `timeline1807` → true. Positions: `--marker-pos: 10.00%` (1806) and `--marker-pos: 11.67%` (1807). Timeline now has **12 markers** total (nth-child 2–13 in CSS, verified). 1807 uses `--above` modifier to avoid label overlap.

## Slice Delivery Audit

| Slice | Claimed | Delivered | Status |
|-------|---------|-----------|--------|
| S01 | `S01-CONTENT-DRAFT.md` with 18 verified entries (INV-01–INV-18), certeza classified, ≥2 sources per fact, Wikimedia images verified, 6 `card-nota-historiografica`, 4 `card-rumor`, all 9 actors covered, Alberdi exclusion documented, nexo causal in INV-18, Bayona in INV-17 | File exists; `grep -c "^## Evento INV-"` → 18; certeza=18; notas=6; rumor=4; PLACEHOLDERs=3 (documented with alternatives); all 9 actors present | **pass** |
| S02 | `<div id="rev-invasiones-inglesas">` in `index.html` with 18 `<article>` cards; `data-certeza` on all 18; 4 `card-nota-historiografica`; 1 `card-rumor__embedded` (INV-13); 1 `card-opinion` (INV-18); sub-nav link as first element; stagger 0–1360ms; no `src=""`; responsive 320px/1920px; no JS errors | certeza=18 ✓; buttons=18 ✓; notas=4 ✓; rumorEmbedded=1 ✓; cardOpinion=1 ✓; sub-nav link=first ✓; last stagger=1360ms ✓; no `src=""` ✓; card-image-placeholder=2 (INV-09 + one more, no empty src) ✓ | **pass** |
| S03 | 2 markers (1806, 1807) in `revolucion-timeline`; CSS stagger expanded to nth-child(13); `alberdi-quote` connector between `#rev-invasiones-inglesas` and `#rev-alberdi-formacion` containing Bayona/Napoleón/nexo causal chain | 1806 at 10.00% ✓; 1807 at 11.67% ✓; 12 total markers ✓; nth-child(13) in CSS ✓; `alberdi-quote` present ✓; Bayona ✓; Napoleón ✓; V5 regression check (certeza≥18, notas≥4) ✓ | **pass** |

## Cross-Slice Integration

**S01 → S02 boundary:** S01 committed to delivering a draft with 18 entries, certeza, images, and nota/rumor flags. S02 consumed all 18 entries, resolved the 3 PLACEHOLDERs (INV-03 → Beresford portrait; INV-05 → Popham portrait per D074; INV-09 → card-image-placeholder as final state per D075), and faithfully applied nota/rumor flags. No boundary mismatches.

**S02 → S03 boundary:** S02 committed to delivering the sub-período wrapper with 18 cards, sub-nav link, and the existing `revolucion-timeline` state. S03 consumed both: inserted 2 new markers at the start of the track and renumbered existing markers +2 (nth-child 4–13) without changing delay values. The `alberdi-quote` connector was positioned between `<!-- /#rev-invasiones-inglesas -->` and `<div id="rev-alberdi-formacion">` exactly as specified. No boundary mismatches.

**Regression integrity:** S03's V5 check confirms S02's deliverables were not disturbed (certeza=18, notas=4 still pass after S03 edits). The `initSubNav()`, `revealOnScroll()`, `initImageFallbacks()`, and `initExpandCollapse()` integration points all auto-discover new elements via existing patterns — no `app.js` changes were needed or made.

## Requirement Coverage

| Requirement | Coverage |
|-------------|----------|
| R003 — contenido detallado 1800–1860 | **Advanced**: milestone extends detailed coverage backward to 1806, adding 18 cards to `#periodo-revolucion`. |
| R005 — soporte multimedia: imágenes históricas | **Advanced**: 17 Wikimedia-verified images + 1 `card-image-placeholder` (INV-09, no Commons image exists). |
| R011 — Alberdi como hilo conductor | **Addressed**: Salvador María Alberdi investigated and excluded with documented rationale (D072). Juan Bautista Alberdi's connection to the invasions as foundational myth documented in INV-12. The `alberdi-quote` connector closes the arc from the invasions to Alberdi's birth (August 29, 1810). |
| R012 — verificación histórica | **Advanced**: 18 entries verified against ≥2 sources; 6 `card-nota-historiografica` for contested claims; 4 `card-rumor` for unverified assertions; dual treasury figures documented with scope distinction. |
| R013 — sistema de niveles de certeza | **Maintained**: All 18 new cards carry `data-certeza`. Distribution: predominantly `hecho`; 1 `opinion` (INV-18 nexo causal per D077). No regressions to existing certeza coverage. |
| R001, R002, R004, R006–R010, R014 | **No impact**: out of scope for M020; not affected by changes. |

## Verdict Rationale

All 9 success criteria from the roadmap are met with direct file-system evidence:

1. **Card count**: 18 ≥ 14 ✓
2. **All 9 actors**: present with substantial coverage (14–48 mentions each) ✓
3. **Treasury + Sobremonte destitution**: documented ✓
4. **Regimientos criollos + elección de líderes**: documented ✓
5. **Whitelocke strategy + 4 historiographic hypotheses**: `card-nota-historiografica` in INV-16 ✓
6. **European context (Napoleón/Bayona/José Bonaparte)**: INV-17 in block + connector ✓
7. **Causal connection 1806→1810**: INV-18 `card-opinion` + three-cause model + `alberdi-quote` ✓
8. **Sub-nav link**: first link in sub-nav ✓
9. **Timeline markers 1806 and 1807**: positions 10.00% and 11.67%, 12 total markers ✓

All three slices delivered their stated outputs. Cross-slice boundaries aligned. No requirement is left unaddressed. JS syntax valid. No `src=""` in block. The milestone Definition of Done is fully satisfied.

## Remediation Plan

_None — verdict is `pass`._
