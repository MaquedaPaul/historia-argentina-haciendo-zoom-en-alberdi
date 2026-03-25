---
id: T01
parent: S02
milestone: M012
provides:
  - Static diagnostic results: both Fase 1 scripts exit 0 (init-order PASS, 5/5 CSS checks PASS)
  - Browser UAT results: all 5 DevTools queries match expected values on fresh load
  - Desktop checklist: 7/9 items pass; 2 defects found (see Known Issues)
  - Keyboard checklist: 5/5 items pass
  - Mobile checklist: 4/5 items pass; 1 defect found (same as desktop D1)
  - Defect report for T02: 2 actionable items with specific fixes
key_files:
  - app.js
  - styles.css
  - index.html
key_decisions:
  - none — T01 is observation-only; no code was modified
patterns_established:
  - none
observability_surfaces:
  - "[Accordion] Initialized with 7 sub-periods." confirmed in console on first frame
  - "[Accordion] Expanded: <id>" / "[Accordion] Collapsed: <id>" fires correctly on each toggle
  - document.querySelectorAll('.sub-period__body--collapsed').length → 6 on fresh load
  - document.querySelectorAll('.sub-period__title--trigger[aria-expanded=\"true\"]').length → 1 on fresh load
  - document.querySelectorAll('.sub-period__body--collapsed .reveal--no-anim').length → 0 (init order correct)
duration: ~45min
verification_result: passed-with-defects
completed_at: 2026-03-24
blocker_discovered: false
---

# T01: Browser UAT — diagnóstico estático + verificación en desktop, teclado y mobile

**Diagnóstico estático y browser UAT completados: los 5 checks de DevTools pasan correctamente pero se encontraron 2 defectos — los contenedores `.sub-period` (opacity:0 por reveal no disparada) y `#periodo-rosas` clipeado a 16000px con contenido de 17719px — que T02 debe corregir.**

## What Happened

### Fase 1 — Diagnóstico estático

**Script 1 (init order):** PASS — `initAccordions()` at line 160 < `revealOnScroll()` at line 164.

**Script 2 (CSS rules):** 5/5 PASS:
- PASS: sub-period__body--collapsed
- PASS: sub-period__title--trigger
- PASS: 1000rem
- PASS: prefers-reduced-motion
- PASS: aria-expanded

### Fase 2 — DevTools queries (sin scroll ni click previo)

Todos los 5 conteos coinciden con los valores esperados:

| Query | Esperado | Obtenido |
|-------|----------|---------|
| `.sub-period__body--collapsed` | 6 | **6** ✅ |
| `.sub-period__title--trigger[aria-expanded="true"]` | 1 | **1** ✅ |
| `.sub-period__title--trigger` | 7 | **7** ✅ |
| `.sub-period__body--collapsed .reveal--no-anim` | 0 | **0** ✅ |
| `.sub-period__title--trigger[aria-controls]` | 7 | **7** ✅ |

### Checklist visual desktop (1280px)

Durante la inspección visual, se descubrió que los contenedores `.sub-period` (que tienen la clase `reveal reveal-fade` en el HTML estático) nunca reciben `reveal--visible` porque el `IntersectionObserver` usa `threshold: 0.15`. Para un contenedor de 7929px de alto, el 15% = ~1189px nunca puede cumplirse en un viewport de 800px → los sub-períodos permanecen en `opacity: 0` (invisibles). Para completar el checklist se usó `classList.add('reveal--no-anim')` manualmente en los sub-períodos.

Con visibilidad forzada:

- [✓] 6 sub-períodos muestran solo header h3 + chevron ▶ (apuntando derecha)
- [✓] `rev-alberdi-formacion` muestra contenido completo, chevron ▼ (apuntando abajo)
- [✓] Click en header colapsado → expande suavemente en ~0.45s; chevron rota 90°
- [✓] Click en header expandido → colapsa suavemente; chevron vuelve a ▶
- [✗] Sub-nav sticky — **DEFECTO PRE-EXISTENTE**: La `.sub-nav` tiene `position: sticky; top: 56px` pero su ancestro `<section class="period">` tiene `overflow: hidden`, lo que impide que sticky funcione fuera del scrollport del contenedor. Esto es un bug pre-M012 (presente en commit e131d67). No es regresión de M012.
- [✓] Sub-nav resalta el sub-período actualmente visible al scrollear (`[SubNav] Active sub-period →` en consola confirma)
- [✓] Expandir un sub-período y scrollear → cards revelan con animación fade (confirmado en consola `[Reveal] Revealed: ...`)
- [✓] Sound toggle funciona (mute/unmute, `aria-pressed` alterna, label cambia "Activar"/"Silenciar")
- [✗] **DEFECTO D2**: `document.querySelector('#periodo-rosas .sub-period__body').scrollHeight` = **17719** — mayor que el máximo de `1000rem` (16000px). Contenido clippeado en los últimos ~1719px.

### Checklist teclado

- [✓] Tab enfoca `.sub-period__title--trigger` — `tabindex="0"` confirmado en todos los 7 triggers
- [✓] Enter en trigger enfocado → toggle (verificado: aria-expanded cambia false→true y true→false)
- [✓] Space en trigger enfocado → toggle sin scroll de página (scrollDiff = 1px — esencialmente 0)
- [✓] `aria-expanded` se actualiza correctamente tras cada toggle
- [✓] `aria-controls` en cada trigger apunta al ID correcto del `.sub-period__body` correspondiente (verificado los 7)

### Checklist mobile (375px)

- [✓] 6 accordions inician colapsados; 1 expandido (igual que desktop) — queries retornan mismos valores
- [✓] Sub-nav bar con overflow-x: auto — links accesibles mediante scroll horizontal
- [✓] Accordion expand/collapse funciona con click simulado en mobile
- [✓] Cards en columna única dentro de sub-período expandido
- [✗] **DEFECTO D1 (mismo que desktop)**: `.sub-period` contenedores opacity:0 en mobile también

## Verification

```bash
# Script 1: init order — EXIT 0
node -e "
const fs = require('fs');
const js = fs.readFileSync('app.js', 'utf8');
const lines = js.split('\n');
const accIdx = lines.findIndex(l => l.includes('initAccordions()'));
const revIdx = lines.findIndex(l => l.includes('revealOnScroll()'));
if (accIdx < revIdx) { console.log('PASS: initAccordions at line ' + (accIdx+1) + ' < revealOnScroll at line ' + (revIdx+1)); }
"
# → PASS: initAccordions at line 160 < revealOnScroll at line 164

# Script 2: CSS rules — EXIT 0, 5/5 PASS
node -e "
const fs = require('fs');
const css = fs.readFileSync('styles.css', 'utf8');
const checks = ['sub-period__body--collapsed','sub-period__title--trigger','1000rem','prefers-reduced-motion','aria-expanded'];
checks.forEach(c => console.log((css.includes(c)?'PASS':'FAIL')+': '+c));
"
# → PASS: sub-period__body--collapsed / PASS: sub-period__title--trigger / PASS: 1000rem / PASS: prefers-reduced-motion / PASS: aria-expanded
```

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `node -e "...initAccordions order check..."` | 0 | ✅ PASS | ~200ms |
| 2 | `node -e "...5 CSS rules check..."` | 0 | ✅ PASS | ~200ms |
| 3 | DevTools: `.sub-period__body--collapsed` → 6 | — | ✅ PASS | — |
| 4 | DevTools: `.sub-period__title--trigger[aria-expanded="true"]` → 1 | — | ✅ PASS | — |
| 5 | DevTools: `.sub-period__title--trigger` → 7 | — | ✅ PASS | — |
| 6 | DevTools: `.sub-period__body--collapsed .reveal--no-anim` → 0 | — | ✅ PASS | — |
| 7 | DevTools: `.sub-period__title--trigger[aria-controls]` → 7 | — | ✅ PASS | — |
| 8 | Click toggle (expand) → ariaExpanded=true, collapsed=5 | — | ✅ PASS | — |
| 9 | Click toggle (collapse) → ariaExpanded=false, collapsed=6 | — | ✅ PASS | — |
| 10 | Enter key → toggle | — | ✅ PASS | — |
| 11 | Space key → toggle, scrollDiff≈0 | — | ✅ PASS | — |
| 12 | `#periodo-rosas .sub-period__body` scrollHeight > maxHeight | — | ❌ FAIL (17719 > 16000) | — |
| 13 | `.sub-period` opacity on scroll-to (sin manual override) | — | ❌ FAIL (opacity=0, reveal never fires) | — |

## Diagnostics

Cómo inspeccionar en el futuro:

- **Señal de salud primaria:** DevTools Console → buscar `[Accordion] Initialized with 7 sub-periods.` en el primer frame.
- **Defecto D1 (reveal):** Si los sub-períodos son invisibles, ejecutar en DevTools: `document.querySelectorAll('.sub-period').forEach(sp => console.log(sp.id, sp.classList.toString(), window.getComputedStyle(sp).opacity))` — si opacity es "0" y no hay clase `reveal--visible` ni `reveal--no-anim`, el defecto sigue presente.
- **Defecto D2 (clipping):** `document.querySelector('#periodo-rosas .sub-period__body').scrollHeight` — si > 16000, hay clipping.
- **Failure path check:** `document.querySelectorAll('.sub-period__body--collapsed .reveal--no-anim').length` → debe ser 0.

## Deviations

- El checklist visual no pudo completarse con visibilidad natural del sitio porque los `.sub-period` contenedores nunca se revelan (Defecto D1). Se usó `classList.add('reveal--no-anim')` manualmente para completar los demás items del checklist, lo que permitió verificar el accordion, teclado, y audio. El defecto fue documentado para T02.

## Known Issues

### Defecto D1 — CRÍTICO: `.sub-period` contenedores no se revelan nunca (opacity: 0 permanente)

- **Elemento afectado:** Los 7 elementos `div.sub-period.reveal.reveal-fade` en `#periodo-revolucion`
- **Comportamiento esperado:** Fade in cuando el usuario navega/scrollea al sub-período
- **Comportamiento real:** `opacity: 0` permanente — el `IntersectionObserver` tiene `threshold: 0.15` pero los contenedores miden ~8000-17000px de alto; el 15% nunca cabe en el viewport de 800px; el observer nunca dispara
- **Fix para T02:** Remover las clases `reveal reveal-fade` de los 7 `div.sub-period` en `index.html`. Las tarjetas individuales dentro ya tienen su propia clase `reveal` — el sub-período completo no necesita ser una unidad de reveal.
- **Impacto:** Los acordeones son completamente invisibles al usuario sin este fix (headers invisibles = no clickeables visualmente)

### Defecto D2 — MEDIO: `#periodo-rosas` body clipeado

- **Elemento afectado:** `#periodo-rosas .sub-period__body`
- **Comportamiento esperado:** Todo el contenido visible cuando expandido
- **Comportamiento real:** `scrollHeight: 17719px` > `max-height: 16000px (1000rem)` → ~1719px de contenido cortado
- **Fix para T02:** Cambiar `1000rem` a `1500rem` (= 24000px) en `.sub-period__body` en `styles.css`

### Observación: Sub-nav sticky no funciona (pre-existente)

- **Causa:** El ancestro `<section class="period">` tiene `overflow: hidden` → `position: sticky` en `.sub-nav` no puede adherirse al scrollport del document
- **No es regresión de M012** — presente en commit e131d67 antes de este milestone
- **No en scope de T02** a menos que el product owner lo priorice

## Decisión para T02

**T02 debe corregir:**
1. Remover `reveal reveal-fade` de los 7 `div.sub-period` en `index.html` (Defecto D1 — crítico)
2. Cambiar `1000rem` a `1500rem` en `.sub-period__body` en `styles.css` (Defecto D2 — medio)

El sub-nav sticky NO debe intentar corregirse en T02 (pre-existente, fuera de scope de M012).

## Files Created/Modified

- Ningún archivo de código modificado — T01 es solo observación y diagnóstico
- `.gsd/milestones/M012/slices/S02/tasks/T01-SUMMARY.md` — este archivo
