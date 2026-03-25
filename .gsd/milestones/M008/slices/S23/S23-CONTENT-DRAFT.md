# S23 Content Draft: Encarnación Ezcurra — influencia sobre mujeres y apoyo a Rosas

**Slice:** S23
**Milestone:** M008
**Author date:** 2026-03-23

---

## S23-1

**Card type:** `card-hecho`
**data-certeza:** `hecho`
**Certeza indicator icon:** `✓` (HTML entity `&#x2713;`)
**Certeza indicator label:** `Hecho documentado`
**Stagger delay:** `--reveal-delay: 0ms`
**Year display:** `1833–1838`
**Title:** La Sociedad Popular Restauradora y las cartas a Rosas
**data-id:** `S23-1`

**Excerpt (prose):**

Mientras Rosas conducía la campaña al desierto (1833–1835), Encarnación Ezcurra dirigió la red política federal en Buenos Aires: organizó la Revolución de los Restauradores (octubre de 1833) que derrocó al gobierno de Balcarce, y sostuvo una correspondencia de inteligencia con Rosas publicada en 1923 desde el AGN Sala X que documenta una movilización interclasista que alcanzó a círculos de elite y a las comunidades negras, mulatas y orilleras. Casada con Rosas en 1813, Encarnación fue la fundadora de la Sociedad Popular Restauradora (ca. 1833), cuyo brazo armado sólo se convirtió en la Mazorca plenamente desarrollada después de su muerte, ocurrida el 20 de octubre de 1838.

**Image:**

- URL: `https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Encarnacion_Ezcurra_1835.jpg/500px-Encarnacion_Ezcurra_1835.jpg`
- Alt text: Portrait of Encarnación Ezcurra, wife of Juan Manuel de Rosas and key political operator of the Restoration period
- Caption (entity-encoded): `Fernando Garc&#xED;a de Molino y Carlos Morel, ca. 1835&#x2013;36. Wikimedia Commons. Dominio p&#xFA;blico.`

**Sources:** Museo Histórico Nacional; AGN Sala X (cartas 1833–1834); mujeresbonaerenses.gba.gob.ar; museohistoriconacional.cultura.gob.ar; institutorosas.cultura.gob.ar

**Cite footer (entity-encoded):** `Museo Hist&#xF3;rico Nacional; AGN Sala X, cartas 1833&#x2013;34; Lynch, J., Argentine Dictator, Oxford, 1981, cap. 5`

---

## S23-2

**Card type:** `card-opinion`
**data-certeza:** `opini&#xF3;n`
**Certeza indicator icon:** `💬` (HTML entity `&#x1F4AC;`)
**Certeza indicator label:** `Interpretaci&#xF3;n historiogr&#xE1;fica`
**Stagger delay:** `--reveal-delay: 80ms`
**Year display:** `debate historiogr&#xE1;fico`
**Title (entity-encoded):** `&#xBF;Cu&#xE1;nto poder propio ten&#xED;a Encarnaci&#xF3;n?`
**data-id:** `S23-2`
**Image:** none (mirrors S21-2 no-image pattern for the interpretive companion card)

**Excerpt (prose):**

La eficacia política de Encarnación es reconocida por todas las corrientes historiográficas; el debate es sobre el grado de agencia autónoma que ejerció — si fue co-arquitecta del rosismo o una operadora extraordinaria al servicio del proyecto de Rosas.

**card-nota-historiografica — two-position format:**

**Revisionista (Irazusta, J., *Vida política de Juan Manuel de Rosas*, Buenos Aires, 1941):**
Irazusta situó a Encarnación entre las grandes mujeres políticas de la historia — comparable en temperamento a Isabel de Inglaterra o Catalina la Grande. Su rol fue *co-constitutivo* del proyecto rosista: no se limitó a gestionar comunicaciones sino que moldeó la base política que hizo posible el segundo mandato.

**Síntesis contemporánea (Lynch, J., *Argentine Dictator*, Oxford, 1981, cap. 5):**
Lynch consideró su obra esencial — ella creó las condiciones políticas para el regreso de Rosas — pero enmarcó su actividad como desplegada *en función del* proyecto de Rosas. La correspondencia superviviente fue siempre formulada como informes *dirigidos a él*, lo que hace que la pregunta sobre la agencia autónoma resulte irresoluble a partir del registro documental.

**No image for S23-2.**

**Sources:** Irazusta, J. (1941); Lynch, J. (1981, cap. 5)

---

## T02 Recipe

```html
<!-- S23-1: La Sociedad Popular Restauradora y las cartas a Rosas -->
            <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" data-id="S23-1" style="--reveal-delay: 0ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">&#x2713;</span>
                <span class="card-certeza-label">Hecho documentado</span>
              </div>
              <div class="card-image">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Encarnacion_Ezcurra_1835.jpg/500px-Encarnacion_Ezcurra_1835.jpg"
                     alt="Portrait of Encarnaci&#xF3;n Ezcurra, wife of Juan Manuel de Rosas and key political operator of the Restoration period"
                     loading="lazy">
                <p class="card-image__caption">Fernando Garc&#xED;a de Molino y Carlos Morel, ca. 1835&#x2013;36. Wikimedia Commons. Dominio p&#xFA;blico.</p>
              </div>
              <span class="event-card__year">1833&#x2013;1838</span>
              <h3 class="event-card__title">La Sociedad Popular Restauradora y las cartas a Rosas</h3>
              <p class="event-card__excerpt">Mientras Rosas conduc&#xED;a la campa&#xF1;a al desierto (1833&#x2013;1835), Encarnaci&#xF3;n Ezcurra dirigi&#xF3; la red pol&#xED;tica federal en Buenos Aires: organiz&#xF3; la Revoluci&#xF3;n de los Restauradores (octubre de 1833) que derrib&#xF3; el gobierno de Balcarce, y sostuvo una correspondencia de inteligencia con Rosas publicada en 1923 desde el AGN Sala X que documenta una movilizaci&#xF3;n interclasista que alcanz&#xF3; a c&#xED;rculos de elite y a las comunidades negras, mulatas y orilleras. Casada con Rosas en 1813, Encarnaci&#xF3;n fue la fundadora de la Sociedad Popular Restauradora (ca. 1833), cuyo brazo armado s&#xF3;lo se convirti&#xF3; en instrumento represivo plenamente desarrollado despu&#xE9;s de su muerte, ocurrida el 20 de octubre de 1838.</p>
              <footer class="card-source">
                <span class="card-source__icon" aria-hidden="true">&#x1F4C4;</span>
                <cite>Museo Hist&#xF3;rico Nacional; AGN Sala X, cartas 1833&#x2013;34; Lynch, J., <em>Argentine Dictator: Juan Manuel de Rosas 1829&#x2013;1852</em>, Oxford, 1981, cap. 5.</cite>
              </footer>
            </article>
<!-- S23-2: &#xBF;Cu&#xE1;nto poder propio ten&#xED;a Encarnaci&#xF3;n? -->
            <article class="event-card card-opinion reveal reveal-slide" data-certeza="opini&#xF3;n" data-id="S23-2" style="--reveal-delay: 80ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">&#x1F4AC;</span>
                <span class="card-certeza-label">Interpretaci&#xF3;n historiogr&#xE1;fica</span>
              </div>
              <span class="event-card__year">debate historiogr&#xE1;fico</span>
              <h3 class="event-card__title">&#xBF;Cu&#xE1;nto poder propio ten&#xED;a Encarnaci&#xF3;n?</h3>
              <p class="event-card__excerpt">La eficacia pol&#xED;tica de Encarnaci&#xF3;n es reconocida por todas las corrientes historiogr&#xE1;ficas; el debate es sobre el grado de agencia aut&#xF3;noma que ejerci&#xF3; &#x2014; si fue co-arquitecta del rosismo o una operadora extraordinaria al servicio del proyecto de Rosas.</p>
              <p class="card-nota-historiografica"><strong>Nota historiogr&#xE1;fica:</strong> La posici&#xF3;n revisionista (Irazusta, J., <em>Vida pol&#xED;tica de Juan Manuel de Rosas</em>, Buenos Aires, 1941) situ&#xF3; a Encarnaci&#xF3;n entre las grandes mujeres pol&#xED;ticas de la historia &#x2014; comparable en temperamento a Isabel de Inglaterra o Catalina la Grande; su rol fue co-constitutivo del proyecto rosista: no se limit&#xF3; a gestionar comunicaciones sino que molde&#xF3; la base pol&#xED;tica que hizo posible el segundo mandato. La s&#xED;ntesis contempor&#xE1;nea (Lynch, J., <em>Argentine Dictator: Juan Manuel de Rosas 1829&#x2013;1852</em>, Oxford, 1981, cap. 5) consider&#xF3; su obra esencial &#x2014;ella cre&#xF3; las condiciones pol&#xED;ticas para el regreso de Rosas&#x2014; pero enmarca su actividad como desplegada en funci&#xF3;n del proyecto de Rosas; la correspondencia superviviente fue siempre formulada como informes dirigidos a &#xE9;l, lo que hace que la pregunta sobre la agencia aut&#xF3;noma resulte irresoluble a partir del registro documental.</p>
              <footer class="card-source">
                <span class="card-source__icon" aria-hidden="true">&#x1F4C4;</span>
                <cite>Irazusta, J., <em>Vida pol&#xED;tica de Juan Manuel de Rosas</em>, Buenos Aires, 1941. Lynch, J., <em>Argentine Dictator: Juan Manuel de Rosas 1829&#x2013;1852</em>, Oxford, 1981, cap. 5.</cite>
              </footer>
            </article>
```
