---
id: S01
parent: M022
provides:
  - Sub-nav scrolleable horizontalmente en todos los anchos
  - 72 cards con excerpts truncados a ~280 chars + expand/collapse funcional
  - initExpandCollapse cubriendo todos los períodos (no solo revolución)
  - Página reducida de 56450px a ~50000px
key_files:
  - styles.css (sub-nav)
  - index.html (72 cards)
  - app.js (initExpandCollapse)
key_decisions:
  - "sub-nav: overflow-x:auto + flex-start (no reducción de font-size)"
  - "threshold 400 chars para truncado"
  - "scope initExpandCollapse: .site-main"
patterns_established:
  - "script node.js para batch-processing de markup repetitivo"
duration: 45min
verification_result: pass
completed_at: 2026-03-25T19:35:00Z
---

# S01: Sub-nav scrolleable y cards truncadas

**Sub-nav scrolleable y 72 cards truncadas — los dos problemas de layout más visibles resueltos**

## What Happened

T01 resolvió el overflow del sub-nav con dos cambios en CSS. T02 procesó 72 cards con un script Node.js + un cambio en app.js para que el toggle funcione en todos los períodos.

## Deviations
11 cards con nota-historiografica/blockquotes siguen siendo altas (>1000px) — aceptable por diseño.

## Files Created/Modified
- `styles.css` — sub-nav fix
- `index.html` — 72 cards truncadas
- `app.js` — initExpandCollapse scope ampliado
