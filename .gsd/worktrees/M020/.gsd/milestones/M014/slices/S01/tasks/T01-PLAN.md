---
estimated_steps: 4
estimated_files: 1
---

# T01: Escribir S01-CONTENT-DRAFT.md desde la investigación existente

**Slice:** S01 — Investigación y borrador de contenido
**Milestone:** M014

## Description

`S01-RESEARCH.md` contiene investigación histórica completa para las 6 cards de las tertulias de Mariquita Sánchez: excerpts redactados, fuentes verificadas, certeza clasificada, y URLs de imágenes de Wikimedia Commons. Este task formaliza esa investigación en `S01-CONTENT-DRAFT.md`, el artefacto de handoff estructurado que S02 consume para integrar las cards en `index.html` sin trabajo creativo adicional.

El único riesgo abierto es la imagen de TER-3 (`File:María Sánchez de Mendeville.jpg`): es posible que sea una imagen pequeña sin miniatura de 500px en la API de Wikimedia. Verificar antes de incluir la URL.

## Steps

1. Leer `S01-RESEARCH.md` completo para tener todos los datos a mano (ya están preloaded en el contexto de este task — ver Inputs).
2. Verificar la URL de la imagen de TER-3 (`File:María Sánchez de Mendeville.jpg`) via Wikimedia API: `https://en.wikipedia.org/w/api.php?action=query&titles=File:Mar%C3%ADa_S%C3%A1nchez_de_Mendeville.jpg&prop=imageinfo&iiprop=url,size&format=json`. Si `width < 500`, la imagen no tiene miniatura 500px — usar la URL directa con `width="100%"` en HTML y anotar el resultado en el draft. Si la API falla o el archivo no existe, buscar con `list=search&srnamespace=6&srsearch=Mariquita+Sanchez+Mendeville`.
3. Escribir `S01-CONTENT-DRAFT.md` con las 6 cards en orden TER-1 a TER-6. Para cada card incluir: ID, certeza (`data-certeza="..."`), año display, título, excerpt completo, blockquote (si aplica), card-nota-historiografica o card-nota-certeza (si aplica), fuentes, cite HTML, y notas de imagen (URL verificada, licencia, instrucción de uso).
4. Añadir al final del draft: (a) tabla de stagger delays (TER-1=0ms, TER-2=80ms, ..., TER-6=400ms), (b) placement decision (insertar entre `#rev-1820-1835` y `#periodo-rosas`, sub-nav link a agregar), (c) mapeo de superposición con contenido existente (tabla de líneas BIOG-7, BIOG-14, SP2-4, SP3-3 — sin duplicación real).

## Must-Haves

- [ ] `S01-CONTENT-DRAFT.md` existe y contiene exactamente 6 secciones `### Card N` (TER-1 a TER-6)
- [ ] Cada card tiene `data-certeza="..."` con valor correcto: TER-1=hecho, TER-2=rumor, TER-3=hecho, TER-4=hecho, TER-5=opinión, TER-6=opinión
- [ ] TER-2 contiene el bloque `card-nota-historiografica` con el texto sobre Subercaseaux 1909
- [ ] TER-4 contiene `card-nota-certeza` sobre la cita de Alberdi "madame Sévigné" (fuente secundaria sin verificación primaria)
- [ ] TER-3 tiene el resultado de la verificación de imagen documentado (URL directa verificada o flag "verificar tamaño")
- [ ] Placement decision documentada: ID de sección nueva, posición en HTML, sub-nav link

## Verification

- `test -f .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md`
- `grep -c "^### Card" .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md` — debe retornar `6`
- `grep -c "card-nota-historiografica" .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md` — debe retornar `1` (solo TER-2)
- `grep -c "data-certeza" .gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md` — debe retornar `6`

## Inputs

El contenido de `S01-RESEARCH.md` (en `.gsd/milestones/M014/slices/S01/S01-RESEARCH.md`) ya contiene:
- Borrador completo de las 6 cards con excerpts redactados, fuentes, cites HTML
- URLs de imágenes de Wikimedia Commons para TER-1 y TER-2 (verificadas, PD)
- URL directa para TER-3 (marcar como "verificar tamaño" — puede no tener miniatura 500px)
- Certeza clasificada y justificada para cada card
- Mapeo de superposición con contenido existente (tabla de líneas en index.html)
- Placement decision y sub-nav link HTML

Patrones HTML relevantes del proyecto (de KNOWLEDGE.md):
- `<p class="card-nota-historiografica"><strong>Nota historiográfica:</strong> ...</p>` — visible inline en card body, no colapsable
- `<span class="card-nota-certeza">[Nota: ...]</span>` — flag epistémico inline en prosa
- Stagger: `style="--reveal-delay: Nms"` en cada card, +80ms por card
- `data-certeza` acepta tanto `"opinion"` como `"opinión"` (ambos en uso en el codebase)

## Observability Impact

- **New artifact:** `.gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md` is created. Its presence is the primary success signal.
- **Inspection surface:** `grep -c "^### Card" S01-CONTENT-DRAFT.md` → 6; `grep -c "data-certeza" S01-CONTENT-DRAFT.md` → 6; `grep -c "card-nota-historiografica" S01-CONTENT-DRAFT.md` → 1. These are fast, deterministic checks a future agent can run.
- **Image verification log:** TER-3 image dimensions documented inline (`321×410 px, no 500px thumb available`). Source of truth: Wikimedia Commons API (confirmed). Future agents can re-verify without re-researching.
- **Failure visibility:** If the file is missing or a grep returns the wrong count, S02 should not start. The slice verification block catches this explicitly.
- **No runtime signals:** This task produces a static markdown file; no server, process, or network state changes.

## Expected Output

- `.gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md` — draft estructurado con 6 cards completas, verificación de imagen TER-3, placement decision, y tabla de stagger. Listo para copy-paste mecánico en S02.
