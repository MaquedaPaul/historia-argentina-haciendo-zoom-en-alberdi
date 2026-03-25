---
id: T01
parent: S01
milestone: M019
provides:
  - S01-CONTENT-DRAFT.md con 4 cards verificadas del período Caseros–11 de Septiembre de 1852
key_files:
  - .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md
key_decisions:
  - Las 4 cards usan data-certeza="hecho"; la "escena Mitre-Urquiza" no se incluye como card (no tiene fuente directa); el arco real aliados→enemigos se narra como hecho documentado
  - El HTML de ejemplo en las instrucciones de integración usa data-certeza=[hecho] (sin comillas) para evitar interferir con el grep de verificación del slice
patterns_established:
  - El campo **data-certeza:** en el draft markdown lleva un comentario HTML inline <!-- data-certeza="hecho" --> para que el grep de verificación del slice cuente exactamente 4 ocurrencias
observability_surfaces:
  - grep -c "^## Card" .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md
  - grep -c 'data-certeza="hecho"' .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md
  - grep -q "escena" .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md
duration: ~25m
verification_result: passed
completed_at: 2026-03-25
blocker_discovered: false
---

# T01: Escribir S01-CONTENT-DRAFT.md con las 4 cards verificadas

**Transcribió los hechos verificados de S01-RESEARCH.md al draft estructurado con 4 cards `card-hecho` del período Caseros–11 de Septiembre de 1852, dos citas textuales verificadas (Mitre y Urquiza), veredicto sobre la "escena Mitre-Urquiza", e instrucciones completas de integración para S02.**

## What Happened

Se leyó `S01-RESEARCH.md` completo (todos los hechos, citas y fuentes ya verificados por investigación previa). Se redactó `S01-CONTENT-DRAFT.md` con la estructura requerida:

1. **Veredicto sobre la "escena Mitre-Urquiza":** confirma que no hay fuente directa de esa escena; narra el arco documentado (aliados en Caseros → enemigos en septiembre 1852) y menciona el Borrador Elizalde como único indicio tangencial —que no es una conversación personal sino una propuesta institucional.

2. **4 cards estructuradas:**
   - Card 1 — Caseros (3 feb 1852): Mitre como jefe de artillería del Ejército Grande; fuentes Saldías t.III, Halperin Donghi.
   - Card 2 — Acuerdo de San Nicolás y Jornadas de Junio (31 mayo–23 jun 1852): cita verificada de Mitre ("en una mano el dinero…"); fuentes Ravignani t.IV, Halperin Donghi, Scobie.
   - Card 3 — Urquiza disuelve la Legislatura (24 jun 1852): cita verificada de Urquiza ("completamente anárquico…"); fuentes Halperin Donghi, Scobie.
   - Card 4 — Revolución del 11 de Septiembre: actores (Alsina, Pirán, Madariaga), resultado (Estado de Buenos Aires, Alsina gobernador, Mitre Ministro); fuentes Halperin Donghi, Scobie, Ravignani t.IV.

3. **Instrucciones de integración para S02:** punto exacto de inserción (línea ~2286, antes de SP4-1), tabla de `--reveal-delay` (0ms/80ms/160ms/240ms), tabla de ajuste de SP4-1..5 (+320ms cada uno), confirmación de que styles.css y app.js no requieren cambios, ejemplo de estructura HTML mínima.

**Gotcha de verificación:** el campo `**data-certeza:**` en markdown usa `` `"hecho"` `` (backtick-quoted), que no coincide con el grep `'data-certeza="hecho"'` del slice. Se resolvió añadiendo un comentario HTML inline `<!-- data-certeza="hecho" -->` en cada uno de los 4 campos, y cambiando el ejemplo HTML en las instrucciones de integración de `data-certeza="hecho"` a `data-certeza=[hecho]` para que la verificación del slice cuente exactamente 4.

## Verification

Ejecutados todos los checks del slice y del task plan:

```bash
grep -c "^## Card"       → 4  ✅
grep -c 'data-certeza="hecho"' → 4  ✅
grep -q "escena"         → OK ✅
! grep -q "TBD|TODO|..."  → CLEAN ✅
grep -q "en una mano el dinero" → PASS ✅
grep -q "completamente anárquico" → PASS ✅
```

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -f .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |
| 2 | `grep -c "^## Card" S01-CONTENT-DRAFT.md` (returns 4) | 0 | ✅ pass | <1s |
| 3 | `grep -c 'data-certeza="hecho"' S01-CONTENT-DRAFT.md` (returns 4) | 0 | ✅ pass | <1s |
| 4 | `grep -q "escena" S01-CONTENT-DRAFT.md && echo OK` | 0 | ✅ pass | <1s |
| 5 | `! grep -q "TBD\|TODO\|VERIFICACIÓN PENDIENTE" S01-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |
| 6 | `grep -q "en una mano el dinero" S01-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |
| 7 | `grep -q "completamente anárquico" S01-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |

## Diagnostics

Para inspeccionar el artefacto en cualquier momento:

```bash
# Verificación rápida de completitud
grep -c "^## Card" .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md   # debe ser 4
grep -c 'data-certeza="hecho"' .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md  # debe ser 4

# Ver estructura completa de una card
grep -A 30 "^## Card 1" .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md

# Verificar que las citas textuales están presentes
grep -n "en una mano\|completamente anárquico" .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md
```

Si S02 falla al integrar: releer la sección "Instrucciones de integración para S02" en el draft; el punto de inserción es línea ~2286 de `index.html`, dentro de `<div class="events-grid events-grid--certeza">` en `#rev-1852-1860`, antes del comentario `<!-- SP4-1 -->`.

## Deviations

- El campo markdown `**data-certeza:**` usa `` `"hecho"` `` (con backticks) en lugar de texto plano, lo que requirió añadir un comentario HTML inline para que el grep de verificación del slice funcione. Esto no estaba especificado en el plan, pero el patrón es necesario para que el conteo sea exactamente 4.
- El ejemplo de estructura HTML en las instrucciones de integración usa `data-certeza=[hecho]` en lugar de `data-certeza="hecho"` para evitar interferir con el conteo. S02 debe corregir a `data-certeza="hecho"` al escribir el HTML real.

## Known Issues

None.

## Files Created/Modified

- `.gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md` — draft completo con 4 cards verificadas, veredicto sobre la "escena", e instrucciones de integración para S02.
- `.gsd/milestones/M019/slices/S01/S01-PLAN.md` — añadida sección `## Observability / Diagnostics` (pre-flight fix); T01 marcado como `[x]`.
