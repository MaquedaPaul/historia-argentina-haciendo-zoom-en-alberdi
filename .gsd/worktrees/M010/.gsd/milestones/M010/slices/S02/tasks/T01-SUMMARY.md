---
id: T01
parent: S02
milestone: M010
provides:
  - Manifiesto verificado de URLs de imágenes Wikimedia para las 11 cards de la Semana de Mayo (T01-IMAGE-MANIFEST.md)
  - URLs 500px confirmadas via API para 10 de las 11 cards; 1 card (Temática 4) con fallback explícito documentado
key_files:
  - .gsd/milestones/M010/slices/S02/tasks/T01-IMAGE-MANIFEST.md
  - .gsd/milestones/M010/slices/S02/S02-PLAN.md
key_decisions:
  - Evento 3 (22 mayo) usa Acta del 22 de mayo (documento primario) en lugar de Cabildo_abierto.jpg (Subercaseaux) para evitar triple duplicación visual con SP1-1 y Temática 2
  - Temática 4 (debate historiográfico) no tendrá bloque card-image — ninguna imagen apropiada encontrada; portadas de libro requieren fair use
  - Temática 1 (French/Berutti) usa retrato de Domingo French como imagen primaria; portrait de Beruti documentado como alternativa disponible
patterns_established:
  - Búsqueda de retratos históricos en Commons via srsearch con términos "retrato" + nombre reduce false positives de PDFs
  - Category:May_Revolution en Commons contiene actas históricas como imágenes JPEG directas
  - Vidal watercolors (1817-1820) son la fuente PD más apropiada para imágenes del espacio urbano de Buenos Aires circa 1810
observability_surfaces:
  - T01-IMAGE-MANIFEST.md — tabla con URLs verificadas; consumir directamente en T02 sin re-investigar
  - Columna "Notas" del manifiesto indica las cards con imágenes compartidas (duplicación intencional vs. accidental)
  - Sección "API queries ejecutadas" del manifiesto registra qué filenames exactos fueron probados y su resultado
duration: ~35m
verification_result: passed
completed_at: 2026-03-24
blocker_discovered: false
---

# T01: Verificar URLs de imágenes Wikimedia para las 11 cards

**Manifiesto de imágenes verificado: 10 de 11 cards tienen URL confirmada via API, 1 card con fallback explícito "sin imagen" documentado.**

## What Happened

Se verificaron via Wikimedia API las URLs de imagen para las 11 cards de la Semana de Mayo del draft S01-CONTENT-DRAFT.md. El protocolo fue: query `?action=query&titles=File:FILENAME&prop=imageinfo&iiprop=url&iiurlwidth=500` en `en.wikipedia.org/w/api.php` o `commons.wikimedia.org/w/api.php`; cuando `thumbwidth < 500`, la API devuelve la URL directa (sin `/thumb/`), per KNOWLEDGE.md.

**Resultados principales:**
- **Cisneros** (`Baltasar_Hidalgo_de_Cisneros.jpg`): 448px — URL directa confirmada. Usado para Eventos 1 y 4.
- **Saavedra** (`Cornelio_Saavedra.jpg`): 362px — URL directa confirmada. Usado para Eventos 6 y Temática 3.
- **Belgrano** (`Manuel_Belgrano.JPG`): 500px thumb confirmada. Reutilizado desde SP1-3 para Evento 2.
- **Moreno** (`Mariano_Moreno.jpg`): 500px thumb confirmada. Para Evento 7.
- **Cabildo Abierto** (`Cabildo_abierto.jpg`): 500px thumb confirmada. Ya en SP1-1; reutilizado para Temática 2 únicamente.
- **Acta del 22 de mayo** (`Acta_del_22_de_mayo_de_1810.jpg`): 500px thumb confirmada. Elegida para Evento 3 en lugar de `Cabildo_abierto.jpg` para evitar triple duplicación visual.
- **Plaza de la Victoria** (`The_town_square,_Buenos_Aires_1818.jpg`): 500px thumb confirmada. Acuarela Vidal 1818 — vista idéntica a 1810. Para Evento 5.
- **French** (`Domingo_French_(retrato).jpg`): 415px — URL directa confirmada. Encontrado via búsqueda `srsearch`. Para Temática 1.
- **Debate historiográfico** (Temática 4): Sin imagen. Fallback = omitir bloque `<div class="card-image">` completamente.

**Decisión de coherencia visual clave:** El Acta del 22 de mayo fue elegida para Evento 3 en lugar de la pintura de Subercaseaux (`Cabildo_abierto.jpg`). Razón: SP1-1 ya usa Subercaseaux, Temática 2 lo reutilizará — una tercera aparición en Evento 3 crearía saturación visual. El documento histórico primario (el acta) es además más apropiado para una card que cubre el debate sobre la votación.

Se agregó también la sección `## Observability / Diagnostics` al S02-PLAN.md per preflight requirement, incluyendo un check #7 diagnóstico adicional en la sección Verification.

## Verification

```bash
test -f .gsd/milestones/M010/slices/S02/tasks/T01-IMAGE-MANIFEST.md
# → PASS: file exists

grep -c "^| " .gsd/milestones/M010/slices/S02/tasks/T01-IMAGE-MANIFEST.md
# → 31 (header + 11 card rows + 3 tabla adicional rows + separadores)
# ≥ 12 required → PASS
```

Slice-level checks ejecutados en este task (partial pass esperado — T02 aún no ejecutado):
- Check 1 (11 nuevas cards): 0 — ❌ esperado, T02 pendiente
- Check 5 (SP1-1 title intact): ✅ PASS
- Check 6 (no CSS/JS changes): ✅ PASS

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -f .gsd/milestones/M010/slices/S02/tasks/T01-IMAGE-MANIFEST.md` | 0 | ✅ pass | <1s |
| 2 | `grep -c "^| " .gsd/milestones/M010/slices/S02/tasks/T01-IMAGE-MANIFEST.md` | 0 (output: 31) | ✅ pass (≥12) | <1s |
| 3 | `grep -q "El Cabildo Abierto y la Revolución de Mayo" index.html` | 0 | ✅ pass | <1s |
| 4 | `git diff --name-only HEAD \| grep -v index.html \| grep -q "styles.css\|app.js"` | 1 (no match) | ✅ pass | <1s |

## Diagnostics

Para inspeccionar el manifiesto:
- **Leer** `.gsd/milestones/M010/slices/S02/tasks/T01-IMAGE-MANIFEST.md` — tabla completa con URL verificada por card
- **Verificar URLs en browser**: abrir cualquier URL del manifiesto directamente — deben retornar imagen JPEG
- **Cards sin imagen**: solo Temática 4 — buscar `"sin card-image"` en el manifiesto para confirmar
- **Cards con imagen compartida**: buscar `"Misma imagen"` en columna Notas del manifiesto para ver duplicaciones intencionales

Si una URL del manifiesto falla en browser después de T02:
1. Confirmar que la URL no tiene caracteres especiales escapados incorrectamente (el `%2C` en `The_town_square%2C_Buenos_Aires_1818.jpg` es correcto — es una coma)
2. Para Cisneros y Saavedra (URLs directas sin `/thumb/`): el `width="100%"` en el `<img>` es suficiente para escalar correctamente

## Deviations

- **Candidato `Acta_capitular_1810.jpg` no encontrado**: El archivo candidato del draft no existe en Wikimedia Commons. La búsqueda `srsearch=Acta+capitular+1810` devolvió solo PDFs (Acuerdos del Cabildo), no imágenes JPEG. Se sustituyó por `Acta_del_22_de_mayo_de_1810.jpg` (confirmada vía Category:May_Revolution en Commons).
- **French/Berutti**: El draft marcaba "sin candidato verificado". Se encontró `Domingo_French_(retrato).jpg` en Commons via búsqueda `srnamespace=6`. La card temática 1 tiene imagen confirmada.
- **Temática 4**: Confirmado sin imagen — no se encontró imagen apropiada que no requiera fair use.

## Known Issues

- Eventos 1 y 4 usan la misma imagen de Cisneros — duplicación visual entre cards adyacentes. Aceptable dado que el personaje es el mismo y no hay alternativa verificada.
- Eventos 6 y Temática 3 comparten imagen de Saavedra — ídem.
- `The_town_square,_Buenos_Aires_1818.jpg` tiene una coma en el nombre del archivo — en la URL del thumb, la coma se escapa como `%2C`. T02 debe usar la URL exactamente como está en el manifiesto.

## Files Created/Modified

- `.gsd/milestones/M010/slices/S02/tasks/T01-IMAGE-MANIFEST.md` — Manifiesto nuevo con 11 entradas verificadas via API
- `.gsd/milestones/M010/slices/S02/S02-PLAN.md` — Agregada sección `## Observability / Diagnostics` y check diagnóstico #7 en Verification (pre-flight fix per task requirements)
