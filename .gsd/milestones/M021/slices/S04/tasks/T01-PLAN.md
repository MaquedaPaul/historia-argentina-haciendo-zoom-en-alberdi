---
estimated_steps: 4
estimated_files: 1
---

# T01: Inject Entradas 11–15 into #rev-san-martin

**Slice:** S04 — Perú, Guayaquil y retiro del poder
**Milestone:** M021

## Description

Inject 5 cards (Entradas 11–15) into the `#rev-san-martin` events-grid in `index.html`, immediately before the two-line closing block `</div><!-- /.events-grid rev-san-martin -->`. This completes the San Martín narrative arc and brings the sub-period to 15 cards (milestone requirement: ≥14).

State at start of this task:
- `#rev-san-martin` has 10 cards (`data-certeza` count = 10 within sub-period)
- Global `data-certeza` count = 103
- Injection anchor: lines 1553–1554 of `index.html`

State at end of this task:
- `#rev-san-martin` has 15 cards
- Global `data-certeza` count = 108

## Steps

1. **Write the 5-card HTML block to a temp file** at `/tmp/s04-cards.html` using the Write tool. Use the exact HTML from the Card Specifications section below. Do NOT use bash heredocs (unreliable on Windows/Git Bash — KNOWLEDGE.md).

2. **Use the Edit tool** on `index.html` to replace the exact two-line closing block with the 5 new cards followed by the closing block. The `oldText` must be exactly:
   ```
           </div><!-- /.events-grid rev-san-martin -->
         </div><!-- /#rev-san-martin -->
   ```
   The `newText` is the contents of the temp file followed by those same two closing lines.

3. **Run all 5 verification commands** (see Verification section). Fix any failures before marking done.

4. **Delete the temp file**: `rm /tmp/s04-cards.html`

## Card Specifications

### Entrada 11 — Campaña al Perú y el Protectorado (1820–1822)

```html
            <article class="event-card card-hecho reveal reveal-fade" data-certeza="hecho" style="--reveal-delay: 0ms">
              <div class="card-image">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/General_Jos%C3%A9_de_San_Mart%C3%ADn_por_Gil_de_Castro.jpg/500px-General_Jos%C3%A9_de_San_Mart%C3%ADn_por_Gil_de_Castro.jpg" alt="Retrato de José de San Martín por José Gil de Castro, 1818 — período del Protectorado del Perú" width="100%" loading="lazy">
              </div>
              <div class="card-certeza-indicator"><span class="card-certeza-badge card-certeza-badge--hecho" title="Hecho documentado">✓</span> <span class="card-certeza-label">Hecho documentado</span></div>
              <span class="event-card__date">1820 – 1822</span>
              <h3 class="event-card__title">Campaña al Perú y el Protectorado</h3>
              <p class="event-card__excerpt">El 20 de agosto de 1820, San Martín embarcó desde Valparaíso con 4.500 hombres y llegó a la bahía de Paracas. Sin batallar en Lima, orquestó la deserción de las tropas realistas y el colapso político del virreinato. El 28 de julio de 1821 proclamó la independencia del Perú en la Plaza Mayor de Lima y asumió como Protector — el primer gobierno civil del Perú independiente.</p>
              <button class="card-expand-toggle" aria-expanded="false">
                <span class="card-expand-toggle__text">Ver más</span>
                <span class="card-expand-toggle__icon" aria-hidden="true">▼</span>
              </button>
              <div class="card-detail" hidden>
                <p>La estrategia peruana de San Martín fue radicalmente distinta a la chilena: evitó la batalla campal y apostó a la guerra política. Bloqueó Lima por mar, envió emisarios a las haciendas para ofrecer libertad a los esclavos que se unieran, y esperó que el régimen realista se fragmentara por sí solo. El virrey La Serna evacuó Lima sin combatir en julio de 1821.</p>
                <p>Como Protector del Perú (julio 1821 – septiembre 1822), San Martín abolió la mita, liberó a los hijos de esclavos nacidos desde el día de la independencia («libertad de vientres»), y disolvió el Tribunal de la Inquisición. Fue el primer ejecutivo no colonial del Perú — pero la guerra de independencia aún no había terminado: los realistas controlaban la sierra y esperaban refuerzos.</p>
                <p>El punto crítico fue la necesidad de coordinación con Bolívar, quien avanzaba desde el norte con tropas colombianas y venezolanas. San Martín solicitó la reunión que se celebraría en Guayaquil.</p>
              </div>
              <footer class="card-source"><span class="card-source__icon" aria-hidden="true">📄</span><cite>Lynch, J., <em>San Martín: Argentine Soldier, American Hero</em>, Yale UP, 2009; Mitre, B., <em>Historia de San Martín</em>, 1887; Flores Galindo, A., <em>La ciudad sumergida</em>, 1991</cite></footer>
            </article>
```

### Entrada 12 — La entrevista de Guayaquil — el gran silencio de la historia (26–27 de julio de 1822)

```html
            <article class="event-card card-opinion reveal reveal-fade" data-certeza="debatido" style="--reveal-delay: 80ms">
              <div class="card-image">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/ff/Encuentro_de_Guayaquil.jpg" alt="Encuentro de San Martín y Bolívar en Guayaquil, J. Collignon, 1843" width="100%" loading="lazy">
              </div>
              <div class="card-certeza-indicator"><span class="card-certeza-badge card-certeza-badge--debatido" title="Debatido historiográficamente">&#x2696;</span> <span class="card-certeza-label">Debatido historiográficamente</span></div>
              <span class="event-card__date">26–27 de julio de 1822</span>
              <h3 class="event-card__title">La entrevista de Guayaquil — el gran silencio de la historia</h3>
              <p class="event-card__excerpt">Los dos grandes libertadores de América del Sur se reunieron en Guayaquil durante aproximadamente seis horas. No hay actas, no hay testigos directos, no hay cartas posteriores que revelen lo que se dijeron. San Martín regresó a Lima, convocó un Congreso Constituyente, renunció al Protectorado y partió a Europa sin volver jamás a Argentina. Nadie sabe exactamente qué pasó en esa habitación.</p>
              <button class="card-expand-toggle" aria-expanded="false">
                <span class="card-expand-toggle__text">Ver más</span>
                <span class="card-expand-toggle__icon" aria-hidden="true">▼</span>
              </button>
              <div class="card-detail" hidden>
                <p>El único documento directo es la <em>Carta de Lafond</em> (1823), donde San Martín le dice al capitán francés que Bolívar «no quiso colaborar» y que la situación era insostenible. Pero esta carta fue redactada meses después, en el exilio, y su autenticidad ha sido cuestionada. Lo que sí está documentado: San Martín llegó a Guayaquil con tropas peruanas, y Guayaquil ya había sido incorporada a la Gran Colombia por Bolívar tres semanas antes — sin consultar a San Martín ni al Perú.</p>
                <p>Tres hipótesis compiten sin resolución definitiva: (1) San Martín cedió voluntariamente, convencido de que Bolívar tenía más recursos para terminar la guerra; (2) Bolívar impuso condiciones que hacían insostenible la posición de San Martín; (3) hubo un acuerdo tácito de esferas de influencia en el que cada uno retendría sus territorios liberados. Los testimonios posteriores de edecanes y secretarios de ambos bandos son contradictorios y están coloreados por lealtades políticas.</p>
              </div>
              <p class="card-nota-historiografica"><strong>Nota historiográfica:</strong> Tres posiciones principales: <strong>Mitre</strong> (<em>Historia de San Martín</em>, 1887) sostiene el retiro voluntario y desinteresado — San Martín evaluó fríamente que Bolívar tenía más poder y cedió el campo por convicción republicana. <strong>El edecán Guido</strong> y la tradición argentina posterior sugieren que Bolívar tendió una celada política — llegó con Guayaquil ya anexada, con ventaja militar, y forzó a San Martín a una posición sin salida. La <strong>síntesis contemporánea</strong> (Lynch, Rojas) propone un acuerdo tácito de zonas: Bolívar se queda con Ecuador y norte del Perú; San Martín con el sur. Ninguna hipótesis tiene prueba documental directa. El silencio de San Martín sobre Guayaquil durante los 28 años de exilio que siguieron es, en sí mismo, un dato histórico.</p>
              <footer class="card-source"><span class="card-source__icon" aria-hidden="true">📄</span><cite>Mitre, B., <em>Historia de San Martín</em>, 1887; Lynch, J., <em>San Martín</em>, Yale UP, 2009; Rojas, R., <em>El Santo de la Espada</em>, 1933</cite></footer>
            </article>
```

### Entrada 13 — El retiro del poder — la negativa a las guerras civiles (1822–1824)

```html
            <article class="event-card card-hecho reveal reveal-fade" data-certeza="hecho" style="--reveal-delay: 160ms">
              <div class="card-image">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/General_Jos%C3%A9_de_San_Mart%C3%ADn_por_Gil_de_Castro.jpg/500px-General_Jos%C3%A9_de_San_Mart%C3%ADn_por_Gil_de_Castro.jpg" alt="Retrato de José de San Martín por José Gil de Castro, 1818, óleo sobre lienzo" width="100%" loading="lazy">
              </div>
              <div class="card-certeza-indicator"><span class="card-certeza-badge card-certeza-badge--hecho" title="Hecho documentado">✓</span> <span class="card-certeza-label">Hecho documentado</span></div>
              <span class="event-card__date">1822 – 1824</span>
              <h3 class="event-card__title">El retiro del poder — la negativa a las guerras civiles</h3>
              <p class="event-card__excerpt">De regreso de Guayaquil, San Martín convocó el primer Congreso Constituyente del Perú, renunció al Protectorado el 20 de septiembre de 1822 y partió en la noche, sin ceremonia ni discurso público. Volvió a Mendoza en enero de 1823: el gobierno de Buenos Aires y los caudillos provinciales estaban en guerra civil. Le ofrecieron el mando del ejército nacional. Rechazó.</p>
              <button class="card-expand-toggle" aria-expanded="false">
                <span class="card-expand-toggle__text">Ver más</span>
                <span class="card-expand-toggle__icon" aria-hidden="true">▼</span>
              </button>
              <div class="card-detail" hidden>
                <p>La razón que dio San Martín fue explícita: no levantaría sus armas contra otros argentinos. <span class="card-nota-certeza">[Nota: la frase exacta «jamás desenvainará la espada contra sus compatriotas» aparece en fuentes del siglo XIX pero no se ha localizado en un documento primario firmado por San Martín — se trata de una paráfrasis documentada en múltiples memorias de contemporáneos, no de una cita directa verificada.]</span> En 1823, el Río de la Plata era un campo de batalla entre unitarios y federales; quien aceptara el mando tendría que reprimir a uno de los dos bandos. San Martín optó por el silencio.</p>
                <p>Viajó a Europa con su hija Mercedes en 1824. Dejó en Argentina poderes notariales pero nunca regresó. En 1829, cuando volvió brevemente a Buenos Aires (el barco llegó al puerto), Lavalle acababa de fusilar a Dorrego y la guerra civil estaba en su punto más violento. San Martín no desembarcó. Giró el barco y volvió a Europa.</p>
              </div>
              <footer class="card-source"><span class="card-source__icon" aria-hidden="true">📄</span><cite>Lynch, J., <em>San Martín</em>, Yale UP, 2009; Mitre, B., <em>Historia de San Martín</em>, 1887; Rojas, R., <em>El Santo de la Espada</em>, 1933</cite></footer>
            </article>
```

### Entrada 14 — El exilio y los últimos años en Europa (1824–1850)

```html
            <article class="event-card card-hecho reveal reveal-fade" data-certeza="hecho" style="--reveal-delay: 240ms">
              <div class="card-image">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/General_Jos%C3%A9_de_San_Mart%C3%ADn_por_Gil_de_Castro.jpg/500px-General_Jos%C3%A9_de_San_Mart%C3%ADn_por_Gil_de_Castro.jpg" alt="Retrato de José de San Martín por José Gil de Castro, 1818, óleo sobre lienzo" width="100%" loading="lazy">
              </div>
              <div class="card-certeza-indicator"><span class="card-certeza-badge card-certeza-badge--hecho" title="Hecho documentado">✓</span> <span class="card-certeza-label">Hecho documentado</span></div>
              <span class="event-card__date">1824 – 1850</span>
              <h3 class="event-card__title">El exilio y los últimos años en Europa</h3>
              <p class="event-card__excerpt">San Martín vivió los últimos 26 años de su vida en Europa — primero en Londres, luego en Bruselas, finalmente en Grand-Bourg (Francia) y Boulogne-sur-Mer. Vivió de su pensión militar argentina, que el gobierno de Rosas le pagó con regularidad. Con Rosas mantuvo una relación ambigua: le agradeció el pago de la pensión pero no aprobó ni su dictadura ni sus métodos.</p>
              <button class="card-expand-toggle" aria-expanded="false">
                <span class="card-expand-toggle__text">Ver más</span>
                <span class="card-expand-toggle__icon" aria-hidden="true">▼</span>
              </button>
              <div class="card-detail" hidden>
                <p>En Grand-Bourg (cerca de París), San Martín cultivó su jardín, enseñó a su nieta Mercedes Balcarce, y recibió la visita de otros exiliados latinoamericanos. Donó su sable corvo al caudillo federal Rosas en 1850 — un gesto que fue interpretado de múltiples maneras: como aprobación de la resistencia a la intervención franco-inglesa, como despedida política, como reconocimiento al único gobierno que lo había tratado con dignidad.</p>
                <p>Murió el 17 de agosto de 1850 en Boulogne-sur-Mer, con 72 años, en la cama, rodeado de su hija y nieta. Sus restos fueron repatriados a Argentina en 1880 y descansan en la Catedral Metropolitana de Buenos Aires. Nunca recibió honores del Estado argentino en vida.</p>
              </div>
              <footer class="card-source"><span class="card-source__icon" aria-hidden="true">📄</span><cite>Lynch, J., <em>San Martín</em>, Yale UP, 2009; Rojas, R., <em>El Santo de la Espada</em>, 1933; Mitre, B., <em>Historia de San Martín</em>, 1887</cite></footer>
            </article>
```

### Entrada 15 — El legado — el general que no quiso el poder (1850–hoy)

```html
            <article class="event-card card-opinion reveal reveal-fade" data-certeza="opini&#xF3;n" style="--reveal-delay: 320ms">
              <div class="card-image">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/General_Jos%C3%A9_de_San_Mart%C3%ADn_por_Gil_de_Castro.jpg/500px-General_Jos%C3%A9_de_San_Mart%C3%ADn_por_Gil_de_Castro.jpg" alt="Retrato de José de San Martín por José Gil de Castro, 1818, óleo sobre lienzo" width="100%" loading="lazy">
              </div>
              <div class="card-certeza-indicator"><span class="card-certeza-badge card-certeza-badge--opinion" title="Interpretación historiográfica">💬</span> <span class="card-certeza-label">Interpretación historiográfica</span></div>
              <span class="event-card__date">1850 – hoy</span>
              <h3 class="event-card__title">El legado — el general que no quiso el poder</h3>
              <p class="event-card__excerpt">San Martín es el único prócer latinoamericano del siglo XIX que liberó tres países (Argentina, Chile, Perú), tuvo el poder en sus manos, y lo devolvió voluntariamente. Su legado historiográfico está dividido entre quienes lo ven como el modelo del republicanismo austero y quienes señalan que su retiro fue una derrota política disfrazada de virtud.</p>
              <button class="card-expand-toggle" aria-expanded="false">
                <span class="card-expand-toggle__text">Ver más</span>
                <span class="card-expand-toggle__icon" aria-hidden="true">▼</span>
              </button>
              <div class="card-detail" hidden>
                <p>La interpretación dominante en Argentina (Mitre, Rojas) construyó un San Martín casi sagrado — el «Santo de la Espada» — desinteresado, austero, capaz de renunciar al poder por principio republicano. Esta narrativa fue funcional para el Estado nacional: necesitaba un héroe sin ambiciones territoriales propias, que pudiera ser apropiado por todas las facciones.</p>
                <p>La revisión historiográfica del siglo XX (Lynch, Galasso) matizó esa imagen: San Martín era un militar profesional, pragmático, que evaluó las correlaciones de fuerza y actuó en consecuencia. Su «desinterés» en el poder civil puede leerse como conciencia de sus propios límites (era militar, no político), o como cálculo de que no podía ganar una guerra civil después de haber ganado la de independencia.</p>
                <p>Lo que permanece sin disputa: ningún otro líder de la independencia americana de su generación cedió el poder que había conquistado con las armas sin que nadie se lo quitara. Ese acto — sea virtud, sea cálculo, sea derrota — define su singularidad histórica.</p>
              </div>
              <p class="card-nota-historiografica"><strong>Nota historiográfica:</strong> <strong>Mitre</strong> (<em>Historia de San Martín</em>, 1887) y <strong>Rojas</strong> (<em>El Santo de la Espada</em>, 1933) representan la tradición liberal que consagró la imagen del héroe desinteresado. <strong>Lynch</strong> (<em>San Martín: Argentine Soldier, American Hero</em>, Yale UP, 2009) ofrece la síntesis crítica más completa en inglés, reconociendo virtud y pragmatismo como factores no excluyentes. <strong>Galasso</strong> (<em>Seamos libres y lo demás no importa nada</em>, 2000) representa la revisión desde la tradición nacional-popular, que señala las limitaciones de la lectura liberal y el uso ideológico del mito sanmartiniano por el Estado oligárquico del siglo XIX.</p>
              <footer class="card-source"><span class="card-source__icon" aria-hidden="true">📄</span><cite>Lynch, J., <em>San Martín</em>, Yale UP, 2009; Rojas, R., <em>El Santo de la Espada</em>, 1933; Mitre, B., <em>Historia de San Martín</em>, 1887; Galasso, N., <em>Seamos libres y lo demás no importa nada</em>, 2000</cite></footer>
            </article>
```

## Must-Haves

- [ ] All 5 cards injected before `</div><!-- /.events-grid rev-san-martin -->`
- [ ] Stagger delays: 0ms / 80ms / 160ms / 240ms / 320ms (reset — new thematic cluster)
- [ ] Guayaquil image uses direct URL `https://upload.wikimedia.org/wikipedia/commons/f/ff/Encuentro_de_Guayaquil.jpg` (NOT a /thumb/ path)
- [ ] Guayaquil card: `card-opinion` + `data-certeza="debatido"` + `<p class="card-nota-historiografica">` with three named positions (Mitre, Guido/edecán, Lynch/síntesis)
- [ ] Entrada 13 contains `<span class="card-nota-certeza">` around uncertain phrasing about San Martín and his compatriots
- [ ] Entrada 15: `data-certeza="opini&#xF3;n"` (HTML entity for ó — matches existing codebase pattern)
- [ ] Entrada 15: `card-opinion` CSS class + `card-nota-historiografica` paragraph (no blockquote — there is no verified direct quote)
- [ ] Boundary-scoped card count = 15
- [ ] Global certeza count = 108
- [ ] JS syntax check passes

## Verification

```bash
# 1. Authoritative card count in #rev-san-martin (must be 15)
node -e "const h=require('fs').readFileSync('index.html','utf8'); const s=h.indexOf('id=\"rev-san-martin\"'); const e=h.indexOf('</div><!-- /#rev-san-martin -->'); const sec=h.slice(s,e+30); const m=sec.match(/data-certeza/g); console.log(m?m.length:0);"

# 2. Global certeza count (must be 108)
grep -c 'data-certeza' index.html

# 3. Guayaquil direct image URL present (must be 1)
grep -c 'Encuentro_de_Guayaquil.jpg' index.html

# 4. JS syntax check
node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('syntax OK'); } catch(e) { if (e instanceof SyntaxError) console.error('SYNTAX ERROR:', e.message); else console.log('syntax OK (runtime-only error)'); }"

# 5. card-nota-certeza span present (Entrada 13)
grep -c 'card-nota-certeza' index.html
```

Expected results: `15`, `108`, `1`, `syntax OK`, `≥1`

## Inputs

- `index.html` — current state: 10 cards in `#rev-san-martin`, global certeza = 103; injection anchor at `</div><!-- /.events-grid rev-san-martin -->` (currently lines 1553–1554)
- S04-RESEARCH.md card specifications (fully reproduced in Steps/Card Specifications above — do NOT re-read)
- S03-SUMMARY.md Forward Intelligence: confirmed injection anchor, confirmed that `grep -A N` overcounts (use Node.js boundary count as authoritative), confirmed stagger pattern should reset at 0ms for new thematic cluster

## Expected Output

- `index.html` — 5 new cards appended to `#rev-san-martin` events-grid; sub-period card count = 15; global `data-certeza` = 108
