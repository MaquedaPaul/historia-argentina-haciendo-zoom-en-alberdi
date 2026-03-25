# M008: Unitarios, Federales y la Era de Rosas

**Vision:** Cubrir el arco político-histórico más candente del período 1820–1852: el surgimiento y las ideas del federalismo y el unitarismo, los caudillos y la fragmentación del poder, los dos gobiernos de Rosas, el asesinato de Quiroga, la represión rosista, el debate sobre si Rosas fue tirano o salvador, la Suma del Poder Público, y el rol político de Encarnación Ezcurra. Este es el conflicto central de la Argentina del siglo XIX y el contexto inmediato en el que Alberdi vivió y pensó.

## Success Criteria

- El sitio cubre los 16 bloques temáticos (S09–S24) con content histórico verificado.
- Cada bloque usa el sistema de certeza existente (hecho / opinión / rumor / debatido).
- Todas las cards tienen ≥1 cita de fuente primaria o secundaria confiable.
- Los bloques de interpretación historiográfica (¿tirano o salvador?, ¿sin Rosas habría caos?) usan certeza `debatido` o `opinión` con representación de ambas posiciones.
- La sección es visualmente coherente con el sitio existente (sin CSS ni JS nuevos).
- El sistema reveal-on-scroll funciona para todos los elementos nuevos.

## Key Risks / Unknowns

- **El debate Rosas**: es uno de los más polarizados de la historiografía argentina. Las cards deben presentar ambas posiciones sin tomar partido, usando `card-nota-historiografica` donde corresponda.
- **Evidencia del rol de Rosas en el asesinato de Quiroga**: nunca probado judicialmente — requiere certeza `debatido` o `rumor` con exposición de la evidencia circunstancial.
- **La represión rosista (la Mazorca)**: documentada, pero la escala y sistematicidad es debatida entre revisionistas y liberales. Requiere fuentes de ambas corrientes.
- **Encarnación Ezcurra**: figura menos documentada que Rosas. Sus acciones políticas (la Sociedad Popular Restauradora) son conocidas; su vida previa a Rosas es menos cubierta en fuentes accesibles.

## Proof Strategy

- Para bloques de hecho histórico verificable → `card-hecho` con ≥2 fuentes.
- Para bloques de interpretación política → `card-opinion` con atribución a historiadores identificados.
- Para el debate Rosas (tirano vs. restaurador) → `card-nota-historiografica` obligatoria.
- Para Quiroga asesinado por Rosas → `card-rumor` con exposición de evidencia disponible.

## Verification Classes

- Contract: `grep -c 'data-certeza' index.html` aumenta ≥16 cards nuevas.
- Integration: navegar al período 1820–1852 y verificar que todas las cards hacen reveal al scroll.
- Operational: none (sitio estático).

## Milestone Definition of Done

- Los 16 bloques temáticos (S09–S24) están integrados en `index.html` con contenido verificado.
- Cada bloque tiene ≥1 cita de fuente.
- El debate Rosas (tirano/restaurador) está representado con ambas posiciones.
- No se introdujo CSS ni JS nuevo.
- El usuario confirmó que el contenido es históricamente sólido.

## Requirement Coverage

- Extends: D007 (Alberdi como hilo conductor — M008 contextualiza el mundo en que vivió)
- Extends: D021 (distribución de cards en el período 1820–1860)

## Slices

- [ ] **S09: Origen de unitarios y federales** `risk:medium` `depends:[]`
  > After this: el sitio explica cuándo y por qué surgió la división unitario/federal, qué eventos la cristalizaron (post-1810, post-Cepeda 1820, Rivadavia), y por qué fue más que una disputa constitucional.

- [ ] **S10: Ideas de unitarios y federales** `risk:low` `depends:[S09]`
  > After this: el sitio presenta las ideas centrales de cada bando — centralismo vs. autonomía provincial, libre comercio vs. proteccionismo, aduana única vs. reparto de rentas — con ejemplos concretos y representantes intelectuales.

- [ ] **S11: Referentes de cada bando** `risk:low` `depends:[S10]`
  > After this: el sitio presenta los principales líderes unitarios (Rivadavia, Lavalle, Paz) y federales (Rosas, Quiroga, López, Ramírez) con perfiles mínimos, fechas y roles en el conflicto.

- [ ] **S12: La gobernación en un país dividido — caudillos y Buenos Aires** `risk:medium` `depends:[S11]`
  > After this: el sitio explica cómo se gobernaba Argentina cuando no había gobierno nacional: caudillos provinciales con poder real, un gobernador porteño con poder económico, pactos interprovinciales (Pacto Federal 1831), y la ausencia de un Estado central hasta 1853.

- [ ] **S13: El primer gobierno de Rosas — cómo llegó al poder** `risk:medium` `depends:[S12]`
  > After this: el sitio narra el primer mandato de Rosas (1829–1832): cómo llegó al poder (campaña del desierto, apoyo de estancieros y caudillos), qué hizo, y por qué se retiró antes de completar el mandato.

- [ ] **S14: El segundo gobierno de Rosas — el Restaurador** `risk:medium` `depends:[S13]`
  > After this: el sitio narra el segundo mandato (1835–1852): la Suma del Poder Público, la Mazorca, el bloqueo francés, la guerra con Uruguay, Caseros. Explica por qué lo llamaban "el Restaurador de las Leyes".

- [ ] **S15: El asesinato de Facundo Quiroga — ¿fue Rosas?** `risk:high` `depends:[S14]`
  > After this: el sitio narra la emboscada de Barranco Yaco (febrero 1835), las teorías sobre los autores intelectuales (los Reinafé, Rosas, ambos), y el estado actual de la historiografía sobre el caso. Certeza `debatido` con `card-nota-historiografica`.

- [ ] **S16: La represión rosista — ¿perseguía y mataba?** `risk:high` `depends:[S14]`
  > After this: el sitio documenta el aparato represivo del rosismo (la Mazorca, el degüello, los exilios, el uso del color punzó), con fuentes que lo confirman y fuentes revisionistas que contextualizan la escala. Certeza diferenciada por hecho vs. interpretación.

- [ ] **S17: ¿Sin Rosas, Argentina sería un caos?** `risk:medium` `depends:[S16]`
  > After this: el sitio presenta el argumento de la "necesidad histórica" de Rosas — la tesis de que sin un poder central fuerte el país se habría disuelto — y las contraposiciones historiográficas. Card de interpretación con ambas posiciones.

- [ ] **S18: Los unitarios conspiraban** `risk:medium` `depends:[S17]`
  > After this: el sitio documenta las conspiraciones unitarias reales (la Asociación de Mayo, el apoyo a intervenciones extranjeras, el bloqueo francés de 1838–1840, la Coalición del Norte) que le daban a Rosas argumentos para la represión.

- [ ] **S19: ¿Rosas fue un tirano?** `risk:high` `depends:[S18]`
  > After this: el sitio presenta el debate historiográfico central sobre Rosas — liberal (Mitre, Sarmiento: tirano), revisionista (Irazusta, Ramos: caudillo popular y soberanista), y la síntesis contemporánea — con `card-nota-historiografica` obligatoria.

- [ ] **S20: Lo del 29 — el fusilamiento de Dorrego y la crisis de 1829** `risk:medium` `depends:[S19]`
  > After this: el sitio narra el fusilamiento de Manuel Dorrego por Lavalle (diciembre 1828), la crisis política que desencadenó, y cómo ese evento fue el detonante directo de la primera llegada al poder de Rosas en 1829.

- [ ] **S21: La Suma del Poder Público — ¿avalada por todas las provincias?** `risk:medium` `depends:[S20]`
  > After this: el sitio explica qué era la Suma del Poder Público, cómo se otorgó (Legislatura de Buenos Aires, 1835), qué provincias existían entonces, cuáles la avalaron explícita o implícitamente, y qué significaba en términos constitucionales.

- [ ] **S22: ¿Sin Rosas la Patria hubiera caído?** `risk:medium` `depends:[S21]`
  > After this: el sitio aborda la tesis revisionista de Rosas como garante de la soberanía nacional (bloqueos inglés y francés, resistencia a la intervención extranjera en el Plata) y las contra-tesis liberales. Distinguido de S17 por el foco en soberanía exterior, no en orden interno.

- [ ] **S23: Encarnación Ezcurra — influencia sobre mujeres y apoyo a Rosas** `risk:medium` `depends:[S22]`
  > After this: el sitio presenta el rol político de Encarnación Ezcurra: la Sociedad Popular Restauradora, su red de espionaje e influencia, su uso de las "mazorqueras" femeninas, y cómo organizó apoyo popular para Rosas. Certeza diferenciada para hechos vs. atribuciones.

- [ ] **S24: Encarnación Ezcurra antes de Rosas — ¿era conocida?** `risk:high` `depends:[S23]`
  > After this: el sitio presenta a Encarnación Ezcurra como figura con identidad propia antes de su vínculo con Rosas — origen familiar, educación, posición social — y distingue qué de su influencia era propia vs. delegada por Rosas.

## Boundary Map

### S09

Produces:
- Cards HTML sobre el origen del conflicto unitario-federal
- Content draft `S09-CONTENT-DRAFT.md`

Consumes:
- Templates de card existentes (card-hecho, card-opinion)
- Sistema reveal-on-scroll existente

### S09 → S10

Produces:
- Marco histórico del surgimiento del conflicto
- Base para desarrollar las ideas de cada bando

Consumes:
- Output de S09

### S10 → S11

Produces:
- Descripción de las ideas de cada bando
- Base para identificar los referentes que encarnaron esas ideas

Consumes:
- Output de S10

### S11 → S12

Produces:
- Perfiles de referentes establecidos
- Base para explicar cómo gobernaban en la práctica

Consumes:
- Output de S11

### S12 → S13

Produces:
- Mapa del poder fragmentado establecido
- Contexto para entender el ascenso de Rosas

Consumes:
- Output de S12

### S13 → S14

Produces:
- Primer mandato de Rosas narrado
- Base cronológica para el segundo mandato

Consumes:
- Output de S13

### S14

Produces:
- Segundo mandato completo (1835–1852) incluyendo Suma del Poder Público y Mazorca
- Base para los slices sobre represión, asesinato de Quiroga y el debate historiográfico

Consumes:
- Output de S13

### S15

Produces:
- Cards sobre el asesinato de Quiroga con certeza `debatido`
- `card-nota-historiografica` sobre la culpabilidad de Rosas

Consumes:
- Output de S14 + perfil de Quiroga de M007-S06

### S16

Produces:
- Cards sobre la represión rosista (Mazorca, exilios, degüello)
- Distinción entre hechos documentados e interpretaciones de escala

Consumes:
- Output de S14

### S17 → S18 → S19

Produces:
- Tres cards de debate historiográfico encadenadas: necesidad → conspiración unitaria → tiranía
- `card-nota-historiografica` en S19

Consumes:
- Output de S16

### S20

Produces:
- Card sobre el fusilamiento de Dorrego (1828) como detonante de Rosas
- Conecta con el primer gobierno narrado en S13

Consumes:
- Output de S12–S13 (contexto de la crisis 1828–1829)

### S21

Produces:
- Card sobre la Suma del Poder Público con mapa de provincias
- Distinción entre aval legislativo de Buenos Aires y adhesión de provincias

Consumes:
- Output de S14

### S22

Produces:
- Card sobre soberanía exterior y la tesis revisionista de Rosas como garante nacional
- Distingue del debate interno (S17) por el foco en política exterior

Consumes:
- Output de S19–S21

### S23 → S24

Produces:
- Cards sobre Encarnación Ezcurra: rol político (S23) y perfil propio previo a Rosas (S24)
- Cierre del milestone con una figura femenina del rosismo

Consumes:
- Output de S22
- Imagen de Encarnación Ezcurra si disponible en Wikimedia Commons
