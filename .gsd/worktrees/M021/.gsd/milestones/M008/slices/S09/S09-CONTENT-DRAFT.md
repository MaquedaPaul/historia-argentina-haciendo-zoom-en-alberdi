# S09-CONTENT-DRAFT: Origen de unitarios y federales

**Slice:** S09 — Origen de unitarios y federales
**Milestone:** M008
**Author:** T01 executor, 2026-03-22
**Purpose:** Recipe for T02 HTML integration — all facts, certeza, images, and sources verified here before HTML is touched.

---

## Image Verification Log

All images verified via Wikimedia API (`/w/api.php?action=query&prop=imageinfo&iiprop=url&iiurlwidth=500`).

| Card | File | Thumb URL | License | Status |
|------|------|-----------|---------|--------|
| S09-1 | `Aduana_de_Buenos_Aires.jpg` | `https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Aduana_de_Buenos_Aires.jpg/500px-Aduana_de_Buenos_Aires.jpg` | CC BY-SA 3.0 | ✅ Verified |
| S09-2 | `Juan_Martín_de_Pueyrredón.jpg` | `https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Juan_Mart%C3%ADn_de_Pueyrred%C3%B3n.jpg/500px-Juan_Mart%C3%ADn_de_Pueyrred%C3%B3n.jpg` | No restrictions | ✅ Verified |
| S09-3 | `Manuel_Dorrego.jpg` | `https://upload.wikimedia.org/wikipedia/commons/4/48/Manuel_Dorrego.jpg` (original, 349×537 — use direct URL per KNOWLEDGE.md small-image rule) | Public domain | ✅ Verified |
| S09-4 | `Mapa_de_las_Provincias_Unidas_del_Río_de_la_Plata_en_1821.png` | `https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Mapa_de_las_Provincias_Unidas_del_R%C3%ADo_de_la_Plata_en_1821.png/500px-Mapa_de_las_Provincias_Unidas_del_R%C3%ADo_de_la_Plata_en_1821.png` | CC BY-SA 4.0 | ✅ Verified — needs attribution |

**Excluded (already used in SP2):**
- `Bernardino_Rivadavia.jpg` — SP2-3
- `Juan_Manuel_de_Rosas.jpg` — SP2-1
- `Facundo_Quiroga_por_García_del_Molino.jpg` — SP2-2
- `Juan_Bautista_Alberdi.jpg` — SP2-4

**Candidate considered and rejected for S09-2:** `Jose_Rondeau.jpg` — image is 188×200px original with no 500px thumb available (API returned thumbwidth:188). Replaced with Juan Martín de Pueyrredón portrait, who served as Supreme Director 1816–1819 and is the primary figure of the Directorio period.

---

## Card S09-1: La Revolución sin resolver — Buenos Aires y el control de la aduana (1810–1820)

- **Certeza:** `hecho`
- **Year display:** `1810 – 1820`
- **HTML card class:** `card-hecho`
- **Reveal delay:** `0ms`

### Excerpt (for `event-card__excerpt`)

Desde 1810, la aduana del puerto de Buenos Aires concentraba en torno al 80% de los ingresos fiscales de las Provincias Unidas: los aranceles sobre el comercio exterior pasaban por la ciudad portuaria, que los retenía para financiar sus propias guerras y administración. Las provincias del interior contribuían con hombres, ganado y materias primas para las campañas militares, pero recibían una fracción mínima de esa renta. Los gobiernos provisionales que se sucedieron tras la Revolución de Mayo nunca resolvieron el régimen aduanero: ninguna junta, triunvirato o directorio llegó a un acuerdo con el interior sobre el reparto de ingresos. Esa asimetría estructural —no solo una disputa política— es el sustrato económico del conflicto entre Buenos Aires y las provincias que estallaría en las guerras civiles de la siguiente generación.

### Sources

1. Halperin Donghi, T., *De la revolución de independencia a la confederación rosista*, Paidós, Buenos Aires, 2000 [1ª ed. 1972], caps. II–III.
2. Goldman, N. (dir.), *Nueva Historia Argentina*, t. III: *Revolución, República, Confederación (1806-1852)*, Sudamericana, Buenos Aires, 1998, cap. 1 (Goldman) y cap. 4 (Ternavasio).

### Cite reference (for `card-source` `<cite>`)

```
Halperin Donghi, T., De la revolución de independencia a la confederación rosista, Paidós, 2000 [1972]. Goldman, N. (dir.), Nueva Historia Argentina, t. III, Sudamericana, 1998.
```

### Image

- **File:** `Aduana_de_Buenos_Aires.jpg`
- **Thumb URL:** `https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Aduana_de_Buenos_Aires.jpg/500px-Aduana_de_Buenos_Aires.jpg`
- **Alt text:** `Vista histórica de la Aduana de Buenos Aires, punto de control de los ingresos aduaneros que concentraba ~80% de los recursos fiscales nacionales tras 1810.`
- **License:** CC BY-SA 3.0. Per KNOWLEDGE.md, CC BY-SA is usable in educational/nonprofit contexts with attribution. Attribution included in `<cite>` footer.
- **Attribution note for HTML cite:** Add "Imagen: Aduana de Buenos Aires, Wikimedia Commons (CC BY-SA 3.0)." after the source citation.

### Framing note

SP2-2 already mentions the aduana dispute as one item in a panoramic card covering 1820–1852. S09-1 takes the *economic* and *structural* angle *before* 1820: explaining that the divide was institutional, not merely factional, rooted in how the customs house was organized from day one of the Revolution. This sets up the causal logic for the other S09 cards and for the entire `#periodo-rosas` arc without duplicating SP2-2's narrative.

---

## Card S09-2: El Directorio centralista (1816–1820): el primer ensayo unitario y su derrota

- **Certeza:** `hecho`
- **Year display:** `1816 – 1820`
- **HTML card class:** `card-hecho`
- **Reveal delay:** `80ms`

### Excerpt (for `event-card__excerpt`)

Tras la Declaración de Independencia en Tucumán (9 de julio de 1816), los Directores Supremos —particularmente Juan Martín de Pueyrredón (1816–1819)— gobernaron con una autoridad centralizada que las provincias del interior no habían acordado. Las exigencias de conscripción para las campañas de San Martín, la imposición de contribuciones forzosas y la exclusión de las provincias en las decisiones del Congreso alimentaron un resentimiento creciente. No fue el federalismo ideológico lo que impulsó la resistencia provincial, sino la experiencia concreta de un gobierno distante que extraía recursos sin redistribuirlos. Cuando en 1820 los caudillos López y Ramírez derrotaron al último Director, Rondeau, en Cepeda, no hacían sino cerrar el ciclo que Pueyrredón había abierto: el primer intento centralista probó que la unidad impuesta desde Buenos Aires era insostenible.

### Sources

1. Levene, R., *Historia de la Nación Argentina*, vol. VII: *El gobierno directorial y el congreso de 1816-1820*, Academia Nacional de la Historia, Buenos Aires, 1940.
2. Halperin Donghi, T., *De la revolución de independencia a la confederación rosista*, Paidós, Buenos Aires, 2000 [1ª ed. 1972], cap. III.

### Cite reference (for `card-source` `<cite>`)

```
Levene, R., Historia de la Nación Argentina, vol. VII, ANH, 1940. Halperin Donghi, T., De la revolución de independencia a la confederación rosista, Paidós, 2000 [1972].
```

### Image

- **File:** `Juan_Martín_de_Pueyrredón.jpg`
- **Thumb URL:** `https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Juan_Mart%C3%ADn_de_Pueyrred%C3%B3n.jpg/500px-Juan_Mart%C3%ADn_de_Pueyrred%C3%B3n.jpg`
- **Alt text:** `Retrato de Juan Martín de Pueyrredón, Director Supremo de las Provincias Unidas (1816–1819), arquitecto del gobierno centralista que las provincias del interior terminarían rechazando.`
- **License:** "No restrictions" (public domain portrait).
- **Rationale for choosing Pueyrredón over Rondeau:** `Jose_Rondeau.jpg` on Wikimedia is only 188×200px with no 500px thumbnail available (the API returned the original as the thumb). Per KNOWLEDGE.md, small images should use the direct URL, but at 188px this is too small for card display quality. Pueyrredón is the more historically significant figure of the period (served 1816–1819, the peak Directorio years; Rondeau was only the last director for months in 1820) and his portrait is available at 500px quality.

### Framing note

SP2-1 narrates **what happened** at Cepeda (battle date, actors, Treaty of Pilar, "year of the twenty governors"). S09-2 explains **why** it happened: the three years of Directorio rule 1816–1820 created the specific grievances (conscription, taxes without representation, centralized governance) that made the federal revolt inevitable. The card ends by circling back to Cepeda as the conclusion of that arc, cross-linking narratively to SP2-1 without retelling the event.

---

## Card S09-3: La Constitución de 1826 y el rechazo provincial — ¿por qué dijeron no?

- **Certeza:** `hecho`
- **Year display:** `1826 – 1827`
- **HTML card class:** `card-hecho`
- **Reveal delay:** `160ms`

### Excerpt (for `event-card__excerpt`)

La Constitución centralista de 1826, promovida por Rivadavia, incluía la **Ley de Capitalización**: Buenos Aires dejaría de ser una provincia para convertirse en la capital federal de la nación, con sus territorios y rentas aduaneras traspasadas al Estado nacional. Para las élites porteñas, esto significaba resignar el control de la aduana en beneficio de las demás provincias; para los caudillos del interior, el proyecto seguía concentrando el poder real en la misma ciudad que antes los había ignorado, ahora bajo el rótulo de «nación». El gobernador bonaerense Manuel Dorrego encabezó la oposición: sin ingresos aduaneros propios, la provincia de Buenos Aires —la más rica del país— perdía su base fiscal. Rivadavia renunció el 27 de junio de 1827; su constitución nunca entró en vigencia. El fracaso demostró que ninguna fórmula institucional podía satisfacer a la vez el centralismo unitario y las autonomías provinciales mientras la aduana permaneciera sin repartirse.

### Sources

1. Piccirilli, R., *Rivadavia y su tiempo*, 2 vols., Peuser, Buenos Aires, 1960, vol. II, cap. XII.
2. Ravignani, E., *Asambleas Constituyentes Argentinas*, t. II, Jacobo Peuser, Buenos Aires, 1937.
3. Botana, N., *La tradición republicana: Alberdi, Sarmiento y las ideas políticas de su tiempo*, Sudamericana, Buenos Aires, 1984, Parte I, caps. 1–2.

### Cite reference (for `card-source` `<cite>`)

```
Piccirilli, R., Rivadavia y su tiempo, Peuser, 1960. Ravignani, E., Asambleas Constituyentes Argentinas, t. II, 1937. Botana, N., La tradición republicana, Sudamericana, 1984.
```

### Image

- **File:** `Manuel_Dorrego.jpg`
- **URL:** `https://upload.wikimedia.org/wikipedia/commons/4/48/Manuel_Dorrego.jpg` (direct URL — original is 349×537px, no 500px thumb; use direct URL per KNOWLEDGE.md small-image rule)
- **Alt text:** `Retrato de Manuel Dorrego, gobernador de la provincia de Buenos Aires y principal opositor a la Constitución de 1826 y la Ley de Capitalización impulsadas por Rivadavia.`
- **License:** Public domain (portrait from 19th century).
- **HTML note:** Use direct URL (no `/thumb/` path). In `<img>`, set `loading="lazy"` as normal; card CSS will handle sizing.

### Framing note

SP2-3 says "provinces rejected [the 1826 constitution]" and mentions Rivadavia's resignation as a fact. S09-3 explains the *economic mechanism* of rejection: the capitalización law threatened both Buenos Aires's fiscal independence and the provinces' hope for revenue redistribution. The card also introduces Dorrego by name (he becomes important in S09-4 as the figure whose execution by Lavalle crystallizes the unitario/federal identities). This is causally richer than SP2-3 without contradicting it.

---

## Card S09-4: ¿Cuándo nacieron "unitarios" y "federales" como identidades políticas?

- **Certeza:** `opinion`  ← **no accent** (per KNOWLEDGE.md Certeza Attribute Accent Normalization)
- **Year display:** `ca. 1826 – 1829`
- **HTML card class:** `card-opinion`
- **Reveal delay:** `240ms`

### Core argument (for `card-opinion__quote` context)

Los términos «unitario» y «federal» circulaban en el debate político desde la década de 1810, pero su conversión en **identidades políticas de masa** —con lealtades colectivas, símbolos propios y un antagonismo excluyente— ocurrió en el ciclo 1826–1829. El fracaso de Rivadavia (1827) y el retorno al gobierno provincial abrieron el espacio; el fusilamiento de Manuel Dorrego por orden de Lavalle (13 de diciembre de 1828) lo transformó en una línea de sangre; la primera gobernación de Rosas (1829) institucionalizó la polarización. Antes de ese ciclo, las diferencias eran reales pero las fronteras entre facciones eran más permeables: dirigentes pasaban de un bando a otro, y los rótulos eran descriptores de posición institucional antes que credos identitarios. La historiografía coincide en que la «cristalización» es gradual y disputada, por lo que la fecha exacta es una interpretación, no un hecho puntual.

**Attribution:** Esta interpretación sigue el análisis de Natalio Botana en *La tradición republicana* (1984) y de Noemí Goldman en *Nueva Historia Argentina*, t. III (1998). No se cita una frase directa de Botana porque no se dispone de acceso al texto digitalizado completo para verificar la paginación exacta. Se atribuye la interpretación a los historiadores por nombre, siguiendo el patrón `card-opinion__context` del proyecto. [NO USAR COMO CITA DIRECTA — es paráfrasis historiográfica verificada por autoría pero no por página].

### Sources

1. Botana, N., *La tradición republicana: Alberdi, Sarmiento y las ideas políticas de su tiempo*, Sudamericana, Buenos Aires, 1984.
2. Goldman, N. (dir.), *Nueva Historia Argentina*, t. III: *Revolución, República, Confederación (1806-1852)*, Sudamericana, Buenos Aires, 1998, cap. 5 (Goldman, "El debate sobre el gobierno representativo").

### Cite reference (for `card-source` `<cite>`)

```
Botana, N., La tradición republicana, Sudamericana, 1984. Goldman, N. (dir.), Nueva Historia Argentina, t. III, Sudamericana, 1998.
```

### Opinion card HTML structure

Because no verified direct quote from Botana or Goldman is available for the HTML `<blockquote>`, use the **attributed interpretation pattern** (no synthetic quote):

```html
<blockquote class="card-opinion__quote">
  <p>La división entre «unitarios» y «federales» cristalizó como identidad política de masa en el ciclo 1826–1829: el fracaso de Rivadavia, el fusilamiento de Dorrego por Lavalle (dic. 1828) y la primera gobernación de Rosas fijaron la línea de sangre. Antes de ese ciclo, las fronteras entre facciones eran más permeables.</p>
  <footer class="card-opinion__attribution">
    <strong class="card-opinion__author">Historiografía contemporánea</strong>
    <span class="card-opinion__context">— Interpretación siguiendo a Botana, N., <em>La tradición republicana</em>, Sudamericana, 1984, y Goldman, N. (dir.), <em>Nueva Historia Argentina</em>, t. III, Sudamericana, 1998. La fecha exacta de cristalización es interpretación, no evento puntual.</span>
  </footer>
</blockquote>
```

### Image

- **File:** `Mapa_de_las_Provincias_Unidas_del_Río_de_la_Plata_en_1821.png`
- **Thumb URL:** `https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Mapa_de_las_Provincias_Unidas_del_R%C3%ADo_de_la_Plata_en_1821.png/500px-Mapa_de_las_Provincias_Unidas_del_R%C3%ADo_de_la_Plata_en_1821.png`
- **Alt text:** `Mapa de las Provincias Unidas del Río de la Plata en 1821, mostrando la distribución territorial de las provincias cuyas tensiones darían lugar a los bandos unitario y federal.`
- **License:** CC BY-SA 4.0. Attribution required. Add to `<cite>`: "Mapa: Provincias Unidas del Río de la Plata (1821), Wikimedia Commons (CC BY-SA 4.0)."

### Framing note

No SP2 card covers when or how the identities crystallized — SP2 treats the unitario/federal divide as a given fact of 1820–1852. S09-4 is the only card in the project that addresses the *historiographic question* of the identities' formation. It uses the `card-opinion` format because the exact moment of crystallization is a matter of interpretive consensus among historians, not a datable event. The `ca. 1826–1829` date range is deliberately approximate.

---

## Sub-period container and sub-nav

**Sub-period title:** `Unitarios, Federales y la Era de Rosas (1820–1852)`

**HTML container class:** `<div id="periodo-rosas" class="sub-period reveal reveal-fade">`

**Insertion point:** After `</div><!-- /#rev-1820-1835 -->` (currently line 1438) and BEFORE `<!-- CONECTOR ALBERDI — SP2 → SP3 (Pasaje 2) -->`.

**Sub-nav link:**
```html
<a href="#periodo-rosas" class="sub-nav__link">1820–1852<span class="sub-nav__link-label">Unitarios y Federales</span></a>
```
Insert after existing `#rev-1820-1835` link.

---

## Must-Have Checklist

- [x] Draft file exists at `.gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md`
- [x] 4 card sections (## Card S09-1 through ## Card S09-4)
- [x] Certeza for S09-4 is `opinion` (no accent)
- [x] Each card has ≥2 sources with author, title, publisher/year
- [x] Each card has an image entry: verified Wikimedia URL or explicit fallback decision
- [x] No image duplicates from SP2 cards (no Rivadavia, no Rosas, no Quiroga, no Alberdi)
- [x] S09-2 frames the Directorio context (1816–1820) — NOT a re-narration of Cepeda
- [x] S09-3 explains the economic reason for rejection (capitalización law)
- [x] No synthesized direct quotes without primary source verification (S09-4 uses attributed paraphrase pattern, clearly marked)
