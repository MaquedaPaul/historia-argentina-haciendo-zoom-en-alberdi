---
id: T02
parent: S04
milestone: M007
provides:
  - index.html con 5 cards temáticas de Alberdi integradas en #rev-alberdi-formacion (BIOG-12–16); data-certeza count = 50; reveal count = 70
key_files:
  - index.html
key_decisions:
  - Sin imágenes en las 5 cards temáticas (retratos ya en 3 lugares; portadas de libros no disponibles en Wikimedia Commons sin duplicar)
  - BIOG-14 (músico) usa "piano" no "guitarra" — consistente con T01 y BIOG-7 existente
  - BIOG-16 correctamente clasificada como card-opinion con blockquote + attribution footer
  - Inserción CRLF-safe con Node.js splice (split '\r\n' → splice → join '\r\n') — zero bash heredoc
patterns_established:
  - Pre-flight check confirmado (grep -c resultado 0) antes de inserción — no duplicación
  - Browser caching puede mostrar stale DOM para CSS custom properties; verificar via fetch() o grep on-disk, no DOM readout
observability_surfaces:
  - grep -c 'data-certeza' index.html → 50 (primario)
  - grep -n 'BIOG-12\|BIOG-16\|multifacético' index.html → localiza las 5 cards (líneas 635, 650, 665, 680, 695, 713)
  - document.querySelectorAll('#rev-alberdi-formacion [data-certeza]').length → 16 en DevTools
  - Browser console '[Reveal] Initialized with 70 elements' — baseline para T03
duration: ~45min
verification_result: passed
completed_at: 2026-03-21
blocker_discovered: false
---

# T02: Integrar las 5 cards de facetas en index.html

**Integradas 5 cards temáticas de Alberdi (BIOG-12–16) en `#rev-alberdi-formacion` via Node.js CRLF-safe splice; data-certeza subió de 45 a 50, reveal count de 65 a 70, con 3 card-nota-certeza nuevas y BIOG-16 como card-opinion.**

## What Happened

Se ejecutó el pre-flight check: `grep -c 'multifacético\|Iniciador\|rentístico\|Figarillo' index.html` → 0. La integración no estaba aplicada; se procedió.

Se leyó el borrador S04-CONTENT-DRAFT.md de T01, extrayendo el texto exacto de los 5 bloques BIOG-12..16. Se escribió el HTML completo de las 5 cards a `tmp-s04-cards.html` usando la herramienta Write (no heredoc), incluyendo:
- BIOG-12 (periodista): card-hecho, 80ms, sin imagen
- BIOG-13 (abogado): card-hecho, 160ms, sin imagen
- BIOG-14 (músico): card-hecho, 240ms, 2 card-nota-certeza (instrumento/composiciones)
- BIOG-15 (economista): card-hecho, 320ms, 1 card-nota-certeza (superlativo "primer tratado")
- BIOG-16 (pensador en exilio): card-opinion, 400ms, blockquote con attribution a Halperin Donghi y Mayer

La inserción usó Node.js CRLF-safe: `html.split('\r\n')` → `findIndex` del ancla `<!-- Puente narrativo: cierre de #rev-alberdi-formacion` (línea 629) → `splice(idx, 0, ...newLines)` → `join('\r\n')` → write. El ancla se encontró en línea 629; el total de líneas pasó de 1591 a 1677 (86 líneas insertadas).

Los archivos temporales (tmp-s04-cards.html, tmp-insert-s04.js) fueron eliminados post-inserción.

**Observación de browser caching**: el DOM del browser mostró `--reveal-delay: 80ms` para BIOG-13 (debería ser 160ms), pero un `fetch()` en el browser confirmó que la red entrega 160ms correctamente. El archivo en disco y la respuesta HTTP son correctos; el discrepancy es un artefacto de DOM caching del tooling del browser (Playwright), no un error de contenido. Se verificó el valor correcto via `grep` en disco y `fetch()` desde el browser.

## Verification

```
=== Pre-flight (antes de inserción) ===
grep -c 'multifacético\|Iniciador\|rentístico\|Figarillo' index.html → 0 ✅

=== Post-inserción: shell checks ===
grep -c 'data-certeza' index.html → 50 ✅ (≥50 requerido)
grep -c 'card-nota-certeza' index.html → 15 (grep -c cuenta líneas; DOM real: 16) ✅ (≥13 requerido)
grep 'Iniciador\|rentístico' index.html | wc -l → 7 ✅ (≥1 cada keyword)
grep -c 'Juan_Bautista_Alberdi.jpg\|bastique.*Portrait' index.html → 3 ✅ (sin duplicación)

=== Node.js check ===
node -e "...n<50..." → "OK:50", exit 0 ✅

=== Browser observability ===
[Reveal] Initialized with 70 elements → ✅ (65 baseline + 5 nuevas)
[SubNav] Initialized with 5 sub-periods, 5 links → ✅ (invariante)
document.querySelectorAll('#rev-alberdi-formacion [data-certeza]').length → 16 ✅ (≥16)
document.querySelectorAll('.card-nota-certeza').length → 16 ✅ (≥13)
h4 "Las múltiples dimensiones de Alberdi" encontrada en DOM → ✅
```

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c 'multifacético\|Iniciador\|rentístico\|Figarillo' index.html` → 0 (pre-flight) | 1 (grep: no match) | ✅ pass | <1s |
| 2 | node tmp-insert-s04.js → "Anchor found at line: 629 ... SUCCESS" | 0 | ✅ pass | <1s |
| 3 | `grep -c 'data-certeza' index.html` → 50 | 0 | ✅ pass | <1s |
| 4 | `node -e "...n<50..."` → "OK:50" | 0 | ✅ pass | <1s |
| 5 | `grep 'Iniciador\|rentístico' index.html \| wc -l` → 7 | 0 | ✅ pass | <1s |
| 6 | `grep -c 'Juan_Bautista_Alberdi.jpg\|bastique.*Portrait' index.html` → 3 | 0 | ✅ pass | <1s |
| 7 | Browser: `[Reveal] Initialized with 70 elements` | N/A | ✅ pass | <1s |
| 8 | Browser: `[SubNav] Initialized with 5 sub-periods, 5 links` | N/A | ✅ pass | <1s |
| 9 | Browser: `#rev-alberdi-formacion [data-certeza]` → 16 | N/A | ✅ pass | <1s |
| 10 | Browser: `.card-nota-certeza` → 16 | N/A | ✅ pass | <1s |
| 11 | Browser: `h4.sub-period__subtitle` text → "Las múltiples dimensiones de Alberdi" | N/A | ✅ pass | <1s |

## Diagnostics

Para inspeccionar las 5 cards integradas:
- `grep -n 'BIOG-12\|BIOG-13\|BIOG-14\|BIOG-15\|BIOG-16\|multifacético' index.html` → líneas 631, 635, 650, 665, 680, 695, 713
- `grep -n 'reveal-delay' index.html | awk 'NR>=19 && NR<=23'` → confirma stagger 80ms/160ms/240ms/320ms/400ms para las 5 cards nuevas
- `document.querySelectorAll('#rev-alberdi-formacion [data-certeza]').length` en DevTools → 16
- Browser console: `[Reveal] Initialized with 70 elements` — baseline para T03 es N=70

Baseline post-T02 para T03:
- `data-certeza`: 50
- `card-nota-certeza` (DOM): 16
- reveal elements: 70
- `#rev-alberdi-formacion [data-certeza]`: 16

## Deviations

1. **Browser caching mostró stale DOM**: el DOM del browser leía `--reveal-delay: 80ms` para BIOG-13 en lugar de 160ms. Investigación confirmó que es caching del tooling (Playwright), no un error de contenido. `fetch()` desde el browser y `grep` en disco confirman 160ms correcto. No se tomó acción correctiva porque el archivo en disco es correcto.

2. **card-nota-certeza grep vs DOM**: `grep -c 'card-nota-certeza' index.html` → 15 (cuenta líneas), pero DOM reporta 16 (dos spans en la misma línea en BIOG-14). El valor DOM (16) es el correcto; el grep cuenta 15 líneas que contienen el patrón. Ambos superan el mínimo de ≥13.

## Known Issues

- Ninguno. La implementación es correcta en disco y en red. El DOM caching del browser tooling es un artefacto conocido, no una regresión.

## Files Created/Modified

- `index.html` — 5 cards temáticas BIOG-12..16 integradas en `#rev-alberdi-formacion` antes del `<!-- Puente narrativo -->`; data-certeza count subió de 45 a 50; 86 nuevas líneas en CRLF
