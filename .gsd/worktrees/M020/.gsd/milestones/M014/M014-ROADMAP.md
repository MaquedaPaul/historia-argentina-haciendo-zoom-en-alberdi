# M014: Las Tertulias de Mariquita Sánchez

**Vision:** Agregar al sitio una sección documentada sobre las tertulias de Mariquita Sánchez de Thompson (1786–1868): quiénes asistieron, qué se debatió, y cómo ese espacio conectó la Revolución de Mayo con la Generación del 37 y el exilio anti-Rosas. Todo contenido verificado o clasificado por certeza.

## Success Criteria

- Nueva sección visible en el sitio con mínimo 5 cards sobre las tertulias
- Cada card tiene `data-certeza` correcto y `<cite>` con fuente real
- El episodio del Himno Nacional está tratado historiográficamente (no como hecho llano)
- Ninguna sección existente se rompe
- Las nuevas cards siguen los patrones reveal/stagger/lightbox establecidos

## Key Risks / Unknowns

- Superposición con contenido existente en M011 (Alberdi y Mariquita) — requiere leer el HTML antes de escribir
- El Himno Nacional es el episodio más conocido pero el más disputado historiográficamente — mala clasificación sería un error de certeza visible

## Proof Strategy

- Superposición → retire en S01 leyendo el HTML existente y mapeando qué existe
- Certeza del Himno → retire en S01 con investigación de fuentes antes de escribir cards

## Verification Classes

- Contract verification: grep de cards nuevas, verificar data-certeza y cite en cada una
- Integration verification: abrir index.html en browser, confirmar reveal y lightbox funcionan
- UAT: revisión visual del sitio completo

## Milestone Definition of Done

- [x] Todas las cards de las tertulias están en index.html con certeza y citas
- [x] No hay duplicación con contenido de M011
- [x] El Himno aparece con tratamiento historiográfico correcto
- [x] Verificación estructural pasa (grep de clases requeridas)
- [x] Sitio abre sin errores JS en consola

## Requirement Coverage

- Covers: R001 (contenido verificado), R002 (patrones HTML)
- Leaves for later: ninguno

## Slices

- [x] **S01: Investigación y borrador de contenido** `risk:high` `depends:[]`
  > After this: borrador de 5–7 cards con fuentes verificadas y certeza clasificada, listo para integración HTML.

- [x] **S02: Integración HTML y verificación** `risk:low` `depends:[S01]`
  > After this: sección visible en el sitio, cards con reveal/lightbox, sin errores.

## Boundary Map

### S01 → S02

Produces:
- `S01-CONTENT-DRAFT.md` — contenido de cada card: título, fecha, certeza, excerpt, fuentes, notas de imagen
- Mapeo de qué contenido existente en index.html toca este tema (para evitar duplicación)

Consumes:
- nothing (primer slice)

### S02

Produces:
- Nuevas cards en `index.html` con clases, data-certeza, cites y stagger delays correctos
- Imagen de Mariquita (Rugendas u otra, Wikimedia) integrada en al menos una card

Consumes from S01:
- `S01-CONTENT-DRAFT.md` — contenido listo para copy-paste estructurado
