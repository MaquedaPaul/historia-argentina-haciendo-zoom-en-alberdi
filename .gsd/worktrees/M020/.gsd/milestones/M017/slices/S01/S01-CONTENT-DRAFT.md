# S01-CONTENT-DRAFT — 6 Cards Urquiza (URQ-1 a URQ-6)

**Fecha:** 2026-03-24
**Milestone:** M017 — Urquiza: Perfil y Trayectoria
**Slice:** S01 — Investigación y borrador
**Próxima tarea:** T02 verificará las 2 URLs de imagen pendientes vía API Wikimedia Commons
**Insumo directo de:** S02 — integración HTML en `index.html`

---

## Propósito y uso para S02

Este archivo es el único output de S01. S02 lo consume mecánicamente para insertar 6 cards HTML en `index.html`. El executor de S02 NO necesita re-investigar — todos los hechos están verificados aquí con fuentes explícitas. El formato de cada sección refleja directamente la estructura del card HTML.

**Punto de inserción en index.html:** Buscar el comentario `<!-- /#rev-1835-1852 -->` como anchor grep-estable. Insertar el nuevo bloque `<div id="rev-urquiza-perfil" ...>` INMEDIATAMENTE ANTES de ese comentario. NO usar número de línea — el comentario es el anchor.

**Sub-nav link a añadir:** En la lista `.sub-nav__list` dentro de `#periodo-revolucion`, añadir el 8° link:
```html
<a href="#rev-urquiza-perfil" class="sub-nav__link">1801–1851<span class="sub-nav__link-label">Urquiza: Perfil</span></a>
```

**Sub-nav count:** Este worktree (M017) tiene 7 sub-nav links. Tras S02 tendrá 8. Verificar: `grep -c 'sub-nav__link' index.html` debe devolver 8.

---

## Tabla resumen de las 6 cards

| ID | Título | data-certeza | CSS class | data-id |
|----|--------|-------------|-----------|---------|
| URQ-1 | Origen entrerriano: familia, estancia, formación (1801–1819) | `hecho` | `card-hecho` | `URQ-1` |
| URQ-2 | De comerciante a caudillo federal (1826–1841) | `hecho` | `card-hecho` | `URQ-2` |
| URQ-3 | Gobernador de Entre Ríos: orden, prosperidad y tensión (1841–1851) | `hecho` | `card-hecho` | `URQ-3` |
| URQ-4 | El Pronunciamiento del 1° de mayo de 1851 | `hecho` | `card-hecho` | `URQ-4` |
| URQ-5 | ¿Traición o decisión de Estado? El debate historiográfico | `debatido` | `card-opinion` | `URQ-5` |
| URQ-6 | Urquiza y Alberdi: la convergencia de dos proyectos | `opini&#xF3;n` | `card-opinion` | `URQ-6` |

---

## URQ-1

**Título:** Origen entrerriano: familia, estancia, formación (1801–1819)
**data-certeza=** `"hecho"`
**CSS class:** `card-hecho`
**data-id:** `URQ-1`
**Fecha display:** 18 oct 1801

### Excerpt

Justo José de Urquiza nació el 18 de octubre de 1801 en el Talar del Arroyo Largo —hoy llamado Arroyo Urquiza— en el departamento Uruguay de la provincia de Entre Ríos. Su padre, José Narciso de Urquiza y Álzaga, era un comerciante y estanciero vasco oriundo de Castro Urdiales; su madre, María Cándida García González, era criolla porteña. Hacia 1814 o 1815, siendo adolescente, fue enviado a Buenos Aires para estudiar en el Colegio de San Carlos (Real), institución que cerró antes de que pudiera graduarse. Regresó a Entre Ríos alrededor de 1818–1819 y se dedicó inicialmente al comercio, sentando las bases de lo que sería una notable fortuna terrateniente.

### Fuentes

1. Museo Nacional Palacio San José — partida de bautismo reproducida en facsímil, museo estatal: museourquiza.cultura.gob.ar / gobierno.ar
2. AGN (Archivo General de la Nación), Fondo Urquiza 1800–1880: atom.mininterior.gob.ar
3. Bosch, Beatriz, *Urquiza y su tiempo*, EUDEBA, Buenos Aires (edición consultada vía laciudadrevista.com)
4. casarosada.gob.ar — perfil biográfico oficial

### Nota de imagen

- **Imagen:** `Justo_José_de_Urquiza.jpg`
- **Estado:** Ya en uso en `index.html` línea ~1636 — REUTILIZABLE sin nueva verificación.
- **Descripción:** Retrato al óleo atribuido a Josefa Díaz y Clucellas (ca. 1880). Wikimedia Commons, dominio público. Thumb 500px confirmado.

---

## URQ-2

**Título:** De comerciante a caudillo federal (1826–1841)
**data-certeza=** `"hecho"`
**CSS class:** `card-hecho`
**data-id:** `URQ-2`
**Fecha display:** 1826–1841

### Excerpt

Desde su regreso a Entre Ríos, Urquiza combinó el comercio y la estancia con la política provincial. En 1826 fue electo diputado provincial y adoptó públicamente la causa federal, oponiéndose a la constitución unitaria de ese año. En 1832 el gobernador Pascual Echagüe lo nombró Comandante General del Segundo Departamento Principal de Entre Ríos, consolidando su peso militar en la región. A partir de 1836 Juan Manuel de Rosas lo puso al mando de la división federal de observación en la frontera uruguaya; durante los años siguientes combatió en Pago Largo (1839) y Cagancha (1839) bajo Echagüe, y en 1837 fue ascendido a coronel mayor, forjando la reputación militar que lo haría insustituible en el Litoral federalista.

### Fuentes

1. AGN, Fondo Urquiza 1800–1880: atom.mininterior.gob.ar
2. casarosada.gob.ar — perfil biográfico oficial
3. Lynch, John, *Argentine Dictator: Juan Manuel de Rosas 1829–1852*, Oxford University Press, 1981 (ya citado en el sitio)

### Nota de imagen

- No se asigna imagen nueva a esta card. La narrativa de combates militares puede cubrirse con la imagen del retrato (URQ-1) si el executor de S02 necesita cubrir visualmente el bloque.

---

## URQ-3

**Título:** Gobernador de Entre Ríos: orden, prosperidad y tensión (1841–1851)
**data-certeza=** `"hecho"`
**CSS class:** `card-hecho`
**data-id:** `URQ-3`
**Fecha display:** 1841–1851

### Excerpt

El 15 de diciembre de 1841 la Legislatura entrerriana eligió a Urquiza gobernador en reemplazo de Pascual Echagüe; fue reelecto en 1845 y 1849. Bajo su gobierno, Entre Ríos se convirtió en la provincia más próspera del interior: extendió la ganadería, impulsó los saladeros, mejoró caminos y puertos fluviales, y fundó el Colegio Nacional de Concepción del Uruguay. <span class="card-nota-certeza">[Nota: la tensión con Rosas sobre el control del comercio exterior se desarrolló gradualmente entre 1837 y 1851 — no hay una fecha exacta de ruptura; las fuentes coinciden en que la fricción fue creciente, no abrupta.]</span> Las restricciones rosistas sobre el comercio con Montevideo y el Tratado de Alcaraz (1846) —desaprobado por Rosas— mostraron que los intereses entrerrianos y el proyecto de Rosas habían comenzado a divergir de forma irreversible.

### Fuentes

1. SciELO / *Almanack* (2021, peer-reviewed): *Una lectura del Pronunciamiento de Urquiza de 1851*, scielo.br
2. casarosada.gob.ar — perfil biográfico oficial
3. Halperin Donghi, Tulio, *De la revolución de independencia a la confederación rosista*, Paidós, Buenos Aires, 1972 (ya citado en el sitio)
4. Bosch, Beatriz, *Urquiza y su tiempo*, EUDEBA

### Nota de imagen

- **Imagen:** `Palacio_San_José_Fachada.JPG`
- **Estado:** [CONFIRMADO: filename corregido — el filename sugerido `Palacio_San_José_(Entre_Ríos).jpg` no existe en Commons; el correcto es `Palacio_San_José_Fachada.JPG` (pageid 1709857, 1632×1224px)]
- **Thumburl 500px:** `https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Palacio_San_Jos%C3%A9_Fachada.JPG/500px-Palacio_San_Jos%C3%A9_Fachada.JPG`
- **URL original:** `https://upload.wikimedia.org/wikipedia/commons/8/80/Palacio_San_Jos%C3%A9_Fachada.JPG`
- **Descripción:** Fachada del Palacio San José en las cercanías de Concepción del Uruguay, Entre Ríos. Residencia de Justo José Urquiza. Wikimedia Commons, dominio público.

---

## URQ-4

**Título:** El Pronunciamiento del 1° de mayo de 1851
**data-certeza=** `"hecho"`
**CSS class:** `card-hecho`
**data-id:** `URQ-4`
**Fecha display:** 1° may 1851

### Excerpt

El 1° de mayo de 1851 la Legislatura de Entre Ríos, reunida en Concepción del Uruguay, "aceptó las repetidas renuncias" que Juan Manuel de Rosas presentaba anualmente como formalidad política y que contaba con que serían rechazadas. Al aceptarlas, Entre Ríos reasumió soberanamente la dirección de sus relaciones exteriores en virtud del Pacto Federal del 4 de enero de 1831, sustituyó el lema "¡Mueran los salvajes unitarios!" por "¡Mueran los enemigos de la organización nacional!", y formó alianza con Corrientes, el Imperio del Brasil y Montevideo el 29 de mayo siguiente. En menos de nueve meses, el Ejército Grande —formado bajo el mando de Urquiza— derrotó a Rosas en la batalla de Caseros el 3 de febrero de 1852, poniendo fin a dos décadas de gobierno federal rosista.

### Fuentes

1. SciELO / *Almanack* (2021, peer-reviewed): *Una lectura del Pronunciamiento de Urquiza de 1851*, scielo.br
2. Wikipedia ES — "Pronunciamiento de Urquiza", con texto primario parcial citado de fuentes concordantes: es.wikipedia.org
3. entrerios.gov.ar — historia provincial oficial
4. todo-argentina.net — cronología verificada

### Nota de imagen

- **Imagen:** `Daguerrotipo_de_Justo_José_de_Urquiza_(recorte).jpg`
- **Estado:** [CONFIRMADO: filename correcto — existe en Commons con pageid 92037693; imagen 421×540px (< 500px ancho, sin thumb path disponible — se usa URL del archivo original per KNOWLEDGE.md)]
- **URL (original = thumb):** `https://upload.wikimedia.org/wikipedia/commons/2/2e/Daguerrotipo_de_Justo_Jos%C3%A9_de_Urquiza_%28recorte%29.jpg`
- **Descripción:** Daguerrotipo de Justo José de Urquiza (recorte), ca. 1852, atribuido a Charles D. Fredricks. Wikimedia Commons, dominio público.

---

## URQ-5

**Título:** ¿Traición o decisión de Estado? El debate historiográfico
**data-certeza=** `"debatido"`
**CSS class:** `card-opinion`
**data-id:** `URQ-5`
**Fecha display:** 1851–1852

### Excerpt

El Pronunciamiento de 1851 generó una fractura historiográfica que persiste hasta hoy. La corriente revisionista —representada por Julio Irazusta y el revisionismo federal— sostiene que Urquiza traicionó a Rosas, al federalismo y a la soberanía nacional al aliarse con el Imperio del Brasil y los unitarios; desde esta perspectiva, el acto fue una ruptura de las lealtades federales por motivos de interés personal y ambición política. [PARÁFRASIS — NO USAR COMO CITA DIRECTA] La corriente liberal y de síntesis —representada por John Lynch y Tulio Halperin Donghi— argumenta que el Pronunciamiento fue un acto soberano fundado en el mismo Pacto Federal de 1831 que le había otorgado a Rosas la delegación de las relaciones exteriores, y que cualquier provincia podía legítimamente retirarle; los motivos económicos (libre navegación de los ríos, comercio sin restricciones) y constitucionales (organización nacional que Rosas vetaba) lo hacen comprensible como decisión de Estado, no como traición personal. [PARÁFRASIS — NO USAR COMO CITA DIRECTA]

### Nota historiográfica para el HTML

Usar `<p class="card-nota-historiografica">` con la estructura de dos posiciones:
- **Posición revisionista:** Irazusta, Julio — *Ensayo sobre Rosas* (1941) y escritos posteriores; Brienza, Hernán, *Urquiza, el salvaje*, Aguilar, 2017 (perspectiva crítica: "el traidor que constituyó una nación")
- **Posición liberal/síntesis:** Lynch, John, *Argentine Dictator*, Oxford, 1981, cap. 10; Halperin Donghi, Tulio, *De la revolución de independencia*, Paidós, 1972; Domínguez Arribas, Javier, *El enemigo unitario en el discurso rosista*, *Estudios Americanos* (CSIC)

### Fuentes

1. Domínguez Arribas, Javier, *El enemigo unitario en el discurso rosista*, *Estudios Americanos* (CSIC): estudiosamericanos.revistas.csic.es
2. Lynch, John, *Argentine Dictator*, Oxford University Press, 1981, cap. 10
3. Halperin Donghi, Tulio, *De la revolución de independencia*, Paidós, 1972
4. Brienza, Hernán, *Urquiza, el salvaje*, Aguilar, Buenos Aires, 2017

### Nota de imagen

- **Imagen:** `Justo_José_de_Urquiza_(retrato).jpg`
- **Estado:** Ya en uso en `index.html` línea ~2328 — REUTILIZABLE sin nueva verificación.
- **Descripción:** Retrato de Urquiza (identificado como "retrato"). Wikimedia Commons, dominio público.

---

## URQ-6

**Título:** Urquiza y Alberdi: la convergencia de dos proyectos
**data-certeza=** `"opini&#xF3;n"`
**CSS class:** `card-opinion`
**data-id:** `URQ-6`
**Fecha display:** 1851–1853

### Excerpt

Desde el exilio chileno, Juan Bautista Alberdi y otros publicistas de la Generación del 37 comenzaron a ver en Urquiza al caudillo capaz de convocar el congreso constituyente que Rosas había bloqueado durante dos décadas. Jorge Mayer y Tulio Halperin Donghi señalan que la convergencia entre el proyecto constitucional alberdiano y la voluntad de organización de Urquiza no fue accidental: ambos perseguían la misma meta —una constitución que habilitara la inmigración, el libre comercio y la inversión extranjera— aunque desde trayectorias muy distintas. [PARÁFRASIS — NO USAR COMO CITA DIRECTA] Cuando Urquiza venció en Caseros, esa convergencia se volvió programa de gobierno: las *Bases y puntos de partida* (1852) de Alberdi llegaron a manos de Urquiza en semanas, y la Constitución de 1853 siguió su arquitectura de modo reconocible.

**⚠ AVISO PARA S02:** La cita directa de Alberdi que ya está en `index.html` líneas ~2274–2276 NO debe repetirse en este card. Este excerpt usa paráfrasis atribuida sin nuevo blockquote de Alberdi — hay ya múltiples `alberdi-quote` en el sitio.

### Fuentes

1. Mayer, Jorge M., *Alberdi y su tiempo*, EUDEBA, Buenos Aires, 1963 (ya citado en el sitio)
2. Halperin Donghi, Tulio, *De la revolución de independencia*, Paidós, 1972
3. casarosada.gob.ar — relación Urquiza–Alberdi

### Nota de imagen

- No se asigna imagen nueva a esta card. URQ-6 es una card de conexión narrativa; la ausencia de imagen es intencional para dar ritmo visual al bloque. Si S02 decide añadir una, `Justo_José_de_Urquiza_(retrato).jpg` es la única disponible y ya está en uso.

---

## Notas de inserción HTML para S02

### Punto de inserción

Buscar el anchor grep-estable `<!-- /#rev-1835-1852 -->` en `index.html`. Insertar el nuevo bloque INMEDIATAMENTE ANTES de ese comentario (que cierra el sub-período 1835–1852). El bloque nuevo queda entre el cierre de `#rev-1835-1852` y el conector Alberdi SP3→SP4.

**Patrón de búsqueda para splice:**
```
<!-- /#rev-1835-1852 -->
```

### Estructura HTML del nuevo sub-período

```html
<div id="rev-urquiza-perfil" class="sub-period reveal reveal-fade">
  <h3 class="sub-period__title">Urquiza: Perfil y Trayectoria (1801–1851)</h3>
  <div class="events-grid events-grid--certeza" aria-label="Cards sobre Urquiza, 1801–1851">
    <!-- URQ-1: card-hecho -->
    <!-- URQ-2: card-hecho -->
    <!-- URQ-3: card-hecho (con card-nota-certeza en el excerpt) -->
    <!-- URQ-4: card-hecho -->
    <!-- URQ-5: card-opinion con data-certeza="debatido" -->
    <!-- URQ-6: card-opinion con data-certeza="opini&#xF3;n" -->
  </div>
</div><!-- /#rev-urquiza-perfil -->
```

### Recordatorios de certeza para el T02 Recipe

- **URQ-5:** `data-certeza="debatido"` + class `card-opinion` (D052, D058). Indicador visual: ⚖
- **URQ-6:** `data-certeza="opini&#xF3;n"` con entidad HTML `&#xF3;` para la ó (D053, D057). Class `card-opinion`. Indicador visual: 💬
- **URQ-3:** Incluir `<span class="card-nota-certeza">` inline en el excerpt (ver texto arriba)

### Sub-nav link (8° elemento)

Añadir en la lista `.sub-nav__list` de `#periodo-revolucion`:
```html
<a href="#rev-urquiza-perfil" class="sub-nav__link">1801–1851<span class="sub-nav__link-label">Urquiza: Perfil</span></a>
```

El worktree M017 parte de 7 sub-nav links. Tras S02: 8 links. Verificar: `grep -c 'sub-nav__link' index.html` → 8.

### Estado de imágenes al fin de T01

| Card | Imagen | Estado |
|------|--------|--------|
| URQ-1 | `Justo_José_de_Urquiza.jpg` | ✅ CONFIRMADO — en uso línea ~1636 |
| URQ-2 | (ninguna) | N/A |
| URQ-3 | `Palacio_San_José_Fachada.JPG` | ✅ CONFIRMADO — filename corregido (sugerido no existía en Commons); thumburl 500px verificado vía API |
| URQ-4 | `Daguerrotipo_de_Justo_José_de_Urquiza_(recorte).jpg` | ✅ CONFIRMADO — filename correcto existe en Commons (421×540px; URL original = thumb, imagen < 500px) |
| URQ-5 | `Justo_José_de_Urquiza_(retrato).jpg` | ✅ CONFIRMADO — en uso línea ~2328 |
| URQ-6 | (ninguna) | N/A |

**T02 debe verificar exactamente 2 filenames antes de que S02 integre las imágenes.** Si algún filename no existe en Commons, usar `list=search&srnamespace=6` para encontrar el correcto. Actualizar este archivo con los resultados.
