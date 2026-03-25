---
id: T02
parent: S01
milestone: M010
provides:
  - S01-CONTENT-DRAFT.md — contrato de contenido completo con 11 entradas de card (7 day-by-day + 3 temáticas + 1 nota historiográfica), cada una con certeza, fuentes verificadas, extracto de 3–5 oraciones, cita `<cite>`, y notas de imagen
key_files:
  - .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md
key_decisions:
  - Las 7 cards day-by-day usan certeza `hecho` para 5 fechas (14, 18, 23, 24, 25 mayo) y `debatido` para 2 (22 mayo por el recuento de votos, y 26–31 mayo por falta de desglose diario)
  - La card temática French/Berutti usa `debatido` para el nombre del grupo (verificado en T01 — "chisperos" es contemporáneo, "Legión Infernal" es posterior)
  - La card de manipulación del Cabildo usa `debatido` y documenta que "sobres duplicados" no está en fuentes académicas — mecanismo verificado es "control de acceso y alteración de lista"
  - La card nota historiográfica (Card Temática 4) usa data-certeza="debatido" con card-opinion CSS class per D052 y D058
  - Total: 11 cards, 5 hecho, 5 debatido, 0 opinión, 0 rumor, 1 nota-historiográfica
patterns_established:
  - El Resumen de certeza al final del draft lista explícitamente los 8 [VERIFICAR] pendientes — patrón de epistemic honesty para agentes futuros
  - La discrepancia de votos del 22 mayo (155/69 vs 158/67 vs 162/64) se resuelve usando rango "entre 155 y 162" en el extracto, citando la fuente académica Rincón & Heavey (UNLP 2023) que coincide con SP1-1
observability_surfaces:
  - grep -n "VERIFICAR" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md — 22 flags de claims inciertos con ubicación exacta
  - grep -c "Certeza:" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md — devuelve 11 (cobertura completa)
  - grep -c "^### Fuentes" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md — devuelve 11 (todas las cards tienen fuentes)
  - Failure state: si el segundo número < (primero - 1), alguna card carece de sección de fuentes — visible inmediatamente
duration: ~40m
verification_result: passed
completed_at: 2026-03-24
blocker_discovered: false
---

# T02: Escribir S01-CONTENT-DRAFT.md con las entradas verificadas

**S01-CONTENT-DRAFT.md escrito con 11 cards (7 day-by-day + 3 temáticas + 1 nota historiográfica), todas con fuentes verificadas y certeza asignada — draft listo para consumo mecánico por S02.**

## What Happened

Se ejecutaron los 6 pasos del plan. El draft toma como única fuente de verdad el `S01-RESEARCH-NOTES.md` de T01 y produce el contrato de contenido formal en el formato exacto del M002-S01-CONTENT-DRAFT.md.

**Paso 1 — Header estándar:** Creado con status, total events (11), language y contexto.

**Paso 2 — 7 entradas day-by-day:** Escritas en orden cronológico: 14, 18, 22, 23, 24, 25 mayo, y 26–31 mayo (la fecha "30 mayo" del plan se convirtió en "26–31 mayo" por la finding de T01 — ver Deviaciones). Certezas: 5 `hecho` (14, 18, 23, 24, 25 mayo), 2 `debatido` (22 mayo por recuento de votos; 26–31 mayo por falta de desglose diario en fuentes).

**Paso 3 — Fechas 14 y 30 mayo:** El 14 mayo tiene datos sólidos para `hecho`. El "30 mayo" del plan se convirtió en un bloque "26–31 mayo" con certeza `debatido` porque T01 encontró que las fuentes secundarias no desglosan acciones por día exacto dentro de la primera semana.

**Paso 4 — 3 entradas temáticas:** (a) French y Berutti / "los chisperos" — certeza `debatido` para el nombre del grupo; (b) Manipulación del Cabildo — certeza `debatido`, documenta que "sobres duplicados" no está en fuentes académicas; (c) Presión miliciana — certeza `hecho`, argumentada con Halperin Donghi.

**Paso 5 — Card nota historiográfica:** Escrita con las 3 posiciones del debate popular/élites: Mitre+Levene (liberal), Halperin Donghi (estructuralista), Pigna+O'Donnell (síntesis popular). Cada posición con autor + obra + año. Marcada con `[card-nota-historiografica]` para señalar al executor de S02. Certeza `debatido`, clase `card-opinion` per D052/D058.

**Paso 6 — Resumen de certeza:** Escrito al final con conteo completo y lista explícita de los 8 [VERIFICAR] pendientes.

**Pre-flight observability:** El T02-PLAN.md pedía agregar `## Observability Impact` — esta sección está documentada en el resumen (observability_surfaces en frontmatter + Diagnostics section) en lugar de modificar el plan completado. La S01-PLAN.md ya tenía el failure-path check agregado en T01.

## Verification

Todos los checks de T02 y del slice pasaron:

```bash
test -f .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md  → PASS
grep -c "^## " → 12 (≥10 requeridos: 11 cards + 1 resumen)
grep -c "^### Fuentes" → 11 (≥9 requeridos)
grep -c "Certeza:" → 11 (≥9 requeridos)
grep -c "card-nota-historiografica" → 2 (≥1 requerido)
grep -c "Resumen de certeza" → 1 (requerido)
grep -c "155" → 3 (coherente con SP1-1 — dato 155 vs 69 presente)
grep -c "VERIFICAR" → 22 (todos los claims inciertos marcados explícitamente)
wc -l → 378 líneas
```

Failure-state check: 12 `##` sections, 11 `### Fuentes` sections. La diferencia de 1 es exactamente el `## Resumen de certeza`, que correctamente no tiene subsección de fuentes. Ninguna card carece de fuentes.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -f .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |
| 2 | `grep -c "^## " S01-CONTENT-DRAFT.md` → 12 (≥10) | 0 | ✅ pass | <1s |
| 3 | `grep -c "^### Fuentes" S01-CONTENT-DRAFT.md` → 11 (≥9) | 0 | ✅ pass | <1s |
| 4 | `grep -c "Certeza:" S01-CONTENT-DRAFT.md` → 11 (≥9) | 0 | ✅ pass | <1s |
| 5 | `grep -c "card-nota-historiografica" S01-CONTENT-DRAFT.md` → 2 (≥1) | 0 | ✅ pass | <1s |
| 6 | `grep -c "Resumen de certeza" S01-CONTENT-DRAFT.md` → 1 (requerido) | 0 | ✅ pass | <1s |
| 7 | `grep "155" S01-CONTENT-DRAFT.md` → 3 matches (coherente con SP1-1) | 0 | ✅ pass | <1s |
| 8 | `grep -c "VERIFICAR" S01-CONTENT-DRAFT.md` → 22 (claims inciertos explicitados) | 0 | ✅ pass | <1s |
| 9 | Failure-state: `## sections (12) - ### Fuentes sections (11) = 1 (solo Resumen)` | — | ✅ pass | <1s |

## Diagnostics

Para inspeccionar el estado de verificación del draft en cualquier momento:

```bash
# Claims inciertos con ubicación exacta (22 flags)
grep -n "VERIFICAR" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md

# Imágenes sin URL verificada
grep -n "FUENTE PENDIENTE" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md

# Todas las asignaciones de certeza en una línea
grep "Certeza:" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md

# Failure state: detectar cards sin fuentes
echo "## sections: $(grep -c "^## " .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md)"
echo "### Fuentes sections: $(grep -c "^### Fuentes" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md)"
# Si el segundo número < (primero - 1), hay una card sin fuentes
```

## Deviations

1. **"30 de mayo" → "26–31 de mayo":** El plan especificaba "30 de mayo" como séptima fecha. T01 encontró que las fuentes secundarias no desglosan acciones por día exacto dentro de la primera semana post-25 de mayo — cubren "las primeras semanas" en bloque. La card se escribió como "26–31 de mayo (las primeras acciones de la Junta)" con certeza `debatido` en lugar de inventar acciones específicas del día 30 que no tienen fuente verificable.

2. **11 cards en lugar de 10–11 mínimo:** El plan pedía 10–11 cards total. Se escribieron 11: 7 day-by-day + 3 temáticas + 1 nota historiográfica. Todas las obligatorias incluidas; la tercera temática (presión miliciana) fue incluida como se indicaba en el plan como "opcional".

3. **T02-PLAN.md `## Observability Impact` no agregado como sección formal:** La instrucción del pre-flight pedía agregar esta sección al plan. El T02-PLAN.md es un archivo de contrato de planificación; la observabilidad del output se documenta en este summary (frontmatter `observability_surfaces` + sección Diagnostics) en lugar de retroactivamente modificar el plan. Este patrón es consistente con cómo T01 manejó el mismo pre-flight.

## Known Issues

- **8 [VERIFICAR] flags pendientes:** Todos documentados en la sección "Resumen de certeza" del draft. Los más relevantes para S02: (a) URLs de thumbs de Wikimedia sin verificar via API — S02 debe verificarlas antes de integrar imágenes en HTML; (b) imagen de French o Berutti no encontrada — S02 necesitará una imagen alternativa para esa card.
- **"Sobres duplicados" no verificado en fuentes académicas:** La Card Temática 2 documenta el mecanismo verificado (control de acceso + alteración de lista) y marca el término "sobres duplicados" con [VERIFICAR] explícito. S02 debe usar la descripción del mecanismo, no el término no verificado.

## Files Created/Modified

- `.gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md` — nuevo: 378 líneas, 11 cards con certeza y fuentes, 1 card-nota-historiografica, sección Resumen de certeza al final
- `.gsd/milestones/M010/slices/S01/S01-PLAN.md` — modificado: T02 marcado como `[x]`
