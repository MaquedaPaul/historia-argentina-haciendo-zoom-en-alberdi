# S01: Research — Encarnación/Suma del Poder Público y red Generación del 37

**Goal:** Producir un content draft verificado con fuentes, certeza asignada, y notas de inserción HTML para las cards nuevas de M011 que S03 integrará: (1) el rol de Encarnación Ezcurra en presionar para que Rosas exigiera la Suma del Poder Público como condición de su segundo mandato, y (2) la formación de la red Alberdi–Echeverría–Gutiérrez–López y Mariquita Sánchez de Thompson como catalizadora.

**Demo:** Existe el archivo `.gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` con ≥3 entradas de card. Cada entrada tiene: título, año/período, certeza asignada, excerpt (2–4 oraciones), fuentes (≥1 por entrada), nota de inserción HTML, y sin `[VERIFICAR]` sin resolver. El debate sobre el lobby de Encarnación tiene certeza `debatido` o `hecho` según lo que la evidencia soporte, con justificación explícita.

## Must-Haves

- Draft de card para el rol de Encarnación en la obtención de la Suma del Poder Público (1833–1835), con certeza asignada y justificada
- Draft de card(s) para la formación de la red Generación del 37 (cómo se conocieron Alberdi, Echeverría, Gutiérrez, V. F. López)
- Draft de card para Mariquita Sánchez de Thompson — perfil biográfico, tertulias 1810s–1830s, rol como catalizadora cultural, vínculo con la Gen. del 37
- Cada card con ≥1 fuente específica (no "historiografía general")
- Notas explícitas sobre dónde insertar cada card en index.html (qué sección, qué `data-id` sugerir)
- Sin claims con certeza `hecho` que no tengan fuente verificada

## Proof Level

- This slice proves: contract (research draft ready for integration)
- Real runtime required: no
- Human/UAT required: no

## Verification

- `test -f .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` — archivo existe
- `grep -c "^## " .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` — returns ≥ 3 (≥3 cards drafted: Encarnación/Suma, red Gen. del 37, Mariquita)
- `grep -c "Certeza:" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` — returns ≥ 3 (cada card tiene certeza asignada)
- `grep -c "Fuentes:" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` — returns ≥ 3 (cada card tiene fuentes)
- Failure-path check: `grep -c "\[VERIFICAR\]" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` — returns 0 (no flags sin resolver al finalizar S01)

## Observability / Diagnostics

- Runtime signals: el draft file es el único artefacto; los `[VERIFICAR]` inline son la señal de trabajo incompleto
- Inspection surfaces: `grep "\[VERIFICAR\]" S01-CONTENT-DRAFT.md` muestra claims sin verificar; `grep "^## " S01-CONTENT-DRAFT.md` lista todas las cards draftadas
- Failure visibility: certeza `hecho` sin fuente específica en la línea "Fuentes:" — detectable con `grep -A5 "Certeza: hecho" S01-CONTENT-DRAFT.md | grep "Fuentes: —"` (should return empty)
- Redaction constraints: ninguno — todo contenido es histórico público

## Integration Closure

- Upstream surfaces consumed: `index.html` (para entender qué cards ya existen sobre Encarnación y la Suma antes de agregar), `.gsd/DECISIONS.md` (D051 sobre 9,316 votos, D052 sobre card-opinion para debatido), `KNOWLEDGE.md` (protocolo de certeza y Quote Verification Protocol)
- New wiring introduced in this slice: `S01-CONTENT-DRAFT.md` como especificación de entrada para S03-T01 (HTML Integration)
- What remains before the milestone is truly usable end-to-end: S02 (Alberdi/Cané y romances), luego S03 (HTML integration de S01+S02)

## Tasks

- [x] **T01: Research y draft — Encarnación y el lobby para la Suma del Poder Público** `est:45m`
  - Why: La pregunta central de S01 — si Encarnación presionó *específicamente* por la Suma del Poder Público como condición del regreso de Rosas — no está respondida en el contenido existente. Las cards S23-1, S23-2, S24-1, S24-2 cubren su rol general y su agencia, pero ninguna aborda la pregunta específica del "lobby de la Suma". Esta card cierra ese gap con certeza justificada.
  - Files: `.gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` (crear)
  - Do: (1) Revisar qué ya existe en index.html sobre Encarnación (S23-1, S23-2, S24-1, S24-2) y la Suma del Poder Público (S14-1) para no duplicar. (2) Investigar via web: buscar "Encarnación Ezcurra Suma del Poder Público" + "lobby 1835" en fuentes como AGN Sala X (publicado 1923), Lynch cap. 5, Irazusta, Ramos Mejía, y historiografía reciente (Di Meglio, Cansanello, etc.). (3) Determinar si hay evidencia de que Encarnación presionó específicamente por la Suma como condición (no solo por el regreso de Rosas). (4) Asignar certeza: si la evidencia es directa → `hecho`; si es inferencia de su red política → `debatido`; si es atribución de una sola corriente historiográfica → `opinion`. (5) Redactar la entrada en S01-CONTENT-DRAFT.md siguiendo el formato estándar. Crear el archivo con encabezado de contexto. (6) Respetar D051: usar 9,316 (no 9,320) si se menciona el plebiscito. Respetar D052: usar `card-opinion` class para certeza `debatido`. (7) Proponer `data-id` para la card nueva (ej: `M011-ENC-1`) y nota de inserción HTML (dónde iría en el DOM — cerca de S23-2 o en una sección nueva).
  - Verify: `test -f .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md && grep -q "Encarnaci" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md`
  - Done when: S01-CONTENT-DRAFT.md existe con ≥1 entrada sobre Encarnación/Suma, certeza asignada con justificación de al menos 2 líneas, ≥1 fuente específica (autor + obra + año)

- [x] **T02: Research y draft — Red Generación del 37 y Mariquita Sánchez de Thompson** `est:60m`
  - Why: El sitio menciona el Salón Literario de 1837 y a Mariquita como dueña del piano de Alberdi (BIOG-7), pero no tiene cards dedicadas a cómo se formó la red intelectual de la Generación del 37 ni a Mariquita como figura cultural central. M011 requiere hacer visible esta dimensión relacional — no solo listar nombres sino narrar cómo se conectaron.
  - Files: `.gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` (append)
  - Do: (1) Revisar contenido existente en index.html: BIOG-5 (Colegio con Cané), BIOG-7 (piano de Mariquita), BIOG-11 (Salón Literario 1837), BIOG-12 (La Moda / El Iniciador), SP3-3 (Generación del 37 en el exilio). Estos son los puntos de anclaje — las nuevas cards deben complementarlos, no duplicarlos. (2) Investigar la formación de la red: ¿dónde y cuándo se conocieron Alberdi y Echeverría? (el Salón Literario 1837 es el punto conocido — ¿hubo contacto anterior via Mariquita?). ¿Cuándo entró Juan María Gutiérrez al círculo? ¿Y Vicente Fidel López? Fuentes: Weinberg, F., *El Salón Literario de 1837*, Hachette, 1977; Mayer, J., *Alberdi y su tiempo*, EUDEBA, 1963; Wikipedia ES/EN sobre cada figura; historiografía sobre la Joven Argentina / Asociación de Mayo. (3) Investigar Mariquita Sánchez de Thompson: perfil biográfico completo (1786–1868), sus tertulias en Buenos Aires desde los años 1810s, qué intelectuales frecuentaban su casa específicamente en los años 1830–1838, su exilio en Montevideo, su correspondencia con Echeverría y otros. ¿Asistió Alberdi a sus tertulias más allá de usar su piano? Fuentes: Wikipedia ES "Mariquita Sánchez de Thompson"; *Recuerdos del Buenos Aires virreinal* (Mariquita's memoir); López Aranegui, R.; Barros, C. (historiografía sobre Mariquita). (4) Redactar 2–3 entradas de card en S01-CONTENT-DRAFT.md: una para la red Gen. del 37 (cómo se formó como grupo), una para Mariquita (perfil biográfico + tertulias + Gen. del 37). (5) Para cada card, proponer `data-id` (ej: `M011-RED37-1`, `M011-MARIQ-1`) y nota de inserción HTML: ¿van en `#rev-alberdi-formacion` después de BIOG-11? ¿O en una subsección nueva? Evaluar si encajan en el grid existente o requieren una nueva subsección. (6) Aplicar el Quote Verification Protocol: no sintetizar citas directas de Mariquita o Echeverría sin verificar la fuente primaria; usar paráfrasis atribuidas si no hay texto verificado.
  - Verify: `grep -c "^## " .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` returns ≥ 3 AND `grep -q "Mariquita" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md`
  - Done when: S01-CONTENT-DRAFT.md tiene ≥3 cards totales (≥1 Encarnación/Suma de T01 + ≥2 nuevas de T02), cada card con certeza asignada, ≥1 fuente específica, nota de inserción HTML, y 0 `[VERIFICAR]` sin resolver

## Files Likely Touched

- `.gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` (crear en T01, completar en T02)
