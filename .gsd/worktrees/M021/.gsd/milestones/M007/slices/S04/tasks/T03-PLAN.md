---
estimated_steps: 5
estimated_files: 2
---

# T03: Gate de triple verificación y cierre del milestone M007

**Slice:** S04 — Alberdi multifacético — periodista, abogado, economista, músico
**Milestone:** M007

## Description

S04 es el cierre del arco biográfico de M007. Este task ejecuta el gate de triple verificación (shell/browser/narrativa) que S01, S02 y S03 establecieron como patrón, y confirma que el milestone completo está cerrado: 11 bloques biográficos cronológicos (BIOG-1 a BIOG-11) + 5 bloques temáticos (BIOG-12 a BIOG-16) = 16 bloques totales en `#rev-alberdi-formacion`, sin regresiones en el resto del sitio.

**Baselines post-S03 (punto de partida):**
- `data-certeza` total: 45 → post-S04 debe ser ≥50
- `card-nota-certeza` spans: 13 → post-S04 debe ser ≥13 (puede aumentar)
- Reveal elements: 65 → post-S04 debe ser ≥70
- `#rev-alberdi-formacion [data-certeza]`: 11 → post-S04 debe ser ≥16
- `[SubNav] Initialized with 5 sub-periods, 5 links` — invariante (S04 no agrega sub-períodos)

**Patrón del gate (establecido en S01–S03):** Tres capas independientes, cada una detecta defectos que las otras no ven:
1. Capa 1 — checks cuantitativos en shell (grep/node): integridad estructural
2. Capa 2 — señales de browser (JS console + DevTools): integridad del runtime (reveal, subnav)
3. Capa 3 — lectura narrativa manual: coherencia temporal y causal entre cards

**Failure-path protocol:** Si cualquier check falla, aplicar la corrección mínima antes de declarar T03 completado. No declarar "done" con checks fallidos pendientes.

## Steps

1. **Capa 1 — Shell checks** (ejecutar todos desde el directorio de trabajo):
   ```bash
   # Check 1: total data-certeza ≥50
   grep -c 'data-certeza' index.html

   # Check 2: keywords de facetas presentes
   grep 'Iniciador\|rentístico\|Figarillo\|guitarra\|método' index.html | wc -l

   # Check 3: card-nota-certeza no regresó
   grep -c 'card-nota-certeza' index.html

   # Check 4: BIOG-12 a BIOG-16 presentes (o la numeración usada en T02)
   grep -n 'BIOG-1[2-6]' index.html | wc -l

   # Check 5: Node.js exit gate
   node -e "const fs=require('fs');const html=fs.readFileSync('index.html','utf8');const n=(html.match(/data-certeza/g)||[]).length;if(n<50){console.error('FAIL: data-certeza='+n+' < 50');process.exit(1);}console.log('OK: data-certeza='+n);"

   # Check 6: sin cambios en CSS ni JS
   git diff --name-only
   ```
   Resultados esperados: Check 1 ≥50 | Check 2 ≥4 | Check 3 ≥13 | Check 4 ≥5 | Check 5 exit 0 | Check 6 solo `index.html` (no `styles.css`, no `app.js`).

2. **Capa 2 — Browser checks** (servir el sitio con `npx http-server . -p 8080 -c-1` o usar browser_navigate con file://):
   - Navegar al sitio, abrir consola JS
   - Verificar: `[Reveal] Initialized with N elements` → N ≥ 70
   - Verificar: `[SubNav] Initialized with 5 sub-periods, 5 links` → invariante
   - En DevTools console: `document.querySelectorAll('#rev-alberdi-formacion [data-certeza]').length` → ≥16
   - En DevTools console: `document.querySelectorAll('.card-nota-certeza').length` → ≥13
   - Scroll manual hasta `#rev-alberdi-formacion`: verificar que las 5 cards temáticas hacen reveal al entrar en viewport
   - **Failure-path check**: si N (reveal count) < 70, ejecutar `grep -n 'reveal reveal-slide' index.html | tail -15` para verificar que las nuevas cards tienen las clases correctas

3. **Capa 3 — Coherencia narrativa**: Leer el sub-período biográfico completo en el browser:
   - BIOG-1 a BIOG-11 fluyen cronológicamente sin gaps ni fechas contradictorias
   - El bloque "Las múltiples dimensiones de Alberdi" (BIOG-12 a BIOG-16) aparece visualmente después de BIOG-11 como cierre temático natural
   - El puente narrativo (`alberdi-quote` "Los pueblos, como los hombres, no tienen alas…") sigue siendo el cierre hacia el Salón Literario, DESPUÉS del bloque temático — no fue alterado ni duplicado
   - La card BIOG-12 (periodista) no duplica lo dicho en SP2-2 (El Iniciador puede mencionarse en el contexto del Salón Literario — verificar que no hay contradicción de fechas)
   - La card BIOG-13 (abogado) no contradice BIOG-8 (formación legal) — BIOG-8 cubre la etapa estudiantil, BIOG-13 cubre el ejercicio profesional
   - La card BIOG-14 (economista) no duplica el contenido de SP3 (Organización Nacional) ni las cards sobre las *Bases*
   - La card BIOG-15 (músico) expande lo mencionado en BIOG-7 (piano de Mariquita, la tienda de Maldes) sin contradecirlo
   - La card BIOG-16 (escritor/pensador) tiene un ángulo propio y no repite frases de los 6 alberdi-quote existentes
   - Navegar todas las secciones del sitio (colonial, revolución, nacional) para confirmar que no hay regresiones visuales

4. **Correcciones**: Si cualquier check falla:
   - Check 1 falla → localizar la causa con `grep -n 'Iniciador\|rentístico' index.html`; si count es 45 la integración de T02 no se aplicó → re-ejecutar T02
   - Check 2 (keywords) falla → verificar que el borrador de T01 incluyó esas palabras y que se integraron en T02
   - Check 3 (card-nota-certeza) disminuyó → alguna card preexistente fue accidentalmente eliminada; usar `git diff index.html` para localizar
   - Check 6 muestra `styles.css` o `app.js` → revertir esos cambios con `git checkout styles.css app.js`
   - Browser check N < 70 → verificar que las 5 cards nuevas tienen `class="... reveal reveal-slide"` y no solo `reveal`

5. **Documentar resultados**: Añadir un "Apéndice T03" a `S04-CONTENT-DRAFT.md` con una tabla de resultados del gate (misma estructura que S01–S03). Tabla mínima:

   | Check | Comando / Señal | Resultado | Estado |
   |-------|-----------------|-----------|--------|
   | data-certeza ≥50 | `grep -c 'data-certeza' index.html` | [valor] | ✅/❌ |
   | Keywords ≥4 | `grep 'Iniciador\|rentístico...' \| wc -l` | [valor] | ✅/❌ |
   | card-nota-certeza ≥13 | `grep -c 'card-nota-certeza' index.html` | [valor] | ✅/❌ |
   | BIOG-12..16 ≥5 | `grep -n 'BIOG-1[2-6]' \| wc -l` | [valor] | ✅/❌ |
   | Node.js gate | `node -e "...n<50→exit(1)..."` | exit [0/1] | ✅/❌ |
   | Sin CSS/JS | `git diff --name-only` | [files] | ✅/❌ |
   | Reveal N≥70 | `[Reveal] Initialized with N` | N=[valor] | ✅/❌ |
   | SubNav invariante | `[SubNav] Initialized with 5 sub-periods` | 5/5 | ✅/❌ |
   | #rev-alberdi-formacion ≥16 | `querySelectorAll('#rev-alberdi-formacion [data-certeza]').length` | [valor] | ✅/❌ |
   | card-nota-certeza browser | `querySelectorAll('.card-nota-certeza').length` | [valor] | ✅/❌ |

## Must-Haves

- [ ] Capa 1: 6 shell checks, todos pass
- [ ] Capa 2: browser signals verificados (Reveal N≥70, SubNav 5/5, #rev-alberdi-formacion ≥16)
- [ ] Capa 3: coherencia narrativa confirmada (16 bloques sin contradicciones ni duplicaciones)
- [ ] Failure-path check ejecutado (inspectar causa si cualquier check falla)
- [ ] Apéndice T03 en S04-CONTENT-DRAFT.md con tabla de resultados

## Verification

- `node -e "const fs=require('fs');const n=(fs.readFileSync('index.html','utf8').match(/data-certeza/g)||[]).length;if(n<50){console.error('FAIL:'+n);process.exit(1);}console.log('OK:'+n);"` → exit 0
- `grep -c 'card-nota-certeza' index.html` → ≥13
- `git diff --name-only` → contiene `index.html` pero NO `styles.css` ni `app.js`
- `grep -c 'BIOG-1[2-6]' index.html` → ≥5
- `test -f .gsd/milestones/M007/slices/S04/S04-CONTENT-DRAFT.md && grep -q 'Apéndice T03\|Apendice T03' .gsd/milestones/M007/slices/S04/S04-CONTENT-DRAFT.md` → exit 0

## Inputs

- `index.html` — estado post-T02: ≥50 cards data-certeza, 5 nuevas cards BIOG-12 a BIOG-16
- `.gsd/milestones/M007/slices/S04/S04-CONTENT-DRAFT.md` — producido en T01; se añade Apéndice T03 aquí
- S03-SUMMARY.md (inlined en S04-PLAN) — baselines post-S03 como punto de comparación
- KNOWLEDGE.md — patrón gate de triple capa; failure-path protocol

## Expected Output

- `index.html` — 16 bloques biográficos de Alberdi confirmados (11 cronológicos + 5 temáticos), todos los checks de gate pasados, sin regresiones
- `.gsd/milestones/M007/slices/S04/S04-CONTENT-DRAFT.md` — Apéndice T03 con tabla de resultados del gate
- M007 completo: el visitante puede leer la vida de Alberdi 1810–1838 (S01–S03) y su perfil multifacético (S04) en el sitio; los 11 bloques del milestone más los 5 temáticos están integrados y verificados
