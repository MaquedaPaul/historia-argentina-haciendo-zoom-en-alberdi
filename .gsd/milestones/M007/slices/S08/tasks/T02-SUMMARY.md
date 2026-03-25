---
id: T02
parent: S08
milestone: M007
provides:
  - BIOG-23 (card-hecho) and BIOG-24 (card-rumor) integrated into index.html within #rev-alberdi-quiroga; data-certeza count raised from 56 to 58; .reveal count raised from 79 to 82
key_files:
  - index.html
  - tmp-s08-biog23-24.txt
key_decisions:
  - CRLF-safe Node.js splice pattern (split('\r\n') + findIndex + splice + join('\r\n')) used as in S06/S07 — confirmed idempotent and line-ending preserving
patterns_established:
  - Pre-flight check (grep -c 'BIOG-23|BIOG-24') before any splice prevents accidental duplication
  - Write tool (not heredoc) for temp block file ensures CRLF neutrality in the input buffer
observability_surfaces:
  - grep -c 'data-certeza' index.html → 58 (primary health signal)
  - grep -n 'data-certeza' index.html | grep -v 'hecho|opinion|evidencia|rumor' → 0 results (no malformed certeza values)
  - node -e "const h=require('fs').readFileSync('index.html','utf8'); const s=h.slice(h.indexOf('id=\"rev-alberdi-quiroga\"'), h.indexOf('</div><!-- /#rev-alberdi-quiroga -->')); console.log(s.includes('id=\"BIOG-23\"'), s.includes('id=\"BIOG-24\"'));" → true true
duration: 15m
verification_result: passed
completed_at: 2026-03-22
blocker_discovered: false
---

# T02: Integrar BIOG-23 y BIOG-24 en index.html

**Insertó los dos cards finales del arco Alberdi-Quiroga (BIOG-23 catálogo de obra + BIOG-24 laguna documental) en index.html via splice CRLF-safe en Node.js; los cinco Capa 1 checks y los tres DOM checks pasan sin regresión.**

## What Happened

Pre-flight confirmó que BIOG-23/BIOG-24 no estaban en index.html (count=0) y que los baselines coincidían con lo esperado: 56 `data-certeza`, 6 `sub-nav__link`.

Se escribió el bloque HTML completo (h4 + events-grid--certeza con BIOG-23 y BIOG-24) a `tmp-s08-biog23-24.txt` usando el Write tool tal como prescribe el plan. El splice Node.js dividió index.html por `\r\n`, localizó el anchor `</div><!-- /#rev-alberdi-quiroga -->` en la línea 1094 (confirmando la predicción de T01), y lo ejecutó sin error.

Los cinco Capa 1 checks pasaron inmediatamente. Se levantó un servidor estático con `serve` para ejecutar los DOM checks via browser_evaluate, los cuales confirmaron que el recuento de elementos en el DOM coincide con los targets del slice.

## Verification

**Shell checks (5/5):**
- `grep -c 'data-certeza' index.html` → 58 ✅
- `grep -c 'id="BIOG-23"' index.html` → 1 ✅
- `grep -c 'id="BIOG-24"' index.html` → 1 ✅
- `grep -c 'rev-alberdi-quiroga' index.html` → 3 ✅
- `grep -c 'sub-nav__link' index.html` → 6 ✅

**DOM checks (3/3) via browser_evaluate en http://localhost:5500:**
- `document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length` → 8 ✅ (era 6)
- `document.querySelectorAll('.reveal').length` → 82 ✅ (era 79)
- `document.querySelector('#BIOG-24').dataset.certeza` → "rumor" ✅

**Failure-path diagnostic:**
- `grep -n 'data-certeza' index.html | grep -v 'hecho|opinion|evidencia|rumor'` → 0 resultados ✅

**Node section validation:**
- `node -e "...s.includes('BIOG-23') && s.includes('BIOG-24')..."` → true true ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c 'BIOG-23\|BIOG-24' index.html` (pre-flight) | 1 (count=0) | ✅ pass | <1s |
| 2 | `grep -c 'data-certeza' index.html` | 0 (count=58) | ✅ pass | <1s |
| 3 | `grep -c 'id="BIOG-23"' index.html` | 0 (count=1) | ✅ pass | <1s |
| 4 | `grep -c 'id="BIOG-24"' index.html` | 0 (count=1) | ✅ pass | <1s |
| 5 | `grep -c 'rev-alberdi-quiroga' index.html` | 0 (count=3) | ✅ pass | <1s |
| 6 | `grep -c 'sub-nav__link' index.html` | 0 (count=6) | ✅ pass | <1s |
| 7 | `document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length` | DOM=8 | ✅ pass | <1s |
| 8 | `document.querySelectorAll('.reveal').length` | DOM=82 | ✅ pass | <1s |
| 9 | `document.querySelector('#BIOG-24').dataset.certeza` | DOM="rumor" | ✅ pass | <1s |
| 10 | failure-path: `grep -n 'data-certeza' … | grep -v 'hecho\|…'` | 1 (0 results) | ✅ pass | <1s |

## Diagnostics

- Primary signal: `grep -c 'data-certeza' index.html` → 58
- Section containment: `node -e "...s.includes('BIOG-23') && s.includes('BIOG-24')..."`  → `true true`
- Failure state: si `data-certeza` queda en 56 tras la inserción, el anchor no fue hallado. Diagnosticar con `grep -n '/#rev-alberdi-quiroga' index.html`.
- Audit file: `tmp-s08-biog23-24.txt` — bloque exacto insertado, conservado para auditoría.

## Deviations

none

## Known Issues

none

## Files Created/Modified

- `index.html` — BIOG-23 y BIOG-24 integradas antes de `</div><!-- /#rev-alberdi-quiroga -->`; data-certeza 56→58; .reveal 79→82
- `tmp-s08-biog23-24.txt` — archivo temporal de auditoría del bloque insertado (creado nuevo)
