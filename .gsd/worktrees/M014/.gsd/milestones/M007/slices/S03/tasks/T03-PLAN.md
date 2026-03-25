---
estimated_steps: 4
estimated_files: 2
---

# T03: Verificación de tres capas — shell, browser y narrativa

**Slice:** S03 — Regreso a Tucumán, Alejandro Heredia y vuelta a Buenos Aires (1833–1838)
**Milestone:** M007

## Description

Ejecutar el gate de verificación de tres capas establecido en S01 y S02:
1. **Capa 1 — checks cuantitativos shell/node**: prueban integridad estructural.
2. **Capa 2 — señales de observabilidad browser**: prueban que el runtime registró los nuevos elementos.
3. **Capa 3 — coherencia narrativa manual**: prueba que BIOG-1..BIOG-11 forman una lectura sin contradicciones ni solapamientos.

Documentar los resultados como Apéndice T03 en `S03-CONTENT-DRAFT.md`. Aplicar correcciones si alguna capa falla — este task puede requerir volver a T02 para ajustes menores.

## Steps

1. **Capa 1 — checks cuantitativos (todos deben pasar):**
   ```bash
   grep -c 'data-certeza' index.html
   # → debe ser ≥ 45 (post-S02 baseline = 42; S03 agrega ≥3)

   grep 'BIOG-9\|BIOG-10\|BIOG-11' index.html | wc -l
   # → debe ser ≥ 3

   grep -E 'Heredia|Fragmento preliminar' index.html | wc -l
   # → debe ser ≥ 4

   grep '1810.*1838\|Los años de formación (1810–1838)' index.html | wc -l
   # → debe ser ≥ 1 (título y/o sub-nav actualizados)

   grep -c 'card-nota-certeza' index.html
   # → debe ser ≥ 10 (no regresión del baseline post-S02)

   git diff --name-only
   # → NO debe incluir styles.css ni app.js

   node -e "const h=require('fs').readFileSync('index.html','utf8'); const n=(h.match(/data-certeza/g)||[]).length; if(n<45) process.exit(1); console.log('OK: '+n+' cards con data-certeza')"
   # → debe salir con código 0
   ```
   Si cualquier check falla, diagnosticar con `grep -n 'BIOG-[0-9]\|BIOG-10\|BIOG-11' index.html` y corregir en index.html antes de continuar.

2. **Capa 2 — señales de observabilidad browser:**
   Abrir el sitio en un browser (via `bg_shell start "cd C:/Users/gabri/Desktop/historia && python -m http.server 8080"` o usando el servidor local si ya está corriendo). Abrir las DevTools → Console. Verificar:
   - `[Reveal] Initialized with N elements` — N debe ser ≥ 64 (post-S02 baseline = 61; 3 nuevas cards reveal reveal-slide agrega como mínimo 3).
   - `[SubNav] Initialized with 5 sub-periods, 5 links` — invariante; S03 no agrega nuevos sub-períodos.
   - En la consola del browser: `document.querySelectorAll('#rev-alberdi-formacion [data-certeza]').length` → debe ser ≥ 11 (post-S02 = 8; S03 agrega ≥3).
   - `document.querySelectorAll('.card-nota-certeza').length` → debe ser ≥ 10 (no regresión).
   - Scrollear hasta `#rev-alberdi-formacion` y verificar que las nuevas cards hacen fade/slide al entrar en el viewport.
   - Verificar que el puente narrativo al final del sub-período biográfico también hace reveal.
   - Verificar que el sub-nav muestra "1810–1838" (no "1810–1824").
   Si `[Reveal] Initialized with N elements` muestra N < 64, verificar que las cards nuevas tienen exactamente las clases `reveal reveal-slide` (no `reveal` solo ni `reveal-fade`) y que el puente tiene `reveal reveal-slide`.

3. **Capa 3 — coherencia narrativa manual:**
   Leer en secuencia BIOG-1 → BIOG-11 en el browser:
   - BIOG-1: Nacimiento 1810, padre Belgrano (1812–1813) → BIOG-2: madre muerta 1813, hermanos, crianza → BIOG-3: familia Alberdi y la Revolución → BIOG-4: doble orfandad (madre 1813, padre ca. 1822) → BIOG-5: viaje a Buenos Aires 1824, Colegio, Cané → BIOG-6: abandono internado ca. 1826 → BIOG-7: tienda de Maldes, piano en casa de Mariquita → BIOG-8: regreso al estudio ca. 1827–1834, Córdoba 24 mayo 1834 → **BIOG-9: regreso a Tucumán 1833–1834** → **BIOG-10: Heredia, Tucumán 1832–1838** → **BIOG-11: vuelta a Buenos Aires, Fragmento 1837**.
   
   Verificar específicamente:
   - **Solapamiento BIOG-8 / BIOG-9**: BIOG-8 llega hasta 1834 (Córdoba); BIOG-9 comienza en 1833–1834 — el solapamiento es intencional (Alberdi pasa por Tucumán al regresar de Córdoba). El texto de BIOG-9 debe reconocer este contexto sin contradecir a BIOG-8.
   - **Coherencia Heredia / SP2-2**: BIOG-10 describe a Heredia como caudillo federal. La card SP2-2 ("Unitarios contra federales", ya en `#rev-1820-1835`) describe el federalismo en términos generales. Verificar que los matices de BIOG-10 no contradicen lo ya dicho.
   - **No duplicación con SP2-4**: La card SP2-4 ("El ascenso de Rosas y la Generación del 37") en `#rev-1820-1835` menciona el Salón Literario y el *Fragmento preliminar*. BIOG-11 toca el mismo *Fragmento* — pero desde la perspectiva biográfica de Alberdi (su regreso, su motivación), no desde la perspectiva del contexto político (Rosas vs. Generación del 37). Verificar que no hay duplicación de frases o datos idénticos.
   - **No duplicación con alberdi-quote connector (línea ~676)**: Ese conector usa "Una generación que empieza a vivir al mismo tiempo que su patria" (Salón Literario, 1837). El puente narrativo de S03 debe usar una cita diferente.
   - Verificar que la transición desde el puente narrativo de S03 al sub-período `#rev-1800-1820` (que sigue en el HTML) no crea confusión — el lector pasa del arco biográfico de Alberdi (1810–1838) al período histórico "Revolución e Independencia (1800–1820)" que es estructuralmente anterior. Esta es una característica del diseño de M007 (el sub-período biográfico está antes del período histórico en el DOM) — verificar que no confunde al lector.

4. **Documentar resultados** en `S03-CONTENT-DRAFT.md` como `## Apéndice T03 — Verificación`:
   Tabla con check / resultado / valor para todos los checks de capa 1 y 2. Párrafo de capa 3 con observaciones de coherencia narrativa. Si se aplicaron correcciones en el HTML, documentarlas. Marcar S03 como completado si todas las capas pasan.

## Must-Haves

- [ ] Los 7 checks de capa 1 pasan (incluyendo el script node que sale con código 0).
- [ ] Los checks de capa 2 pasan en browser (`[Reveal] N ≥ 64`, sub-nav con "1810–1838", cards hacen reveal).
- [ ] La lectura de capa 3 confirma coherencia de BIOG-1→BIOG-11 sin contradicciones ni duplicaciones.
- [ ] Apéndice T03 documentado en `S03-CONTENT-DRAFT.md`.
- [ ] `styles.css` y `app.js` sin modificar (confirmado en capa 1 check 6).

## Verification

- `node -e "const h=require('fs').readFileSync('index.html','utf8'); const n=(h.match(/data-certeza/g)||[]).length; if(n<45) process.exit(1); console.log('OK: '+n)"` — sale con código 0.
- `grep -c "Apéndice T03" .gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md` devuelve ≥ 1.

## Observability Impact

- Signals added/changed: el check `[Reveal] Initialized with N elements` en la consola del browser es la señal primaria que confirma el registro correcto de nuevos elementos reveal. El baseline post-S03 debe quedar documentado en el Apéndice T03 para que S04 lo use como nuevo baseline.
- How a future agent inspects this: `grep -c 'data-certeza' index.html` (card count); `grep -n 'BIOG-[0-9]' index.html | tail -5` (últimas cards biográficas en secuencia); `document.querySelectorAll('.reveal').length` en DevTools (reveal count).
- Failure state exposed: si `[Reveal] N` no aumenta en ≥3 respecto a 61, las cards nuevas tienen clases reveal incorrectas. Si `data-certeza` count no aumenta en ≥3, el Node.js splice falló silenciosamente — diagnosticar con `grep -n 'BIOG-9' index.html`.

## Inputs

- `index.html` — post-T02: con BIOG-9, BIOG-10, BIOG-11 integradas y sub-período actualizado.
- `.gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md` — post-T01: borrador con fuentes, certeza y texto final.
- Baselines post-S02 (de S02-SUMMARY.md):
  - `grep -c 'data-certeza' index.html` = 42
  - `grep -c 'card-nota-certeza' index.html` = 10
  - `document.querySelectorAll('.reveal').length` = 61
  - `[Reveal] Initialized with 61 elements`
  - `[SubNav] Initialized with 5 sub-periods, 5 links`

## Expected Output

- `index.html` — verificado y correcto; todos los checks pasan.
- `.gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md` — ampliado con Apéndice T03 incluyendo: tabla de checks, observaciones narrativas, baselines post-S03 (data-certeza count, reveal count, card-nota-certeza count) para que S04 los use como punto de partida.
