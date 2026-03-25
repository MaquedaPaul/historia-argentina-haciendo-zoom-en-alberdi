---
estimated_steps: 5
estimated_files: 1
---

# T01: Escribir S12-CONTENT-DRAFT.md con contenido verificado y receta HTML

**Slice:** S12 — La gobernación en un país dividido — caudillos y Buenos Aires
**Milestone:** M008

## Description

Crear `.gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md` con el contenido histórico verificado para las 2 cards de S12, las URLs de imagen confirmadas por API, y una sección "T02 Recipe" que proporciona el HTML completo listo para inserción mecánica en T02. Este draft es el artefacto intermedio que separa la investigación (alto riesgo) de la integración HTML (bajo riesgo).

## Steps

1. **Leer S12-CONTEXT.md y S12-RESEARCH.md** para absorber el marco histórico, las fuentes autorizadas, las URLs de imagen ya confirmadas y las restricciones de certeza.

2. **Redactar S12-1** (Un país sin gobierno nacional — el poder real en manos de los caudillos, 1820–1852): 3–5 oraciones que expliquen la estructura real del poder (14 provincias como estados soberanos, caudillos con ejércitos y poder judicial, gobernador de Buenos Aires con control de la aduana ≈ 80% de los ingresos y manejo de relaciones exteriores por delegación provincial — pero sin autoridad legal sobre las demás provincias). Usar fuentes: Halperin Donghi 1972, Lynch 1981 cap. 2, Goldman y Salvatore 1998. Imagen: `Retrato_del_General_Juan_Manuel_de_Rosas.jpg`, thumb URL `https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Retrato_del_General_Juan_Manuel_de_Rosas.jpg/500px-Retrato_del_General_Juan_Manuel_de_Rosas.jpg`, licencia PD.

3. **Redactar S12-2** (El Pacto Federal de 1831 — la Confederación sin Estado central): 3–5 oraciones que documenten los firmantes originales (Buenos Aires, Santa Fe, Entre Ríos; Corrientes adhirió después), la Comisión Representativa creada por el Pacto y su disolución en 1832, y el rol del Pacto como columna vertebral constitucional de la Confederación hasta 1853. Fuentes: Pacto Federal 4 de enero de 1831 (texto primario), Halperin Donghi 1972, Lynch 1981. Imagen: `Flag-map_of_Argentine_Confederation_(1836).png`, thumb URL `https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Flag-map_of_Argentine_Confederation_%281836%29.png/500px-Flag-map_of_Argentine_Confederation_%281836%29.png`, licencia CC0.

4. **Verificar restricciones de certeza**: Ambas cards son `data-certeza="hecho"`. No introducir debate historiográfico — el sistema de poder y el Pacto Federal son hechos documentados. El debate sobre Rosas (tiranía, soberanía) pertenece a S17–S19. No hay `card-nota-historiografica` en S12.

5. **Escribir la sección "T02 Recipe"** al final del draft: proporcionar el bloque HTML completo listo para copiar, incluyendo los comentarios de marcador (`<!-- S12-1: ... -->`), el `<article>` con clases exactas (`event-card card-hecho reveal reveal-slide`), `data-certeza="hecho"`, `style="--reveal-delay: 0ms"` (S12-1) y `--reveal-delay: 80ms` (S12-2), el `<div class="card-image">` con la `<img>` y el `alt` descriptivo, el `<span class="event-card__year">1820 – 1852</span>`, el `<h3>`, el `<p class="event-card__excerpt">`, y el `<footer class="card-source">` con `<cite>`.

## Must-Haves

- [ ] S12-1 redactada con ≥2 fuentes, `data-certeza="hecho"`, URL de imagen Rosas portrait incluida.
- [ ] S12-2 redactada con ≥2 fuentes (incluyendo el texto primario del Pacto Federal), `data-certeza="hecho"`, URL de imagen mapa Confederación incluida.
- [ ] Sin debate historiográfico en ninguna de las dos cards — son hechos factuales.
- [ ] Sección "T02 Recipe" presente con HTML completo y correcto para ambas cards.
- [ ] Stagger: S12-1 `--reveal-delay: 0ms`, S12-2 `--reveal-delay: 80ms` (reset, no acumulativo desde S11).
- [ ] Ninguna imagen ya usada en `index.html` (confirmado en research: ambas están disponibles y sin uso previo).

## Verification

```bash
test -s .gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md && echo "archivo existe"
grep -c 'T02 Recipe' .gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md
# debe retornar >= 1
grep -c 'data-certeza="hecho"' .gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md
# debe retornar 2 (una por card en la sección Recipe)
```

## Inputs

- `.gsd/milestones/M008/slices/S12/S12-CONTEXT.md` — marco histórico, fuentes, certeza sugerida.
- `.gsd/milestones/M008/slices/S12/S12-RESEARCH.md` — card plan, URLs de imagen API-verificadas, restricciones, pitfalls.
- `index.html` (líneas ~1612–1651) — estructura de S11 cards como referencia de template. Copiar la estructura de un `card-hecho` existente para la T02 Recipe.
- `.gsd/KNOWLEDGE.md` — reglas de citación (nunca sintetizar cita directa), regla de Write tool (no heredoc), patrón ASCII-only para marcador.

## Expected Output

- `.gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md` — nuevo archivo con:
  - Entradas S12-1 y S12-2: título, año display, certeza, excerpt (3–5 oraciones), fuentes, URL imagen, atributo alt.
  - Log de verificación de imágenes (confirma que las URLs del research siguen siendo las correctas).
  - Sección "T02 Recipe": bloque HTML completo de ~35–40 líneas listo para inserción directa en `index.html`.
