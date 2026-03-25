---
id: S01
parent: M016
milestone: M016
provides:
  - S01-CONTENT-DRAFT.md con 4 cards HTML-ready sobre la relación Alberdi-Mitre (1848–1862), verificadas contra fuentes académicas, sin duplicar BIOG-13 ni SP4-3
requires: []
affects:
  - S02
key_files:
  - .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md
key_decisions:
  - Los checklists de constraints dentro del draft deben usar referencias abreviadas ("Frase BIOG-13 ausente del HTML") en lugar de las frases literales baneadas, para que los greps de verificación de slice no den falsos positivos
  - Card D usa data-certeza="opini&#xF3;n" (HTML entity) para cumplir D053; ambas variantes (con/sin acento) deben consultarse en selectores CSS de verificación
  - Ninguna cita directa Alberdi-Mitre fabricada — todo blockquote está explícitamente marcado como paráfrasis atribuida a fuente secundaria
patterns_established:
  - card-nota-historiografica visible (no colapsable) para debates sobre la clasificación epistémica de la propia card — patrón extendido desde M004 Conquista del Desierto
  - Stagger delays 0/80/160/240ms para 4 cards en un sub-period nuevo
  - Sub-period con id="rev-alberdi-mitre" insertable después de #rev-1852-1860, con estructura sub-period__title + cards-grid
observability_surfaces:
  - "grep -c \"^## Card\" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md — retorna 4"
  - "grep \"data-certeza\" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md — lista certezas (hecho×3, opini&#xF3;n×1)"
  - "grep \"card-nota-historiografica\" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md — confirma nota en Card C"
  - "grep -c \"<cite>\" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md — retorna 8 (≥4 requeridos)"
drill_down_paths:
  - .gsd/milestones/M016/slices/S01/tasks/T01-SUMMARY.md
duration: ~30min
verification_result: passed
completed_at: 2026-03-24
---

# S01: Investigación y borrador

**`S01-CONTENT-DRAFT.md` entregado: 4 cards HTML-ready sobre la relación Alberdi-Mitre (1848–1862), con certeza correcta, 8 citas académicas verificadas, `card-nota-historiografica` en Card C, y todos los checks de slice pasando.**

## What Happened

La investigación previa (S01-RESEARCH.md) ya tenía los 4 outlines de cards, fuentes verificadas y constraints de duplicación. T01 tradujo esa investigación al artefacto estructurado de salida.

Se confirmaron las frases exactas baneadas en index.html: BIOG-13 usa "dejándolo en París sin sueldo y sin regreso pagado" (línea 660); SP4-3 usa "revolución encabezada por Mitre separó Buenos Aires de la Confederación" (línea 2367). El ID `rev-alberdi-mitre` estaba libre.

Las 4 cards producidas cubren el arco narrativo completo:

- **Card A (hecho, 1848):** Mitre como secretario de Alberdi en *El Comercio de Valparaíso*, la alianza antirrosista, la convergencia en Caseros — el origen común antes de la fractura.
- **Card B (hecho, 1852):** Fundación de *Los Debates* el 1° de abril de 1852 y la ruptura definitiva — los dos proyectos de país post-Caseros quedaron fijados en ese año bisagra.
- **Card C (hecho + nota historiográfica, 1861–1862):** Pavón, la victoria de Mitre, y el decreto de cesación de Alberdi de abril 1862 que lo dejó "sin cargo y sin recursos en París" (redacción propia, no la frase baneada de BIOG-13). La `card-nota-historiografica` documenta el debate sobre la retirada de Urquiza.
- **Card D (opinión, 1864):** La polémica historiográfica — Alberdi critica la *Historia de Belgrano* de Mitre; el blockquote está explícitamente marcado como paráfrasis de Mayer 1963, no como cita directa fabricada.

**Gotcha capturado:** La implementación inicial de los checklists de documentación incluía las frases literales baneadas (para documentar lo que se evitaba), lo que hacía fallar los greps de verificación de la slice. La corrección fue reemplazar las frases literales por referencias abreviadas ("Frase BIOG-13 ausente del HTML") en los checklists — los greps de verificación ahora son silenciosos.

## Verification

Todos los checks de slice pasaron (verificados 2026-03-24):

| # | Check | Resultado |
|---|-------|-----------|
| 1 | `test -f S01-CONTENT-DRAFT.md` | ✅ PASS |
| 2 | `grep -c "^## Card" ...` = 4 | ✅ PASS |
| 3 | `grep -q "card-certeza-indicator" ...` | ✅ PASS |
| 4 | Frase BIOG-13 ausente | ✅ PASS |
| 5 | Frase SP4-3 ausente | ✅ PASS |
| 6 | "El crimen de la guerra" ausente | ✅ PASS |

Checks adicionales de calidad:
- `grep -c "<cite>" ...` = 8 (≥4 requerido) ✅
- `grep "card-nota-historiografica" ...` → presente en Card C ✅
- `data-certeza` values: hecho×3, `opini&#xF3;n`×1 (entity correcto D053) ✅

## New Requirements Surfaced

- none

## Deviations

**Checklists abreviados:** El plan pedía documentar constraints verificados por card. La implementación inicial usó las frases literales baneadas en los checklists, lo que producía falsos positivos en los greps de verificación. Se corrigió usando referencias abreviadas — desviación menor necesaria para que la verificación mecánica funcione correctamente.

**Observability en S01-PLAN.md:** Se agregó la sección `## Observability / Diagnostics` al plan porque los pre-flight checks la requerían; el plan original no la tenía.

## Known Limitations

- Las URLs de imágenes de Wikimedia Commons para Card A y Card B apuntan al mismo retrato de Mitre (el retrato de Card A reutilizado en B por falta de imagen específica de 1852). S02 debe buscar una imagen distinta para Card B.
- Las URLs de imágenes para Card C (Batalla de Pavón) y Card D (retrato tardío de Alberdi 1888) no fueron verificadas con curl en tiempo de ejecución — S02 debe confirmar disponibilidad antes de integrar y usar el fallback placeholder si no resuelven.

## Follow-ups

- S02 debe verificar disponibilidad de cada URL de imagen con curl (o API Wikimedia) antes de integrar; usar placeholders o buscar alternativas para las que no resuelvan.
- S02 puede optar por agregar un quinto link al sub-nav de `#periodo-revolucion` apuntando a `#rev-alberdi-mitre` — es opcional pero mejora la navegabilidad.
- Las `<div class="cards-grid">` deben tener la clase `events-grid--certeza` para habilitar el sizing certeza-aware (patrón establecido desde M002).

## Files Created/Modified

- `.gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md` — draft completo con 4 cards HTML-ready, listo para que S02 integre en index.html
- `.gsd/milestones/M016/slices/S01/S01-PLAN.md` — agregada sección `## Observability / Diagnostics`; T01 marcado como `[x]`

## Forward Intelligence

### What the next slice should know

- **Punto de inserción exacto:** después de `</div><!-- /#rev-1852-1860 -->` y antes del div `revolucion-timeline` animado, dentro de `#periodo-revolucion`. Crear `<div class="sub-period" id="rev-alberdi-mitre">` con `sub-period__title` + grid con clase `events-grid--certeza`.
- **Card D usa `data-certeza="opini&#xF3;n"` (entity)**, no `"opinión"` ni `"opinion"`. Los selectores CSS de verificación deben consultar ambas variantes (ver KNOWLEDGE: *Certeza Attribute Accent Normalization*).
- **8 `<cite>` elements en el draft** — S02 debe preservarlos todos al copiar el HTML para mantener R012 (fuentes citadas) y R013 (certeza).
- **Card C tiene `card-nota-historiografica` visible** — no usar expand/collapse para esta nota; debe ser visible siempre (ver KNOWLEDGE: *Nota Historiográfica Pattern*).
- **Sub-nav es opcional:** El sub-nav actual de `#periodo-revolucion` tiene 4 links. S02 puede agregar un quinto sin romper el layout sticky.

### What's fragile

- **URLs de Wikimedia para Cards B, C, D** — no verificadas con curl en tiempo de ejecución. La URL de Card B usa el mismo retrato de Mitre que Card A como fallback temporal. Card C (Batalla de Pavón) y Card D (Alberdi 1888) pueden no existir con los nombres exactos dados. Usar la API Wikimedia para verificar antes de integrar.
- **ID `rev-alberdi-mitre`** confirmado libre al 2026-03-24; verificar que ningún commit de otro worktree lo haya introducido antes de S02.

### Authoritative diagnostics

- `grep -n "^## Card\|data-certeza\|card-nota-historiografica" S01-CONTENT-DRAFT.md` — vista completa de estructura, certeza y nota en una sola línea por card.
- `grep -c "<cite>" S01-CONTENT-DRAFT.md` — debe retornar 8; si retorna < 4 al integrar en HTML, alguna cite fue omitida en el copy-paste.

### What assumptions changed

- **Asunción original:** Los checklists de constraints podían incluir las frases literales baneadas como documentación. **Lo que pasó:** Las frases literales en los checklists causaban falsos positivos en los greps de verificación de la slice. Patrón correcto: referencias abreviadas en checklists, frases literales solo en los greps de diagnóstico de failure-path.
