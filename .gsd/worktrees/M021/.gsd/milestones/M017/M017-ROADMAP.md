# M017: Urquiza — Perfil y Trayectoria

**Vision:** Presentar a Urquiza como sujeto histórico propio: su origen entrerriano, su formación como caudillo federal, su lealtad a Rosas hasta 1851, y el Pronunciamiento que cambió el rumbo del país. Todo con fuentes, todo clasificado por certeza.

## Success Criteria

- Cards documentadas sobre el perfil y trayectoria de Urquiza
- El Pronunciamiento de 1851 tiene card-hecho con fecha y fuente
- El debate historiográfico (¿traición o decisión?) está explícito
- No duplica menciones existentes

## Key Risks / Unknowns

- Período 1841–1851 puede tener documentación desigual — clasificar con certeza correcta

## Proof Strategy

- Documentación del período → S01 investiga con fuentes académicas (Lynch, Halperin, etc.)

## Verification Classes

- Contract verification: cards con data-certeza y cite
- Integration verification: browser

## Milestone Definition of Done

- [x] Cards sobre perfil de Urquiza en index.html
- [x] Pronunciamiento de 1851 como card-hecho con fuente
- [x] Debate historiográfico visible
- [x] Sin errores JS

## Requirement Coverage

- Covers: R001, R002

## Slices

- [x] **S01: Investigación y borrador** `risk:high` `depends:[]`
  > After this: borrador de 5–7 cards sobre Urquiza con fuentes verificadas.

- [x] **S02: Integración HTML** `risk:low` `depends:[S01]`
  > After this: sección sobre Urquiza visible en el sitio.

## Boundary Map

### S01 → S02

Produces:
- `S01-CONTENT-DRAFT.md` con cards sobre Urquiza verificadas

Consumes:
- nothing

### S02

Produces:
- Cards en index.html

Consumes from S01:
- `S01-CONTENT-DRAFT.md`
