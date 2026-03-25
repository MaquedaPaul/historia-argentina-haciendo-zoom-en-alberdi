---
estimated_steps: 7
estimated_files: 1
---

# T02: Implementar `initAccordions()` en app.js y conectarlo al pipeline de init

**Slice:** S01 — Accordion de Sub-períodos — CSS + JS
**Milestone:** M012

## Description

Implementar la función `initAccordions()` dentro del IIFE existente en `app.js` y registrarla en el pipeline de inicialización ANTES de `revealOnScroll()`. Esta función:

1. **Crea dinámicamente** un `div.sub-period__body` wrapper para el contenido de cada sub-período (todos los hijos del `.sub-period` excepto el primer `h3`), de modo que el CSS de accordion (T01) tenga un target concreto para la transición.
2. **Inicializa el estado:** primer sub-período expandido, resto colapsados con `.sub-period__body--collapsed`.
3. **Hace accesible el trigger h3:** añade `role="button"`, `tabindex="0"`, `aria-expanded`, `aria-controls`.
4. **Maneja toggle** via event delegation en `#periodo-revolucion` (click + Enter/Space).
5. **Re-dispara reveal-on-scroll** después de la transición de expand: usa `transitionend` para forzar `.reveal--visible` en elementos que están en el viewport pero no han sido revelados aún.

**Por qué `initAccordions()` ANTES de `revealOnScroll()`:** `revealOnScroll()` pre-marca como `reveal--no-anim` los elementos que detecta como "ya visibles" al cargar. Si los sub-períodos no están colapsados todavía cuando `revealOnScroll()` corre, sus elementos serán pre-marcados como visibles y nunca animarán al revelar. Ejecutando `initAccordions()` primero, los sub-períodos colapsados tienen `max-height:0` + `overflow:hidden` cuando el IntersectionObserver los observa → sus elementos se detectan como fuera del viewport → no se pre-marcan → animarán correctamente al expandir.

**Estructura actual de cada `.sub-period` en index.html:**
- `#rev-alberdi-formacion`: h3 + div.events-grid + h4 + div.events-grid + blockquote.alberdi-quote
- `#rev-alberdi-quiroga`: h3 + 4×div.events-grid (con h4 subtitles dentro de cada grid o entre grids)
- `#rev-1800-1820`, `#rev-1820-1835`, `#periodo-rosas`, `#rev-1835-1852`, `#rev-1852-1860`: h3 + div.events-grid (1 sola grid)

El body wrapper envuelve TODOS los hijos después del h3 — esta lógica funciona para todos los casos anteriores.

## Steps

1. **Localizar el punto de inserción de la función** en `app.js`: buscar `function initAmbientSound()` (línea ~414). La nueva función `initAccordions()` va ANTES de ella (al igual que `initExpandCollapse()` y `initSubNav()` están antes de `initAmbientSound()`). Añadirla con la misma estructura JSDoc que el resto de funciones del módulo.

2. **Escribir la función `initAccordions()`**:

```javascript
  /**
   * Accordion system for .sub-period elements inside #periodo-revolucion.
   * Wraps collapsible content in .sub-period__body, sets initial state
   * (first expanded, rest collapsed), and handles toggle + keyboard.
   *
   * IMPORTANT: Must be called BEFORE revealOnScroll() so that collapsed
   * sub-periods have max-height:0 when the reveal observer initializes —
   * preventing pre-marking of hidden elements as reveal--no-anim.
   *
   * Observability:
   *   - Logs '[Accordion] Initialized with N sub-periods.' on startup.
   *   - Logs '[Accordion] Collapsed/Expanded: <id>' on each toggle.
   *   - Logs '[Accordion] No .sub-period elements found' if DOM is unexpected.
   *   - `document.querySelectorAll('.sub-period__body--collapsed').length` → count collapsed.
   *   - `document.querySelectorAll('.sub-period__title--trigger[aria-expanded]')` → all triggers.
   */
  function initAccordions() {
    var ACCORDION_PREFIX = '[Accordion]';
    var subPeriods = document.querySelectorAll('#periodo-revolucion .sub-period');

    if (subPeriods.length === 0) {
      console.warn(ACCORDION_PREFIX, 'No .sub-period elements found in #periodo-revolucion — accordion idle.');
      return;
    }

    console.debug(ACCORDION_PREFIX, 'Initialized with', subPeriods.length, 'sub-periods.');

    subPeriods.forEach(function (sp, index) {
      var trigger = sp.querySelector('.sub-period__title');
      if (!trigger) {
        console.warn(ACCORDION_PREFIX, 'No .sub-period__title found in', sp.id, '— skipping.');
        return;
      }

      // ---- Create collapsible body wrapper ----
      var body = document.createElement('div');
      body.className = 'sub-period__body';
      var bodyId = 'accordion-body-' + (sp.id || index);
      body.id = bodyId;

      // Move all children after the h3 trigger into the body wrapper
      var children = Array.from(sp.children);
      var triggerIndex = children.indexOf(trigger);
      children.slice(triggerIndex + 1).forEach(function (child) {
        body.appendChild(child);
      });
      sp.appendChild(body);

      // ---- Make trigger accessible ----
      trigger.setAttribute('role', 'button');
      trigger.setAttribute('tabindex', '0');
      trigger.setAttribute('aria-controls', bodyId);
      trigger.classList.add('sub-period__title--trigger');

      // ---- Initial state: first expanded, rest collapsed ----
      if (index === 0) {
        trigger.setAttribute('aria-expanded', 'true');
        console.debug(ACCORDION_PREFIX, 'Initially expanded:', sp.id);
      } else {
        trigger.setAttribute('aria-expanded', 'false');
        body.classList.add('sub-period__body--collapsed');
        console.debug(ACCORDION_PREFIX, 'Initially collapsed:', sp.id);
      }
    });

    // ---- Event delegation ----
    var section = document.getElementById('periodo-revolucion');
    if (!section) return;

    section.addEventListener('click', handleAccordionToggle);
    section.addEventListener('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ' ') &&
          e.target.classList.contains('sub-period__title--trigger')) {
        e.preventDefault();
        handleAccordionToggle(e);
      }
    });

    function handleAccordionToggle(e) {
      var trigger = e.target.closest('.sub-period__title--trigger');
      if (!trigger) return;

      var sp = trigger.parentElement;
      var body = sp ? sp.querySelector('.sub-period__body') : null;
      if (!body) return;

      var isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      if (isExpanded) {
        // Collapse
        trigger.setAttribute('aria-expanded', 'false');
        body.classList.add('sub-period__body--collapsed');
        console.debug(ACCORDION_PREFIX, 'Collapsed:', sp.id);
      } else {
        // Expand
        body.classList.remove('sub-period__body--collapsed');
        trigger.setAttribute('aria-expanded', 'true');
        console.debug(ACCORDION_PREFIX, 'Expanded:', sp.id);

        // Re-trigger reveal for elements that entered the viewport after expand
        body.addEventListener('transitionend', function onExpanded(ev) {
          if (ev.propertyName !== 'max-height') return;
          body.removeEventListener('transitionend', onExpanded);
          triggerRevealInBody(body, sp.id);
        }, { once: true });
      }
    }

    function triggerRevealInBody(body, spId) {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var unrevealed = body.querySelectorAll('.reveal:not(.reveal--visible):not(.reveal--no-anim)');
      if (unrevealed.length === 0) {
        console.debug(ACCORDION_PREFIX, 'No unrevealed elements in', spId, '— IntersectionObserver will handle them.');
        return;
      }
      unrevealed.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < vh && rect.bottom > 0) {
          el.classList.add('reveal--visible');
          console.debug(ACCORDION_PREFIX, '[Reveal] Force-revealed after expand in', spId + ':',
            (el.id || el.className).substring(0, 50));
        }
      });
    }
  }
```

3. **Agregar la llamada en el pipeline de init**, ANTES de `revealOnScroll()`. Localizar:
   ```javascript
   // ---------- Reveal-on-scroll ----------
   revealOnScroll();
   ```
   E insertar justo antes:
   ```javascript
   // ---------- Accordion for .sub-period elements ----------
   initAccordions();
   ```

4. **Verificar el orden de init** en el archivo final: el bloque `initAccordions()` debe aparecer en línea menor que `revealOnScroll()`. Usar grep para confirmar.

5. **Verificar que `initExpandCollapse()` no sea afectado**: ese sistema opera sobre `.card-expand-toggle` dentro de las cards individuales — distinto de `.sub-period__title--trigger`. No hay colisión.

6. **Verificar que el sub-nav no sea afectado**: `initSubNav()` observa `.sub-period` elements via `IntersectionObserver` con `rootMargin: '0px 0px -70% 0px'` — no depende del contenido interno de los sub-períodos, solo de su posición. El accordion wrapper no cambia la posición del `.sub-period` div, solo reorganiza sus hijos internos. El sub-nav sigue funcionando.

7. **Ejecutar el script de verificación** del slice para confirmar todos los checks.

## Must-Haves

- [ ] `function initAccordions()` definida dentro del IIFE de `app.js`
- [ ] Llamada a `initAccordions()` antes de `revealOnScroll()` en el pipeline de init
- [ ] Wrapper `div.sub-period__body` creado dinámicamente para cada sub-período
- [ ] Primer sub-período con `aria-expanded="true"`, resto con `aria-expanded="false"` + clase colapsada
- [ ] Toggle via click Y via Enter/Space (keyboard navigation)
- [ ] `transitionend` re-trigger de reveal para elementos en viewport después de expand
- [ ] Logging con prefix `[Accordion]` en debug y warn

## Verification

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
  ['once:true on transitionend', js.includes(\"{ once: true }\")],
];
let pass = 0;
checks.forEach(([l,p]) => { console.log((p?'PASS':'FAIL')+': '+l); if(p) pass++; });
console.log(pass + '/' + checks.length + ' checks passed');
process.exit(pass === checks.length ? 0 : 1);
"
```

## Observability Impact

- **Signals added:** `[Accordion]` console.debug prefix para todos los lifecycle events del accordion (init, collapsed, expanded, reveal force). `[Accordion] [Reveal]` para re-reveals post-expand.
- **How a future agent inspects this:**
  - `document.querySelectorAll('.sub-period__body--collapsed').length` → cuántos sub-períodos están colapsados actualmente
  - `document.querySelectorAll('.sub-period__title--trigger[aria-expanded="true"]')` → triggers expandidos
  - `document.querySelectorAll('.sub-period__body:not(.sub-period__body--collapsed) .reveal:not(.reveal--visible):not(.reveal--no-anim)')` → elementos pendientes de reveal en sub-períodos expandidos (debe ser vacío después de scroll o si el force-reveal funcionó)
- **Failure state exposed:** Si `initAccordions()` fue llamada después de `revealOnScroll()`, los elementos de sub-períodos colapsados habrán recibido `reveal--no-anim` prematuramente — detectable con `document.querySelectorAll('.sub-period__body--collapsed .reveal--no-anim').length > 0`.

## Inputs

- `app.js` — IIFE actual (810 líneas). Funciones análogas: `initExpandCollapse()` (línea 349) para el patrón event delegation + toggle; `revealOnScroll()` (línea 235) para el IntersectionObserver pattern.
- `styles.css` — T01 debe estar completo: `.sub-period__body`, `.sub-period__body--collapsed`, `.sub-period__title--trigger` deben existir para que el JS tenga efecto visual.
- **Conocimiento de la estructura DOM:** 7 sub-períodos con IDs `rev-alberdi-formacion`, `rev-alberdi-quiroga`, `rev-1800-1820`, `rev-1820-1835`, `periodo-rosas`, `rev-1835-1852`, `rev-1852-1860`. `rev-alberdi-formacion` tiene 2 events-grids + 1 h4 + 1 blockquote.alberdi-quote — el body wrapper envuelve TODOS igualmente.

## Expected Output

- `app.js` — nueva función `initAccordions()` (~90 líneas) agregada al IIFE, nueva llamada antes de `revealOnScroll()`. Total de líneas: ~910. La función inicializa los 7 sub-períodos correctamente, con logging verificable en DevTools console.
