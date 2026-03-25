---
id: S02
parent: M021
milestone: M021
provides:
  - "<div id=\"rev-san-martin\" class=\"sub-period reveal reveal-fade\"> container with 6 event cards (Entradas 1–6) inserted in index.html"
  - "Sub-period structure established and stable for S03/S04 append"
requires:
  - slice: S01
    provides: "S01-CONTENT-DRAFT.md — ≥15 entries with certeza, images, historiographic notes"
affects:
  - S03
  - S04
key_files:
  - index.html
key_decisions:
  - "Two-step HTML block injection: Write → tmp file, Edit → index.html with exact anchor text (avoids heredoc/shell escaping issues on Windows)"
  - "card-nota-historiografica placed AFTER card-detail and BEFORE footer — ensures notes are always visible (not hidden inside collapsed detail)"
  - "Granaderos image uses direct URL without /thumb/ — source image is 495px, thumb paths 404 on images narrower than 500px"
  - "Entradas 1–4 use Gil de Castro portrait fallback (URL already present in index.html)"
  - "data-certeza='debatido' (no accent) used for the two opinion cards (Entradas 3, 4)"
patterns_established:
  - "Sub-period container pattern: <div id='rev-X' class='sub-period reveal reveal-fade'> + h3 section title + events-grid--certeza"
  - "Stagger delays 0/80/160/240/320/400ms for 6 sequential cards"
  - "card-nota-historiografica visibility rule: always outside card-detail, directly in .event-card body"
observability_surfaces:
  - "document.querySelectorAll('#rev-san-martin .event-card').length → 6"
  - "document.querySelectorAll('#rev-san-martin .card-nota-historiografica').length → 2"
  - "document.querySelectorAll('#rev-san-martin [data-certeza=\"debatido\"]').length → 2"
  - "document.querySelector('#rev-san-martin img[src*=\"Uniformes_Granaderos\"]).src → direct URL without /thumb/"
  - "grep -c 'data-certeza' index.html → 99"
  - "node -e 'new Function(require(\"fs\").readFileSync(\"app.js\",\"utf8\")); console.log(\"OK\")' → OK"
drill_down_paths:
  - ".gsd/milestones/M021/slices/S02/tasks/T01-SUMMARY.md"
duration: ~15m (single task)
verification_result: passed
completed_at: 2026-03-25
---

# S02: Formación en España, identidad criolla, logias y Granaderos

**`#rev-san-martin` sub-period container with 6 historiographically annotated event cards (Entradas 1–6 del content draft) inserted in `index.html` — all slice verification checks pass.**

## What Happened

A single task (T01) delivered the entire slice goal. Content was read from `S01-CONTENT-DRAFT.md` (Entradas 1–6) and the Wikimedia image verification table. The HTML block was written to a temporary staging file (`tmp-san-martin-s02.html`) using the Write tool to avoid heredoc/shell escaping issues on Windows, then injected into `index.html` via a precise Edit anchored between `</div><!-- /#rev-1800-1820 -->` and `<!-- CONECTOR ALBERDI — SP1 → SP2 (Pasaje 1) -->`. The temp file was deleted after injection.

**Cards delivered:**

| Entrada | Title | Certeza | Image |
|---------|-------|---------|-------|
| 1 | Infancia en Yapeyú y España — orígenes de San Martín | hecho | Gil de Castro fallback |
| 2 | Oficial del Ejército español — formación y campañas | hecho | Gil de Castro fallback |
| 3 | Las logias masónicas y la decisión del regreso | debatido | Gil de Castro fallback |
| 4 | La identidad criolla — ¿conversión o convicción? | debatido | Gil de Castro fallback |
| 5 | Creación del Regimiento de Granaderos a Caballo | hecho | Direct URL (495px, no /thumb/) |
| 6 | Bautismo de fuego: la Batalla de San Lorenzo | hecho | Thumb 500px (Villanueva painting) |

The two `debatido` cards (Entradas 3 and 4) each carry a `card-nota-historiografica` paragraph placed visibly outside `card-detail` — this was a deliberate positioning decision so the epistemic notice is always readable without user interaction.

No new JS or CSS was required. Expand/collapse, reveal-on-scroll, and image fallbacks are all handled by the existing `app.js` infrastructure.

## Verification

All slice-level checks ran and passed immediately after injection:

| Check | Expected | Actual | Result |
|-------|----------|--------|--------|
| `grep -c 'id="rev-san-martin"' index.html` | 1 | 1 | ✅ |
| `grep -c 'data-certeza' index.html` | 99 | 99 | ✅ |
| `grep -c 'data-certeza="debatido"' index.html` | 7 | 7 | ✅ |
| `grep -c 'card-nota-historiografica' index.html` | 14 | 14 | ✅ |
| `grep 'Uniformes_Granaderos' \| grep -v '/thumb/'` | 1 match | 1 match | ✅ |
| JS syntax check (`new Function`) | OK | OK | ✅ |

## New Requirements Surfaced

- none

## Deviations

None. The two-step Write+Edit approach from the plan was followed exactly. Anchor text matched without whitespace surprises.

## Known Limitations

- Entradas 1–4 share a single fallback image (Gil de Castro portrait) because no period-appropriate images were available for the formación/logias/identidad topics at the time of S01 research. Visual variety in this section is lower than S03/S04 (which have battle paintings and specific event images).
- The `#rev-san-martin` sub-period is not yet linked from the sub-nav (deferred to S05).
- No `revolucion-timeline` markers for 1812 yet (deferred to S05).

## Follow-ups

- S03 appends 6 battle cards directly after the existing 6 cards in `#rev-san-martin` — structure is stable, no restructuring needed.
- S05 adds sub-nav link and timeline markers for 1812/1817.

## Files Created/Modified

- `index.html` — Inserted `<div id="rev-san-martin">` block with 6 cards between `#rev-1800-1820` and CONECTOR ALBERDI SP1→SP2
- `.gsd/milestones/M021/slices/S02/S02-PLAN.md` — Added `## Observability / Diagnostics` section; marked T01 `[x]`
- `tmp-san-martin-s02.html` — Created as staging buffer, then deleted

---

## Forward Intelligence

### What the next slice should know

- **Insertion anchor for S03:** Append battle cards inside `#rev-san-martin` immediately before the closing `</div><!-- /#rev-san-martin -->`. The grid is `div.events-grid events-grid--certeza` — add cards directly into it as siblings of the existing 6.
- **Stagger delays for S03 cards:** Continue from 400ms (last S02 card). S03's first card should use `--reveal-delay: 480ms`, incrementing by 80ms per card. This maintains consistent stagger across all 12+ cards in the sub-period.
- **data-certeza="debatido" (no accent):** S02 established this as the value for historiographically contested cards. S03/S04 should use the same unaccented form for consistency (per KNOWLEDGE.md certeza normalization note).
- **card-nota-historiografica position:** Always place after `card-detail`, before the footer `cite`. Never inside `card-detail hidden`.
- **Image URL pattern:** Batalla de San Lorenzo (Entrada 6) uses a 500px thumb — use the same pattern for other battle images in S03. Check via Wikimedia API if any battle images are narrower than 500px (use direct URL in that case).

### What's fragile

- **Gil de Castro fallback overuse** — 4 of 6 cards share the same fallback image. If S03 also falls back to Gil de Castro for any cards, the section will appear visually repetitive. Push for distinct images for each S03 battle card.
- **Anchor text dependency** — The S03 append relies on finding `</div><!-- /#rev-san-martin -->` as the closing anchor. Verify this string exists before the Edit: `grep -c '/\*/#rev-san-martin' index.html` (expecting 1).

### Authoritative diagnostics

- `document.querySelectorAll('#rev-san-martin .event-card').length` — primary card count signal; should be 6 after S02, 12 after S03, ≥14 after S04.
- `grep -c 'data-certeza' index.html` — cumulative certeza count: 99 after S02, ~105 after S03, ~109+ after S04.

### What assumptions changed

- No assumptions changed. S01 content draft was fully usable as specified. The insertion anchor was present exactly as documented in the boundary map.
