---
estimated_steps: 6
estimated_files: 1
---

# T02: Research y draft — Red Generación del 37 y Mariquita Sánchez de Thompson

**Slice:** S01 — Research Encarnación/Suma del Poder Público y red Generación del 37
**Milestone:** M011

## Description

El sitio menciona el Salón Literario de 1837 y a Mariquita Sánchez de Thompson como dueña del piano de Alberdi (BIOG-7), pero no tiene cards dedicadas a (a) cómo se formó la red de la Generación del 37 como grupo cohesionado ni a (b) Mariquita como figura cultural central y catalizadora de esa generación. M011 requiere hacer visible la dimensión relacional de Alberdi — no listas de nombres sino narrativa de vínculos.

Esta tarea appende 2–3 nuevas entradas al `S01-CONTENT-DRAFT.md` creado en T01, completando el draft total de la slice.

## Steps

1. **Revisar los puntos de anclaje existentes** en `index.html` para evitar duplicación y encontrar los gaps:
   - BIOG-5 (línea ~442): Alberdi y Miguel Cané en el Colegio de Ciencias Morales (1824)
   - BIOG-7 (línea ~493): piano de Mariquita, tienda de Maldes
   - BIOG-11 (línea ~600): Salón Literario de 1837 — el arco de formación cerrando
   - BIOG-12 (línea ~637): La Moda y El Iniciador — la red en el exilio
   - SP3-3 (línea ~2161): Generación del 37 en el exilio — producción intelectual
   - El gap es: ¿cómo se conocieron y vincularon *antes* del Salón Literario? ¿Quién conectó a quién? ¿Qué rol jugó Mariquita en ese proceso?

2. **Investigar la formación de la red Generación del 37**:
   - ¿Cuándo regresó Esteban Echeverría de Europa? (ca. 1830 — verificar). ¿Cómo llegó al círculo de Alberdi?
   - ¿Cuándo entró Juan María Gutiérrez al círculo? (fue cofundador del Salón Literario con Alberdi y Sastre — verificar)
   - ¿Y Vicente Fidel López? (hijo del autor del Himno Nacional, Vicente López y Planes)
   - Fuentes: Weinberg, F., *El Salón Literario de 1837*, Hachette, Buenos Aires, 1977 (la fuente académica de referencia para esta red); Mayer, J., *Alberdi y su tiempo*, EUDEBA, 1963; Gorostegui de Torres, H., *Argentina: La organización nacional*, Paidós, 1972.

3. **Investigar a Mariquita Sánchez de Thompson** (María Josepha Petrona de Todos los Santos Sánchez de Velasco y Trillo, 1786–1868):
   - Perfil biográfico: familia, matrimonio con Martín Thompson (de donde el "de Thompson"), casamiento posterior con Jean-Baptiste Washington de Mendeville (de donde "de Mendeville")
   - Sus tertulias en Buenos Aires: ¿desde cuándo? ¿Quiénes asistían en los años 1830–1838? ¿Hay documentación de que Alberdi asistía a sus tertulias (más allá de usar su piano)?
   - El Himno Nacional cantado por primera vez en su casa (25 de mayo de 1813 — verificar exactitud; es tradición bien establecida pero a veces cuestionada)
   - Su exilio en Montevideo y correspondencia con Echeverría y otros miembros de la Generación del 37
   - Fuentes: Wikipedia ES "Mariquita Sánchez de Thompson"; *Recuerdos del Buenos Aires virreinal* (atribuido a Mariquita, publicado posthumamente); Barros, C., *Mariquita Sánchez: Vida política y sentimental* — verificar si existe esta obra; Argentina.gob.ar; Sosa de Newton, L., *Diccionario biográfico de mujeres argentinas*.

4. **Redactar 2–3 entradas** usando el mismo formato establecido en T01:
   
   **Card A — La red Generación del 37: cómo se formaron los vínculos (certeza probable: hecho/opinión)**
   Narrar el proceso: Echeverría vuelve de París (1830) con las ideas del romanticismo europeo y Saint-Simon → su Salón de 1835–1836 como antecedente del Salón Literario formal → 1837: Marcos Sastre, Alberdi, Echeverría, Gutiérrez cofundan el Salón → Asociación de Mayo como radicalización política del mismo círculo. Incluir a Mariquita como nodo previo (Alberdi usaba su piano, ella conocía a todos).
   
   **Card B — Mariquita Sánchez de Thompson: la anfitriona del siglo (certeza probable: hecho con nota sobre el Himno)**
   Perfil de Mariquita: 1786–1868, tertulias literarias y políticas desde los años 1810, primera defensora del casamiento por amor (juicio de 1805 — verificar si es bien documentado), figura puente entre la generación de Mayo y la Generación del 37. El Himno cantado en su casa es tradición documentada — verificar si hay fuente primaria o si es tradición sin documentación directa (aplicar certeza diferenciada si es necesario).

5. **Proponer `data-id` y nota de inserción HTML** para cada card:
   - Card A (Red Gen. 37): probablemente después de BIOG-11 en `#rev-alberdi-formacion`, antes del bloque "Las múltiples dimensiones de Alberdi". O después de BIOG-12 como contexto del exilio. Evaluar.
   - Card B (Mariquita): probablemente después de BIOG-7 (piano de Mariquita) en `#rev-alberdi-formacion`, como expansión de esa referencia.
   
   Sugerencias de data-id: `M011-RED37-1` y `M011-MARIQ-1` (M011 prefix para identificar origen en este milestone).

6. **Verificar completitud del draft total**:
   - `grep -c "^## " .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` — debe retornar ≥ 4 (T01 escribió ≥1, T02 appende ≥2–3 más; aunque 3 cards totales es mínimo aceptable)
   - `grep -c "\[VERIFICAR\]" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` — debe retornar 0 (no puede haber flags sin resolver al completar la slice)
   - Si algún claim quedó sin verificar durante la investigación, resolver o cambiar certeza antes de terminar

## Must-Haves

- [ ] ≥1 entrada de card sobre la formación de la red Generación del 37 (cómo se conocieron, el rol de Echeverría, Gutiérrez, V. F. López)
- [ ] ≥1 entrada de card sobre Mariquita Sánchez de Thompson — perfil biográfico + tertulias + vínculo con Gen. del 37
- [ ] Certeza del Himno Nacional en casa de Mariquita verificada o marcada con `card-nota-certeza` si es tradición sin fuente primaria
- [ ] Cada card con nota de inserción HTML (posición en DOM, data-id sugerido)
- [ ] Draft total (T01 + T02): `grep -c "^## " S01-CONTENT-DRAFT.md` ≥ 4
- [ ] 0 `[VERIFICAR]` sin resolver en todo el archivo al finalizar
- [ ] Quote Verification Protocol respetado: no citas directas de Mariquita/Echeverría sin fuente primaria verificada

## Verification

- `grep -c "^## " .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` returns ≥ 3
- `grep -q "Mariquita" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md`
- `grep -q "Echeverr" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md`
- `grep -c "\[VERIFICAR\]" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` returns 0

## Inputs

- `.gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` — creado por T01, este task appende las entradas restantes
- `index.html` — BIOG-5 (línea ~442), BIOG-7 (~493), BIOG-11 (~600), BIOG-12 (~637), SP3-3 (~2161) para entender los puntos de anclaje existentes y evitar duplicación
- `.gsd/KNOWLEDGE.md` — Quote Verification Protocol; Inline Epistemic Flag Pattern (card-nota-certeza)
- `.gsd/DECISIONS.md` — D009 (sistema de certeza), D010 (tratamiento visual), D052 (card-opinion para debatido)

## Expected Output

- `.gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` — completado con ≥4 entries totales (≥1 de T01, ≥2–3 de T02). El archivo está listo como input para S03 (HTML Integration). Cada entry tiene excerpt en español, certeza justificada, fuentes específicas, y nota de inserción HTML. Zero flags sin resolver.

## Observability Impact

- **Único artefacto runtime:** `S01-CONTENT-DRAFT.md` — este archivo es el producto completo de T02. No hay cambios en `index.html`, JS, ni CSS en esta tarea.
- **Señal de trabajo incompleto:** `grep "\[VERIFICAR\]" S01-CONTENT-DRAFT.md` — debe retornar 0 líneas al finalizar T02. Si retorna >0, el draft tiene claims sin resolver.
- **Listar cards completadas:** `grep "^## " S01-CONTENT-DRAFT.md` — lista todos los títulos de card (T01 + T02 juntos). Al completar T02 debe haber ≥4 entries.
- **Mariquita presente:** `grep -q "Mariquita" S01-CONTENT-DRAFT.md` — el check del slice falla si T02 no ha añadido la card M011-MARIQ-1.
- **Himno con certeza diferenciada:** `grep "card-nota-certeza" S01-CONTENT-DRAFT.md | grep -i "himno"` — verifica que el episodio del Himno Nacional está marcado inline como tradición sin documento primario, no como hecho certero.
- **Failure state visible para S03:** una certeza `hecho` sin fuentes específicas → detectable con `grep -A5 "Certeza: hecho" S01-CONTENT-DRAFT.md | grep "Fuentes: —"` (debe retornar vacío).
- **No hay señales browser/DOM** — el contenido es Markdown; la integración DOM es tarea de S03.
