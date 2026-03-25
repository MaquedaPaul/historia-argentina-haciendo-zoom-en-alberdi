---
id: T01
parent: S01
milestone: M021
provides:
  - S01-CONTENT-DRAFT.md con 15 entradas canónicas del arco San Martín, URLs Wikimedia verificadas, certeza y notas historiográficas — contrato de entrada para S02/S03/S04
key_files:
  - .gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md
key_decisions:
  - 4 de 7 imágenes candidatas no existían con el nombre original; se resolvieron con alternativas verificadas via Commons API (Uniformes_Granaderos, Batalla_de_San_Lorenzo_por_Villanueva, Battle_of_Chacabuco, Encuentro_de_Guayaquil)
  - Imagen Guayaquil (Encuentro_de_Guayaquil.jpg, 484px) usa URL directa en lugar de thumb porque está por debajo del umbral 500px
  - Entradas sin imagen específica (1, 2, 3, 4, 11, 13, 14, 15) usan retrato Gil de Castro como fallback documentado
patterns_established:
  - Wikimedia API debe consultarse en Commons (commons.wikimedia.org/w/api.php) cuando falla en en.wikipedia.org/w/api.php — Commons tiene cobertura más amplia para imágenes históricas hispanoamericanas
  - Para imágenes con thumbwidth < 500px en la respuesta API, usar url directa en lugar de thumburl
observability_surfaces:
  - "grep -c '^## Entrada' .gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md  # debe ser 15"
  - "grep -q 'PENDIENTE' .gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md && echo FAIL || echo OK"
  - Tabla de imágenes verificadas en el encabezado del draft documenta fuente/fallback para cada entrada
duration: ~45min
verification_result: passed
completed_at: 2026-03-25
blocker_discovered: false
---

# T01: Verificar imágenes Wikimedia via API y escribir S01-CONTENT-DRAFT.md

**Escrito S01-CONTENT-DRAFT.md con 15 entradas canónicas del arco San Martín: 7 imágenes verificadas via Wikimedia Commons API (4 con nombre alternativo), certeza asignada en todas, y notas historiográficas tres-posiciones en Entradas 3, 4 y 12.**

## What Happened

Cargué el contenido histórico completo de `S01-RESEARCH.md` (preexistente) y procedí a verificar las 7 imágenes marcadas como `PENDIENTE API` consultando la Wikimedia API en paralelo.

**Resultado de verificación de imágenes:**
- `Cruce_de_los_Andes.jpg` → ✅ encontrado en Commons, thumb 500px disponible
- `San_Martín_en_los_Andes,_1817_(1908).jpg` → ✅ encontrado en Commons, thumb 500px disponible
- `Batalla_de_Maipu.jpg` → ✅ encontrado (en Wikipedia EN, sirve desde Commons), thumb 500px disponible
- `Regimiento_de_Granaderos_a_Caballo.jpg` → ❌ no existe; alternativa: `Uniformes_Granaderos_a_caballo_1816.png` (495px, usar URL directa) — CC BY-SA
- `Combate_de_San_Lorenzo.jpg` → ❌ no existe; alternativa: `Batalla_de_San_Lorenzo_por_Villanueva.jpg` (500px thumb) — Instituto Nacional Sanmartiniano, pre-1890, PD
- `Batalla_de_Chacabuco_(1817).jpg` → ❌ no existe; alternativa: `Battle_of_Chacabuco.jpg` (500px thumb) — PD
- `Encuentro_de_San_Martin_y_Bolivar_en_Guayaquil.jpg` → ❌ no existe; alternativa: `Encuentro_de_Guayaquil.jpg` (484px, debajo del umbral 500px — usar URL directa) — J. Collignon 1843, PD

Para las entradas sin imagen específica (1, 2, 3, 4, 11, 13, 14, 15), se usó el retrato Gil de Castro como fallback universal (ya verificado en SP1-5 de index.html).

El draft fue escrito con el formato canónico completo: encabezado con decisiones estructurales, tabla de imágenes verificadas, y 15 entradas con todos los campos requeridos. Las Entradas 3 y 4 tienen `card-opinion: true` con `certeza: debatido`; la Entrada 12 igual. La Entrada 15 tiene `certeza: opinión` y `card-opinion: true`. La Entrada 13 tiene `certeza: hecho` con el `<span class="card-nota-certeza">` inline para la variación de frase.

Las notas historiográficas de Entradas 3, 4 y 12 incluyen las tres posiciones con atribución explícita por posición, siguiendo el patrón documentado en S14-S19.

También añadí la sección `## Observability / Diagnostics` a `S01-PLAN.md` como requerían los pre-flight checks.

## Verification

```bash
DRAFT=".gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md"
test -f "$DRAFT" && echo "EXISTS"        # EXISTS
grep -c "^## Entrada" "$DRAFT"           # 15
grep -c "^certeza:" "$DRAFT"             # 15
grep -c "^wikimedia:" "$DRAFT"           # 15
grep -c "nota-historiografica: true" "$DRAFT"  # 3
grep -q "PENDIENTE" "$DRAFT" && echo "FAIL" || echo "OK: sin PENDIENTEs"  # OK
grep -c "card-opinion: true" "$DRAFT"    # 4 (Entradas 3, 4, 12, 15)
```

Todos los checks pasaron.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -f S01-CONTENT-DRAFT.md && echo EXISTS` | 0 | ✅ pass | <1s |
| 2 | `grep -c "^## Entrada" S01-CONTENT-DRAFT.md` → `15` | 0 | ✅ pass | <1s |
| 3 | `grep -c "^certeza:" S01-CONTENT-DRAFT.md` → `15` | 0 | ✅ pass | <1s |
| 4 | `grep -c "^wikimedia:" S01-CONTENT-DRAFT.md` → `15` (≥10 req.) | 0 | ✅ pass | <1s |
| 5 | `grep -c "nota-historiografica: true" S01-CONTENT-DRAFT.md` → `3` | 0 | ✅ pass | <1s |
| 6 | `grep -q "PENDIENTE" S01-CONTENT-DRAFT.md && echo FAIL \|\| echo OK` → `OK` | 1 | ✅ pass | <1s |
| 7 | `grep -c "card-opinion: true" S01-CONTENT-DRAFT.md` → `4` | 0 | ✅ pass | <1s |

## Diagnostics

El estado del draft se puede inspeccionar con:
```bash
DRAFT=".gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md"
echo "Entradas: $(grep -c '^## Entrada' $DRAFT) | Certeza: $(grep -c '^certeza:' $DRAFT) | Wikimedia: $(grep -c '^wikimedia:' $DRAFT) | NH: $(grep -c 'nota-historiografica: true' $DRAFT)"
```

La tabla de imágenes en el encabezado del draft documenta el resultado de cada consulta API, incluyendo el nombre del archivo original candidato, el archivo resuelto, la URL verificada, y si se usó fallback (con motivo).

Si un executor downstream necesita re-verificar una imagen específica:
```bash
curl -s "https://commons.wikimedia.org/w/api.php?action=query&titles=File:NOMBRE&prop=imageinfo&iiprop=url&iiurlwidth=500&format=json"
```

## Deviations

- **Consulta en Commons en lugar de EN Wikipedia:** La API de `en.wikipedia.org/w/api.php` devolvió `"missing"` para 3 de los 7 archivos originales porque esos archivos solo existen en Wikimedia Commons. Fue necesario consultar `commons.wikimedia.org/w/api.php` directamente.
- **4 nombres de archivo inválidos:** Los nombres candidatos del research (`Regimiento_de_Granaderos_a_Caballo.jpg`, `Combate_de_San_Lorenzo.jpg`, `Batalla_de_Chacabuco_(1817).jpg`, `Encuentro_de_San_Martin_y_Bolivar_en_Guayaquil.jpg`) no existen en Wikimedia. Se hizo búsqueda por término y se encontraron alternativas apropiadas.
- **Imagen Guayaquil 484px < 500px:** La respuesta API para `Encuentro_de_Guayaquil.jpg` retornó `thumbwidth: 484` (la imagen original es pequeña). Se usó `url` directa en lugar de `thumburl`.

## Known Issues

Ninguno. El draft está completo y listo para consumo por S02/S03/S04.

## Files Created/Modified

- `.gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md` — draft canónico con 15 entradas estructuradas, URLs Wikimedia verificadas via API, certeza y notas historiográficas; contrato de entrada para S02/S03/S04
- `.gsd/milestones/M021/slices/S01/S01-PLAN.md` — añadida sección `## Observability / Diagnostics` y marcado T01 como `[x]`
