# S06: Quién era Facundo Quiroga y con quién estaba cuando recibió la carta

**Goal:** Integrar dos nuevas cards (BIOG-19 y BIOG-20) dentro del sub-período `#rev-alberdi-quiroga` existente, presentando el perfil biográfico de Facundo Quiroga y el entorno que lo rodeaba en Buenos Aires cuando recibió la carta de Alberdi.
**Demo:** El sitio muestra, dentro de `#rev-alberdi-quiroga` después de BIOG-17/18, un bloque temático con: (1) BIOG-19 — quién era Quiroga (origen riojano, caudillismo federal, guerras civiles, paradoja unitario/federal, asesinato), con `card-nota-historiografica` sobre Sarmiento; (2) BIOG-20 — el entorno de Quiroga en Buenos Aires 1833–35 (motivaciones para residir allí, secretario Santos Ortiz, amigo Braulio Costa, misión mediadora dic 1834), con `card-nota-certeza` acotando que la identidad de los presentes en el momento exacto de la entrega de la carta no está documentada individualmente. `data-certeza=54`, `reveal` aumenta ≥2, `sub-nav=6` sin cambio.

## Must-Haves

- BIOG-19 es `card-hecho` con `card-nota-historiografica` sobre Sarmiento/*Facundo* (1845) vs. historiografía posterior
- BIOG-20 es `card-hecho` con `card-nota-certeza` acotando la incertidumbre sobre los testigos en el momento exacto de la entrega de la carta
- Inserción dentro de `#rev-alberdi-quiroga` usando `<h4 class="sub-period__subtitle">` + nuevo `events-grid events-grid--certeza` — sin nuevo sub-período ni nuevo sub-nav link
- Stagger BIOG-19: `--reveal-delay: 0ms`, BIOG-20: `--reveal-delay: 80ms` (reset por nuevo bloque, patrón S04)
- Imagen de Quiroga reutilizada en BIOG-19 (misma URL ya en uso en BIOG-17 y SP2-2)
- `grep -c 'data-certeza' index.html` → 54 (era 52)
- `grep -c 'sub-nav__link' index.html` → 6 (sin cambio)
- No se introduce CSS ni JS nuevo

## Proof Level

- This slice proves: integration — cards en producción, sistema reveal y sub-nav registran correctamente
- Real runtime required: yes (browser DOM verification)
- Human/UAT required: no (triple gate suficiente)

## Verification

```bash
# Capa 1 — Shell
grep -c 'data-certeza' index.html          # debe ser 54
grep -c 'id="BIOG-19"' index.html          # debe ser 1
grep -c 'id="BIOG-20"' index.html          # debe ser 1
grep -c 'rev-alberdi-quiroga' index.html   # debe seguir siendo 3 (sin nuevo sub-período)
grep -c 'sub-nav__link' index.html         # debe seguir siendo 6
```

```js
// Capa 2 — DOM (browser_evaluate)
document.querySelectorAll('.sub-nav .sub-nav__link').length             // 6
document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length // 4 (era 2, +2)
document.querySelector('#BIOG-19 .card-nota-historiografica')           // not null
document.querySelectorAll('#BIOG-20 .card-nota-certeza').length         // 1
```

Capa 3 — Coherencia narrativa: BIOG-19 no duplica SP2-2 (contexto político federal) ni repite el encuentro de BIOG-17. BIOG-20 no duplica el contexto de BIOG-17/18. `card-nota-historiografica` de BIOG-19 es distinta de cualquier nota Sarmiento preexistente. Barranca Yaco ya referenciada en BIOG-18 — BIOG-20 puede mencionarlo en el contexto del viaje mediador sin duplicar.

## Observability / Diagnostics

- Runtime signals: `document.querySelectorAll('.reveal').length` post-inserción — debe aumentar ≥2 desde baseline 73 (2 nuevas cards; o 3 si `<h4>` lleva clase `reveal`)
- Inspection surfaces: `grep -n 'id="BIOG-19"\|id="BIOG-20"' index.html` → dos líneas con sus números de línea
- Failure visibility: si `grep -c 'data-certeza' index.html` devuelve 52 en lugar de 54, la inserción no ocurrió o las cards no tienen el atributo
- Diagnostic: si `grep -c 'rev-alberdi-quiroga' index.html` devuelve >3, se introdujo un nuevo sub-período erróneamente — verificar que la inserción no creó un nuevo `id="rev-alberdi-quiroga"` duplicado
- Failure path (nota historiográfica ausente): `grep -c 'card-nota-historiografica' index.html` → debe ser ≥2 post-inserción (era 1 en S04/BIOG-16); si es 1, BIOG-19 no tiene su nota historiográfica
- Failure path (nota certeza ausente): `grep -c 'card-nota-certeza' index.html` → debe aumentar respecto al baseline de S05 (mínimo +1 para BIOG-20); si no aumenta, la nota de incertidumbre del encuentro no fue insertada

## Integration Closure

- Upstream surfaces consumed: `index.html` línea ~848 (cierre `</div><!-- /#rev-alberdi-quiroga -->`), `S06-CONTENT-DRAFT.md`
- New wiring introduced: dos `<article>` elements con `data-certeza`, `.reveal`, `.reveal-slide` dentro del sub-período `#rev-alberdi-quiroga` existente; nuevo `<h4 class="sub-period__subtitle">` como separador visual
- What remains before milestone end-to-end: S07 (rechazo del viaje), S08 (textos de Alberdi que leyó Quiroga)

## Tasks

- [x] **T01: Redactar S06-CONTENT-DRAFT.md con BIOG-19 y BIOG-20 verificados** `est:25m`
  - Why: El content draft produce el HTML de excerpt listo para copiar, fuerza la verificación de certeza y fuentes antes de tocar `index.html`, y documenta las decisiones de clasificación.
  - Files: `.gsd/milestones/M007/slices/S06/S06-CONTENT-DRAFT.md`
  - Do:
    1. Leer `S06-RESEARCH.md` para extracción de hechos verificados (ya inlineado en el contexto de planificación).
    2. Redactar **BIOG-19** ("Quién era Juan Facundo Quiroga"): nacimiento 27 nov 1788 en San Antonio de los Llanos (La Rioja), padres Prudencio Quiroga + Juana Rosa Argañaraz, apodo "El Tigre de los Llanos", caudillo federal que derrotó unitarios en La Ciudadela (1831) y perdió en La Tablada (1829) y Oncativo (1830), aliado de Rosas/López, paradoja de su declaración privada "mis ideas son en realidad unitarias" (carta a Rosas), residencia en Buenos Aires dic 1833, casado con Dolores Fernández, asesinado Barranca Yaco 16 feb 1835. `card-hecho` con `card-nota-historiografica` obligatoria: Sarmiento usó a Quiroga como símbolo de la "barbarie" en *Facundo* (1845) — texto político-literario del exilio; Ariel de la Fuente (*Children of Facundo*, 2000) y otros historiadores ofrecen lectura más matizada. Imagen: URL de Quiroga (`https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Facundo_Quiroga_por_Garc%C3%ADa_del_Molino.jpg/500px-Facundo_Quiroga_por_Garc%C3%ADa_del_Molino.jpg`). Stagger: `--reveal-delay: 0ms`.
    3. Redactar **BIOG-20** ("El entorno de Quiroga en Buenos Aires, 1833–1835"): motivaciones para residir en BA (reuma, hijos en escuelas, negocios); secretario personal **José Santos Ortiz** (coronel letrado, a su lado para despachar correspondencia); agente comercial y amigo **Braulio Costa**; encargo como mediador Salta-Tucumán por gobernador Maza; partió 18 dic 1834 acompañado de Santos Ortiz; Rosas lo acompañó hasta San Antonio de Areco. `card-nota-certeza`: la identidad de los presentes en el momento exacto de la entrega de la carta (oct-nov 1834) no está documentada individualmente en las fuentes primarias; Santos Ortiz era el secretario habitual para correspondencia, pero no hay evidencia directa de su presencia en ese encuentro específico. No usar imagen (card sin `.card-image` — patrón existente). Stagger: `--reveal-delay: 80ms`.
    4. Para cada card, incluir en el draft: título, año, certeza, HTML del excerpt listo para copiar, fuentes (≥2 por card), notas de certeza con texto exacto.
    5. Anotar el ancla de inserción: el nuevo bloque se inserta ANTES de `</div><!-- /#rev-alberdi-quiroga -->` (~línea 848). La estructura es: `<h4 class="sub-period__subtitle">Facundo Quiroga: el hombre que conoció Alberdi</h4>` + `<div class="events-grid events-grid--certeza">` con BIOG-19 y BIOG-20 + `</div>`.
    6. No inventar citas directas de Quiroga sin fuente verificada — si se usa la paradoja "mis ideas son unitarias", atribuir a la correspondencia con Rosas y usar `card-nota-certeza`.
  - Verify: `test -f .gsd/milestones/M007/slices/S06/S06-CONTENT-DRAFT.md && grep -c 'BIOG-19\|BIOG-20' .gsd/milestones/M007/slices/S06/S06-CONTENT-DRAFT.md` → ≥4
  - Done when: `S06-CONTENT-DRAFT.md` existe, contiene HTML de excerpt completo para BIOG-19 y BIOG-20, ambas cards tienen certeza clasificada, fuentes citadas, y notas de certeza/historiográficas con texto listo para copiar.

- [x] **T02: Integrar BIOG-19 y BIOG-20 en index.html con inserción CRLF-safe** `est:15m`
  - Why: La inserción real en `index.html` es el trabajo que hace el sitio demostrable — sin este paso, el contenido solo existe en el draft.
  - Files: `index.html`, `.gsd/milestones/M007/slices/S06/S06-CONTENT-DRAFT.md`
  - Do:
    1. **Pre-flight check**: `grep -c 'id="BIOG-19"\|id="BIOG-20"' index.html` → debe ser 0. Si es >0, omitir inserción y ir a verificación.
    2. Escribir el bloque completo a insertar en un archivo temp usando el `Write` tool (NO heredoc). El bloque tiene esta estructura:
       ```
       <h4 class="sub-period__subtitle reveal reveal-fade" style="--reveal-delay: 0ms">Facundo Quiroga: el hombre que conoció Alberdi</h4>
       <div class="events-grid events-grid--certeza" aria-label="Perfil de Facundo Quiroga">
         <!-- BIOG-19: ... -->
         <article id="BIOG-19" ...> ... </article>
         <!-- BIOG-20: ... -->
         <article id="BIOG-20" ...> ... </article>
       </div>
       ```
    3. Usar Node.js CRLF-safe para insertar: `fs.readFileSync('index.html','utf8')` → `split('\r\n')` → buscar línea con `</div><!-- /#rev-alberdi-quiroga -->` → `splice(insertionIndex, 0, ...newLines)` → `join('\r\n')` → `writeFileSync`.
    4. Verificar inmediatamente: `grep -c 'data-certeza' index.html` → debe ser 54. Si es 52, la inserción falló — revisar el anchor de búsqueda.
    5. Verificar ausencia de CRLF doble: `node -e "const t=require('fs').readFileSync('index.html','utf8');if(t.match(/\r\r/g)){console.error('CRLF doble detectado');process.exit(1);}else{console.log('OK');}"`
  - Verify: `grep -c 'data-certeza' index.html` → 54; `grep -c 'id="BIOG-19"' index.html` → 1; `grep -c 'id="BIOG-20"' index.html` → 1
  - Done when: `data-certeza=54`, ambos IDs presentes exactamente una vez, sin CRLF doble.

  ## Observability Impact
  - Signals added/changed: 2 nuevos `data-certeza="hecho"` articles en `#rev-alberdi-quiroga`; conteo `.reveal` aumenta ≥2
  - How a future agent inspects this: `grep -n 'id="BIOG-19"\|id="BIOG-20"' index.html` → líneas exactas de inserción
  - Failure state exposed: `grep -c 'data-certeza' index.html` → 52 en lugar de 54 = inserción falló

- [x] **T03: Triple gate de verificación — shell + DOM + coherencia narrativa** `est:10m`
  - Why: Confirma que la inserción es estructuralmente correcta, que el runtime registra los nuevos elementos, y que no hay contradicciones narrativas entre las nuevas cards y el contenido existente.
  - Files: `index.html`, `.gsd/milestones/M007/slices/S06/S06-CONTENT-DRAFT.md`
  - Do:
    1. **Capa 1 — Shell** (todos deben pasar):
       - `grep -c 'data-certeza' index.html` → 54
       - `grep -c 'id="BIOG-19"' index.html` → 1
       - `grep -c 'id="BIOG-20"' index.html` → 1
       - `grep -c 'rev-alberdi-quiroga' index.html` → 3 (sub-nav link + div id + comentario cierre — sin nuevo sub-período)
       - `grep -c 'sub-nav__link' index.html` → 6
       - `grep -q 'San Antonio de los Llanos' index.html` → exit 0
       - `grep -q 'Santos Ortiz' index.html` → exit 0
       - `grep -q 'card-nota-historiografica' index.html` → exit 0 (BIOG-19)
       - `grep -q 'Braulio Costa' index.html` → exit 0 (BIOG-20)
    2. **Capa 2 — DOM** (abrir en browser, ejecutar con `browser_evaluate`):
       - `document.querySelectorAll('.sub-nav .sub-nav__link').length` → 6
       - `document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length` → 4
       - `document.querySelector('#BIOG-19 .card-nota-historiografica') !== null` → true
       - `document.querySelectorAll('#BIOG-20 .card-nota-certeza').length` → 1
       - `document.querySelectorAll('.reveal').length` → ≥75 (73 base + ≥2 nuevos)
    3. **Capa 3 — Coherencia narrativa** (leer las dos nuevas cards en el browser):
       - BIOG-19 es perfil biográfico personal (origen, guerras, muerte); no repite el contexto político federal de SP2-2 ni el episodio del encuentro de BIOG-17.
       - BIOG-20 describe el entorno en BA; no repite las conversaciones de BIOG-18 ni menciona "el hombre extraordinario" (ya en BIOG-18).
       - `card-nota-historiografica` de BIOG-19 menciona Sarmiento/*Facundo* (1845) y es contextualmente distinta de cualquier nota Sarmiento preexistente en el sitio.
       - La `card-nota-certeza` de BIOG-20 acota explícitamente la incertidumbre sobre los testigos del encuentro.
       - Santos Ortiz está identificado en BIOG-20 como secretario en BA (1833–1835), no confundido con el momento de la entrega de la carta.
    4. Registrar todos los valores reales en un **Apéndice T03** al final de `S06-CONTENT-DRAFT.md`.
  - Verify: `grep -c 'data-certeza' index.html` → 54; `grep -c 'sub-nav__link' index.html` → 6; `grep -q 'card-nota-historiografica' index.html` → exit 0
  - Done when: Las tres capas pasan sin fallo; Apéndice T03 añadido al content draft con los valores reales y "Gate: N/N — S06 cerrado".

## Files Likely Touched

- `index.html` — inserción de `<h4 class="sub-period__subtitle">` + `<div class="events-grid events-grid--certeza">` con BIOG-19 y BIOG-20, antes de `</div><!-- /#rev-alberdi-quiroga -->` (~línea 848)
- `.gsd/milestones/M007/slices/S06/S06-CONTENT-DRAFT.md` — creado en T01, actualizado con Apéndice T03 en T03
