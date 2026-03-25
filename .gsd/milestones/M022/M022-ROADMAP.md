# M022: Pulido Visual Global

**Vision:** Corregir todos los problemas visuales acumulados en la UI: sub-nav que desborda, cards con texto sin límite, layout jumps por content-visibility mal calibrado, y timeline lateral mal posicionado. El sitio debe verse limpio y navegable de punta a punta antes de ser compartido.

## Success Criteria

- Sub-nav de "Revolución y Organización" nunca desborda ni se corta en desktop (1280px) ni mobile
- Ninguna card supera ~420px de alto en estado colapsado
- Sin layout jump visible al scrollear entre los tres períodos
- Timeline lateral no tapa hero ni cards en ningún scroll position
- Mobile (375px) navegable con la misma calidad que desktop

## Key Risks / Unknowns

- `contain-intrinsic-size` incorrecto — si se actualiza mal el hint puede empeorar el jank en lugar de mejorarlo
- Cards con texto muy largo — el patrón card-expand-toggle existe pero hay que verificar que el JS wiring funcione para cards sin `data-id` antes de aplicarlo masivamente

## Proof Strategy

- `contain-intrinsic-size` incorrecto → retire en S02 midiendo offsetHeight real de cada período antes y después del fix
- Cards largas sin expand → retire en S01 aplicando el patrón existente y verificando en browser que ninguna card supere 420px

## Verification Classes

- Contract verification: screenshots en browser a 1280px y 375px en cada slice
- Integration verification: funcionalidad existente (scroll spy, reveal, modal, expand/collapse, audio) no rota
- Operational verification: none
- UAT / human verification: revisión visual final por el usuario

## Milestone Definition of Done

- Todos los slices completos con verificación en browser
- Sub-nav scrolleable sin overflow
- Cards truncadas con expand/collapse funcional
- `contain-intrinsic-size` calibrado al tamaño real de cada período
- Timeline lateral sin solapamiento
- Sin regresiones en JS (scroll spy, reveal, modal, audio)

## Requirement Coverage

- Covers: presentación visual del sitio completo
- Partially covers: n/a
- Leaves for later: n/a
- Orphan risks: none

## Slices

- [x] **S01: Sub-nav scrolleable y cards truncadas** `risk:high` `depends:[]`
  > After this: el sub-nav muestra todos los tabs sin cortar y las cards tienen "Leer más" para el texto largo

- [x] **S02: Content-visibility calibrada y timeline reposicionado** `risk:high` `depends:[S01]`
  > After this: sin layout jump al scrollear entre períodos y el timeline lateral no tapa contenido

- [x] **S03: Revisión visual mobile y pulido final** `risk:low` `depends:[S02]`
  > After this: el sitio se ve limpio en 375px, 768px y 1280px — listo para compartir

## Boundary Map

### S01 → S02

Produces:
- Sub-nav con `overflow-x: auto` + indicador visual de scroll en ambos extremos
- Cards con excerpts truncados a ~4 líneas + `card-expand-toggle` / `card-detail` para el texto completo
- Inventario de cards afectadas (excerpts > 600 chars) como lista comentada en HTML

Consumes:
- nothing (primer slice)

### S02 → S03

Produces:
- `contain-intrinsic-size` corregido para los 3 períodos con valores reales medidos
- `.timeline-aside` reposicionado: `top: calc(var(--nav-height) + 2rem)` en lugar de centrado vertical fijo

Consumes from S01:
- Cards truncadas (el DOM estabilizado es necesario para medir offsetHeight correcto de cada período)

### S03 → done

Produces:
- Media queries revisadas para 375px y 768px
- Spacing/tipografía ajustados donde haya inconsistencias
- Screenshots de verificación final a los tres breakpoints

Consumes from S02:
- Layout sin jumps (base estable para revisión visual)
