---
estimated_steps: 5
estimated_files: 1
---

# T01: Research y borrador de contenido verificado (Bloques 1–4)

**Slice:** S01 — Infancia, familia y años formativos (1810–1824)
**Milestone:** M007

## Description

Antes de tocar `index.html`, toda la información histórica para los 4 bloques biográficos de S01 debe estar verificada, clasificada por certeza, y estructurada en un borrador que será la fuente única de verdad para la integración HTML en T02. Este es el trabajo de alto riesgo: errores históricos en el borrador son baratos de corregir; errores en el HTML (con stagger delays, certeza badges, y citas embebidas) son costosos.

Los 4 bloques a documentar:
1. **Bloque 1**: Nacimiento de Alberdi (29-ago-1810, San Miguel de Tucumán) y el padre Salvador María Alberdi como patriota en las campañas de Belgrano.
2. **Bloque 2**: Hermanos de Alberdi, la madre Josefa Rosa Aráoz y la crianza sin madre.
3. **Bloque 3**: El debate sobre la Revolución de Mayo — ¿todos apoyaron? La posición del padre vs. la élite realista tucumana; la reflexión crítica adulta de Alberdi.
4. **Bloque 4**: Muerte de la madre (ca. 1813) y muerte del padre (1824) — la doble orfandad.

## Steps

1. Buscar en fuentes web accesibles información sobre los Bloques 1–4. Fuentes primarias preferidas: *Mi vida privada* de Alberdi (Escritos póstumos, t. I, 1895) y Mayer, *Alberdi y su tiempo* (EUDEBA, 1963). Fuentes secundarias aceptables: Groussac, Botana, Wikipedia con cita verificable. Para cada dato, registrar la fuente explícitamente.
2. Para el Bloque 1: confirmar (a) fecha exacta 29-ago-1810, (b) que el nombre completo es Juan Bautista Alberdi, (c) que el padre fue Salvador María Alberdi, (d) el rol del padre en Tucumán durante las campañas de Belgrano de 1812–1813. Nota: verificar si el padre estuvo en el campo de batalla o apoyó la causa desde Tucumán como comerciante/ciudadano — la distinción importa para la certeza.
3. Para el Bloque 2: identificar los hermanos de Alberdi (Felipe es conocido; buscar otros). Confirmar el nombre de la madre: Josefa Rosa Aráoz (algunas fuentes dicen "Josefa Aráoz de Alberdi"). Documentar la crianza bajo tutela del padre o de un tío tras la muerte de la madre. Para la conexión con Miguel Cané (padre, 1812–1863): ubicar cuándo y cómo se conocieron — este dato puede ser relevante para bloques posteriores.
4. Para el Bloque 3: documentar el contexto político de Tucumán en 1810 — presencia realista vs. patriota. Identificar una o dos fuentes que hablen de la posición patriota de Salvador Alberdi. Buscar en los escritos de Alberdi adulto (ca. 1837, *Fragmento preliminar*) alguna reflexión sobre los límites de la revolución. Si no hay cita directa verificada, usar certeza **opinión** con atribución bibliográfica secundaria.
5. Redactar `S01-CONTENT-DRAFT.md` con la estructura estándar por bloque: `## Bloque N: Título`, seguido de Certeza / Excerpt (2-4 oraciones) / Fuentes (≥2) / Cita-HTML (el texto exacto que irá en la card) / Notas de imagen (nombre de archivo Wikimedia sugerido, si existe). Marcar fechas inciertas con `[INCIERTO — ver nota]` + explicación.

## Must-Haves

- [ ] `S01-CONTENT-DRAFT.md` creado con exactamente 4 secciones `## Bloque N: ...`
- [ ] Bloque 1 tiene ≥2 fuentes verificadas y la fecha 29-ago-1810 está confirmada.
- [ ] Bloque 2 tiene ≥2 fuentes; los nombres de hermanos están identificados o marcados como `[INCIERTO]` con explicación.
- [ ] Bloque 3 tiene certeza correctamente asignada (hecho para el padre, opinión para la lectura crítica adulta si no hay cita directa verificada).
- [ ] Bloque 4 tiene la fecha de muerte del padre (1824) verificada; la fecha de la madre marcada con `[INCIERTO]` si no se puede precisar más que ca. 1813.
- [ ] Ninguna cita directa es una paráfrasis presentada como cita — marcado explícitamente si fuera el caso.

## Verification

- `test -f .gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md && echo EXISTS || echo MISSING`
- `grep -c "^## Bloque" .gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md` devuelve 4
- Manual review: abrir el archivo y confirmar que cada bloque tiene el campo "Fuentes" con ≥2 entradas y el campo "Cita-HTML" no vacío.

## Inputs

- `.gsd/milestones/M007/M007-CONTEXT.md` — lista de los 11 bloques solicitados con certeza sugerida, fuentes clave, y notas sobre incertidumbre por bloque.
- `.gsd/KNOWLEDGE.md` — protocolo de verificación de citas Alberdi; patrón de content draft como artefacto intermedio; nunca sintetizar citas directas de fuentes secundarias.
- `.gsd/milestones/M007/M007-ROADMAP.md` — Key Risks: fechas de muerte de los padres son los datos más inciertos; hermanos poco documentados en fuentes estándar.

## Expected Output

- `.gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md` — borrador completo con 4 bloques verificados, listo para ser usado como fuente única en T02. El archivo debe ser legible por un agente con contexto fresco en T02 sin necesidad de re-investigar.

## Observability Impact

**Signals this task changes:**
- `S01-CONTENT-DRAFT.md` is created (measurable: `test -f ...` exits 0; `grep -c "^## Bloque" ...` returns 4).
- Each `[INCIERTO — ver nota]` marker in the draft is a visible epistemic flag for a T02 agent — detectable with `grep -c "INCIERTO" S01-CONTENT-DRAFT.md`.
- Each `card-nota-certeza` span template in the Cita-HTML fields is a future observability hook in the rendered HTML (T02 integration); inspectable post-integration with `document.querySelectorAll('.card-nota-certeza')`.

**How a future agent inspects this task's output:**
1. `test -f .gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md && echo EXISTS` — confirms artifact present.
2. `grep -c "^## Bloque" S01-CONTENT-DRAFT.md` — confirms 4 blocks are present.
3. `grep "INCIERTO" S01-CONTENT-DRAFT.md` — lists all unresolved historical uncertainties.
4. `grep "VERIFICACIÓN PENDIENTE" S01-CONTENT-DRAFT.md` — items needing primary-source lookup.
5. `grep "PARÁFRASIS" S01-CONTENT-DRAFT.md` — claims not safe to use as direct quotes.

**Failure state:**
- Missing draft → T02 must re-research from scratch.
- Missing `card-nota-certeza` flags in HTML → unverified facts without epistemic notice;
  detectable by comparing `grep -c "card-nota-certeza" index.html` against expected count.
