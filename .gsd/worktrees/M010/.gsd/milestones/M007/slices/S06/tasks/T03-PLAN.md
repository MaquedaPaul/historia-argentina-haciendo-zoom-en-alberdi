---
estimated_steps: 4
estimated_files: 2
---

# T03: Triple gate de verificación — shell + DOM + coherencia narrativa

**Slice:** S06 — Quién era Facundo Quiroga y con quién estaba cuando recibió la carta
**Milestone:** M007

## Description

Ejecutar las tres capas de verificación establecidas en S01–S05 para confirmar que la integración de S06 es estructuralmente correcta, que el runtime registra los nuevos elementos, y que no hay contradicciones narrativas. Registrar todos los valores reales en un Apéndice T03 al final de `S06-CONTENT-DRAFT.md`.

## Steps

1. **Capa 1 — Shell** (ejecutar todos los checks; deben pasar todos):
   ```bash
   grep -c 'data-certeza' index.html          # → 54
   grep -c 'id="BIOG-19"' index.html          # → 1
   grep -c 'id="BIOG-20"' index.html          # → 1
   grep -c 'rev-alberdi-quiroga' index.html   # → 3 (sub-nav link + div id + comentario cierre)
   grep -c 'sub-nav__link' index.html         # → 6
   grep -q 'San Antonio de los Llanos' index.html && echo OK   # → OK
   grep -q 'Santos Ortiz' index.html && echo OK                # → OK
   grep -q 'card-nota-historiografica' index.html && echo OK   # → OK
   grep -q 'Braulio Costa' index.html && echo OK               # → OK
   grep -q 'Barranca Yaco' index.html && echo OK               # → OK (ya presente en BIOG-18; BIOG-20 puede omitir o mencionar brevemente)
   ```

2. **Capa 2 — DOM** (abrir `index.html` en browser con `browser_navigate`; ejecutar con `browser_evaluate`):
   ```js
   document.querySelectorAll('.sub-nav .sub-nav__link').length             // debe ser 6
   document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length // debe ser 4 (era 2)
   document.querySelector('#BIOG-19 .card-nota-historiografica') !== null  // debe ser true
   document.querySelectorAll('#BIOG-20 .card-nota-certeza').length         // debe ser 1
   document.querySelectorAll('.reveal').length                             // debe ser ≥75 (73+≥2)
   ```
   Nota: `console.debug` NO es capturado por Playwright. Usar las queries DOM directamente — son más fiables que los mensajes de log (documentado en KNOWLEDGE.md sección "console.debug Is Not Captured by Playwright").

3. **Capa 3 — Coherencia narrativa** (leer BIOG-19 y BIOG-20 en el browser, confirmar):
   - BIOG-19 describe el perfil biográfico personal de Quiroga (origen, guerras, muerte) — no repite el contexto político federal de SP2-2 ni el episodio del encuentro de BIOG-17.
   - BIOG-19 tiene `card-nota-historiografica` visible que menciona Sarmiento/*Facundo* (1845).
   - BIOG-20 describe el entorno en Buenos Aires — no repite las conversaciones de BIOG-18 ni usa la frase "ese hombre extraordinario" (ya en BIOG-18).
   - `card-nota-certeza` de BIOG-20 acota explícitamente que los testigos del encuentro de oct-nov 1834 no están documentados individualmente.
   - Santos Ortiz en BIOG-20 está identificado como secretario habitual en BA — no confundido con el momento de la entrega de la carta.
   - Las cards hacen scroll-reveal correctamente (tomar screenshot para confirmar).

4. Registrar todos los valores reales en un **Apéndice T03** al final de `S06-CONTENT-DRAFT.md`:
   ```markdown
   ## Apéndice T03 — Triple Gate S06

   | Capa | Check | Valor real |
   |------|-------|------------|
   | Shell | data-certeza | 54 ✅ |
   | Shell | id="BIOG-19" | 1 ✅ |
   | Shell | id="BIOG-20" | 1 ✅ |
   | Shell | rev-alberdi-quiroga | 3 ✅ |
   | Shell | sub-nav__link | 6 ✅ |
   | Shell | San Antonio de los Llanos | OK ✅ |
   | Shell | Santos Ortiz | OK ✅ |
   | Shell | card-nota-historiografica | OK ✅ |
   | Shell | Braulio Costa | OK ✅ |
   | DOM | sub-nav__link.length | 6 ✅ |
   | DOM | #rev-alberdi-quiroga [data-certeza] | 4 ✅ |
   | DOM | #BIOG-19 .card-nota-historiografica | not null ✅ |
   | DOM | #BIOG-20 .card-nota-certeza.length | 1 ✅ |
   | DOM | .reveal.length | [N] ✅ |
   | Narrativa | BIOG-19 ≠ SP2-2 | ✅ |
   | Narrativa | BIOG-20 ≠ BIOG-18 | ✅ |
   | Narrativa | card-nota-historiografica visible | ✅ |
   | Narrativa | card-nota-certeza testigos visible | ✅ |
   | Narrativa | Santos Ortiz contextualizado correctamente | ✅ |

   Gate: 19/19 — S06 cerrado.
   ```
   Ajustar los valores con los reales obtenidos. Si algún check falla, documentar el fallo y el fix aplicado.

## Must-Haves

- [ ] Las 9+ checks de Capa 1 pasan todos
- [ ] Las 5 queries DOM de Capa 2 dan los valores esperados
- [ ] Las 5 verificaciones narrativas de Capa 3 pasan
- [ ] Apéndice T03 escrito en `S06-CONTENT-DRAFT.md` con los valores reales

## Verification

- `grep -c 'data-certeza' index.html` → 54
- `grep -c 'sub-nav__link' index.html` → 6
- `grep -q 'card-nota-historiografica' index.html` → exit 0
- `grep -q 'Apéndice T03' .gsd/milestones/M007/slices/S06/S06-CONTENT-DRAFT.md` → exit 0

## Inputs

- `index.html` — estado post-T02 con BIOG-19 y BIOG-20 integrados
- `.gsd/milestones/M007/slices/S06/S06-CONTENT-DRAFT.md` — draft de T01 donde se añade el Apéndice T03
- `.gsd/KNOWLEDGE.md` — sección "Three-Layer Slice Exit Gate"; sección "console.debug Is Not Captured by Playwright"; sección "grep -c on Card IDs Counts HTML Comments"

## Expected Output

- `S06-CONTENT-DRAFT.md` actualizado con Apéndice T03 completo con todos los valores reales y "Gate: N/N — S06 cerrado"
- Screenshot (opcional pero recomendado): BIOG-19 y BIOG-20 visibles en browser con scroll-reveal correcto
