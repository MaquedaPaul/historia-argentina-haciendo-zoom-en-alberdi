# M014/S01 — Investigación y borrador de contenido

**Date:** 2026-03-24
**Slice:** S01 — Investigación y borrador de contenido (risk: high)

---

## Summary

Las tertulias de Mariquita Sánchez de Thompson (1786–1868) tienen tres etapas documentadas: la etapa revolucionaria en Buenos Aires (1810–1820s), la era de Rosas / exilio en Montevideo (1837–1852), y el regreso a Buenos Aires hasta su muerte (1852–1868). Las fuentes son sólidas para las dos primeras etapas y para los asistentes nombrados. El episodio del Himno Nacional es el más famoso y el más disputado: la tradición lo sitúa el 14 de mayo de 1813 en su casa, pero hay al menos tres versiones en conflicto (casa de Mariquita, Salón del Consulado, Plaza de la Victoria el 25 de mayo). Wikipedia ES ya usa "según la tradición". Infobae 2025 dice "uno de los primeros lugares donde se lo ejecutó" — no el único. Esto debe ir como `card-rumor` o con `card-nota-historiografica` explícita.

El contenido existente en `index.html` toca a Mariquita en tres puntos: (1) BIOG-7 menciona el piano de Mariquita y la habitación alquilada a Alberdi (línea 502); (2) BIOG-14 menciona "en el contexto de las tertulias porteñas" (línea 1116); (3) SP2-4 menciona la Generación del 37 en términos generales pero sin profundizar en Mariquita como anfitriona. **No hay ninguna card dedicada a las tertulias como institución.** No hay riesgo de duplicación real — el contenido existente es incidental, no temático.

El plan es 6 cards (no 7): 2 cartas de la etapa revolucionaria (el salón y el Himno), 2 de la era Rosas/exilio en Montevideo, 1 de los asistentes de la Generación del 37, y 1 de legado/cierre. Esto cubre las tres etapas sin redundar con SP2-4 o SP3-3.

## Recommendation

Crear una nueva sub-sección `<div id="rev-tertulias-mariquita">` dentro de `#periodo-revolucion`, entre el sub-período `#rev-1820-1835` (Anarquía) y `#periodo-rosas` (Era de Rosas), ya que las tertulias abarcan ambas eras y son el puente narrativo entre la revolución y la Generación del 37. El sub-nav de `#periodo-revolucion` necesita un link adicional para esta nueva sección. Seguir exactamente el patrón de sub-period existente.

---

## Superposición con contenido existente — Mapeo

| Línea | Contenido existente | Relación con M014 |
|-------|--------------------|--------------------|
| 502 (BIOG-7) | Piano de Mariquita + habitación alquilada a Alberdi | Complementario — no duplicar, referenciar |
| 677 (BIOG-14) | "tertulias porteñas" como contexto del ensayo musical | Mención incidental, no card dedicada |
| 1116 | "tertulias porteñas" genérico | Mención incidental |
| 1414 (SP2-4) | Generación del 37 en general | Temática diferente — M014 focaliza en Mariquita como hub |
| 2163 (SP3-3) | Exilio de la Generación del 37 en Montevideo | Complementario — Mariquita también en Montevideo |

**Conclusión:** Cero duplicación real. Las menciones existentes son incidentales; M014 agrega la historia de las tertulias como institución.

---

## Borrador de 6 Cards — S01-CONTENT-DRAFT

### Card 1: La Casa de la Calle Florida — Origen del Salón (hecho)

- **ID:** TER-1
- **Certeza:** `card-hecho` / `data-certeza="hecho"`
- **Año display:** `1805 – 1820`
- **Título:** El salón de la calle del Empedrado: política y música en una casa patricia
- **Excerpt:**
  Desde 1805, Mariquita Sánchez de Thompson —casada con el capitán Martín Thompson tras ganarle un juicio al virrey Sobremonte para elegir a su propio marido— abrió su casa en la calle del Empedrado (hoy Florida al 200) como espacio de tertulias. En esas reuniones se danzaba, se discutía de política, se tocaba música y se tramaban alianzas. Cuando llegó mayo de 1810, el matrimonio Thompson ya estaba "comprometido con la causa": Martín participó en el Cabildo Abierto del 22 de mayo; Mariquita cedió su casa como sede de las intrigas patriotas. En 1812 encabezó un grupo de damas de la Sociedad Patriótica —vinculadas a Bernardo Monteagudo— para donar joyas y dinero al ejército revolucionario.
- **Fuentes:** Halperin Donghi, *Revolución y guerra* (vía Historia Hoy, oct. 2024); Shumway, J.M., "In the Salons of Mariquita Sánchez", in *The Rio de la Plata from Colony to Nations*, Palgrave Macmillan, 2021; Wikipedia EN "Mariquita Sánchez".
- **Cite HTML:** `Halperin Donghi, T., <em>Revolución y guerra</em>; Shumway, J.M., "In the Salons of Mariquita Sánchez", Palgrave Macmillan, 2021.`
- **Imagen:** `File:Mariquita Sánchez 1845.jpg` — retrato de Rugendas, Montevideo 1845, Museo Histórico Nacional. URL: `https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Mariquita_S%C3%A1nchez_1845.jpg/500px-Mariquita_S%C3%A1nchez_1845.jpg` — es PD (obra pre-1900). **Esta es la imagen de apertura de la sección.**

---

### Card 2: El Himno y el Salón — Tradición vs. Historia (rumor)

- **ID:** TER-2
- **Certeza:** `card-rumor` / `data-certeza="rumor"`
- **Año display:** `14 de mayo de 1813`
- **Título:** ¿La primera vez del Himno?: el episodio más famoso y más disputado
- **Excerpt:**
  La tradición más difundida dice que el 14 de mayo de 1813 se cantó el Himno Nacional por primera vez en el salón de Mariquita Sánchez de Thompson —con Blas Parera al piano, que había ensayado allí porque él no tenía instrumento propio. La imagen fue inmortalizada en 1909 por el óleo de Pedro Subercaseaux, hoy en el Museo Histórico Nacional. Sin embargo, hay al menos tres versiones en conflicto: el historiador Carlos Vega (*El Himno Nacional Argentino*, 1962) sostiene que la primera ejecución fue el 28 de mayo en el Teatro Argentino; Vicente Fidel López (hijo del autor de la letra) ubicó el estreno en el Salón del Consulado (San Martín y Mitre); otras fuentes mencionan el 25 de mayo en la Plaza de la Victoria. Lo que nadie disputa es que Mariquita era habitué de Parera y que su casa fue uno de los primeros escenarios de la nueva canción patria.
- **card-nota-historiografica:** `<p class="card-nota-historiografica"><strong>Nota historiográfica:</strong> Mariquita Sánchez nunca dejó escrito ningún testimonio que mencione este episodio. La tradición se consolidó en el imaginario nacional a partir del cuadro de Subercaseaux (1909), pintado casi cien años después del suceso, encargado para la Exposición del Centenario. El Museo de la Ciudad de Buenos Aires y la Wikipedia en español clasifican el episodio como "según la tradición".</p>`
- **Fuentes:** Wikipedia ES "Himno Nacional Argentino"; Vega, C., *El Himno Nacional Argentino*, 1962 (vía Agencia Córdoba Cultura); Infobae, mayo 2025; sisanjuan.gob.ar (fuente gubernamental provincial).
- **Cite HTML:** `Tradición popular; Vega, C., <em>El Himno Nacional Argentino</em>, 1962; Infobae, mayo 2025. La tradición no está documentada en escritos de Mariquita Sánchez.`
- **Imagen:** `File:Himno Nacional Argentino.jpg` (Subercaseaux, 1909) — URL: `https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Himno_Nacional_Argentino.jpg/500px-Himno_Nacional_Argentino.jpg` — PD (obra publicada antes de 1929 en Chile). Verificado en Wikimedia Commons.

---

### Card 3: Las Tertulias de la Década Rivadaviana (hecho)

- **ID:** TER-3
- **Certeza:** `card-hecho` / `data-certeza="hecho"`
- **Año display:** `1820 – 1835`
- **Título:** El reino de Mariquita: tertulias, Sociedad de Beneficencia y el cónsul francés
- **Excerpt:**
  Viuda de Thompson en 1819, Mariquita se casó con Jean-Baptiste Washington de Mendeville —miembro del consulado francés en Buenos Aires— y continuó presidiendo el espacio social más influyente de la ciudad. Su casa se convirtió en sede simbólica del consulado francés desde 1828. Participó activamente de la Sociedad de Beneficencia —creada por Rivadavia en 1823— y la presidió entre 1830 y 1832. Sus tertulias adquirieron un nuevo estatus durante las reformas rivadavianas: el espacio se asoció con la librería de Marcos Sastre y, más tarde, con el Salón Literario de 1837. Alberdi usó su piano durante sus años en la tienda de Maldes (ca. 1825–1832); Blas Parera era habitué porque ella tomaba clases de piano con él.
- **Notas de no-duplicación:** BIOG-7 ya menciona el piano y la habitación alquilada — esta card abarca el período más amplio y el rol institucional, no repite el detalle de Alberdi.
- **Fuentes:** Historia Hoy, oct. 2024 (Halperin Donghi, *Revolución y guerra*); Shumway 2021; Infobae, feb. 2023; Wikipedia EN.
- **Cite HTML:** `Shumway, J.M., "In the Salons of Mariquita Sánchez", Palgrave Macmillan, 2021; Infobae, 12 feb. 2023; Wikipedia EN "Mariquita Sánchez".`
- **Imagen:** Sin imagen nueva — usar `--reveal-delay` estándar sin card-image (o reutilizar el daguerrotipo Antonio Pozzo 1854 si se verifica en Wikimedia: `File:María Sánchez de Mendeville.jpg` — URL directa sin thumb: `https://upload.wikimedia.org/wikipedia/commons/0/00/Mar%C3%ADa_S%C3%A1nchez_de_Mendeville.jpg`). **VERIFICAR tamaño** antes de usar.

---

### Card 4: El Exilio en Montevideo — Mentora de la Generación del 37 (hecho)

- **ID:** TER-4
- **Certeza:** `card-hecho` / `data-certeza="hecho"`
- **Año display:** `1838 – 1852`
- **Título:** El salón en el exilio: Montevideo como refugio de la inteligencia anti-Rosas
- **Excerpt:**
  Cuando Rosas se consolidó en el poder y clausuró el Salón Literario de Marcos Sastre en 1838, Mariquita Sánchez partió a Montevideo en "autoexilio voluntario". Allí recreó sus tertulias y se convirtió en mentora y punto de encuentro de los jóvenes que formarían el programa post-Rosas: Echeverría, Alberdi, Juan María Gutiérrez, Florencio y Juan Cruz Varela, Félix Frías, Bartolomé Mitre. Rugendas la retrató en Montevideo en 1845 —el retrato más célebre de su vida. Alberdi la llamaría "la madame Sévigné del Río de la Plata". Sus cartas desde el exilio —publicadas póstumamente— son testimonio de primera mano de la vida intelectual anti-Rosas.
- **card-nota-certeza (inline):** `<span class="card-nota-certeza">[Nota: la cita "la madame Sévigné del Río de la Plata" se atribuye a Alberdi en fuentes secundarias (Infobae, feb. 2023); no se verificó paginación en edición primaria.]</span>`
- **Fuentes:** Shumway 2021 (Springer/Palgrave); Infobae, feb. 2023; Wikipedia EN; buenosaires.gob.ar (Museo Saavedra).
- **Cite HTML:** `Shumway, J.M., "In the Salons of Mariquita Sánchez", Palgrave Macmillan, 2021; Alberdi atrib. vía Infobae, 12 feb. 2023; Batticuore, G., sesiones del Museo Saavedra, ago. 2024.`
- **Imagen:** Retrato de Rugendas 1845 — ya usado en Card 1. Esta card puede ir sin imagen o con la misma. Preferir sin imagen nueva aquí para no repetir.

---

### Card 5: Los Asistentes — Quiénes Pasaron por sus Salones (opinión/interpretación)

- **ID:** TER-5
- **Certeza:** `card-opinion` / `data-certeza="opinión"`
- **Año display:** `1810 – 1868`
- **Título:** «Fue la personalidad más importante que he conocido»: el elenco de las tertulias
- **Excerpt / blockquote:**
  Tres generaciones de figuras del siglo XIX rioplatense pasaron por las tertulias de Mariquita: en la época revolucionaria, Belgrano, San Martín, Pueyrredón; en la época rivadaviana, el cónsul Mendeville y la elite porteña; en los 1830s, la Generación del 37 en plena formación. Echeverría, Alberdi, Gutiérrez, los Varela, Frías, Mitre frecuentaron su casa en Buenos Aires y luego en Montevideo. Fue el único espacio de Buenos Aires donde una mujer actuaba como directora intelectual —no como ornamento— de los debates que darían forma a la Argentina post-Rosas.
- **Blockquote (interpretación historiográfica):**
  ```
  «El salón de Mariquita creó un espacio donde locales y extranjeros podían reunirse,
  bailar y conversar sobre las últimas tendencias en literatura, música, arte y política
  en la nación en formación.»
  ```
  Atribución: Shumway, J.M., "In the Salons of Mariquita Sánchez", *The Rio de la Plata from Colony to Nations*, Palgrave Macmillan, 2021.
- **Fuentes:** Shumway 2021; Infobae feb. 2023 (lista de asistentes: Echeverría, Gutiérrez, Alberdi, los Varela, Frías, Mitre); perfil.com; buenosaires.gob.ar.
- **Cite HTML:** `Shumway, J.M., "In the Salons of Mariquita Sánchez", Palgrave Macmillan, 2021; Infobae, 12 feb. 2023.`
- **Imagen:** Sin imagen nueva.

---

### Card 6: El Legado — La Madame Sévigné del Río de la Plata (opinión)

- **ID:** TER-6
- **Certeza:** `card-opinion` / `data-certeza="opinión"`
- **Año display:** `23 de octubre de 1868`
- **Título:** El fin de una época: la muerte de Mariquita y el cierre del largo siglo XIX
- **Excerpt / blockquote:**
  Mariquita Sánchez murió el 23 de octubre de 1868, a los 81 años, a pocos días de su cumpleaños. El cortejo fúnebre fue uno de los más concurridos de su tiempo. Sobrevivió a la Revolución de Mayo, a Rosas, a Urquiza, a Caseros, a la Constitución de 1853, y vio nacer la Argentina unificada. Mónica Szurmuk la definió como "la figura femenina más importante de la vida republicana temprana de la Argentina". Su vasto archivo personal —cartas, memorias, diarios, todos publicados póstumamente— es la crónica social y política más lúcida del período 1810–1868 escrita por una mujer argentina.
- **Blockquote:**
  ```
  «La figura femenina más importante de la vida republicana temprana de la Argentina.»
  ```
  Atribución: Szurmuk, M., *Women in Argentina: Early Travel Narratives*, University Press of Florida, 2000, vía Shumway 2021.
- **Fuentes:** Wikipedia EN "Mariquita Sánchez"; Infobae 23 oct. 2025; Shumway 2021.
- **Cite HTML:** `Szurmuk, M., <em>Women in Argentina</em>, University Press of Florida, 2000 (vía Shumway 2021); Wikipedia EN "Mariquita Sánchez".`
- **Imagen:** Sin imagen nueva.

---

## Implementation Landscape

### Key Files

- `C:/Users/gabri/Desktop/historia/index.html` — archivo principal. Nueva sub-sección va después del comentario de cierre de `#rev-1820-1835` (línea ~1443) y antes de `<!-- ══ ... periodo-rosas -->` (línea ~1443). Inserción precisa: después de `</div><!-- /.events-grid SP2 -->` y `</div><!-- /#rev-1820-1835 -->`.
- `styles.css` — **no requiere cambios**. Todos los patrones (card-hecho, card-opinion, card-rumor, card-nota-historiografica, card-nota-certeza, events-grid--certeza) ya existen.
- `app.js` — **no requiere cambios**. El reveal observer y el lightbox funcionan por clase, sin configuración por card.

### Placement Decision

La nueva sub-sección `<div id="rev-tertulias-mariquita" class="sub-period reveal reveal-fade">` va entre `#rev-1820-1835` y `#periodo-rosas`. Cronológicamente correcto: las tertulias de Mariquita son el puente entre la era rivadaviana (1820–1835) y el rosismo (1835–1852), con Generación del 37 como link. Las tertulias en Montevideo (1838–1852) solapan con `#periodo-rosas`, pero la sección habla de la institución completa, no solo ese período.

### Sub-nav

Agregar un link nuevo en el `<nav class="sub-nav">` (línea ~327):
```html
<a href="#rev-tertulias-mariquita" class="sub-nav__link">1810–1868<span class="sub-nav__link-label">Tertulias de Mariquita</span></a>
```

### Stagger delays para las 6 cards

| Card | Delay |
|------|-------|
| TER-1 | 0ms |
| TER-2 | 80ms |
| TER-3 | 160ms |
| TER-4 | 240ms |
| TER-5 | 320ms |
| TER-6 | 400ms |

### Reveal count impact

El sitio tiene actualmente 131 elementos con clase `reveal` (grep count). La nueva sub-sección agrega: 1 sub-period div + 6 cards = **7 nuevos elementos reveal**. Total proyectado: 138. El comentario en KNOWLEDGE.md dice "actualmente 52 elementos" — ese dato está desactualizado; el grep real arroja 131. No hay límite hard en el sistema.

### Build Order

1. **Escribir el content draft completo en S01-CONTENT-DRAFT.md** (este archivo sirve como insumo para S02)
2. **S02 integra** las 6 cards en index.html siguiendo el draft, agrega el sub-nav link, y verifica estructura

### Verification Approach (para S02)

```bash
# Contar nuevas cards
grep -c "TER-[1-6]" index.html  # → 6

# Verificar data-certeza en todas
grep -A2 "TER-[1-6]" index.html | grep "data-certeza"

# Verificar card-nota-historiografica en TER-2
grep -c "card-nota-historiografica" index.html  # debe sumar 1 más que antes

# Verificar sub-nav link nuevo
grep "rev-tertulias-mariquita" index.html

# No errores JS
# Abrir en browser, confirmar reveal y lightbox (TER-1 tiene imagen)
```

---

## Imágenes verificadas en Wikimedia Commons

| Card | Archivo | URL 500px | Licencia |
|------|---------|-----------|---------|
| TER-1 | `File:Mariquita Sánchez 1845.jpg` | `https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Mariquita_S%C3%A1nchez_1845.jpg/500px-Mariquita_S%C3%A1nchez_1845.jpg` | PD (Rugendas, 1845, pre-1900) |
| TER-2 | `File:Himno Nacional Argentino.jpg` | `https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Himno_Nacional_Argentino.jpg/500px-Himno_Nacional_Argentino.jpg` | PD (Subercaseaux, 1909, pre-1929) |
| TER-3 | `File:María Sánchez de Mendeville.jpg` | `https://upload.wikimedia.org/wikipedia/commons/0/00/Mar%C3%ADa_S%C3%A1nchez_de_Mendeville.jpg` | **URL directa (imagen pequeña, sin thumb)** — verificar tamaño antes de usar |

Cards TER-4, TER-5, TER-6: sin imagen nueva (evitar repetición del retrato de Rugendas).

---

## Certeza Classification Summary

| Card | Certeza | Justificación |
|------|---------|---------------|
| TER-1 | hecho | Fuentes múltiples sólidas (Halperin Donghi, Shumway); participación en Cabildo Abierto documentada |
| TER-2 | **rumor** | Tradición popular sin documento primario de Mariquita; historiadores en desacuerdo sobre lugar y fecha; cuadro de Subercaseaux (1909) como única "evidencia" visual |
| TER-3 | hecho | Sociedad de Beneficencia 1823–1832 documentada; consulado francés 1828 documentado |
| TER-4 | hecho | Exilio en Montevideo documentado; lista de asistentes documentada; retrato de Rugendas 1845 prueba presencia |
| TER-5 | opinión | Interpretación historiográfica de Shumway 2021 sobre rol de Mariquita como directora intelectual |
| TER-6 | opinión | Evaluación de Szurmuk sobre legado; no es afirmación factual verificable |

---

## Open Risks para S02

- **TER-2 requiere `card-nota-historiografica` visible** — no ocultar detrás de expand/collapse. Patrón: nota inline en card body según KNOWLEDGE.md "Nota Historiográfica Pattern".
- **`File:María Sánchez de Mendeville.jpg`** (daguerrotipo Pozzo 1854) puede ser imagen pequeña (sin thumb 500px en API). Si es el caso, usar `width="100%"` directamente como en KNOWLEDGE.md "Small Wikimedia images". Verificar antes de incluir en TER-3.
- **Sub-nav link debe agregarse también** en el `<nav class="sub-nav">` existente — recordar actualizar ese bloque además del nuevo `<div>`.
- **La cita de Alberdi "la madame Sévigné..."** llega vía Infobae (fuente secundaria), no verificada en primaria. Incluida con `card-nota-certeza` inline en TER-4.

---

## Sources

- Shumway, J.M., "In the Salons of Mariquita Sánchez: Tertulias, Culture, and Politics in Nineteenth-Century Buenos Aires and Montevideo", in *The Rio de la Plata from Colony to Nations*, Palgrave Macmillan, 2021. doi:10.1007/978-3-030-60323-6_12
- Wikipedia EN "Mariquita Sánchez" (acceso feb/mar 2026)
- Wikipedia ES "Himno Nacional Argentino" (acceso mar 2026)
- Infobae, "Mariquita Sanchez, 'patrona' del feminismo argentino", 12 feb. 2023
- Infobae, "Mariquita Sánchez de Thompson: vida de una vanguardista", 23 oct. 2025
- Historia Hoy, "Mariquita Sánchez de Thompson, la patriota de la primera hora", oct. 2024
- Buenos Aires Ciudad / Museo Saavedra, "Mariquita Sanchez de Thompson en primera persona", jul. 2024
- Vega, C., *El Himno Nacional Argentino*, 1962 (vía Agencia Córdoba Cultura)
- Szurmuk, M., *Women in Argentina: Early Travel Narratives*, University Press of Florida, 2000 (vía Shumway 2021)
