---
estimated_steps: 6
estimated_files: 2
---

# T01: Build and splice Urquiza HTML block into index.html

**Slice:** S02 — Integración HTML
**Milestone:** M017

## Description

Construir el bloque HTML completo del sub-período Urquiza (6 cards URQ-1–URQ-6) y aplicarlo en dos puntos de `index.html`: (1) añadir el 8° link al sub-nav, y (2) insertar el bloque del sub-período inmediatamente antes del comentario `<!-- /#rev-1835-1852 -->`. No hay cambios de CSS ni JS — todos los patrones usados ya existen en el archivo.

El contenido de las cards viene de `S01-CONTENT-DRAFT.md` (ya verificado). Este task es mecánico: transcribir correctamente los datos del draft al HTML siguiendo los templates existentes.

## Steps

1. **Pre-flight checks:** Ejecutar los greps de estado inicial para confirmar punto de partida:
   ```bash
   grep -c 'sub-nav__link' index.html          # → 7
   grep -n '/#rev-1835-1852' index.html         # → nota el número de línea
   grep "Justo_Jos" index.html | head -3        # → confirmar URL exacta URQ-1
   ```
   Si algún valor es distinto de lo esperado, leer las líneas relevantes antes de continuar.

2. **Escribir el bloque HTML a un archivo temporal:** Usar la herramienta `Write` (NO heredoc de bash) para crear `.gsd/tmp/urquiza-cards.html` con el bloque completo del sub-período. El contenido exacto se especifica en la sección "T02 Recipe HTML" más abajo.

3. **Aplicar Edit 1 — Sub-nav:** Añadir el 8° link inmediatamente después del 7° link existente:
   - `oldText`: la línea con `href="#rev-1852-1860"` (el 7° link actual, el último)
   - `newText`: esa misma línea + la nueva línea del 8° link
   - Resultado esperado: `grep -c 'sub-nav__link' index.html` → 8

4. **Aplicar Edit 2 — Body:** Insertar el sub-período completo antes del cierre del bloque 1835–1852:
   - `oldText`: exactamente `        </div><!-- /#rev-1835-1852 -->`
   - `newText`: el contenido del archivo `.gsd/tmp/urquiza-cards.html` + la misma línea `        </div><!-- /#rev-1835-1852 -->`
   - **CRÍTICO:** El nuevo bloque va ANTES del cierre de `#rev-1835-1852`, creando un nuevo sub-período sibling — NO dentro de `#rev-1835-1852`.

5. **Verificar los 8 checks del slice:**
   ```bash
   grep -c 'sub-nav__link' index.html                     # → 8
   grep -c 'id="rev-urquiza-perfil"' index.html           # → 1
   grep -c 'data-id="URQ-' index.html                     # → 6
   grep -c 'data-id="URQ-5"' index.html                   # → 1
   grep 'opini&#xF3;n' index.html | grep -c 'URQ-6'       # → 1
   grep -A5 'URQ-3' index.html | grep -c 'card-nota-certeza'  # → 1
   grep -c '/#rev-1835-1852' index.html                   # → 1
   node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK'); } catch(e) { if(e instanceof SyntaxError) console.error('SYNTAX:', e.message); else console.log('OK'); }"
   ```

6. **Limpiar:** Borrar `.gsd/tmp/urquiza-cards.html` si todos los checks pasan.

## Must-Haves

- [ ] Sub-nav tiene 8 links (`grep -c 'sub-nav__link' index.html` → 8)
- [ ] `id="rev-urquiza-perfil"` presente exactamente 1 vez
- [ ] 6 cards con `data-id="URQ-[1-6]"` presentes
- [ ] URQ-5: `data-certeza="debatido"` + class `card-opinion` + certeza-icon `⚖`
- [ ] URQ-6: `data-certeza="opini&#xF3;n"` (entidad HTML &#xF3;) + class `card-opinion` + certeza-icon `&#x1F4AC;`
- [ ] URQ-3 excerpt contiene `<span class="card-nota-certeza">`
- [ ] URQ-4 imagen usa URL original (no /thumb/) con `width="100%"` (imagen < 500px)
- [ ] URQ-6 NO contiene nuevo `<blockquote>` de Alberdi
- [ ] Anchor `<!-- /#rev-1835-1852 -->` intacto (solo 1 ocurrencia)
- [ ] app.js pasa el check de sintaxis con `new Function()`

## Verification

- `grep -c 'data-id="URQ-' index.html` → exactamente 6
- `grep -c 'sub-nav__link' index.html` → exactamente 8
- `grep -c '/#rev-1835-1852' index.html` → exactamente 1 (el anchor de cierre sigue intacto)
- `node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK'); } catch(e) { if(e instanceof SyntaxError) console.error('SYNTAX:', e.message); else console.log('OK'); }"` → "OK"

## Inputs

- `index.html` — estado inicial: 7 sub-nav links, anchor `<!-- /#rev-1835-1852 -->` en línea ~2270, sin sección `#rev-urquiza-perfil`
- `.gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md` — fuente de verdad para todos los textos, certezas, fuentes e imágenes de URQ-1 a URQ-6

### Datos de imagen confirmados (de S01)

| Card | URL de imagen | Atributo especial |
|------|--------------|-------------------|
| URQ-1 | `https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Justo_Jos%C3%A9_de_Urquiza.jpg/500px-Justo_Jos%C3%A9_de_Urquiza.jpg` | — (confirmar con grep antes de usar) |
| URQ-2 | (ninguna) | — |
| URQ-3 | `https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Palacio_San_Jos%C3%A9_Fachada.JPG/500px-Palacio_San_Jos%C3%A9_Fachada.JPG` | — |
| URQ-4 | `https://upload.wikimedia.org/wikipedia/commons/2/2e/Daguerrotipo_de_Justo_Jos%C3%A9_de_Urquiza_%28recorte%29.jpg` | `width="100%"` (imagen 421×540px, sin thumb) |
| URQ-5 | `https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Justo_Jos%C3%A9_de_Urquiza_%28retrato%29.jpg/500px-Justo_Jos%C3%A9_de_Urquiza_%28retrato%29.jpg` | — |
| URQ-6 | (ninguna) | — |

**⚠ Para URQ-1:** El executor DEBE hacer `grep "Justo_Jos" index.html | head -3` y copiar la URL exacta que ya está en uso en el archivo. El research doc dice `/2/24/` pero verifica siempre contra el archivo real.

### Sub-nav Edit 1 — exacta

oldText (línea única, tal como aparece en el archivo):
```
          <a href="#rev-1852-1860" class="sub-nav__link">1852–1860<span class="sub-nav__link-label">Organización Nacional</span></a>
```

newText (misma línea + nueva línea):
```
          <a href="#rev-1852-1860" class="sub-nav__link">1852–1860<span class="sub-nav__link-label">Organización Nacional</span></a>
          <a href="#rev-urquiza-perfil" class="sub-nav__link">1801–1851<span class="sub-nav__link-label">Urquiza: Perfil</span></a>
```

### Body Edit 2 — anchor exacto

oldText (con la indentación exacta de 8 espacios):
```
        </div><!-- /#rev-1835-1852 -->
```

newText: el bloque completo del sub-período (ver "T02 Recipe HTML" abajo) + la misma línea de cierre.

## T02 Recipe HTML

El executor debe escribir exactamente este bloque en `.gsd/tmp/urquiza-cards.html` usando la herramienta `Write`. Luego insertar su contenido en index.html justo antes de `        </div><!-- /#rev-1835-1852 -->`.

```html
        <div id="rev-urquiza-perfil" class="sub-period reveal reveal-fade">
          <h3 class="sub-period__title">Urquiza: Perfil y Trayectoria (1801&#x2013;1851)</h3>
          <div class="events-grid events-grid--certeza" aria-label="Cards sobre Urquiza, 1801&#x2013;1851">

            <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" data-id="URQ-1" style="--reveal-delay: 0ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">&#x2713;</span>
                <span class="card-certeza-label">Hecho documentado</span>
              </div>
              <div class="card-image">
                <img src="URQUIZA_IMG_URL_PLACEHOLDER" alt="Retrato al &#xF3;leo de Justo Jos&#xE9; de Urquiza. Gobernador de Entre R&#xED;os, caudillo federal y promotor de la Constituci&#xF3;n de 1853." loading="lazy">
              </div>
              <span class="event-card__year">18 oct 1801</span>
              <h3 class="event-card__title">Origen entrerriano: familia, estancia, formaci&#xF3;n (1801&#x2013;1819)</h3>
              <p class="event-card__excerpt">Justo Jos&#xE9; de Urquiza naci&#xF3; el 18 de octubre de 1801 en el Talar del Arroyo Largo &#x2014;hoy llamado Arroyo Urquiza&#x2014; en el departamento Uruguay de la provincia de Entre R&#xED;os. Su padre, Jos&#xE9; Narciso de Urquiza y &#xC1;lzaga, era un comerciante y estanciero vasco ori&#xFA;ndo de Castro Urdiales; su madre, Mar&#xED;a C&#xE1;ndida Garc&#xED;a Gonz&#xE1;lez, era criolla porte&#xF1;a. Hacia 1814 o 1815 fue enviado a Buenos Aires para estudiar en el Colegio de San Carlos; regres&#xF3; a Entre R&#xED;os alrededor de 1818&#x2013;1819 y se dedic&#xF3; inicialmente al comercio, sentando las bases de lo que ser&#xED;a una notable fortuna terrateniente.</p>
              <footer class="card-source">
                <span class="card-source__icon" aria-hidden="true">&#x1F4C4;</span>
                <cite>Bosch, B., <em>Urquiza y su tiempo</em>, EUDEBA. AGN, Fondo Urquiza 1800&#x2013;1880. Museo Nacional Palacio San Jos&#xE9;, partida de bautismo.</cite>
              </footer>
            </article>

            <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" data-id="URQ-2" style="--reveal-delay: 80ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">&#x2713;</span>
                <span class="card-certeza-label">Hecho documentado</span>
              </div>
              <span class="event-card__year">1826&#x2013;1841</span>
              <h3 class="event-card__title">De comerciante a caudillo federal (1826&#x2013;1841)</h3>
              <p class="event-card__excerpt">Desde su regreso a Entre R&#xED;os, Urquiza combin&#xF3; el comercio y la estancia con la pol&#xED;tica provincial. En 1826 fue electo diputado provincial y adopt&#xF3; p&#xFA;blicamente la causa federal, oponi&#xE9;ndose a la constituci&#xF3;n unitaria de ese a&#xF1;o. En 1832 el gobernador Pascual Echa&#xFC;e lo nombr&#xF3; Comandante General del Segundo Departamento Principal de Entre R&#xED;os, consolidando su peso militar en la regi&#xF3;n. A partir de 1836 Juan Manuel de Rosas lo puso al mando de la divisi&#xF3;n federal de observaci&#xF3;n en la frontera uruguaya; durante los a&#xF1;os siguientes combati&#xF3; en Pago Largo (1839) y Cagancha (1839) bajo Echa&#xFC;e, y en 1837 fue ascendido a coronel mayor, forjando la reputaci&#xF3;n militar que lo har&#xED;a insustituible en el Litoral federalista.</p>
              <footer class="card-source">
                <span class="card-source__icon" aria-hidden="true">&#x1F4C4;</span>
                <cite>AGN, Fondo Urquiza 1800&#x2013;1880. Lynch, J., <em>Argentine Dictator: Juan Manuel de Rosas 1829&#x2013;1852</em>, Oxford, 1981. casarosada.gob.ar, perfil biogr&#xE1;fico.</cite>
              </footer>
            </article>

            <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" data-id="URQ-3" style="--reveal-delay: 160ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">&#x2713;</span>
                <span class="card-certeza-label">Hecho documentado</span>
              </div>
              <div class="card-image">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Palacio_San_Jos%C3%A9_Fachada.JPG/500px-Palacio_San_Jos%C3%A9_Fachada.JPG" alt="Fachada del Palacio San Jos&#xE9;, residencia de Urquiza en Entre R&#xED;os y sede de su gobierno provincial (1848&#x2013;1870). Patrimonio hist&#xF3;rico nacional." loading="lazy">
              </div>
              <span class="event-card__year">1841&#x2013;1851</span>
              <h3 class="event-card__title">Gobernador de Entre R&#xED;os: orden, prosperidad y tensi&#xF3;n (1841&#x2013;1851)</h3>
              <p class="event-card__excerpt">El 15 de diciembre de 1841 la Legislatura entrerriana eligi&#xF3; a Urquiza gobernador en reemplazo de Pascual Echa&#xFC;e; fue reelecto en 1845 y 1849. Bajo su gobierno, Entre R&#xED;os se convirti&#xF3; en la provincia m&#xE1;s pr&#xF3;spera del interior: extendi&#xF3; la ganader&#xED;a, impuls&#xF3; los saladeros, mejor&#xF3; caminos y puertos fluviales, y fund&#xF3; el Colegio Nacional de Concepci&#xF3;n del Uruguay. <span class="card-nota-certeza">[Nota: la tensi&#xF3;n con Rosas sobre el control del comercio exterior se desarroll&#xF3; gradualmente entre 1837 y 1851 &#x2014; no hay una fecha exacta de ruptura; las fuentes coinciden en que la fricci&#xF3;n fue creciente, no abrupta.]</span> Las restricciones rosistas sobre el comercio con Montevideo y el Tratado de Alcaraz (1846) &#x2014;desaprobado por Rosas&#x2014; mostraron que los intereses entrerrianos y el proyecto de Rosas hab&#xED;an comenzado a divergir de forma irreversible.</p>
              <footer class="card-source">
                <span class="card-source__icon" aria-hidden="true">&#x1F4C4;</span>
                <cite>Bosch, B., <em>Urquiza y su tiempo</em>, EUDEBA. Lynch, J., <em>Argentine Dictator</em>, Oxford, 1981. AGN, Fondo Urquiza. casarosada.gob.ar.</cite>
              </footer>
            </article>

            <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" data-id="URQ-4" style="--reveal-delay: 240ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">&#x2713;</span>
                <span class="card-certeza-label">Hecho documentado</span>
              </div>
              <div class="card-image">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Daguerrotipo_de_Justo_Jos%C3%A9_de_Urquiza_%28recorte%29.jpg" alt="Daguerrotipo de Justo Jos&#xE9; de Urquiza (circa 1850s), atribuido al fot&#xF3;grafo Charles DeForest Fredricks. Una de las im&#xE1;genes m&#xE1;s tempranas del caudillo entrerriano." loading="lazy" width="100%">
              </div>
              <span class="event-card__year">1&#xB0; may 1851</span>
              <h3 class="event-card__title">El Pronunciamiento del 1&#xB0; de mayo de 1851</h3>
              <p class="event-card__excerpt">El 1&#xB0; de mayo de 1851 Urquiza firm&#xF3; el Pronunciamiento desde Concepci&#xF3;n del Uruguay: acept&#xF3; formalmente las renuncias que Rosas present&#xF3; ante la Sala de Representantes de Buenos Aires &#x2014;que repetidamente hab&#xED;a rechazado&#x2014; y declar&#xF3; que Entre R&#xED;os reasum&#xED;a el ejercicio de sus relaciones exteriores, fundado en el Pacto Federal de 1831. El 29 de mayo firm&#xF3; la Triple Alianza con el Brasil y el Uruguay; en agosto organiz&#xF3; el Ej&#xE9;rcito Grande con fuerzas argentinas, brasile&#xF1;as y orientales. El 3 de febrero de 1852, en la batalla de Caseros, ese ej&#xE9;rcito derroc&#xF3; a Rosas, abriendo el camino a la organizaci&#xF3;n constitucional del pa&#xED;s.</p>
              <footer class="card-source">
                <span class="card-source__icon" aria-hidden="true">&#x1F4C4;</span>
                <cite>Pronunciamiento de Urquiza, 1&#xB0; may 1851 (texto completo en AGN). Lynch, J., <em>Argentine Dictator</em>, Oxford, 1981, cap. 10. Halperin Donghi, T., <em>De la revoluci&#xF3;n de independencia a la confederaci&#xF3;n rosista</em>, Paid&#xF3;s, 1972. Lozier Almaz&#xE1;n, B., <em>Urquiza</em>, Planeta, 1992.</cite>
              </footer>
            </article>

            <article class="event-card card-opinion reveal reveal-slide" data-certeza="debatido" data-id="URQ-5" style="--reveal-delay: 320ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">&#x2696;</span>
                <span class="card-certeza-label">Debate historiogr&#xE1;fico</span>
              </div>
              <div class="card-image">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Justo_Jos%C3%A9_de_Urquiza_%28retrato%29.jpg/500px-Justo_Jos%C3%A9_de_Urquiza_%28retrato%29.jpg" alt="Retrato de Justo Jos&#xE9; de Urquiza. Su decisi&#xF3;n de pronunciarse contra Rosas en 1851 gener&#xF3; una fractura historiogr&#xE1;fica que persiste hasta hoy." loading="lazy">
              </div>
              <span class="event-card__year">1851&#x2013;1852</span>
              <h3 class="event-card__title">&#xBF;Traici&#xF3;n o decisi&#xF3;n de Estado? El debate historiogr&#xE1;fico</h3>
              <p class="event-card__excerpt">El Pronunciamiento de 1851 gener&#xF3; una fractura historiogr&#xE1;fica que persiste hasta hoy. La corriente revisionista sostiene que Urquiza traicion&#xF3; al federalismo y a la soberan&#xED;a nacional al aliarse con el Imperio del Brasil y los unitarios, por motivos de inter&#xE9;s personal y ambici&#xF3;n pol&#xED;tica. La corriente liberal y de s&#xED;ntesis argumenta que el Pronunciamiento fue un acto soberano fundado en el mismo Pacto Federal de 1831, y que los motivos econ&#xF3;micos y constitucionales lo hacen comprensible como decisi&#xF3;n de Estado, no como traici&#xF3;n personal.</p>
              <p class="card-nota-historiografica"><strong>Nota historiogr&#xE1;fica:</strong> <strong>Posici&#xF3;n revisionista:</strong> Irazusta, J., <em>Ensayo sobre Rosas</em> (1941); Brienza, H., <em>Urquiza, el salvaje</em>, Aguilar, 2017. Interpreta el acto como ruptura de lealtades federales. <strong>Posici&#xF3;n liberal/s&#xED;ntesis:</strong> Lynch, J., <em>Argentine Dictator</em>, Oxford, 1981, cap. 10; Halperin Donghi, T., <em>De la revoluci&#xF3;n de independencia</em>, Paid&#xF3;s, 1972. Interpreta el acto como ejercicio leg&#xED;timo de soberan&#xED;a provincial fundado en el Pacto Federal de 1831.</p>
              <footer class="card-source">
                <span class="card-source__icon" aria-hidden="true">&#x1F4C4;</span>
                <cite>Dom&#xED;nguez Arribas, J., <em>El enemigo unitario en el discurso rosista</em>, <em>Estudios Americanos</em> (CSIC). Lynch, J., <em>Argentine Dictator</em>, Oxford, 1981. Halperin Donghi, T., <em>De la revoluci&#xF3;n de independencia</em>, Paid&#xF3;s, 1972. Brienza, H., <em>Urquiza, el salvaje</em>, Aguilar, 2017.</cite>
              </footer>
            </article>

            <article class="event-card card-opinion reveal reveal-slide" data-certeza="opini&#xF3;n" data-id="URQ-6" style="--reveal-delay: 400ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">&#x1F4AC;</span>
                <span class="card-certeza-label">Opini&#xF3;n / debate interpretativo</span>
              </div>
              <span class="event-card__year">1851&#x2013;1853</span>
              <h3 class="event-card__title">Urquiza y Alberdi: la convergencia de dos proyectos</h3>
              <p class="event-card__excerpt">Desde el exilio chileno, Juan Bautista Alberdi y otros publicistas de la Generaci&#xF3;n del 37 comenzaron a ver en Urquiza al caudillo capaz de convocar el congreso constituyente que Rosas hab&#xED;a bloqueado durante dos d&#xE9;cadas. Jorge Mayer y Tulio Halperin Donghi se&#xF1;alan que la convergencia entre el proyecto constitucional alberdiano y la voluntad de organizaci&#xF3;n de Urquiza no fue accidental: ambos persigu&#xED;an la misma meta &#x2014;una constituci&#xF3;n que habilitara la inmigraci&#xF3;n, el libre comercio y la inversi&#xF3;n extranjera&#x2014; aunque desde trayectorias muy distintas. Cuando Urquiza venci&#xF3; en Caseros, esa convergencia se volvi&#xF3; programa de gobierno: las <em>Bases y puntos de partida</em> (1852) de Alberdi llegaron a manos de Urquiza en semanas, y la Constituci&#xF3;n de 1853 sigui&#xF3; su arquitectura de modo reconocible.</p>
              <footer class="card-source">
                <span class="card-source__icon" aria-hidden="true">&#x1F4C4;</span>
                <cite>Mayer, J. M., <em>Alberdi y su tiempo</em>, EUDEBA, Buenos Aires, 1963. Halperin Donghi, T., <em>De la revoluci&#xF3;n de independencia</em>, Paid&#xF3;s, 1972. casarosada.gob.ar.</cite>
              </footer>
            </article>

          </div>
        </div><!-- /#rev-urquiza-perfil -->
```

**⚠ IMPORTANTE — URQ-1 imagen URL:** El bloque arriba usa `URQUIZA_IMG_URL_PLACEHOLDER` para URQ-1. Antes de escribir el archivo temporal, el executor DEBE ejecutar:
```bash
grep "Justo_Jos" index.html | head -3
```
Y reemplazar `URQUIZA_IMG_URL_PLACEHOLDER` con la URL exacta que ya aparece en el archivo (la primera coincidencia de `Justo_Jos%C3%A9_de_Urquiza.jpg` con thumb). El research doc sugiere `/2/24/` pero la URL real en el archivo es la fuente de verdad.

**⚠ URQ-2 (sin imagen):** La card URQ-2 no tiene `<div class="card-image">` — esto es correcto e intencional. Stagger delay = 80ms.

**⚠ URQ-6 (sin blockquote nuevo):** La card URQ-6 usa solo `event-card__excerpt` con paráfrasis atribuida. NO añadir `<blockquote>` — ya existe un `alberdi-quote` en el archivo para la conexión Urquiza-Alberdi.

## Observability Impact

This task makes no runtime changes — it writes static HTML only. Observable signals after task completion:

- **`grep -c 'data-id="URQ-' index.html`** → 6 (confirms all 6 cards present)
- **`grep -c 'sub-nav__link' index.html`** → 8 (confirms 8th nav link added)
- **`grep -c 'id="rev-urquiza-perfil"' index.html`** → 1 (confirms section wrapper)
- **`grep -c '/#rev-1835-1852' index.html`** → 1 (confirms parent anchor intact)
- **`node -e "new Function(require('fs').readFileSync('app.js','utf8'))"`** → no exception (confirms JS untouched)
- **Browser DevTools → Elements** → `#rev-urquiza-perfil` div visible with 6 `article[data-id^="URQ-"]` children

**Failure state inspection:** Partial insertion would show card count 1–5; broken anchor would show 0 for check 7. Both are immediately detectable with the grep battery. No log files are produced — failure is visible only through structural checks and browser rendering.

## Expected Output

- `index.html` modificado con:
  - 8 links en el sub-nav (antes: 7)
  - Nuevo `<div id="rev-urquiza-perfil">` insertado inmediatamente antes de `</div><!-- /#rev-1835-1852 -->`
  - 6 cards URQ-1–URQ-6 con data-id, data-certeza, class, images y fuentes correctos
  - Anchor `<!-- /#rev-1835-1852 -->` intacto
- app.js: sin cambios (verificación de sintaxis confirma que no se afectó)
