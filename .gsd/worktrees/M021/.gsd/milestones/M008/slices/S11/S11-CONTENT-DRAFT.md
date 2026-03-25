# S11-CONTENT-DRAFT: Referentes de cada bando

**Slice:** S11 — Referentes de cada bando
**Milestone:** M008
**Author:** T01 executor, 2026-03-22
**Purpose:** Recipe for T02 HTML integration — all facts, certeza, images, and sources verified here before HTML is touched.

---

## Image Verification Log

All images verified via Wikimedia API (`/w/api.php?action=query&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=500`).

| Card | File | Thumb URL | License | API status | Decision |
|------|------|-----------|---------|------------|----------|
| S11-1 | `Jose_maria_paz_retrato_homenaje.jpg` | `https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Jose_maria_paz_retrato_homenaje.jpg/500px-Jose_maria_paz_retrato_homenaje.jpg` | Public domain | thumburl confirmed, 500×625px, pageid 158578426, dated 1887-12 | ✅ Accepted |
| S11-2 | `Justo_José_de_Urquiza.jpg` | `https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Justo_Jos%C3%A9_de_Urquiza.jpg/500px-Justo_Jos%C3%A9_de_Urquiza.jpg` | Public domain | thumburl confirmed, 500×609px, pageid 182590987, 1880 oil by Josefa Díaz y Clucellas | ✅ Accepted |

**Candidates confirmed NOT reused (already in use elsewhere in index.html):**
- `Bernardino_Rivadavia.jpg` — already used. ❌ Reuse conflict.
- `General_Don_Juan_LaValle.jpg` — used in S10-3. ❌ Reuse conflict.
- `Retrato_de_Juan_Manuel_de_Rosas.jpg` — already used. ❌ Reuse conflict.
- `Raymond_Monvoisin_-_Retrato_de_Juan_Manuel_de_Rosas,_1842.jpg` — already used. ❌ Reuse conflict.
- `Facundo_Quiroga_por_García_del_Molino.jpg` — already used. ❌ Reuse conflict.
- `Juan_Bautista_Bustos.jpg` — used in S10-2. ❌ Reuse conflict.
- `Justo_José_de_Urquiza_(retrato).jpg` — already used. ❌ Reuse conflict.
- `Justo-jose-de-urquiza-983506.jpg` — already used. ❌ Reuse conflict.
- `Estanislao_López.jpg` — missing on Wikimedia Commons (confirmed in S10 research). ❌ Not found.
- `Francisco_Ramírez.jpg` — missing on Wikimedia Commons. ❌ Not found.
- `General_José_M_Paz.jpg` — only 389px, no 500px thumb (KNOWLEDGE.md small-image rule). ❌ Too small.
- `Florencio_Varela.jpg` — only 344px, no 500px thumb. ❌ Too small.

**S11-2 image rationale:** `Justo_José_de_Urquiza.jpg` (pageid 182590987) is the third distinct Urquiza portrait — the 1880 oil painting by Josefa Díaz y Clucellas, held at the Museo Histórico Provincial Brigadier General Estanislao López in Santa Fe. The two prior Urquiza variants are already used. This variant is not in the used-image list, is public domain, and provides a 500px thumb. Urquiza serves as the visual representative for the federal card because he was a federal caudillo for the full 1820–1851 arc (as governor of Entre Ríos under the federal banner) and is the only major federal figure with an unused 500px portrait available on Commons. ✅

---

## Card S11-1: Los líderes unitarios

- **Certeza:** `hecho`
- **Year display:** `1820 – 1852`
- **HTML card class:** `card-hecho`
- **Reveal delay:** `0ms`

### Excerpt (for `event-card__excerpt`)

El bando unitario reunió figuras cuyas trayectorias encarnaron los programas de centralismo, libre comercio y modernización institucional descritos en las tarjetas anteriores. Bernardino Rivadavia (1780–1845) fue el primer ejecutor político de ese programa: primer presidente de las Provincias Unidas (1826–1827), impulsó reformas administrativas, bancarias y eclesiásticas que chocaron con las provincias y lo obligaron a renunciar. El general José María Paz (1791–1854) fue el brazo militar unitario más eficaz del interior: venció a Facundo Quiroga en La Tablada (1829) y en Oncativo (1830), llegando a controlar nueve provincias antes de ser capturado en 1831 y preso durante once años. Juan Lavalle (1797–1841), quien ordenó el fusilamiento del gobernador federal Manuel Dorrego en diciembre de 1828, simbolizó la radicalidad militarista del bando y murió en el exilio en Jujuy. Los publicistas del exilio completaron el cuadro: Florencio Varela (1807–1848) editó desde Montevideo *El Comercio del Plata* como tribuna unitaria y fue asesinado por agentes rosistas; Juan Cruz Varela (1794–1839), poeta y político, fue una de las voces intelectuales tempranas del liberalismo rioplatense.

### Sources

1. Halperin Donghi, T., *De la revolución de independencia a la confederación rosista*, Paidós, Buenos Aires, 1972 (2ª ed. revisada, 2000), caps. II–IV. (Rivadavia, Lavalle, Paz)
2. Goldman, N. (dir.), *Nueva Historia Argentina*, t. III: *Revolución, República, Confederación (1806–1852)*, Sudamericana, Buenos Aires, 1998, cap. 5. (contexto general del período)
3. Zinny, A., *Historia de los gobernadores de las provincias argentinas*, Imprenta y Librería de Mayo, Buenos Aires, 1882, t. I. (Paz en el interior, provincias unitarias 1829–1831)

### Cite reference (for `card-source` `<cite>`)

```
Halperin Donghi, T., De la revolución de independencia a la confederación rosista, Paidós, 1972 (2000). Goldman, N. (dir.), Nueva Historia Argentina, t. III, Sudamericana, 1998. Zinny, A., Historia de los gobernadores de las provincias argentinas, 1882.
```

### Image

- **File:** `Jose_maria_paz_retrato_homenaje.jpg`
- **Thumb URL:** `https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Jose_maria_paz_retrato_homenaje.jpg/500px-Jose_maria_paz_retrato_homenaje.jpg`
- **Alt text:** `Retrato de homenaje del general José María Paz, publicado en Córdoba en diciembre de 1887. Paz fue el principal estratega militar unitario del interior: venció a Quiroga en La Tablada (1829) y Oncativo (1830) antes de ser capturado en 1831.`
- **License:** Public domain (Argentina, 1887; PD-AR-Photo, PD US expired, categories confirmed via Wikimedia API).
- **Attribution note:** None required (public domain).

### Framing note

S10-1 y S10-2 explican los programas unitario y federal en abstracto. S11-1 nombra a los individuos que los pusieron en práctica y lleva su historia personal: Rivadavia fracasó políticamente al intentar imponer el centralismo contra las provincias; Paz logró imponerse militarmente pero no políticamente; Lavalle pagó con exilio el militarismo extremo; los Varela y Florencio extendieron la batalla al periodismo y la cultura. La certeza `hecho` es correcta: todas las fechas, roles y eventos son documentados en fuentes primarias y en la historiografía estándar.

---

## Card S11-2: Los líderes federales

- **Certeza:** `hecho`
- **Year display:** `1820 – 1852`
- **HTML card class:** `card-hecho`
- **Reveal delay:** `80ms`

### Excerpt (for `event-card__excerpt`)

El bando federal produjo una constelación de caudillos provinciales que, con distintas trayectorias, sostuvieron la causa de la autonomía y el proteccionismo frente a Buenos Aires. Juan Manuel de Rosas (1793–1877), gobernador de Buenos Aires en dos períodos (1829–1832 y 1835–1852) y titular de las Relaciones Exteriores de la Confederación, fue la figura hegemónica: centralizó de facto el poder federal mientras proclamaba la autonomía provincial. Facundo Quiroga (ca. 1788–1835), «El Tigre de los Llanos» y caudillo riojano, fue el brazo armado del federalismo interior hasta su asesinato en Barranco Yaco en febrero de 1835 — crimen que Rosas aprovechó para consolidar su poder. Estanislao López (1786–1838), gobernador de Santa Fe y firmante del Pacto Federal de 1831, fue el aliado litoral más constante de Rosas; Francisco Ramírez (1786–1821), caudillo entrerriano, triunfó en Cepeda (1820) y construyó la República de Entre Ríos antes de morir en combate en 1821. Justo José de Urquiza (1801–1870), gobernador de Entre Ríos desde 1841, completó el período como fiel federal hasta 1851, cuando cruzó al bando contrario y derrotó a Rosas en Caseros — pero esa historia pertenece a la etapa siguiente.

### Sources

1. Lynch, J., *Argentine Dictator: Juan Manuel de Rosas 1829–1852*, Clarendon Press, Oxford, 1981, cap. 1–2. (Rosas, estructura del poder federal)
2. Sarmiento, D.F., *Facundo: Civilización y Barbarie*, Santiago de Chile, 1845 (ed. Losada, Buenos Aires, 1999), caps. IV–VII. (Quiroga: trayectoria, asesinato)
3. Zinny, A., *Historia de los gobernadores de las provincias argentinas*, Imprenta y Librería de Mayo, Buenos Aires, 1882, t. II–III. (López, Ramírez, Urquiza: fechas y mandatos)

### Cite reference (for `card-source` `<cite>`)

```
Lynch, J., Argentine Dictator: Juan Manuel de Rosas 1829–1852, Oxford, 1981. Sarmiento, D.F., Facundo: Civilización y Barbarie, 1845 (Losada, 1999). Zinny, A., Historia de los gobernadores de las provincias argentinas, 1882.
```

### Image

- **File:** `Justo_José_de_Urquiza.jpg`
- **Thumb URL:** `https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Justo_Jos%C3%A9_de_Urquiza.jpg/500px-Justo_Jos%C3%A9_de_Urquiza.jpg`
- **Alt text:** `Retrato al óleo de Justo José de Urquiza (1880), obra de Josefa Díaz y Clucellas. Gobernador de Entre Ríos desde 1841 y caudillo federal durante la era de Rosas, Urquiza representó el federalismo del litoral a lo largo de tres décadas.`
- **License:** Public domain (PD-Art PD-old-100, author died 1917; categories PD-AR-Photo, CC-PD-Mark, confirmed via Wikimedia API, pageid 182590987).
- **Attribution note:** Artist: Josefa Díaz y Clucellas (1852–1917). No copyright restrictions.
- **NOT the `(retrato)` or `983506` variants** — this is the distinct 1880 oil painting (pageid 182590987), confirmed as third unused Urquiza variant.

### Framing note

S10-2 presenta el programa federal y nombra a Rosas, Quiroga, López y Bustos como exponentes. S11-2 va un nivel más profundo: traza las trayectorias personales de los cinco federales más importantes del período, incluyendo las muertes de Quiroga y Ramírez (que no aparecen en S10) y la relación de subordinación entre los caudillos provinciales y Rosas. Urquiza cierra el arco cronológico del federalismo: activo federal en todo el período, gobernador de Entre Ríos desde 1841, pero sin desarrollar la narrativa de Caseros — que pertenece a S13/S14. La certeza `hecho` es correcta: todos los datos (fechas, mandatos, batallas) están documentados en fuentes primarias y en la historiografía estándar.

---

## Must-Have Checklist

- [x] Draft file exists at `.gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md`
- [x] 2 card sections (## Card S11-1, ## Card S11-2)
- [x] S11-1 certeza: `hecho`; S11-2 certeza: `hecho`
- [x] Each card has ≥2 cited sources (S11-1: 3 sources; S11-2: 3 sources)
- [x] S11-1 image (`Jose_maria_paz_retrato_homenaje.jpg`) confirmed via Wikimedia API: 500px thumb present, public domain ✅
- [x] S11-2 image (`Justo_José_de_Urquiza.jpg`, pageid 182590987, 1880 oil painting) confirmed via Wikimedia API: 500px thumb present, public domain ✅; NOT the `(retrato)` or `983506` variants
- [x] Image Verification Log records both API verification attempts with thumburl and license result
- [x] T02 Recipe section present with copy-paste-ready HTML attributes
- [x] No synthesized direct quotes — both cards use narrative biographical prose only
- [x] S11-2 does not develop the Caseros narrative — single sentence notes Urquiza «cruzó al bando contrario» and defers to S13/S14
- [x] S11-1 cross-references S10 programs by naming which leaders embodied them, without restating S10's content

---

## T02 Recipe: HTML Attributes for Card Integration

_Copy-paste reference for T02 mechanical integration._

### Insertion point

Use `grep -n 'cards will be appended here by subsequent slices' index.html` to find the marker line. Insert both S11 cards **immediately before** that line. The marker must remain in place after insertion.

### Card S11-1

```
<!-- S11-1: Los líderes unitarios -->
HTML class:        event-card card-hecho reveal reveal-slide
data-year:         "1820 – 1852"
data-certeza:      "hecho"
style:             --reveal-delay:0ms
Title (h3):        Los líderes unitarios
Image src:         https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Jose_maria_paz_retrato_homenaje.jpg/500px-Jose_maria_paz_retrato_homenaje.jpg
Image alt:         Retrato de homenaje del general José María Paz, publicado en Córdoba en diciembre de 1887. Paz fue el principal estratega militar unitario del interior: venció a Quiroga en La Tablada (1829) y Oncativo (1830) antes de ser capturado en 1831.
Excerpt:           El bando unitario reunió figuras cuyas trayectorias encarnaron los programas de centralismo, libre comercio y modernización institucional descritos en las tarjetas anteriores. Bernardino Rivadavia (1780–1845) fue el primer ejecutor político de ese programa: primer presidente de las Provincias Unidas (1826–1827), impulsó reformas administrativas, bancarias y eclesiásticas que chocaron con las provincias y lo obligaron a renunciar. El general José María Paz (1791–1854) fue el brazo militar unitario más eficaz del interior: venció a Facundo Quiroga en La Tablada (1829) y en Oncativo (1830), llegando a controlar nueve provincias antes de ser capturado en 1831 y preso durante once años. Juan Lavalle (1797–1841), quien ordenó el fusilamiento del gobernador federal Manuel Dorrego en diciembre de 1828, simbolizó la radicalidad militarista del bando y murió en el exilio en Jujuy. Los publicistas del exilio completaron el cuadro: Florencio Varela (1807–1848) editó desde Montevideo El Comercio del Plata como tribuna unitaria y fue asesinado por agentes rosistas; Juan Cruz Varela (1794–1839), poeta y político, fue una de las voces intelectuales tempranas del liberalismo rioplatense.
Cite:              Halperin Donghi, T., De la revolución de independencia a la confederación rosista, Paidós, 1972 (2000). Goldman, N. (dir.), Nueva Historia Argentina, t. III, Sudamericana, 1998. Zinny, A., Historia de los gobernadores de las provincias argentinas, 1882.
```

### Card S11-2

```
<!-- S11-2: Los líderes federales -->
HTML class:        event-card card-hecho reveal reveal-slide
data-year:         "1820 – 1852"
data-certeza:      "hecho"
style:             --reveal-delay:80ms
Title (h3):        Los líderes federales
Image src:         https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Justo_Jos%C3%A9_de_Urquiza.jpg/500px-Justo_Jos%C3%A9_de_Urquiza.jpg
Image alt:         Retrato al óleo de Justo José de Urquiza (1880), obra de Josefa Díaz y Clucellas. Gobernador de Entre Ríos desde 1841 y caudillo federal durante la era de Rosas, Urquiza representó el federalismo del litoral a lo largo de tres décadas.
Excerpt:           El bando federal produjo una constelación de caudillos provinciales que, con distintas trayectorias, sostuvieron la causa de la autonomía y el proteccionismo frente a Buenos Aires. Juan Manuel de Rosas (1793–1877), gobernador de Buenos Aires en dos períodos (1829–1832 y 1835–1852) y titular de las Relaciones Exteriores de la Confederación, fue la figura hegemónica: centralizó de facto el poder federal mientras proclamaba la autonomía provincial. Facundo Quiroga (ca. 1788–1835), «El Tigre de los Llanos» y caudillo riojano, fue el brazo armado del federalismo interior hasta su asesinato en Barranco Yaco en febrero de 1835 — crimen que Rosas aprovechó para consolidar su poder. Estanislao López (1786–1838), gobernador de Santa Fe y firmante del Pacto Federal de 1831, fue el aliado litoral más constante de Rosas; Francisco Ramírez (1786–1821), caudillo entrerriano, triunfó en Cepeda (1820) y construyó la República de Entre Ríos antes de morir en combate en 1821. Justo José de Urquiza (1801–1870), gobernador de Entre Ríos desde 1841, completó el período como fiel federal hasta 1851, cuando cruzó al bando contrario y derrotó a Rosas en Caseros — pero esa historia pertenece a la etapa siguiente.
Cite:              Lynch, J., Argentine Dictator: Juan Manuel de Rosas 1829–1852, Oxford, 1981. Sarmiento, D.F., Facundo: Civilización y Barbarie, 1845 (Losada, 1999). Zinny, A., Historia de los gobernadores de las provincias argentinas, 1882.
```
