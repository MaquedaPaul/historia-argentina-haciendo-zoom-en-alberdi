# S04: Alberdi multifacético — periodista, abogado, economista, músico

**Goal:** Investigar, verificar e integrar en `index.html` un bloque temático (no cronológico) que presente las cinco facetas de Alberdi: periodista y escritor, abogado, economista, músico y compositor. Cada faceta tiene su card con obras concretas, fechas y citas verificadas.
**Demo:** El visitante puede leer 5 cards temáticas sobre las distintas dimensiones de Alberdi — con títulos de obras reales, fechas precisas y citas directas — presentadas como un bloque de "perfil" que complementa la narrativa cronológica de S01–S03.

## Must-Haves

- Card **hecho**: Alberdi periodista y escritor — *El Iniciador* (Montevideo, 1838, co-fundado con Miguel Cané), seudónimo "Figarillo", artículos costumbristas, estilo satírico-ilustrado.
- Card **hecho**: Alberdi abogado — ejercicio de la abogacía en Buenos Aires y Valparaíso; naturaleza instrumental (el derecho como herramienta política, no identidad profesional central); su posición como representante diplomático de la Confederación (1855).
- Card **hecho** + **opinión** (evaluación): Alberdi economista — *Sistema económico y rentístico de la Confederación Argentina* (1854), primer tratado de economía argentina, principios de libre mercado, inmigración y capital extranjero; por qué fue pionero.
- Card **hecho**: Alberdi músico y compositor — tocaba guitarra y fortepiano; *Ensayo sobre un método nuevo para aprender a tocar la guitarra con la mayor facilidad* (1832, primer método de guitarra publicado en el Río de la Plata); composiciones de salón; la música como válvula emocional y vínculo social en su círculo.
- Card **opinión** (síntesis de autores): Alberdi escritor/pensador — *Bases y puntos de partida* (1852) como cumbre de su producción; el exilio como condición de su escritura más fecunda; la paradoja de diseñar una constitución desde afuera.
- Todas las cards en una nueva sección dentro del sub-período `#rev-alberdi-formacion` o como bloque separado, según el resultado de S03 y la ubicación más natural.
- Reutilizar la imagen del retrato de Alberdi ya cargada en el sitio (no duplicar requests).

## Proof Level

- This slice proves: integration + content completeness
- Real runtime required: yes
- Human/UAT required: yes (el usuario verifica que el perfil multifacético es históricamente sólido)

## Verification

- `grep 'Iniciador\|Sistema económico\|guitarra\|Figarillo\|rentístico' index.html` devuelve ≥3 matches.
- `grep -c 'data-certeza' index.html` tiene ≥15 más que el valor pre-M007.
- Browser: el bloque multifacético es visible al scroll con reveal funcional; las 5 facetas están presentes.
- El retrato de Alberdi ya existente en el sitio NO está duplicado (verificar que las nuevas cards usen `lazy` si incluyen imagen, o simplemente no repitan la misma imagen).

## Tasks

- [ ] **T01: Research y borrador de las 5 facetas (Bloque 11)** `est:2h`
  - Why: las facetas musical y económica requieren verificación específica de títulos de obras y fechas.
  - Files: `.gsd/milestones/M007/slices/S04/S04-CONTENT-DRAFT.md` (crear)
  - Do: Para **periodista**: verificar que *El Iniciador* fue fundado en Montevideo en 1838 y co-fundado con Cané; confirmar el seudónimo "Figarillo" (Alberdi usó "Figarillo" en homenaje a Larra — verificar con Mayer); identificar al menos 2 títulos de artículos notables. Para **abogado**: verificar que ejerció en Buenos Aires antes del exilio; verificar que ejerció en Valparaíso durante el exilio; su nombramiento como representante diplomático de la Confederación ante Francia, Gran Bretaña y España en 1855 (verificar con Mayer y Halperin Donghi). Para **economista**: confirmar título exacto del libro (*Sistema económico y rentístico de la Confederación Argentina según su Constitución de 1853*, publicado en 1854 en Besanzón, France); sus ideas centrales (libre mercado, inmigración, capital extranjero); su carácter de primer tratado sistemático de economía argentina. Para **músico y compositor**: verificar el título exacto del método de guitarra de 1832 y que es el primero publicado en el Río de la Plata; buscar títulos de composiciones específicas (hay dudas sobre atribuciones — usar `card-nota-certeza` para composiciones no verificadas directamente); confirmar que tocaba guitarra y fortepiano. Para **escritor/pensador**: síntesis narrativa de *Bases* 1852, las *Cartas Quillotanas*, *El crimen de la guerra* (ca. 1870, póstumo 1895) — ya cubierto en el sitio, mencionar brevemente sin duplicar. Escribir borrador con 5 bloques, fuentes para cada uno.
  - Verify: borrador con las 5 facetas, ≥2 fuentes por faceta.
  - Done when: borrador completo; composiciones musicales inciertas marcadas con `[VERIFICAR ATRIBUCIÓN]`; ninguna síntesis presentada como cita directa.

- [ ] **T02: Integrar cards de facetas en index.html** `est:1.5h`
  - Why: integrar el bloque temático multifacético, que es de naturaleza diferente (temático, no cronológico) respecto a las cards de S01–S03.
  - Files: `index.html`
  - Do: decidir ubicación del bloque multifacético. Opciones: (a) al final de `#rev-alberdi-formacion` como cierre temático del sub-período; (b) como un bloque `<div class="alberdi-profile-block">` dentro del sub-período con un `<h4>` descriptivo como "Las múltiples dimensiones de Alberdi". Preferir la opción (a) para simplicidad. Agregar las 5 cards en un `<div class="events-grid events-grid--certeza">`. Las cards de facetas son cards **hecho** y **opinión** — sin rumor. Incluir `<cite>` en cada card con obra y año. Para la faceta musical, si hay una imagen de la guitarra o del método disponible en Wikimedia, buscarla; si no, omitir imagen (no forzar). Reutilizar el retrato existente (`500px-Juan_Bautista_Alberdi.jpg`) como máximo una vez más si el diseño lo requiere — no duplicar más. Verificar `--reveal-delay` stagger.
  - Verify: 5 cards multifacéticas visibles en browser con reveal funcional.
  - Done when: 5 cards integradas; no hay imagen duplicada innecesariamente; el bloque es visualmente coherente con el resto.

- [ ] **T03: Verificación final del milestone M007** `est:1h`
  - Why: validar que los 11 bloques del milestone están completos, el sub-período biográfico es coherente de punta a punta, y no se introdujeron regresiones.
  - Files: `index.html`, todos los `S0X-CONTENT-DRAFT.md`
  - Do: contar cards nuevas totales con `grep -c 'data-certeza' index.html` — debe ser ≥15 más que el valor pre-M007 (4 de S01 + 4 de S02 + 3 de S03 + 5 de S04 = 16 mínimo). Leer el sub-período `#rev-alberdi-formacion` completo en browser: (1) flujo cronológico S01–S03 sin gaps; (2) bloque multifacético S04 como cierre coherente; (3) el puente narrativo hacia el Salón Literario existente funciona; (4) ninguna card pre-existente fue accidentalmente alterada. Verificar que el hamburger menu, el scroll spy, y el parallax no tienen regresiones (navegar todas las secciones). Corregir cualquier problema encontrado.
  - Verify: `grep -c 'data-certeza' index.html` ≥ (valor_base + 15); todas las secciones del sitio navegan sin error; flujo biográfico legible.
  - Done when: milestone M007 completo; usuario puede leer la vida de Alberdi de 1810 a 1838 y su perfil multifacético en el sitio; sin regresiones.

## Files Likely Touched

- `index.html`
- `.gsd/milestones/M007/slices/S04/S04-CONTENT-DRAFT.md` (nuevo)
