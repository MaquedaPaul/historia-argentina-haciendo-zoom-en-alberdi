---
verdict: pass
remediation_round: 0
---

# Milestone Validation: M004

## Success Criteria Checklist

- [x] **7 event cards visible in `#periodo-nacional` with `data-certeza` attributes and certeza-aware visual treatment**
  — Evidence: `awk 'NR>=965 && NR<=1250' index.html | grep -c 'data-certeza'` → 7. Values: 6× `"hecho"`, 1× `"opinion"`. All 7 articles carry `.card-hecho` / `.card-opinion` CSS classes for visual treatment. T02-SUMMARY confirms DOM query `[data-certeza]` count === 7 PASS.

- [x] **Each card has a real Wikimedia Commons photograph (no placeholders)**
  — Evidence: 7 distinct `upload.wikimedia.org` `<img>` src URLs confirmed in DOM (lines 985–1220 of index.html): Sarmiento.jpg, Tuyuti1.jpg, Campaña_del_Desierto_1879.JPG, Julio_roca_retrato_antoniopozzo.jpg, Gigantografía_Inmigrantes_esperan_su_turno.jpg, R90_Canton_revolucionario…jpg, Flickr_-_bastique_-_Portrait_of_Juan_Bautista_Alberdi.jpg. No placeholders. T02-SUMMARY confirms 7 `.card-image img` count PASS.

- [x] **At least 2 certeza types represented (hecho + opinión minimum)**
  — Evidence: 6 `data-certeza="hecho"` + 1 `data-certeza="opinion"` (no accent — normalized consistently with prior periods per KNOWLEDGE.md). 2 types present. T02-SUMMARY CR3 PASS.

- [x] **Alberdi's narrative arc closes explicitly: return 1879, diputado, death 1884, legacy**
  — Evidence: Card 7 prose contains all four beats verbatim: "En 1879, Juan Bautista Alberdi regresó a Argentina", "elegido diputado nacional por Tucumán y ejerció como vicepresidente de la Cámara de Diputados", "Murió en Neuilly-sur-Seine el 19 de julio de 1884", plus the closing `.alberdi-quote` blockquote referencing his intellectual legacy and *El crimen de la guerra*. Death date carries an inline `<span class="card-nota-certeza">` flagging the June/July source divergence. T02-SUMMARY CR4 PASS (has1884, hasAlberdi, hasLegado, hasDiputado all true).

- [x] **All factual claims verified against ≥2 sources with `<cite>` elements**
  — Evidence: `awk 'NR>=965 && NR<=1260' index.html | grep -c '<cite'` → 9 (≥7 required). T02-SUMMARY CR5 confirms count 8 ≥ 7 PASS. S01-SUMMARY documents 23 source citations across 7 events (avg >3 per event; all hecho events have ≥2 independent sources). S01-CONTENT-DRAFT.md contains full source list.

- [x] **Opinión cards have `<blockquote>` with full attribution (author, date, source context)**
  — Evidence: Card 7 (`data-certeza="opinion"`) contains `<blockquote class="card-opinion__quote">` with `<footer class="card-opinion__attribution">` crediting "Consenso historiográfico" with date and context. T02-SUMMARY CR6 PASS (opinión card has blockquote + cite). `Certeza Attribute Accent Normalization` note in KNOWLEDGE.md explains `"opinion"` vs `"opinión"` — both are correct; verification queries must handle both variants.

- [x] **Animated timeline 1860–1900 fires on scroll with staggered markers**
  — Evidence: `.nacional-timeline.reveal.reveal-fade` div inserted in `#periodo-nacional .period-body` between `.period-intro` and `.events-grid--certeza`. `document.querySelectorAll('.nacional-timeline__marker').length === 7` confirmed. 7 markers at calculated positions: 1862→5%, 1865→12.5%, 1878→45%, 1880→50% (--above modifier), 1884→60%, 1890→75%, 1900→100%. CSS `nac-timeline-fill` progress bar keyframe + `nac-marker-pop` stagger delays (nth-child 2–8, 0.15s–2.30s). Fires via existing reveal system on scroll. T01-SUMMARY and T02-SUMMARY CR7 PASS.

- [x] **`events-grid--certeza` class present on the grid container**
  — Evidence: `<div class="events-grid events-grid--certeza" aria-label="Eventos del período nacional">` confirmed at line ~1064 of index.html. T01-SUMMARY verification #5 PASS. T02-SUMMARY CR8 PASS.

- [x] **Section reads coherently as a 40-year panoramic narrative at desktop (1200px) and mobile (375px)**
  — Evidence: T02-SUMMARY visual inspection at 1280px desktop and 375px mobile — cards display correctly, reveal animations fire, images load, timeline animates on scroll. No horizontal overflow at 375px (`scrollWidth 360 === clientWidth 360`). Sublabels hidden at mobile breakpoint. Cards stack correctly. T02-SUMMARY CR10 PASS.

- [x] **`initImageFallbacks` auto-discovers all new card images (0 img-error/img-fallback elements)**
  — Evidence: `awk 'NR>=965 && NR<=1260' index.html | grep -i 'img-error\|img-fallback'` → 0 results. T02-SUMMARY CR9 confirms `.img-error/.img-fallback` count === 0 PASS. All 7 Wikimedia URLs are API-verified per T02-IMAGE-ANNOTATIONS.md (S01).

---

## Slice Delivery Audit

| Slice | Claimed | Delivered | Status |
|-------|---------|-----------|--------|
| S01 | 7 event cards with `data-certeza`, Wikimedia photos, source citations, `events-grid--certeza` grid, closing `.alberdi-quote` connector; S01-CONTENT-DRAFT.md and T02-IMAGE-ANNOTATIONS.md as intermediate artifacts | Confirmed: 7 cards in DOM (6 hecho + 1 opinión), 7 real Wikimedia image URLs, `events-grid--certeza` class present, `.alberdi-quote` blockquote at end of `.period-body`, both artifact files present in `.gsd/milestones/M004/slices/S01/`. S01-SUMMARY marked `verification_result: passed`. | **pass** |
| S02 | `.nacional-timeline` with 7 markers, CSS keyframes + `prefers-reduced-motion`, reveal system integration; all 10 M004 success criteria verified PASS at desktop and mobile | Confirmed: `.nacional-timeline` present in HTML with 7 `__marker` divs at calculated positions; ~230 lines of scoped CSS in styles.css with `nac-*` keyframes, stagger nth-child delays, responsive breakpoints, `prefers-reduced-motion` final-state block; reveal system auto-discovered (+1 element to 52). T01-SUMMARY and T02-SUMMARY both `verification_result: passed`. DOM queries all PASS per T02 evidence table (14/14 checks). **Note:** S02-SUMMARY.md (slice-level roll-up) was not written to disk — task summaries T01-SUMMARY.md and T02-SUMMARY.md exist and fully document deliverables. This is a minor process gap with no impact on delivered content. | **pass** (minor: S02-SUMMARY.md missing) |

---

## Cross-Slice Integration

**S01 → S02 boundary:** S01 was required to produce a stable `#periodo-nacional .period-body` structure with 7 `<article>` cards, `.events-grid--certeza`, and `<cite>` elements. S02 consumed this by inserting `.nacional-timeline` between `.period-intro` and `.events-grid--certeza` — confirmed in index.html. No boundary mismatch.

**S01 → S02 image baseline:** S01's T02-IMAGE-ANNOTATIONS.md documented API-verified URLs; S02 did not need to re-source images (all 7 cards pre-integrated in S01-T03). No conflict.

**Reveal system count:** S01 established the 7-card reveal elements; S02 added 1 more (`.nacional-timeline`), bringing total to 52. T01-SUMMARY confirms `[Reveal] Initialized with 52 elements`. No interference with colonial or revolución reveal elements.

**No regressions:** T02-SUMMARY regression pass confirms all prior systems functional — colonial period (reveal--no-anim correct), revolución (reveal--visible), 3 nav links, 4 sub-nav links, 4 expand/collapse toggles, scroll spy. Zero console errors.

---

## Requirement Coverage

| Requirement | Coverage | Evidence |
|-------------|----------|----------|
| R004 — Sección 1860–1900 panorámica | ✅ Satisfied | 7 event cards covering all major clusters (presidencias, Guerra del Paraguay, Conquista del Desierto, federalización, inmigración, Crisis 1890, Alberdi death/legacy). S01 + S02 complete. |
| R012 — Verificación histórica | ✅ Satisfied for M004 | S01-CONTENT-DRAFT.md with 23 source citations (avg >3 per event, ≥2 independent per hecho card). `<cite>` count ≥ 7 in DOM. All dates/names pre-verified in T01 draft before HTML integration. |
| R013 — Sistema de certeza M004 | ✅ Satisfied for M004 | 7 cards with `data-certeza` (6 hecho, 1 opinión). `events-grid--certeza` class on grid container. Certeza-aware visual treatment applied. At least 2 types represented. |
| R005 — Multimedia | ✅ Partially satisfied | `.nacional-timeline` animated timeline (CSS keyframes, staggered markers, progress bar fill) is the multimedia element for this period. No video embed (no embeddable source found — consistent with M004-ROADMAP rationale and M005 deferral). 7 Wikimedia photographs. |
| R007 — Responsive 375px–1200px | ✅ Verified at specified breakpoints | Desktop (1280px) and mobile (375px) verified in T02. Full 320px–1920px+ sweep deferred to M005 per roadmap. |

**Orphan check:** R001 (final full-page validation — M005), R006 (sounds — M005), R008/R009/R010/R011/R014 (validated in prior milestones) — no new gaps introduced by M004.

---

## Verdict Rationale

All 10 success criteria pass with direct DOM evidence. Both slices delivered their full declared outputs. Cross-slice integration is clean. Requirements R004, R012, R013 are satisfied. No JS regressions introduced.

The only finding is that **S02-SUMMARY.md (slice-level roll-up) was not written to disk** — only the task-level summaries T01 and T02 exist. This is a process documentation gap, not a content or deliverable gap. Every deliverable described in the S02 boundary map is present and verified in index.html and styles.css. This finding does not affect the milestone's functional completeness and does not warrant remediation.

**Verdict: `pass`**

---

## Remediation Plan

*None required — verdict is `pass`.*
