---
estimated_steps: 7
estimated_files: 3
---

# T01: Browser UAT — diagnóstico estático + verificación en desktop, teclado y mobile

**Slice:** S02 — Verificación y Pulido
**Milestone:** M012

## Description

S01 implementó el accordion con análisis estático exitoso. Este task confirma que todo funciona en runtime: primero ejecuta scripts Node.js para verificar el orden de init y las reglas CSS, luego abre el sitio en browser y corre un conjunto preciso de DevTools queries + checklists visuales. El resultado es un reporte de defectos (vacío si todo está bien) que T02 consume.

## Steps

1. **Diagnóstico estático — init order:** Ejecutar el script Node.js que verifica que `initAccordions()` aparece antes que `revealOnScroll()` en `app.js`. Debe terminar con exit 0 y mensaje `PASS: initAccordions at line X < revealOnScroll at line Y`.

2. **Diagnóstico estático — CSS accordion:** Ejecutar el script Node.js que verifica que `styles.css` contiene `sub-period__body--collapsed`, `sub-period__title--trigger`, `1000rem`, `prefers-reduced-motion`, y `aria-expanded`. Debe terminar con exit 0 y 5 líneas `PASS`.

3. **Servir el sitio:** Iniciar servidor HTTP en puerto 8080. Opción recomendada: `npx http-server . -p 8080 -c-1` (desactiva caché). Si npx no está disponible: `node -e "const http=require('http'),fs=require('fs'),path=require('path'); http.createServer((req,res)=>{const f='.'+req.url.replace(/\?.*/,''); fs.readFile(f==='.'||f==='./'?'./index.html':f,(e,d)=>{res.end(d||'');}); }).listen(8080, ()=>console.log('Listening on 8080'));"`. Confirmar que `http://localhost:8080` carga el sitio.

4. **DevTools queries — cargar sin scroll ni click:** Abrir DevTools Console y ejecutar las 5 queries exactas de la sección Verification del S02-PLAN.md. Anotar cada valor retornado. Valores esperados:
   - `.sub-period__body--collapsed` → **6**
   - `.sub-period__title--trigger[aria-expanded="true"]` → **1**
   - `.sub-period__title--trigger` → **7**
   - `.sub-period__body--collapsed .reveal--no-anim` → **0** (failure-path check crítico)
   - `.sub-period__title--trigger[aria-controls]` → **7**

5. **Checklist visual desktop (1280px):**
   - [ ] 6 sub-períodos muestran solo header h3 + chevron ▶ (apuntando derecha)
   - [ ] `rev-alberdi-formacion` muestra contenido completo, chevron ▼ (apuntando abajo)
   - [ ] Click en header colapsado → expande suavemente en ~0.45s; chevron rota 90°
   - [ ] Click en header expandido → colapsa suavemente; chevron vuelve a ▶
   - [ ] Sub-nav sticky visible al scrollear dentro de `#periodo-revolucion`
   - [ ] Sub-nav resalta el sub-período actualmente visible al scrollear
   - [ ] Expandir un sub-período y scrollear → cards revelan con animación fade
   - [ ] Sound toggle funciona (mute/unmute); track cambia entre períodos
   - [ ] Expandir `#periodo-rosas` → contenido completo visible (no clippeado); ejecutar `document.querySelector('#periodo-rosas .sub-period__body').scrollHeight` — debe ser < 16000px

6. **Checklist teclado:**
   - [ ] Tab enfoca cada `.sub-period__title--trigger` en orden — outline visible (azul)
   - [ ] Enter en trigger enfocado → toggle (expandir si colapsado, colapsar si expandido)
   - [ ] Space en trigger enfocado → toggle sin scroll de página (preventDefault funciona)
   - [ ] `aria-expanded` se actualiza en DevTools Elements tab tras cada toggle
   - [ ] `aria-controls` en cada trigger apunta al ID del `.sub-period__body` correspondiente

7. **Checklist mobile (viewport 375px — usar DevTools device emulation):**
   - [ ] 6 accordions inician colapsados; 1 expandido (igual que desktop)
   - [ ] Sub-nav bar con scroll horizontal (overflow-x: auto) — todos los 7 links accesibles
   - [ ] Accordion expand/collapse funciona con touch (click simulado)
   - [ ] Cards en columna única dentro de sub-período expandido
   - [ ] Activar "prefers-reduced-motion: reduce" en DevTools → accordion expande/colapsa instantáneamente (sin transición)

## Must-Haves

- [ ] Script de diagnóstico estático (init order) termina con exit 0
- [ ] Script de diagnóstico estático (CSS) termina con exit 0 con 5 PASS
- [ ] DevTools query `.sub-period__body--collapsed .reveal--no-anim` retorna 0 (failure-path check)
- [ ] Todos los conteos de DevTools coinciden con valores esperados
- [ ] Checklists visual, teclado, y mobile completados (items marcados ✓ o documentados como defecto)
- [ ] T01-SUMMARY.md escrito con: (a) resultados de cada query, (b) estado de cada checklist item, (c) lista de defectos encontrados (puede ser vacía)

## Verification

```bash
# Script 1: init order
node -e "
const fs = require('fs');
const js = fs.readFileSync('app.js', 'utf8');
const lines = js.split('\n');
const accIdx = lines.findIndex(l => l.includes('initAccordions()'));
const revIdx = lines.findIndex(l => l.includes('revealOnScroll()'));
if (accIdx < 0) { console.log('FAIL: initAccordions() call not found'); process.exit(1); }
if (revIdx < 0) { console.log('FAIL: revealOnScroll() call not found'); process.exit(1); }
if (accIdx < revIdx) { console.log('PASS: initAccordions at line ' + (accIdx+1) + ' < revealOnScroll at line ' + (revIdx+1)); }
else { console.log('FAIL: wrong order'); process.exit(1); }
"

# Script 2: CSS rules
node -e "
const fs = require('fs');
const css = fs.readFileSync('styles.css', 'utf8');
const checks = ['sub-period__body--collapsed','sub-period__title--trigger','1000rem','prefers-reduced-motion','aria-expanded'];
let allPass = true;
checks.forEach(c => { const ok = css.includes(c); console.log((ok?'PASS':'FAIL')+': '+c); if (!ok) allPass = false; });
process.exit(allPass ? 0 : 1);
"
```

Browser: El `.sub-period__body--collapsed .reveal--no-anim` query retornando `0` es el check de failure path más crítico. Si retorna > 0, el orden de init está roto en runtime (aunque el script Node lo haya pasado — podría haber otra llamada a `revealOnScroll()` antes de `initAccordions()`).

## Observability Impact

- Signals added/changed: ninguno — T01 solo observa; no modifica código
- How a future agent inspects this: DevTools Console → buscar `[Accordion] Initialized with 7 sub-periods.` como primera señal de salud; luego ejecutar las 5 queries de Fase 2
- Failure state exposed: `.sub-period__body--collapsed .reveal--no-anim` > 0 indica orden de init roto en runtime; ausencia de `[Accordion] Initialized` indica que `initAccordions()` no corre; `aria-expanded` siempre `"false"` indica event delegation rota

## Inputs

- `app.js` — implementación de `initAccordions()` de S01 (call en línea ~160, función ~líneas 419–527)
- `styles.css` — reglas accordion de S01 (`.sub-period__body`, `.sub-period__body--collapsed`, `.sub-period__title--trigger`, `prefers-reduced-motion`)
- `index.html` — los 7 `.sub-period` divs dentro de `#periodo-revolucion`
- S01-SUMMARY.md (Forward Intelligence) — lista de observability surfaces y diagnostics

## Expected Output

- T01-SUMMARY.md escrito en `.gsd/milestones/M012/slices/S02/tasks/` con:
  - Resultados de los dos scripts de diagnóstico estático (PASS/FAIL con líneas)
  - Valores retornados por cada DevTools query
  - Estado de cada item de los tres checklists (✓ / ✗ defecto)
  - Lista de defectos (puede ser vacía si todo pasó): cada defecto con elemento afectado, comportamiento esperado, comportamiento real
  - Decisión: "T02 es no-op" o "T02 debe corregir: [lista]"
