---
id: M019
provides:
  - 4 cards card-hecho (M019-1..4) en #rev-1852-1860 cubriendo Caseros → Revolución del 11 de Septiembre de 1852
  - Veredicto definitivo sobre la "escena Mitre-Urquiza": sin fuente directa, no incluida como card
  - Citas textuales primarias verificadas de Mitre (21 jun 1852) y Urquiza (24 jun 1852) integradas con blockquote
  - Stagger SP4-1..5 ajustado a 320ms–640ms para mantener cascada visual
key_decisions:
  - La "escena Mitre-Urquiza" no se incluye como card — investigación S01 confirmó que no existe fuente historiográfica de negociación privada; el arco político documentado (aliados en Caseros → enemigos en septiembre) se narra como hecho (cierra D067)
  - Reutilizar imágenes ya presentes en index.html (retrato Mitre 1861, retrato Urquiza, mapa Argentina/BsAs) en lugar de buscar URLs nuevas — sin riesgo de 404 y coherente con el grid existente
  - El Borrador Elizalde (ca. marzo–abril 1852, Archivo Elizalde, documentado por Cassagne 2023) se descarta como evidencia de la "escena" porque es una propuesta institucional, no una conversación personal
patterns_established:
  - Comentario HTML inline <!-- data-certeza="hecho" --> como gancho de verificación grep en archivos markdown de draft — patrón transferible a cualquier slice con content draft
  - Veredicto explícito sobre hipótesis sin fuente directa antes de las cards en el draft — patrón para cualquier slice que investigue "escenas" con evidencia débil
  - card-hecho con blockquote.card-opinion__quote combinando ambas clases en un mismo artículo (hechos documentados con cita textual del acta primaria)
observability_surfaces:
  - grep -c "M019-[1-4]" index.html → 4
  - grep -A3 "SP4-1" index.html | grep "reveal-delay" → 320ms
  - grep -A3 "SP4-5" index.html | grep "reveal-delay" → 640ms
  - node -e "new Function(require('fs').readFileSync('app.js','utf8')); console.log('syntax OK')" → syntax OK
  - grep -n "M019-[1-4]|SP4-[1-5]" index.html → secuencia M019-1, M019-2, M019-3, M019-4, SP4-1..5 confirmada
requirement_outcomes:
  - id: R001
    from_status: active
    to_status: active
    proof: 4 cards nuevas integradas en la página — el sitio sigue cargando correctamente y la sección 1852–1860 tiene contenido propio. R001 permanece active (ongoing requirement para todo el sitio).
  - id: R003
    from_status: validated
    to_status: validated
    proof: R003 ya estaba validated (M003 completó 20 cards en 4 sub-períodos). M019 agrega 4 cards más al período 1800-1860 dentro de #rev-1852-1860, profundizando el contenido del sub-período más denso. No cambia el estado — ya validado.
  - id: R012
    from_status: validated
    to_status: validated
    proof: S01 verificó cada hecho, fecha, nombre y cita contra fuentes secundarias académicas reconocidas (Halperin Donghi, Scobie, Ravignani, Saldías) y textos primarios (Acuerdo de San Nicolás). La investigación de la "escena Mitre-Urquiza" demostró rigor al descartar con evidencia explícita, no por omisión. Citas textuales de Mitre y Urquiza verificadas vía fuentes secundarias + reproducción en fuente primaria (nota Urquiza a coronel Pinto). Ningún contenido sin fuente.
  - id: R013
    from_status: validated
    to_status: validated
    proof: Las 4 cards M019 tienen data-certeza="hecho" (verificado: grep -c 'data-certeza="hecho"' index.html devuelve 70, incluyendo las 4 nuevas). Sin data-certeza con corchetes en el HTML (grep -c 'data-certeza=\[hecho\]' index.html → 0). El sistema de certeza se aplicó consistentemente al período más arriesgado del proyecto.
  - id: R014
    from_status: validated
    to_status: validated
    proof: Cards M019-2 y M019-3 incluyen blockquote.card-opinion__quote con cita textual verificada y footer.card-opinion__attribution. Patrón de blockquote + atribución aplicado en cards card-hecho con cita primaria (variante ya establecida en SP4-1).
duration: ~40m total (S01: ~25m, S02: ~15m)
verification_result: passed
completed_at: 2026-03-25
---

# M019: La Ruptura Mitre-Urquiza (1852)

**4 cards `card-hecho` (Caseros, Acuerdo de San Nicolás, Disolución de la Legislatura, Revolución del 11 de Septiembre) integradas en `#rev-1852-1860` con citas textuales primarias verificadas, veredicto definitivo sobre la "escena Mitre-Urquiza" (sin fuente directa, no incluida), y cierre narrativo del período 1800–1860.**

## What Happened

M019 se ejecutó en dos slices: S01 investigó y redactó el borrador verificado; S02 lo integró en `index.html`.

**S01 (Investigación y borrador):** T01 leyó `S01-RESEARCH.md` y produjo `S01-CONTENT-DRAFT.md` en ~25 minutos. La tarea central — determinar qué había documentado sobre la "escena Mitre-Urquiza" — se resolvió con evidencia explícita: el único indicio tangencial, el Borrador Elizalde (ca. marzo–abril 1852, Archivo Elizalde, documentado por Cassagne 2023), es una propuesta institucional de Buenos Aires hacia Urquiza, no una conversación personal. La decisión fue narrar el arco político documentado (aliados en Caseros → enemigos en septiembre) como 4 cards `card-hecho`, sin fabricar una escena sin evidencia. El borrador incluye dos citas textuales primarias verificadas: Mitre en la Legislatura porteña ("en una mano el dinero…", 21 jun 1852) y la nota de Urquiza al coronel Pinto ("completamente anárquico…", 24 jun 1852).

**S02 (Integración HTML):** T01 leyó el draft de S01 y confirmó el punto de inserción exacto (antes del comentario `<!-- SP4-1 -->`). Los 4 bloques HTML se insertaron en un solo `edit`. Se aplicó la corrección obligatoria documentada en S01: el draft usaba `data-certeza=[hecho]` (sin comillas) en los ejemplos para evitar falsos positivos en grep; el HTML real usa `data-certeza="hecho"` con comillas dobles. Cards M019-2 y M019-3 incluyen `<blockquote class="card-opinion__quote">` siguiendo el patrón de SP4-1. Los 5 delays de SP4-1..5 se actualizaron a 320ms–640ms (incrementos de 80ms) para mantener el stagger visual.

**El cierre del período 1800–1860 queda completo:** la secuencia narrativa Caseros (M019-1) → Acuerdo de San Nicolás (M019-2) → Disolución de la Legislatura (M019-3) → Revolución del 11 de Septiembre (M019-4) precede inmediatamente a las cards SP4 que cubren la organización nacional post-secesión, sin gap narrativo.

## Cross-Slice Verification

| Criterio del roadmap | Verificación | Resultado |
|---|---|---|
| Cards sobre el período Caseros–11 de Septiembre | `grep -c "M019-[1-4]" index.html` → **4** | ✅ |
| El Acuerdo de San Nicolás como card-hecho con fuente | M019-2 con `data-certeza="hecho"` + cite → Ravignani t. IV, Halperin Donghi, Scobie | ✅ |
| La Revolución del 11 de Septiembre como card-hecho | M019-4 con `data-certeza="hecho"` + fecha (11 sep 1852) + actores documentados | ✅ |
| Certeza explícita en cada afirmación | `grep -c 'data-certeza=\[hecho\]' index.html` → **0** (sin corchetes); todas usan comillas dobles | ✅ |
| Sin afirmaciones sin fuente | Todas las cards tienen `<cite>` con fuentes secundarias académicas | ✅ |
| La "escena Mitre-Urquiza" clasificada con certeza real | Veredicto explícito en S01-CONTENT-DRAFT.md: sin fuente directa → no incluida como card | ✅ |
| Sin errores JS | `node -e "new Function(require('fs').readFileSync('app.js','utf8'))"` → **syntax OK** | ✅ |
| Stagger SP4 ajustado | SP4-1: 320ms, SP4-5: 640ms (verificado con grep) | ✅ |
| Blockquotes en M019-2 y M019-3 | Líneas 2321 y 2346 en index.html | ✅ |
| Secuencia M019 → SP4 sin inversiones | `grep -n "M019-[1-4]\|SP4-[1-5]" index.html` → orden correcto (2287–2375, 2409–2485) | ✅ |

**Todos los criterios del roadmap verificados con evidencia directa.**

## Requirement Changes

- R001: active → active — M019 agrega cards al sitio; el requisito continúa activo como ongoing requirement para el proyecto completo.
- R003: validated → validated — R003 ya estaba validated desde M003 (20 cards en 4 sub-períodos). M019 profundiza el período 1800–1860 con 4 cards adicionales en `#rev-1852-1860`. No hay transición de estado — se mantiene validated con evidencia más robusta.
- R012: validated → validated — Rigor histórico aplicado: fuentes verificadas, hipótesis descartada con evidencia, sin contenido sin fuente. Protocolo de verificación ejecutado en S01.
- R013: validated → validated — 4/4 cards M019 con `data-certeza="hecho"`, 0 con formato de corchetes. Sistema de certeza aplicado al período de mayor riesgo epistémico del proyecto.

## Forward Intelligence

### What the next milestone should know

- **El período 1800–1860 está cerrado narrativamente.** `#rev-1852-1860` contiene: M019-1..4 (Caseros → Revolución del 11 de Septiembre) + SP4-1..5 (Bases de Alberdi → Reunificación 1860). La secuencia es lineal y sin gaps. Si un milestone futuro necesita agregar contenido en este período, debe ajustar el stagger manualmente.
- **La "escena Mitre-Urquiza" está cerrada con D074.** El veredicto es definitivo (D067/D074): no hay fuente historiográfica de negociación privada. El Borrador Elizalde es el único indicio tangencial y no documenta conversación personal. No volver a investigar esta hipótesis.
- **Patrón de grep anchor en content drafts:** `<!-- data-certeza="hecho" -->` como comentario HTML inline en campos de metadata de archivos markdown. Documenta en KNOWLEDGE.md — ya añadido en M019-S01.
- **El stagger SP4-1..5 ahora empieza en 320ms** (no en 0ms). Si se agrega una card entre M019-4 y SP4-1, ajustar el stagger manualmente — no hay automatización.
- **Imágenes de las 4 cards M019 reutilizan URLs ya presentes** en index.html — sin riesgo de 404. Si se quiere mayor especificidad temática (grabado de Caseros, facsímil del Acuerdo de San Nicolás), buscar en Wikimedia en un milestone futuro — no es un error funcional.

### What's fragile

- **Stagger SP4-1..5 es manual** — cualquier inserción de card entre M019-4 y SP4-1 rompe la progresión. Documentado en S02-SUMMARY.
- **La combinación `card-hecho` + `blockquote.card-opinion__quote`** (M019-2, M019-3) puede confundir a lectores del HTML. El comentario de código aclara que son hechos documentados con cita textual del acta, no opiniones. El patrón ya existe en SP4-1.
- **Las citas de Mitre y Urquiza** están verificadas vía fuentes secundarias académicas (Halperin Donghi, Scobie) y Wikipedia ES para reproducción de la nota Urquiza. No se accedió a manuscritos originales — protocolo aceptado por el proyecto.

### Authoritative diagnostics

- `grep -n "M019-[1-4]\|SP4-[1-5]" index.html` — señal confiable del orden completo de las 9 cards del bloque 1852–1860.
- `grep -A3 "M019-[1-4]" index.html | grep "data-certeza"` — confirma certeza en las 4 cards M019.
- `node -e "new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK')"` — comprobación de sintaxis JS sin falsos positivos (ver KNOWLEDGE.md: `eval()` falla en Node por globals del browser).

### What assumptions changed

- Se asumió que podría existir alguna fuente de la "escena Mitre-Urquiza" (D067). La investigación de S01 confirmó que no existe ninguna — ni carta, ni memoria, ni testimonio de época que documente esa conversación. El Borrador Elizalde es real pero institucional, no personal. La hipótesis se descartó con evidencia explícita, no por omisión.

## Files Created/Modified

- `index.html` — 4 cards M019 insertadas en líneas 2287–2380 (antes de SP4-1); delays SP4-1..5 actualizados a 320ms, 400ms, 480ms, 560ms, 640ms.
- `.gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md` — draft completo con 4 cards verificadas, veredicto sobre la "escena", citas textuales, e instrucciones de integración para S02. (creado en S01)
- `.gsd/milestones/M019/slices/S01/S01-PLAN.md` — sección `## Observability / Diagnostics` añadida; T01 marcado como `[x]`.
- `.gsd/milestones/M019/slices/S02/S02-PLAN.md` — sección `## Observability / Diagnostics` añadida durante T01.
- `.gsd/milestones/M019/M019-SUMMARY.md` — este archivo.
