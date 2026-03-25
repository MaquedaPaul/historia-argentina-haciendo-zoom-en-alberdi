---
id: S01
parent: M021
milestone: M021
provides:
  - S01-CONTENT-DRAFT.md con 15 entradas canónicas del arco San Martín, URLs Wikimedia verificadas via Commons API, certeza asignada a todas las entradas, y notas historiográficas tres-posiciones en Entradas 3, 4 y 12 — contrato de entrada para S02/S03/S04
requires: []
affects:
  - S02
  - S03
  - S04
key_files:
  - .gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md
key_decisions:
  - "Posición del sub-período: #rev-san-martin se inserta entre #rev-1800-1820 y #rev-alberdi-formacion (después de la línea 1329 de index.html)"
  - "Sub-nav label: '1812–1822' / sublabel: 'San Martín Libertador'"
  - "Timeline markers: 1812 (below, 20.00%), 1813 (above, 21.67%), 1817 (above, 28.33%), 1818 (below, 30.00%)"
  - "4 de 7 imágenes candidatas no existían con el nombre original — resueltas con alternativas verificadas via Commons API"
  - "Imagen Guayaquil (Encuentro_de_Guayaquil.jpg, 484px) usa URL directa en lugar de thumb por estar bajo el umbral 500px"
  - "Entradas sin imagen específica (1, 2, 3, 4, 11, 13, 14, 15) usan retrato Gil de Castro como fallback documentado"
  - "Distribución por executor: S02 = Entradas 1–6, S03 = Entradas 7–10, S04 = Entradas 11–15"
patterns_established:
  - "Wikimedia API debe consultarse en commons.wikimedia.org/w/api.php cuando en.wikipedia.org/w/api.php retorna 'missing' — Commons tiene cobertura más amplia para imágenes históricas hispanoamericanas"
  - "Para imágenes con thumbwidth < 500px en la respuesta API, usar url directa en lugar de thumburl — el campo thumburl no existe o apunta a una ruta inválida"
  - "Notas historiográficas tres-posiciones: cada posición lleva atribución explícita (autor, obra, año) + síntesis de lo documentado vs. lo no documentado"
observability_surfaces:
  - "grep -c '^## Entrada' .gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md  # debe ser 15"
  - "grep -q 'PENDIENTE' .gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md && echo FAIL || echo OK"
  - "Tabla de imágenes verificadas en el encabezado del draft documenta fuente/fallback para cada entrada"
drill_down_paths:
  - .gsd/milestones/M021/slices/S01/tasks/T01-SUMMARY.md
duration: ~45min
verification_result: passed
completed_at: 2026-03-25
---

# S01: Research y content draft verificado — arco completo San Martín

**Draft canónico de 15 entradas del arco San Martín entregado con URLs Wikimedia verificadas via Commons API, certeza distribuida (9 hecho / 3 debatido / 1 opinión / 1 hecho+nota), y notas historiográficas tres-posiciones con atribución explícita en Entradas 3, 4 y 12.**

## What Happened

S01 tuvo un único task (T01) que produjo el archivo `S01-CONTENT-DRAFT.md` — el contrato de entrada para los tres slices de integración HTML (S02/S03/S04).

**Research histórico:** El contenido histórico fue construido sobre `S01-RESEARCH.md` (preexistente) y verificado contra ≥2 fuentes por entrada. Las 15 entradas cubren el arco completo: infancia en Yapeyú → oficial español → Cádiz y logias → Logia Lautaro → Granaderos → San Lorenzo → Cuyo → Cruce de los Andes → Chacabuco → Maipú → Perú → Guayaquil → retiro → exilio → legado.

**Verificación de imágenes Wikimedia:** Se consultó la API de Wikimedia Commons para las 7 imágenes específicas candidatas. Resultado:
- 3 encontradas con nombre original: `Cruce_de_los_Andes.jpg`, `San_Martín_en_los_Andes,_1817_(1908).jpg`, `Batalla_de_Maipu.jpg`
- 4 no existían con el nombre candidato → resueltas con alternativas:
  - `Regimiento_de_Granaderos_a_Caballo.jpg` → `Uniformes_Granaderos_a_caballo_1816.png` (495px, URL directa)
  - `Combate_de_San_Lorenzo.jpg` → `Batalla_de_San_Lorenzo_por_Villanueva.jpg` (500px thumb)
  - `Batalla_de_Chacabuco_(1817).jpg` → `Battle_of_Chacabuco.jpg` (500px thumb)
  - `Encuentro_de_San_Martin_y_Bolivar_en_Guayaquil.jpg` → `Encuentro_de_Guayaquil.jpg` (484px, URL directa)
- 8 entradas sin imagen específica → fallback documentado con retrato Gil de Castro (ya verificado en index.html)

**Notas historiográficas:** Las Entradas 3 (Cádiz/logias/regreso), 4 (Logia Lautaro), y 12 (Guayaquil) tienen notas tres-posiciones con atribución explícita por posición. La Entrada 15 (legado) es card-opinion pura con certeza: opinión. La Entrada 13 (retiro) usa `<span class="card-nota-certeza">` inline para la variación de frase.

**Decisiones estructurales:** Se tomaron y documentaron todas las decisiones que S02/S03/S04 necesitan para integrarse sin trabajo editorial: posición de inserción en index.html, sub-nav label, cálculo de timeline markers, encoding de certeza (incluyendo la normalización de acentos), y distribución de entradas por slice executor.

## Verification

Todos los checks del slice plan pasaron:

```bash
DRAFT=".gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md"
test -f "$DRAFT" && echo "EXISTS"                          # EXISTS
grep -c "^## Entrada" "$DRAFT"                             # 15 (≥15 requerido)
grep -c "^certeza:" "$DRAFT"                               # 15 (≥15 requerido)
grep -c "^wikimedia:" "$DRAFT"                             # 15 (≥10 requerido)
grep -c "nota-historiografica: true" "$DRAFT"              # 3 (≥3 requerido)
grep -q "PENDIENTE" "$DRAFT" && echo FAIL || echo OK       # OK: sin PENDIENTEs
grep -c "card-opinion: true" "$DRAFT"                      # 4 (Entradas 3, 4, 12, 15)
```

## New Requirements Surfaced

- none

## Deviations

- **API en Commons, no en Wikipedia EN:** Para 3 de los 7 archivos originales, la API de `en.wikipedia.org/w/api.php` retornó `"missing"`. Fue necesario consultar `commons.wikimedia.org/w/api.php` directamente. El plan no especificaba cuál API consultar primero — se adoptó Commons como fuente primaria para imágenes históricas hispanoamericanas.
- **4 nombres de archivo inválidos:** Los nombres candidatos del research eran plausibles pero no existían en Wikimedia. Se requirió búsqueda por término (`list=search&srnamespace=6`) para descubrir los nombres reales. Esto no estaba anticipado en el plan pero es el procedimiento documentado en KNOWLEDGE.md.

## Known Limitations

- **8 de 15 entradas usan fallback (retrato Gil de Castro):** Las entradas de logias, retiro, exilio y legado no tienen imagen primaria específica. El retrato Gil de Castro es contextualmente apropiado para el período (1818) pero no ilustra visualmente los temas de esas cards. Los executors de S02/S04 pueden buscar alternativas si las encuentran, pero el fallback es funcional.
- **Imágenes de batallas menores no encontradas:** No hay imagen específica para la Batalla de Cancha Rayada — se usa la imagen de Maipú en la card combinada Cancha Rayada/Maipú (Entrada 10).

## Follow-ups

- S02/S03/S04 pueden optar por buscar imágenes adicionales para las entradas de logias (3, 4) y retiro (13, 14) — hay ilustraciones decimonónicas de la Logia Lautaro en Commons que el research no exploró a fondo.
- El sub-nav label `1812–1822` cubre el período activo de San Martín en América; los executors deben verificar que este rango encaja visualmente con los otros sub-nav labels al integrarlo.

## Files Created/Modified

- `.gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md` — draft canónico con 15 entradas estructuradas, URLs Wikimedia verificadas, certeza, notas historiográficas y decisiones de integración para S02/S03/S04

## Forward Intelligence

### What the next slice should know

- **El draft tiene una sección "Notas de implementación para S02/S03/S04"** al final — contiene la posición exacta de inserción en index.html (línea 1329), los patrones HTML a copiar con números de línea, el encoding de certeza con y sin acento, y las fórmulas de timeline markers precalculadas. Leer esa sección antes de abrir index.html ahorra búsqueda.
- **Distribución de entradas:** S02 = Entradas 1–6, S03 = Entradas 7–10, S04 = Entradas 11–15. Esta distribución produce ~6 cards por slice, consistente con los milestones anteriores.
- **Cards debatido (Entradas 3, 4, 12):** Usan `certeza: debatido` (sin acento) y `card-opinion: true`. Necesitan la nota historiográfica visible (no colapsable) — ver patrón en `KNOWLEDGE.md` bajo "Nota Historiográfica Pattern".
- **Entrada 12 (Guayaquil) es la más compleja:** Card-opinion con tres posiciones historiográficas, dos documentos primarios contradictorios, e imagen 484px que usa URL directa. El executor de S04 debe prestar atención especial a esta card.
- **`data-certeza="debatido"` no tiene acento** — distinto de `opinión` que sí lo tiene. La Entrada 13 es `data-certeza="hecho"` (no debatido) con un `<span class="card-nota-certeza">` inline.

### What's fragile

- **Imagen `Uniformes_Granaderos_a_caballo_1816.png` (Entrada 5):** Es 495px — usar URL directa sin `/thumb/`. Si el executor la usa con una ruta thumb, la imagen no cargará. La URL directa está en el draft: `https://upload.wikimedia.org/wikipedia/commons/3/31/Uniformes_Granaderos_a_caballo_1816.png`
- **Imagen `Encuentro_de_Guayaquil.jpg` (Entrada 12):** Misma situación — 484px, URL directa. La URL está en el draft.
- **Posición de inserción en index.html:** El draft indica línea 1329. Esa línea puede haber cambiado si otros slices activos han modificado index.html antes de que S02 se ejecute. El executor debe buscar `</div><!-- /#rev-1800-1820 -->` como ancla textual, no usar el número de línea.

### Authoritative diagnostics

- **Estado del draft en una línea:** `echo "Entradas: $(grep -c '^## Entrada' $DRAFT) | Certeza: $(grep -c '^certeza:' $DRAFT) | Wikimedia: $(grep -c '^wikimedia:' $DRAFT) | NH: $(grep -c 'nota-historiografica: true' $DRAFT)"`
- **Verificar que no hay PENDIENTEs:** `grep -q "PENDIENTE" $DRAFT && echo FAIL || echo OK`
- **Re-verificar una imagen específica:** `curl -s "https://commons.wikimedia.org/w/api.php?action=query&titles=File:NOMBRE&prop=imageinfo&iiprop=url&iiurlwidth=500&format=json"`

### What assumptions changed

- **Suposición original:** Las 7 imágenes candidatas del research serían encontrables con sus nombres en Wikimedia. **Realidad:** 4 de 7 nombres eran incorrectos o no existían — requerían búsqueda por término en Commons.
- **Suposición original:** La API de Wikipedia EN sería suficiente para verificar imágenes. **Realidad:** Commons API es necesaria para imágenes de historia latinoamericana — Wikipedia EN solo aloja una fracción.
