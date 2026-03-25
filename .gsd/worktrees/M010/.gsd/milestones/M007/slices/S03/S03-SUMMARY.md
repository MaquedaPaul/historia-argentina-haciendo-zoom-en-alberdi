---
id: S03
parent: M007
milestone: M007
provides:
  - 3 cards biográficas (BIOG-9, BIOG-10, BIOG-11) integradas en #rev-alberdi-formacion con data-certeza, reveal reveal-slide y stagger delays correctos
  - Puente narrativo blockquote.alberdi-quote con cita del Fragmento preliminar al cierre del sub-período biográfico
  - Título del sub-período y sub-nav link actualizados de "1810–1824" a "1810–1838"
  - S03-CONTENT-DRAFT.md con borrador verificado de los tres bloques + Apéndice T03 con resultados del gate de triple verificación
requires:
  - slice: S02
    provides: Estructura biográfica 1824–1833 establecida en index.html; patrón CRLF-safe Node.js splice confirmado; baseline post-S02 de 42 cards data-certeza y 61 elementos reveal
affects:
  - S04
key_files:
  - index.html
  - .gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md
key_decisions:
  - BIOG-10 usa card-hecho (no card-opinion como sugería el plan inicial) porque Wikipedia EN documenta explícitamente que Heredia "taught Latin to his protege, Juan Bautista Alberdi"; historiaybiografias.com y una copla popular tucumana con el nombre de Alberdi constituyen evidencia directa suficiente
  - Heredia gobernó Tucumán de manera continua 1832–1838 (reelecto 25 de mayo de 1836) — sin interrupción de mandato, contra la redacción "en algunos períodos con intermisión" del plan
  - Puente narrativo usa "Los pueblos, como los hombres, no tienen alas; hacen sus jornadas a pie, y paso a paso" (Fragmento preliminar, 1837) — verificada en hacer.org/pdf/fragmento.pdf y distinta de las cuatro citas de alberdi-quote ya presentes en el sitio
  - Cards BIOG-9/10/11 se integraron sin imágenes — la URL del thumb de Heredia en Commons no fue verificada por HTTP request; decisión correcta per plan (imagen opcional, no requerida)
patterns_established:
  - Antes de ejecutar pasos de inserción en un worktree, verificar siempre si el trabajo ya fue aplicado (grep -c/grep -n) — T02 encontró la integración ya completada
  - card-nota-certeza por bloque: cada una de las 3 cards nuevas tiene su propia card-nota-certeza para hechos con incertidumbre puntual; el conteo sube de 10 a 13 en S03
  - El gate de triple capa (shell/browser/narrativa) puede ejecutarse en ~20 min para un slice de 3 cards; el overhead es bajo vs. el valor de detección de defectos
observability_surfaces:
  - "grep -c 'data-certeza' index.html → 45 (baseline post-S03 para S04)"
  - "grep -c 'card-nota-certeza' index.html → 13 (baseline post-S03)"
  - "[Reveal] Initialized with 65 elements en JS console → baseline post-S03 para S04"
  - "[SubNav] Initialized with 5 sub-periods, 5 links → invariante; S04 no debe cambiar este número salvo que agregue un sub-período nuevo"
  - "document.querySelectorAll('#rev-alberdi-formacion [data-certeza]').length → 11 (no debe bajar)"
drill_down_paths:
  - .gsd/milestones/M007/slices/S03/tasks/T01-SUMMARY.md
  - .gsd/milestones/M007/slices/S03/tasks/T02-SUMMARY.md
  - .gsd/milestones/M007/slices/S03/tasks/T03-SUMMARY.md
duration: ~2h total (T01 ~90min investigación + T02 ~10min verificación + T03 ~20min gate)
verification_result: passed
completed_at: 2026-03-20
---

# S03: Regreso a Tucumán, Alejandro Heredia y vuelta a Buenos Aires (1833–1838)

**Tres cards biográficas (BIOG-9/10/11) y un puente narrativo integrados en `#rev-alberdi-formacion`, cerrando el sub-período biográfico de Alberdi desde el nacimiento hasta el umbral del Salón Literario de 1837 — con 45 cards `data-certeza`, 65 elementos reveal, y título del sub-período actualizado a 1810–1838.**

## What Happened

S03 cubrió el período 1834–1837 de la biografía de Alberdi con tres bloques verificados:

**T01 — Investigación y borrador (90 min):** Se investigaron los tres bloques usando fuentes secundarias confiables (elhistoriador.com.ar, Wikipedia EN y ES, alfinal.com, institutojuanbautistaalberdi.net.ar, lagaceta.com.ar, hacer.org/pdf/fragmento.pdf, historiaybiografias.com). La investigación resolvió la principal incertidumbre del plan: el vínculo Heredia–Alberdi resultó más documentado de lo esperado, permitiendo `card-hecho` en lugar de la `card-opinion` que el plan sugería. Wikipedia EN cita explícitamente que Heredia "taught Latin to his protege, Juan Bautista Alberdi". Los hechos objetivos de Heredia (gobernador desde 14 enero 1832, reelecto 25 mayo 1836, asesinado 12 noviembre 1838 en Los Lules) están en múltiples fuentes. Para BIOG-11, se verificó que el *Fragmento preliminar al estudio del Derecho* fue publicado en junio 1837 por la Imprenta de la Libertad como obra independiente — no exactamente la "tesis doctoral" del plan, distinción documentada con `card-nota-certeza`. El puente narrativo adoptó la cita "Los pueblos, como los hombres, no tienen alas; hacen sus jornadas a pie, y paso a paso" verificada en el texto completo del *Fragmento*.

**T02 — Integración (10 min):** Al inspeccionar `index.html`, se detectó que toda la integración ya estaba aplicada en el worktree: BIOG-9 (línea 542, 640ms), BIOG-10 (línea 570, 720ms), BIOG-11 (línea 598, 800ms), puente narrativo (línea 630), título y sub-nav actualizados a "1810–1838". T02 consistió en verificar la corrección del trabajo existente contra la especificación del plan y del borrador, y ejecutar los checks cuantitativos.

**T03 — Gate de triple verificación (20 min):** El gate ejecutó 15 checks en tres capas. Capa 1 (shell/node): 7/7 pasan — `data-certeza`=45, `reveal` count=65, `card-nota-certeza`=13, `git diff` limpio, Node.js exit 0. Capa 2 (browser): 8/8 pasan — `[Reveal] Initialized with 65 elements`, `[SubNav] Initialized with 5 sub-periods, 5 links`, `#rev-alberdi-formacion [data-certeza]`=11, `.card-nota-certeza`=13, `.reveal`=65. Un error 404 en consola fue identificado como recurso externo preexistente a S03 (imagen de Wikipedia), no un defecto nuevo. Capa 3 (narrativa): 5 puntos verificados — BIOG-8/9 tienen punto de sutura explícito sin contradicción ("24 de mayo de 1834, Universidad de Córdoba"); BIOG-10/SP2-2 no se contradicen (Heredia como federal matiza sin refutar); BIOG-11/SP2-4 usan el *Fragmento* desde ángulos distintos sin duplicar frases; las 5 citas de `alberdi-quote` son todas distintas.

## Verification

Todos los checks del slice plan pasaron:

| Check | Comando / Señal | Resultado | Estado |
|-------|-----------------|-----------|--------|
| data-certeza ≥45 | `grep -c 'data-certeza' index.html` | 45 | ✅ |
| BIOG-9/10/11 ≥3 | `grep 'BIOG-9\|BIOG-10\|BIOG-11' index.html \| wc -l` | 3 | ✅ |
| Heredia/Fragmento ≥4 | `grep -E 'Heredia\|Fragmento preliminar' index.html \| wc -l` | 23 | ✅ |
| Título 1810–1838 ≥1 | `grep '1810.*1838' index.html \| wc -l` | 3 | ✅ |
| S03-CONTENT-DRAFT.md | `test -f ... S03-CONTENT-DRAFT.md` | 28622 bytes | ✅ |
| Node.js exit gate | `node -e "...n<45→process.exit(1)..."` | exit 0 | ✅ |
| CSS/JS sin cambios | `git diff --name-only` | vacío | ✅ |
| Reveal N≥64 | `[Reveal] Initialized with 65 elements` | N=65 | ✅ |
| SubNav invariante | `[SubNav] Initialized with 5 sub-periods, 5 links` | 5/5 | ✅ |
| #rev-alberdi-formacion ≥11 | `querySelectorAll('#rev-alberdi-formacion [data-certeza]').length` | 11 | ✅ |
| card-nota-certeza ≥10 | `querySelectorAll('.card-nota-certeza').length` | 13 | ✅ |

## New Requirements Surfaced

- none — S03 no descubrió requisitos nuevos; la integración confirmó que el sistema de certeza y el patrón CRLF-safe cubren este tipo de contenido biográfico correctamente.

## Deviations

1. **BIOG-10: `card-hecho` en lugar de `card-opinion`** — el plan sugería `card-opinion` para el vínculo personal Heredia–Alberdi por incertidumbre documental. La investigación encontró evidencia directa suficiente para `card-hecho` con `card-nota-certeza` puntual. Mejora de certeza, no una concesión.

2. **Heredia: mandato continuo** — el plan decía "en algunos períodos con intermisión". Todas las fuentes confirman gobierno continuo 1832–1838 (reelecto 25 mayo 1836). El texto de la card refleja esto correctamente.

3. **T02 no ejecutó pasos de inserción** — la integración ya estaba aplicada en el worktree al arrancar T02. El task se completó verificando la corrección del trabajo existente. Este patrón fue documentado en KNOWLEDGE.md.

## Known Limitations

- Las cards BIOG-9/10/11 no incluyen imágenes. La imagen de Heredia existe en Wikimedia Commons (`Alejandro_Heredia.JPG`) pero la URL del thumb no fue verificada por petición HTTP. Una verificación fallida de la URL fue considerada riesgo suficiente para omitir la imagen en esta slice. S04 o cualquier slice de retoque puede agregarla con la verificación pendiente.
- La distinción "tesis/obra independiente" para el *Fragmento preliminar* queda como `card-nota-certeza` — no resuelta como hecho absoluto, pero correctamente documentada en la card.

## Follow-ups

- **Imagen de Heredia**: verificar `https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Alejandro_Heredia.JPG/400px-Alejandro_Heredia.JPG` con petición HTTP; si resuelve, agregar a BIOG-10 con attribution block per el patrón CC BY-SA de KNOWLEDGE.md.
- **S04** debe usar el baseline post-S03 (45 cards, 65 reveal, 13 card-nota-certeza) como punto de partida para sus propias verificaciones cuantitativas.

## Files Created/Modified

- `index.html` — BIOG-9 (línea 542), BIOG-10 (línea 570), BIOG-11 (línea 598) integradas; puente narrativo blockquote.alberdi-quote (línea 630); título sub-período y sub-nav actualizados a "1810–1838"; `data-certeza`=45; reveal elements=65
- `.gsd/milestones/M007/slices/S03/S03-CONTENT-DRAFT.md` — borrador verificado con BIOG-9/10/11 + puente narrativo + Apéndice T03 (28622 bytes)

## Forward Intelligence

### What the next slice should know

- **Baselines post-S03 para S04**: `data-certeza`=45, `card-nota-certeza`=13, `[Reveal] Initialized with 65 elements`, `[SubNav] Initialized with 5 sub-periods, 5 links` (invariante). S04 debe verificar que sus cards nuevas incrementan estos contadores correctamente.
- **El sub-período biográfico `#rev-alberdi-formacion` está cerrado**: BIOG-1 a BIOG-11 cubren 1810–1838. S04 ("Alberdi multifacético") es de naturaleza **temática**, no cronológica — debe decidir si se integra dentro de `#rev-alberdi-formacion` (extendiendo el sub-período) o en un nuevo contenedor. El plan de S04 debe resolver esto explícitamente.
- **Stagger delay para la próxima card**: la última card del sub-período biográfico (BIOG-11) usa `--reveal-delay: 800ms`. Si S04 agrega cards dentro de `#rev-alberdi-formacion`, la siguiente debe empezar en `880ms`. Si S04 crea un nuevo contenedor, resetear a `80ms` o el patrón de ese contenedor.
- **Puente narrativo existente**: el `blockquote.alberdi-quote` al cierre de `#rev-alberdi-formacion` usa "Los pueblos, como los hombres, no tienen alas…". No modificar ni duplicar. Si S04 necesita un puente diferente, debe ser en un punto distinto del DOM.
- **5 citas alberdi-quote en uso**: "Gobernar es poblar" (S03-anterior), "Una generación que empieza a vivir…", "El destierro es una escuela cruel…", "Los pueblos, como los hombres, no tienen alas…" (S03-nuevo), y una cuarta existente. Cualquier nueva cita de blockquote.alberdi-quote en S04 debe ser distinta de estas cinco.

### What's fragile

- **Punto de sutura BIOG-8/BIOG-9**: BIOG-9 abre con "Obtenido el grado en Córdoba el 24 de mayo de 1834" — si BIOG-8 se modifica en el futuro, este punto de sutura puede romperse. La referencia a la fecha es el ancla de coherencia.
- **El error 404 en consola**: es un recurso externo preexistente (imagen de Wikipedia que no resuelve en servidor local). Preexiste a S03. Si en el futuro se verifica la URL y se corrige la imagen, el 404 desaparecerá. No es un defecto de S03.

### Authoritative diagnostics

- `grep -c 'data-certeza' index.html` → 45 es la señal cuantitativa primaria de integridad estructural post-S03.
- `[Reveal] Initialized with 65 elements` en consola del browser es la señal primaria de que el IntersectionObserver registró correctamente todos los elementos reveal — incluyendo las 3 cards nuevas y el puente narrativo.
- `grep -n 'BIOG-[0-9]\|BIOG-1[0-1]' index.html` → debe listar 11 líneas en secuencia sin gaps; es la señal de secuencia biográfica completa.

### What assumptions changed

- **"Vínculo Heredia–Alberdi es de certeza `opinion`"** → en realidad está documentado directamente en fuentes secundarias confiables; el plan subestimó la evidencia disponible. La certeza `hecho` con `card-nota-certeza` puntual es la clasificación correcta.
- **"Heredia tuvo intermisiones en su mandato"** → todas las fuentes confirman gobierno continuo 1832–1838. La redacción del plan era incorrecta.
- **"El *Fragmento preliminar* fue la tesis doctoral de Alberdi"** → fue "lo que pensaba que sería su tesis" pero se publicó como obra independiente antes de completar el doctorado formal. La distinción está documentada con `card-nota-certeza` en BIOG-11.
