# M019: La Ruptura Mitre-Urquiza (1852)

**Vision:** Narrar el giro político de 1852: de la alianza en Caseros a la Revolución del 11 de Septiembre. Qué pasó, qué se documentó, y cuál es el nivel de certeza de cada afirmación — incluyendo cualquier negociación Mitre-Urquiza que tenga respaldo en fuentes.

## Success Criteria

- Cards documentadas sobre el período Caseros–11 de Septiembre de 1852
- El Acuerdo de San Nicolás y la Revolución del 11 de Septiembre son hechos con citas
- Cualquier "escena" Mitre-Urquiza está clasificada con su certeza real
- No afirma nada sin fuente o sin marcador de certeza

## Key Risks / Unknowns

- La "escena" de negociación Mitre-Urquiza puede no tener fuente directa — la investigación de S01 determina si existe como hecho documentado, interpretación, o tradición

## Proof Strategy

- Conversaciones Mitre-Urquiza → S01 investiga; si no hay fuente directa, va como card-opinión o card-rumor con nota explícita

## Verification Classes

- Contract verification: cards con data-certeza y cite
- Integration verification: browser

## Milestone Definition of Done

- [x] Cards sobre el período Caseros–11 de Septiembre en index.html
- [x] Certeza explícita en cada afirmación
- [x] Sin errores JS

## Requirement Coverage

- Covers: R001, R002

## Slices

- [x] **S01: Investigación y borrador** `risk:high` `depends:[]`
  > After this: borrador verificado del período 1852, con certeza clasificada en cada card, incluyendo resultado de la investigación sobre la "escena" Mitre-Urquiza.

- [x] **S02: Integración HTML** `risk:low` `depends:[S01]`
  > After this: sección visible en el sitio, cierre del período 1800–1860.

## Boundary Map

### S01 → S02

Produces:
- `S01-CONTENT-DRAFT.md` con cards verificadas y certeza clasificada
- Veredicto sobre el nivel de certeza de la "escena" Mitre-Urquiza

Consumes:
- nothing

### S02

Produces:
- Cards en index.html

Consumes from S01:
- `S01-CONTENT-DRAFT.md`
