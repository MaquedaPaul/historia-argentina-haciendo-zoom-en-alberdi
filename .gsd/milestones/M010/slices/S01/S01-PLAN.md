# S01: Research y Content Draft — 14 al 25 de mayo de 1810

**Goal:** Producir un content draft verificado (`S01-CONTENT-DRAFT.md`) con todos los eventos day-by-day de la Semana de Mayo y las maniobras políticas, con fuentes identificadas y certeza asignada a cada claim. Este draft es el único output de S01 y el insumo directo para S02.
**Demo:** `.gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md` existe, contiene ≥9 entradas de card (7 días + ≥2 temáticas), cada entrada tiene fuentes verificadas y certeza asignada, y al menos una entrada está marcada como `card-nota-historiografica` para el debate popular vs. élite.

## Must-Haves

- 7 entradas de card para las fechas clave: 14, 18, 22, 23, 24, 25 y 30 de mayo de 1810
- ≥2 cards temáticas sobre maniobras políticas (Legión Infernal/French y Berutti, sobres duplicados, presión miliciana)
- 1 card con `card-nota-historiografica` para el debate "revolución popular vs. golpe de élites"
- Cada card con ≥1 fuente primaria o secundaria confiable citada explícitamente
- Certeza asignada a cada claim: `hecho`, `opinión`, `rumor`, o `debatido`
- Claims inciertos marcados explícitamente como `[VERIFICAR]` o `[VERIFICAR ATRIBUCIÓN]` — ningún claim sin fuente pasa silenciosamente como hecho
- El nombre correcto del grupo French/Berutti verificado (contemporáneo vs. denominación tardía)
- El mecanismo de los "sobres duplicados" descrito con la certeza apropiada

## Proof Level

- This slice proves: contract (content artifact para S02)
- Real runtime required: no
- Human/UAT required: no — verificación mecánica del archivo

## Verification

```bash
# 1. El draft existe y no está vacío
test -f .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md && wc -l .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md

# 2. Contiene ≥9 secciones de evento/card (una por ## Evento o ## Card)
grep -c "^## " .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md
# debe retornar ≥9

# 3. Cada entrada tiene sección de fuentes
grep -c "^### Fuentes" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md
# debe retornar ≥9

# 4. Certeza asignada a cada entrada
grep -c "Certeza:" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md
# debe retornar ≥9

# 5. Al menos una card-nota-historiografica planificada
grep -c "card-nota-historiografica" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md
# debe retornar ≥1

# 6. Claims inciertos marcados — no hay huecos silenciosos
grep -c "VERIFICAR" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md
# informa cuántos flags quedan abiertos (0 es ideal; cualquier valor es aceptable
# siempre que sea < número de claims; lo que NO es aceptable es ausencia total de
# sección de fuentes en alguna entrada)
```

## Observability / Diagnostics

<!-- PREFLIGHT FIX: Added failure-path diagnostic check -->
**Failure-state check:** Si alguna sección de fuentes en el draft está incompleta, el siguiente comando lo expone:
```bash
# Detecta entradas de card sin sección de fuentes (failure state visible)
grep -n "^## " .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md | while read -r line; do echo "$line"; done
# Comparar contra:
grep -c "^### Fuentes" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md
# Si el segundo número < el primero (menos la sección ## Resumen), hay entradas sin fuentes.
```

Este slice produce un artefacto estático (markdown), no un proceso en runtime. La "observabilidad" aquí se refiere a la inspectabilidad del estado de verificación del contenido:

- **Estado de verificación expuesto:** El draft usa `[VERIFICAR]` y `[VERIFICAR ATRIBUCIÓN]` como marcadores inline en cualquier claim que no pudo verificarse directamente. Un agente futuro puede localizar exactamente qué claims son inciertos con `grep -n "VERIFICAR" S01-CONTENT-DRAFT.md`.
- **Conteo de certeza inspeccionable:** `grep -c "Certeza:" S01-CONTENT-DRAFT.md` devuelve el número de cards; `grep "Certeza:" S01-CONTENT-DRAFT.md` lista todas las asignaciones en una línea — cualquier discrepancia entre el total esperado (≥9) y el count real es error de cobertura.
- **Decisiones de nombre y mecanismo documentadas inline:** El draft incluye una sección de notas de verificación para los dos claims de alto riesgo — nombre del grupo French/Berutti y mecanismo de los sobres duplicados — con la fuente que resolvió la ambigüedad o el `[VERIFICAR]` explícito si no se resolvió.
- **Failure visibility:** Si T01 no pudo verificar un claim, el draft debe igualmente incluir la entrada de card con el campo de fuentes incompleto marcado como `[FUENTE PENDIENTE]` — no silenciar el gap. El agente ejecutor de T02 es responsable de no elevar a `hecho` ningún claim con ese marker.
- **Redaction constraints:** ninguna — todo el contenido es histórico público.

## Integration Closure

- **Upstream surfaces consumed:** `index.html` (solo lectura — para verificar que SP1-1 existe y no requiere modificación); `.gsd/milestones/M010/M010-CONTEXT.md` (lista de fechas y riesgos); DECISIONS.md (D008, D009, D010 sobre certeza; D012 sobre sistema visual).
- **New wiring introduced:** `S01-CONTENT-DRAFT.md` — contrato de contenido para S02. El executor de S02 toma este archivo como la única fuente de verdad para las cards; no investiga de nuevo.
- **What remains before the milestone is truly usable end-to-end:** S02 (integración HTML — las cards en `index.html`). S01 solo produce el draft; nada es visible al usuario todavía.

## Tasks

- [x] **T01: Investigar y verificar las fechas clave, nombres y mecanismos de la Semana de Mayo** `est:45m`
  - Why: Los 3 key risks de M010 (nombre del grupo French/Berutti, mecanismo de sobres duplicados, debate popular vs. élite) son los claims más frágiles del draft. D008 exige verificación antes de integrar. Sin T01, T02 estaría escribiendo ficción histórica.
  - Files: `.gsd/milestones/M010/slices/S01/S01-RESEARCH-NOTES.md` (nuevo — notas de investigación intermedias), fuentes web via web_search/fetch_page
  - Do:
    1. Investigar el nombre exacto del grupo de presión de French y Berutti: ¿"Legión Infernal", "Legión ardiente", o simplemente "el grupo de French y Berutti"? Determinar cuál denominación es contemporánea a 1810 y cuál es de época tardía. Usar web_search con términos "French Berutti escarapelas grupo 1810 nombre" y "legión infernal legión ardiente mayo 1810 historiografía".
    2. Investigar el mecanismo de los "sobres duplicados" del Cabildo Abierto del 22 de mayo: ¿qué exactamente pasó? ¿Exclusión de invitaciones, lista manipulada, o algo más específico? Verificar con fuentes: Levene (Historia de la Nación Argentina), Actas del Cabildo AGN, o historiografía accesible (Pigna, Halperin). Asignar certeza `debatido` si el mecanismo exacto varía por fuente.
    3. Verificar los datos factuales de cada fecha clave: (a) 14 mayo — quién exactamente trajo la noticia de la caída de la Junta Central, desde dónde, cuándo llegó exactamente a Buenos Aires; (b) 18 mayo — quiénes firmaron la petición, qué pedía exactamente; (c) 22 mayo — número de convocados vs. asistentes al Cabildo Abierto, resultado del voto (155 vs 69 es el dato de SP1-1 — verificar que ese dato no se contradice); (d) 23–24 mayo — composición de la Junta Cisneriana que se rechazó; (e) 25 mayo — hora aproximada, condiciones meteorológicas (la lluvia), quién fue a buscar a los miembros de la junta; (f) 30 mayo — qué acciones concretas tomó la Junta en sus primeros días.
    4. Recopilar las posiciones historiográficas sobre el debate "popular vs. élite": Mitre (popular), Halperin Donghi (proceso de élites), Pigna (síntesis) — identificar citas o paráfrasis verificadas para cada posición.
    5. Verificar disponibilidad de imágenes Wikimedia para las fechas clave usando la API: buscar retratos de Cisneros, Saavedra, Belgrano (ya usado en SP1-3), el acta del 22 o 25 de mayo, y algún documento de la época. Identificar al menos 5 candidatos con URL de 500px thumb.
    6. Documentar todos los hallazgos en `S01-RESEARCH-NOTES.md` — incluyendo claims no verificados con `[NO VERIFICADO]` explícito.
  - Verify: `test -f .gsd/milestones/M010/slices/S01/S01-RESEARCH-NOTES.md && grep -c "##" .gsd/milestones/M010/slices/S01/S01-RESEARCH-NOTES.md` retorna ≥5 (5 secciones temáticas cubiertas)
  - Done when: `S01-RESEARCH-NOTES.md` existe con secciones para las 7 fechas + nombre del grupo + mecanismo sobres duplicados + debate historiográfico + candidatos de imagen, y todos los claims de alto riesgo tienen fuente asignada o `[NO VERIFICADO]` explícito.

- [x] **T02: Escribir S01-CONTENT-DRAFT.md con las entradas verificadas** `est:30m`
  - Why: El draft transforma los hallazgos de T01 en el contrato de contenido formal que S02 consumirá para producir HTML. Usando el formato de content draft de milestones anteriores (M002, M003), el executor de S02 puede hacer la integración HTML de forma mecánica sin re-investigar.
  - Files: `.gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md` (nuevo), `.gsd/milestones/M010/slices/S01/S01-RESEARCH-NOTES.md` (input de T01)
  - Do:
    1. Crear `S01-CONTENT-DRAFT.md` en `.gsd/milestones/M010/slices/S01/` siguiendo exactamente el formato de `M002/slices/S01/S01-CONTENT-DRAFT.md`: header con status/total events/language, luego una sección `## Evento` por card con campos: Título, Fecha display, Certeza, Indicador, Extracto (card text), Fuentes y verificación, Cita para `<cite>`, Notas de imagen.
    2. Escribir 7 entradas day-by-day en orden cronológico: 14 mayo, 18 mayo, 22 mayo, 23 mayo, 24 mayo, 25 mayo, 30 mayo. Para cada una: asignar certeza (`hecho` si los hechos son documentados; `debatido` si hay variación entre fuentes), escribir excerpt de 3–5 oraciones, listar ≥1 fuente (≥2 para hecho), escribir la cita `<cite>`, y notar candidatos de imagen.
    3. Escribir 2–3 entradas temáticas (estas se convertirán en cards temáticas en S02): (a) El grupo de French y Berutti — nombre verificado, distribución de escarapelas, control de la Plaza. (b) El mecanismo de los sobres duplicados — con certeza `debatido` si el mecanismo exacto no está claro. (c) La presión miliciana de Saavedra — el rol de los cuerpos militares el 25 de mayo.
    4. Escribir 1 entrada especial de tipo `card-nota-historiografica` para el debate "¿revolución popular o golpe de élites?" siguiendo el patrón de tres posiciones establecido en D056: posición liberal (Mitre), posición revisionista/estructuralista (Halperin Donghi), síntesis contemporánea. Cada posición con atribución explícita (autor + obra + año). Certeza: `debatido`.
    5. Marcar con `[VERIFICAR]` cualquier claim que T01 no pudo verificar directamente. Marcar con `[VERIFICAR ATRIBUCIÓN]` cualquier cita directa que no fue verificada contra el texto original. Nunca elevar a `hecho` sin fuente.
    6. Incluir al final del archivo una sección `## Resumen de certeza` que liste el conteo total de cards y la distribución de certeza (ej: "7 hecho, 2 debatido, 1 nota-historiografica"). Esto permite a S02 verificar la cobertura de un vistazo.
  - Verify:
    ```bash
    grep -c "^## " .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md  # ≥10 (9 cards + 1 resumen)
    grep -c "^### Fuentes" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md  # ≥9
    grep -c "Certeza:" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md  # ≥9
    grep -c "card-nota-historiografica" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md  # ≥1
    ```
  - Done when: `S01-CONTENT-DRAFT.md` existe con ≥9 entradas de card, cada una con fuentes y certeza asignada, al menos una marcada como `card-nota-historiografica`, y la sección `## Resumen de certeza` al final.

## Files Likely Touched

- `.gsd/milestones/M010/slices/S01/S01-RESEARCH-NOTES.md` (nuevo — T01)
- `.gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md` (nuevo — T02)
- `index.html` (solo lectura — para verificar SP1-1 y no duplicar content)
