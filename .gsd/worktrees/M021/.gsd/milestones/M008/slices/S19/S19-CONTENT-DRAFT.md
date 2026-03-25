# S19-CONTENT-DRAFT.md — ¿Rosas fue un tirano?

**Slice:** S19  
**Milestone:** M008  
**Status:** T02 Recipe authored and spliced into index.html.

---

## S19-1: ¿Rosas fue un tirano? La pregunta central

**Card type:** `card-opinion`  
**Certeza:** `debatido`  
**Year display:** `debate historiográfico`  
**Reveal delay:** `0ms`  
**Image:** none  
**Certeza icon:** `&#x2696;` (scales)

**Title:** ¿Rosas fue un tirano? La pregunta central de la historiografía argentina

**Excerpt:** La etiqueta "tirano" aplicada a Juan Manuel de Rosas no describe solamente un carácter personal: en el siglo XIX era un argumento político preciso. Para la tradición liberal —Sarmiento en el *Facundo* (1845), Mitre en la *Historia de Belgrano* (1857)— Rosas fue un tirano porque utilizó la violencia organizada —la Mazorca, la delación, el exilio forzado— no para defender el orden sino para aplastar toda disidencia y perpetuarse en el poder. Para la tradición revisionista —Julio Irazusta, José María Rosa— esa violencia fue una respuesta defensiva ante una oposición que conspiraba activamente con potencias extranjeras, y "tiranía" fue un término de propaganda unitaria. La historiografía académica actual no resolvió este debate con un veredicto sino desplazándolo: la pregunta ya no es si Rosas fue "bueno o malo" sino cómo funcionó el poder que ejerció. La sección S18 demostró que la oposición conspiraba; la pregunta de si ese hecho fue utilizado como instrumento deliberado de control político —para perseguir también a quienes no conspiraban— es la que se aborda aquí.

**Sources:**
- Sarmiento, D. F., *Facundo: Civilización y Barbarie*, Santiago de Chile, 1845.
- Mitre, B., *Historia de Belgrano y de la Independencia Argentina*, Buenos Aires, 1857.
- Myers, J., *Orden y virtud*, UNQ, 1995.

---

## S19-2: Tres posiciones sobre el carácter del régimen rosista

**Card type:** `card-opinion`  
**Certeza:** `debatido`  
**Year display:** `debate historiográfico`  
**Reveal delay:** `80ms`  
**Image:** none (no new reuse of Rosas/Sarmiento portraits)  
**Certeza icon:** `&#x2696;` (scales)

**Title:** Tres posiciones sobre el carácter del régimen rosista: de la tiranía a la hegemonía

**Excerpt:** La pregunta sobre si Rosas ejerció una tiranía —entendida como uso sistemático del terror para anular la vida política— tiene respuestas radicalmente distintas según la corriente historiográfica. Las tres posiciones coinciden en los hechos documentados: la Mazorca existió, las ejecuciones ocurrieron, el exilio fue masivo. Difieren en la interpretación del mecanismo: ¿fue el terror una herramienta deliberada de gobierno, una respuesta defensiva a amenazas reales, o un sistema de hegemonía que combinaba violencia selectiva con consenso activo? Esta nota circunscribe el debate al ámbito doméstico —represión, libertades civiles, personalismo— y no adjudica la controversia sobre soberanía exterior y bloqueos, que corresponde a una sección posterior.

**Three-position nota:**

1. **Liberal** (Sarmiento 1845, Mitre 1857): aparato represivo sin distinción entre opositores armados y ciudadanos pacíficos; obligación de divisa punzó y grito "Mueran los inmundos unitarios" como humillación sistemática del espacio público.
2. **Revisionista** (Irazusta 1941, Rosa 1964): "tiranía" fue instrumento político del exilio unitario; violencia proporcional a conspiración armada con apoyo extranjero; consenso popular documentado en renovación del poder.
3. **Síntesis contemporánea** (Lynch 1981 cap. 10, Halperin Donghi 1972, Myers 1995): evita la categoría "tirano" sin absolver a Rosas; poder ejercido mediante terror selectivo + producción activa de consenso; etiqueta "conspirador unitario" aplicada instrumentalmente más allá de los conspiradores reales; régimen fue una hegemonía, no dictadura militar convencional.

**Scope boundary:** Nota is explicitly limited to domestic tiranía (represión, libertades, personalismo). Does NOT adjudicate soberanía exterior argument (reserved for S22).

**Sources:**
- Lynch, J., *Argentine Dictator: Juan Manuel de Rosas 1829–1852*, Oxford University Press, 1981, cap. 10.
- Halperín Donghi, T., *De la revolución de independencia a la confederación rosista*, Paidós, Buenos Aires, 1972.
- Myers, J., *Orden y virtud: el discurso republicano en el régimen rosista*, UNQ, Bernal, 1995.
- Irazusta, J., *Vida política de Juan Manuel de Rosas*, Buenos Aires, 1941.
- Rosa, J. M., *Historia Argentina*, t. IV–V, Oriente, 1964.

---

## T02 Recipe — Entity-Encoded HTML

```html

<!-- S19-1: ¿Rosas fue un tirano? La pregunta central -->
            <article class="event-card card-opinion reveal reveal-slide" data-certeza="debatido" data-id="S19-1" style="--reveal-delay: 0ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">&#x2696;</span>
                <span class="card-certeza-label">Debatido historiogr&#xE1;ficamente</span>
              </div>
              <span class="event-card__year">debate historiogr&#xE1;fico</span>
              <h3 class="event-card__title">&#xBF;Rosas fue un tirano? La pregunta central de la historiograf&#xED;a argentina</h3>
              <p class="event-card__excerpt">La etiqueta &#x201C;tirano&#x201D; aplicada a Juan Manuel de Rosas no describe solamente un car&#xE1;cter personal: en el siglo XIX era un argumento pol&#xED;tico preciso. Para la tradici&#xF3;n liberal &#x2014;Sarmiento en el <em>Facundo</em> (1845), Mitre en la <em>Historia de Belgrano</em> (1857)&#x2014; Rosas fue un tirano porque utiliz&#xF3; la violencia organizada &#x2014;la Mazorca, la delaci&#xF3;n, el exilio forzado&#x2014; no para defender el orden sino para aplastar toda disidencia y perpetuarse en el poder. Para la tradici&#xF3;n revisionista &#x2014;Julio Irazusta, Jos&#xE9; Mar&#xED;a Rosa&#x2014; esa violencia fue una respuesta defensiva ante una oposici&#xF3;n que conspiraba activamente con potencias extranjeras, y &#x201C;tiran&#xED;a&#x201D; fue un t&#xE9;rmino de propaganda unitaria. La historiograf&#xED;a acad&#xE9;mica actual no resolvi&#xF3; este debate con un veredicto sino desplaz&#xE1;ndolo: la pregunta ya no es si Rosas fue &#x201C;bueno o malo&#x201D; sino c&#xF3;mo funcion&#xF3; el poder que ejerci&#xF3;. La secci&#xF3;n S18 demostr&#xF3; que la oposici&#xF3;n conspiraba; la pregunta de si ese hecho fue utilizado como instrumento deliberado de control pol&#xED;tico &#x2014;para perseguir tambi&#xE9;n a quienes no conspiraban&#x2014; es la que se aborda aqu&#xED;.</p>
              <footer class="card-source">
                <span class="card-source__icon" aria-hidden="true">&#x1F4C4;</span>
                <cite>Sarmiento, D. F., <em>Facundo: Civilizaci&#xF3;n y Barbarie</em>, 1845. Mitre, B., <em>Historia de Belgrano y de la Independencia Argentina</em>, 1857. Myers, J., <em>Orden y virtud</em>, UNQ, 1995.</cite>
              </footer>
            </article>

<!-- S19-2: Debate historiogr&#xE1;fico sobre la tiran&#xED;a rosista -->
            <article class="event-card card-opinion reveal reveal-slide" data-certeza="debatido" data-id="S19-2" style="--reveal-delay: 80ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">&#x2696;</span>
                <span class="card-certeza-label">Debatido historiogr&#xE1;ficamente</span>
              </div>
              <span class="event-card__year">debate historiogr&#xE1;fico</span>
              <h3 class="event-card__title">Tres posiciones sobre el car&#xE1;cter del r&#xE9;gimen rosista: de la tiran&#xED;a a la hegemon&#xED;a</h3>
              <p class="event-card__excerpt">La pregunta sobre si Rosas ejerci&#xF3; una tiran&#xED;a &#x2014;entendida como uso sistem&#xE1;tico del terror para anular la vida pol&#xED;tica&#x2014; tiene respuestas radicalmente distintas seg&#xFA;n la corriente historiogr&#xE1;fica. Las tres posiciones coinciden en los hechos documentados: la Mazorca existi&#xF3;, las ejecuciones ocurrieron, el exilio fue masivo. Difieren en la interpretaci&#xF3;n del mecanismo: &#xBF;fue el terror una herramienta deliberada de gobierno, una respuesta defensiva a amenazas reales, o un sistema de hegemon&#xED;a que combinaba violencia selectiva con consenso activo? Esta nota circunscribe el debate al &#xE1;mbito dom&#xE9;stico &#x2014;represi&#xF3;n, libertades civiles, personalismo&#x2014; y no adjudica la controversia sobre soberan&#xED;a exterior y bloqueos, que corresponde a una secci&#xF3;n posterior.</p>
              <p class="card-nota-historiografica"><strong>Nota historiogr&#xE1;fica:</strong> La posici&#xF3;n liberal (Sarmiento, D. F., <em>Facundo: Civilizaci&#xF3;n y Barbarie</em>, Santiago de Chile, 1845; Mitre, B., <em>Historia de Belgrano y de la Independencia Argentina</em>, Buenos Aires, 1857) sostiene que Rosas fue un tirano en sentido pleno: el aparato represivo &#x2014;Mazorca, delaci&#xF3;n obligatoria, listas de unitarios&#x2014; no distingui&#xF3; entre opositores armados y ciudadanos pac&#xED;ficos; su objetivo fue exterminar la disidencia ilustrada y concentrar el poder en su persona; la obligaci&#xF3;n de usar la divisa punz&#xF3; y gritar &#x201C;Mueran los inmundos unitarios&#x201D; fue una forma de humillaci&#xF3;n sistemat&#xE2;tica del espacio p&#xFA;blico. La posici&#xF3;n revisionista (Irazusta, J., <em>Vida pol&#xED;tica de Juan Manuel de Rosas</em>, Buenos Aires, 1941; Rosa, J. M., <em>Historia Argentina</em>, t. IV&#x2013;V, Oriente, 1964) rechaza el t&#xE9;rmino &#x201C;tiran&#xED;a&#x201D; como un instrumento pol&#xED;tico fabricado por el exilio unitario y sus aliados extranjeros; la violencia del r&#xE9;gimen fue una respuesta proporcional a la amenaza real de conspiraci&#xF3;n armada con apoyo de Brasil, Francia e Inglaterra; el consenso popular &#x2014;documentado en la renovaci&#xF3;n del poder en 1835 con el voto de la Legislatura&#x2014; distingue a Rosas de un tirano. La s&#xED;ntesis contempor&#xE1;nea (Lynch, J., <em>Argentine Dictator: Juan Manuel de Rosas 1829&#x2013;1852</em>, Oxford, 1981, cap. 10; Halper&#xED;n Donghi, T., <em>De la revoluci&#xF3;n de independencia a la confederaci&#xF3;n rosista</em>, Pa&#xED;d&#xF3;s, 1972; Myers, J., <em>Orden y virtud: el discurso republicano en el r&#xE9;gimen rosista</em>, UNQ, 1995) evita la categor&#xED;a &#x201C;tirano&#x201D; sin absolver a Rosas: el poder fue ejercido mediante una combinaci&#xF3;n de terror selectivo y producci&#xF3;n activa de consenso; la etiqueta &#x201C;conspirador unitario&#x201D; fue aplicada instrumentalmente m&#xE1;s all&#xE1; de los conspiradores reales; el r&#xE9;gimen fue una hegemon&#xED;a, no una dictadura militar convencional, y eso lo hace m&#xE1;s complejo &#x2014;y m&#xE1;s revelador de la pol&#xED;tica del siglo XIX&#x2014; que la figura del tirano cl&#xE1;sico.</p>
              <footer class="card-source">
                <span class="card-source__icon" aria-hidden="true">&#x1F4C4;</span>
                <cite>Lynch, J., <em>Argentine Dictator: Juan Manuel de Rosas 1829&#x2013;1852</em>, Oxford University Press, 1981, cap. 10. Halper&#xED;n Donghi, T., <em>De la revoluci&#xF3;n de independencia a la confederaci&#xF3;n rosista</em>, Pa&#xED;d&#xF3;s, Buenos Aires, 1972. Myers, J., <em>Orden y virtud: el discurso republicano en el r&#xE9;gimen rosista</em>, UNQ, Bernal, 1995. Irazusta, J., <em>Vida pol&#xED;tica de Juan Manuel de Rosas</em>, Buenos Aires, 1941.</cite>
              </footer>
            </article>

```
