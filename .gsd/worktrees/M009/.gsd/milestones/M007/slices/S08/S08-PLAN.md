# S08: Los escritos de Alberdi que leyó Facundo Quiroga

**Goal:** Cerrar el arco narrativo Alberdi-Quiroga dentro de `#rev-alberdi-quiroga` añadiendo dos cards finales: BIOG-23 (`card-hecho`) catalogando los textos que Alberdi había escrito en 1834, y BIOG-24 (`card-rumor`) respondiendo honestamente a la pregunta del slice — que no tiene respuesta documental directa. El cierre usa honestidad epistémica: lo que Quiroga leyó fue la carta de Heredia, no una obra publicada.

**Demo:** `grep -c 'data-certeza' index.html` → 58; `grep -c 'id="BIOG-23"' index.html` → 1; `grep -c 'id="BIOG-24"' index.html` → 1; `grep -c 'sub-nav__link' index.html` → 6 (invariant); el arco BIOG-17…BIOG-24 narra coherentemente el encuentro, la propuesta, el rechazo, el análisis del rechazo, el catálogo de textos y la laguna documental.

## Must-Haves

- BIOG-23 es `card-hecho` / `data-certeza="hecho"` — cataloga *El espíritu de la música* (1832), *Ensayo sobre un método nuevo para aprender a tocar el piano* (1832), y la *Memoria descriptiva sobre Tucumán* (1834), con fechas y contexto editorial verificados.
- BIOG-23 incluye una `card-nota-certeza` explícita indicando que ninguna fuente documenta que Quiroga haya leído alguno de esos textos.
- BIOG-24 es `card-rumor` / `data-certeza="rumor"` — reformula la pregunta honestamente, explica que la base de la evaluación de Quiroga fue la carta de Heredia y las conversaciones directas, y señala la *Memoria sobre Tucumán* como el candidato más plausible sin evidencia directa.
- Las dos cards se insertan dentro de `#rev-alberdi-quiroga` como thematic block (h4 + events-grid--certeza), ANTES de `</div><!-- /#rev-alberdi-quiroga -->`. No se añade nuevo sub-período; `sub-nav__link` permanece en 6.
- Zero CSS ni JS nuevo: todas las clases son pre-existentes.
- `data-certeza` count sube de 56 a 58; `.reveal` elements suben de 79 a 82 (h4 + 2 cards = 3 nuevos).

## Verification

```bash
# Shell checks
grep -c 'data-certeza' index.html          # → 58
grep -c 'id="BIOG-23"' index.html          # → 1
grep -c 'id="BIOG-24"' index.html          # → 1
grep -c 'rev-alberdi-quiroga' index.html   # → 3 (unchanged)
grep -c 'sub-nav__link' index.html         # → 6 (unchanged)

# Failure-path diagnostic (inspectable failure state)
# → 0 results: all data-certeza values are known-valid (hecho|opinion|evidencia|rumor)
# → any output: malformed or unexpected certeza value introduced; inspect the line(s) shown
grep -n 'data-certeza' index.html | grep -v 'hecho\|opinion\|evidencia\|rumor'

# Placement integrity (section containment check)
# → true / true: BIOG-23 and BIOG-24 are inside #rev-alberdi-quiroga, not displaced
node -e "const h=require('fs').readFileSync('index.html','utf8'); const s=h.slice(h.indexOf('id=\"rev-alberdi-quiroga\"'), h.indexOf('</div><!-- /#rev-alberdi-quiroga -->')); console.log('BIOG-23 inside section:', s.includes('id=\"BIOG-23\"')); console.log('BIOG-24 inside section:', s.includes('id=\"BIOG-24\"'));"
```

```js
// DOM checks (browser_evaluate)
document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length   // → 8 (era 6)
document.querySelectorAll('.reveal').length                                // → 82 (era 79)
document.querySelector('#BIOG-24').dataset.certeza                        // → "rumor"
```

Narrative: el texto de BIOG-24 no inventa reacción de Quiroga; declara la laguna documental; no repite verbatim ninguna cita de BIOG-17 ni BIOG-18.

## Observability / Diagnostics

- Inspection surfaces:
  - `grep -c 'data-certeza' index.html` → 58 es la señal de salud más rápida
  - `node -e "const h=require('fs').readFileSync('index.html','utf8'); const s=h.slice(h.indexOf('id=\"rev-alberdi-quiroga\"'), h.indexOf('</div><!-- /#rev-alberdi-quiroga -->')); console.log(s.includes('id=\"BIOG-23\"'), s.includes('id=\"BIOG-24\"'));"` → ambos `true`
  - Failure-path diagnostic: `grep -n 'data-certeza' index.html | grep -v 'hecho\|opinion\|evidencia\|rumor'` → cero resultados (incluyendo `rumor` en el exclusion list para evitar falsos positivos de las dos cards pre-existentes)

## Tasks

- [x] **T01: Redactar S08-CONTENT-DRAFT con BIOG-23 y BIOG-24** `est:25m`
  - Why: La investigación ya está completa en S08-RESEARCH.md; este task convierte los hallazgos en HTML concreto y certero, diferenciando lo documentado de lo especulado antes de tocar `index.html`.
  - Files: `.gsd/milestones/M007/slices/S08/S08-CONTENT-DRAFT.md`
  - Do: Crear el content draft con los dos bloques HTML listos para copiar. BIOG-23: `card-hecho`, catálogo de tres textos (dos de 1832, uno de 1834), `card-nota-certeza` diciendo que ninguna fuente documenta que Quiroga los leyó. BIOG-24: `card-rumor` con `card-certeza-indicator` (⚠️ + badge "Rumor"), cuerpo explicando que lo que Quiroga leyó fue la carta de Heredia, y la *Memoria sobre Tucumán* como candidato plausible sin evidencia directa, `card-rumor__origin` footer con etiqueta "Laguna documental" y las fuentes (elhistoriador.com.ar/Pigna, larramendi.es/Laborde). Stagger BIOG-23: 0ms, BIOG-24: 80ms. Confirmar la línea exacta del anchor con `grep -n '/#rev-alberdi-quiroga' index.html`.
  - Verify: `test -f .gsd/milestones/M007/slices/S08/S08-CONTENT-DRAFT.md && grep -c 'BIOG-2[34]' .gsd/milestones/M007/slices/S08/S08-CONTENT-DRAFT.md`
  - Done when: el draft contiene HTML completo para BIOG-23 y BIOG-24 con clases verificadas, certeza correcta, y nota de inserción con el número de línea del anchor.

- [x] **T02: Integrar BIOG-23 y BIOG-24 en index.html** `est:20m`
  - Why: Lleva el HTML del draft al sitio usando el patrón CRLF-safe probado en S06 y S07.
  - Files: `index.html`, `tmp-s08-biog23-24.txt`
  - Do: (1) Pre-flight: `grep -c 'BIOG-23\|BIOG-24' index.html` → debe ser 0; si no es 0, la inserción ya está aplicada y este task es no-op. (2) Escribir el bloque HTML al archivo temporal `tmp-s08-biog23-24.txt` con el Write tool (no heredoc). El bloque incluye: `<h4 class="sub-period__subtitle reveal reveal-fade" style="--reveal-delay: 0ms">Los textos de Alberdi en 1834 y la evaluación de Quiroga</h4>` + `<div class="events-grid events-grid--certeza" aria-label="Los escritos de Alberdi disponibles en 1834 y la base de la evaluación de Quiroga">` + BIOG-23 + BIOG-24 + `</div>`. (3) Node.js CRLF-safe splice: `split('\r\n')`, `findIndex(l => l.includes('</div><!-- /#rev-alberdi-quiroga -->'))`, `splice(idx, 0, ...newLines)`, `join('\r\n')`. (4) Capa 1 checks: `grep -c 'data-certeza'` → 58, `grep -c 'id="BIOG-23"'` → 1, `grep -c 'id="BIOG-24"'` → 1, `grep -c 'rev-alberdi-quiroga'` → 3, `grep -c 'sub-nav__link'` → 6.
  - Verify: `grep -c 'data-certeza' index.html` → 58
  - Done when: los cinco Capa 1 checks pasan sin regresión.

- [x] **T03: Triple gate — verificación final y cierre del arco** `est:15m`
  - Why: El triple gate (shell + DOM + narrativa) es el stopping condition objetivo del slice y de todo el arco Alberdi-Quiroga del milestone.
  - Files: `index.html` (read-only en este task)
  - Do: (1) Shell: los cinco checks de T02 + `grep -n 'data-certeza' index.html | grep -v 'hecho\|opinion\|evidencia\|rumor'` → 0 resultados. (2) DOM: abrir en browser, ejecutar las tres queries de la sección Verification. (3) Narrativa: leer BIOG-17 → BIOG-24 en secuencia; verificar que BIOG-24 no inventa reacción de Quiroga, que la laguna documental está explícita, y que el cierre narrativo es coherente con BIOG-22 (que ya nombraba el Salón Literario en formación como contexto del rechazo).
  - Verify: `grep -c 'data-certeza' index.html` → 58 y `grep -c 'id="BIOG-24"' index.html` → 1
  - Done when: los tres layers (shell 5/5, DOM 3/3, narrativa 3/3) pasan; el arco BIOG-17…BIOG-24 narra coherentemente sin contradicciones.

## Files Likely Touched

- `index.html`
- `.gsd/milestones/M007/slices/S08/S08-CONTENT-DRAFT.md`
- `tmp-s08-biog23-24.txt`
