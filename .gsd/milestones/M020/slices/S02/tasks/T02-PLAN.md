---
estimated_steps: 6
estimated_files: 2
---

# T02: Agregar cards INV-10 a INV-18 y cerrar el sub-período

**Slice:** S02 — Integración HTML — sub-período #rev-invasiones-inglesas con cards completas
**Milestone:** M020

## Description

Integrar la segunda mitad del content draft (INV-10 a INV-18) en el bloque `#rev-invasiones-inglesas` que T01 creó. Esta tarea completa las 18 cards y cierra el sub-período. Incluye casos especiales:

- **INV-13 (Beresford prisionero):** es `card-hecho` con una sección `card-rumor` embebida dentro del `<div class="card-detail">` para el rol de Ana Périchon. La evidencia principal (fuga por Rodríguez Peña/Padilla) es hecho; la atribución a Périchon es rumor.
- **INV-16 (Whitelocke en juicio):** requiere `<p class="card-nota-historiografica">` con las 4 hipótesis sobre el no-bombardeo, marcada como debate sin resolución.
- **INV-17 (Bayona):** `card-hecho` estándar con imagen de José Bonaparte verificada.
- **INV-18 (nexo causal):** es `card-opinion` (interpretación historiográfica) con `<blockquote class="card-opinion__quote">` citando el modelo de tres causas (condiciones necesarias, no causas suficientes). Tiene `card-nota-historiografica` opcional (ver notas del draft).

T01 debe haber sido completada antes de este task — el wrapper y las primeras 9 cards deben existir.

## Steps

1. **Leer INV-10 a INV-18 del content draft.** Abrir `.gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md` y leer las entradas INV-10 a INV-18. Prestar atención especial a las notas de cada entry sobre tipo de card, imágenes alternativas y flags especiales.

2. **Verificar que el bloque de T01 existe.** Confirmar:
   ```bash
   node -e "const h=require('fs').readFileSync('index.html','utf8'); const b=(h.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/)||[''])[0]; console.log('T01 cards:', (b.match(/data-certeza/g)||[]).length);"
   ```
   Debe retornar 9. Si retorna 0, T01 no está completa — detener y reportar el problema.

3. **Insertar INV-10 a INV-18 dentro del `events-grid` del sub-período,** después de la última card de T01 (INV-09) y antes del cierre `</div>` del grid y del cierre `</div><!-- /#rev-invasiones-inglesas ...-->`. Stagger: INV-10=720ms, INV-11=800ms, INV-12=880ms, INV-13=960ms, INV-14=1040ms, INV-15=1120ms, INV-16=1200ms, INV-17=1280ms, INV-18=1360ms.

4. **Casos especiales a respetar:**

   **INV-13 (Beresford prisionero — `card-hecho` + rumor embebido):**
   El card principal es `card-hecho` (los organizadores documentados son Rodríguez Peña y Padilla). Dentro del `<div class="card-detail">`, después de los párrafos del detalle expandible, agregar el rumor de Ana Périchon como:
   ```html
   <div class="card-rumor__embedded">
     <p class="card-rumor__text">
       <span class="card-certeza-icon" aria-hidden="true">🔍</span>
       <strong>Rumor:</strong> [texto sobre el rol de Ana Périchon según el draft]
     </p>
     <footer class="card-rumor__origin">
       <span class="card-rumor__origin-icon" aria-hidden="true">🔍</span>
       <p class="card-rumor__origin-text">Rumor historiográfico: no hay fuente primaria que vincule a Périchon con la organización de la fuga. Los organizadores documentados son Rodríguez Peña y Padilla (Wikipedia ES, La Nación 2020).</p>
     </footer>
   </div>
   ```
   Mantener el `data-certeza="hecho"` en el article principal.

   **INV-16 (Whitelocke — `card-hecho` con nota historiográfica):**
   Dentro del `<div class="card-detail">`, agregar:
   ```html
   <p class="card-nota-historiografica"><strong>Nota historiográfica:</strong> No existe una explicación única verificada de por qué Whitelocke no usó artillería. Cuatro hipótesis no excluyentes: (a) órdenes de preservar la ciudad para uso comercial — la más documentada; (b) temor a alienar a la población; (c) subestimación de la resistencia urbana; (d) problemas logísticos con artillería pesada en el barro rioplatense. La corte marcial de 1808 identificó la no-artillería como cargo agravante pero no definió la causa.</p>
   ```

   **INV-18 (nexo causal — `card-opinion`):**
   Esta es la única card del bloque que es `card-opinion` basada en interpretación historiográfica (no en una cita directa de prócer). Usar la estructura de `card-opinion` con `<blockquote class="card-opinion__quote">`:
   ```html
   <blockquote class="card-opinion__quote">
     <p>«Las invasiones inglesas de 1806 y 1807, con la creación de milicias en Buenos Aires, implicaron poner las armas en manos de los criollos, permitiendo su agrupación en unidades militares autónomas.»</p>
     <footer class="card-opinion__attribution">
       <strong class="card-opinion__author">Interpretación historiográfica</strong>
       <span class="card-opinion__context">— Síntesis académica: Revistas UNLP (2023); Halperin Donghi, T., <em>De la revolución de independencia a la confederación rosista</em>, Paidós; BuenosAiresHistoria.org. Las invasiones fueron condición necesaria, no causa suficiente.</span>
     </footer>
   </blockquote>
   ```
   Agregar también `<p class="card-nota-historiografica">` con el modelo de tres causas (invasiones + Ilustración + Bayona).

5. **Cerrar el sub-período correctamente.** El cierre `</div><!-- /#rev-invasiones-inglesas -->` ya estaba en el comentario de T01 — verificar que existe y está en la posición correcta (después de INV-18, antes de `<div id="rev-alberdi-formacion"`). Si T01 dejó el comentario incompleto, actualizar el cierre.

6. **Verificar la integración completa.**
   ```bash
   node -e "
   const h=require('fs').readFileSync('index.html','utf8');
   const b=(h.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/)||[''])[0];
   console.log('certeza:', (b.match(/data-certeza/g)||[]).length);
   console.log('toggles:', (b.match(/card-expand-toggle/g)||[]).length);
   console.log('notas:', (b.match(/card-nota-historiografica/g)||[]).length);
   console.log('src vacíos:', (b.match(/src=\"\"/g)||[]).length);
   "
   ```
   Resultados esperados: certeza=18, toggles≥15, notas≥4, src vacíos=0.

## Must-Haves

- [ ] 9 cards adicionales (INV-10 a INV-18) dentro de `#rev-invasiones-inglesas`, total 18
- [ ] Stagger correcto: INV-10=720ms a INV-18=1360ms
- [ ] INV-13: `card-hecho` con sección de rumor embebida sobre Ana Périchon en el detalle expandible
- [ ] INV-16: `card-hecho` con `<p class="card-nota-historiografica">` de 4 hipótesis sobre el bombardeo
- [ ] INV-18: `card-opinion` con `<blockquote class="card-opinion__quote">` + `card-nota-historiografica` del modelo de tres causas
- [ ] Cierre `</div><!-- /#rev-invasiones-inglesas -->` correcto antes de `<div id="rev-alberdi-formacion"`
- [ ] Ninguna `<img>` con `src=""` — INV-16 usa imagen de Álzaga (`Malzaga.png` verificada) como alternativa a Whitelocke (no disponible en Commons)

## Verification

```bash
# Conteo completo del bloque
node -e "
const h=require('fs').readFileSync('index.html','utf8');
const b=(h.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/)||[''])[0];
if (!b) { console.error('FAIL: bloque no encontrado'); process.exit(1); }
const cards=(b.match(/data-certeza/g)||[]).length;
const notas=(b.match(/card-nota-historiografica/g)||[]).length;
const empty=(b.match(/src=\"\"/g)||[]).length;
console.log('cards:', cards, '| notas:', notas, '| src vacíos:', empty);
if (cards<18) { console.error('FAIL: < 18 cards'); process.exit(1); }
if (notas<4) { console.error('FAIL: < 4 notas'); process.exit(1); }
if (empty>0) { console.error('FAIL: src vacíos'); process.exit(1); }
console.log('PASS');
"

# INV-18 es card-opinion
node -e "
const h=require('fs').readFileSync('index.html','utf8');
const b=(h.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/)||[''])[0];
const hasOpinion=(b.match(/card-opinion/g)||[]).length;
console.log('card-opinion en bloque:', hasOpinion);
console.log(hasOpinion>=1?'PASS':'FAIL: INV-18 no es card-opinion');
"
```

## Inputs

- `index.html` — con el bloque `#rev-invasiones-inglesas` parcial (9 cards de T01) que este task completa
- `.gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md` — INV-10 a INV-18 con todos los campos

**Imágenes verificadas clave de INV-10 a INV-18:**
- INV-10/Saavedra: `https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Cornelio_Saavedra.jpg/500px-Cornelio_Saavedra.jpg` (verificar en API si no fue documentada en draft — el draft de T02 la menciona)
- INV-11/Belgrano: imagen ya usada en otras partes del sitio; buscar en `grep -n "Belgrano" index.html | head -5` para reutilizar URL existente
- INV-12/Pueyrredón: buscar `File:Juan_Martin_de_Pueyrredon.jpg` en Commons API
- INV-13/Beresford: `https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/William_Carr_Beresford%2C_Viscount_Beresford_by_Sir_William_Beechey.jpg/500px-William_Carr_Beresford%2C_Viscount_Beresford_by_Sir_William_Beechey.jpg` (ya verificada)
- INV-14/Popham: `https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Sir_Home_Riggs_Popham_from_NPG.jpg/500px-Sir_Home_Riggs_Popham_from_NPG.jpg` (ya verificada)
- INV-15/Liniers: `https://upload.wikimedia.org/wikipedia/commons/7/70/Santiago_de_Liniers.jpg` (ya verificada)
- INV-16/Álzaga (proxy para Whitelocke no disponible): `https://upload.wikimedia.org/wikipedia/commons/2/27/Malzaga.png` (ya verificada)
- INV-17/José Bonaparte: `https://upload.wikimedia.org/wikipedia/commons/5/5a/Joseph_Bonaparte.jpg` (verificada en T03 del draft)
- INV-18/Primera Junta: `https://upload.wikimedia.org/wikipedia/commons/4/49/Primera_junta.jpg` (verificada en T03 del draft)

**Nota sobre INV-10 (Saavedra):** El draft de T02 menciona la imagen de Saavedra pero sin URL verificada explícita. Buscar en Wikimedia API: `File:Cornelio_Saavedra.jpg` antes de usar — si no existe, usar `File:Primera_junta.jpg` (ya verificada) como imagen de contexto.

## Expected Output

- `index.html` modificado con 18 cards completas en `#rev-invasiones-inglesas`
- INV-16 con 4 hipótesis de no-bombardeo en `card-nota-historiografica`
- INV-18 como `card-opinion` con el modelo de tres causas
- Cierre correcto del sub-período antes de `#rev-alberdi-formacion`
- Verificación: 18 `data-certeza`, ≥4 `card-nota-historiografica`, 0 `src=""`, ≥1 `card-opinion` en el bloque

## Observability Impact

**Signals added by this task:**
- 9 new `<article data-certeza="...">` elements in `#rev-invasiones-inglesas` — inspectable via `document.querySelectorAll('#rev-invasiones-inglesas [data-certeza]').length` (expected: 18 after T02)
- 9 new `card-expand-toggle` buttons — inspectable via `document.querySelectorAll('#rev-invasiones-inglesas .card-expand-toggle').length` (expected: 18 after T02)
- 2 new `card-nota-historiografica` paragraphs (INV-16, INV-18) — total in block becomes ≥4
- 1 `card-rumor__embedded` section inside INV-13's `card-detail` — inspectable via `document.querySelector('#rev-invasiones-inglesas .card-rumor__embedded')`
- INV-18 as `card-opinion` — inspectable via `document.querySelectorAll('#rev-invasiones-inglesas .card-opinion').length` (expected ≥1)
- Stagger delays 720ms–1360ms on INV-10–INV-18 — visible in DevTools as CSS `--reveal-delay` custom property

**Failure state visibility:**
- If insertion missed the grid closing tag: `node -e "const h=require('fs').readFileSync('index.html','utf8'); const b=(h.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/)||[''])[0]; console.log(b.length + ' chars — expected ~75000 after T02');"` — block chars < 40000 indicates partial insertion
- If INV-18 is not `card-opinion`: `grep -n "card-opinion" index.html` — should show entries in the invasiones block around lines 840–876
- If rumor embedded is missing: `grep -n "card-rumor__embedded" index.html` — should show 1 occurrence in the invasiones block
- `grep -c "data-certeza" index.html` — global count should increment by 9 from T01's baseline

