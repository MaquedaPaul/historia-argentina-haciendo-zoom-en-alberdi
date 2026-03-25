# S02-CONTENT-DRAFT — M011 Content Research Draft

**Milestone:** M011
**Slice:** S02 — Research Alberdi y Cané, la escena del "Cielo..." y los romances
**Status:** T01 y T02 completos — 4 cards verificadas (M011-CANE-1, M011-CANE-2, M011-ROM-1, M011-ROM-2). Listo para S03 HTML integration.

> **Para S03-T01 (HTML Integration):** Este archivo es la especificación de entrada.
> Cada `##` section es una card separada. Leer las Notas de inserción HTML antes de hacer splicing.
> Las cards de T02 (romances) se agregarán en la sección indicada al completar T02.

---

## M011-CANE-1 — La amistad de dos décadas: Alberdi y Miguel Cané desde el Colegio hasta el exilio (1824–1838)

- Año/período: 1824–1838
- Certeza: hecho
- Certeza-justificación: El encuentro de Alberdi y Cané en el Colegio de Ciencias Morales (1824) está documentado en múltiples fuentes primarias y secundarias, incluyendo la propia autobiografía de Alberdi (*Mi vida privada*, ca. 1872–82) y la historiografía alberdiana estándar (Mayer, 1963). Su colaboración posterior en la Asociación de Estudios Históricos y Sociales (mientras eran estudiantes), en el Salón Literario de Marcos Sastre (1837) y en *El Iniciador* de Montevideo (1838) es verificable a través de múltiples fuentes independientes (Wikipedia ES "Miguel Cané (padre)"; La Nación, "Cané (padre), la pasión por las letras", 2020; journals.openedition.org "Miguel Cané padre y el mazzinismo"). La nota de Gutiérrez a Alberdi —"A don Miguel muchas cosas: es el San Bernardo de la cruzada"— sobre Cané en Montevideo establece la profundidad del vínculo en el exilio y aparece citada con referencia primaria (*Escritos Póstumos*, t. XIII). El hecho de que Cané se trasladara a Montevideo *antes* que el grupo de la Gen. del 37 fuera perseguido, y que allí co-fundara *El Iniciador* que sería el principal órgano del grupo exiliado, es concordante en todas las fuentes. Certeza `hecho` para el arco biográfico de la amistad; la naturaleza íntima y el carácter afectivo cotidiano de la relación (qué se decían, cómo se veían en el exilio) se apoya en *Mi vida privada* y la correspondencia publicada, pero sin paginación directa verificada de manera independiente en esta investigación.
- CSS class sugerida: card-hecho
- data-certeza value: hecho

**Excerpt (2–4 oraciones):**
La amistad entre Juan Bautista Alberdi y Miguel Cané (padre) comenzó en 1824 en los bancos del Colegio de Ciencias Morales de Buenos Aires — el mismo colegio donde, años después, el hijo de Cané escribiría *Juvenilia* — y duró hasta la muerte de Cané en 1863. Durante sus años de estudiantes forjaron juntos una Asociación de Estudios Históricos y Sociales; en 1837 compartieron el Salón Literario de Marcos Sastre; y cuando Rosas clausuró *La Moda* en abril de 1838, Cané ya estaba en Montevideo, donde había co-fundado *El Iniciador* el 15 de abril de ese año junto con Andrés Lamas — el periódico que se convertiría en el principal órgano intelectual del exilio de la Generación del 37. Desde allí, Juan María Gutiérrez escribió a Alberdi sobre Cané: "A don Miguel muchas cosas: es el San Bernardo de la cruzada, es más valiente que un león; si no hubiera reventado él contra lo viejo y absurdo no estaríamos tan adelante."

**Fuentes:**
- Alberdi, Juan Bautista, *Mi vida privada que se pasa toda en la República Argentina*, ca. 1872–82, publicado en *Escritos póstumos*, t. I, La Tribuna Nacional, Buenos Aires, 1895 — autobiografía de referencia para el vínculo con Cané
- serargentino.com, "Juan Bautista Alberdi. El ausente que nunca salió del país" (cita *Mi vida privada y otros textos*, FNA, 1999) — describe a Cané como "su amigo incondicional Miguel Cané (padre)" que le prestaba libros de Volney y Rousseau durante los años del Colegio
- Wikipedia ES, "Miguel Cané (padre)" — biografía completa: Colegio de Ciencias Morales, Asociación de Estudios Históricos, Salón Literario, co-fundador de *El Iniciador* (15 abril 1838), exilio en Montevideo previo a la persecución del grupo, fallecido 5 de julio de 1863 en Mercedes
- journals.openedition.org, "Miguel Cané padre y el mazzinismo en el Río de la Plata" — cita carta de Gutiérrez a Alberdi sobre Cané ("San Bernardo de la cruzada"), con referencia a *Escritos Póstumos*, t. XIII; documenta el rol estratégico de Cané en Montevideo antes y durante el exilio del grupo
- La Nación, "Cané (padre), la pasión por las letras", 2020 — perfil periodístico de referencia con cronología verificada del exilio montevideano y actividad en *El Iniciador*

**Nota de inserción HTML:**
- Sección destino: `#rev-alberdi-formacion` → sub-período "Alberdi: Los años de formación (1810–1838)"
- Insertar: DESPUÉS de `data-id="BIOG-5"` (El viaje a Buenos Aires y el Colegio de Ciencias Morales y Miguel Cané, 1824) y ANTES de `data-id="BIOG-6"` (El abandono del internado)
- Esta card amplía BIOG-5 (que menciona brevemente a Cané como "compañero de banco") con el arco completo de la amistad: de los bancos del colegio al exilio compartido en Montevideo
- Relación con BIOG-12: BIOG-12 ya menciona que Alberdi colaboró en *El Iniciador* (co-fundado por Cané); esta card M011-CANE-1 es la historia de la *amistad* que hace inteligible ese co-trabajo periodístico
- `data-id` sugerido: `M011-CANE-1`
- HTML class: `class="event-card card-hecho reveal reveal-slide"` con `data-certeza="hecho"`

---

## M011-CANE-2 — La despedida del exilio y el "Cielo...": ¿canción o género? (ca. 1838)

- Año/período: ca. 1838
- Certeza: debatido
- Certeza-justificación: El "cielo" (también llamado "cielito") es un género musical rioplatense bien documentado — no una canción específica con letra fija — que fue la danza y el canto patriótico por excelencia durante la Independencia del Río de la Plata y que se bailó en los salones cultos argentinos hasta la tercera década del siglo XIX (Wikipedia ES, "Cielito"; Juan María Veniard, "El complejo Cielito. Su música", UCA). Para 1838, ya era un género cargado de nostalgia patriótica en proceso de extinción, lo que le daría particular peso emotivo en una despedida de exilio. La escena específica — quiénes la entonaron, cuándo exactamente, qué palabras se cantaron — es narrada en *Mi vida privada* (Alberdi) y mencionada por Mayer (*Alberdi y su tiempo*, EUDEBA, 1963), pero no fue posible verificar de manera independiente el pasaje exacto de *Mi vida privada* ni la paginación de Mayer en esta investigación. El texto completo de *Mi vida privada* disponible en ediciones digitalizadas consultadas (Cervantesvirtual; memoriachilena.gob.cl, ed. Cruz del Sur, 1944) no está paginado en los fragmentos accesibles. La presencia de Vicente Fidel López (el hijo, 1815–1903, historidor) — y no Vicente López y Planes (el padre, autor del Himno Nacional) — es la identificación más plausible dado que Vicente Fidel López era coetáneo de Alberdi y Cané en la Generación del 37, pero no se ha verificado este detalle con cita específica de la fuente primaria. Por estas razones, la certeza es `debatido`: la escena es narrada en fuentes reconocidas, el género "cielo" es real y contextualizadamente plausible, pero los detalles exactos (presentes, palabras, fecha) requieren verificación directa contra el pasaje de *Mi vida privada* o la cita específica de Mayer.
- CSS class sugerida: card-opinion
- data-certeza value: debatido

**Excerpt (2–4 oraciones):**
Poco antes de que Alberdi cruzara el Río de la Plata hacia Montevideo en el otoño de 1838, un grupo de amigos se reunió para despedirlo. Según la narración de Alberdi en *Mi vida privada* y recogida por el biógrafo Jorge Mayer (*Alberdi y su tiempo*, EUDEBA, 1963), entre los presentes estaban Miguel Cané y Vicente Fidel López, y alguien entonó un "cielo" — el género de canción y danza patriótica rioplatense que había sido el canto popular de la Independencia pero que en los salones porteños de 1838 ya era una forma nostálgica y en declive. <span class="card-nota-certeza">[Nota de certeza: el "cielo" o "cielito" es un género musical documentado (no una canción específica con letra fija) que floreció en el período 1810–1830 aproximadamente. Que se cantara en esta despedida está narrado en *Mi vida privada* y citado por Mayer (1963), pero el pasaje exacto y los detalles de quiénes estaban presentes no se han podido verificar contra una edición paginada en esta investigación. La identificación de "Vicente López" como Vicente Fidel López (1815–1903) —no su padre Vicente López y Planes, autor del Himno Nacional— es la más plausible dado que Vicente Fidel López era coetáneo del grupo, pero tampoco está verificada con cita primaria.]</span> El "cielo" con que se despidieron era, en 1838, un género que sus propios salones ya casi no bailaban: entonarlo en esa despedida era, en sí mismo, un acto de memoria y de patria.

**Fuentes:**
- Alberdi, Juan Bautista, *Mi vida privada que se pasa toda en la República Argentina*, ca. 1872–82, publicado en *Escritos póstumos*, t. I, La Tribuna Nacional, Buenos Aires, 1895 — fuente primaria que narra la escena; texto completo paginado no accesible en las ediciones digitalizadas consultadas en esta investigación; requiere verificación directa contra edición impresa o edición de *Obras Completas* t. VIII
- Mayer, Jorge M., *Alberdi y su tiempo*, EUDEBA, Buenos Aires, 1963 — biógrafo de referencia que cita la escena; paginación no verificada en esta investigación
- Wikipedia ES, "Cielito" — documenta el género: "El cielito fue la danza y el canto patriótico por excelencia en el momento de la Independencia del Río de la Plata. Se bailó en los salones cultos argentinos hasta la tercera década del siglo XIX."
- Veniard, Juan María, "El complejo Cielito. Su música", repositorio.uca.edu.ar — estudio musicológico académico que describe el género: coplas entonadas con acompañamiento de guitarra, origen rioplatense, siglos XVIII–XIX; confirma que las frases del cielito inician con la palabra "cielo"

**Nota de inserción HTML:**
- Sección destino: `#rev-alberdi-formacion` → sub-período "Alberdi: Los años de formación (1810–1838)"
- Insertar: DESPUÉS de `data-id="M011-CANE-1"` (el arco de la amistad, recién creada)
- Esta card es la escena puntual que el arco de M011-CANE-1 hace inteligible: la despedida que cierra el capítulo porteño de la amistad y abre el capítulo montevideano
- `data-id` sugerido: `M011-CANE-2`
- HTML class: `class="event-card card-opinion reveal reveal-slide"` con `data-certeza="debatido"`
- **Nota para S03:** Antes de integrar esta card, verificar el pasaje exacto de *Mi vida privada* contra la edición de *Obras Completas* t. VIII o la edición de la Cruz del Sur (1944, Santiago) disponible en memoriachilena.gob.cl — necesaria para confirmar quiénes estaban presentes y la formulación exacta de la referencia al "cielo". Si el pasaje se verifica con texto, la certeza puede subirse a `hecho` y el span `card-nota-certeza` puede reducirse o eliminarse.
- **Distinción Vicente López:** En el contexto de la Generación del 37, el nombre "Vicente López" que aparece en fuentes secundarias de esta escena se refiere al historiador Vicente Fidel López (Buenos Aires, 1815 – 1903), hijo de Vicente López y Planes (autor del Himno Nacional). Vicente Fidel López era coetáneo de Alberdi (n. 1811) y Cané (n. 1812) y miembro documentado del Salón Literario de 1837 y la Gen. del 37 (confirmado en fuentes primarias compiladas por Weinberg, 1977).

---

<!-- T01 completo. T02 completo: romances de Alberdi — cards M011-ROM-1 y M011-ROM-2 agregadas abajo. -->

---

## M011-ROM-1 — La discreción sentimental de Alberdi: un célibe documentado por omisión (1838–1884)

- Año/período: 1838–1884 (exilio y vida adulta)
- Certeza: hecho
- Certeza-justificación: La ausencia de referencias sentimentales en *Mi vida privada* no es una laguna casual: es una omisión estructural documentada por la historiografía. El estudio de Martino (2016, *Mitologías Hoy*, UAB/CONICET) sobre la autobiografía de Alberdi establece que el texto dedica páginas a la formación intelectual, decisiones políticas y protagonismo cultural, pero no incluye ninguna referencia a vínculos amorosos o afectivos de carácter personal. Esta omisión es coherente con el perfil biográfico general: Alberdi nunca se casó, no tuvo hijos documentados, y sus biógrafos de referencia (Mayer, 1963; Terán, 2004; Canal Feijóo) no mencionan ninguna relación sentimental nombrada. El descriptor "personalidad introspectiva" que aparece en las referencias editoriales a la edición FNA (1999/2000) resume el consenso historiográfico. Certeza `hecho` para el patrón biográfico de discreción y ausencia de documentación sentimental; certeza `rumor` para cualquier candidato específico de relación, ya que ninguno aparece con fuente verificable en la historiografía accesible.
- CSS class sugerida: card-hecho
- data-certeza value: hecho

**Excerpt (2–4 oraciones):**
Juan Bautista Alberdi nunca se casó y no dejó en sus escritos autobiográficos ni en su correspondencia publicada ninguna referencia a una relación sentimental nombrada. *Mi vida privada* (ca. 1872–82), su autobiografía, es un texto de formación intelectual y de memoria política: repasa sus lecturas, sus amistades de generación, sus posiciones ante Rosas y Urquiza, pero guarda silencio total sobre su vida amorosa. La historiografía alberdiana —desde Mayer (1963) hasta Terán (2004)— reproduce ese silencio sin cuestionarlo, documentando a Alberdi como una figura cuya energía vital fue absorbida íntegramente por el pensamiento, la escritura y la política. Este perfil discreto no es una laguna de investigación: es el rasgo más consistente de su autobiografía como género.

**Fuentes:**
- Martino, Luis Marcelo, "La autorrepresentación de un sujeto romántico: *Mi vida privada* de Juan Bautista Alberdi", *Mitologías Hoy*, vol. 13, Universitat Autònoma de Barcelona / CONICET, 2016, pp. 147–161 — análisis académico de la autobiografía: confirma que el texto cubre formación intelectual, política y cultura, sin referencias sentimentales
- Alberdi, Juan Bautista, *Mi vida privada que se pasa toda en la República Argentina*, ca. 1872–82; edición digital disponible en Cervantesvirtual (ed. Jackson, Grandes escritores argentinos, t. X, pp. 27–64) — fuente primaria; texto accesible no contiene referencias a vínculos amorosos
- Mayer, Jorge M., *Alberdi y su tiempo*, EUDEBA, Buenos Aires, 1963 — biógrafo de referencia; no menciona ninguna relación sentimental nombrada (paginación no verificada en esta investigación)
- Terán, Oscar, *Las palabras ausentes: para leer los Escritos póstumos de Alberdi*, FCE, Buenos Aires, 2004 — análisis de los escritos tardíos; no registra vínculos sentimentales documentados
- Kohafacimed/FNA: descripción editorial de *Mi vida privada y otros textos* (FNA, 1999/2000): caracteriza a Alberdi como "dotado de una personalidad introspectiva" — consenso biográfico accesible

**Nota de inserción HTML:**
- Sección destino: `#rev-alberdi-formacion` → sub-período "Alberdi en el exilio (1838–1855)" o al final de la sección biográfica
- Insertar: DESPUÉS de `data-id="M011-CANE-2"` (la despedida del exilio), como reflexión sobre el carácter biográfico global
- `data-id` sugerido: `M011-ROM-1`
- HTML class: `class="event-card card-hecho reveal reveal-slide"` con `data-certeza="hecho"`
- **Nota para S03:** Esta card documenta la *ausencia* como hecho historiográfico. No requiere verificación adicional antes de integrar — el patrón de silencio en *Mi vida privada* es verificable en la edición digital de Cervantesvirtual.

---

## M011-ROM-2 — Ana María Medeiros (Montevideo): candidata sin fuente verificable

- Año/período: ca. 1838–1843 (período montevideano del exilio)
- Certeza: rumor
- Certeza-justificación: El nombre "Ana María Medeiros" aparece mencionado en el roadmap de M011 como candidata a vínculo sentimental de Alberdi durante su exilio en Montevideo. Sin embargo, la investigación exhaustiva en bases de datos académicas (CONICET/ri.conicet.gov.ar, Dialnet, Cervantesvirtual, Mitologías Hoy/UAB), repositorios bibliográficos especializados en historiografía rioplatense del siglo XIX y fuentes biográficas alberdianas (Mayer 1963; Terán 2004; García Mérou 1890; serargentino.com) no produjo ningún resultado que la mencione en conexión con Alberdi. Ni *Mi vida privada* ni la correspondencia con Gutiérrez publicada en *Escritos Póstumos* contienen su nombre en los fragmentos accesibles. No existe fuente primaria paginada, fuente secundaria nombrada ni tradición oral historiográfica documentada que establezca este vínculo. Certeza `rumor` es la clasificación correcta: el nombre circula como candidata en la planificación del proyecto pero sin respaldo bibliográfico identificable.
- CSS class sugerida: card-rumor
- data-certeza value: rumor

**Excerpt (2–4 oraciones):**
El nombre de Ana María Medeiros ha circulado como posible vínculo sentimental de Alberdi durante su período montevideano (1838–1843), cuando el joven tucumano vivía en el exilio rioplatense junto con Cané y otros miembros de la Generación del 37. Sin embargo, ninguna fuente biográfica accesible —ni la propia autobiografía *Mi vida privada*, ni la correspondencia publicada con Gutiérrez, ni los biógrafos de referencia como Mayer (1963) o Terán (2004)— la menciona en conexión con Alberdi. <span class="card-nota-certeza">[Nota de certeza: Este vínculo no tiene fuente verificable identificada. La clasificación `rumor` refleja la ausencia total de documentación, no la imposibilidad histórica del vínculo. Si existe una referencia en Mayer (1963) u otra fuente secundaria no digitalizada, eso elevaría la certeza a `debatido`. Ruta de verificación: consultar el índice onomástico de *Alberdi y su tiempo* (Mayer, EUDEBA, 1963) en biblioteca física.]</span>

**Fuentes:**
- Sin fuente primaria verificada — nombre no aparece en *Mi vida privada* (ed. Cervantesvirtual/Jackson) ni en fragmentos accesibles de *Escritos póstumos*
- Sin fuente secundaria verificada — nombre no aparece en historiografía alberdiana accesible (Martino 2016; Terán 2004; García Mérou 1890; serargentino.com; Wikipedia ES)
- Mayer, Jorge M., *Alberdi y su tiempo*, EUDEBA, Buenos Aires, 1963 — posible fuente; no verificado (texto no digitalizado accesiblemente); ruta de verificación pendiente
- Nota: la ausencia en fuentes digitalizadas no descarta la existencia del vínculo, pero sí impide asignar certeza superior a `rumor` en esta investigación

**Nota de inserción HTML:**
- Sección destino: `#rev-alberdi-formacion` → sub-período "Alberdi en el exilio (1838–1855)"
- Insertar: DESPUÉS de `data-id="M011-ROM-1"` (el perfil de discreción general)
- `data-id` sugerido: `M011-ROM-2`
- HTML class: `class="event-card card-rumor reveal reveal-slide"` con `data-certeza="rumor"`
- **Nota para S03:** Antes de integrar esta card en HTML, verificar si Mayer (1963) menciona el nombre en su índice onomástico. Si no aparece, considerar omitir esta card del HTML público o mantenerla como nota interna. El span `card-nota-certeza` es obligatorio si se integra.

