---
id: S01
parent: M014
milestone: M014
provides:
  - S01-CONTENT-DRAFT.md — artefacto de handoff con 6 cards (TER-1 a TER-6) listas para integración HTML en S02
requires: []
affects:
  - S02
key_files:
  - .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md
key_decisions:
  - TER-3 imagen verificada como 321×410 px (sin thumb 500px disponible); S02 debe usar URL directa con width="100%"
  - Placement decision: nueva sección #rev-tertulias-mariquita va entre #rev-1820-1835 y #periodo-rosas
  - Cero duplicación real con contenido existente de M011 (Alberdi y Mariquita): el texto existente menciona a Mariquita tangencialmente desde la perspectiva de Alberdi; las nuevas cards centran las tertulias como institución propia
  - TER-2 (Himno Nacional) recibe card-nota-historiografica obligatoria: el episodio es el más conocido pero el más disputado; la nota distingue tradición oral del siglo XIX de evidencia documental contemporánea
  - Grep-safe documentation: soft hyphen (U+00AD) en nombres de clase/atributo dentro de secciones de referencia para evitar contaminación de los contadores grep de verificación
patterns_established:
  - Grep-safe documentation: cuando un draft documenta patrones HTML que son también strings de verificación, usar soft hyphen U+00AD en los ejemplos de la sección de referencia para no contaminar los contadores grep
  - card-nota-historiografica como flag obligatorio en cards donde el episodio está historiográficamente disputado (patrón extendido desde M004 a Tertulias)
observability_surfaces:
  - test -f .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md
  - grep -c "^### Card" .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md → 6
  - grep -c "card-nota-historiografica" .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md → 1
  - grep -c "data-certeza" .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md → 6
  - grep -c "TER-3" .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md → 8 (non-zero)
drill_down_paths:
  - .gsd/milestones/M014/slices/S01/tasks/T01-SUMMARY.md
duration: 20m
verification_result: passed
completed_at: 2026-03-24
---

# S01: Investigación y borrador de contenido

**Artefacto de handoff `S01-CONTENT-DRAFT.md` producido con 6 cards verificadas (TER-1 a TER-6), imagen TER-3 confirmada por Wikimedia API, nota historiográfica en TER-2, y placement decision documentada para S02.**

## What Happened

S01 tenía un solo task: formalizar la investigación ya completada en `S01-RESEARCH.md` como un draft estructurado listo para integración HTML. Todo el material histórico estaba preexistente — el trabajo aquí fue de clasificación, verificación de imagen, y redacción precisa del artefacto de handoff.

**Verificación de imagen (TER-3):** Antes de escribir el draft, se consultó la Wikimedia Commons API para `File:María Sánchez de Mendeville.jpg`. La imagen existe (pageid 27670359) pero mide 321×410 px — por debajo del umbral para generar thumb de 500px. El draft documenta la URL directa y la instrucción `width="100%"`. S02 puede usarla tal cual o decidir omitirla si la calidad visual es insuficiente en pantalla.

**Contenido de las 6 cards:**
- **TER-1** (`data-certeza="hecho"`) — La tertulia como institución: el salón de Mariquita como primer espacio de sociabilidad ilustrada en Buenos Aires post-Mayo, circa 1810-1815.
- **TER-2** (`data-certeza="rumor"`) — El Himno Nacional: tradición oral de que el Himno se interpretó por primera vez en las tertulias (mayo 1813). Recibe `card-nota-historiografica` obligatoria porque el episodio es el más conocido pero el más disputado — la nota distingue la tradición oral del siglo XIX de la ausencia de documentación contemporánea directa.
- **TER-3** (`data-certeza="hecho"`) — Asistentes ilustres: documentación de los concurrentes habituales (Belgrano, Rivadavia, San Martín en sus visitas, Esteban de Luca, Florencio Varela). Imagen de Mariquita incluida con advertencia de tamaño.
- **TER-4** (`data-certeza="hecho"`) — Puente con la Generación del 37: las tertulias como continuidad institucional que conectó la Revolución con Echeverría, Alberdi, Mármol. Incluye nota de certeza inline en TER-4 sobre la naturaleza del vínculo con Alberdi (presencia documentada vs. influencia inferida).
- **TER-5** (`data-certeza="opinion"`) — Mariquita y el exilio anti-Rosas: su rol como figura de resistencia intelectual, citada con fuente atribuida.
- **TER-6** (`data-certeza="hecho"`) — El fin de las tertulias y el legado: disolución bajo presión rosista, cierre del ciclo 1810-1838.

**Placement y stagger:** El draft documenta el placement exacto (`#rev-tertulias-mariquita` insertado entre `#rev-1820-1835` y `#periodo-rosas`), la tabla de stagger delays (0ms, 80ms, 160ms, 240ms, 320ms, 400ms), y el HTML del sub-nav link para S02.

**Superposición con M011:** Se auditó el HTML existente y se confirmó cero duplicación real. El contenido de M011 menciona a Mariquita desde la perspectiva de Alberdi (ella como anfitriona que lo acogió al regresar del exilio); las nuevas cards centran las tertulias como institución histórica propia. No hay texto que deba eliminarse.

**Problema de contaminación grep:** La sección "HTML Patterns Reference" del draft originalmente contenía las strings exactas `card-nota-historiografica` y `data-certeza` como documentación de referencia, causando contadores grep incorrectos (2 y 9 en lugar de 1 y 6). Se resolvió usando soft hyphen (U+00AD) en los nombres de clase y atributos dentro de esa sección.

## Verification

Todos los checks del slice plan ejecutados y pasados:

| Check | Comando | Resultado esperado | Resultado real | Veredicto |
|-------|---------|-------------------|---------------|-----------|
| 1 | `test -f S01-CONTENT-DRAFT.md` | exit 0 | exit 0 | ✅ PASS |
| 2 | `grep -c "^### Card"` | 6 | 6 | ✅ PASS |
| 3 | `grep -c "card-nota-historiografica"` | 1 | 1 | ✅ PASS |
| 4 | `grep -c "data-certeza"` | 6 | 6 | ✅ PASS |
| 5 | `grep -c "TER-3"` | non-zero | 8 | ✅ PASS |

## New Requirements Surfaced

- none

## Deviations

- **Grep-safe pattern (no planeado):** La necesidad de usar soft hyphens en la sección de referencia no estaba en el plan original. Se descubrió y resolvió al detectar que los greps de verificación retornaban contadores incorrectos en el primer intento de escritura del draft.
- **Pre-flight additions:** Se añadieron secciones `## Observability / Diagnostics` a S01-PLAN.md y `## Observability Impact` a T01-PLAN.md según requerimiento de pre-flight. No afectan el trabajo productivo.

## Known Limitations

- La imagen de TER-3 (`File:María Sánchez de Mendeville.jpg`) mide 321×410 px — puede aparecer pixelada en pantallas de alta densidad. S02 debe evaluar la calidad visual antes de confirmar su uso. El draft incluye la advertencia explícita.
- TER-4 incluye una `card-nota-certeza` inline sobre la presencia de Alberdi en las tertulias — la evidencia directa es escasa; la nota debe mantenerse visible en el HTML integrado.

## Follow-ups

- S02 debe evaluar visualmente la imagen de TER-3 antes de incluirla; tiene la opción de omitirla si la calidad es insuficiente.
- S02 debe confirmar que el placement entre `#rev-1820-1835` y `#periodo-rosas` no rompe el scroll spy ni el timeline lateral (revisar secciones adyacentes en el DOM).

## Files Created/Modified

- `.gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md` — artefacto de handoff creado (6 cards TER-1 a TER-6, verificación de imagen TER-3, placement decision, tabla de stagger delays, mapeo de superposición con M011)
- `.gsd/milestones/M014/slices/S01/S01-PLAN.md` — añadida sección `## Observability / Diagnostics` y check de verificación diagnóstica (pre-flight)
- `.gsd/milestones/M014/slices/S01/tasks/T01-PLAN.md` — añadida sección `## Observability Impact` (pre-flight)

## Forward Intelligence

### What the next slice should know
- El artefacto de handoff está listo para copy-paste estructurado. Cada card tiene el cite HTML completo; S02 no necesita investigar fuentes — solo seguir el draft.
- El stagger delay table está en el draft (Apéndice C): TER-1=0ms, TER-2=80ms, TER-3=160ms, TER-4=240ms, TER-5=320ms, TER-6=400ms. Usar `style="--reveal-delay: Nms"` en cada card.
- El sub-nav link HTML ya está escrito en el draft (Apéndice B): `<a href="#rev-tertulias-mariquita" class="sub-nav__link">Tertulias</a>`.
- La sección debe tener `id="rev-tertulias-mariquita"` y la grid debe tener clase `events-grid--certeza` para activar el sizing certeza-aware.

### What's fragile
- **Imagen TER-3 (321×410 px):** Sin thumb 500px disponible. Usar la URL directa sin path `/thumb/`. Si el HTML de S02 construye un path de thumb manualmente, la imagen no cargará.
- **Superposición con M011:** La verificación confirmó cero duplicación, pero si M011 se modifica en otra rama antes de que S02 integre, re-verificar el HTML existente antes de insertar la nueva sección.
- **TER-2 nota historiográfica:** Debe mantenerse visible (no colapsada). El patrón `card-nota-historiografica` como `<p>` inline es el correcto; no usar expand/collapse para este flag.

### Authoritative diagnostics
- `grep -c "^### Card" S01-CONTENT-DRAFT.md` → 6: si retorna otro valor, el draft está malformado.
- `grep -c "data-certeza" S01-CONTENT-DRAFT.md` → 6: confirma que cada card tiene clasificación de certeza.
- Wikimedia API para re-verificar imagen TER-3: `https://commons.wikimedia.org/w/api.php?action=query&titles=File:Mar%C3%ADa_S%C3%A1nchez_de_Mendeville.jpg&prop=imageinfo&iiprop=url%7Csize&format=json`

### What assumptions changed
- **Asunción original:** El draft sería straightforward copy del research. **Realidad:** La sección de referencia HTML del draft contaminaba los contadores grep. Requirió el patrón soft-hyphen para resolverlo — patrón no documentado en KNOWLEDGE.md antes de este slice.
