# S18: Los unitarios conspiraban — Content Draft

**Slice:** S18
**Milestone:** M008
**Date:** 2026-03-23
**Author:** T01 executor
**Status:** READY FOR T02 SPLICE

---

## Card 1: S18-1

**data-id:** S18-1
**certeza:** hecho / card-hecho
**Year label:** 1838 – 1851
**Title:** Los unitarios en el exilio conspiraban: la Asociación de Mayo, el bloqueo francés y la Comisión Argentina
**Image:** none
**Reveal delay:** 0ms

### Readable Prose (UTF-8 for human review)

Los unitarios exiliados no eran opositores pasivos: durante el período rosista organizaron redes políticas reales con objetivos conspiratorios documentados. La Asociación de Mayo (1837–1838), cuyo manifiesto fue el *Dogma Socialista* de Esteban Echeverría (Montevideo, 1838), comenzó como un círculo intelectual porteño —la "Joven Argentina"— y se convirtió en el núcleo ideológico de la red exilada en Montevideo y Chile. Entre 1838 y 1840, los exiliados radicados en Montevideo y París —Juan Cruz Varela entre los documentados— gestionaron activamente ante el gobierno francés el bloqueo naval al puerto de Buenos Aires, buscando presión militar exterior sobre Rosas. Sin embargo, el exilio no fue monolítico: Juan Bautista Alberdi, desde Valparaíso, publicó en 1842 *La acción de la Europa en América* argumentando que apelar a la intervención europea era un error estratégico y ético —una postura que separaba su pensamiento del de los unitarios pro-bloqueo. La Comisión Argentina (1851), organizada en Montevideo con el respaldo de Urquiza y del Imperio del Brasil, fue la estructura que coordinó directamente la campaña que culminó en la batalla de Caseros (3 de febrero de 1852).

### card-nota-historiografica Prose (UTF-8 for human review)

Las conspiraciones descritas en esta tarjeta son hechos documentados. La controversia historiográfica no es si existieron, sino si Rosas utilizó su existencia real como cobertura para reprimir también a opositores pacíficos que no conspiraban. Myers, en *Orden y virtud* (UNQ, 1995), documenta cómo la etiqueta "conspirador unitario" fue aplicada más allá de los conspiradores reales, alcanzando a intelectuales, comerciantes y vecinos sin vinculación activa con ninguna red. Lynch, en *Argentine Dictator* (Oxford, 1981, cap. 6), distingue entre los conspiradores documentados y quienes fueron arrastrados por una lógica de intimidación masiva. La pregunta de si ese uso fue deliberado como instrumento de control político corresponde a S19.

### Sources for S18-1

- Myers, J., *Orden y virtud: el discurso republicano en el régimen rosista*, UNQ, 1995
- Lynch, J., *Argentine Dictator: Juan Manuel de Rosas 1829–1852*, Oxford University Press, 1981, cap. 6
- Echeverría, E., *Dogma Socialista*, Montevideo, 1838 (fuente primaria)
- Alberdi, J. B., *La acción de la Europa en América*, Valparaíso, 1842 (fuente primaria)

---

## Card 2: S18-2

**data-id:** S18-2
**certeza:** hecho / card-hecho
**Year label:** 1840 – 1841
**Title:** La Coalición del Norte: Lavalle invade, las provincias se levantan
**Image URL:** https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Mapa_ARGENTINA_1840_coalicion_del_norte.svg/500px-Mapa_ARGENTINA_1840_coalicion_del_norte.svg.png
**Alt text:** Mapa de Argentina hacia 1840 que muestra los movimientos militares de la Coalición del Norte: la invasión de Lavalle desde el litoral con apoyo naval francés, y los levantamientos provinciales en Tucumán, Salta y Jujuy coordinados por Marco Avellaneda
**Reveal delay:** 80ms

### Readable Prose (UTF-8 for human review)

En julio de 1840, el general Juan Lavalle lanzó la invasión desde el litoral con apoyo naval francés y respaldo del gobierno uruguayo. La Coalición del Norte fue la coordinación de levantamientos provinciales articulados con la campaña de Lavalle: Marco Avellaneda, gobernador de Tucumán, lideró el alzamiento norteño junto con Salta y Jujuy. La coalición fue derrotada militarmente. Avellaneda fue capturado y ejecutado por orden de Manuel Oribe —aliado de Rosas— en Tucumán el 3 de noviembre de 1841; según Zinny, su cabeza fue exhibida en una pica en la plaza principal como escarmiento. Lavalle se retiró hacia el norte y murió en Jujuy el 9 de octubre de 1841, no en combate sino de un disparo que lo alcanzó a través de la ventana de la casa donde se alojaba durante la retirada. La derrota de la Coalición del Norte consolidó la supremacía militar de Rosas y fue seguida por el período de mayor intensidad represiva de la Mazorca (1840–1842).

### Sources for S18-2

- Lynch, J., *Argentine Dictator: Juan Manuel de Rosas 1829–1852*, Oxford University Press, 1981, cap. 6
- Beverina, J., *Las campañas de los ejércitos libertadores 1838–1852*, Buenos Aires, 1923
- Zinny, A., *Historia de los gobernadores de las provincias argentinas*, t. IV, 1882

---

## Scope Compliance Checklist

- ✓ S18 does NOT adjudicate whether Rosas was a tyrant — it documents that conspiracies existed and that the "conspirador" label was used beyond actual conspirators. The tiranía judgment belongs to S19.
- ✓ S18 covers the bloqueo francés exclusively from the unitario side (exiliados alentaron y gestionaron el bloqueo). S18 does NOT frame it as an act of foreign aggression or discuss Rosas's resistance to it — that is S22's scope.
- ✓ Alberdi's dissent from the pro-intervention strategy is included (La acción de la Europa en América, 1842), keeping the R011 Alberdi-as-hilo-conductor thread alive without turning S18 into an Alberdi card.
- ✓ The card-nota-historiografica on S18-1 is narrowly scoped to the pretext argument only: conspiracies were real (hecho) → their use as blanket cover for repressing pacifists is what S19 addresses. The nota does NOT make a general tiranía judgment.

---

## T02 Recipe HTML Block

All non-ASCII characters in this block are HTML entities. This section must pass:
  grep -P '[^\x00-\x7F]' on these lines should return zero matches.

```
<!-- S18-1: Los unitarios en el exilio conspiraban -->
            <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" data-id="S18-1" style="--reveal-delay: 0ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">&#x2713;</span>
                <span class="card-certeza-label">Hecho documentado</span>
              </div>
              <span class="event-card__year">1838 &#x2013; 1851</span>
              <h3 class="event-card__title">Los unitarios en el exilio conspiraban: la Asociaci&#xF3;n de Mayo, el bloqueo franc&#xE9;s y la Comisi&#xF3;n Argentina</h3>
              <p class="event-card__excerpt">Los unitarios exiliados no eran opositores pasivos: durante el per&#xED;odo rosista organizaron redes pol&#xED;ticas reales con objetivos conspiratorios documentados. La Asociaci&#xF3;n de Mayo (1837&#x2013;1838), cuyo manifiesto fue el <em>Dogma Socialista</em> de Esteban Echeverr&#xED;a (Montevideo, 1838), comenz&#xF3; como un c&#xED;rculo intelectual porte&#xF1;o &#x2014;la &#x201C;Joven Argentina&#x201D;&#x2014; y se convirti&#xF3; en el n&#xFA;cleo ideol&#xF3;gico de la red exilada en Montevideo y Chile. Entre 1838 y 1840, los exiliados radicados en Montevideo y Par&#xED;s &#x2014;Juan Cruz Varela entre los documentados&#x2014; gestionaron activamente ante el gobierno franc&#xE9;s el bloqueo naval al puerto de Buenos Aires. Sin embargo, el exilio no fue monol&#xED;tico: Juan Bautista Alberdi, desde Valpara&#xED;so, public&#xF3; en 1842 <em>La acci&#xF3;n de la Europa en Am&#xE9;rica</em> argumentando que apelar a la intervenci&#xF3;n europea era un error estrat&#xE9;gico y &#xE9;tico. La Comisi&#xF3;n Argentina (1851), organizada en Montevideo con el respaldo de Urquiza y del Imperio del Brasil, coordin&#xF3; directamente la campa&#xF1;a que culmin&#xF3; en Caseros (3 de febrero de 1852).</p>
              <p class="card-nota-historiografica"><strong>Nota historiogr&#xE1;fica:</strong> Las conspiraciones descritas son hechos documentados. La controversia es si Rosas utiliz&#xF3; su existencia como cobertura para reprimir tambi&#xE9;n a opositores pac&#xED;ficos que no conspiraban. Myers, en <em>Orden y virtud</em> (UNQ, 1995), documenta c&#xF3;mo la etiqueta &#x201C;conspirador unitario&#x201D; fue aplicada m&#xE1;s all&#xE1; de los conspiradores reales. Lynch, en <em>Argentine Dictator</em> (Oxford, 1981, cap. 6), distingue entre los conspiradores documentados y quienes fueron arrastrados por una l&#xF3;gica de intimidaci&#xF3;n masiva. La pregunta de si ese uso fue deliberado como instrumento de control pol&#xED;tico corresponde a S19.</p>
              <footer class="card-source">
                <span class="card-source__icon" aria-hidden="true">&#x1F4C4;</span>
                <cite>Myers, J., <em>Orden y virtud</em>, UNQ, 1995. Lynch, J., <em>Argentine Dictator</em>, Oxford, 1981, cap. 6. Echeverr&#xED;a, E., <em>Dogma Socialista</em>, 1838. Alberdi, J. B., <em>La acci&#xF3;n de la Europa en Am&#xE9;rica</em>, Valpara&#xED;so, 1842.</cite>
              </footer>
            </article>

<!-- S18-2: La Coalici&#xF3;n del Norte -->
            <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" data-id="S18-2" style="--reveal-delay: 80ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">&#x2713;</span>
                <span class="card-certeza-label">Hecho documentado</span>
              </div>
              <div class="card-image">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Mapa_ARGENTINA_1840_coalicion_del_norte.svg/500px-Mapa_ARGENTINA_1840_coalicion_del_norte.svg.png" alt="Mapa de Argentina hacia 1840 que muestra los movimientos militares de la Coalici&#xF3;n del Norte: la invasi&#xF3;n de Lavalle desde el litoral con apoyo naval franc&#xE9;s, y los levantamientos provinciales en Tucum&#xE1;n, Salta y Jujuy coordinados por Marco Avellaneda" loading="lazy">
              </div>
              <span class="event-card__year">1840 &#x2013; 1841</span>
              <h3 class="event-card__title">La Coalici&#xF3;n del Norte: Lavalle invade, las provincias se levantan</h3>
              <p class="event-card__excerpt">En julio de 1840, el general Juan Lavalle lanz&#xF3; la invasi&#xF3;n desde el litoral con apoyo naval franc&#xE9;s y respaldo del gobierno uruguayo. La Coalici&#xF3;n del Norte fue la coordinaci&#xF3;n de levantamientos provinciales articulados con la campa&#xF1;a de Lavalle: Marco Avellaneda, gobernador de Tucum&#xE1;n, lider&#xF3; el alzamiento norte&#xF1;o junto con Salta y Jujuy. La coalici&#xF3;n fue derrotada. Avellaneda fue capturado y ejecutado por orden de Manuel Oribe &#x2014;aliado de Rosas&#x2014; en Tucum&#xE1;n el 3 de noviembre de 1841; su cabeza fue exhibida en una pica en la plaza principal como escarmiento. Lavalle se retir&#xF3; hacia el norte y muri&#xF3; en Jujuy el 9 de octubre de 1841, no en combate sino de un disparo que lo alcanz&#xF3; a trav&#xE9;s de la ventana de la casa donde se alojaba durante la retirada. La derrota de la Coalici&#xF3;n confirm&#xF3; la supremac&#xED;a militar de Rosas y fue seguida por el per&#xED;odo de mayor intensidad represiva de la Mazorca (1840&#x2013;1842).</p>
              <footer class="card-source">
                <span class="card-source__icon" aria-hidden="true">&#x1F4C4;</span>
                <cite>Lynch, J., <em>Argentine Dictator</em>, Oxford, 1981, cap. 6. Beverina, J., <em>Las campa&#xF1;as de los ej&#xE9;rcitos libertadores 1838&#x2013;1852</em>, Buenos Aires, 1923. Zinny, A., <em>Historia de los gobernadores de las provincias argentinas</em>, t. IV, 1882.</cite>
              </footer>
            </article>
```

---

## Observability / Diagnostics

- **Inspect HTML entities in T02 Recipe block:** `grep -P '[^\x00-\x7F]' .gsd/milestones/M008/slices/S18/S18-CONTENT-DRAFT.md` — lines within the T02 Recipe block (between the triple-backtick markers) should return zero hits. Prose sections above may return UTF-8 lines (acceptable).
- **Verify draft line count:** `wc -l .gsd/milestones/M008/slices/S18/S18-CONTENT-DRAFT.md` — should be ≥ 80.
- **Verify T02 Recipe present:** `grep -c 'T02 Recipe' .gsd/milestones/M008/slices/S18/S18-CONTENT-DRAFT.md` — should be ≥ 1.
- **Post-splice failure state:** If T02 finds non-ASCII bytes in the recipe block (entity check fails), the draft is the artifact to fix — not index.html. Restore index.html from backup and re-author the recipe.
- **Scope signal:** `grep 'tiranía\|tiran&#xED;a\|tyrant' .gsd/milestones/M008/slices/S18/S18-CONTENT-DRAFT.md` in the T02 Recipe block should return zero hits (scope boundary: tiranía judgment → S19).
