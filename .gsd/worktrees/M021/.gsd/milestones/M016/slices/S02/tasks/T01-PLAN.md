---
estimated_steps: 6
estimated_files: 1
---

# T01: Integrar 4 cards en index.html como sub-period #rev-alberdi-mitre

**Slice:** S02 — Integración HTML
**Milestone:** M016

## Description

Tomar las 4 cards HTML-ready de `S01-CONTENT-DRAFT.md` e insertarlas en `index.html` como un nuevo sub-period `#rev-alberdi-mitre`, adaptando la estructura al patrón real del codebase (eliminando wrappers `card-header`/`card-body`, usando `event-card__year`/`event-card__title` en lugar de `card-year`/`card-title`), y agregar el link al sub-nav.

**Discrepancia clave a resolver:** El draft de S01 usa `<div class="card-header">`, `<div class="card-body">`, `<span class="card-year">`, `<h3 class="card-title">` — clases que NO existen en el codebase. El patrón real usa `<span class="event-card__year">` y `<h3 class="event-card__title">` directamente dentro del `<article>`, sin wrappers intermedios.

## Steps

1. **Verificar URLs de imágenes** con la API Wikimedia para Cards B, C, y D (la A está confirmada). Usar el script Node.js del S02-RESEARCH.md. Si alguna URL no resuelve, sustituir con el retrato de Mitre (Card A) o el placeholder SVG:
   ```html
   <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='240'%3E%3Crect fill='%23c8b99a'/%3E%3C/svg%3E" alt="[descripción]" loading="lazy">
   ```
   Verificación rápida con API:
   ```bash
   node -e "
   const https = require('https');
   const files = [
     'Bartolom%C3%A9_Mitre_%281852%29.jpg',
     'Batalla_de_Pav%C3%B3n.jpg',
     'Juan_Bautista_Alberdi_%281888%29.jpg'
   ];
   files.forEach(f => {
     const url = 'https://en.wikipedia.org/w/api.php?action=query&titles=File:' + f + '&prop=imageinfo&iiprop=url&iiurlwidth=320&format=json';
     https.get(url, {headers:{'User-Agent':'HistoriaArgentina/1.0'}}, res => {
       let d=''; res.on('data',c=>d+=c);
       res.on('end',()=>{
         const pages = JSON.parse(d).query.pages;
         const p = Object.values(pages)[0];
         console.log(f, '->', p.missing !== undefined ? 'MISSING' : (p.imageinfo ? p.imageinfo[0].thumburl : 'no thumburl'));
       });
     });
   });
   "
   ```

2. **Escribir el bloque HTML completo** (con las correcciones aplicadas) directamente en el `index.html` usando el `Edit` tool. El bloque va entre las líneas `</div><!-- /#rev-1852-1860 -->` y `<!-- REVOLUCION TIMELINE:`.

   Estructura del bloque a insertar (después de `</div><!-- /#rev-1852-1860 -->`):
   ```html

        <!-- ══════════════════════════════════════════════════
             SUB-PERÍODO: Alberdi y Mitre (M016/S02/T01)
             4 cards — 3 hecho, 1 opinión
             ══════════════════════════════════════════════════ -->
        <div id="rev-alberdi-mitre" class="sub-period reveal reveal-fade">
          <h3 class="sub-period__title">Alberdi y Mitre: Dos Proyectos de Pa&#xED;s (1848&#x2013;1862)</h3>
          <div class="events-grid events-grid--certeza" aria-label="Alberdi y Mitre: dos proyectos de pa&#xED;s (1848&#x2013;1862)">

            <!-- MiAl-1: Mitre secretario de Alberdi — HECHO -->
            <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: 0ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">&#x2713;</span>
                <span class="card-certeza-label">Hecho documentado</span>
              </div>
              <div class="card-image">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Bartolome_mitre.jpg/320px-Bartolome_mitre.jpg" alt="Retrato de Bartolom&#xE9; Mitre en su juventud, ca. 1850." loading="lazy">
              </div>
              <span class="event-card__year">1848</span>
              <h3 class="event-card__title">Mitre, secretario de Alberdi: la alianza del exilio antirrosista</h3>
              <p class="event-card__excerpt">Hacia 1848, Bartolom&#xE9; Mitre lleg&#xF3; a Valpara&#xED;so y se incorpor&#xF3; como secretario de Juan Bautista Alberdi en la redacci&#xF3;n de <em>El Comercio de Valpara&#xED;so</em>. El v&#xED;nculo era l&#xF3;gico: ambos eran antirrosistas, ambos hab&#xED;an cruzado la cordillera huyendo de la dictadura, y ambos cre&#xED;an que la prensa era el instrumento de la civilizaci&#xF3;n. Cuatro a&#xF1;os despu&#xE9;s, combatieron juntos bajo las &#xF3;rdenes del general Urquiza en Caseros (3 de febrero de 1852) y vieron caer a Rosas. La coincidencia dur&#xF3; exactamente lo que tard&#xF3; Urquiza en convocar el Acuerdo de San Nicol&#xE1;s.</p>
              <footer class="card-source">
                <span class="card-source__icon" aria-hidden="true">&#x1F4C4;</span>
                <cite>Wikipedia EN, &#xAB;Bartolom&#xE9; Mitre&#xBB; (consultado 2026): &#xAB;Both wrote for the Valpara&#xED;so newspaper El Comercio&#xBB;; Infobae, 19 ene. 2026: Mitre, secretario de Alberdi ca. 1848.</cite>
              </footer>
            </article>

            <!-- MiAl-2: Los Debates y la ruptura — HECHO -->
            <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: 80ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">&#x2713;</span>
                <span class="card-certeza-label">Hecho documentado</span>
              </div>
              <div class="card-image">
                <img src="[URL_CARD_B]" alt="Bartolom&#xE9; Mitre, fundador de <em>Los Debates</em> (1852)." loading="lazy">
              </div>
              <span class="event-card__year">1852</span>
              <h3 class="event-card__title"><em>Los Debates</em> y la ruptura: dos Argentinas post-Caseros</h3>
              <p class="event-card__excerpt">El 1&#xB0; de abril de 1852, reci&#xE9;n ca&#xED;do Rosas, Mitre fund&#xF3; <em>Los Debates</em> en Buenos Aires. Su editorial inaugural &#x2014;&#xAB;Profesi&#xF3;n de Fe&#xBB;&#x2014; declaraba adherir a la organizaci&#xF3;n nacional, pero a medida que Urquiza avanz&#xF3; con el Acuerdo de San Nicol&#xE1;s, el diario se convirti&#xF3; en tribuna de la oposici&#xF3;n porte&#xF1;a. Urquiza desterr&#xF3; a Mitre; &#xE9;ste regres&#xF3; en septiembre a liderar la insurreci&#xF3;n que separ&#xF3; la provincia del resto del pa&#xED;s. Alberdi, en tanto, redactaba sus <em>Bases</em> en Valpara&#xED;so y apoyaba sin vacilaci&#xF3;n al proyecto federal de Urquiza: el antagonismo entre los dos proyectos de pa&#xED;s qued&#xF3; fijado para siempre en ese a&#xF1;o bisagra.</p>
              <footer class="card-source">
                <span class="card-source__icon" aria-hidden="true">&#x1F4C4;</span>
                <cite>Infobae, 19 ene. 2026; <em>La Naci&#xF3;n</em>, 26 feb. 2022 (editorial &#xAB;Profesi&#xF3;n de Fe&#xBB; del 1&#xB0; de abril de 1852); Halper&#xED;n Donghi, T., <em>Una naci&#xF3;n para el desierto argentino</em>, CEAL, 1982.</cite>
              </footer>
            </article>

            <!-- MiAl-3: Pavón — HECHO + card-nota-historiografica -->
            <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: 160ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">&#x2713;</span>
                <span class="card-certeza-label">Hecho documentado</span>
              </div>
              <div class="card-image">
                <img src="[URL_CARD_C]" alt="Representaci&#xF3;n de la Batalla de Pav&#xF3;n, 17 de septiembre de 1861." loading="lazy">
              </div>
              <span class="event-card__year">1861 &#x2013; 1862</span>
              <h3 class="event-card__title">Pav&#xF3;n: Mitre triunfa, Alberdi pierde el cargo</h3>
              <p class="event-card__excerpt">El 17 de septiembre de 1861, los ej&#xE9;rcitos del Estado de Buenos Aires y la Confederaci&#xF3;n Argentina se enfrentaron en Pav&#xF3;n (provincia de Santa Fe). Las fuerzas porte&#xF1;as al mando de Mitre obtuvieron la victoria; Urquiza retir&#xF3; sus tropas y abandon&#xF3; el campo. Mitre fue designado director provisorio de la Rep&#xFA;blica. En abril de 1862, dict&#xF3; un decreto que determin&#xF3; la cesaci&#xF3;n de Alberdi como agente diplom&#xE1;tico de la Confederaci&#xF3;n ante Francia, Gran Breta&#xF1;a y Espa&#xF1;a, y se neg&#xF3; a abonarle los sueldos atrasados. El autor de la Constituci&#xF3;n qued&#xF3; sin cargo y sin recursos en Par&#xED;s: consecuencia directa y documentada de la derrota del proyecto federal en el que hab&#xED;a apostado toda su carrera diplom&#xE1;tica.</p>
              <p class="card-nota-historiografica"><strong>Nota historiogr&#xE1;fica:</strong> La retirada de Urquiza en Pav&#xF3;n es objeto de debate. La historiograf&#xED;a liberal &#x2014;representada por el propio Mitre y luego por Sarmiento&#x2014; la interpret&#xF3; como una derrota militar definitiva. La revisi&#xF3;n posterior sugiere que Urquiza habr&#xED;a acordado retirarse, ya sea para proteger intereses econ&#xF3;micos entrerrianos o para evitar una guerra prolongada. La pregunta permanece abierta en la historiograf&#xED;a argentina.</p>
              <footer class="card-source">
                <span class="card-source__icon" aria-hidden="true">&#x1F4C4;</span>
                <cite>USAL/<em>&#xC9;pocas</em>, n&#xFA;m. 12, 2015 (ri.conicet.gov.ar): decreto de cesaci&#xF3;n de Alberdi, abril 1862; Halper&#xED;n Donghi, T., <em>Una naci&#xF3;n para el desierto argentino</em>, CEAL, 1982; Mayer, J. M., <em>Alberdi y su tiempo</em>, EUDEBA, 1963.</cite>
              </footer>
            </article>

            <!-- MiAl-4: La polémica historiográfica — OPINIÓN -->
            <article class="event-card card-opinion reveal reveal-slide" data-certeza="opini&#xF3;n" style="--reveal-delay: 240ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">&#x1F4AC;</span>
                <span class="card-certeza-label">Opini&#xF3;n historiogr&#xE1;fica</span>
              </div>
              <div class="card-image">
                <img src="[URL_CARD_D]" alt="Retrato de Juan Bautista Alberdi, ca. 1880&#x2013;1884." loading="lazy">
              </div>
              <span class="event-card__year">1864</span>
              <h3 class="event-card__title">La pol&#xE9;mica historiogr&#xE1;fica: dos relatos incompatibles de la Argentina</h3>
              <p class="event-card__excerpt">En 1864, Alberdi ley&#xF3; la <em>Historia de Belgrano y de la independencia argentina</em> de Mitre y consign&#xF3; en notas privadas una cr&#xED;tica que atraviesa toda la obra de su rival: para &#xE9;l, la historia de Mitre era la historia del partido porte&#xF1;o, un relato que legitimaba la hegemon&#xED;a de Buenos Aires que las <em>Bases</em> hab&#xED;an intentado limitar con el equilibrio federal. Esas notas fueron publicadas p&#xF3;stumamente como &#xAB;Belgrano y sus historiadores&#xBB;.</p>
              <blockquote class="card-opinion__quote">
                <p>Seg&#xFA;n la s&#xED;ntesis de J. M. Mayer (1963), las discrepancias entre Alberdi y Mitre no eran meramente personales sino estructurales: representaban dos visiones irreconciliables del pa&#xED;s &#x2014;la federal y la unitaria, la del interior y la del puerto&#x2014; que el triunfo militar de Pav&#xF3;n hab&#xED;a resuelto por la fuerza pero no por el argumento.</p>
                <footer class="card-opinion__attribution">
                  <strong class="card-opinion__author">Par&#xE1;frasis de J. M. Mayer</strong>
                  <span class="card-opinion__context">&#x2014; <em>Alberdi y su tiempo</em>, EUDEBA, 1963</span>
                </footer>
              </blockquote>
              <p class="card-opinion__context">La historiograf&#xED;a acad&#xE9;mica argentina (CONICET/USAL, 2015) confirma que &#xAB;a partir de 1854, no hay espacio para reconciliaci&#xF3;n entre uno y otro&#xBB;, m&#xE1;s all&#xE1; de algunos encuentros de tono cort&#xE9;s cuando Alberdi regres&#xF3; como diputado en 1879&#x2013;1880.</p>
              <footer class="card-source">
                <span class="card-source__icon" aria-hidden="true">&#x1F4C4;</span>
                <cite>Alberdi, J. B., &#xAB;Belgrano y sus historiadores&#xBB;, en <em>Grandes y Peque&#xF1;os Hombres del Plata</em>, 2&#xAA; ed., De Palma, 1964 [ca. 1885]; Mayer, J. M., <em>Alberdi y su tiempo</em>, EUDEBA, 1963; USAL/<em>&#xC9;pocas</em>, n&#xFA;m. 12, 2015 (ri.conicet.gov.ar).</cite>
              </footer>
            </article>

          </div><!-- /.events-grid MiAl -->
        </div><!-- /#rev-alberdi-mitre -->
   ```
   
   **Importante:** Antes de insertar, reemplaza los placeholders `[URL_CARD_B]`, `[URL_CARD_C]`, `[URL_CARD_D]` con las URLs verificadas en el paso 1, o con el fallback si no resuelven:
   - Card B fallback: misma URL que Card A (`https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Bartolome_mitre.jpg/320px-Bartolome_mitre.jpg`)
   - Card C fallback: retrato Alberdi joven (mismo que SP4-1: `https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Juan_Bautista_Alberdi.jpg/500px-Juan_Bautista_Alberdi.jpg`)
   - Card D fallback: placeholder SVG con alt descriptivo
   
   **Usar el `Edit` tool, no heredoc ni shell.** Insertar entre `</div><!-- /#rev-1852-1860 -->` y la línea en blanco que precede a `<!-- REVOLUCION TIMELINE:`.

3. **Agregar link al sub-nav.** Insertar después del `<a href="#rev-1852-1860"...>` en la línea ~333:
   ```html
          <a href="#rev-alberdi-mitre" class="sub-nav__link">1848&#x2013;1862<span class="sub-nav__link-label">Alberdi y Mitre</span></a>
   ```

4. **Verificar frases baneadas ausentes** en el bloque recién insertado:
   ```bash
   node -e "
   const html = require('fs').readFileSync('index.html','utf8');
   const start = html.indexOf('id=\"rev-alberdi-mitre\"');
   const end = html.indexOf('/#rev-alberdi-mitre');
   const block = html.slice(start, end);
   const b13 = block.includes('dej\xE1ndolo en Par\xEDs sin sueldo');
   const sp43 = block.includes('revoluci\xF3n encabezada por Mitre separ\xF3');
   console.log('BIOG-13:', b13 ? 'FOUND (BAD)' : 'absent OK');
   console.log('SP4-3:', sp43 ? 'FOUND (BAD)' : 'absent OK');
   "
   ```

5. **Correr todos los checks de verificación de slice** (ver S02-PLAN.md § Verification): certeza distribution, cite count, card-nota-historiografica, JS syntax.

6. **Verificar en browser.** Lanzar un servidor local (`npx -y http-server . -p 8080 -c-1` o `python -m http.server 8080` si python disponible), navegar a `http://localhost:8080/#rev-alberdi-mitre`, confirmar que las 4 cards se renderizan, que el sub-nav link funciona, y que no hay errores JS en consola.

## Must-Haves

- [ ] Sub-period `#rev-alberdi-mitre` insertado en el punto correcto (entre `/#rev-1852-1860` y `REVOLUCION TIMELINE`)
- [ ] Wrapper del sub-period: `class="sub-period reveal reveal-fade"` (igual que todos los otros sub-periods)
- [ ] Grid container: `class="events-grid events-grid--certeza"` — requerido para sizing certeza-aware
- [ ] 4 cards usan `event-card__year` y `event-card__title` (no `card-year`/`card-title` del draft)
- [ ] Card D: `data-certeza="opini&#xF3;n"` (con entidad HTML, per D053) y clase `card-opinion`
- [ ] Card D: blockquote con estructura completa `card-opinion__quote` + `card-opinion__attribution` + `card-opinion__author` + `card-opinion__context`
- [ ] Card C: `<p class="card-nota-historiografica">` directamente dentro del `<article>`, visible (no colapsable)
- [ ] `card-source__icon` presente en todos los footers (patrón: `<span class="card-source__icon" aria-hidden="true">📄</span>`)
- [ ] Sub-nav link `#rev-alberdi-mitre` agregado después del link `#rev-1852-1860`
- [ ] JS syntax OK (`new Function()` check no arroja SyntaxError)
- [ ] `grep -c "rev-alberdi-mitre" index.html` → ≥2
- [ ] 3 `data-certeza="hecho"` y 1 `class="event-card card-opinion"` en el bloque nuevo (Card D)

## Verification

```bash
# ID presente
grep -c "rev-alberdi-mitre" index.html

# Certeza distribution
node -e "
const html = require('fs').readFileSync('index.html','utf8');
const start = html.indexOf('id=\"rev-alberdi-mitre\"');
const end = html.indexOf('/#rev-alberdi-mitre');
const block = html.slice(start, end);
const hecho = (block.match(/data-certeza=\"hecho\"/g)||[]).length;
const opinion = (block.match(/card-opinion/g)||[]).length;
console.log('hecho:', hecho, '(expected 3) | card-opinion class count:', opinion, '(expected >=1)');
"

# Cite count
node -e "
const html = require('fs').readFileSync('index.html','utf8');
const start = html.indexOf('id=\"rev-alberdi-mitre\"');
const end = html.indexOf('/#rev-alberdi-mitre');
const block = html.slice(start, end);
console.log('<cite> count:', (block.match(/<cite>/g)||[]).length, '(expected ≥4)');
"

# JS syntax
node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK'); } catch(e) { if (e instanceof SyntaxError) console.error('SYNTAX ERROR:', e.message); else console.log('OK'); }"
```

## Inputs

- `.gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md` — 4 cards HTML-ready; adaptar estructura al patrón real antes de integrar
- `index.html` — punto de inserción: entre `</div><!-- /#rev-1852-1860 -->` (línea ~2425) y `<!-- REVOLUCION TIMELINE:` (línea ~2427)

**Contexto crítico del draft:**
- El draft usa `card-header`/`card-body`/`card-year`/`card-title` → **no existen en el codebase**. Usar `event-card__year`/`event-card__title` directamente dentro del `<article>`.
- Card D usa `data-certeza="opini&#xF3;n"` (HTML entity) — correcto per D053.
- Card C tiene `card-nota-historiografica` dentro de `card-body` en el draft → colocarla directamente dentro del `<article>` después de `<p class="event-card__excerpt">`.
- Sub-nav tiene 7 links actualmente (no 4 como indica el draft de S01). El último es `<a href="#rev-1852-1860"...>`. Agregar el octavo link después.
- Wikimedia rate-limita requests sin User-Agent — no diagnosticar "imágenes rotas" por errores curl. Las imágenes cargan correctamente en browser.

**Fallbacks de imagen confirmados:**
- Card B: usar el retrato de Mitre joven de Card A si la URL específica de 1852 no existe
- Card C: usar el retrato de Alberdi (SP4-1) si la imagen de Pavón no existe
- Card D: usar placeholder SVG si el retrato tardío de Alberdi no existe

## Expected Output

- `index.html` — nuevo sub-period `#rev-alberdi-mitre` insertado con 4 cards, sub-nav link agregado
- Todos los checks de verificación de S02-PLAN.md pasando
- Sitio navegable en browser con las 4 cards visibles en `#periodo-revolucion`
