---
id: S01
parent: M017
milestone: M017
provides:
  - .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md — borrador completo de 6 cards Urquiza (URQ-1 a URQ-6) con certezas, excerpts verificados, ≥2 fuentes por card-hecho, paráfrasis marcadas, 4 imágenes confirmadas vía Wikimedia Commons API; listo para S02 (integración HTML)
requires: []
affects:
  - S02
key_files:
  - .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md
key_decisions:
  - D052: card-opinion CSS class para data-certeza="debatido" (URQ-5) — no nueva clase CSS
  - D057: data-certeza="opini&#xF3;n" con entidad HTML &#xF3; (URQ-6)
  - D053: HTML entities para caracteres no-ASCII en atributos HTML (confirmado)
  - D058: "debatido" para nota historiográfica (URQ-5), "opinión" para interpretación narrativa (URQ-6)
  - Palacio San José: filename sugerido `Palacio_San_José_(Entre_Ríos).jpg` no existe en Commons — correcto es `Palacio_San_José_Fachada.JPG` (pageid 1709857)
  - Daguerrotipo Fredricks: imagen 421×540px < 500px ancho — no thumb path disponible, se usa URL original per KNOWLEDGE.md
  - Wikimedia Commons API requiere `iiprop=url%7Csize` (pipe URL-encoded), no `iiprop=url,size`
patterns_established:
  - Cada sección de card en el draft usa `**data-certeza=**` con valor literal entre backticks para grep -c mecánico
  - CONFIRMADO / [URL-PENDIENTE-VERIFICAR] como sistema binario de estado de imagen — verificación mecánica via grep
  - card-nota-certeza inline en URQ-3 para incertidumbre de fecha puntual (no ruptura de certeza de la card completa)
  - Para imágenes < 500px de ancho, Wikimedia API devuelve URL original como thumburl — es correcto usarla directamente
  - Cuando filename sugerido arroja `"missing":""`, usar `list=search&srnamespace=6` + segunda llamada de verificación
observability_surfaces:
  - "grep -c '^## URQ-' S01-CONTENT-DRAFT.md → 6 (card count)"
  - "grep -c 'data-certeza=' S01-CONTENT-DRAFT.md → 10 (≥6, annotation coverage)"
  - "grep '[URL-PENDIENTE-VERIFICAR]' S01-CONTENT-DRAFT.md → exit 1 = 0 pendientes (T02 completo)"
  - "grep -c 'CONFIRMADO' S01-CONTENT-DRAFT.md → 4 filenames confirmados (URQ-1, URQ-3, URQ-4, URQ-5)"
  - "grep 'PARÁFRASIS' S01-CONTENT-DRAFT.md → 2 marcadores (señal de integridad epistémica)"
drill_down_paths:
  - .gsd/milestones/M017/slices/S01/tasks/T01-SUMMARY.md
  - .gsd/milestones/M017/slices/S01/tasks/T02-SUMMARY.md
duration: ~40m (T01 ~25m + T02 ~15m)
verification_result: passed
completed_at: 2026-03-24
---

# S01: Investigación y borrador

**`S01-CONTENT-DRAFT.md` entregado: 6 cards Urquiza (URQ-1–URQ-6) con certezas, fuentes verificadas, 4 imágenes confirmadas vía Wikimedia Commons API, 0 marcadores de URL pendiente — listo para integración HTML en S02.**

## What Happened

S01 ejecutó dos tareas secuenciales:

**T01** produjo el draft completo en una sola operación Write (sin heredocs per KNOWLEDGE.md). Las 6 cards siguen la estructura investigada en S01-RESEARCH.md:

- **URQ-1** (hecho): nacimiento 18 oct 1801, familia vasca/criolla, Colegio San Carlos, retorno 1818–1819. 4 fuentes, imagen `Justo_José_de_Urquiza.jpg` (ya en uso línea ~1636, confirmada).
- **URQ-2** (hecho): trayectoria 1826–1841 — diputado, comandante militar, alianza Rosas, Pago Largo/Cagancha. 3 fuentes. Sin imagen nueva.
- **URQ-3** (hecho): gobernador 15 dic 1841, tres mandatos, prosperidad entrerriana, Colegio de Concepción del Uruguay, tensión gradual con Rosas. Incluye `<span class="card-nota-certeza">` para la tensión gradual (sin fecha exacta). Imagen pendiente para T02.
- **URQ-4** (hecho): Pronunciamiento 1° may 1851 — mecánica completa (acepta renuncias Rosas, Pacto Federal 1831, nuevo lema, triple alianza 29 may, Ejército Grande, Caseros 3 feb 1852). 4 fuentes. Imagen pendiente para T02.
- **URQ-5** (debatido, card-opinion): dos posiciones historiográficas — Irazusta revisionista ("traición federal") vs. Lynch/Halperin liberal/síntesis ("decisión soberana legal"). Ambas como paráfrasis atribuidas `[PARÁFRASIS — NO USAR COMO CITA DIRECTA]`. Imagen confirmada (`Justo_José_de_Urquiza_(retrato).jpg`, ya en uso línea ~2328).
- **URQ-6** (opinión, card-opinion): convergencia Urquiza–Alberdi atribuida a Mayer y Halperin Donghi. Sin repetir la cita Alberdi de línea ~2274–2276. `data-certeza="opini&#xF3;n"` con entidad HTML. Sin imagen nueva.

T01 también añadió la sección `## Observability / Diagnostics` a S01-PLAN.md (gap de pre-flight detectado).

**T02** resolvió las 2 URLs de imagen pendientes vía Wikimedia Commons API:

- **Daguerrotipo Fredricks (URQ-4):** Filename `Daguerrotipo_de_Justo_José_de_Urquiza_(recorte).jpg` existe (pageid 92037693). Imagen 421×540px — < 500px ancho, sin thumb path disponible. URL del archivo original usada directamente per KNOWLEDGE.md. URL confirmada.
- **Palacio San José (URQ-3):** Filename sugerido `Palacio_San_José_(Entre_Ríos).jpg` no existe en Commons (`"missing":""`). Búsqueda con `list=search&srnamespace=6` → `Palacio_San_José_Fachada.JPG` (pageid 1709857, 1632×1224px). Segunda llamada API confirma thumburl 500px. Filename corregido en el draft.

Descubrimiento crítico de T02: la API Wikimedia Commons requiere `iiprop=url%7Csize` (pipe URL-encoded), no `iiprop=url,size`. La coma produce `imageinfo:[{}]` vacío sin error de HTTP — falla silenciosa. Documentado en KNOWLEDGE.md.

T02 aplicó 3 edits quirúrgicos al draft: reemplazó ambos `[URL-PENDIENTE-VERIFICAR]` con los datos confirmados y actualizó la tabla de estado de imágenes al pie.

## Verification

Todos los checks del slice-plan pasaron:

| Check | Command | Result | Verdict |
|-------|---------|--------|---------|
| Archivo existe | `test -f S01-CONTENT-DRAFT.md` | exit 0 | ✅ PASS |
| 6 secciones URQ | `grep -c "^## URQ-"` | 6 | ✅ PASS |
| ≥6 certeza annotations | `grep -c "data-certeza="` | 10 | ✅ PASS |
| 0 URLs pendientes | `grep "\[URL-PENDIENTE-VERIFICAR\]"` | exit 1 (no matches) | ✅ PASS |
| ≥2 imágenes confirmadas | `grep "CONFIRMADO"` | 4 entradas (URQ-1, URQ-3, URQ-4, URQ-5) | ✅ PASS |

## New Requirements Surfaced

- none

## Deviations

**API iiprop parameter:** El plan de referencia usaba `iiprop=url,size` (coma). La API real requiere `iiprop=url%7Csize` (pipe URL-encoded). Corregido y documentado en KNOWLEDGE.md.

**Palacio San José filename incorrecto:** El filename planificado `Palacio_San_José_(Entre_Ríos).jpg` no existe en Commons. Se usó el fallback `list=search` tal como estipulado — camino del plan, no desviación de su objetivo.

**data-certeza= format en headers del draft:** Los headers usaban originalmente `**data-certeza:** \`hecho\`` (sin `=`). Cambiado a `**data-certeza=** \`"hecho"\`` para que grep literal devuelva el count esperado. Adaptación mecánica del formato, no cambio conceptual.

**Pre-flight gaps:** T01 añadió sección `## Observability / Diagnostics` a S01-PLAN.md; T02 añadió `## Observability Impact` a T02-PLAN.md. Trabajo no listado en los Steps pero requerido explícitamente por los bloques Pre-flight de cada plan.

## Known Limitations

- **URQ-6 no tiene imagen asignada** — decisión intencional para ritmo visual. Si S02 necesita imagen, `Justo_José_de_Urquiza_(retrato).jpg` es la única disponible y está en uso.
- **URQ-2 no tiene imagen asignada** — la narrativa de combates no tiene imagen disponible; la card puede compartir visualmente el espacio con URQ-1 si el executor de S02 lo considera necesario.
- **PARÁFRASIS markers en URQ-5:** las dos posiciones historiográficas son paráfrasis atribuidas, no citas directas verificadas. Correctas para el propósito del draft; no deben usarse como blockquotes directos en HTML sin verificación adicional de las citas originales.
- **URQ-3 card-nota-certeza:** la tensión Rosas–Urquiza es un proceso gradual sin fecha exacta documentada. Esto es correcto históricamente, no una omisión.

## Follow-ups

- **S02** consume `S01-CONTENT-DRAFT.md` directamente. El punto de inserción es el anchor `<!-- /#rev-1835-1852 -->` en index.html. Sub-nav requiere un 8° link.
- El draft incluye una sección completa "Notas de inserción HTML para S02" con el anchor de splice, la estructura HTML del sub-período, y recordatorios de certeza — S02 no necesita re-investigar.

## Files Created/Modified

- `.gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md` — creado por T01, patcheado por T02: borrador completo con 6 cards URQ-1–URQ-6, 4 imágenes confirmadas, 0 URLs pendientes
- `.gsd/milestones/M017/slices/S01/S01-PLAN.md` — modificado: añadida sección `## Observability / Diagnostics` (T01)
- `.gsd/milestones/M017/slices/S01/tasks/T02-PLAN.md` — modificado: añadida sección `## Observability Impact` (T02)

## Forward Intelligence

### What the next slice should know

- **El punto de inserción en index.html es `<!-- /#rev-1835-1852 -->`** (no número de línea). Insertar el nuevo bloque `<div id="rev-urquiza-perfil" ...>` INMEDIATAMENTE ANTES de ese comentario. Este anchor es grep-estable.
- **Sub-nav link:** añadir un 8° elemento en `.sub-nav__list` dentro de `#periodo-revolucion` con `href="#rev-urquiza-perfil"`. Verificar: `grep -c 'sub-nav__link' index.html` → 8.
- **URQ-5 usa `data-certeza="debatido"` con class `card-opinion`** (per D052/D058). No crear nueva clase CSS.
- **URQ-6 usa `data-certeza="opini&#xF3;n"` con entidad HTML** (per D053/D057). La ó en el atributo debe estar como `&#xF3;` para sobrevivir el round-trip de edición en Windows.
- **El daguerrotipo Fredricks (URQ-4)** usa la URL del archivo original como src (no hay thumb 500px — imagen es 421×540px). Usar `width="100%"` en el `<img>` per KNOWLEDGE.md.
- **El Palacio San José (URQ-3)** usa thumburl 500px: `https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Palacio_San_Jos%C3%A9_Fachada.JPG/500px-Palacio_San_Jos%C3%A9_Fachada.JPG`. Esta URL está confirmada vía API.
- **URQ-3 excerpt tiene `<span class="card-nota-certeza">`** inline — preservar ese span en el HTML de S02.
- **URQ-6 aviso de no repetir cita Alberdi:** la cita de líneas ~2274–2276 NO debe duplicarse. URQ-6 usa solo paráfrasis atribuida.

### What's fragile

- **Las PARÁFRASIS de URQ-5** están marcadas `[PARÁFRASIS — NO USAR COMO CITA DIRECTA]` — si S02 convierte estas líneas en `<blockquote>` sin verificar contra el original, introduce una cita falsa. El executor de S02 debe usar el excerpt como texto de card-opinion__context, no como blockquote directo.
- **El anchor `<!-- /#rev-1835-1852 -->`** es el único mecanismo de splice. Si algún editor humano lo elimina, S02 pierde su punto de inserción.

### Authoritative diagnostics

- `grep -c "^## URQ-" S01-CONTENT-DRAFT.md` → 6 es el check de card count definitivo
- `grep "\[URL-PENDIENTE-VERIFICAR\]" S01-CONTENT-DRAFT.md` → exit 1 (no matches) es la señal de que T02 completó su trabajo
- La tabla de estado de imágenes al pie del draft es la fuente de verdad para URLs y filenames — 4 filas con ✅ CONFIRMADO

### What assumptions changed

- **Filename Palacio San José:** la planificación asumió `Palacio_San_José_(Entre_Ríos).jpg`. El filename real es `Palacio_San_José_Fachada.JPG`. Las búsquedas en Commons no siempre devuelven el archivo más obvio por nombre.
- **Wikimedia API iiprop:** el patrón documentado usaba coma (`url,size`). La API real requiere pipe URL-encoded (`url%7Csize`). La falla es silenciosa (imageinfo vacío sin error HTTP). El KNOWLEDGE.md ya fue actualizado.
- **Daguerrotipo Fredricks no tiene thumb 500px:** se asumía que existiría. La imagen es 421×540px; por ser < 500px de ancho, la API no genera thumb — devuelve directamente la URL original. Es comportamiento correcto, no un error.
