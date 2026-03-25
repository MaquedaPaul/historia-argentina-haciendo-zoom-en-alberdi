---
estimated_steps: 7
estimated_files: 1
---

# T01: Investigar y redactar borrador verificado de las 5 facetas

**Slice:** S04 — Alberdi multifacético — periodista, abogado, economista, músico
**Milestone:** M007

## Description

Alberdi fue simultáneamente periodista, abogado, economista, músico y pensador en el exilio. Esta es la tarea de mayor riesgo de S04: verificar los títulos exactos de obras, las fechas, y las atribuciones para cada faceta antes de tocar el HTML. Específicamente, la faceta musical tiene incertidumbre sobre las composiciones específicas (el método de guitarra de 1832 está documentado; los títulos de composiciones de salón son menos citados). El borrador resultante hace que T02 sea mecánico en lugar de creativo.

El executor debe consultar fuentes web para verificar los hechos clave. Las fuentes confiables para Alberdi incluyen: elhistoriador.com.ar, Wikipedia ES/EN, JURSOC UNLP, institutojuanbautistaalberdi.net.ar, lagaceta.com.ar, cadep.ufm.edu, hacer.org, ensayistas.org.

**Contexto de estado post-S03 (baselines para no duplicar):**
- `data-certeza` en `index.html`: 45 cards
- Cards en `#rev-alberdi-formacion`: 11 (BIOG-1 a BIOG-11)
- Reveal elements: 65
- `card-nota-certeza` spans: 13
- Alberdi-quote blockquotes ya en uso (6 total): "Gobernar es poblar", "Una generación que empieza a vivir…", "El destierro es una escuela cruel…", "Los pueblos, como los hombres, no tienen alas…", "El pueblo que ha combatido veinte años…", y la cita sobre el consenso historiográfico (M004). No usar estas frases como blockquote en las nuevas cards.
- BIOG-7 ya menciona la música brevemente (tienda de Maldes + el piano de Mariquita Sánchez). No duplicar ese contenido — la card de músico en S04 debe ir más fondo: el método de guitarra de 1832, composiciones, contexto.
- BIOG-8 ya cubre el aspecto jurídico formativo. La card "abogado" en S04 debe cubrir el ejercicio profesional (post-formación) y el rol diplomático — no la etapa estudiantil.
- BIOG-11 y SP2-4 ya mencionan el *Fragmento* y las *Bases*. La card "escritor/pensador" en S04 debe enfocar en el meta-argumento historiográfico (exilio como condición de escritura libre), no repetir los hechos ya narrados.

## Steps

1. **Faceta periodista**: Buscar y verificar los datos de *El Iniciador* — revista fundada en Montevideo en 1838. Co-fundador: Miguel Cané (padre, 1812–1863) — el mismo compañero de banco del Colegio de Ciencias Morales en 1824 (per KNOWLEDGE.md). Confirmar seudónimo "Figarillo" (homenaje a Mariano José de Larra, periodista español). Identificar al menos 1 título de artículo o colaboración notable. Fuentes: Wikipedia ES "El Iniciador", elhistoriador.com.ar, JURSOC UNLP. Clasificar como `card-hecho`.

2. **Faceta abogado**: Verificar el ejercicio profesional en Buenos Aires (pre-1838) y en Valparaíso durante el exilio (1844–1855). Verificar su designación como encargado de negocios / representante diplomático de la Confederación Argentina en Europa (acreditado ante Francia, Gran Bretaña y España, ca. 1855–1860). Citar Halperin Donghi o equivalente. Documentar su concepción del derecho como herramienta política (referencia al *Fragmento* 1837: el derecho no como ciencia autónoma sino como instrumento de organización social). Clasificar como `card-hecho`.

3. **Faceta economista**: Verificar el título exacto del libro: *Sistema económico y rentístico de la Confederación Argentina según su Constitución de 1853*, publicado en Besançon (Francia), 1854. Confirmar las tres ideas centrales: libre comercio, inmigración europea como política de estado, apertura al capital extranjero. Confirmar que es considerado el primer tratado de economía política sistemático argentino. Fuentes: cadep.ufm.edu, Wikipedia, elhistoriador.com.ar. Clasificar como `card-hecho` con posible `card-nota-certeza` si el superlativo "primer tratado" necesita matiz.

4. **Faceta músico**: Verificar título exacto: *Ensayo sobre un método nuevo para aprender a tocar la guitarra con la mayor facilidad* (1832). Verificar la afirmación de que es el primer método de guitarra publicado en el Río de la Plata. Confirmar que tocaba guitarra y fortepiano (el fortepiano ya está mencionado en BIOG-7). Buscar títulos de composiciones específicas de Alberdi — si no están verificados en fuentes confiables, marcar con `[VERIFICAR ATRIBUCIÓN]` en el borrador y usar `card-nota-certeza` en la card HTML. Fuentes: lagaceta.com.ar, institutojuanbautistaalberdi.net.ar, Wikipedia. Clasificar como `card-hecho`; composiciones específicas no verificadas → `card-nota-certeza`.

5. **Faceta escritor/pensador en el exilio**: Síntesis historiográfica — NO repetir hechos ya cubiertos en BIOG-11 (*Fragmento* 1837) ni en SP2-4 (*Bases* 1852) ni en el cierre de M004 (*El crimen de la guerra*). El ángulo debe ser el meta-argumento: el exilio como condición de su escritura más libre e influyente; la paradoja de diseñar la Constitución desde afuera; su evolución desde el romanticismo del Salón Literario al liberalismo constitucional maduro. Atribuir esta lectura a historiadores (Halperin Donghi, Mayer, o equivalente). Clasificar como `card-opinion`.

6. **Escribir S04-CONTENT-DRAFT.md**: Estructura: 5 secciones numeradas BIOG-12 a BIOG-16 (verificar que no haya BIOG-12 ya en index.html — `grep -c 'BIOG-12' index.html` debe ser 0). Para cada bloque: `## BIOG-NN: [Faceta]` / `**Certeza:** card-hecho | card-opinion` / `**Excerpt** (3–5 oraciones)` / `**Fuentes:**` (≥2) / `**Cite reference:**` / `**Notas de imagen:**` / `**Notas de certeza:**` (si hay `card-nota-certeza` necesario).

7. **Verificar que ninguna cita blockquote repite las 6 existentes**: Si alguna card de facetas propone una cita directa de Alberdi, confirmar que no está entre las 6 ya en uso (listadas arriba en el contexto). Si el borrador propone una nueva cita directa, verificar su fuente primaria antes de incluirla.

## Must-Haves

- [ ] 5 secciones BIOG-12 a BIOG-16 en el borrador, cada una con certeza explícita
- [ ] ≥2 fuentes verificadas por faceta
- [ ] Faceta musical: afirmación del "primer método de guitarra" verificada o marcada con `[VERIFICAR ATRIBUCIÓN]`
- [ ] Faceta escritor: clasificada como `card-opinion` (no card-hecho) porque es una lectura interpretativa historiográfica
- [ ] Ninguna cita directa de Alberdi sintetizada sin fuente primaria verificada
- [ ] `grep -c 'BIOG-12' index.html` → 0 confirmado (evitar numeración que choque)

## Verification

- `test -f .gsd/milestones/M007/slices/S04/S04-CONTENT-DRAFT.md` → archivo existe
- `grep -c '## BIOG-\|## Bloque' .gsd/milestones/M007/slices/S04/S04-CONTENT-DRAFT.md` → ≥5
- `wc -l .gsd/milestones/M007/slices/S04/S04-CONTENT-DRAFT.md` → ≥80 líneas (borrador sustancial)

## Inputs

- `index.html` — leer para confirmar qué ya está en BIOG-7 (música), BIOG-8 (derecho), BIOG-11 (Fragmento), SP2-4 (Bases), y las 6 citas alberdi-quote; evitar duplicaciones
- S03-SUMMARY.md (inlined en el plan) — baselines: 45 cards, 65 reveal elements, 13 card-nota-certeza
- KNOWLEDGE.md — protocolo de verificación de citas Alberdi; patrón card-nota-certeza; normalización de data-certeza

## Expected Output

- `.gsd/milestones/M007/slices/S04/S04-CONTENT-DRAFT.md` — borrador verificado con 5 bloques (BIOG-12 a BIOG-16), fuentes documentadas, notas de certeza, y flags `[VERIFICAR ATRIBUCIÓN]` donde aplique
