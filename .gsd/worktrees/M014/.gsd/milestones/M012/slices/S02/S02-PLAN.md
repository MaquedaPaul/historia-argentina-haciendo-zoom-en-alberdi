# S02: Verificación y Pulido

**Goal:** Confirmar en browser que el accordion de sub-períodos funciona sin regresiones — desktop y mobile — y corregir cualquier problema encontrado.
**Demo:** Abrir el sitio en localhost, expandir y colapsar cada uno de los 7 sub-períodos, navegar con teclado, verificar sub-nav sticky y audio ambiental, confirmar que el reveal-on-scroll re-dispara al expandir, y comprobar el mismo flujo en viewport 375px. Ningún defecto queda abierto al finalizar.

## Must-Haves

- 6 sub-períodos colapsados + 1 expandido al cargar la página (rev-alberdi-formacion)
- Click en header → expande/colapsa con animación CSS suave (~0.45s); chevron rota 90°
- Teclado: Tab navega entre triggers; Enter y Space hacen toggle; aria-expanded se actualiza
- Reveal-on-scroll re-dispara correctamente al expandir un sub-período colapsado
- Sub-nav sticky sigue mostrándose y resaltando el sub-período visible
- Audio ambiental sigue funcionando (mute/unmute, cambio de track por período)
- Mobile (375px): misma conducta de accordion; sub-nav con scroll horizontal; columna única en cards

## Proof Level

- This slice proves: operational (runtime UAT)
- Real runtime required: yes
- Human/UAT required: yes

## Verification

La verificación se hace en dos fases: diagnóstico estático primero (Node.js), luego browser UAT.

**Fase 1 — Diagnóstico estático (ejecutar antes de abrir el browser):**

```bash
# 1. Orden de init correcto: initAccordions antes de revealOnScroll
node -e "
const fs = require('fs');
const js = fs.readFileSync('app.js', 'utf8');
const lines = js.split('\n');
const accIdx = lines.findIndex(l => l.includes('initAccordions()'));
const revIdx = lines.findIndex(l => l.includes('revealOnScroll()'));
if (accIdx < 0) { console.log('FAIL: initAccordions() call not found'); process.exit(1); }
if (revIdx < 0) { console.log('FAIL: revealOnScroll() call not found'); process.exit(1); }
if (accIdx < revIdx) { console.log('PASS: initAccordions at line ' + (accIdx+1) + ' < revealOnScroll at line ' + (revIdx+1)); }
else { console.log('FAIL: initAccordions must come before revealOnScroll'); process.exit(1); }
"

# 2. CSS accordion rules presente
node -e "
const fs = require('fs');
const css = fs.readFileSync('styles.css', 'utf8');
const checks = ['sub-period__body--collapsed', 'sub-period__title--trigger', '1000rem', 'prefers-reduced-motion', 'aria-expanded'];
let allPass = true;
checks.forEach(c => {
  const ok = css.includes(c);
  console.log((ok ? 'PASS' : 'FAIL') + ': ' + c);
  if (!ok) allPass = false;
});
process.exit(allPass ? 0 : 1);
"
```

**Fase 2 — Browser UAT (queries de DevTools a ejecutar en consola):**

```js
// Salud del accordion al cargar — ejecutar sin haber scrolleado ni clickeado
document.querySelectorAll('.sub-period__body--collapsed').length;                      // → 6
document.querySelectorAll('.sub-period__title--trigger[aria-expanded="true"]').length; // → 1
document.querySelectorAll('.sub-period__title--trigger').length;                       // → 7

// Diagnóstico de failure path: si > 0, el orden de init está roto
document.querySelectorAll('.sub-period__body--collapsed .reveal--no-anim').length;    // → 0 (crítico)

// Triggers creados correctamente
document.querySelectorAll('.sub-period__title--trigger[aria-controls]').length;       // → 7

// Altura de #periodo-rosas body post-expand (verificar no hay clip)
// (ejecutar DESPUÉS de expandir #periodo-rosas manualmente)
document.querySelector('#periodo-rosas .sub-period__body').scrollHeight;              // → debe ser < 16000
```

**Slice completo cuando:**
- Fase 1: ambos scripts terminan con exit 0
- Fase 2: todos los conteos de DevTools coinciden con los valores esperados
- Checklist visual de desktop (1280px) completado sin defectos abiertos
- Checklist de teclado completado (Tab/Enter/Space/aria-expanded funciona)
- Checklist de mobile (375px) completado sin defectos abiertos
- Si T01 encontró regresiones: T02 las corrigió y T01 fue re-ejecutado con resultado limpio

## Observability / Diagnostics

- Runtime signals: Prefijos de consola `[Accordion]`, `[SubNav]`, `[Sound]`, `[Reveal]` — la salud del sistema se lee directamente en DevTools Console. `[Accordion] Initialized with N sub-periods.` debe aparecer en el primer frame. `[Accordion] Expanded: <id>` / `[Accordion] Collapsed: <id>` en cada toggle.
- Inspection surfaces: DevTools Console (logs prefijados) + DevTools Elements (atributo `aria-expanded` en cada trigger, clase `sub-period__body--collapsed` en cada body)
- Failure visibility: `document.querySelectorAll('.sub-period__body--collapsed .reveal--no-anim').length > 0` → orden de init roto; ausencia de `[Accordion] Initialized` en consola → `initAccordions()` no corrió; `aria-expanded` siempre `"false"` → event delegation rota
- Redaction constraints: none — sitio estático sin datos de usuario

## Integration Closure

- Upstream surfaces consumed: `app.js` (`initAccordions()` + `revealOnScroll()` + `initAmbientSound()` + `initSubNav()`), `styles.css` (reglas de accordion + sub-nav + reveal)
- New wiring introduced in this slice: ninguna — S02 es solo verificación y corrección puntual
- What remains before the milestone is truly usable end-to-end: nothing — si T01 pasa limpio (o T02 corrige lo que T01 encontró), M012 está completo

## Tasks

- [x] **T01: Browser UAT — diagnóstico estático + verificación en desktop, teclado y mobile** `est:30m`
  - Why: Única forma de confirmar que el accordion funciona en runtime — el análisis estático de S01 no puede detectar errores de animación CSS, problemas de event delegation en browser, regresiones de audio/sub-nav, ni fallos de layout en mobile.
  - Files: `app.js`, `styles.css`, `index.html`
  - Do: (1) Servir el sitio: `node -e "require('http').createServer(require('fs').readFile.bind(require('fs'),'index.html',(e,d)=>{})).listen(8080)"` — o más robusto: instalar y usar `npx http-server . -p 8080 -c-1`. (2) Ejecutar los dos scripts de diagnóstico estático de la sección Verification. (3) Abrir `http://localhost:8080` en Chrome y correr las 5 queries de DevTools Console (sin scroll ni click previos). (4) Completar el checklist visual desktop. (5) Completar el checklist de teclado. (6) Cambiar viewport a 375px y completar el checklist mobile. (7) Documentar cada defecto encontrado con: elemento afectado, comportamiento esperado, comportamiento real.
  - Verify: `node -e "..."` de Fase 1 termina con exit 0; todas las DevTools queries retornan los valores esperados; los tres checklists (visual/teclado/mobile) están completos y sin items abiertos — o con items documentados como defectos para T02.
  - Done when: Los dos scripts de Fase 1 pasan con exit 0 Y los conteos de DevTools son correctos Y los checklists están completos. Si hay defectos, T01 termina igual con los defectos documentados en T01-SUMMARY.md para que T02 los consuma.

- [x] **T02: Corregir regresiones encontradas en T01** `est:variable`
  - Why: Si T01 encontró alguna regresión (en accordion, audio, sub-nav, reveal, o mobile), debe corregirse antes de marcar M012 como completo. Si T01 no encontró regresiones, este task termina en <2min (no-op).
  - Files: `app.js` (lógica de accordion, audio, sub-nav), `styles.css` (reglas de accordion, mobile breakpoints)
  - Do: Leer T01-SUMMARY.md para obtener la lista de defectos. Para cada defecto: aplicar el fix específico según la guía de pitfalls de S02-RESEARCH (sección "Common Pitfalls"). Fixes más probables: (a) `#periodo-rosas` max-height insuficiente → cambiar `1000rem` a `1500rem` en `styles.css` si `scrollHeight > 14000`; (b) `padding-right` en trigger visual crowding en mobile → reducir `var(--space-xl)` a `var(--space-md)` en `.sub-period__title--trigger` para viewports <640px; (c) cualquier defecto de audio/sub-nav → inspeccionar consola `[Sound]`/`[SubNav]` para localizar el error y corregir en `app.js`. Después de cada fix, re-ejecutar las queries de DevTools para confirmar. Si T01 no reportó defectos, marcar T02 como done-no-op con "Sin regresiones en T01 — no se aplicaron cambios".
  - Verify: Re-ejecutar las queries de Fase 2 post-fix y confirmar todos los conteos correctos. Si no hubo fixes: `echo "no-op"` (exit 0).
  - Done when: Todos los defectos de T01 están corregidos Y las queries de DevTools pasan Y el checklist fue re-verificado para los items afectados — o T01 no reportó defectos y este task es no-op.

## Files Likely Touched

- `app.js` — posibles fixes de accordion/audio/sub-nav si T01 encuentra regresiones
- `styles.css` — posible ajuste de `max-height` o breakpoints mobile si T01 encuentra problemas visuales
- `index.html` — solo si T01 detecta un problema estructural en el DOM (muy improbable dado el análisis estático de S01)
