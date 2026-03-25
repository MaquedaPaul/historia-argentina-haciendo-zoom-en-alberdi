---
id: T01
parent: S02
milestone: M021
provides:
  - "#rev-san-martin sub-period container with 6 event cards (Entradas 1–6) inserted in index.html"
key_files:
  - index.html
key_decisions:
  - Write block to tmp file first then inject via Edit to avoid heredoc/shell escaping issues on Windows (per KNOWLEDGE.md pattern)
  - card-nota-historiografica placed AFTER card-detail and BEFORE footer (not inside card-detail) so notes are always visible
  - Granaderos image uses direct URL (no /thumb/) because the original is 495px — thumb paths 404 on images narrower than 500px
patterns_established:
  - "Two-step HTML block injection: Write → tmp file, Edit → index.html with exact anchor text"
  - "Stagger delays: 0ms, 80ms, 160ms, 240ms, 320ms, 400ms for 6 sequential cards"
observability_surfaces:
  - "document.querySelectorAll('#rev-san-martin .event-card').length → 6"
  - "grep -c 'data-certeza' index.html → 99"
  - "node -e 'new Function(fs.readFileSync(\"app.js\",\"utf8\")); console.log(\"OK\")' → OK"
duration: ~15m
verification_result: passed
completed_at: 2026-03-25
blocker_discovered: false
---

# T01: Crear e insertar bloque HTML de #rev-san-martin con 6 cards en index.html

**Inserted `<div id="rev-san-martin">` with 6 historiographically annotated event cards (Entradas 1–6) between `#rev-1800-1820` and the Alberdi connector in index.html — all slice verification checks pass.**

## What Happened

Read `S01-CONTENT-DRAFT.md` Entradas 1–6 and the image verification table to extract all content, certeza values, URLs, and historiographic notes. Wrote the complete HTML block to `tmp-san-martin-s02.html` using the Write tool (avoiding heredoc/shell issues on Windows). Injected the block into `index.html` using the Edit tool with the exact anchor `</div><!-- /#rev-1800-1820 -->` / `<!-- CONECTOR ALBERDI — SP1 → SP2 (Pasaje 1) -->`. Cleaned up the temp file.

Cards breakdown:
- **Entradas 1, 2, 5, 6** — `card-hecho`, `data-certeza="hecho"`, icon `✓`, label "Hecho documentado"
- **Entradas 3, 4** — `card-opinion`, `data-certeza="debatido"` (no accent), icon `&#x2696;`, label "Debatido historiográficamente", `card-nota-historiografica` visible after `card-detail` and before footer
- Stagger delays: 0ms / 80ms / 160ms / 240ms / 320ms / 400ms
- Entrada 5 image: direct URL `https://upload.wikimedia.org/wikipedia/commons/3/31/Uniformes_Granaderos_a_caballo_1816.png` (no `/thumb/` — image is 495px)
- Entrada 6 image: thumb 500px `Batalla_de_San_Lorenzo_por_Villanueva.jpg`
- Entradas 1–4 image: Gil de Castro 500px fallback

Also added `## Observability / Diagnostics` section to `S02-PLAN.md` per pre-flight requirements.

## Verification

Ran all slice and task verification commands immediately after the Edit:

```bash
grep -c 'id="rev-san-martin"' index.html          # → 1 ✅
grep -c 'data-certeza' index.html                  # → 99 ✅
grep -c 'data-certeza="debatido"' index.html       # → 7 ✅
grep -c 'card-nota-historiografica' index.html     # → 14 ✅
grep 'Uniformes_Granaderos' index.html | grep -v '/thumb/'  # → 1 match ✅
grep -c 'events-grid--certeza' index.html          # → 14 ✅
grep -A2 'id="rev-san-martin"' index.html | head -5  # → sub-period + h3 visible ✅
grep 'CONECTOR ALBERDI.*SP1.*SP2' index.html       # → connector intact ✅
node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK'); } ..."  # → OK ✅
```

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c 'id="rev-san-martin"' index.html` | 0 (output: 1) | ✅ pass | <1s |
| 2 | `grep -c 'data-certeza' index.html` | 0 (output: 99) | ✅ pass | <1s |
| 3 | `grep -c 'data-certeza="debatido"' index.html` | 0 (output: 7) | ✅ pass | <1s |
| 4 | `grep -c 'card-nota-historiografica' index.html` | 0 (output: 14) | ✅ pass | <1s |
| 5 | `grep 'Uniformes_Granaderos' index.html \| grep -v '/thumb/'` | 0 (1 match) | ✅ pass | <1s |
| 6 | `grep -c 'events-grid--certeza' index.html` | 0 (output: 14) | ✅ pass | <1s |
| 7 | `grep 'CONECTOR ALBERDI.*SP1.*SP2' index.html` | 0 (match found) | ✅ pass | <1s |
| 8 | JS syntax check via `node -e "new Function(...)"` | 0 (output: OK) | ✅ pass | <1s |

## Diagnostics

Post-deployment inspection:
- **Card count:** `document.querySelectorAll('#rev-san-martin .event-card').length` → 6
- **Nota visibility:** `document.querySelector('.card-nota-historiografica').closest('[hidden]')` → null (not hidden inside card-detail)
- **Debatido count:** `document.querySelectorAll('#rev-san-martin [data-certeza="debatido"]').length` → 2
- **Granaderos image:** `document.querySelector('#rev-san-martin img[src*="Uniformes_Granaderos"]').src` → direct URL without `/thumb/`
- **expand/collapse:** all 6 cards have `card-expand-toggle` + `card-detail hidden` — no new JS required, existing app.js handles it

## Deviations

None. The two-step Write+Edit approach documented in the plan was followed exactly. The anchor text matched perfectly with no whitespace surprises.

## Known Issues

None.

## Files Created/Modified

- `index.html` — Inserted `<div id="rev-san-martin">` block with 6 cards between `#rev-1800-1820` and CONECTOR ALBERDI SP1→SP2
- `.gsd/milestones/M021/slices/S02/S02-PLAN.md` — Added `## Observability / Diagnostics` section; marked T01 `[x]`
- `tmp-san-martin-s02.html` — Created as staging buffer, then deleted
