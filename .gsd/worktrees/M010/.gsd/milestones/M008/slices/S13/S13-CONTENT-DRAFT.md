# S13-CONTENT-DRAFT: El primer gobierno de Rosas — cómo llegó al poder

**Slice:** S13
**Cards:** S13-1, S13-2
**Status:** Ready for T02 splice

---

## Card S13-1 — El detonante: el fusilamiento de Dorrego y la guerra civil (1828–1829)

**data-id:** S13-1
**data-certeza:** hecho
**--reveal-delay:** 0ms
**Year label:** 1828 – 1829
**Image URL:** https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Juan_Manuel_de_Rosas_1829.jpg/500px-Juan_Manuel_de_Rosas_1829.jpg
**Image alt:** Retrato de Juan Manuel de Rosas hacia 1829, año en que la Legislatura de Buenos Aires lo eligió gobernador tras su victoria en el Puente de Márquez. Es uno de los pocos retratos tempranos de Rosas, pintado poco después de su ascenso al poder provincial.
**Image loading:** lazy

### Prose

El 1 de diciembre de 1828, el general unitario Juan Lavalle derrocó al gobernador federal Manuel Dorrego mediante un golpe militar; doce días después, el 13 de diciembre de 1828, Dorrego fue fusilado en Navarro sin juicio, sin proceso y sin sentencia — un acto que convirtió al gobernador depuesto en mártir federal y entregó a Lavalle la responsabilidad política del crimen. Las milicias rurales del sur bonaerense se movilizaron de inmediato bajo la conducción de Juan Manuel de Rosas, estanciero del partido de Monte con ascendiente sobre la campaña y experiencia organizando fuerzas irregulares. En abril de 1829, Rosas venció a Lavalle en el Puente de Márquez, obligando al general unitario a negociar: el Convenio de Cañuelas (24 de junio de 1829) y el Convenio de Barracas (24 de agosto de 1829) pusieron fin al enfrentamiento armado sin que Lavalle pudiera imponer su programa. El 8 de diciembre de 1829, la Legislatura de Buenos Aires eligió a Rosas gobernador de la provincia — resultado directo de la guerra civil iniciada por el fusilamiento de Dorrego y de la incapacidad de Lavalle para consolidar una alternativa unitaria en la campaña bonaerense.

### Sources

- Lynch, J., *Argentine Dictator: Juan Manuel de Rosas 1829–1852*, Oxford, 1981, cap. 3.
- Saldías, A., *Historia de la Confederación Argentina*, t. I, 1892.
- Halperín Donghi, T., *De la revolución de independencia a la confederación rosista*, Paidós, 1972.

---

## Card S13-2 — El primer mandato (1829–1832): orden, milicias y la Suma rechazada

**data-id:** S13-2
**data-certeza:** hecho
**--reveal-delay:** 80ms
**Year label:** 1829 – 1832
**Image URL:** https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Juan_Manuel_de_Rosas_by_Descalzi_oval.png/500px-Juan_Manuel_de_Rosas_by_Descalzi_oval.png
**Image alt:** Retrato oval de Juan Manuel de Rosas realizado por el pintor Rafael Descalzi, que muestra al gobernador durante su primer mandato (1829–1832). Rosas vistió de uniforme de campaña con mayor frecuencia que el atavío de gala, reflejando su identificación con la campaña bonaerense y las milicias rurales.
**Image loading:** lazy

### Prose

Rosas asumió el gobierno de Buenos Aires el 8 de diciembre de 1829 solicitando a la Legislatura que le concediera la Suma del Poder Público — facultades extraordinarias que concentrarían los poderes ejecutivo, legislativo y judicial en su persona —; la Legislatura rechazó el pedido y Rosas gobernó durante tres años con atribuciones ordinarias. Con esos poderes limitados organizó la administración provincial, redujo el déficit fiscal, fortaleció las milicias rurales y restableció el orden en una provincia que había vivido meses de guerra civil y desorganización institucional. En diciembre de 1832, cuando su mandato venció y la Legislatura volvió a negarse a otorgar la Suma del Poder Público como condición para su renovación, Rosas declinó continuar en el cargo y se retiró del gobierno — una retirada calculada que le devolvió prestigio y libertad de acción. Es un error frecuente situar la Campaña del Desierto (1833) dentro de su primer mandato: Rosas ya había dejado la gobernación cuando la campaña comenzó; la dirigió como comandante militar en ejercicio mientras Juan Ramón Balcarce ejercía la gobernación de Buenos Aires, y no como gobernador él mismo.

### Sources

- Lynch, J., *Argentine Dictator: Juan Manuel de Rosas 1829–1852*, Oxford, 1981, cap. 3.
- Saldías, A., *Historia de la Confederación Argentina*, t. I, 1892.
- Zinny, A., *Historia de los gobernadores de las provincias argentinas*, 1882.

---

## T02 Recipe HTML

> Copy this block verbatim into `index.html` before the `<!-- S10–S24 cards will be appended here by subsequent slices -->` marker using the Node.js splice script. Do not modify any attributes, class names, or prose.

```html
<!-- S13-1: El detonante: el fusilamiento de Dorrego y la guerra civil (1828–1829) -->
            <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" data-id="S13-1" style="--reveal-delay: 0ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">✓</span>
                <span class="card-certeza-label">Hecho documentado</span>
              </div>
              <div class="card-image">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Juan_Manuel_de_Rosas_1829.jpg/500px-Juan_Manuel_de_Rosas_1829.jpg" alt="Retrato de Juan Manuel de Rosas hacia 1829, año en que la Legislatura de Buenos Aires lo eligió gobernador tras su victoria en el Puente de Márquez. Es uno de los pocos retratos tempranos de Rosas, pintado poco después de su ascenso al poder provincial." loading="lazy">
              </div>
              <span class="event-card__year">1828 – 1829</span>
              <h3 class="event-card__title">El detonante: el fusilamiento de Dorrego y la guerra civil (1828–1829)</h3>
              <p class="event-card__excerpt">El 1 de diciembre de 1828, el general unitario Juan Lavalle derrocó al gobernador federal Manuel Dorrego mediante un golpe militar; doce días después, el 13 de diciembre de 1828, Dorrego fue fusilado en Navarro sin juicio, sin proceso y sin sentencia — un acto que convirtió al gobernador depuesto en mártir federal y entregó a Lavalle la responsabilidad política del crimen. Las milicias rurales del sur bonaerense se movilizaron de inmediato bajo la conducción de Juan Manuel de Rosas, estanciero del partido de Monte con ascendiente sobre la campaña y experiencia organizando fuerzas irregulares. En abril de 1829, Rosas venció a Lavalle en el Puente de Márquez, obligando al general unitario a negociar: el Convenio de Cañuelas (24 de junio de 1829) y el Convenio de Barracas (24 de agosto de 1829) pusieron fin al enfrentamiento armado sin que Lavalle pudiera imponer su programa. El 8 de diciembre de 1829, la Legislatura de Buenos Aires eligió a Rosas gobernador de la provincia — resultado directo de la guerra civil iniciada por el fusilamiento de Dorrego y de la incapacidad de Lavalle para consolidar una alternativa unitaria en la campaña bonaerense.</p>
              <footer class="card-source">
                <span class="card-source__icon" aria-hidden="true">📄</span>
                <cite>Lynch, J., Argentine Dictator: Juan Manuel de Rosas 1829–1852, Oxford, 1981, cap. 3. Saldías, A., Historia de la Confederación Argentina, t. I, 1892. Halperín Donghi, T., De la revolución de independencia a la confederación rosista, Paidós, 1972.</cite>
              </footer>
            </article>
<!-- S13-2: El primer mandato (1829–1832): orden, milicias y la Suma rechazada -->
            <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" data-id="S13-2" style="--reveal-delay: 80ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">✓</span>
                <span class="card-certeza-label">Hecho documentado</span>
              </div>
              <div class="card-image">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Juan_Manuel_de_Rosas_by_Descalzi_oval.png/500px-Juan_Manuel_de_Rosas_by_Descalzi_oval.png" alt="Retrato oval de Juan Manuel de Rosas realizado por el pintor Rafael Descalzi, que muestra al gobernador durante su primer mandato (1829–1832). Rosas vistió de uniforme de campaña con mayor frecuencia que el atavío de gala, reflejando su identificación con la campaña bonaerense y las milicias rurales." loading="lazy">
              </div>
              <span class="event-card__year">1829 – 1832</span>
              <h3 class="event-card__title">El primer mandato (1829–1832): orden, milicias y la Suma rechazada</h3>
              <p class="event-card__excerpt">Rosas asumió el gobierno de Buenos Aires el 8 de diciembre de 1829 solicitando a la Legislatura que le concediera la Suma del Poder Público — facultades extraordinarias que concentrarían los poderes ejecutivo, legislativo y judicial en su persona —; la Legislatura rechazó el pedido y Rosas gobernó durante tres años con atribuciones ordinarias. Con esos poderes limitados organizó la administración provincial, redujo el déficit fiscal, fortaleció las milicias rurales y restableció el orden en una provincia que había vivido meses de guerra civil y desorganización institucional. En diciembre de 1832, cuando su mandato venció y la Legislatura volvió a negarse a otorgar la Suma del Poder Público como condición para su renovación, Rosas declinó continuar en el cargo y se retiró del gobierno — una retirada calculada que le devolvió prestigio y libertad de acción. Es un error frecuente situar la Campaña del Desierto (1833) dentro de su primer mandato: Rosas ya había dejado la gobernación cuando la campaña comenzó; la dirigió como comandante militar en ejercicio mientras Juan Ramón Balcarce ejercía la gobernación de Buenos Aires, y no como gobernador él mismo.</p>
              <footer class="card-source">
                <span class="card-source__icon" aria-hidden="true">📄</span>
                <cite>Lynch, J., Argentine Dictator: Juan Manuel de Rosas 1829–1852, Oxford, 1981, cap. 3. Saldías, A., Historia de la Confederación Argentina, t. I, 1892. Zinny, A., Historia de los gobernadores de las provincias argentinas, 1882.</cite>
              </footer>
            </article>
```
