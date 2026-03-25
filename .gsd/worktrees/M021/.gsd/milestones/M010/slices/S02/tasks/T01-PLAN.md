---
estimated_steps: 5
estimated_files: 1
---

# T01: Verificar URLs de imágenes Wikimedia para las 11 cards

**Slice:** S02 — Integración HTML — cards en index.html
**Milestone:** M010

## Description

Las 8 imágenes candidatas identificadas en S01-CONTENT-DRAFT.md están todas marcadas como `[FUENTE PENDIENTE]` o `[VERIFICAR URL]` — no se pueden usar directamente en `<img src>` sin verificar via la Wikimedia API. Este task produce un manifiesto verificado que mapea cada card ID a su URL de imagen confirmada (o a un fallback explícito). T02 consume este manifiesto sin necesidad de nueva investigación.

El protocolo de verificación está documentado en KNOWLEDGE.md:
- Query: `https://en.wikipedia.org/w/api.php?action=query&titles=File:FILENAME&prop=imageinfo&iiprop=url&iiurlwidth=500&format=json`
- La API devuelve `thumburl` en `query.pages[*].imageinfo[0].thumburl` — ese es el URL a usar.
- Si la imagen es menor que 500px, la API devuelve la URL original sin `/thumb/` — usar tal cual.
- Si el filename exacto es incorrecto, usar `list=search&srnamespace=6&srsearch=QUERY` para encontrar el nombre correcto.

## Steps

1. Listar los 8 candidatos de imagen del draft con sus nombres de archivo candidatos (ver sección Inputs abajo). Algunos candidatos son conocidos (Cabildo_abierto.jpg ya verificado en SP1-1); otros son solo conjeturas de nombre.

2. Para cada imagen candidata, ejecutar la query Wikimedia API. Usar `fetch_page` o `web_search` con la URL directa de la API. Registrar el `thumburl` devuelto o el error.

3. Para los casos sin imagen verificada (French/Berutti — no encontrado en S01; debate historiográfico — sin imagen apropiada), decidir el fallback:
   - Opción A: Buscar una imagen alternativa con `list=search&srnamespace=6` usando términos alternativos.
   - Opción B: Si no hay imagen adecuada, usar un placeholder visual — la card **no tendrá** `<div class="card-image">` (omitir el bloque completamente; el patrón de fallback de app.js es para imágenes rotas, no para cards sin imagen).

4. Documentar en el manifiesto (tabla Markdown) con columnas: `Card ID | Título | Archivo Wikimedia | URL 500px verificada | Alt text | Notas`.

5. Revisar coherencia: la imagen del Cabildo Abierto de Subercaseaux (`Cabildo_abierto.jpg`) ya está en SP1-1 — per S01 Forward Intelligence, reutilizarla en Card Temática 2 (Manipulación Cabildo) es aceptable (contexto diferente), pero en Evento 3 (22 mayo) habría duplicación visual — decidir si usar imagen diferente para Evento 3 o señalarlo en el manifiesto con nota.

## Must-Haves

- [ ] Manifiesto creado en `.gsd/milestones/M010/slices/S02/tasks/T01-IMAGE-MANIFEST.md`
- [ ] Cada una de las 11 cards del draft tiene una entrada en el manifiesto (aunque algunas compartan la misma imagen)
- [ ] Cada entrada tiene URL verificada (resultado real de API) O fallback explícito (con razón documentada)
- [ ] La imagen del Cabildo Abierto (Subercaseaux) está marcada como "ya en SP1-1 — reutilización con nota de contexto" o se provee alternativa para Evento 3
- [ ] Las cards sin imagen disponible tienen la nota "sin card-image — omitir bloque" para que T02 no intente usar URLs inventadas

## Verification

```bash
test -f .gsd/milestones/M010/slices/S02/tasks/T01-IMAGE-MANIFEST.md
grep -c "^| " .gsd/milestones/M010/slices/S02/tasks/T01-IMAGE-MANIFEST.md
# Expected: >= 12 (header + 11 rows)
```

## Inputs

- `.gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md` — sección "Notas de imagen" de cada card; los candidatos son:
  - **Evento 1** (14 mayo): `Baltasar_Hidalgo_de_Cisneros.jpg` o similar — retrato virrey Cisneros
  - **Evento 2** (18 mayo): Retrato Saavedra (`Cornelio_Saavedra.jpg`) o Belgrano (ya verificado en SP1-3 como `Manuel_Belgrano.JPG`)
  - **Evento 3** (22 mayo): `Cabildo_abierto.jpg` (Subercaseaux) — ya verificado, en uso en SP1-1. Considerar alternativa para evitar duplicación.
  - **Evento 4** (23 mayo): Retrato Cisneros — mismo candidato que Evento 1
  - **Evento 5** (24 mayo): Imagen Plaza de la Victoria/Plaza de Mayo de época
  - **Evento 6** (25 mayo): Acta capitular del 25 de mayo (`Acta_capitular_1810.jpg`) o Retrato Saavedra
  - **Evento 7** (26-31 mayo): Retrato Mariano Moreno (`Mariano_Moreno.jpg`)
  - **Temática 1** (French/Berutti): Sin candidato verificado — necesita búsqueda o fallback
  - **Temática 2** (Manipulación Cabildo): `Cabildo_abierto.jpg` — ya verificado, reutilización
  - **Temática 3** (Presión miliciana): Retrato Saavedra o grabado Patricios
  - **Temática 4** (Debate historiográfico): Sin imagen apropiada indicada — fallback probable
- KNOWLEDGE.md — protocolo de verificación Wikimedia API (sección "Wikimedia Commons Image Sourcing")

## Expected Output

- `.gsd/milestones/M010/slices/S02/tasks/T01-IMAGE-MANIFEST.md` — tabla con 11 filas, una por card; URL final verificada (o "sin imagen") para cada una. T02 consume este archivo directamente — no necesita re-hacer investigación de imágenes.
