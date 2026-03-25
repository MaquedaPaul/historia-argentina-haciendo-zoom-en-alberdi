# S20-CONTENT-DRAFT: Lo del 29 — el fusilamiento de Dorrego y la crisis de 1829

**Slice:** S20  
**Milestone:** M008  
**Task:** T01  
**Date:** 2026-03-23

---

## Scope Guard (reminder)

S13-1 already covers: el golpe del 1 dic 1828, el fusilamiento del 13 dic 1828, movilización de Rosas, Puente de Márquez, Cañuelas, Barracas, elección de Rosas 8 dic 1829.

S20 adds:
- **S20-1 (hecho):** El CONTEXTO PREVIO — por qué Dorrego era políticamente vulnerable cuando Lavalle actuó (la Guerra con Brasil, la Convención Preliminar de Paz, la cesión de la Banda Oriental).
- **S20-2 (opinión):** El SIGNIFICADO POLÍTICO — por qué ese fusilamiento específico se convirtió en la ruptura fundacional de la política argentina, según Saldías, Halperín Donghi y Lynch.

---

## S20-1: La paz impopular (hecho)

**Certeza:** hecho  
**Año display:** 1828  
**Clase HTML:** card-hecho  
**Imagen:** https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Dorrego-fusilamiento.jpg/500px-Dorrego-fusilamiento.jpg  
**Stagger:** 0ms

### Contenido (prose — UTF-8 normal)

La Cisplatina (Banda Oriental) era parte de las Provincias Unidas desde 1821; Brasil la ocupó en 1825, desencadenando la guerra Argentina-Brasil (1825–1828). La guerra terminó con la Convención Preliminar de Paz (27 agosto 1828), negociada por el diplomático británico Lord Ponsonby: ambas partes se retiraron y la Banda Oriental se constituyó como estado independiente (Uruguay). Dorrego, como gobernador de Buenos Aires y responsable de facto de la política exterior, firmó el tratado. Fue profundamente impopular: Buenos Aires había combatido y gastado, y ahora cedía un territorio que consideraba propio desde 1821. Esto le dio a Lavalle un pretexto político concreto — Dorrego era "culpable" de la humillación nacional — que sirvió para encuadrar el golpe del 1 de diciembre de 1828 como "acto patriótico".

**Fuentes:**
- Lynch, J., *Argentine Dictator: Juan Manuel de Rosas 1829–1852*, Oxford, 1981, cap. 3.
- Saldías, A., *Historia de la Confederación Argentina*, t. I, Buenos Aires, 1892.
- Goldman, N. y Salvatore, R. (comps.), *Caudillismos rioplatenses*, EUDEBA, Buenos Aires, 1998.
- La Convención Preliminar de Paz, 27 agosto 1828 (fuente primaria).

### Alt text para imagen

Pintura que representa el fusilamiento de Manuel Dorrego el 13 de diciembre de 1828 en Navarro, provincia de Buenos Aires. Dorrego, gobernador federal de Buenos Aires, fue ejecutado sin juicio por orden del general unitario Juan Lavalle tras el golpe del 1 de diciembre de 1828.

---

## S20-2: La línea de sangre (opinión)

**Certeza:** opinión (entity-encoded en HTML: `opini&#xF3;n`)  
**Año display:** 1828–1829  
**Clase HTML:** card-opinion  
**Imagen:** https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Juan_Lavalle.jpg/500px-Juan_Lavalle.jpg  
**Stagger:** 80ms

### Contenido (prose — UTF-8 normal)

Interpretación historiográfica atribuida a tres historiadores: Saldías (1892) encuadró el fusilamiento como el acto inaugural de una nueva forma de política argentina — la eliminación de un gobernador legítimo sin juicio como arma política, un precedente que ninguna facción podría desautorizar sin condenarse a sí misma. Halperín Donghi (1972) argumenta que el fusilamiento "cerró el ciclo de las guerras civiles de transición y abrió el de las guerras civiles permanentes" — transformó el conflicto faccionario en vendetta de sangre donde la derrota significaba la muerte. Lynch (1981, cap. 3) señala que el error de Lavalle no fue militar sino político: al matar a un gobernador electo sin proceso, validó cada acto de violencia subsiguiente en nombre de la "venganza federal" y le entregó a Rosas la legitimidad moral que ningún argumento político hubiera podido fabricar.

**Fuentes:**
- Lynch, J., *Argentine Dictator: Juan Manuel de Rosas 1829–1852*, Oxford, 1981, cap. 3.
- Halperín Donghi, T., *De la revolución de independencia a la confederación rosista*, Paidós, Buenos Aires, 1972.
- Saldías, A., *Historia de la Confederación Argentina*, t. I, Buenos Aires, 1892.

### Alt text para imagen

Retrato del general unitario Juan Lavalle, cuyo fusilamiento del gobernador Manuel Dorrego el 13 de diciembre de 1828 transformó el conflicto faccionario argentino en una vendetta de sangre con consecuencias políticas que se extendieron décadas.

---

## T02 Recipe

The HTML block below is verbatim, entity-encoded, and ready to splice before the append marker in index.html. All non-ASCII characters are HTML entities. No raw UTF-8 chars appear below this line.

```html
<!-- S20-1: La paz impopular: la Convenci&#xF3;n Preliminar de 1828 y la vulnerabilidad de Dorrego -->
            <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" data-id="S20-1" style="--reveal-delay: 0ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">&#x2713;</span>
                <span class="card-certeza-label">Hecho documentado</span>
              </div>
              <div class="card-image">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Dorrego-fusilamiento.jpg/500px-Dorrego-fusilamiento.jpg"
                     alt="Pintura que representa el fusilamiento de Manuel Dorrego el 13 de diciembre de 1828 en Navarro, provincia de Buenos Aires. Dorrego, gobernador federal de Buenos Aires, fue ejecutado sin juicio por orden del general unitario Juan Lavalle tras el golpe del 1 de diciembre de 1828."
                     loading="lazy">
              </div>
              <span class="event-card__year">1828</span>
              <h3 class="event-card__title">La paz impopular: la Convenci&#xF3;n Preliminar de 1828 y la vulnerabilidad de Dorrego</h3>
              <p class="event-card__excerpt">La Cisplatina (Banda Oriental) era parte de las Provincias Unidas desde 1821; Brasil la ocup&#xF3; en 1825, desencadenando la guerra Argentina-Brasil (1825&#x2013;1828). La guerra termin&#xF3; con la Convenci&#xF3;n Preliminar de Paz (27 agosto 1828), negociada por el diplom&#xE1;tico brit&#xE1;nico Lord Ponsonby: ambas partes se retiraron y la Banda Oriental se constituy&#xF3; como estado independiente (Uruguay). Dorrego, como gobernador de Buenos Aires y responsable de facto de la pol&#xED;tica exterior, firm&#xF3; el tratado. Fue profundamente impopular: Buenos Aires hab&#xED;a combatido y gastado, y ahora ced&#xED;a un territorio que consideraba propio desde 1821. Esto le dio a Lavalle un pretexto pol&#xED;tico concreto &#x2014;Dorrego era &#x201C;culpable&#x201D; de la humillaci&#xF3;n nacional&#x2014; que sirvi&#xF3; para encuadrar el golpe del 1 de diciembre de 1828 como &#x201C;acto patri&#xF3;tico&#x201D;.</p>
              <footer class="card-source">
                <span class="card-source__icon" aria-hidden="true">&#x1F4C4;</span>
                <cite>Lynch, J., <em>Argentine Dictator: Juan Manuel de Rosas 1829&#x2013;1852</em>, Oxford, 1981, cap. 3. Sald&#xED;as, A., <em>Historia de la Confederaci&#xF3;n Argentina</em>, t. I, 1892. Goldman, N. y Salvatore, R. (comps.), <em>Caudillismos rioplatenses</em>, EUDEBA, 1998. Convenci&#xF3;n Preliminar de Paz, 27 agosto 1828 (fuente primaria).</cite>
              </footer>
            </article>
<!-- S20-2: La l&#xED;nea de sangre: el fusilamiento como ruptura fundacional de la pol&#xED;tica argentina -->
            <article class="event-card card-opinion reveal reveal-slide" data-certeza="opini&#xF3;n" data-id="S20-2" style="--reveal-delay: 80ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">&#x1F4AC;</span>
                <span class="card-certeza-label">Interpretaci&#xF3;n historiogr&#xE1;fica</span>
              </div>
              <div class="card-image">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Juan_Lavalle.jpg/500px-Juan_Lavalle.jpg"
                     alt="Retrato del general unitario Juan Lavalle, cuyo fusilamiento del gobernador Manuel Dorrego el 13 de diciembre de 1828 transform&#xF3; el conflicto faccionario argentino en una vendetta de sangre con consecuencias pol&#xED;ticas que se extendieron d&#xE9;cadas."
                     loading="lazy">
              </div>
              <span class="event-card__year">1828&#x2013;1829</span>
              <h3 class="event-card__title">La l&#xED;nea de sangre: el fusilamiento como ruptura fundacional de la pol&#xED;tica argentina</h3>
              <p class="event-card__excerpt">Interpretaci&#xF3;n historiogr&#xE1;fica atribuida a tres historiadores: Sald&#xED;as (1892) encuadr&#xF3; el fusilamiento como el acto inaugural de una nueva forma de pol&#xED;tica argentina &#x2014;la eliminaci&#xF3;n de un gobernador leg&#xED;timo sin juicio como arma pol&#xED;tica&#x2014;, un precedente que ninguna facci&#xF3;n podr&#xED;a desautorizar sin condenarse a s&#xED; misma. Halper&#xED;n Donghi (1972) argumenta que el fusilamiento &#x201C;cerr&#xF3; el ciclo de las guerras civiles de transici&#xF3;n y abri&#xF3; el de las guerras civiles permanentes&#x201D; &#x2014;transform&#xF3; el conflicto faccionario en vendetta de sangre donde la derrota significaba la muerte. Lynch (1981, cap. 3) se&#xF1;ala que el error de Lavalle no fue militar sino pol&#xED;tico: al matar a un gobernador electo sin proceso, valid&#xF3; cada acto de violencia subsiguiente en nombre de la &#x201C;venganza federal&#x201D; y le entreg&#xF3; a Rosas la legitimidad moral que ning&#xFA;n argumento pol&#xED;tico hubiera podido fabricar.</p>
              <footer class="card-source">
                <span class="card-source__icon" aria-hidden="true">&#x1F4C4;</span>
                <cite>Lynch, J., <em>Argentine Dictator: Juan Manuel de Rosas 1829&#x2013;1852</em>, Oxford, 1981, cap. 3. Halper&#xED;n Donghi, T., <em>De la revoluci&#xF3;n de independencia a la confederaci&#xF3;n rosista</em>, Pa&#xED;d&#xF3;s, 1972. Sald&#xED;as, A., <em>Historia de la Confederaci&#xF3;n Argentina</em>, t. I, 1892.</cite>
              </footer>
            </article>
```
