---
id: S08
parent: M007
milestone: M007
provides:
  - BIOG-23 (card-hecho): catálogo de los escritos de Alberdi disponibles en 1834 — dos textos musicales de 1832 y la Memoria sobre Tucumán — con card-nota-certeza declarando que ninguna fuente documenta que Quiroga los leyó
  - BIOG-24 (card-rumor): cierre epistémico del arco Alberdi-Quiroga — reformula la pregunta honestamente, declara la laguna documental, y señala la carta de Heredia como base real de la evaluación de Quiroga
  - Arco BIOG-17…BIOG-24 completo y coherente dentro de #rev-alberdi-quiroga
requires:
  - slice: S07
    provides: Arco narrativo Alberdi-Quiroga casi completo (encuentro → rechazo del viaje); posición en HTML para inserción
affects: []
key_files:
  - index.html
  - .gsd/milestones/M007/slices/S08/S08-CONTENT-DRAFT.md
  - tmp-s08-biog23-24.txt
key_decisions:
  - BIOG-24 clasificado como card-rumor (no card-opinion) porque la pregunta carece de respuesta documental — la clasificación rumor es la honestamente correcta
  - h4 subtitle "Los textos de Alberdi en 1834 y la evaluación de Quiroga" cubre ambas cards (catálogo + pregunta epistémica) bajo un único encabezado temático
  - Ningún sub-período nuevo añadido; sub-nav__link se mantiene en 6 — bloque temático post-cronológico dentro del sub-período existente
patterns_established:
  - Honestidad epistémica como cierre de arco: declarar una laguna documental explícitamente es preferible a especular o inflar una card-opinion con evidencia insuficiente
  - Pre-flight check antes de splice CRLF-safe previene duplicación silenciosa en worktrees
  - Narrative layer verificada con Node.js string matching sobre bloques HTML extraídos — más rápido y preciso que inspección visual manual
observability_surfaces:
  - "grep -c 'data-certeza' index.html → 58 (señal de salud primaria del slice)"
  - "grep -n 'data-certeza' index.html | grep -v 'hecho|opinion|evidencia|rumor' → 0 resultados (failure-path diagnostic)"
  - "node -e placement integrity check → BIOG-23 inside section: true / BIOG-24 inside section: true"
  - "document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length → 8"
  - "document.querySelectorAll('.reveal').length → 82"
drill_down_paths:
  - .gsd/milestones/M007/slices/S08/tasks/T01-SUMMARY.md
  - .gsd/milestones/M007/slices/S08/tasks/T02-SUMMARY.md
  - .gsd/milestones/M007/slices/S08/tasks/T03-SUMMARY.md
duration: 45m
verification_result: passed
completed_at: 2026-03-22
---

# S08: Los escritos de Alberdi que leyó Facundo Quiroga

**Cierra el arco Alberdi-Quiroga con dos cards finales: BIOG-23 cataloga los textos de Alberdi disponibles en 1834 y declara explícitamente que ninguna fuente documenta que Quiroga los leyó; BIOG-24 reformula la pregunta del slice con honestidad epistémica, declara la laguna documental, y menciona la Memoria sobre Tucumán como el candidato más plausible sin evidencia directa.**

## What Happened

El slice partió con el arco narrativo Alberdi-Quiroga casi completo (BIOG-17 a BIOG-22, construidos en S05–S07): el encuentro, la carta de Heredia, la propuesta del viaje a EE.UU., el rechazo de Alberdi, y el análisis de sus motivaciones. S08 tenía la tarea más delicada del milestone: responder honestamente una pregunta que no tiene respuesta documental directa.

**T01** convirtió la investigación existente en HTML concreto. Antes de redactar, confirmó los baselines (56 `data-certeza`, `sub-nav__link=6`) y leyó BIOG-17/18 para identificar las frases verbatim a evitar. El catálogo de BIOG-23 incluyó tres textos verificados: *El espíritu de la música* (1832), *Ensayo sobre un método nuevo para aprender a tocar el piano* (1832), y la *Memoria descriptiva sobre Tucumán* (1834). La `card-nota-certeza` dentro de BIOG-23 es directa: ninguna fuente documenta que Quiroga haya leído ninguno de esos textos. BIOG-24 fue clasificado como `card-rumor` — la clasificación honesta cuando la respuesta simplemente no existe. El cuerpo explica que lo que Quiroga evaluó fue la carta de Heredia y las conversaciones directas; señala la Memoria sobre Tucumán como candidato circunstancialmente plausible (nexo Heredia, contemporaneidad, tema tucumano); y cierra con el dato de que Quiroga murió en Barranca Yaco el 16 de febrero de 1835 — tres meses después del encuentro — sin que ninguna fuente registrara sus impresiones sobre la obra de Alberdi.

**T02** ejecutó la integración CRLF-safe vía Node.js (`split('\r\n')` + `findIndex` + `splice` + `join('\r\n')`), patrón establecido en S06/S07. El pre-flight confirmó `BIOG-23|BIOG-24 count=0` antes del splice. El anchor `</div><!-- /#rev-alberdi-quiroga -->` estaba en la línea predicha por T01 (1094). Los cinco Capa 1 checks pasaron inmediatamente. Los tres DOM checks via `browser_evaluate` confirmaron: 8 elementos `data-certeza` en la sección (era 6), 82 `.reveal` totales (era 79), y `#BIOG-24.dataset.certeza === "rumor"`.

**T03** ejecutó el triple gate completo: 7 shell + 3 DOM + 6 narrative = 13/13. Los checks narrativos verificaron por código que BIOG-24 no inventa ninguna reacción de Quiroga, declara la laguna documental en al menos tres lugares distintos, y que BIOG-23 tiene su `card-nota-certeza`. El pre-flight fix de T03 movió el failure-path diagnostic y el placement integrity check desde la sección Observability a la sección Verification del S08-PLAN.md.

## Verification

Triple gate 13/13:

**Shell (7/7):**
- `grep -c 'data-certeza' index.html` → 58 ✅
- `grep -c 'id="BIOG-23"' index.html` → 1 ✅
- `grep -c 'id="BIOG-24"' index.html` → 1 ✅
- `grep -c 'rev-alberdi-quiroga' index.html` → 3 ✅
- `grep -c 'sub-nav__link' index.html` → 6 ✅
- Failure-path: `grep -n 'data-certeza' index.html | grep -v 'hecho|opinion|evidencia|rumor'` → 0 resultados ✅
- Node.js placement integrity: BIOG-23 inside section → true / BIOG-24 inside section → true ✅

**DOM (3/3):**
- `document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length` → 8 ✅
- `document.querySelectorAll('.reveal').length` → 82 ✅
- `document.querySelector('#BIOG-24').dataset.certeza` → "rumor" ✅

**Narrative (6/6):**
- Sin reacciones inventadas de Quiroga en BIOG-24 ✅
- BIOG-24 declara laguna documental en ≥3 lugares ✅
- BIOG-23 tiene `card-nota-certeza` ✅
- Sin citas verbatim de BIOG-17/18 ✅
- BIOG-24 menciona Barranca Yaco (cierre narrativo) ✅
- BIOG-23 referencia carta de Heredia (coherencia de arco) ✅

## New Requirements Surfaced

- none

## Deviations

**T03 pre-flight fix:** El failure-path diagnostic y el placement integrity check existían en la sección Observability/Diagnostics del S08-PLAN.md pero no en la sección Verification. T03 los movió a Verification — no es una desviación del objetivo, sino una mejora en la completitud del plan.

**BIOG-24 estructura de card-rumor:** Las cards `card-rumor` existentes en el sitio usan `<p class="event-card__excerpt card-rumor__text">` directamente dentro del article, sin `event-card__header`. BIOG-24 mantiene el `event-card__header` (con year + title) para coherencia visual con el arco BIOG-17…BIOG-24. Esta variación es compatible con las clases existentes y no requiere CSS nuevo.

## Known Limitations

- La pregunta del slice ("¿Qué textos de Alberdi leyó Quiroga?") permanece sin respuesta documental — esto es correcto e intencional. BIOG-24 la declara honestamente. Si en el futuro se descubriera una carta o referencia de Quiroga mencionando algún texto de Alberdi, BIOG-24 debería reclasificarse de `card-rumor` a `card-hecho` o `card-opinion` con la fuente citada.
- La *Memoria descriptiva sobre Tucumán* (1834) se menciona como "candidato plausible" en BIOG-24. Esta plausibilidad se basa en circunstancias (nexo Heredia, contemporaneidad, tema provinciano) pero no en evidencia directa — la clasificación `card-rumor` lo refleja correctamente.

## Follow-ups

- **Milestone M007 completo:** S08 es el último slice. El milestone puede declararse done tras la UAT del usuario.
- Si en el futuro se decide expandir el período 1800–1860 con más contenido sobre Quiroga, el sub-período `#rev-alberdi-quiroga` tiene capacidad para más cards antes del cierre `</div><!-- /#rev-alberdi-quiroga -->`.

## Files Created/Modified

- `index.html` — BIOG-23 y BIOG-24 integradas antes de `</div><!-- /#rev-alberdi-quiroga -->`; data-certeza 56→58; .reveal 79→82
- `.gsd/milestones/M007/slices/S08/S08-CONTENT-DRAFT.md` — draft completo con HTML de BIOG-23 y BIOG-24, nota de inserción, tabla self-check, tabla de coherencia del arco, notas de implementación
- `tmp-s08-biog23-24.txt` — archivo temporal de auditoría del bloque insertado
- `.gsd/milestones/M007/slices/S08/S08-PLAN.md` — sección Verification actualizada con failure-path diagnostic y placement integrity check; T03 marcado [x]
- `.gsd/milestones/M007/slices/S08/tasks/T01-PLAN.md` — sección Observability Impact añadida (pre-flight fix de T01)

## Forward Intelligence

### What the next slice should know
- El milestone M007 está completo. El arco Alberdi-Quiroga (BIOG-17…BIOG-24) está cerrado. No hay slices adicionales en el roadmap de M007.
- El sub-nav del período `#periodo-revolucion` tiene 6 links — este es el invariante establecido desde S04. Cualquier futuro slice que añada contenido a ese período debe insertar bloques temáticos dentro de sub-períodos existentes (como hizo S08) si no quiere alterar la navegación.
- La taxonomía completa de `data-certeza` en el proyecto es: `hecho`, `opinion` (sin acento — normalizado desde M004), `opinión` (con acento — cards antiguas de M002/M003), `evidencia`, `rumor`. Cualquier valor fuera de este conjunto es un error.

### What's fragile
- `tmp-s08-biog23-24.txt` — archivo de auditoría temporal en el directorio raíz. No es parte del sitio y no debe desplegarse. Si existe en el worktree al hacer merge, ignorarlo.
- El count de `.reveal` elements (82) es el baseline post-S08. Cualquier futuro slice que añada cards o h4 con `reveal reveal-fade` debe actualizar este baseline en sus verificaciones.

### Authoritative diagnostics
- `grep -c 'data-certeza' index.html` → 58 es la señal de salud primaria para S08. Si el count cae, algo se sobreescribió.
- `grep -n 'data-certeza' index.html | grep -v 'hecho|opinion|evidencia|rumor'` → debe devolver 0 resultados siempre. Cualquier output indica un valor malformado.
- `node -e placement integrity check` → true/true confirma que BIOG-23/24 siguen dentro de `#rev-alberdi-quiroga`.

### What assumptions changed
- **Pregunta del slice:** La pregunta "¿Qué textos de Alberdi leyó Quiroga?" fue reformulada honestamente al ejecutar el slice. No tiene respuesta documental. El slice entregó honestidad epistémica explícita en lugar de una respuesta fabricada — esto es más valioso para el sitio que una card-opinion especulativa.
