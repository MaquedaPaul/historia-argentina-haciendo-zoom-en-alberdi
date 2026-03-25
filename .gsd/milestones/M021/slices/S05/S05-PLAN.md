# S05: Sub-nav, timeline y verificación final

**Goal:** Conectar `#rev-san-martin` al sub-nav y al timeline de revolución; confirmar que el milestone M021 cumple todos sus criterios de aceptación.
**Demo:** `document.querySelector('a[href="#rev-san-martin"]')` no es null; `document.querySelectorAll('.revolucion-timeline__marker').length === 14`; `document.querySelectorAll('#rev-san-martin [data-certeza]').length >= 14`; sin errores JS en consola; correcto visual en 320px y 1920px+.

## Must-Haves

- `<a href="#rev-san-martin" class="sub-nav__link">` presente en el sub-nav de `#periodo-revolucion`
- 4 nuevos marcadores en `revolucion-timeline`: 1812 (below), 1813 (above), 1817 (above), 1818 (below)
- CSS stagger extendido a nth-child(12)–(15) para que los nuevos marcadores sean visibles al hacer scroll
- Verificación DOM completa supera todos los criterios del milestone
- Sin errores JS en consola; correcto en 320px y 1920px+

## Verification

```bash
# Sub-nav link
grep -c 'href="#rev-san-martin"' index.html
# → 1

# Timeline markers total (4 new + 10 existing = 14)
grep -c 'revolucion-timeline__marker' index.html
# → 14

# 1812 and 1817 markers specifically present
grep -c 'marker-pos: 20.00%' index.html
# → 1
grep -c 'marker-pos: 28.33%' index.html
# → 1

# CSS stagger extended to nth-child(15)
grep -c 'nth-child(15)' styles.css
# → 2 (one dot rule, one label rule)

# Global data-certeza count unchanged at 108
grep -c 'data-certeza' index.html
# → 108

# JS syntax
node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('syntax OK'); } catch(e) { if (e instanceof SyntaxError) console.error('SYNTAX ERROR:', e.message); else console.log('syntax OK (runtime-only error)'); }"
# → syntax OK

# Boundary count in #rev-san-martin (≥14)
node -e "const h=require('fs').readFileSync('index.html','utf8'); const s=h.indexOf('id=\"rev-san-martin\"'); const e=h.indexOf('</div><!-- /#rev-san-martin -->'); const sec=h.slice(s,e+30); const m=sec.match(/data-certeza/g); console.log(m?m.length:0);"
# → 15
```

## Tasks

- [x] **T01: Añadir sub-nav link, timeline markers y CSS stagger para #rev-san-martin** `est:30m`
  - Why: Cierra los tres requisitos pendientes del milestone: navegación al sub-período, marcadores cronológicos en el timeline, y verificación final completa.
  - Files: `index.html`, `styles.css`
  - Do: Ver T01-PLAN.md — tres ediciones quirúrgicas en orden, luego verificación DOM completa.
  - Verify: `grep -c 'href="#rev-san-martin"' index.html` → 1; `grep -c 'revolucion-timeline__marker' index.html` → 14; `grep -c 'nth-child(15)' styles.css` → 2; JS syntax OK
  - Done when: Todos los criterios de verificación del milestone pasan; sin errores JS; correcto en 320px y 1920px+.

## Observability / Diagnostics

**Runtime signals after T01 completes:**
- `[SubNav]` debug log at page load will print `Initialized with 8 sub-periods, 8 links.` (was 7 before T01). Deviation from 8 signals the sub-nav link was not inserted.
- `document.querySelectorAll('.revolucion-timeline__marker').length` in browser console must return `14`. Any value < 14 means one or more markers were not inserted.
- Timeline markers 1812/1813/1817/1818 are invisible (opacity:0, never animates) if CSS stagger rules for nth-child(12)–(15) are missing — failure manifests as 4 permanently invisible dots/labels after page scroll-reveal triggers.

**Inspection surfaces:**
- Browser console filter `[SubNav]` → shows initialized link count
- `document.querySelectorAll('.sub-nav__link')` → must be length 8
- `document.querySelectorAll('.revolucion-timeline__marker')` → must be length 14
- `document.querySelectorAll('#rev-san-martin [data-certeza]')` → must be length 15 (S04 integrity)

**Failure visibility:**
- Missing sub-nav link: user cannot navigate directly to `#rev-san-martin` from the sticky nav; `[SubNav]` log shows 7 instead of 8
- Missing CSS stagger (nth-child 12–15): dots and labels for 1812/1813/1817/1818 stay at `opacity:0` permanently after scroll-reveal fires; no JS error surfaces this
- Wrong marker positions: visual overlap in the 1810–1820 cluster; inspect `--marker-pos` custom property values in DevTools

**Redaction:** No sensitive data; all diagnostic output is safe to log.

**Failure-path verification check:**
```bash
# Confirm SubNav detects 8 links (not 7 — that would mean sub-nav edit failed)
node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.match(/class=\"sub-nav__link\"/g); console.log('sub-nav links:', m?m.length:0, m&&m.length===8?'OK':'FAIL');"
# → sub-nav links: 8 OK
```

## Files Likely Touched

- `index.html` — sub-nav link (línea ~329) + 4 timeline markers (después de 1810 y después de 1816)
- `styles.css` — stagger rules nth-child(12)–(15) para dots y labels
