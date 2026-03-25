---
estimated_steps: 6
estimated_files: 2
---

# T01: Research y draft — Alberdi–Cané y la escena del "Cielo..."

**Slice:** S02 — Research Alberdi y Cané, la escena del "Cielo..." y los romances
**Milestone:** M011

## Description

La amistad entre Juan Bautista Alberdi y Miguel Cané (padre) es el vínculo afectivo entre pares mejor documentado en *Mi vida privada* y en la historiografía alberdiana. El sitio ya menciona a Cané en dos puntos: BIOG-5 (banco del Colegio de Ciencias Morales 1824) y BIOG-12 (cofundador de *El Iniciador*, 1838). Pero no existe ninguna card que narre el arco completo de la amistad ni la escena de la despedida antes del exilio.

El M011-CONTEXT.md identifica esta escena como específica y verificable: Alberdi narra en *Mi vida privada* una despedida en la que alguien (Alberdi, Cané, o Vicente López) cantó o entonó algo relacionado con el "cielo" — posiblemente el estilo o género musical rioplatense llamado "cielo". La tarea investiga y draft-ea esta escena con certeza honesta: si la fuente primaria es sólida, `hecho`; si es narración de segunda mano en Mayer u otro biógrafo sin página/carta específica, `debatido`.

Esta tarea crea `S02-CONTENT-DRAFT.md` desde cero, siguiendo el mismo formato que `S01-CONTENT-DRAFT.md`.

## Steps

1. **Revisar los anclajes HTML existentes** en `index.html` para entender el contexto de inserción. Leer las cards BIOG-5 (línea ~442) y BIOG-12 (línea ~637) para confirmar qué dice el sitio sobre Cané. Identificar el gap narrativo exacto: la amistad como relación sostenida en el tiempo no tiene card propia.

2. **Investigar la escena del "Cielo..."** vía web. Términos de búsqueda efectivos: "Alberdi 'cielo cielo más cielo'", "Alberdi Cané despedida exilio 1838", "Alberdi Mi vida privada Cané", "estilo cielo rioplatense Alberdi". Fuentes a priorizar:
   - *Mi vida privada* (Alberdi, ca. 1872–82), publicado en *Escritos póstumos*, t. I, La Tribuna Nacional, Buenos Aires, 1895 — la fuente primaria más probable. Buscar en archive.org o cervantesvirtual.com.
   - Mayer, Jorge M., *Alberdi y su tiempo*, EUDEBA, Buenos Aires, 1963 — biógrafo principal; es el libro mencionado en el M011-CONTEXT.md como fuente de la escena.
   - Correspondencia Alberdi–Gutiérrez (publicada parcialmente) — para verificar si hay carta que mencione la despedida.
   - Determinar: ¿es "cielo" el nombre de una canción específica conocida, o el nombre de un género musical rioplatense (el "cielo" como forma de canto popular)? Buscar: "cielo género musical rioplatense" o "cielo estilo musical Argentina siglo XIX".

3. **Determinar quiénes estaban presentes** en la escena: Alberdi, Cané (¿Miguel Cané padre?), Vicente López y Planes — ¿o Vicente Fidel López (el hijo)? La distinción importa: Vicente López y Planes (el autor del Himno Nacional, 1784–1856) es distinto de su hijo Vicente Fidel López (1815–1903, historiador). Verificar cuál de los dos aparece en las fuentes de la escena.

4. **Investigar el arco de la amistad Alberdi–Cané** más allá del colegio: ¿se mantuvieron en contacto durante el exilio? ¿Hay correspondencia publicada? ¿Qué dice Mayer sobre la relación? Verificar si Cané siguió a Alberdi al exilio o si permaneció en Argentina.

5. **Redactar dos cards** en `S02-CONTENT-DRAFT.md` siguiendo el formato estándar del S01-CONTENT-DRAFT:

   ```
   ## M011-CANE-1 — [Título: el arco de la amistad]
   
   - Año/período: 1824–[año del exilio o más]
   - Certeza: [hecho / debatido]
   - Certeza-justificación: [2–4 líneas]
   - CSS class sugerida: [card-hecho / card-opinion]
   - data-certeza value: [hecho / debatido]
   
   **Excerpt (2–4 oraciones):**
   [Texto narrativo]
   
   **Fuentes:**
   - [Autor, Obra, año, página si disponible]
   
   **Nota de inserción HTML:**
   [Posición relativa — después de BIOG-5 o BIOG-12, data-id sugerido]
   
   ---
   
   ## M011-CANE-2 — [Título: la escena del "Cielo..."]
   
   [ídem estructura]
   ```

6. **Verificar el draft**:
   ```bash
   test -f .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md
   grep -q "M011-CANE-1" .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md
   grep -q "M011-CANE-2" .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md
   grep -q -i "cielo" .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md
   # El siguiente debe retornar 0 (no hay flags sin resolver)
   grep -c "\[VERIFICAR\]" .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md
   ```

## Must-Haves

- [ ] `S02-CONTENT-DRAFT.md` creado con header de contexto y cards M011-CANE-1 y M011-CANE-2
- [ ] La escena del "Cielo..." documentada: quiénes estaban, cuándo, y si "cielo" es género o canción específica
- [ ] Certeza correcta para cada card: `hecho` solo con fuente primaria; `debatido` si la escena viene de biógrafo secundario sin carta/página verificable
- [ ] Si la escena aparece solo en Mayer o fuentes secundarias sin paginación: certeza `debatido`, con nota indicando dónde buscar la fuente primaria
- [ ] 0 flags `[VERIFICAR]` en el draft al finalizar la tarea
- [ ] Quote Verification Protocol respetado: ninguna cita directa sintetizada de fuentes secundarias

## Verification

```bash
test -f .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md \
  && grep -q "M011-CANE-1" .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md \
  && grep -q "M011-CANE-2" .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md \
  && grep -q -i "cielo" .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md \
  && [ "$(grep -c '\[VERIFICAR\]' .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md)" = "0" ]
```

## Observability Impact

- Signals added/changed: `S02-CONTENT-DRAFT.md` created on disk — its presence is the primary observable signal. The file contains `^- Certeza:` lines (one per card) and the absence of `[VERIFICAR]` tokens.
- How a future agent inspects this: `grep -E "^- Certeza:" .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md` to audit certeza coverage; `grep -c '\[VERIFICAR\]' .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md` to detect unresolved flags (must be 0).
- Failure state exposed: If the file is absent or if `[VERIFICAR]` count > 0, the S02 slice verification command fails with a non-zero exit code, blocking S03 integration.

## Inputs

- `index.html` — leer BIOG-5 (línea ~442) y BIOG-12 (línea ~637) para entender los anclajes existentes de Cané y el gap narrativo
- `.gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` — como referencia de formato: encabezado, estructura de cada entry, nota de inserción HTML
- `KNOWLEDGE.md` → secciones: "Content Draft as Intermediate Artifact", "Alberdi Quote Verification Protocol", "Content Draft Certeza Differentiation: Card-level vs. Inline"
- M011-CONTEXT.md key risk: "la escena está documentada en *Mi vida privada* (Alberdi) y en la correspondencia publicada por Mayer (1963). Verificar que la canción y los presentes sean correctos"

## Expected Output

- `.gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md` — CREADO con:
  - Header de contexto (qué es este archivo, para qué sirve en S03)
  - Card M011-CANE-1: arco de la amistad Alberdi–Cané (1824–exilio), certeza justificada, ≥1 fuente
  - Card M011-CANE-2: la escena del "Cielo...", certeza honesta (hecho si hay fuente primaria verificada; debatido si es narración de biógrafo sin fuente primaria directa), identificación del género "cielo" o canción específica, ≥1 fuente
  - 0 flags `[VERIFICAR]` activos
