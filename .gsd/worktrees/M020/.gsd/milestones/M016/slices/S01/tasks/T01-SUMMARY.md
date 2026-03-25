---
id: T01
parent: S01
milestone: M016
provides:
  - S01-CONTENT-DRAFT.md con 4 cards HTML-ready sobre la relación Alberdi-Mitre 1848–1862
key_files:
  - .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md
key_decisions:
  - Los checklists de constraints dentro del draft no deben contener las frases literales baneadas (las verifica grep), sino referencias abreviadas como "Frase BIOG-13 ausente del HTML"
patterns_established:
  - Draft de cards en .md debe usar referencias abreviadas para las frases baneadas en los checklists de documentación, no las frases literales, para que los grep de verificación no den falsos negativos
observability_surfaces:
  - "grep -c \"^## Card\" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md — debe retornar 4"
  - "grep \"data-certeza\" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md — lista certezas de las 4 cards"
  - "grep \"card-nota-historiografica\" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md — confirma nota historiográfica en Card C"
duration: ~30min
verification_result: passed
completed_at: 2026-03-24
blocker_discovered: false
---

# T01: Redactar S01-CONTENT-DRAFT.md con 4 cards Alberdi-Mitre verificadas

**Produjo `S01-CONTENT-DRAFT.md` con 4 cards HTML-ready sobre la relación Alberdi-Mitre (1848–1862), sin duplicar BIOG-13 ni SP4-3, con certeza correcta, fuentes académicas verificadas, y todas las verificaciones de slice pasando.**

## What Happened

Se leyó `S01-RESEARCH.md` completo para internalizar los 4 card outlines, las fuentes verificadas y las constraints de duplicación. Se confirmaron las frases exactas baneadas en `index.html`: BIOG-13 usa "dejándolo en París sin sueldo y sin regreso pagado: el arquitecto de la república quedó varado en Europa" (línea 660); SP4-3 usa "revolución encabezada por Mitre separó Buenos Aires de la Confederación" (línea 2367). El ID `rev-alberdi-mitre` está libre en index.html.

Se redactó el draft siguiendo exactamente los patrones HTML del codebase (card-hecho, card-opinion, card-certeza-indicator, card-nota-historiografica, stagger delays 0/80/160/240ms). Las 4 cards cubren:

- **Card A** (hecho, 1848): Mitre como secretario de Alberdi en *El Comercio de Valparaíso*, alianza antirrosista, convergencia en Caseros.
- **Card B** (hecho, 1852): Fundación de *Los Debates* el 1° de abril de 1852 y la ruptura — los dos proyectos divergentes (porteño vs. federal).
- **Card C** (hecho con nota historiográfica, 1861–1862): Pavón y el decreto de cesación de Alberdi de abril 1862; nota sobre el debate historiográfico del "retiro" de Urquiza.
- **Card D** (opinión, 1864): Polémica historiográfica — Alberdi critica la *Historia de Belgrano* de Mitre; paráfrasis explícitamente atribuida a Mayer 1963 y CONICET/USAL 2015.

**Gotcha encontrado:** Los checklists de constraints dentro del draft contenían las frases literales baneadas (para documentar qué se estaba evitando), lo que causaba que los greps de verificación de la slice devolvieran falsos positivos. Se corrigió reemplazando las frases literales por referencias abreviadas ("Frase BIOG-13 ausente del HTML", "Frase SP4-3 ausente del HTML", "Referencia a obra excluida ausente").

Se agregó la sección `## Observability / Diagnostics` al S01-PLAN.md como requerían los pre-flight checks.

## Verification

Todos los checks de la slice pasaron:

1. `test -f .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md` — PASS
2. `grep -c "^## Card" ...` devuelve 4 — PASS
3. `grep -q "card-certeza-indicator" ...` — PASS
4. Frase BIOG-13 ausente — PASS
5. Frase SP4-3 ausente — PASS
6. "El crimen de la guerra" ausente — PASS

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -f .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |
| 2 | `grep -c "^## Card" ...` retorna 4 | 0 | ✅ pass | <1s |
| 3 | `grep -q "card-certeza-indicator" ...` | 0 | ✅ pass | <1s |
| 4 | `! grep -q "varado en París sin sueldo y sin regreso" ...` | 0 | ✅ pass | <1s |
| 5 | `! grep -q "revolución encabezada por Mitre separó" ...` | 0 | ✅ pass | <1s |
| 6 | `! grep -q "El crimen de la guerra" ...` | 0 | ✅ pass | <1s |

## Diagnostics

Para inspeccionar el estado del artefacto producido:

```bash
# Ver estructura de cards
grep -n "^## Card\|data-certeza\|card-nota-historiografica" \
  .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md

# Confirmar cites presentes (debe ser >= 4)
grep -c "<cite>" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md

# Verificar que no hay frases baneadas
grep -n "varado en París\|revolución encabezada por Mitre separó\|El crimen de la guerra" \
  .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md
# Silencio = correcto

# Verificar entities de opinión
grep "data-certeza" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md
# Card D debe mostrar data-certeza="opini&#xF3;n"
```

## Deviations

**Checklists abreviados:** El plan pedía documentar constraints verificados por card. La implementación inicial usó las frases literales baneadas en los checklists de documentación, lo que hacía fallar los greps de verificación de la slice. Se corrigió usando referencias abreviadas ("Frase BIOG-13 ausente del HTML") en lugar de las frases literales — esto es una desviación menor del plan original pero necesaria para que la verificación mecánica funcione.

**Observability en S01-PLAN.md:** Se agregó la sección `## Observability / Diagnostics` al S01-PLAN.md para satisfacer los pre-flight checks (el plan original no la tenía).

## Known Issues

- Las URLs de imágenes de Wikimedia Commons para Card A y Card B apuntan al mismo retrato de Mitre (el de Card A reutilizado en B por falta de una imagen específica de 1852). S02 debería verificar disponibilidad en Wikimedia antes de integrar y buscar una imagen distinta para Card B si está disponible.
- La imagen de Card D (retrato tardío de Alberdi 1888) necesita verificación de disponibilidad en Wikimedia en el momento de integración.
- Las URLs de imágenes para Card C (Batalla de Pavón) no fueron verificadas con curl en tiempo de ejecución — S02 debe confirmar disponibilidad.

## Files Created/Modified

- `.gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md` — draft completo con 4 cards HTML-ready, listo para que S02 integre en index.html
- `.gsd/milestones/M016/slices/S01/S01-PLAN.md` — agregada sección `## Observability / Diagnostics`; T01 marcado como `[x]`
