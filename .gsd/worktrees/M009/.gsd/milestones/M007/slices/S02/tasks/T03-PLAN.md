---
estimated_steps: 4
estimated_files: 2
---

# T03: Verificación diagnóstica y coherencia narrativa S01→S02

**Slice:** S02 — De Tucumán a Buenos Aires — primeros pasos (1824–1833)
**Milestone:** M007
 
## Description

Gate de salida de S02. Esta tarea ejecuta todos los checks cuantitativos del slice, verifica la coherencia cronológica en el browser entre S01 y S02, y documenta el estado epistémico para S03. El trabajo principal es de inspección y corrección — no de creación. Si T02 cometió un error (stagger mal, atributo omitido, fecha incorrepta), se detecta y corrige aquí. Si la narrativa fluye, se documenta y el slice cierra.

La verificación tiene dos planos:
1. **Cuantitativo (shell/node):** `data-certeza` count, presencia de BIOG-5..8, no cambios en CSS/JS.
2. **Cualitativo (browser + lectura):** las cards revelan al scroll, la consola JS muestra los contadores correctos, la narrativa cronológica BIOG-4 → BIOG-8 no tiene contradicciones.

## Steps

1. **Ejecutar todos los checks de Verification del slice (V1–V6):**
   ```bash
   # V1 — data-certeza ≥42
   node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.match(/data-certeza/g); const n=m?m.length:0; console.log('data-certeza count:', n); process.exit(n>=42?0:1);"

   # V2 — palabras clave presentes
   grep -E 'Ciencias Morales|copista|jurisprudencia|internado' index.html | grep -v '^\s*<!--' | wc -l
   # esperado: ≥2

   # V3 — 4 comentarios BIOG-5..8 presentes
   grep -c 'BIOG-[5678]' index.html

   # V4 — sub-período biográfico delimitado correctamente
   grep -n 'rev-alberdi-formacion' index.html

   # V5 — flags epistémicos
   grep -c 'card-nota-certeza' index.html
   # debe ser ≥4 (≥3 de S01 + ≥1 nuevo)

   # V6 — sin cambios en CSS/JS
   git diff --stat HEAD -- styles.css app.js
   ```
   Si algún check falla: diagnosticar con `grep -n 'BIOG-[5678]' index.html` para localizar la card afectada; corregir el error mínimo necesario.

2. **Verificar en browser (Live Server u otro servidor local):** Abrir el sitio, navegar a la sección 1800–1860, scrollear por `#rev-alberdi-formacion`. Verificar que: (a) las 4 nuevas cards aparecen después de BIOG-4, (b) hacen reveal con animación slide al entrar en viewport, (c) el stagger visual es perceptible (no todas aparecen simultáneamente). Abrir DevTools → Console y confirmar: `[Reveal] Initialized with N elements` debe ser ≥61; `[SubNav] Initialized with 5 sub-periods, 5 links` debe ser exactamente 5.

3. **Leer la secuencia S01→S02 en el browser:** Leer BIOG-1 a BIOG-8 en orden. Verificar que la narrativa cronológica fluye sin contradicciones: BIOG-4 termina narrando que Felipe gestionó la beca que "en 1824 llevaría al joven tucumano a Buenos Aires" → BIOG-5 debe abrir con ese viaje → BIOG-6 continúa con el internado → BIOG-7 los empleos → BIOG-8 el regreso al estudio. Corregir cualquier fecha, nombre o secuencia incorrecta.

4. **Añadir Apéndice T03 al `S02-CONTENT-DRAFT.md`:** Tabla de auditoría epistémica con el mismo patrón de S01: `[Card | Línea HTML aprox. | Flag activo | Qué lo resolvería]`. Listar todos los `card-nota-certeza` nuevos de S02 con su número de línea en index.html y qué fuente primaria resolvería la incertidumbre. Actualizar el baseline de observabilidad: `grep -c 'data-certeza' index.html` (nuevo valor), `grep -c 'card-nota-certeza' index.html` (nuevo valor), `[Reveal] Initialized with N elements` (nuevo N).

## Must-Haves

- [ ] Todos los checks V1–V6 pasan sin error.
- [ ] Browser confirma reveal-slide funcional en las 4 nuevas cards.
- [ ] Console JS: `[Reveal] Initialized with N elements` con N ≥61.
- [ ] Console JS: `[SubNav] Initialized with 5 sub-periods, 5 links` — sigue siendo 5 (S02 no añade link).
- [ ] Coherencia cronológica S01→S02 confirmada: ninguna contradicción en fechas o nombres.
- [ ] Apéndice T03 añadido al S02-CONTENT-DRAFT con tabla de auditoría.
- [ ] Baseline de observabilidad documentado con valores post-S02.

## Verification

- `grep -c 'data-certeza' index.html` ≥42
- `grep -c 'BIOG-[5678]' index.html` ≥4
- `grep -E 'Ciencias Morales|copista|jurisprudencia' index.html | grep -v '^\s*<!--' | wc -l` ≥2
- `grep -c 'card-nota-certeza' index.html` ≥4
- `git diff --stat HEAD -- styles.css app.js` devuelve vacío (0 cambios)

## Inputs

- `index.html` — estado post-T02 con las 4 cards integradas.
- `.gsd/milestones/M007/slices/S02/S02-CONTENT-DRAFT.md` — borrador con los flags `[INCIERTO]` y `[VERIFICACIÓN PENDIENTE]` que deben aparecer como `card-nota-certeza` en el HTML.
- `.gsd/milestones/M007/slices/S01/S01-SUMMARY.md` — sección "Authoritative diagnostics" con los comandos de inspección establecidos en S01; sección "Forward Intelligence" con el baseline 38 y el patrón de apéndice de auditoría.
- `.gsd/KNOWLEDGE.md` — "Browser Console JS Logs as First-Class Observability Signals": `[SubNav] Initialized with N sub-periods` y `[Reveal] Initialized with N elements` son señales de primera clase.

## Expected Output

- `index.html` — estado final verificado, sin regresiones, con las 4 cards S02 integradas y funcionales.
- `.gsd/milestones/M007/slices/S02/S02-CONTENT-DRAFT.md` — actualizado con Apéndice T03: tabla de auditoría epistémica de S02 y baseline de observabilidad post-S02.
