# S01-CONTENT-DRAFT — M011 Content Research Draft

**Milestone:** M011
**Slice:** S01 — Research Encarnación/Suma del Poder Público y red Generación del 37
**Status:** T01 + T02 completo — 5 cards verificadas (M011-ENC-1, M011-ENC-2, M011-RED37-1, M011-MARIQ-1, M011-RED37-2). Listo para S03 (HTML Integration).

> **Para S03-T01 (HTML Integration):** Este archivo es la especificación de entrada.
> Cada `##` section es una card separada. Leer las Notas de inserción HTML antes de splicing.

---

## M011-ENC-1 — El lobby de Encarnación: despejar el partido federal (1833–1835)

- Año/período: 1833–1835
- Certeza: debatido
- Certeza-justificación: El rol de Encarnación en despejar el partido federal porteño de la facción antirrosista y crear las condiciones para que Rosas retornara *con* la Suma del Poder Público es reconocido por todas las corrientes historiográficas — liberal (Lynch, *Argentine Dictator*, Oxford, 1981, cap. 5), revisionista (Irazusta, *Vida política de JM de Rosas*, 1941), y la síntesis académica contemporánea (Materiales UNTREF/Ternavasio). El punto que lo convierte en `debatido` es más fino: ninguna carta publicada de la correspondencia Encarnación–Rosas (AGN Sala X, publicada 1923) la muestra *exigiendo ella* la Suma como condición —  el registro muestra que Rosas ya había establecido la Suma como condición desde 1832 cuando declinó continuar sin ella; lo que Encarnación hizo fue movilizar la base política para que esa condición fuera políticamente viable para la Legislatura. La causalidad directa entre su lobby y la Suma específicamente (versus el regreso de Rosas en general) es una inferencia bien fundada, no un hecho documentado con carta explícita.
- CSS class sugerida: card-opinion
- data-certeza value: debatido

**Excerpt (2–4 oraciones):**
Entre 1833 y 1835, mientras Rosas conducía la Campaña del Desierto desde el sur, Encarnación Ezcurra dirigió en Buenos Aires la operación política que haría posible su regreso con la Suma del Poder Público: organizó la Revolución de los Restauradores (octubre de 1833), que derribó al gobernador Balcarce y expulsó a los federales "cismáticos" que resistían la concentración de poder en Rosas; mantuvo correspondencia de inteligencia con jefes militares, caudillos y legisladores (AGN Sala X, publicada 1923); y movilizó a la base federal — incluyendo sectores populares, comunidades negras y orilleras — para presionar a la Junta de Representantes. El Museo Histórico Nacional documenta que su objetivo declarado fue "conseguir el apoyo unánime de la Junta de Representantes para que le otorgasen nuevamente a su marido las facultades extraordinarias." En marzo de 1835, con el vacío de poder creado por el asesinato de Quiroga, la Legislatura cedió: eligió a Rosas con la Suma del Poder Público el 7 de marzo de 1835.

**Fuentes:**
- Lynch, John, *Argentine Dictator: Juan Manuel de Rosas 1829–1852*, Oxford, Clarendon Press, 1981, cap. 5 — síntesis académica contemporánea más citada; reconoce que Encarnación "creó las condiciones políticas para el regreso de Rosas"
- Museo Histórico Nacional, Argentina, ficha biográfica "Encarnación: una mujer con gran poder político" (museohistoriconacional.cultura.gob.ar) — describe el objetivo de "conseguir el apoyo unánime de la Junta de Representantes para que le otorgasen las facultades extraordinarias"
- Irazusta, Julio, *Vida política de Juan Manuel de Rosas*, Buenos Aires, 1941 — posición revisionista que sitúa a Encarnación como co-arquitecta del rosismo
- Materiales UNTREF/Ternavasio (varios autores), *Historia Argentina*, unidad 4 — describe "el creciente clima de violencia por parte de los rosistas encabezados por Encarnación Ezcurra" como causa directa de la consolidación del partido federal en 1835
- Wikipedia EN, "Encarnación Ezcurra" (cita correspondencia AGN Sala X; Lynch cap. 5) — confirma que fue "the driving force behind the Revolution of the Restorers"

**Nota de inserción HTML:**
- Sección destino: `#periodo-rosas` → subdivisión de los años 1833–1835
- Insertar: inmediatamente DESPUÉS de la card `data-id="S23-2"` (¿Cuánto poder propio tenía Encarnación?) y ANTES de `data-id="S24-1"` (orígenes de Encarnación)
- Alternativa: crear un grupo nuevo entre S23-2 y S24-1 con header `<!-- M011: Nuevas cards — El lobby de la Suma -->`
- `data-id` sugerido: `M011-ENC-1`
- HTML class: `class="event-card card-opinion reveal reveal-slide"` con `data-certeza="debatido"`
- Nota: S23-1 ya cubre la Revolución de los Restauradores en general; esta card aporta el ángulo específico de *por qué* la Suma — la diferencia entre 1829 (Suma negada) y 1835 (Suma concedida) y el rol de Encarnación en ese delta.

---

## M011-ENC-2 — La Nota Historiográfica: ¿inventó Encarnación la Suma como condición?

- Año/período: 1832–1835
- Certeza: debatido
- Certeza-justificación: La pregunta sobre si Encarnación fue la que *inventó* o *exigió* la Suma como condición (versus Rosas que ya la tenía como exigencia propia desde 1832) está dividida entre la tradición revisionista (que maximiza su agencia) y la síntesis contemporánea (Lynch: ella creó condiciones políticas para el proyecto de Rosas, no un proyecto autónomo). El registro documental — correspondencia siempre formulada como informes *a* Rosas — no permite resolver definitivamente si la Suma fue condición de él que ella hizo políticamente viable, o condición que ella reforzó o co-construyó.
- CSS class sugerida: card-opinion
- data-certeza value: debatido

**Excerpt (2–4 oraciones):**
La historiografía está dividida sobre si Encarnación presionó *por la Suma específicamente* o solo *por el regreso de Rosas*. La posición revisionista (Irazusta, 1941; Vera Pichel, *Encarnación Ezcurra: La mujer que inventó a Rosas*, 1990) destaca que fue ella quien organizó la movilización popular que forzó a la Legislatura a ceder no solo el regreso de Rosas sino sus condiciones — incluyendo la Suma. La síntesis académica contemporánea (Lynch, *Argentine Dictator*, 1981, cap. 5) ubica la exigencia de la Suma como propia de Rosas desde 1832 — cuando ya había declinado continuar gobernando sin ella —, y el rol de Encarnación como el de crear las condiciones políticas que hicieron esa exigencia irresistible para la Legislatura. La correspondencia superviviente (AGN Sala X, publicada 1923), siempre formulada como informes dirigidos a Rosas, no permite resolver si la Suma fue una condición que él impuso y ella hizo viable, o una condición que los dos co-diseñaron.

**Fuentes:**
- Lynch, John, *Argentine Dictator: Juan Manuel de Rosas 1829–1852*, Oxford, 1981, cap. 5
- Pichel, Vera, *Encarnación Ezcurra: La mujer que inventó a Rosas*, Buenos Aires, 1990
- Irazusta, Julio, *Vida política de Juan Manuel de Rosas*, Buenos Aires, 1941
- AGN Sala X — correspondencia Encarnación–Rosas, publicada 1923 (citada en historiografía secundaria)

**Nota de inserción HTML:**
- Esta card es una `card-nota-historiografica` — puede ir como subcarta debajo de M011-ENC-1, o integrarse como un `<p class="card-nota-historiografica">` dentro del mismo article de M011-ENC-1 (patrón establecido en S23-2 y S24-2)
- Si se integra dentro de M011-ENC-1: no crear article separado, sino agregar el párrafo de nota historiográfica al final del excerpt de M011-ENC-1
- `data-id` sugerido si es article propio: `M011-ENC-2`
- Decisión de integración: preferible como nota dentro de M011-ENC-1 (reduce proliferación de cards para un debate que ya tiene espacio en S23-2)

---

## M011-RED37-1 — La formación de la red: cómo se conocieron Alberdi, Echeverría y la Generación del 37

- Año/período: 1835–1838
- Certeza: hecho
- Certeza-justificación: El Salón Literario de Marcos Sastre (inaugurado 26 de junio de 1837) es el punto de encuentro documentado de Alberdi, Echeverría, Juan María Gutiérrez y Vicente Fidel López como red intelectual. Las fechas están verificadas: Echeverría regresó de Europa en 1830 y comenzó a reorganizar el debate intelectual porteño; Alberdi presentó el *Fragmento preliminar* en el Salón Literario el 26 de junio de 1837; Juan María Gutiérrez y Vicente Fidel López también participaron del Salón. Las fuentes primarias (Weinberg, *El Salón Literario de 1837*, Hachette, 1977; *Mi vida privada*, Alberdi) y la historiografía secundaria (Mayer, *Alberdi y su tiempo*, EUDEBA, 1963) son concordantes. Certeza `hecho` para los datos estructurales de la red; el carácter relacional previo a 1837 (si Alberdi y Echeverría se conocieron antes del Salón, por ejemplo vía Mariquita) es menos documentado y se señala como laguna.
- CSS class sugerida: card-hecho
- data-certeza value: hecho

**Excerpt (2–4 oraciones):**
La red intelectual de la Generación del 37 cristalizó en el Salón Literario de Marcos Sastre, inaugurado el 26 de junio de 1837 en la librería de Sastre en Buenos Aires: allí Alberdi presentó el *Fragmento preliminar al estudio del Derecho*, Esteban Echeverría (regresado de París en 1830) expuso las bases del romanticismo social que articularía en el *Dogma Socialista*, y Juan María Gutiérrez y Vicente Fidel López se incorporaron como voces del mismo programa de regeneración nacional. El Salón fue el primer espacio institucional de encuentro de este grupo, pero la red previa era más densa: Alberdi y Miguel Cané (padre) eran compañeros de banco del Colegio de Ciencias Morales desde 1824, y el piano de Mariquita Sánchez de Thompson — que Alberdi había usado en sus años de dependiente en la tienda de Maldes — ya era un nodo de sociabilidad intelectual que reunía a figuras de distintas generaciones. El Salón Literario no creó la red de la Generación del 37 desde cero: la formalizó y le dio un programa.

**Fuentes:**
- Weinberg, Félix (comp.), *El Salón Literario de 1837*, Hachette, Buenos Aires, 1977 — fuente primaria compilada con los discursos y documentos del Salón
- Mayer, Jorge M., *Alberdi y su tiempo*, EUDEBA, Buenos Aires, 1963 — síntesis biográfica e intelectual de referencia
- Alberdi, Juan Bautista, *Mi vida privada*, ca. 1872–82, publicado en *Escritos póstumos*, t. I, 1895 — autobiografía de referencia
- Wikipedia ES, "Salón Literario de 1837"; Wikipedia ES, "Juan María Gutiérrez"; Wikipedia ES, "Vicente Fidel López"

**Nota de inserción HTML:**
- Sección destino: `#rev-alberdi-formacion` → sub-período "Alberdi: Los años de formación (1810–1838)"
- Insertar: DESPUÉS de `data-id="BIOG-11"` (La vuelta a Buenos Aires y el Fragmento preliminar) y ANTES de `data-id="BIOG-12"` (Alberdi periodista)
- Esta card complementa BIOG-11 (que cubre el *Fragmento* y el Salón) añadiendo el ángulo de la *red* — cómo se conectaron los integrantes — que BIOG-11 no desarrolla
- `data-id` sugerido: `M011-RED37-1`
- HTML class: `class="event-card card-hecho reveal reveal-slide"` con `data-certeza="hecho"`

---
<!-- T01 + T02 completo: 5 cards verificadas. S01 draft cerrado. -->

## M011-MARIQ-1 — Mariquita Sánchez de Thompson: la anfitriona del siglo (1786–1868)

- Año/período: 1808–1838 (con énfasis en los años 1830s)
- Certeza: hecho (con nota de certeza diferenciada para el Himno Nacional)
- Certeza-justificación: El perfil biográfico de Mariquita, sus tertulias documentadas desde 1808 (El Historiador: "Desde 1808, se hicieron famosas las tertulias de su casa de la calle Unquera"), su rol como anfitriona de la Generación del 37 y su correspondencia con Echeverría, Alberdi y Gutiérrez son hechos plenamente documentados en múltiples fuentes primarias y secundarias (Wikipedia ES, elhistoriador.com.ar, buenosaires.gob.ar). El vínculo de Alberdi con su casa es doble: usaba su piano en la tienda de Maldes y, según Infobae (oct. 2025), "Un joven Juan Bautista Alberdi, recién llegado de Tucumán, se alojó en su casa" — este detalle secundario se señala con nota de certeza porque proviene de fuente secundaria popular sin indicar fuente primaria. La primera ejecución del Himno Nacional en su casa es tradición bien establecida pero sin documento primario: Wikipedia ES lo consigna "Según la tradición"; El Historiador anota que "ella en ningún escrito mencionó tan trascendente episodio"; el cuadro de Subercaseaux (1909) fue central en instalar la tradición, aunque fue pintado casi un siglo después. Se aplica certeza `debatido` para ese elemento específico mediante `card-nota-certeza` inline.
- CSS class sugerida: card-hecho (con nota inline card-nota-certeza para el Himno)
- data-certeza value: hecho

**Excerpt (2–4 oraciones):**
María Josepha Petrona de Todos los Santos Sánchez de Velasco y Trillo — Mariquita — nació el 1 de noviembre de 1786 en Buenos Aires y pasó a ser, durante más de seis décadas, el nodo central de la sociabilidad intelectual rioplatense: sus tertulias en la casa de la calle del Empedrado (Florida al 200) eran famosas ya desde 1808, y en ellas Juan Bautista Alberdi la describió como "la personalidad más importante de la sociedad de Buenos Aires, sin la cual es imposible explicar el desarrollo de su cultura y buen gusto." <span class="card-nota-certeza">[Tradición: se dice que en su salón se interpretó por primera vez el Himno Nacional el 14 de mayo de 1813, pero ella nunca lo mencionó en ningún escrito, y el relato tiene como principal soporte visual el cuadro de Pedro Subercaseaux pintado en 1909 — casi un siglo después del hecho]</span> En la década de 1830, cuando Echeverría, Alberdi y Gutiérrez gravitaban en torno al Salón Literario, la casa de Mariquita seguía siendo el espacio previo donde las generaciones se encontraban: ella había conocido a Rosas de niño, intercambiaba cartas con Echeverría, y había alojado al joven Alberdi recién llegado de Tucumán. En 1838 partió al exilio en Montevideo, donde su casa se convirtió en refugio y punto de encuentro de los proscritos — el mismo círculo de intelectuales que en Buenos Aires habían frecuentado su salón.

**Fuentes:**
- Wikipedia ES, "María Sánchez de Thompson" — perfil biográfico completo; documenta "Según la tradición, el 14 de mayo de 1813, en la casa de Mariquita Sánchez de Thompson se cantó por primera vez [el Himno]" y la ausencia de documento primario de su autoría
- elhistoriador.com.ar, "Mariquita Sánchez de Thompson" (Felipe Pigna, ed.) — "Desde 1808, se hicieron famosas las tertulias de su casa de la calle Unquera [...] Se dice que en su salón se interpretó por primera vez el Himno Nacional, aunque ella en ningún escrito mencionó tan trascendente episodio"
- buenosaires.gob.ar, "Mariquita Sánchez de Thompson en primera persona" (Museo Saavedra) — documentación de correspondencia con Echeverría, Alberdi, y Juan Thompson; perfil biográfico institucional
- Infobae, 23 oct. 2025, "Mariquita Sánchez de Thompson: vida de una vanguardista" — "Un joven Juan Bautista Alberdi, recién llegado de Tucumán, se alojó en su casa"
- cultura.gob.ar, "Mariquita Sánchez de Thompson: patriota y feminista" — documenta relación con Gen. del 37 (Echeverría, Gutiérrez, Alberdi)
- Cita atribuida a Alberdi ("la personalidad más importante de la sociedad de Buenos Aires...") recogida por eldiariochubutense.com, cadena3.com, cultura.gob.ar — consistentemente atribuida en historiografía secundaria; texto exacto sin fuente primaria verificada

**Nota de inserción HTML:**
- Sección destino: `#rev-alberdi-formacion` → sub-período "Alberdi: Los años de formación (1810–1838)"
- Insertar: DESPUÉS de `data-id="BIOG-7"` (La tienda de Maldes, Volney y el piano de Mariquita) — como expansión directa de esa referencia
- Esta card amplía BIOG-7 (que solo menciona el piano) añadiendo el perfil completo de Mariquita y su función de nodo de sociabilidad intergeneracional
- El vínculo con M011-RED37-1 es explícito: Mariquita es el eslabón entre la generación de Mayo y la Generación del 37 — el nodo previo al Salón Literario
- `data-id` sugerido: `M011-MARIQ-1`
- HTML class: `class="event-card card-hecho reveal reveal-slide"` con `data-certeza="hecho"`
- Nota para S03: el span `class="card-nota-certeza"` del excerpt (sobre el Himno) ya está formulado para inserción directa en el `<p class="event-card__excerpt">`

---

## M011-RED37-2 — Echeverría vuelve de París: el catalizador romántico (1830–1837)

- Año/período: 1830–1837
- Certeza: hecho
- Certeza-justificación: El retorno de Echeverría de París en junio/julio de 1830 y su rol como introductor del romanticismo europeo en Buenos Aires son hechos plenamente documentados. Cervantesvirtual (Biblioteca Miguel de Cervantes) cita la carta autobiográfica de Echeverría: "regresé a mi patria a mediados de 1830 después de haber visitado la Inglaterra" — y dos fuentes de Cervantesvirtual establecen "regresa después de cinco años a Buenos Aires" y "vuelve a Buenos Aires en julio de 1830." La cronología de la red es verificable: Echeverría publica *Los consuelos* en 1834, que Juan María Gutiérrez reseña favorablemente — primer contacto documentado entre ambos (Cervantesvirtual/Cervantes: "Gutiérrez con una importante lectura"); en 1837 en el Salón Literario se agrupan Alberdi, Gutiérrez, Echeverría, Vicente Fidel López y otros. Certeza `hecho` para la cronología estructural de la red; el canal específico por el que Alberdi y Echeverría se conocieron antes de 1837 (si mediaron las tertulias de Mariquita u otro espacio) es menos documentado y se señala.
- CSS class sugerida: card-hecho
- data-certeza value: hecho

**Excerpt (2–4 oraciones):**
Cuando Esteban Echeverría desembarcó en Buenos Aires el 28 de junio de 1830, la aduana lo había registrado a la partida como "comerciante" — regresó definiéndose "literato": traía en el equipaje cinco años de romanticismo parisino, las ideas de Saint-Simon y Victor Hugo, y la certeza de que la independencia cultural de Argentina estaba tan incompleta como la política. Su primer libro porteño, *Elvira o la novia del Plata* (1832), pasó casi desapercibido; pero *Los consuelos* (1834) fue saludado por Juan María Gutiérrez como "una verdadera revolución" — el primer contacto documentado entre los dos hombres que co-liderarían la Generación del 37. La red que Echeverría tejió entre 1830 y 1837 no fue diseñada de golpe: fue la acumulación de un círculo de lecturas compartidas, tertulias en la casa de Mariquita Sánchez de Thompson y en la propia estancia de Echeverría en San Telmo, y la reconversión gradual de una amistad literaria en un programa político que culminaría en el Salón Literario de Marcos Sastre (1837) y en la *Asociación de la Joven Generación Argentina* (1838).

**Fuentes:**
- Cervantesvirtual, "Esteban Echeverría y la fundación de una literatura nacional" — cronología de regreso, liderazgo intelectual, Salón Literario como fundación de la red
- Cervantesvirtual, "Vida y obra de Esteban Echeverría: pág. 2" — cita autobiográfica de Echeverría ("regresé a mi patria a mediados de 1830"), detalla los 4+ años en París (1825–1830)
- Cervantesvirtual, "Echeverría y la realidad nacional" — "[Cuando Echeverría publicó *Rimas* en 1837] en su torno se agrupan hombres como Gutiérrez, Alberdi, Cané, Quiroga Rosas, Frías, Vicente F. López, Carlos Tejedor, Thompson, etcétera"; documenta reseña favorable de Gutiérrez a *Los consuelos* (1834) como primer contacto entre ambos
- Wikipedia ES, "Esteban Echeverría" y "Salón Literario de 1837" — confirman cronología y participantes
- Weinberg, Félix (comp.), *El Salón Literario de 1837*, Hachette, Buenos Aires, 1977 — fuente académica de referencia para la red

**Nota de inserción HTML:**
- Sección destino: `#rev-alberdi-formacion` → sub-período "Alberdi: Los años de formación (1810–1838)"
- Insertar: DESPUÉS de `data-id="M011-RED37-1"` (la formación de la red: el Salón como punto de cristalización) — esta card agrega la perspectiva de Echeverría como catalizador *previo* al Salón, completando el arco 1830–1837
- Alternativa de posición: si M011-RED37-1 y M011-RED37-2 resultan redundantes en S03, se puede integrar el excerpt de M011-RED37-2 como párrafo adicional dentro del article de M011-RED37-1 (patrón usado en M011-ENC-2)
- `data-id` sugerido: `M011-RED37-2`
- HTML class: `class="event-card card-hecho reveal reveal-slide"` con `data-certeza="hecho"`
- Nota para S03: considerar si esta card duplica demasiado con BIOG-11 (que ya cubre el Salón Literario desde la perspectiva de Alberdi). La diferencia es el foco: BIOG-11 narra el hito del *Fragmento* y el discurso de Alberdi; M011-RED37-2 narra la construcción de la red desde la perspectiva de Echeverría (1830–1837), que BIOG-11 no desarrolla.
