---
depends_on: [M017]
---

# M018: El Camino a Caseros

**Gathered:** 2026-03-24
**Status:** Ready for planning

## Project Description

Sección nueva en `index.html` sobre el proceso que llevó a la batalla de Caseros (3 de febrero de 1852): el Pronunciamiento de Urquiza (mayo 1851), la formación del Ejército Grande, la campaña militar, y la batalla misma. Incluye el rol de cada actor (Brasil, Uruguay, Entre Ríos, exiliados unitarios). Todo verificado o clasificado por certeza.

## Why This Milestone

El sitio menciona Caseros en varias cards pero como evento puntual. La pregunta "cómo se llegó a eso" —el proceso de 9 meses entre el Pronunciamiento y la batalla— no está narrada. Ese proceso es el que hace inteligible por qué Caseros fue posible y qué significó.

## User-Visible Outcome

### When this milestone is complete, the user can:

- Leer el proceso que llevó a Caseros: actores, alianzas, campaña
- Entender qué fue el Ejército Grande: quiénes lo formaban, cuántos eran, quién los comandaba
- Ver la batalla del 3 de febrero de 1852 con datos documentados (fuerzas, resultado, consecuencias inmediatas)

### Entry point / environment

- Entry point: `index.html`
- Environment: local + GitHub Pages

## Completion Class

- Contract complete: cards con data-certeza y cites sobre el proceso a Caseros y la batalla
- Integration complete: patrones reveal/lightbox
- Operational complete: n/a

## Final Integrated Acceptance

- Sección sobre el camino a Caseros y la batalla visible en el sitio
- Datos de la batalla (fuerzas ~45.000 vs ~22.000, fecha, lugar) en card-hecho con fuentes

## Risks and Unknowns

- La imagen de la batalla de Caseros ya está en uso en index.html — verificar reutilización vs. imagen distinta
- Cifras exactas de la batalla: verificar fuentes antes de afirmar

## Existing Codebase / Prior Art

- `index.html` línea ~2249–2265: card existente "Caseros, 3 de febrero de 1852" — MAPEAR para no duplicar
- `index.html` línea ~2256: imagen `Batalla_de_Caseros_3_Febrero_1852.jpg` ya en uso
- Cifras 45.000 vs 22.000 ya mencionadas en el sitio (línea ~2263)

## Relevant Requirements

- R001, R002

## Scope

### In Scope

- Pronunciamiento de Urquiza (1 de mayo de 1851) — el acto formal de ruptura con Rosas
- La alianza con Brasil y Uruguay: términos, motivaciones de cada parte
- Composición del Ejército Grande: fuerzas entrerrianas, correntinas, brasileñas, uruguayas, exiliados argentinos
- La campaña militar: rutas, timing, maniobras previas
- La batalla del 3 de febrero de 1852: datos verificados
- Consecuencias inmediatas: renuncia y exilio de Rosas, designación de Vicente López y Planes

### Out of Scope / Non-Goals

- Lo que pasó después de Caseros con Urquiza (eso es M017 y M019)
- La Constitución de 1853 (ya está en index.html)

## Technical Constraints

- La card existente de Caseros (línea ~2249) debe complementarse, no duplicarse
- Imagen de la batalla ya en uso — verificar disponibilidad de imágenes adicionales del período

## Integration Points

- Nueva sub-sección en `#periodo-revolucion` o extensión de la sub-sección SP3 existente
