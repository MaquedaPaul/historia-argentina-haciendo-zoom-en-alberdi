# S06 — Content Draft: BIOG-19 y BIOG-20

**Slice:** S06 — Quién era Facundo Quiroga y con quién estaba cuando recibió la carta
**Milestone:** M007
**Created:** T01 draft pass — 2026-03-22

---

## Insertion Anchor

**Anchor string (exact text to search):** `</div><!-- /#rev-alberdi-quiroga -->`

**Action:** Insert the full block below BEFORE this line (~línea 848 de index.html, búsqueda con Node.js CRLF-safe).

**Pre-flight check before inserting:**
```bash
grep -c 'id="BIOG-19"' index.html   # debe ser 0
grep -c 'id="BIOG-20"' index.html   # debe ser 0
```

**Block structure to insert:**
```
          <h4 class="sub-period__subtitle reveal reveal-fade" style="--reveal-delay: 0ms">Facundo Quiroga: el hombre que conoció Alberdi</h4>
          <div class="events-grid events-grid--certeza" aria-label="Perfil biográfico de Facundo Quiroga">
            [BIOG-19]
            [BIOG-20]
          </div>
```

---

## BIOG-19: Perfil biográfico de Facundo Quiroga

**ID:** BIOG-19
**Título:** El Tigre de los Llanos: quién era Juan Facundo Quiroga
**Año:** 1788–1835
**Certeza:** `card-hecho`
**Imagen:** sí (retrato García del Molino, misma URL que BIOG-17)
**Nota especial:** `card-nota-historiografica` sobre Sarmiento y De la Fuente
**Stagger:** `--reveal-delay: 0ms`

### Fuentes (BIOG-19)

1. Wikipedia EN — "Facundo Quiroga": nacimiento 27 nov 1788, San Antonio de los Llanos, La Rioja; padres Prudencio Quiroga + Juana Rosa Argañaraz; La Tablada, Oncativo, La Ciudadela; asesinado Barranca Yaco 16 feb 1835
2. buscabiografias.com: padres, casamiento con Dolores Fernández (1817), hijos
3. historiaybiografias.com: batallas, apodo El Tigre de los Llanos, relación con Rosas y López
4. revisionistas.com.ar: residencia en Buenos Aires dic 1833, paradoja unitaria/federal
5. comercioyjusticia.info: misión mediadora y partida 18 dic 1834

**Certeza check BIOG-19:** ≥2 fuentes verifican nacimiento, batallas, muerte ✅

### HTML — BIOG-19 (listo para copiar)

```html
            <!-- BIOG-19: El Tigre de los Llanos — perfil biográfico de Facundo Quiroga -->
            <article id="BIOG-19" class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: 0ms">
              <div class="event-card__media">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Facundo_Quiroga_por_Garc%C3%ADa_del_Molino.jpg/500px-Facundo_Quiroga_por_Garc%C3%ADa_del_Molino.jpg"
                  alt="Retrato de Juan Facundo Quiroga, por García del Molino, ca. 1840"
                  loading="lazy"
                  width="500"
                  height="620"
                />
              </div>
              <div class="event-card__body">
                <header class="event-card__header">
                  <span class="event-card__year">1788–1835</span>
                  <span class="event-card__certeza-badge badge--hecho" aria-label="Hecho verificado">Hecho</span>
                  <h4 class="event-card__title">El Tigre de los Llanos: quién era Juan Facundo Quiroga</h4>
                </header>
                <div class="event-card__content">
                  <p>
                    Juan Facundo Quiroga nació el 27 de noviembre de 1788 en San Antonio de los Llanos, un pueblo
                    remoto de La Rioja, hijo de José Prudencio Quiroga y Juana Rosa de Argañaraz. Creció en la
                    cultura ganadera del interior, donde la habilidad para montar, pelear y mandar era la única
                    credencial que importaba. Su apodo —el Tigre de los Llanos— le fue dado antes de que ningún
                    ejército lo conociera.
                  </p>
                  <p>
                    En las guerras civiles que desgarraron las Provincias Unidas del Río de la Plata, Quiroga
                    emergió como el caudillo federal más temido del interior. Sufrió dos derrotas decisivas ante
                    los unitarios —La Tablada (1829) y Oncativo (1830)— pero las compensó con una victoria
                    aplastante en La Ciudadela (1831), que dejó al ejército unitario de la Liga del Interior
                    deshecho y consolidó el predominio federal en el noroeste. Fue aliado de Juan Manuel de Rosas
                    y de Estanislao López, aunque más indómito y menos calculador que ambos.
                  </p>
                  <p>
                    La paradoja central de Quiroga —sostenida en su propia correspondencia con Rosas— era que
                    sus convicciones políticas profundas eran unitarias, pero que había elegido liderar el
                    federalismo porque era la causa del pueblo llano riojano.
                    <span class="card-nota-certeza">
                      Nota: esta declaración proviene de la correspondencia de Quiroga con Rosas, citada en fuentes
                      secundarias que refieren el <em>Archivo del Brigadier General Juan Facundo Quiroga</em>
                      (Instituto Ravignani/UBA). No se cita como confesión pública sino como posicionamiento
                      privado documentado.
                    </span>
                  </p>
                  <p>
                    Desde diciembre de 1833 residía en Buenos Aires, casado con Dolores Fernández, con hijos
                    en las escuelas porteñas y negocios bajo la gestión de su agente Braulio Costa. Fue en ese
                    contexto —caudillo en retiro relativo, no en campaña— que el joven Alberdi lo conoció a
                    fines de 1834. Quiroga partiría en misión mediadora en enero de 1835. Sería asesinado en
                    Barranca Yaco, provincia de Córdoba, el 16 de febrero de 1835.
                  </p>
                  <p class="card-nota-historiografica">
                    <strong>Nota historiográfica:</strong> Domingo Faustino Sarmiento inmortalizó a Quiroga en
                    <em>Facundo: Civilización y Barbarie</em> (Santiago de Chile, 1845) como símbolo de la
                    "barbarie" caudillista opuesta a la "civilización" europea. Pero el <em>Facundo</em> fue
                    escrito desde el exilio chileno como instrumento político contra Rosas, no como historia
                    neutral: el Quiroga de Sarmiento es una figura retórica antes que un retrato. Historiadores
                    posteriores como Ariel de la Fuente en <em>Children of Facundo: Caudillo and Gaucho
                    Insurgency during the Argentine State-Formation Process, La Rioja, 1853–1870</em> (Duke
                    University Press, 2000) ofrecen una lectura más matizada del caudillismo riojano, atendiendo
                    a sus bases sociales y económicas en lugar de al esquema civilización/barbarie.
                  </p>
                </div>
                <footer class="event-card__footer">
                  <cite class="event-card__cite">Wikipedia EN, "Facundo Quiroga"; buscabiografias.com; historiaybiografias.com; revisionistas.com.ar; comercioyjusticia.info.</cite>
                </footer>
              </div>
            </article>
```

---

## BIOG-20: El entorno de Quiroga en Buenos Aires

**ID:** BIOG-20
**Título:** El círculo de Quiroga en Buenos Aires: Santos Ortiz y Braulio Costa
**Año:** 1833–1834
**Certeza:** `card-hecho`
**Imagen:** no (card sin `.card-image` — patrón existente de BIOG-18)
**Nota especial:** `card-nota-certeza` acotando incertidumbre sobre los testigos del encuentro
**Stagger:** `--reveal-delay: 80ms`

### Fuentes (BIOG-20)

1. revisionistas.com.ar ("Facundo Quiroga en Buenos Aires"): hijos en escuelas porteñas, reuma, bienes; cita directa sobre Santos Ortiz: "las horas de la mañana para despachar su correspondencia, para lo que está a su lado don José Santos Ortiz"
2. comercioyjusticia.info: Santos Ortiz como secretario, partida 18 dic 1834, lo acompañaba Santos Ortiz
3. repositoriouba.sisbi.uba.ar: Braulio Costa como agente comercial y amigo
4. scribd.com / mitribunaconlahistoria.blogspot.com: Rosas acompañó a Quiroga hasta San Antonio de Areco

**Certeza check BIOG-20:** ≥2 fuentes verifican Santos Ortiz, ≥2 verifican Braulio Costa, ≥2 verifican motivaciones de residencia ✅

### HTML — BIOG-20 (listo para copiar)

```html
            <!-- BIOG-20: El entorno de Quiroga en Buenos Aires, 1833–1835 — Santos Ortiz y Braulio Costa -->
            <article id="BIOG-20" class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: 80ms">
              <div class="event-card__body">
                <header class="event-card__header">
                  <span class="event-card__year">1833–1834</span>
                  <span class="event-card__certeza-badge badge--hecho" aria-label="Hecho verificado">Hecho</span>
                  <h4 class="event-card__title">El círculo de Quiroga en Buenos Aires: Santos Ortiz y Braulio Costa</h4>
                </header>
                <div class="event-card__content">
                  <p>
                    Quiroga llegó a Buenos Aires en diciembre de 1833 con motivaciones múltiples: recuperar su
                    salud —sufría de reuma—, supervisar la educación de sus hijos en las escuelas porteñas, y
                    atender sus actividades comerciales junto a su agente y amigo <strong>Braulio Costa</strong>.
                    El caudillo más temido del noroeste vivía en la ciudad de Rosas con una vida más burguesa
                    que guerrera.
                  </p>
                  <p>
                    A su lado, para despachar la correspondencia que llegaba cada mañana, estaba su secretario
                    personal: el coronel letrado <strong>José Santos Ortiz</strong>, hombre de confianza para
                    los asuntos escritos y administrativos. Cuando a fines de 1834 el gobernador interino de
                    Buenos Aires, Manuel Vicente Maza, encargó a Quiroga una misión de mediación en la disputa
                    entre Salta y Tucumán, fue Santos Ortiz quien lo acompañó en la partida del 18 de diciembre
                    de 1834. Rosas mismo los escoltó hasta San Antonio de Areco antes de despedirlos.
                  </p>
                  <p>
                    Santos Ortiz estaría al lado de Quiroga hasta el final: moriría junto a él en la emboscada
                    de Barranca Yaco el 16 de febrero de 1835.
                  </p>
                  <span class="card-nota-certeza">
                    Nota: la identidad de las personas presentes en el momento exacto en que Alberdi entregó
                    la carta de Heredia a Quiroga (octubre o noviembre de 1834) no está documentada
                    individualmente en las fuentes primarias consultadas. Santos Ortiz era el secretario habitual
                    de Quiroga para su correspondencia matutina, pero no existe evidencia directa de su presencia
                    en ese encuentro específico con Alberdi. Las fuentes documentan el entorno general de Quiroga
                    en Buenos Aires durante ese período; los testigos del momento puntual de la entrega de la
                    carta permanecen desconocidos.
                  </span>
                </div>
                <footer class="event-card__footer">
                  <cite class="event-card__cite">revisionistas.com.ar; comercioyjusticia.info; repositoriouba.sisbi.uba.ar.</cite>
                </footer>
              </div>
            </article>
```

---

## Full Block to Insert (H4 + Grid with BIOG-19 and BIOG-20)

The complete block to splice before `</div><!-- /#rev-alberdi-quiroga -->`:

```html

          <h4 class="sub-period__subtitle reveal reveal-fade" style="--reveal-delay: 0ms">Facundo Quiroga: el hombre que conoció Alberdi</h4>
          <div class="events-grid events-grid--certeza" aria-label="Perfil biográfico de Facundo Quiroga">

            <!-- BIOG-19: El Tigre de los Llanos — perfil biográfico de Facundo Quiroga -->
            <article id="BIOG-19" class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: 0ms">
              <div class="event-card__media">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Facundo_Quiroga_por_Garc%C3%ADa_del_Molino.jpg/500px-Facundo_Quiroga_por_Garc%C3%ADa_del_Molino.jpg"
                  alt="Retrato de Juan Facundo Quiroga, por García del Molino, ca. 1840"
                  loading="lazy"
                  width="500"
                  height="620"
                />
              </div>
              <div class="event-card__body">
                <header class="event-card__header">
                  <span class="event-card__year">1788–1835</span>
                  <span class="event-card__certeza-badge badge--hecho" aria-label="Hecho verificado">Hecho</span>
                  <h4 class="event-card__title">El Tigre de los Llanos: quién era Juan Facundo Quiroga</h4>
                </header>
                <div class="event-card__content">
                  <p>
                    Juan Facundo Quiroga nació el 27 de noviembre de 1788 en San Antonio de los Llanos, un pueblo
                    remoto de La Rioja, hijo de José Prudencio Quiroga y Juana Rosa de Argañaraz. Creció en la
                    cultura ganadera del interior, donde la habilidad para montar, pelear y mandar era la única
                    credencial que importaba. Su apodo —el Tigre de los Llanos— le fue dado antes de que ningún
                    ejército lo conociera.
                  </p>
                  <p>
                    En las guerras civiles que desgarraron las Provincias Unidas del Río de la Plata, Quiroga
                    emergió como el caudillo federal más temido del interior. Sufrió dos derrotas decisivas ante
                    los unitarios —La Tablada (1829) y Oncativo (1830)— pero las compensó con una victoria
                    aplastante en La Ciudadela (1831), que dejó al ejército unitario de la Liga del Interior
                    deshecho y consolidó el predominio federal en el noroeste. Fue aliado de Juan Manuel de Rosas
                    y de Estanislao López, aunque más indómito y menos calculador que ambos.
                  </p>
                  <p>
                    La paradoja central de Quiroga —sostenida en su propia correspondencia con Rosas— era que
                    sus convicciones políticas profundas eran unitarias, pero que había elegido liderar el
                    federalismo porque era la causa del pueblo llano riojano.
                    <span class="card-nota-certeza">
                      Nota: esta declaración proviene de la correspondencia de Quiroga con Rosas, citada en fuentes
                      secundarias que refieren el <em>Archivo del Brigadier General Juan Facundo Quiroga</em>
                      (Instituto Ravignani/UBA). No se cita como confesión pública sino como posicionamiento
                      privado documentado.
                    </span>
                  </p>
                  <p>
                    Desde diciembre de 1833 residía en Buenos Aires, casado con Dolores Fernández, con hijos
                    en las escuelas porteñas y negocios bajo la gestión de su agente Braulio Costa. Fue en ese
                    contexto —caudillo en retiro relativo, no en campaña— que el joven Alberdi lo conoció a
                    fines de 1834. Quiroga partiría en misión mediadora en enero de 1835. Sería asesinado en
                    Barranca Yaco, provincia de Córdoba, el 16 de febrero de 1835.
                  </p>
                  <p class="card-nota-historiografica">
                    <strong>Nota historiográfica:</strong> Domingo Faustino Sarmiento inmortalizó a Quiroga en
                    <em>Facundo: Civilización y Barbarie</em> (Santiago de Chile, 1845) como símbolo de la
                    "barbarie" caudillista opuesta a la "civilización" europea. Pero el <em>Facundo</em> fue
                    escrito desde el exilio chileno como instrumento político contra Rosas, no como historia
                    neutral: el Quiroga de Sarmiento es una figura retórica antes que un retrato. Historiadores
                    posteriores como Ariel de la Fuente en <em>Children of Facundo: Caudillo and Gaucho
                    Insurgency during the Argentine State-Formation Process, La Rioja, 1853–1870</em> (Duke
                    University Press, 2000) ofrecen una lectura más matizada del caudillismo riojano, atendiendo
                    a sus bases sociales y económicas en lugar de al esquema civilización/barbarie.
                  </p>
                </div>
                <footer class="event-card__footer">
                  <cite class="event-card__cite">Wikipedia EN, "Facundo Quiroga"; buscabiografias.com; historiaybiografias.com; revisionistas.com.ar; comercioyjusticia.info.</cite>
                </footer>
              </div>
            </article>

            <!-- BIOG-20: El entorno de Quiroga en Buenos Aires, 1833–1835 — Santos Ortiz y Braulio Costa -->
            <article id="BIOG-20" class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: 80ms">
              <div class="event-card__body">
                <header class="event-card__header">
                  <span class="event-card__year">1833–1834</span>
                  <span class="event-card__certeza-badge badge--hecho" aria-label="Hecho verificado">Hecho</span>
                  <h4 class="event-card__title">El círculo de Quiroga en Buenos Aires: Santos Ortiz y Braulio Costa</h4>
                </header>
                <div class="event-card__content">
                  <p>
                    Quiroga llegó a Buenos Aires en diciembre de 1833 con motivaciones múltiples: recuperar su
                    salud —sufría de reuma—, supervisar la educación de sus hijos en las escuelas porteñas, y
                    atender sus actividades comerciales junto a su agente y amigo <strong>Braulio Costa</strong>.
                    El caudillo más temido del noroeste vivía en la ciudad de Rosas con una vida más burguesa
                    que guerrera.
                  </p>
                  <p>
                    A su lado, para despachar la correspondencia que llegaba cada mañana, estaba su secretario
                    personal: el coronel letrado <strong>José Santos Ortiz</strong>, hombre de confianza para
                    los asuntos escritos y administrativos. Cuando a fines de 1834 el gobernador interino de
                    Buenos Aires, Manuel Vicente Maza, encargó a Quiroga una misión de mediación en la disputa
                    entre Salta y Tucumán, fue Santos Ortiz quien lo acompañó en la partida del 18 de diciembre
                    de 1834. Rosas mismo los escoltó hasta San Antonio de Areco antes de despedirlos.
                  </p>
                  <p>
                    Santos Ortiz estaría al lado de Quiroga hasta el final: moriría junto a él en la emboscada
                    de Barranca Yaco el 16 de febrero de 1835.
                  </p>
                  <span class="card-nota-certeza">
                    Nota: la identidad de las personas presentes en el momento exacto en que Alberdi entregó
                    la carta de Heredia a Quiroga (octubre o noviembre de 1834) no está documentada
                    individualmente en las fuentes primarias consultadas. Santos Ortiz era el secretario habitual
                    de Quiroga para su correspondencia matutina, pero no existe evidencia directa de su presencia
                    en ese encuentro específico con Alberdi. Las fuentes documentan el entorno general de Quiroga
                    en Buenos Aires durante ese período; los testigos del momento puntual de la entrega de la
                    carta permanecen desconocidos.
                  </span>
                </div>
                <footer class="event-card__footer">
                  <cite class="event-card__cite">revisionistas.com.ar; comercioyjusticia.info; repositoriouba.sisbi.uba.ar.</cite>
                </footer>
              </div>
            </article>

          </div>
```

---

## Classification Verification

| Card | Certeza | Nota especial | Fuentes | ✅ |
|------|---------|---------------|---------|-----|
| BIOG-19 | `card-hecho` | `card-nota-historiografica` (Sarmiento 1845 + De la Fuente 2000) | Wikipedia EN, buscabiografias.com, historiaybiografias.com, revisionistas.com.ar, comercioyjusticia.info | ✅ |
| BIOG-20 | `card-hecho` | `card-nota-certeza` (incertidumbre sobre testigos del encuentro) | revisionistas.com.ar, comercioyjusticia.info, repositoriouba.sisbi.uba.ar | ✅ |

## Must-Have Checklist

- [x] BIOG-19 clasificada como `card-hecho` con `card-nota-historiografica` que menciona Sarmiento/*Facundo* (1845) y De la Fuente (2000)
- [x] BIOG-20 clasificada como `card-hecho` con `card-nota-certeza` que acota explícitamente la incertidumbre sobre los testigos del encuentro
- [x] Santos Ortiz nombrado en BIOG-20 como secretario habitual — y aclarado en la nota que no hay evidencia directa de su presencia en el momento exacto de la entrega
- [x] La paradoja "mis ideas son unitarias" atribuida a carta a Rosas (vía correspondencia privada), no presentada como dato absoluto — tiene `card-nota-certeza` propia
- [x] HTML de excerpt completo para ambas cards incluido en el draft
- [x] Ancla de inserción documentada con pre-flight check

## Narrative Coherence Review

- **BIOG-19 vs SP2-2:** SP2-2 nombra a Quiroga solo en el contexto del conflicto unitarios/federales como figura del bando federal. BIOG-19 es el perfil biográfico personal: nacimiento, familia, batallas, paradoja ideológica, muerte. No hay duplicación.
- **BIOG-19 vs BIOG-17:** BIOG-17 describe el encuentro puntual (oct/nov 1834, la carta de Heredia). BIOG-19 describe quién era el hombre al que Alberdi fue a ver. Son complementarios, no redundantes.
- **BIOG-20 vs BIOG-17/18:** BIOG-17 y BIOG-18 documentan el encuentro y las conversaciones desde la perspectiva de Alberdi. BIOG-20 describe el contexto de Quiroga en Buenos Aires — quién estaba a su alrededor habitualmente. No se repite "ese hombre extraordinario" ni las citas de Alberdi.
- **Barranca Yaco:** BIOG-18 ya lo menciona en nota de certeza. BIOG-19 lo menciona como la muerte de Quiroga (necesario para el perfil biográfico completo). BIOG-20 lo menciona en el contexto de la partida de Santos Ortiz. No hay contradicción — las tres menciones son contextualmente distintas.
- **`card-nota-historiografica` de BIOG-19:** Sarmiento ya aparece en una nota de `card-nota-certeza` en BIOG-18 ("Sarmiento lo inmortalizó ese mismo año en Facundo (1845)..."). La nota en BIOG-19 es distinta: es una nota historiográfica que explica el sesgo del *Facundo* como fuente y cita la revisión de De la Fuente (2000) — perspectiva que no existe en BIOG-18.

---

## Apéndice T03 — Triple Gate S06

Ejecutado: 2026-03-22. Valores reales obtenidos en T03.

| Capa | Check | Valor real |
|------|-------|------------|
| Shell | `grep -c 'data-certeza' index.html` | 54 ✅ |
| Shell | `grep -c 'id="BIOG-19"' index.html` | 1 ✅ |
| Shell | `grep -c 'id="BIOG-20"' index.html` | 1 ✅ |
| Shell | `grep -c 'rev-alberdi-quiroga' index.html` | 3 ✅ |
| Shell | `grep -c 'sub-nav__link' index.html` | 6 ✅ |
| Shell | `grep -q 'San Antonio de los Llanos'` | OK ✅ |
| Shell | `grep -q 'Santos Ortiz'` | OK ✅ |
| Shell | `grep -q 'card-nota-historiografica'` | OK ✅ |
| Shell | `grep -q 'Braulio Costa'` | OK ✅ |
| Shell | `grep -q 'Barranca Yaco'` | OK ✅ |
| DOM | `sub-nav .sub-nav__link.length` | 6 ✅ |
| DOM | `#rev-alberdi-quiroga [data-certeza].length` | 4 ✅ |
| DOM | `#BIOG-19 .card-nota-historiografica !== null` | true ✅ |
| DOM | `#BIOG-20 .card-nota-certeza.length` | 1 ✅ |
| DOM | `.reveal.length` | 76 ✅ (base 73 + 3 nuevos: h4 + BIOG-19 + BIOG-20) |
| Narrativa | BIOG-19 ≠ SP2-2 (no repite contexto político federal) | ✅ |
| Narrativa | BIOG-19 ≠ BIOG-17 (no repite episodio del encuentro) | ✅ |
| Narrativa | BIOG-20 ≠ BIOG-17/18 (no repite conversaciones; no usa "ese hombre extraordinario") | ✅ |
| Narrativa | `card-nota-historiografica` de BIOG-19 cita Sarmiento/*Facundo* (1845) + De la Fuente (2000) — distinta de la nota en BIOG-18 | ✅ |
| Narrativa | `card-nota-certeza` de BIOG-20 acota testigos del momento de la entrega como no documentados individualmente | ✅ |
| Narrativa | Santos Ortiz identificado como secretario en BA (correspondencia habitual), no como testigo de la entrega de la carta | ✅ |

Gate: 21/21 — S06 cerrado.
