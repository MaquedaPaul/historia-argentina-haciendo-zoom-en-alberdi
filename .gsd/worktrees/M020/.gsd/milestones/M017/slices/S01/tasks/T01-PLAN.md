---
estimated_steps: 4
estimated_files: 1
---

# T01: Escribir borrador de 6 cards Urquiza en S01-CONTENT-DRAFT.md

**Slice:** S01 — Investigación y borrador
**Milestone:** M017

## Description

Crear el archivo `S01-CONTENT-DRAFT.md` con las 6 cards verificadas sobre Urquiza. El draft es el único output de S01 y el insumo directo de S02 para la integración HTML. Los hechos, fuentes, y clasificaciones de certeza ya están investigados en `S01-RESEARCH.md` — esta tarea los traslada al formato estructurado de card que el executor de S02 puede consumir mecánicamente.

Cada card debe incluir:
- ID y título
- `data-certeza` value (ver abajo)
- Fecha display para el header de la card
- Excerpt de 2–4 oraciones (prosa directa, no bullet points)
- Para cards con blockquote (URQ-5 opinión rosista): paráfrasis atribuida, NO cita directa inventada
- Fuentes (≥2 para cards hecho, ≥1 para debatido/opinión)
- Nota de imagen: filename Wikimedia sugerido, marcado `[URL-PENDIENTE-VERIFICAR]` para imágenes no confirmadas, o filename ya en uso en el sitio

## Steps

1. Crear `.gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md` usando la herramienta Write (no bash heredoc — ver KNOWLEDGE.md).

2. Escribir el preámbulo del draft: fecha, milestone, slice, propósito, instrucciones de uso para S02, y tabla resumen de las 6 cards con sus certezas e IDs.

3. Escribir las 6 secciones URQ-1 a URQ-6 con la estructura completa. Usar los hechos de S01-RESEARCH.md. Detalles por card:
   - **URQ-1** (`data-certeza="hecho"`): Origen entrerriano 1801–1819. Fecha: "18 oct 1801". Excerpt: nacimiento, padre vasco, Colegio San Carlos, retorno. Imagen: `Justo_José_de_Urquiza.jpg` (ya en uso, línea 1636 — reutilizable).
   - **URQ-2** (`data-certeza="hecho"`): Caudillo federal leal a Rosas 1819–1841. Fecha: "1826–1841". Excerpt: diputado 1826, comandante 1832, leal a Rosas 1836, coronel mayor 1837. Sin blockquote (la frase Lynch es secundaria, no cita directa verificada con paginación). Imagen: ninguna nueva necesaria para esta card.
   - **URQ-3** (`data-certeza="hecho"`): Gobernador 1841–1851. Fecha: "1841–1851". Excerpt: elección 15 dic 1841, prosperidad de Entre Ríos, Colegio Nacional, tensión con Rosas. Incluir `<span class="card-nota-certeza">` para la tensión gradual (no hay fecha exacta de ruptura). Imagen: `Palacio_San_José_(Entre_Ríos).jpg` — marcar `[URL-PENDIENTE-VERIFICAR]`.
   - **URQ-4** (`data-certeza="hecho"`): El Pronunciamiento 1° de mayo de 1851. Fecha: "1° may 1851". Excerpt: mecánica (aceptó renuncia Rosas), reasunción soberana del Pacto Federal 1831, cambio de lema, consecuencias inmediatas (alianza 29 may, Ejército Grande, Caseros 3 feb 1852). Imagen: `Daguerrotipo_de_Justo_José_de_Urquiza_(recorte).jpg` — marcar `[URL-PENDIENTE-VERIFICAR]`.
   - **URQ-5** (`data-certeza="debatido"`): Debate historiográfico ¿Traición o decisión? Usar `card-opinion` CSS class (D052). Excerpt: dos posiciones con atribución clara. Posición rosista/revisionista: Irazusta — paráfrasis atribuida `[PARÁFRASIS — NO USAR COMO CITA DIRECTA]`. Posición liberal/síntesis: Lynch, Halperin Donghi — paráfrasis atribuida. Imagen: `Justo_José_de_Urquiza_(retrato).jpg` (ya en uso, línea 2328).
   - **URQ-6** (`data-certeza="opini&#xF3;n"`): Conexión narrativa con Alberdi. Usar `card-opinion` CSS class. Paráfrasis atribuida a Mayer/Halperin Donghi sobre la convergencia. NO repetir la cita directa Alberdi ya en línea 2274–2276 del index.html. Imagen: ninguna nueva.

4. Agregar sección final "## Notas de inserción HTML para S02" con:
   - Insertion point: buscar `<!-- /#rev-1835-1852 -->` como anchor, insertar antes del conector Alberdi SP3→SP4.
   - Sub-nav link a añadir: `<a href="#rev-urquiza-perfil" ...>`.
   - Recordatorio: usar `card-opinion` class para URQ-5 (data-certeza="debatido") y URQ-6 (data-certeza="opinión").
   - Recordatorio: `data-certeza="opini&#xF3;n"` con entidad HTML para opinión (D053/D057).
   - Recordatorio: sub-nav count sube de 7 a 8 en este worktree.

## Must-Haves

- [ ] Archivo `S01-CONTENT-DRAFT.md` creado con las 6 secciones URQ-1 a URQ-6
- [ ] Cada card-hecho (URQ-1/2/3/4) tiene ≥2 fuentes citadas
- [ ] URQ-5 usa `data-certeza="debatido"` con `card-opinion` CSS class (siguiendo D052/D058)
- [ ] URQ-6 usa `data-certeza="opini&#xF3;n"` (entidad HTML, siguiendo D057)
- [ ] No hay citas directas inventadas — todas las paráfrasis marcadas `[PARÁFRASIS — NO USAR COMO CITA DIRECTA]`
- [ ] La cita de Alberdi de la línea 2274–2276 del index.html NO aparece en URQ-6
- [ ] Imágenes no confirmadas marcadas `[URL-PENDIENTE-VERIFICAR]` para que T02 las complete

## Verification

- `test -f .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md`
- `grep -c "^## URQ-" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md` devuelve 6
- `grep -c "data-certeza=" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md` devuelve ≥6
- `grep -c "hecho\|debatido\|opini" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md` devuelve ≥6

## Inputs

- `.gsd/milestones/M017/slices/S01/S01-RESEARCH.md` — hechos verificados, fuentes, clasificaciones de certeza, estructura de 6 cards, instrucciones de inserción HTML
- `.gsd/DECISIONS.md` — D052 (card-opinion para debatido), D053 (HTML entities en Windows), D057 (data-certeza="opinión" con acento), D058 (debatido vs opinión para notas historiográficas)
- `.gsd/KNOWLEDGE.md` — Alberdi Quote Verification Protocol (no inventar citas directas), Nota Historiográfica Pattern, Inline Epistemic Flag Pattern (card-nota-certeza)

## Expected Output

- `.gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md` — borrador completo con 6 cards URQ-1 a URQ-6, listo para T02 (verificación de URLs) y posteriormente para S02 (integración HTML)
