---
id: T01
parent: S02
milestone: M011
provides:
  - S02-CONTENT-DRAFT.md con cards M011-CANE-1 y M011-CANE-2 listas para S03 HTML integration
key_files:
  - .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md
  - .gsd/milestones/M011/slices/S02/S02-PLAN.md
key_decisions:
  - certeza-debatido-para-escena-cielo: La escena de la despedida con el "cielo" recibe certeza `debatido` porque el pasaje de Mi vida privada y la cita de Mayer (1963) no se pudieron verificar contra una edición paginada; el género "cielo" sí fue verificado como género musical, no canción específica.
  - vicente-lopez-es-el-hijo: "Vicente López" en el contexto de la Gen. del 37 = Vicente Fidel López (1815–1903), no Vicente López y Planes (1784–1856, autor del Himno Nacional). Ambas personas existieron en paralelo; solo el hijo era coetáneo del grupo.
patterns_established:
  - card-nota-certeza-inline-para-escena-sin-paginacion: Cuando una escena es narrada en fuente primaria reconocida pero sin paginación verificada, usar certeza `debatido` y card-nota-certeza inline que indica dónde buscar la verificación. Patrón previo: M011-MARIQ-1 (Himno Nacional).
observability_surfaces:
  - "test -f .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md && grep -q 'M011-CANE' .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md"
  - "grep -c '\\[VERIFICAR\\]' .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md  # debe ser 0"
  - "grep -E '^- Certeza:' .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md  # audita clasificaciones"
duration: ~45min
verification_result: passed
completed_at: 2026-03-24
blocker_discovered: false
---

# T01: Research y draft — Alberdi–Cané y la escena del "Cielo..."

**Creadas cards M011-CANE-1 (arco de la amistad, certeza hecho) y M011-CANE-2 (escena del "cielo", certeza debatido) con "cielo" identificado como género rioplatense y Vicente Fidel López confirmado como el coetáneo del grupo.**

## What Happened

Revisé los anclajes HTML existentes: BIOG-5 menciona a Cané solo como "compañero de banco" en 1824; BIOG-12 lo menciona como co-fundador de *El Iniciador* en 1838. El gap narrativo es el arco completo de la amistad entre esos dos puntos.

**Investigación sobre Cané (padre):** Wikipedia ES ("Miguel Cané (padre)") provee la biografía completa: nacido 1812 en San Pedro, estudió en el Colegio de Ciencias Morales junto con Alberdi, juntos fundaron una Asociación de Estudios Históricos y Sociales, participó del Salón Literario de 1837, se trasladó a Montevideo *antes* de la persecución de la Gen. del 37, co-fundó *El Iniciador* el 15 de abril de 1838 con Andrés Lamas, murió el 5 de julio de 1863. Una carta de Gutiérrez a Alberdi (citada en journals.openedition.org con referencia a *Escritos Póstumos*, t. XIII) llama a Cané "San Bernardo de la cruzada", estableciendo el peso del vínculo en el exilio. Esto permite una card M011-CANE-1 de certeza `hecho` bien anclada.

**Investigación sobre el "cielo":** Wikipedia ES ("Cielito") y el estudio académico de Juan María Veniard (UCA, "El complejo Cielito. Su música") confirman que el "cielo" es un **género musical rioplatense** — no una canción con letra fija — que fue la danza y canto patriótico de la Independencia y que se bailó en los salones cultos argentinos hasta la tercera década del siglo XIX. El académico Veniard confirma que las frases del cielito inician con la palabra "cielo". Esto resuelve la pregunta del plan: "cielo" = género musical, no canción específica.

**Investigación sobre la escena de la despedida:** La escena es mencionada en M011-CONTEXT.md como "documentada en *Mi vida privada* (Alberdi) y en la correspondencia publicada por Mayer (1963)". Sin embargo, en ninguna de las fuentes web consultadas (serargentino.com, revistes.uab.cat, dialnet, kohafacimed.uncoma.edu.ar, ri.conicet.gov.ar) aparece el pasaje específico de *Mi vida privada* que describe la escena. El texto completo de *Mi vida privada* no está digitalmente indexado con paginación verificable en las fuentes accesibles. La edición de *Obras Completas* t. VIII y la edición Cruz del Sur (1944, memoriachilena.gob.cl) son la ruta de verificación. Por esto: certeza `debatido`, con nota inline y nota para S03 indicando exactamente cómo y dónde verificar.

**Sobre Vicente López:** La distinción padre/hijo es importante y fue investigada: Vicente Fidel López (1815–1903, historiador) era coetáneo de Alberdi y Cané y miembro documentado de la Gen. del 37 (aparece en fuentes de Cervantesvirtual sobre el Salón Literario y en la card M011-RED37-1 del S01-CONTENT-DRAFT.md). Vicente López y Planes (1784–1856) fue el padre y autor del Himno Nacional — una generación mayor. El plan de la tarea identificaba correctamente esta distinción como crítica.

**Fixing observability gap en S02-PLAN.md:** Se agregó la sección `## Observability / Diagnostics` y un failure-path check al bloque de Verification del slice plan, como indicado en el preflight.

## Verification

Ejecuté el comando de verificación de la tarea:

```bash
test -f .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md \
  && grep -q "M011-CANE-1" .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md \
  && grep -q "M011-CANE-2" .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md \
  && grep -q -i "cielo" .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md \
  && [ "$(grep -c '\[VERIFICAR\]' .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md)" = "0" ] \
  && echo "ALL CHECKS PASSED"
```

Output: `ALL CHECKS PASSED`

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -f .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |
| 2 | `grep -q "M011-CANE-1" S02-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |
| 3 | `grep -q "M011-CANE-2" S02-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |
| 4 | `grep -q -i "cielo" S02-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |
| 5 | `[ "$(grep -c '\[VERIFICAR\]' S02-CONTENT-DRAFT.md)" = "0" ]` | 0 | ✅ pass | <1s |

*Nota: La verificación de nivel de slice incluye los mismos checks y pasará cuando T02 también se complete.*

## Diagnostics

- Para inspeccionar el draft: `cat .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md`
- Para verificar certeza de cards: `grep -E "^- Certeza:" .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md`
- Para auditar flags sin resolver: `grep -c '\[VERIFICAR\]' .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md` → debe ser 0
- Para verificar la escena del cielo: Requiere acceso a edición impresa de *Mi vida privada* (FNA, 1999) o *Obras Completas* t. VIII. Online: memoriachilena.gob.cl tiene edición Cruz del Sur 1944 pero necesita texto completo indexado.
- Vicente Fidel López verificado en Weinberg (comp.), *El Salón Literario de 1837*, Hachette, 1977 — disponible en historiografía secundaria.

## Deviations

El plan estimaba acceso a un pasaje específico de *Mi vida privada* que confirmara la escena del "cielo". Ese pasaje no pudo verificarse contra edición paginada en las fuentes web accesibles. Esto no es un blocker: la certeza `debatido` es el tratamiento correcto por el Quote Verification Protocol, y la nota de inserción HTML para S03 indica exactamente qué verificar y dónde antes de promover la certeza a `hecho`.

## Known Issues

- **Escena del "cielo" pendiente de verificación directa:** El pasaje de *Mi vida privada* que describe la despedida no fue localizado en ediciones digitalizadas accesibles. Ruta de verificación para S03: consultar *Obras Completas*, t. VIII, o edición FNA 1999. Si el texto se verifica, la certeza de M011-CANE-2 puede subirse a `hecho` y el span `card-nota-certeza` puede reducirse.
- **Mayer (1963) no accesible online:** *Alberdi y su tiempo* (EUDEBA, 1963) no está digitalizado en las fuentes consultadas. Es la fuente secundaria más citada para esta escena. Verificar en biblioteca física.

## Files Created/Modified

- `.gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md` — CREADO: draft con header de contexto, card M011-CANE-1 (arco amistad, certeza hecho) y M011-CANE-2 (escena cielo, certeza debatido)
- `.gsd/milestones/M011/slices/S02/S02-PLAN.md` — MODIFICADO: agregada sección `## Observability / Diagnostics` y failure-path check en Verification (fix del preflight gap)
- `.gsd/KNOWLEDGE.md` — MODIFICADO: agregada entrada "'Cielo/Cielito' es un Género Musical, no una Canción Específica" con distinción Vicente López padre/hijo y rutas de verificación para *Mi vida privada*
