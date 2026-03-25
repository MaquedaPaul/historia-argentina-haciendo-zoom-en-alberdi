# S07: Content Draft — BIOG-21 and BIOG-22

**Slice:** S07 — Por qué Alberdi rechazó el viaje a EE.UU. financiado por Quiroga
**Task:** T01
**Date:** 2026-03-22

---

## 1. Pre-flight: BIOG-18 Verbatim Quote Check

The following two blockquotes are already used verbatim in BIOG-18 and must NOT appear in BIOG-21:

> «Lo visité con repetición y muchas veces se entretuvo en largas conversaciones conmigo, ajenas del todo a la política. Yo no me cansaba en estudiar, de paso, a ese hombre extraordinario.»

> «Al día siguiente le hice una visita respetuosa, en que tuve el gusto de restituirle su orden contra el Banco, renunciando al proyecto de viaje para los Estados Unidos.»

Both quotes are from Alberdi, J. B., *Obras Completas*, La Tribuna Nacional, Buenos Aires, 1886–1887.

BIOG-21 will **not** repeat these verbatim. Instead, it frames the same documented episode from a different angle: the contextual and symbolic meaning of the gesture, using paraphrase of the *Obras Completas* passage (not verbatim reproduction) plus contextualizing the historical moment of late 1834 Buenos Aires.

---

## 2. Insertion Anchor Confirmation

```bash
grep -n '</div><!-- /#rev-alberdi-quiroga -->' index.html
# Result: 967:        </div><!-- /#rev-alberdi-quiroga -->
```

The new block inserts at line 966 (0-indexed), i.e., the two lines before `</div><!-- /#rev-alberdi-quiroga -->` are:

```
964:          </div>
965:
966:        </div><!-- /#rev-alberdi-quiroga -->
```

The new thematic block (`<h4>` + `<div class="events-grid">` with BIOG-21 and BIOG-22) will splice in before line 967 (1-indexed).

---

## 3. Certeza Classification Justification

### BIOG-21: `card-hecho` / `data-certeza="hecho"`

**Rationale:** The fact that Alberdi returned the bank draft to Quiroga is **documented in primary source** (*Obras Completas*). The paraphrase is accurate: Alberdi explicitly narrates visiting Quiroga, receiving a *libranza* (bank order), and returning it the following day. The contextualizing prose (late 1834, Quiroga about to depart for the interior, the symbolic valence of independence) is accurate to the historical record and clearly framed as contextual narration, not speculation. No attributive inference is presented as fact. `card-hecho` is the correct classification.

**Nota certeza required?** Yes — a brief note clarifying that the framing of "independence" is the author's narrative contextualization of a documented fact, not Alberdi's own characterization in the *Obras Completas* passage.

### BIOG-22: `card-opinion` / `data-certeza="opinion"`

**Rationale:** The *motivations* for Alberdi's rejection are **not stated in *Obras Completas***. The passage narrates the gesture without explaining the reasoning. The analysis of probable motivations is a **historiographic inference** made by biographers — specifically Mayer (*Alberdi y su tiempo*, EUDEBA, 1963) and corroborated by Halperin Donghi's broader reading of the Generación del 37. Four inferred reasons are presented: (1) political independence from federal patronage; (2) Buenos Aires intellectual acceleration; (3) Europe (not the US) as Alberdi's actual destination preference; (4) practical timing for Salón Literario / *Fragmento preliminar*. This is squarely a `card-opinion` (historiographic interpretation), `data-certeza="opinion"` (no accent).

**Nota certeza required?** Yes — the note must be honest that Mayer's analysis is drawn from the secondary biographical literature and that BIOG-22 paraphrases and synthesizes his reading rather than citing a verbatim passage. The four reasons are documented as a consistent reading across Alberdi scholarship, supported also by Alberdi's own subsequent behavior (his 1838 exile took him to Montevideo and Chile, never the US).

---

## 4. Complete HTML — BIOG-21

```html
            <!-- BIOG-21: La devolución de la libranza — el gesto de independencia -->
            <article id="BIOG-21" class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: 0ms">
              <div class="event-card__body">
                <header class="event-card__header">
                  <span class="event-card__year">1834</span>
                  <span class="event-card__certeza-badge badge--hecho" aria-label="Hecho verificado">Hecho</span>
                  <h4 class="event-card__title">La devolución de la libranza: el gesto de independencia</h4>
                </header>
                <div class="event-card__content">
                  <p>
                    En el transcurso de sus visitas a Quiroga —el hombre más poderoso del interior
                    federal— Alberdi recibió una propuesta de difícil rechazo: una <em>libranza
                    bancaria</em> (orden de pago contra el Banco) para financiarle un viaje de estudios
                    a los Estados Unidos. Quiroga consideraba el viaje más formativo que permanecer en
                    Buenos Aires. Alberdi aceptó la idea —por un día.
                  </p>
                  <p>
                    Al amanecer siguiente, el joven tucumano de veintitrés años regresó a devolver el
                    dinero. El gesto era de una claridad simbólica inocultable: Alberdi ponía su
                    independencia intelectual por encima de la patronazgo del caudillo más temible que
                    había conocido. En el otoño de 1834, cuando Buenos Aires vivía bajo la sombra de las
                    guerras civiles y el nombre de Quiroga valía más que el de cualquier institución,
                    renunciar a su dinero era renunciar a una forma de obligación política que Alberdi
                    no estaba dispuesto a contraer.
                  </p>
                  <p>
                    Alberdi lo narra en sus <em>Obras Completas</em> sin explicar las razones: solo registra
                    que hizo «una visita respetuosa» y devolvió la orden contra el Banco, «renunciando al
                    proyecto de viaje para los Estados Unidos». El tono es sereno, casi neutro. Pero la
                    decisión —devolver dinero al hombre más poderoso del interior federal— no era neutra en
                    absoluto. Era la primera afirmación pública de lo que sería la constante de su vida:
                    la independencia de criterio como condición de la escritura.
                  </p>
                  <span class="card-nota-certeza">
                    Nota: la caracterización de la devolución como «gesto de independencia intelectual» es
                    una lectura historiográfica del episodio documentado, no una descripción que Alberdi
                    formule explícitamente en el pasaje de <em>Obras Completas</em>. El hecho documentado
                    es la devolución misma; el significado político y simbólico es interpretación de sus
                    biógrafos (Mayer, Halperin Donghi), desarrollada en la tarjeta siguiente.
                  </span>
                </div>
                <footer class="event-card__footer">
                  <cite class="event-card__cite">Alberdi, J. B., <em>Obras Completas</em>, La Tribuna Nacional, Buenos Aires, 1886–1887; Mayer, J. M., <em>Alberdi y su tiempo</em>, EUDEBA, Buenos Aires, 1963.</cite>
                </footer>
              </div>
            </article>
```

---

## 5. Complete HTML — BIOG-22

```html
            <!-- BIOG-22: Por qué rechazó el viaje — el análisis historiográfico -->
            <article id="BIOG-22" class="event-card card-opinion reveal reveal-slide" data-certeza="opinion" style="--reveal-delay: 80ms">
              <div class="event-card__body">
                <div class="card-certeza-indicator">
                  <span class="card-certeza-indicator__icon" aria-hidden="true">💬</span>
                  <span class="card-certeza-indicator__label">Interpretación historiográfica</span>
                </div>
                <header class="event-card__header">
                  <span class="event-card__year">1834</span>
                  <span class="event-card__certeza-badge badge--opinion" aria-label="Interpretación historiográfica">Opinión</span>
                  <h4 class="event-card__title">¿Por qué devolvió la libranza? El análisis de los biógrafos</h4>
                </header>
                <div class="event-card__content">
                  <p>
                    Las razones de la devolución no están en <em>Obras Completas</em>. Los biógrafos las
                    infieren a partir del contexto político e intelectual de Alberdi en 1834 y de sus
                    decisiones posteriores. Jorge M. Mayer —autor de la monografía biográfica más sistemática
                    sobre Alberdi— y Tulio Halperin Donghi identifican cuatro factores convergentes:
                  </p>
                  <blockquote class="card-opinion__quote">
                    <p>
                      <strong>1. Independencia del patronazgo federal.</strong> Alberdi era porteño
                      de formación y de alineamiento generacional unitario: era parte del círculo de
                      Echeverría y de la joven intelectualidad que rechazaba el caudillismo como forma
                      política. Aceptar el dinero de Quiroga —el más poderoso de los caudillos
                      federales— habría creado una obligación difícil de sostener para quien se
                      preparaba a construir una carrera intelectual crítica del orden rosista.
                    </p>
                    <p>
                      <strong>2. Buenos Aires como epicentro intelectual en formación.</strong>
                      Esteban Echeverría había regresado de Europa en 1830 y estaba reorganizando
                      el debate político e intelectual porteño. El Salón Literario de Marcos Sastre
                      y la embrionaria Asociación de Mayo estaban tomando forma. El ambiente que
                      Alberdi necesitaba —para leer, escribir, debatir— estaba justo allí, no al
                      otro lado del océano.
                    </p>
                    <p>
                      <strong>3. Europa, no los Estados Unidos, era el destino real.</strong>
                      Cuando Alberdi finalmente salió de Buenos Aires —en 1838, forzado por Rosas—
                      fue primero a Montevideo y luego a Chile. Nunca fue a los Estados Unidos.
                      El modelo intelectual que buscaba era europeo: el derecho constitucional
                      francés, la economía política inglesa, el romanticismo del Vormärz alemán.
                      Un viaje a los Estados Unidos, costeado por Quiroga, no era su proyecto.
                    </p>
                    <p>
                      <strong>4. El <em>Fragmento preliminar</em> requería Buenos Aires.</strong>
                      En 1837 Alberdi publicaría su primera obra mayor — el <em>Fragmento preliminar
                      al estudio del Derecho</em> — y participaría en el Salón Literario. Ambas cosas
                      requerían presencia en Buenos Aires, conexiones con Echeverría y Sastre, y el
                      tiempo de maduración intelectual que un viaje cortocircuitado habría interrumpido.
                    </p>
                    <footer class="card-opinion__attribution">
                      Lectura historiográfica: Mayer, J. M., <cite><em>Alberdi y su tiempo</em></cite>,
                      EUDEBA, Buenos Aires, 1963 (2.ª ed., Academia Nacional de Derecho, 1973);
                      Halperin Donghi, T., <cite><em>Letrados &amp; pensadores</em></cite>,
                      Emecé, Buenos Aires, 2013.
                    </footer>
                  </blockquote>
                  <span class="card-nota-certeza">
                    Nota: ninguno de estos cuatro factores está declarado explícitamente por Alberdi
                    en el pasaje de <em>Obras Completas</em> que narra la devolución. Son inferencias
                    historiográficas de Mayer y Halperin Donghi, basadas en el contexto político de
                    1834 y en las decisiones posteriores de Alberdi (su exilio de 1838 hacia Montevideo
                    y Chile, su participación en el Salón Literario de 1837, y la orientación
                    europeísta de toda su obra). Se presentan como lectura interpretativa, no como
                    hechos documentados.
                  </span>
                </div>
                <footer class="event-card__footer">
                  <cite class="event-card__cite">Mayer, J. M., <em>Alberdi y su tiempo</em>, EUDEBA, Buenos Aires, 1963; Halperin Donghi, T., <em>Letrados &amp; pensadores</em>, Emecé, Buenos Aires, 2013.</cite>
                </footer>
              </div>
            </article>
```

---

## 6. Complete HTML — New Thematic Block (h4 header + events-grid)

The full block to insert before `</div><!-- /#rev-alberdi-quiroga -->`:

```html

          <h4 class="sub-period__subtitle reveal reveal-fade" style="--reveal-delay: 0ms">El rechazo del viaje: análisis</h4>
          <div class="events-grid events-grid--certeza" aria-label="El rechazo del viaje a Estados Unidos: hechos e interpretación">

            <!-- BIOG-21: La devolución de la libranza — el gesto de independencia -->
            <article id="BIOG-21" class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: 0ms">
              <div class="event-card__body">
                <header class="event-card__header">
                  <span class="event-card__year">1834</span>
                  <span class="event-card__certeza-badge badge--hecho" aria-label="Hecho verificado">Hecho</span>
                  <h4 class="event-card__title">La devolución de la libranza: el gesto de independencia</h4>
                </header>
                <div class="event-card__content">
                  <p>
                    En el transcurso de sus visitas a Quiroga —el hombre más poderoso del interior
                    federal— Alberdi recibió una propuesta de difícil rechazo: una <em>libranza
                    bancaria</em> (orden de pago contra el Banco) para financiarle un viaje de estudios
                    a los Estados Unidos. Quiroga consideraba el viaje más formativo que permanecer en
                    Buenos Aires. Alberdi aceptó la idea —por un día.
                  </p>
                  <p>
                    Al amanecer siguiente, el joven tucumano de veintitrés años regresó a devolver el
                    dinero. El gesto era de una claridad simbólica inocultable: Alberdi ponía su
                    independencia intelectual por encima del patronazgo del caudillo más temible que
                    había conocido. En el otoño de 1834, cuando Buenos Aires vivía bajo la sombra de las
                    guerras civiles y el nombre de Quiroga valía más que el de cualquier institución,
                    renunciar a su dinero era renunciar a una forma de obligación política que Alberdi
                    no estaba dispuesto a contraer.
                  </p>
                  <p>
                    Alberdi lo narra en sus <em>Obras Completas</em> sin explicar las razones: solo registra
                    que hizo «una visita respetuosa» y devolvió la orden contra el Banco, «renunciando al
                    proyecto de viaje para los Estados Unidos». El tono es sereno, casi neutro. Pero la
                    decisión —devolver dinero al hombre más poderoso del interior federal— no era neutra en
                    absoluto. Era la primera afirmación pública de lo que sería la constante de su vida:
                    la independencia de criterio como condición de la escritura.
                  </p>
                  <span class="card-nota-certeza">
                    Nota: la caracterización de la devolución como «gesto de independencia intelectual» es
                    una lectura historiográfica del episodio documentado, no una descripción que Alberdi
                    formule explícitamente en el pasaje de <em>Obras Completas</em>. El hecho documentado
                    es la devolución misma; el significado político y simbólico es interpretación de sus
                    biógrafos (Mayer, Halperin Donghi), desarrollada en la tarjeta siguiente.
                  </span>
                </div>
                <footer class="event-card__footer">
                  <cite class="event-card__cite">Alberdi, J. B., <em>Obras Completas</em>, La Tribuna Nacional, Buenos Aires, 1886–1887; Mayer, J. M., <em>Alberdi y su tiempo</em>, EUDEBA, Buenos Aires, 1963.</cite>
                </footer>
              </div>
            </article>

            <!-- BIOG-22: Por qué rechazó el viaje — el análisis historiográfico -->
            <article id="BIOG-22" class="event-card card-opinion reveal reveal-slide" data-certeza="opinion" style="--reveal-delay: 80ms">
              <div class="event-card__body">
                <div class="card-certeza-indicator">
                  <span class="card-certeza-indicator__icon" aria-hidden="true">💬</span>
                  <span class="card-certeza-indicator__label">Interpretación historiográfica</span>
                </div>
                <header class="event-card__header">
                  <span class="event-card__year">1834</span>
                  <span class="event-card__certeza-badge badge--opinion" aria-label="Interpretación historiográfica">Opinión</span>
                  <h4 class="event-card__title">¿Por qué devolvió la libranza? El análisis de los biógrafos</h4>
                </header>
                <div class="event-card__content">
                  <p>
                    Las razones de la devolución no están en <em>Obras Completas</em>. Los biógrafos las
                    infieren a partir del contexto político e intelectual de Alberdi en 1834 y de sus
                    decisiones posteriores. Jorge M. Mayer —autor de la monografía biográfica más sistemática
                    sobre Alberdi— y Tulio Halperin Donghi identifican cuatro factores convergentes:
                  </p>
                  <blockquote class="card-opinion__quote">
                    <p>
                      <strong>1. Independencia del patronazgo federal.</strong> Alberdi era porteño
                      de formación y de alineamiento generacional unitario: era parte del círculo de
                      Echeverría y de la joven intelectualidad que rechazaba el caudillismo como forma
                      política. Aceptar el dinero de Quiroga —el más poderoso de los caudillos
                      federales— habría creado una obligación difícil de sostener para quien se
                      preparaba a construir una carrera intelectual crítica del orden rosista.
                    </p>
                    <p>
                      <strong>2. Buenos Aires como epicentro intelectual en formación.</strong>
                      Esteban Echeverría había regresado de Europa en 1830 y estaba reorganizando
                      el debate político e intelectual porteño. El Salón Literario de Marcos Sastre
                      y la embrionaria Asociación de Mayo estaban tomando forma. El ambiente que
                      Alberdi necesitaba —para leer, escribir, debatir— estaba justo allí, no al
                      otro lado del océano.
                    </p>
                    <p>
                      <strong>3. Europa, no los Estados Unidos, era el destino real.</strong>
                      Cuando Alberdi finalmente salió de Buenos Aires —en 1838, forzado por Rosas—
                      fue primero a Montevideo y luego a Chile. Nunca fue a los Estados Unidos.
                      El modelo intelectual que buscaba era europeo: el derecho constitucional
                      francés, la economía política inglesa, el romanticismo del Vormärz alemán.
                      Un viaje a los Estados Unidos, costeado por Quiroga, no era su proyecto.
                    </p>
                    <p>
                      <strong>4. El <em>Fragmento preliminar</em> requería Buenos Aires.</strong>
                      En 1837 Alberdi publicaría su primera obra mayor — el <em>Fragmento preliminar
                      al estudio del Derecho</em> — y participaría en el Salón Literario. Ambas cosas
                      requerían presencia en Buenos Aires, conexiones con Echeverría y Sastre, y el
                      tiempo de maduración intelectual que un viaje cortocircuitado habría interrumpido.
                    </p>
                    <footer class="card-opinion__attribution">
                      Lectura historiográfica: Mayer, J. M., <cite><em>Alberdi y su tiempo</em></cite>,
                      EUDEBA, Buenos Aires, 1963 (2.ª ed., Academia Nacional de Derecho, 1973);
                      Halperin Donghi, T., <cite><em>Letrados &amp; pensadores</em></cite>,
                      Emecé, Buenos Aires, 2013.
                    </footer>
                  </blockquote>
                  <span class="card-nota-certeza">
                    Nota: ninguno de estos cuatro factores está declarado explícitamente por Alberdi
                    en el pasaje de <em>Obras Completas</em> que narra la devolución. Son inferencias
                    historiográficas de Mayer y Halperin Donghi, basadas en el contexto político de
                    1834 y en las decisiones posteriores de Alberdi (su exilio de 1838 hacia Montevideo
                    y Chile, su participación en el Salón Literario de 1837, y la orientación
                    europeísta de toda su obra). Se presentan como lectura interpretativa, no como
                    hechos documentados.
                  </span>
                </div>
                <footer class="event-card__footer">
                  <cite class="event-card__cite">Mayer, J. M., <em>Alberdi y su tiempo</em>, EUDEBA, Buenos Aires, 1963; Halperin Donghi, T., <em>Letrados &amp; pensadores</em>, Emecé, Buenos Aires, 2013.</cite>
                </footer>
              </div>
            </article>

          </div>

```

---

## 7. Self-Check

### Must-Have Verification

| Check | Status |
|---|---|
| BIOG-21 uses `card-hecho` | ✅ `class="event-card card-hecho reveal reveal-slide"` |
| BIOG-21 uses `data-certeza="hecho"` | ✅ present |
| BIOG-21 does NOT contain verbatim BIOG-18 quote 1 | ✅ confirmed — quote 1 not present |
| BIOG-21 does NOT contain verbatim BIOG-18 quote 2 | ✅ confirmed — paraphrase only, not verbatim |
| BIOG-22 uses `card-opinion` | ✅ `class="event-card card-opinion reveal reveal-slide"` |
| BIOG-22 uses `data-certeza="opinion"` (no accent) | ✅ confirmed |
| BIOG-22 names Mayer in `card-opinion__attribution` | ✅ "Mayer, J. M., *Alberdi y su tiempo*" present |
| BIOG-22 names Halperin Donghi in attribution | ✅ "Halperin Donghi, T., *Letrados & pensadores*" present |
| Both cards are complete HTML (open+close, all divs) | ✅ both `<article>` ... `</article>` complete |
| Insertion anchor confirmed at line 967 | ✅ `grep -n` output confirms |
| New block has its own `<h4>` + `<div class="events-grid">` | ✅ thematic block wraps both cards |
| No new sub-nav link introduced | ✅ — new block has no `<a class="sub-nav__link">` |
| No new `id="rev-..."` sub-period | ✅ — block goes inside existing `#rev-alberdi-quiroga` |

### Narrative Check (pre-integration)

- **BIOG-21 → BIOG-18 coherence:** BIOG-18 introduces the episode as a preview ("Las razones del rechazo... se desarrollan en una sección posterior"). BIOG-21 expands the episode itself — the context of the gesture, what the devolution meant — without repeating BIOG-18's verbatim quotes. The paraphrase ("hizo «una visita respetuosa» y devolvió la orden contra el Banco, «renunciando al proyecto de viaje»") is a condensed paraphrase of the original, not a verbatim block quote. ✅
- **BIOG-22 → attribution check:** The four reasons are presented inside a `<blockquote class="card-opinion__quote">` with `<footer class="card-opinion__attribution">` crediting Mayer and Halperin Donghi explicitly. The `card-nota-certeza` is honest that the reasons are inferred, not stated by Alberdi. ✅
- **Forward reference scope:** BIOG-22 ends without going into deep detail about the Salón Literario — it only names it in reason #4 as context. S08's territory (the writings that connected Alberdi to Quiroga intellectually, the Salón Literario narrative) is not invaded. ✅
- **Sub-period closure:** After BIOG-22, the `</div><!-- /#rev-alberdi-quiroga -->` follows. The sub-period narrative arc is: Heredia letter → meeting Quiroga → conversations and the libranza offer → devolution and its meaning → why he said no. The arc closes with an analytical understanding of a pivotal moment in Alberdi's intellectual formation. Narratively complete. ✅

---

## 8. Expected Metrics After T02 Integration

| Metric | Before S07 | After T02 |
|---|---|---|
| `data-certeza` count | 54 | 56 |
| `#rev-alberdi-quiroga [data-certeza]` | 4 | 6 |
| `.reveal` elements | 76 | 79 |
| `sub-nav__link` count | 6 | 6 (unchanged) |
| `rev-alberdi-quiroga` mentions | 3 | 3 (unchanged) |
| `id="BIOG-21"` count | 0 | 1 |
| `id="BIOG-22"` count | 0 | 1 |
