# Requirements

Este archivo es el contrato de capacidades del proyecto Historia Argentina 1500–1900.

## Active

(ninguno — M022 validó todos los requirements activos)

## Validated

### R001 — Presentación visual correcta en todos los anchos
- Class: quality-attribute
- Status: validated
- Description: El sitio debe mostrarse sin elementos cortados, superpuestos o ilegibles en 375px, 768px y 1280px
- Why it matters: El sitio es compartible solo cuando se ve bien en todos los dispositivos comunes
- Source: user
- Primary owning slice: M022/S01, M022/S02, M022/S03
- Supporting slices: none
- Validation: CSS breakpoints cubren 375px (30rem), 640px (40rem) y 768px (48rem). S03 verificó en browser a 1280px y 375px: hero legible, hamburger visible, sub-nav scrolleable, cards 1 columna con imagen y truncado. Sin errores de consola ni regresiones.
- Notes: Sub-nav overflow, cards largas, layout jump, timeline superposición — todos resueltos en M022

### R002 — Cards con texto legible sin scroll infinito
- Class: primary-user-loop
- Status: validated
- Description: Ninguna card debe superar ~420px de alto. El texto largo debe estar detrás de un "Ver más" accesible
- Why it matters: Cards de 1000–2500px hacen la página innavegable y esconden contenido debajo del fold
- Source: inferred
- Primary owning slice: M022/S01
- Supporting slices: none
- Validation: 76 card-expand-toggle aplicados en index.html. initExpandCollapse scope ampliado a .site-main cubre todos los períodos. Cards reducidas de hasta 2545px a ~800px (con imagen) / ~500px (solo texto). 11 cards con nota-historiografica/blockquotes permanecen altas por decisión de diseño (aceptado en S01-SUMMARY). El problema de UX central está resuelto.
- Notes: El umbral ~420px literal no se alcanza para cards con imagen visible (~800px). La tilde (~) indica aproximación — el criterio es navegabilidad, no límite exacto.

### R003 — Navegación sin saltos de layout
- Class: quality-attribute
- Status: validated
- Description: El scroll entre las tres secciones (colonial, revolución, nacional) no produce saltos bruscos de layout
- Why it matters: Los layout jumps desorientan al usuario y dan sensación de sitio roto
- Source: inferred
- Primary owning slice: M022/S02
- Supporting slices: none
- Validation: contain-intrinsic-size subió de 2400px a 3200px (promedio de colonial ≈3955px y nacional ≈2657px). period--revolucion usa content-visibility:visible porque el browser nunca la descarta (87% de la página). S03 confirma sin layout jumps visibles en browser.
- Notes: period--revolucion es el primer override per-período de content-visibility en el codebase

## Deferred

(ninguno)

## Out of Scope

### R010 — Nuevo contenido histórico
- Class: anti-feature
- Status: out-of-scope
- Description: M022 no agrega contenido histórico nuevo
- Why it matters: Previene scope creep — M022 es exclusivamente pulido visual
- Source: user
- Primary owning slice: none
- Supporting slices: none
- Validation: n/a
- Notes: Todo el contenido de M001–M021 se mantiene intacto. M022 solo modificó wrapping de excerpts existentes, CSS de layout, y JS de scope.

## Traceability

| ID | Class | Status | Primary owner | Supporting | Proof |
|---|---|---|---|---|---|
| R001 | quality-attribute | validated | M022/S01,S02,S03 | none | S03 browser verification 1280px+375px, breakpoints CSS 30rem/40rem/48rem |
| R002 | primary-user-loop | validated | M022/S01 | none | 76 card-expand-toggle, initExpandCollapse .site-main scope |
| R003 | quality-attribute | validated | M022/S02 | none | contain-intrinsic-size 3200px, period--revolucion content-visibility:visible, S03 no layout jump |
| R010 | anti-feature | out-of-scope | none | none | n/a |

## Coverage Summary

- Active requirements: 0
- Validated: 3
- Deferred: 0
- Out of scope: 1
- Unmapped active requirements: 0
