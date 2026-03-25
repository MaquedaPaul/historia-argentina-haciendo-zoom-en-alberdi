# M016: Alberdi y Mitre — Dos Proyectos de País

**Vision:** Narrar con fuentes verificadas la relación entre Alberdi y Mitre: qué los unió (el antirrosismo), qué los separó (el proyecto de país post-Caseros), y cómo terminó para Alberdi (varado en París, sin cargo, sin regreso).

## Success Criteria

- Cards documentadas sobre la relación Alberdi-Mitre 1852–1870
- Ninguna afirmación sin fuente o sin certeza marcada
- No duplica contenido ya existente en index.html

## Key Risks / Unknowns

- Epistolario Alberdi-Mitre: puede existir pero requiere fuentes académicas para citas directas

## Proof Strategy

- Acceso a epistolarios → S01 investiga; si no hay fuente directa, card-opinión o card-rumor según corresponda

## Verification Classes

- Contract verification: cards con data-certeza y cite
- Integration verification: browser

## Milestone Definition of Done

- [ ] Cards sobre relación Alberdi-Mitre en index.html
- [ ] No duplica contenido existente
- [ ] Sin errores JS

## Requirement Coverage

- Covers: R001, R002

## Slices

- [x] **S01: Investigación y borrador** `risk:high` `depends:[]`
  > After this: borrador con fuentes verificadas sobre la relación Alberdi-Mitre.

- [x] **S02: Integración HTML** `risk:low` `depends:[S01]`
  > After this: cards visibles en el sitio.

## Boundary Map

### S01 → S02

Produces:
- `S01-CONTENT-DRAFT.md` con cards verificadas

Consumes:
- nothing

### S02

Produces:
- Cards en index.html

Consumes from S01:
- `S01-CONTENT-DRAFT.md`
