# S03: Regreso a Tucumán, Alejandro Heredia y vuelta a Buenos Aires (1833–1838)

**Goal:** Investigar, verificar e integrar en `index.html` los bloques sobre el regreso de Alberdi a Tucumán (ca. 1834), su relación con el gobernador Alejandro Heredia (quién era, cómo se conocieron), y el segundo regreso a Buenos Aires para doctorarse — conectando con el Salón Literario de 1837 ya cubierto en el sitio.
**Demo:** El visitante puede leer las cards sobre el reencuentro de Alberdi con Tucumán, la figura de Heredia como gobernador, y el regreso definitivo a Buenos Aires con el objetivo del doctorado — cerrando el arco biográfico temprano y conectando con el Salón Literario ya existente en el sitio.

## Must-Haves

- Card **hecho**: regreso a Tucumán ca. 1834 — motivaciones (asuntos de herencia tras la muerte del padre, nostalgia, interés político).
- Card **hecho** + **opinión** (evaluación historiográfica): Alejandro Heredia — quién era (gobernador de Tucumán 1832–1838, caudillo federal con gestos ilustrados, asesinado en 1838), cómo se conoció con Alberdi (entorno letrado tucumano o familia), y por qué la relación fue significativa para Alberdi.
- Card **hecho**: regreso a Buenos Aires ca. 1835–1837 — motivación (doctorarse en jurisprudencia), el *Fragmento preliminar al estudio del Derecho* (1837) como tesis/disertación que anticipó sus ideas constitucionales.
- Puente narrativo explícito hacia el Salón Literario de 1837 ya existente en el sitio (el visitante debe sentir la continuidad).
- Nota `card-nota-certeza` si la naturaleza exacta del vínculo Alberdi-Heredia es incierta.

## Proof Level

- This slice proves: integration + narrative coherence
- Real runtime required: yes
- Human/UAT required: yes

## Verification

- `grep 'Heredia\|Fragmento preliminar\|1834.*Tucumán\|1837.*Salón' index.html` devuelve ≥2 matches.
- Browser: cards nuevas visible con reveal en `#rev-alberdi-formacion`; el texto conecta con las cards del Salón Literario existentes visualmente (el visitante puede seguir la historia).
- No hay contradicción de fechas entre S01, S02, S03 y las cards pre-existentes del sitio.

## Tasks

- [ ] **T01: Research y borrador (Bloques 9–10)** `est:1.5h`
  - Why: Alejandro Heredia es una figura importante pero poco detallada en las biografías estándar de Alberdi; necesita investigación específica.
  - Files: `.gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md` (crear)
  - Do: para el **Bloque 9** (regreso a Tucumán + Heredia): verificar año del regreso de Alberdi a Tucumán (Mayer lo sitúa ca. 1834); motivaciones documentadas; Alejandro Heredia — gobernador de Tucumán 1832–1838, perfil político (federal herrerista vs. federal rosista — hay matices importantes), su asesinato el 12 de noviembre de 1838. Cómo los conoció: posiblemente a través del círculo letrado de Tucumán o de la familia Alberdi que tenía vínculos con la élite local. Si la fuente no es precisa, clasificar como opinión. Para el **Bloque 10** (regreso a Buenos Aires y doctorado): verificar fecha del regreso (ca. 1835 o 1836); el *Fragmento preliminar al estudio del Derecho* fue publicado en 1837 — ¿fue la tesis de graduación o una obra independiente? Verificar con Mayer y con el propio *Fragmento*. Escribir el puente narrativo hacia el Salón Literario (la card del Salón ya en el sitio dice "26 de junio de 1837" — el borrador debe mencionar ese año para la conexión). Escribir el borrador completo.
  - Verify: borrador con 2 bloques principales y ≥2 fuentes cada uno; Heredia tiene perfil completo con fechas.
  - Done when: borrador completo sin `[VERIFICACIÓN PENDIENTE]` sin resolver.

- [ ] **T02: Integrar cards S03 en index.html + puente hacia Salón Literario** `est:1h`
  - Why: completar el arco biográfico temprano en el HTML y crear continuidad narrativa con el contenido existente.
  - Files: `index.html`
  - Do: agregar 3 cards (Regreso Tucumán, Heredia, Vuelta a Buenos Aires+Fragmento) al grid de `#rev-alberdi-formacion`. Para el puente hacia el Salón Literario: agregar una `<blockquote class="alberdi-quote reveal reveal-slide">` al final del sub-período biográfico que conecte la formación de Alberdi con su irrupción en el Salón de 1837 — citar el discurso inaugural del Salón (ya existe en el sitio en línea ~465, reutilizar esa cita o una complementaria). Verificar que `--reveal-delay` sigue el incremento de 80ms.
  - Verify: 3 cards nuevas visibles en browser; el puente narrativo aparece antes del bloque "Revolución e Independencia" existente; coherencia visual.
  - Done when: cards integradas, puente narrativo presente, reveal funcional.

- [ ] **T03: Verificación de coherencia global del sub-período biográfico** `est:30m`
  - Why: S01+S02+S03 juntos forman el sub-período completo; es necesario validar la experiencia de lectura completa.
  - Files: `index.html`
  - Do: leer el sub-período `#rev-alberdi-formacion` completo en browser (desde el nacimiento en 1810 hasta el regreso a Buenos Aires en 1835-37). Verificar: (a) flujo cronológico sin saltos; (b) todas las cards hacen reveal al scroll; (c) el puente final conecta naturalmente con las cards del Salón Literario existentes; (d) no hay duplicación de información con las cards pre-existentes del sitio sobre Alberdi. Ajustar cualquier solapamiento.
  - Verify: lectura completa del sub-período sin contradicciones, solapamientos ni gaps narrativos.
  - Done when: experiencia de lectura cohesiva de 1810 a 1838; sin errores.

## Files Likely Touched

- `index.html`
- `.gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md` (nuevo)
