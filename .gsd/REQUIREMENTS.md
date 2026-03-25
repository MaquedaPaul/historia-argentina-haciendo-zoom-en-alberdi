# Requirements

Este archivo es el contrato de capacidades del proyecto Historia Argentina 1500–1900.

## Active

### R001 — Presentación visual correcta en todos los anchos
- Class: quality-attribute
- Status: active
- Description: El sitio debe mostrarse sin elementos cortados, superpuestos o ilegibles en 375px, 768px y 1280px
- Why it matters: El sitio es compartible solo cuando se ve bien en todos los dispositivos comunes
- Source: user
- Primary owning slice: M022/S01, M022/S02, M022/S03
- Supporting slices: none
- Validation: mapped
- Notes: Sub-nav overflow, cards largas, layout jump, timeline superposición son las instancias concretas

### R002 — Cards con texto legible sin scroll infinito
- Class: primary-user-loop
- Status: active
- Description: Ninguna card debe superar ~420px de alto. El texto largo debe estar detrás de un "Ver más" accesible
- Why it matters: Cards de 1000–2500px hacen la página innavegable y esconden contenido debajo del fold
- Source: inferred
- Primary owning slice: M022/S01
- Supporting slices: none
- Validation: mapped
- Notes: 56 cards tienen excerpt >600 chars. El patrón card-expand-toggle ya existe en app.js.

### R003 — Navegación sin saltos de layout
- Class: quality-attribute
- Status: active
- Description: El scroll entre las tres secciones (colonial, revolución, nacional) no produce saltos bruscos de layout
- Why it matters: Los layout jumps desorientan al usuario y dan sensación de sitio roto
- Source: inferred
- Primary owning slice: M022/S02
- Supporting slices: none
- Validation: mapped
- Notes: Causado por contain-intrinsic-size: 2400px cuando el período revolución mide 48689px real

## Validated

(ninguno aún — se actualizará a medida que los slices completen)

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
- Notes: Todo el contenido de M001–M021 se mantiene intacto

## Traceability

| ID | Class | Status | Primary owner | Supporting | Proof |
|---|---|---|---|---|---|
| R001 | quality-attribute | active | M022/S01,S02,S03 | none | mapped |
| R002 | primary-user-loop | active | M022/S01 | none | mapped |
| R003 | quality-attribute | active | M022/S02 | none | mapped |
| R010 | anti-feature | out-of-scope | none | none | n/a |

## Coverage Summary

- Active requirements: 3
- Mapped to slices: 3
- Validated: 0
- Unmapped active requirements: 0
