---
estimated_steps: 5
estimated_files: 1
---

# T01: Investigar y redactar borrador verificado para BIOG-9, BIOG-10 y BIOG-11

**Slice:** S03 — Regreso a Tucumán, Alejandro Heredia y vuelta a Buenos Aires (1833–1838)
**Milestone:** M007

## Description

Investigar con fuentes verificables los tres bloques biográficos que cubren el período 1833–1838 de la vida de Alberdi: su regreso a Tucumán, el vínculo con el gobernador Alejandro Heredia, y el segundo regreso a Buenos Aires culminando con el *Fragmento preliminar* de 1837. Producir un borrador estructurado que T02 puede convertir en HTML sin investigación adicional.

Este es el task de mayor riesgo de S03 porque Heredia es una figura relativamente menor en la historiografía argentina estándar y los detalles del vínculo personal con Alberdi están pobremente documentados en fuentes secundarias de acceso fácil. Si la fuente no es suficientemente precisa, la certeza del bloque baja a `card-opinion` — no inventar hechos.

**Contexto crítico de S02 (leer antes de investigar):**
- BIOG-8 (ya en index.html) cubre hasta el grado en Córdoba (24 mayo 1834) y la Academia de Jurisprudencia. S03 abre en Tucumán — BIOG-9 debe empezar desde el viaje de regreso a Tucumán, no desde Buenos Aires.
- El "copista en escribanía" de M007-CONTEXT es INCORRECTO — no relevante para S03 pero documentado como precedente de error en el planning.
- Heredia fue federal, de la órbita rosista pero con matices. El sitio ya tiene SP2-2 ("Unitarios contra federales") — BIOG-10 debe ser coherente con ese framing.

## Steps

1. **Investigar BIOG-9 (Regreso a Tucumán ca. 1833–1834):** Buscar en fuentes accesibles (*Mi vida privada* vía cervantesvirtual.com, Mayer *Alberdi y su tiempo*, elhistoriador.com.ar) el año exacto del regreso. Verificar las motivaciones: asuntos de herencia (el padre murió ca. 1822; las propiedades tucumanas las gestionaba el hermano Felipe — ¿hay documentación de este vínculo?). El contexto político: la Tucumán de Heredia en 1833–1834. Determinar la certeza apropiada: si el año está en fuente primaria, `card-hecho`; si solo en secundaria sin fecha precisa, `card-hecho` con `card-nota-certeza`.

2. **Investigar BIOG-10 (Alejandro Heredia):** Verificar los hechos objetivos — gobernador de Tucumán 1832–1838 (con período interrumpido o continuo — hay que verificar), su relación con Rosas (federal pero con grados de autonomía), asesinado el 12 de noviembre de 1838 en Famaillá. Investigar la relación con Alberdi: ¿Mayer, Groussac, o Botana mencionan el vínculo específico? ¿Era Heredia quien impulsó actividad cultural en Tucumán (tesis de algunos biógrafos)? Si el vínculo personal tiene documentación indirecta, usar `card-opinion` para esa parte y `card-hecho` para los hechos biográficos de Heredia. Dado que S03 tiene solo 3 cards, BIOG-10 puede ser una sola card `card-hecho` que narre a Heredia con `card-nota-certeza` para el vínculo personal — o dos cards separadas si el contenido lo justifica. Decidir según lo que la investigación produzca.

3. **Investigar BIOG-11 (Vuelta a Buenos Aires y Fragmento preliminar):** Verificar el año de regreso a Buenos Aires (la mayoría de fuentes dice 1835 directamente desde Tucumán; algunos dicen via Córdoba en 1834–1835). El *Fragmento preliminar al estudio del Derecho* — publicado 1837, Imprenta de la Libertad, Buenos Aires — verificar si fue la disertación de graduación de la Academia de Jurisprudencia o una obra independiente (la distinción importa para la certeza). El Salón Literario se inauguró 26 de junio de 1837 — el *Fragmento* apareció el mismo año. Leer el conector existente en index.html (línea ~676) para no duplicar: ese conector ya usa "Una generación que empieza a vivir al mismo tiempo que su patria" (discurso inaugural del Salón Literario). Encontrar una cita diferente para el blockquote de cierre del sub-período biográfico — preferiblemente del *Fragmento preliminar* o de *Mi vida privada* mirando hacia adelante.

4. **Redactar el borrador completo** `S03-CONTENT-DRAFT.md` con:
   - Para cada bloque: `## BIOG-X`, `### Certeza`, `### Fecha display`, `### Excerpt (HTML-listo)`, `### Fuentes (≥2)`, `### Cite reference`, `### Notas de imagen`.
   - Para el puente narrativo final: `## Puente narrativo S03` con el texto del blockquote (sin duplicar el de línea ~676).
   - `### Justificación de certeza` para BIOG-10 si hay ambigüedad.
   - Si algún dato permanece sin verificar, documentar como `[INCIERTO: descripción]` — NO usar `[VERIFICACIÓN PENDIENTE]` sin acompañarlo de una nota sobre cómo resolverlo o por qué se acepta la incertidumbre.

5. **Notas de imagen:** Para BIOG-9 y BIOG-11 se pueden reutilizar las imágenes de Alberdi ya en el sitio (`https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Juan_Bautista_Alberdi.jpg/500px-Juan_Bautista_Alberdi.jpg`). Para BIOG-10 (Heredia), buscar si hay un retrato de Heredia en Wikimedia Commons — si no existe, usar una imagen genérica de época o ninguna imagen (las cards sin imagen siguen siendo válidas con los templates existentes). No bloquear el bloque por una imagen de Heredia.

## Must-Haves

- [ ] BIOG-9 verificado con al menos 2 fuentes; certeza clasificada; año del regreso documentado (o flaggeado con `card-nota-certeza` si incierto).
- [ ] BIOG-10 verificado con hechos objetivos de Heredia (gobernador, fechas, muerte); vínculo con Alberdi documentado o clasificado como opinión con base explícita.
- [ ] BIOG-11 verificado; *Fragmento preliminar* con fecha, editorial y carácter (tesis vs. obra independiente) documentado; distinción del puente narrativo del conector existente en línea ~676.
- [ ] Puente narrativo escrito con cita distinta a "Una generación que empieza a vivir al mismo tiempo que su patria" (ya usada en línea ~676).
- [ ] Sin `[VERIFICACIÓN PENDIENTE]` sin nota de resolución.

## Verification

- `test -f .gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md` — archivo existe.
- `grep -c "^## BIOG" .gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md` devuelve ≥ 3.
- `grep -c "Heredia" .gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md` devuelve ≥ 5 (nombre mencionado en múltiples contextos).
- `grep "Fragmento preliminar" .gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md` devuelve al menos 1 match con fecha (1837).

## Inputs

- `.gsd/milestones/M007/slices/S02/S02-CONTENT-DRAFT.md` — contexto de BIOG-5..BIOG-8 y correcciones del planning (especialmente: primer empleo = Maldes, no copista; Cané desde 1824).
- `index.html` líneas ~517–544 — BIOG-8 (El derecho como instrumento): cierra ca. 1827–1834 mencionando la Academia de Jurisprudencia. S03's BIOG-9 comienza en Tucumán ca. 1833–1834 — hay un solapamiento temporal intencional (Alberdi gana su grado en Córdoba y luego retorna a Tucumán).
- `index.html` líneas ~660–695 — alberdi-quote connector existente: cita "Una generación que empieza a vivir al mismo tiempo que su patria" (Salón Literario, 1837). No duplicar.
- `index.html` líneas ~756–780 — SP2-4 ("El ascenso de Rosas y la Generación del 37"): menciona el Salón Literario y al Fragmento preliminar. BIOG-11 debe ser coherente con esto.
- M007-CONTEXT.md Bloques 9 y 10 — contexto de planning (advertencia: el planning CONTEXT puede tener errores como en S02; verificar contra fuentes externas).

## Expected Output

- `.gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md` — borrador estructurado con 3 bloques (BIOG-9, BIOG-10, BIOG-11) + puente narrativo; fuentes citadas; certeza justificada; listo para integración HTML en T02.
