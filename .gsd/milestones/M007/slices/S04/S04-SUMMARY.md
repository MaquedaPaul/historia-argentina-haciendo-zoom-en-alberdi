---
id: S04
parent: M007
milestone: M007
provides:
  - 5 cards temáticas BIOG-12..16 integradas en #rev-alberdi-formacion ("Las múltiples dimensiones de Alberdi")
  - S04-CONTENT-DRAFT.md con 5 bloques verificados, fuentes documentadas, notas de certeza, Apéndice T03
  - Perfil multifacético de Alberdi cerrado: periodista, abogado, músico, economista, pensador en exilio
  - data-certeza = 50 (baseline para S05+); reveal elements = 70; card-nota-certeza DOM = 16
requires:
  - slice: S03
    provides: BIOG-1..11 cronológicos establecidos en #rev-alberdi-formacion; ancla de inserción `<!-- Puente narrativo: cierre de #rev-alberdi-formacion`; baseline data-certeza=45, reveal=65
affects:
  - S05 (el perfil completo de Alberdi ahora está en el sitio — 16 bloques = 11 cronológicos + 5 temáticos — como base narrativa para contextualizar el encuentro con Quiroga)
key_files:
  - index.html
  - .gsd/milestones/M007/slices/S04/S04-CONTENT-DRAFT.md
key_decisions:
  - El método musical de 1832 es para PIANO, no guitarra (el plan contenía un error; corregido en T01 tras investigación web; ver D041)
  - Alberdi fue colaborador principal de El Iniciador, no co-fundador (fundadores: Andrés Lamas y Miguel Cané; ver D042)
  - BIOG-14 (músico) lleva dos card-nota-certeza: "primer método en el Río de la Plata" no verificado; "composiciones propias" no verificadas
  - BIOG-15 (economista) lleva una card-nota-certeza: el superlativo "primer tratado de economía política argentino" no verificado en fuente primaria
  - BIOG-16 correctamente clasificada como card-opinion atribuida a Halperin Donghi y Mayer (Alberdi y su tiempo, 1963)
  - Sin imágenes en las 5 cards temáticas — retratos ya presentes en líneas 862, 1076, 1519; portadas de libros no disponibles en Wikimedia Commons
  - git diff vacío en T03 es correcto — T02 fue committed automáticamente; verificar con git show --stat HEAD
  - console.debug del runtime no capturado por Playwright; usar browser_evaluate para queries DOM equivalentes
patterns_established:
  - Pre-flight web research antes de redactar contenido histórico — detectó error crítico del plan (guitarra → piano) antes de escribir HTML
  - Bloque temático (no cronológico) post-BIOG-11 con h4 + events-grid--certeza propio — patrón reutilizable para síntesis temáticas dentro de un sub-período
  - Browser caching en Playwright puede mostrar stale DOM; fetch() o grep en disco son más confiables que lectura directa del DOM del tooling
  - Triple-gate cerrado exitosamente por cuarta vez en M007 (S01, S02, S03, S04)
observability_surfaces:
  - grep -c 'data-certeza' index.html → 50 (métrica primaria del milestone post-S04)
  - grep -c 'BIOG-1[2-6]' index.html → 5 (cards temáticas presentes)
  - node -e "const fs=require('fs');const n=(fs.readFileSync('index.html','utf8').match(/data-certeza/g)||[]).length;if(n<50){process.exit(1);}console.log('OK:'+n);" → exit 0
  - document.querySelectorAll('#rev-alberdi-formacion [data-certeza]').length → 16 (todos los bloques Alberdi)
  - document.querySelectorAll('.reveal').length → 70 (baseline post-M007-S01..S04)
  - grep -q 'Apéndice T03' .gsd/milestones/M007/slices/S04/S04-CONTENT-DRAFT.md → exit 0
drill_down_paths:
  - .gsd/milestones/M007/slices/S04/tasks/T01-SUMMARY.md — investigación de las 5 facetas, detección del error guitarra→piano
  - .gsd/milestones/M007/slices/S04/tasks/T02-SUMMARY.md — integración HTML CRLF-safe, observación de caching Playwright
  - .gsd/milestones/M007/slices/S04/tasks/T03-SUMMARY.md — triple gate 10/10 checks, cierre M007
duration: ~4h total (T01: ~2h, T02: ~45min, T03: ~25min + cierre)
verification_result: passed
completed_at: 2026-03-21
---

# S04: Alberdi multifacético — periodista, abogado, economista, músico

**5 cards temáticas BIOG-12–16 integradas en `#rev-alberdi-formacion` como bloque "Las múltiples dimensiones de Alberdi" — cierre del arco biográfico de M007 con 16 bloques totales de Alberdi en el sitio (11 cronológicos + 5 temáticos), data-certeza=50, reveal=70, triple gate 10/10.**

## What Happened

S04 ejecutó tres tareas en secuencia: investigación y redacción del borrador verificado (T01), integración HTML (T02), y gate de triple verificación y cierre de M007 (T03).

**T01 — Investigación y borrador:** Se realizó investigación web sistemática antes de escribir cualquier contenido. El hallazgo más significativo fue un **error crítico en el plan**: el método musical que Alberdi publicó en 1832 es para **piano**, no para guitarra como indicaba el plan. Confirmado por fuentes académicas peer-reviewed (Dialnet/CONICET 2016), Infobae 2023, y casarosada.gob.ar — y consistente con lo que BIOG-7 ya decía correctamente en el sitio. La afirmación sobre guitarra no tiene fuente verificable y se marcó con `[VERIFICAR ATRIBUCIÓN]`.

Los demás hechos de las 5 facetas se verificaron satisfactoriamente:
- **BIOG-12 (Periodista):** El Iniciador fundado el 15 de abril de 1838 por Andrés Lamas y Miguel Cané; Alberdi fue el **colaborador más prolífico** (no co-fundador, como implicaba el plan); seudónimo "Figarillo" como homenaje a Larra, confirmado en ≥5 fuentes académicas; artículos específicos verificados.
- **BIOG-13 (Abogado):** Llegada a Valparaíso abril 1844; revalidación del título el 14 sept. 1844 ante Andrés Bello; "Encargado de negocios" ante Francia, Inglaterra, el Vaticano y España; partida 15 abril 1855. ≥5 fuentes.
- **BIOG-14 (Músico):** Piano confirmado; "primer método en el Río de la Plata" no verificado en fuente primaria → card-nota-certeza; composiciones propias no verificadas → segunda card-nota-certeza.
- **BIOG-15 (Economista):** Título exacto *Sistema económico y rentístico de la Confederación Argentina según su Constitución de 1853*, Besançon, 1854, confirmado; tres principios centrales verificados; "primer tratado de economía política argentino" sin verificación primaria → card-nota-certeza.
- **BIOG-16 (Pensador en exilio):** Clasificada card-opinion correctamente; ángulo del exilio como condición de su escritura más libre atribuido a Halperin Donghi y Mayer (*Alberdi y su tiempo*, 1963); ninguna de las 6 citas alberdi-quote existentes duplicada.

Sin imágenes en las 5 cards: los retratos de Alberdi ya ocupan las líneas 862, 1076 y 1519 del HTML; las portadas de sus obras no están disponibles en Wikimedia Commons sin duplicar URLs.

**T02 — Integración HTML:** Pre-flight check confirmó count=0 (integración no aplicada previamente). El HTML de las 5 cards se escribió a un archivo temp con la herramienta Write (no heredoc), siguiendo el patrón CRLF-safe documentado en KNOWLEDGE.md. El bloque incluye:
- `<h4 class="sub-period__subtitle">Las múltiples dimensiones de Alberdi</h4>`
- `<div class="events-grid events-grid--certeza" aria-label="Las múltiples dimensiones de Alberdi">`
- 5 articles con stagger delays 80ms/160ms/240ms/320ms/400ms
- BIOG-16 como card-opinion con blockquote + atribución a Halperin Donghi/Mayer

La inserción Node.js CRLF-safe encontró el ancla en línea 629 (`<!-- Puente narrativo: cierre de #rev-alberdi-formacion`), insertó 86 líneas, y el total pasó de 1591 a 1677 líneas. Data-certeza subió de 45 a 50; reveal count de 65 a 70. Los archivos temporales fueron eliminados.

Observación notable: el DOM del browser (Playwright) mostró un stale value para `--reveal-delay` de BIOG-13 (80ms en vez de 160ms). Un `fetch()` en el browser y `grep` en disco confirmaron que el archivo en disco y la respuesta HTTP son correctos (160ms). Es un artefacto del caching interno de Playwright, no un error de contenido.

**T03 — Triple gate y cierre de M007:** Las tres capas del gate pasaron 10/10 checks:
- Capa 1 (6 shell checks): data-certeza=50 ✅, keywords=9 ✅, card-nota-certeza=15 ✅, BIOG-1[2-6]=5 ✅, Node gate exit 0 ✅, git diff vacío ✅ (T02 committed automáticamente — verificado con `git show --stat HEAD`).
- Capa 2 (4 browser DOM checks): reveal=70 ✅, SubNav 5/5 ✅, #rev-alberdi-formacion[data-certeza]=16 ✅, .card-nota-certeza=16 ✅. Nota: `console.debug` de app.js no es capturado por Playwright; se usó `browser_evaluate` para las queries DOM equivalentes.
- Capa 3 (7 coherencia narrativa): BIOG-12 no contradice SP2-2 ✅; BIOG-13 cubre período distinto a BIOG-8 ✅; BIOG-14 usa piano (consistente con BIOG-7) ✅; BIOG-15 cubre obra distinta a las Bases ✅; BIOG-16 ángulo propio (no repite alberdi-quotes) ✅; puente narrativo intacto en posición correcta ✅; sin regresiones en el sitio completo ✅.

Apéndice T03 añadido a S04-CONTENT-DRAFT.md con tabla de resultados de las 3 capas.

## Verification

```
=== Slice-level shell checks ===
grep -c 'data-certeza' index.html                    → 50 ✅ (≥50)
grep -c 'card-nota-certeza' index.html               → 15 ✅ (≥13; DOM=16)
grep -c 'BIOG-1[2-6]' index.html                     → 5 ✅ (≥5)
grep keywords | wc -l                                → 9 ✅ (≥4)
node -e "...n<50→exit(1)..."                         → OK:50, exit 0 ✅
git diff --name-only                                 → (vacío — T02 committed) ✅

=== Browser DOM ===
document.querySelectorAll('.reveal').length          → 70 ✅ (≥70)
SubNav: 5 sub-periods, 5 links                       → ✅ (invariante)
#rev-alberdi-formacion [data-certeza]                → 16 ✅ (≥16)
.card-nota-certeza                                   → 16 ✅ (≥13)

=== Coherencia narrativa (7/7) ===
BIOG-12..16 sin contradicciones con BIOG-1..11      → ✅
Puente narrativo intacto y en posición              → ✅
Sin regresiones coloniali/revolución/nacional        → ✅

=== Artifact checks ===
S04-CONTENT-DRAFT.md existe, ≥237 líneas            → ✅
Apéndice T03 en S04-CONTENT-DRAFT.md               → ✅
```

## New Requirements Surfaced

- none — S04 completa requerimientos existentes; no emergieron nuevos durante la ejecución.

## Deviations

1. **Guitarra → Piano en BIOG-14**: el plan de T01 especificaba "método de guitarra de 1832". Todas las fuentes consultadas dicen piano. La card usa piano (correcto); la afirmación de guitarra no tiene fuente y se marcó con `[VERIFICAR ATRIBUCIÓN]`.

2. **Alberdi no co-fundó El Iniciador**: el plan implicaba co-fundación. Los fundadores fueron Andrés Lamas y Miguel Cané (padre). La card usa "colaboró activamente" y "fue su más prolífico colaborador".

3. **card-nota-certeza adicional en BIOG-14**: el plan anticipaba una nota (composiciones). La investigación reveló que el instrumento mismo era incorrecto en el plan, resultando en dos notas en BIOG-14 en vez de una.

4. **git diff vacío en T03**: a diferencia de S01–S03, T02 fue committed automáticamente antes de T03. Se verificó con `git show --stat HEAD` que únicamente `index.html` y `S04-PLAN.md` fueron modificados en el último commit.

## Known Limitations

- El "primer método de piano publicado en el Río de la Plata" no fue verificado en ninguna fuente primaria — la afirmación está marcada con card-nota-certeza y ausente del texto principal de BIOG-14. Si una fuente primaria la confirma en el futuro, se puede eliminar la nota.
- Las composiciones musicales propias de Alberdi (títulos específicos) no fueron encontradas en fuentes verificables — marcadas con card-nota-certeza. Fuente sugerida: archivo del Instituto Juan Bautista Alberdi (institutojuanbautistaalberdi.net.ar).
- IntersectionObserver no dispara en Playwright headless — el reveal-on-scroll de las 5 cards no se verificó con animación real. Se verificó que las clases `reveal reveal-slide` están correctas en el HTML. La animación en browser real es correcta por construcción.

## Follow-ups

- Si una fuente primaria verifica "primer método de piano/guitarra publicado en el Río de la Plata", eliminar la card-nota-certeza de BIOG-14 y actualizar el texto.
- Si títulos de composiciones musicales de Alberdi se verifican, reemplazar la card-nota-certeza de composiciones en BIOG-14 por texto factual.
- S05 arranca donde S04 termina: el perfil completo de Alberdi está en el sitio (16 bloques) — S05 puede anclar el encuentro con Quiroga como un evento posterior a este perfil establecido.

## Files Created/Modified

- `index.html` — 5 cards temáticas BIOG-12..16 integradas en `#rev-alberdi-formacion` antes del `<!-- Puente narrativo -->`; data-certeza subió de 45 a 50; 86 nuevas líneas en CRLF
- `.gsd/milestones/M007/slices/S04/S04-CONTENT-DRAFT.md` — borrador verificado con 5 bloques BIOG-12..16, 237+ líneas, fuentes documentadas, notas de certeza, Apéndice T03

## Forward Intelligence

### What the next slice should know

- **El ancla de inserción post-S04** para futuros bloques en `#rev-alberdi-formacion` es el comentario `<!-- Puente narrativo: cierre de #rev-alberdi-formacion` (ahora en línea ~724 post-S04). Las 5 cards temáticas están ANTES de este ancla. S05 (Quiroga) probablemente abre un nuevo sub-período — verificar si va dentro de `#rev-alberdi-formacion` o abre un sub-período propio.
- **Los 6 alberdi-quote existentes** en el sitio cubren: "Gobernar es poblar" (Bases), el exilio, las *Bases* como destino de Rosas, el viaje a Buenos Aires, la Constitución, y el puente narrativo "Los pueblos, como los hombres, no tienen alas...". BIOG-16 (exilio como condición de escritura) es un ángulo nuevo — sin superposición. Cualquier card sobre Quiroga debe revisar estos 6 antes de citar a Alberdi directamente.
- **El `data-certeza` baseline es 50 post-S04.** Cualquier verificación de S05+ debe ajustar el mínimo (≥50 + N_nuevas_cards).
- **El reveal count baseline es 70 post-S04.** Mismo ajuste necesario para S05+.

### What's fragile

- **card-nota-certeza count (grep vs DOM)**: `grep -c` da 15 (líneas), DOM da 16 (spans). Este discrepancia es estable y documentada — ambos superan ≥13. Futuros agents: usar la query DOM como referencia canónica, no grep.
- **Playwright caching de DOM**: el DOM leído directamente por Playwright puede tener stale values para CSS custom properties. Usar `fetch()` o grep en disco para verificar valores de atributos de contenido.

### Authoritative diagnostics

- `grep -c 'data-certeza' index.html` → 50 — métrica primaria más confiable post-S04
- `grep -c 'BIOG-1[2-6]' index.html` → 5 — confirma que las 5 cards temáticas están presentes
- `document.querySelectorAll('#rev-alberdi-formacion [data-certeza]').length` en DevTools → 16 — confirma los 16 bloques Alberdi en el sub-período correcto
- `grep -n 'multifacético\|BIOG-1[2-6]' index.html` → líneas 631–713 — localización exacta del bloque temático

### What assumptions changed

- **"Alberdi co-fundó El Iniciador"** → lo fundaron Andrés Lamas y Miguel Cané; Alberdi fue el colaborador más prolífico desde el primer número.
- **"El método musical de 1832 es para guitarra"** → es para piano; la afirmación de guitarra no tiene fuente verificable en ninguna base académica consultada.
- **"git diff mostrará index.html"** → en worktrees donde T02 se commitea automáticamente, git diff es vacío en T03; usar git show --stat HEAD para confirmar que solo index.html cambió.
- **"console.debug de app.js es capturado por Playwright"** → no lo es; usar browser_evaluate con queries DOM equivalentes para verificar las mismas condiciones de inicialización.
