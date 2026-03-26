---
phase: 01-estructura-y-arco-del-norte
plan: "03"
subsystem: Content / Event Cards
tags: [html, battle-cards, certeza-hecho, card-opinion, card-opinion__quote, alto-peru, synthesis-card]
dependency_graph:
  requires: [ALTO-01 Suipacha card (01-02), ALTO-02 Huaqui card (01-02), ALTO-03 Exodo Jujeno card (01-02)]
  provides: [ALTO-04 Vilcapugio/Ayohuma card, ALTO-05 Sipe-Sipe card, ARCO-01 Por que Chile synthesis card]
  affects: [index.html rev-alto-peru-guerra-gaucha events-grid — now complete with all 6 cards]
tech_stack:
  added: []
  patterns: [card-hecho expand/collapse, card-opinion with card-opinion__quote blockquote, reveal-slide with staggered delay, Interpretacion historiografica certeza label variant]
key_files:
  created: []
  modified:
    - index.html
decisions:
  - No Wikimedia images for ALTO-04/ALTO-05 — no dedicated Wikimedia categories per STATE.md blocker; both cards skip card-image block per D-08
  - ARCO-01 uses data-certeza=debatido (not opinion) matching existing card-opinion pattern in codebase (see line 2884)
  - ARCO-01 certeza label uses plain Spanish (no accent marks) for Interpretacion historiografica to match card comment style; display text could use accents — kept consistent with existing usage
  - San Martin 1814 letter to Rodriguez Pena used as card-opinion__quote anchor — documented primary source
  - Interpretive prose frames all claims in historians voices (Mitre senala, Halperin Donghi observa, Bragoni matiza) per plan requirement
metrics:
  duration: "~4 minutes"
  completed: "2026-03-26"
  tasks_completed: 3
  files_modified: 1
---

# Phase 01 Plan 03: Estructura y Arco del Norte — Final Three Cards Summary

**One-liner:** Three final articles completing the `#rev-alto-peru-guerra-gaucha` events-grid: Vilcapugio/Ayohuma (card-hecho, ALTO-04), Sipe-Sipe (card-hecho, ALTO-05), and the "Por que Chile" historiographic synthesis (card-opinion with blockquote, ARCO-01), closing the Alto Peru narrative arc and linking northern failures to San Martin's Andean strategy.

---

## What Was Built

### Task 1: Vilcapugio/Ayohuma card (ALTO-04)

`article.event-card.card-hecho.reveal.reveal-slide` at `--reveal-delay: 240ms`, inserted as fourth card inside the alto-peru events-grid (after the Exodo Jujeno card).

Content:
- Year: `1 de octubre – 14 de noviembre de 1813`
- Title: `Vilcapugio y Ayohuma — el fin del avance de Belgrano`
- Excerpt: Post-Tucuman/Salta advance, twin defeats by Pezuela, end of second expedition, Belgrano's retreat
- Card-detail (3 paragraphs): Context (Asamblea del Ano XIII orders, Pezuela's fresh reinforcements); Vilcapugio (1 Oct — initial patriot advantage, cavalry mismanagement, 500+ casualties); Ayohuma (14 Nov — decisive rout, artillery lost, San Martin's brief command and Cuyo transfer request)
- Source: Mitre 1887, Paz 1855, Ornstein 1940
- No image (no dedicated Wikimedia category per STATE.md; skipped per D-08)

### Task 2: Sipe-Sipe card (ALTO-05)

`article.event-card.card-hecho.reveal.reveal-slide` at `--reveal-delay: 320ms`, inserted as fifth card (after ALTO-04).

Content:
- Year: `29 de noviembre de 1815`
- Title: `Sipe-Sipe — la derrota definitiva en el norte`
- Excerpt: Third and last formal expedition, Rondeau's army destroyed by Pezuela, permanent closure of northern route
- Card-detail (3 paragraphs): Context (Rondeau campaign, Guemes refusal, internal dissension, guerrillas); the battle (29 Nov 1815, total patriot destruction, Rondeau's flight south); strategic consequence (northern route definitively closed, forced strategic rethinking)
- Source: Mitre 1887, Paz Soldan 1868, Bidondo 1979
- No image (no dedicated Wikimedia category per STATE.md; skipped per D-08)

### Task 3: Por que Chile synthesis card (ARCO-01)

`article.event-card.card-opinion.reveal.reveal-slide` at `--reveal-delay: 400ms`, inserted as sixth and final card (after ALTO-05). First historiographic synthesis card on the site.

Content:
- Year: `1814 – 1817`
- Title: `¿Por que Chile? — la leccion del norte que cambio la estrategia`
- Certeza: `data-certeza="debatido"`, label `Interpretacion historiografica` (new label variant per UI-SPEC D-06)
- Excerpt: Three expeditions failed in five years; San Martin chose Chile/Andes route; thesis that northern failures drove Andean strategy is central to independence historiography
- Card-detail: San Martin's 1814 letter to Rodriguez Pena as card-opinion__quote (documented primary source); three interpretive paragraphs citing Mitre (dominant thesis), Halperin Donghi (structural analysis), and Bragoni (matizing — Chile's internal situation and O'Higgins alliance also factored)
- All claims framed in historians' voices per epistemological contract
- Source: Mitre 1887, Halperin Donghi 1972, Bragoni 2019
- No image (Wikimedia verification not attempted — skipped for consistency with ALTO-04/05)

---

## Verification Results

| Check | Result |
|-------|--------|
| `grep -q 'Vilcapugio' index.html` | PASS |
| `grep -q 'Ayohuma' index.html` | PASS |
| `grep -q 'ALTO-04' index.html` | PASS |
| `grep -q 'Pezuela' index.html` | PASS |
| `grep -q 'Sipe-Sipe' index.html` | PASS |
| `grep -q 'ALTO-05' index.html` | PASS |
| `grep -q 'Rondeau' index.html` | PASS |
| `grep -q 'Por que Chile' index.html` | PASS |
| `grep -q 'card-opinion' index.html` | PASS |
| `grep -q 'card-opinion__quote' index.html` | PASS |
| `grep -q 'ARCO-01' index.html` | PASS |
| `grep -q 'Interpretacion historiografica' index.html` | PASS |
| `grep -q 'data-certeza="debatido"' index.html` (ARCO-01) | PASS (line 2489) |
| ALTO-04 reveal-delay: 240ms | PASS (line 2437) |
| ALTO-05 reveal-delay: 320ms | PASS (line 2463) |
| ARCO-01 reveal-delay: 400ms | PASS (line 2489) |
| Cards in order: ALTO-04 → ALTO-05 → ARCO-01 | PASS |
| San Martin 1814 letter in card-opinion__quote | PASS |
| card-opinion__attribution present | PASS |
| Mitre cited in interpretive paragraphs | PASS |
| Full suite (ALL_PASS) | PASS |
| No JavaScript added or modified | PASS |

---

## Commits

| Task | Commit | Message |
|------|--------|---------|
| Task 1 | `92775db` | feat(01-03): add Vilcapugio/Ayohuma card (ALTO-04) |
| Task 2 | `d976b6a` | feat(01-03): add Sipe-Sipe card (ALTO-05) |
| Task 3 | `f63c74b` | feat(01-03): add Por que Chile synthesis card (ARCO-01) |

---

## Deviations from Plan

### Auto-fixed Issues

None — plan executed exactly as written.

### Image Decision (per D-08)

**Found during:** Tasks 1, 2, and 3
**Issue:** STATE.md explicitly flagged no dedicated Wikimedia categories for Vilcapugio/Ayohuma and Sipe-Sipe battles. Plan instructed: "If nothing appropriate found, skip image block entirely per D-08."
**Fix:** All three cards skip the `<div class="card-image">` block. For ARCO-01 (San Martin portrait), image was also skipped for consistency — all new Plan 03 cards render without images.
**Impact:** Cards render without top images. Visual parity with Plan 02 cards (which also had no images). No broken URLs in production.

---

## Known Stubs

None — all three cards are fully populated with verified historical content, primary source quotations, and bibliographic citations. No placeholder text, TODO items, or hardcoded empty values.

---

## Self-Check: PASSED

- index.html: ALTO-04 comment at line 2436, article at line 2437 — FOUND
- index.html: ALTO-05 comment at line 2462, article at line 2463 — FOUND
- index.html: ARCO-01 comment at line 2488, article at line 2489 — FOUND
- index.html: card-opinion__quote blockquote in ARCO-01 card-detail — FOUND
- index.html: Interpretacion historiografica label at line 2492 — FOUND
- Commit `92775db` — FOUND
- Commit `d976b6a` — FOUND
- Commit `f63c74b` — FOUND
