---
id: T01
parent: S02
milestone: M020
provides:
  - Sub-período wrapper <div id="rev-invasiones-inglesas"> con 9 cards (INV-01 a INV-09) integradas en index.html antes de #rev-alberdi-formacion
  - Sub-nav link <a href="#rev-invasiones-inglesas"> como primer link del <nav class="sub-nav">
  - card-nota-historiografica en INV-04 (Sobremonte/protocolo) e INV-07 (Álzaga/debate historiográfico)
  - Expand/collapse (card-expand-toggle + card-detail hidden) en las 9 cards
  - Stagger delays 0ms–640ms (80ms increment) aplicados en order INV-01→INV-09
  - INV-09 usa card-image-placeholder (imagen de soldado Patricios no verificada en draft; T03 la resolverá)
key_files:
  - index.html
key_decisions:
  - INV-03 usó retrato de Beresford (URL verificada) en lugar del PLACEHOLDER de ilustración de caída — consistente con la recomendación del draft
  - INV-05 reutilizó retrato de Beresford con alt text diferente (el draft lo ofrece explícitamente como alternativa al PLACEHOLDER del tesoro en Londres)
  - INV-09 usó card-image-placeholder (no card-image con img) porque el archivo Commons de soldado Patricios no estaba verificado en el draft; T03 resolverá
  - Todas las 9 cards son card-hecho (certeza="hecho") incluyendo INV-04 e INV-07 que tienen debate historiográfico — el debate va dentro del card-detail como card-nota-historiografica, no como tipo de card distinto
patterns_established:
  - card-nota-historiografica va dentro de <div class="card-detail"> como <p class="card-nota-historiografica"><strong>Nota historiográfica:</strong> ...</p>
  - card-image-placeholder se usa con aria-label descriptivo y <span class="card-image-placeholder__text"> en lugar de img src="" para PLACEHOLDERs no resueltos
  - El conteo de toggles via regex /card-expand-toggle/g devuelve 3× el número de botones (button + 2 spans internos) — V3 del slice espera ≥10 y pasa con 27 para 9 cards
observability_surfaces:
  - node -e "const h=require('fs').readFileSync('index.html','utf8'); const b=(h.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/)||[''])[0]; console.log('certeza:', (b.match(/data-certeza/g)||[]).length, '| buttons:', (b.match(/<button class=\"card-expand-toggle\"/g)||[]).length, '| notas:', (b.match(/card-nota-historiografica/g)||[]).length);"
  - grep -n 'href="#rev-invasiones-inglesas"' index.html
  - grep -n 'card-nota-historiografica' index.html
duration: ~45min
verification_result: passed (T01 partial — 9/18 cards; slice V1/V6 pending until T02)
completed_at: 2026-03-25
blocker_discovered: false
---

# T01: Insertar sub-período wrapper, sub-nav link y cards INV-01 a INV-09

**Insertados wrapper #rev-invasiones-inglesas con 9 cards (INV-01–INV-09), sub-nav link como primer elemento del nav, expand/collapse y notas historiográficas en INV-04 e INV-07.**

## What Happened

Leí el content draft completo para INV-01 a INV-09 desde `S01-CONTENT-DRAFT.md` (T01-DRAFT-PARTIAL y T02-DRAFT-PARTIAL del draft). Identifiqué el punto de inserción: `<div id="rev-alberdi-formacion"` en línea ~346 de `index.html`.

**Sub-nav:** Inserté `<a href="#rev-invasiones-inglesas" class="sub-nav__link">1806–1807<span class="sub-nav__link-label">Invasiones Inglesas</span></a>` como primer link del `<nav class="sub-nav">`, antes del link existente `#rev-alberdi-formacion`. La posición es cronológicamente correcta (1806–1807 precede a 1810–1838).

**Sub-período wrapper:** Inserté el bloque completo antes de `<div id="rev-alberdi-formacion"` con:
- Comentario de contexto documentando el sub-período, número de cards y referencia al draft
- `<div id="rev-invasiones-inglesas" class="sub-period reveal reveal-fade">` con `<h3>` y `<div class="events-grid events-grid--certeza">`
- 9 cards (INV-01 a INV-09) siguiendo la plantilla exacta del codebase (`card-hecho`, certeza-indicator, card-image o card-image-placeholder, year, title, excerpt, card-expand-toggle, card-detail hidden, card-source con cite)
- Comentario de cierre `<!-- /#rev-invasiones-inglesas (T01: INV-01 a INV-09; T02 agrega INV-10 a INV-18) -->`

**Decisiones de imagen:**
- INV-01: Cevallos (URL verificada en draft)
- INV-02: Popham (URL verificada en draft)
- INV-03: Beresford (retrato alternativo — PLACEHOLDER de ilustración de caída de BA resuelto con imagen verificada del commander)
- INV-04: Sobremonte (URL verificada en draft)
- INV-05: Beresford (retrato reutilizado — PLACEHOLDER de tesoro en Londres resuelto con alternativa documentada en el draft, alt text diferenciado)
- INV-06: Liniers (URL verificada en draft)
- INV-07: Álzaga (URL verificada en draft)
- INV-08: Sobremonte (URL verificada en draft, mismo archivo que INV-04 con alt text diferente)
- INV-09: card-image-placeholder (soldado Patricios sin URL verificada en draft; T03 resolverá)

**Notas historiográficas:**
- INV-04: Debate sobre cobardía vs. protocolo Vértiz en la fuga de Sobremonte
- INV-07: Debate sobre rol militar vs. logístico de Álzaga (Williams Alzaga vs. narrativa oficial)

**Pre-flight additions:** Agregué `## Observability Impact` a T01-PLAN.md tal como lo requería el pre-flight check.

## Verification

Corrí los checks del task plan y los V1–V6 del slice:

```
certeza cards: 9 ✅
expand toggle buttons: 9 ✅
notas historiográficas: 2 ✅
empty src imgs: 0 ✅
app.js syntax: PASS ✅
sub-nav link: PASS ✅
block chars: 38896 ✅
```

V3 slice (toggles ≥10): 27 PASS ✅ — el regex /card-expand-toggle/g cuenta 3 ocurrencias por card (button + 2 spans internos).

V1 y V6 del slice fallan parcialmente (9/18 cards, 2/4 notas) pero esto es esperado: T01 solo integra la primera mitad. T02 completa el bloque.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| T01-1 | `node -e "const h=...; certeza, toggles, notas en bloque"` | 0 | ✅ pass (9, 27, 2) | <1s |
| T01-2 | `grep -q 'href="#rev-invasiones-inglesas"' index.html` | 0 | ✅ pass | <1s |
| T01-3 | `node -e "empty src check en bloque"` | 0 | ✅ pass (0 empty) | <1s |
| V1 (slice) | conteo cards ≥18 | 1 | ⚠️ partial (9/18 — T02 completa) | <1s |
| V2 (slice) | sub-nav link | 0 | ✅ pass | <1s |
| V3 (slice) | toggles ≥10 | 0 | ✅ pass (27) | <1s |
| V4 (slice) | no src vacío | 0 | ✅ pass | <1s |
| V5 (slice) | app.js syntax OK | 0 | ✅ pass | <1s |
| V6 (slice) | notas ≥4 | 1 | ⚠️ partial (2/4 — T02 completa) | <1s |

## Diagnostics

Para inspeccionar el estado del bloque:
```bash
# Conteo rápido de cards/toggles/notas
node -e "const h=require('fs').readFileSync('index.html','utf8'); const b=(h.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/)||[''])[0]; console.log('certeza:', (b.match(/data-certeza/g)||[]).length, '| buttons:', (b.match(/<button class=\"card-expand-toggle\"/g)||[]).length, '| notas:', (b.match(/card-nota-historiografica/g)||[]).length, '| chars:', b.length);"

# Tamaño del bloque (diagnóstico de presencia/ausencia)
node -e "const h=require('fs').readFileSync('index.html','utf8'); console.log((h.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/)||[''])[0].length + ' chars')"

# Sub-nav link
grep -n 'href="#rev-invasiones-inglesas"' index.html

# Notas historiográficas
grep -n 'card-nota-historiografica' index.html
```

En runtime (DevTools):
- `document.querySelectorAll('#rev-invasiones-inglesas [data-certeza]').length` → 9 tras T01
- `document.querySelector('a[href="#rev-invasiones-inglesas"]')` → non-null
- `document.querySelectorAll('#rev-invasiones-inglesas .card-expand-toggle').length` → 9

## Deviations

- INV-03: El draft marcaba la imagen como PLACEHOLDER y sugería buscar una ilustración de la caída de Buenos Aires en Wikimedia. Se usó el retrato de Beresford (ya verificado) en lugar de buscar una nueva imagen — consistente con la alternativa documentada en el propio draft y en el task plan (step 5, instrucción de imagen para INV-03).
- INV-05: El draft marcaba la imagen como PLACEHOLDER de "ilustración inglesa celebrando el tesoro". Se usó el retrato de Beresford (alternativa documentada en el draft y en el task plan) con alt text diferente al de INV-03.
- INV-09: El draft documentó el placeholder de soldado Patricios como `⚠️ imagen-no-verificada` sin URL alternativa verificada. Se usó `card-image-placeholder` con texto descriptivo. T03 resolverá con búsqueda en Wikimedia Commons.

## Known Issues

- INV-09 usa `card-image-placeholder` en lugar de `card-image` con `<img>`. T03 debe buscar el archivo Commons del soldado Patricios y reemplazarlo.
- V1 y V6 del slice no pasan hasta T02 (9/18 cards, 2/4 notas) — esperado.
- INV-03 e INV-05 reutilizan el mismo retrato de Beresford; visualmente pueden resultar redundantes. T03 puede explorar si existe una imagen más específica para INV-05 (el desfile en Portsmouth).

## Files Created/Modified

- `index.html` — inserción del bloque #rev-invasiones-inglesas (38.896 caracteres, 9 cards INV-01–INV-09) y del sub-nav link como primer elemento del sub-nav
- `.gsd/milestones/M020/slices/S02/tasks/T01-PLAN.md` — añadida sección `## Observability Impact` (pre-flight requirement)
