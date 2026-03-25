# M015: La Generación del 37 — Cómo se Conocieron

**Vision:** Narrar con fuentes verificadas cómo se formó el círculo que sería la Generación del 37: los encuentros entre Echeverría, Alberdi, Gutiérrez y Vicente López en los años previos al Salón Literario de 1837, y el Salón mismo como punto de cristalización.

## Success Criteria

- Cards documentadas sobre la formación del círculo 1830–1837
- El Salón Literario de Marcos Sastre (26 de junio de 1837) tiene card propia con fuente
- No hay duplicación con contenido existente en index.html
- Certeza correcta en cada card

## Key Risks / Unknowns

- Encuentros individuales previos a 1837 pueden no estar documentados con precisión — riesgo de sobre-afirmar

## Proof Strategy

- Superposición → S01 mapea el HTML existente antes de escribir
- Encuentros previos → S01 investiga y clasifica con certeza correcta

## Verification Classes

- Contract verification: cards con data-certeza y cite
- Integration verification: browser check

## Milestone Definition of Done

- [x] Cards sobre formación de la Generación del 37 en index.html
- [x] No duplica contenido existente
- [x] Fuentes reales en cada card
- [x] Sin errores JS

## Requirement Coverage

- Covers: R001, R002

## Slices

- [x] **S01: Investigación y borrador** `risk:high` `depends:[]`
  > After this: borrador con cards verificadas sobre el círculo 1830–1837, listo para HTML.

- [x] **S02: Integración HTML** `risk:low` `depends:[S01]`
  > After this: sección visible en el sitio, integrada con el sistema de reveal existente.

## Boundary Map

### S01 → S02

Produces:
- `S01-CONTENT-DRAFT.md` con cards verificadas
- Mapa de superposición con contenido existente

Consumes:
- nothing

### S02

Produces:
- Cards en index.html

Consumes from S01:
- `S01-CONTENT-DRAFT.md`
