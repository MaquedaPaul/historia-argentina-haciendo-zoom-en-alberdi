# S01: Investigación y borrador — UAT

**Milestone:** M016 — Alberdi y Mitre: Dos Proyectos de País
**Written:** 2026-03-24

## UAT Type

- **UAT mode:** artifact-driven
- **Why this mode is sufficient:** S01 produce un único artefacto estático (`S01-CONTENT-DRAFT.md`). No hay runtime, servidor, ni UI que verificar. La totalidad del valor de la slice es el contenido estructurado del draft — su existencia, su completitud (4 cards), su corrección formal (certeza, cites, entities) y la ausencia de frases baneadas. Todos estos atributos son verificables directamente contra el archivo.

## Preconditions

- `.gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md` debe existir en el worktree M016.
- Los checks se ejecutan desde `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M016`.

## Smoke Test

```bash
grep -c "^## Card" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md
```
**Debe retornar `4`.** Si retorna cualquier otro número, la slice está incompleta o las secciones no siguen el patrón `## Card [A-D]`.

---

## Test Cases

### 1. Artefacto existe y tiene 4 secciones de card

```bash
test -f .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md && echo "EXISTS"
grep -c "^## Card" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md
```

**Expected:** `EXISTS` en la primera línea; `4` en la segunda.

---

### 2. Las 4 cards tienen `card-certeza-indicator`

```bash
grep -c "card-certeza-indicator" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md
```

**Expected:** `4` (una por card). Valor < 4 indica que alguna card tiene el indicator ausente o mal copiado.

---

### 3. Distribución de certeza correcta: 3 hecho, 1 opinión

```bash
grep "data-certeza" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md
```

**Expected:** Cuatro líneas con `data-certeza`. Cards A, B, C muestran `data-certeza="hecho"`; Card D muestra `data-certeza="opini&#xF3;n"` (con HTML entity — no `"opinion"` ni `"opinión"` literal).

---

### 4. Card C tiene `card-nota-historiografica` visible

```bash
grep -c "card-nota-historiografica" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md
```

**Expected:** `1` — la nota historiográfica sobre el debate de Pavón/retirada de Urquiza está presente exactamente una vez, en Card C.

---

### 5. Mínimo de citas académicas: ≥4 `<cite>` elements

```bash
grep -c "<cite>" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md
```

**Expected:** `8` (el draft tiene 8; el mínimo aceptable para 4 cards es 4). Un valor de 0 indica que el archivo está corrompido o el HTML fue eliminado.

---

### 6. Frase baneada BIOG-13 ausente

```bash
grep -q "varado en París sin sueldo y sin regreso" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md && echo "FAIL" || echo "PASS"
```

**Expected:** `PASS` (silencio del grep). `FAIL` indica que la frase de BIOG-13 fue introducida en el HTML de alguna card — revisar Card C que es la de mayor riesgo de duplicación.

---

### 7. Frase baneada SP4-3 ausente

```bash
grep -q "revolución encabezada por Mitre separó" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md && echo "FAIL" || echo "PASS"
```

**Expected:** `PASS`. `FAIL` indica que la frase de SP4-3 aparece en el draft — revisar Card B (la más relacionada con la separación de Buenos Aires).

---

### 8. No hay citas directas Alberdi-Mitre fabricadas

Inspectar manualmente el contenido de los `<blockquote>` en Card D:

```bash
grep -A2 "<blockquote" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md
```

**Expected:** El único blockquote está en Card D y comienza con "Según la síntesis de J. M. Mayer (1963)" — marcado explícitamente como paráfrasis de fuente secundaria, no como cita directa de Alberdi o Mitre. Ausencia del texto "Según la síntesis" indica que el blockquote fue reescrito como cita directa (error).

---

### 9. HTML entities de acentos en bloques verbatim (D053)

```bash
grep "opini" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md | grep "data-certeza"
```

**Expected:** La línea debe mostrar `data-certeza="opini&#xF3;n"` (entity), no `data-certeza="opinión"` (carácter literal Unicode). Si aparece el carácter literal, el entity fue reemplazado y podría causar problemas en integraciones que esperan ASCII.

---

### 10. Punto de inserción documentado para S02

```bash
grep -q "rev-alberdi-mitre" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md && echo "PASS" || echo "MISSING"
```

**Expected:** `PASS` — el ID de inserción `rev-alberdi-mitre` está documentado en la sección "Notas para S02". `MISSING` indica que la guía de integración para S02 fue omitida.

---

## Edge Cases

### Checklists internos no deben contener frases baneadas literales

```bash
grep -n "varado en París\|revolución encabezada por Mitre separó\|El crimen de la guerra" \
  .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md
```

**Expected:** Silencio completo (exit code 1). Si este grep retorna líneas, verificar si son del HTML de las cards o de los checklists de documentación. En los checklists deben aparecer como referencias abreviadas ("Frase BIOG-13 ausente del HTML"), nunca como las frases literales. Este fue el gotcha que ocurrió durante T01 y que se corrigió.

---

### Card D sin cita directa de Alberdi sobre Mitre

Verificar que no existe ningún `<blockquote>` que atribuya palabras directas de Alberdi a Mitre (o viceversa) sin la marca de "Paráfrasis":

```bash
grep -B1 "<blockquote" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md
```

**Expected:** El único blockquote en el draft (Card D) está precedido por el párrafo `event-card__excerpt` que contextualiza; el propio blockquote abre con "Según la síntesis de J. M. Mayer (1963)" y la `card-opinion__author` confirma la atribución a Mayer.

---

## Failure Signals

- `grep -c "^## Card"` retorna < 4: alguna card falta o su encabezado no sigue `## Card [A-D]` exactamente.
- `grep -c "card-certeza-indicator"` retorna 0: el indicador de certeza está ausente en todas las cards — el HTML fue eliminado o el archivo fue sobrescrito con una versión incompleta.
- `grep "data-certeza"` no muestra la variante `opini&#xF3;n` para Card D: el entity de opinión fue normalizado a texto literal — esto podría romper selectores CSS en S02 que esperen el entity.
- `grep -q "varado en París sin sueldo y sin regreso"` retorna exit 0 (match encontrado): la frase baneada de BIOG-13 fue introducida — el draft duplicaría contenido existente en index.html.
- `grep -c "<cite>"` retorna 0: el HTML de las cards fue eliminado del draft, dejando solo los encabezados y checklists.

## Not Proven By This UAT

- **Disponibilidad real de las URLs de Wikimedia Commons:** Las URLs de imágenes no fueron verificadas con curl. S02 debe confirmar que cada URL resuelve antes de integrar, y usar el fallback placeholder si no.
- **Compatibilidad del HTML con el DOM real de index.html:** El draft produce HTML válido según el patrón del codebase, pero S02 debe verificar que la inserción en `#periodo-revolucion` no rompe el sub-nav ni el timeline animado.
- **Renderizado visual en browser:** S02 verifica el resultado en browser (el milestone define "integration verification: browser").
- **Sin errores JS:** S01 no toca app.js ni agrega JS nuevo — la verificación de JS corresponde a S02.

## Notes for Tester

- Los checklists internos dentro del draft usan referencias abreviadas como "Frase BIOG-13 ausente del HTML" — esto es intencional. No confundir con la ausencia de las frases baneadas.
- Card D tiene `data-certeza="opini&#xF3;n"` como HTML entity. Al inspeccionarlo en un editor de texto mostrará la entity literal `&#xF3;`; en browser renderizará `opinión`. Ambas representaciones son correctas.
- La nota historiográfica de Card C es visible (no colapsable) por diseño — no es un bug.
- Los greps de verificación deben ejecutarse desde `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M016`.
