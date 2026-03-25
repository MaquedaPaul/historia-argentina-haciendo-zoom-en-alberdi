# S08: Los escritos de Alberdi que leyó Facundo Quiroga — UAT

**Milestone:** M007
**Written:** 2026-03-22

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: el sitio es estático; la verificación cubre integridad estructural (shell/DOM), corrección de contenido (grep + node), y coherencia narrativa. No hay lógica de servidor ni autenticación que requiera runtime UAT adicional.

## Preconditions

1. `index.html` en el directorio del proyecto es la versión post-S08 (58 `data-certeza`, 82 `.reveal`).
2. Un servidor estático local está activo o el archivo puede abrirse directamente en browser (`file://`).
3. El tester ha leído BIOG-17 y BIOG-18 para poder verificar coherencia narrativa del arco.

## Smoke Test

```bash
grep -c 'data-certeza' index.html   # → debe devolver 58
grep -c 'id="BIOG-23"' index.html   # → debe devolver 1
grep -c 'id="BIOG-24"' index.html   # → debe devolver 1
```

Si cualquiera de estos tres comandos falla, detener — algo está roto antes de cualquier test de contenido.

---

## Test Cases

### 1. Integridad estructural: cards presentes y bien ubicadas

**Objetivo:** confirmar que BIOG-23 y BIOG-24 están dentro del sub-período `#rev-alberdi-quiroga` y no fuera de él.

1. Ejecutar en terminal:
   ```bash
   node -e "const h=require('fs').readFileSync('index.html','utf8'); const s=h.slice(h.indexOf('id=\"rev-alberdi-quiroga\"'), h.indexOf('</div><!-- /#rev-alberdi-quiroga -->')); console.log('BIOG-23 inside section:', s.includes('id=\"BIOG-23\"')); console.log('BIOG-24 inside section:', s.includes('id=\"BIOG-24\"'));"
   ```
2. **Expected:** `BIOG-23 inside section: true` / `BIOG-24 inside section: true`

---

### 2. Certeza: clasificación correcta de ambas cards

**Objetivo:** confirmar que BIOG-23 es `hecho` y BIOG-24 es `rumor`, y que no se introdujeron valores malformados.

1. Ejecutar:
   ```bash
   grep -n 'id="BIOG-23"' index.html
   grep -n 'id="BIOG-24"' index.html
   ```
2. En la línea de BIOG-23 verificar que el article tenga `data-certeza="hecho"`.
3. En la línea de BIOG-24 verificar que el article tenga `data-certeza="rumor"`.
4. Ejecutar el failure-path diagnostic:
   ```bash
   grep -n 'data-certeza' index.html | grep -v 'hecho\|opinion\|evidencia\|rumor'
   ```
5. **Expected:** BIOG-23 → `data-certeza="hecho"`, BIOG-24 → `data-certeza="rumor"`, failure-path diagnostic → cero resultados (exit 1).

---

### 3. Contenido BIOG-23: catálogo de obra verificada

**Objetivo:** confirmar que BIOG-23 cataloga los tres textos correctos y declara la nota epistémica.

1. Abrir `index.html` en browser y navegar a la sección del arco Alberdi-Quiroga (o usar Ctrl+F con "BIOG-23").
2. Forzar visibilidad si las cards tienen opacity:0 (ejecutar en consola del browser):
   ```js
   document.querySelectorAll('.reveal').forEach(el => {
     el.style.opacity = '1';
     el.style.transform = 'none';
   });
   ```
3. Verificar que BIOG-23 menciona:
   - *El espíritu de la música* (1832)
   - *Ensayo sobre un método nuevo para aprender a tocar el piano* (1832)
   - *Memoria descriptiva sobre Tucumán* (1834)
4. Verificar que BIOG-23 contiene una nota epistémica visible (span `card-nota-certeza`) declarando que ninguna fuente documenta que Quiroga haya leído estos textos.
5. **Expected:** los tres títulos presentes; nota epistémica visible; ningún texto afirma que Quiroga leyó alguno de los textos.

---

### 4. Contenido BIOG-24: honestidad epistémica y laguna documental

**Objetivo:** confirmar que BIOG-24 responde honestamente sin inventar reacciones de Quiroga.

1. Leer el cuerpo de BIOG-24 en browser (forzar visibilidad si necesario, como en Test 3).
2. Verificar que el card:
   - Declara explícitamente que la pregunta "¿qué textos leyó Quiroga?" no tiene respuesta documental.
   - Identifica la carta de Heredia (ya narrada en BIOG-17) como la base real de la evaluación de Quiroga — sin repetir verbatim ninguna cita de BIOG-17/18.
   - Menciona la *Memoria sobre Tucumán* como candidato plausible "sin evidencia directa" o equivalente.
   - Menciona Barranca Yaco como cierre narrativo (Quiroga murió el 16 de febrero de 1835, tres meses después del encuentro).
3. Verificar que el footer muestra el badge ⚠️ "Rumor" y la etiqueta "Laguna documental".
4. Verificar que no aparece ninguna frase del tipo "Quiroga pensó", "Quiroga reaccionó", "Quiroga dijo sobre los textos".
5. **Expected:** laguna documental declarada; badge Rumor visible; sin reacciones inventadas; Barranca Yaco presente.

---

### 5. Coherencia narrativa del arco BIOG-17…BIOG-24

**Objetivo:** confirmar que el arco completo es coherente como secuencia narrativa.

1. Navegar al sub-período Alberdi-Quiroga en el browser.
2. Leer las cards en orden: BIOG-17 (encuentro), BIOG-18 (la carta), BIOG-19 (propuesta del viaje), BIOG-20 (círculo de Quiroga), BIOG-21 (el rechazo), BIOG-22 (análisis del rechazo), BIOG-23 (catálogo de textos), BIOG-24 (laguna documental).
3. Verificar que:
   - BIOG-23 no repite verbatim las citas de BIOG-17 ("me acogió con mucha gracia") ni BIOG-18.
   - BIOG-24 referencia el contexto de BIOG-17 (carta de Heredia) sin duplicarlo.
   - El arco tiene progresión lógica: encuentro → propuesta → rechazo → contexto intelectual → cierre epistémico.
4. **Expected:** arco coherente, sin contradicciones de fechas o nombres, sin frases duplicadas entre cards.

---

### 6. Invariantes de sistema no rotos

**Objetivo:** confirmar que S08 no introdujo regresiones en el sistema existente.

1. Ejecutar:
   ```bash
   grep -c 'sub-nav__link' index.html   # → debe ser 6
   grep -c 'rev-alberdi-quiroga' index.html   # → debe ser 3
   ```
2. En browser, ejecutar:
   ```js
   document.querySelectorAll('.reveal').length   // → debe ser 82
   document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length   // → debe ser 8
   ```
3. Navegar al sub-nav del período Revolución (sticky nav en #periodo-revolucion) y verificar que tiene 6 links — sin link nuevo añadido por S08.
4. **Expected:** sub-nav__link=6, rev-alberdi-quiroga count=3, .reveal=82, certeza en sección=8. Sin sub-nav link nuevo.

---

## Edge Cases

### Reveal animation: cards invisibles al cargar

**Contexto:** Las cards con clase `reveal` tienen `opacity:0` hasta que el IntersectionObserver las detecta al scroll. En browser headless (Playwright) o al abrir el archivo directamente sin scroll, las cards pueden aparecer invisibles.

1. Abrir `index.html` en browser.
2. Si las cards BIOG-23/BIOG-24 no son visibles, hacer scroll hasta el sub-período Alberdi-Quiroga.
3. **Expected:** las cards aparecen con animación de entrada al entrar en el viewport. Si no hay animación pero el contenido es visible, también es correcto (prefers-reduced-motion o `reveal--no-anim` para elementos ya en viewport).

### Verificación de badge Rumor en BIOG-24

1. Inspeccionar el elemento `#BIOG-24` en DevTools o con:
   ```js
   document.querySelector('#BIOG-24 .card-certeza-badge-rumor').textContent
   ```
2. **Expected:** retorna "Rumor" (o equivalente visible).

---

## Failure Signals

- `grep -c 'data-certeza' index.html` retorna menos de 58 → regresión: cards perdidas o sobreescritas.
- `grep -c 'id="BIOG-23"' index.html` retorna 2 → duplicación accidental del bloque.
- `grep -n 'data-certeza' index.html | grep -v 'hecho|opinion|evidencia|rumor'` retorna cualquier línea → valor certeza malformado introducido.
- `document.querySelectorAll('.reveal').length` retorna 79 → el bloque h4 + las dos cards no registraron como reveal elements.
- BIOG-24 no muestra badge ⚠️ "Rumor" → clase `card-certeza-badge-rumor` ausente o mal formada.
- BIOG-24 contiene texto del tipo "Quiroga pensó que..." o "Quiroga reaccionó..." → reacción inventada; requiere edición.

---

## Not Proven By This UAT

- Funcionamiento del sistema de audio (out of scope — no hay assets de audio en S08).
- Responsive design de las nuevas cards en mobile (375px) — las cards reutilizan clases pre-existentes que ya son responsive; no se añadió CSS nuevo, pero el tester puede verificar si lo desea.
- Performance: carga de page en 3G (out of scope para un slice estático sin assets nuevos).
- Que el contenido histórico de BIOG-23 sea exhaustivo — el catálogo cubre los textos documentados al momento de la investigación; no se puede descartar que Alberdi haya escrito otros textos menores no registrados en las fuentes consultadas.

---

## Notes for Tester

- **La respuesta a "¿qué leyó Quiroga?" es deliberadamente "no se sabe"** — BIOG-24 como card-rumor es el cierre honesto correcto. Si el tester espera una respuesta definitiva, la ausencia de respuesta es el resultado válido del slice.
- La *Memoria sobre Tucumán* aparece en BIOG-24 como "candidato plausible sin evidencia directa" — si el tester encuentra una fuente primaria que confirme que Quiroga la leyó, ese hallazgo cambiaría la clasificación de BIOG-24 de rumor a hecho u opinión.
- BIOG-23 y BIOG-24 son las únicas cards del arco sin imagen — esto es correcto y deliberado (no hay imagen verificable relacionada con los textos tempranos de Alberdi). La ausencia de imagen no es un error.
- Si el tester hace scroll por el arco completo (BIOG-17…BIOG-24) y el flujo narrativo se siente natural y resuelto, el slice cumplió su objetivo.
