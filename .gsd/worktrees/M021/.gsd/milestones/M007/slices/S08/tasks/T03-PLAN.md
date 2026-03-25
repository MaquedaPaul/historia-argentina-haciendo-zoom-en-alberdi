---
estimated_steps: 3
estimated_files: 1
---

# T03: Triple gate — verificación final y cierre del arco Alberdi-Quiroga

**Slice:** S08 — Los escritos de Alberdi que leyó Facundo Quiroga
**Milestone:** M007

## Description

Ejecuta el triple gate (shell + DOM + narrativa) que es el stopping condition objetivo de S08 y cierra el arco Alberdi-Quiroga del milestone. Los tres layers se deben completar para declarar el slice done.

**Baselines esperados al inicio de este task (post-T02):**
- `grep -c 'data-certeza' index.html` → 58
- `grep -c 'id="BIOG-23"' index.html` → 1
- `grep -c 'id="BIOG-24"' index.html` → 1
- `grep -c 'rev-alberdi-quiroga' index.html` → 3
- `grep -c 'sub-nav__link' index.html` → 6

## Steps

1. **Layer 1 — Shell checks (5 + 1):**
   - Los cinco Capa 1 checks del T02 (confirmación de que T02 pasó correctamente).
   - Failure-path diagnostic: `grep -n 'data-certeza' index.html | grep -v 'hecho\|opinion\|evidencia\|rumor'` → debe devolver 0 resultados. (El patrón de exclusión incluye `rumor` porque hay dos `card-rumor` pre-existentes de M002/M003 que son válidas — omitir `rumor` del exclusion list produce falsos positivos.)
   - Placement integrity check: `node -e "const h=require('fs').readFileSync('index.html','utf8'); const s=h.slice(h.indexOf('id=\"rev-alberdi-quiroga\"'), h.indexOf('</div><!-- /#rev-alberdi-quiroga -->')); console.log('BIOG-23 inside section:', s.includes('id=\"BIOG-23\"')); console.log('BIOG-24 inside section:', s.includes('id=\"BIOG-24\"'));"` → ambos `true`.

2. **Layer 2 — DOM checks (browser_evaluate):**
   - `document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length` → 8 (era 6 antes de S08)
   - `document.querySelectorAll('.reveal').length` → 82 (era 79; h4 + 2 cards = 3 nuevos)
   - `document.querySelector('#BIOG-24').dataset.certeza` → `"rumor"`
   - Nota: si las cards aparecen en blanco en el screenshot por `opacity:0` del reveal system, forzar visibilidad para verificación visual: `document.querySelectorAll('.reveal').forEach(el => { el.style.opacity='1'; el.style.transform='none'; })` — esto no modifica el HTML ni el CSS fuente, sólo el estado del DOM en el browser de verificación.

3. **Layer 3 — Verificación narrativa (lectura del arco BIOG-17…BIOG-24):**
   - BIOG-24 **no** inventa reacción de Quiroga ante ningún texto de Alberdi.
   - BIOG-24 declara explícitamente la laguna documental (ninguna fuente registra qué leyó Quiroga, si leyó algo).
   - BIOG-23 tiene la `card-nota-certeza` visible indicando que ninguna fuente documenta lectura por Quiroga.
   - Ninguna de las dos cards repite verbatim citas que ya están en BIOG-17 o BIOG-18.
   - El cierre narrativo tiene coherencia: BIOG-22 (rechazo + Salón Literario en formación) → BIOG-23 (catálogo de textos de 1834) → BIOG-24 (laguna documental + muerte de Quiroga en Barranca Yaco, feb 1835). La secuencia cierra el arco sin contradicciones.

## Must-Haves

- [ ] Shell layer: 5 Capa 1 checks + failure-path diagnostic + placement integrity = 7/7
- [ ] DOM layer: 3/3 queries devuelven los valores esperados
- [ ] Narrativa layer: 3/3 checks de coherencia narrativa pasan
- [ ] Si algún layer falla, identificar el layer específico y la causa antes de declarar done

## Verification

- `grep -c 'data-certeza' index.html` → 58
- `grep -c 'id="BIOG-24"' index.html` → 1

## Observability Impact

- Inspection surfaces: `grep -c 'data-certeza' index.html` → 58 es la señal de salud más rápida para S08; cualquier valor distinto indica regresión
- Failure state exposed: el placement integrity check (`node -e "..."`) distingue "el bloque existe en el archivo" de "el bloque está dentro del sub-período correcto" — crucial para detectar inserción fuera de lugar

## Inputs

- `index.html` — estado post-T02 con BIOG-23 y BIOG-24 integradas
- S07-SUMMARY.md (forward intelligence): confirmar que `data-certeza` baseline era 56 al inicio de S08

## Expected Output

- Slice S08 verificado: triple gate 13/13 (7 shell + 3 DOM + 3 narrativa)
- El arco Alberdi-Quiroga (BIOG-17…BIOG-24) está completo, coherente y sin regresiones
- M007 puede ser declarado complete en la dimensión del arco Alberdi-Quiroga del milestone
