---
id: S01
parent: M007
milestone: M007
provides:
  - Sub-período biográfico #rev-alberdi-formacion integrado en index.html con 4 cards verificadas (nacimiento, hermanos/madre, posición ante Mayo, doble orfandad)
  - Sub-nav link href="#rev-alberdi-formacion" como primer elemento del nav (5 links totales, era 4)
  - S01-CONTENT-DRAFT.md con 4 bloques, ≥2 fuentes por bloque, flags epistémicos documentados, y corrección del error histórico del M007-CONTEXT (padre murió en 1822, no 1824)
  - Apéndice T03 en S01-CONTENT-DRAFT.md: tabla de auditoría de flags card-nota-certeza con líneas HTML, incertidumbres activas, y fuentes primarias necesarias para resolución futura
requires: []
affects:
  - S02 (continuación cronológica biográfica; consume estructura y ubicación de inserción en index.html)
key_files:
  - index.html
  - .gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md
key_decisions:
  - "Fecha de muerte del padre Salvador Alberdi es 1822 (no 1824): el M007-CONTEXT tenía un error. 1824 es cuando Alberdi llegó a Buenos Aires. Todas las fuentes biográficas consultadas coinciden en 'a los once años' o explícitamente '1822'."
  - "Bloque 3 (posición de Mayo) se mapea como card-opinion con blockquote+atribución a Botana (1984): la reflexión crítica adulta de Alberdi sobre Mayo es una lectura historiográfica establecida, no una cita directa verificable del Fragmento preliminar (1837). Usar card-hecho hubiera sido una sobreclasificación."
  - "Hermanos Felipe y Tránsita son los únicos con nombre verificado en fuentes secundarias accesibles; 2 hermanos adicionales quedan sin nombre (marcados [INCIERTO]) hasta que se consulte Mayer, Alberdi y su tiempo (EUDEBA, 1963)."
  - "Stagger 0/80/160/240ms para 4 cards dentro de events-grid--certeza: patrón de S01 reutilizable para cualquier sub-período biográfico nuevo dentro de #periodo-revolucion."
patterns_established:
  - "Patrón card-nota-certeza inline para incertidumbres epistemológicas dentro de cards que son 'hecho' en su estructura pero contienen una fecha o dato no confirmado contra fuente primaria."
  - "Patrón de Apéndice de auditoría epistémica en el CONTENT-DRAFT: tabla [Card | Línea HTML | Flag activo | Qué lo resolvería] — reutilizable en slices de contenido biográfico futuro."
  - "Sub-período biográfico como primer elemento de la sub-nav, antes de los sub-períodos cronológicos históricos — la posición cronológica (1810–1824) lo hace coherente con el orden narrativo del sitio."
  - "Logs de consola JS como señales de observabilidad de primera clase: [SubNav] Initialized with N sub-periods confirma registro del link; [Reveal] Initialized with N elements confirma elementos reveal registrados; [Reveal] Revealed: div#id confirma reveal-fade del sub-período."
observability_surfaces:
  - "grep -c 'data-certeza' index.html → 38 (baseline S01 completo)"
  - "grep -c 'card-nota-certeza' index.html → 4 (3 en rev-alberdi-formacion: líneas 379, 407, 429; 1 preexistente línea 1326)"
  - "grep -n 'BIOG-' index.html → líneas 348, 369, 391, 418 (comentarios identificadores de las 4 cards)"
  - "grep -n 'rev-alberdi-formacion' index.html → líneas 327 (sub-nav), 337 (comentario), 344 (div-open), 442 (div-close)"
  - "node -e \"const h=require('fs').readFileSync('index.html','utf8'); const m=h.match(/data-certeza/g); console.log('data-certeza count:', m?m.length:0);\" → 38"
  - "Consola JS: [SubNav] Initialized with 5 sub-periods, 5 links (era 4 pre-S01)"
  - "Consola JS: [Reveal] Initialized with 57 elements (era 52 pre-S01)"
  - "Consola JS: [SubNav] Active sub-period → rev-alberdi-formacion (confirma scroll-spy)"
  - "Consola JS: [Reveal] Revealed: div#rev-alberdi-formacion.sub-period.reveal--visible"
drill_down_paths:
  - .gsd/milestones/M007/slices/S01/tasks/T01-SUMMARY.md
  - .gsd/milestones/M007/slices/S01/tasks/T02-SUMMARY.md
  - .gsd/milestones/M007/slices/S01/tasks/T03-SUMMARY.md
duration: ~80 min (T01: ~45min, T02: ~15min, T03: ~20min)
verification_result: passed
completed_at: 2026-03-20
---

# S01: Infancia, familia y años formativos (1810–1824)

**4 cards biográficas de Alberdi integradas en index.html dentro del nuevo sub-período #rev-alberdi-formacion, con data-certeza=38 confirmado, sub-nav funcional (5 links), reveal-on-scroll operativo, y un error histórico del M007-CONTEXT corregido (padre murió en 1822, no 1824).**

## What Happened

S01 se ejecutó en tres tareas secuenciales: investigación + borrador → integración HTML → verificación diagnóstica.

**T01 — Investigación y borrador:** Se investigaron los 4 bloques biográficos en fuentes secundarias (Wikipedia EN, Infobae, El Tucumano, elhistoriador.com.ar, JURSOC UNLP, elpensante.com, Botana 1984). El hallazgo crítico fue la corrección del error en M007-CONTEXT: el planificador había escrito que el padre murió "en 1824" — date que en realidad corresponde a la llegada de Alberdi a Buenos Aires. Todas las fuentes externas consultadas dicen "a los once años" (≈1821–1822) o explícitamente "1822". El draft documentó este error y alertó a T02 para no propagarlo.

El borrador estableció certeza clara para los 4 bloques: nacimiento y padre (hecho, ≥5 fuentes), hermanos y madre (hecho con nota de discrepancia sobre fecha de muerte materna), posición ante Mayo (opinión historiográfica atribuida a Botana 1984 — no hay cita directa verificable de Alberdi), y doble orfandad (hecho con nota sobre la fecha 1822 no cotejada contra *Mi vida privada*).

**T02 — Integración HTML:** El sub-período biográfico se insertó como primer elemento de la sub-nav (link `#rev-alberdi-formacion`) y como bloque `<div id="rev-alberdi-formacion" class="sub-period reveal reveal-fade">` inmediatamente antes de `#rev-1800-1820`. Las 4 cards se integraron dentro de `events-grid events-grid--certeza` con stagger 0/80/160/240ms. No se añadió CSS ni JS nuevo. El data-certeza count subió de 34 a 38 exactamente.

**T03 — Verificación diagnóstica:** Gate de salida sin correcciones. Todos los checks numéricos confirmados. Revisión histórica directa del HTML: fechas correctas, nombres correctos, atribución de citas correcta, ninguna paráfrasis presentada como cita directa. Browser: sub-nav muestra "1810–1824 / Infancia y Formación" como primer link, smooth scroll al sub-período funcional, reveal-on-scroll activo (57 elementos vs. 52 pre-S01), scroll-spy del sub-nav activa correctamente `rev-alberdi-formacion`. Los 3 nuevos flags `card-nota-certeza` se documentaron en el Apéndice T03 del CONTENT-DRAFT con tabla de auditoría.

## Verification

Todos los checks del slice-level verification pasaron:

| Check | Comando | Resultado | Criterio |
|-------|---------|-----------|----------|
| V1 | `grep -c 'data-certeza' index.html` | **38** | ≥38 ✅ |
| V2 | `grep -q 'rev-alberdi-formacion' index.html && echo PASS` | **PASS** | PASS ✅ |
| V3 | `grep 'Salvador.*Alberdi\|Belgrano\|1810.*Tucumán\|Josefa.*Aráoz' index.html \| wc -l` | **16** | ≥2 ✅ |
| V4 | `test -f S01-CONTENT-DRAFT.md && grep -c "^## Bloque" ...` | **4** | ≥4 ✅ |
| V5 | `node -e "...data-certeza count..."` | **38** | =38 ✅ |
| V6 | `grep -c 'card-nota-certeza' index.html` | **4** | ≥1 ✅ |
| V7 | `grep -q 'href="#rev-alberdi-formacion"' index.html && echo SUB-NAV-OK` | **SUB-NAV-OK** | PASS ✅ |
| V8 | Browser: `#rev-alberdi-formacion` selector visible | **visible** | ✅ |
| V9 | Browser console: `[Reveal] Initialized with 57 elements` | **57** | >52 ✅ |
| V10 | Browser console: `[SubNav] Initialized with 5 sub-periods` | **5** | >4 ✅ |

## New Requirements Surfaced

- none

## Deviations

**Corrección de error histórico (no contemplada, pero dentro del alcance del plan):** El M007-CONTEXT afirmaba que el padre de Alberdi murió "en 1824". Las fuentes externas consultadas contradicen esto consistentemente. El plan pedía verificar fechas — la corrección es exactamente lo que el proceso de verificación debe hacer. La desviación es que T01 encontró un error en el propio documento de planificación, no en la historia.

**No se accedió a *Mi vida privada* directamente:** El plan lo listaba como fuente primaria preferida. Las fuentes secundarias que citan *Mi vida privada* proveen consistencia suficiente para los hechos más básicos. Los items que requieren fuente primaria están marcados con `card-nota-certeza` y documentados en el Apéndice T03.

## Known Limitations

- **Fecha exacta de muerte de la madre (Josefa Rosa de Aráoz):** Las fuentes discrepan entre "al momento del parto" y "siete meses más tarde". Cubierta con `card-nota-certeza` en BIOG-2. Necesita cotejo directo con *Mi vida privada* (Alberdi, ca. 1872–82).
- **Cita directa de Alberdi sobre los límites de Mayo:** No existe cita verificada del *Fragmento preliminar* (1837) en esta investigación. BIOG-3 usa lectura historiográfica (Botana 1984) con certeza `opinión` y `card-nota-certeza`.
- **Nombres de los 2 hermanos sin identificar:** Felipe y Tránsita son los únicos con nombre en fuentes secundarias accesibles. Los otros dos hermanos permanecen como [INCIERTO]. Mayer, *Alberdi y su tiempo* (EUDEBA, 1963) podría resolverlo.
- **Fecha de muerte del padre (1822) sin cotejo primario:** Aceptada como "ca. 1822" con `card-nota-certeza` inline.
- **No hay imagen del padre Salvador Alberdi:** T02 no buscó imagen en Wikimedia. BIOG-1 y BIOG-4 no tienen card-image — esto es coherente con el patrón de cards textuales para hechos sin imagen verificada disponible, pero es un gap respecto al estilo visual del resto del sitio.

## Follow-ups

- **S02 debe continuar desde donde termina BIOG-4:** "convirtiendo una doble orfandad en el comienzo de una historia extraordinaria" → el viaje a Buenos Aires en 1824 es el arranque natural de S02.
- **Buscar imagen pública de Salvador Alberdi** en Wikimedia o archivos provinciales de Tucumán — si existe, añadir a BIOG-1 como retroalimentación a S01 o como parte de S02.
- **Resolver cita directa de Alberdi sobre Mayo** accediendo a *Fragmento preliminar* (1837) o *Escritos póstumos* t. XV — si se encuentra, BIOG-3 puede actualizarse de `card-opinion` a `card-hecho` con blockquote primario.

## Files Created/Modified

- `index.html` — Añadido sub-nav link `#rev-alberdi-formacion` (línea 327); insertado sub-período biográfico `<div id="rev-alberdi-formacion">` (líneas 344–442) con 4 cards BIOG-1 a BIOG-4 antes de `#rev-1800-1820`.
- `.gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md` — Creado en T01 con 4 bloques verificados; actualizado en T03 con Apéndice de auditoría epistémica.
- `.gsd/KNOWLEDGE.md` — Dos entradas añadidas en T01 y T03: "Alberdi's Father Death Date: Context Error vs. Sources" y "Browser Console JS Logs as First-Class Observability Signals".

## Forward Intelligence

### What the next slice should know

- **La estructura biográfica ahora precede cronológicamente a los sub-períodos históricos en el HTML.** El nuevo sub-período `#rev-alberdi-formacion` (líneas 344–442) está antes de `#rev-1800-1820`. S02 debe insertar su contenido **después** de `#rev-alberdi-formacion` y **antes** de `#rev-1800-1820`, o bien dentro de un nuevo sub-período `#rev-alberdi-bsas-1824` inmediatamente después. El sub-nav ya tiene el link de S01 como primer elemento — S02 debería añadir un segundo link biográfico.
- **El patrón de 4 cards con stagger 0/80/160/240ms dentro de `events-grid--certeza` es el template establecido.** Reutilizarlo directamente para el siguiente bloque biográfico.
- **Felipe Alberdi ya está mencionado como tutor y gestor de la beca** en BIOG-4. S02 puede continuar su rol narrativo sin re-introducirlo.
- **El error de fecha del M007-CONTEXT (1824 para muerte del padre)** está documentado en KNOWLEDGE.md. No es necesario reinvestigarlo.
- **El data-certeza baseline post-S01 es 38.** La verificación de S02 debe partir de este número y confirmar que subió en (N cards de S02).

### What's fragile

- **BIOG-3 como `card-opinion`** — si un agente futuro encuentra una cita directa verificada de Alberdi sobre los límites de Mayo en el *Fragmento preliminar* (1837), BIOG-3 debería actualizarse a `card-hecho` con blockquote primario. La clasificación actual es conservadora pero puede ser reemplazada por evidencia más directa.
- **Sub-nav position con más links:** El sub-nav de `#periodo-revolucion` ya tiene 5 links (1 biográfico + 4 históricos). Si S02 añade un segundo link biográfico, el nav tendrá 6 — verificar en mobile que no se desborda.

### Authoritative diagnostics

- `grep -n 'BIOG-' index.html` → lista las 4 cards por comentario identificador — el punto de inicio más rápido para localizar el bloque S01 en el HTML.
- `grep -n 'rev-alberdi-formacion' index.html` → líneas 327, 337, 344, 442 — delimita exactamente el bloque biográfico de S01.
- `document.querySelectorAll('#rev-alberdi-formacion [data-certeza]')` en DevTools → retorna las 4 cards; si retorna menos, hay un error de integración.
- Consola JS `[SubNav] Initialized with 5 sub-periods, 5 links` — si el número no es 5 después de S01, el sub-nav JS no registró el nuevo link.

### What assumptions changed

- **"El padre murió en 1824" (M007-CONTEXT)** — falso. Murió ca. 1822. 1824 es la llegada a Buenos Aires. El error estaba en el contexto de planificación del milestone.
- **"Las fuentes nombraran a todos los hermanos"** — solo Felipe y Tránsita están documentados en fuentes secundarias accesibles. Los otros dos hermanos son [INCIERTO].
- **"card-nota-certeza podría no aparecer" (si todo se verificaba)** — 3 de las 4 cards tienen flags epistémicos activos. Las incertidumbres biográficas de Alberdi son más numerosas de lo esperado para el período 1810–1824.
