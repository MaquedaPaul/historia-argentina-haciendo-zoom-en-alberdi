# S01: Research y content draft verificado — arco completo San Martín — UAT

**Milestone:** M021
**Written:** 2026-03-25

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: S01 produce un único artefacto de texto estructurado (`S01-CONTENT-DRAFT.md`). No hay código en ejecución ni integración HTML en este slice. La verificación completa es posible via inspección del archivo con grep — los contratos del slice son cuantificables y binarios.

## Preconditions

1. El archivo `.gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md` debe existir en el worktree `M021`.
2. No se necesita servidor corriendo ni browser abierto — todo el UAT opera sobre el archivo markdown.

## Smoke Test

```bash
DRAFT=".gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md"
test -f "$DRAFT" && grep -c "^## Entrada" "$DRAFT"
# Debe retornar: 15
```
Si este comando retorna 15, el artefacto existe y tiene el conteo correcto de entradas. Todos los demás tests son válidos.

---

## Test Cases

### 1. Conteo de entradas canónicas

**Propósito:** Verificar que el draft contiene exactamente 15 entradas numeradas.

```bash
DRAFT=".gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md"
grep -c "^## Entrada" "$DRAFT"
```

**Expected:** `15`

---

### 2. Certeza asignada a todas las entradas

**Propósito:** Verificar que cada entrada tiene el campo `certeza:` en su encabezado.

```bash
grep -c "^certeza:" "$DRAFT"
```

**Expected:** `15`

---

### 3. URLs Wikimedia presentes en todas las entradas

**Propósito:** Verificar que cada entrada tiene el campo `wikimedia:` con una URL — no un placeholder vacío.

```bash
grep -c "^wikimedia:" "$DRAFT"
```

**Expected:** `15` (el plan requería ≥10; el draft entrega 15)

---

### 4. Sin campos sin resolver (PENDIENTE)

**Propósito:** Verificar que ningún campo quedó marcado como pendiente de verificación.

```bash
grep -q "PENDIENTE" "$DRAFT" && echo "FAIL: hay PENDIENTEs" || echo "OK: sin PENDIENTEs"
```

**Expected:** `OK: sin PENDIENTEs`

---

### 5. Notas historiográficas marcadas correctamente

**Propósito:** Verificar que exactamente 3 entradas están marcadas con `nota-historiografica: true` (Entradas 3, 4, 12).

```bash
grep -c "nota-historiografica: true" "$DRAFT"
```

**Expected:** `3`

Verificar que son las entradas correctas:
```bash
grep -B5 "nota-historiografica: true" "$DRAFT" | grep "^## Entrada"
```

**Expected:** Líneas con `## Entrada 3`, `## Entrada 4`, `## Entrada 12`

---

### 6. Cards de opinión / debatido marcadas

**Propósito:** Verificar que las 4 entradas con `card-opinion: true` están correctamente marcadas.

```bash
grep -c "card-opinion: true" "$DRAFT"
```

**Expected:** `4`

Verificar cuáles son:
```bash
grep -B5 "card-opinion: true" "$DRAFT" | grep "^## Entrada"
```

**Expected:** `## Entrada 3`, `## Entrada 4`, `## Entrada 12`, `## Entrada 15`

---

### 7. Distribución de certeza

**Propósito:** Verificar la distribución correcta: 9 hecho, 3 debatido, 1 opinión, 1 hecho con card-nota-certeza.

```bash
grep "^certeza:" "$DRAFT" | sort | uniq -c
```

**Expected:**
```
      3 certeza: debatido
      1 certeza: hecho (Entrada 13 — tiene card-nota-certeza inline)
     10 certeza: hecho
      1 certeza: opinión
```
*(o similar — total debe sumar 15; "hecho" puede aparecer agrupado si la herramienta no distingue la Entrada 13)*

---

### 8. Tabla de imágenes verificadas presente

**Propósito:** Verificar que el encabezado del draft contiene la tabla de resolución de imágenes.

```bash
grep -c "Archivo resuelto" "$DRAFT"
```

**Expected:** `1` (encabezado de la tabla)

Verificar que cubre las 4 imágenes que necesitaron resolución alternativa:
```bash
grep "MISSING" "$DRAFT" | wc -l
```

**Expected:** `4` (Granaderos, San Lorenzo, Chacabuco, Guayaquil)

---

### 9. Notas historiográficas contienen tres posiciones

**Propósito:** Verificar que las entradas marcadas como `nota-historiografica: true` contienen las tres posiciones con atribución explícita.

```bash
grep -c "Posición 1" "$DRAFT"
grep -c "Posición 2" "$DRAFT"
grep -c "Posición 3" "$DRAFT"
```

**Expected:** `3` en cada grep (una por entrada marcada: Entradas 3, 4, 12)

---

### 10. Sección de implementación para S02/S03/S04 presente

**Propósito:** Verificar que el draft contiene las instrucciones de integración para los executors downstream.

```bash
grep -c "Notas de implementación" "$DRAFT"
grep -c "Timeline markers" "$DRAFT"
grep -c "Distribución por executor" "$DRAFT"
```

**Expected:** `1` en cada grep

---

### 11. Decisiones estructurales documentadas en encabezado

**Propósito:** Verificar que el encabezado contiene las decisiones de posición y sub-nav.

```bash
grep -c "rev-san-martin" "$DRAFT"
grep -c "sub-nav" "$DRAFT" 
grep -c "marker-pos" "$DRAFT"
```

**Expected:** ≥3 ocurrencias de `rev-san-martin`, ≥1 de `sub-nav`, ≥4 de `marker-pos` (uno por marker)

---

### 12. Span card-nota-certeza inline presente en Entrada 13

**Propósito:** Verificar que la variación de frase de San Martín está marcada con el patrón epistémico correcto.

```bash
grep -c "card-nota-certeza" "$DRAFT"
```

**Expected:** `1`

---

## Edge Cases

### Imagen Guayaquil por debajo del umbral 500px

**Propósito:** Verificar que la imagen de Guayaquil (484px) está documentada como "URL directa" y no como thumb.

```bash
grep -A2 "Encuentro_de_Guayaquil" "$DRAFT" | head -5
```

**Expected:** La línea `wikimedia:` para la Entrada 12 debe contener `commons/f/ff/Encuentro_de_Guayaquil.jpg` (URL directa sin `/thumb/`).

---

### Imagen Uniformes Granaderos por debajo del umbral 500px

**Propósito:** Verificar que la imagen de los Granaderos (495px) también usa URL directa.

```bash
grep -A2 "Uniformes_Granaderos" "$DRAFT" | head -5
```

**Expected:** La línea `wikimedia:` para la Entrada 5 debe contener `commons/3/31/Uniformes_Granaderos_a_caballo_1816.png` (sin `/thumb/`).

---

### Entradas de logias con certeza "debatido" (sin acento)

**Propósito:** Verificar que el valor `debatido` no tiene acento — es `certeza: debatido`, no `certeza: debátido`.

```bash
grep "^certeza: debatido" "$DRAFT"
```

**Expected:** 3 líneas (Entradas 3, 4, 12)

```bash
grep "^certeza: deb" "$DRAFT" | grep -v "debatido"
```

**Expected:** sin output (no hay variantes con acento)

---

## Failure Signals

- `grep -c "^## Entrada" $DRAFT` retorna < 15 → truncado, T01 no completó el archivo
- `grep -q "PENDIENTE" $DRAFT` retorna 0 (exit 0) → hay imágenes sin verificar
- `grep -c "^wikimedia:" $DRAFT` retorna < 10 → campos de imagen faltantes
- `grep -c "nota-historiografica: true" $DRAFT` retorna < 3 → notas historiográficas incompletas
- La URL de una imagen contiene `/thumb/` para un archivo < 500px → el executor de S02/S03/S04 producirá imágenes rotas para esas cards

## Not Proven By This UAT

- **Calidad editorial del contenido histórico:** Este UAT verifica estructura y completitud pero no la exactitud histórica de cada afirmación. La rigorosidad histórica fue verificada durante T01 contra ≥2 fuentes por entrada — ese proceso no es reproducible via grep.
- **Disponibilidad actual de las URLs Wikimedia:** Las URLs fueron verificadas via API en la fecha de ejecución (2026-03-25). Este UAT no re-verifica que las URLs siguen siendo accesibles — para eso se puede hacer `curl -I <url>` por cada imagen.
- **Integración HTML:** Ningún HTML fue producido en S01. Que el draft sea consumible sin trabajo editorial adicional solo puede verificarse completamente cuando S02 intente integrarlo.
- **Correcto renderizado en 320px y 1920px+:** Criterio del milestone, no de este slice.

## Notes for Tester

- El archivo de draft tiene una sección de "Decisiones estructurales" al inicio y una sección de "Notas de implementación para S02/S03/S04" al final — leerlas primero orienta el resto de la inspección.
- La tabla de imágenes verificadas en el encabezado documenta cada imagen con su nombre candidato original, el archivo resuelto, la URL final y el motivo de fallback. Es el registro de auditoría del proceso API.
- Para re-verificar una imagen específica: `curl -s "https://commons.wikimedia.org/w/api.php?action=query&titles=File:NOMBRE&prop=imageinfo&iiprop=url&iiurlwidth=500&format=json"`
- La Entrada 12 (Guayaquil) es la entrada más compleja del draft — tiene tres posiciones historiográficas, dos documentos primarios contradictorios, y una imagen con URL directa (< 500px). Inspeccionarla en detalle es el mejor test de que el draft está completo.
