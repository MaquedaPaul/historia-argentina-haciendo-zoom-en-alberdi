# M018: El Camino a Caseros

**Vision:** Narrar el proceso de 9 meses que llevó a Caseros: el Pronunciamiento de Urquiza, la formación del Ejército Grande, la campaña, y la batalla del 3 de febrero de 1852. Todo con fuentes verificadas, complementando (no duplicando) lo que ya existe en el sitio.

## Success Criteria

- Cards documentadas sobre el proceso previo a Caseros (Pronunciamiento, alianzas, campaña)
- La batalla tiene datos verificados (fuerzas, fecha, resultado) en card-hecho con fuente
- No duplica la card existente de Caseros en index.html

## Key Risks / Unknowns

- Card existente de Caseros en index.html — mapear exactamente qué cubre para complementar
- Cifras exactas: verificar con fuente antes de afirmar

## Proof Strategy

- Superposición → S01 lee HTML existente y mapea qué hay antes de escribir
- Cifras → S01 verifica contra Lynch o fuentes académicas

## Verification Classes

- Contract verification: cards con data-certeza y cite
- Integration verification: browser

## Milestone Definition of Done

- [ ] Cards sobre el camino a Caseros en index.html
- [ ] No duplica contenido existente
- [ ] Sin errores JS

## Requirement Coverage

- Covers: R001, R002

## Slices

- [ ] **S01: Investigación y borrador** `risk:high` `depends:[]`
  > After this: borrador verificado sobre el Pronunciamiento, el Ejército Grande, y Caseros.

- [ ] **S02: Integración HTML** `risk:low` `depends:[S01]`
  > After this: sección visible en el sitio, complementando lo existente.

## Boundary Map

### S01 → S02

Produces:
- `S01-CONTENT-DRAFT.md` con cards verificadas sobre el camino a Caseros
- Mapa de superposición con card existente de Caseros

Consumes:
- nothing

### S02

Produces:
- Cards en index.html

Consumes from S01:
- `S01-CONTENT-DRAFT.md`
