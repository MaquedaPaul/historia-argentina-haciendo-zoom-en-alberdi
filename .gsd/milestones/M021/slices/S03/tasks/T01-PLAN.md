---
estimated_steps: 5
estimated_files: 2
---

# T01: Inject 4 battle cards into #rev-san-martin

**Slice:** S03 — Batallas y campañas — San Lorenzo hasta Maipú
**Milestone:** M021

## Description

Append 4 `card-hecho` articles (Entradas 7–10 from the content draft) into the `events-grid--certeza` div inside `#rev-san-martin` in `index.html`. This is a pure content injection — no new JS, CSS, or HTML patterns required. The entire operation uses the Write→Edit approach proven in S02 to avoid heredoc/shell escaping issues on Windows.

After this task, `querySelectorAll('#rev-san-martin [data-certeza]').length` will be 10 (6 existing from S02 + 4 new), meeting the S03 slice success criterion.

## Steps

1. **Pre-flight check:** Verify insertion anchor is unique: `grep -c "/.events-grid rev-san-martin" index.html` must return 1. Also confirm current certeza count: `grep -c 'data-certeza' index.html` must return 99.

2. **Write temp staging file:** Use the Write tool to write `tmp-san-martin-s03.html` containing the 4 card articles below (see Card Content section). Do NOT use bash heredocs — use the Write tool only.

3. **Inject via Edit:** Use the Edit tool on `index.html`. The `oldText` is the exact two-line anchor:
   ```
             </div><!-- /.events-grid rev-san-martin -->
           </div><!-- /#rev-san-martin -->
   ```
   The `newText` is the 4 cards (read from the temp file) followed by those same two closing lines.

4. **Delete temp file:** `rm tmp-san-martin-s03.html`

5. **Run verification:** Execute all checks in the Verification section below. All must pass before marking done.

## Card Content

All 4 cards follow the standard `card-hecho` template (same as S02 hecho cards). Stagger delays continue from S02's last card (400ms): 480, 560, 640, 720ms.

### Entrada 7 — Cuyo y la preparación del Ejército de los Andes

```html
            <!-- Entrada 7: Cuyo y la preparación del Ejército de los Andes -->
            <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: 480ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">✓</span>
                <span class="card-certeza-label">Hecho documentado</span>
              </div>
              <div class="card-image"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/San_Mart%C3%ADn_en_los_Andes%2C_1817_%281908%29.jpg/500px-San_Mart%C3%ADn_en_los_Andes%2C_1817_%281908%29.jpg" alt="San Martín en los Andes, pintura de Augusto Ballerini, 1908, óleo sobre lienzo" loading="lazy"></div>
              <span class="event-card__year">1814 – 1816</span>
              <h3 class="event-card__title">Cuyo y la preparación del Ejército de los Andes</h3>
              <p class="event-card__excerpt">En 1814, San Martín pidió el gobierno de Cuyo, comprendiendo que la guerra no se ganaría en el Norte sino cruzando los Andes. Durante tres años transformó Mendoza en una fábrica de guerra: fundó talleres de armas, uniformes y pólvora; reclutó chilenos exiliados tras Rancagua (1814); incorporó esclavos libertos en batallones de infantería; construyó hospitales de campaña. Cuando el Ejército de los Andes cruzó la cordillera en enero de 1817, llevaba 5.200 soldados, 21 cañones y 9.000 mulas.</p>
              <button class="card-expand-toggle" aria-expanded="false">
                <span class="card-expand-toggle__text">Ver más</span>
                <span class="card-expand-toggle__icon" aria-hidden="true">▼</span>
              </button>
              <div class="card-detail" hidden>
                <p>La preparación del cruce fue una hazaña logística sin precedentes en América. San Martín diseñó cada detalle: los soldados marcharon sobre mulas para llegar frescos al combate; los caballos de batalla iban separados para conservarlos; la artillería fue fabricada en Cuyo porque traerla desde Buenos Aires era imposible. Usó una red de espías en Chile (organizada por Manuel Rodríguez) para conocer en tiempo real la posición de las fuerzas realistas.</p>
                <p>La incorporación de esclavos libertos fue una decisión táctica y moral: los batallones N.° 7 y 8 eran mayoritariamente negros y se convirtieron en el núcleo más combativo del Ejército de los Andes. El análisis de Tulio Halperin Donghi (<em>De la revolución de independencia a la confederación rosista</em>, 1972) señala que la gobernación de Cuyo fue el único período en que San Martín ejerció poder civil — y lo hizo con una eficiencia que contrastaba con el caos político de Buenos Aires.</p>
              </div>
              <footer class="card-source"><span class="card-source__icon" aria-hidden="true">📄</span><cite>elhistoriador.com.ar; Infobae, "Maipú: bicentenario de la batalla" (2018); Wikipedia ES, "Cruce de los Andes"; memoriachilena.gob.cl</cite></footer>
            </article>
```

### Entrada 8 — El cruce de los Andes

```html
            <!-- Entrada 8: El cruce de los Andes -->
            <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: 560ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">✓</span>
                <span class="card-certeza-label">Hecho documentado</span>
              </div>
              <div class="card-image"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Cruce_de_los_Andes.jpg/500px-Cruce_de_los_Andes.jpg" alt="Cruce de los Andes, pintura histórica clásica" loading="lazy"></div>
              <span class="event-card__year">Enero de 1817</span>
              <h3 class="event-card__title">El cruce de los Andes</h3>
              <p class="event-card__excerpt">El 17 de enero de 1817 la vanguardia del Ejército de los Andes partió de Mendoza. El cruce se realizó en seis columnas por distintos pasos para desorientar a los realistas. A temperaturas bajo cero, con racionamiento estricto, 5.200 soldados con 21 cañones atravesaron la cordillera más alta del hemisferio occidental. La operación duró 21 días. San Martín escribió a Guido antes de partir: "Si se consigue poner pie en llano, la cosa está asegurada."</p>
              <button class="card-expand-toggle" aria-expanded="false">
                <span class="card-expand-toggle__text">Ver más</span>
                <span class="card-expand-toggle__icon" aria-hidden="true">▼</span>
              </button>
              <div class="card-detail" hidden>
                <p>El cruce fue comparado en la época con los de Aníbal y Napoleón — y superaba a ambos en escala logística. Napoleón cruzó los Alpes con 40.000 hombres pero en un solo paso; San Martín dispersó el ejército en seis columnas para fragmentar la respuesta realista. La sincronización fue perfecta: todas las columnas debían llegar a Chile en fechas calculadas para converger antes de que los realistas pudieran concentrar sus fuerzas.</p>
                <p>El Plan Maitland — propuesto en 1800 por el general británico Thomas Maitland para una posible conquista del Cono Sur — incluía el cruce de los Andes como paso estratégico; investigadores (Rodolfo Terragno, <em>Maitland y San Martín</em>, 2001) han argumentado que San Martín conocía ese plan. El 13 de enero de 1817, cuatro días antes de la partida, San Martín escribió a Guido detallando la sincronización de las columnas.</p>
              </div>
              <footer class="card-source"><span class="card-source__icon" aria-hidden="true">📄</span><cite>norteinforma.com.ar (carta 13 ene 1817 a Guido); memoriachilena.gob.cl; elhistoriador.com.ar; Historia 396 Dialnet (artículo académico peer-reviewed, 2022)</cite></footer>
            </article>
```

### Entrada 9 — Batalla de Chacabuco

```html
            <!-- Entrada 9: Batalla de Chacabuco -->
            <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: 640ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">✓</span>
                <span class="card-certeza-label">Hecho documentado</span>
              </div>
              <div class="card-image"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Battle_of_Chacabuco.jpg/500px-Battle_of_Chacabuco.jpg" alt="Batalla de Chacabuco, 12 de febrero de 1817 — Tropas del Ejército de los Andes" loading="lazy"></div>
              <span class="event-card__year">12 de febrero de 1817</span>
              <h3 class="event-card__title">Batalla de Chacabuco</h3>
              <p class="event-card__excerpt">Dieciséis días después de cruzar los Andes, San Martín aplastó al ejército realista en Chacabuco, a 55 km al norte de Santiago. La batalla duró pocas horas. Los realistas perdieron 600 prisioneros, 450 muertos y todo su armamento. Los patriotas perdieron menos de 100 hombres. El gobernador realista Marcó del Pont huyó y fue capturado. Santiago cayó en manos patriotas al día siguiente.</p>
              <button class="card-expand-toggle" aria-expanded="false">
                <span class="card-expand-toggle__text">Ver más</span>
                <span class="card-expand-toggle__icon" aria-hidden="true">▼</span>
              </button>
              <div class="card-detail" hidden>
                <p>Chacabuco no debería haber salido tan bien: San Martín quería atacar con la pinza clásica (O'Higgins por el este, Soler por el oeste) pero O'Higgins se adelantó impulsivamente antes de que Soler estuviera en posición. El plan se improvisó en combate. O'Higgins cargó de frente y fue rechazado; cuando Soler flanqueó, el colapso realista fue total.</p>
                <p>San Martín, en su parte al gobierno, elogió a ambos brigadieres por igual — absorbiendo la imprudencia táctica de O'Higgins en el mérito compartido de la victoria. Al día siguiente, el Cabildo de Santiago ofreció a San Martín la gobernación de Chile. Él la rechazó y propuso a O'Higgins. Esta decisión — renunciar al poder político disponible para continuar la campaña militar — anuncia el patrón que repetirá en 1822.</p>
              </div>
              <footer class="card-source"><span class="card-source__icon" aria-hidden="true">📄</span><cite>Wikipedia ES, "Batalla de Chacabuco"; elhistoriador.com.ar; museohistoriconacional.cultura.gob.ar; Historia 396 Dialnet (artículo académico peer-reviewed, 2022)</cite></footer>
            </article>
```

### Entrada 10 — Cancha Rayada y Maipú

```html
            <!-- Entrada 10: Cancha Rayada y Maipú — derrota y victoria definitiva -->
            <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: 720ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">✓</span>
                <span class="card-certeza-label">Hecho documentado</span>
              </div>
              <div class="card-image"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Batalla_de_Maipu.jpg/500px-Batalla_de_Maipu.jpg" alt="Batalla de Maipú, 5 de abril de 1818 — pintura histórica" loading="lazy"></div>
              <span class="event-card__year">19 mar – 5 abr 1818</span>
              <h3 class="event-card__title">Cancha Rayada y Maipú — derrota y victoria definitiva</h3>
              <p class="event-card__excerpt">El 19 de marzo de 1818, el general realista Osorio atacó de noche y por sorpresa al Ejército Unido en Cancha Rayada — 120 muertos, pánico en Santiago, rumores de que San Martín y O'Higgins habían muerto. Solo Las Heras salvó su división entera. En 17 días San Martín reorganizó 5.000 soldados. El 5 de abril de 1818, en Maipú, destruyó al ejército realista y aseguró la independencia de Chile.</p>
              <button class="card-expand-toggle" aria-expanded="false">
                <span class="card-expand-toggle__text">Ver más</span>
                <span class="card-expand-toggle__icon" aria-hidden="true">▼</span>
              </button>
              <div class="card-detail" hidden>
                <p>Cancha Rayada fue el único desastre militar documentado de San Martín — y Maipú fue su respuesta. La reorganización en 17 días, con un ejército diezmado y desmoralizado, en un país cuya capital estaba en pánico, es la demostración más clara de sus capacidades como comandante. En Maipú, los batallones de libertos (N.° 7 y N.° 8) fueron el factor desequilibrante: atacaron el centro realista con una ferocidad que cortó el eje de la formación enemiga.</p>
                <p>John Lynch (<em>Argentine Dictator</em>, 1981) señala que Maipú "significó la recuperación de la victoria que se había desperdiciado en Chacabuco" al no perseguir a los realistas en 1817. La escena pos-batalla — San Martín abrazando a O'Higgins herido en el campo de Maipú — es uno de los iconos más reproducidos de la independencia americana.</p>
              </div>
              <footer class="card-source"><span class="card-source__icon" aria-hidden="true">📄</span><cite>Infobae, "Maipú: bicentenario de la batalla" (2018); Billiken; izquierdadiario.es (análisis táctico); Lynch, J., <em>Argentine Dictator</em>, 1981</cite></footer>
            </article>
```

## Must-Haves

- [ ] 4 cards appended inside `#rev-san-martin` events grid (Cuyo, Cruce, Chacabuco, Maipú+Cancha Rayada)
- [ ] All cards: `data-certeza="hecho"`, `card-hecho` class, stagger delays 480/560/640/720ms
- [ ] Image URLs: `San_Martín_en_los_Andes` (Cuyo), `Cruce_de_los_Andes` (Cruce), `Battle_of_Chacabuco` (Chacabuco), `Batalla_de_Maipu` (Maipú) — all 500px thumbs
- [ ] Temp file `tmp-san-martin-s03.html` deleted after injection
- [ ] `grep -A 200 'id="rev-san-martin"' index.html | grep -c 'data-certeza'` → 10
- [ ] `grep -c 'data-certeza' index.html` → 103
- [ ] JS syntax check passes

## Verification

```bash
# Pre-flight: anchor uniqueness
grep -c "/.events-grid rev-san-martin" index.html   # → 1

# Card count in sub-period
grep -A 200 'id="rev-san-martin"' index.html | grep -c 'data-certeza'   # → 10

# Global certeza count
grep -c 'data-certeza' index.html   # → 103

# Image URLs present
grep -c "San_Mart%C3%ADn_en_los_Andes" index.html   # → 1
grep -c "Cruce_de_los_Andes.jpg" index.html          # → 1
grep -c "Battle_of_Chacabuco" index.html             # → 1
grep -c "Batalla_de_Maipu.jpg" index.html            # → 1

# JS syntax
node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK'); } catch(e) { if (e instanceof SyntaxError) console.error('SYNTAX ERROR:', e.message); else console.log('OK'); }"
```

## Inputs

- `index.html` — Contains `#rev-san-martin` sub-period with 6 existing cards (Entradas 1–6 from S02). Insertion anchor at lines 1468–1469: `</div><!-- /.events-grid rev-san-martin -->` / `</div><!-- /#rev-san-martin -->`. Pre-verified unique.
- `.gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md` — Authoritative source for all card content (Entradas 7–10, lines 240–380). Card HTML is fully authored in this task plan — do not re-read the draft unless cross-checking detail text.
- `app.js` — No changes needed; expand/collapse, reveal-on-scroll, and image fallbacks auto-discover new cards.

### Key constraints from prior work

- **Windows/Git Bash — no heredocs:** Use Write tool for temp file, then Edit to inject. This is the S02-proven approach (KNOWLEDGE.md).
- **Anchor whitespace:** The closing block uses 10-space indent for the inner div, 8-space for the outer. The Edit tool `oldText` must match exactly. Exact text confirmed:
  ```
            </div><!-- /.events-grid rev-san-martin -->
          </div><!-- /#rev-san-martin -->
  ```
  (10 spaces + `</div>` for inner, 8 spaces + `</div>` for outer)
- **Stagger continuity:** S02 ended at 400ms. S03 starts at 480ms. Sequence: 480, 560, 640, 720ms. Do not reuse 400ms.
- **data-certeza="hecho"** (no accent) — consistent with existing hecho cards.
- **No `card-nota-historiografica`** on any of these 4 cards — all are straightforward hecho cards per the content draft.
- **Image URL for Cruce de los Andes:** Uses `Cruce_de_los_Andes.jpg` (distinct from `San_Martín_en_los_Andes_1817.jpg`). Entrada 7 (Cuyo) uses the Ballerini 1908 painting; Entrada 8 (Cruce) uses the classic Cruce painting. Don't confuse them.

## Expected Output

- `index.html` — Modified: 4 new `card-hecho` articles appended inside `#rev-san-martin`, total cards in sub-period = 10, global `data-certeza` count = 103
