# M021-S01 Research: Research y content draft verificado — arco completo San Martín

**Date:** 2026-03-25
**Status:** Complete — ready for planner

---

## Summary

S01 es research puro: producir `S01-CONTENT-DRAFT.md` con ≥15 entradas verificadas, certeza asignada, imágenes Wikimedia identificadas, y decisiones sobre posición del sub-período y granularidad de batallas. No toca `index.html`.

El codebase está en buen estado para recibir el nuevo sub-período: el patrón `<div id="rev-X" class="sub-period reveal reveal-fade">` está establecido y estable. Los patrones `card-nota-historiografica` (tres posiciones con atribución por posición) y `card-opinion` con `data-certeza="debatido"` están completamente implementados en `#periodo-rosas` (S14–S19) y sirven exactamente para Guayaquil y las logias.

La investigación histórica confirma que hay material suficiente y verificado para **15 cards distintas** con ≥2 fuentes por hecho. Las decisiones de posición y granularidad están listas para tomarse (ver Recommendation).

---

## Recommendation

### Posición del sub-período en el flujo

**Insertar `#rev-san-martin` ENTRE `#rev-1800-1820` y `#rev-1820-1835`.**

Razón: San Martín llega en 1812 y su arco cierra en 1822 (Guayaquil/retiro). Narrativamente pertenece al bloque 1812–1822 que ya es el núcleo de `#rev-1800-1820`. Sin embargo, la tarjeta panorámica SP1-5 en `#rev-1800-1820` cubre 1817–1821 con apenas 4 líneas. El sub-período nuevo amplía ese arco sin reemplazar las cards existentes, y queda naturalmente antes del período de anarquía y guerras civiles (1820–1835). San Martín se retira del poder en 1822 — justo antes de que Argentina entre en el ciclo Rivadavia/Rosas. La secuencia narrativa resultante es coherente: Revolución de Mayo → San Martín (profundización) → Anarquía post-1820.

### Granularidad de batallas

Confirmada la granularidad propuesta en el roadmap:
- **San Lorenzo** (3 feb 1813): card propia — única batalla en suelo argentino
- **Cuyo y preparación del Ejército de los Andes** (1814–1817): card propia — 3 años de preparación estratégica
- **Cruce de los Andes** (enero 1817): card propia — la epopeya logística
- **Chacabuco** (12 feb 1817): card propia — primera victoria en Chile
- **Cancha Rayada + Maipú** (marzo–abril 1818): una sola card — par narrativo (derrota/reorganización → victoria definitiva)
- **Campaña al Perú y Protectorado** (1820–1821): card propia
- **Guayaquil** (26–27 jul 1822): card de debate historiográfico (card-opinion + card-nota-historiografica, data-certeza="debatido")
- **El retiro del poder** (1822–1850): card propia

Total: 8 cards de batallas/campañas + 7 cards de contexto = **15 cards**.

---

## Implementation Landscape

### Key Files

- `index.html` línea 1329: `</div><!-- /#rev-1800-1820 -->` — insertar `#rev-san-martin` inmediatamente DESPUÉS de esta línea y ANTES del conector alberdi que sigue
- `index.html` líneas 326–333: sub-nav sticky — agregar `<a href="#rev-san-martin">` en posición 4 (después de `#rev-alberdi-quiroga`, antes de `#rev-1800-1820`)
- `index.html` líneas 2428–2502: `revolucion-timeline` — agregar marcadores para 1812 (Granaderos), 1813 (San Lorenzo), 1817 (Cruce), 1818 (Maipú) usando fórmula `(año - 1800) / 60 * 100`
- `index.html` línea 1335–1340: conector alberdi entre SP1 y SP2 — verificar que sigue siendo coherente con el nuevo sub-período insertado antes
- `.gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md` — **archivo a producir por el executor de S01**

### Patrones HTML a reusar (copiar de index.html)

```
Card hecho:   línea 1211–1247 (SP1-1, Revolución de Mayo)
Card opinion: línea 1753–1780 (S14-3, data-certeza="debatido" con card-nota-historiografica)
Sub-period:   línea 346–731 (#rev-alberdi-formacion — estructura completa)
Sub-nav link: línea 327 (formato exacto)
Timeline marker: línea 2435–2439 (formato, con --marker-pos calculado)
Timeline marker above: línea 2447–2451 (formato --above para marcadores densos)
```

### Timeline marker positions para San Martín

Fórmula: `(año - 1800) / 60 * 100`

| Año | Evento | --marker-pos | Alternating |
|-----|--------|-------------|-------------|
| 1812 | Granaderos | 20.00% | below (entre 1810=16.67% y 1816=26.67%) |
| 1813 | San Lorenzo | 21.67% | above (muy cerca de 1812) |
| 1817 | Cruce | 28.33% | above (cerca de 1816=26.67%) |
| 1818 | Maipú | 30.00% | below (cerca de 1817) |

Los 4 marcadores de San Martín más los 10 existentes = 14 markers totales. Los de 1812, 1813, 1817, 1818 son muy densos entre sí — aplicar alternating sistemáticamente.

### Build Order

1. **Executor S01 escribe `S01-CONTENT-DRAFT.md`** — las 15 entradas con todos los campos requeridos (título, año, certeza, excerpt, detalle expandible, fuentes, imagen Wikimedia URL verificada, nota historiográfica flag). Este es el único producto de S01.
2. S02 consume el draft para integrar las primeras ~6 cards (formación, logias, Granaderos)
3. S03 integra las ~6 cards de batallas
4. S04 integra las ~4 cards finales (Perú, Guayaquil, retiro)
5. S05 agrega sub-nav link y timeline markers

### Verification Approach

```bash
# Solo aplica a S02-S05, no a S01
# S01 se verifica inspeccionando S01-CONTENT-DRAFT.md:
grep -c "^## Entrada" S01-CONTENT-DRAFT.md  # debe ser >= 15
grep -c "certeza:" S01-CONTENT-DRAFT.md     # debe ser >= 15
grep -c "wikimedia:" S01-CONTENT-DRAFT.md   # debe ser >= 10
```

---

## Content Draft — 15 Entradas Verificadas

### ENTRADA 1: Infancia en Yapeyú y traslado a España
- **Año display:** 1778 – 1789
- **Certeza:** hecho
- **Excerpt:** José Francisco de San Martín nació el 25 de febrero de 1778 en Yapeyú, misión jesuita guaraní en la actual provincia de Corrientes. Su padre, Juan de San Martín, era gobernador departamental. En 1781 la familia se trasladó a Buenos Aires; en 1784 partió a España, donde Juan había sido reasignado. El pequeño José quedó con su familia en Málaga mientras su padre servía en el ejército. En 1785 inició sus estudios en la Escuela de Temporalidades de Málaga; luego pasó al Seminario de Nobles de Madrid.
- **Detalle expandible:** San Martín partió del Río de la Plata a los 6 años — no volvería por 28. La misión jesuita de Yapeyú había sido reorganizada tras la expulsión de la Compañía de Jesús en 1767; su padre administraba una comunidad guaraní en transición. En Madrid estudió en el Real Seminario de Nobles, donde se formaba la elite militar y burocrática española. El hecho de haber nacido en América lo colocaba en una categoría ambigua: era español de formación y de carrera, pero criollo de origen — una tensión que el ejército español institutionalizaría como "techo de cristal" para los americanos.
- **Fuentes:** Wikipedia EN, "José de San Martín" (fuente compilatoria); bicentenario.gob.pe (Gobierno del Perú, 2023); La Nación, "De los 11 a los 34 años: la vida militar de San Martín" (2021); recursosacademicos.net.
- **Imagen Wikimedia:** `File:General_José_de_San_Martín_por_Gil_de_Castro.jpg` (retrato por Gil de Castro, 1818 — ya en index.html SP1-5). URL thumb 500px: `https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/General_Jos%C3%A9_de_San_Mart%C3%ADn_por_Gil_de_Castro.jpg/500px-General_Jos%C3%A9_de_San_Mart%C3%ADn_por_Gil_de_Castro.jpg`
- **Notas:** La fecha exacta de nacimiento 25 feb 1778 está confirmada por múltiples fuentes. Algunos documentos del propio San Martín variaron el año (1777/1778) pero el consenso historiográfico es 1778.

---

### ENTRADA 2: El oficial profesional — 22 años en el ejército español
- **Año display:** 1789 – 1811
- **Certeza:** hecho
- **Excerpt:** El 21 de julio de 1789, a los 11 años, San Martín entró como cadete en el 2.° batallón del Regimiento de Infantería de Murcia, con guarnición en Málaga. Combatió en el Rosellón contra la Francia revolucionaria (1793–1795), en la campaña naval de la Santa Dorotea contra la Royal Navy (1797–1798), en la guerra de las Naranjas contra Portugal (1801), en la defensa de Cádiz y en la batalla de Arjonilla (23 jun 1808). En Bailén (19 jul 1808) fue ascendido a Teniente Coronel de Caballería por su actuación. Sirvió 22 años en el ejército español.
- **Detalle expandible:** La carrera de San Martín en el ejército español fue la de un oficial profesional de excelencia: ascendió a subteniente 2.° (1793), subteniente 1.° (1794), capitán (1804), y Teniente Coronel después de Bailén (1808). En Arjonilla casi muere — el sargento Juan de Dios lo rescató cuando estaba rodeado. En Bailén participó como ayudante de campo del general Coupigny en la primera derrota del ejército napoleónico en campo abierto. El uniforme del Regimiento de Murcia era celeste y blanco — los mismos colores que luego adoptaría la bandera argentina y el uniforme de los Granaderos a Caballo. Esta coincidencia, señalada por múltiples biógrafos, es uno de los pocos vínculos simbólicos documentados entre su carrera española y la argentina.
- **Fuentes:** La Nación, "De los 11 a los 34 años" (2021); elpueblodeceuta.es, "José de San Martín. Su paso por el Ejército Español"; Colegio Militar (REDI), "San Martín Cadete" (PDF académico); Wikipedia EN.
- **Imagen Wikimedia:** Buscar `File:Batalla_de_Bailen.jpg` — si no disponible a 500px, usar retrato ya identificado.
- **Notas:** El episodio del uniforme celeste y blanco está bien documentado: el PDF del Colegio Militar confirma que hasta 1791 los vivos eran azules, cambiando a celeste ese año.

---

### ENTRADA 3: Cádiz, las logias y la decisión de volver
- **Año display:** 1810 – 1812
- **Certeza:** opinión (card-opinion, data-certeza="debatido")
- **Excerpt:** En 1810, en Cádiz, San Martín tomó conocimiento de la Revolución de Mayo. Pidió la baja del ejército español alegando "asuntos familiares en Lima" — una excusa para regresar. En Cádiz y Londres entró en contacto con la Sociedad de Caballeros Racionales, red de militares americanos que conspiraban por la independencia. Junto a Carlos de Alvear, Matías Zapiola y otros, embarcó desde Londres en la fragata George Canning. Llegó a Buenos Aires el 9 de marzo de 1812.
- **Detalle expandible:** La decisión de volver plantea la primera pregunta historiográfica del arco: ¿por qué volvió? La respuesta simple — convicción patriótica — es insuficiente. San Martín tenía una carrera brillante, era Teniente Coronel con 34 años y había combatido en la guerra más importante de Europa. Renunciar a eso requería algo más que sentimentalismo.
- **Nota historiográfica (TRES POSICIONES):**
  - **Posición 1 — convicción ideológica** (Bartolomé Mitre, *Historia de San Martín*, 1887; Ricardo Rojas, *El santo de la espada*, 1933): San Martín había desarrollado en Cádiz una conciencia americanista autónoma; la Revolución de Mayo fue el catalizador de una decisión que ya estaba madura. La red de Caballeros Racionales era un vehículo, no la causa.
  - **Posición 2 — reclutamiento por logias** (tradición documentada en Mitre/Paz Soldán; elarcondelahistoria.com citando Piccirilli, 1958): La Sociedad de Caballeros Racionales en Cádiz reclutaba activamente a militares americanos con grado y experiencia. San Martín fue "uno de los primeros en afiliarse". La logia organizó el retorno colectivo: Alvear, Zapiola y San Martín embarcaron juntos desde Londres.
  - **Posición 3 — estrategia británica** (Emilio Ocampo, *Todo es Historia*, 2006; Infobae, 2021): Gran Bretaña utilizaba las logias como instrumento informal de política exterior. El George Canning era un barco inglés; George Canning era el canciller que reconoció la independencia argentina. La Gran Logia de Londres negó en 1979 (carta a Maguire) tener registros de San Martín, Alvear o Zapiola — pero esa misma negación es compatible con redes paralelas no registradas.
  - **Síntesis:** las tres hipótesis son parcialmente compatibles. Lo documentado: San Martín se afilió a los Caballeros Racionales en Cádiz, pasó por Londres, y regresó con compañeros ideológicamente alineados. Lo no documentado: el peso relativo de cada motivación en su decisión personal.
- **Fuentes:** elarcondelahistoria.com, "San Martín y la Logia Lautaro" (citando Piccirilli, 1958); Infobae, "San Martín y su vínculo con las logias" (2021); Emilio Ocampo (Tumblr/Todo es Historia, 2006) citando investigaciones en archivos ingleses; Wikipedia ES, "Logia Lautaro".
- **Imagen Wikimedia:** `File:George_Canning.jpg` (retrato George Canning) o retrato de San Martín ya identificado.

---

### ENTRADA 4: La Logia Lautaro y el poder desde las sombras
- **Año display:** 1812 – 1816
- **Certeza:** opinión (card-opinion, data-certeza="debatido")
- **Excerpt:** En septiembre de 1812, San Martín fundó en Buenos Aires junto a Alvear, Zapiola y Julián Álvarez la Logia Lautaro, en homenaje al cacique mapuche que resistió la conquista española. La logia tenía objetivo declarado: independencia de América española. Actuó en política rioplatense hasta 1815, cuando la facción de Alvear fue derrotada. San Martín nunca subordinó su campaña militar a la logia — la usó como red política mientras mantuvo su agenda estratégica autónoma.
- **Detalle expandible:** La paradoja de la Logia Lautaro es que fue simultáneamente un instrumento de la Iglesia Católica (varios miembros eran sacerdotes) y una red de características masónicas (ritos, grados, juramentos, secreto). Esto no era contradicción para sus miembros: la masonería operativa del siglo XVIII no era necesariamente antirreligiosa, y la independencia americana era compatible con el catolicismo. La "paradoja Iglesia/masonería" que los historiadores posteriores proyectaron sobre la Logia no era percibida como tal por sus fundadores. La Logia tenía dos secciones: la "azul" (masónica ritual) y la "roja" (política operativa). San Martín operaba en la segunda.
- **Nota historiográfica:** La Gran Logia Unida de Inglaterra (carta 1979 a Maguire) afirmó que ninguna de estas organizaciones estaba registrada en sus archivos y que San Martín, Alvear y Zapiola nunca fueron miembros de logias bajo su jurisdicción. Investigaciones recientes en archivos ingleses (Ocampo, 2006) confirman que las organizaciones no fueron creadas bajo la protección de la Gran Logia de Londres. Esto no prueba que no existieran — prueba que eran redes paralelas no regulares. El debate sobre si eran "logias masónicas" en sentido estricto es semántico; su existencia como organizaciones secretas con fines políticos está documentada.
- **Fuentes:** Wikipedia ES, "Logia Lautaro"; Infobae, "San Martín y su vínculo con las logias" (2021); elarcondelahistoria.com "La Logia Lautaro"; Emilio Ocampo / Tumblr "Inglaterra, la Masonería y la Independencia de América".
- **Imagen Wikimedia:** Retratos de Alvear o retrato de San Martín.
- **Flag:** REQUIERE card-nota-historiografica.

---

### ENTRADA 5: Creación del Regimiento de Granaderos a Caballo
- **Año display:** 1812
- **Certeza:** hecho
- **Excerpt:** El 16 de marzo de 1812, el Primer Triunvirato reconoció a San Martín como Teniente Coronel y le encargó crear un cuerpo de caballería de elite. Eligió uno a uno a sus soldados — seleccionando por condición física, carácter y disciplina. El Regimiento de Granaderos a Caballo fue creado con el uniforme azul y rojo que San Martín diseñó personalmente. En diciembre de 1812 fue ascendido a Coronel del regimiento. El cuerpo existe hasta hoy como guardia de honor presidencial.
- **Detalle expandible:** La creación del regimiento fue el primer acto estratégico de San Martín en suelo rioplatense. No era un gesto simbólico: necesitaba un cuerpo de caballería pesada entrenado con los estándares europeos que él conocía. El proceso de selección fue exigente — se descartaron candidatos que no cumplían los criterios físicos y morales. La instrucción duró meses antes del primer combate (San Lorenzo, feb 1813). El nombre "Granaderos" remitía a la elite de infantería del ejército europeo (los soldados más altos y fuertes que lanzaban granadas); adaptado a caballería, indicaba la aspiración a un cuerpo de elite montado. El regimiento participó en todas las campañas hasta Ayacucho (1824) y es hoy la guardia de honor del Palacio Rosada.
- **Fuentes:** bicentenario.gob.pe (2023); casarosada.gob.ar, "A 211 años del Combate de San Lorenzo" (2024); recursosacademicos.net; Wikipedia ES "Regimiento de Granaderos a Caballo".
- **Imagen Wikimedia:** `File:Granadero_a_Caballo_de_San_Martín.jpg` o similar — verificar API en S01 executor.
- **Notas:** La fecha de creación formal es debatida entre feb y mar 1812 según la fuente; el consensus es 16 marzo 1812 para la designación de San Martín como comandante.

---

### ENTRADA 6: El combate de San Lorenzo
- **Año display:** 3 de febrero de 1813
- **Certeza:** hecho
- **Excerpt:** San Lorenzo fue la única batalla que San Martín libró en suelo argentino y el bautismo de fuego del Regimiento de Granaderos. Con 125 granaderos emboscados en el Convento de San Carlos, sorprendió a 250 realistas que desembarcaban del Río Paraná. El combate duró 15 minutos. Los realistas dejaron 40 muertos y 14 prisioneros. Los patriotas perdieron al soldado Juan Bautista Cabral, quien murió salvando a San Martín de ser aplastado por su caballo.
- **Detalle expandible:** El contexto estratégico era crítico: Montevideo — declarada capital provisional del virreinato — era la base naval española en el Atlántico Sur. Desde allí lanzaban incursiones fluviales por el Paraná para abastecer sus posiciones. San Martín recibió la orden de proteger la costa entre Zárate y Santa Fe. Cuando supo que barcos realistas habían anclado frente a San Lorenzo, cubrió 420 km en 5 días de verano para llegar antes. La táctica de emboscada —ocultar la caballería dentro del convento, prohibir el fuego, atacar solo con lanzas y sables— fue perfectamente ejecutada. El parte de San Martín al gobierno dice: "los granaderos de mi mando en su primer ensayo han agregado un nuevo triunfo a las armas de la patria." La Marcha de San Lorenzo, compuesta por Cayetano Silva (uruguayo) en 1901, inmortalizó el combate.
- **Fuentes:** Wikipedia ES, "Combate de San Lorenzo"; casarosada.gob.ar, "A 211 años del Combate de San Lorenzo" (2024); sanmartiniano.cultura.gob.ar (parte original transcripto); elhistoriador.com.ar (parte original).
- **Imagen Wikimedia:** `File:Combate_de_San_Lorenzo.jpg` — pintura histórica. Verificar disponibilidad 500px via API en executor.
- **Notas:** El número de realistas varía entre fuentes: el parte de San Martín dice 250; otras fuentes dicen 220. Usar 250 (fuente primaria: el parte del propio San Martín).

---

### ENTRADA 7: Cuyo y la preparación del Ejército de los Andes
- **Año display:** 1814 – 1816
- **Certeza:** hecho
- **Excerpt:** En 1814, San Martín pidió el gobierno de Cuyo, comprendiendo que la guerra no se ganaría en el Norte sino cruzando los Andes. Durante tres años transformó Mendoza en una fábrica de guerra: fundó talleres de armas, uniformes y pólvora; reclutó chilenos exiliados tras Rancagua (1814); incorporó esclavos libertos en batallones de infantería; construyó hospitales de campaña. Cuando el Ejército de los Andes cruzó la cordillera en enero de 1817, llevaba 5.200 soldados, 21 cañones y 9.000 mulas.
- **Detalle expandible:** La preparación del cruce fue una hazaña logística sin precedentes en América. San Martín diseñó cada detalle: los soldados marcharon sobre mulas para llegar frescos al combate; los caballos de batalla iban separados para conservarlos; la artillería fue fabricada en Cuyo porque traerla desde Buenos Aires era imposible. Usó una red de espías en Chile (organizada por Manuel Rodríguez) para conocer en tiempo real la posición de las fuerzas realistas. La incorporación de esclavos libertos fue una decisión táctica y moral: los batallones N.° 7 y 8 eran mayoritariamente negros y se convirtieron en el núcleo más combativo del Ejército de los Andes. El análisis de Tulio Halperin Donghi (*De la revolución de independencia a la confederación rosista*, 1972) señala que la gobernación de Cuyo fue el único período en que San Martín ejerció poder civil — y lo hizo con una eficiencia que contrastaba con el caos político de Buenos Aires.
- **Fuentes:** elhistoriador.com.ar; Infobae, "Maipú: bicentenario de la batalla" (2018); Wikipedia ES "Cruce de los Andes"; memoriachilena.gob.cl.
- **Imagen Wikimedia:** `File:San_Martín_en_los_Andes,_1817_(1908).jpg` (Augusto Ballerini, 1908) — verificar.

---

### ENTRADA 8: El cruce de los Andes
- **Año display:** Enero de 1817
- **Certeza:** hecho
- **Excerpt:** El 17 de enero de 1817 la vanguardia del Ejército de los Andes partió de Mendoza. El cruce se realizó en seis columnas por distintos pasos, para desorientar a los realistas. A temperaturas bajo cero, con racionamiento estricto, 5.200 soldados con 21 cañones atravesaron la cordillera más alta del hemisferio occidental. La operación duró 21 días. San Martín escribió a Guido antes de partir: "Si se consigue poner pie en llano, la cosa está asegurada. En fin, haremos cuanto se pueda para salir bien, pues si no, todo se lo lleva el diablo."
- **Detalle expandible:** El cruce fue comparado en la época con los de Aníbal y Napoleón — y superaba a ambos en escala logística. Napoleón cruzó los Alpes con 40.000 hombres pero en un solo paso; San Martín dispersó el ejército en seis columnas para fragmentar la respuesta realista. La sincronización fue perfecta: todas las columnas debían llegar a Chile en fechas calculadas para converger antes de que los realistas pudieran concentrar sus fuerzas. El Plan Maitland — propuesto en 1800 por el general británico Thomas Maitland para una posible conquista del Cono Sur — incluía el cruce de los Andes como paso estratégico; investigadores (Rodolfo Terragno, *Maitland y San Martín*, 2001) han argumentado que San Martín conocía ese plan. El 13 de enero de 1817, cuatro días antes de la partida, San Martín escribió a Guido detallando la sincronización de las columnas.
- **Fuentes:** norteinforma.com.ar (cita carta 13 ene 1817 a Guido); memoriachilena.gob.cl; elhistoriador.com.ar; Historia 396 Dialnet (artículo académico 2022).
- **Imagen Wikimedia:** `File:Cruce_de_los_Andes.jpg` — pintura clásica. Verificar API. Alternativa: `File:Cruce_Andes_1.jpg`.

---

### ENTRADA 9: Batalla de Chacabuco
- **Año display:** 12 de febrero de 1817
- **Certeza:** hecho
- **Excerpt:** Dieciséis días después de cruzar los Andes, San Martín aplastó al ejército realista en Chacabuco, a 55 km al norte de Santiago. La batalla duró pocas horas. Los realistas perdieron 600 prisioneros, 450 muertos y todo su armamento. Los patriotas perdieron menos de 100 hombres. El gobernador realista Marcó del Pont huyó y fue capturado. Santiago cayó en manos patriotas al día siguiente.
- **Detalle expandible:** Chacabuco no debería haber salido tan bien: San Martín quería atacar con la pinza clásica (O'Higgins por el este, Soler por el oeste) pero O'Higgins se adelantó impulsivamente antes de que Soler estuviera en posición. El plan se improvisó en combate. O'Higgins cargó de frente y fue rechazado; cuando Soler flanqueó, el colapso realista fue total. San Martín, en su parte al gobierno, elogió a ambos brigadieres por igual — absorbiendo la imprudencia táctica de O'Higgins en el mérito compartido de la victoria. Al día siguiente, el Cabildo de Santiago ofreció a San Martín la gobernación de Chile. Él la rechazó y propuso a O'Higgins. Esta decisión — renunciar al poder político disponible para continuar la campaña militar — anuncia el patrón que repetirá en 1822.
- **Fuentes:** Wikipedia ES "Batalla de Chacabuco"; elhistoriador.com.ar; museohistoriconacional.cultura.gob.ar; Dialnet/Historia 396 (artículo académico peer-reviewed, 2022).
- **Imagen Wikimedia:** `File:Batalla_de_Chacabuco_(1817).jpg` — buscar via API. Alternativa: `File:BatallaDeChacabuco.jpg`.

---

### ENTRADA 10: Cancha Rayada y Maipú — derrota y victoria definitiva
- **Año display:** 19 mar – 5 abr 1818
- **Certeza:** hecho
- **Excerpt:** El 19 de marzo de 1818, el general realista Osorio atacó de noche y por sorpresa al Ejército Unido en Cancha Rayada — 120 muertos, pánico en Santiago, rumores de que San Martín y O'Higgins habían muerto. Solo Las Heras salvó su división entera. En 17 días San Martín reorganizó 5.000 soldados. El 5 de abril de 1818, en Maipú, destruyó al ejército realista y aseguró la independencia de Chile.
- **Detalle expandible:** Cancha Rayada fue el único desastre militar documentado de San Martín — y Maipú fue su respuesta. La reorganización en 17 días, con un ejército diezmado y desmoralizado, en un país cuya capital estaba en pánico, es la demostración más clara de sus capacidades como comandante. En Maipú, los batallones de libertos (N.° 7 y N.° 8) fueron el factor desequilibrante: atacaron el centro realista con una ferocidad que cortó el eje de la formación enemiga. John Lynch (*Argentine Dictator*, 1981) señala que Maipú "significó la recuperación de la victoria que se había desperdiciado en Chacabuco" al no perseguir a los realistas en 1817. La escena pos-batalla — San Martín abrazando a O'Higgins herido en el campo de Maipú — es uno de los iconos más reproducidos de la independencia americana.
- **Fuentes:** Infobae, "Maipú: bicentenario" (2018); Billiken; izquierdadiario.es (análisis táctico); Lynch, J., *Argentine Dictator*, 1981 (citado en izquierdadiario).
- **Imagen Wikimedia:** `File:Batalla_de_Maipu.jpg` o `File:Encuentro_de_San_Martin_y_O'Higgins.jpg` — verificar API.

---

### ENTRADA 11: Campaña al Perú y el Protectorado
- **Año display:** 1820 – 1822
- **Certeza:** hecho
- **Excerpt:** En agosto de 1820, San Martín embarcó desde Valparaíso hacia el Perú con 4.400 soldados y una escuadra al mando de Lord Cochrane. El 28 de julio de 1821 proclamó la independencia del Perú en Lima. El Congreso peruano lo nombró "Protector del Perú". Durante su gobierno declaró la libertad de prensa, abolió la mita y fundó la Biblioteca Nacional. Sin embargo, no logró exterminar el núcleo realista en la sierra — esa tarea quedó para Bolívar.
- **Detalle expandible:** La campaña al Perú fue más política que militar. San Martín aplicó una estrategia de "guerra psicológica": en lugar de atacar Lima directamente, bloqueó los suministros y esperó que la población se volcara a la causa patriota. Funcionó: la ciudad se rindió sin combate mayor. Pero el virreinato más rico de América tenía una aristocracia criolla que desconfiaba de la independencia — temían perder sus privilegios tanto frente a España como frente a una revolución social. San Martín gobernó con moderación: no expropió, no ejecutó nobles realistas, intentó convencer. Esa moderación lo dejó sin base política cuando los realistas reforzaron sus posiciones en la sierra (Alto Perú). El gobierno de Buenos Aires — en manos de Rivadavia — le negó refuerzos y financiamiento. Para 1822, San Martín solo tenía una opción: Bolívar.
- **Fuentes:** bicentenario.gob.pe; elhistoriador.com.ar "La entrevista de Guayaquil y el retiro"; Wikipedia ES "José de San Martín"; Biblioteca Nacional del Perú (bnp.gob.pe, 2022).
- **Imagen Wikimedia:** Retrato Gil de Castro 1818 (ya identificado) — corresponde al período como Protector.

---

### ENTRADA 12: La entrevista de Guayaquil — el gran silencio de la historia
- **Año display:** 26–27 de julio de 1822
- **Certeza:** debatido (card-opinion, data-certeza="debatido")
- **Excerpt:** El 26 y 27 de julio de 1822, San Martín y Bolívar se reunieron en Guayaquil durante dos días, a solas y sin testigos. Al llegar, Bolívar le dijo: "Suelo colombiano te recibe" — Guayaquil ya había sido anexada a la Gran Colombia. Al regresar al Perú, San Martín renunció al Protectorado, convocó al Congreso Constituyente y abandonó el continente americano para siempre. Nadie sabe con certeza qué se dijo en esa reunión.
- **Detalle expandible:** Los hechos documentados: (1) La reunión duró dos días, en privado, sin actas ni testigos directos. (2) San Martín llegó en desventaja — Bolívar había tomado Guayaquil dos semanas antes con un ejército de 2.000 hombres y la había incorporado a Colombia. (3) San Martín llegó solo, con sus edecanes, desde una posición política debilitada (el Protectorado había fracasado; Buenos Aires le negaba apoyo). (4) Al regresar, renunció en semanas. Los documentos disponibles: una carta de San Martín a Bolívar (publicada en 1823 por Lafond de Lurcy) que San Martín nunca desmintió; y la "Memoria" dictada por Bolívar a su secretario Pérez dos días después — descubierta en Bogotá en 1905, con una versión diferente. Dos fuentes, dos versiones, sin árbitro.
- **Nota historiográfica (TRES POSICIONES):**
  - **Posición 1 — el renunciamiento voluntario** (Bartolomé Mitre, *Historia de San Martín*, t. III, 1887 — "la teoría del renunciamiento"): San Martín evaluó que la causa de la independencia se serviría mejor con un solo mando continental, cedió el protagonismo a Bolívar con generosidad política, y se retiró. La carta a Bolívar (Lafond de Lurcy, 1823) es auténtica y refleja su razonamiento. Defensores argentinos de esta posición: Mitre, Ricardo Rojas.
  - **Posición 2 — la celada bolivariana** (versión del edecán Rufino Guido; citada en Dialnet, *Procesos* 37, 2013): Bolívar "les ganó de mano" —tomó Guayaquil antes de la reunión para presentar un hecho consumado; en la reunión impuso condiciones que San Martín no podía cumplir. San Martín "cayó en una celada" (Borges, "Guayaquil", 1970, reuniendo las hipótesis conocidas). Esta posición es popular en Argentina.
  - **Posición 3 — acuerdo tácito de esferas de influencia** (síntesis contemporánea; Dialnet, 2022; bnp.gob.pe 2022): Ambos libertadores reconocieron mutuamente que el Perú ya no podía ser liberado por San Martín solo —sus fuerzas eran insuficientes sin apoyo de Buenos Aires— y que Bolívar tenía el ejército y el momentum político. San Martín cedió no por generosidad abstracta ni por derrota táctica, sino porque la aritmética militar era irrefutable. El retiro fue racional, no heroico ni derrotado.
  - **Lo que no se sabe:** el contenido exacto de la conversación, si hubo condiciones explícitas, si hubo antagonismo personal, y cuánto pesó la decisión de Rivadavia de abandonar a San Martín en la ecuación.
- **Fuentes:** Wikipedia ES "Entrevista de Guayaquil"; elhistoriador.com.ar "La entrevista de Guayaquil"; Dialnet *Procesos 37* (2013) — artículo académico con análisis de las dos versiones documentales; bnp.gob.pe (2022, Bicentenario); elarcondelahistoria.com "El enigma de Guayaquil".
- **Imagen Wikimedia:** `File:Encuentro_de_San_Martin_y_Bolivar_en_Guayaquil.jpg` — verificar. Alternativa: retrato de ambos por separado.
- **Flag:** REQUIERE card-nota-historiografica.

---

### ENTRADA 13: El retiro del poder — la negativa a las guerras civiles
- **Año display:** 1822 – 1824
- **Certeza:** hecho (con card-nota-certeza para la motivación)
- **Excerpt:** Al regresar a Buenos Aires en 1823, San Martín encontró un país en guerra civil entre unitarios y federales. El general Lavalle lo invitó a ponerse al frente del ejército unitario. San Martín se negó: en una carta a Godoy Cruz (1827), escribió que jamás desenvainó la espada en guerras entre hermanos. Volvió a Europa en 1824. Con este gesto, completó el patrón de toda su vida pública: usar el poder para la independencia, y no para nada más.
- **Detalle expandible:** La negativa de San Martín a involucrarse en las guerras civiles argentinas es uno de los actos más estudiados de su retiro. Tuvo múltiples oportunidades: regresó a Buenos Aires en 1823, estuvo en 1829 durante el caos político que llevó a Rosas al poder, y nunca aceptó ningún bando. Su contraste con contemporáneos como Lavalle —que fusiló al gobernador Dorrego en 1828— o Álvear —que se plegó a distintas facciones según el viento político— es marcado. Los documentos disponibles (cartas a Guido, a Godoy Cruz, a O'Higgins) muestran una posición coherente: la independencia era el objetivo, las guerras civiles eran el anti-objetivo. La frase más citada en este contexto — "jamás desenvainará su espada entre argentinos" — aparece en múltiples versiones; la formulación exacta varía según la carta. Usar con card-nota-certeza indicando la variación entre fuentes.
- **Fuentes:** elhistoriador.com.ar; Wikipedia ES; Mitre, *Historia de San Martín*, t. III.
- **Imagen Wikimedia:** Retrato tardío de San Martín (post-1840) — buscar via API.
- **Notas:** La frase exacta varía entre fuentes. Tratar como hecho la decisión de no intervenir; tratar como opinión atribuida la formulación de la frase.

---

### ENTRADA 14: El exilio y los últimos años en Europa
- **Año display:** 1824 – 1850
- **Certeza:** hecho
- **Excerpt:** San Martín vivió sus últimos 26 años en Europa — principalmente en Grand Bourg, Francia, y desde 1848 en Boulogne-sur-Mer. Mantuvo correspondencia activa con figuras de toda América. Recibió a Sarmiento en 1846 ("tenía el aspecto de un anciano venerable"). Redactó su testamento político en múltiples cartas. Murió el 17 de agosto de 1850 en Boulogne-sur-Mer, a los 72 años. Su corazón fue enterrado en Buenos Aires en 1880; sus restos volvieron a Argentina en 1880 y descansan en la Catedral Metropolitana.
- **Detalle expandible:** El exilio de San Martín no fue un retiro pasivo. Siguió con atención la política americana, rechazó múltiples invitaciones a regresar ("no quiero ser un estorbo ni un pretexto para nadie"), y mantuvo una imagen pública discreta que contrastaba con la de Bolívar — quien murió en 1830 exiliado y amargado, convencido de que "había arado en el mar". San Martín sobrevivió 20 años más a Bolívar y al régimen de Rosas, y vio el principio del proceso constitucional argentino. La visita de Sarmiento en 1846 en Grand Bourg — documentada en el propio *Facundo* y en la correspondencia de Sarmiento — es el único encuentro conocido entre San Martín y un intelectual de la Generación del 37. Sus últimas palabras al regresar sus restos en 1880 fueron recibidas en un país que finalmente comenzaba a reconocerlo como Padre de la Patria — título que no tuvo en vida.
- **Fuentes:** Wikipedia ES; elhistoriador.com.ar; Infobae (varios artículos biográficos); museosarmiento.cultura.gob.ar.
- **Imagen Wikimedia:** `File:San_Martín_Grand_Bourg.jpg` o retrato tardío — verificar API.

---

### ENTRADA 15: El legado — el general que no quiso el poder
- **Año display:** 1850 – hoy
- **Certeza:** opinión (card-opinion, data-certeza="opinión")
- **Excerpt:** San Martín es el único prócer de la independencia americana que libró sus campañas en tres países, rechazó el poder político disponible en los tres, y nunca fue derrotado en combate. Su contraste con Bolívar — que murió convencido de haber fallado — y con los caudillos argentinos de su época — que ejercieron el poder hasta el final — define su figura histórica. La pregunta historiográfica central es si ese retiro fue virtud, fatiga o estrategia. No hay consenso.
- **Detalle expandible:** Bartolomé Mitre construyó la imagen de San Martín como el militar puro, desinteresado del poder político, que Mitre interpretó como prueba de que la grandeza militar no necesita poder civil. Los revisionistas (Ricardo Rojas, *El santo de la espada*, 1933; José María Rosa) señalaron que esa imagen fue construida para legitimar a la elite liberal porteña que San Martín despreciaba — Rivadavia y luego Mitre mismo. La síntesis contemporánea (John Lynch, *San Martín: Argentine Soldier, American Hero*, Yale, 2009) reconoce la complejidad: San Martín tenía genuina aversión al poder civil, pero también era un realista que sabía cuándo el terreno político era irremediablemente hostil. El retiro fue simultáneamente virtud y cálculo.
- **Fuentes:** Lynch, J., *San Martín: Argentine Soldier, American Hero*, Yale University Press, 2009 (citado en múltiples fuentes); Rojas, R., *El santo de la espada*, 1933; Mitre, B., *Historia de San Martín*, 1887.
- **Imagen Wikimedia:** Retrato Gil de Castro o retrato tardío.
- **Flag:** REQUIERE card-opinion con blockquote atribuida a lectura historiográfica (Lynch, Mitre, Rojas).

---

## Decisions Needed Before S02

Las siguientes decisiones se toman formalmente aquí para que S02 las consuma:

1. **Posición del sub-período:** `#rev-san-martin` se inserta ENTRE `#rev-1800-1820` y `#rev-1820-1835` (después de la línea `</div><!-- /#rev-1800-1820 -->`).

2. **Granularidad de batallas:** 15 cards en la estructura detallada arriba. San Lorenzo: card propia. Cruce: card propia. Chacabuco: card propia. Cancha Rayada + Maipú: un par en una sola card. Campaña al Perú: card propia. Guayaquil: card debate. Retiro: card propia.

3. **Certeza distribution:** 9 hecho, 3 debatido (logias, Guayaquil, legado), 1 opinión (legado card-15), 1 hecho con card-nota-certeza (retiro). Cumple D009/D010.

4. **Cards que requieren card-nota-historiografica:** Entrada 3 (logias/regreso), Entrada 4 (Logia Lautaro), Entrada 12 (Guayaquil). Las tres siguen el patrón tres-posiciones de S16-3.

5. **Sub-nav label:** `1812–1822` con sublabel `San Martín Libertador`.

6. **Timeline markers:** 1812 (below), 1813 (above), 1817 (above), 1818 (below) — 4 marcadores nuevos.

---

## Wikimedia Images — URLs a Verificar en S01 Executor

El executor de S01 debe verificar estas URLs via Wikimedia API antes de escribirlas en el draft final. Las siguientes son las mejores candidatas identificadas:

| Card | Archivo candidato | Verificación |
|------|------------------|-------------|
| 1 — Infancia | `General_José_de_San_Martín_por_Gil_de_Castro.jpg` | VERIFICADO — ya en SP1-5 de index.html |
| 5 — Granaderos | `Regimiento de Granaderos a Caballo.jpg` | PENDIENTE API |
| 6 — San Lorenzo | `Combate_de_San_Lorenzo.jpg` | PENDIENTE API |
| 7 — Cuyo | `San_Martín_en_los_Andes,_1817_(1908).jpg` | PENDIENTE API |
| 8 — Cruce | `Cruce_de_los_Andes.jpg` | PENDIENTE API (resultado de búsqueda confirma existencia) |
| 9 — Chacabuco | `Batalla_de_Chacabuco_(1817).jpg` | PENDIENTE API |
| 10 — Maipú | `Batalla_de_Maipu.jpg` | PENDIENTE API |
| 12 — Guayaquil | `Encuentro_de_San_Martin_y_Bolivar_en_Guayaquil.jpg` | PENDIENTE API |

**Fallback protocol:** Si alguna imagen no tiene thumb 500px, usar retrato Gil de Castro (ya verificado) como fallback universal para cartas de San Martín; usar retrato de O'Higgins o Bolívar para cartas compartidas.

---

## Constraints

- Zero new JavaScript — todo auto-descubierto por JS existente
- Imágenes: solo URLs Wikimedia verificadas via API
- HTML entities para caracteres no-ASCII en bloques verbatim (patrón D053)
- `card-opinion` class para `data-certeza="debatido"` (patrón D052)
- El conector alberdi entre SP1 y SP2 (líneas 1335–1340) debe revisarse para asegurar coherencia narrativa con el nuevo sub-período insertado antes

## Common Pitfalls

- **Marcadores timeline densos 1812–1818:** usar alternating above/below sistemáticamente para evitar overlap (patrón D025/KNOWLEDGE.md)
- **Sub-nav overflow:** agregar link con label corto — verificar que el sub-nav no hace overflow horizontal en 320px
- **Certeza attribute encoding:** usar `data-certeza="debatido"` (sin acento) para las cards de debate, `data-certeza="opini&#xF3;n"` (con entidad) para cards de opinión pura — consistente con S17 (D057)
- **SP1-5 coexistencia:** la card panorámica SP1-5 en `#rev-1800-1820` NO se elimina; el nuevo sub-período la amplía con profundidad

---

## Sources

- Bartolomé Mitre, *Historia de San Martín y de la emancipación sudamericana*, t. I–III, Buenos Aires, 1887 — fuente canónica
- John Lynch, *San Martín: Argentine Soldier, American Hero*, Yale University Press, 2009 — síntesis contemporánea en inglés
- Ricardo Rojas, *El santo de la espada*, Losada, Buenos Aires, 1933 — biógrafo romántico
- Instituto Nacional Sanmartiniano: sanmartiniano.cultura.gob.ar
- elhistoriador.com.ar (Felipe Pigna, editor)
- bicentenario.gob.pe — Gobierno del Perú, fuente académica reciente
- Wikipedia ES "José de San Martín", "Logia Lautaro", "Combate de San Lorenzo", "Batalla de Chacabuco", "Entrevista de Guayaquil"
- Dialnet: artículos académicos peer-reviewed sobre Chacabuco (Historia 396, 2022) y Guayaquil (Procesos 37, 2013)
- Emilio Ocampo, "Inglaterra, la Masonería y la Independencia de América", *Todo es Historia*, 2006 (versión Tumblr)
