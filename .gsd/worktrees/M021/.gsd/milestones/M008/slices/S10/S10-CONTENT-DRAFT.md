# S10-CONTENT-DRAFT: Ideas de unitarios y federales

**Slice:** S10 — Ideas de unitarios y federales
**Milestone:** M008
**Author:** T01 executor, 2026-03-22
**Purpose:** Recipe for T02 HTML integration — all facts, certeza, images, and sources verified here before HTML is touched.

---

## Image Verification Log

All images verified via Wikimedia API (`/w/api.php?action=query&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=500`).

| Card | File | Thumb URL | License | API status | Decision |
|------|------|-----------|---------|------------|----------|
| S10-1 | `Retrato_de_Sarmiento_-_Benjamín_Franklin_Rawson.jpg` | `https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Retrato_de_Sarmiento_-_Benjam%C3%ADn_Franklin_Rawson.jpg/500px-Retrato_de_Sarmiento_-_Benjam%C3%ADn_Franklin_Rawson.jpg` | Public domain | thumburl confirmed, 500×632px | ✅ Accepted |
| S10-2 | `Juan_Bautista_Bustos.jpg` | `https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Juan_Bautista_Bustos.jpg/500px-Juan_Bautista_Bustos.jpg` | Public domain | thumburl confirmed, 500×688px | ✅ Accepted |
| S10-3 | `General_Don_Juan_LaValle.jpg` | `https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/General_Don_Juan_LaValle.jpg/500px-General_Don_Juan_LaValle.jpg` | Public domain | thumburl confirmed, 500×774px | ✅ Accepted |

**Candidates considered and rejected / not used:**
- `Charton, Ernest - Retrato de Esteban Echeverría -o.jpg` — already used in SP3-3. ❌ Reuse conflict.
- `Domingo_Faustino_Sarmiento_militar.jpg` — already used in SP3-4. ❌ Reuse conflict.
- `Domingo_Sarmiento.jpg` — already used. ❌ Reuse conflict.
- `Estanislao_López.jpg` — file missing on Wikimedia Commons (API returned `missing`, no imagerepository). ❌ Not found.
- `Facundo_Quiroga_por_García_del_Molino.jpg` — already used in SP2-2. ❌ Reuse conflict.
- `Raymond_Monvoisin_-_Retrato_de_Juan_Manuel_de_Rosas,_1842.jpg` — already used in SP3-1. ❌ Reuse conflict.

**S10-2 image rationale:** The primary federal representatives (Rosas, Quiroga, Rosas again) are all used. Estanislao López has no portrait on Commons. Juan Bautista Bustos (Governor of Córdoba, 1820–1829) was the single most important inland federal caudillo of the formative period — his provincial government is the clearest institutional embodiment of the federal program (autonomía, proteccionismo, refusal to join Buenos Aires-led confederations). Public domain, 500px verified. Not in the used-image list. ✅

---

## Card S10-1: El programa unitario: centralismo, libre comercio y modelo europeo

- **Certeza:** `hecho`
- **Year display:** `1820 – 1852`
- **HTML card class:** `card-hecho`
- **Reveal delay:** `0ms`

### Excerpt (for `event-card__excerpt`)

El bando unitario sostenía que la Argentina debía gobernarse desde un poder central con sede en Buenos Aires, con facultad de intervenir en las provincias para garantizar el orden institucional. Su programa económico era el libre comercio: mercados abiertos al capital y las manufacturas europeas, financiados con rentas aduaneras que el Estado nacional redistribuiría. En lo cultural, los unitarios abogaban por la educación pública laica y el modelo institucional europeo —constitución escrita, separación de poderes, ciudadanía formal— como vía de «civilización». Bernardino Rivadavia fue el primer ejecutor de este programa en la década de 1820 con sus reformas administrativas, bancarias y eclesiásticas. Los intelectuales de la Generación del 37 le dieron forma teórica: Esteban Echeverría en el *Dogma Socialista de la Asociación de Mayo* (1837) articuló los principios de progreso, democracia e igualdad; Domingo F. Sarmiento en *Facundo: Civilización y Barbarie* (1845) convirtió la antinomia civilización/barbarie en el marco interpretivo canónico del liberalismo argentino.

### Sources

1. Echeverría, E., *Dogma Socialista de la Asociación de Mayo*, 1837 (publicado en forma de libro en 1846, Montevideo). Edición consultable: CEAL, Buenos Aires, 1958.
2. Sarmiento, D.F., *Facundo: Civilización y Barbarie*, Santiago de Chile, 1845. Edición crítica: Losada, Buenos Aires, 1999.
3. Botana, N., *La tradición republicana: Alberdi, Sarmiento y las ideas políticas de su tiempo*, Sudamericana, Buenos Aires, 1984, Parte I.

### Cite reference (for `card-source` `<cite>`)

```
Echeverría, E., Dogma Socialista de la Asociación de Mayo, 1837/1846. Sarmiento, D.F., Facundo: Civilización y Barbarie, 1845. Botana, N., La tradición republicana, Sudamericana, 1984.
```

### Image

- **File:** `Retrato_de_Sarmiento_-_Benjamín_Franklin_Rawson.jpg`
- **Thumb URL:** `https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Retrato_de_Sarmiento_-_Benjam%C3%ADn_Franklin_Rawson.jpg/500px-Retrato_de_Sarmiento_-_Benjam%C3%ADn_Franklin_Rawson.jpg`
- **Alt text:** `Retrato de Domingo Faustino Sarmiento por Benjamín Franklin Rawson. Autor de «Facundo: Civilización y Barbarie» (1845), obra que expresó el programa intelectual del unitarismo liberal.`
- **License:** Public domain (portrait from 19th century, no copyright restrictions).
- **Attribution note:** None required (public domain), but standard image credit in `<cite>` is acceptable.

### Framing note

SP2-2 dice que los unitarios querían un gobierno central y libre comercio en tres oraciones, sin nombrar a ningún intelectual ni especificar qué políticas implicaba ese programa. S10-1 va dos niveles más profundo: (1) explicita el contenido de cada posición (gobierno central con poder de intervención, libre comercio activo, educación laica, instituciones escritas); (2) nombra a Rivadavia como practicante político y a Echeverría y Sarmiento como los intelectuales que codificaron el programa, con títulos y fechas de obras primarias; (3) evita el error común de reducir el unitarismo a «anti-federal» — tiene una propuesta positiva propia. La certeza `hecho` es correcta porque todas estas posiciones están documentadas en textos primarios publicados.

---

## Card S10-2: El programa federal: autonomía, proteccionismo y reparto de rentas

- **Certeza:** `hecho`
- **Year display:** `1820 – 1852`
- **HTML card class:** `card-hecho`
- **Reveal delay:** `80ms`

### Excerpt (for `event-card__excerpt`)

El programa federal no era simplemente «anti-Buenos Aires»: tenía una coherencia propia. Su eje era la autonomía provincial irrenunciable: cada provincia conservaba su gobierno, sus milicias, sus leyes y su fiscalidad local. En lo económico, los federales exigían proteccionismo —aranceles que protegieran las industrias regionales del interior (vinos de Cuyo, tejidos de Tucumán, cueros de Corrientes)— y el reparto de las rentas aduaneras del puerto de Buenos Aires entre todas las provincias. La identidad federal reivindicaba lo criollo y gaucho frente al «extranjerismo» que atribuía al programa unitario. El instrumento jurídico del federalismo fue el **Pacto Federal del Litoral** (4 de enero de 1831), firmado por Buenos Aires, Santa Fe, Entre Ríos y Corrientes: estableció una confederación sin gobierno central permanente, con cada provincia soberana y una Comisión Representativa como único órgano común. Rosas en Buenos Aires, Facundo Quiroga en La Rioja, Estanislao López en Santa Fe y Juan Bautista Bustos en Córdoba fueron sus exponentes más característicos.

### Sources

1. Pacto Federal del Litoral, 4 de enero de 1831. Texto completo en: Ravignani, E. (comp.), *Asambleas Constituyentes Argentinas*, t. II, Jacobo Peuser, Buenos Aires, 1937.
2. Lynch, J., *Argentine Dictator: Juan Manuel de Rosas 1829–1852*, Clarendon Press, Oxford, 1981, cap. 2 ("The Federal System").
3. Goldman, N. (dir.), *Nueva Historia Argentina*, t. III: *Revolución, República, Confederación (1806–1852)*, Sudamericana, Buenos Aires, 1998, cap. 7 (Ternavasio, "Las reformas rivadavianas en Buenos Aires").

### Cite reference (for `card-source` `<cite>`)

```
Pacto Federal del Litoral, 4 de enero de 1831 (en Ravignani, E., Asambleas Constituyentes Argentinas, t. II, 1937). Lynch, J., Argentine Dictator: Juan Manuel de Rosas, Oxford, 1981. Goldman, N. (dir.), Nueva Historia Argentina, t. III, Sudamericana, 1998.
```

### Image

- **File:** `Juan_Bautista_Bustos.jpg`
- **Thumb URL:** `https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Juan_Bautista_Bustos.jpg/500px-Juan_Bautista_Bustos.jpg`
- **Alt text:** `Retrato de Juan Bautista Bustos, gobernador de Córdoba (1820–1829) y uno de los principales caudillos federales del interior, cuyo gobierno encarnó las demandas de autonomía provincial y proteccionismo.`
- **License:** Public domain.
- **Rationale:** Rosas (already SP3-1, SP3-2), Quiroga (SP2-2), and López (no Commons portrait) are all excluded by reuse conflicts or absence. Bustos was the governor of Córdoba 1820–1829, the province with the strongest artisanal manufacturing sector and therefore the clearest material interest in proteccionismo — making him the most historically fitting image choice for a card specifically about the *federal economic program*. Public domain confirmed.

### Framing note

SP2-2 nombra a los federales en tres oraciones como contraparte a los unitarios, sin explicar qué pedían concretamente. S10-2 hace dos contribuciones: (1) descompone el programa federal en sus elementos constitutivos (autonomía, proteccionismo, reparto de rentas, identidad criolla) y muestra su coherencia interna; (2) cita el Pacto Federal de 1831 como el instrumento jurídico real del federalismo —no una idea abstracta sino un tratado firmado con artículos específicos. La certeza `hecho` es correcta: el Pacto Federal existe y está publicado; las posiciones de los gobernadores federales están documentadas en su correspondencia y en los debates constitucionales de la época.

---

## Card S10-3: El conflicto real: ¿quién controla la aduana de Buenos Aires?

- **Certeza:** `opinion`  ← **no accent** (per KNOWLEDGE.md certeza attribute normalization)
- **Year display:** `1820 – 1852`
- **HTML card class:** `card-opinion`
- **Reveal delay:** `160ms`

### Core argument (for `card-opinion__quote` context)

El historiador Tulio Halperin Donghi propuso que el antagonismo entre unitarios y federales, lejos de ser una disputa entre «civilización» y «barbarie» (el marco de Sarmiento), era la expresión política de dos proyectos incompatibles de inserción en la economía atlántica. Los unitarios querían integrar Argentina al circuito de libre comercio como exportadores de productos primarios e importadores de manufacturas europeas; las provincias del interior —los federales— necesitaban exactamente lo contrario: protección arancelaria para sus industrias artesanales, que no podían competir con las fábricas inglesas. La aduana del puerto de Buenos Aires era el nudo del conflicto: concentraba ~80% de los ingresos fiscales nacionales, y quien la controlara financiaba su ejército y su política. El libre comercio no era solo una filosofía económica sino un arma: las importaciones baratas destruían los vinos mendocinos y las telas tucumanas. La paradoja del federalismo era que los provincianos pedían a la vez autonomía provincial y redistribución de rentas porteñas: dos demandas difíciles de reconciliar con cualquier diseño constitucional. Esta lectura económica —compartida también por John Lynch— no reemplaza los factores políticos e identitarios, pero explica por qué ninguna fórmula constitucional pudo resolver el conflicto antes de Caseros.

**Attribution:** Interpretación paráfrasis de Halperin Donghi, T., *De la revolución de independencia a la confederación rosista*, Paidós, Buenos Aires, 1972 (2ª ed. 2000), especialmente caps. II–IV; y Lynch, J., *Argentine Dictator: Juan Manuel de Rosas 1829–1852*, Oxford, 1981, Introduction. [NO USAR COMO CITA DIRECTA — es paráfrasis historiográfica verificada por autoría pero no por página exacta].

### Opinion card HTML structure

```html
<blockquote class="card-opinion__quote">
  <p>El conflicto entre unitarios y federales era, en su sustrato, una disputa por quién controlaba la aduana de Buenos Aires — el 80% de los ingresos fiscales nacionales. No era «civilización contra barbarie» sino dos proyectos incompatibles de inserción en la economía atlántica: libre comercio para Buenos Aires, proteccionismo para el interior. Ninguna constitución podía resolver esa ecuación sin afectar los intereses de alguno de los bandos.</p>
  <footer class="card-opinion__attribution">
    <strong class="card-opinion__author">Tulio Halperin Donghi</strong>
    <span class="card-opinion__context">— Paráfrasis de <em>De la revolución de independencia a la confederación rosista</em>, Paidós, 1972 (2ª ed. 2000), caps. II–IV; y Lynch, J., <em>Argentine Dictator: Juan Manuel de Rosas 1829–1852</em>, Oxford, 1981. El encuadre económico es interpretación historiográfica, no evento puntual.</span>
  </footer>
</blockquote>
```

### Sources

1. Halperin Donghi, T., *De la revolución de independencia a la confederación rosista*, Paidós, Buenos Aires, 1972 (2ª ed. revisada, 2000), caps. II–IV.
2. Lynch, J., *Argentine Dictator: Juan Manuel de Rosas 1829–1852*, Clarendon Press, Oxford, 1981, Introduction y cap. 1.

### Cite reference (for `card-source` `<cite>`)

```
Halperin Donghi, T., De la revolución de independencia a la confederación rosista, Paidós, 1972 (2000). Lynch, J., Argentine Dictator: Juan Manuel de Rosas 1829–1852, Oxford, 1981.
```

### Image

- **File:** `General_Don_Juan_LaValle.jpg`
- **Thumb URL:** `https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/General_Don_Juan_LaValle.jpg/500px-General_Don_Juan_LaValle.jpg`
- **Alt text:** `Retrato del general Juan Lavalle, quien ordenó el fusilamiento del gobernador federal Manuel Dorrego en 1828, precipitando la guerra civil que expresó el conflicto económico entre Buenos Aires y las provincias.`
- **License:** Public domain (La Mujer magazine, 1900; categories include PD-old-70-expired and CC-PD-Mark).
- **Rationale:** The S10-3 card is about the economic conflict that made the unitario/federal war intractable. Lavalle is the precise historical figure at the intersection of the economic and military dimensions: his execution of Dorrego (the federals' Buenos Aires leader) in December 1828 transformed a constitutional dispute about the aduana into an armed confrontation. He represents the moment when the economic conflict became irreconcilable — fitting for a card about why neither side could afford to lose control of the port. Not in the used-image list; public domain confirmed.

### Framing note

SP2-2 menciona la disputa constitucional unitario/federal sin explicar su fundamento material. S10-3 hace la contribución que no hace ninguna otra tarjeta del proyecto: desplaza el marco desde la política (constitución, caudillos) hasta la economía (aduana, proteccionismo, inserción atlántica), citando explícitamente a Halperin Donghi como el historiador que formuló esa reinterpretación. La certeza `opinion` es correcta porque el encuadre «conflicto de modelos económicos» es interpretación historiográfica — los datos cuantitativos del porcentaje aduanero son hechos, pero la tesis de que eso (y no la barbarie o la identidad) es el conflicto «real» es una lectura intelectual, no un acontecimiento. La voz del blockquote es Halperin Donghi (nombrado), no un personaje histórico del siglo XIX.

---

## T02 Recipe: HTML Attributes for Card Integration

_Copy-paste reference for T02 mechanical integration._

### Insertion point
Use `grep -n 'S10–S24 cards will be appended' index.html` to find the marker line. Insert all three cards **immediately before** that line. The marker must remain in place.

### Card S10-1

```
<!-- S10-1: El programa unitario: centralismo, libre comercio y modelo europeo -->
HTML class:        event-card card-hecho reveal reveal-slide
data-year:         "1820 – 1852"
data-certeza:      "hecho"
style:             --reveal-delay:0ms
Title:             El programa unitario: centralismo, libre comercio y modelo europeo
Image src:         https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Retrato_de_Sarmiento_-_Benjam%C3%ADn_Franklin_Rawson.jpg/500px-Retrato_de_Sarmiento_-_Benjam%C3%ADn_Franklin_Rawson.jpg
Image alt:         Retrato de Domingo Faustino Sarmiento por Benjamín Franklin Rawson. Autor de «Facundo: Civilización y Barbarie» (1845), obra que expresó el programa intelectual del unitarismo liberal.
Excerpt:           [see Card S10-1 excerpt above]
Cite:              Echeverría, E., Dogma Socialista de la Asociación de Mayo, 1837/1846. Sarmiento, D.F., Facundo: Civilización y Barbarie, 1845. Botana, N., La tradición republicana, Sudamericana, 1984.
```

### Card S10-2

```
<!-- S10-2: El programa federal: autonomía, proteccionismo y reparto de rentas -->
HTML class:        event-card card-hecho reveal reveal-slide
data-year:         "1820 – 1852"
data-certeza:      "hecho"
style:             --reveal-delay:80ms
Title:             El programa federal: autonomía, proteccionismo y reparto de rentas
Image src:         https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Juan_Bautista_Bustos.jpg/500px-Juan_Bautista_Bustos.jpg
Image alt:         Retrato de Juan Bautista Bustos, gobernador de Córdoba (1820–1829) y uno de los principales caudillos federales del interior, cuyo gobierno encarnó las demandas de autonomía provincial y proteccionismo.
Excerpt:           [see Card S10-2 excerpt above]
Cite:              Pacto Federal del Litoral, 4 de enero de 1831 (en Ravignani, E., Asambleas Constituyentes Argentinas, t. II, 1937). Lynch, J., Argentine Dictator: Juan Manuel de Rosas, Oxford, 1981. Goldman, N. (dir.), Nueva Historia Argentina, t. III, Sudamericana, 1998.
```

### Card S10-3

```
<!-- S10-3: El conflicto real: ¿quién controla la aduana de Buenos Aires? -->
HTML class:        event-card card-opinion reveal reveal-slide
data-year:         "1820 – 1852"
data-certeza:      "opinion"
style:             --reveal-delay:160ms
Title:             El conflicto real: ¿quién controla la aduana de Buenos Aires?
Image src:         https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/General_Don_Juan_LaValle.jpg/500px-General_Don_Juan_LaValle.jpg
Image alt:         Retrato del general Juan Lavalle, quien ordenó el fusilamiento del gobernador federal Manuel Dorrego en 1828, precipitando la guerra civil que expresó el conflicto económico entre Buenos Aires y las provincias.
Opinion quote:     [see Card S10-3 HTML blockquote above]
Attribution:       Tulio Halperin Donghi
Context:           Paráfrasis de De la revolución de independencia a la confederación rosista, Paidós, 1972 (2ª ed. 2000)...
Cite:              Halperin Donghi, T., De la revolución de independencia a la confederación rosista, Paidós, 1972 (2000). Lynch, J., Argentine Dictator: Juan Manuel de Rosas 1829–1852, Oxford, 1981.
```

---

## Must-Have Checklist

- [x] Draft file exists at `.gsd/milestones/M008/slices/S10/S10-CONTENT-DRAFT.md`
- [x] 3 card sections (## Card S10-1, ## Card S10-2, ## Card S10-3)
- [x] S10-1 certeza: `hecho`; S10-2 certeza: `hecho`; S10-3 certeza: `opinion` (no accent)
- [x] Each card has ≥2 cited sources (S10-3 cites Halperin Donghi with full book title and year)
- [x] Each card's image verified via Wikimedia API — thumburl confirmed, license confirmed
- [x] No image is in the used-image list (Sarmiento-Rawson, Bustos, LaValle — all new)
- [x] Each card has a framing note documenting differentiation from SP2-2
- [x] No synthesized direct quote — S10-3 opinion blockquote is attributed to Halperin Donghi as paraphrase, with [NO USAR COMO CITA DIRECTA] label
- [x] S10-3 blockquote voice is a named historian (Halperin Donghi), not a historical figure of the 19th century
