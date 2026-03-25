# S17-CONTENT-DRAFT — ¿Sin Rosas, Argentina sería un caos?

**Slice:** S17 | **Milestone:** M008 | **Status:** T01 complete

---

## Overview

This slice adds one interpretive card to `#periodo-rosas` in `index.html`, inserted before the append marker (line 1850). The card addresses the "historical necessity" argument for Rosas — the internal-order counterfactual — and is explicitly distinct from:

- **S14-3**: general "what was the regime?" polarity (liberal/tiranía vs. revisionista/caudillo popular) — S17 does NOT repeat this
- **S16-3**: scale of Mazorca repression — S17 does NOT address victim counts
- **S22** (future): Rosas as guarantor of external sovereignty / bloqueos / foreign-policy argument — S17 does NOT include this

**S17's specific scope:** Was the *internal order* Rosas provided historically necessary? Would Argentina have dissolved into civil war without him? — the "orden interno necesario" counterfactual.

---

## Card S17-1: ¿Era Rosas un mal necesario? El argumento de la necesidad histórica

**Type:** `card-opinion` | `data-certeza="opinión"` | stagger: `0ms` | no image  
**Year label:** `debate historiográfico`  
**Title:** `¿Era Rosas un mal necesario? El argumento de la necesidad histórica`

### Prose (excerpt)

El argumento más poderoso en favor del largo gobierno de Rosas no es moral sino estructural: sin él, ¿habría sobrevivido el Estado argentino? La década de 1820 ofrece el escenario contrafáctico: tras la batalla de Cepeda (1820), Buenos Aires tuvo ocho gobernadores en un año, las provincias operaban como repúblicas en guerra permanente, y el fusilamiento del gobernador Dorrego en diciembre de 1828 —ordenado por el general Lavalle— demostró que ni siquiera el acuerdo entre facciones porteñas era posible sin ruptura violenta. Rosas consolidó un orden relativo entre 1829 y aproximadamente 1845, sostenido en una coalición que ningún otro actor político del período había logrado ensamblar. La pregunta historiográfica central es si ese orden requería *a Rosas específicamente*, o si cualquier autoridad fuerte lo habría alcanzado.

### card-nota-historiografica content

**Nota historiográfica:**

- **Posición revisionista** (Irazusta, Rosa): Rosas fue indispensable. Ningún otro actor político del período podía convocar simultáneamente a los estancieros bonaerenses, los caudillos del interior y las clases populares rurales; la coalición era personal, no institucional. El proyecto liberal-unitario había demostrado entre 1820 y 1829 que era incapaz de sostener el orden: Rivadavia renunció en 1827 sin haber unificado el país, y la guerra civil de 1828 siguió de inmediato. Sin Rosas, Argentina habría sufrido o la fragmentación definitiva o la absorción por acreedores y potencias extranjeras. Citación: Julio Irazusta, *Vida política de Juan Manuel de Rosas*, Buenos Aires, 1941.

- **Posición liberal / síntesis** (Halperín Donghi, Lynch): Rosas fue históricamente necesario para una *ventana específica* (1829–~1845) pero se convirtió en un obstáculo a la organización nacional en su última década. La evidencia más contundente contra la tesis de la indispensabilidad es la velocidad de la posguerra de Caseros: Urquiza logró la Constitución de 1853 en menos de dieciocho meses, lo que demuestra que el país no necesitaba a Rosas personalmente — lo que necesitaba era autoridad fuerte, y Rosas monopolizó ese rol sin habilitar ninguna sucesión institucional. Citaciones: Tulio Halperín Donghi, *De la revolución de independencia a la confederación rosista*, Paidós, Buenos Aires, 1972; John Lynch, *Argentine Dictator: Juan Manuel de Rosas 1829–1852*, Oxford, 1981, cap. 10.

### Sources / Footer cite

- Irazusta, J., *Vida política de Juan Manuel de Rosas*, Buenos Aires, 1941.
- Halperín Donghi, T., *De la revolución de independencia a la confederación rosista*, Paidós, Buenos Aires, 1972.
- Lynch, J., *Argentine Dictator: Juan Manuel de Rosas 1829–1852*, Oxford, 1981, cap. 10.

---

## T02 Recipe

The HTML block below must be inserted verbatim before the append marker (`<!-- S10–S24 cards will be appended here by subsequent slices -->`). All non-ASCII characters are encoded as HTML entities. Copy this block exactly.

```html
<!-- S17-1: Rosas &#x2014; necesidad hist&#xF3;rica -->
            <article class="event-card card-opinion reveal reveal-fade" data-certeza="opini&#xF3;n" data-id="S17-1" style="--reveal-delay: 0ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">&#x1F4AC;</span>
                <span class="card-certeza-label">Opini&#xF3;n / debate interpretativo</span>
              </div>
              <span class="event-card__year">debate historiogr&#xE1;fico</span>
              <h3 class="event-card__title">&#xBF;Era Rosas un mal necesario? El argumento de la necesidad hist&#xF3;rica</h3>
              <p class="event-card__excerpt">El argumento m&#xE1;s poderoso en favor del largo gobierno de Rosas no es moral sino estructural: sin &#xE9;l, &#xBF;habr&#xED;a sobrevivido el Estado argentino? La d&#xE9;cada de 1820 ofrece el escenario contraf&#xE1;ctico: tras la batalla de Cepeda (1820), Buenos Aires tuvo ocho gobernadores en un a&#xF1;o, las provincias operaban como rep&#xFA;blicas en guerra permanente, y el fusilamiento del gobernador Dorrego en diciembre de 1828 &#x2014;ordenado por el general Lavalle&#x2014; demostr&#xF3; que ni siquiera el acuerdo entre facciones portenas era posible sin ruptura violenta. Rosas consolid&#xF3; un orden relativo entre 1829 y aproximadamente 1845, sostenido en una coalici&#xF3;n que ning&#xFA;n otro actor pol&#xED;tico del per&#xED;odo hab&#xED;a logrado ensamblar. La pregunta historiogr&#xE1;fica central es si ese orden requer&#xED;a a Rosas espec&#xED;ficamente, o si cualquier autoridad fuerte lo habr&#xED;a alcanzado.</p>
              <p class="card-nota-historiografica"><strong>Nota historiogr&#xE1;fica:</strong> La posici&#xF3;n revisionista (Irazusta, Rosa) sostiene que Rosas fue indispensable: ning&#xFA;n otro actor pod&#xED;a convocar simult&#xE1;neamente a estancieros bonaereneses, caudillos del interior y clases populares rurales; el proyecto liberal-unitario hab&#xED;a demostrado entre 1820 y 1829 que era incapaz de sostener el orden; sin Rosas, Argentina habr&#xED;a sufrido la fragmentaci&#xF3;n definitiva o la absorci&#xF3;n por potencias extranjeras (Irazusta, J., <em>Vida pol&#xED;tica de Juan Manuel de Rosas</em>, Buenos Aires, 1941). La posici&#xF3;n liberal&#x2F;s&#xED;ntesis (Halper&#xED;n Donghi, Lynch) reconoce una necesidad hist&#xF3;rica para la ventana 1829&#x2013;&#x7E;1845, pero la niega para la d&#xE9;cada final: Urquiza logr&#xF3; la Constituci&#xF3;n de 1853 en menos de dieciocho meses tras Caseros, demostrando que el pa&#xED;s no requer&#xED;a a Rosas personalmente &#x2014;s&#xF3;lo autoridad fuerte&#x2014; y que Rosas monopoliz&#xF3; ese rol sin habilitar ninguna sucesi&#xF3;n institucional (Halper&#xED;n Donghi, T., <em>De la revoluci&#xF3;n de independencia a la confederaci&#xF3;n rosista</em>, Pa&#xED;d&#xF3;s, 1972; Lynch, J., <em>Argentine Dictator</em>, Oxford, 1981, cap. 10).</p>
              <footer class="card-source">
                <span class="card-source__icon" aria-hidden="true">&#x1F4C4;</span>
                <cite>Irazusta, J., <em>Vida pol&#xED;tica de Juan Manuel de Rosas</em>, Buenos Aires, 1941. Halper&#xED;n Donghi, T., <em>De la revoluci&#xF3;n de independencia a la confederaci&#xF3;n rosista</em>, Pa&#xED;d&#xF3;s, Buenos Aires, 1972. Lynch, J., <em>Argentine Dictator: Juan Manuel de Rosas 1829&#x2013;1852</em>, Oxford, 1981, cap. 10.</cite>
              </footer>
            </article>
```

---

## Scope Compliance Checklist

- [x] No bloqueos / foreign-policy / sovereignty content (→ S22)
- [x] No repetition of S14-3's general tiranía vs. caudillo popular polarity
- [x] No repetition of S16-3's victim-count / scale-of-repression debate
- [x] Two-position nota (revisionista + liberal/síntesis) with source attribution per position
- [x] `data-certeza="opinión"` with accent (HTML entity `opini&#xF3;n` in Recipe block)
- [x] All non-ASCII in Recipe block encoded as HTML entities
- [x] No `<figure>` / no `<img>` block
- [x] Stagger: `0ms` (single card in slice)
- [x] `data-id="S17-1"`
