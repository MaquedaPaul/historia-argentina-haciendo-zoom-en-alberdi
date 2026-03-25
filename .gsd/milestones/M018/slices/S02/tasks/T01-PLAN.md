---
estimated_steps: 5
estimated_files: 1
---

# T01: Insertar sub-nav link y bloque HTML de 4 cards en index.html

**Slice:** S02 — Integración HTML
**Milestone:** M018

## Description

Integración mecánica del borrador verificado S01-CONTENT-DRAFT.md en `index.html`. Dos cambios quirúrgicos:

1. **Sub-nav link** (1 línea): insertar `<a href="#rev-camino-caseros" ...>` entre el link de `#rev-1835-1852` (línea 332) y el link de `#rev-1852-1860` (línea 333).
2. **Bloque HTML** (≈100 líneas): insertar un `<h4>` de sub-sección + `<div id="rev-camino-caseros" class="events-grid events-grid--certeza">` con 4 cards `card-hecho` (CAM-1…CAM-4), inmediatamente DESPUÉS de `</div><!-- /.events-grid SP3 -->` y ANTES de `</div><!-- /#rev-1835-1852 -->`.

El contenido (títulos, excerpts, fuentes, thumburls) proviene íntegramente de `S01-CONTENT-DRAFT.md` — no inventar, no investigar. El template de card a seguir son las cards SP3-1 y SP3-6 de `index.html` (líneas 2118–2268).

## Steps

1. **Leer el estado actual del anchor de inserción en index.html**
   - Verificar que la secuencia `</div><!-- /.events-grid SP3 -->` seguida de `</div><!-- /#rev-1835-1852 -->` existe alrededor de las líneas 2269–2270.
   - Confirmar que `grep -c 'id="rev-camino-caseros"' index.html` = 0 (bloque no insertado aún).

2. **Añadir el sub-nav link**
   - Localizar exactamente la línea con `<a href="#rev-1852-1860" class="sub-nav__link">` (~línea 333).
   - Insertar ANTES de ella:
     ```html
           <a href="#rev-camino-caseros" class="sub-nav__link">1851–1852<span class="sub-nav__link-label">El camino a Caseros</span></a>
     ```
   - Indentación: 10 espacios (igual que los links adyacentes).

3. **Leer el template de card** (SP3-1, líneas ~2118–2148 de index.html) para confirmar la estructura exacta antes de escribir el bloque nuevo.

4. **Insertar el bloque HTML** inmediatamente DESPUÉS de `</div><!-- /.events-grid SP3 -->` (~línea 2269) y ANTES de `</div><!-- /#rev-1835-1852 -->`.

   El bloque completo a insertar (escribir con la herramienta `edit`, reemplazando `</div><!-- /.events-grid SP3 -->\n        </div><!-- /#rev-1835-1852 -->`):

   ```html
           </div><!-- /.events-grid SP3 -->

          <h4 class="sub-period__subtitle reveal reveal-fade" style="--reveal-delay: 0ms">El camino a Caseros (1851–1852)</h4>
          <div id="rev-camino-caseros" class="events-grid events-grid--certeza" aria-label="El camino a Caseros (1851–1852)">

            <!-- CAM-1: El Pronunciamiento de Urquiza -->
            <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: 0ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">✓</span>
                <span class="card-certeza-label">Hecho documentado</span>
              </div>
              <div class="card-image">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Justo_J._Urquiza._Presidente_of_the_Argentine_Confederation.jpg/500px-Justo_J._Urquiza._Presidente_of_the_Argentine_Confederation.jpg"
                     alt="Retrato oficial de Justo José de Urquiza, comandante del Pronunciamiento y futuro presidente de la Confederación Argentina."
                     loading="lazy">
              </div>
              <span class="event-card__year">1° de mayo de 1851</span>
              <h3 class="event-card__title">El Pronunciamiento de Urquiza (1° de mayo de 1851)</h3>
              <p class="event-card__excerpt">
                El 1° de mayo de 1851, en la plaza principal de Concepción del Uruguay (Entre Ríos), Justo José de Urquiza aceptó la renuncia ritual que Rosas presentaba anualmente al manejo de las relaciones exteriores de la Confederación —renuncia que, por protocolo, siempre era rechazada. Al aceptarla, Urquiza invocó el Pacto Federal de 1831 para recuperar la soberanía exterior de Entre Ríos, quebrando formalmente el sistema rosista sin un tiro. Solo Corrientes, gobernada por Benjamín Virasoro, adhirió al Pronunciamiento; las demás provincias repudiaron a Urquiza y lo calificaron de "traidor". Detrás del gesto jurídico había una economía asfixiada: Rosas había bloqueado el comercio entrerriano con Montevideo sitiada y prohibido cargar oro en buques con destino a Entre Ríos.
              </p>
              <footer class="card-source">
                <span class="card-source__icon" aria-hidden="true">📄</span>
                <cite>Wikipedia ES, «Pronunciamiento de Urquiza» (decreto original). <em>elhistoriador.com.ar</em>, «Pronunciamiento de Urquiza, 1° de mayo de 1851». <em>argentinahistorica.com.ar</em>, «El Pronunciamiento de Urquiza».</cite>
              </footer>
            </article>

            <!-- CAM-2: La triple alianza y la campaña en la Banda Oriental -->
            <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: 80ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">✓</span>
                <span class="card-certeza-label">Hecho documentado</span>
              </div>
              <div class="card-image">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Batalha_dos_Santos_Logares_%283_de_fevereiro_de_1852%29.jpg/500px-Batalha_dos_Santos_Logares_%283_de_fevereiro_de_1852%29.jpg"
                     alt="Grabado brasileño de época que representa las operaciones militares de la alianza en la Banda Oriental, 1851–1852."
                     loading="lazy">
              </div>
              <span class="event-card__year">Mayo–octubre de 1851</span>
              <h3 class="event-card__title">La triple alianza y la campaña en la Banda Oriental (1851)</h3>
              <p class="event-card__excerpt">
                El 29 de mayo de 1851, Entre Ríos, Brasil y el gobierno de la Defensa de Montevideo firmaron un tratado cuyo objetivo declarado era expulsar al sitiador Manuel Oribe; una cláusula secreta estipulaba que si Rosas reaccionaba militarmente, la alianza se extendería contra toda la Confederación. Rosas cometió el error de activarla: el 18 de agosto de 1851 declaró la guerra a Brasil. El 16 de julio, antes de esa declaración, Urquiza ya había cruzado el río Uruguay con unos 6.000 hombres; el 8 de octubre, Oribe capituló bajo la fórmula «ni vencidos ni vencedores» y el Sitio de Montevideo —que duraba desde 1843— llegó a su fin. El 21 de noviembre de 1851, el nuevo tratado entre Brasil, Uruguay, Entre Ríos y Corrientes fijó como objetivo explícito «liberar al pueblo argentino de la opresión de Rosas».
              </p>
              <footer class="card-source">
                <span class="card-source__icon" aria-hidden="true">📄</span>
                <cite><em>argentinahistorica.com.ar</em>, «Los tratados de alianza de 1851». Wikipedia ES, «Guerra Grande» (cronología). <em>laguia2000.com</em>, «La campaña de Urquiza en el Uruguay».</cite>
              </footer>
            </article>

            <!-- CAM-3: El Ejército Grande cruza el Paraná -->
            <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: 160ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">✓</span>
                <span class="card-certeza-label">Hecho documentado</span>
              </div>
              <div class="card-image">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/La-batalla-de-caseros.JPG/500px-La-batalla-de-caseros.JPG"
                     alt="Vista panorámica del campo de Caseros durante la batalla del 3 de febrero de 1852, donde el Ejército Grande derrotó definitivamente a las fuerzas de Rosas."
                     loading="lazy"
                     style="object-fit: cover; object-position: center top;">
              </div>
              <span class="event-card__year">Diciembre de 1851</span>
              <h3 class="event-card__title">El Ejército Grande cruza el Paraná (diciembre 1851)</h3>
              <p class="event-card__excerpt">
                El Ejército Grande —según el recuento del historiador Ricardo Levene— llegó a sus 28.189 hombres: unos 10.670 entrerrianos, 5.260 correntinos, 4.249 porteños incorporados tras la rendición de Oribe, 4.040 brasileños y 1.907 orientales. Sus jefes incluían al propio Urquiza como comandante general, al correntino Benjamín Virasoro, al marqués de Caxias por Brasil, y a los coroneles Bartolomé Mitre y Domingo Faustino Sarmiento al frente de divisiones porteñas. Entre el 20 y el 23 de diciembre de 1851, en Diamante (Punta Gorda, Entre Ríos), la infantería cruzó el río Paraná en buques de guerra brasileños mientras la caballería lo atravesaba a nado; desembarcaron en Coronda y avanzaron hacia Buenos Aires sin resistencia sostenida, llegando a Luján el 29 de enero de 1852.
              </p>
              <footer class="card-source">
                <span class="card-source__icon" aria-hidden="true">📄</span>
                <cite>Wikipedia EN, «Army of Operations against the Argentine Confederation» (cita a Levene). <em>elarcondelahistoria.com</em>, «Ejército Grande — composición según Ricardo Levene». <em>vallemaria.gob.ar</em>, «El cruce del Paraná».</cite>
              </footer>
            </article>

            <!-- CAM-4: Después de Caseros: los primeros pasos constituyentes -->
            <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: 240ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">✓</span>
                <span class="card-certeza-label">Hecho documentado</span>
              </div>
              <span class="event-card__year">3 de febrero – 31 de mayo de 1852</span>
              <h3 class="event-card__title">Después de Caseros: los primeros pasos constituyentes (1852)</h3>
              <p class="event-card__excerpt">
                El mismo 3 de febrero de 1852, horas después de la derrota, Rosas presentó su renuncia y fue embarcado en la fragata británica <em>Centaur</em> por el cónsul Robert Gore rumbo a Southampton; al día siguiente, Vicente López y Planes fue nombrado gobernador interino de Buenos Aires. El proceso constituyente que Urquiza impulsó culminó el 31 de mayo de 1852 con el Acuerdo de San Nicolás, que convocó un Congreso General Constituyente —el que produciría la Constitución de 1853. Sin embargo, Buenos Aires rechazó el Acuerdo en septiembre de 1852 y se separó de la Confederación, iniciando una década de división que no se resolvería hasta la batalla de Pavón (1861). Como sintetizó Juan Bautista Alberdi al enviar sus <em>Bases</em> a Urquiza, Caseros era solo el punto de partida de la organización: «El pueblo que ha combatido veinte años por conseguir el derecho de darse una constitución, no quiere constitución que no sea la obra de su elección libre y espontánea.»
              </p>
              <footer class="card-source">
                <span class="card-source__icon" aria-hidden="true">📄</span>
                <cite><em>buenosaireshistoria.org</em>, «Vicente López y Planes, gobernador interino» (4 feb 1852). Wikipedia ES, «Acuerdo de San Nicolás» (31 may 1852). <em>museodelacuerdo.cultura.gob.ar</em>, «El Acuerdo de San Nicolás: origen y consecuencias».</cite>
              </footer>
            </article>

          </div><!-- /#rev-camino-caseros -->
        </div><!-- /#rev-1835-1852 -->
   ```

   **Notas de inserción críticas:**
   - CAM-4 NO tiene `<div class="card-image">` — la card funciona sin imagen (ver draft).
   - CAM-3 tiene `style="object-fit: cover; object-position: center top;"` directamente en el `<img>` porque la imagen tiene ratio 3.77:1 (2197×582 px) y se aplastaría sin este ajuste.
   - Stagger: 0ms, 80ms, 160ms, 240ms — el nuevo grid empieza desde 0ms (independiente de SP3).
   - NO crear nuevo `<blockquote class="alberdi-quote">` — la cita de Alberdi en CAM-4 va como texto corrido en el `<p class="event-card__excerpt">`.
   - El `<h4 class="sub-period__subtitle">` va fuera del `events-grid` SP3 existente, no dentro de él.

5. **Verificar** con los comandos de la sección Verification del S02-PLAN.md.

## Must-Haves

- [ ] `grep -c 'id="rev-camino-caseros"' index.html` = 1
- [ ] `grep -c 'href="#rev-camino-caseros"' index.html` = 1
- [ ] `grep -c 'data-certeza="hecho"' index.html` ≥ 18
- [ ] `grep -c 'class="alberdi-quote"' index.html` = 6 (sin cambio)
- [ ] `node -e "try{new Function(require('fs').readFileSync('app.js','utf8'));console.log('OK')}catch(e){if(e instanceof SyntaxError)console.error('SYNTAX ERROR:',e.message);else console.log('OK')}"` imprime `OK`
- [ ] El bloque CAM-3 tiene `style="object-fit: cover; object-position: center top;"` en el `<img>`
- [ ] CAM-4 NO tiene `<div class="card-image">` (sin imagen — es correcto)

## Verification

```bash
node -e "try{new Function(require('fs').readFileSync('app.js','utf8'));console.log('OK')}catch(e){if(e instanceof SyntaxError)console.error('SYNTAX ERROR:',e.message);else console.log('OK')}"
grep -c 'data-certeza="hecho"' index.html
grep -c 'id="rev-camino-caseros"' index.html
grep -c 'href="#rev-camino-caseros"' index.html
grep -c 'class="alberdi-quote"' index.html
grep -n "45\.000 vs" index.html
```

Todos deben mostrar: OK, ≥18, 1, 1, 6, solo la línea SP3-6 (sin repetición en el bloque nuevo).

## Inputs

- `index.html` — archivo HTML principal del sitio, estado post-M017-ausente (sin `#rev-urquiza-perfil`). Anchor de inserción: `</div><!-- /.events-grid SP3 -->` (~línea 2269) seguido de `</div><!-- /#rev-1835-1852 -->` (~línea 2270). Sub-nav en líneas 327–333.
- `.gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md` — fuente de verdad para todo el contenido: títulos, excerpts, thumburls verificados, fuentes, restricciones. **Leer este archivo antes de escribir cualquier HTML.**

## Expected Output

- `index.html` modificado con:
  - 1 nuevo sub-nav link (`href="#rev-camino-caseros"`) entre `#rev-1835-1852` y `#rev-1852-1860`
  - 1 `<h4 class="sub-period__subtitle">` para "El camino a Caseros (1851–1852)"
  - 1 `<div id="rev-camino-caseros" class="events-grid events-grid--certeza">` con 4 cards `card-hecho` (CAM-1…CAM-4)
  - El total de `data-certeza="hecho"` ≥ 18
  - El count de `alberdi-quote` permanece en 6
