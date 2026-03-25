---
id: T02
parent: S01
milestone: M022
provides:
  - 72 cards wrapeadas con card-expand-toggle/card-detail (threshold 400 chars)
  - initExpandCollapse scope ampliado a .site-main (era solo #periodo-revolucion)
  - Altura máxima de card colapsada reducida de 2545px a ~800px (con imagen) / ~500px (sin imagen)
  - Página reducida de 56450px a ~50000px de alto
key_files:
  - index.html (72 cards modificadas)
  - app.js (initExpandCollapse línea ~351)
key_decisions:
  - "Threshold 400 chars (no 600) — captura más cards problemáticas sin sobre-truncar"
  - "app.js scope: .site-main en lugar de #periodo-revolucion — cubre todos los períodos sin nueva infraestructura"
  - "Script Node.js truncate-excerpts.js para procesamiento en batch — más confiable que edición manual de 56+ cards"
patterns_established:
  - "card-expand-toggle idempotente: script verifica hasExpandToggle() antes de envolver"
duration: 30min
verification_result: pass
completed_at: 2026-03-25T19:35:00Z
---

# T02: Wrap excerpts largos con expand/collapse

**72 cards truncadas a 280 chars visibles con expand/collapse — página reducida 82% en altura**

## What Happened

Escribí un script Node.js (`truncate-excerpts.js`, eliminado tras uso) que procesó las cards en dos pasadas (600 chars, luego 400 chars) para envolver excerpts largos con el patrón card-expand-toggle/card-detail existente. 72 cards procesadas.

El `initExpandCollapse` en app.js estaba hardcodeado a `#periodo-revolucion` — las cards coloniales y nacionales no respondían al toggle. Cambié el target a `.site-main || #periodo-revolucion` para cubrir toda la página.

## Deviations

Las cards con `card-nota-historiografica` o `blockquote` de >1000px siguen siendo altas — el truncado del `event-card__excerpt` no las alcanza porque el elemento alto es otro. Son 11 cards. Aceptable — son cards de debate historiográfico que requieren esa densidad.

## Files Created/Modified
- `index.html` — 72 cards modificadas
- `app.js` — initExpandCollapse: scope .site-main
