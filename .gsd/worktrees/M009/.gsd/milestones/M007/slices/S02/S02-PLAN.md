# S02: De Tucumán a Buenos Aires — primeros pasos (1824–1833)

**Goal:** Investigar, verificar e integrar en `index.html` los bloques biográficos que narran el primer viaje de Alberdi a Buenos Aires (1824), su ingreso al Colegio de Ciencias Morales, el abandono del internado, sus primeros empleos (copista en escribanía, músico ocasional), y el regreso al estudio formal hacia la jurisprudencia — todo con fechas exactas, clasificación de certeza, y fuentes citadas.

**Demo:** El visitante puede leer en el sitio la historia de Alberdi entre ~14 y ~23 años: el viaje que lo sacó de Tucumán, el internado que no soportó, el trabajo como copista, y cómo retomó los estudios con un objetivo político — en cards con reveal-on-scroll dentro del sub-período `#rev-alberdi-formacion` ya creado en S01, continuando la secuencia cronológica BIOG-4 → BIOG-5 → BIOG-6 → BIOG-7 → BIOG-8.

## Must-Haves

- **Card hecho (BIOG-5):** viaje a Buenos Aires ca. 1824, edad ~14 años, motivación (educación formal gestionada por Felipe Alberdi), ingreso al Colegio de Ciencias Morales fundado por Rivadavia en 1823.
- **Card hecho + `card-nota-certeza` si los motivos exactos son inciertos (BIOG-6):** abandono del internado — fecha aproximada, circunstancias descritas en *Mi vida privada* (carácter independiente, dificultades de adaptación). Si la fecha no puede precisarse, `card-nota-certeza` inline.
- **Card hecho (BIOG-7):** primeros empleos — copista en escribanía (verificado en *Mi vida privada*), lecciones de música u otras menciones del período independiente. La faceta musical conecta con el Bloque 11 del milestone.
- **Card hecho + opinión (motivación) (BIOG-8):** regreso al estudio, ingreso a la Academia de Jurisprudencia, inicio formal de leyes. La motivación (el derecho como herramienta política, no vocación forense) puede ser certeza `opinión` si proviene de lectura autobiográfica o historiográfica, no de cita verificada.
- Mención de Miguel Cané (padre, 1812–1863) donde sea verificable — dentro de la card correspondiente con `<cite>`, no como card separada a menos que las fuentes lo justifiquen.
- Todas las cards dentro del `<div class="events-grid events-grid--certeza">` que ya existe en `#rev-alberdi-formacion`, a continuación de BIOG-4 (stagger desde 320ms en adelante).
- `data-certeza` count en `index.html` sube en ≥4 respecto a baseline post-S01 (38 → ≥42).
- No se añade CSS ni JS nuevo — reuso total de patrones existentes.

## Proof Level

- This slice proves: integration
- Real runtime required: yes (browser + JS console para verificar reveal y sub-nav)
- Human/UAT required: yes (lectura de coherencia narrativa cronológica S01 → S02)

## Verification

```bash
# V1 — data-certeza count sube ≥4 respecto a baseline 38
node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.match(/data-certeza/g); const n=m?m.length:0; console.log('data-certeza count:', n); process.exit(n>=42?0:1);"

# V2 — palabras clave del período están presentes en el HTML
grep -E 'Ciencias Morales|copista|jurisprudencia|internado' index.html | grep -v '^\s*<!--' | wc -l
# debe retornar ≥2

# V3 — las 4 cards nuevas tienen comentarios identificadores BIOG-5..BIOG-8
grep -c 'BIOG-[5678]' index.html
# debe retornar ≥4

# V4 — sub-período biográfico sigue delimitado correctamente tras la inserción
grep -n 'rev-alberdi-formacion' index.html
# debe mostrar la misma línea de apertura y que el div de cierre está después de BIOG-8

# V5 — diagnóstico de fallos: flags epistémicos presentes (al menos los que corresponden)
grep -c 'card-nota-certeza' index.html
# debe ser ≥4 (≥3 de S01 + ≥1 nuevo de S02 si hay incertidumbre en BIOG-6 o BIOG-8)

# V6 — no se introdujo CSS ni JS nuevo
git diff --stat HEAD -- styles.css app.js
# debe retornar 0 changes o solo index.html + S02-CONTENT-DRAFT.md

# V7 — diagnóstico de fallos: estado del borrador de contenido (failure-path check)
# Si V1–V3 fallan, inspeccionar primero si el borrador tiene datos sin propagar:
node -e "
const fs=require('fs');
const draft='.gsd/milestones/M007/slices/S02/S02-CONTENT-DRAFT.md';
const html='index.html';
const draftExists=fs.existsSync(draft);
const pendingCount=draftExists?(fs.readFileSync(draft,'utf8').match(/VERIFICACIÓN PENDIENTE/g)||[]).length:null;
const htmlExists=fs.existsSync(html);
const biogCount=htmlExists?(fs.readFileSync(html,'utf8').match(/BIOG-[5678]/g)||[]).length:0;
console.log('draft exists:',draftExists,'| pending items:',pendingCount,'| BIOG-5..8 in HTML:',biogCount);
if(!draftExists){console.error('ERROR: draft missing — T01 may not have completed');process.exit(1);}
if(biogCount<4){console.error('ERROR: cards missing in HTML — T02 may not have completed');process.exit(1);}
process.exit(0);
"
# Este comando diagnostica si el fallo es pre-T02 (draft faltante) o post-T02 (cards no integradas)
```

Browser (manual):
- `[Reveal] Initialized with N elements` en consola JS: N debe ser ≥61 (57 pre-S02 + 4 nuevas cards)
- `[SubNav] Initialized with 5 sub-periods, 5 links` — debe seguir siendo 5 (S02 no añade sub-nav link; ya existe el link a `#rev-alberdi-formacion`)
- Las 4 nuevas cards hacen reveal-slide al scroll dentro del sub-período biográfico

## Observability / Diagnostics

- **Runtime signals:**
  - `[Reveal] Initialized with N elements` en consola JS — N aumenta de 57 a ≥61 (1 por card nueva)
  - `[SubNav] Active sub-period → rev-alberdi-formacion` — debe seguir disparando al scroll
  - `document.querySelectorAll('#rev-alberdi-formacion [data-certeza]')` en DevTools → debe retornar ≥8 (4 de S01 + 4 nuevas)
- **Inspection surfaces:**
  - `grep -n 'BIOG-' index.html` → lista todas las cards biográficas por comentario identificador; si falta algún BIOG-5..8, hay error de integración
  - `grep -c 'data-certeza' index.html` → contador cuantitativo de cards; debe ser ≥42
  - `grep 'card-nota-certeza' index.html` → lista flags epistémicos activos (incertidumbres visibles en el HTML renderizado)
  - `grep -c 'VERIFICACIÓN PENDIENTE' .gsd/milestones/M007/slices/S02/S02-CONTENT-DRAFT.md` → items sin resolver en el borrador
- **Failure visibility:**
  - Si una card nueva no hace reveal: `grep 'reveal reveal-slide' index.html | grep -c 'BIOG-[5678]'` → verifica que las clases reveal están en cada card
  - Si `data-certeza` no sube: `grep -A2 'BIOG-[5678]' index.html | grep 'data-certeza'` → verifica que el atributo está en el elemento correcto
  - Si la narrativa cronológica es incoherente: leer BIOG-4 (ca. 1822–1824) → BIOG-5 (1824) → BIOG-6 (ca. 1827–1829) → BIOG-7 (ca. 1827–1832) → BIOG-8 (ca. 1832–1834) en secuencia
- **Redaction constraints:** ninguna — contenido histórico público, sin PII ni secretos

## Integration Closure

- **Upstream surfaces consumed:**
  - `index.html` líneas 344–442: `<div id="rev-alberdi-formacion">` con su `events-grid` existente — S02 añade cards dentro de ese grid
  - `S01-CONTENT-DRAFT.md` — patrón de borrador y apéndice de auditoría epistémica establecido en S01; S02 reutiliza la misma estructura
  - Stagger delay actual: BIOG-4 tiene `--reveal-delay: 240ms`; BIOG-5 arranca en 320ms
  - Baseline `data-certeza` = 38 (post-S01)
- **New wiring introduced in this slice:**
  - 4 cards `data-certeza` nuevas (BIOG-5..BIOG-8) dentro del `events-grid--certeza` existente
  - Reveal IntersectionObserver registra automáticamente las nuevas cards (no hay wiring JS manual)
- **What remains before milestone is end-to-end:**
  - S03 (Regreso a Tucumán, Heredia, 1833–1838), S04 (perfil multifacético), S05–S08 (arco Quiroga)

## Tasks

- [x] **T01: Research y borrador verificado (Bloques 5–8)** `est:2h`
  - Why: las fuentes para el período 1824–1833 son más escasas en la web que las del período natal; los detalles del abandono del internado y los empleos tempranos requieren *Mi vida privada* o Mayer como fuente directa — sin draft previo, T02 propagaría incertidumbres en el HTML.
  - Files: `.gsd/milestones/M007/slices/S02/S02-CONTENT-DRAFT.md` (crear)
  - Do: investigar los 4 bloques con la estructura estándar del S01-CONTENT-DRAFT. Para **BIOG-5** (viaje a BsAs): confirmar año (1824 vs 1825 — algunas fuentes dicen 1825), edad, que fue Felipe quien gestionó la beca, y que el Colegio de Ciencias Morales fue fundado por Rivadavia en 1823. Para **BIOG-6** (abandono del internado): buscar en *Mi vida privada* el pasaje donde Alberdi narra la salida; identificar año aproximado (ca. 1827–1829); clasificar motivos como `hecho` si están en *Mi vida privada* o `opinión` si son inferidos; usar `card-nota-certeza` si la fecha no puede precisarse. Para **BIOG-7** (empleos): confirmar la referencia al trabajo de copista en *Mi vida privada*; buscar si hay mención de lecciones de música o de trabajo como músico en el período 1827–1832; distinguir claramente entre faceta artística personal y trabajo remunerado. Para **BIOG-8** (regreso al estudio / leyes): identificar si la institución es la Academia de Jurisprudencia, cuándo ingresó (ca. 1832–1834), y cuál es la fuente de la afirmación sobre su motivación política vs. forense. Para **Miguel Cané** (padre): verificar si el vínculo con Alberdi es anterior al Salón Literario de 1837 o si se forjó ahí — si no hay evidencia de contacto pre-1837, mencionar dentro de BIOG-5 o BIOG-8 con `card-nota-certeza` de incertidumbre sobre el momento exacto del encuentro. Redactar el borrador con: Certeza / Excerpt (2-4 oraciones) / Fuentes (≥2) / Cita-HTML / Notas de imagen. Flags `[VERIFICACIÓN PENDIENTE]` para cualquier dato sin fuente; `[PARÁFRASIS]` para citas no verificadas directamente.
  - Verify: `test -f .gsd/milestones/M007/slices/S02/S02-CONTENT-DRAFT.md && grep -c "^## Bloque" .gsd/milestones/M007/slices/S02/S02-CONTENT-DRAFT.md` devuelve 4
  - Done when: borrador completo con 4 bloques; cada bloque tiene ≥2 fuentes y Cita-HTML no vacío; todos los `[VERIFICACIÓN PENDIENTE]` tienen razón documentada o están resueltos.

- [x] **T02: Integrar cards S02 en index.html** `est:1h`
  - Why: convertir el borrador verificado en HTML dentro del sub-período biográfico existente; sin este paso el visitante no ve nada.
  - Files: `index.html`
  - Do: localizar el cierre del grid de S01 dentro de `#rev-alberdi-formacion` (actualmente BIOG-4 está en `--reveal-delay: 240ms`). Insertar las 4 nuevas cards (BIOG-5, BIOG-6, BIOG-7, BIOG-8) **dentro del mismo** `<div class="events-grid events-grid--certeza">`, a continuación de BIOG-4, con stagger 320ms / 400ms / 480ms / 560ms. Cada card debe tener: comentario identificador `<!-- BIOG-N: título -->`, clase `event-card card-hecho` (o `card-opinion`), `data-certeza="hecho"` (o `"opinion"`), clases `reveal reveal-slide`, `style="--reveal-delay: Nms"`, `card-certeza-indicator`, `event-card__year`, `event-card__title`, `event-card__excerpt` con `card-nota-certeza` si aplica, y `footer.card-source` con `<cite>`. Para `card-opinion` usar `blockquote.card-opinion__quote` + `footer.card-opinion__attribution`. Copiar el HTML exacto de los Cita-HTML del S02-CONTENT-DRAFT. Verificar con `grep -c 'data-certeza' index.html` que el count aumentó en exactamente 4 (de 38 a 42).
  - Verify: `node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.match(/data-certeza/g); console.log(m?m.length:0);"` devuelve 42; `grep -c 'BIOG-[5678]' index.html` devuelve ≥4
  - Done when: 4 cards nuevas en index.html; data-certeza = 42; HTML validado con `grep -E 'BIOG-[5678]' index.html` mostrando los 4 comentarios.

- [x] **T03: Verificación diagnóstica y coherencia narrativa S01→S02** `est:30m`
  - Why: gate de salida — confirmar la integración cuantitativamente, revisar la coherencia cronológica entre S01 y S02 en el browser, y documentar el estado epistémico en el CONTENT-DRAFT para S03.
  - Files: `index.html`, `.gsd/milestones/M007/slices/S02/S02-CONTENT-DRAFT.md`
  - Do: ejecutar todos los checks V1–V6 del Verification del slice. Abrir el sitio en browser (Live Server o similar), scrollear por `#rev-alberdi-formacion` y verificar que (a) las 4 nuevas cards revelan al scroll, (b) la narrativa fluye sin contradicciones: BIOG-4 termina con "1824 llevaría al joven tucumano a Buenos Aires" → BIOG-5 abre con el viaje en 1824 → BIOG-6 continúa con el internado → BIOG-7 los empleos → BIOG-8 el regreso al estudio. Verificar consola JS: `[Reveal] Initialized with N elements` debe ser ≥61; `[SubNav] Initialized with 5 sub-periods, 5 links` debe seguir siendo 5. Corregir cualquier error factual o inconsistencia cronológica encontrada. Añadir Apéndice T03 al S02-CONTENT-DRAFT con tabla de auditoría epistémica: [Card | Flag activo | Qué lo resolvería] — mismo patrón que S01.
  - Verify: `grep -c 'data-certeza' index.html` ≥42; `grep -c 'BIOG-[5678]' index.html` ≥4; `grep -E 'Ciencias Morales|copista|jurisprudencia' index.html | wc -l` ≥2; consola JS mostra N≥61 elementos reveal
  - Done when: todos los checks V1–V6 pasan; coherencia narrativa confirmada en browser; apéndice de auditoría añadido al CONTENT-DRAFT; sin errores históricos detectados.

## Files Likely Touched

- `index.html` — 4 cards nuevas dentro de `#rev-alberdi-formacion .events-grid--certeza`
- `.gsd/milestones/M007/slices/S02/S02-CONTENT-DRAFT.md` (nuevo en T01; actualizado en T03)
