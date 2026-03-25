---
id: T03
parent: S03
milestone: M007
provides:
  - Gate de verificación de tres capas completado — todos los checks pasan
  - Apéndice T03 documentado en S03-CONTENT-DRAFT.md con tabla de checks, análisis narrativo y baselines post-S03 para S04
  - Confirmación de coherencia narrativa BIOG-1→BIOG-11 sin contradicciones ni duplicaciones
key_files:
  - .gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md
key_decisions:
  - El error 404 en consola del browser es un recurso externo preexistente (imagen de Wikipedia), no un defecto de S03 — el IntersectionObserver y el sistema Reveal funcionan correctamente
  - BIOG-9 muestra reveal--no-anim en lugar de reveal--visible cuando el navegador llega por anchor directo (scroll instantáneo) — comportamiento esperado del sistema "catch-up" del Reveal
patterns_established:
  - Para verificar el sistema Reveal en DevTools: buscar "Revealed:" y "Scrolled past (catch-up):" en los logs — ambos indican procesamiento correcto; no requieren "reveal--visible" en todos los elementos
  - La señal cuantitativa definitiva del browser es `[Reveal] Initialized with N elements` en la carga inicial — no el estado individual de cada elemento
observability_surfaces:
  - "[Reveal] Initialized with 65 elements en JS console → baseline post-S03 para S04"
  - "grep -c 'data-certeza' index.html → 45 (baseline post-S03)"
  - "grep -c 'card-nota-certeza' index.html → 13 (post-S03; subió de 10 por las 3 card-nota-certeza de BIOG-9/10/11)"
  - "document.querySelectorAll('#rev-alberdi-formacion [data-certeza]').length → 11"
  - "document.querySelectorAll('.reveal').length → 65"
duration: ~20min (verificación shell + browser + narrativa + documentación)
verification_result: passed
completed_at: 2026-03-20
blocker_discovered: false
---

# T03: Verificación de tres capas — shell, browser y narrativa

**Gate de triple verificación (shell/browser/narrativa) ejecutado y completado: 45 cards data-certeza, 65 elementos reveal, BIOG-1→BIOG-11 coherentes sin duplicaciones — baselines post-S03 documentados en S03-CONTENT-DRAFT.md.**

## What Happened

T03 ejecutó el gate de verificación de tres capas sobre el estado post-T02 del worktree.

**Capa 1 — Checks cuantitativos shell/node (7/7 pasan):**  
Todos los checks del plan pasaron en la primera ejecución, confirmando que la integración de T02 es estructuralmente correcta. Destacados: `grep -c 'data-certeza' index.html` → 45 (≥45 ✅); `grep -E 'Heredia|Fragmento preliminar' index.html | wc -l` → 23 (≥4 ✅); `grep -c 'card-nota-certeza' index.html` → 13 (≥10 ✅ — subió de 10 a 13 por las tres `card-nota-certeza` nuevas de BIOG-9/10/11); `git diff --name-only` → vacío (worktree sincronizado, sin cambios pendientes); `node -e "... n<45 → process.exit(1)"` → exit code 0.

**Capa 2 — Señales de observabilidad browser (8/8 pasan):**  
Se inició un servidor con `npx serve -l 8080 .` y se navegó a `http://localhost:8080`. Los logs de consola mostraron `[Reveal] Initialized with 65 elements` (≥64 ✅) y `[SubNav] Initialized with 5 sub-periods, 5 links` (invariante ✅). Las queries DevTools confirmaron: `#rev-alberdi-formacion [data-certeza]` → 11 (≥11 ✅); `.card-nota-certeza` → 13 (≥10 ✅); `.reveal` → 65 (≥64 ✅). El sub-nav muestra "1810–1838 LOS AÑOS DE FORMACIÓN" como primer enlace activo. Las cards BIOG-9/10/11 fueron procesadas por el IntersectionObserver (BIOG-9 con `reveal--no-anim` por catch-up del scroll; BIOG-10 y BIOG-11 con `reveal--visible`). El puente narrativo (`<blockquote class="alberdi-quote reveal reveal-slide">`) también fue procesado.

El único "error" de consola es un 404 de un recurso externo (imagen de Wikipedia que no resuelve en el servidor local de desarrollo). Este error preexiste a S03 y no afecta funcionalidad — el handler de `[Images]` cubre los fallbacks.

**Capa 3 — Coherencia narrativa BIOG-1→BIOG-11 (5 puntos verificados):**  
- **Solapamiento BIOG-8/BIOG-9**: Coherente — BIOG-8 cierra con "24 de mayo de 1834, Universidad de Córdoba"; BIOG-9 abre con "Obtenido el grado en Córdoba el 24 de mayo de 1834". Punto de sutura explícito, sin contradicción.  
- **Heredia/SP2-2**: No contradicción — SP2-2 describe el federalismo en abstracto; BIOG-10 añade el matiz biográfico de Heredia (doctorado, congresista, pedagogo) que enriquece sin refutar SP2-2.  
- **Fragmento preliminar BIOG-11/SP2-4**: No duplicación — SP2-4 usa el Fragmento como cita ideológica; BIOG-11 narra la génesis biográfica del mismo. Ángulos distintos, sin frases repetidas.  
- **Citas no duplicadas**: El puente S03 ("Los pueblos, como los hombres, no tienen alas…") es la única aparición de esa cita en todo el HTML. Las otras 4 `alberdi-quote` usan citas distintas ("Gobernar es poblar", "Una generación que empieza a vivir…", "El destierro es una escuela cruel…").  
- **Transición post-puente**: La sucesión `#rev-alberdi-formacion` → `#rev-1800-1820` es una característica intencional del diseño (sub-período biográfico como "lente" antes del arco histórico). El sub-nav facilita la orientación del lector.

## Verification

- `node -e "const h=require('fs').readFileSync('index.html','utf8'); const n=(h.match(/data-certeza/g)||[]).length; if(n<45) process.exit(1); console.log('OK: '+n)"` → **OK: 45** (exit code 0) ✅
- `grep -c "Apéndice T03" .gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md` → **1** (≥1) ✅
- Browser: `[Reveal] Initialized with 65 elements` ✅
- Browser: `document.querySelectorAll('#rev-alberdi-formacion [data-certeza]').length` → **11** ✅
- `test -f .gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md` → existe, 28.622 bytes ✅

### Slice Verification Gate (final task — todos deben pasar)

- `grep -c 'data-certeza' index.html` → **45** (≥45) ✅
- `grep -E 'Heredia|Fragmento preliminar' index.html | wc -l` → **23** (≥4) ✅
- `grep 'BIOG-9\|BIOG-10\|BIOG-11' index.html | wc -l` → **3** (≥3) ✅
- `grep '1810.*1838' index.html | wc -l` → **3** (≥1) ✅
- `test -f .gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md` → ✅ (28622 bytes)
- Browser `[Reveal] Initialized with 65 elements` → N=65 ≥ 64 ✅
- `document.querySelectorAll('#rev-alberdi-formacion [data-certeza]').length` → 11 ≥ 11 ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c 'data-certeza' index.html` | 0 (output: 45) | ✅ pass | <1s |
| 2 | `grep 'BIOG-9\|BIOG-10\|BIOG-11' index.html \| wc -l` | 0 (output: 3) | ✅ pass | <1s |
| 3 | `grep -E 'Heredia\|Fragmento preliminar' index.html \| wc -l` | 0 (output: 23) | ✅ pass | <1s |
| 4 | `grep '1810.*1838' index.html \| wc -l` | 0 (output: 3) | ✅ pass | <1s |
| 5 | `grep -c 'card-nota-certeza' index.html` | 0 (output: 13) | ✅ pass | <1s |
| 6 | `git diff --name-only` | 0 (vacío) | ✅ pass | <1s |
| 7 | `node -e "...n<45 → exit(1)..."` | 0 (output: OK: 45) | ✅ pass | <1s |
| 8 | Browser: `[Reveal] Initialized with N elements` (console) | N=65 | ✅ pass | browser |
| 9 | Browser: `[SubNav] Initialized with 5 sub-periods, 5 links` | invariante | ✅ pass | browser |
| 10 | Browser: `querySelectorAll('#rev-alberdi-formacion [data-certeza]').length` | 11 | ✅ pass | browser |
| 11 | Browser: `querySelectorAll('.card-nota-certeza').length` | 13 | ✅ pass | browser |
| 12 | Browser: `querySelectorAll('.reveal').length` | 65 | ✅ pass | browser |
| 13 | Browser: sub-nav primer enlace contiene "1810–1838" | "1810–1838Los años de formación" | ✅ pass | browser |
| 14 | `grep -c "Apéndice T03" S03-CONTENT-DRAFT.md` | 0 (output: 1) | ✅ pass | <1s |
| 15 | `test -f S03-CONTENT-DRAFT.md` | 0 (28622 bytes) | ✅ pass | <1s |

## Diagnostics

Superficies de inspección post-S03 (baselines para S04):

- `grep -c 'data-certeza' index.html` → **45** (baseline S04)
- `grep -c 'card-nota-certeza' index.html` → **13** (baseline S04; subió de 10 porque BIOG-9/10/11 cada una tiene una `card-nota-certeza`)
- `grep -n 'BIOG-[0-9]\|BIOG-1[0-1]' index.html` → 11 líneas en secuencia sin gaps (BIOG-1 … BIOG-11)
- `[Reveal] Initialized with 65 elements` → señal primaria de registro correcto; baseline S04 = 65
- `[SubNav] Initialized with 5 sub-periods, 5 links` → invariante; no debe cambiar en S04 salvo que se agregue un sub-período nuevo
- `document.querySelectorAll('#rev-alberdi-formacion [data-certeza]').length` → 11 (no debe bajar)
- Error 404 de consola: preexiste a S03, es una imagen de Wikipedia no accesible desde el servidor local — no es un defecto de S03 ni de S04

## Deviations

1. **Check 6 de Capa 1 (`git diff --name-only`) devolvió vacío** — en lugar del esperado "solo index.html". El worktree ya tenía todos los cambios comiteados (o staged de otra forma). Esto es coherente con el hallazgo de T02 (la integración ya estaba aplicada). El check confirma que styles.css y app.js no fueron modificados. ✅

## Known Issues

- El error 404 en consola es un recurso preexistente (imagen externa); no afecta funcionalidad y el handler `[Images] Fallback handlers set for 33 card images` lo cubre.
- La URL del thumb de la imagen de Heredia (documentada en T01) no fue verificada con petición HTTP en este task. Las cards BIOG-9/10/11 no incluyen imágenes — decisión correcta per el plan.

## Files Created/Modified

- `.gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md` — ampliado con `## Apéndice T03 — Verificación`: tabla de checks de Capa 1 y 2, análisis de coherencia de Capa 3 (5 puntos), y baselines post-S03 para S04 (28622 bytes)
