---
phase: 01-estructura-y-arco-del-norte
plan: "02"
subsystem: Content / Event Cards
tags: [html, battle-cards, certeza-hecho, nota-historiografica, alto-peru]
dependency_graph:
  requires: [rev-alto-peru-guerra-gaucha sub-period skeleton (01-01), .card-nota-historiografica CSS rule (01-01)]
  provides: [ALTO-01 Suipacha card, ALTO-02 Huaqui card with nota-historiografica, ALTO-03 Exodo Jujeno card]
  affects: [index.html rev-alto-peru-guerra-gaucha events-grid]
tech_stack:
  added: []
  patterns: [card-hecho expand/collapse, reveal-slide with staggered delay, card-nota-historiografica callout inside card-detail]
key_files:
  created: []
  modified:
    - index.html
decisions:
  - No Wikimedia images included — Wikimedia returned 404/429 during URL verification; all three cards skip card-image block per D-08
  - nota-historiografica paragraph placed as last element inside card-detail (after narrative paragraphs), matching plan spec
  - Accent marks used throughout Spanish text (Éxodo Jujeño, historiográfica) to match existing site conventions
metrics:
  duration: "~3.5 minutes"
  completed: "2026-03-26"
  tasks_completed: 3
  files_modified: 1
---

# Phase 01 Plan 02: Estructura y Arco del Norte — Battle Cards Summary

**One-liner:** Three card-hecho articles (Suipacha, Huaqui, Éxodo Jujeño) inserted into the `#rev-alto-peru-guerra-gaucha` events-grid, with the Huaqui card containing the first live `.card-nota-historiografica` callout documenting the Castelli/Balcarce/Goyeneche historiographic controversy.

---

## What Was Built

### Task 1: Suipacha card (ALTO-01)

`article.event-card.card-hecho.reveal.reveal-slide` at `--reveal-delay: 0ms`, inserted as first card inside the alto-peru events-grid (replacing the placeholder comment).

Content:
- Year: `7 de noviembre de 1810`
- Title: `Batalla de Suipacha — la primera victoria patriota`
- Excerpt: First patriot military victory, Balcarce commanding under Castelli's political direction, defeat of royalist general Córdoba
- Card-detail (3 paragraphs): Primera Junta expedition context; the battle itself (small engagement, artillery captured); aftermath (Castelli in Potosí, Tiahuanaco proclamation, Liniers execution, how overreach contributed to Huaqui)
- Source: Mitre 1887, Paz Soldán 1868
- No image (Wikimedia returned 404/429 on all tested URLs)

### Task 2: Huaqui card (ALTO-02) with nota-historiografica

`article.event-card.card-hecho.reveal.reveal-slide` at `--reveal-delay: 80ms`, inserted immediately after the Suipacha card.

Content:
- Year: `20 de junio de 1811`
- Title: `Desastre de Huaqui — la pérdida del Alto Perú`
- Excerpt: Catastrophic patriot defeat, Goyeneche routing Castelli's forces, end of patriot Alto Peru control
- Card-detail (3 paragraphs + nota-historiografica): Context (Castelli's radical measures, failed armistice); the battle (army collapse, artillery loss, retreat to Jujuy); aftermath (Castelli recalled and tried, died 1812, Belgrano appointed)
- Nota historiografica: Mitre tradition vs Wasserman/Ternavasio revisionist readings — armistice violation, military conditions, Balcarce's tactical disposition
- Source: Mitre 1887, Wasserman 2011, Ternavasio 2009
- No image (Wikimedia unavailable)

### Task 3: Éxodo Jujeño card (ALTO-03)

`article.event-card.card-hecho.reveal.reveal-slide` at `--reveal-delay: 160ms`, inserted immediately after the Huaqui card.

Content:
- Year: `23 de agosto de 1812`
- Title: `El Éxodo Jujeño — tierra arrasada para salvar la revolución`
- Excerpt: Belgrano's order to evacuate Jujuy entirely, scorched-earth denial of supplies to Tristán's army
- Card-detail (3 paragraphs): Context (Junta orders vs Belgrano's judgment); the exodus (29 July bando, 23 August march, destruction of resources); significance (contributed to Tucumán Sept 1812 and Salta Feb 1813 victories, annual commemoration)
- Source: Mitre 1887, Paz 1855, Bidondo 1980
- No image (Wikimedia unavailable)

---

## Verification Results

| Check | Result |
|-------|--------|
| `grep -q 'Suipacha' index.html` | PASS |
| `grep -q 'ALTO-01' index.html` | PASS |
| `grep -q 'card-expand-toggle' index.html` | PASS |
| `grep -q 'Huaqui' index.html` | PASS |
| `grep -q 'card-nota-historiografica' index.html` | PASS |
| `grep -q 'ALTO-02' index.html` | PASS |
| `grep -q 'Jujeno\|Jujeño\|xodo' index.html` | PASS |
| `grep -q 'ALTO-03' index.html` | PASS |
| `grep -q 'Belgrano' index.html` | PASS |
| `grep -q 'tierra arrasada\|evacuaci' index.html` | PASS |
| ALTO-01 reveal-delay: 0ms | PASS (line 2358) |
| ALTO-02 reveal-delay: 80ms | PASS (line 2384) |
| ALTO-03 reveal-delay: 160ms | PASS (line 2411) |
| Cards in chronological order (Suipacha → Huaqui → Éxodo) | PASS |
| nota-historiografica mentions Castelli, Goyeneche, Balcarce | PASS |
| No JavaScript added or modified | PASS |

---

## Commits

| Task | Commit | Message |
|------|--------|---------|
| Task 1 | `53b34be` | feat(01-02): add Suipacha card (ALTO-01) — first patriot victory |
| Task 2 | `5abc152` | feat(01-02): add Huaqui card (ALTO-02) with nota-historiografica callout |
| Task 3 | `d09c713` | feat(01-02): add Éxodo Jujeño card (ALTO-03) — scorched earth evacuation |

---

## Deviations from Plan

### Auto-fixed Issues

None — plan executed exactly as written.

### Image Deviation (Rule 1 — per D-08)

**Found during:** Tasks 1, 2, and 3 (all three cards)
**Issue:** Plan instructed to verify Wikimedia image URLs before including. Wikimedia Commons returned HTTP 404 for all tested Balcarce/Castelli portrait URLs and HTTP 429 (rate-limited) for the Belgrano portrait. No URLs could be verified as resolving correctly.
**Fix:** Per D-08 (explicit plan instruction): "If no appropriate image found after verification, SKIP the card-image block entirely." All three cards skip the `<div class="card-image">` block.
**Impact:** Cards render without a top image; all other structure and content is complete. Plan 03 may be able to include images if Wikimedia availability improves.

---

## Known Stubs

None — all three cards are fully populated with verified historical content and bibliographic sources. No placeholder text, TODO items, or hardcoded empty values in the new cards.

---

## Self-Check: PASSED

- index.html: ALTO-01 comment at line 2357, article at line 2358 — FOUND
- index.html: ALTO-02 comment at line 2383, article at line 2384 — FOUND
- index.html: ALTO-03 comment at line 2410, article at line 2411 — FOUND
- index.html: card-nota-historiografica paragraph in Huaqui card-detail — FOUND
- Commit `53b34be` — FOUND
- Commit `5abc152` — FOUND
- Commit `d09c713` — FOUND
