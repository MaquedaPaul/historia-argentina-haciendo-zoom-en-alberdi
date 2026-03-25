# S01: Accordion de Sub-períodos — CSS + JS

**Goal:** Implementar el sistema de acordeón para todos los `.sub-period` dentro de `#periodo-revolucion`. El primer sub-período empieza expandido; los demás colapsados. El reveal-on-scroll re-dispara correctamente al expandir.

**Demo:** Abrir `index.html` en el browser → `#periodo-revolucion` muestra 7 sub-períodos. El primero (`rev-alberdi-formacion`) está expandido con chevron rotado. Los 6 restantes muestran solo su header h3 con chevron apuntando derecha. Click en cualquier header colapsa/expande con transición suave. Enter/Space funcionan igual. Al expandir, los cards con `.reveal` animan entrada.

## Must-Haves

- Cada `.sub-period` dentro de `#periodo-revolucion` es un accordion colapsable con `div.sub-period__body` wrapper
- Primer sub-período expandido (`aria-expanded="true"`), resto colapsados (`aria-expanded="false"` + clase CSS)
- Transición suave: `max-height` 0.45s cubic-bezier + `opacity` 0.35s
- Chevron `▶` vía CSS `::after` que rota 90° cuando expandido
- Toggle via click, Enter, y Space (keyboard navigation)
- `aria-expanded`, `aria-controls`, `role="button"`, `tabindex="0"` en cada trigger
- Al expandir: re-dispara `.reveal--visible` en elementos en-viewport post-transición
- `initAccordions()` llamado ANTES de `revealOnScroll()` en el pipeline de init
- `prefers-reduced-motion` desactiva transitions CSS

## Proof Level

- This slice proves: operational (implementation is complete and all static checks pass)
- Real runtime required: no (implementation verified via grep/node script; browser UAT is S02)
- Human/UAT required: no (S02 covers browser verification)

## Verification

```bash
# CSS: todas las clases del accordion presentes
grep -q 'sub-period__body--collapsed' styles.css && echo "PASS: collapsed class" || echo "FAIL: collapsed class"
grep -q 'sub-period__title--trigger' styles.css && echo "PASS: trigger class" || echo "FAIL: trigger class"
grep -q 'prefers-reduced-motion' styles.css && echo "PASS: reduced-motion" || echo "FAIL: reduced-motion"
grep -q '1000rem' styles.css && echo "PASS: max-height cap" || echo "FAIL: max-height cap"
grep -q '\[aria-expanded="true"\]' styles.css && echo "PASS: chevron rotation" || echo "FAIL: chevron rotation"

# JS: todos los must-haves implementados
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

# Failure-path: init order check (initAccordions MUST precede revealOnScroll)
node -e "const js=require('fs').readFileSync('app.js','utf8'); console.log(js.indexOf('initAccordions()') < js.indexOf('revealOnScroll()') ? 'PASS: correct init order' : 'FAIL: wrong init order')"

# Failure-path: sub-period__body CSS rules count (should be ≥4)
echo "CSS rule count for sub-period__body: $(grep -c 'sub-period__body' styles.css) (expected ≥4)"
```

**Failure-path diagnostics (DevTools Console after browser open):**
- `document.querySelectorAll('.sub-period__body--collapsed').length` → **6** on initial load (any other value = init failure)
- `document.querySelectorAll('.sub-period__title--trigger[aria-expanded="true"]').length` → **1** on initial load
- `document.querySelectorAll('[role="button"]').length` among sub-period titles → **7** (all triggers accessible)
- `document.querySelectorAll('.sub-period__body--collapsed .reveal--no-anim').length` → **0** (any value >0 means `initAccordions()` ran AFTER `revealOnScroll()` — wrong init order)

## Observability / Diagnostics

- Runtime signals: `[Accordion]` console.debug on init ("Initialized with N sub-periods"), on each collapse/expand, and on post-expand reveal force. `[Accordion] [Reveal]` for forced reveals. `console.warn` if no sub-periods found.
- Inspection surfaces:
  - `document.querySelectorAll('.sub-period__body--collapsed').length` → count collapsed
  - `document.querySelectorAll('.sub-period__title--trigger[aria-expanded]')` → all triggers
  - `document.querySelectorAll('.sub-period__body:not(.sub-period__body--collapsed) .reveal:not(.reveal--visible):not(.reveal--no-anim)')` → unrevealed elements in expanded bodies (should be 0 after expand settles)
- Failure visibility: If CSS block missing → all sub-periods expand on load (no animation). If init order wrong → `reveal--no-anim` on collapsed elements (detected via DevTools query above). If `initAccordions()` silently fails → no `role="button"` on `.sub-period__title` elements.
- Redaction constraints: none (no user data)

## Integration Closure

- Upstream surfaces consumed: `styles.css` (design tokens `--color-celeste`, `--space-xl`; existing `.sub-period__title` flex layout), `app.js` IIFE (existing init pipeline, `revealOnScroll()`, `initExpandCollapse()`, `initSubNav()`)
- New wiring introduced: `initAccordions()` call at line 160 in init pipeline; `div.sub-period__body` DOM wrapper created at runtime; event delegation on `#periodo-revolucion`
- What remains before the milestone is truly usable end-to-end: S02 browser UAT (desktop + mobile) and regression check (audio, sub-nav, reveal)

## Tasks

- [x] **T01: Agregar CSS del accordion a styles.css** `est:10m`
  - Why: Define la apariencia y transición del accordion body, trigger, chevron y estado `reduced-motion`. El JS del accordion (T02) necesita estas clases para tener efecto visual.
  - Files: `styles.css`
  - Do: Insertar 6 reglas CSS después del bloque responsive de `.sub-period` (antes de la sección Sub-nav). Reglas: `.sub-period__body` (overflow, max-height: 1000rem, opacity, transition), `.sub-period__body--collapsed` (max-height: 0, opacity: 0), `.sub-period__title--trigger` (cursor, user-select, padding-right), `::after` (chevron ▶, margin-left: auto, transition), `[aria-expanded="true"]::after` (rotate 90deg), `@media prefers-reduced-motion` (transition: none).
  - Verify: `grep -q 'sub-period__body--collapsed' styles.css && grep -q '1000rem' styles.css && grep -q 'prefers-reduced-motion' styles.css && echo PASS`
  - Done when: Todos los 5 grep checks de T01 pasan.

- [x] **T02: Implementar `initAccordions()` en app.js** `est:20m`
  - Why: Crea el wrapper DOM `div.sub-period__body` dinámicamente, colapsa los sub-períodos 2-7, añade ARIA attributes, maneja toggle click+keyboard, y re-dispara reveal-on-scroll post-expand. Debe correr ANTES de `revealOnScroll()`.
  - Files: `app.js`
  - Do: Insertar `function initAccordions()` (con JSDoc + `[Accordion]` logging) entre `initExpandCollapse()` e `initAmbientSound()`. Agregar llamada `initAccordions()` antes de `revealOnScroll()` en el pipeline. La función: itera los 7 `.sub-period`, crea `.sub-period__body`, mueve hijos al wrapper, añade `role="button"`, `tabindex="0"`, `aria-expanded`, `aria-controls` al h3 trigger, colapsa índices 1-6. Event delegation en `#periodo-revolucion` para click y keydown (Enter/Space). `transitionend` re-trigger: `triggerRevealInBody()` fuerza `.reveal--visible` en elementos en-viewport post-transición.
  - Verify: `node -e "const js=require('fs').readFileSync('app.js','utf8'); process.exit(js.includes('function initAccordions()') && js.indexOf('initAccordions()') < js.indexOf('revealOnScroll()') ? 0 : 1)" && echo PASS`
  - Done when: Los 10 node checks de T02 pasan (10/10).

- [x] **T03: Integración final — verificar todos los checks y hacer commit** `est:15m`
  - Why: Confirma que T01+T02 juntos cumplen todos los must-haves del slice y la S01-PLAN.md está actualizada para reflejar el plan final. Cierra la implementación con un commit limpio.
  - Files: `styles.css`, `app.js`, `.gsd/milestones/M012/slices/S01/S01-PLAN.md`, `.gsd/milestones/M012/slices/S01/tasks/T01-PLAN.md`
  - Do: (1) Correr todos los checks de verificación del slice (CSS grep × 5 + node script × 10). (2) Correr el init-order check. (3) Si algún check falla, corregirlo antes de continuar. (4) Confirmar que `T01-PLAN.md` tiene sección `## Observability Impact`. (5) Commit: `git add styles.css app.js .gsd/milestones/M012/slices/S01/ && git commit -m "feat(M012-S01): implement sub-period accordion CSS + JS"`.
  - Verify: `node -e "const js=require('fs').readFileSync('app.js','utf8'); const checks=[js.includes('function initAccordions()'), js.indexOf('initAccordions()') < js.indexOf('revealOnScroll()'), js.includes('triggerRevealInBody')]; process.exit(checks.every(Boolean) ? 0 : 1)" && grep -q '1000rem' styles.css && echo "ALL PASS"`
  - Done when: Todos los checks pasan (0 failures), commit hecho, T03 marcado `[x]` en este archivo.

## Files Likely Touched

- `styles.css` — 52 líneas de CSS accordion añadidas (T01, ya completo)
- `app.js` — `initAccordions()` (~118 líneas) + llamada en pipeline (T02, ya completo)
- `.gsd/milestones/M012/slices/S01/S01-PLAN.md` — este archivo (T03 lo cierra)
- `.gsd/milestones/M012/slices/S01/tasks/T01-PLAN.md` — Observability Impact añadida (T03 confirma)
