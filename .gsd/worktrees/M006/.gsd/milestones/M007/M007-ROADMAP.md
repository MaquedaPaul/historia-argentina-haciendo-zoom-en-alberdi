# M007: Biografía de Alberdi — Vida Temprana y Perfil Multifacético

**Vision:** Expandir el hilo conductor narrativo de Alberdi con una sección biográfica detallada que cubra su infancia en Tucumán, su formación intelectual, sus primeros empleos, y sus facetas como periodista, abogado, economista, músico y compositor. Esta sección se integra en el período 1800–1860 del sitio existente, enriqueciendo la figura que ya aparece como protagonista implícito de la historia.

## Success Criteria

- El sitio contiene una sección biográfica de Alberdi con al menos 11 bloques de contenido cubriendo: nacimiento/familia paterna, hermanos y crianza, el debate sobre la Revolución de Mayo en la familia, muerte de los padres, viaje a Buenos Aires, salida del internado, primeros empleos, regreso al colegio y estudios de leyes, regreso a Tucumán y relación con Alejandro Heredia, segundo viaje a Buenos Aires y doctorado, y perfil multifacético (periodista, abogado, economista, músico).
- Todo el contenido histórico está verificado contra al menos 2 fuentes primarias o secundarias confiables por bloque.
- Las fechas, nombres propios y citas directas son exactos y citados con fuente.
- El contenido usa el sistema de certeza existente (hecho / opinión / rumor) con los templates de card establecidos.
- La sección es visualmente coherente con el resto del sitio (mismos estilos CSS, reveal-on-scroll, sin CSS ni JS adicional).
- Las 11 facetas biográficas están presentes y con profundidad suficiente para un lector curioso (no superficial).

## Key Risks / Unknowns

- **Verificación de fechas exactas de la muerte de los padres de Alberdi** — la madre murió cuando era bebé; la fecha exacta de muerte del padre requiere fuente primaria (Mi vida privada + Obras Completas).
- **Detalles sobre los hermanos de Alberdi** — la documentación biográfica secundaria suele omitir a los hermanos; puede requerir fuentes especializadas como Mayer *Alberdi y su tiempo* o Groussac *Ensayo histórico*.
- **Detalles sobre el período en el internado y el abandono** — hay vaguedad en las fuentes secundarias; se debe distinguir el Colegio de Ciencias Morales de Buenos Aires del internado previo y de la Academia del Plata.
- **Identificación de los empleos tempranos** — el trabajo como copista en el estudio legal de Escribano es conocido; otros empleos necesitan verificación.
- **Faceta musical: verificar composiciones específicas** — Alberdi compuso pero los títulos exactos de sus obras necesitan verificación, ya que son poco mencionados en la literatura estándar.

## Proof Strategy

- **Fechas y hechos familiares** → retire en S01 con al menos 2 fuentes citadas por bloque; si una fecha es incierta, usar `card-nota-certeza` inline.
- **Hermanos y crianza** → retire en S01; si los hermanos están insuficientemente documentados, el bloque pasa a `card-rumor` o se fragmenta en lo verificado vs. lo especulado.
- **Faceta musical** → retire en S03 con títulos de obras verificados; si hay incertidumbre, usar certeza tipo opinión con atribución bibliográfica.

## Verification Classes

- Contract verification: `grep -c 'data-certeza' index.html` aumenta ≥11 cards nuevas; cada nueva card tiene `<cite>` con fuente.
- Integration verification: abrir el sitio en browser, navegar a la sección Alberdi biográfica, verificar que todas las cards hacen reveal al scroll.
- Operational verification: none (sitio estático).
- UAT / human verification: el usuario lee el contenido y confirma profundidad histórica suficiente y coherencia narrativa.

## Milestone Definition of Done

This milestone is complete only when all are true:

- Los 11 bloques biográficos están integrados en `index.html` con contenido verificado.
- Cada bloque tiene ≥1 cita de fuente primaria o secundaria confiable.
- Todas las cards siguen los templates existentes (card-hecho, card-opinion, card-rumor).
- El sistema reveal-on-scroll funciona para todos los nuevos elementos.
- No se introdujo CSS ni JS nuevo — se reusaron los estilos y patrones existentes.
- El usuario confirmó que el contenido es históricamente sólido y narrativamente coherente.

## Requirement Coverage

- Covers: D007 (Alberdi como hilo conductor narrativo — expande su presencia biográfica directa)
- Extends: D021 (distribución de cards en el período 1800–1860)
- Leaves for later: ningún otro milestone cubre este contenido

## Slices

- [ ] **S01: Infancia, familia y años formativos (1810–1824)** `risk:high` `depends:[]`
  > After this: el sitio muestra el nacimiento de Alberdi, su familia (padre que luchó con Belgrano, hermanos, crianza), la posición de la familia ante la Revolución de Mayo, y la muerte de ambos padres — todos los hechos verificados con citas.

- [ ] **S02: De Tucumán a Buenos Aires — primeros pasos (1824–1833)** `risk:high` `depends:[S01]`
  > After this: el sitio narra el viaje a Buenos Aires, la vida en el internado y su abandono, los primeros empleos, el regreso al colegio y el inicio de los estudios de leyes — con fechas exactas y contexto.

- [ ] **S03: Regreso a Tucumán, Alejandro Heredia y vuelta a Buenos Aires (1833–1838)** `risk:medium` `depends:[S02]`
  > After this: el sitio narra el reencuentro de Alberdi con su provincia, su vínculo con el gobernador Heredia, y el segundo regreso a Buenos Aires con el objetivo del doctorado — conectando con el Salón Literario ya existente en el sitio.

- [ ] **S04: Alberdi multifacético — periodista, abogado, economista, músico** `risk:low` `depends:[S03]`
  > After this: el sitio presenta las cinco facetas de Alberdi (periodista, escritor, abogado, economista, músico/compositor) como cards temáticas con ejemplos concretos de obras, fechas y citas — completando el perfil del hilo conductor.

- [ ] **S05: El encuentro entre Alberdi y Facundo Quiroga — la carta** `risk:high` `depends:[S04]`
  > After this: el sitio narra cuándo y cómo se conocieron Alberdi y Juan Facundo Quiroga, en qué circunstancias Alberdi le entregó una carta (contenido, destinatario original, propósito), y qué significó ese contacto para ambos. Hechos verificados con fuentes. Certeza explícita.

- [ ] **S06: Quién era Facundo Quiroga y con quién estaba cuando recibió la carta** `risk:high` `depends:[S05]`
  > After this: el sitio presenta un perfil biográfico de Facundo Quiroga (origen riojano, caudillismo federal, guerras civiles, relación con Rosas), e identifica a las personas que lo acompañaban en el momento en que Alberdi le entregó la carta — con contexto político de ese viaje.

- [ ] **S07: Por qué Alberdi rechazó el viaje a EE.UU. financiado por Quiroga** `risk:medium` `depends:[S06]`
  > After this: el sitio explica el ofrecimiento de Quiroga de financiar un viaje de estudios de Alberdi a Estados Unidos, las razones por las que Alberdi lo rechazó (ideológicas, prácticas, personales), y qué eligió hacer en cambio. Certeza explícita sobre lo documentado vs. lo inferido.

- [ ] **S08: Los escritos de Alberdi que leyó Facundo Quiroga** `risk:medium` `depends:[S07]`
  > After this: el sitio identifica qué textos de Alberdi llegaron a manos de Quiroga, cómo se explica que un caudillo federal leyera a un joven intelectual unitario, y qué impresión le causaron según las fuentes disponibles. Certeza explícita; uso de card-rumor si la evidencia es indirecta.

## Boundary Map

### S01

Produces:
- Cards HTML integradas en `index.html` dentro del período 1800–1860, sub-período "Revolución e Independencia (1800–1820)" o como nuevo bloque biográfico introductorio
- Content draft `S01-CONTENT-DRAFT.md` con hechos verificados y fuentes

Consumes:
- Templates de card existentes (card-hecho, card-opinion, card-rumor)
- Sistema reveal-on-scroll existente
- Patrones card-nota-certeza y card-nota-historiografica existentes

### S01 → S02

Produces:
- Estructura biográfica temprana establecida (1810–1824)
- Precedente para dónde se insertan los nuevos bloques biográficos en el HTML

Consumes:
- Output de S01 (ubicación y estructura de inserción en index.html)

### S02 → S03

Produces:
- Bloques HTML para el período 1824–1833
- Patrón establecido para narración biográfica cronológica dentro del sitio

Consumes:
- Output de S02 (continuación cronológica)

### S03 → S04

Produces:
- Bloques HTML para el período 1833–1838
- Puente narrativo hacia el Salón Literario (ya existente en el sitio)

Consumes:
- Output de S03

### S04

Produces:
- Sección temática "Alberdi multifacético" con 5 facetas como cards
- Cierre del arco biográfico del milestone

Consumes:
- Todos los slices anteriores (estructura biográfica cronológica establecida)
- Cards existentes sobre Alberdi en el Salón Literario y las Bases (reutilizar imágenes ya cargadas)

### S04 → S05

Produces:
- Perfil completo de Alberdi establecido en el sitio (cronológico + temático)
- Base narrativa sobre la que se puede contextualizar el encuentro con Quiroga

Consumes:
- Output de S04 (posición en el HTML donde continúa la narrativa)

### S05

Produces:
- Cards HTML sobre el encuentro Alberdi-Quiroga: fecha, lugar, circunstancias y contenido de la carta entregada
- Content draft `S05-CONTENT-DRAFT.md` con hechos verificados y fuentes

Consumes:
- Templates de card existentes
- Sistema reveal-on-scroll existente
- Perfil de Alberdi ya establecido en S01–S04

### S05 → S06

Produces:
- Evento del encuentro establecido (fecha, lugar, carta)
- Punto de partida para el perfil de Quiroga y su entorno en ese momento

Consumes:
- Output de S05

### S06

Produces:
- Cards HTML sobre quién era Facundo Quiroga (perfil biográfico, caudillismo riojano, guerras civiles)
- Cards sobre las personas que acompañaban a Quiroga cuando recibió la carta
- Content draft `S06-CONTENT-DRAFT.md`

Consumes:
- Output de S05 (evento del encuentro como ancla narrativa)
- Imagen de Quiroga ya presente en el sitio (`Facundo_Quiroga_por_García_del_Molino.jpg`)

### S06 → S07

Produces:
- Perfil de Quiroga establecido + circunstancias del encuentro completas
- Base para narrar la propuesta del viaje y el rechazo de Alberdi

Consumes:
- Output de S06

### S07

Produces:
- Cards HTML sobre el ofrecimiento de Quiroga de financiar el viaje a EE.UU. y el rechazo de Alberdi
- Content draft `S07-CONTENT-DRAFT.md` con motivaciones verificadas y fuentes

Consumes:
- Output de S06 (contexto de la relación Alberdi-Quiroga)

### S07 → S08

Produces:
- Arco narrativo Alberdi-Quiroga casi completo (encuentro → rechazo del viaje)
- Base para cerrar con los textos que conectaron ambas figuras intelectualmente

Consumes:
- Output de S07

### S08

Produces:
- Cards HTML sobre los escritos de Alberdi que llegaron a manos de Quiroga
- Cierre del arco Alberdi-Quiroga en el milestone
- Content draft `S08-CONTENT-DRAFT.md`

Consumes:
- Output de S05–S07 (arco narrativo completo del vínculo)
- Cards existentes sobre el Salón Literario y los primeros escritos de Alberdi
