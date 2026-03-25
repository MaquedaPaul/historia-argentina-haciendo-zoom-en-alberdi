# S01: Research y content draft verificado — arco completo San Martín

**Goal:** Producir `S01-CONTENT-DRAFT.md` con las 15 entradas del arco San Martín completamente estructuradas, imágenes Wikimedia verificadas via API, certeza asignada a cada entrada, y notas historiográficas marcadas — listo para integración HTML en S02/S03/S04 sin trabajo editorial adicional.

**Demo:** `S01-CONTENT-DRAFT.md` existe en `.gsd/milestones/M021/slices/S01/`, tiene ≥15 entradas (`^## Entrada`), ≥15 líneas de certeza (`^certeza:`), y ≥10 URLs Wikimedia verificadas (`wikimedia:`). El archivo es consumible directamente por el executor de S02.

## Must-Haves

- `S01-CONTENT-DRAFT.md` contiene exactamente 15 entradas (Entradas 1–15) con todos los campos requeridos: `título`, `año`, `certeza`, `excerpt`, `detalle`, `fuentes`, `wikimedia`, y `nota-historiografica` donde aplique
- Imágenes Wikimedia verificadas via API (`/w/api.php?action=query&titles=File:...&prop=imageinfo&iiprop=url&iiurlwidth=500`): URLs de thumb 500px o URL directa para imágenes pequeñas — ninguna URL sin verificar en el draft final
- Certeza asignada a cada entrada: `hecho`, `debatido`, u `opinión` — consistente con D009/D010 y el patrón del codebase
- Entradas 3, 4, y 12 marcadas con `nota-historiografica: true` y las tres posiciones documentadas con atribución explícita
- Entrada 15 marcada con `card-opinion: true`
- Decisiones de posición del sub-período y granularidad de batallas documentadas en el encabezado del draft (ya tomadas — ver sección de decisiones formales en el contexto)

## Verification

```bash
# Verificar existencia y conteo de entradas
test -f .gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md && \
  grep -c "^## Entrada" .gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md

# Debe retornar >= 15

# Verificar certeza en todas las entradas
grep -c "^certeza:" .gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md
# Debe retornar >= 15

# Verificar URLs Wikimedia presentes (verificadas o marcadas como fallback)
grep -c "wikimedia:" .gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md
# Debe retornar >= 10

# Verificar notas historiográficas marcadas
grep -c "nota-historiografica: true" .gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md
# Debe retornar >= 3 (Entradas 3, 4, 12)
```

## Tasks

- [x] **T01: Verificar imágenes Wikimedia via API y escribir S01-CONTENT-DRAFT.md** `est:1h`
  - Why: El draft con imágenes verificadas es el único producto de S01 y el contrato de entrada para S02/S03/S04. Sin URLs de imágenes concretas y verificadas, el executor de S02 no puede construir las cards.
  - Files: `.gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md`
  - Do: Ver T01-PLAN.md para pasos detallados.
  - Verify: `grep -c "^## Entrada" .gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md` retorna `15`
  - Done when: `S01-CONTENT-DRAFT.md` existe con 15 entradas, ≥10 `wikimedia:` fields con URLs reales o fallback documentado, ≥15 `certeza:` fields, ≥3 `nota-historiografica: true`, y el archivo no contiene ninguna URL marcada como `PENDIENTE API`

## Observability / Diagnostics

**Runtime signals:**
- El archivo `S01-CONTENT-DRAFT.md` es el único artefacto de runtime de esta slice. Su existencia y conteo de entradas son la señal principal de éxito.
- El proceso de verificación de imágenes via Wikimedia API produce una tabla de resolución en el encabezado del draft: cada fila documenta si la imagen fue encontrada via API o si se usó fallback, con el motivo.

**Inspección del estado:**
```bash
# Estado completo del draft en una línea
DRAFT=".gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md"
echo "Entradas: $(grep -c '^## Entrada' $DRAFT) | Certeza: $(grep -c '^certeza:' $DRAFT) | Wikimedia: $(grep -c '^wikimedia:' $DRAFT) | NH: $(grep -c 'nota-historiografica: true' $DRAFT)"
```

**Failure visibility:**
- Si el draft tiene < 15 entradas: el executor de S02 fallará al buscar Entrada 6+ → señal clara de truncado.
- Si hay URLs con "fallback" pero sin motivo documentado: buscar en la tabla de imágenes del encabezado del draft.
- Si `grep -q "PENDIENTE" $DRAFT` retorna 0: hay campos sin resolver — ver cuál con `grep -n "PENDIENTE" $DRAFT`.

**Redaction:** No hay datos sensibles. Las URLs Wikimedia son públicas. Las notas historiográficas son contenido editorial, no PII.

## Files Likely Touched

- `.gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md` (nuevo — producto de esta slice)
