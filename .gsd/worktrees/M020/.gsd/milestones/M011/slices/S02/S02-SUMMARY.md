---
id: S02
parent: M011
milestone: M011
provides:
  - S02-CONTENT-DRAFT.md con 4 cards verificadas (M011-CANE-1, M011-CANE-2, M011-ROM-1, M011-ROM-2), listas para S03 HTML integration
requires: []
affects:
  - S03
key_files:
  - .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md
key_decisions:
  - cielo-es-genero-no-cancion: "Cielo" (cielito) es un género musical rioplatense — no una canción con letra fija. Floreció 1810–1830; para 1838 era ya un género nostálgico en declive. Su aparición en la escena de despedida tiene peso simbólico específico porque invocar el género en 1838 era un acto de memoria patriótica.
  - vicente-lopez-es-el-hijo: "Vicente López" en el contexto de la Gen. del 37 = Vicente Fidel López (1815–1903, historiador), no Vicente López y Planes (1784–1856, autor del Himno Nacional). Vicente Fidel López era coetáneo del grupo; su padre era una generación mayor.
  - certeza-debatido-para-escena-cielo: M011-CANE-2 recibe certeza `debatido` porque el pasaje de *Mi vida privada* y la cita de Mayer (1963) no se pudieron verificar contra edición paginada. El género "cielo" sí fue verificado; los detalles de la escena (presentes, palabras, fecha exacta) no.
  - ausencia-como-hecho-historiografico: La ausencia de documentación sentimental en *Mi vida privada* y en toda la historiografía alberdiana accesible es en sí misma un hecho verificable y documentado. M011-ROM-1 recibe certeza `hecho` para ese patrón biográfico.
  - ana-maria-medeiros-sin-fuente: "Ana María Medeiros" aparece en el roadmap como candidata a vínculo sentimental pero no tiene respaldo en ninguna fuente primaria ni secundaria accesible. M011-ROM-2 recibe certeza `rumor` con ruta de verificación hacia Mayer (1963) en biblioteca física.
patterns_established:
  - card-rumor-para-candidato-sin-fuente: Cuando un candidato a vínculo sentimental no aparece en ninguna fuente verificable accesible, la card documenta la ausencia explícitamente con certeza `rumor` y señala exactamente qué fuente física podría elevar la certeza. No se inventa contenido ni se eleva la certeza artificialmente.
  - certeza-hecho-para-patron-de-silencio: El silencio autobiográfico estructural documentado por múltiples académicos independientes puede recibir certeza `hecho` como rasgo biográfico, diferenciado de certeza `hecho` para un evento positivo verificado.
  - card-nota-certeza-inline-para-escena-sin-paginacion: Cuando una escena es narrada en fuente primaria reconocida pero sin paginación verificada, usar certeza `debatido` y span `card-nota-certeza` inline que indica dónde buscar la verificación. Tercer caso establecido en el proyecto (M004 death date, M011-MARIQ-1 Hymn tradition, ahora M011-CANE-2 cielo scene).
observability_surfaces:
  - "test -f .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md"
  - "grep \"^## M011-\" .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md  # lista 4 cards"
  - "grep -E \"^- Certeza:\" .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md  # hecho, debatido, hecho, rumor"
  - "grep -c '\\[VERIFICAR\\]' .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md  # debe ser 0"
drill_down_paths:
  - .gsd/milestones/M011/slices/S02/tasks/T01-SUMMARY.md
  - .gsd/milestones/M011/slices/S02/tasks/T02-SUMMARY.md
duration: ~75min (T01: ~45min + T02: ~30min)
verification_result: passed
completed_at: 2026-03-24
---

# S02: Research — Alberdi y Cané, la escena del "Cielo..." y los romances

**S02-CONTENT-DRAFT.md entregado con 4 cards verificadas (CANE-1, CANE-2, ROM-1, ROM-2), certeza diferenciada en cada una, 0 flags VERIFICAR activos, y notas de inserción HTML para consumo directo por S03.**

## What Happened

T01 estableció el arco biográfico de la amistad Alberdi–Cané (1824–1863) y la escena de la despedida con el "cielo". T02 completó el draft con las dos cards de romances.

**T01: La amistad y la escena del "Cielo..."**

El trabajo comenzó auditando los anclajes HTML existentes: BIOG-5 menciona a Cané apenas como "compañero de banco" en 1824; BIOG-12 lo menciona como co-fundador de *El Iniciador* en 1838. El gap es el arco de 14 años de amistad que hace inteligibles esos dos eventos. La investigación produjo dos hallazgos críticos:

**"Cielo" = género musical, no canción.** El cielito es un género rioplatense de canción y danza patriótica (Wikipedia ES "Cielito"; Veniard, UCA) que floreció en el período 1810–1830 y que para 1838 era ya un género nostálgico y en declive en los salones cultos. Esto resuelve la pregunta del plan ("¿cielo es género o canción específica?") y añade peso simbólico a la escena: entonar un cielito en una despedida de exilio en 1838 era invocar la memoria de la Independencia en un momento en que la forma misma estaba desapareciendo.

**Vicente López = el hijo.** La investigación confirmó que "Vicente López" en el contexto de la Gen. del 37 es Vicente Fidel López (1815–1903, historiador), no su padre Vicente López y Planes (1784–1856, autor del Himno Nacional). Vicente Fidel López era coetáneo exacto de Alberdi (1811) y Cané (1812) y miembro documentado del Salón Literario de 1837. La distinción es crítica para S03.

El arco de la amistad (M011-CANE-1) recibió certeza `hecho`: el encuentro en el Colegio de Ciencias Morales (1824), la Asociación de Estudios Históricos, el Salón Literario (1837), la co-fundación de *El Iniciador* (15 abril 1838), y la carta de Gutiérrez a Alberdi sobre Cané ("es el San Bernardo de la cruzada") están todos verificados en fuentes independientes. La escena de la despedida (M011-CANE-2) recibió certeza `debatido`: el género "cielo" es verificado, la escena está narrada en *Mi vida privada* y citada por Mayer (1963), pero el pasaje exacto y la nómina precisa de presentes no pudieron verificarse contra edición paginada en las fuentes digitalizadas accesibles.

**T02: Los romances de Alberdi**

La investigación buscó "Ana María Medeiros" en todas las bases de datos académicas accesibles (CONICET, Dialnet, Cervantesvirtual, Mitologías Hoy/UAB, historiografía alberdiana de Martino 2016, Terán 2004, García Mérou 1890). Resultado: cero coincidencias. El nombre no aparece en ninguna fuente primaria ni secundaria identificada.

Paralelamente, la revisión de la autobiografía *Mi vida privada* en edición Cervantesvirtual (ed. Jackson, pp. 27–64) confirmó el hallazgo de Martino (2016): el texto cubre formación intelectual, decisiones políticas y memoria cultural sin ninguna referencia a vínculos amorosos. Terán (2004) y Mayer (1963) —la bibliografía de referencia— reproducen ese silencio.

La decisión de redactar dos cards en lugar de una surgió de la distinción epistémica: el patrón biográfico de discreción es un hecho verificable (M011-ROM-1, certeza `hecho`), pero Ana María Medeiros como candidata específica no tiene fuente (M011-ROM-2, certeza `rumor`). Las dos cards ofrecen más granularidad a S03 que una sola card genérica.

## Verification

Todos los checks de nivel de slice pasaron:

| Check | Resultado |
|-------|-----------|
| `test -f S02-CONTENT-DRAFT.md` | ✅ PASS |
| `grep -q "M011-CANE-1"` | ✅ PASS |
| `grep -q "M011-CANE-2"` | ✅ PASS |
| `grep -q -i "cielo"` | ✅ PASS |
| `grep -q "M011-ROM"` | ✅ PASS |
| `grep -c '\[VERIFICAR\]'` → 0 | ✅ PASS |
| Cards: 4 == Certeza lines: 4 | ✅ PASS |

Certeza assignments: `hecho` (CANE-1), `debatido` (CANE-2), `hecho` (ROM-1), `rumor` (ROM-2).

## New Requirements Surfaced

- none

## Deviations

**T01:** El plan estimaba acceso a un pasaje específico paginado de *Mi vida privada*. Ese pasaje no se encontró en ediciones digitalizadas accesibles. El tratamiento correcto es certeza `debatido` con nota de inserción HTML que indica la ruta de verificación para S03. No es un blocker.

**T02:** El plan mencionaba investigar "referencias del exilio chileno" como tercer candidato de romance. Dada la ausencia total de fuentes para Ana María Medeiros (candidato más concreto), expandir a candidatos aún menos definidos habría diluido la calidad del draft. La decisión fue redactar ROM-1 (patrón general) y ROM-2 (único candidato nombrado disponible), cubriendo el espectro completo con mayor honestidad epistémica.

## Known Limitations

- **M011-CANE-2 pendiente de verificación directa:** El pasaje de *Mi vida privada* con la escena del "cielo" no fue localizado en ediciones digitalizadas accesibles. La certeza es `debatido`. Ruta: *Obras Completas*, t. VIII, o edición FNA 1999. Si se verifica, certeza sube a `hecho` y el span `card-nota-certeza` puede reducirse.
- **Mayer (1963) no accesible online:** *Alberdi y su tiempo* (EUDEBA) no está digitalizado. Es la fuente secundaria más citada para la escena del "cielo" y la más probable para cualquier referencia a Ana María Medeiros. Verificar en biblioteca física antes de que S03 integre M011-CANE-2 y M011-ROM-2 en HTML público.
- **M011-ROM-2 integración condicionada:** S03 debería considerar omitir esta card del HTML público hasta verificar si Mayer (1963) la menciona. La card existe en el draft para documentar exhaustivamente lo investigado, no para publicación automática.

## Follow-ups

- Consultar Mayer (1963) en biblioteca física: (1) índice onomástico para "Medeiros", (2) pasaje de la escena del "cielo" con paginación exacta. Estos dos checks desbloquean el upgrade de certeza para M011-CANE-2 y M011-ROM-2.
- Verificar el pasaje de *Mi vida privada* en edición FNA (1999) o *Obras Completas* t. VIII para confirmar nómina de presentes y formulación exacta del "cielo" en la despedida.

## Files Created/Modified

- `.gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md` — CREADO (T01) y COMPLETADO (T02): 4 cards, 0 VERIFICAR flags, certeza diferenciada, notas de inserción HTML para S03
- `.gsd/milestones/M011/slices/S02/S02-PLAN.md` — MODIFICADO (T01): agregada sección `## Observability / Diagnostics` y failure-path check en Verification
- `.gsd/KNOWLEDGE.md` — MODIFICADO (T01): entrada "'Cielo/Cielito' es un Género Musical, no una Canción Específica" con distinción Vicente López y rutas de verificación

## Forward Intelligence

### What the next slice should know
- **S03 tiene especificaciones de inserción HTML completas en cada card.** La sección "Nota de inserción HTML" de cada card en S02-CONTENT-DRAFT.md indica: sección destino, `data-id` del nodo de inserción existente (BIOG-5, M011-CANE-1, M011-CANE-2, M011-ROM-1), clase CSS sugerida (`card-hecho`/`card-opinion`/`card-rumor`), y `data-certeza` value. La integración puede ser directa.
- **M011-ROM-2 es la única card que S03 debería integrar condicionalmente.** Las otras tres cards (CANE-1, CANE-2, ROM-1) pueden integrarse sin pasos de investigación adicionales. M011-ROM-2 debería verificarse contra Mayer (1963) antes de aparecer en HTML público.
- **Los spans `card-nota-certeza` ya están escritos verbatim en el draft.** Copiar directamente al HTML — no re-escribir. Cada span está listo para paste-in.
- **La sección destino para las 4 cards es `#rev-alberdi-formacion`**, sub-período "Los años de formación (1810–1838)" para CANE-1 y CANE-2, y "Alberdi en el exilio (1838–1855)" para ROM-1 y ROM-2. S03 necesita confirmar que ese sub-período existe en el HTML actual antes de integrar.
- **Vicente Fidel López (el hijo) debe identificarse claramente en el HTML de M011-CANE-2.** Si el nombre aparece como solo "Vicente López", añadir "(hijo)" o "(el historiador)" para evitar la confusión con el padre autor del Himno Nacional. Esta distinción tiene que ser visible al lector.

### What's fragile
- **Certeza `debatido` de M011-CANE-2** — depende de que S03 no la promueva silenciosamente a `hecho` sin verificar el pasaje fuente. Si S03 toca la certeza, debe hacerlo solo después de consultar la edición impresa.
- **M011-ROM-2 certeza `rumor`** — el único respaldo del nombre "Ana María Medeiros" en el contexto de M011 es el roadmap de planificación, que puede a su vez derivar de Mayer (1963) no verificado. S03 no debe asumir que el roadmap de planificación equivale a una fuente historiográfica.

### Authoritative diagnostics
- `grep "^## M011-" .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md` — lista las 4 cards; el orden es el orden de inserción HTML sugerido
- `grep -E "^- Certeza:" .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md` — muestra las 4 asignaciones: hecho, debatido, hecho, rumor
- `grep -c '\[VERIFICAR\]' .gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md` → 0 (blocker-free para S03)

### What assumptions changed
- **Asunción original:** La escena del "cielo" estaría verificable en ediciones digitalizadas de *Mi vida privada*. **Realidad:** el texto completo paginado no está indexado digitalmente en las fuentes accesibles; la verificación requiere biblioteca física o edición impresa.
- **Asunción original:** "Ana María Medeiros" tendría algún respaldo en historiografía secundaria. **Realidad:** ausencia total en todas las fuentes accesibles. El nombre posiblemente proviene de Mayer (1963) no digitalizado.
- **Asunción original:** Una sola card de romances sería suficiente. **Realidad:** la distinción epistémica entre patrón biográfico general (certeza `hecho`) y candidato específico sin fuente (certeza `rumor`) justifica y requiere dos cards separadas para mantener la integridad del sistema de certeza.
