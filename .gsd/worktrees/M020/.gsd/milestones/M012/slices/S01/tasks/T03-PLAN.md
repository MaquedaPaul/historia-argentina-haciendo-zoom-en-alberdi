---
estimated_steps: 5
estimated_files: 4
---

# T03: Integración final — verificar todos los checks y hacer commit

**Slice:** S01 — Accordion de Sub-períodos — CSS + JS
**Milestone:** M012

## Description

T01 y T02 implementaron todo el accordion (CSS + JS). Este task cierra el slice confirmando que la implementación conjunta supera todos los checks de S01, que los archivos del plan están en orden, y hace el commit de integración.

No hay código nuevo que escribir en condiciones normales. El foco es: correr los checks, diagnosticar cualquier falla residual, corregirla, y hacer el commit limpio.

**Contexto de lo implementado:**
- `styles.css`: 6 reglas CSS de accordion (`sub-period__body`, `sub-period__body--collapsed`, `sub-period__title--trigger`, `::after` chevron, `[aria-expanded="true"]::after`, `@media prefers-reduced-motion`)
- `app.js`: `initAccordions()` (~118 líneas) insertada en el IIFE, llamada antes de `revealOnScroll()` en el pipeline de init. La función crea `div.sub-period__body` wrappers dinámicamente, colapsa sub-períodos 2-7, añade ARIA attributes, maneja click+keyboard toggle, y re-dispara reveal-on-scroll post-expand via `triggerRevealInBody()`.

## Steps

1. **Correr los checks de CSS** (5 checks). Si alguno falla, corregir en `styles.css`:
   ```bash
   grep -q 'sub-period__body--collapsed' styles.css && echo "PASS: collapsed class" || echo "FAIL"
   grep -q 'sub-period__title--trigger' styles.css && echo "PASS: trigger class" || echo "FAIL"
   grep -q 'prefers-reduced-motion' styles.css && echo "PASS: reduced-motion" || echo "FAIL"
   grep -q '1000rem' styles.css && echo "PASS: max-height cap" || echo "FAIL"
   grep -q '\[aria-expanded="true"\]' styles.css && echo "PASS: chevron rotation" || echo "FAIL"
   ```

2. **Correr el node script de JS** (10 checks). Si alguno falla, corregir en `app.js`:
   ```bash
   node -e "
   const fs = require('fs');
   const js = fs.readFileSync('app.js', 'utf8');
   const checks = [
     ['initAccordions defined', js.includes('function initAccordions()')],
     ['initAccordions called', js.includes('initAccordions()')],
     ['initAccordions before revealOnScroll', js.indexOf('initAccordions()') < js.indexOf('revealOnScroll()')],
     ['sub-period__body wrapper created', js.includes('sub-period__body')],
     ['aria-expanded managed', js.includes('aria-expanded')],
     ['keyboard Enter/Space', js.includes(\"e.key === 'Enter'\") && js.includes(\"e.key === ' '\")],
     ['transitionend re-reveal', js.includes('transitionend') && js.includes('triggerRevealInBody')],
     ['ACCORDION prefix logging', js.includes('[Accordion]')],
     ['warn on missing sub-periods', js.includes('accordion idle')],
     ['once:true on transitionend', js.includes('{ once: true }')],
   ];
   let pass = 0;
   checks.forEach(([l,p]) => { console.log((p?'PASS':'FAIL')+': '+l); if(p) pass++; });
   console.log(pass + '/' + checks.length + ' checks passed');
   process.exit(pass === checks.length ? 0 : 1);
   "
   ```

3. **Verificar que T01-PLAN.md tiene Observability Impact** (pre-flight requerimiento):
   ```bash
   grep -q 'Observability Impact' .gsd/milestones/M012/slices/S01/tasks/T01-PLAN.md && echo "PASS: T01 has Observability Impact" || echo "FAIL: T01-PLAN.md missing Observability Impact"
   ```
   Si falla, agregar la sección (ver contenido en Expected Output abajo).

4. **Marcar T03 como `[x]`** en `S01-PLAN.md` cambiando `- [ ] **T03:` a `- [x] **T03:`.

5. **Hacer el commit de integración**:
   ```bash
   git add styles.css app.js .gsd/milestones/M012/slices/S01/
   git commit -m "feat(M012-S01): implement sub-period accordion CSS + JS"
   ```

## Must-Haves

- [ ] Los 5 checks CSS pasan (grep devuelve 0 en todos)
- [ ] Los 10 checks JS pasan (node script exits 0)
- [ ] `T01-PLAN.md` contiene la sección `## Observability Impact`
- [ ] `S01-PLAN.md` muestra T01 y T02 como `[x]`, T03 como `[x]` (al finalizar este task)
- [ ] Commit hecho con mensaje `feat(M012-S01): implement sub-period accordion CSS + JS`

## Verification

```bash
# Todos los checks CSS y JS en una sola pasada
grep -q 'sub-period__body--collapsed' styles.css && \
grep -q '1000rem' styles.css && \
grep -q 'prefers-reduced-motion' styles.css && \
node -e "const js=require('fs').readFileSync('app.js','utf8'); process.exit(js.includes('function initAccordions()') && js.indexOf('initAccordions()') < js.indexOf('revealOnScroll()') && js.includes('triggerRevealInBody') && js.includes('[Accordion]') ? 0 : 1)" && \
grep -q 'Observability Impact' .gsd/milestones/M012/slices/S01/tasks/T01-PLAN.md && \
echo "ALL S01 CHECKS PASS"
```

## Observability Impact

- **Signals added/changed:** Ninguno — este task verifica pero no añade nueva instrumentación. La instrumentación viene de T01 (CSS failure surface) y T02 (`[Accordion]` console.debug).
- **How a future agent inspects this:** Ver sección `## Observability / Diagnostics` de S01-PLAN.md para las 4 queries de DevTools. El commit de este task es la señal de que la implementación pasó todos los checks estáticos.
- **Failure state exposed:** Si algún check falla, el output del step muestra exactamente qué falla. El `process.exit(1)` del node script permite integración con herramientas CI. Los `console.warn('[Accordion]', ...)` en `initAccordions()` cubrirán los fallos en runtime.

## Inputs

- `styles.css` — T01 completo: contiene las 6 reglas de accordion en la sección de Sub-period (líneas ~2002–2049).
- `app.js` — T02 completo: contiene `initAccordions()` (~líneas 419–537) y su llamada en la línea ~160 del pipeline de init.
- `.gsd/milestones/M012/slices/S01/tasks/T01-PLAN.md` — Ya actualizado con `## Observability Impact` como parte de la corrección de pre-flight en la fase de planificación. Verificar que esté presente.
- `.gsd/milestones/M012/slices/S01/S01-PLAN.md` — Actualizado en la fase de planificación con la nueva estructura T01/T02/T03. T03 debe ser marcado `[x]` al final de este task.

## Expected Output

- `styles.css` — sin cambios (T01 ya lo tiene correcto). Si algún check CSS falla, corregir según el bloque especificado en T01-PLAN.md.
- `app.js` — sin cambios (T02 ya lo tiene correcto). Si algún check JS falla, corregir según el bloque especificado en T02-PLAN.md.
- `.gsd/milestones/M012/slices/S01/tasks/T01-PLAN.md` — con sección `## Observability Impact` (si no estaba, agregarla después del bloque `## Verification`):
  ```markdown
  ## Observability Impact

  - **Signals added/changed:** Las 6 reglas CSS crean la superficie de fallo visual — si el CSS falta o es sobreescrito, los divs `.sub-period__body` (creados por el JS de T02) renderizarán sin `overflow: hidden`, expandiendo todos los sub-períodos sin animación ni chevron.
  - **How a future agent inspects this:** `grep -n 'sub-period__body\|sub-period__title--trigger' styles.css` — todas las reglas nuevas deben aparecer en líneas ≥2002. `grep -c 'sub-period__body' styles.css` debe retornar 4 (body rule, collapsed rule, dos reglas de reduced-motion).
  - **Failure state exposed:** CSS faltante → todos los sub-períodos expandidos sin animación. `max-height` insuficiente → `#periodo-rosas` (~35 cards ≈ 875rem) recortado. `overflow: hidden` faltante → body colapsado sigue visible (layout leak). `prefers-reduced-motion` faltante → usuarios con esa preferencia ven animaciones.
  ```
- `.gsd/milestones/M012/slices/S01/S01-PLAN.md` — T03 marcado `[x]`.
- Git: commit con `feat(M012-S01): implement sub-period accordion CSS + JS`.
