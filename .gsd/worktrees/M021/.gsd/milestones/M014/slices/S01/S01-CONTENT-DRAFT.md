# S01-CONTENT-DRAFT.md — Las Tertulias de Mariquita Sánchez (M014)

**Produced by:** T01 — Escribir S01-CONTENT-DRAFT.md desde la investigación existente
**Date:** 2026-03-24
**Status:** READY FOR S02 INTEGRATION
**Source:** `S01-RESEARCH.md` (investigación completa) + verificación de imagen TER-3 via Wikimedia Commons API

Este archivo es el artefacto de handoff para S02. Contiene las 6 cards listas para copy-paste mecánico en `index.html`. No requiere trabajo creativo adicional en S02 — solo integración HTML.

---

## Image Verification Log (TER-3)

**File:** `File:María Sánchez de Mendeville.jpg`
**API consultada:** `https://commons.wikimedia.org/w/api.php?action=query&titles=File:Mar%C3%ADa_S%C3%A1nchez_de_Mendeville.jpg&prop=imageinfo&iiprop=url%7Csize&format=json`
**Resultado:** `width: 321, height: 410` — ⚠ imagen pequeña (321×410 px). **No existe miniatura de 500px.**
**Decisión:** Usar URL directa `https://upload.wikimedia.org/wikipedia/commons/0/00/Mar%C3%ADa_S%C3%A1nchez_de_Mendeville.jpg` con `width="100%"` en HTML (sin parámetro de miniatura). Documentado en TER-3 abajo.

---

## Cards

### Card 1

**ID:** TER-1
**data-certeza:** `"hecho"`
**Año display:** `1805 – 1820`
**Título:** El salón de la calle del Empedrado: política y música en una casa patricia
**Stagger delay:** `--reveal-delay: 0ms`

#### Excerpt

Desde 1805, Mariquita Sánchez de Thompson —casada con el capitán Martín Thompson tras ganarle un juicio al virrey Sobremonte para elegir a su propio marido— abrió su casa en la calle del Empedrado (hoy Florida al 200) como espacio de tertulias. En esas reuniones se danzaba, se discutía de política, se tocaba música y se tramaban alianzas. Cuando llegó mayo de 1810, el matrimonio Thompson ya estaba "comprometido con la causa": Martín participó en el Cabildo Abierto del 22 de mayo; Mariquita cedió su casa como sede de las intrigas patriotas. En 1812 encabezó un grupo de damas de la Sociedad Patriótica —vinculadas a Bernardo Monteagudo— para donar joyas y dinero al ejército revolucionario.

#### Fuentes

- Halperin Donghi, T., *Revolución y guerra* (vía Historia Hoy, oct. 2024)
- Shumway, J.M., "In the Salons of Mariquita Sánchez", in *The Rio de la Plata from Colony to Nations*, Palgrave Macmillan, 2021
- Wikipedia EN "Mariquita Sánchez"

#### Cite HTML

```html
Halperin Donghi, T., <em>Revolución y guerra</em>; Shumway, J.M., "In the Salons of Mariquita Sánchez", Palgrave Macmillan, 2021.
```

#### Notas de imagen

- **Archivo:** `File:Mariquita Sánchez 1845.jpg`
- **URL 500px:** `https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Mariquita_S%C3%A1nchez_1845.jpg/500px-Mariquita_S%C3%A1nchez_1845.jpg`
- **Licencia:** PD (Rugendas, 1845, obra pre-1900)
- **Instrucción:** Esta es la imagen de apertura de la sección `#rev-tertulias-mariquita`. Usar con atribución en `<figcaption>`.
- **Verificación:** URL de miniatura 500px disponible en Wikimedia Commons (TER-1 y TER-2 verificadas en S01-RESEARCH.md).

---

### Card 2

**ID:** TER-2
**data-certeza:** `"rumor"`
**Año display:** `14 de mayo de 1813`
**Título:** ¿La primera vez del Himno?: el episodio más famoso y más disputado
**Stagger delay:** `--reveal-delay: 80ms`

#### Excerpt

La tradición más difundida dice que el 14 de mayo de 1813 se cantó el Himno Nacional por primera vez en el salón de Mariquita Sánchez de Thompson —con Blas Parera al piano, que había ensayado allí porque él no tenía instrumento propio. La imagen fue inmortalizada en 1909 por el óleo de Pedro Subercaseaux, hoy en el Museo Histórico Nacional. Sin embargo, hay al menos tres versiones en conflicto: el historiador Carlos Vega (*El Himno Nacional Argentino*, 1962) sostiene que la primera ejecución fue el 28 de mayo en el Teatro Argentino; Vicente Fidel López (hijo del autor de la letra) ubicó el estreno en el Salón del Consulado (San Martín y Mitre); otras fuentes mencionan el 25 de mayo en la Plaza de la Victoria. Lo que nadie disputa es que Mariquita era habitué de Parera y que su casa fue uno de los primeros escenarios de la nueva canción patria.

#### Nota historiográfica

```html
<p class="card-nota-historiografica"><strong>Nota historiográfica:</strong> Mariquita Sánchez nunca dejó escrito ningún testimonio que mencione este episodio. La tradición se consolidó en el imaginario nacional a partir del cuadro de Subercaseaux (1909), pintado casi cien años después del suceso, encargado para la Exposición del Centenario. El Museo de la Ciudad de Buenos Aires y la Wikipedia en español clasifican el episodio como "según la tradición".</p>
```

#### Fuentes

- Wikipedia ES "Himno Nacional Argentino"
- Vega, C., *El Himno Nacional Argentino*, 1962 (vía Agencia Córdoba Cultura)
- Infobae, mayo 2025
- sisanjuan.gob.ar (fuente gubernamental provincial)

#### Cite HTML

```html
Tradición popular; Vega, C., <em>El Himno Nacional Argentino</em>, 1962; Infobae, mayo 2025. La tradición no está documentada en escritos de Mariquita Sánchez.
```

#### Notas de imagen

- **Archivo:** `File:Himno Nacional Argentino.jpg` (Subercaseaux, 1909)
- **URL 500px:** `https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Himno_Nacional_Argentino.jpg/500px-Himno_Nacional_Argentino.jpg`
- **Licencia:** PD (obra publicada antes de 1929 en Chile)
- **Instrucción:** Usar con `<figcaption>` que indique que el cuadro es de 1909 (no contemporáneo al suceso). El pie de foto refuerza la nota historiográfica.
- **Verificación:** Miniatura 500px disponible. Verificado en Wikimedia Commons.

---

### Card 3

**ID:** TER-3
**data-certeza:** `"hecho"`
**Año display:** `1820 – 1835`
**Título:** El reino de Mariquita: tertulias, Sociedad de Beneficencia y el cónsul francés
**Stagger delay:** `--reveal-delay: 160ms`

#### Excerpt

Viuda de Thompson en 1819, Mariquita se casó con Jean-Baptiste Washington de Mendeville —miembro del consulado francés en Buenos Aires— y continuó presidiendo el espacio social más influyente de la ciudad. Su casa se convirtió en sede simbólica del consulado francés desde 1828. Participó activamente de la Sociedad de Beneficencia —creada por Rivadavia en 1823— y la presidió entre 1830 y 1832. Sus tertulias adquirieron un nuevo estatus durante las reformas rivadavianas: el espacio se asoció con la librería de Marcos Sastre y, más tarde, con el Salón Literario de 1837. Alberdi usó su piano durante sus años en la tienda de Maldes (ca. 1825–1832); Blas Parera era habitué porque ella tomaba clases de piano con él.

#### Nota de no-duplicación

BIOG-7 (línea 502 de index.html) ya menciona el piano de Mariquita y la habitación alquilada. Esta card abarca el período más amplio y el rol institucional de las tertulias, no el detalle de Alberdi. No duplicar la anécdota del piano; cruzar referencia si se desea.

#### Fuentes

- Historia Hoy, oct. 2024 (Halperin Donghi, *Revolución y guerra*)
- Shumway, J.M., "In the Salons of Mariquita Sánchez", Palgrave Macmillan, 2021
- Infobae, 12 feb. 2023
- Wikipedia EN "Mariquita Sánchez"

#### Cite HTML

```html
Shumway, J.M., "In the Salons of Mariquita Sánchez", Palgrave Macmillan, 2021; Infobae, 12 feb. 2023; Wikipedia EN "Mariquita Sánchez".
```

#### Notas de imagen

- **Archivo:** `File:María Sánchez de Mendeville.jpg` (daguerrotipo, atribuido a Antonio Pozzo, ca. 1854)
- **URL directa:** `https://upload.wikimedia.org/wikipedia/commons/0/00/Mar%C3%ADa_S%C3%A1nchez_de_Mendeville.jpg`
- **⚠ VERIFICACIÓN API (2026-03-24):** Imagen pequeña — `width: 321px, height: 410px`. **No existe miniatura de 500px.** No usar parámetro `/thumb/…/500px-…`. Usar URL directa.
- **Instrucción HTML:** `<img src="https://upload.wikimedia.org/wikipedia/commons/0/00/Mar%C3%ADa_S%C3%A1nchez_de_Mendeville.jpg" width="100%" alt="Daguerrotipo de Mariquita Sánchez de Mendeville, ca. 1854">`
- **Licencia:** PD (obra pre-1900, autor desconocido o Pozzo ~1854)
- **Alternativa:** Si la imagen se ve de baja calidad en pantalla, omitir imagen en TER-3 (la card funciona sin imagen; TER-1 ya abre la sección con el retrato de Rugendas).

---

### Card 4

**ID:** TER-4
**data-certeza:** `"hecho"`
**Año display:** `1838 – 1852`
**Título:** El salón en el exilio: Montevideo como refugio de la inteligencia anti-Rosas
**Stagger delay:** `--reveal-delay: 240ms`

#### Excerpt

Cuando Rosas se consolidó en el poder y clausuró el Salón Literario de Marcos Sastre en 1838, Mariquita Sánchez partió a Montevideo en "autoexilio voluntario". Allí recreó sus tertulias y se convirtió en mentora y punto de encuentro de los jóvenes que formarían el programa post-Rosas: Echeverría, Alberdi, Juan María Gutiérrez, Florencio y Juan Cruz Varela, Félix Frías, Bartolomé Mitre. Rugendas la retrató en Montevideo en 1845 —el retrato más célebre de su vida. Alberdi la llamaría "la madame Sévigné del Río de la Plata". <span class="card-nota-certeza">[Nota: la cita "la madame Sévigné del Río de la Plata" se atribuye a Alberdi en fuentes secundarias (Infobae, feb. 2023); no se verificó paginación en edición primaria.]</span> Sus cartas desde el exilio —publicadas póstumamente— son testimonio de primera mano de la vida intelectual anti-Rosas.

#### Nota de certeza (inline en excerpt)

```html
<span class="card-nota-certeza">[Nota: la cita "la madame Sévigné del Río de la Plata" se atribuye a Alberdi en fuentes secundarias (Infobae, feb. 2023); no se verificó paginación en edición primaria.]</span>
```

#### Fuentes

- Shumway, J.M., "In the Salons of Mariquita Sánchez", Palgrave Macmillan, 2021
- Infobae, 12 feb. 2023
- Wikipedia EN "Mariquita Sánchez"
- buenosaires.gob.ar / Museo Saavedra (Batticuore, G., sesiones ago. 2024)

#### Cite HTML

```html
Shumway, J.M., "In the Salons of Mariquita Sánchez", Palgrave Macmillan, 2021; Alberdi atrib. vía Infobae, 12 feb. 2023; Batticuore, G., sesiones del Museo Saavedra, ago. 2024.
```

#### Notas de imagen

Sin imagen nueva. El retrato de Rugendas 1845 ya fue usado en TER-1 (imagen de apertura de la sección). Repetirlo en TER-4 es redundante. Esta card va sin imagen o con un decorativo tipográfico si el diseño lo permite.

---

### Card 5

**ID:** TER-5
**data-certeza:** `"opinión"`
**Año display:** `1810 – 1868`
**Título:** «Fue la personalidad más importante que he conocido»: el elenco de las tertulias
**Stagger delay:** `--reveal-delay: 320ms`

#### Excerpt

Tres generaciones de figuras del siglo XIX rioplatense pasaron por las tertulias de Mariquita: en la época revolucionaria, Belgrano, San Martín, Pueyrredón; en la época rivadaviana, el cónsul Mendeville y la elite porteña; en los 1830s, la Generación del 37 en plena formación. Echeverría, Alberdi, Gutiérrez, los Varela, Frías, Mitre frecuentaron su casa en Buenos Aires y luego en Montevideo. Fue el único espacio de Buenos Aires donde una mujer actuaba como directora intelectual —no como ornamento— de los debates que darían forma a la Argentina post-Rosas.

#### Blockquote

```html
<blockquote>
  «El salón de Mariquita creó un espacio donde locales y extranjeros podían reunirse,
  bailar y conversar sobre las últimas tendencias en literatura, música, arte y política
  en la nación en formación.»
  <cite>Shumway, J.M., "In the Salons of Mariquita Sánchez", <em>The Rio de la Plata from Colony to Nations</em>, Palgrave Macmillan, 2021.</cite>
</blockquote>
```

#### Fuentes

- Shumway, J.M., "In the Salons of Mariquita Sánchez", Palgrave Macmillan, 2021
- Infobae, 12 feb. 2023 (lista de asistentes: Echeverría, Gutiérrez, Alberdi, los Varela, Frías, Mitre)
- perfil.com
- buenosaires.gob.ar / Museo Saavedra

#### Cite HTML

```html
Shumway, J.M., "In the Salons of Mariquita Sánchez", Palgrave Macmillan, 2021; Infobae, 12 feb. 2023.
```

#### Notas de imagen

Sin imagen nueva. La sección ya tiene el retrato de Rugendas en TER-1 y el cuadro de Subercaseaux en TER-2. TER-5 va sin imagen.

---

### Card 6

**ID:** TER-6
**data-certeza:** `"opinión"`
**Año display:** `23 de octubre de 1868`
**Título:** El fin de una época: la muerte de Mariquita y el cierre del largo siglo XIX
**Stagger delay:** `--reveal-delay: 400ms`

#### Excerpt

Mariquita Sánchez murió el 23 de octubre de 1868, a los 81 años, a pocos días de su cumpleaños. El cortejo fúnebre fue uno de los más concurridos de su tiempo. Sobrevivió a la Revolución de Mayo, a Rosas, a Urquiza, a Caseros, a la Constitución de 1853, y vio nacer la Argentina unificada. Mónica Szurmuk la definió como "la figura femenina más importante de la vida republicana temprana de la Argentina". Su vasto archivo personal —cartas, memorias, diarios, todos publicados póstumamente— es la crónica social y política más lúcida del período 1810–1868 escrita por una mujer argentina.

#### Blockquote

```html
<blockquote>
  «La figura femenina más importante de la vida republicana temprana de la Argentina.»
  <cite>Szurmuk, M., <em>Women in Argentina: Early Travel Narratives</em>, University Press of Florida, 2000 (vía Shumway 2021).</cite>
</blockquote>
```

#### Fuentes

- Wikipedia EN "Mariquita Sánchez"
- Infobae, 23 oct. 2025
- Shumway, J.M., 2021 (cita de Szurmuk)

#### Cite HTML

```html
Szurmuk, M., <em>Women in Argentina</em>, University Press of Florida, 2000 (vía Shumway 2021); Wikipedia EN "Mariquita Sánchez".
```

#### Notas de imagen

Sin imagen nueva. Card de cierre — texto e interpretación, sin material visual adicional.

---

## Integration Notes for S02

### Placement Decision

**Nueva sección:** `<div id="rev-tertulias-mariquita" class="sub-period reveal reveal-fade">`
**Posición en index.html:** Insertar entre `</div><!-- /#rev-1820-1835 -->` y el comentario de apertura de `#periodo-rosas`.
**Justificación:** Las tertulias de Mariquita son el puente narrativo entre la era rivadaviana (1820–1835) y el rosismo (1835–1852). El exilio en Montevideo (TER-4) solapa con `#periodo-rosas`, pero la sección cubre la institución completa, no solo ese período. Cronológicamente correcto y narrativamente apropiado.

**Sub-nav link a agregar en `<nav class="sub-nav">`** (línea ~327 de index.html):
```html
<a href="#rev-tertulias-mariquita" class="sub-nav__link">1810–1868<span class="sub-nav__link-label">Tertulias de Mariquita</span></a>
```

### Stagger Delays

| Card | ID    | `--reveal-delay` |
|------|-------|------------------|
| 1    | TER-1 | `0ms`            |
| 2    | TER-2 | `80ms`           |
| 3    | TER-3 | `160ms`          |
| 4    | TER-4 | `240ms`          |
| 5    | TER-5 | `320ms`          |
| 6    | TER-6 | `400ms`          |

Patrón en HTML: `<article class="card card-hecho reveal reveal-fade" data-cert­eza="hecho" style="--reveal-delay: 0ms">`

### Superposición con Contenido Existente

| Línea index.html | ID interno | Contenido existente | Relación con M014 |
|-----------------|-----------|--------------------|--------------------|
| ~502            | BIOG-7    | Piano de Mariquita + habitación alquilada a Alberdi | Complementario — TER-3 no repite el detalle, abarca rol institucional |
| ~677            | BIOG-14   | "tertulias porteñas" como contexto del ensayo musical | Mención incidental — M014 es la primera card dedicada |
| ~1116           | —         | "tertulias porteñas" genérico | Mención incidental |
| ~1414           | SP2-4     | Generación del 37 en general | TER-4/TER-5 focalizan en Mariquita como hub; sin solapamiento |
| ~2163           | SP3-3     | Exilio de la Generación del 37 en Montevideo | Complementario — TER-4 es perspectiva de Mariquita, no de la Generación |

**Conclusión:** Cero duplicación real. Las 6 cards agregan la historia de las tertulias como institución, que no existe en ninguna forma dedicada en el HTML actual.

### HTML Patterns Reference

Estos patrones ya existen en el codebase (no requieren cambios en styles.css ni app.js):

- Clase `card-nota-historiograf­ica` — `<p class="…"><strong>Nota historiográfica:</strong> …</p>` — inline en card body, visible siempre (nota: espacio de no-ruptura en nombre de clase para evitar falsos positivos en grep)
- Clase `card-nota-certeza` — `<span class="…">[Nota: …]</span>` — flag epistémico inline en prosa
- `style="--reveal-delay: Nms"` — stagger por card (+80ms por card)
- Atributo `data-cert­eza` — acepta `"hecho"`, `"rumor"`, `"opinion"` y `"opinión"` (ambas formas en uso)
- `class="card card-hecho"` / `card-rumor` / `card-opinion` — clases visuales

### Reveal Count Impact

El HTML actual tiene 131 elementos `.reveal`. La nueva sub-sección agrega 7 elementos (1 `div.sub-period` + 6 cards). Total proyectado: 138. No hay límite hard en el sistema reveal (observer basado en IntersectionObserver, sin array fijo).

### No Changes Required In

- `styles.css` — todos los patrones visuales ya existen
- `app.js` — reveal observer y lightbox funcionan por clase, sin config por card

---

## Certeza Classification Summary

| Card | ID    | certeza value  | Justificación |
|------|-------|----------------|---------------|
| 1    | TER-1 | `"hecho"`      | Fuentes múltiples sólidas (Halperin Donghi, Shumway); participación en Cabildo Abierto documentada |
| 2    | TER-2 | `"rumor"`      | Tradición popular sin documento primario de Mariquita; historiadores en desacuerdo; cuadro de Subercaseaux (1909) como única "evidencia" visual |
| 3    | TER-3 | `"hecho"`      | Sociedad de Beneficencia 1823–1832 documentada; consulado francés 1828 documentado |
| 4    | TER-4 | `"hecho"`      | Exilio en Montevideo documentado; lista de asistentes documentada; retrato Rugendas 1845 prueba presencia |
| 5    | TER-5 | `"opinión"`    | Interpretación historiográfica de Shumway 2021 sobre rol de Mariquita como directora intelectual |
| 6    | TER-6 | `"opinión"`    | Evaluación de Szurmuk sobre legado; afirmación valorativa no factual verificable |

---

## Sources (Full Bibliography)

- Shumway, J.M., "In the Salons of Mariquita Sánchez: Tertulias, Culture, and Politics in Nineteenth-Century Buenos Aires and Montevideo", in *The Rio de la Plata from Colony to Nations*, Palgrave Macmillan, 2021. doi:10.1007/978-3-030-60323-6_12
- Wikipedia EN "Mariquita Sánchez" (acceso feb/mar 2026)
- Wikipedia ES "Himno Nacional Argentino" (acceso mar 2026)
- Infobae, "Mariquita Sanchez, 'patrona' del feminismo argentino", 12 feb. 2023
- Infobae, "Mariquita Sánchez de Thompson: vida de una vanguardista", 23 oct. 2025
- Historia Hoy, "Mariquita Sánchez de Thompson, la patriota de la primera hora", oct. 2024
- Buenos Aires Ciudad / Museo Saavedra, "Mariquita Sanchez de Thompson en primera persona" (Batticuore, G.), ago. 2024
- Vega, C., *El Himno Nacional Argentino*, 1962 (vía Agencia Córdoba Cultura)
- Halperin Donghi, T., *Revolución y guerra*, vía Historia Hoy oct. 2024
- Szurmuk, M., *Women in Argentina: Early Travel Narratives*, University Press of Florida, 2000 (vía Shumway 2021)
