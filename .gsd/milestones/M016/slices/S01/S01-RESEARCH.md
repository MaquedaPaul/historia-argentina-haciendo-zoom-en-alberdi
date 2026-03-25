# M016-S01 — Investigación y borrador

**Date:** 2026-03-24
**Slice:** S01 — Investigación y borrador (Alberdi y Mitre: Dos Proyectos de País)

## Summary

S01 es trabajo de investigación y producción de contenido verificado sobre la relación Alberdi-Mitre entre 1852 y 1870, en forma de borrador de cards para S02.

El codebase ya contiene material considerable que define el perímetro de contenido nuevo:

- **BIOG-13** (línea ~658): card sobre Alberdi diplomático 1844–1862 menciona explícitamente que Pavón y el ascenso de Mitre lo alejaron del cargo en 1862, dejándolo "en París sin sueldo y sin regreso pagado". Esta es la conclusión del arco, ya narrada.
- **SP4-3** (línea ~2367): card sobre la Secesión de Buenos Aires (1852–1859) menciona la revolución encabezada por Mitre del 11 de septiembre de 1852 como hecho central.
- **SP4-5** (línea ~2404): card Convención 1860 usa el retrato de Mitre (Manzoni, 1861) y menciona su rol en la reunificación.
- **CARD 1 del período nacional** (línea ~2609): menciona a Mitre como primer presidente (1862–1868) y que Alberdi, desde París, los consideraba caudillos con barniz liberal.
- **CARD 2** (línea ~2631): menciona *El crimen de la guerra* de Alberdi como respuesta a la guerra de Mitre contra Paraguay.

El contenido **no cubierto** y documentable con fuentes verificadas es:
1. La alianza Valparaíso: Mitre fue secretario de Alberdi en Chile (~1848) y ambos colaboraron en *El Comercio de Valparaíso* — lo que los unió (antirrosismo) y luego los separó (1852).
2. *Los Debates* (1 de abril de 1852): Mitre funda el diario post-Caseros y se opone al Acuerdo de San Nicolás y a Urquiza desde el primer número — la bisagra de la ruptura.
3. El proyecto de las *Bases* vs. el proyecto porteño: Alberdi apoya a Urquiza y la Confederación; Mitre lidera la secesión de Buenos Aires el 11 de septiembre de 1852 y defiende la hegemonía porteña.
4. Pavón (17 de septiembre de 1861): Mitre derrota/Urquiza se retira; consecuencias directas para Alberdi — decreto de cesación de Mitre de abril de 1862.
5. Alberdi sin cargo ni sueldo en París (1862+): ya mencionado en BIOG-13 como desenlace, pero sin card propia que narre la mecánica política del despido.
6. La polémica Alberdi-Mitre sobre la historia (1864): Alberdi critica la *Historia de Belgrano* de Mitre en notas privadas publicadas póstumamente como "Belgrano y sus historiadores" (en *Grandes y Pequeños Hombres del Plata*, París, Casa Garnier, s.f. [ca. 1885]).
7. *El crimen de la guerra* (ca. 1870): ya mencionado en CARD 2 del período nacional.

**Fuentes verificadas disponibles:**
- Wikipedia EN/ES, "Bartolomé Mitre" — datos biográficos básicos (nacimiento 26 jun. 1821, presidente 1862–1868, muerte 19 ene. 1906).
- Infobae, 19 enero 2026: Mitre fue secretario de Alberdi en Chile (ca. 1848); fundó *Los Debates* el 1 de abril de 1852.
- Wikipedia EN: "Both wrote for the Valparaíso newspaper El Comercio" (Mitre y Alberdi).
- Mayer, J. M., *Alberdi y su tiempo*, EUDEBA, 1963 — ya citada en el sitio (SP4-5, pp. 310-325), autoridad central.
- USAL/Épocas (PDF académico): Mitre dictó en abril de 1862 "un decreto que determina la cesación de Alberdi como agente diplomático, y luego se niega a pagarle sueldos atrasados."
- ri.conicet.gov.ar (PDF CONICET): "A partir de 1854, no hay espacio para reconciliación entre uno y otro, más allá de algunos encuentros de tono cortés en los primeros meses de Alberdi en Buenos Aires en la cámara de diputados en 1879 y 1880."
- Halperin Donghi, T., *Una nación para el desierto argentino*, CEAL, 1982 — ya citada en el sitio.

**Riesgo epistolario:** No hay evidencia de un epistolario Alberdi-Mitre directo con cartas entre ambos disponibles en fuentes digitalizadas consultables. Las fuentes secundarias (Mayer 1963, Halperin Donghi 1982) son suficientes para el nivel requerido de certeza. No fabricar citas directas entre ellos.

## Recommendation

Producir `S01-CONTENT-DRAFT.md` con 4 cards verificadas sobre la relación Alberdi-Mitre 1848–1862, evitando duplicar BIOG-13 y SP4-3/SP4-5 ya en el HTML. El draft debe cubrir:

1. **Card 1 (hecho):** La alianza en Valparaíso: Mitre secretario de Alberdi en *El Comercio de Valparaíso* (ca. 1848), ambos antirrosistas, ambos en el Ejército Grande. Lo que los unió.

2. **Card 2 (hecho):** *Los Debates* (1 de abril de 1852) y la ruptura: Mitre funda el diario, se opone al Acuerdo de San Nicolás, lidera la revolución del 11 de septiembre de 1852 y la secesión de Buenos Aires — mientras Alberdi redacta las *Bases* y se alinea con la Confederación de Urquiza. El proyecto divergente.

3. **Card 3 (hecho con nota historiográfica):** Pavón (17 de septiembre de 1861) y el decreto de cesación: Mitre presidente, decreto de abril 1862, cesación de Alberdi como agente diplomático sin pago de sueldos atrasados. Consecuencia directa y documentada.

4. **Card 4 (opinión):** La polémica historiográfica Alberdi-Mitre (1864+): Alberdi critica la *Historia de Belgrano* de Mitre; la irreconciliable oposición entre sus legados desde el exilio. Citando Mayer 1963 y CONICET 2015.

**Certeza correcta para cada card:**
- Card 1: `card-hecho` — datas verificadas (Wikipedia EN, Infobae 2026).
- Card 2: `card-hecho` — revolución 11 septiembre 1852 es hecho. El proyecto divergente ya mencionado en SP4-3 pero no narrado desde el ángulo Alberdi-Mitre.
- Card 3: `card-hecho` — decreto de cesación documentado en fuente académica (USAL/Épocas).
- Card 4: `card-opinion` — la irreconciliabilidad es lectura historiográfica (CONICET, Mayer).

**No incluir:**
- *El crimen de la guerra*: ya cubierto en CARD 2 del período nacional.
- Presidencia de Mitre completa: fuera de scope (ya en M004/CARD 1).
- La alianza inicial en la Generación del 37 (1837–1838): Mitre es 17 años en 1838, no es figura central en ese período.

## Implementation Landscape

### Key Files

- `index.html` — archivo único del proyecto. El borrador S01 produce `S01-CONTENT-DRAFT.md`; S02 lo integra en index.html.
- `.gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md` — archivo de salida de esta slice (producido por S01, consumido por S02).

### Duplication Boundary Map

| Card M016 propuesta | Duplica con... | Decisión |
|---------------------|----------------|---------|
| Alianza Valparaíso (1848) | Nada en HTML | ✓ incluir |
| Los Debates / 11-sep-1852 | SP4-3 menciona revolución de Mitre, pero desde el ángulo de Buenos Aires vs. Confederación, no desde el eje Alberdi-Mitre | ✓ incluir como nuevo ángulo |
| Pavón / decreto cesación | BIOG-13 menciona "derrota de Urquiza en Pavón y ascenso de Mitre" como frase; card sobre Pavón no existe como card propia sobre el decreto | ✓ incluir; no repetir el texto de BIOG-13 |
| Polémica historiográfica 1864 | Nada — Mitre como historiador mencionado en cites (líneas 1280, 1324, 1912) pero no hay card sobre la disputa | ✓ incluir |
| El crimen de la guerra | CARD 2 período nacional ya lo cubre | ✗ NO incluir |
| Presidencia de Mitre completa | CARD 1 período nacional ya la cubre | ✗ NO incluir |

### Insertion Point in index.html (para S02)

La sección más lógica es un nuevo `<div class="sub-period">` dentro de `#periodo-revolucion`, inmediatamente **después** del cierre de `#rev-1852-1860` (línea ~2498) y **antes** de la `revolucion-timeline` animada. Esto coloca el contenido 1848–1862 cronológicamente correcto entre la Organización Nacional (1852–1860) y el período nacional.

Alternativa: nueva sub-sección dentro de `#periodo-nacional` antes de las cards existentes. Esta opción es menos natural porque el contenido cubre 1848–1862 y los hechos clave ocurren antes de 1862.

**Recomendación:** Sub-period nuevo dentro de `#periodo-revolucion` con ID `rev-alberdi-mitre`, usando el patrón establecido en D020. Esto mantiene la cohesión del período 1800-1860.

### Card Template to Use

Seguir exactamente los patrones en uso:
- `card-hecho`: `<article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: Nms">`
- `card-opinion`: mismo pero con `card-opinion` y `data-certeza="opini&#xF3;n"` (con entity para Windows — D053).
- `card-nota-historiografica`: `<p class="card-nota-historiografica"><strong>Nota historiográfica:</strong>...</p>` dentro del body de la card (D044 pattern).
- Certeza indicator: `<div class="card-certeza-indicator">` con icon + label.
- Image: `<div class="card-image"><img ... loading="lazy"></div>`.
- Stagger: 0ms, 80ms, 160ms, 240ms.

### Build Order

1. **Primero: investigar y redactar los 4 cards en el borrador** — verificar cada claim contra la fuente indicada. Produce `S01-CONTENT-DRAFT.md`.
2. S02 consume el borrador para integrar HTML.

### Verification Approach

- Buscar en `index.html` por "Mitre" para confirmar que el texto de las 4 nuevas cards no repite frases ya existentes.
- Confirmar que cada card tiene al menos 1 fuente académica o primaria en `<cite>`.
- Confirmar que `data-certeza` es correcto para cada card.

## Constraints

- **Zero new CSS**: los patrones de card ya existen; no se puede agregar nueva clase CSS (D001, D030).
- **No duplicar BIOG-13 ni SP4-3/SP4-5**: las frases "varado en París" y "revolución encabezada por Mitre" ya existen — las nuevas cards deben tener ángulo propio.
- **No fabricar citas directas Alberdi-Mitre**: no hay epistolario digitalizado verificado entre ambos. Usar paráfrasis atribuida a fuente secundaria (Mayer, Halperin Donghi).
- **No mencionar *El crimen de la guerra*** en las nuevas cards: ya cubierto en CARD 2 del período nacional (línea ~2631).
- **Accented data-certeza**: usar `data-certeza="opini&#xF3;n"` con HTML entity en las cards de opinión (D053 — Windows encoding issue).

## Common Pitfalls

- **La imagen del retrato de Mitre (Manzoni, 1861)** ya está usada en SP4-5. Para las nuevas cards, buscar imagen diferente o usar la de Alberdi (ya usada en SP4-1). Una nueva imagen de Mitre requeriría verificar en Wikimedia API — se puede reusar el retrato de Alberdi en París (ya en línea ~2738) para la card de Pavón/cesación.
- **Pavón vs. Cepeda**: Cepeda (1859) fue la victoria de Urquiza sobre Mitre; Pavón (17 sept. 1861) fue la victoria de Mitre. Son eventos distintos. BIOG-13 y SP4-4 ya cubren Cepeda. La card de S01 sobre Pavón no debe confundir las dos batallas.
- **El sub-nav de #periodo-revolucion** (línea ~325) tiene 4 links. Agregar un nuevo sub-period con ID puede requerir agregar un link al sub-nav en S02 — S02 debe evaluar esto.

## Open Risks

- La fecha exacta del decreto de cesación de Mitre: la fuente USAL/Épocas dice "abril de 1862" pero no da el día exacto. Usar "abril de 1862" como fecha en la card sin día específico.
- La Batalla de Pavón (17 sept. 1861): el "retiro" de Urquiza del campo de batalla es un hecho historiográficamente debatido — ¿derrota real o acuerdo político? Documentar con `card-nota-historiografica` en la card de Pavón.

## Card Outline (for S01-CONTENT-DRAFT.md)

### Card A: La alianza en Valparaíso (1848–1852)
- **Certeza**: `card-hecho` / `data-certeza="hecho"`
- **Año display**: 1848 – 1852
- **Título**: Mitre secretario de Alberdi: la alianza del exilio antirrosista
- **Contenido verificado**: En Chile (ca. 1848), Mitre fue redactor de *El Comercio de Valparaíso* y colaboró como secretario de Alberdi. Ambos antirrosistas, ambos exiliados, ambos combatieron bajo Urquiza en Caseros (febrero 1852). Coincidieron en el objetivo: derrotar a Rosas. La divergencia vino después.
- **Fuentes**: Wikipedia EN (Bartolomé Mitre); Infobae 19 ene. 2026.
- **Imagen**: retrato de Mitre joven — verificar disponibilidad en Wikimedia; alternativa: retrato de Alberdi (diferente al ya en SP4-1).

### Card B: *Los Debates* y la ruptura (1852)
- **Certeza**: `card-hecho` / `data-certeza="hecho"`
- **Año display**: Abril – Septiembre de 1852
- **Título**: *Los Debates* y la ruptura: dos Argentinas post-Caseros
- **Contenido verificado**: El 1 de abril de 1852, Mitre fundó *Los Debates* en Buenos Aires. Su primer editorial ("Profesión de Fe") declaró apoyo a la organización nacional, pero desde agosto de 1852 se convirtió en voz de oposición al Acuerdo de San Nicolás, al que Mitre denunció como "una dictadura irresponsable". Urquiza lo desterró; regresó para liderar la revolución del 11 de septiembre de 1852 y la secesión de Buenos Aires. Alberdi, desde Valparaíso, apoyó a Urquiza y la Confederación: su proyecto de las *Bases* era federal, no porteño.
- **Fuentes**: Infobae 19 ene. 2026; La Nación (lanacion.com.ar, 26 feb. 2022); Halperin Donghi, *Una nación para el desierto argentino*, CEAL, 1982.
- **Nota**: No repetir la frase de SP4-3 ("una revolución encabezada por Mitre separó Buenos Aires de la Confederación") — narrar desde el eje intelectual de los dos proyectos.

### Card C: Pavón y la cesación (1861–1862)
- **Certeza**: `card-hecho` / `data-certeza="hecho"` con `card-nota-historiografica` sobre el debate Pavón
- **Año display**: 17 sept. 1861 – abril 1862
- **Título**: Pavón: Mitre triunfa, Alberdi pierde el cargo
- **Contenido verificado**: El 17 de septiembre de 1861, las fuerzas porteñas de Mitre y el ejército confederado de Urquiza se enfrentaron en Pavón (prov. Santa Fe). Urquiza se retiró del campo de batalla; Mitre fue proclamado director provisorio de la Confederación. En abril de 1862, Mitre dictó el decreto que determinó la cesación de Alberdi como agente diplomático de la Confederación ante Francia, Gran Bretaña y España, y se negó a pagarle los sueldos atrasados. El arquitecto de la Constitución quedó en París sin cargo, sin sueldo y sin pasaje de regreso.
- **Nota historiográfica**: La retirada de Urquiza en Pavón es debatida: la posición liberal (Mitre, Sarmiento) la interpreta como derrota militar; la revisión posterior sugiere que Urquiza acordó retirarse para evitar más derramamiento de sangre o por intereses económicos entrerrianos.
- **Fuentes**: USAL/Épocas, núm. 12, 2015 (PDF académico verificado); Halperin Donghi, *Una nación para el desierto argentino*, CEAL, 1982; Mayer, J. M., *Alberdi y su tiempo*, EUDEBA, 1963.

### Card D: La polémica historiográfica (1864)
- **Certeza**: `card-opinion` / `data-certeza="opini&#xF3;n"`
- **Año display**: 1864
- **Título**: La polémica con Mitre: dos relatos incompatibles de la Argentina
- **Contenido verificado**: En 1864, Alberdi leyó la *Historia de Belgrano y de la independencia argentina* de Mitre y consignó en notas privadas una crítica demoledora — publicadas póstumamente como "Belgrano y sus historiadores" (en *Grandes y Pequeños Hombres del Plata*, Casa Garnier, París, s.f. [ca. 1885]). Para Alberdi, Mitre era el historiador del partido porteño: su lectura de la historia argentina legitimaba la hegemonía de Buenos Aires que las *Bases* habían intentado limitar. Según la síntesis del historiador CONICET, "a partir de 1854, no hay espacio para reconciliación entre uno y otro" — más allá de algunos encuentros de tono cortés cuando Alberdi regresó como diputado en 1879-1880.
- **Fuentes**: Alberdi, *Grandes y Pequeños Hombres del Plata*, 2ª ed., De Palma, 1964 [ca. 1885]; Mayer, J. M., *Alberdi y su tiempo*, EUDEBA, 1963; ri.conicet.gov.ar, PDF académico (Épocas USAL, núm. 12, 2015).
- **Cita directa disponible**: Alberdi en "Belgrano y sus historiadores" criticó con precisión la obra de Mitre — pero sin paginación verificada de la edición Garnier. Usar `[PARÁFRASIS — NO USAR COMO CITA DIRECTA]` si se parafrasea.

## Sources

- Wikipedia EN, "Bartolomé Mitre": datos biográficos, exilio en Chile, secretario de Alberdi, *El Comercio de Valparaíso*, fundación *Los Debates*, Caseros, Pavón.
- Infobae, 19 de enero de 2026: datos biográficos de Mitre, secretario de Alberdi ca. 1848, fundación *Los Debates* 1° de abril de 1852.
- La Nación / lanacion.com.ar (26 feb. 2022): *Los Debates* y su editorial "Profesión de Fe" del 1° de abril de 1852.
- ri.conicet.gov.ar PDF (USAL Épocas, núm. 12, 2015): Alberdi y *La Nación* (Mitre); "A partir de 1854, no hay espacio para reconciliación" — cita textual; decreto de cesación de abril 1862.
- USAL/Épocas, núm. 12, 2015 (p3.usal.edu.ar PDF): decreto de cesación de Mitre, sueldos atrasados.
- Mayer, J. M., *Alberdi y su tiempo*, EUDEBA, 1963 — ya citada en el sitio (SP4-5): autoridad central sobre Alberdi post-Caseros.
- Halperin Donghi, T., *Una nación para el desierto argentino*, CEAL, 1982 — ya citada en SP4-3/SP4-4.
- Dialnet/Historia Crítica núm. 33, 2007: Alberdi, "Belgrano y sus historiadores" en *Grandes y Pequeños Hombres del Plata* (2ª ed., De Palma, 1964).
