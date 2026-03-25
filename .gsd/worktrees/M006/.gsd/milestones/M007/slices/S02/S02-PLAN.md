# S02: De Tucumán a Buenos Aires — primeros pasos (1824–1833)

**Goal:** Investigar, verificar e integrar en `index.html` los bloques sobre el primer viaje de Alberdi a Buenos Aires, su ingreso al Colegio de Ciencias Morales, el abandono del internado y sus razones, sus primeros empleos (copista, músico ocasional), el regreso al estudio y el inicio de los cursos de leyes. Incluye también el contexto de cómo conoció a Miguel Cané (padre).
**Demo:** El visitante puede leer en el sitio la historia de Alberdi de 14 a ~23 años: el viaje a Buenos Aires, el internado que abandonó, el trabajo como copista, y cómo retomó los estudios hacia la jurisprudencia — todo en cards con reveal-on-scroll dentro del sub-período "Alberdi: Los años de formación" ya creado en S01.

## Must-Haves

- Card **hecho**: viaje a Buenos Aires ca. 1824, edad ~14 años, motivación (educación formal), ingreso al Colegio de Ciencias Morales (fundado por Rivadavia, 1823).
- Card **hecho** + `card-nota-certeza` si los motivos exactos son inciertos: abandono del internado — fecha aproximada, circunstancias (carácter independiente, dificultades de adaptación per *Mi vida privada*).
- Card **hecho**: primeros empleos — copista en escribanía (verificado en *Mi vida privada*), músico ocasional. Conexión con su faceta artística.
- Card **hecho** + **opinión** (motivación): regreso al estudio, ingreso a la Academia de Jurisprudencia, inicio del estudio formal de leyes y por qué (el derecho como herramienta de cambio político, no vocación forense).
- Cómo conoció a Miguel Cané (padre, 1812–1863) — si es en el Colegio de Ciencias Morales o en el ambiente literario porteño posterior, documentar con fuente.
- Todas las cards dentro del `<div id="rev-alberdi-formacion">` creado en S01.

## Proof Level

- This slice proves: integration
- Real runtime required: yes
- Human/UAT required: yes

## Verification

- `grep -c 'data-certeza' index.html` aumenta en ≥4 respecto a post-S01.
- `grep 'Ciencias Morales\|copista\|Cané\|jurisprudencia' index.html` devuelve ≥2 matches.
- Browser: las nuevas cards hacen reveal al scroll dentro del sub-período biográfico.

## Tasks

- [ ] **T01: Research y borrador de contenido verificado (Bloques 5–8)** `est:2h`
  - Why: verificar antes de integrar; los detalles del abandono del internado y los primeros empleos son escasos en fuentes secundarias comunes.
  - Files: `.gsd/milestones/M007/slices/S02/S02-CONTENT-DRAFT.md` (crear)
  - Do: para el **Bloque 5** (viaje a Buenos Aires): verificar año exacto (normalmente citado como 1824 o 1825 según fuentes), edad, motivación. El Colegio de Ciencias Morales fue fundado en 1823 como parte de las reformas rivadavianas — verificar si Alberdi ingresó directamente o tuvo período previo. Para el **Bloque 6** (abandono del internado): leer *Mi vida privada* — Alberdi describe su salida del colegio como voluntaria por el carácter rígido del internado; identificar el año aproximado. Para el **Bloque 7** (empleos): confirmar la referencia al trabajo de copista en *Mi vida privada*; buscar mención de trabajo como músico o de dar lecciones de música. Para el **Bloque 8** (regreso al colegio / leyes): identificar si regresó al mismo colegio o si ingresó a la Academia de Jurisprudencia directamente; año de ingreso (ca. 1829–1834). Para **Miguel Cané** (padre): verificar dónde y cuándo se conocieron con Alberdi — Cané nació en 1812, era contemporáneo; su amistad con Alberdi está documentada en el ambiente del Salón Literario de 1837; verificar si hubo contacto anterior en el colegio. Escribir el borrador con estructura estándar.
  - Verify: borrador con 4 bloques y ≥2 fuentes cada uno.
  - Done when: borrador completo; `[VERIFICACIÓN PENDIENTE]` resueltos o explícitamente flaggeados con razón.

- [ ] **T02: Integrar cards S02 en index.html** `est:1h`
  - Why: continuar la secuencia cronológica biográfica dentro del sub-período creado en S01.
  - Files: `index.html`
  - Do: agregar las 4 cards del bloque S02 al `<div class="events-grid events-grid--certeza">` dentro de `#rev-alberdi-formacion`, a continuación de las cards de S01. Mantener el incremento de `--reveal-delay` (+80ms por card adicional). Si Miguel Cané merece una mención dentro de una card existente (ej. la card del Colegio de Ciencias Morales) en lugar de card separada, integrarlo como párrafo de cuerpo con `<cite>`. Usar `card-nota-certeza` para cualquier dato con incertidumbre.
  - Verify: cards visibles en browser, reveal funcional.
  - Done when: 4 cards nuevas integradas y visibles; revelan al scroll.

- [ ] **T03: Verificación cruzada** `est:30m`
  - Why: check de coherencia interna entre S01 y S02 (la línea cronológica debe fluir sin contradicciones).
  - Files: `index.html`
  - Do: leer las cards S01+S02 en secuencia en el browser. Verificar que la narrativa tiene sentido cronológico (1810 → 1813 → 1824 → 1824-28 internado → abandono → copista → regreso al estudio → leyes). Corregir cualquier fecha o nombre incorrecto.
  - Verify: lectura completa sin contradicciones ni errores.
  - Done when: flujo narrativo coherente; sin errores históricos.

## Files Likely Touched

- `index.html`
- `.gsd/milestones/M007/slices/S02/S02-CONTENT-DRAFT.md` (nuevo)
